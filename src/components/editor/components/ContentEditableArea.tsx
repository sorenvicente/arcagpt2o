import { useRef, useEffect } from 'react';

interface ContentEditableAreaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContentEditableArea = ({ content, onContentChange }: ContentEditableAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  let lastScrollPosition = 0;

  // Maintain scroll position when content changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.scrollTop = lastScrollPosition;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      lastScrollPosition = editorRef.current.scrollTop;
      onContentChange(editorRef.current.innerText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (!selection?.rangeCount) return;
      
      // Store current scroll and cursor position
      lastScrollPosition = editorRef.current?.scrollTop || 0;
      const range = selection.getRangeAt(0);
      
      // Create and insert line break
      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);
      
      // Add a space after the break to ensure proper cursor positioning
      const textNode = document.createTextNode('\u00a0');
      range.setStartAfter(br);
      range.insertNode(textNode);
      
      // Set cursor position after the space
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);

      // Ensure scroll position is maintained
      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.scrollTop = lastScrollPosition;
        }
      });
      
      handleInput();
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable="true"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
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
        caretColor: 'white',
        overscrollBehavior: 'none'
      }}
    >
      {content}
    </div>
  );
};