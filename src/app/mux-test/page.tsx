import Mux from '@mux/mux-node';
import Player from './player';

export const dynamic = 'force-dynamic';

// swap to test different assets
const VIDEOS = {
  'd01-demo':   { playbackId: 'mAF0145Q9nUhAyBGDORBowuDIGlcYNq33QTO5IWZzgic', title: 'Day 1 — Demo', posterTime: 3 },
};

export default async function Page() {
  const mux = new Mux({
    jwtSigningKey: process.env.MUX_SIGNING_KEY_ID!,
    jwtPrivateKey: process.env.MUX_SIGNING_KEY_PRIVATE!,
  });

  const entries = await Promise.all(
    Object.entries(VIDEOS).map(async ([videoId, v]) => {
      const [playback, thumbnail, storyboard] = await Promise.all([
        mux.jwt.signPlaybackId(v.playbackId, { expiration: '2h', type: 'video' }),
        mux.jwt.signPlaybackId(v.playbackId, {
          expiration: '2h',
          type: 'thumbnail',
          params: { time: String(v.posterTime) },
        }),
        mux.jwt.signPlaybackId(v.playbackId, { expiration: '2h', type: 'storyboard' }),
      ]);
      return [videoId, { ...v, tokens: { playback, thumbnail, storyboard } }];
    })
  );

  return <Player videos={Object.fromEntries(entries)} />;
}