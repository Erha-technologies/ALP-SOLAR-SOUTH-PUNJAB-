"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, CheckCircle2, ArrowRight, ShieldCheck, Zap, Building2, Home, Tractor, Factory } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export default function SolarSystemsPage() {
  const solutions = [
    {
      icon: Home,
      title: "Residential Solar Systems",
      subtitle: "5 kW - 15 kW Systems for Homes & Villas",
      desc: "Zero-bill solar solutions for households across South Punjab. Keep your ACs, refrigerators, and water pumps running 24/7 with seamless net metering.",
      features: ["Save up to 90% monthly bill", "MEPCO Net-Metering included", "24/7 Hybrid Battery Backup"],
      href: "/contact",
    },
    {
      icon: Building2,
      title: "Commercial Solar Systems",
      subtitle: "20 kW - 100 kW Systems for Offices & Schools",
      desc: "High-ROI solar energy solutions designed for commercial plazas, private schools, colleges, and medical clinics to slash operational overhead.",
      features: ["3 to 4 Year Payback Period", "Tax Depreciation Benefits", "Remote Mobile Monitoring App"],
      href: "/contact",
    },
    {
      icon: Factory,
      title: "Industrial Solar Systems",
      subtitle: "100 kW - 1 MW Industrial Plants",
      desc: "Custom high-voltage solar plants engineered for cotton gins, flour mills, cold storages, and textile factories across Multan & Bahawalpur.",
      features: ["Heavy Load Inverter Sync", "Zero-Export Peak Shaving", "Dedicated High-Voltage Substation"],
      href: "/contact",
    },
    {
      icon: Tractor,
      title: "Agricultural Solar Tubewells",
      subtitle: "10 HP - 50 HP Solar Water Pumping",
      desc: "Eliminate diesel costs for farm irrigation with high-torque solar VFD tubewell systems engineered for South Punjab agriculture.",
      features: ["Zero Diesel Fuel Expense", "Automatic Solar VFD Drive", "All-Weather Heavy Duty Motors"],
      href: "/contact",
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
              <Sun className="h-4 w-4 text-cyan-300" /> Tier-1 Solar Engineering
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
          >
            Solar Energy Solutions For Every Sector
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-slate-100 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            From residential villas to commercial plazas and agricultural tubewells, discover custom-designed Tier-1 solar systems.
          </motion.p>
        </div>
      </div>

      {/* Grid Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-[#0F2D52] text-white flex items-center justify-center mb-6 shadow-md">
                    <Icon className="h-7 w-7 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F2D52]">{item.title}</h3>
                  <p className="text-xs font-bold text-cyan-700 uppercase tracking-wider mt-1">{item.subtitle}</p>
                  <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>

                  <ul className="mt-6 space-y-2.5">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F2D52] px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#0a203d] hover:scale-105 transition-all"
                  >
                    <span>Get Custom Estimate</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={buildWhatsAppLink(`Hi ALP Solar, I am interested in ${item.title}.`)}
                    target="_blank"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    Chat on WhatsApp &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
