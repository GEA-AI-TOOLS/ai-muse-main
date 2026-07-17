// app/mux-test/page.tsx
import Mux from '@mux/mux-node';
import Player from './player';

export const dynamic = 'force-dynamic';

const PLAYBACK_ID = 'mAF0145Q9nUhAyBGDORBowuDIGlcYNq33QTO5IWZzgic';

export default async function Page() {
  const mux = new Mux({
    jwtSigningKey: process.env.MUX_SIGNING_KEY_ID!,
    jwtPrivateKey: process.env.MUX_SIGNING_KEY_PRIVATE!,
  });

  const token = await mux.jwt.signPlaybackId(PLAYBACK_ID, {
    type: 'video',
    expiration: '2h',
  });

  return <Player playbackId={PLAYBACK_ID} token={token} />;
}