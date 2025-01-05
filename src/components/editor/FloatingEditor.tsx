import { EditorWrapper } from './components/EditorWrapper';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute inset-4 bg-chatgpt-secondary rounded-lg overflow-hidden">
        <EditorWrapper onClose={onClose} />
      </div>
    </div>
  );
};

export default FloatingEditor;