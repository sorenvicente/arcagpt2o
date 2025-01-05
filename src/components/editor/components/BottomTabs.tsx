import { Tab } from '@radix-ui/react-tabs';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  return (
    <div className="flex items-center gap-1 p-0.5 min-w-[300px]">
      <Tab
        value="eixos"
        onClick={() => onTabChange('eixos')}
        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
          activeTab === 'eixos'
            ? 'bg-chatgpt-hover text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Eixos
      </Tab>
      <Tab
        value="blocos"
        onClick={() => onTabChange('blocos')}
        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
          activeTab === 'blocos'
            ? 'bg-chatgpt-hover text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Blocos
      </Tab>
      <Tab
        value="prompts"
        onClick={() => onTabChange('prompts')}
        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
          activeTab === 'prompts'
            ? 'bg-chatgpt-hover text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Prompts
      </Tab>
    </div>
  );
};