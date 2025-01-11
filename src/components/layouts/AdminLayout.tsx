import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { UserMenu } from "../UserMenu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen bg-chatgpt-main">
      <header className="fixed top-0 left-0 right-0 z-50 bg-chatgpt-main border-b border-chatgpt-border">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Painel Administrativo</h1>
          <UserMenu />
        </div>
      </header>
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;