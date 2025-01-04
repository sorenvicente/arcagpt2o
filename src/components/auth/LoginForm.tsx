import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

interface LoginFormProps {
  onLogout: () => Promise<void>;
}

export const LoginForm = ({ onLogout }: LoginFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }

          navigate('/app');
          
          toast({
            title: "Login realizado com sucesso",
            description: "Bem-vindo de volta! Estamos felizes em ter você aqui."
          });
        } catch (error) {
          console.error('Error during login:', error);
          toast({
            title: "Erro ao fazer login",
            description: "Por favor, verifique suas credenciais e tente novamente.",
            variant: "destructive"
          });
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 bg-[length:400%_400%]"
        style={{
          filter: 'brightness(0.7)',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-chatgpt-secondary/80 backdrop-blur-md border-chatgpt-border rounded-xl shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white text-center">Bem-vindo!</CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Entre com sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Auth 
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#9b87f5',
                        brandAccent: '#8B5CF6',
                        brandButtonText: "white",
                        inputBackground: "#40414F",
                        inputText: "white",
                        inputPlaceholder: "#9CA3AF",
                        messageText: "white",
                        anchorTextColor: "#9b87f5",
                        dividerBackground: "#4E4F60",
                      },
                      borderWidths: {
                        buttonBorderWidth: '1px',
                        inputBorderWidth: '1px',
                      },
                      radii: {
                        borderRadiusButton: '0.75rem',
                        buttonBorderRadius: '0.75rem',
                        inputBorderRadius: '0.75rem',
                      },
                    },
                  },
                  className: {
                    container: 'text-white',
                    label: 'text-white',
                    button: 'bg-primary hover:bg-primary/90 text-white',
                    input: 'bg-chatgpt-input border-chatgpt-border text-white placeholder-gray-400',
                  },
                }}
                providers={[]}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'Seu email',
                      password_input_placeholder: 'Sua senha',
                      button_label: 'Entrar',
                      loading_button_label: 'Entrando...',
                      social_provider_text: 'Entrar com {{provider}}',
                      link_text: 'Já tem uma conta? Entre',
                    },
                    sign_up: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'Seu email',
                      password_input_placeholder: 'Sua senha',
                      button_label: 'Criar conta',
                      loading_button_label: 'Criando conta...',
                      social_provider_text: 'Criar conta com {{provider}}',
                      link_text: 'Não tem uma conta? Cadastre-se',
                    },
                    forgotten_password: {
                      link_text: 'Esqueceu sua senha?',
                      button_label: 'Enviar instruções',
                      loading_button_label: 'Enviando instruções...',
                      confirmation_text: 'Verifique seu email para redefinir sua senha',
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};