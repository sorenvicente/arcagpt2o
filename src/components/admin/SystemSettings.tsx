import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Upload } from "lucide-react";

export const SystemSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Buscar usuários
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return profiles;
    },
  });

  // Buscar configurações do sistema
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

  // Mutation para atualizar role do usuário
  const updateUserRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Sucesso",
        description: "Role do usuário atualizado com sucesso",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar role do usuário: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation para deletar usuário
  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Sucesso",
        description: "Usuário deletado com sucesso",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao deletar usuário: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation para atualizar logo
  const updateLogo = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `logos/${crypto.randomUUID()}.${fileExt}`;

      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from("system")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Pegar URL pública
      const { data: publicUrl } = supabase.storage
        .from("system")
        .getPublicUrl(filePath);

      // Atualizar URL no banco
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
    <Card className="p-6">
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <select
                      className="border rounded p-1"
                      value={user.role}
                      onChange={(e) =>
                        updateUserRole.mutate({
                          userId: user.id,
                          newRole: e.target.value,
                        })
                      }
                    >
                      <option value="user">Usuário</option>
                      <option value="admin">Admin</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteUser.mutate(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="appearance">
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
        </TabsContent>
      </Tabs>
    </Card>
  );
};