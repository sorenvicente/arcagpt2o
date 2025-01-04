import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientBackground } from "./GradientBackground";
import { AuthForm } from "./AuthForm";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";

interface LoginFormProps {
  onLogout: () => Promise<void>;
}

export const LoginForm = ({ onLogout }: LoginFormProps) => {
  useLoginRedirect();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground />
      
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
              <AuthForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};