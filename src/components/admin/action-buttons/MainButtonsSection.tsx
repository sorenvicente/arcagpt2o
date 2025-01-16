import { ChevronDown, ChevronUp } from "lucide-react";
import { PromptBlock } from "@/types/prompts";

interface MainButtonsSectionProps {
  mainButtons: Array<{
    id: string;
    name: string;
    icon: string;
    label: string;
    category: string;
    color: string;
  }>;
  expandedCategories: string[];
  toggleCategory: (category: string) => void;
  renderSubPrompts: (category: string, visitedCategories?: Set<string>) => React.ReactNode;
  prompts: PromptBlock[];
}

const MainButtonsSection = ({
  mainButtons,
  expandedCategories,
  toggleCategory,
  renderSubPrompts,
}: MainButtonsSectionProps) => {
  return (
    <div className="col-span-full mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Botões Principais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mainButtons.map((button) => (
          <div
            key={button.id}
            className="bg-chatgpt-secondary rounded-2xl p-6 border border-chatgpt-border hover:border-gray-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-white">{button.name}</h3>
              <button
                onClick={() => toggleCategory(button.category)}
                className="text-gray-400 hover:text-white"
              >
                {expandedCategories.includes(button.category) 
                  ? <ChevronUp className="h-4 w-4" />
                  : <ChevronDown className="h-4 w-4" />
                }
              </button>
            </div>
            {expandedCategories.includes(button.category) && (
              <div className="mt-4 space-y-2">
                {renderSubPrompts(button.category)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainButtonsSection;