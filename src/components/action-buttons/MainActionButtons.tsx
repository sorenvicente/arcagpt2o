import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ActionButton } from "./ActionButton";

interface CustomButton {
  id: string;
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

export function MainActionButtons() {
  const [showCustomButtons, setShowCustomButtons] = useState(false);
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([]);

  useEffect(() => {
    const loadCustomButtons = async () => {
      const { data, error } = await supabase
        .from('action_buttons')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setCustomButtons(data);
      }
    };

    loadCustomButtons();

    const channel = supabase
      .channel('custom-buttons-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'action_buttons'
        },
        () => {
          loadCustomButtons();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <ActionButton
          name="proposito"
          icon="Target"
          label="Propósito"
          category="proposito"
          color="purple"
        />
        <ActionButton
          name="metodo"
          icon="Brain"
          label="Método"
          category="metodo"
          color="blue"
        />
        <ActionButton
          name="mentoria"
          icon="School"
          label="Mentoria"
          category="mentoria"
          color="green"
        />
        <ActionButton
          name="curso"
          icon="GraduationCap"
          label="Curso"
          category="curso"
          color="yellow"
        />
        <ActionButton
          name="conteudo"
          icon="Book"
          label="Conteúdo"
          category="conteudo"
          color="red"
        />
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowCustomButtons(!showCustomButtons)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Mais ações</span>
        </button>

        {showCustomButtons && customButtons.length > 0 && (
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {customButtons.map((button) => (
              <ActionButton
                key={button.id}
                name={button.name}
                icon={button.icon}
                label={button.label}
                category={button.category}
                color={button.color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}