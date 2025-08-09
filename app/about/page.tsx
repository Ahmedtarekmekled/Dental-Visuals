import { content } from "@/data";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

export default function AboutPage() {
  const p = content.personal_info;
  const exp = content.experience?.current_role;
  return (
    <main className="container my-24">
      <ScrollAnimationWrapper>
        <h1 className="font-heading text-3xl md:text-4xl mb-6 fade-in">
          About
        </h1>
        <div className="grid md:grid-cols-2 gap-8 fade-in">
          <div>
            <p className="opacity-80 mb-4">{content.brandIdentity.approach}</p>
            <p className="opacity-80">{content.brandIdentity.unique_value}</p>
          </div>
          <div className="text-sm">
            <p className="opacity-80">Location: {p?.location}</p>
            <p className="opacity-80">Email: {p?.email}</p>
            <p className="opacity-80">Phone: {p?.phone}</p>
          </div>
        </div>
        {exp && (
          <div className="mt-12 fade-in">
            <h2 className="font-heading text-xl mb-2">Experience</h2>
            <p className="opacity-80">
              {exp.title} — {exp.period}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 opacity-80">
              {exp.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </ScrollAnimationWrapper>
    </main>
  );
}
