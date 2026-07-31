import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/course-content";
import { AuditLessonView } from "./audit-lesson-view";

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ day: String(i + 1) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ day: string }> }
): Promise<Metadata> {
  const { day } = await params;
  const lesson = getLesson(Number(day));
  if (!lesson) return { title: "Lesson not found" };

  const hook = lesson.essential.summary[0]?.body ?? "";
  return {
    title: "Day " + String(lesson.day) + ": " + lesson.title + " — Make AI Your Muse",
    description: hook.slice(0, 155),
    alternates: { canonical: "/audit/lesson/" + String(lesson.day) },
    openGraph: {
      title: "Day " + String(lesson.day) + ": " + lesson.title,
      description: hook.slice(0, 155),
      type: "article",
    },
  };
}

export default async function AuditLessonPage(
  { params }: { params: Promise<{ day: string }> }
) {
  const { day } = await params;
  const dayNum = Number(day);
  if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > 10) notFound();

  const lesson = getLesson(dayNum);
  if (!lesson) notFound();

  return <AuditLessonView lesson={lesson} />;
}