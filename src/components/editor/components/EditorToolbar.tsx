import { Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRichTextEditor } from '../hooks/useRichTextEditor';
import { useToast } from '@/hooks/use-toast';

interface EditorToolbarProps {
  content: string;
  onClose: () => void;
  title: string;
}

export const EditorToolbar = ({ content, onClose, title }: EditorToolbarProps) => {
  const { formatText, alignText } = useRichTextEditor();
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('editor-content', content);
    localStorage.setItem('editor-title', title);
    
    window.dispatchEvent(new CustomEvent('editor-content-saved', {
      detail: { 
        content: content,
        title: title || 'Novo documento'
      }
    }));
    
    toast({
      title: "Conteúdo salvo",
      description: "O texto foi transferido para a área de chat",
    });
    
    onClose();
  };

  return (
    <div className="flex items-center justify-between px-4 h-14">
      <div className="flex items-center space-x-1">
        <div className="flex items-center gap-0.5 px-1 bg-white/5 rounded-lg py-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => formatText('bold')}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => formatText('italic')}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => formatText('underline')}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-0.5 px-1 bg-white/5 rounded-lg py-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => alignText('left')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => alignText('center')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => alignText('right')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button 
        variant="ghost"
        size="sm" 
        className="h-8 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs px-4"
        onClick={handleSave}
      >
        Salvar
      </Button>
    </div>
  );
};