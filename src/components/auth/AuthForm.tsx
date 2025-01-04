import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { authAppearance } from './authConfig';

export const AuthForm = () => {
  return (
    <Auth 
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: authAppearance.variables,
        className: authAppearance.className,
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
  );
};