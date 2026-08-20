import { notFound, redirect } from "next/navigation";
import { getParticipant, N8nError } from "@/lib/n8n";
import { getLesson } from "@/lib/course-content";
import { LessonView } from "./lesson-view";
import { getCohortAccess } from "@/lib/cohort-access";
import { VideoPlayer } from "@/components/video-player";

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

  const essentialVideo = (
    <VideoPlayer
      videoUrl={lesson.essential.videoUrl}
      muxPlaybackId={lesson.essential.muxPlaybackId}
      slideUrl={lesson.essential.slideUrl}
      title={lesson.title + " — Essential"}
      viewerUserId={participant.id}
    />
  );

  const advancedVideo = lesson.advanced ? (
    <VideoPlayer
      videoUrl={lesson.advanced.videoUrl}
      muxPlaybackId={lesson.advanced.muxPlaybackId}
      slideUrl={lesson.advanced.slideUrl}
      title={lesson.title + " — Advanced"}
      viewerUserId={participant.id}
    />
  ) : undefined;

  const essentialDemoVideo = lesson.essential.exercise.demo ? (
    <VideoPlayer
      videoUrl={lesson.essential.exercise.demo.videoUrl}
      muxPlaybackId={lesson.essential.exercise.demo.muxPlaybackId}
      title={lesson.essential.exercise.demo.title}
      viewerUserId={participant.id}
    />
  ) : undefined;

  const advancedDemoVideo = lesson.advanced?.exercise.demo ? (
    <VideoPlayer
      videoUrl={lesson.advanced.exercise.demo.videoUrl}
      muxPlaybackId={lesson.advanced.exercise.demo.muxPlaybackId}
      title={lesson.advanced.exercise.demo.title}
      viewerUserId={participant.id}
    />
  ) : undefined;

  return (
    <LessonView
      participant={participant}
      lesson={lesson}
      section={s}
      essentialVideo={essentialVideo}
      advancedVideo={advancedVideo}
      essentialDemoVideo={essentialDemoVideo}
      advancedDemoVideo={advancedDemoVideo}
    />
  );
}

export const dynamic = "force-dynamic";