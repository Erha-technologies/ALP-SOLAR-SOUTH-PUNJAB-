"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types";
import { cn } from "@/lib/utils";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-medium text-ink">{faq.question}</span>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-muted transition-transform duration-200", isOpen && "rotate-180 text-accent")}
                aria-hidden="true"
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-muted">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
