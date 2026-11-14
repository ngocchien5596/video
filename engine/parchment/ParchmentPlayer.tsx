import React, { useMemo } from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Easing, Freeze, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EndCard, SafeZones } from "../components/Overlays.tsx";
import { END_CARD_SECONDS, episodeTimeline, LOOP_SECONDS, type Timeline } from "../lib/timing.ts";
import type { Episode, VoiceTrack } from "../lib/types.ts";
import { PARCHMENT, ParchmentHud } from "./ParchmentHud.tsx";
import { ParchmentScene } from "./scenes.tsx";

export type ParchmentEpisode = Episode & {
  title: string;
  hudTitle: string;
  textbook: string;
  era: string;
  sources: { title: string; url: string }[];
};

export type ParchmentPlayerProps = {
  episode: ParchmentEpisode;
  next: string | null;
  voice: VoiceTrack | null;
  safeZones?: boolean;
};

type PictureProps = {
  episode: ParchmentEpisode;
  timeline: Timeline;
  next: string | null;
};

const Picture: React.FC<PictureProps> = ({ episode, timeline, next }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const { beats, lines, cues } = timeline;
  const f = (seconds: number) => Math.round(seconds * fps);

  const beatIdx = Math.max(
    0,
    beats.findIndex((b) => t >= b.start && t < b.end),
  );
  const beat = beats[beatIdx] ?? beats[beats.length - 1];
  const beatProgress = Math.min(1, Math.max(0, (t - beat.start) / Math.max(0.1, beat.end - beat.start)));

  // Câu đang đọc (giữa hai câu thì giữ câu vừa đọc xong) và số khung hình kể từ lúc câu / nhịp bắt đầu.
  const beatLines = lines.filter((l) => l.beat === beatIdx);
  const activeLine = [...beatLines].reverse().find((l) => t >= l.start) ?? beatLines[0];
  const lineIndex = activeLine?.line ?? 0;
  const lineFrame = Math.max(0, frame - f(activeLine?.start ?? beat.start));
  const beatFrame = Math.max(0, frame - f(beat.start));

  const cue = cues.find((c) => t >= c.start && t < c.end);
  const endStart = durationInFrames - f(END_CARD_SECONDS);

  return (
    <AbsoluteFill style={{ backgroundColor: PARCHMENT.bgOuter }}>
      {episode.footage ? (
        <Video src={staticFile(episode.footage)} objectFit="cover" muted />
      ) : (
        <>
          <ParchmentHud day={episode.day} hudTitle={episode.hudTitle} />
          <ParchmentScene
            day={episode.day}
            beatKind={beat.kind}
            lineIndex={lineIndex}
            beatProgress={beatProgress}
            beatFrame={beatFrame}
            lineFrame={lineFrame}
            fps={fps}
          />
        </>
      )}

      {/* Tầng 3 (y: 1290..1440): Phụ đề nổi bật trên nền giấy cổ (dưới khung mặt bằng đã hạ thấp) */}
      {episode.showSubtitles === false || frame >= endStart || !cue ? null : (
        <div
          style={{
            position: "absolute",
            top: 1290,
            left: 68,
            width: 832,
            minHeight: 148,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 28px",
            borderRadius: 20,
            backgroundColor: "rgba(24, 16, 9, 0.88)",
            border: `3px solid ${PARCHMENT.gold}`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontFamily: "sans-serif",
              fontWeight: 900,
              fontSize: 40,
              lineHeight: 1.24,
              color: PARCHMENT.cream,
              textShadow: "0 2px 6px rgba(0,0,0,0.8)",
            }}
          >
            {cue.text}
          </span>
        </div>
      )}

      {frame >= endStart ? (
        <EndCard
          question={episode.question}
          teaser={next ? `Bài toán tiếp theo: ${next}` : null}
          startFrame={endStart}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const LOOP_CENTER = { x: 484, y: 550 };
const LOOP_RADIUS = 1650;

const LoopBack: React.FC<PictureProps & { from: number }> = ({ from, ...props }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [from, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const r = p * LOOP_RADIUS;
  return (
    <>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at ${LOOP_CENTER.x}px ${LOOP_CENTER.y}px)` }}>
        <Freeze frame={0}>
          <Picture {...props} />
        </Freeze>
      </AbsoluteFill>
      {p < 1 ? (
        <div
          style={{
            position: "absolute",
            left: LOOP_CENTER.x - r,
            top: LOOP_CENTER.y - r,
            width: r * 2,
            height: r * 2,
            borderRadius: "50%",
            border: `10px solid ${PARCHMENT.gold}`,
            boxSizing: "border-box",
          }}
        />
      ) : null}
    </>
  );
};

export const ParchmentPlayer: React.FC<ParchmentPlayerProps> = ({ episode, next, voice, safeZones = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const timeline = useMemo(() => episodeTimeline(episode, voice), [episode, voice]);
  const { beats, spoken } = timeline;
  const f = (seconds: number) => Math.round(seconds * fps);

  const endStart = durationInFrames - f(END_CARD_SECONDS);
  const loopStart = durationInFrames - f(LOOP_SECONDS);
  const picture = { episode, timeline, next };

  return (
    <AbsoluteFill style={{ backgroundColor: PARCHMENT.bgOuter }}>
      <Picture {...picture} />
      {frame >= loopStart ? <LoopBack {...picture} from={loopStart} /> : null}
      {safeZones ? <SafeZones /> : null}

      {spoken.map((line) => (
        <Sequence key={line.file} from={f(line.start)} layout="none" name={line.file}>
          <Audio src={staticFile(line.file)} />
        </Sequence>
      ))}

      {/* Hiệu ứng âm thanh chuyển hồi nhẹ nhàng */}
      {beats.map((b, idx) => (
        <Sequence key={`beat-sfx-${idx}`} from={f(b.start)} layout="none" name={`sfx-${b.kind}`}>
          <Audio src={staticFile(b.kind === "eureka" || b.kind === "theorem" ? "sfx/ding.wav" : "sfx/whoosh.wav")} volume={0.35} />
        </Sequence>
      ))}
      <Sequence from={endStart} layout="none" name="sfx-end">
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
