import { Book, Brain, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string) => void;
}

const ActionButtons = ({ onSelectPrompt }: ActionButtonsProps) => {
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    const savedPrompts = localStorage.getItem('prompts');
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    }
  }, []);

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {prompts.map((prompt) => (
        <button 
          key={prompt.name} 
          onClick={() => onSelectPrompt(prompt.prompt)}
          className="relative flex h-[42px] items-center gap-1.5 rounded-full border border-[#383737] px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"
        >
          {prompt.category === 'purpose' && <Brain className="h-4 w-4 text-purple-400" />}
          {prompt.category === 'content' && <Book className="h-4 w-4 text-red-400" />}
          {prompt.category === 'other' && <MessageSquare className="h-4 w-4 text-blue-400" />}
          {prompt.name}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;