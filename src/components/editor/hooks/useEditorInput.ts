import { RefObject } from 'react';

export const useEditorInput = (
  editorRef: RefObject<HTMLDivElement>,
  onContentChange: (content: string) => void
) => {
  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  return { handleInput };
};