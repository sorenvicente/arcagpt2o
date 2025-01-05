import { RefObject, useEffect, useRef } from 'react';

export const useEditableContent = (
  editorRef: RefObject<HTMLDivElement>,
  content: string,
  onContentChange: (content: string) => void
) => {
  const lastCursorPosition = useRef<number>(0);
  const isUpdating = useRef(false);

  // Save cursor position before any content update
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      lastCursorPosition.current = range.startOffset;
    }
  };

  // Restore cursor position after content update
  const restoreCursorPosition = () => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection) return;

    try {
      const range = document.createRange();
      const textNode = editorRef.current.firstChild || editorRef.current;
      const position = Math.min(lastCursorPosition.current, textNode.textContent?.length || 0);
      
      range.setStart(textNode, position);
      range.setEnd(textNode, position);
      
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.log('Error restoring cursor position:', error);
    }
  };

  useEffect(() => {
    if (isUpdating.current) return;
    
    if (editorRef.current && content !== editorRef.current.innerText) {
      isUpdating.current = true;
      saveCursorPosition();
      editorRef.current.innerText = content;
      restoreCursorPosition();
      isUpdating.current = false;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current && !isUpdating.current) {
      saveCursorPosition();
      onContentChange(editorRef.current.innerText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const selection = window.getSelection();
      if (!selection || !editorRef.current) return;

      const range = selection.getRangeAt(0);
      const lineBreak = document.createTextNode('\n');
      range.insertNode(lineBreak);
      range.setStartAfter(lineBreak);
      range.setEndAfter(lineBreak);
      selection.removeAllRanges();
      selection.addRange(range);
      
      handleInput();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    const textNode = document.createTextNode(text);
    
    saveCursorPosition();
    range.deleteContents();
    range.insertNode(textNode);
    
    // Move cursor to end of pasted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    handleInput();
  };

  return {
    handleInput,
    handleKeyDown,
    handlePaste
  };
};