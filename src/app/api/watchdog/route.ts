import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

const CRON_SECRET = 'alpha-beta-gamma';
const ALERT_EMAIL_BRYAN = 'bryan@bryancassady.com';
const ALERT_EMAIL_H = 'hari@bryancassady.com';
const SENDER_EMAIL = 'sparks.alerts@bryancassady.com';

export async function GET(req: NextRequest) {
  const secret = req.headers.get('authorization');
  if (secret !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  const { data } = await supabase
    .from('scheduler_runs')
    .select('ran_at')
    .order('ran_at', { ascending: false })
    .limit(1)
    .single();

  const lastRun = data?.ran_at ? new Date(data.ran_at) : null;
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

  if (!lastRun || lastRun < threeHoursAgo) {
    const staleHours = lastRun
      ? Math.round((Date.now() - lastRun.getTime()) / (1000 * 60 * 60))
      : null;

    await fetch('https://api.brevo.com/v3/transactionalEmails/send', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'AI Muse System', email: SENDER_EMAIL },
        to: [
          { email: ALERT_EMAIL_BRYAN, name: 'Bryan' },
          { email: ALERT_EMAIL_H, name: 'H' },
        ],
        subject: 'AI Muse — n8n scheduler may be down',
        htmlContent: `<p>The n8n scheduler has not logged a run in ${staleHours ? `${staleHours} hours` : 'an unknown period'}.</p><p>Last recorded run: ${lastRun ? lastRun.toISOString() : 'never'}</p><p>Check n8n Cloud immediately.</p>`,
      }),
    });

    return NextResponse.json({ alerted: true, lastRun: lastRun?.toISOString() ?? null });
  }

  return NextResponse.json({ ok: true, lastRun: lastRun.toISOString() });
}