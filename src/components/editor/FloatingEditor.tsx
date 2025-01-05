import { EditorWrapper } from './components/EditorWrapper';

interface FloatingEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEditor = ({ isOpen, onClose }: FloatingEditorProps) => {
  return <EditorWrapper isOpen={isOpen} onClose={onClose} />;
};

export default FloatingEditor;