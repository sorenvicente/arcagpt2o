import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoSettings } from "./settings/LogoSettings";
import { UserManagement } from "./settings/UserManagement";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const SystemSettings = () => {
  const { isLoading, user } = useAuth('admin');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        console.log('🔍 Verificando acesso às configurações...');
        if (!isLoading && !user) {
          console.log('❌ Usuário não autenticado, redirecionando...');
          toast({
            title: "Acesso negado",
            description: "Você precisa estar logado como administrador para acessar esta página.",
            variant: "destructive",
          });
          navigate('/login');
        }
      } catch (error) {
        console.error('❌ Erro ao verificar acesso:', error);
        toast({
          title: "Erro ao verificar acesso",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    checkAccess();
  }, [isLoading, user, navigate, toast]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#343541] border-0 shadow">
      <Tabs defaultValue="users" className="space-y-2">
        <TabsList className="w-full grid grid-cols-2 gap-2 p-2 bg-[#444654] rounded-xl">
          <TabsTrigger 
            value="users" 
            className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow transition-all duration-200 hover:bg-[#40414F]/70 text-sm rounded-xl"
          >
            Usuários
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow transition-all duration-200 hover:bg-[#40414F]/70 text-sm rounded-xl"
          >
            Aparência
          </TabsTrigger>
        </TabsList>

        <div className="border-t border-[#4E4F60] opacity-30" />

        <TabsContent value="users" className="mt-2 px-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="appearance" className="mt-2 px-4">
          <LogoSettings />
        </TabsContent>
      </Tabs>
    </Card>
  );
};