import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CategorySelect } from "./CategorySelect";

interface EditPromptFormProps {
  initialValues: {
    name: string;
    description: string;
    prompt: string;
    category: string;
  };
  isSubmitting: boolean;
  onSubmit: (values: {
    name: string;
    description: string;
    prompt: string;
    category: string;
  }) => void;
}

export function EditPromptForm({ initialValues, isSubmitting, onSubmit }: EditPromptFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [promptText, setPromptText] = useState(initialValues.prompt);
  const [category, setCategory] = useState(initialValues.category);

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      prompt: promptText,
      category,
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Nome do Prompt</label>
        <Input
          placeholder="Nome do Prompt"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Descrição</label>
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Prompt</label>
        <Textarea
          placeholder="Prompt"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="min-h-[100px] bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Categoria</label>
        <CategorySelect value={category} onValueChange={setCategory} />
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </div>
  );
}