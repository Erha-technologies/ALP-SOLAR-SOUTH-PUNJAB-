// Shared domain types. Field names intentionally mirror prisma/schema.prisma
// (camelCase equivalents of the DB columns) so swapping the mock API layer
// for real fetch() calls later requires no shape changes in components.

export type CustomerType = "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL";

export type SystemType = "ON_GRID" | "HYBRID" | "OFF_GRID";

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
}

export interface SolarSystemInfo {
  type: SystemType;
  label: string;
  bestFor: string;
  description: string;
  gridConnection: string;
  batteryInfo: string;
  backupInfo: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  category: "SOLAR_PANEL" | "INVERTER" | "BATTERY" | "MOUNTING_STRUCTURE" | "PROTECTION" | "ACCESSORY";
  wattage?: number;
  efficiency?: number;
  warrantyYears?: number;
  imageUrl?: string;
  isFeatured?: boolean;
}

export interface SolarPackage {
  id: string;
  slug: string;
  name: string;
  systemCapacityKw: number;
  recommendedFor: CustomerType;
  estimatedGenerationKwhMonth: number;
  panelCount: number;
  panelWattage: number;
  inverterInfo: string;
  batteryOption: string;
  warrantyYears: number;
  features: string[];
  isFeatured?: boolean;
}

export interface ProjectImage {
  url: string;
  altText: string;
  isCover?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  customerType: CustomerType;
  city: string;
  systemCapacityKw: number;
  systemType: SystemType;
  installationDate: string; // ISO date
  panelBrand?: string;
  inverterBrand?: string;
  batteryInfo?: string;
  annualGenerationKwh?: number;
  description?: string;
  images: ProjectImage[];
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  customerName: string;
  city: string;
  customerType: CustomerType;
  systemSizeKw?: number;
  rating: number; // 1-5
  quote: string;
}

export interface FAQ {
  id: string;
  category?: string;
  question: string;
  answer: string;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  province: string;
}

export interface Lead {
  fullName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  customerType?: CustomerType;
  monthlyElectricityBill?: number;
  source: string;
  message?: string;
}

export interface CalculatorInput {
  customerType: CustomerType;
  city: string;
  monthlyBill: number;
  monthlyUnits?: number;
  roofAreaSqft?: number;
  batteryRequired: "YES" | "NO" | "NOT_SURE";
  backupHours?: "2" | "4" | "6" | "8_PLUS";
}

export interface CalculatorResult {
  recommendedSystemSizeKw: number;
  estimatedPanelCount: number;
  estimatedMonthlyGenerationKwh: number;
  estimatedAnnualGenerationKwh: number;
  estimatedAnnualSavingsPkr: number;
  estimatedRoofAreaSqft: { min: number; max: number };
  recommendedBatteryCapacityKwh?: { min: number; max: number };
  disclaimer: string;
}

export interface TrustStat {
  id: string;
  value: string;
  label: string;
  isSampleData?: boolean;
}
