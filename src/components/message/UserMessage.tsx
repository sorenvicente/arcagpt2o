import { useState } from 'react';
import { Pencil } from 'lucide-react';
import EditableMessage from './EditableMessage';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [messageContent, setMessageContent] = useState(content);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block">
        {isHovered && !isEditing && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleEdit}
                  className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2.5 rounded-full hover:bg-[#202123] bg-black/20"
                >
                  <Pencil className="h-4 w-4 text-[#8E9196] hover:text-white transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit text</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
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