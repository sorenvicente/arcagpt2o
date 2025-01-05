import { Edit } from 'lucide-react';
import { useState } from 'react';
import FloatingEditor from './FloatingEditor';

const EditorButton = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditorOpen(true)}
        className="fixed bottom-4 right-4 bg-[#221F26] hover:bg-[#2A2B32] text-white p-2 rounded-lg shadow-lg transition-colors"
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