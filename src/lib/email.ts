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

// TODO: replace with final completion email content (with day-email batch)
export async function sendCompletionEmail(
  toEmail: string,
  toName: string,
  cohortId: string
): Promise<void> {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "https://sparks.bryancassady.com").replace(/\/$/, "");
  const firstName = toName.split(" ")[0];

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>You completed Make AI Your Muse</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Georgia, 'Times New Roman', serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
<tr>
<td align="center" style="padding:30px 10px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:4px;">

<!-- Header -->
<tr>
<td style="padding:40px 40px 10px 40px;">
<p style="margin:0; font-size:12px; color:#999999; text-transform:uppercase; letter-spacing:2px;">SPARKS &mdash; Course Complete</p>
</td>
</tr>

<!-- Title -->
<tr>
<td style="padding:10px 40px 30px 40px;">
<h1 style="margin:0; font-size:28px; color:#1a1a1a; line-height:1.3; font-weight:bold;">You did it, ${firstName}.</h1>
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

<p style="margin:0 0 20px 0;">You just marked all 10 days complete.</p>

<p style="margin:0 0 20px 0;">Studies consistently show that fewer than 15% of people who start an online course finish it. You are in that 15%. That is not a small thing.</p>

<p style="margin:0 0 20px 0;">Ten days of showing up. Ten lessons. A framework you now own. The SPARKS method does not disappear when the course ends. It is a way of working with AI that you carry into every project, every conversation, every problem that lands on your desk.</p>

<p style="margin:0 0 30px 0;">Two things are waiting for you now.</p>
</td>
</tr>

<!-- Certificate block -->
<tr>
<td style="padding:10px 40px 8px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5f9; border-radius:6px;">
<tr>
<td style="padding:24px 24px 24px 24px;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Certificate of Completion</p>
<p style="margin:0 0 10px 0; font-size:18px; color:#1a1a1a; line-height:1.3; font-weight:bold;">Your certificate is ready to download.</p>
<p style="margin:0 0 16px 0; font-size:14px; line-height:1.7; color:#555555;">Downloadable as a PDF and verifiable with a unique code. Share it on LinkedIn to show your network what you have built.</p>
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#1a1a1a; border-radius:4px;">
<a href="${base}/progress" target="_blank" style="display:inline-block; padding:11px 22px; font-family:Arial, sans-serif; font-size:13px; font-weight:bold; color:#ffffff; text-decoration:none; letter-spacing:0.5px;">GET YOUR CERTIFICATE &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>

<!-- Capstone block -->
<tr>
<td style="padding:0 40px 10px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fcebeb; border-radius:6px; border-left:4px solid #cc0000;">
<tr>
<td style="padding:24px 24px 24px 24px;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Capstone Project &mdash; Now Unlocked</p>
<p style="margin:0 0 10px 0; font-size:18px; color:#1a1a1a; line-height:1.3; font-weight:bold;">Go further. Earn the Certificate of Mastery.</p>
<p style="margin:0 0 16px 0; font-size:14px; line-height:1.7; color:#333333;">Build your own Custom AI Tool using everything you have learned. Submit it for review and earn a second certificate: the Certificate of Mastery. Verifiable and shareable on LinkedIn.</p>
<p style="margin:0 0 20px 0; font-size:14px; line-height:1.7; color:#333333;">This is where the course becomes something real. A tool you built. A skill you proved.</p>
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#cc0000; border-radius:4px;">
<a href="${base}/capstone" target="_blank" style="display:inline-block; padding:11px 22px; font-family:Arial, sans-serif; font-size:13px; font-weight:bold; color:#ffffff; text-decoration:none; letter-spacing:0.5px;">START THE CAPSTONE &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>

<!-- Closing copy -->
<tr>
<td style="padding:20px 40px 0 40px; font-size:16px; line-height:1.7; color:#333333;">
<p style="margin:0 0 20px 0;">Thank you for trusting this course with your time. We are genuinely grateful you came this far.</p>

<p style="margin:0 0 10px 0;">Best,<br>Bryan Cassady</p>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:30px 40px 40px 40px;">
<hr style="border:none; border-top:1px solid #e0e0e0; margin:0 0 20px 0;">
<p style="margin:0; font-size:12px; color:#999999; line-height:1.5;">SPARKS &mdash; Make AI Your Muse &mdash; 10-Day Course</p>
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
    subject: "You did it, " + firstName + " — you completed SPARKS",
    textContent: [
      "You did it, " + firstName + ".",
      "",
      "You just marked all 10 days complete. Fewer than 15% of people who start an online course finish it. You're in that 15%.",
      "",
      "Your certificate of completion is ready: " + base + "/progress",
      "",
      "The capstone is now unlocked — build your own custom AI tool and earn the certificate of mastery: " + base + "/capstone",
      "",
      "Thank you for trusting this course with your time.",
      "",
      "Bryan Cassady",
    ].join("\n"),
    htmlContent: html,
  });
}

import { buildCourseIcs } from "@/lib/ics";

export async function sendWelcomeEmail(
  toEmail: string,
  toName: string,
  cohortId: string,
  timezone: string,
  participantId: string
): Promise<void> {
  const startDate = formatCohortDate(cohortId);
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "https://sparks.bryancassady.com").replace(/\/$/, "");
  const loginUrl = base + "/login";
  const welcomeUrl = base + "/welcome";
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
<p style="margin:0; font-size:12px; color:#999999; text-transform:uppercase; letter-spacing:2px;">SPARKS &mdash; Beta cohort &middot; Welcome</p>
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
<p style="margin:0 0 20px 0;">Dear {{name}},</p>
<p style="margin:0 0 20px 0;">If you signed up feeling behind, you're not.</p>
<p style="margin:0 0 20px 0;">Most people are using AI wrong. They treat it like a search engine or a magic answer box. That approach hits a ceiling fast.</p>
<p style="margin:0 0 20px 0;">Here's the truth. Over 80% of the value from AI comes from human skill. How you frame the problem. How you steer the conversation. How you judge the output. The tools matter less than you think.</p>
<p style="margin:0 0 30px 0;">In the next 10 days, I'll move you into the top 10% of AI users.</p>
</td>
</tr>

<!-- BETA COHORT FRAMING BLOCK -->
<tr>
<td style="padding:0 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fcebeb; border-radius:6px; border-left:4px solid #cc0000;">
<tr>
<td style="padding:22px 24px;">
<p style="margin:0 0 8px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">You are in the beta cohort</p>
<p style="margin:0 0 12px 0; font-size:17px; color:#1a1a1a; line-height:1.3; font-weight:bold;">A small, free, live version of the course &mdash; and your feedback shapes the final one.</p>
<p style="margin:0 0 12px 0; font-size:15px; line-height:1.7; color:#333333;">The recorded videos for this course are not made yet. Before we record them, we are running this cohort <strong>live</strong> &mdash; with me personally teaching each Essentials lesson on Zoom &mdash; so the final version is shaped by people who actually used it.</p>
<p style="margin:0; font-size:15px; line-height:1.7; color:#333333;">You get me live for the next ten weekdays. In return, we ask you to share what works, what does not, and what you would change. That is the trade.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- What we'll cover -->
<tr>
<td style="padding:30px 40px 0 40px;">
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
<tr><td style="padding:4px 0; font-size:16px; color:#333333; line-height:1.6;">&#8594;&nbsp; Block 17:00&ndash;17:30 CET each weekday for the live session</td></tr>
<tr><td style="padding:4px 0; font-size:16px; color:#333333; line-height:1.6;">&#8594;&nbsp; Join the WhatsApp group below to stay in the loop</td></tr>
</table>
</td>
</tr>

<!-- One practical note -->
<tr>
<td style="padding:30px 40px 0 40px;">
<h2 style="margin:0 0 12px 0; font-size:18px; color:#1a1a1a; font-weight:bold;">One practical note</h2>
<p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#333333;">You can use any AI tool for this course. We'll demonstrate with ChatGPT since it's the most widely used. If you don't have a paid plan yet, the $20/month upgrade is worth it, but you don't need it for this course.</p>
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
<p style="margin:0; font-size:16px; color:#333333; line-height:1.6;"><strong>Each weekday at 17:00 CET, join the live session on Zoom.</strong> Same link every day. I'll teach that day's Essentials lesson live, answer your questions, and we'll do the exercise together.</p>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
<tr>
<td width="32" style="vertical-align:top; padding-top:2px;">
<div style="width:24px; height:24px; background-color:#cc0000; border-radius:50%; text-align:center; line-height:24px; font-size:12px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">2</div>
</td>
<td style="vertical-align:top; padding-left:10px;">
<p style="margin:0; font-size:16px; color:#333333; line-height:1.6;"><strong>Each morning you'll get an email</strong> with that day's lesson page. Slides, summary, exercise, and prompts live there &mdash; available before and after the live session. Advanced material is optional self-study.</p>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
<tr>
<td width="32" style="vertical-align:top; padding-top:2px;">
<div style="width:24px; height:24px; background-color:#cc0000; border-radius:50%; text-align:center; line-height:24px; font-size:12px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">3</div>
</td>
<td style="vertical-align:top; padding-left:10px;">
<p style="margin:0; font-size:16px; color:#333333; line-height:1.6;"><strong>Your progress lives in the course app.</strong> Log in once with your email. No password needed. You'll get a one-time code each time you log in from a new device or browser.</p>
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

<!-- LIVE SESSIONS ROW -->
<tr>
<td style="padding:0 40px 8px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fcebeb; border-radius:6px; border-left:4px solid #cc0000;">
<tr>
<td width="66%" style="padding:20px 15px 20px 20px; vertical-align:middle;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Live Sessions &middot; Zoom</p>
<p style="margin:0 0 8px 0; font-size:16px; color:#1a1a1a; line-height:1.4; font-weight:bold;">Join Bryan live, every weekday</p>
<p style="margin:0 0 4px 0; font-size:13px; color:#666666; line-height:1.5;">Starts <strong style="color:#333;">Monday June 1 at 17:00 CET</strong>, then every weekday at 17:00 CET. Same Zoom link the whole course.</p>
<p style="margin:0; font-size:12px; color:#999999;">Duration: <strong style="color:#333;">~30 minutes</strong></p>
</td>
<td width="34%" style="padding:15px 20px 15px 10px; vertical-align:middle; text-align:center;">
<a href="https://us02web.zoom.us/j/84131432028?pwd=DQohZLULljV8i2GALZTYubboiqaFN2.1" target="_blank" style="text-decoration:none;">
<div style="background-color:#cc0000; border-radius:4px; padding:12px 16px; display:inline-block;">
<p style="margin:0; font-size:13px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">JOIN ZOOM &rarr;</p>
</div>
</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- WHATSAPP GROUP ROW -->
<tr>
<td style="padding:0 40px 8px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5f9; border-radius:6px;">
<tr>
<td width="66%" style="padding:20px 15px 20px 20px; vertical-align:middle;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Beta Cohort WhatsApp</p>
<p style="margin:0 0 8px 0; font-size:16px; color:#1a1a1a; line-height:1.4; font-weight:bold;">Stay in the loop with your cohort</p>
<p style="margin:0 0 4px 0; font-size:13px; color:#666666; line-height:1.5;">Reminders before each session, questions between lessons, and feedback that shapes the final course.</p>
<p style="margin:0; font-size:12px; color:#999999;">Required for the beta cohort</p>
</td>
<td width="34%" style="padding:15px 20px 15px 10px; vertical-align:middle; text-align:center;">
<a href="https://chat.whatsapp.com/C9Kum0mGWI1AturWLRXt42" target="_blank" style="text-decoration:none;">
<div style="background-color:#25D366; border-radius:4px; padding:12px 16px; display:inline-block;">
<p style="margin:0; font-size:13px; color:#ffffff; font-family:Arial, sans-serif; font-weight:bold;">JOIN GROUP &rarr;</p>
</div>
</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course app row -->
<tr>
<td style="padding:0 40px 20px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5f9; border-radius:6px;">
<tr>
<td width="66%" style="padding:20px 15px 20px 20px; vertical-align:middle;">
<p style="margin:0 0 6px 0; font-size:11px; color:#cc0000; text-transform:uppercase; letter-spacing:2px; font-family:Arial, sans-serif; font-weight:bold;">Course App</p>
<p style="margin:0 0 8px 0; font-size:16px; color:#1a1a1a; line-height:1.4; font-weight:bold;">Log in to your dashboard</p>
<p style="margin:0 0 4px 0; font-size:13px; color:#666666; line-height:1.5;">Track your progress, access all lesson pages (slides, summary, exercises, prompts), and submit your capstone project.</p>
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

<!-- Closing -->
<tr>
<td style="padding:0 40px 0 40px; font-size:16px; line-height:1.7; color:#333333;">
<p style="margin:0 0 20px 0;">See you Monday at 17:00 CET.</p>
<p style="margin:0 0 10px 0;">Bryan Cassady</p>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:30px 40px 40px 40px;">
<hr style="border:none; border-top:1px solid #e0e0e0; margin:0 0 20px 0;">
<p style="margin:0; font-size:12px; color:#999999; line-height:1.5;">SPARKS &mdash; Make AI Your Muse &mdash; 10-Day Beta Cohort</p>
</td>
</tr>

</table>
</td>
</tr>
</table>

</body>
</html>`;

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