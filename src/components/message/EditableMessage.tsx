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
      
      // If content is very long (more than 500px), set height to half of content
      // Otherwise, show full content
      const finalHeight = contentHeight > 500 ? contentHeight / 2 : contentHeight;
      
      textareaRef.current.style.height = `${finalHeight}px`;
    }
  }, [content]);

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
      className="w-full bg-transparent outline-none resize-none overflow-y-auto min-h-[24px] p-0"
      style={{ maxHeight: '70vh' }}
      autoFocus
    />
  );
};

export default EditableMessage;
