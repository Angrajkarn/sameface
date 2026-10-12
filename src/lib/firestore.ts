// ─────────────────────────────────────────────────────
// Firestore helpers — signup + page-view logging
// With graceful local-storage fallback for local preview
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

/* ── Local fallback data for demo / offline preview ── */
const LOCAL_WAITLIST_KEY = "wv_local_waitlist";
const LOCAL_VIEWS_KEY = "wv_local_views";

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

/* ── Sample Seed Data for instant local admin visualization ── */
const SEED_WAITLIST = [
  {
    id: "seed-1",
    email: "creator.sam@youtube.com",
    idea: "mascot",
    useCase: "YouTube series",
    pricePick: "$19/mo Creator",
    utm_source: "youtube",
    utm_medium: "video-desc",
    utm_campaign: "launch",
    referrer: "https://youtube.com",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "seed-2",
    email: "priya.stories@gmail.com",
    idea: "bhasha",
    useCase: "Kids stories",
    pricePick: "₹499/mo Creator",
    utm_source: "instagram",
    utm_medium: "reels",
    utm_campaign: "hindi-creators",
    referrer: "https://instagram.com",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "seed-3",
    email: "rohit.animation@gmail.com",
    idea: "bhasha",
    useCase: "Comedy / entertainment",
    pricePick: "₹999/mo Pro",
    utm_source: "whatsapp",
    utm_medium: "share",
    utm_campaign: "",
    referrer: "",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-4",
    email: "alex.shorts@tiktok.com",
    idea: "mascot",
    useCase: "Shorts / Reels",
    pricePick: "$39/mo Pro",
    utm_source: "twitter",
    utm_medium: "social",
    utm_campaign: "early-access",
    referrer: "https://x.com",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-5",
    email: "devotee.channel@outlook.com",
    idea: "bhasha",
    useCase: "Devotional",
    pricePick: "Free is enough",
    utm_source: "facebook",
    utm_medium: "group",
    utm_campaign: "",
    referrer: "https://facebook.com",
    createdAt: new Date().toISOString(),
  },
];

const SEED_VIEWS = [
  ...Array.from({ length: 42 }).map((_, i) => ({
    id: `seed-v-m-${i}`,
    idea: "mascot",
    utm_source: i % 2 === 0 ? "twitter" : "youtube",
    utm_medium: "social",
    utm_campaign: "test",
    referrer: "https://x.com",
    createdAt: new Date(Date.now() - (i % 3) * 86400000).toISOString(),
  })),
  ...Array.from({ length: 65 }).map((_, i) => ({
    id: `seed-v-b-${i}`,
    idea: "bhasha",
    utm_source: i % 3 === 0 ? "instagram" : i % 3 === 1 ? "whatsapp" : "direct",
    utm_medium: "social",
    utm_campaign: "hindi",
    referrer: "https://instagram.com",
    createdAt: new Date(Date.now() - (i % 3) * 86400000).toISOString(),
  })),
];

/* ── Log a page view ── */
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
  } catch (err) {
    // Falls back silently to local tracking
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

/* ── Submit a waitlist signup ── */
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
  } catch (err) {
    console.info("Using local waitlist storage for preview (Firebase offline or demo credentials).");
  }

  // Trigger Google Workspace / work@sameface.in lead sync
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

/* ── Admin: fetch all waitlist entries ── */
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
  } catch (err) {
    // Firestore error or demo keys -> fallback to local data + seeds
  }

  // Combine user's local entries with initial seed preview data
  const local = getLocalWaitlist();
  const combined = [...local, ...SEED_WAITLIST];
  return combined;
}

/* ── Admin: fetch all views ── */
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
  } catch (err) {
    // Fallback to local
  }

  const local = getLocalViews();
  const combined = [...local, ...SEED_VIEWS];
  return combined;
}
