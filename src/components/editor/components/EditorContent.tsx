import { useEffect, useRef } from 'react';

interface EditorContentProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const EditorContent = ({ 
  title, 
  content, 
  onTitleChange, 
  onContentChange 
}: EditorContentProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const start = range?.startOffset || 0;
      
      editorRef.current.innerHTML = content;
      
      if (selection && range && editorRef.current.firstChild) {
        try {
          const newRange = document.createRange();
          newRange.setStart(editorRef.current.firstChild, start);
          newRange.setEnd(editorRef.current.firstChild, start);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (error) {
          console.log('Erro ao restaurar posição do cursor:', error);
        }
      }
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Implementa Ctrl+Z
    if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.execCommand('undo');
      handleInput();
      return;
    }

    // Trata a tecla Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
      handleInput();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleInput();
  };

  return (
    <div className="flex-1 p-8 pt-20">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Digite seu título aqui..."
        className="w-full bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none mb-4 rounded-lg"
      />
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder="Digite seu texto aqui..."
        className="w-full h-[calc(100%-12rem)] bg-transparent text-white outline-none rounded-lg overflow-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 whitespace-pre-wrap"
        suppressContentEditableWarning={true}
      />
    </div>
  );
};