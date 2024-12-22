import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, Pencil, Archive, Trash2 } from "lucide-react";
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
  } as React.CSSProperties : {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-chatgpt-secondary border-chatgpt-border w-[160px] rounded-xl shadow-lg p-1.5"
        style={style}
      >
        <div className="space-y-1">
          <Button
            className="flex items-center justify-start w-full space-x-3 text-xs h-8 rounded-lg bg-transparent hover:bg-chatgpt-hover border-0 px-3"
          >
            <Share className="h-4 w-4" />
            <span>Compartilhar</span>
          </Button>
          <Button
            onClick={handleRename}
            className="flex items-center justify-start w-full space-x-3 text-xs h-8 rounded-lg bg-transparent hover:bg-chatgpt-hover border-0 px-3"
          >
            <Pencil className="h-4 w-4" />
            <span>Renomear</span>
          </Button>
          <Button
            className="flex items-center justify-start w-full space-x-3 text-xs h-8 rounded-lg bg-transparent hover:bg-chatgpt-hover border-0 px-3"
          >
            <Archive className="h-4 w-4" />
            <span>Arquivar</span>
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="flex items-center justify-start w-full space-x-3 text-xs h-8 rounded-lg bg-transparent hover:bg-red-600/10 text-red-500 hover:text-red-500 border-0 px-3"
          >
            <Trash2 className="h-4 w-4" />
            <span>Excluir</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};