import { Book, Brain, GraduationCap, School, Target, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ActionButton from "./ActionButton";
import CustomActionButtons from "./CustomActionButtons";
import { useActionButtons } from "./useActionButtons";

interface MainActionButtonsProps {
  activeCategory: string | null;
  onSelectPrompt: (category: string) => void;
  normalizeString: (str: string) => string;
}

const MainActionButtons = ({ activeCategory, onSelectPrompt, normalizeString }: MainActionButtonsProps) => {
  const [showMore, setShowMore] = useState(false);
  const { customButtons } = useActionButtons();

  const mainActions = [
    { icon: <Target className="h-4 w-4 text-purple-400" />, label: "Propósito", category: "proposito" },
    { icon: <Brain className="h-4 w-4 text-blue-400" />, label: "Método", category: "metodo" },
    { icon: <School className="h-4 w-4 text-green-400" />, label: "Mentoria", category: "mentoria" },
    { icon: <GraduationCap className="h-4 w-4 text-yellow-400" />, label: "Curso", category: "curso" },
    { icon: <Book className="h-4 w-4 text-red-400" />, label: "Conteúdo", category: "conteudo" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap justify-center">
        {mainActions.map((action) => (
          <ActionButton 
            key={action.category}
            icon={action.icon}
            label={action.label}
            isActive={normalizeString(activeCategory || '') === normalizeString(action.category)}
            onClick={() => onSelectPrompt(action.category)}
          />
        ))}
        <ActionButton 
          icon={showMore ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          label="Mais"
          isActive={false}
          onClick={() => setShowMore(!showMore)}
        />
      </div>
      {showMore && (
        <div className="flex gap-2 flex-wrap justify-center">
          <CustomActionButtons 
            buttons={customButtons}
            activeCategory={activeCategory}
            onSelectPrompt={onSelectPrompt}
            normalizeString={normalizeString}
          />
        </div>
      )}
    </div>
  );
};

export default MainActionButtons;