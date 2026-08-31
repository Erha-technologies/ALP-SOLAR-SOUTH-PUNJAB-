"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export default function PackagesPage() {
  const packages = [
    {
      name: "5 kW Hybrid System",
      tagline: "Ideal for 3-4 Bedroom Homes",
      units: "450-550 Units/mo",
      popular: false,
      specs: [
        "N-Type TopCon 585W+ Solar Panels",
        "5kW Dual MPPT Hybrid Inverter",
        "Supports 1.5 Ton Inverter AC + Fridge + TV + Lights",
        "MEPCO Net Metering Documentation Support",
        "Elevated Heavy Duty Structure",
      ],
    },
    {
      name: "10 kW Hybrid System",
      tagline: "Most Popular for Medium/Large Homes",
      units: "1,000-1,200 Units/mo",
      popular: true,
      specs: [
        "N-Type TopCon 585W+ Solar Panels",
        "10kW Three-Phase Hybrid Inverter",
        "Runs 2x 1.5 Ton ACs + Water Pump + Full House Load",
        "Turnkey MEPCO Net Metering Green Meter License",
        "Lithium Battery Backup Option Available",
      ],
    },
    {
      name: "15 kW On-Grid System",
      tagline: "Luxury Houses & Offices",
      units: "1,500-1,800 Units/mo",
      popular: false,
      specs: [
        "N-Type TopCon 585W+ Solar Panels",
        "15kW Three-Phase On-Grid Inverter",
        "Runs 3x Inverter ACs + Full Commercial Office Load",
        "Complete MEPCO Bi-Directional Green Meter Net Metering",
        "25-Year Panel Performance Guarantee",
      ],
    },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      {/* Premium Animated Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0a203d] via-[#0F2D52] to-[#163a69] py-14 sm:py-18 text-white text-center px-4 shadow-lg">
        {/* Animated Background Sky Glow & Grid Patterns */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.4) 1px, transparent 1px),
                                linear-gradient(45deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />
          {/* Animated Ambient Glowing Orbs */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 left-1/3 h-[280px] w-[500px] rounded-full bg-[#4bc4f9]/35 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/4 right-12 h-[320px] w-[420px] rounded-full bg-cyan-400/30 blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30 shadow-md">
              <Zap className="h-4 w-4 text-cyan-300" /> Turnkey Solar Packages
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
          >
            Complete Turnkey Solar Packages
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-slate-100 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            All-inclusive solar power systems featuring Tier-1 panels, smart hybrid inverters, mounting structures, and complete MEPCO net metering setup.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl bg-white p-6 sm:p-8 border shadow-lg relative flex flex-col justify-between ${
                pkg.popular ? "border-[#0F2D52] ring-2 ring-[#0F2D52]/20" : "border-slate-200"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0F2D52] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-cyan-300 shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-2xl font-black text-[#0F2D52]">{pkg.name}</h3>
                <p className="text-xs font-bold text-slate-500 mt-1">{pkg.tagline}</p>
                <div className="mt-4 rounded-xl bg-cyan-50 p-3 text-center border border-cyan-100">
                  <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Avg Generation: </span>
                  <span className="text-sm font-black text-[#0F2D52]">{pkg.units}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href={buildWhatsAppLink(`Hi ALP Solar, please send me price proposal for ${pkg.name}.`)}
                  target="_blank"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2D52] py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-md hover:bg-[#0a203d] hover:scale-[1.02] transition-all"
                >
                  <span>Request Price Proposal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
