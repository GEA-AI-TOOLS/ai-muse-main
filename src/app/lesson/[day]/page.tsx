import { notFound, redirect } from "next/navigation";
import { getParticipant, N8nError } from "@/lib/n8n";
import { getLesson } from "@/lib/course-content";
import { LessonView } from "./lesson-view";

interface PageProps {
  params: Promise<{ day: string }>;
  searchParams: Promise<{ s?: string }>;
}

export default async function LessonPage({ params, searchParams }: PageProps) {
  const { day: dayParam } = await params;
  const day = Number(dayParam);

  if (!Number.isInteger(day) || day < 1 || day > 10) {
    notFound();
  }

  const lesson = getLesson(day);
  if (!lesson) notFound();

  let participantRes;
  try {
    participantRes = await getParticipant();
  } catch (err) {
    if (err instanceof N8nError) {
      redirect("/login?reason=new-device");
    }
    throw err;
  }

  const { participant } = participantRes;

  // Video version (self_paced): all 10 days unlocked. The day gate only applies
  // to the live version, where content must be delivered in sequence.
  // current_day still drives emails — it just no longer gates lesson access here.
  // (When live version lands, re-add the gate keyed on participant.cohort_type === "live".)

  const { s } = await searchParams;
  return <LessonView participant={participant} lesson={lesson} section={s} />;}

export const dynamic = "force-dynamic";