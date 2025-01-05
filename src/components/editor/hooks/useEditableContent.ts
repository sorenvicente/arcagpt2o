import { RefObject, useRef } from 'react';
import { useCursorPosition } from './useCursorPosition';
import { useContentSync } from './useContentSync';
import { useKeyboardHandling } from './useKeyboardHandling';

export const useEditableContent = (
  editorRef: RefObject<HTMLDivElement>,
  content: string,
  onContentChange: (content: string) => void
) => {
  const isComposing = useRef(false);
  
  const { saveSelection, restoreSelection } = useCursorPosition(editorRef);
  const { handleContentUpdate } = useContentSync(
    editorRef,
    content,
    onContentChange,
    saveSelection,
    restoreSelection
  );
  const { handleKeyDown, handlePaste } = useKeyboardHandling(
    editorRef,
    handleContentUpdate
  );

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isComposing.current) return;
    handleContentUpdate();
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = () => {
    isComposing.current = false;
    handleContentUpdate();
  };

  return {
    handleInput,
    handleKeyDown,
    handlePaste,
    handleCompositionStart,
    handleCompositionEnd
  };
};