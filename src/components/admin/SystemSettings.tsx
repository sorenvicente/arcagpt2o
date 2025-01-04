import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoSettings } from "./settings/LogoSettings";
import { UserManagement } from "./settings/UserManagement";

export const SystemSettings = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-chatgpt-main border-chatgpt-border shadow-xl">
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="w-full grid grid-cols-2 gap-2 p-1 bg-gradient-to-b from-chatgpt-secondary to-chatgpt-main rounded-t-lg border-b border-chatgpt-border">
          <TabsTrigger 
            value="users" 
            className="w-full data-[state=active]:bg-chatgpt-hover data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-chatgpt-hover/50"
          >
            Usuários
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="w-full data-[state=active]:bg-chatgpt-hover data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-chatgpt-hover/50"
          >
            Aparência
          </TabsTrigger>
        </TabsList>

        <div className="border-t border-chatgpt-border/20 pt-4" />

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