import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        className="bg-chatgpt-secondary border-chatgpt-border w-[180px] rounded-md shadow-lg p-2"
        style={style}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2 mb-1">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Renomear conversa"
              className="bg-chatgpt-input text-white border-chatgpt-border text-xs h-6 rounded-sm flex-1"
            />
            <Button 
              onClick={handleRename}
              className="text-xs h-6 rounded-sm bg-chatgpt-hover hover:bg-opacity-80 px-2 min-w-[60px]"
            >
              Salvar
            </Button>
          </div>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-transparent hover:bg-red-600/10 text-red-500 hover:text-red-500 text-xs h-6 rounded-sm w-full border-0 justify-start px-2"
          >
            Excluir conversa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};