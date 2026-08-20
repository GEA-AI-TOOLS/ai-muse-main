import { getParticipant } from "@/lib/n8n";
import { WelcomeView } from "./welcome-view";
import { VideoPlayer } from "@/components/video-player";

export const dynamic = "force-dynamic";

const WELCOME_VIDEO_URL = "https://www.youtube.com/embed/q-brEiUYX24?si=VUtBcaSGpmsQXbpH";
const WELCOME_MUX_PLAYBACK_ID = "oW00dodPzx89OoB4l4eUocundvL3jVYC02Us3wDiN202ow";

export default async function WelcomePage() {
  const { participant } = await getParticipant();

  const video = (
    <VideoPlayer
      videoUrl={WELCOME_VIDEO_URL}
      muxPlaybackId={WELCOME_MUX_PLAYBACK_ID}
      title="Course welcome"
      viewerUserId={participant.id}
    />
  );

  return <WelcomeView participant={participant} video={video} />;
}