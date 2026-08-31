// Solar sizing estimate — pure functions, no side effects, so they're
// trivially unit-testable and mirror the eventual backend implementation
// (docs/ARCHITECTURE.md §6). Assumptions are parameters here; the real
// backend reads them from the `settings` table instead of hard-coding.

import type { CalculatorInput, CalculatorResult } from "@/types";

export interface CalculatorAssumptions {
  peakSunHours: number;
  panelWattage: number;
  systemLossesPercent: number;
  tariffPkrPerUnit: number;
  panelAreaSqft: number; // area per panel, for roof-area estimate
}

// Matches the seed defaults in prisma/seed.ts `calculator.*` settings —
// keep these two in sync manually until Phase 3 wires the real endpoint.
export const DEFAULT_ASSUMPTIONS: CalculatorAssumptions = {
  peakSunHours: 5.5,
  panelWattage: 580,
  systemLossesPercent: 15,
  tariffPkrPerUnit: 55, // [CURRENT TARIFF PLACEHOLDER] — confirm before using in production
  panelAreaSqft: 30,
};

export const CALCULATOR_DISCLAIMER =
  "Final system sizing and savings depend on site conditions, electricity tariff, shading, equipment selection, and professional site assessment.";

/**
 * Very rough sizing pass, intentionally simple: this is the same shape
 * of estimate a real backend /api/calculator would compute, just without
 * DB-backed assumptions or city-level tariff/irradiance variation yet.
 */
export function calculateSolarEstimateLocally(
  input: CalculatorInput,
  assumptions: CalculatorAssumptions = DEFAULT_ASSUMPTIONS
): CalculatorResult {
  const monthlyUnits = input.monthlyUnits ?? Math.round(input.monthlyBill / assumptions.tariffPkrPerUnit);

  const dailyUnits = monthlyUnits / 30;
  const lossFactor = 1 - assumptions.systemLossesPercent / 100;
  const rawSystemSizeKw = dailyUnits / (assumptions.peakSunHours * lossFactor);

  // Round up to the nearest 0.5 kW, minimum 3 kW
  const recommendedSystemSizeKw = Math.max(3, Math.ceil(rawSystemSizeKw * 2) / 2);

  const estimatedPanelCount = Math.ceil((recommendedSystemSizeKw * 1000) / assumptions.panelWattage);

  const estimatedMonthlyGenerationKwh = Math.round(
    recommendedSystemSizeKw * assumptions.peakSunHours * 30 * lossFactor
  );
  const estimatedAnnualGenerationKwh = estimatedMonthlyGenerationKwh * 12;

  // Savings capped at the actual monthly bill — can't save more than you spend
  const estimatedMonthlySavingsPkr = Math.min(
    input.monthlyBill,
    estimatedMonthlyGenerationKwh * assumptions.tariffPkrPerUnit
  );
  const estimatedAnnualSavingsPkr = Math.round(estimatedMonthlySavingsPkr * 12);

  const roofAreaSqft = estimatedPanelCount * assumptions.panelAreaSqft;

  const result: CalculatorResult = {
    recommendedSystemSizeKw,
    estimatedPanelCount,
    estimatedMonthlyGenerationKwh,
    estimatedAnnualGenerationKwh,
    estimatedAnnualSavingsPkr,
    estimatedRoofAreaSqft: { min: Math.round(roofAreaSqft * 0.9), max: Math.round(roofAreaSqft * 1.1) },
    disclaimer: CALCULATOR_DISCLAIMER,
  };

  if (input.batteryRequired === "YES") {
    const hours = { "2": 2, "4": 4, "6": 6, "8_PLUS": 8 }[input.backupHours ?? "4"];
    const hourlyLoadKw = recommendedSystemSizeKw * 0.4; // rough essential-load fraction
    const batteryKwh = hourlyLoadKw * hours;
    result.recommendedBatteryCapacityKwh = {
      min: Math.round(batteryKwh * 0.85 * 10) / 10,
      max: Math.round(batteryKwh * 1.15 * 10) / 10,
    };
  }

  return result;
}
