import { RefObject, useEffect } from 'react';

export const useEditableContent = (
  editorRef: RefObject<HTMLDivElement>,
  content: string,
  onContentChange: (content: string) => void
) => {
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const start = range?.startOffset || 0;
      
      editorRef.current.innerHTML = content;
      
      if (selection && range && editorRef.current.firstChild) {
        try {
          const newRange = document.createRange();
          newRange.setStart(editorRef.current.firstChild, start);
          newRange.setEnd(editorRef.current.firstChild, start);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (error) {
          console.log('Erro ao restaurar posição do cursor:', error);
        }
      }
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.execCommand('undo');
      handleInput();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
      handleInput();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    
    // Pega a seleção atual
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    
    // Insere o texto na posição atual do cursor
    const textNode = document.createTextNode(text);
    range.deleteContents();
    range.insertNode(textNode);
    
    // Move o cursor para o final do texto colado
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    handleInput();
  };

  return {
    handleInput,
    handleKeyDown,
    handlePaste
  };
};