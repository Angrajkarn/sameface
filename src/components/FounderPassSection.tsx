"use client";

import { useState } from "react";

export default function FounderPassSection() {
  const [previewEmail, setPreviewEmail] = useState("");
  const [copiedToken, setCopiedToken] = useState(false);

  const displayHandle = previewEmail.trim()
    ? previewEmail.split("@")[0].toUpperCase()
    : "YOUR_NAME";
  const passSerial = "SF-VIP-2026";

  function handleCopyToken() {
    navigator.clipboard.writeText("FOUNDER50");
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2200);
  }

  return (
    <section id="founder-pass" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 overflow-hidden bg-gradient-to-b from-[#050814] via-[#070b1a] to-black">
      {/* Background ambient lighting orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-amber-500/10 blur-[120px] rounded-full"
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            EXCLUSIVE LAUNCH PROTOCOL · NOV 5, 2026
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Official{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              SameFace VIP Founder Pass
            </span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Reserved exclusively for the first 10,000 creators and animation studios. Guarantee your lifetime 50% discount and jump the queue on world premiere day.
          </p>

          {/* Allocation Progress Bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-400 font-semibold">Founder Allocation Cap:</span>
              <span className="text-amber-400 font-bold">7,420 / 10,000 Claimed (2,580 Remaining)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-900 border border-white/10 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] transition-all duration-500"
                style={{ width: "74.2%" }}
              />
            </div>
          </div>
        </div>

        {/* 2-Column Showcase: Left: 3D Holographic Pass | Right: Privileges Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: 3D Holographic Metallic Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md group perspective-1000">
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-400/30 via-purple-500/30 to-blue-500/30 blur-xl opacity-80 group-hover:opacity-100 transition duration-300" />

              {/* Holographic Card Container */}
              <div className="relative rounded-[28px] border-2 border-amber-400/40 bg-gradient-to-br from-[#0c1228] via-[#080d1e] to-black p-7 sm:p-8 text-white shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Iridescent diagonal shimmer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.06)_50%,transparent_75%)] opacity-70 group-hover:translate-x-1/2 transition-transform duration-1000"
                />

                {/* Top Row: SameFace Logo + VIP Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 p-2 border border-blue-400/50 shadow-lg flex items-center justify-center">
                      <img src="/sameface-logo.svg" alt="SameFace" className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <div className="text-base font-black tracking-wider text-white">SAMEFACE</div>
                      <div className="text-[10px] font-mono tracking-widest text-blue-300">STUDIO PROTOCOL</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black font-mono shadow-md uppercase">
                      VIP FOUNDER
                    </span>
                  </div>
                </div>

                {/* Card Center: Chip + Serial */}
                <div className="py-6 space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Golden Cyber Chip */}
                    <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 border border-amber-200/60 p-1 flex items-center justify-center shadow-inner">
                      <div className="w-full h-full border border-amber-800/40 rounded flex flex-col justify-around px-0.5">
                        <div className="h-px bg-amber-900/50" />
                        <div className="h-px bg-amber-900/50" />
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <span className="text-zinc-500 block text-[10px]">VERIFIED SERIAL</span>
                      <span className="text-amber-300 font-bold tracking-wider">{passSerial}</span>
                    </div>
                  </div>

                  {/* Holder Dynamic Name */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      AUTHORIZED PASS HOLDER:
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-black text-white truncate tracking-wider">
                      {displayHandle}
                    </div>
                    <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Status: 50% Lifetime Rate Locked (Nov 5, 2026)
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Credits + Token */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-zinc-400 text-[10px] block">AIRDROP CREDITS:</span>
                    <span className="text-emerald-300 font-black">1,000 4K UHD</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-400 text-[10px] block">PROMO TOKEN:</span>
                    <span className="text-amber-300 font-black tracking-widest">FOUNDER50</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Preview Bar */}
            <div className="mt-5 w-full max-w-md bg-zinc-950/80 border border-white/10 rounded-2xl p-3 flex items-center gap-2">
              <span className="text-xs text-zinc-400 pl-2">Preview with your email:</span>
              <input
                type="text"
                placeholder="you@domain.com"
                value={previewEmail}
                onChange={(e) => setPreviewEmail(e.target.value)}
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
          </div>

          {/* RIGHT: High-Velocity Privileges Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/25">
                VIP BATCH PRIVILEGES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                What You Get With The Founder Pass
              </h3>
              <p className="text-sm text-zinc-400">
                Lock these perks now before public pricing takes effect on November 5, 2026:
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Perk 1 */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-amber-400/40 transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0 text-lg">
                  💎
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">50% Lifetime Price Lock Forever</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Grandfathered pricing for life. Even when SameFace scales and adds new features, your monthly rate never increases.
                  </p>
                </div>
              </div>

              {/* Perk 2 */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-blue-400/40 transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-300 flex-shrink-0 text-lg">
                  ⚡
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">1,000 Free 4K Animation Credits ($120 Value)</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Airdropped to your account on launch day (Nov 5, 2026). Render multiple full episodic cartoon pilots with zero cost.
                  </p>
                </div>
              </div>

              {/* Perk 3 */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-purple-400/40 transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-300 flex-shrink-0 text-lg">
                  🚀
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Day-1 Priority Render Queue</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Bypass public waiting lines with dedicated high-speed GPU clusters tuned for immediate sub-minute rendering.
                  </p>
                </div>
              </div>

              {/* Perk 4 */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-emerald-400/40 transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 flex-shrink-0 text-lg">
                  🇮🇳
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">14+ Indian Dialects &amp; Multi-Channel Auto-Post Suite</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Native phoneme lip-sync in Hindi, Tamil, Telugu, Bengali, Marathi, and 1-click publishing to YouTube Shorts &amp; Instagram Reels.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Box */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#signup"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 text-center"
              >
                Claim Your Founder Pass Now →
              </a>

              <button
                onClick={handleCopyToken}
                className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-zinc-900 border border-white/10 hover:border-amber-400/40 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                {copiedToken ? "✓ Token 'FOUNDER50' Copied!" : "📋 Copy Token: FOUNDER50"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
