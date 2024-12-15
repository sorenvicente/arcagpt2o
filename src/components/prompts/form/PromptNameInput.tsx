import { Input } from "@/components/ui/input";

interface PromptNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptNameInput = ({ value, onChange }: PromptNameInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="name" className="text-sm font-medium text-white">
        Nome do Prompt
      </label>
      <Input
        id="name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite o nome do prompt"
        required
        className="bg-[#2F2F2F] border-gray-700 text-white placeholder:text-gray-400"
      />
    </div>
  );
};

export default PromptNameInput;