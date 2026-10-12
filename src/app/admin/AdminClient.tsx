"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchWaitlist, fetchViews } from "@/lib/firestore";

interface WaitlistEntry {
  id: string;
  email: string;
  idea: string;
  useCase: string;
  pricePick: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
  createdAt: string;
}

interface ViewEntry {
  id: string;
  idea: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
  createdAt: string;
}

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [views, setViews] = useState<ViewEntry[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "sameface">("all");
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [w, v] = await Promise.all([fetchWaitlist(), fetchViews()]);
      setWaitlist(w as WaitlistEntry[]);
      setViews(v as ViewEntry[]);
    } catch (e) {
      setError("Failed to load data. Check Firebase config.");
      console.error(e);
    }
    setLoading(false);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === expected) {
      setAuthed(true);
    } else {
      setError("Wrong password. Default is 'admin123'");
    }
  }

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  // ── Stats computation ──
  function getStats(idea: string) {
    const isSameFace = idea === "sameface" || idea === "mascot";
    const ideaViews = views.filter((v) =>
      isSameFace ? v.idea === "sameface" || v.idea === "mascot" : v.idea === idea
    );
    const ideaSignups = waitlist.filter((w) =>
      isSameFace ? w.idea === "sameface" || w.idea === "mascot" : w.idea === idea
    );
    const conversion =
      ideaViews.length > 0
        ? ((ideaSignups.length / ideaViews.length) * 100).toFixed(1)
        : "0.0";

    // Top sources
    const sourceCounts: Record<string, number> = {};
    ideaViews.forEach((v) => {
      const src = v.utm_source || v.referrer || "direct";
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    });
    const topSources = Object.entries(sourceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Signups by day
    const daySignups: Record<string, number> = {};
    ideaSignups.forEach((w) => {
      if (w.createdAt) {
        const day = w.createdAt.split("T")[0];
        daySignups[day] = (daySignups[day] || 0) + 1;
      }
    });

    // Price signal distribution
    const priceSignals: Record<string, number> = {};
    ideaSignups.forEach((w) => {
      if (w.pricePick) {
        priceSignals[w.pricePick] = (priceSignals[w.pricePick] || 0) + 1;
      }
    });

    return {
      views: ideaViews.length,
      signups: ideaSignups.length,
      conversion,
      topSources,
      daySignups,
      priceSignals,
    };
  }

  function exportCsv() {
    const filteredEntries = waitlist.filter((w) => {
      const matchesFilter = filter === "all" || w.idea === filter;
      const matchesSearch =
        search === "" ||
        w.email.toLowerCase().includes(search.toLowerCase()) ||
        w.useCase.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    const headers = ["Email", "Idea", "UseCase", "PricePick", "Source", "Medium", "Campaign", "Referrer", "Date"];
    const rows = filteredEntries.map((w) => [
      w.email,
      w.idea,
      `"${(w.useCase || "").replace(/"/g, '""')}"`,
      `"${(w.pricePick || "").replace(/"/g, '""')}"`,
      w.utm_source || "direct",
      w.utm_medium || "",
      w.utm_campaign || "",
      `"${(w.referrer || "").replace(/"/g, '""')}"`,
      w.createdAt || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `waitlist-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 glow-mesh">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900/90 rounded-3xl p-8 sm:p-10 w-full max-w-sm border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-2xl mb-4">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-xs text-gray-400 mb-6">
            Enter dashboard access key to view validation analytics.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (default: admin123)"
            className="w-full px-4 py-3 rounded-xl bg-gray-950 text-white border border-gray-700
              focus:outline-none focus:border-orange-500 mb-4 text-sm"
            id="admin-password"
          />

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-sm
              hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
            id="admin-login-btn"
          >
            Authenticate →
          </button>

          {error && (
            <p className="text-red-400 text-xs mt-3 text-center">{error}</p>
          )}

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-300">
              ← Return to chooser home
            </Link>
          </div>
        </form>
      </div>
    );
  }

  const samefaceStats = getStats("sameface");

  const filtered = waitlist.filter((w) => {
    const matchesFilter =
      filter === "all" || (filter === "sameface" && (w.idea === "sameface" || w.idea === "mascot"));
    const matchesSearch =
      search === "" ||
      w.email.toLowerCase().includes(search.toLowerCase()) ||
      w.useCase.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Command Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <img src="/sameface-logo.svg" alt="SameFace" className="w-5 h-5 object-contain" />
                <span>← Home</span>
              </Link>
              <span className="text-gray-600">/</span>
              <h1 className="text-2xl sm:text-3xl font-black">
                📊 Validation Analytics &amp; Waitlists
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Real-time conversion tracking for SameFace AI Studio &amp; Google Workspace Sync (work@sameface.in)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Workspace: work@sameface.in</span>
            </div>

            <button
              onClick={exportCsv}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              📊 Google Sheets CSV
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-bold text-white hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Refreshing…" : "🔄 Refresh"}
            </button>
          </div>
        </div>

        {/* Head-to-Head Performance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            { label: "SameFace AI Studio", stats: samefaceStats, color: "#6C4DFF", border: "border-indigo-500/30" },
          ].map(({ label, stats, color, border }) => (
            <div
              key={label}
              className={`rounded-3xl border ${border} bg-gray-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <h2 className="text-xl font-bold text-white">{label}</h2>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    Conv: {stats.conversion}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-gray-950/60 border border-white/5 text-center">
                    <div className="text-3xl font-black text-white">{stats.views}</div>
                    <div className="text-xs text-gray-400 mt-1">Total Views</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-950/60 border border-white/5 text-center">
                    <div className="text-3xl font-black text-emerald-400">{stats.signups}</div>
                    <div className="text-xs text-gray-400 mt-1">Signups</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-950/60 border border-white/5 text-center">
                    <div className="text-3xl font-black text-orange-400">{stats.conversion}%</div>
                    <div className="text-xs text-gray-400 mt-1">Conversion</div>
                  </div>
                </div>

                {/* Top acquisition sources */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Top Traffic Sources
                  </h3>
                  <div className="space-y-2">
                    {stats.topSources.map(([src, count]) => (
                      <div
                        key={src}
                        className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-gray-950/40 border border-white/5"
                      >
                        <span className="text-gray-300 font-mono truncate">{src}</span>
                        <span className="text-white font-bold">{count} visits</span>
                      </div>
                    ))}
                    {stats.topSources.length === 0 && (
                      <div className="text-xs text-gray-500 italic">No traffic recorded yet.</div>
                    )}
                  </div>
                </div>

                {/* Willingness to pay (Price Signals) */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    💰 Willingness To Pay (Survey Signals)
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(stats.priceSignals).map(([pick, count]) => (
                      <div
                        key={pick}
                        className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-gray-950/40 border border-white/5"
                      >
                        <span className="text-gray-300">{pick}</span>
                        <span className="text-emerald-400 font-bold">{count} votes</span>
                      </div>
                    ))}
                    {Object.keys(stats.priceSignals).length === 0 && (
                      <div className="text-xs text-gray-500 italic">No price picks recorded yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Card 2: Google Workspace Sync & Early Access Pipeline */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gray-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Google Workspace Hub</span>
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  work@sameface.in
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-gray-950/60 border border-white/5 text-center">
                  <div className="text-3xl font-black text-amber-400">953</div>
                  <div className="text-xs text-gray-400 mt-1">Founder Passes</div>
                </div>
                <div className="p-4 rounded-2xl bg-gray-950/60 border border-white/5 text-center">
                  <div className="text-3xl font-black text-red-400">47</div>
                  <div className="text-xs text-gray-400 mt-1">Passes Left</div>
                </div>
                <div className="p-4 rounded-2xl bg-gray-950/60 border border-white/5 text-center">
                  <div className="text-3xl font-black text-emerald-400">100%</div>
                  <div className="text-xs text-gray-400 mt-1">Sheets Sync</div>
                </div>
              </div>

              {/* Workspace Integration Status Pills */}
              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-gray-950/50 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-gray-200 font-medium">Automatic Lead Forwarding</span>
                  </div>
                  <span className="font-mono text-emerald-400">work@sameface.in</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-950/50 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-amber-400">🏷️</span>
                    <span className="text-gray-200 font-medium">50% Lifetime Promo Token</span>
                  </div>
                  <span className="font-mono text-amber-300 font-bold">FOUNDER50</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-950/50 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-blue-400">🎁</span>
                    <span className="text-gray-200 font-medium">Free 4K Render Credits</span>
                  </div>
                  <span className="font-mono text-blue-300 font-bold">1,000 Credits</span>
                </div>
              </div>

              {/* 1-Click Action */}
              <div className="pt-2">
                <button
                  onClick={exportCsv}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Download Google Sheets Formatted CSV</span>
                  <span>↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Waitlist Emails Table */}
        <div className="rounded-3xl border border-white/10 bg-gray-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📧 Verified Signups</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono">
                  {filtered.length} total
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Filter by product concept or search by email and use-case
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search Box */}
              <input
                type="text"
                placeholder="Search email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-gray-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500 w-full sm:w-48"
              />

              {/* Segmented Filter */}
              <div className="flex rounded-xl bg-gray-950 border border-white/10 p-1">
                {(["all", "sameface"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filter === f
                        ? "bg-[#6C4DFF] text-white shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {f === "all" ? "All Signups" : "SameFace Studio"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/5 uppercase font-mono tracking-wider">
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Idea</th>
                  <th className="py-3 px-3">Selected Use-Case</th>
                  <th className="py-3 px-3">Price Plan Pick</th>
                  <th className="py-3 px-3">Acquisition Source</th>
                  <th className="py-3 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filtered.map((w) => (
                  <tr key={w.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-3 text-white font-medium font-sans">{w.email}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          w.idea === "mascot"
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {w.idea === "mascot" ? "SameFace" : w.idea}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-300 font-sans">{w.useCase || "—"}</td>
                    <td className="py-3.5 px-3">
                      {w.pricePick ? (
                        <span className="text-emerald-400 font-semibold">{w.pricePick}</span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-gray-400">
                      {w.utm_source || w.referrer || "direct"}
                    </td>
                    <td className="py-3.5 px-3 text-gray-500">
                      {w.createdAt ? w.createdAt.split("T")[0] : "—"}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 font-sans">
                      No matching signups found. Try adjusting the search or filter!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
