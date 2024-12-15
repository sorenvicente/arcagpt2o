import { useState, useEffect } from "react";
import { PromptBlock as PromptBlockType } from "./PromptBlock";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PromptList = () => {
  const [prompts, setPrompts] = useState<PromptBlockType[]>([]);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    const { data, error } = await supabase
      .from("prompt_blocks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching prompts:", error);
      return;
    }

    setPrompts(data || []);
  };

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <Card key={prompt.id}>
          <CardHeader>
            <CardTitle>{prompt.name}</CardTitle>
            <CardDescription>{prompt.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{prompt.prompt}</p>
            <div className="mt-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {prompt.category}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromptList;