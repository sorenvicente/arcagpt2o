import { SystemSettings } from "@/components/admin/SystemSettings";
import { PromptCreator } from "@/components/admin/PromptCreator";
import { useAuth } from "@/hooks/useAuth";

const AdminIndex = () => {
  useAuth("admin");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Configurações do Sistema</h1>
      
      <div className="grid gap-6">
        <SystemSettings />
        <PromptCreator />
      </div>
    </div>
  );
};

export default AdminIndex;