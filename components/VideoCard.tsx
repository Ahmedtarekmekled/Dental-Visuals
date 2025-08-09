"use client";

import { useRef } from "react";
import Image from "next/image";

type Props = {
  posterSrc?: string;
  videoSrc: string;
};

export default function VideoCard({
  posterSrc = "/icons/placeholder.svg",
  videoSrc,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative aspect-[16/10] bg-secondary"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => ref.current?.pause()}
    >
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {!videoSrc && (
        <Image src={posterSrc} alt="poster" fill className="object-cover" />
      )}
    </div>
  );
}
