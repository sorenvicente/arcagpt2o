import { useRef, useEffect, useState } from 'react';
import { ArrowDownCircle } from 'lucide-react';

interface ContentEditableAreaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContentEditableArea = ({ content, onContentChange }: ContentEditableAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [followCursor, setFollowCursor] = useState(true);
  let lastScrollPosition = 0;

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (!selection?.rangeCount) return;
      
      const range = selection.getRangeAt(0);
      
      // Create and insert line break
      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);
      
      // Add a space after the break
      const textNode = document.createTextNode('\u00a0');
      range.setStartAfter(br);
      range.insertNode(textNode);
      
      // Set cursor position
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);

      // Handle scroll position based on user preference
      if (followCursor && editorRef.current) {
        const cursorPosition = range.getBoundingClientRect().top;
        const editorTop = editorRef.current.getBoundingClientRect().top;
        const scrollOffset = cursorPosition - editorTop - 100; // 100px margin
        
        editorRef.current.scrollTop += scrollOffset;
      }
      
      handleInput();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setFollowCursor(!followCursor)}
        className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
          followCursor ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
        }`}
        title={followCursor ? 'Cursor following enabled' : 'Cursor following disabled'}
      >
        <ArrowDownCircle className="h-5 w-5" />
      </button>
      
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
    </div>
  );
};