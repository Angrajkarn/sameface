import { NextResponse } from "next/server";
import {
  verifyAdminPassword,
  generateSessionToken,
  checkRateLimit,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // Rate-limit login attempts (Max 5 attempts per 2 minutes)
    const rate = checkRateLimit(`login_${ip}`, 5, 120000);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many login attempts. Locked for 2 minutes for security." },
        { status: 429 }
      );
    }

    const { password } = await req.json();
    if (!password || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Password is required" }, { status: 400 });
    }

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ ok: false, error: "Incorrect admin password" }, { status: 401 });
    }

    // Generate secure HMAC-signed session token
    const token = generateSessionToken();

    return NextResponse.json({
      ok: true,
      token,
      message: "Admin authenticated successfully",
    });
  } catch (err: any) {
    console.error("Admin auth error:", err);
    return NextResponse.json({ ok: false, error: "Server authentication error" }, { status: 500 });
  }
}
