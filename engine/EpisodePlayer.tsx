/**
 * Bộ phát một tập, dùng chung cho mọi dự án: hình (hoạt hình / animatic / footage), tiếng thoại,
 * phụ đề, các thẻ chữ theo nhịp, thẻ cuối, hiệu ứng âm thanh và vòng lặp nối về khung đầu.
 *
 * Mỗi dự án chỉ cần mô tả "layout": chữ trên thanh tiêu đề, thẻ nào hiện ở nhịp nào, câu hẹn tập sau...
 * (xem projects/<dự án>/src/Episode.tsx).
 */
import React, { useMemo } from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Easing, Freeze, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Animatic } from "./components/Animatic.tsx";
import { COLORS } from "./components/brand.ts";
import { EndCard, HookBanner, SafeZones, Subtitle, TopBar } from "./components/Overlays.tsx";
import { END_CARD_SECONDS, episodeTimeline, LOOP_SECONDS, type Timeline } from "./lib/timing.ts";
import type { BeatKind, Episode, VoiceTrack } from "./lib/types.ts";
import type { BoardRegistry } from "./stage/board.tsx";
import { Stage } from "./stage/Stage.tsx";
import { momentSounds } from "./stage/track.ts";

/** Khoảng khung hình của một nhịp (và của từng câu trong nhịp), truyền cho thẻ chữ để làm hiệu ứng vào / ra. */
export type BeatFrames = {
  startFrame: number;
  endFrame: number;
  /** Đầu quãng lặng cuối nhịp (Beat.holdSeconds); bằng endFrame khi nhịp không có quãng lặng. */
  holdFrame: number;
  lines: { startFrame: number; endFrame: number }[];
};

export type EpisodeLayout = {
  /** Thanh trên cùng: nhãn series + tiêu đề tập. Tiêu đề chỉ hiện sau khi nhịp `showTitleAfter` kết thúc. */
  topBar: { label: string; title: string; showTitleAfter?: BeatKind };
  /** Câu hỏi móc hiện ngay từ khung đầu, suốt nhịp `beat`. */
  hook?: { beat: BeatKind; kicker: string; title: string };
  /** Thẻ chữ theo nhịp (thẻ tiêu đề, con dấu lật nghĩa, thẻ tóm tắt...). */
  cards?: { beat: BeatKind; render: (f: BeatFrames) => React.ReactNode }[];
  /** Thẻ cuối: câu hỏi kéo bình luận + dòng hẹn tập sau. */
  endCard: { question: string; teaser: string | null };
  /** Hiệu ứng âm thanh lúc bắt đầu một nhịp, hoặc lúc vào quãng lặng cuối nhịp (`at: "hold"`). File trong public/sfx. */
  sfx?: { beat: BeatKind; file: string; volume?: number; at?: "start" | "hold" }[];
  /** Sơ đồ cho bảng minh hoạ (kênh "board" của phần diễn). */
  boards?: BoardRegistry;
};

export type EpisodePlayerProps = {
  episode: Episode;
  voice: VoiceTrack | null;
  layout: EpisodeLayout;
  /** Chỉ để xem trước trong Studio: tô vùng bị nút / chữ của TikTok, Shorts che. */
  safeZones?: boolean;
};

const Sfx: React.FC<{ file: string; at: number; volume?: number }> = ({ file, at, volume = 1 }) => (
  <Sequence from={at} layout="none" name={`sfx ${file}`}>
    <Audio src={staticFile(`sfx/${file}`)} volume={volume} />
  </Sequence>
);

type PictureProps = { episode: Episode; timeline: Timeline; layout: EpisodeLayout };

/** Toàn bộ phần hình của tập (không có tiếng), vẽ theo khung hình hiện tại. */
const Picture: React.FC<PictureProps> = ({ episode, timeline, layout }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const { beats, cues } = timeline;
  // Tập có phần diễn ở nhịp thường thì dựng sân khấu suốt tập. Tập chỉ có phần diễn ở cảnh hồi ức
  // thì các nhịp khác vẫn dùng animatic chân dung, riêng nhịp hồi ức dựng sân khấu.
  const fullStage = episode.beats.some((b) => b.stage?.length && !b.memory);

  const beat = beats.find((b) => t >= b.start && t < b.end) ?? beats[beats.length - 1];
  const hasStage = fullStage || Boolean(beat.stage?.length);
  const cue = cues.find((c) => t >= c.start && t < c.end);
  const f = (seconds: number) => Math.round(seconds * fps);
  const find = (kind?: BeatKind) => (kind ? beats.find((b) => b.kind === kind) : undefined);

  const hook = find(layout.hook?.beat);
  const titleBeat = find(layout.topBar.showTitleAfter);
  const endStart = durationInFrames - f(END_CARD_SECONDS);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {episode.footage ? (
        <Video src={staticFile(episode.footage)} objectFit="cover" muted />
      ) : hasStage ? (
        <Stage
          episode={episode}
          timeline={timeline}
          cue={cue}
          speaking={cue !== undefined && frame < endStart}
          boards={layout.boards}
        />
      ) : (
        <Animatic beat={beat} cue={frame >= endStart ? undefined : cue} />
      )}

      <TopBar label={layout.topBar.label} title={layout.topBar.title} showTitle={titleBeat ? t >= titleBeat.end : true} />

      {layout.hook && hook && frame < f(hook.end) ? (
        <HookBanner kicker={layout.hook.kicker} title={layout.hook.title} endFrame={f(hook.end)} />
      ) : null}

      {(layout.cards ?? []).map((card, i) => {
        const b = find(card.beat);
        if (!b || frame < f(b.start) || frame >= f(b.end)) return null;
        const index = beats.indexOf(b);
        const lines = timeline.lines
          .filter((l) => l.beat === index)
          .map((l) => ({ startFrame: f(l.start), endFrame: f(l.end) }));
        const holdFrame = f(b.end - (b.holdSeconds ?? 0));
        return <React.Fragment key={i}>{card.render({ startFrame: f(b.start), endFrame: f(b.end), holdFrame, lines })}</React.Fragment>;
      })}

      {frame >= endStart ? (
        <EndCard question={layout.endCard.question} teaser={layout.endCard.teaser} startFrame={endStart} />
      ) : null}

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

export const EpisodePlayer: React.FC<EpisodePlayerProps> = ({ episode, voice, layout, safeZones = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const timeline = useMemo(() => episodeTimeline(episode, voice), [episode, voice]);
  const { beats, spoken } = timeline;
  const sounds = useMemo(() => momentSounds(episode, timeline), [episode, timeline]);
  const f = (seconds: number) => Math.round(seconds * fps);

  const endStart = durationInFrames - f(END_CARD_SECONDS);
  const loopStart = durationInFrames - f(LOOP_SECONDS);
  const picture = { episode, timeline, layout };

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

      {(layout.sfx ?? []).map((s) => {
        const b = beats.find((x) => x.kind === s.beat);
        if (!b) return null;
        const at = s.at === "hold" ? f(b.end - (b.holdSeconds ?? 0)) : f(b.start);
        return <Sfx key={`${s.beat}-${s.file}`} file={s.file} at={at} volume={s.volume} />;
      })}
      {sounds.map((s, i) => (
        <Sfx key={`m-${i}-${s.file}`} file={s.file} at={f(s.time)} volume={s.volume} />
      ))}
      <Sfx file="whoosh.wav" at={endStart} volume={0.6} />
      <Sfx file="whoosh.wav" at={loopStart} volume={0.45} />
    </AbsoluteFill>
  );
};
