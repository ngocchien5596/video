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

/**
 * Câu hỏi móc ở nhịp hook: hiện đủ ngay từ khung hình đầu tiên (không hiệu ứng vào),
 * để người lướt tới thấy ngay video nói về câu gì. Nhịp đặt câu thay bằng TitleCard.
 */
export const HookBanner: React.FC<{ idiom: string; endFrame: number }> = ({ idiom, endFrame }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [endFrame - 6, endFrame], [1, 0], clamp);
  const wobble = Math.sin(frame / 6) * 1.5;

  return (
    <div
      style={{
        position: "absolute",
        top: 290,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        opacity: out,
        rotate: `${-2 + wobble * 0.4}deg`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "6px 22px",
          borderRadius: 14,
          backgroundColor: COLORS.red,
          color: COLORS.white,
          fontFamily: TEXT_FONT,
          fontWeight: 900,
          fontSize: 38,
        }}
      >
        BẠN HIỂU ĐÚNG CÂU NÀY CHƯA?
      </div>
      <div
        style={{
          marginTop: 12,
          padding: "14px 24px",
          backgroundColor: COLORS.idiom,
          border: `8px solid ${COLORS.ink}`,
          borderRadius: 24,
          fontFamily: TITLE_FONT,
          fontSize: 80,
          lineHeight: 1.05,
          color: COLORS.ink,
        }}
      >
        “{idiom}”
      </div>
    </div>
  );
};

/** Khung đánh dấu vùng bị nút / chữ của TikTok và YouTube Shorts che (chỉ để xem trước, không xuất). */
export const SafeZones: React.FC = () => {
  const zone = (style: React.CSSProperties, label: string) => (
    <div
      style={{
        position: "absolute",
        backgroundColor: "rgba(229,72,77,0.28)",
        border: "3px dashed #E5484D",
        color: COLORS.white,
        fontFamily: TEXT_FONT,
        fontWeight: 700,
        fontSize: 26,
        padding: 8,
        ...style,
      }}
    >
      {label}
    </div>
  );
  return (
    <>
      {zone({ top: 0, left: 0, right: 0, height: 150 }, "Thanh trên (Following / For You)")}
      {zone({ top: 860, right: 0, width: 150, bottom: 0 }, "Nút like / bình luận / chia sẻ")}
      {zone({ top: 1520, left: 0, right: 150, bottom: 0 }, "Tên kênh, mô tả, nhạc")}
    </>
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
