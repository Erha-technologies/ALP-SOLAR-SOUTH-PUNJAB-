import { getSolarSystemTypes } from "@/lib/api";
import { SolarSystemTypes } from "@/components/sections/SolarSystemTypes";

export async function SolarSystemTypesSection() {
  const systems = await getSolarSystemTypes();
  return <SolarSystemTypes systems={systems} />;
}
