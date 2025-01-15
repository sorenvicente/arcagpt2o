import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ActionButtonDialogHeaderProps {
  isEditing: boolean;
}

const ActionButtonDialogHeader = ({ isEditing }: ActionButtonDialogHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-white text-xl">
        {isEditing ? "Editar Botão Auxiliar" : "Criar Novo Botão Auxiliar"}
      </DialogTitle>
      <DialogDescription className="text-gray-400">
        {isEditing 
          ? "Modifique as configurações do botão auxiliar existente."
          : "Configure um novo botão auxiliar que funcionará como um LLM baseado em prompts."}
      </DialogDescription>
    </DialogHeader>
  );
};

export default ActionButtonDialogHeader;