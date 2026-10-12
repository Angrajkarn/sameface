"use client";

import { useState, type FormEvent } from "react";
import { submitSignup } from "@/lib/firestore";
import ShareButtons from "./ShareButtons";

interface Props {
  idea: "mascot" | "bhasha";
  useCaseOptions: readonly string[];
  priceSignalOptions: readonly string[];
  accentColor: string;
  brandName: string;
}

export default function SignupForm({
  idea,
  useCaseOptions,
  priceSignalOptions,
  accentColor,
  brandName,
}: Props) {
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [step, setStep] = useState<"form" | "price" | "done">("form");
  const [pricePick, setPricePick] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await submitSignup({ email, idea, useCase, pricePick: "" });

    if (!res.ok) {
      if (res.reason === "duplicate") {
        setError("You're already on the list! 🎉");
      }
      setLoading(false);
      return;
    }

    setStep("price");
    setLoading(false);
  }

  async function handlePricePick(pick: string) {
    setPricePick(pick);
    // Update the doc with price pick — we re-submit with price info
    await submitSignup({ email, idea, useCase, pricePick: pick }).catch(
      () => {}
    );
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="text-center space-y-4 animate-fade-in">
        <div className="text-5xl">🎉</div>
        <h3 className="text-2xl font-bold">You&apos;re on the list!</h3>
        <p className="text-gray-600">
          We&apos;ll email you the moment {brandName} is ready.
        </p>
        <ShareButtons idea={idea} brandName={brandName} />
      </div>
    );
  }

  if (step === "price") {
    return (
      <div className="space-y-4 animate-fade-in">
        <p className="text-lg font-semibold text-center">
          Quick question — which plan would you actually pay for?
        </p>
        <p className="text-sm text-gray-500 text-center">
          No commitment. Just helps us build the right thing.
        </p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          {priceSignalOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handlePricePick(opt)}
              className="px-6 py-3 rounded-xl border-2 font-medium transition-all duration-200
                hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              style={{
                borderColor: accentColor,
                color: accentColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accentColor;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = accentColor;
              }}
            >
              {opt}
            </button>
          ))}
          <button
            onClick={() => setStep("done")}
            className="text-sm text-gray-400 underline mt-2 cursor-pointer"
          >
            Skip this
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 
            focus:outline-none focus:border-current transition-colors
            text-gray-900 placeholder-gray-400"
          style={{ borderColor: email ? accentColor : undefined }}
          id={`signup-email-${idea}`}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl font-bold text-white 
            transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          style={{ backgroundColor: accentColor }}
          id={`signup-submit-${idea}`}
        >
          {loading ? "Joining…" : "Join waitlist →"}
        </button>
      </div>

      <select
        value={useCase}
        onChange={(e) => setUseCase(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 
          text-gray-600 bg-white focus:outline-none focus:border-current transition-colors
          appearance-none cursor-pointer"
        style={{ borderColor: useCase ? accentColor : undefined }}
        id={`signup-usecase-${idea}`}
      >
        <option value="">What will you make? (optional)</option>
        {useCaseOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-center font-medium" style={{ color: accentColor }}>
          {error}
        </p>
      )}

      <p className="text-xs text-gray-400 text-center">
        No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  );
}
