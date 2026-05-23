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

  if (day > participant.currentDay) {
    redirect("/progress");
  }

  const { s } = await searchParams;
  return <LessonView participant={participant} lesson={lesson} section={s} />;}

export const dynamic = "force-dynamic";