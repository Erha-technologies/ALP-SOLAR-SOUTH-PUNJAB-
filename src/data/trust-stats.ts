import type { TrustStat } from "@/types";

// SAMPLE DATA — brief §9/§56: never present invented install counts, MW
// figures, or years of experience as real. These render with a visible
// "Sample data" tag until replaced with values from Settings (see
// prisma seed: `company.*` keys) and the flag is removed.
export const trustStats: TrustStat[] = [
  { id: "stat-installs", value: "500+", label: "Installations", isSampleData: true },
  { id: "stat-mw", value: "5+ MW", label: "Installed Capacity", isSampleData: true },
  { id: "stat-years", value: "10+", label: "Years Experience", isSampleData: true },
  { id: "stat-customers", value: "1000+", label: "Customers Served", isSampleData: true },
];
