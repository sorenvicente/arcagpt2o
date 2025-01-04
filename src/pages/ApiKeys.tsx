import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ApiKeysManager from "@/components/admin/ApiKeysManager";
import { Home, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApiKeysPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-chatgpt-main p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Gerenciar Chaves API</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl border-chatgpt-border hover:bg-chatgpt-hover text-white"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl border-chatgpt-border hover:bg-chatgpt-hover text-white"
              onClick={() => navigate('/admin')}
            >
              <FileText className="h-4 w-4" />
              Prompts
            </Button>
          </div>
        </div>
        <ApiKeysManager />
      </div>
    </div>
  );
};

export default ApiKeysPage;