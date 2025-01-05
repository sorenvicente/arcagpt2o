import * as Tabs from '@radix-ui/react-tabs';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <Tabs.List className="inline-flex h-8 items-center bg-[#222222] rounded-xl overflow-hidden border border-gray-700">
        <Tabs.Trigger
          value="eixos"
          className={`h-full px-4 text-sm transition-colors duration-200 ${
            activeTab === 'eixos'
              ? 'bg-[#2A2B32] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Eixos
        </Tabs.Trigger>
        <Tabs.Trigger
          value="blocos"
          className={`h-full px-4 text-sm transition-colors duration-200 ${
            activeTab === 'blocos'
              ? 'bg-[#2A2B32] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Blocos
        </Tabs.Trigger>
        <Tabs.Trigger
          value="prompts"
          className={`h-full px-4 text-sm transition-colors duration-200 ${
            activeTab === 'prompts'
              ? 'bg-[#2A2B32] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Prompts
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};