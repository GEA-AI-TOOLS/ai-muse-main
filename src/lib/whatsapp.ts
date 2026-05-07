import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const FROM = process.env.TWILIO_WHATSAPP_FROM!;

export async function sendWhatsAppOtp(
  toPhone: string,
  otp: string,
  name: string
): Promise<void> {
  // Ensure number is in whatsapp: format
  const to = toPhone.startsWith("whatsapp:")
    ? toPhone
    : "whatsapp:" + toPhone;

  await client.messages.create({
    from: FROM,
    to,
    body:
      "Hi " +
      name.split(" ")[0] +
      ", your Make AI Your Muse verification code is: *" +
      otp +
      "*\n\nThis code expires in 10 minutes.",
  });
}