import type { DayProgress, MagicLink, Participant } from './types'

interface StubState {
  participant: Participant
  progress: Map<number, DayProgress>
  sessionTokens: Set<string>
  magicLinks: Map<string, MagicLink>
}

declare global {
  // eslint-disable-next-line no-var
  var __stubState: StubState | undefined
}

function createInitialState(): StubState {
  const progress = new Map<number, DayProgress>()
  progress.set(1, { day: 1, doneAt: '2026-04-27T10:00:00Z' })
  progress.set(2, { day: 2, doneAt: '2026-04-28T10:00:00Z' })
  progress.set(3, { day: 3, doneAt: '2026-04-29T10:00:00Z' })
  progress.set(4, { day: 4, doneAt: '2026-04-30T10:00:00Z' })
  for (let d = 5; d <= 10; d++) {
    progress.set(d, { day: d, doneAt: null })
  }

  const magicLinks = new Map<string, MagicLink>()
  magicLinks.set('stub_magic_token_xyz789', {
    token: 'stub_magic_token_xyz789',
    purpose: 'initial_pairing',
    used: false,
    participantId: 'p_sarah_chen_001',
  })

  return {
    participant: {
      id: 'p_sarah_chen_001',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      cohortId: 'cohort_2026_04_27',
      currentDay: 5,
      status: 'active',
      timezone: 'Europe/Brussels',
      enrolledAt: '2026-04-27T08:00:00Z',
    },
    progress,
    sessionTokens: new Set(['stub_session_token_abc123']),
    magicLinks,
  }
}

function getState(): StubState {
  if (!globalThis.__stubState) {
    globalThis.__stubState = createInitialState()
  }
  return globalThis.__stubState
}

export function getParticipant(): Participant {
  return getState().participant
}

export function getCurrentDay(): number {
  return getState().participant.currentDay
}

export function getDaysComplete(): number[] {
  const state = getState()
  const done: number[] = []
  for (const [day, progress] of state.progress) {
    if (progress.doneAt !== null) done.push(day)
  }
  return done.sort((a, b) => a - b)
}

export function markDayDone(day: number): void {
  const state = getState()
  const entry = state.progress.get(day)
  if (entry && entry.doneAt === null) {
    entry.doneAt = new Date().toISOString()
  }
  if (day === state.participant.currentDay && state.participant.currentDay < 10) {
    state.participant.currentDay = day + 1
  }
}

export function validateSession(token: string): string | null {
  if (!token.startsWith('stub_session_')) return null
  return getState().participant.id
}

export function verifyMagicLink(token: string):
  | { ok: true; sessionToken: string; participantId: string }
  | { ok: false; reason: 'invalid' | 'expired' | 'used' } {
  const state = getState()
  const link = state.magicLinks.get(token)
  if (!link) return { ok: false, reason: 'invalid' }
  if (link.used) return { ok: false, reason: 'used' }
  link.used = true
  const sessionToken = `stub_session_${Date.now()}_${Math.random().toString(36).slice(2)}`
  state.sessionTokens.add(sessionToken)
  return { ok: true, sessionToken, participantId: link.participantId }
}
