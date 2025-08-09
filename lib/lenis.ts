"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export function useLenis(): void {
  useEffect(() => {
    // Throttle RAF calls to improve performance
    let ticking = false;
    let rafId: number;

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08, // Slightly slower for better performance
      wheelMultiplier: 0.8, // Reduced for smoother feel
      touchMultiplier: 1.5, // Reduced for better mobile performance
      infinite: false,
      syncTouch: true, // Better touch handling
      touchInertiaMultiplier: 35, // Smoother touch inertia
    });

    function raf(time: number) {
      if (!ticking) {
        lenis.raf(time);
        ticking = false;
      }
      rafId = requestAnimationFrame(raf);
    }

    // Start with a slight delay to let the page load
    const startTimeout = setTimeout(() => {
      rafId = requestAnimationFrame(raf);
    }, 100);

    return () => {
      clearTimeout(startTimeout);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy?.();
    };
  }, []);
}
