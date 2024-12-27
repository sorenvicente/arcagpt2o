import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModelInfoProps {
  markdown: string;
}

const ModelInfo = ({ markdown }: ModelInfoProps) => {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="w-full bg-chatgpt-main border-chatgpt-border">
        <TabsTrigger value="info" className="w-full text-white">
          Informações do Modelo
        </TabsTrigger>
      </TabsList>
      <TabsContent value="info" className="mt-4">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ModelInfo;