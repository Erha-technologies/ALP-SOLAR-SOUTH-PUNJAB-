import type { Project } from "@/types";

// NOTE: image URLs point at a placeholder illustration (see
// /public/images/placeholder-project.svg). Replace with real project
// photography once available — do not hot-link stock photos into
// production data (see docs/FRONTEND.md).
const PLACEHOLDER_IMG = "/images/placeholder-project.svg";

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "10kw-residential-multan",
    title: "10 kW Residential Hybrid System",
    customerType: "RESIDENTIAL",
    city: "Multan",
    systemCapacityKw: 10,
    systemType: "HYBRID",
    installationDate: "2025-11-02",
    panelBrand: "[PANEL BRAND]",
    inverterBrand: "[INVERTER BRAND]",
    batteryInfo: "10 kWh LFP",
    annualGenerationKwh: 15600,
    description: "[REAL PROJECT DATA] — replace with actual site details once supplied.",
    images: [{ url: PLACEHOLDER_IMG, altText: "10 kW hybrid solar installation, Multan", isCover: true }],
    isFeatured: true,
  },
  {
    id: "proj-2",
    slug: "20kw-commercial-lahore",
    title: "20 kW Commercial On-Grid System",
    customerType: "COMMERCIAL",
    city: "Lahore",
    systemCapacityKw: 20,
    systemType: "ON_GRID",
    installationDate: "2025-09-18",
    panelBrand: "[PANEL BRAND]",
    inverterBrand: "[INVERTER BRAND]",
    annualGenerationKwh: 31200,
    description: "[REAL PROJECT DATA] — replace with actual site details once supplied.",
    images: [{ url: PLACEHOLDER_IMG, altText: "20 kW commercial solar installation, Lahore", isCover: true }],
    isFeatured: true,
  },
  {
    id: "proj-3",
    slug: "50kw-industrial-faisalabad",
    title: "50 kW Industrial On-Grid System",
    customerType: "INDUSTRIAL",
    city: "Faisalabad",
    systemCapacityKw: 50,
    systemType: "ON_GRID",
    installationDate: "2025-06-30",
    panelBrand: "[PANEL BRAND]",
    inverterBrand: "[INVERTER BRAND]",
    annualGenerationKwh: 78000,
    description: "[REAL PROJECT DATA] — replace with actual site details once supplied.",
    images: [{ url: PLACEHOLDER_IMG, altText: "50 kW industrial solar installation, Faisalabad", isCover: true }],
  },
  {
    id: "proj-4",
    slug: "7kw-residential-islamabad",
    title: "7 kW Residential Hybrid System",
    customerType: "RESIDENTIAL",
    city: "Islamabad",
    systemCapacityKw: 7,
    systemType: "HYBRID",
    installationDate: "2025-08-14",
    panelBrand: "[PANEL BRAND]",
    inverterBrand: "[INVERTER BRAND]",
    batteryInfo: "7 kWh LFP",
    annualGenerationKwh: 10920,
    description: "[REAL PROJECT DATA] — replace with actual site details once supplied.",
    images: [{ url: PLACEHOLDER_IMG, altText: "7 kW hybrid solar installation, Islamabad", isCover: true }],
  },
];
