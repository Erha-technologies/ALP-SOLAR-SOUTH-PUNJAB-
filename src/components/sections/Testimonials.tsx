import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/api";
import { Card } from "@/components/ui/Card";

export async function Testimonials() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <span className="eyebrow">Customer Stories</span>
          <h2 className="mt-1.5 font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-[#0F2D52] tracking-tight leading-snug">What Customers Say</h2>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {testimonials.map((t) => (
            <Card key={t.id} className="min-w-[280px] p-7 sm:min-w-0">
              <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink2">"{t.quote}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-ink">{t.customerName}</p>
                <p className="text-xs text-muted">
                  {t.city}
                  {t.systemSizeKw ? ` · ${t.systemSizeKw} kW ${t.customerType === "RESIDENTIAL" ? "Residential" : "System"}` : ""}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
