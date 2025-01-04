import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMouseTracker = (elementRef: RefObject<HTMLElement>, threshold: number = 100) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [shouldShowButton, setShouldShowButton] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const messageCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      const distance = Math.sqrt(
        Math.pow(e.clientX - messageCenter.x, 2) +
        Math.pow(e.clientY - messageCenter.y, 2)
      );

      const prevDistance = Math.sqrt(
        Math.pow(mousePosition.x - messageCenter.x, 2) +
        Math.pow(mousePosition.y - messageCenter.y, 2)
      );

      setMousePosition({ x: e.clientX, y: e.clientY });

      if (distance < prevDistance && distance < threshold) {
        setShouldShowButton(true);
      } else if (distance > threshold) {
        setShouldShowButton(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition, elementRef, threshold]);

  return {
    isHovered,
    setIsHovered,
    shouldShowButton
  };
};