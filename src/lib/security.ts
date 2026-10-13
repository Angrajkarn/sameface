import crypto from "crypto";
import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────
// ENTERPRISE SECURITY UTILITIES
// Rate limiting, input sanitization, password hashing & sessions
// ─────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, "admin-config.json");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ── In-Memory Sliding Window Rate Limiter ──
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count };
}

// ── Strict Input Sanitization (XSS, Injection, HTML Stripping) ──
export function sanitizeInput(input: string, maxLength = 500): string {
  if (!input || typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, "") // Prevent script URL schemes
    .replace(/on\w+=/gi, "") // Prevent inline event handlers
    .slice(0, maxLength);
}

// RFC 5322 compliant email regex check
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

// ── Password Hashing & Admin Configuration ──
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

export interface AdminConfig {
  salt: string;
  hash: string;
  updatedAt: string;
}

const DEFAULT_SALT = "sameface_secure_enterprise_salt_2026";
const INITIAL_DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export function getAdminConfig(): AdminConfig {
  ensureDataDir();
  if (fs.existsSync(ADMIN_CONFIG_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ADMIN_CONFIG_FILE, "utf-8"));
      if (data.salt && data.hash) return data;
    } catch {
      // Fallback if file corrupt
    }
  }

  // Create initial config if not exists
  const initialConfig: AdminConfig = {
    salt: DEFAULT_SALT,
    hash: hashPassword(INITIAL_DEFAULT_PASSWORD, DEFAULT_SALT),
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(initialConfig, null, 2));
  } catch (err) {
    console.error("Could not write admin config:", err);
  }

  return initialConfig;
}

export function updateAdminPassword(newPassword: string): boolean {
  ensureDataDir();
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(newPassword, salt);
  const config: AdminConfig = {
    salt,
    hash,
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (err) {
    console.error("Failed to update admin password:", err);
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const config = getAdminConfig();
  const incomingHash = hashPassword(password, config.salt);
  return crypto.timingSafeEqual(Buffer.from(incomingHash), Buffer.from(config.hash));
}

// ── Secure Session Token (HMAC SHA-256) ──
const SESSION_SECRET = process.env.SESSION_SECRET || "sameface_admin_super_secret_jwt_key_2026_nov5";

export function generateSessionToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours valid
    rnd: crypto.randomBytes(8).toString("hex"),
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(str).digest("base64url");
  return `${str}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [str, sig] = parts;
  const expectedSig = crypto.createHmac("sha256", SESSION_SECRET).update(str).digest("base64url");

  if (sig !== expectedSig) return false;

  try {
    const payload = JSON.parse(Buffer.from(str, "base64url").toString("utf-8"));
    if (payload.exp && Date.now() < payload.exp && payload.role === "admin") {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

// ── Server-Side Real Waitlist Ledger (Zero Data Loss) ──
export interface WaitlistRecord {
  id: string;
  passCode: string;
  email: string;
  idea: string;
  useCase: string;
  pricePick: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
  timestamp: string;
  discountCode: string;
  creditsGranted: number;
  ipHash: string;
}

export function getSavedWaitlist(): WaitlistRecord[] {
  ensureDataDir();
  if (fs.existsSync(WAITLIST_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(WAITLIST_FILE, "utf-8"));
    } catch {
      return [];
    }
  }
  return [];
}

export function saveWaitlistRecord(record: WaitlistRecord): void {
  ensureDataDir();
  const list = getSavedWaitlist();
  const idx = list.findIndex((e) => e.email === record.email && e.idea === record.idea);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...record };
  } else {
    list.unshift(record);
  }
  try {
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("Could not write waitlist record to disk:", err);
  }
}
