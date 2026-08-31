"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <Image
            src={siteConfig.logoUrl}
            alt={siteConfig.companyName}
            width={300}
            height={100}
            className="h-16 sm:h-20 w-auto object-contain"
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1.5 overflow-y-auto" aria-label="Mobile">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={onClose}
                className={`rounded-xl px-4 py-3 text-base font-bold transition-all ${
                  isActive
                    ? "bg-[#0F2D52] text-white shadow-md font-black"
                    : "text-slate-700 hover:bg-sky-50 hover:text-[#0F2D52]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-100">
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2D52] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-xl hover:bg-[#0a203d] text-center"
          >
            <Phone className="h-4 w-4 text-cyan-300" />
            <span>CALL NOW</span>
          </a>
        </div>
      </div>
    </div>
  );
}
