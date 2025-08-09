// Client-side Sentry blocker
(function () {
  "use strict";

  // Block Sentry by intercepting all network requests
  const originalFetch = window.fetch;
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  // Override fetch
  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : input.url;
    if (url && url.includes("sentry.io")) {
      return Promise.resolve(new Response("", { status: 204 }));
    }
    return originalFetch.apply(this, arguments);
  };

  // Override XMLHttpRequest
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url && url.includes("sentry.io")) {
      return;
    }
    return originalXHROpen.apply(this, arguments);
  };

  // Block Sentry script loading
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) {
          // Element node
          if (
            node.tagName === "SCRIPT" &&
            node.src &&
            node.src.includes("sentry")
          ) {
            node.remove();
          }
          if (
            node.tagName === "LINK" &&
            node.href &&
            node.href.includes("sentry")
          ) {
            node.remove();
          }
        }
      });
    });
  });

  observer.observe(document, { childList: true, subtree: true });

  // Suppress console errors
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const message = args.join(" ");
    if (
      message.includes("sentry") ||
      message.includes("ERR_BLOCKED_BY_CLIENT")
    ) {
      return;
    }
    return originalConsoleError.apply(this, arguments);
  };
})();
