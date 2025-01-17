import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconSelect } from "@/components/action-buttons/ActionButton";

interface ActionButtonFormProps {
  onSuccess?: () => void;
}

export function ActionButtonForm({ onSuccess }: ActionButtonFormProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("Target");
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("gray");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('action_buttons')
        .insert([
          { name, icon, label, category, color }
        ]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Botão criado com sucesso!",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erro ao criar botão:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o botão.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: VCL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">Ícone</Label>
        <IconSelect value={icon} onValueChange={setIcon} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ex: Video de Vendas"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Ex: vsl"
        />
      </div>

      <Button type="submit" className="w-full">
        Criar Botão
      </Button>
    </form>
  );
}