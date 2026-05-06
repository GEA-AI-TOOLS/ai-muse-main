import { BrevoClient } from "@getbrevo/brevo";

const FROM_EMAIL = process.env.SMTP_FROM!;
const FROM_NAME = process.env.SMTP_FROM_NAME ?? "Make AI Your Muse";

function brevo() {
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });
}

function formatCohortDate(cohortId: string): string {
  const parts = cohortId.replace("cohort_", "").split("_");
  if (parts.length !== 3) return cohortId;
  const date = new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2])
  );
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function sendWelcomeEmail(
  toEmail: string,
  toName: string,
  cohortId: string
): Promise<void> {
  const startDate = formatCohortDate(cohortId);
  const loginUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "") + "/login";
  const firstName = toName.split(" ")[0];

  await brevo().transactionalEmails.sendTransacEmail({
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: toEmail, name: toName }],
    subject: "You're in — Make AI Your Muse starts " + startDate,
    textContent: [
      "Hi " + firstName + ",",
      "",
      "You're enrolled in Make AI Your Muse.",
      "",
      "Your cohort starts on " + startDate + ".",
      "Each weekday morning you'll receive a short lesson — 10 minutes, that's it.",
      "",
      "To access your lessons, log in here:",
      loginUrl,
      "",
      "See you Monday.",
      "",
      "Bryan",
    ].join("\n"),
    htmlContent: [
      "<div style='font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;'>",
      "<p style='margin:0 0 8px;font-size:14px;color:#666;'>Make AI Your Muse</p>",
      "<h1 style='margin:0 0 16px;font-size:22px;font-weight:600;color:#111;'>You're in, " + firstName + ".</h1>",
      "<p style='margin:0 0 12px;font-size:15px;color:#333;'>Your cohort starts on <strong>" + startDate + "</strong>.</p>",
      "<p style='margin:0 0 24px;font-size:15px;color:#333;'>Each weekday morning you'll receive a short lesson. 10 minutes. That's it.</p>",
      "<a href='" + loginUrl + "' style='display:inline-block;background:#E24B4A;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;'>Access your course</a>",
      "<p style='margin:32px 0 0;font-size:15px;color:#333;'>See you Monday.</p>",
      "<p style='margin:8px 0 0;font-size:15px;color:#333;'>Bryan</p>",
      "</div>",
    ].join(""),
  });
}