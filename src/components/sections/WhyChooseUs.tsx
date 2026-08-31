"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const whyUsPoints = [
  {
    title: "Top Tier Panels",
    description: "High-efficiency Tier-1 solar panels with optimal power generation.",
  },
  {
    title: "Certified Installers",
    description: "Expert PEC-certified team for precision rooftop mounting & safety.",
  },
  {
    title: "25-Year Warranty",
    description: "Long-term performance & hardware warranty support on all panels.",
  },
  {
    title: "Net Metering Support",
    description: "Complete DISCO approvals, documentation & grid connection.",
  },
  {
    title: "Hybrid Battery Systems",
    description: "Uninterrupted backup power with smart battery management.",
  },
  {
    title: "0% Financing Support",
    description: "Flexible payment plans & easy bank solar financing guidance.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-surface pt-10 sm:pt-16 pb-20 sm:pb-28 overflow-hidden">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Larger Official AlpSolar Showcase Graphic Card */}
          <div className="relative lg:col-span-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-[620px] aspect-[1.22/1] rounded-3xl overflow-hidden shadow-2xl border border-slate-100/90 bg-[#06182c] group select-none"
            >
              <Image
                src="/images/why-choose-alpsolar-final.jpg"
                alt="AlpSolar Smart Hybrid Battery Storage 10kW to 25kW"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>

          {/* Right Column: Properly Aligned Heading, Paragraph & Feature Grid */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-poppins text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[2.75rem] font-extrabold text-[#0F2D52] tracking-tight leading-snug">
              Why Choose AlpSolar?
            </h2>
            <p className="mt-4 text-base sm:text-[1.05rem] leading-relaxed text-slate-700 font-medium">
              AlpSolar is your trusted solar partner in Pakistan. We deliver high-yield solar panels, smart hybrid inverters, reliable battery storage, expert installation, and seamless net metering solutions for homes and businesses.
            </p>

            {/* 2-Column Checkmark Grid */}
            <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {whyUsPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-3 p-2.5 rounded-xl transition-colors hover:bg-slate-50/80">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F2D52] text-white shadow-sm">
                    <Check className="h-3.5 w-3.5 stroke-[3] text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-poppins text-sm font-bold text-[#0F2D52]">{point.title}</h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
