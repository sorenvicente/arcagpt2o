import { useEffect, useRef, useState } from 'react';

export const useRichTextEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!editorRef.current) return;

    const observer = new MutationObserver(() => {
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    });

    observer.observe(editorRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, []);

  const formatText = (command: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    
    switch (command) {
      case 'bold':
        span.style.fontWeight = 'bold';
        break;
      case 'italic':
        span.style.fontStyle = 'italic';
        break;
      case 'underline':
        span.style.textDecoration = 'underline';
        break;
    }

    range.surroundContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const alignText = (alignment: 'left' | 'center' | 'right') => {
    if (editorRef.current) {
      editorRef.current.style.textAlign = alignment;
    }
  };

  return {
    editorRef,
    content,
    formatText,
    alignText,
    setContent
  };
};