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
  const { 
    handleInput, 
    handleKeyDown, 
    handlePaste,
    handleCompositionStart,
    handleCompositionEnd
  } = useEditableContent(editorRef, content, onContentChange);

  // Auto-scroll to cursor position
  useEffect(() => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = editorRef.current.getBoundingClientRect();

      if (rect.bottom > containerRect.bottom) {
        editorRef.current.scrollTop += rect.bottom - containerRect.bottom + 20;
      } else if (rect.top < containerRect.top) {
        editorRef.current.scrollTop -= containerRect.top - rect.top + 20;
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
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      data-placeholder="Digite seu texto aqui..."
      className="w-full min-h-[calc(100vh-200px)] max-w-[800px] mx-auto 
        bg-transparent text-white outline-none rounded-lg overflow-y-auto 
        empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 
        whitespace-pre-wrap break-words p-6 leading-relaxed
        focus:outline-none selection:bg-blue-500/30"
      style={{
        minHeight: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
        fontSize: '16px',
        lineHeight: '1.6',
        letterSpacing: '0.3px',
        caretColor: 'white'
      }}
      suppressContentEditableWarning={true}
    />
  );
};