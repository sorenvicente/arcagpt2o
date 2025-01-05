import { useRef } from 'react';
import { useEditorInput } from '../hooks/useEditorInput';
import { useEditorCursor } from '../hooks/useEditorCursor';
import { useEditorKeyboard } from '../hooks/useEditorKeyboard';
import { useEditorSync } from '../hooks/useEditorSync';

interface ContentEditableAreaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContentEditableArea = ({ content, onContentChange }: ContentEditableAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  const { handleInput } = useEditorInput(editorRef, onContentChange);
  const { handleClick } = useEditorCursor(editorRef);
  const { handleKeyDown, handlePaste } = useEditorKeyboard(editorRef, onContentChange);
  
  useEditorSync(editorRef, content);

  return (
    <div
      ref={editorRef}
      contentEditable="true"
      onInput={handleInput}
      onClick={handleClick}
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
        caretColor: 'white',
        cursor: 'text'
      }}
      suppressContentEditableWarning={true}
    />
  );
};