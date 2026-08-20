import "server-only";
import Mux from "@mux/mux-node";

const mux = new Mux({
  jwtSigningKey: process.env.MUX_SIGNING_KEY_ID!,
  jwtPrivateKey: process.env.MUX_SIGNING_KEY_PRIVATE!,
});

export interface MuxTokens {
  playback: string;
  storyboard: string;
}

/**
 * Signs the tokens MuxPlayer needs for a signed playback ID.
 * Server-only — never import this from a client component. The private
 * key must never reach the browser.
 *
 * Thumbnail signing deliberately dropped: this SDK version's TypeScript
 * types don't cleanly support it (time as number is rejected, and the
 * multi-type overload sometimes returns an object where a string is
 * expected). MuxPlayer still shows a poster automatically once playback
 * is authorized — this only loses control over which frame is used.
 */
export async function signMuxTokens(playbackId: string): Promise<MuxTokens> {
  const [playback, storyboard] = await Promise.all([
    mux.jwt.signPlaybackId(playbackId, {
      expiration: "2h",
      type: "video",
    }),
    mux.jwt.signPlaybackId(playbackId, {
      expiration: "2h",
      type: "storyboard",
    }),
  ]);

  return { playback, storyboard };
}