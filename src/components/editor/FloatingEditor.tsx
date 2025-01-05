import { useState } from 'react';
import { MainEditor } from './components/MainEditor';
import { PromptManager } from './components/PromptManager';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  const [content, setContent] = useState('');

  const handlePromptSelect = (prompt: any) => {
    setContent((prevContent) => {
      const cursorPosition = document.activeElement instanceof HTMLTextAreaElement 
        ? document.activeElement.selectionStart 
        : prevContent.length;

      const newContent = prevContent.slice(0, cursorPosition) + 
        prompt.prompt + 
        prevContent.slice(cursorPosition);

      return newContent;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-chatgpt-main/90 z-50 flex items-center justify-center">
      <MainEditor onClose={onClose} />
      <PromptManager onPromptSelect={handlePromptSelect} />
    </div>
  );
};

export default FloatingEditor;