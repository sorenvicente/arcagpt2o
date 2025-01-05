import { RefObject, useEffect } from 'react';

export const useEditorSync = (
  editorRef: RefObject<HTMLDivElement>,
  content: string
) => {
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const startOffset = range?.startOffset || 0;
      
      editorRef.current.innerHTML = content;
      
      if (selection && range && editorRef.current.firstChild) {
        const newRange = document.createRange();
        newRange.setStart(editorRef.current.firstChild, Math.min(startOffset, content.length));
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [content]);
};