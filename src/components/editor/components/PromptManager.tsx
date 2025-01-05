import { useState, useEffect } from 'react';
import { usePrompts } from '../hooks/usePrompts';
import { PromptMenu } from './PromptMenu';

interface PromptManagerProps {
  onPromptSelect: (prompt: any) => void;
  activeTab: string;
}

export const PromptManager = ({ onPromptSelect, activeTab }: PromptManagerProps) => {
  const [promptInput, setPromptInput] = useState('');
  const [showPromptMenu, setShowPromptMenu] = useState(false);
  const { prompts, loadPrompts } = usePrompts();

  useEffect(() => {
    loadPrompts();
    console.log('Aba ativa:', activeTab);
  }, [activeTab]);

  const handlePromptInput = (value: string) => {
    setPromptInput(value);
    setShowPromptMenu(value.includes('//'));
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-3xl">
      <PromptMenu
        promptInput={promptInput}
        showPromptMenu={showPromptMenu}
        prompts={prompts}
        activeTab={activeTab}
        onPromptInputChange={handlePromptInput}
        onPromptSelect={onPromptSelect}
      />
    </div>
  );
};