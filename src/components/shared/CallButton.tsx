"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CallButton() {
  return (
    <a
      href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
      aria-label="Call us"
      className="fixed bottom-24 right-5 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-card transition-transform duration-200 hover:scale-105 sm:flex"
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
