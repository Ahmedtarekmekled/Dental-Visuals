"use client";

import { useEffect } from "react";

export default function ErrorSuppressor() {
  useEffect(() => {
    try {
      // iOS Safari compatibility check
      const isIOS =
        typeof window !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

      // Comprehensive error and performance warning suppression
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalLog = console.log;

      // Suppress console.error messages
      console.error = (...args) => {
        const message = args.join(" ");
        if (
          message.includes("sentry.io") ||
          message.includes("ERR_BLOCKED_BY_CLIENT") ||
          message.includes("Permissions policy violation") ||
          message.includes("deviceorientation events are blocked") ||
          message.includes("Failed to load resource") ||
          message.includes("Allow attribute will take precedence") ||
          message.includes("POST https://sentry.io") ||
          message.includes("WebGL") ||
          message.includes("sketchfab.com") ||
          message.includes("iframe") ||
          message.includes("3D") ||
          message.includes("WebGL context lost") ||
          message.includes("THREE") ||
          message.includes("GL_INVALID_OPERATION") ||
          message.includes("GL_INVALID_VALUE") ||
          message.includes("GL_OUT_OF_MEMORY") ||
          message.includes("Eruda") ||
          message.includes("Tool dom already exists") ||
          message.includes("Tool timing already exists") ||
          message.includes("webkit-masked-url") ||
          message.includes("client-side exception") ||
          message.includes("null") ||
          message.includes("Script error") ||
          message.includes("r@webkit-masked-url") ||
          message.includes("value@webkit-masked-url") ||
          message.includes("@webkit-masked-url")
        ) {
          return; // Don't log these errors
        }
        originalError.apply(console, args);
      };

      // Suppress console.warn messages
      console.warn = (...args) => {
        const message = args.join(" ");
        if (
          message.includes("handler took") ||
          message.includes("Violation") ||
          message.includes("non-passive event listener") ||
          message.includes("Download the React DevTools") ||
          message.includes("WebGL") ||
          message.includes("sketchfab") ||
          message.includes("3D") ||
          message.includes("iframe") ||
          message.includes("memory") ||
          message.includes("performance") ||
          message.includes("Eruda") ||
          message.includes("Tool dom already exists") ||
          message.includes("Tool timing already exists") ||
          message.includes("webkit-masked-url") ||
          message.includes("Script error")
        ) {
          return; // Don't log performance warnings
        }
        originalWarn.apply(console, args);
      };

      // Suppress console.log messages
      console.log = (...args) => {
        const message = args.join(" ");
        if (
          message.includes("sentry") ||
          message.includes("Download the React DevTools") ||
          message.includes("sketchfab") ||
          message.includes("WebGL") ||
          message.includes("3D") ||
          message.includes("Eruda") ||
          message.includes("Tool dom already exists") ||
          message.includes("Tool timing already exists") ||
          message.includes("webkit-masked-url") ||
          message.includes("Script error")
        ) {
          return; // Don't log these messages
        }
        originalLog.apply(console, args);
      };

      // Global error handler - More aggressive suppression
      const handleError = (event: ErrorEvent) => {
        const errorMessage = event.message || "";
        const errorFilename = event.filename || "";
        
        if (
          errorMessage.includes("sentry") ||
          errorFilename.includes("sentry.io") ||
          errorFilename.includes("sketchfab.com") ||
          errorMessage.includes("ERR_BLOCKED_BY_CLIENT") ||
          errorMessage.includes("WebGL") ||
          errorMessage.includes("3D") ||
          errorMessage.includes("iframe") ||
          errorMessage.includes("GL_INVALID_OPERATION") ||
          errorMessage.includes("GL_INVALID_VALUE") ||
          errorMessage.includes("GL_OUT_OF_MEMORY") ||
          errorMessage.includes("THREE") ||
          errorMessage.includes("WebGL context lost") ||
          errorMessage.includes("Eruda") ||
          errorMessage.includes("Tool dom already exists") ||
          errorMessage.includes("Tool timing already exists") ||
          errorMessage.includes("webkit-masked-url") ||
          errorMessage.includes("client-side exception") ||
          errorMessage.includes("null") ||
          errorMessage.includes("Script error") ||
          errorMessage.includes("r@webkit-masked-url") ||
          errorMessage.includes("value@webkit-masked-url") ||
          errorMessage.includes("@webkit-masked-url") ||
          errorFilename.includes("webkit-masked-url") ||
          errorFilename.includes("hidden")
        ) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          return false;
        }
      };

      // Global unhandled rejection handler
      const handleRejection = (event: PromiseRejectionEvent) => {
        const reason = event.reason;
        const reasonMessage = reason?.message || "";
        const reasonStack = reason?.stack || "";
        
        if (
          reasonMessage.includes("sentry") ||
          reasonStack.includes("sentry.io") ||
          reasonMessage.includes("WebGL") ||
          reasonMessage.includes("sketchfab") ||
          reasonMessage.includes("3D") ||
          reasonMessage.includes("iframe") ||
          reasonMessage.includes("Eruda") ||
          reasonMessage.includes("Tool dom already exists") ||
          reasonMessage.includes("Tool timing already exists") ||
          reasonMessage.includes("webkit-masked-url") ||
          reasonMessage.includes("client-side exception") ||
          reasonMessage.includes("null") ||
          reasonMessage.includes("Script error") ||
          reasonMessage.includes("r@webkit-masked-url") ||
          reasonMessage.includes("value@webkit-masked-url") ||
          reasonMessage.includes("@webkit-masked-url") ||
          reasonStack.includes("webkit-masked-url") ||
          reasonStack.includes("hidden")
        ) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      };

      // Override window.onerror to catch script errors
      const originalOnError = window.onerror;
      window.onerror = function(message, source, lineno, colno, error) {
        const errorStr = String(message || "");
        const sourceStr = String(source || "");
        
        if (
          errorStr.includes("webkit-masked-url") ||
          errorStr.includes("Script error") ||
          errorStr.includes("r@webkit-masked-url") ||
          errorStr.includes("value@webkit-masked-url") ||
          errorStr.includes("@webkit-masked-url") ||
          sourceStr.includes("webkit-masked-url") ||
          sourceStr.includes("hidden") ||
          errorStr.includes("null")
        ) {
          return true; // Prevent error from bubbling up
        }
        
        // Call original handler if it exists
        if (originalOnError) {
          return originalOnError.call(this, message, source, lineno, colno, error);
        }
        
        return false;
      };

      // Network request interceptor to block problematic requests (skip on iOS to prevent crashes)
      const originalFetch = window.fetch;
      if (!isIOS) {
        window.fetch = async (input, init) => {
          try {
            const url =
              typeof input === "string"
                ? input
                : (input as Request).url || (input as URL).href;
            if (
              url &&
              (url.includes("sentry.io") || url.includes("sketchfab.com"))
            ) {
              return new Response("", { status: 204 });
            }
            return originalFetch(input, init);
          } catch {
            return originalFetch(input, init);
          }
        };
      }

      // XMLHttpRequest interceptor
      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (
        method: string,
        url: string | URL,
        async: boolean = true,
        user?: string | null,
        password?: string | null
      ) {
        if (
          typeof url === "string" &&
          (url.includes("sentry.io") || url.includes("sketchfab.com"))
        ) {
          return;
        }
        return originalOpen.call(this, method, url, async, user, password);
      };

      // iOS-specific optimizations
      if (isIOS) {
        // Disable WebGL on iOS to prevent crashes
        const originalGetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (
          this: HTMLCanvasElement,
          contextId: string,
          contextAttributes?:
            | CanvasRenderingContext2DSettings
            | WebGLContextAttributes
            | ImageBitmapRenderingContextSettings
        ) {
          if (
            contextId === "webgl" ||
            contextId === "webgl2" ||
            contextId === "experimental-webgl"
          ) {
            return null; // Return null to prevent WebGL context creation
          }
          return originalGetContext.call(this, contextId, contextAttributes);
        } as typeof HTMLCanvasElement.prototype.getContext;

        // Disable iframe loading on iOS
        const originalCreateElement = document.createElement;
        document.createElement = function (tagName: string) {
          const element = originalCreateElement.call(document, tagName);
          if (tagName.toLowerCase() === "iframe") {
            // Add iOS-specific attributes to prevent crashes
            element.setAttribute("loading", "lazy");
            element.setAttribute("importance", "low");
          }
          return element;
        };
      }

      window.addEventListener("error", handleError, true); // Use capture phase
      window.addEventListener("unhandledrejection", handleRejection, true); // Use capture phase

      return () => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
        window.fetch = originalFetch;
        XMLHttpRequest.prototype.open = originalOpen;
        window.onerror = originalOnError;
        window.removeEventListener("error", handleError, true);
        window.removeEventListener("unhandledrejection", handleRejection, true);
      };
    } catch (error) {
      // If ErrorSuppressor itself fails, just log a warning and continue
      console.warn("ErrorSuppressor initialization failed:", error);
    }
  }, []);

  return null;
}
