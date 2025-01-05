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
    if (editorRef.current) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const cursorPosition = range?.startOffset || 0;
      
      editorRef.current.innerHTML = content;
      
      // Restaura a posição do cursor após atualizar o conteúdo
      if (selection && range && editorRef.current.firstChild) {
        try {
          range.setStart(editorRef.current.firstChild, cursorPosition);
          range.setEnd(editorRef.current.firstChild, cursorPosition);
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (error) {
          console.log('Erro ao restaurar posição do cursor:', error);
        }
      }
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    onContentChange(newContent);
    console.log('Conteúdo atualizado:', newContent);
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
        data-placeholder="Digite seu texto aqui..."
        className="w-full h-[calc(100%-12rem)] bg-transparent text-white outline-none rounded-lg overflow-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500"
        suppressContentEditableWarning={true}
      />
    </div>
  );
};