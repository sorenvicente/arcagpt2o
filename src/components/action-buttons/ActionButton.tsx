import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface ActionButtonProps {
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

export function ActionButton({ name, icon, label, category, color }: ActionButtonProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

  return (
    <button 
      className={`relative flex h-[42px] items-center gap-1.5 rounded-full border px-3 py-2 text-start text-[13px] text-white transition enabled:hover:bg-chatgpt-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] cursor-pointer border-[#383737] hover:bg-chatgpt-hover`}
    >
      {IconComponent && <IconComponent className={`h-4 w-4 text-${color}-400`} />}
      {label}
    </button>
  );
}