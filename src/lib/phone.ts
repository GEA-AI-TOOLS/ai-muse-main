// src/lib/phone.ts
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const VERIFY_SID = process.env.TWILIO_VERIFY_SERVICE_SID!;

// Twilio Verify generates, stores, and expires the code itself.
export async function sendPhoneOtp(toPhone: string): Promise<void> {
  await client.verify.v2
    .services(VERIFY_SID)
    .verifications.create({ to: toPhone, channel: "sms" });
}

export async function checkPhoneOtp(toPhone: string, code: string): Promise<boolean> {
  try {
    const result = await client.verify.v2
      .services(VERIFY_SID)
      .verificationChecks.create({ to: toPhone, code });
    return result.status === "approved";
  } catch {
    return false;
  }
}