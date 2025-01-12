import { Settings, Key, MousePointerClick, Home, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const AdminMenuItems = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link
        to="/app"
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-800"
      >
        <Home className="w-4 h-4" />
        <span>ChatGPT Home</span>
      </Link>
      <Link
        to="/admin"
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-800"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Gerenciar Prompts</span>
      </Link>
      <Link
        to="/admin/settings"
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-800"
      >
        <Settings className="w-4 h-4" />
        <span>Configurações do Sistema</span>
      </Link>
      <Link
        to="/api-keys"
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-800"
      >
        <Key className="w-4 h-4" />
        <span>Chaves de API</span>
      </Link>
      <Link
        to="/admin/action-buttons"
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-800"
      >
        <MousePointerClick className="w-4 h-4" />
        <span>Botões de Ação</span>
      </Link>
    </div>
  );
};

export default AdminMenuItems;