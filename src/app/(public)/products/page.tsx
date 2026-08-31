"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Search,
  Zap,
  BatteryCharging,
  Truck,
  Building2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export interface ProductItem {
  id: string;
  name: string;
  series: string;
  category: "inverters" | "batteries" | "mobile-ess" | "ci-ess";
  categoryLabel: string;
  subtitle: string;
  powerOrCapacity: string;
  image: string;
  specs: string[];
  warranty: string;
  badge?: string;
  bestFor: string;
}

const ALL_PRODUCTS: ProductItem[] = [
  // -----------------------------------------------------------
  // RESIDENTIAL INVERTERS (PULSE & ROSA)
  // -----------------------------------------------------------
  {
    id: "pulse-s4-mini",
    name: "PULSE S4 Mini 4-6KW",
    series: "PULSE Series",
    category: "inverters",
    categoryLabel: "Residential Inverter",
    subtitle: "Single-Phase Hybrid Inverter for Home Storage",
    powerOrCapacity: "4 kW - 6 kW",
    image: "/images/products/pulse-s4-mini.png",
    specs: [
      "Single Phase Output",
      "Dual MPPT Tracking",
      "Max Efficiency 97.6%",
      "Wi-Fi App & Smart Monitoring",
      "IP65 Weatherproof Enclosure",
    ],
    warranty: "5 - 10 Years Warranty",
    badge: "Popular Home Choice",
    bestFor: "Standard 3kW to 6kW Residential Solar & Battery Backup",
  },
  {
    id: "pulse-s4",
    name: "PULSE S4 6-10KW",
    series: "PULSE Series",
    category: "inverters",
    categoryLabel: "Residential Inverter",
    subtitle: "High-Power Single-Phase Hybrid Solar Inverter",
    powerOrCapacity: "6 kW - 10 kW",
    image: "/images/products/pulse-s4.png",
    specs: [
      "Single Phase Output",
      "15A High PV Input Current",
      "Parallel Operation Support",
      "Smart Load Management",
      "UPS Fast Transfer < 10ms",
    ],
    warranty: "5 - 10 Years Warranty",
    badge: "High Capacity",
    bestFor: "Large Residential Homes & Heavy Appliance Loads",
  },
  {
    id: "pulse-s3",
    name: "PULSE S3",
    series: "PULSE Series",
    category: "inverters",
    categoryLabel: "Residential Inverter",
    subtitle: "Advanced Residential Hybrid Storage Inverter",
    powerOrCapacity: "3 kW - 8 kW",
    image: "/images/products/pulse-s3.png",
    specs: [
      "Off-Grid & Hybrid Dual Mode",
      "Seamless UPS Switching",
      "Lithium Battery Auto-Sync",
      "Dual AC Output",
      "Smart Energy Routing",
    ],
    warranty: "5 Years Warranty",
    bestFor: "Home Backup & Uninterrupted Power Supply",
  },
  {
    id: "pulse-s2",
    name: "PULSE S2",
    series: "PULSE Series",
    category: "inverters",
    categoryLabel: "Residential Inverter",
    subtitle: "Compact Entry-Level Residential Storage Inverter",
    powerOrCapacity: "3 kW - 5 kW",
    image: "/images/products/pulse-s2.png",
    specs: [
      "Ultra-Quiet Fanless Design",
      "Touch Display Console",
      "Overload Protection",
      "App Monitoring",
    ],
    warranty: "5 Years Warranty",
    bestFor: "Small Residential Homes & Apartment Storage",
  },
  {
    id: "rosa-t2",
    name: "ROSA T2",
    series: "ROSA Series",
    category: "inverters",
    categoryLabel: "Commercial & Residential Inverter",
    subtitle: "Three-Phase High-Voltage Hybrid Inverter",
    powerOrCapacity: "8 kW - 15 kW",
    image: "/images/products/rosa-t2.png",
    specs: [
      "3-Phase 400V Output",
      "High-Voltage Battery Compatible",
      "100% Unbalanced Load Output",
      "Dual MPPT Inputs",
      "Grid Net-Metering Ready",
    ],
    warranty: "5 - 10 Years Warranty",
    badge: "Three Phase",
    bestFor: "3-Phase Luxury Villas & Small Commercial Sites",
  },
  {
    id: "rosa-g2",
    name: "ROSA G2",
    series: "ROSA Series",
    category: "inverters",
    categoryLabel: "Commercial Inverter",
    subtitle: "Three-Phase Grid-Tied Commercial Inverter",
    powerOrCapacity: "10 kW - 25 kW",
    image: "/images/products/rosa-g2.png",
    specs: [
      "3-Phase Grid-Tie Topology",
      "Zero Export Control Capable",
      "Max Efficiency 98.4%",
      "Integrated AFCI Protection",
    ],
    warranty: "5 - 10 Years Warranty",
    bestFor: "Commercial Rooftops, Factories & Net-Metering",
  },

  // -----------------------------------------------------------
  // RESIDENTIAL ENERGY STORAGE BATTERIES (LIVO, COMO, POWERGOO)
  // -----------------------------------------------------------
  {
    id: "livo-16-pro",
    name: "LIVO 16 PRO",
    series: "LIVO Series",
    category: "batteries",
    categoryLabel: "Residential Battery",
    subtitle: "High-Capacity Stackable Lithium Battery Module",
    powerOrCapacity: "16.38 kWh",
    image: "/images/products/livo-16-pro.png",
    specs: [
      "51.2V LiFePO4 Chemistry",
      "6,000+ Deep Cycles @ 80% DOD",
      "Modular Stackable Expansion up to 131kWh",
      "Smart BMS with CAN/RS485 Comms",
    ],
    warranty: "10 Years Life / 5 Years Warranty",
    badge: "Best Seller",
    bestFor: "Whole-House Energy Independence & Heavy Loads",
  },
  {
    id: "livo-16e",
    name: "LIVO 16E",
    series: "LIVO Series",
    category: "batteries",
    categoryLabel: "Residential Battery",
    subtitle: "High-Energy Density Floor-Standing Battery System",
    powerOrCapacity: "16.0 kWh",
    image: "/images/products/livo-16e.png",
    specs: [
      "Premium LiFePO4 Cells",
      "High Discharge C-Rate",
      "Built-in Automatic Fire Suppression",
      "LCD Status Display",
    ],
    warranty: "5 Years Replacement Guarantee",
    bestFor: "High Load Floor-Standing Home Energy Storage",
  },
  {
    id: "livo-y",
    name: "LIVO-Y",
    series: "LIVO Series",
    category: "batteries",
    categoryLabel: "Residential Battery",
    subtitle: "Low-Voltage Wall-Mounted Lithium Battery",
    powerOrCapacity: "5.12 kWh",
    image: "/images/products/livo-y.png",
    specs: [
      "51.2V 100Ah LiFePO4",
      "Sleek Wall-Mount Slim Chassis",
      "Parallel Support up to 16 Units (81.9kWh)",
      "Maintenance-Free Lifespan",
    ],
    warranty: "5 Years Replacement Guarantee",
    badge: "Wall Mount",
    bestFor: "Compact Wall-Mounted Residential Storage",
  },
  {
    id: "como-h5",
    name: "COMO H5",
    series: "COMO Series",
    category: "batteries",
    categoryLabel: "Residential Battery",
    subtitle: "High-Voltage Stackable Energy Storage Cabinet",
    powerOrCapacity: "5.12 kWh - 25.6 kWh",
    image: "/images/products/como-h5.png",
    specs: [
      "High Voltage DC (200V - 500V)",
      "Plug-and-Play Quick Stacking",
      "IP65 Outdoor Water & Dust Shield",
      "Active Cell Balancing BMS",
    ],
    warranty: "5 - 10 Years Warranty",
    bestFor: "HV Inverter Pairing & Premium Villa Energy Storage",
  },
  {
    id: "powergoo-2000",
    name: "PowerGoo 2000",
    series: "PowerGoo Series",
    category: "batteries",
    categoryLabel: "Portable ESS",
    subtitle: "2000W Heavy-Duty Portable Solar Generator Power Station",
    powerOrCapacity: "2048 Wh / 2000W AC Output",
    image: "/images/products/powergoo-2000.png",
    specs: [
      "Pure Sine Wave AC Output",
      "800W Fast Solar Input Recharging",
      "Dual Wireless Charging Pads",
      "Ultra-Safe LiFePO4 Battery Cells",
    ],
    warranty: "2 Years Warranty",
    badge: "Portable",
    bestFor: "Outdoor Camping, Field Work & Emergency Home Load",
  },
  {
    id: "powergoo-1000",
    name: "PowerGoo 1000",
    series: "PowerGoo Series",
    category: "batteries",
    categoryLabel: "Portable ESS",
    subtitle: "1000W Portable Energy Storage Power Station",
    powerOrCapacity: "1024 Wh / 1000W AC Output",
    image: "/images/products/powergoo-1000.png",
    specs: [
      "Compact Carry Handle Chassis",
      "USB-C 100W PD Fast Charge Ports",
      "Direct Solar Panel Hookup",
      "Quiet Operation < 30dB",
    ],
    warranty: "2 Years Warranty",
    bestFor: "Mobile Electronics, Laptops & Small Home Backup",
  },
  {
    id: "po-01",
    name: "PO-01",
    series: "Accessories",
    category: "batteries",
    categoryLabel: "Energy Management",
    subtitle: "Smart Power Distribution & Energy Management System (EMS)",
    powerOrCapacity: "EMS Control Unit",
    image: "/images/products/po-01.jpg",
    specs: [
      "Real-time Smart Power Metering",
      "Automatic Generator Start Control",
      "Grid / Solar / Battery Priority Routing",
      "Remote App Fleet Control",
    ],
    warranty: "3 Years Warranty",
    bestFor: "Microgrid Management & Battery Fleet Synchronization",
  },

  // -----------------------------------------------------------
  // MOBILE & MICROGRID ESS (FLEXCUBE)
  // -----------------------------------------------------------
  {
    id: "flexcube-h",
    name: "FlexCube H",
    series: "FlexCube Series",
    category: "mobile-ess",
    categoryLabel: "Mobile & Microgrid ESS",
    subtitle: "Mobile Trailer Solar Hybrid Energy Storage System",
    powerOrCapacity: "15 kW / 30 kWh - 60 kWh",
    image: "/images/products/flexcube-h.png",
    specs: [
      "Road-Ready Trailer Mounted",
      "Hydraulic Fold-Out Solar Panel Array",
      "Hybrid Diesel Generator Sync Option",
      "GPS Tracking & Remote Telemetry",
    ],
    warranty: "5 Years Turnkey Warranty",
    badge: "Trailer Mounted",
    bestFor: "Disaster Relief, Remote Camps & Temporary Power",
  },
  {
    id: "flexcube-t",
    name: "FlexCube T",
    series: "FlexCube Series",
    category: "mobile-ess",
    categoryLabel: "Mobile & Microgrid ESS",
    subtitle: "Three-Phase Mobile Event & Construction Site ESS",
    powerOrCapacity: "30 kW / 60 kWh",
    image: "/images/products/flexcube-t.png",
    specs: [
      "Heavy-Duty Forklift Pockets & Lifting Eyes",
      "3-Phase 400V Industrial Output",
      "Low-Noise Zero Emission Operation",
      "Rapid Plug-and-Play Setup",
    ],
    warranty: "5 Years Turnkey Warranty",
    bestFor: "Construction Sites, Outdoor Events & Off-Grid Projects",
  },
  {
    id: "flexcube-e",
    name: "FlexCube E",
    series: "FlexCube Series",
    category: "mobile-ess",
    categoryLabel: "Mobile & Microgrid ESS",
    subtitle: "Outdoor Emergency Backup Energy Storage Cabinet",
    powerOrCapacity: "10 kW / 20 kWh",
    image: "/images/products/flexcube-e.png",
    specs: [
      "Integrated HVAC Temperature Control",
      "Rapid Emergency Deployment",
      "Automatic Grid Islanding Control",
      "Rugged Weather Shield Cabinet",
    ],
    warranty: "5 Years Warranty",
    bestFor: "Telecom Towers, Hospitals & Critical Infrastructure",
  },
  {
    id: "flexcube-c",
    name: "FlexCube C",
    series: "FlexCube Series",
    category: "mobile-ess",
    categoryLabel: "Mobile & Microgrid ESS",
    subtitle: "Compact Mobile Battery Power Box",
    powerOrCapacity: "5 kW / 10 kWh",
    image: "/images/products/flexcube-c.png",
    specs: [
      "Heavy Duty Lockable All-Terrain Wheels",
      "Built-in MPPT Solar Charge Controller",
      "Multi-Socket AC & DC Output Panel",
    ],
    warranty: "3 Years Warranty",
    bestFor: "Mobile Repair Units & Remote Field Operations",
  },
  {
    id: "flexcube-a",
    name: "FlexCube A",
    series: "FlexCube Series",
    category: "mobile-ess",
    categoryLabel: "Mobile & Microgrid ESS",
    subtitle: "All-Weather Off-Grid Microgrid Power Unit",
    powerOrCapacity: "8 kW / 16 kWh",
    image: "/images/products/flexcube-a.png",
    specs: [
      "IP66 Extreme Weather Enclosure",
      "Operating Range -20°C to +55°C",
      "Direct Solar Panel Plug-In",
    ],
    warranty: "5 Years Warranty",
    bestFor: "Off-Grid Cabins, Agricultural Pumps & Remote Sites",
  },

  // -----------------------------------------------------------
  // COMMERCIAL & INDUSTRIAL ESS (ATLAS)
  // -----------------------------------------------------------
  {
    id: "atlas-p261l",
    name: "ATLAS P261L",
    series: "ATLAS Series",
    category: "ci-ess",
    categoryLabel: "C&I Energy Storage",
    subtitle: "261kWh Industrial Liquid-Cooled BESS Cabinet",
    powerOrCapacity: "261 kWh / 100 kW PCS",
    image: "/images/products/atlas-p261l.png",
    specs: [
      "Advanced Liquid Cooling System",
      "Cell Temp Uniformity ΔT < 2.5°C",
      "Ultra-Safe LFP Battery Chemistry",
      "Multi-Layer Aerosol Fire Suppression",
      "BESS Cloud Analytics Platform",
    ],
    warranty: "10 Years Life Warranty",
    badge: "Liquid Cooled",
    bestFor: "Factory Peak Shaving, Industrial Complexes & Microgrids",
  },
  {
    id: "atlas-h261l",
    name: "ATLAS H261L",
    series: "ATLAS Series",
    category: "ci-ess",
    categoryLabel: "C&I Energy Storage",
    subtitle: "Containerized 261kWh High-Power C&I Energy Storage Container",
    powerOrCapacity: "261 kWh / 125 kW Hybrid PCS",
    image: "/images/products/atlas-h261l.png",
    specs: [
      "Pre-Engineered Turnkey Container",
      "Integrated High-Power Hybrid PCS",
      "Demand Charge Management System",
      "Black Start Capable",
    ],
    warranty: "10 Years Life Warranty",
    bestFor: "C&I Solar Self-Consumption & Factory Power Stability",
  },
  {
    id: "atlas-h120a",
    name: "ATLAS H120A",
    series: "ATLAS Series",
    category: "ci-ess",
    categoryLabel: "C&I Energy Storage",
    subtitle: "120kW / 240kWh Air-Cooled Commercial Energy Storage System",
    powerOrCapacity: "240 kWh / 120 kW",
    image: "/images/products/atlas-h120a.png",
    specs: [
      "Smart Air Duct Cooling Architecture",
      "Modular Parallel Expansion up to 2.4MWh",
      "Grid Frequency Regulation Ready",
      "Compact Footprint Design",
    ],
    warranty: "10 Years Life Warranty",
    bestFor: "Commercial Buildings, EV Charging Hubs & Solar Parks",
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "inverters" | "batteries" | "mobile-ess" | "ci-ess"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.bestFor.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      {/* Premium Animated Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0a203d] via-[#0F2D52] to-[#163a69] py-14 sm:py-18 text-white text-center px-4 shadow-lg">
        {/* Animated Background Sky Glow & Grid Patterns */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.4) 1px, transparent 1px),
                                linear-gradient(45deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 left-1/3 h-[280px] w-[500px] rounded-full bg-[#4bc4f9]/35 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/4 right-12 h-[320px] w-[420px] rounded-full bg-cyan-400/30 blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-3 py-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/30 shadow-md">
              <ShieldCheck className="h-4 w-4 text-cyan-300" /> ALP SOLAR · OFFICIAL PRODUCT CATALOG
            </span>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
            >
              Energy Inverters & Storage Solutions
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-300 font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            Official AlpSolarr Hybrid Inverters, Lithium Energy Storage Systems, Mobile ESS Trailers, and Industrial BESS Containers across Pakistan.
          </motion.p>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 space-y-8">
        
        {/* Category Tabs & Search Bar Header */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Products", count: ALL_PRODUCTS.length, icon: Layers },
              { id: "inverters", label: "Inverters", count: 6, icon: Cpu },
              { id: "batteries", label: "Batteries", count: 7, icon: BatteryCharging },
              { id: "mobile-ess", label: "Mobile ESS", count: 5, icon: Truck },
              { id: "ci-ess", label: "C&I ESS", count: 3, icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-[#0F2D52] text-white shadow-md shadow-cyan-900/20 scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? "bg-cyan-500 text-slate-950" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search PULSE, LIVO, ATLAS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 font-bold text-xs sm:text-sm focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-500 px-2">
          <span>
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of {ALL_PRODUCTS.length} Official Products
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-cyan-700 hover:underline font-bold"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Product Image Stage */}
                  <div className="relative h-60 w-full bg-[#0a192f] flex items-center justify-center p-6 overflow-hidden group-hover:bg-[#071324] transition-colors border-b border-slate-800">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-auto max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)] group-hover:scale-110 transition-transform duration-500 relative z-10"
                    />

                    {/* Series Badge Overlay */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-400/30 shadow-md">
                        {product.series}
                      </span>
                    </div>

                    {product.badge && (
                      <div className="absolute top-3 right-3 z-20">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> {product.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Header Info */}
                  <div className="bg-gradient-to-r from-slate-900 via-[#0F2D52] to-slate-900 p-5 text-white relative">
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 mt-1">
                      {product.subtitle}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-black">
                      <span className="text-slate-400 uppercase tracking-wider">Output / Capacity</span>
                      <span className="text-cyan-300 text-sm font-black">{product.powerOrCapacity}</span>
                    </div>
                  </div>

                  {/* Card Content & Specifications */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                        Key Specifications
                      </span>
                      <ul className="space-y-2">
                        {product.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-xs font-bold text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block">Recommended For:</span>
                      <p className="text-xs font-extrabold text-slate-800 mt-0.5">
                        {product.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-[11px]">{product.warranty}</span>
                  </div>

                  <Link
                    href={buildWhatsAppLink(
                      `Hi ALP Solar! I am interested in getting pricing and specs for ${product.name} (${product.series}). Please send details.`
                    )}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F2D52] hover:bg-emerald-600 text-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider shadow-md hover:scale-105 transition-all shrink-0"
                  >
                    <span>Get Price</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Turnkey Banner */}
        <div className="bg-gradient-to-r from-[#0a203d] via-[#0F2D52] to-[#163a69] rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-cyan-500/30 mt-12">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/30">
              <Zap className="h-4 w-4 text-cyan-300" /> Need Full Turnkey Installation?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Official AlpSolarr Equipment Supply & Installation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
              We provide complete system design, engineering, net-metering approval, and installation for all PULSE, ROSA, LIVO, and ATLAS systems across Pakistan.
            </p>
          </div>

          <Link
            href={buildWhatsAppLink("Hi ALP Solar! I need a complete solar installation quote with official AlpSolarr equipment.")}
            target="_blank"
            className="shrink-0 py-4 px-8 rounded-2xl bg-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl hover:bg-cyan-300 transition-all hover:scale-105"
          >
            Request Site Survey & Quote
          </Link>
        </div>

      </div>
    </div>
  );
}
