import { useRef, useEffect } from 'react';
import { useEditableContent } from '../hooks/useEditableContent';

interface ContentEditableAreaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContentEditableArea = ({ 
  content, 
  onContentChange 
}: ContentEditableAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { handleInput, handleKeyDown, handlePaste } = useEditableContent(editorRef, content, onContentChange);

  // Função para rolar até o final quando o conteúdo mudar
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.scrollTop = editorRef.current.scrollHeight;
    }
  }, [content]);

  return (
    <div
      ref={editorRef}
      contentEditable="true"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      data-placeholder="Digite seu texto aqui..."
      className="w-full h-[calc(100vh-280px)] bg-transparent text-white outline-none rounded-lg overflow-y-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 whitespace-pre-wrap p-4"
      suppressContentEditableWarning={true}
    />
  );
};