import { useRef } from 'react';

interface ContentEditableAreaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContentEditableArea = ({ content, onContentChange }: ContentEditableAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerText);
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable="true"
      onInput={handleInput}
      suppressContentEditableWarning={true}
      className="w-full min-h-[calc(100vh-200px)] max-w-[800px] mx-auto 
        bg-transparent text-white outline-none rounded-lg overflow-y-auto 
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
    >
      {content}
    </div>
  );
};