import React from "react";
import { fitText, measureText } from "@remotion/layout-utils";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Cue } from "../lib/timing.ts";
import { COLORS, outline, SAFE, SPEAKERS, TEXT_FONT, TITLE_FONT } from "./brand.ts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Bề ngang dành cho tiêu đề trên thanh trên cùng (khung 1080 trừ hai lề an toàn). */
const TITLE_WIDTH = 1080 - SAFE.left - SAFE.right;
/** Dòng nhãn series trên thanh trên cùng: cỡ chữ và chiều cao dòng (để biết tiêu đề nằm ở đâu). */
const LABEL_SIZE = 40;
const LABEL_LINE = 1.2;
const TITLE_LINE = 1.1;
/** Tiêu đề trên thanh trên cùng luôn một dòng: dài quá thì thu nhỏ chữ. */
const topTitleSize = (title: string) =>
  Math.min(56, Math.floor(fitText({ text: title, withinWidth: TITLE_WIDTH, fontFamily: TITLE_FONT }).fontSize));

/** Nhãn series (ví dụ "TÊN SERIES · #1") và tiêu đề tập ghim ở đầu khung hình. */
export const TopBar: React.FC<{ label: string; title: string; showTitle: boolean }> = ({ label, title, showTitle }) => (
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
    <div style={{ fontSize: LABEL_SIZE, lineHeight: LABEL_LINE, letterSpacing: 2, ...outline(8) }}>
      {label}
    </div>
    {showTitle ? (
      // Tiêu đề luôn nằm trên một dòng: dài quá thì thu nhỏ chữ (dòng thứ hai sẽ đè lên bảng minh hoạ / thẻ chữ).
      <div
        style={{
          fontSize: topTitleSize(title),
          color: COLORS.idiom,
          lineHeight: TITLE_LINE,
          whiteSpace: "nowrap",
          ...outline(10),
        }}
      >
        {title}
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
export const HookBanner: React.FC<{ kicker: string; title: string; endFrame: number }> = ({ kicker, title, endFrame }) => {
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
        {kicker}
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
        {title}
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

/** Thẻ tiêu đề: dòng nhỏ (ví dụ "#1") + tiêu đề trong khung vàng. */
export const TitleCard: React.FC<{ kicker: string; title: string; startFrame: number; endFrame: number }> = ({
  kicker,
  title,
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
      <div style={{ fontSize: 90, color: COLORS.white, ...outline(14) }}>{kicker}</div>
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
        {title}
      </div>
    </div>
  );
};

/** Số khung hình câu bay từ giữa màn hình lên thanh trên cùng (cuối thẻ IdiomReveal). */
const FLY_FRAMES = 14;
/** Tâm dọc của câu khi đứng giữa màn hình. */
const REVEAL_Y = 520;

/**
 * Thẻ hiện câu sau nhịp đặt câu: dòng hỏi (ví dụ "BẠN HIỂU ĐÚNG CÂU NÀY CHƯA?") + câu trong khung vàng bật lên ở
 * `startFrame`, đứng yên cho kịp đọc, rồi trong FLY_FRAMES cuối dòng hỏi mờ đi, khung vàng tan, câu thu nhỏ và bay
 * lên đúng chỗ tiêu đề trên thanh trên cùng. Từ `endFrame` TopBar hiện tiêu đề ở đúng chỗ đó, nên không thấy chỗ nối.
 */
export const IdiomReveal: React.FC<{ kicker: string; title: string; startFrame: number; endFrame: number }> = ({
  kicker,
  title,
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 11, stiffness: 200 } });
  if (frame < startFrame) return null;
  const flyStart = Math.max(startFrame + 6, endFrame - FLY_FRAMES);
  const p = interpolate(frame, [flyStart, endFrame], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  // Chữ, khung vàng và dòng hỏi đổi dần trong nửa đầu đường bay.
  const boxFade = interpolate(p, [0, 0.5], [1, 0], clamp);

  // Chỗ đến: đúng tiêu đề của TopBar.
  const endSize = topTitleSize(title);
  const endTop = SAFE.top + LABEL_SIZE * LABEL_LINE;
  const endWidth = measureText({ text: title, fontFamily: TITLE_FONT, fontSize: endSize }).width;
  // Chỗ đi: chữ to giữa màn hình (vừa bề ngang khung, tối đa 92px).
  const startSize = Math.min(92, Math.floor(fitText({ text: title, withinWidth: TITLE_WIDTH - 60, fontFamily: TITLE_FONT }).fontSize));
  const s0 = startSize / endSize;
  const x0 = 540 - (endWidth * s0) / 2 - SAFE.left;
  const y0 = REVEAL_Y - (endSize * TITLE_LINE * s0) / 2 - endTop;
  const scale = interpolate(p, [0, 1], [s0, 1]) * (p > 0 ? 1 : pop);
  const x = interpolate(p, [0, 1], [x0, 0]);
  const y = interpolate(p, [0, 1], [y0, 0]);
  const pad = 22 / scale;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: REVEAL_Y - (endSize * TITLE_LINE * s0) / 2 - 90,
          left: SAFE.left,
          right: SAFE.right,
          textAlign: "center",
          opacity: boxFade,
          scale: `${pop}`,
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
            fontSize: 40,
            rotate: "-2deg",
          }}
        >
          {kicker}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: endTop,
          left: SAFE.left,
          transformOrigin: "0 0",
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          fontFamily: TITLE_FONT,
          fontSize: endSize,
          lineHeight: TITLE_LINE,
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: `${-pad * 0.6}px ${-pad}px`,
            backgroundColor: COLORS.idiom,
            border: `${8 / scale}px solid ${COLORS.ink}`,
            borderRadius: 24 / scale,
            opacity: boxFade,
          }}
        />
        {/* Hai lớp chữ chồng khít: chữ đen trên khung vàng, mờ dần thành chữ vàng viền đen như TopBar. */}
        <div style={{ position: "relative", color: COLORS.idiom, opacity: 1 - boxFade, ...outline(10 / scale) }}>{title}</div>
        <div style={{ position: "absolute", inset: 0, color: COLORS.ink, opacity: boxFade }}>{title}</div>
      </div>
    </>
  );
};

/** Con dấu (ví dụ "KHÔNG PHẢI VẬY!") rồi thẻ nội dung có nhãn (ví dụ "NGHĨA THẬT"). */
export const StampCard: React.FC<{ stamp: string; label: string; body: string; startFrame: number; endFrame: number }> = ({
  stamp,
  label,
  body,
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 9, stiffness: 240 } });
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
          scale: `${interpolate(pop, [0, 1], [3, 1])}`,
          opacity: pop,
        }}
      >
        {stamp}
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
        <div style={{ fontWeight: 900, fontSize: 34, color: COLORS.red }}>{label}</div>
        <div style={{ marginTop: 6, fontWeight: 700, fontSize: 40, lineHeight: 1.28 }}>{body}</div>
      </div>
    </div>
  );
};

/** Câu hỏi kéo bình luận + dòng hẹn tập sau (ví dụ "Mai là câu: ..."), hiện ở giây cuối. */
export const EndCard: React.FC<{ question: string; teaser: string | null; startFrame: number }> = ({
  question,
  teaser,
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
      {teaser ? (
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
          {teaser}
        </div>
      ) : null}
    </>
  );
};

/**
 * Thẻ bóc hiểu lầm: hiện ngay nội dung hiểu sai (có nhãn, ví dụ "NHIỀU NGƯỜI NGHĨ"),
 * rồi đóng dấu (ví dụ "CHƯA ĐÚNG!") đè lên đúng lúc `stampFrame` (khi có người sửa lại).
 */
export const CorrectionCard: React.FC<{
  label: string;
  body: string;
  stamp: string;
  startFrame: number;
  endFrame: number;
  stampFrame: number;
}> = ({ label, body, stamp, startFrame, endFrame, stampFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = spring({ frame: frame - startFrame, fps, config: { damping: 14 } });
  const pop = spring({ frame: frame - stampFrame, fps, config: { damping: 9, stiffness: 240 } });
  const out = interpolate(frame, [endFrame - 8, endFrame], [1, 0], clamp);

  return (
    <div style={{ position: "absolute", top: 320, left: SAFE.left, right: SAFE.right, opacity: out }}>
      <div
        style={{
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
        <div style={{ fontWeight: 900, fontSize: 34, color: "#3D7BD9" }}>{label}</div>
        <div style={{ marginTop: 6, fontWeight: 700, fontSize: 44, lineHeight: 1.25 }}>{body}</div>
      </div>
      {frame >= stampFrame ? (
        <div
          style={{
            position: "absolute",
            // Dưới mép thẻ, lệch phải: không che chữ hiểu lầm.
            top: "calc(100% - 26px)",
            right: 10,
            padding: "6px 24px",
            border: `10px solid ${COLORS.red}`,
            borderRadius: 18,
            fontFamily: TITLE_FONT,
            fontSize: 88,
            color: COLORS.red,
            backgroundColor: "#FFFFFFEE",
            rotate: "-10deg",
            scale: `${interpolate(pop, [0, 1], [3, 1])}`,
            opacity: pop,
          }}
        >
          {stamp}
        </div>
      ) : null}
    </div>
  );
};

/** Thẻ ghi nhớ (ví dụ "TÓM LẠI"): nhãn màu + một câu chữ to, hiện ở nửa trên khung hình. */
export const NoteCard: React.FC<{ label: string; body: string; startFrame: number; endFrame: number; color?: string }> = ({
  label,
  body,
  startFrame,
  endFrame,
  color = "#3FA34D",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 12, stiffness: 180 } });
  const out = interpolate(frame, [endFrame - 8, endFrame], [1, 0], clamp);

  return (
    <div
      style={{
        position: "absolute",
        top: 320,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        opacity: out,
        scale: `${interpolate(pop, [0, 1], [0.7, 1])}`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 26px",
          borderRadius: 16,
          backgroundColor: color,
          color: COLORS.white,
          fontFamily: TITLE_FONT,
          fontSize: 64,
          border: `6px solid ${COLORS.ink}`,
          rotate: "-3deg",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 18,
          padding: "26px 30px",
          backgroundColor: COLORS.white,
          border: `8px solid ${COLORS.ink}`,
          borderRadius: 28,
          fontFamily: TEXT_FONT,
          fontWeight: 900,
          fontSize: 52,
          lineHeight: 1.25,
          color: COLORS.ink,
        }}
      >
        {body}
      </div>
    </div>
  );
};
