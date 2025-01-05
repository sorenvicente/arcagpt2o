import { useState } from 'react';
import { EditorContent } from './EditorContent';
import { EditorToolbar } from './EditorToolbar';
import { BottomTabs } from './BottomTabs';
import { PromptMenu } from './PromptMenu';
import { usePrompts } from '../hooks/usePrompts';

export const EditorWrapper = () => {
  const [promptInput, setPromptInput] = useState('');
  const [showPromptMenu, setShowPromptMenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { prompts, loadPrompts } = usePrompts();

  const handlePromptInputChange = (value: string) => {
    setPromptInput(value);
    setShowPromptMenu(value.startsWith('//'));
  };

  const handlePromptSelect = (prompt: any) => {
    setPromptInput(prompt.content);
    setShowPromptMenu(false);
  };

  const handleGenerateText = async () => {
    setIsGenerating(true);
    try {
      // Implement text generation logic here
      console.log('Generating text with prompt:', promptInput);
    } catch (error) {
      console.error('Error generating text:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormatText = (format: string) => {
    console.log('Format text:', format);
  };

  const handleAlignText = (alignment: string) => {
    console.log('Align text:', alignment);
  };

  const handleSave = () => {
    console.log('Save content');
  };

  return (
    <div className="flex flex-col h-full bg-chatgpt-secondary">
      <EditorToolbar 
        onFormatText={handleFormatText}
        onAlignText={handleAlignText}
        onSave={handleSave}
      />
      
      <div className="flex-1 overflow-auto">
        <EditorContent />
      </div>

      <div className="p-4">
        <PromptMenu 
          promptInput={promptInput}
          showPromptMenu={showPromptMenu}
          prompts={prompts}
          onPromptInputChange={handlePromptInputChange}
          onPromptSelect={handlePromptSelect}
          onGenerateText={handleGenerateText}
          isGenerating={isGenerating}
        />
      </div>

      <BottomTabs />
    </div>
  );
};