import { EditorToolbar } from './EditorToolbar';
import { useToast } from '@/components/ui/use-toast';

interface FloatingToolbarProps {
  content: string;
  setContent: (content: string) => void;
}

export const FloatingToolbar = ({ content, setContent }: FloatingToolbarProps) => {
  const { toast } = useToast();

  const handleFormatText = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const handleAlignText = (alignment: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const textBeforeCursor = content.substring(0, start);
    const textAfterCursor = content.substring(start);
    
    const lastNewLine = textBeforeCursor.lastIndexOf('\n');
    const lineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
    
    const nextNewLine = textAfterCursor.indexOf('\n');
    const lineEnd = nextNewLine === -1 ? content.length : start + nextNewLine;
    
    const currentLine = content.substring(lineStart, lineEnd);
    
    let alignedLine = '';
    switch (alignment) {
      case 'left':
        alignedLine = currentLine.replace(/^(\s*)(.*?)(\s*)$/, '$2');
        break;
      case 'center':
        alignedLine = currentLine.replace(/^(\s*)(.*?)(\s*)$/, '    $2    ');
        break;
      case 'right':
        alignedLine = currentLine.replace(/^(\s*)(.*?)(\s*)$/, '        $2');
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, lineStart) + alignedLine + content.substring(lineEnd);
    setContent(newContent);
  };

  const handleSave = () => {
    toast({
      title: "Sucesso",
      description: "Conteúdo salvo com sucesso!",
    });
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg z-10">
      <div className="py-4">
        <EditorToolbar 
          onFormatText={handleFormatText}
          onAlignText={handleAlignText}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};