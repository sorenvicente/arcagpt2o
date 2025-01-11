import ApiKeysManager from "@/components/admin/ApiKeysManager";

const ApiKeysPage = () => {
  return (
    <div className="min-h-screen bg-chatgpt-main p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Gerenciar Chaves API</h1>
        </div>
        <ApiKeysManager />
      </div>
    </div>
  );
};

export default ApiKeysPage;