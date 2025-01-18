import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

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
  const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

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
    <div className="relative flex h-[32px] items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-start text-[11px] text-white transition enabled:hover:bg-chatgpt-secondary disabled:cursor-not-allowed xl:gap-1.5 xl:text-[12px] cursor-pointer border-[#383737] hover:bg-chatgpt-hover">
      {IconComponent && <IconComponent className="h-3 w-3 text-gray-400" />}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="w-full bg-chatgpt-hover text-white rounded px-2 py-0.5 text-[11px]"
            autoFocus
          />
        ) : (
          <span className="text-[11px] text-white truncate">{label}</span>
        )}
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEdit}
          className="h-5 w-5 text-gray-400 hover:text-white hover:bg-chatgpt-hover rounded-lg p-0.5"
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="h-5 w-5 text-gray-400 hover:text-red-400 hover:bg-chatgpt-hover rounded-lg p-0.5"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};