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
      // Se já existe conteúdo, adiciona uma quebra de linha antes do novo prompt
      const separator = prevContent ? '\n' : '';
      return prevContent + separator + prompt.prompt;
    });
    console.log('Prompt adicionado:', prompt.prompt);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab alterada para:', tab);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-chatgpt-main/90 z-50 flex items-center justify-center">
      <MainEditor 
        onClose={onClose} 
        onTabChange={handleTabChange}
        content={content}
        onContentChange={setContent}
      />
      <PromptManager onPromptSelect={handlePromptSelect} activeTab={activeTab} />
    </div>
  );
};

export default FloatingEditor;