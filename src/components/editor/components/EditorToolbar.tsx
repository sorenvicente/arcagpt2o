import { Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, FileInput } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EditorToolbar = () => {
  return (
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
  );
};