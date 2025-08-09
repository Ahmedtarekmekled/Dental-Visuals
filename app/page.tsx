import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import ServiceCard from "@/components/ServiceCard";
import PortfolioItem from "@/components/PortfolioItem";
import SketchfabEmbed from "@/components/SketchfabEmbed";
import { content } from "@/data";

export default function HomePage() {
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
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 fade-in">
                  What we do
                </h2>
                <div className="w-16 h-px bg-primary fade-in mb-6"></div>
                <p className="text-gray-300 text-lg leading-relaxed fade-in">
                  Professional dental visualization services combining medical
                  expertise with cutting-edge animation technology.
                </p>
              </div>

              {/* Dental Tools 3D Model */}
              <div className="h-[400px] fade-in">
                <SketchfabEmbed
                  modelId="4f5cf419869d4aa49c7cf880cb3dba6b"
                  title="DentalTools"
                  className="w-full h-full"
                  transparent={true}
                  lazy={false}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.map((service, index) => (
                <div
                  key={service.name}
                  className="fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-20">
        <div className="container">
          <ScrollAnimationWrapper>
            <div className="mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 fade-in">
                Featured
                <br />
                Projects
              </h2>
              <div className="w-16 h-px bg-primary fade-in"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.featured.map((item, index) => (
                <div
                  key={item.name}
                  className="fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <PortfolioItem item={item} />
                </div>
              ))}
            </div>

            <div className="mt-16 text-center fade-in">
              <a
                href="/portfolio"
                className="inline-flex items-center gap-4 text-primary hover:text-gray-300 transition-colors group"
              >
                <span className="text-sm font-medium uppercase tracking-wider">
                  View All Work
                </span>
                <div className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-300"></div>
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="container">
          <ScrollAnimationWrapper>
            <div className="text-center space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold fade-in">
                Ready to enhance your
                <br />
                dental communication?
              </h2>
              <div className="fade-in">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-4 text-primary hover:text-gray-300 transition-colors group"
                >
                  <span className="text-lg font-medium uppercase tracking-wider">
                    Get In Touch
                  </span>
                  <div className="w-12 h-px bg-primary group-hover:w-16 transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </main>
  );
}
