import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptCreator } from "@/components/admin/PromptCreator";
import { PromptList } from "@/components/admin/PromptList";
import { ApiKeysManager } from "@/components/admin/ApiKeysManager";

const AdminPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Administração</h1>
      
      <Tabs defaultValue="prompts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="api-keys">Chaves API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompts" className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Criar Novo Prompt</h2>
            <PromptCreator />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Prompts Salvos</h2>
            <PromptList />
          </div>
        </TabsContent>
        
        <TabsContent value="api-keys">
          <ApiKeysManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;