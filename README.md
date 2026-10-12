# Waitlist Validator — Enterprise Vid.AI Edition

High-converting, enterprise-grade waitlist validation platform for testing two viral AI SaaS concepts before writing a single line of backend product code:

- **`/mascot`** — **SameFace**: Consistent AI cartoon characters across infinite episodes for YouTubers & faceless channels.
- **`/bhasha`** — **BhashaToons**: AI Indic cartoon videos in 14+ regional languages with lip-sync.
- **`/admin`** — Password-protected analytics console with conversion rates, price willingness, live search, Google Sheets CSV export, and Google Workspace sync.
- **`/`** — Vid.AI styled launchpad and internal chooser.

---

## 🚀 Design & Marketing Architecture

1. **Vid.AI Visual Aesthetics**:
   - High-contrast pitch black (`#000000` / `#070b17`) design system.
   - Ambient electric blue (`#38bdf8`) and amber (`#f59e0b`) radial glows.
   - Interactive spinning conic-gradient prompt generator (`.home-spin`).
   - Layered video mockups: 16:9 widescreen player + 9:16 vertical Shorts/Reels phone mockup with 100% Mascot DNA lock badge.
   - Infinite testimonial marquee with real creator reviews and dynamic blur edges.
   - Comprehensive multi-channel social distribution suite (YouTube, Instagram Reels, TikTok, Facebook Reels, WhatsApp/X).

2. **Advanced Conversion & Scarcity Psychology**:
   - **Dynamic Founder Pass Scarcity Bar**: Tracks live slots (e.g. 953/1,000 claimed, 47 left).
   - **VIP Founder Pass Ticket Generator**: Generates customized certificates with codes (`SF-VIP-xxx` or `BHARAT-VIP-xxx`).
   - **50% Lifetime Founder Discount Lock**: Instant 1-click code copy (`FOUNDER50` / `BHARAT50`) + 1,000 bonus generation credits.
   - **Live Social Proof Toasts**: Non-intrusive rotating notifications showing recent signups (e.g. *"A creator from Mumbai just joined..."*).

3. **Google Workspace Integration (`work@sameface.in`)**:
   - Automatic server-side lead routing via `/api/waitlist`.
   - Admin panel direct synchronization badge for `work@sameface.in`.
   - Ready-to-deploy Google Apps Script (`google-workspace-sync.gs`) to instantly append leads into Google Sheets and trigger email notifications to `work@sameface.in`.
   - 1-click "Export to Google Sheets CSV" button in `/admin`.

---

## 🛠️ Google Workspace & Google Sheets Setup

To have every signup saved directly in your Google Workspace:

1. Open **Google Sheets** while logged into your workspace (`work@sameface.in`).
2. Go to **Extensions** → **Apps Script**.
3. Open `google-workspace-sync.gs` in this repository, copy the entire script, and paste it into the Apps Script editor.
4. Click **Deploy** → **New deployment**:
   - **Select type**: Web app
   - **Execute as**: Me (`work@sameface.in`)
   - **Who has access**: Anyone
5. Copy the generated Web App URL and add it to your `.env.local` or Vercel Environment Variables:
   ```env
   GOOGLE_WORKSPACE_WEBHOOK_URL="https://script.google.com/macros/s/..."
   GOOGLE_WORKSPACE_EMAIL="work@sameface.in"
   ```
6. Every signup will automatically append a new row in your sheet and email `work@sameface.in`!

---

## 💻 Tech Stack & Local Setup

- **Next.js 16** (App Router & Turbopack)
- **Tailwind CSS v4** + Vanilla CSS animations
- **Firebase Firestore** (signups, page views, and pricing votes)
- **Vercel** (deployment target)

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Run production build validation
npm run build
```

---

## 🔑 Admin Console

Visit `http://localhost:3000/admin` and enter the configured admin password (default: `admin123` in `.env.local`). View real-time visitor stats, signups, traffic sources, pricing tier picks, and export to CSV.
# sameface
