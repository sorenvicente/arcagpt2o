import { Book, Brain, GraduationCap, School, Target } from "lucide-react";
import { useEffect, useState } from "react";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string) => void;
}

const ActionButtons = ({ onSelectPrompt }: ActionButtonsProps) => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadPrompts = () => {
      const savedPrompts = localStorage.getItem('prompts');
      if (savedPrompts) {
        setPrompts(JSON.parse(savedPrompts));
      }
    };

    loadPrompts();
    window.addEventListener('storage', loadPrompts);
    return () => window.removeEventListener('storage', loadPrompts);
  }, []);

  const handlePromptSelect = (category: string) => {
    setSelectedCategory(category);
    const selectedPrompt = prompts.find(p => p.category.toLowerCase() === category.toLowerCase());
    if (selectedPrompt) {
      onSelectPrompt(selectedPrompt.prompt);
      console.log('Selected prompt:', selectedPrompt.prompt); // Debug log
    }
  };

  const actions = [
    { icon: <Target className="h-4 w-4 text-purple-400" />, label: "Propósito", category: "propósito" },
    { icon: <Brain className="h-4 w-4 text-blue-400" />, label: "Método", category: "método" },
    { icon: <School className="h-4 w-4 text-green-400" />, label: "Mentoria", category: "mentoria" },
    { icon: <GraduationCap className="h-4 w-4 text-yellow-400" />, label: "Curso", category: "curso" },
    { icon: <Book className="h-4 w-4 text-red-400" />, label: "Conteúdo", category: "conteúdo" },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {actions.map((action) => (
        <button 
          key={action.label} 
          onClick={() => handlePromptSelect(action.category)}
          className={`relative flex h-[42px] items-center gap-1.5 rounded-full border border-[#383737] px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] cursor-pointer ${
            selectedCategory === action.category ? 'bg-chatgpt-secondary' : ''
          }`}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;