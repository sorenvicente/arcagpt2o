import { Input } from "@/components/ui/input";

interface PromptDescriptionInputProps {
  value: string | null;
  onChange: (value: string) => void;
}

const PromptDescriptionInput = ({ value, onChange }: PromptDescriptionInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="description" className="text-sm font-medium text-white">
        Descrição
      </label>
      <Input
        id="description"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite uma breve descrição"
        className="bg-[#2F2F2F] border-gray-700 text-white placeholder:text-gray-400"
      />
    </div>
  );
};

export default PromptDescriptionInput;