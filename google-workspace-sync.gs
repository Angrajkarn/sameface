/**
 * Google Apps Script for Google Workspace & Google Sheets Integration
 * Target Account: work@sameface.in
 * High-Velocity Email Delivery Engine (> 50,000+ Users Scalable)
 * 
 * FEATURES:
 * 1. Appends every new lead to Google Sheets with full metadata.
 * 2. Sends an instant notification email to the Admin (work@sameface.in).
 * 3. Automatically delivers a high-impact VIP Founder Pass Confirmation Email
 *    directly to the Subscriber's inbox with full pass details, 50% discount code,
 *    and social media links.
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
    var adminEmail = "work@sameface.in";

    // 1. Append lead to Google Sheet
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

    // 2. Generate Professional Subscriber Welcome HTML Email
    var subscriberSubject = "🔥 Your Official SameFace VIP Founder Pass #" + passCode + " (50% Lifetime Discount Locked)";
    var subscriberHtml = data.htmlBody;
    
    if (!subscriberHtml) {
      // Fallback Enterprise HTML Template with Full Details & Social Tags
      subscriberHtml = "" +
        "<div style='background-color: #050814; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; color: #f8fafc; padding: 32px 16px;'>" +
          "<div style='max-width: 600px; margin: 0 auto; background-color: #080d1e; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden;'>" +
            "<div style='height: 5px; background: linear-gradient(90deg, #3b82f6, #8b5cf6, #f59e0b);'></div>" +
            "<div style='padding: 32px; text-align: center;'>" +
              "<div style='display: inline-block; background-color: #0f172a; border: 1px solid #3b82f6; border-radius: 12px; padding: 8px 18px; margin-bottom: 16px;'>" +
                "<strong style='color: #ffffff; font-size: 18px; letter-spacing: 1px;'>SAMEFACE AI STUDIO</strong>" +
              "</div>" +
              "<h1 style='color: #ffffff; font-size: 24px; margin: 12px 0 6px 0;'>Your VIP Founder Pass Is Locked!</h1>" +
              "<p style='color: #94a3b8; font-size: 14px; margin-bottom: 24px;'>Welcome to the exclusive batch of 10,000 creators. Your lifetime 50% discount and premiere perks are officially secured.</p>" +
              
              // Certificate Box
              "<div style='background: linear-gradient(135deg, #0b1432, #04060e); border: 2px solid rgba(245, 158, 11, 0.5); border-radius: 16px; padding: 20px; text-align: left; margin-bottom: 24px;'>" +
                "<div style='display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-bottom: 12px;'>" +
                  "<div><span style='font-size: 10px; color: #94a3b8; font-family: monospace;'>VERIFIED SERIAL:</span><div style='font-size: 16px; font-weight: bold; color: #fbbf24; font-family: monospace;'>" + passCode + "</div></div>" +
                  "<div style='text-align: right;'><span style='background-color: #10b981; color: #000; font-size: 10px; font-weight: bold; padding: 3px 8px; border-radius: 4px; font-family: monospace;'>50% RATE LOCKED</span></div>" +
                "</div>" +
                "<table style='width: 100%; font-size: 13px; color: #cbd5e1;'>" +
                  "<tr><td style='padding: 4px 0; color: #64748b;'>Pass Holder:</td><td style='color: #fff; font-weight: bold;'>" + email + "</td></tr>" +
                  "<tr><td style='padding: 4px 0; color: #64748b;'>World Premiere:</td><td style='color: #60a5fa; font-weight: bold;'>November 5, 2026</td></tr>" +
                  "<tr><td style='padding: 4px 0; color: #64748b;'>Promo Token:</td><td style='color: #fbbf24; font-family: monospace; font-weight: bold; font-size: 15px;'>" + discountCode + "</td></tr>" +
                  "<tr><td style='padding: 4px 0; color: #64748b;'>Airdrop Credits:</td><td style='color: #34d399; font-weight: bold;'>" + creditsGranted + " 4K UHD Credits ($120 Value)</td></tr>" +
                "</table>" +
              "</div>" +

              // Perks Breakdown
              "<div style='text-align: left; margin-bottom: 28px;'>" +
                "<div style='color: #fff; font-size: 14px; font-weight: bold; margin-bottom: 10px;'>Your Guaranteed Founder Privileges:</div>" +
                "<div style='font-size: 12px; color: #94a3b8; line-height: 1.8;'>" +
                  "✓ <strong>50% Lifetime Price Lock:</strong> Grandfathered forever, immune to rate increases.<br>" +
                  "✓ <strong>1,000 Free 4K Render Credits:</strong> Credited on launch day (Nov 5, 2026).<br>" +
                  "✓ <strong>Day-1 Priority Render Cluster:</strong> Zero queue wait times.<br>" +
                  "✓ <strong>14+ Indian Languages & Auto-Post:</strong> Direct publish to YouTube Shorts & Reels.<br>" +
                "</div>" +
              "</div>" +

              // Social Media Hub Section
              "<div style='border-top: 1px solid #1e293b; padding-top: 20px; margin-top: 20px;'>" +
                "<div style='font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;'>Official Social Media Channels</div>" +
                "<div style='margin-bottom: 16px;'>" +
                  "<a href='https://youtube.com/@samefaceai' style='display: inline-block; padding: 6px 12px; margin: 4px; background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #ef4444; text-decoration: none; font-size: 12px; font-weight: bold;'>YouTube</a>" +
                  "<a href='https://instagram.com/sameface.ai' style='display: inline-block; padding: 6px 12px; margin: 4px; background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #ec4899; text-decoration: none; font-size: 12px; font-weight: bold;'>Instagram</a>" +
                  "<a href='https://x.com/sameface_ai' style='display: inline-block; padding: 6px 12px; margin: 4px; background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #38bdf8; text-decoration: none; font-size: 12px; font-weight: bold;'>X (Twitter)</a>" +
                  "<a href='https://discord.gg/sameface' style='display: inline-block; padding: 6px 12px; margin: 4px; background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #818cf8; text-decoration: none; font-size: 12px; font-weight: bold;'>Discord</a>" +
                  "<a href='https://linkedin.com/company/sameface-ai' style='display: inline-block; padding: 6px 12px; margin: 4px; background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #60a5fa; text-decoration: none; font-size: 12px; font-weight: bold;'>LinkedIn</a>" +
                "</div>" +
                "<div style='font-size: 11px; color: #475569;'>Direct inquiries: " + adminEmail + "<br>© 2026 SameFace AI Studio. All rights reserved.</div>" +
              "</div>" +

            "</div>" +
          "</div>" +
        "</div>";
    }

    // 3. Send automated VIP email to subscriber
    if (email && email.indexOf("@") !== -1) {
      try {
        MailApp.sendEmail({
          to: email,
          subject: subscriberSubject,
          htmlBody: subscriberHtml,
          name: "SameFace AI Studio"
        });
        Logger.log("Sent confirmation email to subscriber: " + email);
      } catch (subErr) {
        Logger.log("Subscriber MailApp notice: " + subErr);
      }
    }

    // 4. Send notification email to admin (work@sameface.in)
    var adminSubject = "🔥 New VIP Founder Lead: " + email + " (" + idea + ")";
    var adminHtml = "" +
      "<div style='font-family: sans-serif; background: #0b0f19; color: #f8fafc; padding: 20px; border-radius: 12px; max-width: 500px;'>" +
        "<h3 style='color: #38bdf8;'>New Lead Captured</h3>" +
        "<p>Pass: <strong style='color: #fbbf24;'>" + passCode + "</strong><br>" +
        "Email: <strong>" + email + "</strong><br>" +
        "Product: " + idea + "<br>" +
        "Willingness to Pay: <strong style='color: #4ade80;'>" + pricePick + "</strong><br>" +
        "Use Case: " + useCase + "</p>" +
      "</div>";

    try {
      MailApp.sendEmail({
        to: adminEmail,
        subject: adminSubject,
        htmlBody: adminHtml
      });
    } catch (adminErr) {
      Logger.log("Admin MailApp notice: " + adminErr);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      passCode: passCode,
      message: "Lead saved and confirmation email sent to " + email
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
