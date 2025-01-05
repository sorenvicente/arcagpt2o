import { useState } from 'react';
import { X } from 'lucide-react';
import { FloatingToolbar } from './FloatingToolbar';
import { EditorContent } from './EditorContent';
import { BottomTabs } from './BottomTabs';
import { PromptMenu } from './PromptMenu';
import { usePrompts } from '../hooks/usePrompts';

interface EditorWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditorWrapper = ({ isOpen, onClose }: EditorWrapperProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const { prompts } = usePrompts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-chatgpt-main/90 z-50 flex items-center justify-center">
      <div className="bg-chatgpt-main w-full h-full flex flex-col">
        <FloatingToolbar content={content} setContent={setContent} />
        <EditorContent
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg">
          <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-3xl">
          <PromptMenu prompts={prompts} />
        </div>
        <button 
          onClick={onClose}
          className="fixed top-4 right-4 text-gray-400 hover:text-white transition-colors rounded-lg"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};