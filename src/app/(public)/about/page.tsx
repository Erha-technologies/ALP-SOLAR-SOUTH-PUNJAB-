"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  HeartHandshake,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  Sun,
  Globe,
  Compass,
} from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export default function AboutPage() {
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

        <div className="max-w-4xl mx-auto relative z-10 space-y-3 py-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/30 shadow-md">
              <Award className="h-4 w-4 text-cyan-300" /> ALP SOLAR · LEADING EPC & TECHNOLOGY DISTRIBUTOR
            </span>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
            >
              Our Mission, Vision & Core Values
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-300 font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            Empowering Pakistan with Tier-1 solar engineering, high-efficiency hybrid inverters, and cutting-edge energy storage systems.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 space-y-12 sm:space-y-16">
        
        {/* Executive Overview & Stats Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md border border-cyan-200">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D52]">
              Pakistan's Premier Engineering, Procurement & Construction (EPC) Solar Leader
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
              At <strong className="text-slate-900">ALP Solar Pakistan</strong>, we specialize in end-to-end solar solutions for residential homes, commercial complexes, industrial factories, and agricultural tubewells. As official partners and distributors of <strong className="text-cyan-800">AlpSolarr</strong> energy inverters, storage systems, and Tier-1 solar panels, we deliver uncompromised quality engineered specifically for Pakistan's climate.
            </p>
          </div>

          {/* Key Impact Counter Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-4xl font-black text-[#0F2D52]">1,450+</span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mt-1">
                Turnkey Installations
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-4xl font-black text-cyan-700">12.5 MW+</span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mt-1">
                Total Solar Capacity
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-4xl font-black text-emerald-700">99.8%</span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mt-1">
                Client Satisfaction
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl sm:text-4xl font-black text-amber-600">25 Years</span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mt-1">
                Performance Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Mission & Vision Side-by-Side Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* OUR MISSION CARD */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-white via-slate-50 to-cyan-50/30 rounded-3xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-[#0F2D52] flex items-center justify-center shadow-lg shrink-0">
                  <Target className="h-7 w-7 text-cyan-300" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-700">Pillar 01</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F2D52]">Our Mission</h3>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                To eliminate energy grid dependency, heavy utility tariffs, and power outages through world-class solar engineering.
              </h4>

              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Our mission is to empower households, businesses, and industrial facilities across Pakistan with reliable, clean solar power generation and advanced energy storage systems. By utilizing genuine Tier-1 hardware, custom electrical design, and guaranteed DISCO net-metering approvals, we ensure every customer achieves financial energy freedom.
              </p>

              <div className="pt-4 space-y-2.5 border-t border-slate-200/80">
                {[
                  "100% Genuine Tier-1 Bi-facial Panels & AlpSolarr Hybrid Inverters",
                  "PEC-Registered Professional Electrical Engineering Standards",
                  "Fast-Track 3-Phase Net-Metering Approvals & Grid Synchronization",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-bold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* OUR VISION CARD */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-slate-900 via-[#0F2D52] to-slate-950 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group border border-cyan-500/30"
          >
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-colors" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shadow-lg shrink-0">
                  <Eye className="h-7 w-7 text-cyan-300" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-300">Pillar 02</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Our Vision</h3>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-cyan-100 leading-snug">
                Pioneering Pakistan’s Transition to 100% Clean, Renewable & Decarbonized Energy.
              </h4>

              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                We envision a nation powered by sustainable microgrids, intelligent energy storage cabinets, and zero-emission solar infrastructures. As technology evolves, ALP Solar aims to lead South Asia in smart battery grid management, containerized industrial BESS installations, and mobile emergency ESS units.
              </p>

              <div className="pt-4 space-y-2.5 border-t border-slate-700/80">
                {[
                  "Deployment of 100+ MW Clean Solar Power by 2030",
                  "Leading Industrial BESS Liquid-Cooled Battery Technology in Pakistan",
                  "Eradicating Carbon Footprint for over 50,000+ Pakistani Families",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-bold text-slate-200">
                    <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* OUR CORE VALUES SECTION */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-200 inline-block">
              Pillar 03 · Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F2D52]">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-semibold">
              The fundamental values that drive our engineering excellence, customer relationships, and equipment standards every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Uncompromised Equipment Quality",
                desc: "We exclusively import and install original Tier-1 solar panels, Grade-A LiFePO4 batteries, and genuine AlpSolarr hybrid inverters with full manufacturer warranties.",
                color: "text-cyan-700 bg-cyan-50 border-cyan-200",
              },
              {
                icon: Award,
                title: "PEC Engineering Precision",
                desc: "Every system layout, DC/AC wiring, protection breaker configuration, and net-metering setup is designed by Pakistan Engineering Council (PEC) certified engineers.",
                color: "text-indigo-700 bg-indigo-50 border-indigo-200",
              },
              {
                icon: Scale,
                title: "Radical Transparency & Pricing",
                desc: "No hidden charges, no substandard equipment swaps, and no inflated estimates. We provide itemized transparent BOQs with guaranteed fixed turnkey pricing.",
                color: "text-amber-700 bg-amber-50 border-amber-200",
              },
              {
                icon: HeartHandshake,
                title: "Lifetime Customer Commitment",
                desc: "Our relationship begins at installation. We offer 24/7 remote Wi-Fi monitoring support, annual preventive maintenance checks, and rapid warranty assistance.",
                color: "text-emerald-700 bg-emerald-50 border-emerald-200",
              },
              {
                icon: Globe,
                title: "Environmental Stewardship",
                desc: "Dedicated to reducing Pakistan's fossil fuel dependence, preventing industrial carbon emissions, and preserving environmental sustainability for future generations.",
                color: "text-blue-700 bg-blue-50 border-blue-200",
              },
              {
                icon: Zap,
                title: "Continuous Innovation",
                desc: "Pioneering the latest liquid-cooled BESS containers, high-voltage stackable batteries, trailer-mounted mobile ESS, and smart app energy management platforms.",
                color: "text-purple-700 bg-purple-50 border-purple-200",
              },
            ].map((value, vIdx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={vIdx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-xl hover:border-cyan-400/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border shadow-sm ${value.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-[#0F2D52]">{value.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Turnkey Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#0a203d] via-[#0F2D52] to-[#163a69] rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-cyan-500/30">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/30">
              <Sun className="h-4 w-4 text-cyan-300" /> Start Your Solar Journey Today
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              Speak With Our Senior PEC Solar Engineers
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
              Get a custom engineered solar proposal, shadow analysis, and DISCO net-metering payback breakdown for your home or business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href={buildWhatsAppLink("Hi ALP Solar! I would like to schedule a site survey and solar consultation with your engineers.")}
              target="_blank"
              className="w-full sm:w-auto text-center py-4 px-8 rounded-2xl bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-cyan-300 transition-all hover:scale-105"
            >
              Request Free Site Survey
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center py-4 px-8 rounded-2xl bg-slate-800/80 border border-slate-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:bg-slate-700 transition-all"
            >
              Visit Our Offices
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

