import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoSettings } from "./settings/LogoSettings";
import { UserManagement } from "./settings/UserManagement";

export const SystemSettings = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-chatgpt-main border-chatgpt-border">
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="w-full grid grid-cols-2 gap-2 p-1 bg-chatgpt-secondary/30">
          <TabsTrigger 
            value="users" 
            className="w-full data-[state=active]:bg-chatgpt-hover data-[state=active]:text-white"
          >
            Usuários
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="w-full data-[state=active]:bg-chatgpt-hover data-[state=active]:text-white"
          >
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-2 sm:mt-4 px-4 sm:px-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="appearance" className="mt-2 sm:mt-4 px-4 sm:px-6">
          <LogoSettings />
        </TabsContent>
      </Tabs>
    </Card>
  );
};