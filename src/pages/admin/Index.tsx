import ApiKeysManager from "@/components/admin/ApiKeysManager";
import PromptBlock from "@/components/prompts/PromptBlock";
import PromptList from "@/components/prompts/PromptList";

const AdminPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Painel Administrativo</h1>
      
      <div className="space-y-8">
        <ApiKeysManager />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Criar Novo Prompt</h2>
            <PromptBlock />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Prompts Existentes</h2>
            <PromptList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;