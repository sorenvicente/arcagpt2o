import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptCreator } from "@/components/admin/PromptCreator";
import { PromptList } from "@/components/admin/PromptList";
import { Button } from "@/components/ui/button";
import { Home, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Administração</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/api-keys')}
          >
            <Key className="h-4 w-4" />
            API Keys
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="prompts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompts">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Criar Novo Prompt</h2>
              <PromptCreator />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Prompts Salvos</h2>
              <PromptList />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;