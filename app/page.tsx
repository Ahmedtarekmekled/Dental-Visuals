"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import ServiceCard from "@/components/ServiceCard";
import PortfolioItem from "@/components/PortfolioItem";
import SketchfabEmbed from "@/components/SketchfabEmbed";
import ScrollVelocity from "@/components/ScrollVelocity";
import ShinyText from "@/components/ShinyText";
import { content } from "@/data";
import { useDeviceDetection } from "@/lib/deviceDetection";

export default function HomePage() {
  const [hasError, setHasError] = useState(false);
  const { isMobile } = useDeviceDetection();

  useEffect(() => {
    // Add global error handler for this component
    const handleError = (event: ErrorEvent) => {
      console.warn("HomePage caught error:", event.error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
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
              setHasError(false);
              window.location.reload();
            }}
            className="px-4 py-2 bg-primary text-garden-dark rounded-lg hover:bg-gray-300 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-garden-dark">
      <HeroSection />

      <AboutSection />

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900/30">
        <div className="container">
          <ScrollAnimationWrapper>
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 fade-in">
                  What we do
                </h2>
                <div className="w-16 h-px bg-primary fade-in mb-6"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed fade-in">
                  Professional dental visualization services combining medical
                  expertise with cutting-edge animation technology.
                </p>
              </div>

              {/* Dental Tools 3D Model - Conditional rendering for mobile */}
              <div className="h-[400px] fade-in">
                {isMobile ? (
                  <div className="w-full h-full bg-gray-900/50 rounded-lg flex items-center justify-center">
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
                      <p className="text-sm text-gray-300">3D Dental Tools</p>
                      <p className="text-xs text-gray-500">
                        View on desktop for interactive experience
                      </p>
                    </div>
                  </div>
                ) : (
                  <SketchfabEmbed
                    modelId="4f5cf419869d4aa49c7cf880cb3dba6b"
                    title="DentalTools"
                    className="w-full h-full"
                    transparent={true}
                    lazy={false}
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-20">
        <div className="container">
          <ScrollAnimationWrapper>
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 fade-in">
                  Featured Work
                </h2>
                <div className="w-16 h-px bg-primary fade-in mb-6"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed fade-in">
                  Explore our latest dental visualization projects showcasing
                  innovative approaches to medical communication.
                </p>
              </div>

              {/* 3D Model Showcase - Conditional rendering for mobile */}
              <div className="h-[400px] fade-in">
                {isMobile ? (
                  <div className="w-full h-full bg-gray-900/50 rounded-lg flex items-center justify-center">
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
                      <p className="text-sm text-gray-300">
                        3D Portfolio Preview
                      </p>
                      <p className="text-xs text-gray-500">
                        View on desktop for interactive experience
                      </p>
                    </div>
                  </div>
                ) : (
                  <SketchfabEmbed
                    modelId="70e3c64298484cb5a5a4bfc7f45f7990"
                    title="Portfolio Showcase"
                    className="w-full h-full"
                    transparent={true}
                    lazy={true}
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.featured.map((project, index) => (
                <PortfolioItem key={index} item={project} />
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/30">
        <div className="container">
          <ScrollAnimationWrapper>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 fade-in">
                Let&apos;s work together
              </h2>
              <div className="w-16 h-px bg-primary fade-in mx-auto mb-6"></div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 fade-in">
                Ready to transform your dental practice with stunning visual
                content? Get in touch to discuss your project.
              </p>
              <div className="fade-in">
                <a
                  href="mailto:hello@dentalvisuals.com"
                  className="inline-flex items-center gap-3 text-sm font-medium hover:text-gray-300 transition-colors group"
                >
                  <ShinyText
                    text="START PROJECT"
                    disabled={false}
                    speed={3}
                    className="uppercase tracking-wider font-medium"
                  />
                  <div className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <ScrollVelocity
        texts={["PRECISION ANIMATION", "DENTAL EXCELLENCE"]}
        velocity={50}
        className="text-gray-500"
      />
    </main>
  );
}
