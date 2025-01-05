import { Edit } from 'lucide-react';
import { useState } from 'react';
import FloatingEditor from './FloatingEditor';

const EditorButton = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditorOpen(true)}
        className="fixed bottom-4 right-4 bg-chatgpt-secondary hover:bg-chatgpt-hover text-white p-2 rounded-lg shadow-lg transition-colors"
        title="Abrir Editor"
      >
        <Edit className="h-5 w-5" />
      </button>
      
      <FloatingEditor 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
};

export default EditorButton;