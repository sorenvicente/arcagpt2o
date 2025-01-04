import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { AuthForm } from "@/components/auth/AuthForm";
import { useLoginSession } from "@/hooks/useLoginSession";

const LoginPage = () => {
  const { isLoading } = useLoginSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <AuthForm />;
};

export default LoginPage;