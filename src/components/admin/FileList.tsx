import { useEffect, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface File {
  id: string;
  filename: string;
  file_path: string;
}

interface FileListProps {
  promptId: string;
}

export function FileList({ promptId }: FileListProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const loadFiles = async () => {
    const { data, error } = await supabase
      .from('prompt_training_files')
      .select('*')
      .eq('prompt_id', promptId);

    if (error) {
      console.error('Error loading files:', error);
      return;
    }

    setFiles(data);
  };

  useEffect(() => {
    loadFiles();
  }, [promptId]);

  const handleDelete = async (file: File) => {
    try {
      // Delete from Storage
      const { error: storageError } = await supabase.storage
        .from('training_files')
        .remove([file.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('prompt_training_files')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      toast({
        title: "Arquivo excluído",
        description: "O arquivo foi removido com sucesso.",
      });

      // Refresh file list
      loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o arquivo.",
        variant: "destructive",
      });
    }
  };

  if (files.length === 0) {
    return <div className="text-sm text-gray-500 mt-2">Nenhum arquivo enviado</div>;
  }

  return (
    <div className="space-y-2 mt-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-2 rounded-lg border border-gray-200 bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{file.filename}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(file)}
            className="h-8 w-8 text-gray-500 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}