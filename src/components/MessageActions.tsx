import { Volume2, ThumbsUp, ThumbsDown, Copy, RotateCcw, MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type MessageActionsProps = {
  content: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
};

const MessageActions = ({ content, onRegenerate, isRegenerating }: MessageActionsProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copiado!",
        description: "O conteúdo foi copiado para sua área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o conteúdo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2 text-gray-400">
      <button className="p-1 hover:text-white transition-colors">
        <Volume2 className="h-4 w-4" />
      </button>
      <button className="p-1 hover:text-white transition-colors">
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button className="p-1 hover:text-white transition-colors">
        <ThumbsDown className="h-4 w-4" />
      </button>
      <button 
        className="p-1 hover:text-white transition-colors"
        onClick={handleCopy}
        title="Copiar mensagem"
      >
        <Copy className="h-4 w-4" />
      </button>
      {onRegenerate && (
        <button 
          className={`p-1 transition-colors ${isRegenerating ? 'text-[#9b87f5] cursor-not-allowed opacity-50' : 'hover:text-white'}`}
          onClick={onRegenerate}
          disabled={isRegenerating}
          title="Regenerar resposta"
        >
          <RotateCcw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
        </button>
      )}
      <button className="p-1 hover:text-white transition-colors">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MessageActions;