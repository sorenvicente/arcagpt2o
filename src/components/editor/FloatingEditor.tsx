import { useState } from 'react';
import { X } from 'lucide-react';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-chatgpt-main rounded-lg w-[800px] h-[600px] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-chatgpt-border">
          <h2 className="text-white text-lg font-semibold">Editor</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-chatgpt-secondary text-white p-4 rounded-lg resize-none focus:outline-none"
            placeholder="Digite seu texto aqui..."
          />
        </div>
        
        <div className="border-t border-chatgpt-border p-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-chatgpt-hover text-white text-sm">
              Prompts
            </button>
            <button className="px-3 py-1 rounded-md bg-chatgpt-hover text-white text-sm">
              Eixos
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingEditor;