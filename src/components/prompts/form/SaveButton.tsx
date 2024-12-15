import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
    >
      Salvar Prompt
    </Button>
  );
};

export default SaveButton;