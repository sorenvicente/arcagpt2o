import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SaveButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const SaveButton = ({ onClick, isLoading }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Salvando...
        </>
      ) : (
        'Salvar Prompt'
      )}
    </Button>
  );
};

export default SaveButton;