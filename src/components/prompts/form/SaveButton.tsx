import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white"
    >
      Salvar Prompt
    </Button>
  );
};

export default SaveButton;