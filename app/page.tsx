import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import ServiceCard from "@/components/ServiceCard";
import PortfolioItem from "@/components/PortfolioItem";
import SketchfabEmbed from "@/components/SketchfabEmbed";
import ScrollVelocity from "@/components/ScrollVelocity";
import ShinyText from "@/components/ShinyText";
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
              {content.featured.slice(0, 3).map((item, index) => (
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
                className="inline-flex items-center gap-4 hover:text-gray-300 transition-colors group"
              >
                <ShinyText
                  text="VIEW ALL WORK"
                  disabled={false}
                  speed={3}
                  className="text-sm font-medium uppercase tracking-wider"
                />
                <div className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-300"></div>
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Scroll Velocity Section */}
      <section className="py-16 border-y border-gray-800">
        <ScrollVelocity
          texts={["PRECISION ANIMATION", "DENTAL EXCELLENCE"]}
          velocity={50}
          className="text-gray-500"
        />
        <div className="container py-8">
          <div className="text-center space-y-4">
            <h3 className="font-heading text-2xl md:text-3xl text-gray-300">
              Where Medical Expertise Meets Visual Innovation
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Creating stunning dental animations that educate patients, enhance
              communication, and elevate your practice&apos;s professional image
              through precise 3D visualization.
            </p>
          </div>
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
                  className="inline-flex items-center gap-4 hover:text-gray-300 transition-colors group"
                >
                  <ShinyText
                    text="GET IN TOUCH"
                    disabled={false}
                    speed={3}
                    className="text-lg font-medium uppercase tracking-wider"
                  />
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
