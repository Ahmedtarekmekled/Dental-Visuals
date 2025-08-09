"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  // Check if device is iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Register ScrollTrigger with iOS-safe settings
  gsap.registerPlugin(ScrollTrigger);

  // Configure GSAP for better iOS compatibility
  if (isIOS) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
  }
}

export { gsap, ScrollTrigger };
