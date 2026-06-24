// src/lib/ics.ts
// Generates a 10-event ICS (Mon–Fri across 2 weeks) at 9am in the participant's
// timezone. Tap-to-add in any calendar app. cohortId gives the start Monday.

function startMondayFromCohortId(cohortId: string): Date {
  const parts = cohortId.replace("cohort_", "").split("_");
  // Local-noon construction avoids accidental day-shift; we only use the date.
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 9, 0, 0);
}

// The 10 weekday offsets from the start Monday (skip Sat/Sun).
const DAY_OFFSETS = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11];

function fmtLocalStamp(d: Date): string {
  // YYYYMMDDTHHMMSS (floating local time, paired with TZID)
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    d.getFullYear().toString() +
    p(d.getMonth() + 1) +
    p(d.getDate()) +
    "T" +
    p(d.getHours()) +
    p(d.getMinutes()) +
    "00"
  );
}

function fmtUtcStamp(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    p(d.getUTCMonth() + 1) +
    p(d.getUTCDate()) +
    "T" +
    p(d.getUTCHours()) +
    p(d.getUTCMinutes()) +
    p(d.getUTCSeconds()) +
    "Z"
  );
}

export function buildCourseIcs(
  cohortId: string,
  timezone: string,
  courseUrl: string,
  participantId: string
): string {
  const startMonday = startMondayFromCohortId(cohortId);
  const now = fmtUtcStamp(new Date());

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SPARKS//Make AI Your Muse//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  DAY_OFFSETS.forEach((offset, i) => {
    const dayNum = i + 1;
    const start = new Date(startMonday);
    start.setDate(start.getDate() + offset); // 9:00 local
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);

    const uid = "sparks-" + participantId + "-day" + dayNum + "@bryancassady.com";

    lines.push(
      "BEGIN:VEVENT",
      "UID:" + uid,
      "DTSTAMP:" + now,
      "DTSTART;TZID=" + timezone + ":" + fmtLocalStamp(start),
      "DTEND;TZID=" + timezone + ":" + fmtLocalStamp(end),
      "SUMMARY:SPARKS · Day " + dayNum + " — your 10 minutes with AI",
      "DESCRIPTION:A few focused minutes today. Open Day " + dayNum +
        " and keep your streak going.\\n\\n" + courseUrl,
      "URL:" + courseUrl,
      "BEGIN:VALARM",
      "TRIGGER:-PT10M",
      "ACTION:DISPLAY",
      "DESCRIPTION:SPARKS · Day " + dayNum,
      "END:VALARM",
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}