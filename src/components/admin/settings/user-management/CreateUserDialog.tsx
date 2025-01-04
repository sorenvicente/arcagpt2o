import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserForm } from "./CreateUserForm";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#40414F] hover:bg-[#2A2B32] text-white hover:text-white border border-[#4E4F60] shadow-md hover:shadow-lg transition-all duration-200 rounded-xl">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#2A2B32] border border-[#4E4F60] shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Criar Novo Usuário</DialogTitle>
        </DialogHeader>
        <CreateUserForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};