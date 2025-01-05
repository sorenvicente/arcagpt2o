import { useState, useRef, useEffect } from "react";
import { ArrowUp, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  useEffect(() => {
    // Verificar localStorage ao montar
    const savedContent = localStorage.getItem('editor-content');
    if (savedContent) {
      setMessage(savedContent);
      localStorage.removeItem('editor-content'); // Remove o conteúdo após carregar
      
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.style.height = "200px";
        adjustTextareaHeight();
      }
    }

    // Adicionar listener para o evento customizado
    const handleEditorContentSaved = (event: CustomEvent<{ content: string }>) => {
      setMessage(event.detail.content);
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.style.height = "200px";
        adjustTextareaHeight();
      }
    };

    window.addEventListener('editor-content-saved', handleEditorContentSaved as EventListener);

    return () => {
      window.removeEventListener('editor-content-saved', handleEditorContentSaved as EventListener);
    };
  }, []);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      const trimmedMessage = message.trim();
      onSend(trimmedMessage);
      setMessage(""); // Limpa o textarea após enviar
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset altura do textarea
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="w-full resize-none rounded-xl px-4 py-4 pr-16
            bg-chatgpt-input text-white
            placeholder:text-gray-400"
          style={{ 
            maxHeight: "50vh",
            overflowY: "auto",
            paddingBottom: "40px" // Espaço extra para o botão
          }}
          disabled={isLoading}
        />
        <button 
          onClick={handleSubmit}
          disabled={isLoading || !message.trim()}
          className="absolute right-4 bottom-3 p-2
            bg-gray-700 rounded-full 
            hover:bg-gray-600 
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-white animate-spin" />
          ) : (
            <ArrowUp className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;