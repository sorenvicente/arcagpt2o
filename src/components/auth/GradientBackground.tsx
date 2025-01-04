import React from 'react';

export const GradientBackground = () => {
  return (
    <div 
      className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 bg-[length:400%_400%]"
      style={{
        filter: 'brightness(0.7)',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
      }}
    />
  );
};