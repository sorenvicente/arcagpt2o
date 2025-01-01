import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const LogoSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);

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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Sucesso",
        description: "Logo atualizada com sucesso",
      });
      setLogoFile(null);
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
      updateLogo.mutate(file);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Logo</Label>
        <div className="mt-2 flex items-center gap-4">
          {settings?.logo_url && (
            <img
              src={settings.logo_url}
              alt="Logo"
              className="h-12 w-auto"
            />
          )}
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="max-w-xs"
            />
            {logoFile && (
              <Button
                variant="outline"
                onClick={() => setLogoFile(null)}
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};