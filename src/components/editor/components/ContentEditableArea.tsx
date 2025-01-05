import { useRef } from 'react';
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

  return (
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
  );
};