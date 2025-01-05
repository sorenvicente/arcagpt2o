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
  const { handleInput, handleKeyDown, handlePaste } = useEditableContent(
    editorRef, 
    content, 
    onContentChange
  );

  // Scroll to bottom when content changes
  useEffect(() => {
    if (editorRef.current) {
      const shouldScroll = 
        editorRef.current.scrollHeight - editorRef.current.scrollTop === 
        editorRef.current.clientHeight;

      if (shouldScroll) {
        editorRef.current.scrollTop = editorRef.current.scrollHeight;
      }
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
      className="w-full min-h-[calc(100vh-200px)] max-w-[800px] mx-auto 
        bg-transparent text-white outline-none rounded-lg overflow-y-auto 
        empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 
        whitespace-pre-wrap break-words p-6"
      style={{
        minHeight: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
      }}
      suppressContentEditableWarning={true}
    />
  );
};