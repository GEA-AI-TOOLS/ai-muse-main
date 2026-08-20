import "server-only";
import Mux from "@mux/mux-node";

const mux = new Mux({
  jwtSigningKey: process.env.MUX_SIGNING_KEY_ID!,
  jwtPrivateKey: process.env.MUX_SIGNING_KEY_PRIVATE!,
});

export interface MuxTokens {
  playback: string;
  thumbnail: string;
  storyboard: string;
}

const THUMBNAIL_TIME_SECONDS = 3;

/**
 * Signs the three tokens MuxPlayer needs for a signed playback ID.
 * Server-only — never import this from a client component. The private
 * key must never reach the browser.
 */
export async function signMuxTokens(playbackId: string): Promise<MuxTokens> {
  const [playback, thumbnail, storyboard] = await Promise.all([
    mux.jwt.signPlaybackId(playbackId, {
      expiration: "2h",
      type: "video",
    }),
    mux.jwt.signPlaybackId(playbackId, {
      expiration: "2h",
      type: "thumbnail",
      params: { time: THUMBNAIL_TIME_SECONDS },
    }),
    mux.jwt.signPlaybackId(playbackId, {
      expiration: "2h",
      type: "storyboard",
    }),
  ]);

  return { playback, thumbnail, storyboard };
}