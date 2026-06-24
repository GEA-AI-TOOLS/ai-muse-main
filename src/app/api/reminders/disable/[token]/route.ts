import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyReminderToken } from "@/lib/otp";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ token: string }>;
}

function page(title: string, message: string, ok: boolean): NextResponse {
  const color = ok ? "#1a1a1a" : "#A32D2D";
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="min-height:100vh;">
<tr><td align="center" style="padding:60px 20px;">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:6px;">
<tr><td style="padding:48px 40px;text-align:center;">
<div style="width:48px;height:48px;border-radius:50%;background:#FCEBEB;margin:0 auto 20px;line-height:48px;font-size:24px;">${ok ? "✓" : "!"}</div>
<h1 style="margin:0 0 12px;font-size:22px;color:${color};">${title}</h1>
<p style="margin:0;font-size:15px;line-height:1.6;color:#555;">${message}</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
  return new NextResponse(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { token } = await params;

  const participantId = verifyReminderToken(token);
  if (!participantId) {
    return page(
      "Invalid link",
      "This unsubscribe link is not valid. If you keep getting reminders you'd rather not, contact support.",
      false
    );
  }

  const { error } = await supabase
    .from("participants")
    .update({ email_reminders: false, updated_at: new Date().toISOString() })
    .eq("id", participantId);

  if (error) {
    return page(
      "Something went wrong",
      "We couldn't update your preferences just now. Please try again in a moment.",
      false
    );
  }

  return page(
    "You're unsubscribed",
    "You won't receive evening reminder emails anymore. You'll still get your daily lesson email — that's part of the course itself.",
    true
  );
}