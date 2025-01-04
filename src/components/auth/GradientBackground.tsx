import React from 'react';

export const GradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-950 bg-[length:400%_400%]"
        style={{
          filter: 'brightness(0.7)',
          maskImage: 'radial-gradient(circle at center, black, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 90%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};