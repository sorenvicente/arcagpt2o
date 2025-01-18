import { CustomActionButton } from "@/components/admin/action-buttons/CustomActionButton";

interface CustomButtonsSectionProps {
  customButtons: Array<{
    id: string;
    name: string;
    label: string;
    category: string;
    icon: string;
  }>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CustomButtonsSection = ({
  customButtons,
  onEdit,
  onDelete,
}: CustomButtonsSectionProps) => {
  return (
    <div className="col-span-full">
      <h2 className="text-xl font-semibold text-white mb-4">Botões Customizados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customButtons.map(button => (
          <CustomActionButton
            key={button.id}
            id={button.id}
            name={button.name}
            label={button.label}
            category={button.category}
            icon={button.icon}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomButtonsSection;