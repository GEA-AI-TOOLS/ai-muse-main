import { z } from 'zod'
import { markDayDone } from '@/lib/stub-state'

const bodySchema = z.object({
  token: z.string().startsWith('stub_track_', { message: 'token must start with stub_track_' }),
  section: z.enum(['essential', 'advanced', 'learnmore']).optional(),
})

const TOKEN_RE = /^stub_track_day_(\d+)_/

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json()
    const parsed = bodySchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? 'invalid body' }, { status: 400 })
    }
    const { token, section } = parsed.data
    const match = TOKEN_RE.exec(token)
    if (!match) {
      return Response.json({ error: 'token format must be stub_track_day_N_...' }, { status: 400 })
    }
    const day = parseInt(match[1], 10)
    if (!section || section === 'essential') {
      markDayDone(day)
    }
    const anchor = section ? `#${section}` : ''
    return Response.json({ ok: true, redirectTo: `/lesson/${day}${anchor}` })
  } catch (err) {
    console.error('[stub/click]', err)
    return Response.json({ error: 'internal' }, { status: 500 })
  }
}
