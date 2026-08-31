// API abstraction layer (docs/ARCHITECTURE.md §43 / brief §43).
// Components call these functions, never the /data/*.ts files directly.
// Swap the body of each function for a real `fetch("/api/...")` call
// once Phase 3+ backend endpoints exist — signatures are designed not
// to change when that happens.

import { services } from "@/data/services";
import { solarSystemTypes } from "@/data/solar-systems";
import { solarPackages } from "@/data/packages";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { cities } from "@/data/cities";
import { trustStats } from "@/data/trust-stats";
import type {
  CalculatorInput,
  CalculatorResult,
  Lead,
} from "@/types";
import { calculateSolarEstimateLocally } from "@/lib/calculator";

/** Simulates network latency so loading states are exercised honestly in dev. */
function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getServices() {
  return delay(services);
}

export async function getSolarSystemTypes() {
  return delay(solarSystemTypes);
}

export async function getPackages() {
  return delay(solarPackages);
}

export async function getPackageBySlug(slug: string) {
  return delay(solarPackages.find((p) => p.slug === slug) ?? null);
}

export async function getProducts() {
  return delay(products);
}

export async function getProjects() {
  return delay(projects);
}

export async function getProjectBySlug(slug: string) {
  return delay(projects.find((p) => p.slug === slug) ?? null);
}

export async function getTestimonials() {
  return delay(testimonials);
}

export async function getFAQs() {
  return delay(faqs);
}

export async function getCities() {
  return delay(cities);
}

export async function getTrustStats() {
  return delay(trustStats);
}

export async function calculateSolarEstimate(input: CalculatorInput): Promise<CalculatorResult> {
  // Real backend: POST /api/calculator (see docs/ARCHITECTURE.md §6 —
  // assumptions come from the `settings` table, not hard-coded constants).
  return delay(calculateSolarEstimateLocally(input), 400);
}

export async function submitLead(lead: Lead): Promise<{ success: boolean }> {
  // Real backend: POST /api/leads
  console.info("[mock submitLead]", lead);
  return delay({ success: true }, 400);
}

export async function submitQuoteRequest(payload: Lead & { packageSlug?: string }): Promise<{ success: boolean }> {
  // Real backend: POST /api/leads (source: QUOTE_PAGE) + quotation stub
  console.info("[mock submitQuoteRequest]", payload);
  return delay({ success: true }, 400);
}
