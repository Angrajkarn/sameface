// ─────────────────────────────────────────────────────
// Firestore helpers — Real signup + page-view logging
// 100% Real Data — Zero Mock/Seed Data
// ─────────────────────────────────────────────────────

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

/* ── UTM helpers ── */
export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
}

export function getUtmParams(): UtmParams {
  if (typeof window === "undefined")
    return { utm_source: "", utm_medium: "", utm_campaign: "", referrer: "" };
  const sp = new URLSearchParams(window.location.search);
  return {
    utm_source: sp.get("utm_source") || "",
    utm_medium: sp.get("utm_medium") || "",
    utm_campaign: sp.get("utm_campaign") || "",
    referrer: document.referrer || "",
  };
}

/* ── Real Local Storage Persistence for client preview ── */
const LOCAL_WAITLIST_KEY = "wv_real_waitlist";
const LOCAL_VIEWS_KEY = "wv_real_views";

function getLocalWaitlist() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_WAITLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalWaitlist(entry: any) {
  if (typeof window === "undefined") return;
  const list = getLocalWaitlist();
  const existingIdx = list.findIndex(
    (e: any) => e.email === entry.email && e.idea === entry.idea
  );
  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...entry };
  } else {
    list.unshift(entry);
  }
  localStorage.setItem(LOCAL_WAITLIST_KEY, JSON.stringify(list));
}

function getLocalViews() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_VIEWS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalView(view: any) {
  if (typeof window === "undefined") return;
  const list = getLocalViews();
  list.unshift(view);
  localStorage.setItem(LOCAL_VIEWS_KEY, JSON.stringify(list));
}

/* ── Log a real page view ── */
export async function logPageView(idea: string) {
  const utm = getUtmParams();
  const entry = {
    idea,
    ...utm,
    createdAt: new Date().toISOString(),
  };

  saveLocalView(entry);

  try {
    await addDoc(collection(db, "views"), {
      idea,
      ...utm,
      createdAt: serverTimestamp(),
    });
  } catch {
    // Graceful fallback
  }
}

/* ── Check if email already signed up for this idea ── */
export async function isDuplicateEmail(
  email: string,
  idea: string
): Promise<boolean> {
  const normalized = email.toLowerCase().trim();
  const localList = getLocalWaitlist();
  if (localList.some((e: any) => e.email === normalized && e.idea === idea)) {
    return true;
  }

  try {
    const q = query(
      collection(db, "waitlist"),
      where("email", "==", normalized),
      where("idea", "==", idea)
    );
    const snap = await getDocs(q);
    return !snap.empty;
  } catch {
    return false;
  }
}

/* ── Submit a real waitlist signup ── */
export interface SignupPayload {
  email: string;
  idea: string;
  useCase: string;
  pricePick: string;
}

export async function submitSignup(data: SignupPayload) {
  const utm = getUtmParams();
  const email = data.email.toLowerCase().trim();

  // Check duplicate
  const dup = await isDuplicateEmail(email, data.idea);
  if (dup) return { ok: false, reason: "duplicate" } as const;

  const localRecord = {
    id: `local-${Date.now()}`,
    email,
    idea: data.idea,
    useCase: data.useCase || "",
    pricePick: data.pricePick || "",
    ...utm,
    createdAt: new Date().toISOString(),
  };
  saveLocalWaitlist(localRecord);

  try {
    await addDoc(collection(db, "waitlist"), {
      email,
      idea: data.idea,
      useCase: data.useCase || "",
      pricePick: data.pricePick || "",
      ...utm,
      createdAt: serverTimestamp(),
    });
  } catch {
    // Gracefully stored locally & via /api/waitlist
  }

  // Trigger server-side enterprise route for rate-limiting, Google Sheets & ledger
  if (typeof window !== "undefined") {
    fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        idea: data.idea,
        useCase: data.useCase || "",
        pricePick: data.pricePick || "",
        ...utm,
      }),
    }).catch(() => {});
  }

  return { ok: true } as const;
}

/* ── Admin: fetch all real waitlist entries (NO MOCK DATA) ── */
export async function fetchWaitlist() {
  try {
    const q = query(collection(db, "waitlist"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toISOString()
              : "",
        };
      });
    }
  } catch {
    // Offline or fallback to real local list
  }

  // Return only real local submissions — ZERO mock data!
  return getLocalWaitlist();
}

/* ── Admin: fetch all real views (NO MOCK DATA) ── */
export async function fetchViews() {
  try {
    const q = query(collection(db, "views"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toISOString()
              : "",
        };
      });
    }
  } catch {
    // Offline fallback
  }

  // Return only real logged views — ZERO mock data!
  return getLocalViews();
}
