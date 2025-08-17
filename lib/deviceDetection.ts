"use client";

import { useState, useEffect } from "react";

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      try {
        if (typeof window !== "undefined" && navigator && navigator.userAgent) {
          const userAgent = navigator.userAgent;
          
          // Check for mobile devices
          const isMobileDevice =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              userAgent
            );
          
          // Check for iOS devices specifically
          const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
          
          setIsMobile(isMobileDevice);
          setIsIOS(isIOSDevice);
          setIsLoaded(true);
        } else {
          // Fallback for SSR or when navigator is not available
          setIsMobile(false);
          setIsIOS(false);
          setIsLoaded(true);
        }
      } catch (error) {
        // Error handling for any issues during device detection
        console.warn("Device detection failed, using fallback:", error);
        setIsMobile(false);
        setIsIOS(false);
        setIsLoaded(true);
      }
    };
    
    // Add a small delay to ensure window is fully available
    const timer = setTimeout(checkDevice, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return {
    isMobile,
    isIOS,
    isLoaded,
    shouldShow3D: !isMobile && !isIOS, // Only show 3D content on desktop non-iOS devices
  };
}

// Utility function to check if device supports WebGL
export function supportsWebGL(): boolean {
  try {
    if (typeof window === "undefined") return false;
    
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

// Utility function to check device memory (if available)
export function getDeviceMemory(): number | null {
  try {
    if (typeof window !== "undefined" && "deviceMemory" in navigator) {
      return (
        (navigator as Navigator & { deviceMemory?: number }).deviceMemory || null
      );
    }
  } catch {
    // Ignore errors for device memory detection
  }
  return null;
}

// Utility function to check connection speed
export function getConnectionSpeed(): string | null {
  try {
    if (typeof window !== "undefined" && "connection" in navigator) {
      const connection = (
        navigator as Navigator & {
          connection?: { effectiveType?: string; type?: string };
        }
      ).connection;
      if (connection) {
        return connection.effectiveType || connection.type || null;
      }
    }
  } catch {
    // Ignore errors for connection detection
  }
  return null;
}
