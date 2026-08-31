"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ${scrolled ? "shadow-md py-1" : "shadow-sm py-2"}`}>
        <div className="mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-8 flex h-20 sm:h-24 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" prefetch={true} className="flex items-center gap-2 shrink-0 hover:opacity-95 transition-opacity">
            <Image
              src={siteConfig.logoUrl}
              alt={siteConfig.companyName}
              width={340}
              height={110}
              className="h-14 sm:h-18 lg:h-20 w-auto max-h-20 object-contain transition-transform hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex" aria-label="Primary">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`text-xs lg:text-sm xl:text-base font-bold transition-all duration-200 px-2.5 lg:px-3.5 py-2 rounded-xl whitespace-nowrap ${
                    isActive
                      ? "bg-[#0F2D52] text-white shadow-md font-black"
                      : "text-slate-800 hover:text-[#0F2D52] hover:bg-sky-50 hover:scale-[1.03]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call Now CTA */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2D52] px-4 xl:px-5 py-2.5 text-xs xl:text-sm font-extrabold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-[#0a203d] hover:scale-105 whitespace-nowrap border border-[#0F2D52]"
            >
              <Phone className="h-4 w-4 text-cyan-300" />
              <span>CALL NOW</span>
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-100 lg:hidden shrink-0"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
