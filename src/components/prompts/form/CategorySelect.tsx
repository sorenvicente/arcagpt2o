import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "../PromptBlock";

interface CategorySelectProps {
  value: Category;
  onChange: (value: Category) => void;
}

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="category" className="text-sm font-medium text-[#D6BCFA]">
        Categoria
      </label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as Category)}
        required
      >
        <SelectTrigger className="bg-[#2F2F2F] border-[#7E69AB] text-white">
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent className="bg-[#2F2F2F] border-[#7E69AB]">
          <SelectItem value="proposito" className="text-white hover:bg-[#2A2B32]">Propósito</SelectItem>
          <SelectItem value="metodo" className="text-white hover:bg-[#2A2B32]">Método</SelectItem>
          <SelectItem value="mentoria" className="text-white hover:bg-[#2A2B32]">Mentoria</SelectItem>
          <SelectItem value="curso" className="text-white hover:bg-[#2A2B32]">Curso</SelectItem>
          <SelectItem value="conteudo" className="text-white hover:bg-[#2A2B32]">Conteúdo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelect;