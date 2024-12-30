import { User } from "lucide-react";
import HexLogo from "./HexLogo";

interface MessageAvatarProps {
  role: "assistant" | "user" | "system";
}

const MessageAvatar = ({ role }: MessageAvatarProps) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-token-main-surface-primary">
      {role === "user" ? (
        <User className="h-5 w-5" />
      ) : (
        <HexLogo size="20" className="text-white" />
      )}
    </div>
  );
};

export default MessageAvatar;