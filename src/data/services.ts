import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "svc-residential",
    slug: "residential",
    title: "Residential Solar",
    description: "Rooftop systems sized around your household's real usage, designed to cut your monthly bill from day one.",
    icon: "Home",
  },
  {
    id: "svc-commercial",
    slug: "commercial",
    title: "Commercial Solar",
    description: "Larger-scale installations for offices, retail, and warehouses — engineered around business-hours load.",
    icon: "Building2",
  },
  {
    id: "svc-industrial",
    slug: "industrial",
    title: "Industrial Solar",
    description: "High-capacity systems for manufacturing and industrial sites with heavy, continuous power demand.",
    icon: "Factory",
  },
  {
    id: "svc-hybrid",
    slug: "hybrid",
    title: "Hybrid Solar",
    description: "Grid-tied systems with battery backup — bill reduction during the day, power through loadshedding at night.",
    icon: "BatteryCharging",
  },
  {
    id: "svc-off-grid",
    slug: "off-grid",
    title: "Off-Grid Solar",
    description: "Fully independent power for sites without reliable grid access, sized for continuous self-sufficiency.",
    icon: "Zap",
  },
  {
    id: "svc-maintenance",
    slug: "maintenance",
    title: "Solar Maintenance",
    description: "Scheduled cleaning, inspection, and performance monitoring to keep an installed system at rated output.",
    icon: "Wrench",
  },
];
