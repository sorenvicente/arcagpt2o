import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EditorToolbar } from './EditorToolbar';
import { BottomTabs } from './BottomTabs';
import { TipTapEditor } from './TipTapEditor';
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

  useEffect(() => {
    if (!title && content) {
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

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="fixed top-0 left-0 right-0 bg-chatgpt-secondary border-b border-chatgpt-border z-10">
        <div className="max-w-[800px] mx-auto">
          <EditorToolbar 
            content={content} 
            onClose={onClose}
            title={title} 
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden pt-14">
        <TipTapEditor
          content={content}
          onUpdate={(newContent) => onContentChange(newContent)}
          title={title}
          onTitleChange={setTitle}
        />
      </div>

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