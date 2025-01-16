import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomActionButtonProps {
  id: string;
  name: string;
  label: string;
  category: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CustomActionButton = ({
  id,
  name,
  label,
  category,
  onEdit,
  onDelete,
}: CustomActionButtonProps) => {
  return (
    <div className="bg-chatgpt-secondary p-3 rounded-lg border border-chatgpt-border hover:border-gray-600 transition-colors">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white truncate">{name}</h4>
          <p className="text-xs text-gray-400 truncate">{label}</p>
          <span className="text-xs text-gray-500 block truncate">{category}</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(id)}
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