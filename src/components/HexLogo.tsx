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
      {/* Círculo externo */}
      <circle cx="32" cy="32" r="30" />
      
      {/* Arca da Aliança - Base */}
      <rect x="18" y="34" width="28" height="16" rx="2" />
      
      {/* Tampa da Arca */}
      <rect x="16" y="30" width="32" height="4" rx="1" />
      
      {/* Detalhes decorativos na tampa */}
      <line x1="20" y1="32" x2="44" y2="32" />
      
      {/* Varas de transporte */}
      <line x1="14" y1="36" x2="50" y2="36" />
      <line x1="14" y1="40" x2="50" y2="40" />
      
      {/* Querubins estilizados */}
      <path d="M24 30C24 22 32 22 32 26" />
      <path d="M40 30C40 22 32 22 32 26" />
      
      {/* Decoração central */}
      <rect x="28" y="38" width="8" height="8" rx="1" />
    </svg>
  );
};

export default HexLogo;