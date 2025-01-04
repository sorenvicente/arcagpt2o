import { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ActionButton = ({ icon, label, isActive, onClick }: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`relative flex h-[42px] items-center gap-1.5 rounded-full border px-3 py-2 text-start text-[13px] transition enabled:hover:bg-chatgpt-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] cursor-pointer ${
        isActive
          ? 'bg-chatgpt-secondary border-chatgpt-border' 
          : 'border-[#383737] hover:bg-chatgpt-hover'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default ActionButton;