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
      <Card className="w-full max-w-4xl mx-auto bg-[#343541]/90 border-0 shadow-xl backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-100">
            Configurações do Sistema
          </h1>
          
          <Tabs defaultValue="users" className="space-y-8">
            <TabsList className="w-full grid grid-cols-2 gap-4 p-3 bg-[#444654]/80 rounded-2xl backdrop-blur-sm border border-[#4E4F60]/30">
              <TabsTrigger 
                value="users" 
                className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#40414F]/70 text-sm rounded-xl py-3 text-gray-200"
              >
                Usuários
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#40414F]/70 text-sm rounded-xl py-3 text-gray-200"
              >
                Aparência
              </TabsTrigger>
            </TabsList>

            <div className="border-t border-[#4E4F60]/30 backdrop-blur-sm" />

            <TabsContent value="users" className="mt-8 space-y-6 animate-fade-in">
              <Card className="bg-[#40414F]/50 border border-[#4E4F60]/20 rounded-xl p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <UserManagement />
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-8 space-y-6 animate-fade-in">
              <Card className="bg-[#40414F]/50 border border-[#4E4F60]/20 rounded-xl p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <LogoSettings />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};