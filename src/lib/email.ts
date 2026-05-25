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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://sparks.bryancassady.com";
  const loginUrl = appUrl + "/login";
  const welcomeUrl = appUrl + "/welcome";
  const firstName = toName.split(" ")[0];

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Make AI Your Muse in 10 Days</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Georgia, 'Times New Roman', serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
<tr>
<td align="center" style="padding:30px 10px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:4px;">

<!-- Header -->
<tr>
<td style="padding:40px 40px 10px 40px;">
<p style="margin:0; font-size:12px; color:#999999; text-transform:uppercase; letter-spacing:2px;">SPARKS - Welcome</p>
</td>
</tr>

<!-- Title -->
<tr>
<td style="padding:10px 40px 30px 40px;">
<h1 style="margin:0; font-size:28px; color:#1a1a1a; line-height:1.3; font-weight:bold;">SPARKS: 10 Days to Work Better with AI</h1>
</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:0 40px;">
<hr style="border:none; border-top:2px solid #cc0000; width:60px; margin:0;">
</td>
</tr>

<!-- Body copy -->
<tr>
<td style="padding:30px 40px 0 40px; font-size:16px; line-height:1.7; color:#333333;">
<p style="margin:0 0 20px 0;">Dear ${firstName},</p>
<p style="margin:0 0 20px 0;">If you signed up feeling behind, you're not.</p>
<p style="margin:0 0 20px 0;">Most people are using AI wrong. They treat it like a search engine or a magic answer box. That approach hits a ceiling fast.</p>
<p style="margin:0 0 20px 0;">Here's the truth. Over 80% of the value from AI comes from human skill. How you frame the problem. How you steer the conversation. How you judge the output. The tools matter less than you think.</p>
<p style="margin:0 0 20px 0;">Give me 10 minutes a day for 10 days, and I'll move you into the top 10% of AI users.</p>
<p style="margin:0 0 20px 0;">Your cohort starts on <strong>${startDate}</strong>.</p>
</td>
</tr>

<!-- What we'll cover -->
<tr>
<td style="padding:10px 40px 0 40px;">
<h2 style="margin:0 0 12px 0; font-size:18px; color:#1a1a1a; font-weight:bold;">What we'll cover</h2>
<p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#333333;">You'll start by understanding your role. You're the expert. AI is the assistant. From there, you'll learn a small set of high-leverage methods for thinking, framing, and collaborating with AI. You'll finish with a capstone project that puts it all together.</p>
<p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#333333;">Each day is short. Each drill shows immediate results. Nothing here requires technical skills.</p>
</td>
</tr>

<!-- Before your first lesson -->
<tr>
<td style="padding:10px 40px 0 40px;">
<h2 style="margin:0 0 12px 0; font-size:18px; color:#1a1a1a; font-weight:bold;">Before your first lesson</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:4px 0; font-size:16px; color:#333333; line-height:1.6;">&#8594;&nbsp; Move this email to your Primary inbox</td></tr>
<tr><td style="padding:4px 0; font-size:16px; color:#333333; line-height:1.6;">&#8594;&nbsp; Mark it as important</td></tr>
<tr><td style="padding:4px 0; font-size:16px; color:#333333; line-height:1.6;">&#8594;&nbsp; Add this address to your contacts</td></tr>
<tr><td style="padding:4px 0; font-size:16px; color:#333333; line-height:1.6;">&#8594;&nbsp; Block 10 minutes a day for 10 days</td></tr>
</table>
</td>
</tr>

<!-- One practical note -->
<tr>
<td style="padding:30px 40px 0 40px;">
<h2 style="margin:0 0 12px 0; font-size:18px; color:#1a1a1a; font-weight:bold;">One practical note</h2>
<p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#333333;">You can use any AI tool for this course. We'll demonstrate with ChatGPT since it's the most widely used. If you don't have a paid plan yet, the $20/month upgrade is worth it, but you don't need it for this course.</p>
<p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#333333;"><strong>Your first lesson starts on ${startDate}.</strong></p>
</td>
</tr>

<!-- How the course works -->
<tr>
<td style="padding:10px 40px 20px 40px;">
<h2 style="margin:0 0 16px 0; font-size:18px; color:#1a1a1a; font-weight:bold;">How the course works</h2>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
<tr>
<td width="32" style="vertical-align:top; padding-top:2px;">
<div style="width:24px; height:24px; background-color:#cc0000; border-radius:50%; text-align:center; line-height:24px; font-size:12px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">1</div>
</td>
<td style="vertical-align:top; padding-left:10px;">
<p style="margin:0; font-size:16px; color:#333333; line-height:1.6;"><strong>Each morning you'll get an email</strong> with a link to that day's lesson. Essential lessons take about 10 minutes. Advanced lessons are optional. Open it, do the drill, mark it done.</p>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
<tr>
<td width="32" style="vertical-align:top; padding-top:2px;">
<div style="width:24px; height:24px; background-color:#cc0000; border-radius:50%; text-align:center; line-height:24px; font-size:12px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">2</div>
</td>
<td style="vertical-align:top; padding-left:10px;">
<p style="margin:0; font-size:16px; color:#333333; line-height:1.6;"><strong>Your progress lives in the course app.</strong> Log in once with your email. No password needed. You'll get a one-time code each time you log in from a new device or browser.</p>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
<tr>
<td width="32" style="vertical-align:top; padding-top:2px;">
<div style="width:24px; height:24px; background-color:#cc0000; border-radius:50%; text-align:center; line-height:24px; font-size:12px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">3</div>
</td>
<td style="vertical-align:top; padding-left:10px;">
<p style="margin:0; font-size:16px; color:#333333; line-height:1.6;"><strong>Start with the onboarding and AI Assessment.</strong> This gives you a baseline before Day 1, so you can see how your AI skills improve through the course.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Links table header -->
<tr>
<td style="padding:0 40px 10px 40px;">
<p style="margin:0; font-size:13px; color:#999999; text-transform:uppercase; letter-spacing:2px; text-align:center; font-family:Arial, sans-serif;">Your course links</p>
</td>
</tr>

<!-- Course app row -->
<tr>
<td style="padding:0 40px 8px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5f9; border-radius:6px;">
<tr>
<td width="66%" style="padding:20px 15px 20px 20px; vertical-align:middle;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Course App</p>
<p style="margin:0 0 8px 0; font-size:16px; color:#1a1a1a; line-height:1.4; font-weight:bold;">Log in to your dashboard</p>
<p style="margin:0 0 4px 0; font-size:13px; color:#666666; line-height:1.5;">Track your progress, access all lessons, and submit your capstone project.</p>
<p style="margin:0; font-size:12px; color:#999999;">Enter your email &rarr; get a one-time code &rarr; you're in</p>
</td>
<td width="34%" style="padding:15px 20px 15px 10px; vertical-align:middle; text-align:center;">
<a href="${loginUrl}" target="_blank" style="text-decoration:none;">
<div style="background-color:#cc0000; border-radius:4px; padding:12px 16px; display:inline-block;">
<p style="margin:0; font-size:13px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">LOG IN &rarr;</p>
</div>
</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Welcome video row -->
<tr>
<td style="padding:0 40px 8px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5f9; border-radius:6px;">
<tr>
<td width="66%" style="padding:20px 15px 20px 20px; vertical-align:middle;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Welcome Video</p>
<p style="margin:0 0 8px 0; font-size:16px; color:#1a1a1a; line-height:1.4; font-weight:bold;">A quick word from Bryan</p>
<p style="margin:0 0 4px 0; font-size:13px; color:#666666; line-height:1.5;">What to expect, how to get the most out of the next 10 days, and why this works.</p>
<p style="margin:0; font-size:12px; color:#999999;">Video: <strong style="color:#333;">3 Minutes</strong></p>
</td>
<td width="34%" style="padding:15px 20px 15px 10px; vertical-align:middle; text-align:center;">
<a href="${welcomeUrl}" target="_blank" style="text-decoration:none;">
<div style="background-color:#1a1a1a; border-radius:4px; padding:12px 16px; display:inline-block;">
<p style="margin:0; font-size:13px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">WATCH &rarr;</p>
</div>
</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- AI assessment row -->
<tr>
<td style="padding:0 40px 20px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5f9; border-radius:6px;">
<tr>
<td width="66%" style="padding:20px 15px 20px 20px; vertical-align:middle;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Pre-Course Assessment</p>
<p style="margin:0 0 8px 0; font-size:16px; color:#1a1a1a; line-height:1.4; font-weight:bold;">Complete your AI Assessment</p>
<p style="margin:0 0 4px 0; font-size:13px; color:#666666; line-height:1.5;">Start with the onboarding exercise when you open the website. It gives you a baseline before the 10-day course begins.</p>
<p style="margin:0; font-size:12px; color:#999999;">Exercise: <strong style="color:#333;">5-10 Minutes</strong></p>
</td>
<td width="34%" style="padding:15px 20px 15px 10px; vertical-align:middle; text-align:center;">
<a href="${welcomeUrl}" target="_blank" style="text-decoration:none;">
<div style="background-color:#1a1a1a; border-radius:4px; padding:12px 16px; display:inline-block;">
<p style="margin:0; font-size:13px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">START &rarr;</p>
</div>
</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Closing -->
<tr>
<td style="padding:0 40px 0 40px; font-size:16px; line-height:1.7; color:#333333;">
<p style="margin:0 0 10px 0;">See you inside.<br>Bryan Cassady</p>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:30px 40px 40px 40px;">
<hr style="border:none; border-top:1px solid #e0e0e0; margin:0 0 20px 0;">
<p style="margin:0; font-size:12px; color:#999999; line-height:1.5;">SPARKS - Make AI Your Muse - 10-Day Course</p>
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
    to: [{ email: toEmail, name: toName }],
    subject: "You're in — your cohort starts " + startDate,
    textContent: [
      "Hi " + firstName + ",",
      "",
      "You are enrolled in Make AI Your Muse.",
      "",
      "Your cohort starts on " + startDate + ".",
      "Each weekday morning you will receive a short lesson — 10 minutes, that is it.",
      "",
      "Log in to your dashboard: " + loginUrl,
      "Read the course overview: " + welcomeUrl,
      "",
      "See you inside.",
      "Bryan Cassady",
    ].join("\n"),
    htmlContent: html,
  });
}