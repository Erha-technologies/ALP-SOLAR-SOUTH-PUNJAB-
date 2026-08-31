"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SolarSystemInfo, SystemType } from "@/types";
import { cn } from "@/lib/utils";

export function SolarSystemTypes({ systems }: { systems: SolarSystemInfo[] }) {
  const [active, setActive] = useState<SystemType>(systems[0]?.type ?? "ON_GRID");
  const activeSystem = systems.find((s) => s.type === active) ?? systems[0];

  return (
    <section className="bg-surface-muted py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <span className="eyebrow">System Types</span>
          <h2 className="mt-1.5 font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-[#0F2D52] tracking-tight leading-snug">Choose the Right Setup</h2>
        </div>

        <div className="mt-10 flex gap-1 border-b border-border" role="tablist" aria-label="Solar system types">
          {systems.map((system) => (
            <button
              key={system.type}
              role="tab"
              aria-selected={active === system.type}
              onClick={() => setActive(system.type)}
              className={cn(
                "relative px-5 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base",
                active === system.type ? "text-primary" : "text-muted hover:text-ink2"
              )}
            >
              {system.label}
              {active === system.type && (
                <motion.span
                  layoutId="system-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeSystem && (
            <motion.div
              key={activeSystem.type}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"
            >
              <SystemDiagram type={activeSystem.type} />

              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-accent">
                  Best for: {activeSystem.bestFor}
                </span>
                <p className="mt-3 text-base leading-relaxed text-ink2">{activeSystem.description}</p>

                <dl className="mt-6 space-y-4 border-t border-border pt-6">
                  <div className="flex gap-4">
                    <dt className="w-32 shrink-0 text-sm font-medium text-muted">Grid connection</dt>
                    <dd className="text-sm text-ink2">{activeSystem.gridConnection}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-32 shrink-0 text-sm font-medium text-muted">Battery</dt>
                    <dd className="text-sm text-ink2">{activeSystem.batteryInfo}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-32 shrink-0 text-sm font-medium text-muted">Backup</dt>
                    <dd className="text-sm text-ink2">{activeSystem.backupInfo}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Sun, Zap, Home, BatteryCharging, UtilityPole, ShieldCheck, Power, Activity } from "lucide-react";

function SystemDiagram({ type }: { type: SystemType }) {
  const isHybrid = type === "HYBRID";
  const isOffGrid = type === "OFF_GRID";
  const isOnGrid = type === "ON_GRID";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-[#041527] p-4 sm:p-7 shadow-[0_20px_50px_rgba(3,12,22,0.9)] text-white select-none group">
      {/* Dynamic Background Radial Aura based on Mode */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.22)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(228,193,85,0.15)_0%,transparent_60%)]" />

      {/* Top Status Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3.5 mb-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="font-poppins text-xs font-bold uppercase tracking-wider text-cyan-300">
            Mode: <span className="text-amber-400 font-extrabold">{type.replace("_", " ")}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-cyan-950/90 border border-cyan-400/40 px-3 py-1 text-[11px] font-bold text-cyan-300 flex items-center gap-1.5 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>
              {isOnGrid && "Net Metering Active"}
              {isHybrid && "Smart Dual Backup"}
              {isOffGrid && "100% Self-Sufficient"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Diagram Grid */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Tier: PV Panels -> Solar Inverter -> Home Load */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 text-center items-stretch">
          {/* 1. Solar PV Array Node with Real Photo */}
          <div className="flex flex-col items-center rounded-2xl bg-[#082038] border border-cyan-500/30 p-2.5 sm:p-4 shadow-md transition-transform hover:scale-[1.02]">
            <div className="relative w-full h-14 sm:h-20 rounded-xl overflow-hidden mb-2 border border-cyan-400/40 shadow-inner">
              <Image
                src="/images/gallery-solar-farm.jpg"
                alt="Solar Panel Array"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1.5 flex items-center gap-1 text-[10px] font-bold text-amber-300">
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span className="hidden sm:inline">PV Array</span>
              </div>
            </div>
            <span className="font-poppins text-xs font-bold text-slate-100">Solar Panels</span>
            <span className="mt-0.5 text-[10px] text-cyan-300 font-mono font-medium">8.5 kW Gen</span>
          </div>

          {/* 2. Solar Hybrid / On-Grid Inverter Node with Real Graphic */}
          <div className="flex flex-col items-center rounded-2xl bg-gradient-to-b from-[#0f3a69] to-[#071f38] border-2 border-cyan-400/80 p-2.5 sm:p-4 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-transform hover:scale-[1.02]">
            <div className="relative w-full h-14 sm:h-20 rounded-xl overflow-hidden mb-2 border border-cyan-400/50 bg-[#06182c] p-1 flex items-center justify-center">
              <Image
                src="/images/gallery-portable-power.webp"
                alt="AlpSolar Smart Hybrid Inverter"
                fill
                className="object-contain p-1"
              />
              <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="font-poppins text-xs font-extrabold text-white">Smart Inverter</span>
            <span className="mt-0.5 text-[10px] text-emerald-400 font-mono font-semibold">
              {isOffGrid ? "Off-Grid MPPT" : isHybrid ? "Hybrid 98.6%" : "On-Grid MPPT"}
            </span>
          </div>

          {/* 3. Home Load Node */}
          <div className="flex flex-col items-center rounded-2xl bg-[#082038] border border-slate-700/80 p-2.5 sm:p-4 shadow-md transition-transform hover:scale-[1.02]">
            <div className="flex h-14 sm:h-20 w-full items-center justify-center rounded-xl bg-slate-900/90 border border-slate-700 mb-2">
              <Home className="h-7 w-7 text-amber-400" />
            </div>
            <span className="font-poppins text-xs font-bold text-slate-100">Home & Load</span>
            <span className="mt-0.5 text-[10px] text-amber-300 font-mono font-medium">4.2 kW Load</span>
          </div>
        </div>

        {/* Dynamic Mode-Specific Animated Connection Bar */}
        <div className="relative py-2 flex items-center justify-between text-xs text-slate-300 font-mono">
          <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 rounded-full animate-pulse opacity-80" />
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-[#051a30] rounded-full border border-cyan-500/30">
            {isOnGrid && "⚡ Panels ➔ Inverter ➔ Net-Metering Grid"}
            {isHybrid && "⚡ Panels ➔ Hybrid Inverter ➔ Battery & Grid"}
            {isOffGrid && "⚡ Panels ➔ Off-Grid Inverter ➔ AlpSolar Battery"}
          </span>
          <div className="h-1 flex-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 rounded-full animate-pulse opacity-80" />
        </div>

        {/* Bottom Tier: Battery Storage & Utility Grid Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* AlpSolar Smart Battery Unit Node */}
          <div
            className={`flex items-center gap-3 rounded-2xl p-3 sm:p-3.5 transition-all ${
              !isOnGrid
                ? "bg-[#092b4d] border-2 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                : "bg-slate-900/60 border border-slate-800 opacity-50"
            }`}
          >
            <div className="relative w-12 h-14 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-cyan-400/40 p-0.5 shadow-inner">
              <Image
                src="/images/gallery-battery-bank.webp"
                alt="AlpSolar Smart Battery Cabinet"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <BatteryCharging className={`w-4 h-4 ${!isOnGrid ? "text-emerald-400" : "text-slate-500"}`} />
                <span className="font-poppins text-xs font-bold text-white">AlpSolar Smart Battery</span>
              </div>
              {!isOnGrid ? (
                <>
                  <span className="text-[11px] text-emerald-300 font-mono font-semibold mt-0.5">
                    {isOffGrid ? "25kWh Capacity • 100% Off-Grid" : "15kWh Backup • 98% Charged"}
                  </span>
                  <span className="text-[9px] text-slate-300">Continuous Night & Outage Power</span>
                </>
              ) : (
                <span className="text-[10px] text-slate-400 mt-0.5">No Battery (Grid Tied Only)</span>
              )}
            </div>
          </div>

          {/* DISCO Utility Grid Node */}
          <div
            className={`flex items-center gap-3 rounded-2xl p-3 sm:p-3.5 transition-all ${
              !isOffGrid
                ? "bg-[#092b4d] border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                : "bg-slate-900/60 border border-slate-800 opacity-50"
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-400/50 text-cyan-300 shadow-inner">
              <UtilityPole className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <Zap className={`w-4 h-4 ${!isOffGrid ? "text-amber-400" : "text-slate-500"}`} />
                <span className="font-poppins text-xs font-bold text-white">DISCO Utility Grid</span>
              </div>
              {!isOffGrid ? (
                <>
                  <span className="text-[11px] text-cyan-300 font-mono font-semibold mt-0.5">
                    Net Metering Bi-Directional
                  </span>
                  <span className="text-[9px] text-slate-300">Export Excess & Reduce Bills</span>
                </>
              ) : (
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">Grid Disconnected (Zero Bills)</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
