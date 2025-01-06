import { RefObject, useEffect } from 'react';

export const useContentSync = (
  editorRef: RefObject<HTMLDivElement>,
  content: string,
  onContentChange: (content: string) => void,
  saveSelection: () => void,
  restoreSelection: () => void
) => {
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerText) {
      const selection = window.getSelection();
      if (!selection) return;

      saveSelection();
      editorRef.current.innerText = content;
      restoreSelection();
    }
  }, [content, editorRef, saveSelection, restoreSelection]);

  const handleContentUpdate = () => {
    if (editorRef.current) {
      saveSelection();
      onContentChange(editorRef.current.innerText);
    }
  };

  return { handleContentUpdate };
};