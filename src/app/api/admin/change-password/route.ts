import { NextResponse } from "next/server";
import {
  verifySessionToken,
  verifyAdminPassword,
  updateAdminPassword,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!verifySessionToken(token)) {
      return NextResponse.json({ ok: false, error: "Unauthorized session. Please re-login." }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ ok: false, error: "Both current and new password are required." }, { status: 400 });
    }

    // Verify current password
    if (!verifyAdminPassword(currentPassword)) {
      return NextResponse.json({ ok: false, error: "Current password does not match." }, { status: 400 });
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return NextResponse.json({ ok: false, error: "New password must be at least 6 characters." }, { status: 400 });
    }

    if (currentPassword === newPassword) {
      return NextResponse.json({ ok: false, error: "New password must be different from current password." }, { status: 400 });
    }

    const success = updateAdminPassword(newPassword);
    if (!success) {
      return NextResponse.json({ ok: false, error: "Could not save updated password." }, { status: 500 });
    }

    console.info("🔒 [Admin Security] Admin password was updated successfully.");
    return NextResponse.json({ ok: true, message: "Password updated successfully!" });
  } catch (err: any) {
    console.error("Change password error:", err);
    return NextResponse.json({ ok: false, error: "Failed to update password." }, { status: 500 });
  }
}
