import { useState } from 'react';
import { X, Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, FileInput, Edit, MessageSquare, Lightbulb, Target, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edicao');
  const [promptInput, setPromptInput] = useState('');
  const [showPromptMenu, setShowPromptMenu] = useState(false);

  if (!isOpen) return null;

  const handlePromptInput = (value: string) => {
    setPromptInput(value);
    if (value.includes('//')) {
      setShowPromptMenu(true);
    } else {
      setShowPromptMenu(false);
    }
  };

  const availablePrompts = [
    { id: 1, name: 'Rabino' },
    { id: 2, name: 'CPL 01 - oportunidades' },
    { id: 3, name: 'Roteiro de Vídeo Curto' },
  ];

  return (
    <div className="fixed inset-0 bg-chatgpt-main/90 z-50 flex items-center justify-center">
      <div className="bg-chatgpt-main w-full h-full flex flex-col">
        {/* Floating Toolbar */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg z-10">
          <div className="flex items-center px-2 h-12">
            <select className="bg-transparent text-white border-none outline-none mr-4 rounded-lg">
              <option>Parágrafo</option>
            </select>
            
            <div className="flex items-center gap-1 px-2 border-r border-chatgpt-border">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <Redo className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1 px-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <Underline className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1 px-2 border-l border-r border-chatgpt-border">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1 px-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white rounded-lg">
                <FileInput className="h-4 w-4" />
              </Button>
            </div>

            <div className="ml-auto">
              <Button variant="secondary" size="sm" className="h-8 rounded-lg">
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 pt-20">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite seu título aqui..."
            className="w-full bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none mb-4 rounded-lg"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite seu texto aqui..."
            className="w-full h-[calc(100%-12rem)] bg-transparent text-white placeholder-gray-500 outline-none resize-none rounded-lg"
          />
        </div>

        {/* Bottom Tabs */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-chatgpt-secondary rounded-xl shadow-lg">
          <div className="flex items-center gap-2 p-1">
            <Button
              variant={activeTab === 'edicao' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2 rounded-lg"
              onClick={() => setActiveTab('edicao')}
            >
              <Edit className="h-4 w-4" />
              Edição
            </Button>
            <Button
              variant={activeTab === 'chat' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2 rounded-lg"
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
            <Button
              variant={activeTab === 'prompts' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2 rounded-lg"
              onClick={() => setActiveTab('prompts')}
            >
              <Lightbulb className="h-4 w-4" />
              Prompts
            </Button>
            <Button
              variant={activeTab === 'eixos' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2 rounded-lg"
              onClick={() => setActiveTab('eixos')}
            >
              <Target className="h-4 w-4" />
              Eixos
            </Button>
          </div>
        </div>

        {/* Prompt Input Area */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl">
          <div className="relative">
            <Input
              value={promptInput}
              onChange={(e) => handlePromptInput(e.target.value)}
              placeholder="Digite // para acessar os prompts..."
              className="w-full bg-chatgpt-secondary text-white border-none rounded-xl pl-4 pr-10 py-3 placeholder-gray-400"
            />
            
            {/* Prompt Menu */}
            {showPromptMenu && (
              <div className="absolute bottom-full mb-2 w-full bg-chatgpt-secondary rounded-xl shadow-lg border border-chatgpt-border">
                <div className="p-2">
                  <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
                    <span>Prompts Disponíveis</span>
                    <ChevronUp className="h-4 w-4" />
                  </div>
                  {availablePrompts.map((prompt) => (
                    <button
                      key={prompt.id}
                      className="w-full text-left px-3 py-2 text-white hover:bg-chatgpt-hover rounded-lg transition-colors"
                    >
                      {prompt.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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