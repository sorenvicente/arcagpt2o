import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Save,
  Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorToolbarProps {
  onFormatText: (format: string) => void;
  onAlignText: (alignment: string) => void;
  onSave: () => void;
}

export const EditorToolbar = ({ onFormatText, onAlignText, onSave }: EditorToolbarProps) => {
  const currentColor = '#9b87f5'; // This will be the default color

  return (
    <div className="flex items-center gap-2 px-4">
      <div className="flex items-center gap-1 border-r border-chatgpt-border pr-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onFormatText('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onFormatText('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onFormatText('underline')}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 border-r border-chatgpt-border pr-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onAlignText('left')}
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onAlignText('center')}
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onAlignText('right')}
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <Circle 
            className="h-6 w-6" 
            style={{ color: currentColor }}
            fill={currentColor}
          />
          <div 
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full"
            style={{ backgroundColor: currentColor }}
          />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSave}
          className="h-8 px-3"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
};