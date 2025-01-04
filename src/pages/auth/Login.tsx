import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { AuthForm } from "@/components/auth/AuthForm";
import { useLoginSession } from "@/hooks/useLoginSession";

const LoginPage = () => {
  const { isLoading, handleLogout } = useLoginSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <AuthForm onLogout={handleLogout} />;
};

export default LoginPage;