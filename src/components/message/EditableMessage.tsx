import { useState, useEffect, useRef } from 'react';

interface EditableMessageProps {
  content: string;
  onSave: (content: string) => void;
}

const EditableMessage = ({ content, onSave }: EditableMessageProps) => {
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Calculate the content height
      const contentHeight = textareaRef.current.scrollHeight;
      
      // Set a reasonable max height that still allows good navigation
      const maxHeight = Math.min(contentHeight, window.innerHeight * 0.4);
      
      textareaRef.current.style.height = `${maxHeight}px`;
      
      // Focus and move cursor to end
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        editedContent.length,
        editedContent.length
      );
    }
  }, [content, editedContent]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSave(editedContent);
    }
    if (e.key === 'Escape') {
      setEditedContent(content);
      onSave(content);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
      onBlur={() => onSave(editedContent)}
      onKeyDown={handleKeyDown}
      className="w-full min-w-[300px] bg-transparent outline-none resize-none 
        overflow-y-auto min-h-[24px] p-2 rounded-lg text-white
        focus:bg-gray-700/30 transition-colors"
      style={{
        maxWidth: '100%',
        maxHeight: '40vh',
        width: 'auto',
      }}
      autoFocus
    />
  );
};

export default EditableMessage;