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
        className="bg-chatgpt-secondary border-chatgpt-border w-[160px] rounded-xl p-1.5 shadow-lg"
        style={style}
      >
        <div className="grid grid-cols-2 gap-1">
          <Button
            onClick={handleRename}
            className="flex flex-col items-center justify-center space-y-1 text-xs h-16 rounded-lg bg-transparent hover:bg-chatgpt-hover border-0 px-3"
          >
            <Edit2 className="h-5 w-5" />
            <span>Renomear</span>
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="flex flex-col items-center justify-center space-y-1 text-xs h-16 rounded-lg bg-transparent hover:bg-red-600/10 text-red-500 hover:text-red-500 border-0 px-3"
          >
            <Trash2 className="h-5 w-5" />
            <span>Excluir</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};