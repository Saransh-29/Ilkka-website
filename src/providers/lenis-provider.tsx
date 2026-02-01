'use client';

import { ReactNode, useRef, useEffect } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
  };
}

export function LenisProvider({ children, options = {} }: LenisProviderProps) {
  const lenisRef = useRef<Lenis>(null);

  useEffect(() => {
    const defaultOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical' as const,
      gestureDirection: 'vertical' as const,
      smooth: true,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2,
      ...options,
    };

    lenisRef.current = new Lenis(defaultOptions);

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default LenisProvider;
