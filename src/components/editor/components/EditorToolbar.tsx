import { 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon, 
  FileInput 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorToolbarProps {
  onFormatText?: (format: string) => void;
  onAlignText?: (alignment: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onAddLink?: () => void;
  onAddFile?: () => void;
  onSave?: () => void;
}

export const EditorToolbar = ({
  onFormatText = () => {},
  onAlignText = () => {},
  onUndo = () => {},
  onRedo = () => {},
  onAddLink = () => {},
  onAddFile = () => {},
  onSave = () => {},
}: EditorToolbarProps) => {
  return (
    <div className="flex items-center px-2 h-10 bg-chatgpt-secondary/95 backdrop-blur-sm">
      <select 
        className="bg-transparent text-white border-none outline-none mr-4 text-sm rounded-lg"
        defaultValue="paragraph"
      >
        <option value="paragraph">Parágrafo</option>
        <option value="h1">Título 1</option>
        <option value="h2">Título 2</option>
        <option value="h3">Título 3</option>
      </select>
      
      <div className="flex items-center gap-0.5 px-2 border-r border-chatgpt-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onUndo()}
        >
          <Undo className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onRedo()}
        >
          <Redo className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-0.5 px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onFormatText('bold')}
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onFormatText('italic')}
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onFormatText('underline')}
        >
          <Underline className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-0.5 px-2 border-l border-r border-chatgpt-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onAlignText('left')}
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onAlignText('center')}
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={() => onAlignText('right')}
        >
          <AlignRight className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-0.5 px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={onAddLink}
        >
          <LinkIcon className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-white rounded-lg"
          onClick={onAddFile}
        >
          <FileInput className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="ml-auto">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onSave}
          className="h-7 text-sm font-medium rounded-lg px-3"
        >
          Salvar
        </Button>
      </div>
    </div>
  );
};