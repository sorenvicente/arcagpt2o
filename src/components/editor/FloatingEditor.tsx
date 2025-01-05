import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EditorToolbar } from './components/EditorToolbar';
import { BottomTabs } from './components/BottomTabs';
import { EditorContent } from './components/EditorContent';
import { PromptMenu } from './components/PromptMenu';
import { usePrompts } from './hooks/usePrompts';
import { useToast } from '@/components/ui/use-toast';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const { prompts, loadPrompts } = usePrompts();
  const { toast } = useToast();

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

  const handleGenerateText = async () => {
    if (!content.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um prompt primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      toast({
        title: "Gerando texto...",
        description: "Aguarde enquanto processamos seu prompt.",
      });
      
      // TODO: Implement the actual API call
      console.log("Generating text with prompt:", content);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar o texto.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormatText = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const handleAlignText = (alignment: string) => {
    // Get the current line
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const textBeforeCursor = content.substring(0, start);
    const textAfterCursor = content.substring(start);
    
    // Find the start of the current line
    const lastNewLine = textBeforeCursor.lastIndexOf('\n');
    const lineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
    
    // Find the end of the current line
    const nextNewLine = textAfterCursor.indexOf('\n');
    const lineEnd = nextNewLine === -1 ? content.length : start + nextNewLine;
    
    // Get the current line content
    const currentLine = content.substring(lineStart, lineEnd);
    
    // Add alignment marker
    let alignedLine = '';
    switch (alignment) {
      case 'left':
        alignedLine = currentLine.replace(/^(\s*)(.*?)(\s*)$/, '$2');
        break;
      case 'center':
        alignedLine = currentLine.replace(/^(\s*)(.*?)(\s*)$/, '    $2    ');
        break;
      case 'right':
        alignedLine = currentLine.replace(/^(\s*)(.*?)(\s*)$/, '        $2');
        break;
      default:
        return;
    }
    
    // Replace the line in the content
    const newContent = content.substring(0, lineStart) + alignedLine + content.substring(lineEnd);
    setContent(newContent);
  };

  const handleSave = () => {
    toast({
      title: "Sucesso",
      description: "Conteúdo salvo com sucesso!",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-chatgpt-main/90 z-50 flex items-center justify-center">
      <div className="bg-chatgpt-main w-full h-full flex flex-col">
        {/* Floating Toolbar */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg z-10">
          <div className="py-4">
            <EditorToolbar 
              onFormatText={handleFormatText}
              onAlignText={handleAlignText}
              onSave={handleSave}
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
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg">
          <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Prompt Menu */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-3xl">
          <PromptMenu
            promptInput={promptInput}
            showPromptMenu={showPromptMenu}
            prompts={prompts}
            onPromptInputChange={handlePromptInput}
            onPromptSelect={handlePromptSelect}
            onGenerateText={handleGenerateText}
            isGenerating={isGenerating}
          />
        </div>

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