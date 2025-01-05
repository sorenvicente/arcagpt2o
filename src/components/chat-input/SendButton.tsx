import { ArrowUp, StopCircle } from "lucide-react";

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
      className={`absolute right-4 bottom-3 p-2
        ${isLoading ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}
        rounded-full 
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg transition-colors duration-200`}
      title={isLoading ? "Parar geração" : "Enviar mensagem"}
    >
      {isLoading ? (
        <StopCircle className="h-4 w-4 text-white" />
      ) : (
        <ArrowUp className="h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default SendButton;