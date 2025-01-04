import { Grip } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditButtonProps {
  onEdit: () => void;
  visible: boolean;
}

const EditButton = ({ onEdit, visible }: EditButtonProps) => {
  if (!visible) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onEdit}
            className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2.5 rounded-full hover:bg-[#202123] bg-black/20"
          >
            <Grip className="h-4 w-4 text-[#8E9196] hover:text-white transition-colors rotate-90" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black text-xs px-2 py-1 rounded-xl">
          <p>Editar texto</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditButton;