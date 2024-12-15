import React from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Prompt {
  id: number;
  name: string;
  description: string;
  prompt: string;
  category: string;
  createdAt: string;
}

export function PromptList() {
  const { toast } = useToast();
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);

  React.useEffect(() => {
    const loadPrompts = () => {
      const savedPrompts = localStorage.getItem('prompts');
      if (savedPrompts) {
        setPrompts(JSON.parse(savedPrompts));
      }
    };

    loadPrompts();
    // Adiciona um listener para atualizar a lista quando houver mudanças
    window.addEventListener('storage', loadPrompts);
    return () => window.removeEventListener('storage', loadPrompts);
  }, []);

  const handleDelete = (id: number) => {
    const updatedPrompts = prompts.filter(prompt => prompt.id !== id);
    localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    setPrompts(updatedPrompts);
    toast({
      title: "Prompt excluído",
      description: "O prompt foi removido com sucesso.",
    });
  };

  if (prompts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum prompt criado ainda.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <Card key={prompt.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{prompt.name}</CardTitle>
                <CardDescription>{prompt.category}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(prompt.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
            <p className="text-sm bg-gray-50 p-2 rounded">{prompt.prompt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}