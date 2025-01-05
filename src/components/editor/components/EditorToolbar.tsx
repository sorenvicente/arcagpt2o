import { Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRichTextEditor } from '../hooks/useRichTextEditor';
import { useToast } from '@/hooks/use-toast';

interface EditorToolbarProps {
  content: string;
  onClose: () => void;
}

export const EditorToolbar = ({ content, onClose }: EditorToolbarProps) => {
  const { formatText, alignText } = useRichTextEditor();
  const { toast } = useToast();

  const handleSave = () => {
    // Agora salvamos o conteúdo com a formatação HTML
    localStorage.setItem('editor-content', content);
    
    // Dispatch custom event com o conteúdo formatado
    window.dispatchEvent(new CustomEvent('editor-content-saved', {
      detail: { content: content }
    }));
    
    toast({
      title: "Conteúdo salvo",
      description: "O texto foi transferido para a área de chat",
    });
    
    onClose();
  };

  return (
    <div className="flex items-center px-2 h-10">
      <div className="flex items-center gap-0.5 px-1 bg-white/5 rounded-xl py-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          onClick={() => formatText('bold')}
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          onClick={() => formatText('italic')}
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          onClick={() => formatText('underline')}
        >
          <Underline className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-0.5 px-1 mx-0.5 bg-white/5 rounded-xl py-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          onClick={() => alignText('left')}
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          onClick={() => alignText('center')}
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          onClick={() => alignText('right')}
        >
          <AlignRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="ml-auto">
        <Button 
          variant="ghost"
          size="sm" 
          className="h-7 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs px-4"
          onClick={handleSave}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
};