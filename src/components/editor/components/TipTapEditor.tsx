import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorTitle } from './EditorTitle';
import { Paste } from '@tiptap/extension-paste';

interface TipTapEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  title: string;
  onTitleChange: (title: string) => void;
}

export const TipTapEditor = ({ 
  content, 
  onUpdate,
  title,
  onTitleChange
}: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paste.configure({
        plainTextOnly: true,
      })
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[calc(100vh-200px)] px-4 py-2',
      },
      handlePaste: (view, event) => {
        event.preventDefault();
        const text = event.clipboardData?.getData('text/plain') || '';
        const { state } = view;
        const { tr } = state;
        tr.insertText(text);
        view.dispatch(tr);
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getText());
      console.log('Editor content updated:', editor.getText());
    },
  });

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <EditorTitle 
        title={title}
        onTitleChange={onTitleChange}
      />
      <div className="bg-chatgpt-main rounded-lg shadow-lg">
        <EditorContent 
          editor={editor} 
          className="min-h-[calc(100vh-200px)] text-white"
        />
      </div>
    </div>
  );
};