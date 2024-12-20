import { User, Settings, Key } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const UserMenu = () => {
  const navigate = useNavigate();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group flex gap-2 p-2.5 text-sm items-start hover:bg-token-sidebar-surface-secondary rounded-lg px-2 text-left w-full min-w-[200px]">
          <span className="flex w-full flex-row flex-wrap-reverse justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-token-border-light">
                <User className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span>Administrador</span>
                <span className="line-clamp-1 text-xs text-token-text-tertiary">Configurações e chaves</span>
              </div>
            </div>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-chatgpt-secondary border-chatgpt-border rounded-xl shadow-lg">
        <div className="flex flex-col divide-y divide-chatgpt-border">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-chatgpt-hover text-white transition-colors duration-200"
          >
            <Settings className="h-4 w-4" />
            <span>Prompts</span>
          </button>
          <button
            onClick={() => navigate('/api-keys')}
            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-chatgpt-hover text-white transition-colors duration-200"
          >
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};