"use client";

import { content } from "@/data";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import SketchfabEmbed from "./SketchfabEmbed";
import Silk from "./Silk";
import ShinyText from "./ShinyText";
import TextType from "./TextType";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Silk Background */}
      <Silk
        speed={3}
        scale={1.2}
        color="#6B7280"
        noiseIntensity={2}
        rotation={0}
      />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Statement text */}
          <ScrollAnimationWrapper>
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.85] fade-in">
                  <span className="block">
                    {content.websiteInfo.name.split(" ")[0]}
                  </span>
                  <span className="block">
                    {content.websiteInfo.name.split(" ")[1]}
                  </span>
                </h1>
                <div className="text-base md:text-lg text-gray-400 fade-in font-light max-w-md">
                  <TextType
                    text="Enhancing dental communication through engaging visual storytelling"
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    loop={false}
                    className="text-base md:text-lg text-gray-400 font-light"
                    cursorClassName="text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-4 fade-in">
                <div className="w-12 h-px bg-primary"></div>
                <p className="text-gray-300 text-sm font-light leading-relaxed max-w-lg">
                  {content.websiteInfo.description}
                </p>
              </div>

              <div className="fade-in">
                <a
                  href="#work"
                  className="inline-flex items-center gap-3 text-sm font-medium hover:text-gray-300 transition-colors group"
                >
                  <ShinyText
                    text="VIEW WORK"
                    disabled={false}
                    speed={3}
                    className="uppercase tracking-wider font-medium"
                  />
                  <div className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Right side - 3D Model */}
          <div className="relative h-[320px] lg:h-[400px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <SketchfabEmbed
                modelId="70e3c64298484cb5a5a4bfc7f45f7990"
                title="Realistic Mouth"
                className="w-full h-full"
                transparent={true}
              />
            </div>

            {/* Floating badge */}
            <div className="absolute top-6 right-6 bg-garden-dark/80 backdrop-blur-sm border border-gray-800 rounded-full px-4 py-2 z-10">
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                3D Portfolio
              </span>
            </div>
          </div>
        </div>

        {/* Bottom navigation hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <span className="text-xs uppercase tracking-wider font-medium">
              Scroll
            </span>
            <div className="w-px h-8 bg-gray-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
