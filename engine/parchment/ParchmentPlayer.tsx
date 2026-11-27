import React, { useMemo } from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Easing, Freeze, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EndCard, SafeZones } from "../components/Overlays.tsx";
import { endCardTiming, episodeTimeline, LOOP_SECONDS, type Timeline } from "../lib/timing.ts";
import type { Episode, VoiceTrack } from "../lib/types.ts";
import { TEXT_FONT } from "../components/brand.ts";
import { CENTER_SHIFT, LAYOUT, PARCHMENT, ParchmentHud } from "./ParchmentHud.tsx";
import { BEAT_DISSOLVE, ParchmentScene } from "./scenes.tsx";
import type { Stage3DProps } from "../three/stage.tsx";
import { STAGES_3D as STAGE_3D } from "./stages3d.ts";

export type ParchmentEpisode = Episode & {
  title: string;
  hudTitle: string;
  /** Tiêu đề dài riêng cho ảnh bìa; thiếu thì dùng hudTitle. */
  coverTitle?: string;
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

  // Đầu nhịp mới: vẫn vẽ nhịp vừa qua (đang chạy tiếp) để hoà cảnh, không bị nháy trống.
  const prevBeat = beatIdx > 0 && beatFrame < BEAT_DISSOLVE ? beats[beatIdx - 1] : null;
  const prevLines = prevBeat ? lines.filter((l) => l.beat === beatIdx - 1) : [];
  const prevLast = prevLines[prevLines.length - 1];
  const prev = prevBeat
    ? {
        beatKind: prevBeat.kind,
        lineIndex: prevLast?.line ?? 0,
        beatFrame: frame - f(prevBeat.start),
        lineFrame: Math.max(0, frame - f(prevLast?.start ?? prevBeat.start)),
      }
    : null;

  const cue = cues.find((c) => t >= c.start && t < c.end);
  const endStart = durationInFrames - f(endCardTiming(episode.question).total);

  return (
    <AbsoluteFill style={{ backgroundColor: PARCHMENT.bgOuter }}>
      {episode.footage ? (
        <Video src={staticFile(episode.footage)} objectFit="cover" muted />
      ) : (
        <>
          <ParchmentHud day={episode.day} hudTitle={episode.hudTitle} />
          {/* Cảnh vẽ theo toạ độ khung cũ; dời cả lớp CENTER_SHIFT cho nằm giữa khung (xem ParchmentHud). */}
          <AbsoluteFill style={{ transform: `translateX(${CENTER_SHIFT}px)` }}>
          {STAGE_3D[episode.day] ? (
            <Stage3D
              Comp={STAGE_3D[episode.day]}
              props={{ beatKind: beat.kind, lineIndex, lineFrame, lineDur: activeLine ? activeLine.end - activeLine.start : 1, fps, frame }}
            />
          ) : null}
          {STAGE_3D[episode.day] ? null : <ParchmentScene
            day={episode.day}
            beatKind={beat.kind}
            lineIndex={lineIndex}
            beatProgress={beatProgress}
            beatFrame={beatFrame}
            lineFrame={lineFrame}
            fps={fps}
            prev={prev}
          />}
          </AbsoluteFill>
        </>
      )}

      <AbsoluteFill style={{ transform: `translateX(${CENTER_SHIFT}px)` }}>
      {/* Phụ đề: dưới thẻ chữ, trên vùng chú thích của nền tảng; không đè lên sân khấu */}
      {episode.showSubtitles === false || frame >= endStart || !cue ? null : (
        <div
          style={{
            position: "absolute",
            top: LAYOUT.subtitle.y,
            left: LAYOUT.subtitle.x,
            width: LAYOUT.subtitle.w,
            minHeight: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 30px",
            borderRadius: 22,
            backgroundColor: "rgba(20, 13, 7, 0.9)",
            border: `3px solid rgba(245,197,66,0.55)`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontFamily: TEXT_FONT,
              fontWeight: 900,
              fontSize: 44,
              lineHeight: 1.22,
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
          teaser={next ? `Tiếp theo: ${next === next.toLocaleUpperCase("vi") ? next.charAt(0) + next.slice(1).toLocaleLowerCase("vi") : next}` : null}
          startFrame={endStart}
          teaserFrame={endStart + f(endCardTiming(episode.question).question)}
        />
      ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Khung sân khấu 3D: cắt bo góc theo tấm giấy, viền đồng như cảnh thường. */
const Stage3D: React.FC<{ Comp: React.FC<Stage3DProps>; props: Stage3DProps }> = ({ Comp, props }) => {
  const { x, y, w, h } = LAYOUT.stage;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 26, overflow: "hidden" }}>
      <Comp {...props} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 26, border: "6px solid #C99A4B", boxSizing: "border-box", boxShadow: "inset 0 0 40px rgba(60,35,15,0.35)" }} />
    </div>
  );
};

const LOOP_CENTER = { x: 484 + CENTER_SHIFT, y: 550 };
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

  const endStart = durationInFrames - f(endCardTiming(episode.question).total);
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
