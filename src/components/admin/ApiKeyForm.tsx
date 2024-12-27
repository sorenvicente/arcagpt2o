import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

#### Meta Llama 3.2 11B Vision Instruct
- Modelo mais recente da Meta
- Suporte a análise de imagens
- Excelente para instruções visuais

#### Google Gemini 2.9B
- Modelo do Google
- Rápido e eficiente
- Bom para tarefas gerais

#### Google Gemini Flash 1.5
- Versão otimizada do Gemini
- Resposta ultra-rápida
- Ideal para interações em tempo real

#### Meta Llama 3.1 70B Instruct
- Grande modelo de linguagem da Meta
- Excelente compreensão contextual
- Ótimo para tarefas complexas

#### Meta Llama 3.1 8B Instruct
- Versão compacta do Llama
- Boa relação performance/tamanho
- Ideal para dispositivos com recursos limitados

#### Meta Llama 3.1 405B Instruct
- Maior modelo da série Llama
- Capacidade excepcional de raciocínio
- Melhor qualidade de resposta

#### Nous Hermes 3 405B Instruct
- Modelo especializado em instruções
- Alta precisão nas respostas
- Excelente para tarefas específicas
`;

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showOpenRouter, setShowOpenRouter] = useState(false);
  const [selectedOpenAIModel, setSelectedOpenAIModel] = useState("gpt-4-turbo");
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState("meta-llama-3.2-11b");
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
            <Tabs defaultValue="models" className="w-full">
              <TabsList className="w-full bg-chatgpt-main border-chatgpt-border">
                <TabsTrigger value="models" className="w-full text-white">Modelos Disponíveis</TabsTrigger>
              </TabsList>
              <TabsContent value="models" className="mt-4">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{openAiMarkdown}</ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chatgpt-secondary border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">OpenRouter API Key</CardTitle>
          <CardDescription className="text-gray-400">
            Opcional - Acesso aos modelos Llama, Gemini e outros
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
            <Tabs defaultValue="models" className="w-full">
              <TabsList className="w-full bg-chatgpt-main border-chatgpt-border">
                <TabsTrigger value="models" className="w-full text-white">Modelos Disponíveis</TabsTrigger>
              </TabsList>
              <TabsContent value="models" className="mt-4">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{openRouterMarkdown}</ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
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