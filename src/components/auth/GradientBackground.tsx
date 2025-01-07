export const GradientBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-0 opacity-30"
      style={{
        background: 'linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 100%)',
        backgroundSize: '400% 400%',
      }}
    />
  );
};