/**
 * Player của "Đoán Xem Là Ai": cuộn giấy dó, mỗi câu một tranh (ảnh AI nếu có, không thì cảnh mực vẽ bằng code),
 * ba chấm gợi ý, khoảng dừng đoán có đồng hồ, ấn đỏ khi lật đáp án. Bible: projects/doan-xem/docs/series-bible.md.
 */
import React, { useMemo } from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, getStaticFiles, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TEXT_FONT } from "../../../engine/components/brand.ts";
import { SafeZones } from "../../../engine/components/Overlays.tsx";
import { endCardTiming, episodeTimeline, type Timeline } from "../../../engine/lib/timing.ts";
import type { VoiceTrack } from "../../../engine/lib/types.ts";
import { INK, NAME_FONT, SERIES_NAME } from "./brand.ts";
import { GUESS_PAUSE, revealIndex, type DoanXemEpisode, type DoanXemLine } from "./episodes/make.ts";
import { InkScene } from "./ink/scenes.tsx";

export type EpisodeProps = {
  episode: DoanXemEpisode;
  next: string | null;
  voice: VoiceTrack | null;
  safeZones?: boolean;
};

/** Khung cuộn giấy (cân giữa: lề trái = lề phải = 60). Vùng tranh 960×1000. */
export const SCROLL = { left: 60, right: 1020, top: 150, bottom: 1650 };
export const PIC = { x: 60, y: 270, w: 960, h: 1100 };
const DISSOLVE = 15;
const SUB_TOP = 1400;

const ease = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

const hasFile = (() => {
  let names: Set<string> | null = null;
  return (path: string) => {
    if (!names) {
      try {
        names = new Set(getStaticFiles().map((f) => f.name.replace(/\\/g, "/")));
      } catch {
        names = new Set();
      }
    }
    return names.has(path);
  };
})();

/** Vân giấy dó + vết ố + tối viền, phủ lên tranh (multiply) cho tranh như in trên giấy. */
const PaperTexture: React.FC = () => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", pointerEvents: "none" }}>
    <defs>
      <filter id="paper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={5} />
        <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.22 0" />
      </filter>
      <filter id="paper-fiber">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves={3} seed={11} />
        <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.42  0 0 0 0 0.3  0 0 0 0.16 0" />
      </filter>
      <radialGradient id="paper-vig" cx="50%" cy="50%" r="70%">
        <stop offset="0.6" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#B59A6E" />
      </radialGradient>
      <radialGradient id="paper-stain">
        <stop offset="0" stopColor={INK.stain} stopOpacity={0.35} />
        <stop offset="1" stopColor={INK.stain} stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect x={SCROLL.left} y={SCROLL.top} width={SCROLL.right - SCROLL.left} height={SCROLL.bottom - SCROLL.top} fill="url(#paper-vig)" />
    <rect x={SCROLL.left} y={SCROLL.top} width={SCROLL.right - SCROLL.left} height={SCROLL.bottom - SCROLL.top} filter="url(#paper-fiber)" />
    <rect x={SCROLL.left} y={SCROLL.top} width={SCROLL.right - SCROLL.left} height={SCROLL.bottom - SCROLL.top} filter="url(#paper-grain)" />
    <ellipse cx={180} cy={1520} rx={160} ry={110} fill="url(#paper-stain)" />
    <ellipse cx={930} cy={300} rx={120} ry={90} fill="url(#paper-stain)" />
    <ellipse cx={850} cy={1470} rx={90} ry={70} fill="url(#paper-stain)" />
  </svg>
);

/** Hai trục cuộn gỗ trên và dưới, đầu trục màu son. */
const Rollers: React.FC = () => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <defs>
      <linearGradient id="roller" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7A5233" />
        <stop offset="0.5" stopColor={INK.roller} />
        <stop offset="1" stopColor="#2E1D10" />
      </linearGradient>
    </defs>
    {[SCROLL.top - 24, SCROLL.bottom - 24].map((y) => (
      <g key={y}>
        <rect x={34} y={y} width={1012} height={48} rx={24} fill="url(#roller)" />
        <rect x={14} y={y + 6} width={36} height={36} rx={10} fill={INK.cinnabar} />
        <rect x={1030} y={y + 6} width={36} height={36} rx={10} fill={INK.cinnabar} />
      </g>
    ))}
  </svg>
);

/** Ba chấm gợi ý ở góc trên bên trái (trong vùng an toàn), sáng dần theo nhóm. */
const HintDots: React.FC<{ lit: number; litAt: number[]; frame: number; accent: string }> = ({ lit, litAt, frame, accent }) => (
  <div style={{ position: "absolute", left: 110, top: 200, display: "flex", gap: 22 }}>
    {[0, 1, 2].map((i) => {
      const on = i < lit;
      const pop = on ? ease(frame, litAt[i] ?? 0, (litAt[i] ?? 0) + 10) : 0;
      return (
        <div
          key={i}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            border: `4px solid ${INK.ink}`,
            backgroundColor: on ? accent : "transparent",
            transform: `scale(${on ? 0.7 + 0.3 * pop + 0.15 * Math.sin(pop * Math.PI) : 1})`,
            boxSizing: "border-box",
          }}
        />
      );
    })}
  </div>
);

/** Tranh của một câu: ảnh AI (nếu file có trong public) hoặc cảnh mực; zoom chậm như máy quay. */
const LinePicture: React.FC<{ line: DoanXemLine; id: string; p: number; frame: number; accent: string; opacity: number }> = ({ line, id, p, frame, accent, opacity }) => {
  const image = line.scene.image && hasFile(line.scene.image) ? line.scene.image : null;
  const zoom = 1 + 0.07 * p;
  return (
    <div style={{ position: "absolute", left: PIC.x, top: PIC.y, width: PIC.w, height: PIC.h, opacity, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom}) translateY(${-10 * p}px)`, transformOrigin: "50% 55%" }}>
        {image ? (
          <Img src={staticFile(image)} style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }} />
        ) : (
          <InkScene name={line.scene.ink} id={id} p={p} frame={frame} accent={accent} />
        )}
      </div>
    </div>
  );
};

const Chip: React.FC<{ text: string; frame: number }> = ({ text, frame }) => {
  const k = ease(frame, 6, 20);
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        top: 300,
        padding: "8px 24px",
        border: `4px solid ${INK.cinnabar}`,
        borderRadius: 8,
        backgroundColor: "rgba(239,228,204,0.9)",
        fontFamily: NAME_FONT,
        fontWeight: 700,
        fontSize: 40,
        color: INK.ink,
        opacity: k,
        transform: `translateY(${(1 - k) * -12}px)`,
      }}
    >
      {text}
    </div>
  );
};

const BigText: React.FC<{ text: string; frame: number; accent: string }> = ({ text, frame, accent }) => {
  const k = ease(frame, 18, 34);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1240, textAlign: "center", opacity: k, transform: `scale(${0.85 + 0.15 * k})` }}>
      <span
        style={{
          fontFamily: NAME_FONT,
          fontWeight: 900,
          fontSize: 92,
          color: INK.ink,
          padding: "0 30px",
          background: `linear-gradient(transparent 62%, ${accent}88 62%)`,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const Subtitle: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      left: 110,
      right: 110,
      top: SUB_TOP,
      textAlign: "center",
      fontFamily: TEXT_FONT,
      fontWeight: 900,
      fontSize: 50,
      lineHeight: 1.25,
      color: INK.ink,
      textShadow: `0 0 10px ${INK.paper}, 0 0 4px ${INK.paper}`,
    }}
  >
    {text}
  </div>
);

/** Đồng hồ đếm ngược 3 giây: vòng mực màu nhấn chạy quanh, số to ở giữa. */
const Countdown: React.FC<{ frame: number; fps: number; accent: string; top: number }> = ({ frame, fps, accent, top }) => {
  const total = GUESS_PAUSE * fps;
  const left = Math.max(1, GUESS_PAUSE - Math.floor(frame / fps));
  const sweep = Math.min(1, frame / total);
  const inK = ease(frame, 0, 8);
  const r = 170;
  const c = 2 * Math.PI * r;
  const beat = (frame % fps) / fps;
  return (
    <div style={{ position: "absolute", left: 540 - 220, top, width: 440, height: 440, opacity: inK }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 220, backgroundColor: "rgba(239,228,204,0.92)" }} />
      <svg width={440} height={440} style={{ position: "absolute", inset: 0 }}>
        <circle cx={220} cy={220} r={r} stroke={INK.ink} strokeWidth={6} fill="none" opacity={0.25} />
        <circle
          cx={220}
          cy={220}
          r={r}
          stroke={accent}
          strokeWidth={22}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c * (1 - sweep)} ${c}`}
          transform="rotate(-90 220 220)"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: NAME_FONT,
          fontWeight: 900,
          fontSize: 200,
          color: INK.ink,
          transform: `scale(${1 + 0.12 * Math.max(0, 1 - beat * 4)})`,
        }}
      >
        {left}
      </div>
    </div>
  );
};

/** Ấn đỏ đóng xuống: tên nhân vật và tác phẩm. */
const Seal: React.FC<{ frame: number; name: string; known: string; out: number }> = ({ frame, name, known, out }) => {
  const k = ease(frame, 0, 9);
  const scale = 1.7 - 0.7 * k + 0.05 * Math.sin(Math.min(1, frame / 14) * Math.PI) * (frame > 9 ? 1 : 0);
  return (
    <div
      style={{
        position: "absolute",
        left: 540 - 250,
        top: 1060,
        width: 500,
        padding: "22px 0 18px",
        backgroundColor: INK.cinnabar,
        border: `8px double #F3E6CF`,
        outline: `6px solid ${INK.cinnabar}`,
        borderRadius: 10,
        textAlign: "center",
        color: "#F8EEDC",
        opacity: k * (1 - out),
        transform: `rotate(-4deg) scale(${scale})`,
        boxShadow: "0 0 0 2px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontFamily: NAME_FONT, fontWeight: 900, fontSize: 86, letterSpacing: 4, lineHeight: 1 }}>{name.toUpperCase()}</div>
      <div style={{ fontFamily: NAME_FONT, fontWeight: 700, fontSize: 42, marginTop: 10 }}>{known}</div>
    </div>
  );
};

const EndCard: React.FC<{ question: string; frame: number; accent: string }> = ({ question, frame, accent }) => {
  const k = ease(frame, 0, 12);
  return (
    <div style={{ position: "absolute", left: 110, right: 110, top: 640, textAlign: "center", opacity: k }}>
      <div style={{ width: 120, height: 10, margin: "0 auto 40px", backgroundColor: accent, borderRadius: 5 }} />
      <div style={{ fontFamily: NAME_FONT, fontWeight: 900, fontSize: 84, lineHeight: 1.2, color: INK.ink }}>{question}</div>
    </div>
  );
};

/**
 * Nhạc nền theo đoạn (projects/doan-xem/tools/make_music.py): cùng tiếng đàn và motif của nhạc hiệu.
 * Tự hạ nhỏ khi có lời đọc (còn DUCK của mức gốc), nhỏ dần / to dần FADE giây ở hai đầu đoạn.
 */
const DUCK = 0.35;
const FADE = 0.6;
type MusicPart = { name: string; file: string; from: number; to: number; base: number; loop: boolean };

const MusicBed: React.FC<{ part: MusicPart; spoken: { start: number; seconds: number }[]; fps: number }> = ({ part, spoken, fps }) => {
  const frames = Math.max(1, Math.round((part.to - part.from) * fps));
  const volume = (fr: number) => {
    const t = part.from + fr / fps;
    // khoảng cách tới câu đang / sắp đọc gần nhất: 0 khi đang đọc, tới 0,3 giây thì to lại hẳn
    let gap = Infinity;
    for (const s of spoken) {
      const a = s.start - 0.15;
      const b = s.start + s.seconds + 0.05;
      gap = Math.min(gap, t < a ? a - t : t > b ? t - b : 0);
    }
    // Tiếng một lần (lật đáp án, thẻ cuối) là điểm nhấn: không vào nhỏ dần, hạ nhỏ ít hơn.
    const floor = part.loop ? DUCK : 0.7;
    const duck = floor + (1 - floor) * Math.min(1, gap / 0.3);
    const edge = Math.min(1, part.loop ? (t - part.from) / FADE : 1, (part.to - t) / FADE);
    return part.base * duck * Math.max(0, edge);
  };
  return (
    <Sequence from={Math.round(part.from * fps)} durationInFrames={frames} layout="none" name={`nhac-${part.name}`}>
      <Audio src={staticFile(part.file)} loop={part.loop} volume={volume} />
    </Sequence>
  );
};

type Flat = { line: DoanXemLine; beat: number; idx: number; start: number; end: number; next: number; key: string };

const flatten = (episode: DoanXemEpisode, timeline: Timeline): Flat[] => {
  const out: Flat[] = [];
  timeline.lines.forEach((lt, i) => {
    const nextStart = timeline.lines[i + 1]?.start ?? timeline.beats[lt.beat].end;
    out.push({
      line: episode.beats[lt.beat].lines[lt.line],
      beat: lt.beat,
      idx: lt.line,
      start: lt.start,
      end: lt.end,
      next: nextStart,
      key: `${lt.beat}-${lt.line}`,
    });
  });
  return out;
};

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, voice, safeZones = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const timeline = useMemo(() => episodeTimeline(episode, voice), [episode, voice]);
  const flat = useMemo(() => flatten(episode, timeline), [episode, timeline]);
  const f = (s: number) => Math.round(s * fps);
  const t = frame / fps;
  const accent = episode.accent;

  const endStart = durationInFrames - f(endCardTiming(episode.question).total);
  const inEnd = frame >= endStart;

  const ai = Math.max(0, flat.findIndex((x, i) => t >= x.start - 0.0001 && (i === flat.length - 1 || t < flat[i + 1].start)));
  const cur = flat[ai] ?? flat[0];
  const prev = ai > 0 ? flat[ai - 1] : null;
  const localFrame = frame - f(cur.start);
  const p = Math.min(1, Math.max(0, (t - cur.start) / Math.max(0.5, cur.next - cur.start)));

  const rv = revealIndex(episode);
  const guess = flat.find((x) => x.beat === rv.beat && x.idx === rv.guessLine);
  const reveal = flat.find((x) => x.beat === rv.beat && x.idx === rv.line);
  const inCountdown = guess ? t >= guess.end && t < guess.end + GUESS_PAUSE : false;
  // Cảnh hỏi riêng: từ lúc hết gợi ý cuối tới khi câu lật đáp án bắt đầu (gồm 3 giây đếm ngược).
  const inAsk = guess ? cur === guess && t >= guess.end : false;
  const askFrame = guess ? frame - f(guess.end) : 0;
  const fromAsk = reveal && guess && cur === reveal && prev === guess;

  // Chấm gợi ý: nhịp mo → 1, thu → 2, chot → 3; khép lại giữ cả 3.
  const beatIdx = cur.beat;
  const lit = Math.min(3, beatIdx + 1);
  const litAt = [0, 1, 2].map((i) => f(timeline.beats[i]?.start ?? 0));

  const cue = timeline.cues.find((c) => t >= c.start && t < c.end);
  const unroll = ease(frame, 0, 16);

  const sfx = (file: string) => hasFile(`sfx/${file}`);
  const music = (name: string) => `music/doan-xem/${name}.wav`;
  const B = timeline.beats;
  const endT = endStart / fps;
  const musicParts: MusicPart[] = [
    { name: "mo", file: music("mo"), from: 2.4, to: B[1].start + 0.4, base: 0.3, loop: true },
    { name: "thu", file: music("thu"), from: B[1].start, to: B[2].start + 0.4, base: 0.3, loop: true },
    ...(guess ? [{ name: "chot", file: music("chot"), from: B[2].start, to: guess.end + 0.3, base: 0.32, loop: true }] : []),
    ...(reveal ? [{ name: "lat", file: music("lat"), from: reveal.start - 0.05, to: reveal.start + 6, base: 0.55, loop: false }] : []),
    { name: "khep", file: music("khep"), from: B[3].start - 0.3, to: endT + 0.5, base: 0.28, loop: true },
    { name: "ket", file: music("ket"), from: endT, to: endT + 6.6, base: 0.55, loop: false },
  ].filter((m) => hasFile(m.file) && m.to > m.from);

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 45%, #3A2C20 0%, #1A130D 100%)" }}>
      {/* giấy */}
      <div
        style={{
          position: "absolute",
          left: SCROLL.left,
          top: SCROLL.top,
          width: SCROLL.right - SCROLL.left,
          height: SCROLL.bottom - SCROLL.top,
          backgroundColor: INK.paper,
          clipPath: `inset(${(1 - unroll) * 50}% 0 ${(1 - unroll) * 50}% 0)`,
        }}
      />
      <div style={{ position: "absolute", inset: 0, opacity: unroll }}>
        {/* tranh: câu trước vẫn vẽ trong lúc câu mới hoà vào */}
        {!inEnd && prev && localFrame < DISSOLVE && !fromAsk ? (
          <LinePicture
            line={prev.line}
            id={`s${prev.key}`}
            p={1}
            frame={frame - f(prev.start)}
            accent={accent}
            opacity={1}
          />
        ) : null}
        {!inEnd ? (
          <LinePicture
            line={cur.line}
            id={`s${cur.key}`}
            p={p}
            frame={localFrame}
            accent={accent}
            opacity={(prev ? ease(localFrame, 0, DISSOLVE) : 1) * (inAsk ? 1 - ease(askFrame, 0, 8) : 1)}
          />
        ) : null}

        <PaperTexture />

        {/* đầu cuộn: chấm gợi ý + tên series */}
        <HintDots lit={inEnd ? 3 : lit} litAt={litAt} frame={frame} accent={accent} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 196, textAlign: "center", fontFamily: NAME_FONT, fontWeight: 700, fontSize: 34, letterSpacing: 6, color: INK.inkSoft }}>
          {SERIES_NAME}
        </div>

        {!inEnd && !inAsk && cur.line.scene.chip ? <Chip key={`c${cur.key}`} text={cur.line.scene.chip} frame={localFrame} /> : null}
        {!inEnd && cur.line.scene.big && !inAsk ? <BigText text={cur.line.scene.big} frame={localFrame} accent={accent} /> : null}

        {inAsk ? (
          <div
            style={{
              position: "absolute",
              left: 110,
              right: 110,
              top: 470,
              textAlign: "center",
              fontFamily: NAME_FONT,
              fontWeight: 900,
              fontSize: 96,
              lineHeight: 1.15,
              color: INK.ink,
              opacity: ease(askFrame, 4, 14),
              transform: `translateY(${(1 - ease(askFrame, 4, 14)) * 20}px)`,
            }}
          >
            Nhân vật này
            <br />
            là ai?
          </div>
        ) : null}
        {inCountdown && guess ? <Countdown frame={askFrame} fps={fps} accent={accent} top={780} /> : null}

        {reveal && t >= reveal.start && !inEnd ? (
          <>
            {episode.portrait === "minh-hoa" && cur === reveal ? (
              <div style={{ position: "absolute", right: 110, top: 300, fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 28, color: INK.inkSoft }}>tranh minh hoạ</div>
            ) : null}
            <Seal frame={frame - f(reveal.start) - 18} name={episode.person} known={episode.known} out={ease(frame, f(reveal.next) - 10, f(reveal.next))} />
          </>
        ) : null}

        {!inEnd && cue && !inCountdown ? <Subtitle text={cue.text} /> : null}
        {inEnd ? <EndCard question={episode.question} frame={frame - endStart} accent={accent} /> : null}
      </div>
      <Rollers />
      {safeZones ? <SafeZones /> : null}

      {timeline.spoken.map((line) => (
        <Sequence key={line.file} from={f(line.start)} layout="none" name={line.file}>
          <Audio src={staticFile(line.file)} />
        </Sequence>
      ))}
      {sfx("nhac-hieu.wav") ? (
        <Sequence from={0} layout="none" name="nhac-hieu">
          <Audio src={staticFile("sfx/nhac-hieu.wav")} volume={0.5} />
        </Sequence>
      ) : null}
      {musicParts.map((m) => (
        <MusicBed key={m.name} part={m} spoken={timeline.spoken} fps={fps} />
      ))}
      {guess && sfx("tich-tac.wav")
        ? [0, 1, 2].map((k) => (
            <Sequence key={`tick${k}`} from={f(guess.end + k)} layout="none" name={`tick-${k}`}>
              <Audio src={staticFile("sfx/tich-tac.wav")} volume={0.7} />
            </Sequence>
          ))
        : null}
      {reveal && sfx("dong-an.wav") ? (
        <Sequence from={f(reveal.start) + 18} layout="none" name="dong-an">
          <Audio src={staticFile("sfx/dong-an.wav")} volume={0.9} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
