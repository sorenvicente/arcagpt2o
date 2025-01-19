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
      {/* Main buttons grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {/* Mobile: Show all main buttons + More */}
        <div className="block sm:hidden col-span-3">
          <div className="grid grid-cols-3 gap-2">
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
            <ActionButton
              name="more"
              icon="Plus"
              label="Mais"
              category="more"
              color="gray"
              onClick={() => setShowCustomButtons(!showCustomButtons)}
            />
          </div>
        </div>

        {/* Desktop: Show all main buttons */}
        <div className="hidden sm:contents">
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
          <ActionButton
            name="more"
            icon="Plus"
            label="Mais"
            category="more"
            color="gray"
            onClick={() => setShowCustomButtons(!showCustomButtons)}
          />
        </div>
      </div>

      {/* Custom buttons section - Only show when More is clicked */}
      {showCustomButtons && customButtons.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-2">
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
  );
}