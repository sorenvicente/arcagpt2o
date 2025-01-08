import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientBackground } from "./GradientBackground";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useLoginRedirect } from "@/hooks/useLoginRedirect";

export const LoginForm = () => {
  useLoginRedirect();

  return (
    <div className="auth-container">
      <GradientBackground />
      
      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="bg-chatgpt-secondary/80 backdrop-blur-md border-chatgpt-border rounded-xl shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white text-center">Bem-vindo!</CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Entre com sua conta para continuar
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
                className: {
                  container: 'auth-form-container',
                  button: 'auth-button !bg-blue-600 hover:!bg-blue-700 transition-colors',
                  input: 'auth-input',
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Entrar',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Cadastrar',
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};