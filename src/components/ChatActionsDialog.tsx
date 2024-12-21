import {
  Dialog,
  DialogContent,
  DialogFooter,
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
        className="bg-chatgpt-secondary border-chatgpt-border w-[200px] rounded-lg shadow-lg"
        style={style}
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="text-white text-sm font-medium">Ações do Chat</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Novo título"
            className="bg-chatgpt-input text-white border-chatgpt-border text-xs h-7 rounded-md"
          />
          <div className="flex flex-col space-y-2">
            <Button
              variant="destructive"
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 text-xs h-6 rounded-md w-full"
            >
              Deletar
            </Button>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="text-xs h-6 rounded-md border-chatgpt-border hover:bg-chatgpt-hover px-2"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleRename}
                className="text-xs h-6 rounded-md bg-chatgpt-hover hover:bg-opacity-80 px-2"
              >
                Renomear
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};