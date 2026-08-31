"use client";

import { useCountUp } from "@/lib/useCountUp";
import type { TrustStat } from "@/types";

/** Pulls the leading number out of strings like "500+", "5+ MW", "1000+". */
function parseLeadingNumber(value: string): { number: number; suffix: string } {
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match || !match[1]) return { number: 0, suffix: value };
  return { number: parseFloat(match[1].replace(/,/g, "")), suffix: match[2] ?? "" };
}

export function TrustStatItem({ stat }: { stat: TrustStat }) {
  const { number, suffix } = parseLeadingNumber(stat.value);
  const { value, ref } = useCountUp(number);
  const display = Number.isInteger(number) ? value.toLocaleString() : value.toString();

  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="stat-figure text-3xl text-primary sm:text-4xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted">{stat.label}</p>
    </div>
  );
}
