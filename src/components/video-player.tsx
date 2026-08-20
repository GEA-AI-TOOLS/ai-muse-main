import MuxPlayer from "@mux/mux-player-react";
import { signMuxTokens } from "@/lib/mux";

interface Props {
  videoUrl: string;
  muxPlaybackId?: string;
  slideUrl?: string;
  title?: string;
  /** Real participant ID for Mux Data. Omit for audit/anonymous plays. */
  viewerUserId?: string;
}

export async function VideoPlayer({ videoUrl, muxPlaybackId, slideUrl, title, viewerUserId }: Props) {
  const hasVideo = (videoUrl?.trim().length ?? 0) > 0 || !!muxPlaybackId;

  let tokens = null;
  if (muxPlaybackId) {
    try {
      tokens = await signMuxTokens(muxPlaybackId);
    } catch (err) {
      console.error("Mux token signing failed, falling back to YouTube:", err);
      tokens = null;
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-video overflow-hidden rounded-md bg-black">
        {muxPlaybackId && tokens ? (
          <MuxPlayer
            playbackId={muxPlaybackId}
            tokens={{
              playback: tokens.playback,
              thumbnail: tokens.thumbnail,
              storyboard: tokens.storyboard,
            }}
            streamType="on-demand"
            accentColor="#E24B4A"
            metadata={{
              video_id: muxPlaybackId,
              video_title: title,
              sub_property_id: "video",
              viewer_user_id: viewerUserId ?? "anonymous",
              player_name: "sparks-video-player",
            }}
            style={{ height: "100%", width: "100%" }}
          />
        ) : hasVideo ? (
          <iframe
            src={videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <p className="text-sm text-muted-foreground">Video coming soon</p>
          </div>
        )}
      </div>
      {slideUrl && (
        <a
          href={slideUrl}
          target="_blank"
          rel="noreferrer"
          download
          className="inline-flex items-center gap-2 self-start rounded-md border px-4 py-2 text-sm hover:bg-accent"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download slides
        </a>
      )}
    </div>
  );
}