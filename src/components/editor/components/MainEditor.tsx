import { useState } from 'react';
import { X } from 'lucide-react';
import { EditorToolbar } from './EditorToolbar';
import { BottomTabs } from './BottomTabs';
import { EditorContent } from './EditorContent';
import { useToast } from '@/components/ui/use-toast';

interface MainEditorProps {
  onClose: () => void;
}

export const MainEditor = ({ onClose }: MainEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('eixos');
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab alterada para:', tab);
    
    // Feedback visual para o usuário
    toast({
      title: `${tab.charAt(0).toUpperCase() + tab.slice(1)} selecionado`,
      description: `Você está agora no modo ${tab}`,
    });
  };

  return (
    <div className="bg-chatgpt-main w-full h-full flex flex-col">
      {/* Floating Toolbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-md z-10">
        <div className="py-1">
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

      {/* Tabs - Positioned above the prompt input */}
      <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-md">
        <BottomTabs activeTab={activeTab} onTabChange={handleTabChange} />
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