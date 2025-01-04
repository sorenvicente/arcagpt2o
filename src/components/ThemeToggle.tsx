import { Moon } from "lucide-react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 rounded-lg hover:bg-chatgpt-hover"
    >
      <Moon className="h-4 w-4 text-white" />
    </Button>
  );
};

export default ThemeToggle;