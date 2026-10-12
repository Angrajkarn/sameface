"use client";

import { useState, useEffect } from "react";

interface Props {
  isIndic?: boolean;
}

export default function LiveLeadToast({ isIndic }: Props) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const notifications = isIndic
    ? [
        { name: "अमित कुमार", location: "मुंबई", action: "ने फाउंडर पास #954 क्लेम किया", time: "2 मिनट पहले", avatar: "👳‍♂️" },
        { name: "रोहित शर्मा", location: "दिल्ली", action: "ने 50% लाइफटाइम डिस्काउंट लॉक किया", time: "1 मिनट पहले", avatar: "🧒" },
        { name: "प्रिया एस.", location: "बेंगलुरु", action: "ने 1,000 फ्री 4K क्रेडिट्स अनलॉक किए", time: "अभी-अभी", avatar: "🌟" },
        { name: "विकास यादव", location: "पटना", action: "ने भोजपुरी कॉमेडी चैनल रजिस्टर किया", time: "4 मिनट पहले", avatar: "🎭" },
      ]
    : [
        { name: "Sam K.", location: "Austin, TX", action: "claimed Founder Pass #954", time: "2m ago", avatar: "🦊" },
        { name: "David M.", location: "London, UK", action: "locked 50% Lifetime Discount", time: "1m ago", avatar: "🚀" },
        { name: "Elena R.", location: "Toronto, CA", action: "unlocked 1,000 Free 4K Credits", time: "just now", avatar: "💎" },
        { name: "Liam B.", location: "Sydney, AU", action: "registered Faceless Shorts Channel", time: "3m ago", avatar: "⚡" },
      ];

  useEffect(() => {
    // Show first toast after 3 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    // Rotate every 11 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 800);
    }, 11000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [notifications.length]);

  if (!visible) return null;

  const current = notifications[index];

  return (
    <aside
      aria-label="Live waitlist activity"
      className="fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl border border-blue-400/30 bg-zinc-950/95 p-3.5 shadow-2xl backdrop-blur-xl animate-fade-in flex items-center gap-3 text-xs"
    >
      <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-base shrink-0">
        {current.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 font-bold text-white truncate">
          <span>{current.name}</span>
          <span className="text-[10px] text-zinc-400 font-normal">({current.location})</span>
        </div>
        <div className="text-zinc-300 truncate">
          {current.action}
        </div>
        <div className="text-[10px] text-blue-400 font-mono mt-0.5 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>{current.time}</span>
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-zinc-500 hover:text-zinc-300 p-1 cursor-pointer"
        aria-label="Dismiss toast"
      >
        ✕
      </button>
    </aside>
  );
}
