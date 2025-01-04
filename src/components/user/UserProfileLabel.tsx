import { User } from "@supabase/supabase-js";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

interface UserProfileLabelProps {
  user: User | null;
  isAdmin: boolean;
}

export function UserProfileLabel({ user, isAdmin }: UserProfileLabelProps) {
  return (
    <DropdownMenuLabel className="font-normal px-3 py-2">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none text-[#9b87f5]">
          {isAdmin ? "Administrador" : "Usuário"}
        </p>
        <p className="text-xs leading-none text-gray-400">
          {user?.email}
        </p>
      </div>
    </DropdownMenuLabel>
  );
}