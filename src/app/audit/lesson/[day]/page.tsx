import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/course-content";
import { AuditLessonView } from "./audit-lesson-view";
import { VideoPlayer } from "@/components/video-player";

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
    title: "Day " + String(lesson.day) + ": " + lesson.title + " — Disciplined AI",
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

  const essentialVideo = (
    <VideoPlayer
      videoUrl={lesson.essential.videoUrl}
      muxPlaybackId={lesson.essential.muxPlaybackId}
      slideUrl={lesson.essential.slideUrl}
      title={lesson.title + " — Essential (preview)"}
      // No participant identity for audit plays — keeps Mux Data
      // aggregate-only, not tied to a real person.
    />
  );

  const advancedVideo = lesson.advanced ? (
    <VideoPlayer
      videoUrl={lesson.advanced.videoUrl}
      muxPlaybackId={lesson.advanced.muxPlaybackId}
      slideUrl={lesson.advanced.slideUrl}
      title={lesson.title + " — Advanced (preview)"}
    />
  ) : undefined;

  const essentialDemoVideo = lesson.essential.exercise.demo ? (
    <VideoPlayer
      videoUrl={lesson.essential.exercise.demo.videoUrl}
      muxPlaybackId={lesson.essential.exercise.demo.muxPlaybackId}
      title={lesson.essential.exercise.demo.title}
    />
  ) : undefined;

  const advancedDemoVideo = lesson.advanced?.exercise.demo ? (
    <VideoPlayer
      videoUrl={lesson.advanced.exercise.demo.videoUrl}
      muxPlaybackId={lesson.advanced.exercise.demo.muxPlaybackId}
      title={lesson.advanced.exercise.demo.title}
    />
  ) : undefined;

  return (
    <AuditLessonView
      lesson={lesson}
      essentialVideo={essentialVideo}
      advancedVideo={advancedVideo}
      essentialDemoVideo={essentialDemoVideo}
      advancedDemoVideo={advancedDemoVideo}
    />
  );
}