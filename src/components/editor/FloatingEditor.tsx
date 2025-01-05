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
      <div className="bg-gray-900 rounded-lg w-[800px] h-[600px] flex flex-col relative shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-medium">Editor</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-gray-800 text-white p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Digite seu texto aqui..."
          />
        </div>
        
        {/* Footer with Buttons */}
        <div className="border-t border-gray-700 p-4 flex justify-between items-center bg-gray-900 rounded-b-lg">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded bg-gray-700 text-white text-sm hover:bg-gray-600 transition-colors">
              Prompts
            </button>
            <button className="px-3 py-1.5 rounded bg-gray-700 text-white text-sm hover:bg-gray-600 transition-colors">
              Eixos
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingEditor;