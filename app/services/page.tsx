import ServiceCard from "@/components/ServiceCard";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { content } from "@/data";

export default function ServicesPage() {
  return (
    <main className="container my-24">
      <ScrollAnimationWrapper>
        <h1 className="font-heading text-3xl md:text-4xl mb-6 fade-in">
          Services
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((s) => (
            <div className="fade-in" key={s.name}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </ScrollAnimationWrapper>
    </main>
  );
}
