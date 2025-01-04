import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import HexLogo from "@/components/HexLogo";

export const LogoSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateLogo = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `logos/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("system")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("system")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("system_settings")
        .update({ logo_url: publicUrl.publicUrl })
        .eq("id", settings?.id);

      if (updateError) throw updateError;

      return publicUrl.publicUrl;
    },
    onSuccess: (newLogoUrl) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Sucesso",
        description: "Logo atualizada com sucesso",
      });
      setLogoFile(null);
      setPreviewUrl(null);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar logo: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (logoFile) {
      updateLogo.mutate(logoFile);
    }
  };

  const handleCancel = () => {
    setLogoFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Logo</Label>
        <div className="mt-2 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Logo Atual</p>
                <HexLogo
                  size="64"
                  className="text-gray-800"
                  customLogoUrl={settings?.logo_url}
                />
              </div>
              {previewUrl && (
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Prévia</p>
                  <HexLogo
                    size="64"
                    className="text-gray-800"
                    customLogoUrl={previewUrl}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="max-w-xs"
            />
            {logoFile && (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={updateLogo.isPending}
                >
                  {updateLogo.isPending ? "Salvando..." : "Salvar"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updateLogo.isPending}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};