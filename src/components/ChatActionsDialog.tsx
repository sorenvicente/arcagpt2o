import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

interface ChatActionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
  chatTitle: string;
  position?: { x: number; y: number };
}

export const ChatActionsDialog = ({
  isOpen,
  onClose,
  onRename,
  onDelete,
  chatTitle,
  position,
}: ChatActionsDialogProps) => {
  const [newTitle, setNewTitle] = useState(chatTitle);

  const handleRename = () => {
    onRename(newTitle);
    onClose();
  };

  const style = position ? {
    position: 'fixed',
    top: `${position.y}px`,
    left: `${position.x}px`,
    transform: 'none',
  } as React.CSSProperties : {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-chatgpt-secondary border-chatgpt-border w-[160px] rounded-md overflow-hidden p-0 shadow-lg"
        style={style}
      >
        <div className="flex flex-col">
          <Button
            onClick={handleRename}
            className="flex items-center justify-start w-full space-x-3 text-xs h-9 bg-transparent hover:bg-chatgpt-hover border-0 px-3 rounded-none"
          >
            <Edit2 className="h-4 w-4" />
            <span>Renomear</span>
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="flex items-center justify-start w-full space-x-3 text-xs h-9 bg-transparent hover:bg-red-600/10 text-red-500 hover:text-red-500 border-0 px-3 rounded-none"
          >
            <Trash2 className="h-4 w-4" />
            <span>Excluir</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};