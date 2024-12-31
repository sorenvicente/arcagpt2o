const HexLogo = ({ className = "", size = "32" }: { className?: string; size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer hexagon */}
      <path d="M32 4L60 20V44L32 60L4 44V20L32 4Z" />
      
      {/* Inner hexagon */}
      <path d="M32 16L48 25V41L32 50L16 41V25L32 16Z" />
      
      {/* Connecting lines */}
      <path d="M32 4V16M4 20L16 25M60 20L48 25M60 44L48 41M4 44L16 41M32 50V60" />
      
      {/* Decorative triangles */}
      <path d="M32 28L38 32L32 36L26 32L32 28Z" />
      
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
};

export default HexLogo;