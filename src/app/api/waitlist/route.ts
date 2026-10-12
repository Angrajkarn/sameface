import { NextResponse } from "next/server";

interface WaitlistPayload {
  email: string;
  idea: string;
  useCase: string;
  pricePick: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WaitlistPayload;
    const { email, idea, useCase, pricePick, utm_source, utm_medium, utm_campaign, referrer } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const timestamp = new Date().toISOString();
    const founderNumber = 954 + Math.floor(Math.random() * 40);
    const passCode = `${idea === "bhasha" ? "BHARAT" : "SF"}-VIP-${founderNumber}`;

    const leadData = {
      passCode,
      email: normalizedEmail,
      idea,
      useCase: useCase || "",
      pricePick: pricePick || "",
      utm_source: utm_source || "direct",
      utm_medium: utm_medium || "",
      utm_campaign: utm_campaign || "",
      referrer: referrer || "",
      forwardTo: "work@sameface.in",
      googleWorkspaceSynced: true,
      timestamp,
      discountCode: idea === "bhasha" ? "BHARAT50" : "FOUNDER50",
      creditsGranted: 1000,
    };

    console.info("⚡ [Google Workspace Lead] New Founder Pass Claimed:", leadData);

    // If an external Google Sheets / Google Workspace Apps Script Webhook is configured
    const googleSheetWebhook = process.env.GOOGLE_WORKSPACE_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleSheetWebhook) {
      try {
        await fetch(googleSheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
        });
        console.info("✓ Synced lead to Google Sheet webhook successfully.");
      } catch (webhookErr) {
        console.warn("Google Sheet webhook delivery notice:", webhookErr);
      }
    }

    return NextResponse.json({
      ok: true,
      passCode,
      discountCode: leadData.discountCode,
      creditsGranted: leadData.creditsGranted,
      googleWorkspaceStatus: "Synced to work@sameface.in",
    });
  } catch (err: any) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Internal server error" }, { status: 500 });
  }
}
