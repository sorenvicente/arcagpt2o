import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }

          if (profile?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (mounted) {
          toast({
            title: "Erro ao verificar sessão",
            description: "Por favor, tente fazer login novamente.",
            variant: "destructive"
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        setIsLoading(false);
      } else if (session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profile?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          toast({
            title: "Erro ao verificar perfil",
            description: "Por favor, tente fazer login novamente.",
            variant: "destructive"
          });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erro ao fazer logout",
        description: "Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-chatgpt-main flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <div className="text-white text-sm">Verificando autenticação...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chatgpt-main flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-chatgpt-secondary border-chatgpt-border rounded-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-2xl">Bem-vindo</CardTitle>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </Button>
          </div>
          <CardDescription className="text-gray-400">
            Faça login ou crie uma conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '1rem',
                },
                input: {
                  borderRadius: '1rem',
                },
                anchor: {
                  color: '#2563eb',
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Endereço de email',
                  password_label: 'Senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  email_label: 'Endereço de email',
                  password_label: 'Senha',
                  button_label: 'Criar conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Criar conta com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
                magic_link: {
                  email_input_label: 'Endereço de email',
                  button_label: 'Enviar link mágico',
                  loading_button_label: 'Enviando link mágico...',
                  link_text: 'Enviar email com link mágico',
                },
                forgotten_password: {
                  email_label: 'Endereço de email',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando instruções...',
                  link_text: 'Esqueceu sua senha?',
                },
              },
            }}
            providers={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;