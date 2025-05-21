import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

/**
 * Hook to track window dimensions and responsive breakpoints
 * @param mobileBreakpoint - Width threshold to determine mobile view (default: 900px)
 * @returns Object with window width, height, and isMobile flag
 */
const useWindowSize = (mobileBreakpoint = 900): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < mobileBreakpoint,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < mobileBreakpoint,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint]);

  return windowSize;
};

export default useWindowSize;
