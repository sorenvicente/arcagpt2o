import { useState } from 'react';
import { X } from 'lucide-react';
import { EditorToolbar } from './EditorToolbar';
import { BottomTabs } from './BottomTabs';
import { EditorContent } from './EditorContent';
import { useToast } from '@/components/ui/use-toast';

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
    <div className="bg-chatgpt-main w-full h-full flex flex-col">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-md z-10">
        <div className="py-1">
          <EditorToolbar />
        </div>
      </div>

      <EditorContent
        title={title}
        content={content}
        onTitleChange={setTitle}
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