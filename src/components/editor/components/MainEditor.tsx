import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EditorToolbar } from './EditorToolbar';
import { BottomTabs } from './BottomTabs';
import { EditorContent } from './EditorContent';
import { useToast } from '@/hooks/use-toast';

interface MainEditorProps {
  onClose: () => void;
  onTabChange: (tab: string) => void;
  content: string;
  onContentChange: (content: string) => void;
}

export const MainEditor = ({ 
  onClose, 
  onTabChange, 
  content,
  onContentChange 
}: MainEditorProps) => {
  const [title, setTitle] = useState('');
  const [activeTab, setActiveTab] = useState('eixos');
  const { toast } = useToast();

  // Generate a suggestive title based on content
  useEffect(() => {
    if (!title && content) {
      // Get first line or first 50 characters
      const suggestedTitle = content.split('\n')[0]?.slice(0, 50) || 
        content.slice(0, 50);
      
      if (suggestedTitle) {
        setTitle(suggestedTitle + (suggestedTitle.length >= 50 ? '...' : ''));
      }
    }
  }, [content, title]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
    console.log('Tab alterada para:', tab);
    
    toast({
      title: `${tab.charAt(0).toUpperCase() + tab.slice(1)} selecionado`,
      description: `Você está agora no modo ${tab}`,
    });
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    // Save to localStorage to persist the title
    if (newTitle) {
      localStorage.setItem('editor-title', newTitle);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-md z-10">
        <div className="py-1">
          <EditorToolbar 
            content={content} 
            onClose={onClose}
            title={title} 
          />
        </div>
      </div>

      <EditorContent
        title={title}
        content={content}
        onTitleChange={handleTitleChange}
        onContentChange={onContentChange}
      />

      <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-md">
        <BottomTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <button 
        onClick={onClose}
        className="fixed top-4 right-4 text-gray-400 hover:text-white transition-colors rounded-lg"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};