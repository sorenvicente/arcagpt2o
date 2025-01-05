import { RefObject } from 'react';

export const useEditorCursor = (editorRef: RefObject<HTMLDivElement>) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;

    // Get the clicked position
    const x = e.clientX;
    const y = e.clientY;
    
    // Try to get the specific node and offset at click position
    const position = document.caretRangeFromPoint(x, y);
    
    if (position) {
      const selection = window.getSelection();
      if (selection) {
        // Create a new range
        const range = document.createRange();
        
        // Set cursor at clicked position
        range.setStart(position.startContainer, position.startOffset);
        range.collapse(true);
        
        // Update selection
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return { handleClick };
};