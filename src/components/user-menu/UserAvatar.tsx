import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserAvatarProps {
  email: string | undefined;
}

export function UserAvatar({ email }: UserAvatarProps) {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-chatgpt-hover">
      <Avatar className="h-8 w-8 border border-chatgpt-border">
        <AvatarFallback className="bg-chatgpt-main text-[#9b87f5]">
          {email?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}