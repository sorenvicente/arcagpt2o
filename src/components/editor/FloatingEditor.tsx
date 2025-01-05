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
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    // Insere o prompt na posição do cursor
    setContent((prevContent) => {
      const beforeCursor = prevContent.substring(0, range.startOffset);
      const afterCursor = prevContent.substring(range.endOffset);
      return beforeCursor + prompt.prompt + afterCursor;
    });
    
    console.log('Prompt adicionado na posição do cursor:', prompt.prompt);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab alterada para:', tab);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-chatgpt-main/95 backdrop-blur-sm z-50 flex flex-col items-center">
      <div className="w-full max-w-[800px] mx-auto flex-1 overflow-hidden">
        <MainEditor 
          onClose={onClose} 
          onTabChange={handleTabChange}
          content={content}
          onContentChange={setContent}
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-chatgpt-main/95 backdrop-blur-sm border-t border-chatgpt-border">
        <PromptManager onPromptSelect={handlePromptSelect} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default FloatingEditor;