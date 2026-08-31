import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse 50% 60% at 20% 20%, rgba(198,165,110,0.18), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="container-page relative text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Start Saving With Solar Today
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          Speak directly with our senior solar engineer to get an instant system sizing and payback breakdown.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} size="lg" variant="accent">
            Call Now
          </Button>
          <Button
            href="/contact"
            size="lg"
            variant="secondary"
            className="border-white/25 text-white hover:border-accent hover:text-accent"
          >
            Talk to an Expert
          </Button>
        </div>
      </div>
    </section>
  );
}
