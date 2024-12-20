import {
  Dialog,
  DialogContent,
  DialogDescription,
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
}

export const ChatActionsDialog = ({
  isOpen,
  onClose,
  onRename,
  onDelete,
  chatTitle,
}: ChatActionsDialogProps) => {
  const [newTitle, setNewTitle] = useState(chatTitle);

  const handleRename = () => {
    onRename(newTitle);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-chatgpt-main border-chatgpt-border">
        <DialogHeader>
          <DialogTitle className="text-white">Chat Actions</DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your chat conversation
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title"
              className="bg-chatgpt-input text-white border-chatgpt-border"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Chat
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleRename}>Rename</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};