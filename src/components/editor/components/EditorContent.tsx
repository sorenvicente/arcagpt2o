import { useState } from 'react';

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
  return (
    <div className="flex-1 p-8 pt-20">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Digite seu título aqui..."
        className="w-full bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none mb-4 rounded-lg"
      />
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Digite seu texto aqui..."
        className="w-full h-[calc(100%-12rem)] bg-transparent text-white placeholder-gray-500 outline-none resize-none rounded-lg"
      />
    </div>
  );
};