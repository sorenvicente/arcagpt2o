import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateActionButtonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AVAILABLE_ICONS = [
  { value: "Target", label: "Target" },
  { value: "Brain", label: "Brain" },
  { value: "School", label: "School" },
  { value: "GraduationCap", label: "Graduation Cap" },
  { value: "Book", label: "Book" },
];

const AVAILABLE_COLORS = [
  { value: "purple", label: "Roxo" },
  { value: "blue", label: "Azul" },
  { value: "green", label: "Verde" },
  { value: "yellow", label: "Amarelo" },
  { value: "red", label: "Vermelho" },
];

export function CreateActionButtonDialog({ open, onOpenChange }: CreateActionButtonDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('action_buttons')
        .insert([
          {
            name,
            icon,
            label,
            category: category.toLowerCase(),
            color,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Botão criado com sucesso.",
      });

      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error('Error creating button:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o botão.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setIcon("");
    setLabel("");
    setCategory("");
    setColor("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-chatgpt-secondary border-chatgpt-border text-white">
        <DialogHeader>
          <DialogTitle>Criar Novo Botão de Ação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Interno</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-chatgpt-input border-chatgpt-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Ícone</Label>
            <Select value={icon} onValueChange={setIcon} required>
              <SelectTrigger className="bg-chatgpt-input border-chatgpt-border">
                <SelectValue placeholder="Selecione um ícone" />
              </SelectTrigger>
              <SelectContent className="bg-chatgpt-secondary border-chatgpt-border">
                {AVAILABLE_ICONS.map((icon) => (
                  <SelectItem 
                    key={icon.value} 
                    value={icon.value}
                    className="text-white hover:bg-chatgpt-hover cursor-pointer"
                  >
                    {icon.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Label do Botão</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="bg-chatgpt-input border-chatgpt-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-chatgpt-input border-chatgpt-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Cor</Label>
            <Select value={color} onValueChange={setColor} required>
              <SelectTrigger className="bg-chatgpt-input border-chatgpt-border">
                <SelectValue placeholder="Selecione uma cor" />
              </SelectTrigger>
              <SelectContent className="bg-chatgpt-secondary border-chatgpt-border">
                {AVAILABLE_COLORS.map((color) => (
                  <SelectItem 
                    key={color.value} 
                    value={color.value}
                    className="text-white hover:bg-chatgpt-hover cursor-pointer"
                  >
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-chatgpt-border hover:bg-chatgpt-hover"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-chatgpt-secondary hover:bg-chatgpt-hover"
            >
              {isLoading ? "Criando..." : "Criar Botão"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}