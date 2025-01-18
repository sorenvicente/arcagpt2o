import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CustomActionButtonProps {
  id: string;
  name: string;
  label: string;
  category: string;
  icon: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CustomActionButton = ({
  id,
  name,
  label,
  category,
  icon,
  onEdit,
  onDelete,
}: CustomActionButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);
  const { toast } = useToast();

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const { error } = await supabase
          .from('action_buttons')
          .update({ label: editedLabel })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Botão atualizado com sucesso!",
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Erro ao atualizar botão:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o botão.",
          variant: "destructive",
        });
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="bg-chatgpt-secondary p-3 rounded-full border border-chatgpt-border hover:border-gray-600 transition-colors">
      <div className="flex justify-between items-center gap-2">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editedLabel}
              onChange={(e) => setEditedLabel(e.target.value)}
              className="w-full bg-chatgpt-hover text-white rounded px-2 py-1 text-sm"
              autoFocus
            />
          ) : (
            <>
              <h4 className="text-sm font-medium text-white truncate">{name}</h4>
              <p className="text-xs text-gray-400 truncate">{label}</p>
              <span className="text-xs text-gray-500 block truncate">{category}</span>
            </>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-chatgpt-hover rounded-lg"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="h-6 w-6 text-gray-400 hover:text-red-400 hover:bg-chatgpt-hover rounded-lg"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};