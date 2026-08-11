import { BrevoClient } from "@getbrevo/brevo";
import { supabase } from "@/lib/supabase";
import { buildCourseIcs } from "@/lib/ics";

const FROM_EMAIL = process.env.SMTP_FROM!;
const FROM_NAME = process.env.SMTP_FROM_NAME ?? "Make AI Your Muse";

function brevo() {
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });
}

// Video version templates are offset by +100 in email_templates
async function fetchTemplate(
  day: number
): Promise<{ subject: string; html: string } | null> {
  const { data, error } = await supabase
    .from("email_templates")
    .select("subject, html_content")
    .eq("day", day)
    .single();

  if (error || !data) {
    console.error("fetchTemplate: template not found for day", day, error);
    return null;
  }
  return { subject: data.subject, html: data.html_content };
}

function fillPlaceholders(
  html: string,
  vars: Record<string, string>
): string {
  let out = html;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), value);
  }
  return out;
}

function formatCohortDate(cohortId: string): string {
  // Handles both cohort_2026_08_10 (legacy) and cohort_video_2026_08_10 (current)
  const parts = cohortId
    .replace("cohort_", "")
    .replace("video_", "")
    .replace("live_", "")
    .split("_");
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

export async function sendCompletionEmail(
  toEmail: string,
  toName: string,
  cohortId: string
): Promise<void> {
  const firstName = toName.split(" ")[0];

  const tpl = await fetchTemplate(119); // Course Completion (video)
  if (!tpl) throw new Error("Completion email template (day 119) not found.");

  const html = fillPlaceholders(tpl.html, { name: firstName });

  await brevo().transactionalEmails.sendTransacEmail({
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: toEmail, name: toName }],
    subject: tpl.subject,
    htmlContent: html,
  });
}


export async function sendWelcomeEmail(
  toEmail: string,
  toName: string,
  cohortId: string,
  timezone: string,
  participantId: string,
  accessOpensAt?: string | null
): Promise<void> {
  const startDate = formatCohortDate(cohortId);
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "https://sparks-v.bryancassady.com").replace(/\/$/, "");
  const loginUrl = base + "/login";
  const firstName = toName.split(" ")[0];

  // Pre-launch buyers get the delayed-access welcome (day 121).
  const isPrelaunch = !!accessOpensAt && new Date(accessOpensAt).getTime() > Date.now();
  const templateDay = isPrelaunch ? 121 : 120;

  const tpl = await fetchTemplate(templateDay);
  if (!tpl) throw new Error("Welcome email template (day " + String(templateDay) + ") not found.");

  const vars = {
    name: firstName,
    loginUrl: loginUrl,
    startDate: startDate,
  };

  const html = fillPlaceholders(tpl.html, vars);
  const subject = fillPlaceholders(tpl.subject, vars);

  const ics = buildCourseIcs(cohortId, timezone, loginUrl, participantId);
  const icsBase64 = Buffer.from(ics, "utf-8").toString("base64");

  await brevo().transactionalEmails.sendTransacEmail({
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: toEmail, name: toName }],
    attachment: [
      {
        name: "sparks-course.ics",
        content: icsBase64,
      },
    ],
    subject: subject,
    htmlContent: html,
  });
}
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "contact@bryancassady.com";

export async function sendContactEmail(
  name: string,
  email: string,
  message: string
): Promise<void> {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>New contact form message</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Georgia, 'Times New Roman', serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
<tr>
<td align="center" style="padding:30px 10px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:4px;">
<tr>
<td style="padding:30px 40px;">
<p style="margin:0 0 16px 0; font-size:18px; color:#171514;">New message from the landing page contact form</p>
<p style="margin:0 0 8px 0; font-size:14px; color:#171514;"><strong>Name:</strong> ${name}</p>
<p style="margin:0 0 16px 0; font-size:14px; color:#171514;"><strong>Email:</strong> ${email}</p>
<p style="margin:0; font-size:14px; color:#171514; white-space:pre-wrap; line-height:1.6;">${message}</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;

  await brevo().transactionalEmails.sendTransacEmail({
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: CONTACT_TO_EMAIL }],
    replyTo: { email, name },
    subject: "New contact form message from " + name,
    textContent: ["Name: " + name, "Email: " + email, "", message].join("\n"),
    htmlContent: html,
  });
}