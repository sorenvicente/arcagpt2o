import { useState } from 'react';

interface EditableMessageProps {
  content: string;
  onSave: (content: string) => void;
}

const EditableMessage = ({ content, onSave }: EditableMessageProps) => {
  const [editedContent, setEditedContent] = useState(content);

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
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
      onBlur={() => onSave(editedContent)}
      onKeyDown={handleKeyDown}
      className="w-full bg-transparent outline-none resize-none"
      autoFocus
    />
  );
};

export default EditableMessage;