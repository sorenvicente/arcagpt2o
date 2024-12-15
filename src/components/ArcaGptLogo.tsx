import React from 'react';

const ArcaGptLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex h-full items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white ${className}`}>
      <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2/3 w-2/3" role="img">
        <text x="-9999" y="-9999">ArcaGPT</text>
        <path d="M20.5 3C11.387 3 4 10.387 4 19.5S11.387 36 20.5 36 37 28.613 37 19.5 29.613 3 20.5 3zm0 2c8.008 0 14.5 6.492 14.5 14.5S28.508 34 20.5 34 6 27.508 6 19.5 12.492 5 20.5 5zm-3 6v17h2V11h-2zm4 0v17h2V11h-2z" fill="currentColor"/>
      </svg>
    </div>
  );
};

export default ArcaGptLogo;