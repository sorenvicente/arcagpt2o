import ApiKeysManager from "@/components/admin/ApiKeysManager";
import PromptBlock from "@/components/prompts/PromptBlock";
import PromptList from "@/components/prompts/PromptList";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-chatgpt-main">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8 text-white">Painel Administrativo</h1>
        
        <div className="space-y-8">
          <div className="bg-chatgpt-secondary rounded-lg p-6 border border-chatgpt-border">
            <ApiKeysManager />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-chatgpt-secondary rounded-lg p-6 border border-chatgpt-border">
              <h2 className="text-xl font-semibold mb-4 text-white">Criar Novo Prompt</h2>
              <PromptBlock />
            </div>
            
            <div className="bg-chatgpt-secondary rounded-lg p-6 border border-chatgpt-border">
              <h2 className="text-xl font-semibold mb-4 text-white">Prompts Existentes</h2>
              <PromptList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;