import * as Tabs from '@radix-ui/react-tabs';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <div className="flex items-center gap-1 p-0.5 min-w-[300px]">
        <Tabs.List>
          <Tabs.Trigger
            value="eixos"
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeTab === 'eixos'
                ? 'bg-chatgpt-hover text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Eixos
          </Tabs.Trigger>
          <Tabs.Trigger
            value="blocos"
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeTab === 'blocos'
                ? 'bg-chatgpt-hover text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Blocos
          </Tabs.Trigger>
          <Tabs.Trigger
            value="prompts"
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeTab === 'prompts'
                ? 'bg-chatgpt-hover text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Prompts
          </Tabs.Trigger>
        </Tabs.List>
      </div>
    </Tabs.Root>
  );
};