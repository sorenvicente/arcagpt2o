import { forwardRef } from "react";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, onChange, onKeyDown, disabled }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Digite sua mensagem..."
        className="w-full resize-none rounded-xl px-4 py-4 pr-16
          bg-chatgpt-input text-white
          placeholder:text-gray-400"
        style={{ 
          maxHeight: "50vh",
          overflowY: "auto",
          paddingBottom: "40px"
        }}
        disabled={disabled}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;