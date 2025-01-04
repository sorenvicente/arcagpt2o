import { Key, LayoutDashboard, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export function AdminMenuItems() {
  const navigate = useNavigate();
  
  return (
    <>
      <DropdownMenuItem 
        onClick={() => navigate("/admin")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <Settings className="mr-2 h-4 w-4" />
        <span>Prompts</span>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => navigate("/api-keys")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <Key className="mr-2 h-4 w-4" />
        <span>API Keys</span>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => navigate("/admin/dashboard")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        <span>Dashboard</span>
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => navigate("/admin/settings")}
        className="px-3 py-2 text-gray-200 hover:bg-chatgpt-hover hover:text-white focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
      >
        <Settings className="mr-2 h-4 w-4" />
        <span>Configurações</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="bg-chatgpt-border" />
    </>
  );
}