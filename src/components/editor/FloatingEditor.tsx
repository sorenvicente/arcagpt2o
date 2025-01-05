import { useState } from 'react';
import { X, Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, FileInput, Edit, MessageSquare, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edicao');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1A1F2C]/90 z-50 flex items-center justify-center">
      <div className="bg-[#1A1F2C] w-full h-full flex flex-col">
        {/* Floating Toolbar */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#221F26] rounded-lg shadow-lg z-10">
          <div className="flex items-center px-2 h-12">
            <select className="bg-transparent text-white border-none outline-none mr-4">
              <option>Parágrafo</option>
            </select>
            
            <div className="flex items-center gap-1 px-2 border-r border-gray-700">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Redo className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1 px-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Underline className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1 px-2 border-l border-r border-gray-700">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1 px-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <FileInput className="h-4 w-4" />
              </Button>
            </div>

            <div className="ml-auto">
              <Button variant="secondary" size="sm" className="h-8">
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
            className="w-full bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none mb-4"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite seu texto aqui..."
            className="w-full h-[calc(100%-6rem)] bg-transparent text-white placeholder-gray-500 outline-none resize-none"
          />
        </div>

        {/* Bottom Tabs */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#221F26] rounded-lg shadow-lg">
          <div className="flex items-center gap-2 p-1">
            <Button
              variant={activeTab === 'edicao' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2"
              onClick={() => setActiveTab('edicao')}
            >
              <Edit className="h-4 w-4" />
              Edição
            </Button>
            <Button
              variant={activeTab === 'chat' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2"
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
            <Button
              variant={activeTab === 'prompts' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2"
              onClick={() => setActiveTab('prompts')}
            >
              <Lightbulb className="h-4 w-4" />
              Prompts
            </Button>
            <Button
              variant={activeTab === 'eixos' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2"
              onClick={() => setActiveTab('eixos')}
            >
              <Target className="h-4 w-4" />
              Eixos
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="fixed top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default FloatingEditor;