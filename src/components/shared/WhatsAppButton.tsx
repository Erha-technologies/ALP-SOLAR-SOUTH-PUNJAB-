"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/config/site";

export function WhatsAppButton({ prefilledMessage }: { prefilledMessage?: string }) {
  const href = buildWhatsAppLink(
    prefilledMessage ?? "Hello, I'm interested in a solar system. Please contact me for a quotation."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with a solar expert on WhatsApp"
      className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform duration-200 hover:scale-105 sm:flex"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}

/** Sticky bottom bar for mobile — combines WhatsApp + quote CTA per brief §31. */
export function MobileStickyBar() {
  const waHref = buildWhatsAppLink("Hello, I'm interested in a solar system. Please contact me for a quotation.");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/95 backdrop-blur sm:hidden">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 border-r border-border py-3.5 text-sm font-medium text-[#128C4A]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href="/get-quote"
        className="flex flex-1 items-center justify-center bg-primary py-3.5 text-sm font-medium text-white"
      >
        Get Free Quote
      </a>
    </div>
  );
}
