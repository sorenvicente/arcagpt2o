import { CustomButton } from "./types";
import { ActionButton } from "./ActionButton";

interface CustomButtonsGridProps {
  customButtons: CustomButton[];
  show: boolean;
}

export function CustomButtonsGrid({ customButtons, show }: CustomButtonsGridProps) {
  if (!show || customButtons.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-2">
      {customButtons.map((button) => (
        <ActionButton
          key={button.id}
          name={button.name}
          icon={button.icon}
          label={button.label}
          category={button.category}
          color={button.color}
        />
      ))}
    </div>
  );
}