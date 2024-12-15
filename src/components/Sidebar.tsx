import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MessageSquarePlus,
  Settings,
  Menu,
} from "lucide-react";

const Sidebar = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const navigate = useNavigate();
  const [conversations] = useState<string[]>([]);

  return (
    <>
      <button
        className={`fixed left-2 top-2 z-40 rounded-md border border-gray-600 p-2 text-gray-300 hover:bg-gray-700 ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={onToggle}
      >
        <Menu className="h-4 w-4" />
      </button>

      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 bg-chatgpt-sidebar transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <button
              className="flex items-center gap-3 rounded-md px-3 py-1 text-sm text-white transition-colors duration-200 hover:bg-chatgpt-hover"
              onClick={() => {
                // Reset conversation state here
              }}
            >
              <MessageSquarePlus className="h-4 w-4" />
              Nova conversa
            </button>
            <button
              className="rounded-md p-2 text-gray-300 hover:bg-gray-700"
              onClick={onToggle}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation, index) => (
              <div key={index} className="sidebar-item">
                {conversation}
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 p-4">
            <button
              className="action-button w-full"
              onClick={() => navigate("/admin")}
            >
              <Settings className="h-4 w-4" />
              <div className="flex flex-col items-start">
                <span>Administrador</span>
                <span className="text-xs text-gray-400">
                  Configurações e chaves
                </span>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
