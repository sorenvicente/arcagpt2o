import { useAuth } from "@/hooks/useAuth";
import { LogoSettings } from "@/components/admin/settings/LogoSettings";
import { UserManagement } from "@/components/admin/settings/UserManagement";

const SystemSettingsPage = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Configurações do Sistema</h1>
      </div>

      <div className="space-y-8">
        <LogoSettings />
        <UserManagement />
      </div>
    </div>
  );
};

export default SystemSettingsPage;