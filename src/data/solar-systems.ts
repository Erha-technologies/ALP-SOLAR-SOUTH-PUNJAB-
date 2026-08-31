import type { SolarSystemInfo } from "@/types";

export const solarSystemTypes: SolarSystemInfo[] = [
  {
    type: "ON_GRID",
    label: "On-Grid",
    bestFor: "Reducing electricity bills",
    description:
      "Panels feed power directly into your home or business alongside the grid connection, offsetting the units you'd otherwise buy from the utility.",
    gridConnection: "Connected — exports excess generation via net metering where available.",
    batteryInfo: "No battery. Lowest-cost entry point into solar.",
    backupInfo: "No backup during a grid outage — the inverter shuts off for safety.",
  },
  {
    type: "HYBRID",
    label: "Hybrid",
    bestFor: "Bill reduction and backup power",
    description:
      "Combines grid-tied solar with battery storage, so surplus daytime generation is stored and used to carry essential loads through an outage.",
    gridConnection: "Connected, with automatic switch-over to battery during loadshedding.",
    batteryInfo: "Battery sized to your chosen backup duration — see the calculator.",
    backupInfo: "Seamless backup for the circuits you choose to protect.",
  },
  {
    type: "OFF_GRID",
    label: "Off-Grid",
    bestFor: "Locations without reliable grid access",
    description:
      "A fully self-sufficient system — panels, batteries, and inverter sized to carry the entire site's load independently of the utility grid.",
    gridConnection: "None. Independent of the utility grid entirely.",
    batteryInfo: "Larger battery bank sized for full daily load, not just backup.",
    backupInfo: "Continuous — the site never depends on grid availability.",
  },
];
