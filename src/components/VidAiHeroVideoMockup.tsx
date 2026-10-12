"use client";

import { useState } from "react";

interface Props {
  isIndic?: boolean;
  accentColor?: string;
}

export default function VidAiHeroVideoMockup({ isIndic, accentColor = "#6C4DFF" }: Props) {
  const [widescreenMuted, setWidescreenMuted] = useState(true);
  const [selectedEp, setSelectedEp] = useState<number>(0);

  const episodes = [
    {
      id: "SkVqJ1SGeL0",
      shortId: "Z4C82eyhwgU",
      name: "Ep 01: Pilot Episode",
      desc: "Llamigo Character Debut",
      time: "2:30",
    },
    {
      id: "Z4C82eyhwgU",
      shortId: "SkVqJ1SGeL0",
      name: "Ep 08: Bharat Tour",
      desc: isIndic ? "14+ भारतीय भाषाएँ" : "14+ Dialects Matched",
      time: "2:15",
    },
    {
      id: "_cMxraX_5RE",
      shortId: "Z4C82eyhwgU",
      name: "Ep 14: Cyber Adventure",
      desc: "4K 60FPS Dynamic Motion",
      time: "3:40",
    },
  ];

  const currentEp = episodes[selectedEp];

  return (
    <div className="relative mx-auto w-full max-w-[640px] select-none pb-2">
      {/* Dynamic Ambient Backlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-8 -z-10 h-72 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,77,255,0.4),rgba(56,189,248,0.2),transparent_70%)] blur-3xl animate-pulse"
      />

      {/* 3D Elevated Laptop / Widescreen Studio Mockup (Properly Positioned Without Clipping) */}
      <div className="relative transition-transform duration-500 hover:-translate-y-1 shadow-[0_25px_80px_-15px_rgba(108,77,255,0.45),0_20px_50px_rgba(0,0,0,0.95)]">
        <div className="relative rounded-[22px] sm:rounded-[26px] border border-indigo-400/35 bg-gradient-to-b from-[#121629] via-[#090d1f] to-black p-2 sm:p-2.5 backdrop-blur-xl">
          
          {/* Top Laptop / Studio Header Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 mb-2 rounded-xl bg-black/75 border border-white/10 text-[11px] text-zinc-300 font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
              <span className="font-bold text-white tracking-wide text-[10px] sm:text-xs">
                ● REC: SameFace_{currentEp.name.replace(/[^a-zA-Z0-9]/g, "_")}_{isIndic ? "Hindi" : "4K"}.mp4
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[9px] sm:text-[10px]">
                DNA LOCK: 100%
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-[9px] sm:text-[10px]">
                4K 60FPS
              </span>
            </div>
          </div>

          {/* Screen Display Canvas with Real YouTube Cartoon Embed */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px] bg-black border border-white/10">
            {/* Real Cartoon Video Embed from YouTube */}
            <iframe
              key={`wide-${currentEp.id}-${widescreenMuted}`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
              src={`https://www.youtube-nocookie.com/embed/${currentEp.id}?autoplay=1&mute=${widescreenMuted ? 1 : 0}&loop=1&playlist=${currentEp.id}&controls=1&modestbranding=1&playsinline=1&rel=0`}
              title="SameFace Character Consistency Cartoon Episode"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Top HUD Floating Overlays (Pointer events none so user can click video controls) */}
            <div className="absolute top-2.5 inset-x-3 flex justify-between items-center text-[10px] text-zinc-300 font-mono pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-indigo-300 font-bold flex items-center gap-1.5 shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
                NEURAL LIP-SYNC ACTIVE
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-amber-300 font-semibold shadow-lg">
                {isIndic ? "🇮🇳 14+ Dialects Matched" : "Native Phoneme Audio Match"}
              </span>
            </div>

            {/* Bottom Subtitle Bar & Sound Toggle */}
            <div className="absolute bottom-2 inset-x-3 flex justify-between items-center pointer-events-none z-10">
              <div className="bg-black/85 backdrop-blur-md text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-lg border border-indigo-400/40 shadow-lg truncate max-w-[220px] sm:max-w-none">
                {isIndic ? "« नमस्ते! Same character in every scene! »" : "« Identity Locked across 100+ episodes! »"}
              </div>

              <button
                type="button"
                onClick={() => setWidescreenMuted(!widescreenMuted)}
                className="pointer-events-auto px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-200 hover:text-white hover:bg-black transition-all flex items-center gap-1.5 shadow-lg shrink-0"
              >
                <span>{widescreenMuted ? "🔇 Unmute" : "🔊 Audio On"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lifted Floating Smartphone Mockup (Shorts / Reels) with Real YouTube Cartoon Embed */}
      <div className="absolute -right-2 sm:-right-4 bottom-14 sm:bottom-16 w-[42%] sm:w-[38%] z-30 transition-transform duration-500 hover:-translate-y-1.5">
        <div className="relative rounded-[26px] sm:rounded-[30px] border-2 border-indigo-300/40 bg-zinc-950/95 p-1.5 sm:p-2 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(108,77,255,0.4)] backdrop-blur-2xl">
          {/* Phone Speaker Notch */}
          <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-1.5" />

          {/* Vertical 9:16 Screen Canvas with Embedded Cartoon YouTube Video */}
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black border border-white/10">
            {/* Embedded YouTube Cartoon Video in 9:16 vertical view */}
            <iframe
              key={`short-${currentEp.shortId}`}
              className="absolute inset-0 w-full h-full object-cover scale-[1.3] origin-center pointer-events-auto"
              src={`https://www.youtube-nocookie.com/embed/${currentEp.shortId}?autoplay=1&mute=1&loop=1&playlist=${currentEp.shortId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
              title="SameFace Vertical Shorts Cartoon Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Top Shorts Indicator Overlay */}
            <div className="absolute top-2 inset-x-2 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-zinc-300 pointer-events-none z-10">
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-black tracking-wider shadow">
                SHORTS
              </span>
              <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-black/70 border border-emerald-400/30">
                9:16 AUTO
              </span>
            </div>

            {/* Right Side Social Viral Metrics (Overlay) */}
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 text-[8px] font-bold text-white pointer-events-none z-10">
              <span className="px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 shadow">
                ❤️ 184K
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 shadow">
                💬 4.2K
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 shadow">
                ↗️ 32K
              </span>
            </div>

            {/* Bottom Viral Subtitle Banner Overlay */}
            <div className="absolute bottom-2 inset-x-2 text-center pointer-events-none z-10 space-y-1">
              <span className="inline-block text-[8px] sm:text-[9px] font-black text-amber-300 bg-black/90 px-2 py-0.5 rounded-lg border border-amber-400/40 shadow-md">
                « Same face in EVERY episode! 🔥 »
              </span>
              <p className="text-[7px] sm:text-[8px] text-zinc-300 font-mono bg-black/70 rounded py-0.5 px-1">
                1-Click Auto-Post to Reels &amp; Shorts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Live Episode Selector & Multi-Platform Status (Fills Space Below Seamlessly) */}
      <div className="mt-8 rounded-2xl bg-zinc-950/80 border border-white/10 p-3 sm:p-3.5 space-y-2.5 backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-zinc-200 font-bold text-[11px] sm:text-xs">
              Character Episodes (Same Face Locked):
            </span>
          </div>
          <span className="text-[10px] text-indigo-300 font-semibold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
            Multi-Platform Sync
          </span>
        </div>

        {/* Clickable Episode Chips */}
        <div className="grid grid-cols-3 gap-2">
          {episodes.map((ep, idx) => (
            <button
              key={ep.name}
              type="button"
              onClick={() => setSelectedEp(idx)}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                selectedEp === idx
                  ? "bg-indigo-600/30 border border-indigo-400 text-white shadow-md"
                  : "bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]"
              }`}
            >
              <div className="text-[10px] sm:text-[11px] font-bold truncate">
                {ep.name}
              </div>
              <div className="text-[9px] text-zinc-400 truncate mt-0.5">
                {ep.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Sync Summary Footnote */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-zinc-400 font-mono">
          <span>📺 Left: 16:9 YouTube Master</span>
          <span className="text-zinc-600">•</span>
          <span>📱 Right: 9:16 Shorts/Reels Auto-Crop</span>
          <span className="text-zinc-600">•</span>
          <span className="text-emerald-400 font-semibold">✓ 1-Click Sync</span>
        </div>
      </div>
    </div>
  );
}
