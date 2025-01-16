import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onCreateClick: () => void;
}

const Header = ({ onCreateClick }: HeaderProps) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">Gerenciar Botões de Ação</h1>
      <div className="flex gap-4">
        <Link to="/app">
          <Button variant="outline" className="bg-chatgpt-secondary border-chatgpt-border hover:bg-chatgpt-hover rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à Interface
          </Button>
        </Link>
        <Button 
          onClick={onCreateClick}
          className="bg-chatgpt-secondary border-chatgpt-border hover:bg-chatgpt-hover rounded-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Botão
        </Button>
      </div>
    </div>
  );
};

export default Header;