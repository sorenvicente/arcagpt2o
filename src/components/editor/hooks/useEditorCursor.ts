import { RefObject, useState } from 'react';

export const useEditorCursor = (editorRef: RefObject<HTMLDivElement>) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;

    const currentTime = new Date().getTime();
    
    // Reset click count if too much time has passed
    if (currentTime - lastClickTime > 500) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    setLastClickTime(currentTime);

    // Handle triple click
    if (clickCount === 2) {
      // Create a new range at the clicked position
      const range = document.createRange();
      const selection = window.getSelection();
      
      // Get the clicked position
      const x = e.clientX;
      const y = e.clientY;
      
      // Try to get the specific node and offset at click position
      const position = document.caretRangeFromPoint(x, y);
      
      if (position && selection) {
        // Set cursor at clicked position
        range.setStart(position.startContainer, position.startOffset);
        range.collapse(true);
        
        // Update selection
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Prevent text selection
        e.preventDefault();
      }
      
      // Reset click count
      setClickCount(0);
    }
  };

  return { handleClick };
};