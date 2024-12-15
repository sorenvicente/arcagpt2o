import { Textarea } from "@/components/ui/textarea";

interface PromptTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptTextArea = ({ value, onChange }: PromptTextAreaProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="prompt" className="text-sm font-medium text-[#D6BCFA]">
        Prompt
      </label>
      <Textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite o prompt"
        rows={4}
        required
        className="bg-[#2F2F2F] border-[#7E69AB] text-white placeholder:text-gray-400 min-h-[200px]"
      />
    </div>
  );
};

export default PromptTextArea;