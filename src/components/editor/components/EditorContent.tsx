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
      
      // Preserve cursor position
      const cursorPosition = range?.startOffset || 0;
      const cursorNode = range?.startContainer;
      
      // Update content
      editorRef.current.innerHTML = content;
      
      // Restore cursor position
      if (selection && cursorNode && editorRef.current.contains(cursorNode)) {
        try {
          const newRange = document.createRange();
          newRange.setStart(cursorNode, cursorPosition);
          newRange.setEnd(cursorNode, cursorPosition);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (error) {
          console.log('Error restoring cursor position:', error);
        }
      }
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    onContentChange(newContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      
      if (selection && range) {
        // Insert line break at cursor position
        const br = document.createElement('br');
        range.deleteContents();
        range.insertNode(br);
        
        // Create and insert a new text node after the break
        const textNode = document.createTextNode('');
        range.setStartAfter(br);
        range.insertNode(textNode);
        
        // Move cursor to new line
        range.setStart(textNode, 0);
        range.setEnd(textNode, 0);
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Update content
        if (editorRef.current) {
          onContentChange(editorRef.current.innerHTML);
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    if (selection && range) {
      range.deleteContents();
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      
      // Move cursor to end of pasted text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
      
      if (editorRef.current) {
        onContentChange(editorRef.current.innerHTML);
      }
    }
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
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder="Digite seu texto aqui..."
        className="w-full h-[calc(100%-12rem)] bg-transparent text-white outline-none rounded-lg overflow-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 whitespace-pre-wrap"
        suppressContentEditableWarning={true}
      />
    </div>
  );
};