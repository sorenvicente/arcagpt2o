import ApiKeysManager from "@/components/admin/ApiKeysManager";
import PromptManager from "@/components/admin/PromptManager";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-chatgpt-main p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-white">Painel Administrativo</h1>
        
        <div className="space-y-8">
          <div className="bg-chatgpt-secondary rounded-lg p-6 border border-chatgpt-border">
            <ApiKeysManager />
          </div>
          
          <div className="bg-chatgpt-secondary rounded-lg p-6 border border-chatgpt-border">
            <PromptManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;