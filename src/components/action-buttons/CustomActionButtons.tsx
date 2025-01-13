import { Target, Brain, School, GraduationCap, Book } from "lucide-react";
import { ReactNode } from "react";
import ActionButton from "./ActionButton";

interface CustomActionButtonsProps {
  buttons: Array<{
    id: string;
    icon: string;
    label: string;
    category: string;
  }>;
  activeCategory: string | null;
  onSelectPrompt: (category: string) => void;
  normalizeString: (str: string) => string;
}

const CustomActionButtons = ({ 
  buttons, 
  activeCategory, 
  onSelectPrompt, 
  normalizeString 
}: CustomActionButtonsProps) => {
  const getIconComponent = (iconName: string): ReactNode => {
    const icons = {
      Target: <Target className="h-4 w-4" />,
      Brain: <Brain className="h-4 w-4" />,
      School: <School className="h-4 w-4" />,
      GraduationCap: <GraduationCap className="h-4 w-4" />,
      Book: <Book className="h-4 w-4" />,
    };
    return icons[iconName as keyof typeof icons] || <Target className="h-4 w-4" />;
  };

  if (!buttons.length) return null;

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {buttons.map((button) => (
        <ActionButton
          key={button.id}
          icon={getIconComponent(button.icon)}
          label={button.label}
          isActive={normalizeString(activeCategory || '') === normalizeString(button.category)}
          onClick={() => onSelectPrompt(button.category)}
        />
      ))}
    </div>
  );
};

export default CustomActionButtons;