"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, FileText, Cpu, Clock, RefreshCw } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export default function NetMeteringPage() {
  const steps = [
    { title: "1. Feasibility & Inspection", desc: "Site survey, load test, and MEPCO grid connection feasibility report by ALP Solar engineers." },
    { title: "2. Application Submission", desc: "Complete paper work submission to MEPCO division for bi-directional net-metering NOC." },
    { title: "3. Solar & Protection System", desc: "Tier-1 solar panel installation with certified safety protection, surge arrestor, and earth grounding." },
    { title: "4. Green Meter License & Activation", desc: "MEPCO official meter testing, bi-directional green meter installation, and commercial activation." },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-gradient-to-br from-[#0F2D52] via-[#163a69] to-[#0F2D52] py-14 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30">
            <RefreshCw className="h-3.5 w-3.5" /> MEPCO Approved Net Metering
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Bi-Directional Net Metering in Pakistan
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Sell excess electricity back to the grid and reduce your electricity bills to ZERO with official MEPCO green meter licensing.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          <h2 className="text-2xl font-bold text-[#0F2D52]">How Net Metering Works</h2>
          <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
            When your solar system produces more power than your home or business consumes during peak sunlight hours, the surplus energy is automatically exported to the MEPCO grid. Your bi-directional Green Meter records exported units, offsetting units consumed during night hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          <h2 className="text-2xl font-bold text-[#0F2D52] mb-8">4-Step Turnkey Process</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {steps.map((step, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-extrabold text-[#0F2D52] text-base">{step.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F2D52] text-white rounded-2xl p-8 sm:p-10 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black">Ready to Apply for Net Metering?</h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Contact ALP Solar today for complete end-to-end documentation, testing, and green meter installation.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-extrabold uppercase text-[#0F2D52] shadow-md hover:bg-cyan-400">
              Get in Touch
            </Link>
            <Link href={buildWhatsAppLink("Hi ALP Solar, I want to apply for Net Metering.")} target="_blank" className="rounded-xl border-2 border-white px-6 py-3.5 text-sm font-extrabold text-white hover:bg-white/10">
              WhatsApp Expert &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
