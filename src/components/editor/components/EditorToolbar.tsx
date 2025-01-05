import { Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRichTextEditor } from '../hooks/useRichTextEditor';

export const EditorToolbar = () => {
  const { formatText, alignText } = useRichTextEditor();

  return (
    <div className="flex items-center px-2 h-10">
      <div className="flex items-center gap-1 px-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => formatText('bold')}
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => formatText('italic')}
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => formatText('underline')}
        >
          <Underline className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-1 px-1 border-l border-r border-chatgpt-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => alignText('left')}
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => alignText('center')}
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => alignText('right')}
        >
          <AlignRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="ml-auto">
        <Button variant="secondary" size="sm" className="h-7 rounded-lg text-xs">
          Salvar
        </Button>
      </div>
    </div>
  );
};