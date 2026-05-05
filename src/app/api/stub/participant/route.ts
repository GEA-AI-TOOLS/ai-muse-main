import { getDaysComplete, getParticipant } from '@/lib/stub-state'

export async function GET() {
  try {
    const p = getParticipant()
    const daysComplete = getDaysComplete()
    return Response.json({
      participant: {
        id: p.id,
        name: p.name,
        email: p.email,
        cohortId: p.cohortId,
        currentDay: p.currentDay,
        status: p.status,
        timezone: p.timezone,
        enrolledAt: p.enrolledAt,
        daysComplete,
      },
    })
  } catch (err) {
    console.error('[stub/participant]', err)
    return Response.json({ error: 'internal' }, { status: 500 })
  }
}
