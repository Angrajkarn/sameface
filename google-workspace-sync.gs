/**
 * Google Apps Script for Google Workspace & Google Sheets Integration
 * Target Account: work@sameface.in
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (logged into work@sameface.in or your Google Workspace account).
 * 2. Create a sheet with column headers in Row 1:
 *    [Timestamp, PassCode, Email, Idea, PricePick, UseCase, Source, DiscountCode, CreditsGranted, Status]
 * 3. In the top menu, go to: Extensions -> Apps Script.
 * 4. Replace any existing code with this script.
 * 5. Click "Deploy" -> "New deployment".
 * 6. Select Type: "Web app".
 * 7. Set:
 *    - Execute as: "Me (work@sameface.in)"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy" and copy the Web App URL.
 * 9. Paste that URL into your .env.local file as:
 *    GOOGLE_WORKSPACE_WEBHOOK_URL="https://script.google.com/macros/s/..."
 * 10. That's it! Every new signup instantly appends to your Google Sheet and sends an email notification to work@sameface.in!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Ensure header row exists if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Pass Code",
        "Email",
        "Idea / Product",
        "Price Pick",
        "Use Case / Prompt",
        "Source (UTM)",
        "Discount Code",
        "Credits Granted",
        "Workspace Status"
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
    }

    var timestamp = data.timestamp || new Date().toISOString();
    var passCode = data.passCode || "N/A";
    var email = data.email || "";
    var idea = data.idea === "bhasha" ? "BhashaToons (Indic Regional)" : "SameFace (Consistent AI Cartoon Studio)";
    var pricePick = data.pricePick || "Not Selected";
    var useCase = data.useCase || "";
    var utmSource = data.utm_source || "direct";
    var discountCode = data.discountCode || "FOUNDER50";
    var creditsGranted = data.creditsGranted || 1000;
    var status = "Verified Lead (work@sameface.in)";

    // Append lead to Google Sheet
    sheet.appendRow([
      timestamp,
      passCode,
      email,
      idea,
      pricePick,
      useCase,
      utmSource,
      discountCode,
      creditsGranted,
      status
    ]);

    // Send instant notification email to work@sameface.in
    var adminEmail = "work@sameface.in";
    var subject = "🔥 New VIP Founder Lead: " + email + " (" + (data.idea === "bhasha" ? "BhashaToons" : "SameFace") + ")";
    var htmlBody = "" +
      "<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #1e293b; max-width: 600px;'>" +
        "<h2 style='color: #38bdf8; margin-top: 0;'>🚀 New VIP Early Access Lead Claimed</h2>" +
        "<p style='color: #94a3b8; font-size: 14px;'>A new creator has reserved a Founder Pass on your waitlist:</p>" +
        "<table style='width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;'>" +
          "<tr><td style='padding: 8px 0; color: #94a3b8;'><strong>Founder Pass:</strong></td><td style='color: #38bdf8; font-family: monospace; font-weight: bold;'>" + passCode + "</td></tr>" +
          "<tr><td style='padding: 8px 0; color: #94a3b8;'><strong>Email:</strong></td><td style='color: #ffffff; font-weight: bold;'>" + email + "</td></tr>" +
          "<tr><td style='padding: 8px 0; color: #94a3b8;'><strong>Product:</strong></td><td style='color: #ffffff;'>" + idea + "</td></tr>" +
          "<tr><td style='padding: 8px 0; color: #94a3b8;'><strong>Willingness to Pay:</strong></td><td style='color: #4ade80; font-weight: bold;'>" + pricePick + "</td></tr>" +
          "<tr><td style='padding: 8px 0; color: #94a3b8;'><strong>Use Case / Prompt:</strong></td><td style='color: #e2e8f0;'>" + useCase + "</td></tr>" +
          "<tr><td style='padding: 8px 0; color: #94a3b8;'><strong>Traffic Source:</strong></td><td style='color: #e2e8f0;'>" + utmSource + "</td></tr>" +
          "<tr><td style='padding: 8px 0; color: #94a3b8;'><strong>Discount Code:</strong></td><td style='color: #facc15; font-weight: bold;'>" + discountCode + " (50% Lifetime Off)</td></tr>" +
        "</table>" +
        "<div style='margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;'>" +
          "Synced automatically to Google Workspace (" + adminEmail + ") via Waitlist Validator." +
        "</div>" +
      "</div>";

    try {
      MailApp.sendEmail({
        to: adminEmail,
        subject: subject,
        htmlBody: htmlBody
      });
    } catch (mailErr) {
      Logger.log("MailApp error: " + mailErr);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      passCode: passCode,
      message: "Lead appended to Google Sheet and emailed to " + adminEmail
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
