import { useRef, useEffect } from 'react';

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
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleInput = () => {
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
        contentEditable
        onInput={handleInput}
        data-placeholder="Digite seu texto aqui..."
        className="w-full h-[calc(100%-12rem)] bg-transparent text-white outline-none rounded-lg overflow-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500"
      />
    </div>
  );
};