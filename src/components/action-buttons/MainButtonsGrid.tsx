import { MainButton } from "./types";
import { ActionButton } from "./ActionButton";

const mainButtons: MainButton[] = [
  { name: "proposito", icon: "Target", label: "Propósito", category: "proposito", color: "purple" },
  { name: "metodo", icon: "Brain", label: "Método", category: "metodo", color: "blue" },
  { name: "mentoria", icon: "School", label: "Mentoria", category: "mentoria", color: "green" },
  { name: "curso", icon: "GraduationCap", label: "Curso", category: "curso", color: "yellow" },
  { name: "conteudo", icon: "Book", label: "Conteúdo", category: "conteudo", color: "red" },
];

interface MainButtonsGridProps {
  onMoreClick: () => void;
}

export function MainButtonsGrid({ onMoreClick }: MainButtonsGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
      {/* Mobile: Show all main buttons + More */}
      <div className="block sm:hidden col-span-3">
        <div className="grid grid-cols-3 gap-2">
          {mainButtons.map((button) => (
            <ActionButton
              key={button.name}
              name={button.name}
              icon={button.icon}
              label={button.label}
              category={button.category}
              color={button.color}
            />
          ))}
          <ActionButton
            name="more"
            icon="Plus"
            label="Mais"
            category="more"
            color="gray"
            onClick={onMoreClick}
          />
        </div>
      </div>

      {/* Desktop: Show all main buttons */}
      <div className="hidden sm:contents">
        {mainButtons.map((button) => (
          <ActionButton
            key={button.name}
            name={button.name}
            icon={button.icon}
            label={button.label}
            category={button.category}
            color={button.color}
          />
        ))}
        <ActionButton
          name="more"
          icon="Plus"
          label="Mais"
          category="more"
          color="gray"
          onClick={onMoreClick}
        />
      </div>
    </div>
  );
}