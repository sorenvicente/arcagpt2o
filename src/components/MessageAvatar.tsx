import ArcaGptLogo from "./ArcaGptLogo";

const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return <ArcaGptLogo className="h-8 w-8" />;
  }
  
  return null;
};

export default MessageAvatar;