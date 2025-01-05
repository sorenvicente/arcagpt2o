import { ArrowUp, Square } from "lucide-react";

interface SendButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const SendButton = ({ onClick, isLoading, disabled }: SendButtonProps) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="absolute right-4 bottom-3 p-2
        bg-gray-700 rounded-full 
        hover:bg-gray-600 
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg"
      title={isLoading ? "Parar geração" : "Enviar mensagem"}
    >
      {isLoading ? (
        <Square className="h-5 w-5 text-white" />
      ) : (
        <ArrowUp className="h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default SendButton;