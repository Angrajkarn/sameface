"use client";

import { useState } from "react";
import { SITE } from "@/config/site";
import PageViewLogger from "@/components/PageViewLogger";
import Navbar from "@/components/Navbar";
import VidAiPromptBox from "@/components/VidAiPromptBox";
import VidAiHeroVideoMockup from "@/components/VidAiHeroVideoMockup";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import MultilingualSection from "@/components/MultilingualSection";
import SocialAutomationSection from "@/components/SocialAutomationSection";
import EnterpriseFooter from "@/components/EnterpriseFooter";
import LiveLeadToast from "@/components/LiveLeadToast";

const c = SITE.mascot;

export default function MascotClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeDemoEp, setActiveDemoEp] = useState<number>(0);

  const demoEpisodes = [
    {
      ep: "Ep 01: Pilot Journey",
      action: "Exploring Cyber City",
      vibe: "Energetic & Curious",
      prompt: "Sam the Fox entering neon alleyway, wide angle camera",
      consistencyScore: "99.8%",
    },
    {
      ep: "Ep 14: The Detective Case",
      action: "Interrogating the Robot",
      vibe: "Focused & Suspicious",
      prompt: "Sam the Fox holding magnifying gadget, closeup shot",
      consistencyScore: "100.0%",
    },
    {
      ep: "Ep 45: Space Station Rescue",
      action: "Floating in Zero-G",
      vibe: "Shocked & Determined",
      prompt: "Sam the Fox adjusting space helmet, 60fps dynamic motion",
      consistencyScore: "99.9%",
    },
    {
      ep: "Ep 120: Season 2 Finale",
      action: "Victory Celebration",
      vibe: "Joyful & Triumphant",
      prompt: "Sam the Fox high-fiving teammates, cinematic lighting",
      consistencyScore: "100.0%",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      <PageViewLogger idea="mascot" />

      {/* Vid.AI Signature Ambient Radial Glows spanning whole top including Navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] vidai-hero-radial-blue"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] bg-[radial-gradient(circle_at_80%_10%,rgba(147,51,234,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] opacity-40 dot-grid"
      />

      {/* ──── TOP NAVBAR (Seamlessly blended with page background) ──── */}
      <Navbar
        brandName={c.name}
        badge={c.badge}
        accentColor="#2563EB"
      />

      {/* ──── SAMEFACE HERO SECTION ──── */}
      <section className="relative isolate pt-2 pb-12 sm:pt-4 sm:pb-16">
        <div className="mx-auto grid max-w-7xl items-start gap-x-10 gap-y-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8 xl:gap-x-12">
          {/* Left Column: Headline, Prompt Box, Feature Chips, Social Proof */}
          <div className="text-center lg:text-left">
            {/* SameFace Hero Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/[0.08] py-1 pl-1 pr-3 text-xs font-medium text-indigo-100 hover:border-indigo-400/45 transition">
              <span className="rounded-full bg-[#6C4DFF] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                SameFace AI
              </span>
              <span>100% Character Consistency Engine</span>
              <span className="hidden sm:inline text-amber-300 font-semibold">• 🇮🇳 14+ Indian Languages</span>
              <span className="text-indigo-300">→</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-bold text-white !leading-[1.08] !tracking-[-0.035em] mt-4 sm:mt-5 text-[2.25rem] sm:text-5xl xl:text-[3.65rem]">
              Create your cartoon character once.{" "}
              <span className="bg-gradient-to-r from-[#6C4DFF] via-purple-300 to-amber-300 bg-clip-text text-transparent">
                Keep the exact same face across every video.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-3.5 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7 lg:mx-0">
              Stop losing character identity between prompts. SameFace locks geometry, styling, and clothing forever — then renders episodic cartoons with native lip-sync in <strong>14+ Indian languages</strong>, and auto-posts directly to YouTube, Instagram, TikTok &amp; Facebook.
            </p>

            {/* Vid.AI Signature Interactive Conic Prompt Box */}
            <div id="signup" className="mt-5 sm:mt-6">
              <VidAiPromptBox
                idea="sameface"
                brandName={c.name}
                accentColor="#6C4DFF"
                defaultPrompt="A friendly cartoon tiger explaining financial wisdom in Hindi with expressive gestures..."
                formatOptions={c.formatOptions}
                priceSignalOptions={c.priceSignalOptions}
              />
            </div>

            {/* Feature Bullet Pills with Glowing Dots */}
            <ul aria-label="Included in SameFace" className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                100% Mascot Identity Anchor
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-xs text-amber-300 font-semibold">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                🇮🇳 14+ Indian Languages &amp; Dialects
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                Sub-Frame Phoneme Lip-Sync
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                1-Click Multi-Channel Auto-Post
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                Full Commercial Rights
              </li>
            </ul>

            {/* Genuine Waitlist Social Proof Bar */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center mt-5 lg:justify-start text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                {/* Overlapping Avatar Circles */}
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-indigo-900/80 flex items-center justify-center text-xs">
                    🦊
                  </span>
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-purple-900/80 flex items-center justify-center text-xs">
                    🎨
                  </span>
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-amber-900/80 flex items-center justify-center text-xs">
                    🇮🇳
                  </span>
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-[#6C4DFF] flex items-center justify-center text-xs text-white font-bold">
                    ✓
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white">Join the Early Access Waiting List</span>
                </div>
              </div>

              <span className="hidden sm:inline text-zinc-700">|</span>
              <span className="text-amber-300 font-semibold">Priority 50% Founder Discount on Launch</span>
            </div>
          </div>

          {/* Right Column: Vid.AI Layered Floating Video Player Showcase */}
          <div className="lg:block lg:-mt-4 xl:-mt-6">
            <VidAiHeroVideoMockup />
          </div>
        </div>
      </section>

      {/* ──── INFINITE TESTIMONIAL MARQUEE ──── */}
      <TestimonialMarquee testimonials={c.testimonials} />

      {/* ──── INTERACTIVE CHARACTER CONSISTENCY VIEWER ──── */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#050814]/80 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              Identity Anchor Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-100 mt-4 mb-3 tracking-tight">
              Watch The Same Mascot Across 100+ Episodes
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Standard AI changes character appearance every single prompt. SameFace locks geometry, clothing, and style forever.
            </p>
          </div>

          {/* Interactive Episode Switcher */}
          <div className="p-6 sm:p-10 rounded-[28px] bg-zinc-950 border border-blue-400/20 shadow-2xl">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
              {demoEpisodes.map((demo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDemoEp(idx)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    activeDemoEp === idx
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {demo.ep}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070b17] p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="lg:col-span-6 bg-black rounded-2xl p-6 border border-white/10 aspect-video flex flex-col justify-between items-center text-center relative overflow-hidden">
                <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    DNA LOCK ACTIVE
                  </span>
                  <span>ZERO DRIFT</span>
                </div>

                <div className="my-auto py-4">
                  <div className="text-8xl sm:text-9xl animate-wiggle select-none filter drop-shadow-[0_10px_20px_rgba(59,130,246,0.4)]">
                    🦊
                  </div>
                  <div className="mt-3 text-xs font-mono text-blue-400">
                    &quot;Sam the Fox&quot; • {demoEpisodes[activeDemoEp].action}
                  </div>
                </div>

                <div className="w-full flex justify-between text-[11px] text-zinc-500 z-10 font-mono">
                  <span>Scene: {demoEpisodes[activeDemoEp].vibe}</span>
                  <span className="text-blue-300 font-bold">Match: {demoEpisodes[activeDemoEp].consistencyScore}</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-xs font-mono text-blue-400">EPISODE PARAMETERS</span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {demoEpisodes[activeDemoEp].ep}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2">
                    Active Action Beat: <strong className="text-zinc-200">{demoEpisodes[activeDemoEp].action}</strong>
                  </p>
                </div>

                <div className="space-y-2.5 p-4 rounded-xl bg-black/60 border border-white/5 text-xs text-zinc-300 font-mono">
                  <div>
                    <span className="text-zinc-500">Prompt:</span>
                    <p className="text-zinc-300 mt-0.5">{demoEpisodes[activeDemoEp].prompt}</p>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-zinc-500">Facial Proportion Lock:</span>
                    <span className="text-emerald-400 font-bold">{demoEpisodes[activeDemoEp].consistencyScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Multi-Channel Broadcast:</span>
                    <span className="text-blue-400 font-bold">YouTube, IG, TikTok, FB</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#signup"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Lock Your Mascot DNA →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 14+ INDIAN LANGUAGES & BHARAT REGIONAL STUDIO ──── */}
      <MultilingualSection />

      {/* ──── SOCIAL AUTO-PUBLISH SUITE (YOUTUBE, IG, TIKTOK, FB) ──── */}
      <SocialAutomationSection
        badge={c.socialAutomation.badge}
        title={c.socialAutomation.title}
        subtitle={c.socialAutomation.subtitle}
        platforms={c.socialAutomation.platforms}
        automationFeatures={c.socialAutomation.automationFeatures}
        accentColor="#2563EB"
      />

      {/* ──── PIPELINE (HOW IT WORKS) ──── */}
      <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              The 4-Step Studio Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-100 mt-4 mb-3 tracking-tight">
              From Character Design To Multi-Channel Broadcast
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              A high-velocity production workflow built for solo creators, faceless channels, and media networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.pipeline.map((step) => (
              <div
                key={step.step}
                className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 relative flex flex-col justify-between hover:border-blue-500/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-blue-500">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                  <div className="text-xs font-semibold text-blue-400 mb-3">{step.subtitle}</div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── PRICING TIERS ──── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#070b17]/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-100 mt-4 mb-3 tracking-tight">
              Simple Creator Plans. Cancel Anytime.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">{c.pricing.note}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {c.pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-200 relative ${
                  tier.highlight
                    ? "bg-gradient-to-b from-[#0a122c] to-black border-2 border-blue-500 shadow-2xl shadow-blue-500/20 md:-translate-y-2"
                    : "bg-zinc-950/80 border border-zinc-800"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-xs text-zinc-400 mb-6">{tier.description}</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {c.pricing.currency}{tier.price}
                    </span>
                    <span className="text-sm font-semibold text-zinc-400">
                      {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-sm text-zinc-300 mb-8">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5">
                        <span className="text-blue-400 font-bold mt-0.5">✓</span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#signup"
                  className={`w-full py-3.5 rounded-xl font-bold text-center text-sm transition-all duration-200 block ${
                    tier.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/30"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 border border-white/10"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── FAQ ("QUESTIONS, ANSWERED") ──── */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-100 tracking-tight">
              Questions, answered
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Everything you need to know about SameFace, character consistency, and auto-publishing.
            </p>
          </div>

          <div className="space-y-3">
            {c.faq.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-5 transition-colors duration-150 hover:border-zinc-700"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-5 text-left flex items-center justify-between gap-4 font-medium text-zinc-100 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  <span className="text-zinc-400 text-xl flex-shrink-0">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-900 pt-3 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── VID.AI SIGNATURE BOTTOM CONTAINER ──── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-10 sm:pb-28">
        <div className="relative isolate overflow-hidden rounded-[32px] border border-blue-400/25 bg-gradient-to-b from-blue-950/50 via-zinc-950 to-black px-4 py-14 shadow-[0_0_80px_rgba(59,130,246,0.18)] sm:px-12 sm:py-20 text-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-32 -z-10 mx-auto h-64 w-4/5 rounded-full bg-blue-500/25 blur-3xl pointer-events-none"
          />

          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="font-semibold text-blue-100 text-3xl sm:text-5xl tracking-tight leading-tight">
              Your next cartoon episode is{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                one prompt away
              </span>
            </h2>
            <p className="mt-4 text-base text-zinc-400 sm:text-lg max-w-xl">
              Describe your idea below. SameFace locks the character, animates the lip-sync, and auto-posts to your channels.
            </p>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <VidAiPromptBox
              idea="sameface"
              brandName={c.name}
              accentColor="#6C4DFF"
              defaultPrompt="A cartoon series where our mascot teaches science secrets to teens in Hindi..."
              formatOptions={c.formatOptions}
              priceSignalOptions={c.priceSignalOptions}
            />
          </div>
        </div>
      </section>

      {/* ──── VID.AI STYLE FOOTER ──── */}
      <EnterpriseFooter
        brandName={c.name}
        tagline={c.tagline}
        accentColor="#2563EB"
      />
    </div>
  );
}
