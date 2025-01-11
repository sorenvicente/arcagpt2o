import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import HexLogo from "@/components/HexLogo";
import { Edit2 } from "lucide-react";

export const LogoSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newAppName, setNewAppName] = useState("");

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

  const updateAppName = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase
        .from("system_settings")
        .update({ application_name: name })
        .eq("id", settings?.id);

      if (error) throw error;
      return name;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Sucesso",
        description: "Nome da aplicação atualizado com sucesso",
      });
      setIsEditingName(false);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar nome: " + error.message,
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

  const handleStartEditName = () => {
    setNewAppName(settings?.application_name || "");
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (newAppName.trim()) {
      updateAppName.mutate(newAppName.trim());
    }
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
    setNewAppName("");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-gray-200">Nome da Aplicação</Label>
        <div className="flex items-center gap-4">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                placeholder="Nome da aplicação"
                className="max-w-xs bg-[#40414F]/70 border-[#4E4F60]/30 rounded-xl focus:ring-2 focus:ring-[#4E4F60]/50 transition-all duration-300"
              />
              <Button
                onClick={handleSaveName}
                disabled={updateAppName.isPending}
                size="sm"
                className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                {updateAppName.isPending ? "Salvando..." : "Salvar"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelEditName}
                disabled={updateAppName.isPending}
                size="sm"
                className="rounded-xl border-[#4E4F60]/30 hover:bg-[#40414F]/30 transition-all duration-300"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg text-gray-200">{settings?.application_name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStartEditName}
                className="h-8 w-8 p-0 rounded-lg hover:bg-[#40414F]/30 transition-all duration-300"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <Label className="text-gray-200">Logo</Label>
        <div className="mt-2 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 p-6 border border-[#4E4F60]/20 rounded-xl bg-[#40414F]/30 backdrop-blur-sm shadow-sm">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Logo Atual</p>
                <HexLogo
                  size="64"
                  className="text-gray-200"
                  customLogoUrl={settings?.logo_url}
                />
              </div>
              {previewUrl && (
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Prévia</p>
                  <HexLogo
                    size="64"
                    className="text-gray-200"
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
              className="max-w-xs bg-[#40414F]/70 border-[#4E4F60]/30 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#4E4F60]/30 file:text-gray-200 hover:file:bg-[#4E4F60]/50 transition-all duration-300"
            />
            {logoFile && (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={updateLogo.isPending}
                  className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {updateLogo.isPending ? "Salvando..." : "Salvar"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updateLogo.isPending}
                  className="rounded-xl border-[#4E4F60]/30 hover:bg-[#40414F]/30 transition-all duration-300"
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