import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ActionButtonDialogHeaderProps {
  isEditing: boolean;
}

const ActionButtonDialogHeader = ({ isEditing }: ActionButtonDialogHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-white text-xl font-semibold px-2">
        {isEditing ? "Editar Botão" : "Criar Novo Botão"}
      </DialogTitle>
    </DialogHeader>
  );
};

export default ActionButtonDialogHeader;