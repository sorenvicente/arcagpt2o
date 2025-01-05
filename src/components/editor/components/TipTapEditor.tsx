import { useRef, useEffect } from 'react';
import { EditorTitle } from './EditorTitle';

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
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <EditorTitle 
        title={title}
        onTitleChange={onTitleChange}
      />
      <div className="bg-chatgpt-main rounded-lg shadow-lg">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          className="min-h-[calc(100vh-200px)] text-white p-4 focus:outline-none whitespace-pre-wrap"
          style={{ 
            caretColor: 'white',
            lineHeight: '1.5'
          }}
        />
      </div>
    </div>
  );
};