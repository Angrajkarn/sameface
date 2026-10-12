// ─────────────────────────────────────────────────────
// site.ts — Single source of truth for all brand copy,
// pricing, social automation features, and enterprise sections.
// ─────────────────────────────────────────────────────

export const SITE = {
  // ───── Idea 1: SameFace ─────
  mascot: {
    slug: "mascot",
    name: "SameFace",
    shortName: "SameFace",
    logo: "/sameface-logo.svg",
    badge: "Next-Gen AI Animation & Creator Studio",
    tagline: "Create your cartoon character once. Star it in every video. Auto-post everywhere.",
    description:
      "Enterprise-grade cartoon consistency engine. Lock your mascot DNA, generate unlimited episodic series, and auto-publish directly to YouTube, Instagram, TikTok, and Facebook with zero animators.",
    ogTitle: "SameFace — Enterprise AI Cartoon Studio & Multi-Platform Auto-Publisher",
    ogDescription:
      "Lock your cartoon mascot identity across 1,000+ episodes. Auto-generate and direct-publish to YouTube, Instagram, TikTok, and Facebook simultaneously.",
    audience: "YouTubers, Shorts/Reels creators, media agencies, faceless channels",

    hero: {
      pill: "🚀 v2.0 Enterprise Beta • 1-Click Multi-Channel Distribution",
      headline: "Your mascot.\nEvery episode.\nAuto-posted everywhere.",
      sub: "Design your cartoon mascot once. Our AI locks identity, facial geometry, and style forever — then renders complete episodes and publishes directly to YouTube, Instagram, TikTok, and Facebook in one click.",
      primaryCta: "Join Priority Waitlist →",
      secondaryCta: "Explore Auto-Publishing Suite ↓",
      stats: [
        { value: "100%", label: "Character Consistency" },
        { value: "1-Click", label: "Multi-Platform Syndication" },
        { value: "10x", label: "Faster Content Output" },
        { value: "< 5 Min", label: "Episode Render Time" },
      ],
    },

    marketing: {
      founderEmail: "work@sameface.in",
      scarcity: {
        badge: "🔥 FOUNDER BATCH #1 CLOSING",
        totalSpots: 1000,
        claimedSpots: 953,
        remainingSpots: 47,
        discountPercent: "50% OFF LIFETIME",
        couponCode: "FOUNDER50",
        creditsBonus: "1,000 Free 4K Render Credits ($120 Value)",
        urgencyText: "Only 47 Founder Passes remaining at grandfathered 50% discount. Price increases on public launch.",
      },
      perks: [
        "Permanent 50% Lifetime Discount locked to your account",
        "1,000 Free 4K Episode Credits immediately on launch",
        "Skip the 4,200-person public queue with VIP Render Priority",
        "Direct 1-on-1 Founder Slack/WhatsApp Access with the core team",
        "Full Commercial Resale Rights & Monetization Guarantee",
      ],
    },

    formatOptions: [
      { label: "YouTube Series (16:9)", icon: "🎬" },
      { label: "Shorts & Reels (9:16)", icon: "📱" },
      { label: "14+ Indian Languages & Bharat", icon: "🇮🇳" },
      { label: "3D Mascot Character Lock", icon: "🦊" },
    ],

    testimonials: [
      {
        name: "Algrow",
        role: "528K YouTube Subs",
        quote: "First impressions: execution is insane. Character looks identical in every video.",
        avatar: "🔥",
      },
      {
        name: "Parveen Kumar",
        role: "1 Million+ Followers",
        quote: "हिंदी और क्षेत्रीय रील्स के लिए इससे बेहतरीन कोई टूल नहीं। देसी आवाज़ें और डायलॉग्स बिल्कुल असली लगते हैं।",
        avatar: "🇮🇳",
      },
      {
        name: "Jamie Nyland",
        role: "10 Million+ Subs",
        quote: "The 1-click auto-publish to YouTube Shorts and Reels saved our editing team 15 hours a week.",
        avatar: "💎",
      },
      {
        name: "Priya Murthy",
        role: "Tamil Content Creator",
        quote: "Tamil lip-sync actually matches the syllables! We post 3 shorts a day on complete autopilot.",
        avatar: "🌟",
      },
      {
        name: "AI Guy",
        role: "215K YouTube Subs",
        quote: "After testing dozens of AI tools, SameFace is the only one that completely solves facial drift for faceless channels.",
        avatar: "⚡",
      },
      {
        name: "Richard",
        role: "Animation Director",
        quote: "In 3 minutes it does what took my human animation team 3 days. Quality, consistency, price: 10/10.",
        avatar: "✨",
      },
    ],

    socialAutomation: {
      badge: "⚡ Complete Social Distribution Suite",
      title: "Direct Multi-Platform Auto-Publishing & Management",
      subtitle:
        "Stop manually exporting, reformatting, and uploading to 5 different apps. Connect your social channels once and let SameFace schedule, tag, and publish your cartoon episodes automatically.",
      platforms: [
        {
          name: "YouTube & Shorts",
          icon: "youtube",
          color: "#FF0000",
          features: [
            "Auto-exports widescreen 16:9 for main videos + 9:16 for Shorts",
            "Generates viral SEO titles, description chapters, & tags",
            "Auto-generates 3 high-CTR custom thumbnail variations",
            "Direct publishing to YouTube Studio via Official API",
          ],
          badge: "Widescreen & Shorts",
        },
        {
          name: "Instagram Reels & Feed",
          icon: "instagram",
          color: "#E1306C",
          features: [
            "Lossless 9:16 vertical render optimized for Reels algorithm",
            "Auto-timed animated burned-in captions & sound sync",
            "AI generated caption copy + 15 trending niche hashtags",
            "Collaborator tag support & cross-posting to Facebook",
          ],
          badge: "Reels & Carousels",
        },
        {
          name: "TikTok Creator Suite",
          icon: "tiktok",
          color: "#00F2FE",
          features: [
            "Zero compression 1080x1920 60fps native export",
            "Auto-hook opening frame selector to stop the scroll",
            "Trending sound waveform synchronizer",
            "TikTok Content Posting API direct queue & scheduling",
          ],
          badge: "Viral Growth",
        },
        {
          name: "Facebook Watch & Reels",
          icon: "facebook",
          color: "#1877F2",
          features: [
            "Direct Page posting with monetized reel metadata",
            "Automated video series playlist categorization",
            "Multi-language auto-captions for silent autoplay",
            "Audience age & regional targeting presets",
          ],
          badge: "High Retention",
        },
        {
          name: "LinkedIn & X (Twitter)",
          icon: "x",
          color: "#1DA1F2",
          features: [
            "1:1 square & 16:9 clips for professional explainers",
            "Auto-generated viral thread breakdowns accompanying the video",
            "Direct video media upload with webhook confirmation",
            "Instant brand watermark & corporate mascot compliance",
          ],
          badge: "B2B & Virality",
        },
      ],
      automationFeatures: [
        {
          icon: "⏱️",
          title: "Smart Auto-Scheduler",
          desc: "Our AI analyzes your audience peak activity hours per platform and schedules episodes automatically for maximum initial velocity.",
        },
        {
          icon: "📐",
          title: "Adaptive Aspect Ratios",
          desc: "Render once — our engine auto-crops and reformats scenes into 9:16 (Shorts/Reels/TikTok), 16:9 (YouTube), and 1:1 (Feed/LinkedIn).",
        },
        {
          icon: "💬",
          title: "Unified Analytics & Comments",
          desc: "Monitor views, watch time, and audience sentiment across all connected social channels from one single mission control dashboard.",
        },
        {
          icon: "🤖",
          title: "Autonomous Series Scheduler",
          desc: "Queue an entire 30-day season of cartoon episodes. Set frequency (e.g. Daily at 6 PM) and let SameFace run on autopilot.",
        },
      ],
    },

    problem: {
      badge: "The Pain Point",
      title: "Why Traditional & Early AI Animation Breaks Down",
      subtitle: "Current tools were never built for serial episodic content creators.",
      points: [
        {
          title: "Identity Drift Destroys Channels",
          desc: "Standard AI image/video generators produce a different-looking face every prompt. Viewers fail to bond with characters that keep morphing.",
        },
        {
          title: "Manual Editing & Posting Burnout",
          desc: "Spending 4 hours exporting, cropping, writing 5 different descriptions, and manually logging into 4 social apps kills consistency.",
        },
        {
          title: "Studio Animators Cost $2,000+ per Minute",
          desc: "Hiring human animators is unaffordable for weekly YouTubers and indie studios. You need speed, quality, and extreme predictability.",
        },
      ],
    },

    pipeline: [
      {
        step: "01",
        title: "Character DNA Engine",
        subtitle: "Lock Identity & Vector Style",
        desc: "Design your mascot using text prompts or upload your own 2D sketch. We create a 360° identity anchor that freezes facial proportions, color palette, and clothing permanently.",
        tag: "100% Identity Guarantee",
      },
      {
        step: "02",
        title: "AI Script & Storyboarder",
        subtitle: "Generate Episodic Arcs",
        desc: "Input a simple one-line premise or paste a full script. Our system splits it into scenes, emotion beats, dynamic camera angles, and background art matching your mascot's universe.",
        tag: "Multi-Angle Cameras",
      },
      {
        step: "03",
        title: "Voice & Phoneme Lip-Sync",
        subtitle: "High-Fidelity Animation",
        desc: "Select a custom voice or clone your own. Our neural phoneme model generates frame-by-frame mouth shapes and expressive micro-gestures synchronized to the audio.",
        tag: "Sub-Frame Precision",
      },
      {
        step: "04",
        title: "Autonomous Social Syndication",
        subtitle: "Auto-Post Across All Channels",
        desc: "With one click, your episode is rendered in 4K, packaged with platform-optimized captions, tags, and thumbnails, and published to YouTube, Instagram, TikTok, and Facebook.",
        tag: "Zero Manual Work",
      },
    ],

    useCases: [
      { emoji: "📺", label: "YouTube Animated Series", desc: "Build loyal subscribers with recurring episodic cartoon shows." },
      { emoji: "📱", label: "Viral Shorts & Reels", desc: "Dominate algorithmic feeds with snackable, high-energy 30s clips." },
      { emoji: "🕵️", label: "Faceless Creator Channels", desc: "Monetize automated video channels without showing your real face." },
      { emoji: "📚", label: "EdTech & Kids Academy", desc: "Teach kids or students with friendly, memorable cartoon instructors." },
      { emoji: "🛒", label: "Brand Mascot Marketing", desc: "Turn company logos into animated brand ambassadors for paid ads." },
      { emoji: "🎮", label: "Gaming & Commentary", desc: "Let your mascot react, review games, and commentate on trends." },
    ],

    pricing: {
      currency: "$",
      note: "All plans include commercial rights & social automation. Cancel anytime.",
      tiers: [
        {
          name: "Starter Creator",
          price: "0",
          period: "",
          description: "Perfect for testing your character concept & early pilots.",
          features: [
            "3 cartoon episodes / month",
            "1 Locked Mascot Slot",
            "720p HD export",
            "Manual download",
            "Community support",
          ],
          cta: "Start Free Pilot",
          highlight: false,
          badge: "",
        },
        {
          name: "Studio Pro",
          price: "29",
          period: "/mo",
          description: "For active creators running consistent daily or weekly series.",
          features: [
            "25 cartoon episodes / month",
            "5 Locked Mascot Slots",
            "1080p 60fps Full HD",
            "Direct 1-Click Social Publishing (YouTube & Instagram)",
            "Auto-Captions & Thumbnail Generator",
            "No Watermark & Full Commercial Rights",
          ],
          cta: "Join Waitlist (Special 50% Off)",
          highlight: true,
          badge: "Most Popular",
        },
        {
          name: "Media Empire",
          price: "79",
          period: "/mo",
          description: "For high-volume studios, agencies, and multi-channel networks.",
          features: [
            "Unlimited cartoon episodes",
            "Unlimited Mascot Slots",
            "4K Ultra-HD 60fps exports",
            "All Socials: YouTube, Instagram, TikTok, Facebook, X & LinkedIn",
            "Autonomous 30-Day Auto-Scheduler Queue",
            "Priority GPU Render Queue (Sub-3min rendering)",
            "Developer API & Webhook Access",
          ],
          cta: "Get Early Access",
          highlight: false,
          badge: "",
        },
      ],
    },

    faq: [
      {
        q: "How does the social media auto-publishing actually work?",
        a: "You authenticate your YouTube, Instagram, TikTok, and Facebook accounts securely through official developer APIs. When an episode finishes rendering, SameFace automatically formats aspect ratios (9:16 and 16:9), drafts SEO titles and tags, and pushes the video directly to your queue or live schedule.",
      },
      {
        q: "Can I manage multiple channels from one account?",
        a: "Yes! On Studio Pro and Media Empire plans, you can link multiple YouTube channels, Instagram accounts, and TikTok profiles, assigning different mascots and series to specific channels.",
      },
      {
        q: "Does SameFace support Indian regional languages and native lip-sync?",
        a: "Yes! Our Bharat Regional Studio supports 14+ Indian languages including Hindi, Tamil, Telugu, Bhojpuri, Bengali, Marathi, Gujarati, Punjabi, Kannada, Malayalam, Odia, Assamese, Rajasthani, and Urdu. Our phoneme neural engine generates syllable-accurate mouth movements and natural dialect accents.",
      },
      {
        q: "How does SameFace guarantee 100% character consistency?",
        a: "Unlike standard text-to-video generators that dream up random faces every generation, we extract a high-dimensional facial and vector embedding of your character. Every frame is conditioned on this mathematical identity anchor.",
      },
      {
        q: "Do I own 100% of the commercial rights to my cartoons?",
        a: "Yes. All animations, voice tracks, and characters generated on SameFace belong entirely to you with unrestricted commercial rights. Monetize on YouTube AdSense, brand sponsorships, and merchandise.",
      },
      {
        q: "Can I upload my own custom artwork or illustrator files?",
        a: "Yes! You can either generate your mascot from a prompt or upload reference sketches, PNGs, or SVGs. Our engine vectorizes and trains an identity model on your art style.",
      },
    ],

    useCaseDropdown: [
      "YouTube Episodic Series",
      "Shorts & Reels Automation",
      "Faceless Media Channel",
      "EdTech & Children Content",
      "Brand Mascot & Commercials",
      "Multi-Account Agency",
      "Other",
    ],
    priceSignalOptions: ["Free pilot is enough", "$29/mo Studio Pro", "$79/mo Media Empire"],
    theme: {
      accent: "#FF6B35",
      accentLight: "#FFE0D0",
      accentDark: "#E0531E",
      bg: "#0A0A0F",
      cardBg: "bg-gray-900/80",
      borderGlow: "border-orange-500/30",
    },
  },

  // ───── Idea 2: BhashaToons ─────
  bhasha: {
    slug: "bhasha",
    name: "BhashaToons",
    shortName: "BhashaToons",
    badge: "Indic AI Cartoon Studio & Regional Automation Suite",
    tagline:
      "Cartoon videos in 14+ Indian languages. Natural dialect voices, native lip-sync, auto-post to all social media.",
    description:
      "Enterprise Indic animation platform. Convert Hindi, Bhojpuri, Tamil, Telugu, and regional scripts into high-retention cartoon videos with natural phoneme lip-sync and 1-click automated distribution across YouTube, Instagram, and Facebook.",
    ogTitle: "BhashaToons — AI Cartoon Videos in Indian Languages with Social Auto-Post",
    ogDescription:
      "Create high-retention cartoon videos in Hindi, Tamil, Bhojpuri, Telugu, and 14+ Indian languages. Auto-publish directly to YouTube Shorts, Instagram Reels, and Facebook Pages.",
    audience: "Indian regional creators, Bharat educators, comedy troupes, devotional channels, regional agencies",

    hero: {
      pill: "🇮🇳 Made for Bharat • 14+ Regional Languages • Direct Social Syndication",
      headline: "कार्टून वीडियो आपकी भाषा में।\nएक क्लिक में सभी सोशल मीडिया पर पोस्ट।",
      headlineEn: "Cartoon videos in your regional language. Auto-published everywhere.",
      sub: "Write your script in Hindi, Bhojpuri, Tamil, Telugu, or any regional language. We generate authentic dialect voices, culturally accurate cartoon characters, precise lip-sync, and auto-post to YouTube, Instagram, and Facebook.",
      primaryCta: "प्रायोरिटी वेटलिस्ट में जुड़ें (Join Waitlist) →",
      secondaryCta: "सोशल ऑटोमेशन फीचर्स देखें (View Features) ↓",
      stats: [
        { value: "14+", label: "Indian Languages & Dialects" },
        { value: "1-Click", label: "YouTube, Reels & FB Posting" },
        { value: "99.4%", label: "Indic Phoneme Lip-Sync" },
        { value: "100%", label: "Monetization Ready" },
      ],
    },

    marketing: {
      founderEmail: "work@sameface.in",
      scarcity: {
        badge: "🔥 भारत फाउंडर बैच #1 (केवल ४७ स्थान शेष)",
        totalSpots: 1000,
        claimedSpots: 953,
        remainingSpots: 47,
        discountPercent: "आजीवन 50% की छूट (50% OFF LIFETIME)",
        couponCode: "BHARAT50",
        creditsBonus: "1,000 फ्री रेंडर क्रेडिट्स (मूल्य ₹9,999)",
        urgencyText: "केवल 47 फाउंडर पास शेष। बैच #1 भरने के बाद कीमत दोगुनी हो जाएगी।",
      },
      perks: [
        "आजीवन 50% की स्थायी छूट आपके खाते पर लॉक",
        "लॉन्च के दिन 1,000 फ्री 4K वीडियो क्रेडिट्स",
        "VIP फास्ट-ट्रैक रेंडरिंग (2 मिनट में वीडियो तैयार)",
        "संस्थापक टीम के साथ सीधा WhatsApp सपोर्ट",
        "100% कॉपीराइट व मोनेटाइजेशन गारंटी",
      ],
    },

    formatOptions: [
      { label: "यूट्यूब फुल एपिसोड (16:9)", icon: "🎬" },
      { label: "रील्स व शॉर्ट्स (9:16)", icon: "📱" },
      { label: "देसी पात्र व आवाज़", icon: "👳‍♂️" },
    ],

    testimonials: [
      {
        name: "Parveen Kumar",
        role: "1 Million+ Instagram Followers",
        quote: "हिंदी और क्षेत्रीय रील्स के लिए इससे बेहतरीन कोई टूल नहीं। देसी आवाज़ें और डायलॉग्स बिल्कुल असली लगते हैं।",
        avatar: "🇮🇳",
      },
      {
        name: "Ramesh Sharma",
        role: "450K YouTube Subs",
        quote: "बाल कहानियों और पंचतंत्र के वीडियो अब 10 मिनट में तैयार हो जाते हैं। यूट्यूब पर तुरंत वायरल!",
        avatar: "📖",
      },
      {
        name: "Priya Murthy",
        role: "Tamil Content Creator",
        quote: "Tamil lip-sync actually matches the syllables! We post 3 shorts a day on complete autopilot.",
        avatar: "🌟",
      },
      {
        name: "Aman Verma",
        role: "320K Comedy Subs",
        quote: "भोजपुरी और हरियाणवी कॉमेडी डायलॉग रील्स पर लाखों व्यूज ला रहे हैं। ऑटो-पोस्ट फीचर कमाल है।",
        avatar: "🎭",
      },
    ],

    socialAutomation: {
      badge: "🇮🇳 Regional Social Growth Engine",
      title: "Direct Auto-Publishing to Indian & Global Platforms",
      subtitle:
        "Regional content is booming on YouTube Shorts and Instagram Reels across tier-2 and tier-3 cities. BhashaToons lets you dominate regional feeds without spending hours manually editing and uploading.",
      platforms: [
        {
          name: "YouTube & Shorts Bharat",
          icon: "youtube",
          color: "#FF0000",
          features: [
            "Auto-renders 9:16 Shorts with burned-in Devanagari & regional script captions",
            "Auto-generates high CTR regional titles & descriptions in native script",
            "SEO tag suggestion optimized for regional language search queries",
            "Scheduled queue directly to your YouTube Channel via Google API",
          ],
          badge: "Shorts & Long-Form",
        },
        {
          name: "Instagram Reels Regional",
          icon: "instagram",
          color: "#E1306C",
          features: [
            "Algorithmic 9:16 vertical render optimized for Indian reel engagement",
            "Auto-translates and bakes dual-language captions (Hindi + English)",
            "Generates viral hook descriptions with trending regional tags",
            "Direct publishing to Creator & Business Instagram accounts",
          ],
          badge: "Reels & Stories",
        },
        {
          name: "Facebook Pages & Groups",
          icon: "facebook",
          color: "#1877F2",
          features: [
            "Direct publish to regional FB Pages (huge engagement in Tier-2/3 India)",
            "Automated video series grouping for bingeable story playlists",
            "Indian festival & devotional auto-calendar scheduling",
            "Monetization compliance check for FB in-stream ads",
          ],
          badge: "Massive Bharat Reach",
        },
        {
          name: "WhatsApp Status & Community",
          icon: "whatsapp",
          color: "#25D366",
          features: [
            "Auto-exports compressed 30s snippets ready for 1-tap WhatsApp Status",
            "Optimized lightweight MP4 format for high forwardability in WhatsApp groups",
            "Embeds custom channel invite watermarks and QR codes",
            "Ideal for devotional, moral, and comedy shareable cartoons",
          ],
          badge: "Viral Sharing",
        },
        {
          name: "ShareChat & Moj Ready",
          icon: "sharechat",
          color: "#FAAD14",
          features: [
            "Aspect ratio presets specifically tailored for Indian micro-video platforms",
            "Watermark placement optimized so UI icons never block key animation",
            "Instant download presets with zero compression artifacts",
            "Targeted for Bhojpuri, Tamil, Telugu, and Hindi comedy clips",
          ],
          badge: "Tier-2/3 Viral",
        },
      ],
      automationFeatures: [
        {
          icon: "🗓️",
          title: "Tyohar & Event Auto-Calendar",
          desc: "Never miss Diwali, Holi, Eid, Chhath Puja, Pongal, or IPL. Pre-schedule customized festive cartoon greetings that auto-post at auspicious timings.",
        },
        {
          icon: "🔤",
          title: "Multi-Language Auto-Dubbing",
          desc: "Make one video in Hindi — automatically generate Tamil, Telugu, Bengali, and Marathi versions with localized voices and synchronized lip movements.",
        },
        {
          icon: "⚡",
          title: "1-Click Multi-Account Distribution",
          desc: "Manage your Hindi channel, Tamil channel, and Bhojpuri channel from one unified dashboard with independent scheduling queues.",
        },
        {
          icon: "📈",
          title: "Regional Retention Optimizer",
          desc: "Our engine places dynamic sound effects, soundbites, and animated stickers every 4-5 seconds to keep regional audiences glued to the screen.",
        },
      ],
    },

    problem: {
      badge: "The Bharat Gap",
      title: "Why Global AI Video Tools Fail in India",
      subtitle: "Western AI tools sound robotic, lack cultural context, and ignore regional dialects.",
      points: [
        {
          title: "Regional Voices Sound Like Robots",
          desc: "Western TTS engines pronounce Hindi and regional languages with heavy foreign accents, destroying comedic timing and emotional connection.",
        },
        {
          title: "Mouth Movements Completely Mismatched",
          desc: "English-trained lip-sync algorithms fail on Indian phonemes (ट, ठ, ड, ण, ழ, ള), making characters look disjointed and fake.",
        },
        {
          title: "Missing Indian Cultural Character Aesthetics",
          desc: "Generic AI tools only generate Western corporate characters. Indian audiences connect with relatable local personalities and humor.",
        },
      ],
    },

    languages: [
      { name: "हिन्दी", script: "Hindi", region: "All North India" },
      { name: "भोजपुरी", script: "Bhojpuri", region: "UP, Bihar, Jharkhand" },
      { name: "தமிழ்", script: "Tamil", region: "Tamil Nadu, Sri Lanka" },
      { name: "తెలుగు", script: "Telugu", region: "Andhra & Telangana" },
      { name: "ಕನ್ನಡ", script: "Kannada", region: "Karnataka" },
      { name: "മലയാളം", script: "Malayalam", region: "Kerala" },
      { name: "मराठी", script: "Marathi", region: "Maharashtra" },
      { name: "ગુજરાતી", script: "Gujarati", region: "Gujarat" },
      { name: "বাংলা", script: "Bengali", region: "West Bengal & Tripura" },
      { name: "ਪੰਜਾਬੀ", script: "Punjabi", region: "Punjab & NRI" },
      { name: "ଓଡ଼ିଆ", script: "Odia", region: "Odisha" },
      { name: "অসমীয়া", script: "Assamese", region: "Assam & North East" },
      { name: "हरियाणवी", script: "Haryanvi", region: "Haryana & NCR" },
      { name: "राजस्थानी", script: "Rajasthani", region: "Rajasthan" },
    ],

    pipeline: [
      {
        step: "01",
        title: "स्क्रिप्ट इनपुट (Script Input)",
        subtitle: "In Any Indian Script or Hinglish",
        desc: "Type in Devanagari, regional script, or romanized Hinglish (e.g. 'Ek gaon mein do dost rehte the'). Our Indic NLP engine understands context, idioms, and punchlines.",
        tag: "Dialect Context Engine",
      },
      {
        step: "02",
        title: "देसी पात्र व आवाज़ (Characters & Voice)",
        subtitle: "100+ Authentic Indic Personas",
        desc: "Choose culturally rich characters (village elders, sharp kids, comedy duos, mythological figures) paired with expressive regional voice actors with natural cadence.",
        tag: "Authentic Dialects",
      },
      {
        step: "03",
        title: "लिप-सिंक व दृश्य रेंडर (Lip-Sync Render)",
        subtitle: "Indic Phoneme Alignment",
        desc: "Our model matches every syllable to mouth movements and micro-expressions, creating buttery smooth animation with automatic regional subtitle burning.",
        tag: "Native Lip-Sync",
      },
      {
        step: "04",
        title: "सोशल ऑटो-पब्लिश (Auto-Publishing)",
        subtitle: "YouTube, Reels & FB in 1-Click",
        desc: "Directly schedule and publish vertical reels or horizontal episodes to YouTube, Instagram Reels, and Facebook Pages with optimized regional hashtags and titles.",
        tag: "100% Automated",
      },
    ],

    useCases: [
      { emoji: "👶", label: "बाल कथाएं (Kids Moral Stories)", desc: "Build million-subscriber channels with Panchatantra & Akbar-Birbal stories." },
      { emoji: "😂", label: "कॉमेडी स्केच (Comedy Sketches)", desc: "Create viral Bhojpuri, Haryanvi, & Hindi comedy dialogues for Reels." },
      { emoji: "🙏", label: "भक्ति व पौराणिक कथाएं (Devotional)", desc: "High-retention Ramayana, Mahabharata, and temple history episodes." },
      { emoji: "📖", label: "शिक्षा व सामान्य ज्ञान (GK & Education)", desc: "Explain science, history, and current affairs in mother tongues." },
      { emoji: "🏪", label: "स्थानीय व्यापार विज्ञापन (Local Ads)", desc: "Make cartoon ad promos for regional brands, coaching centers, and shops." },
      { emoji: "📰", label: "समाचार व तथ्य (Regional Facts/News)", desc: "Snackable daily regional facts that get shared wildly on WhatsApp." },
    ],

    pricing: {
      currency: "₹",
      note: "UPI, Cards, NetBanking accepted. Commercial monetization license included.",
      tiers: [
        {
          name: "प्रारंभिक (Starter)",
          price: "0",
          period: "",
          description: "अपने पहले वीडियो बनाकर टेस्टिंग करने के लिए उत्तम।",
          features: [
            "3 कार्टून वीडियो / महीना",
            "720p HD डाउनलोड",
            "2 मुख्य भाषाएँ (हिंदी + 1 अन्य)",
            "Manual download",
            "कम्युनिटी सपोर्ट",
          ],
          cta: "फ्री में शुरू करें (Start Free)",
          highlight: false,
          badge: "",
        },
        {
          name: "निर्माता (Creator Pro)",
          price: "699",
          period: "/महीना",
          description: "नियमित यूट्यूब और रील्स चैनल चलाने वाले क्रिएटर्स के लिए।",
          features: [
            "25 कार्टून वीडियो / महीना",
            "1080p Full HD (60fps)",
            "सभी 14+ भाषाएँ व देसी आवाज़ें",
            "1-क्लिक सोशल पोस्टिंग (YouTube Shorts + Instagram)",
            "ऑटो कैप्शन व रीजनल थंबनेल जनरेटर",
            "वाटरमार्क मुक्त व 100% मोनेटाइजेशन अधिकार",
          ],
          cta: "वेटलिस्ट में जुड़ें (50% छूट कोड पाएँ)",
          highlight: true,
          badge: "सबसे लोकप्रिय",
        },
        {
          name: "स्टूडियो (Media Studio)",
          price: "1,499",
          period: "/महीना",
          description: "एजेंसियों और मल्टी-चैनल नेटवर्क के लिए असीमित क्षमता।",
          features: [
            "अनलिमिटेड कार्टून वीडियो",
            "4K Ultra-HD एक्सपोर्ट",
            "ऑटो सोशल सिंडिकेशन (YouTube, Reels, Facebook & WhatsApp)",
            "30-दिन का स्वायत्त कैलेंडर शिड्यूलर",
            "मल्टी-लैंग्वेज ऑटो-डबिंग इंजन (1 वीडियो से 5 भाषाएँ)",
            "फास्ट GPU रेंडरिंग (2 मिनट में तैयार)",
            "WhatsApp VIP क्रिएटर सपोर्ट",
          ],
          cta: "अर्ली एक्सेस पाएँ (Get VIP Access)",
          highlight: false,
          badge: "",
        },
      ],
    },

    faq: [
      {
        q: "क्या यह वीडियो यूट्यूब पर मोनेटाइज (Monetize) होंगे?",
        a: "हाँ, 100%! BhashaToons के सभी पात्र, आवाज़ें और दृश्य ओरिजिनल AI जनरेटेड हैं। आपको पूर्ण कमर्शियल अधिकार मिलते हैं, जिससे AdSense, Facebook इन-स्ट्रीम ऐड्स और ब्रांड स्पॉन्सरशिप में कोई कॉपीराइट समस्या नहीं आती।",
      },
      {
        q: "सोशल मीडिया ऑटो-पोस्टिंग कैसे काम करती है?",
        a: "आप अपने यूट्यूब चैनल और इंस्टाग्राम अकाउंट को वन-टाइम ऑथराइज करते हैं। वीडियो तैयार होते ही यह अपने आप सही भाषा के टाइटल, डिस्क्रिप्शन और वायरल हैशटैग्स के साथ शेड्यूल या तुरंत पब्लिश हो जाता है।",
      },
      {
        q: "क्या मुझे अंग्रेजी बोलने की जरूरत है?",
        a: "बिल्कुल नहीं! पूरा इंटरफ़ेस और स्क्रिप्टिंग हिंदी व भारतीय भाषाओं के लिए डिज़ाइन किया गया है। आप हिंग्लिश में भी लिख सकते हैं, जैसे 'Raju bola: arre bhai ruko!' और सिस्टम सही उच्चारण करेगा।",
      },
      {
        q: "क्या भोजपुरी और हरियाणवी जैसी बोलियाँ भी उपलब्ध हैं?",
        a: "हाँ, भोजपुरी, हरियाणवी, मारवाड़ी और अन्य लोकप्रिय बोलियों के लिए विशेष नेचुरल आवाज़ें और हास्य एक्सप्रेशन्स उपलब्ध हैं जो रील्स पर जबरदस्त वायरल होते हैं।",
      },
      {
        q: "क्या मैं एक हिंदी वीडियो को अन्य भाषाओं में बदल सकता हूँ?",
        a: "हाँ! हमारे 'ऑटो-डब' फीचर से आप अपनी हिंदी स्क्रिप्ट को 1-क्लिक में तमिल, तेलुगु या बंगाली में बदल सकते हैं, जिसमें होंठों की गति (lip-sync) भी उसी भाषा के अनुसार री-रेंडर होगी।",
      },
    ],

    useCaseDropdown: [
      "बाल कथाएं व किस्से (Kids Stories)",
      "कॉमेडी व फनी स्केच (Comedy Clips)",
      "भक्ति व धार्मिक प्रसंग (Devotional)",
      "शिक्षा व रोचक तथ्य (Education & GK)",
      "लोकल ब्रांड व बिजनेस विज्ञापन (Commercials)",
      "मल्टी-लैंग्वेज नेटवर्क (Multi-Channel Agency)",
      "अन्य (Other)",
    ],
    priceSignalOptions: ["Free ट्रायल काफी है", "₹699/माह Creator Pro", "₹1,499/माह Media Studio"],
    theme: {
      accent: "#E85D26",
      accentLight: "#FFF0E6",
      accentDark: "#C44512",
      bg: "#0D0A08",
      cardBg: "bg-amber-950/20",
      borderGlow: "border-orange-500/30",
    },
  },

  // ───── Global Enterprise Footer Links ─────
  footerNav: {
    product: [
      { label: "Character Consistency Engine", href: "#features" },
      { label: "Multi-Platform Auto-Publisher", href: "#social-automation" },
      { label: "Phoneme Lip-Sync Studio", href: "#pipeline" },
      { label: "AI Storyboard & Scene Builder", href: "#features" },
      { label: "Automated Series Scheduler", href: "#social-automation" },
      { label: "API & Webhooks", href: "#pricing" },
    ],
    integrations: [
      { label: "YouTube Partner API", href: "#social-automation" },
      { label: "Instagram Reels Graph API", href: "#social-automation" },
      { label: "TikTok Content Posting API", href: "#social-automation" },
      { label: "Facebook Pages Manager", href: "#social-automation" },
      { label: "WhatsApp Direct Share", href: "#social-automation" },
      { label: "Zapier & Webhook Sync", href: "#pricing" },
    ],
    solutions: [
      { label: "Faceless Creator Studios", href: "#use-cases" },
      { label: "Digital Media Agencies", href: "#use-cases" },
      { label: "EdTech & Kids Channels", href: "#use-cases" },
      { label: "Regional Language Networks", href: "#use-cases" },
      { label: "Brand Mascot Marketing", href: "#use-cases" },
      { label: "Enterprise Custom Deployment", href: "#pricing" },
    ],
    resources: [
      { label: "Early Access Documentation", href: "#faq" },
      { label: "Viral Script Prompts Playbook", href: "#pipeline" },
      { label: "Character Consistency Guide", href: "#features" },
      { label: "Monetization Guidelines", href: "#faq" },
      { label: "Creator Community", href: "#faq" },
      { label: "System Status: 99.9% Uptime", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Commercial Rights & IP", href: "#" },
      { label: "AI Ethics & Safety", href: "#" },
      { label: "Security & SOC-2 Overview", href: "#" },
    ],
  },
} as const;

export type IdeaKey = keyof typeof SITE;
