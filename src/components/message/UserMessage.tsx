import { useRef, useState } from 'react';
import EditableMessage from './EditableMessage';
import EditButton from './EditButton';
import { useMouseTracker } from '@/hooks/useMouseTracker';

interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [messageContent, setMessageContent] = useState(content);
  const messageRef = useRef<HTMLDivElement>(null);
  
  const { isHovered, setIsHovered, shouldShowButton } = useMouseTracker(messageRef);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newContent: string) => {
    setMessageContent(newContent);
    setIsEditing(false);
  };

  return (
    <div
      className="relative group"
      ref={messageRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block relative">
        <EditButton 
          onEdit={handleEdit}
          visible={shouldShowButton || isHovered}
        />
        {isEditing ? (
          <EditableMessage content={messageContent} onSave={handleSave} />
        ) : (
          messageContent
        )}
      </div>
    </div>
  );
};

export default UserMessage;