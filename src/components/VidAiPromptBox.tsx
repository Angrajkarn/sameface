"use client";

import { useState, useEffect, type FormEvent } from "react";
import { submitSignup } from "@/lib/firestore";
import ShareButtons from "./ShareButtons";

interface Props {
  idea?: "sameface" | "mascot" | "bhasha" | string;
  brandName: string;
  accentColor: string;
  defaultPrompt: string;
  formatOptions: readonly { label: string; icon: string }[];
  priceSignalOptions: readonly string[];
  isIndic?: boolean;
}

export default function VidAiPromptBox({
  idea = "sameface",
  brandName,
  accentColor,
  defaultPrompt,
  formatOptions,
  priceSignalOptions,
  isIndic,
}: Props) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [email, setEmail] = useState("");
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [step, setStep] = useState<"form" | "price" | "pass">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passNumber, setPassNumber] = useState(972);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setPassNumber(954 + Math.floor(Math.random() * 40));
  }, []);

  const discountCode = isIndic ? "BHARAT50" : "FOUNDER50";
  const passCode = `${isIndic ? "BHARAT" : "SF"}-VIP-${passNumber}`;

  async function handleGenerate(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError(isIndic ? "कृपया अपना मान्य ईमेल दर्ज करें" : "Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formatLabel = formatOptions[selectedFormat]?.label || "Default";
      const useCaseCombined = `${formatLabel}: ${prompt.slice(0, 80)}`;
      const res = await submitSignup({
        email,
        idea,
        useCase: useCaseCombined,
        pricePick: "",
      });

      if (!res.ok && res.reason === "duplicate") {
        setError(isIndic ? "आप पहले से ही वेटलिस्ट में हैं! 🎉" : "You're already on the priority list! 🎉");
      }

      setStep("price");
    } catch {
      setStep("price");
    } finally {
      setLoading(false);
    }
  }

  async function handlePricePick(pick: string) {
    const formatLabel = formatOptions[selectedFormat]?.label || "Default";
    await submitSignup({
      email,
      idea,
      useCase: `${formatLabel}: ${prompt.slice(0, 80)}`,
      pricePick: pick,
    }).catch(() => {});
    setStep("pass");
  }

  function copyPassCode() {
    navigator.clipboard.writeText(discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  }

  // ──── STEP 3: HIGH-CONVERTING VIP FOUNDER PASS CERTIFICATE ────
  if (step === "pass") {
    return (
      <div className="rounded-[28px] p-6 sm:p-8 bg-[#070b17] border-2 border-blue-400/40 text-center space-y-6 shadow-[0_20px_80px_rgba(37,99,235,0.35)] animate-fade-in max-w-2xl mx-auto">
        {/* VIP Pass Badge Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-white/10 text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0b122c] border border-blue-400/40 p-1.5 flex items-center justify-center shadow-lg">
              <img src="/sameface-logo.svg" alt="SameFace" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                  {isIndic ? "आधिकारिक फाउंडर पास" : "OFFICIAL FOUNDER PASS"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  PASS #{passNumber}
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                {isIndic ? "लाइफटाइम ५०% डिस्काउंट लॉक हो गया!" : "50% Lifetime Discount Locked!"}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Synced: work@sameface.in
            </span>
          </div>
        </div>

        {/* Certificate Card Body */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-left space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500">HOLDER:</span>
              <p className="text-zinc-200 font-bold truncate">{email}</p>
            </div>
            <div>
              <span className="text-zinc-500">PASS CODE:</span>
              <p className="text-blue-300 font-bold">{passCode}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-zinc-500">FREE CREDITS:</span>
              <p className="text-emerald-400 font-bold">1,000 4K Credits ($120 Value)</p>
            </div>
          </div>

          {/* Discount Code Copy Box */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b122c] border border-blue-400/40">
            <div>
              <span className="text-[10px] font-mono text-blue-300 uppercase">
                {isIndic ? "आपका कूपन कोड (Your Promo Token)" : "Your VIP Launch Token"}
              </span>
              <div className="text-lg font-mono font-black text-white tracking-widest">
                {discountCode}
              </div>
            </div>

            <button
              onClick={copyPassCode}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
            >
              {copiedCode ? "Copied! ✓" : "Copy Code 📋"}
            </button>
          </div>
        </div>

        {/* Perks Checklist */}
        <div className="text-left text-xs text-zinc-300 space-y-2 pt-1 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{isIndic ? "लॉन्च के दिन आपके ईमेल पर ऑटो-क्रेडिट लिंक भेजा जाएगा" : "Early access invite token automatically routed to your email"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{isIndic ? "यूट्यूब व सोशल मीडिया ऑटो-पोस्टिंग एक्सेस सुरक्षित" : "Direct social media auto-publishing suite unlocked"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{isIndic ? "Google Workspace लेजर में सुरक्षित पंजीकृत" : "Directly recorded in Google Workspace (work@sameface.in)"}</span>
          </div>
        </div>

        {/* Viral Accelerator Share Section */}
        <div className="pt-2">
          <p className="text-xs font-bold text-amber-300 mb-1">
            🚀 {isIndic ? "२ दोस्तों को इनवाइट करें और कतार में सबसे आगे आएं!" : "Invite 2 creator friends to skip to #1 in queue!"}
          </p>
          <ShareButtons idea={idea} brandName={brandName} />
        </div>
      </div>
    );
  }

  // ──── STEP 2: PRICING SURVEY QUESTION ────
  if (step === "price") {
    return (
      <div className="rounded-[26px] p-8 bg-[#070b17] border border-blue-400/30 text-center space-y-5 shadow-2xl animate-fade-in max-w-2xl mx-auto">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-mono font-bold uppercase">
            {isIndic ? "फाउंडर बेनिफिट्स अनलॉक" : "FOUNDER BATCH PERK"}
          </span>
          <h3 className="text-xl font-bold text-white mt-2">
            {isIndic ? "आप किस प्लान के साथ 50% लाइफटाइम छूट लॉक करना चाहेंगे?" : "Which tier would you like to lock your 50% lifetime discount on?"}
          </h3>
          <p className="text-xs text-zinc-400">
            {isIndic ? "कोई अग्रिम भुगतान नहीं। लॉन्च डे पर आपको यही रेट हमेशा के लिए मिलेगा।" : "No credit card needed today. Locks your grandfathered founder price forever."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          {priceSignalOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handlePricePick(opt)}
              className="flex-1 px-4 py-3.5 rounded-xl border border-blue-400/40 bg-blue-500/10 hover:bg-blue-600 hover:text-white text-blue-200 text-xs sm:text-sm font-semibold transition-all duration-150 hover:scale-[1.02] cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={() => setStep("pass")}
          className="text-xs text-zinc-500 hover:text-zinc-300 underline cursor-pointer"
        >
          {isIndic ? "पास देखें (View Pass)" : "Continue to My VIP Pass →"}
        </button>
      </div>
    );
  }

  // ──── STEP 1: VID.AI ROTATING CONIC PROMPT INPUT ────
  return (
    <div className="space-y-3">
      <form onSubmit={handleGenerate} className="group/prompt relative mx-auto max-w-2xl lg:mx-0">
        {/* Outer ambient blur glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-[34px] opacity-70 blur-2xl transition-opacity duration-300 group-focus-within/prompt:opacity-100"
          style={{ backgroundColor: `${accentColor}33` }}
        />

        {/* Spinning conic border container */}
        <div className="relative overflow-hidden rounded-[26px] p-px shadow-[0_24px_70px_-20px_rgba(37,99,235,0.55)] transition-shadow duration-150">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-blue-400/50 via-blue-500/20 to-white/10"
          />

          <div
            aria-hidden="true"
            className="home-spin absolute left-1/2 top-1/2 -ml-[500px] -mt-[500px] h-[1000px] w-[1000px] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,rgba(147,197,253,0.95)_300deg,transparent_340deg)] opacity-80"
          />

          {/* Inner Dark Form Container */}
          <div className="relative rounded-[25px] bg-[#070b17] transition-colors duration-150 group-focus-within/prompt:bg-[#080d1d] p-1">
            {/* Prompt Textarea */}
            <label htmlFor={`prompt-${idea}`} className="sr-only">
              Describe the cartoon video you want to make
            </label>
            <textarea
              id={`prompt-${idea}`}
              rows={3}
              maxLength={500}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                isIndic
                  ? "वर्णन करें: एक हास्य प्रसंग जहां बीरबल ने अपनी चतुराई से चोर को पकड़ा..."
                  : "A documentary-style cartoon series of a detective fox uncovering neon city mysteries..."
              }
              className="block h-[5.5rem] w-full resize-none bg-transparent px-5 pt-4 text-sm sm:text-base leading-6 text-zinc-50 caret-blue-300 placeholder:text-zinc-500 focus:outline-none"
            />

            {/* Email input line directly integrated */}
            <div className="px-4 pb-2">
              <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-3 py-2 focus-within:border-blue-400/70">
                <span className="text-xs text-zinc-400">✉️</span>
                <input
                  type="email"
                  required
                  placeholder={isIndic ? "अपना ईमेल दर्ज करें (50% डिस्काउंट टोकन हेतु)..." : "Enter your email to claim 50% Lifetime Founder Pass..."}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  id={`email-${idea}`}
                />
              </div>
            </div>

            {/* Bottom Bar: Format Pills + Generate Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-2 sm:pl-4 border-t border-white/5">
              {/* Format selection pills */}
              <div role="group" aria-label="Video format" className="flex flex-wrap gap-1">
                {formatOptions.map((fmt, idx) => (
                  <button
                    key={fmt.label}
                    type="button"
                    onClick={() => setSelectedFormat(idx)}
                    className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition duration-150 cursor-pointer ${
                      selectedFormat === idx
                        ? "border-blue-400/50 bg-blue-500/20 text-blue-100 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                        : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <span>{fmt.icon}</span>
                    <span>{fmt.label}</span>
                  </button>
                ))}
              </div>

              {/* Right: Character count + Glowing Generate Button */}
              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                <span className="text-xs text-zinc-500 tabular-nums font-mono hidden sm:inline">
                  {prompt.length}/500
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="group/generate inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-400/60 bg-gradient-to-r from-blue-600 to-blue-700 px-5 text-sm font-bold text-white shadow-[0_0_28px_rgba(59,130,246,0.45)] hover:-translate-y-px hover:to-blue-600 hover:shadow-[0_0_44px_rgba(59,130,246,0.65)] transition duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  id={`submit-${idea}`}
                >
                  {loading ? (
                    <span>Claiming Pass...</span>
                  ) : (
                    <>
                      <svg className="h-4 w-4 transition-transform duration-150 group-hover/generate:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
                      </svg>
                      <span>{isIndic ? "फाउंडर पास क्लेम करें" : "Claim Founder Pass"}</span>
                      <kbd className="hidden sm:inline-flex h-5 items-center justify-center rounded bg-white/20 px-1.5 text-[10px] font-sans font-medium text-blue-100">
                        ↵
                      </kbd>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs text-center font-medium text-red-400 mt-2">
            {error}
          </p>
        )}

        {/* Trust micro-copy */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-zinc-400">
          <span>{isIndic ? "🔒 100% कमर्शियल कॉपीराइट · कभी भी अनसब्सक्राइब करें" : "Grandfathered 50% discount · 100% commercial rights"}</span>
          <span className="text-blue-400 font-mono">Managed via work@sameface.in</span>
        </div>
      </form>
    </div>
  );
}
