import { LogOut } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AdminMenuItems } from "./AdminMenuItems";

interface UserMenuContentProps {
  email: string | undefined;
  isAdmin: boolean;
  onSignOut: () => void;
}

export function UserMenuContent({ email, isAdmin, onSignOut }: UserMenuContentProps) {
  return (
    <DropdownMenuContent 
      className="w-56 bg-chatgpt-main border border-chatgpt-border text-white rounded-md shadow-lg z-50" 
      align="end" 
      forceMount
    >
      <DropdownMenuLabel className="font-normal px-3 py-2">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none text-[#9b87f5]">
            {isAdmin ? "Administrador" : "Usuário"}
          </p>
          <p className="text-xs leading-none text-gray-400">
            {email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-chatgpt-border" />
      {isAdmin && <AdminMenuItems />}
      <DropdownMenuItem
        className="px-3 py-2 text-red-400 hover:bg-chatgpt-hover hover:text-red-300 focus:bg-chatgpt-hover cursor-pointer"
        onClick={onSignOut}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}