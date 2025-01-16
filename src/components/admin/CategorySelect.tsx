import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  existingCategories?: string[];
}

interface CustomButton {
  category: string;
  label: string;
}

export function CategorySelect({ value, onValueChange, existingCategories = [] }: CategorySelectProps) {
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([]);

  useEffect(() => {
    const loadCustomButtons = async () => {
      const { data, error } = await supabase
        .from('action_buttons')
        .select('category, label')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setCustomButtons(data);
      }
    };

    loadCustomButtons();

    // Subscribe to changes
    const channel = supabase
      .channel('custom-buttons-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'action_buttons'
        },
        () => {
          loadCustomButtons();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const categories = [
    { value: "proposito", label: "Propósito" },
    { value: "metodo", label: "Método" },
    { value: "mentoria", label: "Mentoria" },
    { value: "curso", label: "Curso" },
    { value: "conteudo", label: "Conteúdo" },
    { value: "personalizar_chatgpt", label: "Personalizar ChatGPT" },
    { value: "eixos", label: "Eixos" },
    { value: "blocos", label: "Blocos" },
    // Adiciona os botões customizados
    ...customButtons.map(button => ({
      value: button.category.toLowerCase(),
      label: button.label
    }))
  ];

  // Filter out "Personalizar ChatGPT" if it already exists
  const availableCategories = categories.filter(cat => {
    if (cat.value === "personalizar_chatgpt") {
      return !existingCategories.includes("personalizar_chatgpt");
    }
    return true;
  });

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-chatgpt-input border-chatgpt-border text-white rounded-xl">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent className="bg-chatgpt-secondary border-chatgpt-border rounded-xl max-h-[300px]">
        <div className="overflow-y-auto">
          {availableCategories.map((cat) => (
            <SelectItem 
              key={cat.value} 
              value={cat.value}
              className="text-white hover:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
            >
              {cat.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}