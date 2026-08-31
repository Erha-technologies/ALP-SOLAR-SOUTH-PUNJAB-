import Link from "next/link";
import Image from "next/image";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const inputs = ["Property type", "Monthly bill", "City", "Battery backup needs"];

export function CalculatorTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page space-y-10 sm:space-y-14">
        {/* Top Calculator Teaser Card */}
        <div className="grid items-center gap-10 rounded-card border border-border bg-surface-muted p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-3 font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-[#0F2D52] tracking-tight leading-snug">
              See Your Estimated System in Minutes
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Answer a few questions about your property and electricity usage to get an
              instant estimate of system size, generation, and potential savings.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {inputs.map((input) => (
                <li key={input} className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {input}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/solar-calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0F2D52] px-6 py-3.5 sm:py-4 text-sm sm:text-base font-extrabold text-white shadow-xl transition-all duration-300 hover:bg-[#0a203d] hover:scale-105 whitespace-nowrap text-center"
          >
            <span>Calculate My Solar System</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
          </Link>
        </div>

        {/* Bottom Green Energy Banner */}
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.2rem] border border-emerald-500/20 shadow-2xl min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] flex items-center justify-center p-6 sm:p-10 text-center group select-none">
          <Image
            src="/images/green-energy-banner.png?v=2"
            alt="Drive the Better World with Green Energy"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Soft gradient overlay for HD clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

          {/* Centered Typography */}
          <h3 className="relative z-10 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-xl max-w-3xl leading-tight sm:leading-tight">
            Drive the Better World with Green Energy
          </h3>
        </div>
      </div>
    </section>
  );
}
