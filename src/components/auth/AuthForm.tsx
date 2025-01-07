import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { GradientBackground } from './GradientBackground';

export const AuthForm = () => {
  return (
    <div className="auth-container">
      <div className="w-full max-w-[400px] mx-auto p-4 relative z-10">
        <div className="bg-chatgpt-secondary rounded-xl p-6 shadow-xl">
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
        </div>
      </div>
      <GradientBackground />
    </div>
  );
};