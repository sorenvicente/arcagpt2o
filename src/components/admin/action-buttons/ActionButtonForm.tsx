import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ActionButtonFormData {
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

interface ActionButtonFormProps {
  onSubmit: (data: ActionButtonFormData) => void;
  onCancel: () => void;
  editingButton?: {
    id: string;
    name: string;
    icon: string;
    label: string;
    category: string;
    color: string;
  };
}

const ActionButtonForm = ({ onSubmit, onCancel, editingButton }: ActionButtonFormProps) => {
  const { register, handleSubmit } = useForm<ActionButtonFormData>({
    defaultValues: editingButton
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-2">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300">Nome</Label>
        <Input
          id="name"
          {...register("name")}
          readOnly={!!editingButton}
          className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="icon" className="text-gray-300">Ícone</Label>
        <Input
          id="icon"
          {...register("icon")}
          className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="label" className="text-gray-300">Label</Label>
        <Input
          id="label"
          {...register("label")}
          className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category" className="text-gray-300">Categoria</Label>
        <Input
          id="category"
          {...register("category")}
          readOnly={!!editingButton}
          className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="color" className="text-gray-300">Cor</Label>
        <Input
          id="color"
          {...register("color")}
          className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-chatgpt-main border-chatgpt-border hover:bg-chatgpt-hover text-white rounded-full px-6"
        >
          Cancelar
        </Button>
        <Button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
        >
          {editingButton ? "Salvar" : "Criar"}
        </Button>
      </div>
    </form>
  );
};

export default ActionButtonForm;