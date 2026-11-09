import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Cue } from "../lib/timing.ts";
import { COLORS, outline, SAFE, SERIES_NAME, SPEAKERS, TEXT_FONT, TITLE_FONT } from "./brand.ts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Nhãn series và câu thành ngữ ghim ở đầu khung hình. */
export const TopBar: React.FC<{ day: number; idiom: string; showIdiom: boolean }> = ({
  day,
  idiom,
  showIdiom,
}) => (
  <div
    style={{
      position: "absolute",
      top: SAFE.top,
      left: SAFE.left,
      right: SAFE.right,
      fontFamily: TITLE_FONT,
      color: COLORS.white,
    }}
  >
    <div style={{ fontSize: 40, letterSpacing: 2, ...outline(8) }}>
      {SERIES_NAME} · NGÀY {day}/30
    </div>
    {showIdiom ? (
      <div style={{ fontSize: 56, color: COLORS.idiom, lineHeight: 1.1, ...outline(10) }}>
        “{idiom}”
      </div>
    ) : null}
  </div>
);

/** Phụ đề: tên người nói + câu thoại, nằm trong vùng an toàn. */
export const Subtitle: React.FC<{ cue: Cue | undefined }> = ({ cue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!cue || !cue.text) {
    return null;
  }
  const speaker = SPEAKERS[cue.who];
  const pop = spring({
    frame: frame - Math.round(cue.start * fps),
    fps,
    config: { damping: 14, stiffness: 260 },
    durationInFrames: 8,
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 1262,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        fontFamily: TEXT_FONT,
        scale: `${interpolate(pop, [0, 1], [0.92, 1])}`,
      }}
    >
      {speaker.name ? (
        <div
          style={{
            display: "inline-block",
            marginBottom: 10,
            padding: "4px 18px",
            borderRadius: 10,
            backgroundColor: speaker.color,
            color: COLORS.ink,
            fontWeight: 900,
            fontSize: 30,
          }}
        >
          {speaker.name}
        </div>
      ) : null}
      <div
        style={{
          fontWeight: 900,
          fontSize: 66,
          lineHeight: 1.2,
          color: COLORS.white,
          ...outline(12),
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};

/** Thẻ tiêu đề "NGÀY X/30" + câu thành ngữ, hiện ở nhịp đặt câu. */
export const TitleCard: React.FC<{ day: number; idiom: string; startFrame: number; endFrame: number }> = ({
  day,
  idiom,
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 11, stiffness: 200 } });
  const out = interpolate(frame, [endFrame - 6, endFrame], [1, 0], clamp);

  return (
    <div
      style={{
        position: "absolute",
        top: 300,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        fontFamily: TITLE_FONT,
        scale: `${pop}`,
        opacity: out,
        rotate: "-3deg",
      }}
    >
      <div style={{ fontSize: 90, color: COLORS.white, ...outline(14) }}>NGÀY {day}/30</div>
      <div
        style={{
          marginTop: 14,
          padding: "18px 26px",
          backgroundColor: COLORS.idiom,
          border: `8px solid ${COLORS.ink}`,
          borderRadius: 24,
          fontSize: 92,
          lineHeight: 1.05,
          color: COLORS.ink,
        }}
      >
        {idiom}
      </div>
    </div>
  );
};

/** Con dấu "KHÔNG PHẢI VẬY!" + thẻ nghĩa thật ở nhịp lật nghĩa. */
export const FlipCard: React.FC<{ meaning: string; startFrame: number; endFrame: number }> = ({
  meaning,
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stamp = spring({ frame: frame - startFrame, fps, config: { damping: 9, stiffness: 240 } });
  const card = spring({ frame: frame - startFrame - 45, fps, config: { damping: 14 } });
  const out = interpolate(frame, [endFrame - 8, endFrame], [1, 0], clamp);

  return (
    <div style={{ position: "absolute", top: 300, left: SAFE.left, right: SAFE.right, opacity: out }}>
      <div
        style={{
          margin: "0 auto",
          width: "fit-content",
          padding: "8px 28px",
          border: `10px solid ${COLORS.red}`,
          borderRadius: 18,
          fontFamily: TITLE_FONT,
          fontSize: 100,
          color: COLORS.red,
          backgroundColor: "#FFFFFFEE",
          rotate: "-8deg",
          scale: `${interpolate(stamp, [0, 1], [3, 1])}`,
          opacity: stamp,
        }}
      >
        KHÔNG PHẢI VẬY!
      </div>
      <div
        style={{
          marginTop: 34,
          padding: "22px 28px",
          backgroundColor: COLORS.paper,
          border: `6px solid ${COLORS.ink}`,
          borderRadius: 24,
          fontFamily: TEXT_FONT,
          color: COLORS.ink,
          translate: `0 ${interpolate(card, [0, 1], [60, 0])}px`,
          opacity: card,
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 34, color: COLORS.red }}>NGHĨA THẬT</div>
        <div style={{ marginTop: 6, fontWeight: 700, fontSize: 40, lineHeight: 1.28 }}>{meaning}</div>
      </div>
    </div>
  );
};

/** Câu hỏi kéo bình luận + câu của ngày mai, hiện ở giây cuối. */
export const EndCard: React.FC<{ question: string; next: string | null; startFrame: number }> = ({
  question,
  next,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 13 } });

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 400,
          left: SAFE.left,
          right: SAFE.right,
          textAlign: "center",
          fontFamily: TEXT_FONT,
          scale: `${pop}`,
        }}
      >
        <div
          style={{
            padding: "24px 26px",
            backgroundColor: COLORS.white,
            border: `6px solid ${COLORS.ink}`,
            borderRadius: 28,
            fontWeight: 900,
            fontSize: 52,
            lineHeight: 1.25,
            color: COLORS.ink,
          }}
        >
          {question}
        </div>
      </div>
      {next ? (
        // Ô thứ 2 tính từ dưới lên khi chia màn hình làm 4 (y 960–1440), đặt trên phần sàn trống.
        <div
          style={{
            position: "absolute",
            top: 1330,
            left: SAFE.left,
            right: SAFE.right,
            translate: "0 -50%",
            textAlign: "center",
            fontFamily: TEXT_FONT,
            fontWeight: 900,
            fontSize: 40,
            color: COLORS.idiom,
            scale: `${pop}`,
            ...outline(8),
          }}
        >
          Mai là câu: “{next}”
        </div>
      ) : null}
    </>
  );
};
