"use client";

import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-gradient-to-br from-[#0F2D52] via-[#163a69] to-[#0F2D52] py-14 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30">
            <ShieldCheck className="h-3.5 w-3.5" /> Legal & Data Protection
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            How ALP Solar protects and handles your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-lg space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">1. Data Collection</h2>
            <p>We collect personal details such as your name, phone number, email address, property type, and monthly electricity bill details when you request a quotation or solar calculation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">2. Use of Information</h2>
            <p>Your details are strictly used to prepare customized solar system quotations, conduct site feasibility surveys, process MEPCO Net Metering paperwork, and provide customer support.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">3. Data Protection</h2>
            <p>We implement strict security measures to protect your personal data. We do not sell, rent, or share customer data with third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">4. Contact Us</h2>
            <p>If you have any questions about our privacy policy, please contact us at <a href={`mailto:${siteConfig.email}`} className="text-[#0F2D52] font-bold underline">{siteConfig.email}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
