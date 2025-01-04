import { Pencil } from 'lucide-react';

interface EditButtonProps {
  onEdit: () => void;
  visible: boolean;
}

const EditButton = ({ onEdit, visible }: EditButtonProps) => {
  return (
    <div 
      className={`absolute -left-8 top-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        onClick={onEdit}
        className="group/tooltip relative p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
        aria-label="Editar texto"
      >
        <Pencil className="h-4 w-4" />
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white text-black text-xs px-2 py-1 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
          Editar texto
        </span>
      </button>
    </div>
  );
};

export default EditButton;