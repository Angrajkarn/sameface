"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
  brandName?: string;
  badge?: string;
  accentColor?: string;
  isIndic?: boolean;
}

export default function Navbar({
  brandName = "SameFace",
  badge = "AI Cartoon Studio & Multi-Platform Publisher",
  accentColor = "#6C4DFF",
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full z-40 relative pt-3 pb-2 sm:pt-4 sm:pb-3 bg-transparent">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-black/40 border border-white/10 flex-shrink-0">
            <img
              src="/sameface-logo.svg"
              alt={brandName}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-gray-100">
                {brandName}
              </span>
              <span
                className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-indigo-300 bg-indigo-500/20 border border-indigo-400/30"
              >
                Studio AI
              </span>
            </div>
            <p className="text-[10px] text-gray-400 hidden lg:block truncate max-w-[200px]">
              {badge}
            </p>
          </div>
        </Link>

        {/* Desktop Scroller Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-gray-300">
          <a
            href="#features"
            className="hover:text-white transition-colors duration-200"
          >
            Consistency Engine
          </a>
          <a
            href="#founder-pass"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:text-amber-200 font-bold transition-all hover:scale-105"
          >
            <span>💎</span>
            <span>Founder Pass</span>
          </a>
          <a
            href="#multilingual"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 hover:text-blue-200 font-semibold transition-all hover:scale-105"
          >
            <span>🇮🇳</span>
            <span>14+ Languages</span>
          </a>
          <a
            href="#social-automation"
            className="hover:text-white transition-colors duration-200 text-blue-300"
          >
            Auto-Publish
          </a>
          <a
            href="#pricing"
            className="hover:text-white transition-colors duration-200"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors duration-200"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#signup"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            Claim Founder Pass →
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl bg-gray-900/90 border border-white/10 text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl bg-gray-950/95 backdrop-blur-xl border border-white/10 p-5 space-y-3.5 shadow-2xl animate-fade-in">
          <a
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-200 font-medium py-1 text-sm hover:text-white"
          >
            🎭 Consistency Engine
          </a>
          <a
            href="#multilingual"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-amber-300 font-semibold py-1 text-sm"
          >
            <span>🇮🇳</span>
            <span>14+ Indian Languages &amp; Bharat Studio</span>
          </a>
          <a
            href="#social-automation"
            onClick={() => setMobileOpen(false)}
            className="block text-blue-300 font-medium py-1 text-sm hover:text-white"
          >
            ⚡ Social Auto-Publish Suite
          </a>
          <a
            href="#pipeline"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-200 font-medium py-1 text-sm hover:text-white"
          >
            ⚙️ How It Works (Pipeline)
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-200 font-medium py-1 text-sm hover:text-white"
          >
            💎 Pricing (50% Lifetime Founder Discount)
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-200 font-medium py-1 text-sm hover:text-white"
          >
            ❓ FAQ
          </a>
          <div className="pt-2 border-t border-white/10">
            <a
              href="#signup"
              onClick={() => setMobileOpen(false)}
              className="block text-center w-full py-3 rounded-xl font-bold text-white shadow-lg text-sm"
              style={{ backgroundColor: accentColor }}
            >
              Claim Founder Pass &amp; 50% Off →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
