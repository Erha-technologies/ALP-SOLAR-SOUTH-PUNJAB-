import type { City } from "@/types";

// Only cities actually configured here should render service-area pages —
// brief §24/§53: "Do not create fake service locations."
export const cities: City[] = [
  { id: "city-1", slug: "lahore", name: "Lahore", province: "Punjab" },
  { id: "city-2", slug: "islamabad", name: "Islamabad", province: "Islamabad Capital Territory" },
  { id: "city-3", slug: "rawalpindi", name: "Rawalpindi", province: "Punjab" },
  { id: "city-4", slug: "multan", name: "Multan", province: "Punjab" },
  { id: "city-5", slug: "faisalabad", name: "Faisalabad", province: "Punjab" },
  { id: "city-6", slug: "gujranwala", name: "Gujranwala", province: "Punjab" },
  { id: "city-7", slug: "sialkot", name: "Sialkot", province: "Punjab" },
  { id: "city-8", slug: "peshawar", name: "Peshawar", province: "Khyber Pakhtunkhwa" },
  { id: "city-9", slug: "karachi", name: "Karachi", province: "Sindh" },
];
