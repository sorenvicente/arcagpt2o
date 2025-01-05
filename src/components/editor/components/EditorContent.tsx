import { EditorTitle } from './EditorTitle';
import { ContentEditableArea } from './ContentEditableArea';

interface EditorContentProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const EditorContent = ({ 
  title, 
  content, 
  onTitleChange, 
  onContentChange 
}: EditorContentProps) => {
  return (
    <div className="flex-1 p-8 pt-20">
      <EditorTitle 
        title={title} 
        onTitleChange={onTitleChange} 
      />
      <ContentEditableArea 
        content={content} 
        onContentChange={onContentChange} 
      />
    </div>
  );
};