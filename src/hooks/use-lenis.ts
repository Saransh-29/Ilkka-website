'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Hook to access and control Lenis smooth scrolling
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Get the Lenis instance from the global scope (set by LenisProvider)
    const getLenis = () => {
      const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenisRef.current = lenis;
      }
    };

    getLenis();

    // Fallback: try again after a short delay
    const timeout = setTimeout(getLenis, 100);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
    }
  ) => {
    if (!lenisRef.current) return;

    lenisRef.current.scrollTo(target, options);
  };

  const scrollToTop = (options?: {
    duration?: number;
    immediate?: boolean;
  }) => {
    scrollTo(0, options);
  };

  const scrollToBottom = (options?: {
    duration?: number;
    immediate?: boolean;
  }) => {
    scrollTo(document.body.scrollHeight, options);
  };

  const scrollToSection = (
    sectionId: string,
    options?: {
      offset?: number;
      duration?: number;
    }
  ) => {
    scrollTo(`#${sectionId}`, options);
  };

  const start = () => {
    lenisRef.current?.start();
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const resize = () => {
    lenisRef.current?.resize();
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToSection,
    start,
    stop,
    resize,
  };
}

export default useLenis;
