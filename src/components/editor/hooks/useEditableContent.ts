import { RefObject, useEffect, useRef } from 'react';

export const useEditableContent = (
  editorRef: RefObject<HTMLDivElement>,
  content: string,
  onContentChange: (content: string) => void
) => {
  const isComposing = useRef(false);
  const lastSelection = useRef<{ start: number; end: number }>({ start: 0, end: 0 });

  // Save selection state
  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    lastSelection.current = {
      start: range.startOffset,
      end: range.endOffset
    };
  };

  // Restore selection state
  const restoreSelection = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection) return;

    try {
      const range = document.createRange();
      let textNode = editorRef.current.firstChild;
      
      // If there's no text node, create one
      if (!textNode) {
        textNode = document.createTextNode('');
        editorRef.current.appendChild(textNode);
      }

      const start = Math.min(lastSelection.current.start, textNode.textContent?.length || 0);
      const end = Math.min(lastSelection.current.end, textNode.textContent?.length || 0);

      range.setStart(textNode, start);
      range.setEnd(textNode, end);
      
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.error('Error restoring selection:', error);
    }
  };

  // Handle content updates
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerText) {
      const selection = window.getSelection();
      if (!selection) return;

      saveSelection();
      editorRef.current.innerText = content;
      restoreSelection();
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isComposing.current) return;
    
    const newContent = e.currentTarget.innerText;
    if (content !== newContent) {
      saveSelection();
      onContentChange(newContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '    ');
      return;
    }

    // Handle standard keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
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
    
    // Get text content from clipboard
    const text = e.clipboardData.getData('text/plain');
    
    // Get current selection
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    
    // Get the range and delete any selected content
    const range = selection.getRangeAt(0);
    range.deleteContents();
    
    // Insert the text at cursor position
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    
    // Move cursor to end of pasted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Update content
    if (editorRef.current) {
      onContentChange(editorRef.current.innerText);
    }
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = () => {
    isComposing.current = false;
    if (editorRef.current) {
      onContentChange(editorRef.current.innerText);
    }
  };

  return {
    handleInput,
    handleKeyDown,
    handlePaste,
    handleCompositionStart,
    handleCompositionEnd
  };
};