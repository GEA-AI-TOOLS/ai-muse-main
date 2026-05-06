import crypto from "crypto";
import { BrevoClient } from "@getbrevo/brevo";

// ---------- Generate ----------

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ---------- Hash ----------

export function hashOtp(otp: string): string {
  return crypto
    .createHmac("sha256", process.env.COOKIE_SECRET!)
    .update(otp)
    .digest("hex");
}

export function verifyOtpHash(otp: string, hash: string): boolean {
  const expected = hashOtp(otp);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(hash, "hex")
    );
  } catch {
    return false;
  }
}

// ---------- Send ----------

export async function sendOtpEmail(
  toEmail: string,
  toName: string,
  otp: string
): Promise<void> {
  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY!,
    timeoutInSeconds: 10,
  });

  await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: process.env.SMTP_FROM_NAME ?? "Make AI Your Muse",
      email: process.env.SMTP_FROM!,
    },
    to: [{ email: toEmail, name: toName }],
    subject: "Your login code for Make AI Your Muse",
    textContent: [
      "Hi " + toName + ",",
      "",
      "Your login code is: " + otp,
      "",
      "This code expires in 10 minutes.",
      "",
      "If you did not request this, you can ignore this email.",
    ].join("\n"),
    htmlContent: [
      "<div style='font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;'>",
      "<p style='margin:0 0 8px;font-size:14px;color:#666;'>Make AI Your Muse</p>",
      "<h1 style='margin:0 0 24px;font-size:22px;font-weight:600;color:#111;'>Your login code</h1>",
      "<p style='margin:0 0 16px;font-size:15px;color:#333;'>Hi " + toName + ",</p>",
      "<p style='margin:0 0 24px;font-size:15px;color:#333;'>Use the code below to log in. It expires in 10 minutes.</p>",
      "<div style='background:#f4f4f5;border-radius:8px;padding:24px;text-align:center;margin-bottom:24px;'>",
      "<span style='font-size:36px;font-weight:700;letter-spacing:10px;color:#111;'>" + otp + "</span>",
      "</div>",
      "<p style='margin:0;font-size:13px;color:#999;'>If you did not request this, you can safely ignore this email.</p>",
      "</div>",
    ].join(""),
  });
}