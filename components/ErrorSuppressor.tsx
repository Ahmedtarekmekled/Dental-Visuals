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
          message.includes("null")
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
          message.includes("Tool timing already exists")
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
          message.includes("Tool timing already exists")
        ) {
          return; // Don't log these messages
        }
        originalLog.apply(console, args);
      };

      // Global error handler
      const handleError = (event: ErrorEvent) => {
        if (
          event.message?.includes("sentry") ||
          event.filename?.includes("sentry.io") ||
          event.filename?.includes("sketchfab.com") ||
          event.message?.includes("ERR_BLOCKED_BY_CLIENT") ||
          event.message?.includes("WebGL") ||
          event.message?.includes("3D") ||
          event.message?.includes("iframe") ||
          event.message?.includes("GL_INVALID_OPERATION") ||
          event.message?.includes("GL_INVALID_VALUE") ||
          event.message?.includes("GL_OUT_OF_MEMORY") ||
          event.message?.includes("THREE") ||
          event.message?.includes("WebGL context lost") ||
          event.message?.includes("Eruda") ||
          event.message?.includes("Tool dom already exists") ||
          event.message?.includes("Tool timing already exists") ||
          event.message?.includes("webkit-masked-url") ||
          event.message?.includes("client-side exception") ||
          event.message?.includes("null")
        ) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      };

      // Global unhandled rejection handler
      const handleRejection = (event: PromiseRejectionEvent) => {
        if (
          event.reason?.message?.includes("sentry") ||
          event.reason?.stack?.includes("sentry.io") ||
          event.reason?.message?.includes("WebGL") ||
          event.reason?.message?.includes("sketchfab") ||
          event.reason?.message?.includes("3D") ||
          event.reason?.message?.includes("iframe") ||
          event.reason?.message?.includes("Eruda") ||
          event.reason?.message?.includes("Tool dom already exists") ||
          event.reason?.message?.includes("Tool timing already exists") ||
          event.reason?.message?.includes("webkit-masked-url") ||
          event.reason?.message?.includes("client-side exception") ||
          event.reason?.message?.includes("null")
        ) {
          event.preventDefault();
          return false;
        }
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

      window.addEventListener("error", handleError);
      window.addEventListener("unhandledrejection", handleRejection);

      return () => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
        window.fetch = originalFetch;
        XMLHttpRequest.prototype.open = originalOpen;
        window.removeEventListener("error", handleError);
        window.removeEventListener("unhandledrejection", handleRejection);
      };
    } catch (error) {
      // If ErrorSuppressor itself fails, just log a warning and continue
      console.warn("ErrorSuppressor initialization failed:", error);
    }
  }, []);

  return null;
}
