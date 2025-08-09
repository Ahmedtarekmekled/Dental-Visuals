"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { FeaturedProject } from "@/data";

type Props = {
  item: FeaturedProject;
};

export default function PortfolioItem({ item }: Props) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    // Skip video autoplay on iOS/mobile devices
    if (typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return;
    }
    
    if (item.videoSrc && videoRef.current) {
      setIsVideoPlaying(true);
      videoRef.current.play().catch(() => {
        // Video play failed, keep showing image
        setIsVideoPlaying(false);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      setIsVideoPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

    const handleTouchStart = () => {
    // Handle touch devices (iOS/Android)
    if (item.videoSrc && videoRef.current && !isVideoPlaying) {
      setIsVideoPlaying(true);
      videoRef.current.play().catch(() => {
        setIsVideoPlaying(false);
      });
    }
  };

  return (
    <div 
      className="group relative border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500 backdrop-blur-sm hover:scale-[1.02] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
        {/* Thumbnail Image */}
        <Image
          src={item.thumbnailSrc || "/icons/placeholder.svg"}
          alt={item.name}
          fill
          className={`object-cover transition-all duration-700 ${
            isVideoPlaying
              ? "opacity-0 scale-110"
              : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Video Element */}
        {item.videoSrc && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="none"
            poster={item.thumbnailSrc}
            webkit-playsinline="true"
            x-webkit-airplay="deny"
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src={item.videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-garden-dark/80 via-garden-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Play Icon for Videos */}
        {item.videoSrc && !isVideoPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
              <svg
                className="w-8 h-8 text-primary ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Year Badge */}
        {item.year && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-primary/10 backdrop-blur-sm rounded-full text-xs text-primary border border-primary/20">
              {item.year}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-xl font-medium text-primary group-hover:text-gray-200 transition-colors duration-300">
            {item.name}
          </h3>
          {item.videoSrc && (
            <div className="flex-shrink-0">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                Video
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          {item.type && (
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {item.type}
            </span>
          )}

          {item.region && (
            <span className="text-xs text-primary/70 uppercase tracking-wider">
              {item.region}
            </span>
          )}
        </div>

        {/* Link indicator */}
        {item.link && (
          <div className="pt-2">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-primary hover:text-gray-200 transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              View Project
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Hover overlay with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Bottom highlight line */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
