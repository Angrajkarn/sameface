"use client";

import { useState, useEffect } from "react";

// Official Launch Date: November 5, 2026 00:00:00 IST
const LAUNCH_DATE_MS = new Date("2026-11-05T00:00:00+05:30").getTime();

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

export default function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function calculateTime() {
      const now = Date.now();
      const diff = Math.max(0, LAUNCH_DATE_MS - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, totalMs: diff });
    }

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-6 rounded-3xl bg-zinc-950/80 border border-blue-500/20 animate-pulse h-36" />
    );
  }

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days, color: "from-blue-400 to-cyan-300" },
    { label: "HOURS", value: timeLeft.hours, color: "from-indigo-400 to-blue-300" },
    { label: "MINUTES", value: timeLeft.minutes, color: "from-purple-400 to-indigo-300" },
    { label: "SECONDS", value: timeLeft.seconds, color: "from-amber-400 to-orange-400" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 my-10">
      {/* Outer ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-[36px] bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-cyan-500/20 blur-2xl opacity-75"
      />

      <div className="relative overflow-hidden rounded-[28px] border border-blue-400/30 bg-gradient-to-b from-[#0a1128]/95 via-[#060a17]/95 to-black/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_70px_rgba(37,99,235,0.25)]">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 text-center sm:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              LAUNCH TIMELINE LOCKED
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Official World Premiere —{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                November 5, 2026
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Consistent AI Character Studio + 14 Indian Dialect Voices + Direct Auto-Publishing goes live globally.
            </p>
          </div>

          {/* Urgency Badge */}
          <div className="flex flex-col items-center sm:items-end gap-1.5 flex-shrink-0">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono shadow-[0_0_15px_rgba(251,191,36,0.15)]">
              ⏳ VIP FOUNDER PASS LOCKOUT
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              50% Lifetime Discount closes on launch
            </span>
          </div>
        </div>

        {/* 4-Box Ticking Digits Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-center transition-all duration-200 hover:border-blue-400/40 hover:bg-white/[0.05]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div
                className={`text-3xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-b ${block.color} bg-clip-text text-transparent tabular-nums`}
              >
                {String(block.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[11px] sm:text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                {block.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Ticker */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">●</span>
            <span className="text-zinc-300 font-medium">
              Target Date: <strong>November 5, 2026 (00:00 IST)</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-400 font-mono">Status: Private Alpha in Progress</span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <a
              href="#founder-pass"
              className="text-amber-300 hover:text-amber-200 font-bold underline transition-colors"
            >
              Lock 50% Lifetime Pass Before Countdown Hits Zero →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
