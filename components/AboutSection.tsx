"use client";

import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import SketchfabEmbed from "./SketchfabEmbed";
import { content } from "@/data";
import { useDeviceDetection } from "@/lib/deviceDetection";

export default function AboutSection() {
  const { isMobile } = useDeviceDetection();

  return (
    <section id="about" className="py-20">
      <div className="container">
        <ScrollAnimationWrapper>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="w-12 h-px bg-primary fade-in"></div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold fade-in">
                  We are a dental
                  <br />
                  design studio
                </h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed fade-in">
                {content.brandIdentity.mission}
              </p>
            </div>

            <div className="space-y-6 fade-in">
              <p className="text-gray-400 leading-relaxed">
                {content.brandIdentity.approach}
              </p>
              <div className="pt-4">
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  Based in {content.personal_info?.location}
                </p>
              </div>

              {/* Small 3D tooth accent - Conditional rendering for mobile */}
              <div className="h-32 w-32 mx-auto mt-8">
                {isMobile ? (
                  <div className="w-full h-full bg-gray-900/50 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <svg
                          className="w-4 h-4 text-primary"
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
                      <p className="text-xs text-gray-300">3D Tooth</p>
                    </div>
                  </div>
                ) : (
                  <SketchfabEmbed
                    modelId="ad60dadbf06a4e17955b33ca9e320ff8"
                    title="Tooth"
                    className="w-full h-full"
                    transparent={true}
                    lazy={false}
                  />
                )}
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
