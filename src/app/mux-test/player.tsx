// app/mux-test/player.tsx
'use client';

import MuxPlayer from '@mux/mux-player-react';

export default function Player({
  playbackId,
  token,
}: {
  playbackId: string;
  token: string;
}) {
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <MuxPlayer
        playbackId={playbackId}
        tokens={{ playback: token }}
        streamType="on-demand"
        accentColor="#000000"
        metadata={{
          video_id: 'mux-test',
          video_title: 'Mux Test Asset',
          viewer_user_id: 'test-viewer-001',
        }}
        style={{ aspectRatio: '16/9', width: '100%' }}
      />
      <p style={{ fontSize: 12, marginTop: 8, opacity: 0.6 }}>
        playbackId: {playbackId}
      </p>
    </div>
  );
}