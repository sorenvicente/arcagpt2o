import { RefObject } from 'react';

export const useEditableContent = (
  editorRef: RefObject<HTMLDivElement>,
  content: string,
  onContentChange: (content: string) => void
) => {
  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }

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
    const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    // Clean up pasted content
    const cleanText = tempDiv.innerText;
    document.execCommand('insertText', false, cleanText);
  };

  return {
    handleInput,
    handleKeyDown,
    handlePaste
  };
};