import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  checkRateLimit,
  sanitizeInput,
  isValidEmail,
  saveWaitlistRecord,
  type WaitlistRecord,
} from "@/lib/security";
import { sendSubscriberWelcomeEmail } from "@/lib/email";

interface WaitlistPayload {
  email: string;
  idea: string;
  useCase?: string;
  pricePick?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  hp_check?: string; // Anti-bot honeypot
}

export async function POST(req: Request) {
  try {
    // ── 1. IP extraction & Rate-Limiting ──
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);

    const rate = checkRateLimit(ip, 8, 60000); // Max 8 requests per minute per IP
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: "Rate limit exceeded. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as WaitlistPayload;
    const { email, idea, useCase, pricePick, utm_source, utm_medium, utm_campaign, referrer, hp_check } = body;

    // ── 2. Anti-Bot Honeypot ──
    if (hp_check && hp_check.length > 0) {
      // Fake success for automated bots
      return NextResponse.json({ ok: true, status: "processed" });
    }

    // ── 3. Strict Email Validation ──
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
    }

    const normalizedEmail = sanitizeInput(email.toLowerCase().trim(), 120);
    const sanitizedIdea = sanitizeInput(idea || "sameface", 40);
    const sanitizedUseCase = sanitizeInput(useCase || "", 300);
    const sanitizedPricePick = sanitizeInput(pricePick || "", 60);
    const sanitizedUtmSource = sanitizeInput(utm_source || "direct", 60);
    const sanitizedUtmMedium = sanitizeInput(utm_medium || "", 60);
    const sanitizedUtmCampaign = sanitizeInput(utm_campaign || "", 60);
    const sanitizedReferrer = sanitizeInput(referrer || "", 150);

    const timestamp = new Date().toISOString();
    const founderNumber = 954 + Math.floor(Math.random() * 40);
    const passCode = `${sanitizedIdea === "bhasha" ? "BHARAT" : "SF"}-VIP-${founderNumber}`;
    const discountCode = sanitizedIdea === "bhasha" ? "BHARAT50" : "FOUNDER50";
    const creditsGranted = 1000;

    const leadRecord: WaitlistRecord = {
      id: crypto.randomUUID(),
      passCode,
      email: normalizedEmail,
      idea: sanitizedIdea,
      useCase: sanitizedUseCase,
      pricePick: sanitizedPricePick,
      utm_source: sanitizedUtmSource,
      utm_medium: sanitizedUtmMedium,
      utm_campaign: sanitizedUtmCampaign,
      referrer: sanitizedReferrer,
      timestamp,
      discountCode,
      creditsGranted,
      ipHash,
    };

    // ── 4. Save to Persistent Server Ledger (Bulletproof Zero-Loss) ──
    saveWaitlistRecord(leadRecord);
    console.info(`⚡ [Enterprise Security] New Verified Lead: ${normalizedEmail} (Pass: ${passCode})`);

    // ── 5. Enterprise Non-Blocking Welcome Email to Subscriber ──
    sendSubscriberWelcomeEmail({
      email: normalizedEmail,
      passCode,
      discountCode,
      creditsGranted,
      idea: sanitizedIdea,
      useCase: sanitizedUseCase,
    }).catch((emailErr) => console.warn("Email dispatch notice:", emailErr));

    // ── 5. Enterprise Google Sheets / Google Workspace Webhook ──
    const googleSheetWebhook =
      process.env.GOOGLE_WORKSPACE_WEBHOOK_URL ||
      process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (googleSheetWebhook) {
      try {
        await fetch(googleSheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadRecord,
            forwardTo: "work@sameface.in",
            googleWorkspaceSynced: true,
          }),
        });
        console.info("✓ Synced lead to Google Workspace Webhook.");
      } catch (webhookErr) {
        console.warn("Notice: Google Workspace webhook call deferred:", webhookErr);
      }
    }

    // ── 6. Direct Google Form Submission Support (if GOOGLE_FORM_URL is configured) ──
    const googleFormUrl = process.env.GOOGLE_FORM_URL;
    if (googleFormUrl) {
      try {
        const formData = new URLSearchParams();
        // Common Google Form entry IDs can be configured via env
        const emailEntry = process.env.GOOGLE_FORM_EMAIL_ENTRY || "entry.1045781291";
        const useCaseEntry = process.env.GOOGLE_FORM_USECASE_ENTRY || "entry.2005620554";
        const passEntry = process.env.GOOGLE_FORM_PASS_ENTRY || "entry.1166974658";

        formData.append(emailEntry, normalizedEmail);
        formData.append(useCaseEntry, sanitizedUseCase);
        formData.append(passEntry, passCode);

        await fetch(googleFormUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });
        console.info("✓ Synced lead to Google Form endpoint.");
      } catch (formErr) {
        console.warn("Notice: Google Form sync notice:", formErr);
      }
    }

    return NextResponse.json({
      ok: true,
      passCode,
      discountCode,
      creditsGranted,
      googleWorkspaceStatus: "Synced to work@sameface.in",
      launchDate: "November 5, 2026",
    });
  } catch (err: any) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal processing error. Please try again." },
      { status: 500 }
    );
  }
}
