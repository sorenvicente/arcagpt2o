import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  promptId: string;
  onUploadComplete?: () => void;
}

export function FileUpload({ promptId, onUploadComplete }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${promptId}/${crypto.randomUUID()}.${fileExt}`;

      // Upload file to Storage
      const { error: uploadError } = await supabase.storage
        .from('training_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file metadata to database
      const { error: dbError } = await supabase
        .from('prompt_training_files')
        .insert({
          prompt_id: promptId,
          filename: file.name,
          file_path: filePath,
          content_type: file.type,
          size: file.size,
        });

      if (dbError) throw dbError;

      toast({
        title: "Arquivo enviado",
        description: "O arquivo foi enviado com sucesso.",
      });

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o arquivo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  return (
    <div className="mt-2">
      <label htmlFor={`file-upload-${promptId}`}>
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={isUploading}
          asChild
        >
          <div>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Enviando..." : "Adicionar arquivo"}
          </div>
        </Button>
      </label>
      <input
        id={`file-upload-${promptId}`}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
    </div>
  );
}