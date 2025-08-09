"use client";

import { useState, useRef } from "react";

type SketchfabEmbedProps = {
  modelId: string;
  title: string;
  className?: string;
  transparent?: boolean;
  lazy?: boolean;
};

export default function SketchfabEmbed({
  modelId,
  title,
  className = "w-full h-full",
  transparent = true,
  lazy = false,
}: SketchfabEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Highly optimized embed URL for maximum performance
  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autostart=${
    lazy ? "0" : "1"
  }&preload=${lazy ? "0" : "1"}&transparent=${
    transparent ? "1" : "0"
  }&ui_theme=dark&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_color=ffffff&camera=0&dnt=1&quality=low&animation=0&sound=0&internal=1&tracking=0`;

  const handleLoadModel = () => {
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return (
      <div
        className={`relative ${className} bg-gray-900/50 rounded-lg flex items-center justify-center cursor-pointer`}
        onClick={handleLoadModel}
      >
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-300">Click to load 3D model</p>
          <p className="text-xs text-gray-500">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <iframe
        ref={iframeRef}
        title={title}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={embedUrl}
        className="absolute inset-0 w-full h-full rounded-lg"
        style={{ border: "none" }}
        loading="lazy"
        onLoad={() => {
          // Suppress Sentry errors from Sketchfab and optimize performance
          if (iframeRef.current?.contentWindow) {
            try {
              const iframe = iframeRef.current;
              const iframeDoc =
                iframe.contentDocument || iframe.contentWindow?.document;

              // Block Sentry scripts in iframe if accessible
              if (iframeDoc) {
                const style = iframeDoc.createElement("style");
                style.textContent = `
                  [src*="sentry"] { display: none !important; }
                  [href*="sentry"] { display: none !important; }
                `;
                iframeDoc.head?.appendChild(style);
              }

              iframe.contentWindow?.addEventListener("error", (e) => {
                if (e.error?.message?.includes("sentry")) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              });
            } catch {
              // Ignore cross-origin errors
            }
          }
        }}
      />
    </div>
  );
}
