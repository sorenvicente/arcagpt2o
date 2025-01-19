import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MainButtonsGrid } from "./MainButtonsGrid";
import { CustomButtonsGrid } from "./CustomButtonsGrid";
import { CustomButton } from "./types";

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
      <MainButtonsGrid onMoreClick={() => setShowCustomButtons(!showCustomButtons)} />
      <CustomButtonsGrid customButtons={customButtons} show={showCustomButtons} />
    </div>
  );
}