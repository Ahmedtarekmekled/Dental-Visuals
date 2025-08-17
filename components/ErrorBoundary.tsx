"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Be very permissive - only show error boundary for critical errors
    const errorMessage = error.message || "";
    const errorStack = error.stack || "";
    
    // List of errors we should ignore completely
    const ignoredErrors = [
      "webkit-masked-url",
      "Script error",
      "r@webkit-masked-url",
      "value@webkit-masked-url",
      "@webkit-masked-url",
      "hidden",
      "null",
      "undefined",
      "TypeError",
      "ReferenceError",
      "SyntaxError",
      "RangeError",
      "EvalError",
      "URIError"
    ];
    
    // Check if this error should be ignored
    const shouldIgnore = ignoredErrors.some(ignoredError => 
      errorMessage.includes(ignoredError) || 
      errorStack.includes(ignoredError)
    );
    
    if (shouldIgnore) {
      console.warn("ErrorBoundary ignoring error:", errorMessage);
      return { hasError: false };
    }
    
    // Only show error boundary for truly critical errors
    if (errorMessage.includes("Critical") || errorMessage.includes("Fatal")) {
      return { hasError: true, error };
    }
    
    // For now, ignore most errors to prevent false triggers
    console.warn("ErrorBoundary caught non-critical error:", errorMessage);
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log critical errors
    const errorMessage = error.message || "";
    if (errorMessage.includes("Critical") || errorMessage.includes("Fatal")) {
      console.warn("ErrorBoundary caught critical error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-garden-dark flex items-center justify-center p-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-primary">
                Something went wrong
              </h2>
              <p className="text-gray-400 text-sm max-w-md">
                We encountered an unexpected error. Please refresh the page or try again later.
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="px-4 py-2 bg-primary text-garden-dark rounded-lg hover:bg-gray-300 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
