import { useState } from 'react';
import { MainEditor } from './components/MainEditor';
import { PromptManager } from './components/PromptManager';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('eixos');

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab alterada para:', tab);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-chatgpt-main/90 z-50 flex items-center justify-center">
      <MainEditor onClose={onClose} onTabChange={handleTabChange} />
      <PromptManager onPromptSelect={handlePromptSelect} activeTab={activeTab} />
    </div>
  );
};

export default FloatingEditor;