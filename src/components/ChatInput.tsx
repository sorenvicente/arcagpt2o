import { useState, useEffect } from "react";
import TextArea from "./chat-input/TextArea";
import SendButton from "./chat-input/SendButton";
import { useTextArea } from "@/hooks/useTextArea";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  onStop?: () => void;
}

const ChatInput = ({ onSend, isLoading = false, onStop }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { textareaRef, adjustTextareaHeight } = useTextArea(message);

  useEffect(() => {
    // Check localStorage on mount
    const savedContent = localStorage.getItem('editor-content');
    if (savedContent) {
      setMessage(savedContent);
      localStorage.removeItem('editor-content');
      
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.style.height = "200px";
        adjustTextareaHeight();
      }
    }

    // Add listener for custom event
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
  }, [adjustTextareaHeight]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      const trimmedMessage = message.trim();
      onSend(trimmedMessage);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
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
        <TextArea
          ref={textareaRef}
          value={message}
          onChange={setMessage}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <SendButton
          onClick={isLoading ? onStop! : handleSubmit}
          isLoading={isLoading}
          disabled={isLoading ? false : !message.trim()}
        />
      </div>
    </div>
  );
};

export default ChatInput;