import * as Tabs from '@radix-ui/react-tabs';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <Tabs.List className="flex items-center gap-0.5 p-1 min-w-[300px] bg-chatgpt-secondary/50 rounded-lg">
        <Tabs.Trigger
          value="eixos"
          className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'eixos'
              ? 'bg-chatgpt-hover text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-chatgpt-hover/30'
          }`}
        >
          Eixos
        </Tabs.Trigger>
        <Tabs.Trigger
          value="blocos"
          className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'blocos'
              ? 'bg-chatgpt-hover text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-chatgpt-hover/30'
          }`}
        >
          Blocos
        </Tabs.Trigger>
        <Tabs.Trigger
          value="prompts"
          className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'prompts'
              ? 'bg-chatgpt-hover text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-chatgpt-hover/30'
          }`}
        >
          Prompts
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};