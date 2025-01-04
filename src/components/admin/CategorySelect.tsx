import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function CategorySelect({ value, onValueChange }: CategorySelectProps) {
  const categories = [
    { value: "proposito", label: "Propósito" },
    { value: "metodo", label: "Método" },
    { value: "mentoria", label: "Mentoria" },
    { value: "curso", label: "Curso" },
    { value: "conteudo", label: "Conteúdo" },
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-chatgpt-input border-chatgpt-border text-white rounded-xl">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent className="bg-chatgpt-secondary border-chatgpt-border rounded-xl">
        {categories.map((cat) => (
          <SelectItem 
            key={cat.value} 
            value={cat.value}
            className="text-white hover:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
          >
            {cat.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}