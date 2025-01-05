import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EditorToolbar } from './components/EditorToolbar';
import { BottomTabs } from './components/BottomTabs';
import { EditorContent } from './components/EditorContent';
import { PromptMenu } from './components/PromptMenu';
import { usePrompts } from './hooks/usePrompts';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [promptInput, setPromptInput] = useState('');
  const [showPromptMenu, setShowPromptMenu] = useState(false);
  const { prompts, loadPrompts } = usePrompts();

  useEffect(() => {
    if (showPromptMenu) {
      loadPrompts();
    }
  }, [showPromptMenu]);

  const handlePromptInput = (value: string) => {
    setPromptInput(value);
    setShowPromptMenu(value.includes('//'));
  };

  const handlePromptSelect = (prompt: any) => {
    setContent((prevContent) => {
      const cursorPosition = document.activeElement instanceof HTMLTextAreaElement 
        ? document.activeElement.selectionStart 
        : prevContent.length;

      const newContent = prevContent.slice(0, cursorPosition) + 
        prompt.prompt + 
        prevContent.slice(cursorPosition);

      return newContent;
    });
    setPromptInput('');
    setShowPromptMenu(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-chatgpt-main/90 z-50 flex items-center justify-center">
      <div className="bg-chatgpt-main w-full h-full flex flex-col">
        {/* Floating Toolbar - Increased thickness */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg z-10">
          <div className="py-4">
            <EditorToolbar />
          </div>
        </div>

        {/* Main Content */}
        <EditorContent
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />

        {/* Bottom Tabs */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg">
          <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Prompt Menu */}
        <PromptMenu
          promptInput={promptInput}
          showPromptMenu={showPromptMenu}
          prompts={prompts}
          onPromptInputChange={handlePromptInput}
          onPromptSelect={handlePromptSelect}
        />

        {/* Close Button */}
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

export default FloatingEditor;