"use client";

import { useState, useEffect, type FormEvent } from "react";
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
  const [honeypot, setHoneypot] = useState(""); // Anti-bot trap
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [step, setStep] = useState<"form" | "price" | "pass">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passNumber, setPassNumber] = useState(972);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    setPassNumber(954 + Math.floor(Math.random() * 40));
  }, []);

  useEffect(() => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setIsEmailValid(valid);
  }, [email]);

  const discountCode = isIndic ? "BHARAT50" : "FOUNDER50";
  const passCode = `${isIndic ? "BHARAT" : "SF"}-VIP-${passNumber}`;

  // Quick domain accelerator
  function appendDomain(domain: string) {
    if (!email.includes("@")) {
      setEmail((prev) => prev.trim() + domain);
    } else {
      const username = email.split("@")[0];
      setEmail(username + domain);
    }
  }

  async function handleGenerate(e: FormEvent) {
    e.preventDefault();
    if (!isEmailValid) {
      setError(isIndic ? "कृपया अपना मान्य ईमेल दर्ज करें" : "Please enter a valid email address");
      return;
    }

    // Bot trap check
    if (honeypot) {
      setStep("price");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formatLabel = formatOptions[selectedFormat]?.label || "Default";
      const useCaseCombined = `${formatLabel}: ${prompt.slice(0, 80)}`;

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          idea,
          useCase: useCaseCombined,
          pricePick: "",
          hp_check: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error?.includes("Rate limit")) {
          setError("Too many attempts. Please wait a moment.");
        } else {
          setError(data.error || "Submission failed");
        }
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
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          idea,
          useCase: `${formatLabel}: ${prompt.slice(0, 80)}`,
          pricePick: pick,
          hp_check: honeypot,
        }),
      });
    } catch {
      // Continue gracefully
    }
    setStep("pass");
  }

  function copyPassCode() {
    navigator.clipboard.writeText(discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  }

  // ──── STEP 3: ULTRA-LUXURIOUS VIP FOUNDER PASS CERTIFICATE ────
  if (step === "pass") {
    return (
      <div className="rounded-[32px] p-6 sm:p-9 bg-gradient-to-b from-[#090f24] via-[#050814] to-black border-2 border-amber-400/40 text-center space-y-6 shadow-[0_20px_90px_rgba(37,99,235,0.4)] animate-fade-in max-w-2xl mx-auto backdrop-blur-2xl">
        {/* VIP Pass Badge Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 border-b border-white/10 text-left">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-[#0b122c] border border-amber-400/40 p-2 flex items-center justify-center shadow-lg">
              <img src="/sameface-logo.svg" alt="SameFace" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  {isIndic ? "आधिकारिक फाउंडर पास" : "OFFICIAL VIP FOUNDER PASS"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  PASS #{passNumber}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {isIndic ? "लाइफटाइम ५०% डिस्काउंट लॉक हो गया!" : "50% Lifetime Discount Locked!"}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold shadow-inner">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Synced: Google Workspace
            </span>
          </div>
        </div>

        {/* Certificate Card Body */}
        <div className="p-6 rounded-2xl bg-black/60 border border-amber-400/20 text-left space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase">PASS HOLDER:</span>
              <p className="text-zinc-100 font-bold truncate text-sm">{email}</p>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase">OFFICIAL SERIAL:</span>
              <p className="text-amber-300 font-bold text-sm">{passCode}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-zinc-500 text-[10px] uppercase">LAUNCH PERK:</span>
              <p className="text-emerald-400 font-bold text-sm">1,000 4K Credits ($120 Value)</p>
            </div>
          </div>

          {/* Discount Code Copy Box */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#0b1432] to-[#070b1a] border border-blue-400/40 shadow-inner">
            <div>
              <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider">
                {isIndic ? "आपका वीआईपी कूपन कोड (VIP Token)" : "Your VIP Launch Token (Nov 5, 2026)"}
              </span>
              <div className="text-xl font-mono font-black text-white tracking-widest mt-0.5">
                {discountCode}
              </div>
            </div>

            <button
              onClick={copyPassCode}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              {copiedCode ? "✓ Copied!" : "Copy Token 📋"}
            </button>
          </div>
        </div>

        {/* Perks Checklist */}
        <div className="text-left text-xs text-zinc-300 space-y-2.5 pt-1 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{isIndic ? "लॉन्च (5 नव 2026) पर आपके ईमेल पर डायरेक्ट एक्सेस लिंक पहुंचेगा" : "Direct launch day priority invite scheduled for Nov 5, 2026"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{isIndic ? "14+ भारतीय भाषाओं में ऑटो-लिप्सिंक व सोशल पब्लिशिंग टूल अनलॉक" : "14+ Indian regional languages + 1-click social auto-publisher license locked"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{isIndic ? "सुरक्षित रूप से Google Sheets व डेटाबेस में पंजीकृत" : "Enterprise Encrypted & Synced to Google Workspace (work@sameface.in)"}</span>
          </div>
        </div>

        {/* Viral Accelerator Share Section */}
        <div className="pt-2">
          <p className="text-xs font-bold text-amber-300 mb-2">
            🚀 {isIndic ? "२ दोस्तों को इनवाइट करें और कतार में #1 पर आएं!" : "Invite 2 creator friends to skip to #1 in queue!"}
          </p>
          <ShareButtons idea={idea} brandName={brandName} />
        </div>
      </div>
    );
  }

  // ──── STEP 2: PRICING SURVEY QUESTION ────
  if (step === "price") {
    return (
      <div className="rounded-[28px] p-8 bg-[#070b17] border border-blue-400/40 text-center space-y-5 shadow-2xl animate-fade-in max-w-2xl mx-auto backdrop-blur-xl">
        <div className="space-y-1">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider border border-blue-400/20">
            {isIndic ? "फाउंडर बेनिफिट्स अनलॉक" : "FOUNDER BATCH PROTOCOL"}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
            {isIndic ? "आप किस प्लान के साथ 50% लाइफटाइम छूट लॉक करना चाहेंगे?" : "Which tier would you like to lock your 50% lifetime discount on?"}
          </h3>
          <p className="text-xs text-zinc-400">
            {isIndic ? "कोई अग्रिम भुगतान नहीं। 5 नवंबर 2026 को आपको यही रेट हमेशा के लिए मिलेगा।" : "No credit card needed today. Locks your grandfathered founder price on Nov 5, 2026."}
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

  // ──── STEP 1: ULTRA-MODERN HIGH-TECH PROMPT & EMAIL BAR ────
  return (
    <div className="space-y-3">
      <form onSubmit={handleGenerate} className="group/prompt relative mx-auto max-w-2xl lg:mx-0">
        {/* Anti-bot honeypot hidden input */}
        <input
          type="text"
          name="website_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Outer ambient blur glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-[34px] opacity-75 blur-2xl transition-opacity duration-300 group-focus-within/prompt:opacity-100"
          style={{ backgroundColor: `${accentColor}33` }}
        />

        {/* Spinning conic border container */}
        <div className="relative overflow-hidden rounded-[28px] p-px shadow-[0_24px_70px_-20px_rgba(37,99,235,0.55)] transition-shadow duration-150">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-blue-400/50 via-blue-500/20 to-white/10"
          />

          <div
            aria-hidden="true"
            className="home-spin absolute left-1/2 top-1/2 -ml-[500px] -mt-[500px] h-[1000px] w-[1000px] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,rgba(147,197,253,0.95)_300deg,transparent_340deg)] opacity-80"
          />

          {/* Inner Dark Form Container */}
          <div className="relative rounded-[27px] bg-[#070b17] transition-colors duration-150 group-focus-within/prompt:bg-[#080d1d] p-1.5">
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
                  : "A friendly cartoon tiger explaining financial wisdom in Hindi with expressive gestures..."
              }
              className="block h-[5.2rem] w-full resize-none bg-transparent px-5 pt-3.5 text-sm sm:text-base leading-6 text-zinc-50 caret-blue-300 placeholder:text-zinc-500 focus:outline-none"
            />

            {/* ──── RE-ENGINEERED ULTRA-MODERN EMAIL INPUT BAR ──── */}
            <div className="px-3 pb-2 pt-1">
              <div
                className={`relative flex items-center gap-2.5 rounded-2xl bg-black/60 border px-4 py-2.5 transition-all duration-200 ${
                  isEmailValid
                    ? "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    : "border-white/15 focus-within:border-blue-400 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                }`}
              >
                <span className="text-zinc-400 text-sm">
                  {isEmailValid ? "✅" : "✉️"}
                </span>

                <input
                  type="email"
                  required
                  placeholder={
                    isIndic
                      ? "अपना ईमेल दर्ज करें (50% डिस्काउंट टोकन हेतु)..."
                      : "Enter your creator email for VIP Founder Pass..."
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  id={`email-${idea}`}
                />

                {/* Instant Email Domain Shortcuts */}
                {!isEmailValid && (
                  <div className="hidden sm:flex items-center gap-1">
                    {["@gmail.com", "@outlook.com"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => appendDomain(d)}
                        className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-[10px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Bar: Format Pills + Claim Button */}
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

              {/* Right: Character count + Glowing Claim Button */}
              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                <span className="text-xs text-zinc-500 tabular-nums font-mono hidden sm:inline">
                  {prompt.length}/500
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="group/generate inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 text-sm font-black text-black shadow-[0_0_28px_rgba(251,191,36,0.4)] hover:-translate-y-px hover:shadow-[0_0_44px_rgba(251,191,36,0.65)] transition duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  id={`submit-${idea}`}
                >
                  {loading ? (
                    <span>Securing Pass...</span>
                  ) : (
                    <>
                      <svg className="h-4 w-4 transition-transform duration-150 group-hover/generate:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
                      </svg>
                      <span>{isIndic ? "फाउंडर पास क्लेम करें" : "Claim VIP Founder Pass"}</span>
                      <kbd className="hidden sm:inline-flex h-5 items-center justify-center rounded bg-black/20 px-1.5 text-[10px] font-sans font-bold text-black/80">
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

        {/* Security & Trust Microcopy */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">🔒</span>
            {isIndic ? "256-बिट सुरक्षा · Google Sheets सिंक · शून्य स्पैम" : "256-Bit SSL Encrypted · Direct Google Sheet Sync · Zero Spam"}
          </span>
          <span className="text-amber-300 font-mono">Launch: Nov 5, 2026</span>
        </div>
      </form>
    </div>
  );
}
