import { notFound, redirect } from "next/navigation";
import { getParticipant, N8nError } from "@/lib/n8n";
import { getLesson } from "@/lib/course-content";
import { LessonView } from "./lesson-view";
import { getCohortAccess } from "@/lib/cohort-access";

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

  // Pre-launch cohorts: lessons stay locked until access_opens_at.
  // Normal cohorts have access_opens_at = NULL and skip straight through.
  const access = await getCohortAccess(participant.cohortId);
  if (access.locked) {
    redirect("/waiting");
  }

  // Sale-batch cohorts unlock day by day, following current_day, same as the
  // live cohort type — once a day unlocks it stays unlocked. Every normal
  // self_paced cohort (isSaleBatch = false) keeps all 10 days open, unchanged.
  if (access.isSaleBatch && day > participant.currentDay) {
    redirect("/progress");
  }

  const { s } = await searchParams;
  return <LessonView participant={participant} lesson={lesson} section={s} />;}

export const dynamic = "force-dynamic";