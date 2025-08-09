"use client";

import { useEffect } from "react";

export default function ErrorSuppressor() {
  useEffect(() => {
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
        message.includes("POST https://sentry.io")
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
        message.includes("Download the React DevTools")
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
        message.includes("Download the React DevTools")
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
        event.message?.includes("ERR_BLOCKED_BY_CLIENT")
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
        event.reason?.stack?.includes("sentry.io")
      ) {
        event.preventDefault();
        return false;
      }
    };

    // Network request interceptor to block Sentry
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
      const url =
        typeof input === "string"
          ? input
          : (input as Request).url || (input as URL).href;
      if (url && url.includes("sentry.io")) {
        return new Response("", { status: 204 });
      }
      return originalFetch(input, init);
    };

    // XMLHttpRequest interceptor
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
      async: boolean = true,
      user?: string | null,
      password?: string | null
    ) {
      if (typeof url === "string" && url.includes("sentry.io")) {
        return;
      }
      return originalOpen.call(this, method, url, async, user, password);
    };

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
  }, []);

  return null;
}
