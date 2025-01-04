import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
  onLogout: () => Promise<void>;
}

export const AuthForm = ({ onLogout }: AuthFormProps) => {
  return (
    <div className="min-h-screen bg-chatgpt-main flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-chatgpt-secondary border-chatgpt-border rounded-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-2xl">Bem-vindo</CardTitle>
            <Button
              variant="ghost"
              onClick={onLogout}
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