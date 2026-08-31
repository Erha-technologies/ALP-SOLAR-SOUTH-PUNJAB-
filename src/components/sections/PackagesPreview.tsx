import { Check, ArrowRight, Zap, Star, Phone } from "lucide-react";
import { getPackages } from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function PackagesPreview() {
  const packages = await getPackages();

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/60 to-white py-20 sm:py-28 border-y border-slate-200/50">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-poppins text-3xl sm:text-4xl xl:text-[2.6rem] font-extrabold text-[#0F2D52] tracking-tight leading-snug">
              Sized for Every Roof & Budget
            </h2>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 font-poppins text-sm font-bold text-[#0F2D52] hover:text-[#184478] transition-colors group"
          >
            <span>View All Packages</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {packages.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "relative flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border select-none group",
                pkg.isFeatured
                  ? "border-2 border-[#0F2D52] shadow-xl ring-4 ring-[#0F2D52]/5"
                  : "border-slate-200/90 hover:border-[#0F2D52]/40"
              )}
            >
              {/* Featured Badge */}
              {pkg.isFeatured && (
                <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-[#0F2D52] px-4 py-1 text-xs font-extrabold text-amber-400 shadow-md border border-cyan-400/30 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                {/* kW Title & Use Header */}
                <div className="flex items-baseline justify-between">
                  <h3 className="font-poppins text-3xl sm:text-4xl font-bold text-[#0F2D52] tracking-tight">
                    {pkg.name}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    Residential
                  </span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-slate-500">
                  Recommended for {pkg.recommendedFor.toLowerCase()} use
                </p>

                {/* Monthly KWh Generation Pill */}
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-cyan-50 border border-cyan-200/60 p-3 text-cyan-900">
                  <Zap className="h-5 w-5 text-cyan-600 shrink-0" />
                  <div className="text-xs font-bold">
                    <span>Est. Generation: </span>
                    <span className="text-cyan-950 font-black">{pkg.estimatedGenerationKwhMonth} Units / mo</span>
                  </div>
                </div>

                {/* Feature Bullet List */}
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F2D52] text-white shadow-xs">
                      <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                    </div>
                    <span>{pkg.panelCount} x Tier-1 Solar Panels</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F2D52] text-white shadow-xs">
                      <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                    </div>
                    <span>{pkg.inverterInfo}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F2D52] text-white shadow-xs">
                      <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                    </div>
                    <span>Battery: {pkg.batteryOption}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F2D52] text-white shadow-xs">
                      <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                    </div>
                    <span>{pkg.warrantyYears}-Year Comprehensive Warranty</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 py-3 text-xs font-bold text-[#0F2D52] border border-slate-200 transition-colors text-center"
                >
                  View Details
                </Link>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0F2D52] hover:bg-[#153f70] py-3 text-xs font-bold text-white shadow-md transition-colors text-center"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan-300" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
