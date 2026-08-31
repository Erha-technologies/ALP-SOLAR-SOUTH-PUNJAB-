import { getFAQs } from "@/lib/api";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Button } from "@/components/ui/Button";

export async function FAQPreview() {
  const faqs = await getFAQs();

  return (
    <section className="bg-surface-muted py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-[#0F2D52] tracking-tight leading-snug">Common Questions</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Can't find what you're looking for?
            </p>
            <Button href="/faq" variant="secondary" className="mt-5">
              View All FAQs
            </Button>
          </div>

          <FAQAccordion faqs={faqs.slice(0, 6)} />
        </div>
      </div>
    </section>
  );
}
