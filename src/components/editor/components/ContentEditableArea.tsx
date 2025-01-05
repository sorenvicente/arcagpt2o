import { useRef, useEffect } from 'react';

interface ContentEditableAreaProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const ContentEditableArea = ({ content, onContentChange }: ContentEditableAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const startOffset = range?.startOffset || 0;
      
      editorRef.current.innerHTML = content;
      
      // Restore cursor position
      if (selection && range && editorRef.current.firstChild) {
        const newRange = document.createRange();
        newRange.setStart(editorRef.current.firstChild, Math.min(startOffset, content.length));
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;

    // Get click coordinates relative to the editor
    const rect = editorRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create a range from the click position
    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (!range) return;

    // Set the cursor at the clicked position
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }

    // Handle formatting shortcuts
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold', false);
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic', false);
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline', false);
          break;
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Get clipboard content
    const text = e.clipboardData.getData('text/plain');
    
    // Get current selection
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    
    // Insert at cursor position
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    
    // Move cursor to end of inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Update content
    handleInput();
  };

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