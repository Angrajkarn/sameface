"use client";

import { useState } from "react";
import { SITE } from "@/config/site";
import PageViewLogger from "@/components/PageViewLogger";
import Navbar from "@/components/Navbar";
import VidAiPromptBox from "@/components/VidAiPromptBox";
import VidAiHeroVideoMockup from "@/components/VidAiHeroVideoMockup";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import SocialAutomationSection from "@/components/SocialAutomationSection";
import EnterpriseFooter from "@/components/EnterpriseFooter";
import LiveLeadToast from "@/components/LiveLeadToast";

const c = SITE.bhasha;

export default function BhashaClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedChar, setSelectedChar] = useState<number>(0);

  const characterDemos = [
    {
      name: "चाचा चौधरी (Chacha Ji)",
      dialect: "भोजपुरी / अवधी कॉमेडी (Bhojpuri Comedy)",
      avatar: "👳‍♂️",
      voiceSample: "अरे का हो लल्ला! काहे मुँह फुला के बइठल बाड़ा?",
      phonemeAccuracy: "99.8%",
      popularNiche: "देसी हास्य व रील्स (Comedy Sketches)",
    },
    {
      name: "पंडित शास्त्री (Pandit Ji)",
      dialect: "संस्कृतनिष्ठ हिन्दी (Hindi Devotional)",
      avatar: "🪔",
      voiceSample: "सत्य और धर्म की विजय सदैव निश्चित होती है...",
      phonemeAccuracy: "100.0%",
      popularNiche: "पौराणिक व धार्मिक कथाएं (Mythological)",
    },
    {
      name: "नटखट चीकू (Chiku)",
      dialect: "सरल हिन्दी व हिंग्लिश (Kids Hindi/Hinglish)",
      avatar: "🧒",
      voiceSample: "मम्मा! आज जंगल में शेर और खरगोश की रेस हुई!",
      phonemeAccuracy: "99.9%",
      popularNiche: "बाल कहानियाँ व पंचतंत्र (Kids Stories)",
    },
    {
      name: "अम्मा (Amma)",
      dialect: "तमिल व तेलुगु क्षेत्रीय (Tamil/Telugu Accented)",
      avatar: "👵",
      voiceSample: "कथा सुनो बच्चों, यह बहुत पुरानी सीख है...",
      phonemeAccuracy: "99.7%",
      popularNiche: "शिक्षा व जीवन सीख (Moral Wisdom)",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-amber-600 selection:text-white">
      <PageViewLogger idea="bhasha" />
      <LiveLeadToast isIndic={true} />

      {/* ──── TOP NAVBAR ──── */}
      <Navbar
        brandName={c.name}
        badge={c.badge}
        accentColor="#E85D26"
        isIndic={true}
      />

      {/* ──── VID.AI STYLE HERO SECTION ──── */}
      <section className="relative isolate pt-28 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Vid.AI Signature Ambient Saffron / Amber Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] vidai-hero-radial-amber"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 -z-10 h-[560px] w-[560px] bg-[radial-gradient(circle_at_80%_10%,rgba(234,88,12,0.18),transparent_60%)]"
        />

        {/* Vid.AI Subtle Dot Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] opacity-40 dot-grid"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-x-12 gap-y-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8 xl:gap-x-14">
          {/* Left Column: Headline, Prompt Box, Feature Chips, Social Proof */}
          <div className="text-center lg:text-left">
            {/* Vid.AI Style Hero Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/[0.08] py-1 pl-1 pr-3 text-xs font-medium text-amber-100 hover:border-amber-400/45 transition">
              <span className="rounded-full bg-orange-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                BhashaToons 2.0
              </span>
              <span>14+ भारतीय भाषाएं</span>
              <span className="hidden sm:inline text-zinc-400">+ 1-क्लिक सोशल ऑटो-पोस्ट</span>
              <span className="text-amber-300">→</span>
            </div>

            {/* Devanagari Headline */}
            <h1 className="font-semibold text-amber-100 !leading-[1.08] !tracking-[-0.035em] mt-6 text-[2.4rem] sm:text-6xl xl:text-[3.9rem]">
              कार्टून वीडियो{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                आपकी भाषा में
              </span>
              <br />
              <span className="text-zinc-300 text-2xl sm:text-4xl xl:text-5xl font-bold mt-2 block">
                सोशल मीडिया पर ऑटो-पोस्ट।
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8 lg:mx-0">
              अपनी भाषा में प्रॉम्प्ट या स्क्रिप्ट लिखें। BhashaToons तैयार करता है देसी आवाज़, सटीक लिप-सिंक, देवनागरी सबटाइटल्स, और सीधे यूट्यूब, रील्स व फेसबुक पर पोस्ट करता है।
            </p>

            {/* Vid.AI Signature Interactive Conic Prompt Box */}
            <div id="signup" className="mt-8">
              <VidAiPromptBox
                idea="bhasha"
                brandName={c.name}
                accentColor="#E85D26"
                defaultPrompt="बीरबल की चतुराई: कैसे बीरबल ने भरी सभा में असली चोर की दाढ़ी से तिनका पकड़वाया..."
                formatOptions={c.formatOptions}
                priceSignalOptions={c.priceSignalOptions}
                isIndic={true}
              />
            </div>

            {/* Feature Bullet Pills with Glowing Dots */}
            <ul aria-label="Included in BhashaToons" className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                14+ क्षेत्रीय भाषाएं (हिन्दी, भोजपुरी, तमिल...)
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                देसी फोनिक्स न्यूरल लिप-सिंक
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                यूट्यूब शॉर्ट्स + रील्स ऑटो-पोस्ट
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                100% मोनेटाइजेशन अधिकार
              </li>
            </ul>

            {/* Creator Social Proof & Rating Bar */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center mt-7 lg:justify-start text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-orange-950 flex items-center justify-center text-xs">
                    👳‍♂️
                  </span>
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-amber-950 flex items-center justify-center text-xs">
                    🪔
                  </span>
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-red-950 flex items-center justify-center text-xs">
                    🧒
                  </span>
                  <span className="h-7 w-7 rounded-full border-2 border-black bg-orange-600 flex items-center justify-center text-xs text-white font-bold">
                    🇮🇳
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  <span>★★★★★</span>
                  <span className="font-semibold text-amber-100 ml-1">4.9</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-300 font-medium">2,000+ भारतीय क्रिएटर्स का भरोसा</span>
                </div>
              </div>

              <span className="hidden sm:inline text-zinc-700">|</span>
              <span className="text-zinc-400">यूट्यूब भारत व रील्स क्रिएटर नेटवर्क</span>
            </div>
          </div>

          {/* Right Column: Vid.AI Layered Floating Video Player Showcase */}
          <div className="lg:block">
            <VidAiHeroVideoMockup isIndic={true} />
          </div>
        </div>
      </section>

      {/* ──── INFINITE TESTIMONIAL MARQUEE ──── */}
      <TestimonialMarquee testimonials={c.testimonials} isIndic={true} />

      {/* ──── SUPPORTED REGIONAL LANGUAGES CHIP GRID ──── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#080503]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              14+ समर्थित भाषाएँ व बोलियाँ (Supported Dialects)
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {c.languages.map((lang, idx) => (
              <div
                key={idx}
                className="language-chip flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-colors shadow-md"
              >
                <span className="text-base font-bold text-white">{lang.name}</span>
                <span className="text-[11px] text-zinc-400 font-medium">({lang.script})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── INTERACTIVE REGIONAL VOICE & PHONEME LIP-SYNC STUDIO ──── */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#070503] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              देसी आवाज़ें व सटीक लिप-सिंक (Phoneme Precision)
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-100 mt-4 mb-3 tracking-tight">
              भारतीय भाषाओं के लिए प्रशिक्षित न्यूरल वॉइस व लिप-सिंक
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              नीचे पात्रों पर क्लिक करके देखें कि कैसे BhashaToons विभिन्न बोलियों में स्वाभाविक उच्चारण और सटीक होंठों की गति उत्पन्न करता है।
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-[28px] bg-zinc-950 border border-amber-500/20 shadow-2xl">
            {/* Character Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {characterDemos.map((char, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedChar(idx)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                    selectedChar === idx
                      ? "bg-amber-500/20 border-2 border-amber-500 shadow-lg scale-102"
                      : "bg-zinc-900/80 border border-white/5 hover:bg-zinc-800"
                  }`}
                >
                  <div className="text-3xl mb-2">{char.avatar}</div>
                  <div className="font-bold text-white text-sm truncate">{char.name}</div>
                  <div className="text-[11px] text-amber-400 truncate">{char.dialect.split(" ")[0]}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d0906] p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="lg:col-span-6 bg-black rounded-2xl p-6 border border-white/10 aspect-video flex flex-col justify-between items-center text-center relative overflow-hidden">
                <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    INDIAN PHONEME SYNC ACTIVE
                  </span>
                  <span>ACCURACY: {characterDemos[selectedChar].phonemeAccuracy}</span>
                </div>

                <div className="my-auto py-4">
                  <div className="text-8xl sm:text-9xl animate-wiggle select-none filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.4)]">
                    {characterDemos[selectedChar].avatar}
                  </div>
                  <div className="mt-3 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-amber-300">
                    &quot;{characterDemos[selectedChar].voiceSample}&quot;
                  </div>
                </div>

                <div className="w-full flex justify-between text-[11px] text-zinc-500 z-10 font-mono">
                  <span>बोली: {characterDemos[selectedChar].dialect}</span>
                  <span className="text-emerald-400">9:16 Shorts Ready</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-xs font-mono text-amber-400">पात्र प्रोफाइल (CHARACTER PROFILE)</span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {characterDemos[selectedChar].name}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2">
                    श्रेणी: <strong className="text-zinc-200">{characterDemos[selectedChar].popularNiche}</strong>
                  </p>
                </div>

                <div className="space-y-2.5 p-4 rounded-xl bg-black/60 border border-white/5 text-xs text-zinc-300 font-mono">
                  <div>
                    <span className="text-zinc-500">वॉयस डायलॉग सैंपल:</span>
                    <p className="text-amber-300 font-sans text-sm mt-1">{characterDemos[selectedChar].voiceSample}</p>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-zinc-500">देवनागरी फोनिक्स मैच:</span>
                    <span className="text-emerald-400 font-bold">{characterDemos[selectedChar].phonemeAccuracy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">सोशल ऑटो-पब्लिश:</span>
                    <span className="text-amber-400 font-bold">यूट्यूब शॉर्ट्स + रील्स + फेसबुक</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#signup"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20"
                  >
                    अपनी भाषा में कार्टून बनाएं →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── SOCIAL AUTO-PUBLISH SUITE ──── */}
      <SocialAutomationSection
        badge={c.socialAutomation.badge}
        title={c.socialAutomation.title}
        subtitle={c.socialAutomation.subtitle}
        platforms={c.socialAutomation.platforms}
        automationFeatures={c.socialAutomation.automationFeatures}
        accentColor="#E85D26"
        isIndic={true}
      />

      {/* ──── PIPELINE (HOW IT WORKS) ──── */}
      <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              ४ आसान चरण (The 4-Step Process)
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-100 mt-4 mb-3 tracking-tight">
              स्क्रिप्ट से लेकर सोशल मीडिया पर पोस्ट तक
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              एनिमेशन का कोई पूर्व अनुभव जरूरी नहीं। सब कुछ ऑटोमैटिक और आसान।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.pipeline.map((step) => (
              <div
                key={step.step}
                className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 relative flex flex-col justify-between hover:border-amber-500/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-amber-500">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                  <div className="text-xs font-semibold text-amber-400 mb-3">{step.subtitle}</div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── PRICING TIERS ──── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#0d0906]/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              किफायती भारतीय प्लान्स (Indian Pricing)
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-100 mt-4 mb-3 tracking-tight">
              अपनी सुविधानुसार चुनें। जब चाहें कैंसिल करें।
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">{c.pricing.note}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {c.pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-200 relative ${
                  tier.highlight
                    ? "bg-gradient-to-b from-[#1c0f08] to-black border-2 border-amber-500 shadow-2xl shadow-amber-500/20 md:-translate-y-2"
                    : "bg-zinc-950/80 border border-zinc-800"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
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
                        <span className="text-amber-400 font-bold mt-0.5">✓</span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#signup"
                  className={`w-full py-3.5 rounded-xl font-bold text-center text-sm transition-all duration-200 block ${
                    tier.highlight
                      ? "bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-500/30"
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

      {/* ──── FAQ ──── */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-100 tracking-tight">
              अक्सर पूछे जाने वाले सवाल (FAQ)
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              मोनेटाइजेशन, कॉपीराइट और सोशल ऑटो-पोस्टिंग से जुड़े सभी जवाब।
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
                  className="w-full py-5 text-left flex items-center justify-between gap-4 font-medium text-zinc-100 hover:text-amber-300 transition-colors cursor-pointer"
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
        <div className="relative isolate overflow-hidden rounded-[32px] border border-orange-500/25 bg-gradient-to-b from-orange-950/40 via-zinc-950 to-black px-4 py-14 shadow-[0_0_80px_rgba(234,88,12,0.18)] sm:px-12 sm:py-20 text-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-32 -z-10 mx-auto h-64 w-4/5 rounded-full bg-orange-600/20 blur-3xl pointer-events-none"
          />

          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="font-semibold text-amber-100 text-3xl sm:text-5xl tracking-tight leading-tight">
              आपका अगला वायरल कार्टून वीडियो सिर्फ{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
                एक प्रॉम्प्ट दूर है
              </span>
            </h2>
            <p className="mt-4 text-base text-zinc-400 sm:text-lg max-w-xl">
              अपनी भाषा में प्रॉम्प्ट लिखें। BhashaToons तैयार करेगा पात्र, देसी आवाज़, और सीधे आपके चैनल पर पोस्ट करेगा।
            </p>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <VidAiPromptBox
              idea="bhasha"
              brandName={c.name}
              accentColor="#E85D26"
              defaultPrompt="एक हास्य प्रसंग जहां बीरबल ने अपनी चतुराई से चोर को भरी सभा में पकड़ा..."
              formatOptions={c.formatOptions}
              priceSignalOptions={c.priceSignalOptions}
              isIndic={true}
            />
          </div>
        </div>
      </section>

      {/* ──── VID.AI STYLE FOOTER ──── */}
      <EnterpriseFooter
        brandName={c.name}
        tagline={c.tagline}
        accentColor="#E85D26"
        isIndic={true}
      />
    </div>
  );
}
