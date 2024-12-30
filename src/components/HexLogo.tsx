const HexLogo = ({ className = "", size = "20" }: { className?: string; size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ff69b4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4169e1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M512 150L150 350v324l362 200 362-200V350L512 150zm0 40l310 170v284l-310 170-310-170V360l310-170z"
        fill="url(#hexGradient)"
        strokeWidth="2"
      />
      <path
        d="M512 190v680M202 360l620-10M202 664l620-10"
        stroke="url(#hexGradient)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default HexLogo;