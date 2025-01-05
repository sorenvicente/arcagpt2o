import { Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, FileInput } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorToolbarProps {
  onFormatText: (format: string) => void;
  onAlignText: (alignment: string) => void;
}

export const EditorToolbar = ({ onFormatText, onAlignText }: EditorToolbarProps) => {
  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  const handleAlign = (alignment: string) => {
    document.execCommand('justify' + alignment, false);
  };

  return (
    <div className="flex items-center px-2 h-12">
      <div className="flex items-center gap-1 px-2 border-r border-chatgpt-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleFormat('undo')}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleFormat('redo')}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-1 px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleFormat('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleFormat('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleFormat('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-1 px-2 border-l border-r border-chatgpt-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleAlign('Left')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleAlign('Center')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-white rounded-lg"
          onClick={() => handleAlign('Right')}
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