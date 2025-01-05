import { useRef, useEffect } from 'react';
import { EditorTitle } from './EditorTitle';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TipTapEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  title: string;
  onTitleChange: (title: string) => void;
}

export const TipTapEditor = ({ 
  content, 
  onUpdate, 
  title, 
  onTitleChange 
}: TipTapEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerText) {
      editorRef.current.innerText = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onUpdate(editorRef.current.innerText);
      console.log('Editor content updated:', editorRef.current.innerText);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  const handleAlign = (alignment: string) => {
    document.execCommand('justify' + alignment, false);
    editorRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '    ');
    }

    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          handleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormat('underline');
          break;
      }
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <EditorTitle 
        title={title}
        onTitleChange={onTitleChange}
      />
      <div className="bg-chatgpt-main rounded-lg shadow-lg">
        <div className="flex items-center gap-2 p-2 border-b border-gray-700">
          <div className="flex items-center gap-0.5 px-1 bg-chatgpt-secondary/50 rounded-lg py-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              onClick={() => handleFormat('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              onClick={() => handleFormat('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              onClick={() => handleFormat('underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-0.5 px-1 bg-chatgpt-secondary/50 rounded-lg py-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              onClick={() => handleAlign('Left')}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              onClick={() => handleAlign('Center')}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              onClick={() => handleAlign('Right')}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="min-h-[calc(100vh-200px)] text-white p-4 focus:outline-none"
          style={{ 
            caretColor: 'white',
            lineHeight: '1.5'
          }}
        />
      </div>
    </div>
  );
};