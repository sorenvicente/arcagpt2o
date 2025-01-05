import { MessageSquare, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  return (
    <div className="flex items-center gap-2 p-2 min-w-[300px]">
      <Button
        variant={activeTab === 'chat' ? 'secondary' : 'ghost'}
        size="sm"
        className="gap-2 rounded-lg"
        onClick={() => onTabChange('chat')}
      >
        <MessageSquare className="h-4 w-4" />
        Chat
      </Button>
      <Button
        variant={activeTab === 'prompts' ? 'secondary' : 'ghost'}
        size="sm"
        className="gap-2 rounded-lg"
        onClick={() => onTabChange('prompts')}
      >
        <Lightbulb className="h-4 w-4" />
        Prompts
      </Button>
      <Button
        variant={activeTab === 'eixos' ? 'secondary' : 'ghost'}
        size="sm"
        className="gap-2 rounded-lg"
        onClick={() => onTabChange('eixos')}
      >
        <Target className="h-4 w-4" />
        Eixos
      </Button>
    </div>
  );
};