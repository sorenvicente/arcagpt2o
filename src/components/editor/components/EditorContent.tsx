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

  useEffect(() => {
    if (editorRef.current) {
      // Preserva o conteúdo HTML
      editorRef.current.innerHTML = content;
      
      // Restaura a seleção do cursor
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;
        
        // Tenta restaurar a posição do cursor apenas se houver conteúdo
        if (editorRef.current.firstChild) {
          try {
            range.setStart(editorRef.current.firstChild, cursorPosition);
            range.setEnd(editorRef.current.firstChild, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(range);
          } catch (error) {
            console.log('Erro ao restaurar posição do cursor:', error);
          }
        }
      }
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    onContentChange(newContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Insere uma quebra de linha natural
      document.execCommand('insertLineBreak', false);
      
      // Atualiza o conteúdo após a quebra de linha
      if (editorRef.current) {
        onContentChange(editorRef.current.innerHTML);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Obtém o texto puro da área de transferência
    const text = e.clipboardData.getData('text/plain');
    
    // Insere o texto mantendo a formatação básica
    document.execCommand('insertText', false, text);
    
    // Atualiza o conteúdo após a colagem
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
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