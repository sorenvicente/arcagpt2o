import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  models: { value: string; label: string }[];
  label: string;
}

const ModelSelector = ({ value, onChange, models, label }: ModelSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-chatgpt-main border-chatgpt-border text-white">
          <SelectValue placeholder="Selecione um modelo" />
        </SelectTrigger>
        <SelectContent className="bg-chatgpt-secondary border-chatgpt-border">
          {models.map((model) => (
            <SelectItem 
              key={model.value} 
              value={model.value}
              className="text-white hover:bg-chatgpt-hover cursor-pointer"
            >
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;