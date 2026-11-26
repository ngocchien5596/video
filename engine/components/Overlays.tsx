import React from "react";
import { fitText, measureText } from "@remotion/layout-utils";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Cue } from "../lib/timing.ts";
import { COLORS, outline, SAFE, TEXT_FONT } from "./brand.ts";
import { BAR_FONT, HEAD_FONT, paperCard, plaque, sealStamp, turmericCard, WARM, warmOutline } from "./warm.ts";

/*
 * Thẻ chữ / lớp phủ của ba series sân khấu, phong cách tranh dân gian ấm (giấy dó, gỗ nâu, vàng nghệ, đỏ son):
 * xem engine/components/warm.ts. Vị trí và thời điểm giữ như cũ để không đè mặt nhân vật (docs/chuan-dung-canh.md).
 */

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Bề ngang dành cho tiêu đề trên thanh trên cùng (khung 1080 trừ hai lề an toàn). */
const TITLE_WIDTH = 1080 - SAFE.left - SAFE.right;
/** Dòng nhãn series trên thanh trên cùng: chiều cao biển gỗ (để biết tiêu đề nằm ở đâu). */
const LABEL_H = 48;
/** Khoảng hở giữa biển nhãn và tiêu đề. */
const LABEL_GAP = 6;
const TITLE_LINE = 1.12;
/** Cỡ chữ nhỏ nhất của tiêu đề (đọc được trên điện thoại); dài hơn thì xuống hai dòng. */
const TITLE_MIN = 46;
/** Bề ngang chữ tiêu đề: tới sát lề phải 50px (cột nút của nền tảng chỉ bắt đầu từ y ≈ 860), chừa lề cho dải nền tối. */
const TITLE_TEXT_W = 1080 - SAFE.left - 50 - 28;
/** Tiêu đề trên thanh trên cùng: một dòng, dài quá thì thu nhỏ chữ nhưng không dưới TITLE_MIN (khi đó xuống hai dòng). */
const topTitleSize = (title: string) =>
  Math.max(TITLE_MIN, Math.min(64, Math.floor(fitText({ text: title, withinWidth: TITLE_TEXT_W, fontFamily: BAR_FONT, fontWeight: "800" }).fontSize)));
/** Dải nền nâu tối mờ sau tiêu đề: nổi rõ trên mọi phông (trời kem, tường vôi, cảnh hồi ức xám). `k`: hệ số thu phóng. */
const titleBand = (k: number): React.CSSProperties => ({
  position: "absolute",
  inset: `${-2 * k}px ${-14 * k}px ${-6 * k}px`,
  backgroundColor: "rgba(42,26,16,0.8)",
  border: `${3 * k}px solid ${WARM.ink}`,
  borderRadius: 14 * k,
  boxShadow: `0 ${4 * k}px ${10 * k}px rgba(42,26,16,0.35)`,
});

/** Chữ tiêu đề trên thanh trên cùng: vàng nghệ, viền nâu. */
const titleText = (size: number): React.CSSProperties => ({
  fontFamily: BAR_FONT,
  fontWeight: 800,
  fontSize: size,
  lineHeight: TITLE_LINE,
  maxWidth: TITLE_TEXT_W,
  color: WARM.turmericLight,
});

/** Viền chữ tiêu đề: viền nâu mảnh + bóng nâu đổ xuống (viền dày làm chữ tròn bị bết). `k`: hệ số thu phóng. */
const titleOutline = (k: number): React.CSSProperties => ({ ...warmOutline(6 * k), textShadow: `0 ${3 * k}px 0 ${WARM.ink}` });

/** Nhãn series (tên series, không ghi số tập) trên biển gỗ nhỏ và tiêu đề tập ghim ở đầu khung hình. */
export const TopBar: React.FC<{ label: string; title: string; showTitle: boolean }> = ({ label, title, showTitle }) => (
  <div style={{ position: "absolute", top: SAFE.top, left: SAFE.left, right: SAFE.right }}>
    <div
      style={{
        ...plaque(WARM.wood, 4, 12),
        display: "inline-block",
        boxSizing: "border-box",
        height: LABEL_H,
        padding: "0 18px",
        fontFamily: HEAD_FONT,
        fontWeight: 800,
        fontSize: 32,
        lineHeight: `${LABEL_H - 6}px`,
        letterSpacing: 1,
        ...warmOutline(5),
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
    {showTitle ? (
      // Chữ vàng nghệ viền nâu trên dải nâu tối mờ; một dòng, chỉ tiêu đề rất dài mới xuống hai dòng.
      <div style={{ marginTop: LABEL_GAP, position: "relative", display: "inline-block", ...titleText(topTitleSize(title)) }}>
        <div style={titleBand(1)} />
        <div style={{ position: "relative", ...titleOutline(1) }}>{title}</div>
      </div>
    ) : null}
  </div>
);

/** Màu nhãn tên người nói: Cụ Đồ biển gỗ nâu, Thằng Cháu vàng nghệ (đúng màu áo hai nhân vật). */
const SPEAKER_TAG: Record<Cue["who"], { name: string; style: React.CSSProperties } | null> = {
  CD: { name: "CỤ ĐỒ", style: { ...plaque(WARM.wood, 5, 12), ...warmOutline(4) } },
  TC: { name: "THẰNG CHÁU", style: { ...turmericCard(5, 12), boxShadow: "inset 0 3px 0 rgba(255,240,190,0.75), 0 5px 0 rgba(58,36,22,0.55)" } },
  NARRATOR: null,
};

/** Phụ đề: tên người nói + câu thoại, nằm trong vùng an toàn. `top`: mép trên (mặc định 1262). */
export const Subtitle: React.FC<{ cue: Cue | undefined; top?: number }> = ({ cue, top = 1262 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!cue || !cue.text) {
    return null;
  }
  const tag = SPEAKER_TAG[cue.who];
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
        top,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        fontFamily: TEXT_FONT,
        scale: `${interpolate(pop, [0, 1], [0.92, 1])}`,
      }}
    >
      {tag ? (
        <div
          style={{
            ...tag.style,
            display: "inline-block",
            marginBottom: 10,
            padding: "2px 22px 0",
            fontFamily: TEXT_FONT,
            fontWeight: 900,
            fontSize: 34,
            lineHeight: "48px",
            letterSpacing: 1.5,
          }}
        >
          {tag.name}
        </div>
      ) : null}
      <div
        style={{
          fontWeight: 900,
          fontSize: 66,
          lineHeight: 1.2,
          color: WARM.cream,
          ...warmOutline(11),
          textShadow: `0 5px 0 ${WARM.ink}`,
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};

/** Dòng hỏi nhỏ trên dải đỏ son (ví dụ "CÂU HỎI TƯỞNG DỄ"). */
const Kicker: React.FC<{ children: React.ReactNode; size?: number; rotate?: number }> = ({ children, size = 38, rotate = -2 }) => (
  <div
    style={{
      ...plaque(WARM.son, 5, 14),
      display: "inline-block",
      padding: "2px 24px 0",
      fontFamily: HEAD_FONT,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.3,
      letterSpacing: 1,
      rotate: `${rotate}deg`,
    }}
  >
    {children}
  </div>
);

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
        top: 350,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        opacity: out,
        rotate: `${-2 + wobble * 0.4}deg`,
      }}
    >
      <Kicker>{kicker}</Kicker>
      <div
        style={{
          ...turmericCard(8, 26),
          marginTop: 14,
          padding: "16px 26px 12px",
          fontFamily: HEAD_FONT,
          fontWeight: 800,
          fontSize: 72,
          lineHeight: 1.12,
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

/** Thẻ tiêu đề: dòng nhỏ (ví dụ "#1") + tiêu đề trong khung vàng nghệ. */
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
        top: 360,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        fontFamily: HEAD_FONT,
        fontWeight: 800,
        scale: `${pop}`,
        opacity: out,
        rotate: "-3deg",
      }}
    >
      <div style={{ fontSize: 88, lineHeight: 1.1, color: WARM.cream, ...warmOutline(14) }}>{kicker}</div>
      <div style={{ ...turmericCard(8, 26), marginTop: 14, padding: "18px 26px 12px", fontSize: 84, lineHeight: 1.1 }}>{title}</div>
    </div>
  );
};

/** Số khung hình câu bay từ giữa màn hình lên thanh trên cùng (cuối thẻ IdiomReveal). */
const FLY_FRAMES = 14;
/** Tâm dọc của câu khi đứng giữa màn hình. */
const REVEAL_Y = 520;

/**
 * Thẻ hiện câu sau nhịp đặt câu: dòng hỏi (ví dụ "BẠN HIỂU ĐÚNG CÂU NÀY CHƯA?") + câu trong khung vàng nghệ bật lên ở
 * `startFrame`, đứng yên cho kịp đọc, rồi trong FLY_FRAMES cuối dòng hỏi mờ đi, khung tan, câu thu nhỏ và bay
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
  // Chữ, khung và dòng hỏi đổi dần trong nửa đầu đường bay.
  const boxFade = interpolate(p, [0, 0.5], [1, 0], clamp);

  // Chỗ đến: đúng tiêu đề của TopBar.
  const endSize = topTitleSize(title);
  const endTop = SAFE.top + LABEL_H + LABEL_GAP;
  const endWidth = Math.min(TITLE_TEXT_W, measureText({ text: title, fontFamily: BAR_FONT, fontWeight: "800", fontSize: endSize }).width);
  // Chỗ đi: chữ to giữa màn hình (vừa bề ngang khung, tối đa 86px).
  const startSize = Math.min(96, Math.floor(fitText({ text: title, withinWidth: TITLE_WIDTH - 60, fontFamily: BAR_FONT, fontWeight: "800" }).fontSize));
  const s0 = startSize / endSize;
  const x0 = 540 - (endWidth * s0) / 2 - SAFE.left;
  const y0 = REVEAL_Y - (endSize * TITLE_LINE * s0) / 2 - endTop;
  const scale = interpolate(p, [0, 1], [s0, 1]) * (p > 0 ? 1 : pop);
  const x = interpolate(p, [0, 1], [x0, 0]);
  const y = interpolate(p, [0, 1], [y0, 0]);
  const pad = 22 / scale;
  const card = turmericCard(8 / scale, 24 / scale);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: REVEAL_Y - (endSize * TITLE_LINE * s0) / 2 - 96,
          left: SAFE.left,
          right: SAFE.right,
          textAlign: "center",
          opacity: boxFade,
          scale: `${pop}`,
        }}
      >
        <Kicker size={38}>{kicker}</Kicker>
      </div>
      <div
        style={{
          position: "absolute",
          top: endTop,
          left: SAFE.left,
          transformOrigin: "0 0",
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          ...titleText(endSize),
        }}
      >
        {/* Dải nền tối của TopBar hiện dần khi câu bay tới chỗ. */}
        <div style={{ ...titleBand(1 / scale), opacity: 1 - boxFade }} />
        <div
          style={{
            ...card,
            position: "absolute",
            inset: `${-pad * 0.55}px ${-pad}px`,
            boxShadow: `inset 0 ${4 / scale}px 0 rgba(255,240,190,0.75), 0 ${7 / scale}px 0 ${WARM.woodDark}`,
            opacity: boxFade,
          }}
        />
        {/* Hai lớp chữ chồng khít: chữ nâu trên khung vàng, mờ dần thành chữ vàng viền nâu như TopBar. */}
        <div style={{ position: "relative", opacity: 1 - boxFade, ...titleOutline(1 / scale) }}>{title}</div>
        <div style={{ position: "absolute", inset: 0, color: WARM.ink, opacity: boxFade }}>{title}</div>
      </div>
    </>
  );
};

/** Nhãn nhỏ đầu thẻ giấy (ví dụ "NGHĨA THẬT", "NHIỀU NGƯỜI NGHĨ"). */
const CardLabel: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <div
    style={{
      ...plaque(color, 4, 10),
      display: "inline-block",
      padding: "0 16px",
      fontFamily: HEAD_FONT,
      fontWeight: 800,
      fontSize: 30,
      lineHeight: "40px",
      letterSpacing: 1,
      boxShadow: "inset 0 3px 0 rgba(255,255,255,0.25)",
    }}
  >
    {children}
  </div>
);

/** Con dấu (ví dụ "KHÔNG PHẢI VẬY!") rồi thẻ giấy có nhãn (ví dụ "NGHĨA THẬT"). */
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
    <div style={{ position: "absolute", top: 360, left: SAFE.left, right: SAFE.right, opacity: out }}>
      <div
        style={{
          ...sealStamp(10, 16),
          margin: "0 auto",
          width: "fit-content",
          padding: "6px 28px 0",
          fontWeight: 800,
          fontSize: 84,
          lineHeight: 1.1,
          rotate: "-7deg",
          scale: `${interpolate(pop, [0, 1], [3, 1])}`,
          opacity: pop,
        }}
      >
        {stamp}
      </div>
      <div
        style={{
          ...paperCard(6, 24),
          marginTop: 20,
          padding: "14px 26px 16px",
          fontFamily: TEXT_FONT,
          translate: `0 ${interpolate(card, [0, 1], [60, 0])}px`,
          opacity: card,
        }}
      >
        <CardLabel color={WARM.son}>{label}</CardLabel>
        <div style={{ marginTop: 6, fontWeight: 700, fontSize: 40, lineHeight: 1.25 }}>{body}</div>
      </div>
    </div>
  );
};

/**
 * Câu hỏi kéo bình luận + dòng hẹn tập sau (ví dụ "Mai là câu: ..."), hiện ở giây cuối.
 * `warm`: phong cách giấy dó của ba series sân khấu; bỏ trống thì giữ kiểu cũ (series Kiến thức dùng).
 */
export const EndCard: React.FC<{ question: string; teaser: string | null; startFrame: number; teaserFrame?: number; warm?: boolean }> = ({
  question,
  teaser,
  startFrame,
  teaserFrame,
  warm = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 13 } });
  // Câu hỏi hiện một mình trước cho người xem đọc, dòng "Tiếp theo" hiện sau (teaserFrame, xem endCardTiming).
  const teaserPop = spring({ frame: frame - (teaserFrame ?? startFrame), fps, config: { damping: 14 } });

  const questionStyle: React.CSSProperties = warm
    ? { ...paperCard(7, 28), padding: "26px 30px", fontWeight: 900, fontSize: 52, lineHeight: 1.25 }
    : {
        padding: "24px 26px",
        backgroundColor: COLORS.white,
        border: `6px solid ${COLORS.ink}`,
        borderRadius: 28,
        fontWeight: 900,
        fontSize: 52,
        lineHeight: 1.25,
        color: COLORS.ink,
      };
  const teaserStyle: React.CSSProperties = warm
    ? { ...paperCard(6, 22), padding: "14px 22px", fontSize: 40, lineHeight: 1.25, color: WARM.ink }
    : { color: COLORS.idiom, ...outline(8) };

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
        <div style={questionStyle}>{question}</div>
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
            scale: `${teaserPop}`,
            opacity: Math.min(1, teaserPop * 1.5),
            ...teaserStyle,
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
    <div style={{ position: "absolute", top: 380, left: SAFE.left, right: SAFE.right, opacity: out }}>
      <div
        style={{
          ...paperCard(6, 24),
          padding: "14px 26px 18px",
          fontFamily: TEXT_FONT,
          translate: `0 ${interpolate(card, [0, 1], [60, 0])}px`,
          opacity: card,
        }}
      >
        <CardLabel color={WARM.glaze}>{label}</CardLabel>
        <div style={{ marginTop: 6, fontWeight: 700, fontSize: 44, lineHeight: 1.25 }}>{body}</div>
      </div>
      {frame >= stampFrame ? (
        <div
          style={{
            ...sealStamp(10, 16),
            position: "absolute",
            // Dưới mép thẻ, lệch phải: không che chữ hiểu lầm.
            top: "calc(100% - 26px)",
            right: 10,
            padding: "6px 26px 0",
            fontWeight: 800,
            fontSize: 74,
            lineHeight: 1.1,
            rotate: "-9deg",
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

/** Thẻ ghi nhớ (ví dụ "TÓM LẠI"): biển nhãn màu + một câu chữ to trên giấy dó, hiện ở nửa trên khung hình. */
export const NoteCard: React.FC<{ label: string; body: string; startFrame: number; endFrame: number; color?: string }> = ({
  label,
  body,
  startFrame,
  endFrame,
  color = WARM.leaf,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 12, stiffness: 180 } });
  const out = interpolate(frame, [endFrame - 8, endFrame], [1, 0], clamp);

  return (
    <div
      style={{
        position: "absolute",
        top: 380,
        left: SAFE.left,
        right: SAFE.right,
        textAlign: "center",
        opacity: out,
        scale: `${interpolate(pop, [0, 1], [0.7, 1])}`,
      }}
    >
      <div
        style={{
          ...plaque(color, 6, 16),
          display: "inline-block",
          padding: "4px 30px 0",
          fontFamily: HEAD_FONT,
          fontWeight: 800,
          fontSize: 58,
          lineHeight: 1.25,
          letterSpacing: 1,
          rotate: "-3deg",
          position: "relative",
          zIndex: 1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          ...paperCard(7, 28),
          marginTop: -10,
          padding: "34px 32px 28px",
          fontFamily: TEXT_FONT,
          fontWeight: 900,
          fontSize: 52,
          lineHeight: 1.25,
        }}
      >
        {body}
      </div>
    </div>
  );
};
