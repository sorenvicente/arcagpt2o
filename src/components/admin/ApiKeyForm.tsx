import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

interface ApiKeyFormProps {
  keys: {
    openai_key: string;
    openrouter_key: string;
  };
  setKeys: React.Dispatch<React.SetStateAction<{
    openai_key: string;
    openrouter_key: string;
  }>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const openAiMarkdown = `
### Modelos Disponíveis:

#### GPT-4 Turbo
- Modelo mais recente e avançado
- Conhecimento atualizado até 2024
- Melhor compreensão de contexto
- Respostas mais precisas

#### GPT-4
- Alta qualidade e confiabilidade
- Excelente para tarefas complexas
- Forte capacidade de raciocínio

#### GPT-4 Vision
- Capacidade de análise de imagens
- Pode descrever e entender conteúdo visual
- Ideal para tarefas que combinam texto e imagem
`;

const openRouterMarkdown = `
### Modelos Disponíveis:

#### Claude 3 Opus
- Modelo mais avançado da Anthropic
- Excelente em análises detalhadas
- Respostas mais longas e elaboradas

#### Claude 2
- Alta qualidade e confiabilidade
- Bom para tarefas analíticas
- Respostas bem estruturadas

#### Llama 2
- Modelo open source da Meta
- Bom equilíbrio entre performance e custo
- Ideal para tarefas gerais

#### PaLM
- Modelo do Google
- Bom para processamento de linguagem natural
- Respostas concisas e objetivas
`;

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showOpenRouter, setShowOpenRouter] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keys.openai_key && !keys.openrouter_key) {
      toast({
        title: "Erro",
        description: "Por favor, forneça pelo menos uma chave API (OpenAI ou OpenRouter)",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-chatgpt-secondary border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">OpenAI API Key</CardTitle>
          <CardDescription className="text-gray-400">
            Opcional - Acesso ao GPT-4, GPT-4 Turbo e GPT-4 Vision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                id="openai"
                type={showOpenAI ? "text" : "password"}
                value={keys.openai_key}
                onChange={(e) => setKeys({ ...keys, openai_key: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-chatgpt-main border-chatgpt-border text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showOpenAI ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{openAiMarkdown}</ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chatgpt-secondary border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">OpenRouter API Key</CardTitle>
          <CardDescription className="text-gray-400">
            Opcional - Acesso ao Claude 3, Claude 2, Llama 2 e PaLM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                id="openrouter"
                type={showOpenRouter ? "text" : "password"}
                value={keys.openrouter_key}
                onChange={(e) => setKeys({ ...keys, openrouter_key: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-chatgpt-main border-chatgpt-border text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOpenRouter(!showOpenRouter)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showOpenRouter ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{openRouterMarkdown}</ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full bg-chatgpt-secondary hover:bg-chatgpt-hover text-white border border-chatgpt-border"
      >
        Salvar Chaves
      </Button>
    </form>
  );
};

export default ApiKeyForm;