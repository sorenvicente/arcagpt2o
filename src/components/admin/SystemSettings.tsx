import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoSettings } from "./settings/LogoSettings";
import { UserManagement } from "./settings/UserManagement";

export const SystemSettings = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#343541] border-0 shadow-lg">
      <Tabs defaultValue="users" className="space-y-2">
        <TabsList className="w-full grid grid-cols-2 gap-2 p-2 bg-[#444654] rounded-xl">
          <TabsTrigger 
            value="users" 
            className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-[#40414F]/70 text-sm rounded-xl"
          >
            Usuários
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="w-full data-[state=active]:bg-[#40414F] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-[#40414F]/70 text-sm rounded-xl"
          >
            Aparência
          </TabsTrigger>
        </TabsList>

        <div className="border-t border-[#4E4F60] opacity-30" />

        <TabsContent value="users" className="mt-2 px-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="appearance" className="mt-2 px-4">
          <LogoSettings />
        </TabsContent>
      </Tabs>
    </Card>
  );
};