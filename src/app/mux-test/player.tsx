'use client';

import { useState, useRef, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const SERIES = 'v1';
const WRITE_INTERVAL_MS = 30_000;

export default function Player({ videos }: any) {
  const [viewerId, setViewerId] = useState('test-viewer-001');
  const [applied, setApplied] = useState('test-viewer-001');
  const [videoId, setVideoId] = useState(Object.keys(videos)[0]);
  const [log, setLog] = useState<string[]>([]);
  const lastWrite = useRef(0);
  const furthest = useRef(0);
  const ended = useRef(false);

  const v = videos[videoId];
  const t = v.tokens;

  const push = (m: string) =>
    setLog((l) => [`${new Date().toLocaleTimeString()}  ${m}`, ...l].slice(0, 30));

  // throttled — stands in for the future Supabase upsert
  const write = (reason: string, el: any) => {
    const pct = Number.isFinite(el.duration) && el.duration > 0
      ? `${((el.currentTime / el.duration) * 100).toFixed(0)}%`
      : '?';
    push(`WRITE (${reason}) pos=${el.currentTime.toFixed(1)}s pct=${pct}`);
  };

  // refs live outside the player's key remount — reset them by hand
  useEffect(() => {
    furthest.current = 0;
    lastWrite.current = 0;
    ended.current = false;
  }, [applied, videoId]);

  // pagehide, not beforeunload — iOS Safari ignores beforeunload
  useEffect(() => {
    const flush = () => {
      if (furthest.current > 0 && !ended.current) {
        push(`WRITE (unload) pos=${furthest.current.toFixed(1)}s`);
        // later: navigator.sendBeacon('/api/progress', JSON.stringify({
        //   participantId: applied, videoId, position: furthest.current,
        // }));
      }
    };
    window.addEventListener('pagehide', flush);
    return () => window.removeEventListener('pagehide', flush);
  }, [applied, videoId]);

  const onTimeUpdate = (e: any) => {
    const el = e.target;
    furthest.current = Math.max(furthest.current, el.currentTime);
    const now = Date.now();
    if (now - lastWrite.current >= WRITE_INTERVAL_MS) {
      lastWrite.current = now;
      write('interval', el);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          value={viewerId}
          onChange={(e) => setViewerId(e.target.value)}
          placeholder="viewer_user_id"
          style={{ padding: 8, flex: 1, minWidth: 220 }}
        />
        <button
          onClick={() => { setApplied(viewerId); push(`viewer → ${viewerId}`); }}
          style={{ padding: '8px 16px' }}
        >
          Apply &amp; remount
        </button>
        <select value={videoId} onChange={(e) => setVideoId(e.target.value)} style={{ padding: 8 }}>
          {Object.keys(videos).map((k) => <option key={k}>{k}</option>)}
        </select>
      </div>

      <MuxPlayer
        key={`${applied}-${videoId}`}   // remount so Mux Data picks up new metadata
        playbackId={v.playbackId}
        tokens={{
          playback: t.playback,
          thumbnail: t.thumbnail,
          storyboard: t.storyboard,
        }}
        streamType="on-demand"
        accentColor="#000000"
        metadata={{
          video_id: videoId,
          video_title: v.title,
          video_series: SERIES,
          sub_property_id: 'video',
          viewer_user_id: applied,
          player_name: 'sparks-video-player',
        }}
        onPlay={() => { ended.current = false; push('PLAY'); }}
        onPause={(e: any) => { if (!ended.current) write('pause', e.target); }}
        onEnded={(e: any) => { ended.current = true; write('ended', e.target); }}
        onTimeUpdate={onTimeUpdate}
        style={{ aspectRatio: '16 / 9', width: '100%', display: 'block' }}
      />

      <pre style={{ marginTop: 12, background: '#f4f4f4', padding: 12, fontSize: 12, maxHeight: 220, overflow: 'auto' }}>
        viewer: {applied}  |  video: {videoId}  |  series: {SERIES}  |  interval: {WRITE_INTERVAL_MS / 1000}s
        {'\n'}{log.join('\n')}
      </pre>
    </div>
  );
}