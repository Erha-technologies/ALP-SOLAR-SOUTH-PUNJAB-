"use client";

import { FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function TermsAndConditionsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-gradient-to-br from-[#0F2D52] via-[#163a69] to-[#0F2D52] py-14 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30">
            <FileText className="h-3.5 w-3.5" /> Terms & Service Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Service terms, equipment warranties, and customer agreements for ALP Solar.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-lg space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">1. Equipment Warranties</h2>
            <p>Tier-1 N-Type TopCon solar panels carry a 25-year linear power output performance warranty. Solar inverters carry a 5-year manufacturer warranty. Warranties are subject to manufacturer terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">2. Installation & Testing</h2>
            <p>All solar installations are performed by certified ALP Solar engineers adhering to electrical safety standards. Testing and commissioning reports are issued upon completion.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">3. Net Metering Approval</h2>
            <p>Net Metering green meter licensing timeline depends on MEPCO grid processing. ALP Solar handles full documentation and coordination for customer convenience.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">4. Payment Terms</h2>
            <p>Payment terms for turnkey systems are detailed in official written quotations. Standard terms involve milestone advance, delivery, and commissioning payments.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
