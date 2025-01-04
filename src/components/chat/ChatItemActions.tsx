import { Edit2, Trash2 } from 'lucide-react';

interface ChatItemActionsProps {
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const ChatItemActions = ({ onEdit, onDelete }: ChatItemActionsProps) => {
  return (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Edit2 
        className="h-4 w-4 hover:text-blue-400 cursor-pointer" 
        onClick={onEdit}
      />
      <Trash2 
        className="h-4 w-4 hover:text-red-400 cursor-pointer" 
        onClick={onDelete}
      />
    </div>
  );
};