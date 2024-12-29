import { List } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ModelListProps {
  models: { value: string; label: string }[];
  title: string;
}

const ModelList = ({ models, title }: ModelListProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="models" className="border-chatgpt-border">
        <AccordionTrigger className="text-white hover:text-white hover:no-underline">
          <div className="flex items-center gap-2">
            <List className="h-5 w-5" />
            {title}
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-400">
          <ul className="list-disc pl-6 space-y-2">
            {models.map((model) => (
              <li key={model.value}>{model.label}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ModelList;