import { z } from 'zod'
import { validateSession } from '@/lib/stub-state'

const querySchema = z.object({
  token: z.string().min(1),
})

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const parsed = querySchema.safeParse({ token: url.searchParams.get('token') })
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? 'missing token' }, { status: 400 })
    }
    const participantId = validateSession(parsed.data.token)
    if (!participantId) {
      return Response.json({ valid: false })
    }
    return Response.json({ valid: true, participantId })
  } catch (err) {
    console.error('[stub/session]', err)
    return Response.json({ error: 'internal' }, { status: 500 })
  }
}
