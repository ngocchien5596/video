import React, { useMemo } from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Easing, Freeze, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Animatic } from "./components/Animatic.tsx";
import { Stage } from "./stage/Stage.tsx";
import { COLORS } from "./components/brand.ts";
import { EndCard, FlipCard, HookBanner, SafeZones, Subtitle, TitleCard, TopBar } from "./components/Overlays.tsx";
import { END_CARD_SECONDS, episodeTimeline, LOOP_SECONDS, type Timeline } from "./lib/timing.ts";
import type { Episode, VoiceTrack } from "./lib/types.ts";

export type EpisodeProps = {
  episode: Episode;
  /** Câu của ngày mai, null ở tập cuối. */
  next: string | null;
  /** Tiếng thoại từ public/voice/ngay-XX/manifest.json, null khi chưa sinh. Nạp trong calculateMetadata. */
  voice: VoiceTrack | null;
  /** Chỉ để xem trước trong Studio: tô vùng bị nút / chữ của TikTok, Shorts che. */
  safeZones?: boolean;
};

const Sfx: React.FC<{ file: string; at: number; volume?: number }> = ({ file, at, volume = 1 }) => (
  <Sequence from={at} layout="none" name={`sfx ${file}`}>
    <Audio src={staticFile(`sfx/${file}`)} volume={volume} />
  </Sequence>
);

type PictureProps = { episode: Episode; next: string | null; timeline: Timeline };

/** Toàn bộ phần hình của tập (không có tiếng), vẽ theo khung hình hiện tại. */
const Picture: React.FC<PictureProps> = ({ episode, next, timeline }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const { beats, cues } = timeline;
  const hasStage = episode.beats.some((b) => b.stage?.length);

  const beat = beats.find((b) => t >= b.start && t < b.end) ?? beats[beats.length - 1];
  const cue = cues.find((c) => t >= c.start && t < c.end);
  const f = (seconds: number) => Math.round(seconds * fps);

  const hook = beats.find((b) => b.kind === "hook");
  const title = beats.find((b) => b.kind === "title");
  const flip = beats.find((b) => b.kind === "flip");
  const endStart = durationInFrames - f(END_CARD_SECONDS);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {episode.footage ? (
        <Video src={staticFile(episode.footage)} objectFit="cover" muted />
      ) : hasStage ? (
        <Stage episode={episode} timeline={timeline} cue={cue} speaking={cue !== undefined && frame < endStart} />
      ) : (
        <Animatic beat={beat} cue={frame >= endStart ? undefined : cue} />
      )}

      <TopBar day={episode.day} idiom={episode.idiom} showIdiom={title ? t >= title.end : true} />

      {hook && frame < f(hook.end) ? <HookBanner idiom={episode.idiom} endFrame={f(hook.end)} /> : null}

      {title && frame >= f(title.start) && frame < f(title.end) ? (
        <TitleCard
          day={episode.day}
          idiom={episode.idiom}
          startFrame={f(title.start)}
          endFrame={f(title.end)}
        />
      ) : null}

      {flip && frame >= f(flip.start) && frame < f(flip.end) ? (
        <FlipCard meaning={episode.meaning} startFrame={f(flip.start)} endFrame={f(flip.end)} />
      ) : null}

      {frame >= endStart ? <EndCard question={episode.question} next={next} startFrame={endStart} /> : null}

      {episode.showSubtitles === false || frame >= endStart ? null : <Subtitle cue={cue} />}
    </AbsoluteFill>
  );
};

/** Tâm vòng tròn mở ra khi nối về đầu: giữa khung câu hỏi ở nhịp hook. */
const LOOP_CENTER = { x: 540, y: 440 };
const LOOP_RADIUS = 1650;

/**
 * Vòng lặp: trong LOOP_SECONDS cuối, một vòng tròn mở ra từ khung câu hỏi, bên trong là đúng
 * khung hình đầu tiên của video. Khung cuối = khung đầu, nên khi nền tảng phát lại từ đầu
 * người xem không thấy chỗ nối, dễ xem thêm một vòng.
 */
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
            border: `12px solid ${COLORS.ink}`,
            boxShadow: `0 0 0 8px ${COLORS.idiom}`,
            boxSizing: "border-box",
          }}
        />
      ) : null}
    </>
  );
};

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, next, voice, safeZones = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const timeline = useMemo(() => episodeTimeline(episode, voice), [episode, voice]);
  const { beats, spoken } = timeline;
  const f = (seconds: number) => Math.round(seconds * fps);

  const title = beats.find((b) => b.kind === "title");
  const flip = beats.find((b) => b.kind === "flip");
  const endStart = durationInFrames - f(END_CARD_SECONDS);
  const loopStart = durationInFrames - f(LOOP_SECONDS);
  const picture = { episode, next, timeline };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <Picture {...picture} />
      {frame >= loopStart ? <LoopBack {...picture} from={loopStart} /> : null}

      {safeZones ? <SafeZones /> : null}

      {spoken.map((line) => (
        <Sequence key={line.file} from={f(line.start)} layout="none" name={line.file}>
          <Audio src={staticFile(line.file)} />
        </Sequence>
      ))}

      {title ? <Sfx file="ding.wav" at={f(title.start)} volume={0.7} /> : null}
      {flip ? <Sfx file="record-scratch.wav" at={f(flip.start)} volume={0.8} /> : null}
      <Sfx file="whoosh.wav" at={endStart} volume={0.6} />
      <Sfx file="whoosh.wav" at={loopStart} volume={0.45} />
    </AbsoluteFill>
  );
};
