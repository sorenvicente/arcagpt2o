import { useState } from 'react';
import { X } from 'lucide-react';
import { EditorToolbar } from './EditorToolbar';
import { BottomTabs } from './BottomTabs';
import { EditorContent } from './EditorContent';

interface MainEditorProps {
  onClose: () => void;
}

export const MainEditor = ({ onClose }: MainEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  const handleFormatText = (format: string) => {
    document.execCommand(format, false);
  };

  const handleAlignText = (alignment: string) => {
    document.execCommand('justify' + alignment, false);
  };

  return (
    <div className="bg-chatgpt-main w-full h-full flex flex-col">
      {/* Floating Toolbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg z-10">
        <div className="py-4">
          <EditorToolbar 
            onFormatText={handleFormatText}
            onAlignText={handleAlignText}
          />
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
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg">
        <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 text-gray-400 hover:text-white transition-colors rounded-lg"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};