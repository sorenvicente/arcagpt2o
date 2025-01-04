import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
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
        // Todos os usuários vão para a interface principal
        navigate('/app');
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!"
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-chatgpt-main flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-chatgpt-secondary border-chatgpt-border rounded-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white">Login</CardTitle>
          <CardDescription className="text-gray-400">
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
                      brand: '#202123',
                      brandAccent: '#2A2B32',
                    },
                  },
                },
              }}
              providers={[]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};