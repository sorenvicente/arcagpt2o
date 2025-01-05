import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorToolbarProps {
  onFormatText: (format: string) => void;
  onAlignText: (alignment: string) => void;
  onSave: () => void;
}

export const EditorToolbar = ({ onFormatText, onAlignText, onSave }: EditorToolbarProps) => {
  return (
    <div className="flex items-center gap-2 px-4">
      <div className="flex items-center gap-1 border-r border-chatgpt-border pr-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onFormatText('bold')}
          className="h-8 w-8 p-0 rounded-full hover:bg-chatgpt-hover"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onFormatText('italic')}
          className="h-8 w-8 p-0 rounded-full hover:bg-chatgpt-hover"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onFormatText('underline')}
          className="h-8 w-8 p-0 rounded-full hover:bg-chatgpt-hover"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 border-r border-chatgpt-border pr-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onAlignText('left')}
          className="h-8 w-8 p-0 rounded-full hover:bg-chatgpt-hover"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onAlignText('center')}
          className="h-8 w-8 p-0 rounded-full hover:bg-chatgpt-hover"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onAlignText('right')}
          className="h-8 w-8 p-0 rounded-full hover:bg-chatgpt-hover"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSave}
          className="h-8 px-3 rounded-full hover:bg-chatgpt-hover"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
};