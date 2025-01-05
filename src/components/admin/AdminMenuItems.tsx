import { Key, LayoutDashboard, Settings, MessageSquare, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export function AdminMenuItems() {
  const navigate = useNavigate();
  
  return (
    <>
      <DropdownMenuItem 
        onClick={() => navigate("/app")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        <span>Interface Principal</span>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => navigate("/admin")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <Settings className="mr-2 h-4 w-4" />
        <span>Gerenciar Prompts</span>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => navigate("/api-keys")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <Key className="mr-2 h-4 w-4" />
        <span>API Keys</span>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => navigate("/admin/settings")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <Settings className="mr-2 h-4 w-4" />
        <span>Configurações</span>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => navigate("/")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <Store className="mr-2 h-4 w-4" />
        <span>Página de Vendas</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="bg-chatgpt-border" />
    </>
  );
}