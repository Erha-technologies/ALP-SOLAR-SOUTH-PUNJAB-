"use client";

import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

const faqData = [
  { id: "1", category: "Savings", question: "How much can I save on electricity bills with solar?", answer: "A properly sized Tier-1 solar system with net metering reduces your electricity bills by up to 90%. Excess power generated during peak daytime hours is exported back to the grid." },
  { id: "2", category: "Net Metering", question: "How long does MEPCO Net Metering approval take?", answer: "ALP Solar handles the complete end-to-end documentation. Net metering NOC approval and Green Meter installation typically take 3 to 4 weeks." },
  { id: "3", category: "ROI", question: "What is the payback period for a residential solar system?", answer: "The typical return on investment (ROI) payback period for solar installations in Pakistan is 3 to 3.5 years." },
  { id: "4", category: "Warranty", question: "What is the warranty on solar panels and inverters?", answer: "We provide 25 years linear power performance warranty on Tier-1 N-Type TopCon solar panels, 5 years warranty on hybrid/on-grid inverters, and up to 10 years warranty on lithium batteries." },
  { id: "5", category: "Backup", question: "Does the system work during load shedding / power outages?", answer: "Hybrid solar systems equipped with lithium battery storage seamlessly provide backup power for ACs, lights, fans, and appliances during load shedding." },
];

export default function FAQPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-gradient-to-br from-[#0F2D52] via-[#163a69] to-[#0F2D52] py-14 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30">
            <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Everything you need to know about solar installation, net metering, warranties, and ROI.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          <FAQAccordion faqs={faqData} />
        </div>

        <div className="mt-12 bg-[#0F2D52] text-white rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold">Have More Questions?</h2>
          <p className="mt-2 text-slate-300 text-sm max-w-md mx-auto">
            Our expert solar consultants are here to assist you with system sizing and site feasibility.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-extrabold uppercase text-[#0F2D52] shadow-md hover:bg-cyan-400">
              <span>Contact Us Today</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
