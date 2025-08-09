import ContactForm from "@/components/ContactForm";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { content } from "@/data";

export default function ContactPage() {
  return (
    <main className="container my-24">
      <ScrollAnimationWrapper>
        <h1 className="font-heading text-3xl md:text-4xl mb-6 fade-in">
          Contact
        </h1>
        <p className="opacity-80 max-w-2xl mb-8 fade-in">
          For inquiries and collaborations, reach us at{" "}
          {content.personal_info?.email} or use the form below.
        </p>
        <div className="fade-in">
          <ContactForm />
        </div>
      </ScrollAnimationWrapper>
    </main>
  );
}
