import { RefObject, useRef } from 'react';

interface SelectionState {
  start: number;
  end: number;
}

export const useCursorPosition = (editorRef: RefObject<HTMLDivElement>) => {
  const lastSelection = useRef<SelectionState>({ start: 0, end: 0 });

  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    lastSelection.current = {
      start: range.startOffset,
      end: range.endOffset
    };
  };

  const restoreSelection = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection) return;

    try {
      const range = document.createRange();
      let textNode = editorRef.current.firstChild;
      
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

  return {
    saveSelection,
    restoreSelection,
    lastSelection
  };
};