import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoSettings } from "./settings/LogoSettings";
import { UserManagement } from "./settings/UserManagement";

export const SystemSettings = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#1A1F2C] border border-[#2A2F3C] shadow-lg">
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="w-full grid grid-cols-2 gap-2 p-1 bg-gradient-to-b from-[#2A2F3C]/60 to-[#1A1F2C]/40 rounded-t-lg border-b border-[#2A2F3C]">
          <TabsTrigger 
            value="users" 
            className="w-full data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-[#9b87f5]/20"
          >
            Usuários
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="w-full data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-[#9b87f5]/20"
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