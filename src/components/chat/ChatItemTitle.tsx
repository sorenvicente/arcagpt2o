import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface ChatItemTitleProps {
  id: string;
  title: string;
  isEditing: boolean;
  onEditEnd: () => void;
}

export const ChatItemTitle = ({ id, title: initialTitle, isEditing, onEditEnd }: ChatItemTitleProps) => {
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = async () => {
    if (title.trim() === '') {
      setTitle(initialTitle);
      onEditEnd();
      return;
    }

    if (title !== initialTitle) {
      try {
        const { error } = await supabase
          .from('saved_chats')
          .update({ title: title })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Chat renomeado",
          description: "O título do chat foi atualizado com sucesso.",
        });
      } catch (error) {
        console.error('Error updating chat title:', error);
        setTitle(initialTitle);
        toast({
          title: "Erro",
          description: "Não foi possível renomear o chat.",
          variant: "destructive"
        });
      }
    }
    onEditEnd();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setTitle(initialTitle);
      onEditEnd();
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="bg-transparent text-sm flex-1 outline-none border-b border-chatgpt-border"
        autoFocus
      />
    );
  }

  return <span className="text-sm truncate flex-1">{title}</span>;
};