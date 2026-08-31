"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Zap } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export default function ProjectsPage() {
  const projects = [
    {
      title: "15 kW Hybrid System - Executive Villa",
      location: "Gulgasht Colony, Multan",
      specs: "2x 1.5 Ton Inverter ACs + Full Home Load",
      saving: "95% Bill Reduction (From 75,000 to Zero)",
    },
    {
      title: "30 kW On-Grid System - Commercial Plaza",
      location: "Model Town, Bahawalpur",
      specs: "MEPCO Green Meter Net Metering",
      saving: "Saved 1.2M PKR Annually",
    },
    {
      title: "20 HP Solar Tubewell Pumping System",
      location: "Lodhran / Multan Farm",
      specs: "Automatic Heavy Duty VFD Inverter",
      saving: "100% Zero Diesel Expense",
    },
    {
      title: "10 kW Hybrid System - Modern Residence",
      location: "Officers Colony, D.G. Khan",
      specs: "Lithium Battery Backup Storage",
      saving: "24/7 Uninterrupted AC Power",
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
              <Zap className="h-4 w-4 text-cyan-300" /> 1,450+ Installations Completed
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
          >
            Our Installed Solar Projects Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-slate-100 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            Explore recent residential, commercial, and agricultural solar installations completed across South Punjab.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F2D52]">
                <MapPin className="h-4 w-4 text-cyan-600" />
                <span>{proj.location}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{proj.title}</h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold">Load: {proj.specs}</p>

              <div className="mt-4 rounded-xl bg-emerald-50 p-3 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Results: </span>
                <span className="text-xs font-extrabold text-emerald-900">{proj.saving}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={buildWhatsAppLink(`Hi ALP Solar, I saw your project in ${proj.location} and want a similar installation.`)}
                target="_blank"
                className="text-xs font-bold text-[#0F2D52] hover:text-[#0a203d]"
              >
                Request Site Visit Like This &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
