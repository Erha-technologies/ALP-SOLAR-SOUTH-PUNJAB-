"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  Zap,
  Sun,
  Cpu,
  BatteryCharging,
  Coins,
  Plus,
  Minus,
  Snowflake,
  Flame,
  Droplets,
  Tv,
  ShieldCheck,
  Building2,
  MapPin,
  Home,
  Check,
  Sparkles,
  HelpCircle,
  AlertCircle,
  Leaf,
  Maximize2,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

// Cities list & sun hours from solarcitizen.com.pk
const CITIES = [
  { name: "Multan", sunHours: 5.5 },
  { name: "Bahawalpur", sunHours: 5.7 },
  { name: "Lahore", sunHours: 5.0 },
  { name: "Islamabad", sunHours: 5.2 },
  { name: "Rawalpindi", sunHours: 5.2 },
  { name: "Karachi", sunHours: 5.5 },
  { name: "Faisalabad", sunHours: 5.5 },
  { name: "Peshawar", sunHours: 5.0 },
  { name: "Hyderabad", sunHours: 5.5 },
  { name: "Gujranwala", sunHours: 5.3 },
  { name: "Sialkot", sunHours: 5.3 },
  { name: "Quetta", sunHours: 5.8 },
  { name: "Sahiwal", sunHours: 5.5 },
  { name: "Other (Pakistan)", sunHours: 5.3 },
];

// Standardized Appliances List from solarcitizen.com.pk
interface ApplianceItem {
  id: string;
  name: string;
  watts: number;
  defaultHours: number;
  icon: any;
}

const APPLIANCES: ApplianceItem[] = [
  { id: "ac10", name: "AC 1.0 Ton (Inverter)", watts: 900, defaultHours: 8, icon: Snowflake },
  { id: "ac15", name: "AC 1.5 Ton (Inverter)", watts: 1200, defaultHours: 8, icon: Snowflake },
  { id: "ac20", name: "AC 2.0 Ton (Inverter)", watts: 1800, defaultHours: 8, icon: Snowflake },
  { id: "fan", name: "Ceiling Fan", watts: 80, defaultHours: 12, icon: Zap },
  { id: "light", name: "LED Light / Bulb", watts: 18, defaultHours: 8, icon: Sun },
  { id: "fridge", name: "Refrigerator / Freezer", watts: 250, defaultHours: 24, icon: Snowflake },
  { id: "tv", name: "LED TV", watts: 100, defaultHours: 5, icon: Tv },
  { id: "pump05", name: "Water Pump (½ HP)", watts: 400, defaultHours: 1, icon: Droplets },
  { id: "pump10", name: "Water Pump (1 HP)", watts: 750, defaultHours: 1, icon: Droplets },
  { id: "iron", name: "Electric Iron (Istri)", watts: 1200, defaultHours: 0.5, icon: Flame },
  { id: "washer", name: "Washing Machine", watts: 500, defaultHours: 1, icon: Zap },
];

export default function SolarCalculatorPage() {
  // Mode Switcher ('bill' | 'appliances')
  const [calcMode, setCalcMode] = useState<"bill" | "appliances">("bill");

  // Inputs
  const [billAmount, setBillAmount] = useState<string>("50000");
  const [selectedCitySunHours, setSelectedCitySunHours] = useState<string>("5.5"); // Multan default
  const [systemType, setSystemType] = useState<"ongrid" | "hybrid">("ongrid");

  // Appliance State: { [id]: { qty: number, hours: number } }
  const [appState, setAppState] = useState<{ [key: string]: { qty: number; hours: number } }>(() => {
    const initial: { [key: string]: { qty: number; hours: number } } = {};
    APPLIANCES.forEach((a) => {
      initial[a.id] = { qty: 0, hours: a.defaultHours };
    });
    return initial;
  });

  // Other small continuous daily load (kWh/day)
  const [otherKwh, setOtherKwh] = useState<number>(1.5);

  // Validation Error Message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Results State
  const [results, setResults] = useState<{
    calculated: boolean;
    sizeKw: number;
    panelsCount: number;
    monthlyGenUnits: number;
    roofSqFt: number;
    co2Tonnes: number;
    costRangeStr: string;
    cityName: string;
    inputSummary: string;
    waMessage: string;
  } | null>(null);

  // Appliance Totals Math
  const appTotals = useMemo(() => {
    let kwh = 0;
    let peakW = 0;

    APPLIANCES.forEach((a) => {
      const state = appState[a.id] || { qty: 0, hours: a.defaultHours };
      if (state.qty > 0) {
        kwh += (a.watts * state.qty * state.hours) / 1000;
        peakW += a.watts * state.qty;
      }
    });

    kwh += otherKwh;
    if (otherKwh > 0) peakW += 300; // Small continuous draw

    return {
      dailyKwh: kwh,
      peakKw: peakW / 1000,
    };
  }, [appState, otherKwh]);

  // Stepper handlers
  const updateAppQty = (id: string, delta: number) => {
    setAppState((prev) => {
      const current = prev[id] || { qty: 0, hours: 8 };
      const newQty = Math.max(0, Math.min(20, current.qty + delta));
      return { ...prev, [id]: { ...current, qty: newQty } };
    });
    setErrorMessage(null);
  };

  const updateAppHours = (id: string, hoursVal: number) => {
    const validHours = Math.max(0, Math.min(24, isNaN(hoursVal) ? 0 : hoursVal));
    setAppState((prev) => {
      const current = prev[id] || { qty: 0, hours: 8 };
      return { ...prev, [id]: { ...current, hours: validHours } };
    });
    setErrorMessage(null);
  };

  // ----------------------------------------------------
  // Solar Citizen Calculation Engine
  // ----------------------------------------------------
  const handleCalculate = () => {
    setErrorMessage(null);

    const sunHours = parseFloat(selectedCitySunHours);
    if (!sunHours || isNaN(sunHours)) {
      setErrorMessage("Please select your city so we can use the right sun hours.");
      return;
    }

    const cityObj = CITIES.find((c) => c.sunHours.toString() === selectedCitySunHours) || CITIES[0];
    const cityName = cityObj?.name ?? "Multan";

    const unitsPerKwhBill = 60; // Solar Citizen blended rate formula
    let monthlyUnits = 0;
    let inputSummaryStr = "";

    if (calcMode === "bill") {
      const billNum = parseInt(billAmount.replace(/,/g, ""), 10);
      if (!billNum || billNum < 1000) {
        setErrorMessage("Please enter your monthly electricity bill (PKR 1,000 or more).");
        return;
      }
      monthlyUnits = Math.round(billNum / unitsPerKwhBill);
      inputSummaryStr = `Monthly bill: PKR ${billNum.toLocaleString()}`;
    } else {
      const dailyKwh = appTotals.dailyKwh;
      if (dailyKwh < 1.5) {
        setErrorMessage("Please add your appliances above so we can estimate your load.");
        return;
      }
      monthlyUnits = Math.round(dailyKwh * 30);

      const appsSummary: string[] = [];
      APPLIANCES.forEach((a) => {
        const state = appState[a.id];
        if (state && state.qty > 0) {
          appsSummary.push(`${state.qty}x ${a.name} (${state.hours}h)`);
        }
      });

      inputSummaryStr = `Daily load: ${dailyKwh.toFixed(1)} kWh\nAppliances: ${
        appsSummary.length ? appsSummary.join(", ") : "(small continuous load)"
      }`;
    }

    // Calculation Math
    const genPerKw = sunHours * 30 * 0.78;
    const sizeRaw = monthlyUnits / genPerKw;
    let sizeKw = Math.ceil(sizeRaw);
    if (sizeKw < 3) sizeKw = 3;
    if (sizeKw > 50) sizeKw = 50;

    const panelsCount = Math.ceil((sizeKw * 1000) / 550); // 550W Tier-1 Panels
    const monthlyGenUnits = Math.round(sizeKw * genPerKw);
    const roofSqFt = sizeKw * 65; // ~65 sq ft per kW
    const co2Tonnes = Math.round(monthlyGenUnits * 12 * 0.0007 * 10) / 10;

    // Turnkey System Cost (PKR Lakhs)
    const ratePerKw = systemType === "ongrid" ? 1.25 : 1.50; // On-Grid vs Hybrid base rate
    const minCostLakhs = (sizeKw * ratePerKw * 0.95).toFixed(2);
    const maxCostLakhs = (sizeKw * ratePerKw * 1.05).toFixed(2);
    const costRangeStr = `Rs. ${minCostLakhs} - ${maxCostLakhs} Lakhs`;

    // Formatted WhatsApp Message
    const waMsg =
      `Hi ALP Solar! I calculated my system on your website calculator.\n\n` +
      `City: ${cityName}\n` +
      `${inputSummaryStr}\n` +
      `Recommended system: ${sizeKw} kW ${systemType === "ongrid" ? "On-Grid" : "Hybrid"}\n` +
      `Monthly generation: ~${monthlyGenUnits.toLocaleString()} units\n` +
      `Roof space needed: ~${roofSqFt} sq ft\n` +
      `Estimated system cost: ${costRangeStr}\n\n` +
      `Please send me an exact price quotation.`;

    setResults({
      calculated: true,
      sizeKw,
      panelsCount,
      monthlyGenUnits,
      roofSqFt,
      co2Tonnes,
      costRangeStr,
      cityName,
      inputSummary: inputSummaryStr,
      waMessage: waMsg,
    });

    // Smooth scroll to results
    setTimeout(() => {
      const resEl = document.getElementById("sc-results");
      if (resEl) {
        resEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      
      {/* Premium Animated Header Banner (Matching Contact Page) */}
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
          {/* Animated Ambient Glowing Orbs */}
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/30">
            ALP SOLAR · CALCULATOR
          </span>
          <div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
            >
              Solar System Calculator
            </motion.h1>
          </div>
          <p className="text-sm sm:text-base text-slate-300 font-semibold max-w-lg mx-auto leading-relaxed">
            Find the right system size for your home or office. Pricing on WhatsApp.
          </p>
        </div>
      </div>

      {/* Calculator Card Container */}
      <div className="max-w-3xl mx-auto px-4 mt-10 sm:mt-12">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6 text-white">
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700/60 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => {
                setCalcMode("bill");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs tracking-wider transition-all ${
                calcMode === "bill"
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              By bill
            </button>
            <span className="text-slate-600 font-bold text-xs">|</span>
            <button
              type="button"
              onClick={() => {
                setCalcMode("appliances");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs tracking-wider transition-all ${
                calcMode === "appliances"
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              By appliances
            </button>
          </div>

          {/* MODE 1: BY BILL */}
          {calcMode === "bill" && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Monthly Electricity Bill (PKR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => {
                    setBillAmount(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="e.g. 50,000"
                  className="w-full h-14 px-4 bg-slate-900/90 border border-slate-700 rounded-xl text-white font-black text-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all placeholder:text-slate-600 placeholder:font-normal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">PKR / mo</span>
              </div>
            </motion.div>
          )}

          {/* MODE 2: BY APPLIANCES */}
          {calcMode === "appliances" && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Your Appliances</span>
                <span className="text-[11px] font-semibold text-slate-400">Qty & Operating Hours</span>
              </div>

              {/* Appliance Grid */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                {APPLIANCES.map((a) => {
                  const Icon = a.icon;
                  const state = appState[a.id] || { qty: 0, hours: a.defaultHours };

                  return (
                    <div
                      key={a.id}
                      className="bg-slate-900/70 p-3 rounded-2xl border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{a.name}</h4>
                          <span className="text-[10px] font-semibold text-slate-400">{a.watts}W</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                        {/* Stepper */}
                        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
                          <button
                            type="button"
                            onClick={() => updateAppQty(a.id, -1)}
                            className="h-6 w-6 rounded-lg bg-slate-700 text-white flex items-center justify-center font-black text-xs hover:bg-slate-600 transition-all"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-black text-xs text-cyan-400">{state.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateAppQty(a.id, 1)}
                            className="h-6 w-6 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-xs hover:bg-cyan-400 transition-all"
                          >
                            +
                          </button>
                        </div>

                        {/* Hours Input */}
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            value={state.hours}
                            onChange={(e) => updateAppHours(a.id, parseFloat(e.target.value))}
                            className="w-12 h-8 px-1.5 bg-slate-800 border border-slate-700 rounded-xl text-center text-xs font-extrabold text-white focus:border-cyan-400 focus:outline-none"
                          />
                          <span className="text-[10px] font-bold text-slate-400">h/day</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Other small continuous load */}
              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white">Other small loads</h4>
                  <p className="text-[10px] font-semibold text-slate-400">Lights, TV, electronics, modem, chargers</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={otherKwh}
                    onChange={(e) => setOtherKwh(parseFloat(e.target.value) || 0)}
                    className="w-14 h-9 px-2 bg-slate-800 border border-slate-700 rounded-xl text-center text-xs font-black text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[10px] font-bold text-slate-400">kWh/day</span>
                </div>
              </div>

              {/* Daily Load Realtime Bar */}
              <div className="bg-cyan-500/10 p-3.5 rounded-2xl border border-cyan-500/20 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Total Estimated Daily Load</span>
                <span className="font-black text-cyan-400">
                  {appTotals.dailyKwh.toFixed(1)} kWh <span className="text-slate-500">·</span> Peak {appTotals.peakKw.toFixed(1)} kW
                </span>
              </div>
            </motion.div>
          )}

          {/* CITY SELECTION */}
          <div className="space-y-2.5">
            <label className="block text-sm sm:text-base font-extrabold text-slate-200 tracking-wide flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>Select Your City</span>
            </label>
            <div className="relative">
              <select
                value={selectedCitySunHours}
                onChange={(e) => {
                  setSelectedCitySunHours(e.target.value);
                  setErrorMessage(null);
                }}
                className="w-full h-14 sm:h-16 px-5 sm:px-7 pr-12 bg-slate-900/90 border-2 border-slate-700 hover:border-cyan-500/50 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15 rounded-2xl sm:rounded-full text-white font-extrabold text-sm sm:text-base cursor-pointer appearance-none transition-all shadow-lg shadow-black/20"
              >
                {CITIES.map((c) => (
                  <option key={c.name} value={c.sunHours.toString()} className="bg-slate-900 text-white font-bold py-2">
                    {c.name} ({c.sunHours} Peak Sun Hours / Day)
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <ChevronDown className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* SYSTEM TYPE RADIO GROUP */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300">
              System Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* On-Grid */}
              <label
                onClick={() => setSystemType("ongrid")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col ${
                  systemType === "ongrid"
                    ? "bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-500/10"
                    : "bg-slate-900/60 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="systemType"
                    checked={systemType === "ongrid"}
                    onChange={() => setSystemType("ongrid")}
                    className="accent-cyan-400 h-4 w-4"
                  />
                  <span className="text-xs font-black text-white">On-Grid</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 pl-6">
                  Net metering, no battery
                </span>
              </label>

              {/* Hybrid */}
              <label
                onClick={() => setSystemType("hybrid")}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col ${
                  systemType === "hybrid"
                    ? "bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-500/10"
                    : "bg-slate-900/60 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="systemType"
                    checked={systemType === "hybrid"}
                    onChange={() => setSystemType("hybrid")}
                    className="accent-cyan-400 h-4 w-4"
                  />
                  <span className="text-xs font-black text-white">Hybrid</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 pl-6">
                  Battery backup included
                </span>
              </label>
            </div>
          </div>

          {/* INLINE VALIDATION ERROR */}
          {errorMessage && (
            <div className="bg-amber-950/80 border border-amber-500/50 p-3.5 rounded-2xl text-amber-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* CALCULATE SUBMIT BUTTON */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-4 rounded-2xl bg-cyan-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            <span>Calculate My Solar Savings</span>
          </button>

        </div>

        {/* RESULTS DASHBOARD */}
        {results && results.calculated && (
          <motion.div
            id="sc-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-cyan-500/30 space-y-6"
          >
            <div className="border-b border-slate-700 pb-4 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                RECOMMENDATION SUMMARY
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Your Solar System Recommendation
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                Location: {results.cityName} ({systemType === "ongrid" ? "On-Grid System" : "Hybrid System with Battery Backup"})
              </p>
            </div>

            {/* 5 Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Metric 1: kW Size */}
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-700/80 text-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-black text-cyan-400 block tracking-tight">{results.sizeKw} kW</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-wider block mt-1.5">System Size</span>
              </div>

              {/* Metric 2: Panels */}
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-700/80 text-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">{results.panelsCount}</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-wider block mt-1.5">Solar Panels</span>
              </div>

              {/* Metric 3: Monthly Gen */}
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-700/80 text-center shadow-lg">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 block tracking-tight">~{results.monthlyGenUnits.toLocaleString()} Units</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-wider block mt-1.5">Monthly Generation</span>
              </div>

              {/* Metric 4: Roof Area */}
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-700/80 text-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 block tracking-tight">~{results.roofSqFt}</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-wider block mt-1.5">Roof Space (Sq. Ft.)</span>
              </div>

              {/* Metric 5: Total System Cost */}
              <div className="bg-[#0F2D52]/90 p-5 sm:p-6 rounded-2xl border-2 border-cyan-400 text-center col-span-2 sm:col-span-2 shadow-2xl shadow-cyan-500/15">
                <span className="text-3xl sm:text-4xl font-black text-cyan-300 block tracking-tight">
                  {results.costRangeStr || `Rs. ${(results.sizeKw * (systemType === 'ongrid' ? 1.25 : 1.50) * 0.95).toFixed(2)} - ${(results.sizeKw * (systemType === 'ongrid' ? 1.25 : 1.50) * 1.05).toFixed(2)} Lakhs`}
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-widest block mt-2">Total System Cost</span>
              </div>
            </div>

            {/* Direct WhatsApp Call-To-Action */}
            <div className="pt-2">
              <Link
                href={buildWhatsAppLink(results.waMessage)}
                target="_blank"
                className="w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Get Exact Price Quote on WhatsApp</span>
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}



