import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoSettings } from "./settings/LogoSettings";
import { UserManagement } from "./settings/UserManagement";

export const SystemSettings = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="w-full grid grid-cols-2 gap-2">
          <TabsTrigger value="users" className="w-full">Usuários</TabsTrigger>
          <TabsTrigger value="appearance" className="w-full">Aparência</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-2 sm:mt-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="appearance" className="mt-2 sm:mt-4">
          <LogoSettings />
        </TabsContent>
      </Tabs>
    </Card>
  );
};