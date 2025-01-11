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
  const { isLoading, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        console.log('🔍 Verificando acesso às configurações...');
        if (!isLoading && (!user || !isAdmin)) {
          console.log('❌ Usuário não autenticado ou sem permissão, redirecionando...');
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
  }, [isLoading, user, isAdmin, navigate, toast]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-chatgpt-main to-chatgpt-secondary p-6">
      <Card className="w-full max-w-4xl mx-auto bg-[#343541]/90 border-0 shadow-xl backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Configurações do Sistema</h1>
          
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="w-full grid grid-cols-2 gap-4 p-2 bg-[#444654] rounded-xl">
              <TabsTrigger 
                value="users" 
                className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-[#40414F]/70 text-sm rounded-xl py-3"
              >
                Usuários
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-[#40414F]/70 text-sm rounded-xl py-3"
              >
                Aparência
              </TabsTrigger>
            </TabsList>

            <div className="border-t border-[#4E4F60] opacity-30" />

            <TabsContent value="users" className="mt-6 space-y-6 animate-fade-in">
              <Card className="bg-[#40414F]/50 border-0 rounded-xl p-6">
                <UserManagement />
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6 animate-fade-in">
              <Card className="bg-[#40414F]/50 border-0 rounded-xl p-6">
                <LogoSettings />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};