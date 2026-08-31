"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export default function BlogPage() {
  const posts = [
    {
      title: "MEPCO Net Metering Rules & Process in South Punjab (2026 Guide)",
      date: "August 2026",
      desc: "Everything you need to know about applying for a green bi-directional meter with MEPCO in Multan, Bahawalpur, and D.G. Khan.",
    },
    {
      title: "On-Grid vs Hybrid Solar Systems: Which is Best for Your House?",
      date: "August 2026",
      desc: "A detailed comparison of energy storage batteries, inverter backup runtime during loadshedding, and overall cost analysis.",
    },
    {
      title: "How to Maintain Solar Panels for Maximum Efficiency in Summer Heat",
      date: "July 2026",
      desc: "Essential cleaning and maintenance tips for dust and high ambient temperatures in South Punjab.",
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
              <BookOpen className="h-4 w-4 text-cyan-300" /> Solar Insights & News
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
          >
            Solar Guides & Knowledge Base
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-slate-100 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            Learn about net metering regulations, solar panel technology, inverter maintenance, and energy savings in Pakistan.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">{post.date}</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D52] mt-2">{post.title}</h3>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">{post.desc}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={buildWhatsAppLink(`Hi ALP Solar, I read your article about: ${post.title}`)}
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2D52] hover:text-cyan-700"
              >
                <span>Ask Solar Engineer About This Topic</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
