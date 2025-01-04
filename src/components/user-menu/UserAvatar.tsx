import { forwardRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserAvatarProps {
  email: string | undefined;
}

export const UserAvatar = forwardRef<HTMLButtonElement, UserAvatarProps>(
  ({ email }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className="relative h-8 w-8 rounded-full hover:bg-chatgpt-hover"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-chatgpt-main text-[#9b87f5] border border-chatgpt-border">
            {email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }
);

UserAvatar.displayName = "UserAvatar";