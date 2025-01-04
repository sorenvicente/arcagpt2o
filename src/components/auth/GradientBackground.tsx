import React from 'react';

export const GradientBackground = () => {
  return (
    <div 
      className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-800 via-indigo-700 to-blue-900 bg-[length:400%_400%]"
      style={{
        filter: 'brightness(0.8)',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
      }}
    />
  );
};