import { useRef, useEffect } from 'react';
import { useEditableContent } from '../hooks/useEditableContent';

interface ContentEditableAreaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContentEditableArea = ({ content, onContentChange }: ContentEditableAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }

    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold', false);
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic', false);
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline', false);
          break;
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    // Clean up pasted content
    const cleanText = tempDiv.innerText;
    document.execCommand('insertText', false, cleanText);
  };

  return (
    <div
      ref={editorRef}
      contentEditable="true"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      data-placeholder="Digite seu texto aqui..."
      className="w-full min-h-[calc(100vh-200px)] max-w-[800px] mx-auto 
        bg-transparent text-white outline-none rounded-lg overflow-y-auto 
        empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 
        whitespace-pre-wrap break-words p-6
        focus:outline-none selection:bg-blue-500/30"
      style={{
        minHeight: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
        fontSize: '16px',
        lineHeight: '1.8',
        letterSpacing: '0.3px',
        caretColor: 'white'
      }}
      suppressContentEditableWarning={true}
    />
  );
};