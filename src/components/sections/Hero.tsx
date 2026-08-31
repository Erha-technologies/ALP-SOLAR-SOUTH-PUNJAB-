"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sun, Lightbulb, Heart, Zap, Sparkles, CheckCircle2, Home, Building2, BatteryCharging, Phone } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#4bc4f9] via-[#60cdfb] to-[#7ed4fc] pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-16 lg:pb-24 text-slate-900">
      {/* Background Soft Clouds & Atmospheric Sky Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.4) 1px, transparent 1px),
                              linear-gradient(45deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Soft Fluffy Cloud Light Layers */}
        <div className="absolute top-0 left-1/4 h-[350px] w-[700px] rounded-full bg-white/40 blur-3xl" />
        <div className="absolute top-10 right-10 h-[300px] w-[500px] rounded-full bg-white/35 blur-3xl" />
        <div className="absolute top-1/3 left-0 h-[400px] w-[600px] rounded-full bg-sky-100/50 blur-3xl" />
      </div>

      {/* Floating Animated Ambient Icons */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-8 hidden lg:block text-[#D5B65B] drop-shadow-md"
      >
        <Lightbulb className="h-9 w-9" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 right-16 hidden lg:block text-[#D5B65B]"
      >
        <Sun className="h-11 w-11 animate-spin-slow" />
      </motion.div>

      <div className="container-page relative z-10 grid gap-6 sm:gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        {/* Top Image Column on Mobile (order-first lg:order-last) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex items-center justify-center order-first lg:order-last pt-2 lg:pt-0"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[360px] sm:max-w-xl lg:max-w-3xl h-[250px] sm:h-[400px] lg:h-[540px] xl:h-[600px] filter drop-shadow-[0_12px_28px_rgba(15,45,82,0.16)]"
          >
            <Image
              src="/images/solar-podium-new-blended.png?v=70"
              alt="Tier-1 Solar Panels Array 3D Podium Stage Exhibition"
              fill
              className="object-contain"
              priority
              quality={100}
              sizes="(max-width: 640px) 360px, (max-width: 1024px) 800px, 1400px"
            />
          </motion.div>
        </motion.div>

        {/* Text Content Column Below Image on Mobile (order-last lg:order-first) */}
        <div className="order-last lg:order-first pt-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <span className="font-script text-5xl sm:text-7xl lg:text-[5.8rem] text-[#0F2D52] font-normal leading-none tracking-normal drop-shadow-xs select-none block -mb-3 sm:-mb-6 z-10 relative pl-1">
              We provide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-7xl lg:text-[5.6rem] leading-[0.88] tracking-tighter uppercase"
          >
            <span className="block text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] tracking-tighter">
              THE BEST
            </span>
            <span className="block text-[#0F2D52] tracking-tighter">
              SOLAR ENERGY
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 max-w-lg text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-[#1e293b]"
          >
            Professional Tier-1 solar design, installation, and after-sales support for homes, farms, and businesses across Pakistan. Save up to 90% on monthly electricity bills.
          </motion.p>

          {/* Action Buttons - Side-by-Side on Mobile & Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-row items-center gap-3 sm:gap-4"
          >
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F2D52] bg-[#0F2D52] px-4 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-extrabold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:bg-[#0a203d] text-center whitespace-nowrap"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-300" />
              <span>CALL NOW</span>
            </a>

            <Link
              href="/solar-calculator"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border-2 border-[#0F2D52] bg-white/95 px-3.5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-base font-bold text-[#0F2D52] backdrop-blur-md transition-all duration-300 hover:bg-white hover:scale-[1.02] sm:hover:scale-105 shadow-md text-center whitespace-nowrap"
            >
              <span>Calculate Savings</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Features Strip - Pushed down below mobile screen fold */}
      <div className="container-page relative z-10 mt-16 sm:mt-20 lg:mt-24 border-t border-slate-900/10 pt-8 pb-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1: Residential Solar */}
          <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-lg border border-white/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0F2D52] text-white shadow-md">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-poppins text-base font-bold text-[#0F2D52]">Residential Solar</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
                Home solar panels with clean rooftop energy, lower bills, and 25-year panel warranty.
              </p>
            </div>
          </div>

          {/* Feature 2: Commercial Solar */}
          <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-lg border border-white/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0F2D52] text-white shadow-md">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-poppins text-base font-bold text-[#0F2D52]">Commercial Solar</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
                Leading Tier-1 equipment, expert industrial installation, and custom energy systems.
              </p>
            </div>
          </div>

          {/* Feature 3: Battery Storage */}
          <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-lg border border-white/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:col-span-2 lg:col-span-1">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0F2D52] text-white shadow-md">
              <BatteryCharging className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-poppins text-base font-bold text-[#0F2D52]">Battery Storage</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
                Advanced hybrid battery storage, uninterrupted backup power, and smart energy control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PureSolarPanel({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm border-[3.5px] border-slate-100 bg-[#081b2e] shadow-2xl ${className}`}>
      {/* Aluminum frame inner metallic stroke */}
      <div className="absolute inset-[1px] border border-slate-300/40 z-10 pointer-events-none" />
      {/* Pure Photovoltaic Silicon Grid */}
      <svg className="w-full h-full" viewBox="0 0 100 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cellBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d3457" />
            <stop offset="50%" stopColor="#08223c" />
            <stop offset="100%" stopColor="#03101d" />
          </linearGradient>
          <linearGradient id="glassGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Solar Glass Face */}
        <rect width="100" height="160" fill="url(#cellBg)" />

        {/* 6x10 Matrix of Dark Blue Silicon Cells */}
        {[0, 1, 2, 3, 4, 5].map((col) => (
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={col * 16.6 + 1}
              y={row * 16 + 1}
              width="14.6"
              height="14"
              rx="0.8"
              fill="#0f416d"
              stroke="#041220"
              strokeWidth="0.8"
            />
          ))
        ))}

        {/* Silver Busbar Conductor Lines */}
        <line x1="25" y1="0" x2="25" y2="160" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.75" />
        <line x1="50" y1="0" x2="50" y2="160" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.75" />
        <line x1="75" y1="0" x2="75" y2="160" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.75" />

        {/* Diagonal Glass Sheen Reflection */}
        <rect width="100" height="160" fill="url(#glassGlow)" />
      </svg>
    </div>
  );
}

