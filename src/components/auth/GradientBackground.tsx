export const GradientBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-0"
      style={{
        background: 'radial-gradient(circle at center, #2A2B32 0%, #1F1F1F 100%)',
        backgroundSize: '200% 200%',
      }}
    />
  );
};