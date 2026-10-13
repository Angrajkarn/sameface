import { NextResponse } from "next/server";
import { verifySessionToken, getSavedWaitlist } from "@/lib/security";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!verifySessionToken(token)) {
      return NextResponse.json({ ok: false, error: "Unauthorized access" }, { status: 401 });
    }

    // Load REAL waitlist records from server ledger — ZERO mock data!
    const realWaitlist = getSavedWaitlist();

    return NextResponse.json({
      ok: true,
      waitlist: realWaitlist,
      totalCount: realWaitlist.length,
      syncedWorkspaceEmail: process.env.GOOGLE_WORKSPACE_EMAIL || "work@sameface.in",
      launchDate: "November 5, 2026",
    });
  } catch (err: any) {
    console.error("Admin data route error:", err);
    return NextResponse.json({ ok: false, error: "Server error fetching data" }, { status: 500 });
  }
}
