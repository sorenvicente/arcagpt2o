const HexLogo = ({ className = "", size = "32" }: { className?: string; size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo branco preenchido */}
      <circle cx="32" cy="32" r="30" fill="currentColor" />
      
      {/* Desenho interno em preto para contrastar */}
      <g
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Arca - quadrado principal */}
        <rect x="22" y="26" width="20" height="16" />
        
        {/* Varas de transporte */}
        <line x1="14" y1="30" x2="22" y2="30" />
        <line x1="42" y1="30" x2="50" y2="30" />
        
        {/* Querubins (L invertido) */}
        <path d="M26 26L26 22L32 22" />
        <path d="M38 26L38 22L32 22" />
      </g>
    </svg>
  );
};

export default HexLogo;