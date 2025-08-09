import PortfolioItem from "@/components/PortfolioItem";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { content } from "@/data";

export default function PortfolioPage() {
  return (
    <main className="container my-24">
      <ScrollAnimationWrapper>
        <h1 className="font-heading text-3xl md:text-4xl mb-6 fade-in">
          Portfolio
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.featured.map((item) => (
            <div className="fade-in" key={item.name}>
              <PortfolioItem item={item} />
            </div>
          ))}
        </div>
      </ScrollAnimationWrapper>
    </main>
  );
}
