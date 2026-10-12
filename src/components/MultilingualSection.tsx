"use client";

import { useState } from "react";

const INDIC_LANGUAGES = [
  {
    id: "hindi",
    name: "Hindi",
    native: "हिन्दी",
    flag: "🇮🇳",
    speakers: "600M+",
    sampleTitle: "अकबर और बीरबल का रहस्य",
    sampleLine: "महाराज, इस समस्या का समाधान केवल बीरबल की बुद्धि ही कर सकती है!",
    dialect: "Khariboli & Modern Dehati",
    tempo: "1.0x Natural Flow",
  },
  {
    id: "tamil",
    name: "Tamil",
    native: "தமிழ்",
    flag: "🇮🇳",
    speakers: "85M+",
    sampleTitle: "தெனாலிராமனின் புத்திசாலித்தனம்",
    sampleLine: "அரசே, உண்மையான குற்றவாளியை நான் இப்போதே கண்டுபிடித்து காட்டுகிறேன்!",
    dialect: "Madras & Kongu Accent",
    tempo: "1.1x Fast Cadence",
  },
  {
    id: "telugu",
    name: "Telugu",
    native: "తెలుగు",
    flag: "🇮🇳",
    speakers: "95M+",
    sampleTitle: "తెనాలి రామకృష్ణ హాస్య కథలు",
    sampleLine: "రాజాధిరాజ, ఈ సమస్యకు పరిష్కారం కేవలం వినోదంతోనే లభిస్తుంది!",
    dialect: "Coastal & Telangana Slang",
    tempo: "1.0x Expressive",
  },
  {
    id: "bhojpuri",
    name: "Bhojpuri",
    native: "भोजपुरी",
    flag: "🇮🇳",
    speakers: "55M+",
    sampleTitle: "देहाती चाचा के चुटकुले",
    sampleLine: "अरे भइया! ई का बोल रहल बाड़ा, हमनी के बात त सुन ला पहिले!",
    dialect: "Purvanchal & Saran Style",
    tempo: "1.05x High Energy",
  },
  {
    id: "bengali",
    name: "Bengali",
    native: "বাংলা",
    flag: "🇮🇳",
    speakers: "300M+",
    sampleTitle: "গোপাল ভাঁড়ের মজার কাণ্ড",
    sampleLine: "মহারাজ, রসগোল্লা তো মিষ্টি, কিন্তু আমার বুদ্ধির মিষ্টিতা আরও বেশি!",
    dialect: "Kolkata & Nadia Accent",
    tempo: "0.95x Melodic",
  },
  {
    id: "marathi",
    name: "Marathi",
    native: "मराठी",
    flag: "🇮🇳",
    speakers: "90M+",
    sampleTitle: "छत्रपती शिवरायांची शौर्यगाथा",
    sampleLine: "गड्या, जिद्दीने लढायचं आणि प्रत्येक संकटावर विजय मिळवायचा!",
    dialect: "Puneri & Deshi Style",
    tempo: "1.0x Crisp",
  },
  {
    id: "gujarati",
    name: "Gujarati",
    native: "ગુજરાતી",
    flag: "🇮🇳",
    speakers: "60M+",
    sampleTitle: "બકોર પટેલની રમુજી વાર્તાઓ",
    sampleLine: "અરે વાહ! આ તો એકદમ જોરદાર આઈડિયા છે, ધંધો પણ વધશે!",
    dialect: "Amdavadi & Kathiyawadi",
    tempo: "1.0x Friendly",
  },
  {
    id: "punjabi",
    name: "Punjabi",
    native: "ਪੰਜਾਬੀ",
    flag: "🇮🇳",
    speakers: "125M+",
    sampleTitle: "ਚਾਚਾ ਛੱਜੂ ਦੇ ਹਾਸੇ-ਠੱਠੇ",
    sampleLine: "ਚੱਕ ਦੇ ਫੱਟੇ! ਜਦੋਂ ਤੱਕ ਜਾਨ ਹੈ, ਰੱਜ ਕੇ ਹੱਸੋ ਤੇ ਮੌਜ ਉਡਾਓ!",
    dialect: "Majhi & Malwai Energy",
    tempo: "1.15x High Beat",
  },
  {
    id: "kannada",
    name: "Kannada",
    native: "ಕನ್ನಡ",
    flag: "🇮🇳",
    speakers: "50M+",
    sampleTitle: "ಹಾಸ್ಯ ಚಕ್ರವರ್ತಿ ಕಥೆಗಳು",
    sampleLine: "ಸ್ನೇಹಿತರೆ, ಕಷ್ಟಗಳಿಗೆ ಹೆದರದೆ ಮುಗುಳ್ನಗೆಯಿಂದ ಜಯ ಸಾಧಿಸೋಣ!",
    dialect: "Old Mysuru & Hubli Accent",
    tempo: "1.0x Calm",
  },
  {
    id: "malayalam",
    name: "Malayalam",
    native: "മലയാളം",
    flag: "🇮🇳",
    speakers: "38M+",
    sampleTitle: "കുട്ടിക്കാലത്തെ നർമ്മ കഥകൾ",
    sampleLine: "സുഹൃത്തുക്കളെ, ഒരു ചിരിയിലൂടെ ഏത് പ്രതിസന്ധിയും നമുക്ക് നേരിടാം!",
    dialect: "Travancore & Malabar Tone",
    tempo: "1.0x Rhythmic",
  },
  {
    id: "odia",
    name: "Odia",
    native: "ଓଡ଼ିଆ",
    flag: "🇮🇳",
    speakers: "40M+",
    sampleTitle: "ଉତ୍କଳ ଗାଉଁଲି କାହାଣୀ",
    sampleLine: "ଭାଇ ମାନେ, ସତ କଥା ସବୁବେଳେ ଜିତିବ ଆଉ ହସ ହିଁ ଜୀବନର ସାର!",
    dialect: "Coastal Odia Style",
    tempo: "0.95x Gentle",
  },
  {
    id: "assamese",
    name: "Assamese",
    native: "অসমীয়া",
    flag: "🇮🇳",
    speakers: "15M+",
    sampleTitle: "বুঢ়ী আইৰ সাধু",
    sampleLine: "অ’ মোৰ আপোনাৰ দেশ, তোমাৰ মাটিতে আমি হাঁহিৰ সুবাস বিলাই যাম!",
    dialect: "Kamrupi & Standard",
    tempo: "1.0x Smooth",
  },
  {
    id: "rajasthani",
    name: "Rajasthani",
    native: "राजस्थानी",
    flag: "🇮🇳",
    speakers: "30M+",
    sampleTitle: "मारवाड़ी सेठ जी री बात",
    sampleLine: "खम्मा घणी सा! आपां री बोली रो रंग सबसूं न्यारो अर मीठो है!",
    dialect: "Marwari & Dhundhari",
    tempo: "1.0x Welcoming",
  },
  {
    id: "urdu",
    name: "Urdu",
    native: "اردو",
    flag: "🇮🇳",
    speakers: "70M+",
    sampleTitle: "حکایات و داستانِ لطیف",
    sampleLine: "حضور، عقل و دانائی کی بات دلوں میں مٹھاس گھول دیتی ہے!",
    dialect: "Lucknavi & Deccani Tone",
    tempo: "0.95x Poetic",
  },
];

export default function MultilingualSection() {
  const [activeLang, setActiveLang] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const selected = INDIC_LANGUAGES[activeLang];

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <section id="multilingual" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#060813] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#6C4DFF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 py-1 px-4 text-xs font-semibold text-amber-300">
            <span>🇮🇳 Bharat Regional Animation Studio</span>
            <span className="text-white/40">•</span>
            <span className="text-amber-200">14+ Indian Languages</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            14+ Indian Languages &amp;{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              Bharat Regional Studio
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Cartoon videos in 14+ Indian languages. Natural dialect voices, native lip-sync, and auto-post to all social media.
          </p>
        </div>

        {/* Language Selection Pills Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-12">
          {INDIC_LANGUAGES.map((lang, idx) => {
            const isActive = activeLang === idx;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  setActiveLang(idx);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-orange-500/25 scale-105"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/5 hover:border-amber-400/30"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                <span className={`text-[11px] font-mono ${isActive ? "text-black/75 font-black" : "text-zinc-500"}`}>
                  ({lang.native})
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Regional Studio Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#090d1f] border border-amber-400/25 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Left Column: Script, Dialect, & Character Lip-Sync Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selected.flag}</span>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{selected.name} Studio</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono">
                      {selected.speakers} Audience
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">{selected.dialect} • Syllable Lip-Sync</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-semibold">Native Lip-Sync: Locked</span>
              </div>
            </div>

            {/* Generated Script Box */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>EPISODE TITLE:</span>
                <span className="text-amber-300 font-bold">{selected.sampleTitle}</span>
              </div>
              <p className="text-lg sm:text-xl font-medium text-white leading-relaxed font-sans">
                &ldquo;{selected.sampleLine}&rdquo;
              </p>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/5 font-mono">
                <span>Speed: {selected.tempo}</span>
                <span className="text-amber-400 font-semibold">100% Mascot Face &amp; Expression Retained</span>
              </div>
            </div>

            {/* Interactive Audio & Phoneme Waveform Player */}
            <div className="p-4 rounded-2xl bg-[#0b1029] border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-black font-black flex items-center justify-center text-lg shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer flex-shrink-0"
                  aria-label="Play audio sample"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <div>
                  <div className="text-xs font-bold text-white">
                    {isPlaying ? "Playing Neural Dialect Voice…" : `Listen to ${selected.name} Native Voice`}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    {selected.dialect} • Phoneme Matched
                  </div>
                </div>
              </div>

              {/* Fake Audio Waveform */}
              <div className="flex items-center gap-1 h-8 w-full sm:w-48 justify-center">
                {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 85, 50, 75, 40].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPlaying
                        ? "bg-amber-400 animate-pulse"
                        : "bg-zinc-700"
                    }`}
                    style={{ height: `${isPlaying ? (h * 0.28) + 4 : (h * 0.16) + 4}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Regional Growth Features */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-center text-xl">
                  🗣️
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Natural Dialect Voices</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Not robotic text-to-speech. Trained on local regional inflections, idioms, and emotional beats.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-400/25 flex items-center justify-center text-xl">
                  👄
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sub-Frame Indic Lip-Sync</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Syllables match mouth open/close and tongue positions accurately across Hindi, Tamil, Telugu, and all 14 languages.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6C4DFF]/15 border border-[#6C4DFF]/30 flex items-center justify-center text-xl">
                  📲
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">1-Click Auto-Post to All Socials</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Auto-publishes regional YouTube Shorts, Instagram Reels, Facebook Pages, and WhatsApp Channels simultaneously.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Tap Into 800M+ Bharat Viewers</div>
                  <div className="text-[11px] text-zinc-400">Regional cartoon videos get 4.8x higher viral share rates.</div>
                </div>
                <a
                  href="#waitlist"
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-transform hover:scale-105"
                >
                  Unlock Free →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
