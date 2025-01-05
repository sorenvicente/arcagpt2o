import { useEffect, useRef } from 'react';

interface EditorContentProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const EditorContent = ({ 
  title, 
  content, 
  onTitleChange, 
  onContentChange 
}: EditorContentProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastCaretPosition = useRef<number>(0);

  useEffect(() => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (!selection) return;

      // Mantém o conteúdo e a posição do cursor
      const currentPosition = lastCaretPosition.current;
      editorRef.current.innerHTML = content;

      try {
        // Restaura a posição do cursor
        const range = document.createRange();
        const textNode = editorRef.current.firstChild || editorRef.current;
        const position = Math.min(currentPosition, textNode.textContent?.length || 0);
        
        range.setStart(textNode, position);
        range.setEnd(textNode, position);
        
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (error) {
        console.log('Erro ao restaurar posição do cursor:', error);
      }
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    onContentChange(newContent);
    
    // Salva a posição atual do cursor
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      lastCaretPosition.current = selection.getRangeAt(0).startOffset;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Implementa Ctrl+Z
    if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.execCommand('undo');
      return;
    }

    // Trata a tecla Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (!selection || !editorRef.current) return;
      
      const range = selection.getRangeAt(0);
      const br = document.createElement('br');
      
      // Insere a quebra de linha
      range.insertNode(br);
      
      // Move o cursor para depois da quebra de linha
      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
      
      // Atualiza o conteúdo
      onContentChange(editorRef.current.innerHTML);
      
      // Salva a nova posição do cursor
      lastCaretPosition.current = range.startOffset;
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;
    
    const range = selection.getRangeAt(0);
    const textNode = document.createTextNode(text);
    
    range.deleteContents();
    range.insertNode(textNode);
    
    // Move o cursor para o final do texto colado
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Atualiza o conteúdo e salva a posição do cursor
    onContentChange(editorRef.current.innerHTML);
    lastCaretPosition.current = range.startOffset;
  };

  return (
    <div className="flex-1 p-8 pt-20">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Digite seu título aqui..."
        className="w-full bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none mb-4 rounded-lg"
      />
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder="Digite seu texto aqui..."
        className="w-full h-[calc(100%-12rem)] bg-transparent text-white outline-none rounded-lg overflow-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 whitespace-pre-wrap"
        suppressContentEditableWarning={true}
      />
    </div>
  );
};