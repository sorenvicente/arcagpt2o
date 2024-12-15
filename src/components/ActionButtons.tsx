import { Book, Brain, Graduation, School, MessageSquare, Target } from "lucide-react";

const ActionButtons = () => {
  const actions = [
    { icon: <Target className="h-4 w-4 text-purple-400" />, label: "Propósito" },
    { icon: <Brain className="h-4 w-4 text-blue-400" />, label: "Método" },
    { icon: <School className="h-4 w-4 text-green-400" />, label: "Mentoria" },
    { icon: <Graduation className="h-4 w-4 text-yellow-400" />, label: "Curso" },
    { icon: <Book className="h-4 w-4 text-red-400" />, label: "Conteúdo" },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {actions.map((action) => (
        <button 
          key={action.label} 
          className="relative flex h-[42px] items-center gap-1.5 rounded-full border border-[#383737] px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;