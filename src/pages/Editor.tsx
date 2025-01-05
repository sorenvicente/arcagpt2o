import { useEffect } from 'react';
import FloatingEditor from '@/components/editor/FloatingEditor';

export function Editor() {
  useEffect(() => {
    // Force the editor to be open when accessed through the route
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <FloatingEditor 
      isOpen={true}
      onClose={() => window.history.back()}
    />
  );
}