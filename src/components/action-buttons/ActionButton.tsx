import React from 'react';
import { LucideIcon, LucideProps } from "lucide-react";
import * as Icons from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActionButtonProps {
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
  onClick?: () => void;
}

const availableIcons = [
  { value: "Target", label: "Alvo" },
  { value: "Brain", label: "Cérebro" },
  { value: "School", label: "Escola" },
  { value: "GraduationCap", label: "Graduação" },
  { value: "Book", label: "Livro" },
  { value: "Plus", label: "Mais" },
];

export function ActionButton({ name, icon, label, category, color, onClick }: ActionButtonProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

  return (
    <button 
      onClick={onClick}
      className="relative flex h-[42px] items-center gap-1.5 rounded-full border px-3 py-2 text-start text-[13px] text-white transition enabled:hover:bg-chatgpt-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] cursor-pointer border-[#383737] hover:bg-chatgpt-hover"
    >
      {IconComponent && <IconComponent className={`h-4 w-4 text-${color}-400`} />}
      {label}
    </button>
  );
}

export function IconSelect({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um ícone" />
      </SelectTrigger>
      <SelectContent>
        {availableIcons.map((icon) => (
          <SelectItem key={icon.value} value={icon.value}>
            <div className="flex items-center gap-2">
              {React.createElement(Icons[icon.value as keyof typeof Icons] as LucideIcon, { 
                className: "h-4 w-4" 
              })}
              {icon.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}