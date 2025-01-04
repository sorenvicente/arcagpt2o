import { useState, useEffect, useRef } from 'react';
import { Grip } from 'lucide-react';
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
  const messageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shouldShowPencil, setShouldShowPencil] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!messageRef.current) return;

      const rect = messageRef.current.getBoundingClientRect();
      const messageCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      const angle = Math.atan2(
        e.clientY - messageCenter.y,
        e.clientX - messageCenter.x
      );

      const distance = Math.sqrt(
        Math.pow(e.clientX - messageCenter.x, 2) +
        Math.pow(e.clientY - messageCenter.y, 2)
      );

      const prevDistance = Math.sqrt(
        Math.pow(mousePosition.x - messageCenter.x, 2) +
        Math.pow(mousePosition.y - messageCenter.y, 2)
      );

      setMousePosition({ x: e.clientX, y: e.clientY });

      if (distance < prevDistance && distance < 718.2) {
        setShouldShowPencil(true);
      } else if (distance > 718.2) {
        setShouldShowPencil(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);

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
      onMouseLeave={() => {
        setIsHovered(false);
        setShouldShowPencil(false);
      }}
    >
      <div className="bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block relative">
        {(shouldShowPencil || isHovered) && !isEditing && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleEdit}
                  className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2.5 rounded-full hover:bg-[#202123] bg-black/20"
                >
                  <Grip className="h-4 w-4 text-[#8E9196] hover:text-white transition-colors rotate-90" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-black text-xs px-2 py-1 rounded-xl">
                <p>Editar texto</p>
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