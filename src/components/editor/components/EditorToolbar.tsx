import { Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRichTextEditor } from '../hooks/useRichTextEditor';

export const EditorToolbar = () => {
  const { formatText, alignText } = useRichTextEditor();

  return (
    <div className="flex items-center px-2 h-12">
      <div className="flex items-center gap-1 px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => formatText('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => formatText('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => formatText('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-1 px-2 border-l border-r border-chatgpt-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => alignText('left')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => alignText('center')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => alignText('right')}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="ml-auto">
        <Button variant="secondary" size="sm" className="h-8 rounded-lg">
          Salvar
        </Button>
      </div>
    </div>
  );
};