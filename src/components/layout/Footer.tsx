import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const footerColumns = [
  {
    title: "Solar Solutions",
    links: [
      { label: "Residential Solar", href: "/solar-systems/residential" },
      { label: "Commercial Solar", href: "/solar-systems/commercial" },
      { label: "Hybrid Solar", href: "/solar-systems/hybrid" },
      { label: "Off-Grid Solar", href: "/solar-systems/off-grid" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Solar Panels", href: "/products/solar-panels" },
      { label: "Inverters", href: "/products/inverters" },
      { label: "Batteries", href: "/products/batteries" },
      { label: "Mounting Structures", href: "/products/mounting-structures" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Solar Calculator", href: "/solar-calculator" },
      { label: "Blog", href: "/blog" },
      { label: "Net Metering", href: "/net-metering" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#081b2e] via-[#0F2D52] to-[#163a69] text-white shadow-2xl border-t border-slate-700/60">
      {/* Background Ambient Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[350px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-[350px] w-[500px] rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="container-page relative z-10 grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-xl bg-white p-4 shadow-md">
            <Image
              src={siteConfig.logoUrl}
              alt={siteConfig.companyName}
              width={320}
              height={100}
              className="h-20 sm:h-24 w-auto object-contain"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white font-medium">
            Professional solar design, installation, and after-sales support for homes and
            businesses across Pakistan.
          </p>
          <div className="mt-6 h-px w-12 bg-amber-400" aria-hidden="true" />
          <div className="mt-6 space-y-3 text-sm text-white font-medium">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors">
              <Phone className="h-4 w-4 text-white" aria-hidden="true" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors">
              <Mail className="h-4 w-4 text-white" aria-hidden="true" /> {siteConfig.email}
            </a>
            <span className="flex items-start gap-2 text-white">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" /> {siteConfig.address}
            </span>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-white hover:text-amber-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative z-10 border-t border-white/20">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-white font-medium sm:flex-row">
          <span className="text-white">© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-white hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-white hover:text-amber-300 transition-colors">Terms & Conditions</Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^\d]/g, "")}`}
              className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-white" aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
