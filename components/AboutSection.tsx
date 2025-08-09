"use client";

import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import SketchfabEmbed from "./SketchfabEmbed";
import { content } from "@/data";

export default function AboutSection() {
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

              {/* Small 3D tooth accent */}
              <div className="h-32 w-32 mx-auto mt-8">
                <SketchfabEmbed
                  modelId="ad60dadbf06a4e17955b33ca9e320ff8"
                  title="Tooth"
                  className="w-full h-full"
                  transparent={true}
                  lazy={false}
                />
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
