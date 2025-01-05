import { RefObject } from 'react';

export const useEditorCursor = (editorRef: RefObject<HTMLDivElement>) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;

    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (!range) return;

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return { handleClick };
};