"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface WaitlistEntry {
  id: string;
  passCode?: string;
  email: string;
  idea: string;
  useCase?: string;
  pricePick?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  timestamp?: string;
  createdAt?: string;
}

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "sameface" | "bhasha">("all");
  const [search, setSearch] = useState("");

  // Change Password State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  // Check saved session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem("sf_admin_token");
    if (savedToken) {
      setToken(savedToken);
      setAuthed(true);
    }
  }, []);

  const loadData = useCallback(async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.status === 401) {
        // Session expired
        sessionStorage.removeItem("sf_admin_token");
        setAuthed(false);
        setToken(null);
        setError("Session expired. Please log in again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.ok) {
        setWaitlist(data.waitlist || []);
      } else {
        setError(data.error || "Failed to load real data.");
      }
    } catch (e) {
      setError("Network error fetching live waitlist.");
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed && token) {
      loadData(token);
    }
  }, [authed, token, loadData]);

  // ── Secure Server-Side Login ──
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        sessionStorage.setItem("sf_admin_token", data.token);
        setAuthed(true);
        setPassword("");
      } else {
        setError(data.error || "Invalid password.");
      }
    } catch {
      setError("Server connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("sf_admin_token");
    setToken(null);
    setAuthed(false);
    setWaitlist([]);
  }

  // ── Secure Change Password Action ──
  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }

    setChangingPw(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setPwSuccess("✓ Password successfully updated and encrypted!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowPasswordModal(false);
          setPwSuccess("");
        }, 2000);
      } else {
        setPwError(data.error || "Failed to update password.");
      }
    } catch {
      setPwError("Error communicating with authentication server.");
    } finally {
      setChangingPw(false);
    }
  }

  // ── Export CSV for Google Sheets / Excel ──
  function exportCSV() {
    if (waitlist.length === 0) return;
    const headers = ["Timestamp", "PassCode", "Email", "Product", "PricePick", "UseCase", "Source", "Campaign"];
    const rows = waitlist.map((w) => [
      w.timestamp || w.createdAt || "",
      w.passCode || "",
      w.email,
      w.idea,
      `"${(w.pricePick || "").replace(/"/g, '""')}"`,
      `"${(w.useCase || "").replace(/"/g, '""')}"`,
      w.utm_source || "direct",
      w.utm_campaign || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sameface_real_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filtered waitlist
  const filteredWaitlist = waitlist.filter((w) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "sameface" && (w.idea === "sameface" || w.idea === "mascot")) ||
      (filter === "bhasha" && w.idea === "bhasha");
    const matchesSearch =
      search === "" ||
      w.email.toLowerCase().includes(search.toLowerCase()) ||
      (w.passCode || "").toLowerCase().includes(search.toLowerCase()) ||
      (w.useCase || "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // ──── UNATHENTICATED SECURE LOGIN SCREEN ────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050814] flex items-center justify-center p-4">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
        />

        <div className="relative w-full max-w-md rounded-3xl border border-blue-400/30 bg-[#080d1e]/90 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-2 border border-blue-400/40 shadow-lg mb-4">
              <img src="/sameface-logo.svg" alt="SameFace" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Enterprise Admin Console</h1>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Protected by PBKDF2 &amp; HMAC Session Tokens
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Admin Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-400 focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-indigo-500 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Authenticate Session 🔐"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-zinc-500">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              ← Return to SameFace Studio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ──── AUTHENTICATED REAL DASHBOARD ────
  return (
    <div className="min-h-screen bg-[#050814] text-white">
      {/* Top Admin Nav */}
      <header className="border-b border-zinc-800 bg-[#070b1a]/90 backdrop-blur sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-blue-600 p-1 flex items-center justify-center">
                <img src="/sameface-logo.svg" alt="SameFace" className="h-full w-full object-contain" />
              </div>
              <span className="font-black text-lg tracking-wider">SAMEFACE</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[10px] font-mono font-bold uppercase">
              ENTERPRISE ADMIN
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Launch Urgency Badge */}
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] font-mono text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              LAUNCH: NOV 5, 2026
            </span>

            {/* Change Password Button */}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-3 py-1.5 rounded-xl border border-white/10 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              🔑 Change Password
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-mono text-red-300 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Top Metric Cards (100% Real Data) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400 uppercase">Real Verified Leads</span>
            <div className="text-3xl font-black text-white mt-1">{waitlist.length}</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-mono">100% Genuine Submissions</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400 uppercase">Google Workspace Sync</span>
            <div className="text-sm font-bold text-blue-300 mt-2 truncate">work@sameface.in</div>
            <div className="text-[11px] text-zinc-500 mt-1 font-mono">Google Sheets Webhook Active</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400 uppercase">Founder Pass Allocation</span>
            <div className="text-3xl font-black text-amber-300 mt-1">
              {Math.min(10000, waitlist.length)} / 10,000
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 font-mono">
              {Math.max(0, 10000 - waitlist.length)} remaining
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400 uppercase">World Premiere Date</span>
            <div className="text-2xl font-black text-purple-300 mt-1">Nov 5, 2026</div>
            <div className="text-[11px] text-zinc-400 mt-1 font-mono">Grandfathered 50% discount closes</div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-2xl">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by email, pass code, or use case..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-zinc-500 w-full sm:w-72 focus:outline-none focus:border-blue-400"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
            >
              <option value="all">All Products</option>
              <option value="sameface">SameFace (Consistent Mascot)</option>
              <option value="bhasha">BhashaToons (Indic Regional)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => token && loadData(token)}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            >
              {loading ? "Refreshing..." : "↻ Refresh Live Data"}
            </button>

            <button
              onClick={exportCSV}
              disabled={waitlist.length === 0}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-black font-bold text-xs font-mono transition-colors cursor-pointer shadow-md"
            >
              📥 Export CSV (Excel/Sheets)
            </button>
          </div>
        </div>

        {/* Real Data Table (ZERO MOCK DATA) */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080d1e] border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Pass Code</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Willingness to Pay</th>
                  <th className="py-3.5 px-4">Prompt / Use Case</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Date / Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filteredWaitlist.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-14 text-center text-zinc-500 font-mono">
                      {loading ? (
                        <span>Loading live submissions...</span>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-3xl">🎯</div>
                          <div className="text-zinc-300 font-bold">No live submissions yet</div>
                          <div className="text-xs text-zinc-500 max-w-sm mx-auto">
                            Mock data has been completely eliminated. Real visitors claiming passes on your landing page will appear here immediately and sync to Google Workspace!
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredWaitlist.map((w) => (
                    <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-amber-300">
                        {w.passCode || "VIP-PENDING"}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">{w.email}</td>
                      <td className="py-3 px-4 font-mono text-zinc-300">
                        {w.idea === "bhasha" ? "BhashaToons" : "SameFace"}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-400">
                        {w.pricePick || "Not picked yet"}
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-zinc-400">
                        {w.useCase || "—"}
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-400 text-[11px]">
                        {w.utm_source || "direct"}
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-500 text-[11px]">
                        {(w.timestamp || w.createdAt || "").replace("T", " ").slice(0, 19)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ──── CHANGE PASSWORD MODAL ──── */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-amber-400/30 bg-[#090f24] p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>🔑</span> Change Admin Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-zinc-400 hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Update your administrative password. It will be encrypted on the server with SHA-512 PBKDF2 hashing.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password..."
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password..."
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {pwError && (
                <div className="p-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-300">
                  {pwError}
                </div>
              )}

              {pwSuccess && (
                <div className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 font-bold">
                  {pwSuccess}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changingPw}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs font-mono transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {changingPw ? "Updating..." : "Update Password 🔒"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
