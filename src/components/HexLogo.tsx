const HexLogo = ({ className = "", size = "20" }: { className?: string; size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main hexagon */}
      <path d="M21 16.2V7.8a2 2 0 0 0-1-1.73l-7-4.05a2 2 0 0 0-2 0l-7 4.05a2 2 0 0 0-1 1.73v8.4a2 2 0 0 0 1 1.73l7 4.05a2 2 0 0 0 2 0l7-4.05a2 2 0 0 0 1-1.73z" />
      
      {/* Inner lines creating a network pattern */}
      <path d="M12 22V12M12 12L3.5 7M12 12L20.5 7M12 2V7M7 19.5L17 4.5M17 19.5L7 4.5" />
      
      {/* Center dot */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
};

export default HexLogo;