/**
 * Ảnh nhận diện của kênh "Lớp Học Cụ Đồ" (chứa mọi series): ảnh đại diện và ảnh bìa kênh YouTube.
 * Đổi tên kênh / dòng giới thiệu ở CHANNEL_NAME, CHANNEL_TAGLINE rồi xuất lại.
 *
 *   npx remotion still src/index.ts Kenh-AnhDaiDien out/kenh/anh-dai-dien.png
 *   npx remotion still src/index.ts Kenh-BiaYouTube out/kenh/bia-youtube.png
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../engine/components/brand.ts";
import type { Expr } from "../engine/lib/stage-types.ts";
import { Puppet, PUPPET_H, PUPPET_W } from "../engine/stage/Character.tsx";
import { ARM_POSES } from "../engine/stage/poses.ts";

export const CHANNEL_NAME = ["LỚP HỌC", "CỤ ĐỒ"];
export const CHANNEL_TAGLINE = "Mỗi ngày hiểu đúng thêm một điều";

const INK = COLORS.ink;
const BOARD = "#2F5D46";
const WOOD = "#9A6232";
const CHALK = "#F4F1E6";

/** Bảng đen (xanh) khung gỗ của lớp học, có vệt phấn mờ. */
const Chalkboard: React.FC<{ x: number; y: number; w: number; h: number; r?: number }> = ({ x, y, w, h, r = 18 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={r + 10} fill={WOOD} stroke={INK} strokeWidth="10" />
    <rect x={x + 22} y={y + 22} width={w - 44} height={h - 44} rx={r} fill={BOARD} stroke={INK} strokeWidth="6" />
    {/* Vệt phấn lau dở */}
    <path d={`M${x + w * 0.08} ${y + h * 0.3} q${w * 0.1} -${h * 0.06} ${w * 0.2} 0`} stroke={CHALK} strokeOpacity="0.12" strokeWidth="26" fill="none" strokeLinecap="round" />
    <path d={`M${x + w * 0.7} ${y + h * 0.78} q${w * 0.1} -${h * 0.05} ${w * 0.2} 0`} stroke={CHALK} strokeOpacity="0.1" strokeWidth="22" fill="none" strokeLinecap="round" />
  </g>
);
const BG = "radial-gradient(circle at 50% 45%, #5A2E9C 0%, #3B1F6B 40%, #14121F 100%)";

/** Tia nắng toả từ tâm. */
const Burst: React.FC<{ cx: number; cy: number; r: number; core?: number; rays?: number }> = ({ cx, cy, r, core = 0, rays = 20 }) => (
  <g transform={`translate(${cx} ${cy})`}>
    {Array.from({ length: rays }, (_, i) => {
      const a = (i * Math.PI * 2) / rays;
      const b = a + Math.PI / rays;
      return (
        <path
          key={i}
          d={`M0 0 L${Math.cos(a) * r} ${Math.sin(a) * r} L${Math.cos(b) * r} ${Math.sin(b) * r} Z`}
          fill="#FFFFFF"
          opacity="0.08"
        />
      );
    })}
    {core > 0 ? <circle r={core} fill={COLORS.idiom} stroke={INK} strokeWidth="12" /> : null}
  </g>
);

type PuppetLook = { expr: Expr; arms: keyof typeof ARM_POSES; hand: React.ComponentProps<typeof Puppet>["hand"]; tilt: number };

const CD_LOOK: PuppetLook = { expr: "smug", arms: "raise", hand: "fan", tilt: -4 };
const TC_LOOK: PuppetLook = { expr: "confused", arms: "hold2", hand: { id: "book", text: "VỞ GHI" }, tilt: 6 };

const Doll: React.FC<{ who: "CD" | "TC"; look: PuppetLook; mirrored: boolean; talk?: number }> = ({ who, look, mirrored, talk = 0.4 }) => (
  <Puppet
    who={who}
    expr={look.expr}
    arms={ARM_POSES[look.arms]}
    hand={look.hand}
    head={null}
    face={null}
    back={null}
    talk={talk}
    blink={false}
    legSwing={0}
    headTilt={look.tilt}
    mirrored={mirrored}
  />
);

const QuestionMark: React.FC<{ x: number; y: number; size: number }> = ({ x, y, size }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontFamily={TITLE_FONT}
    fontSize={size}
    fill="#7FE3FF"
    stroke={INK}
    strokeWidth={size / 9}
    paintOrder="stroke"
    transform={`rotate(12 ${x} ${y})`}
  >
    ?
  </text>
);

/**
 * Ảnh đại diện 800×800. Nền tảng cắt thành hình tròn và hiện rất nhỏ (cỡ 40px),
 * nên chỉ có hai khuôn mặt to, không chữ; mọi thứ quan trọng nằm trong vòng tròn giữa.
 */
export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill style={{ background: BG }}>
    <svg viewBox="0 0 800 800" width="100%" height="100%">
      <Burst cx={400} cy={430} r={700} />
      <Chalkboard x={95} y={120} w={610} h={470} />
      {/* Chữ phấn trên bảng */}
      <text x={250} y={250} textAnchor="middle" fontFamily={TITLE_FONT} fontSize="84" fill={CHALK} opacity="0.85" transform="rotate(-6 250 250)">
        A B C
      </text>
      {/* Hai con rối phóng to, chỉ thấy đầu và vai */}
      <g transform={`translate(${400 - PUPPET_W * 1.45 + 95} 175) scale(1.45)`}>
        <Doll who="CD" look={{ ...CD_LOOK, arms: "down", hand: null }} mirrored={false} talk={0.5} />
      </g>
      <g transform={`translate(${400 - 75} 215) scale(1.45)`}>
        <Doll who="TC" look={{ ...TC_LOOK, arms: "down", hand: null }} mirrored talk={0.3} />
      </g>
      <QuestionMark x={600} y={250} size={150} />
    </svg>
  </AbsoluteFill>
);

/**
 * Hình mờ video YouTube (Tuỳ chỉnh > Thương hiệu > Hình mờ video): 150×150, PNG nền trong suốt, tối đa 1 MB.
 * Hiện nhỏ ở góc phải dưới khung phát, rê chuột vào thì hiện nút Đăng ký. Chỉ có mặt Cụ Đồ trên tròn vàng, không chữ.
 */
export const ChannelWatermark: React.FC = () => (
  <AbsoluteFill>
    <svg viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <clipPath id="wm-circle">
          <circle cx="150" cy="150" r="138" />
        </clipPath>
      </defs>
      <circle cx="150" cy="150" r="138" fill={COLORS.idiom} />
      <g clipPath="url(#wm-circle)">
        <g transform={`translate(${150 - (PUPPET_W * 0.8) / 2} -22) scale(0.8)`}>
          <Doll who="CD" look={{ ...CD_LOOK, arms: "down", hand: null }} mirrored={false} talk={0.5} />
        </g>
      </g>
      <circle cx="150" cy="150" r="138" fill="none" stroke={INK} strokeWidth="12" />
    </svg>
  </AbsoluteFill>
);

/** Vùng an toàn của ảnh bìa YouTube 2560×1440: chỉ phần giữa 1546×423 hiện trên mọi thiết bị. */
const SAFE_BANNER = { w: 1546, h: 423 };

/**
 * Ảnh bìa kênh YouTube 2560×1440. Tên kênh và hai nhân vật nằm trọn trong vùng an toàn
 * 1546×423 ở giữa (điện thoại chỉ hiện phần này); phần ngoài là nền trang trí.
 */
export const ChannelBanner: React.FC = () => {
  const top = (1440 - SAFE_BANNER.h) / 2;
  const left = (2560 - SAFE_BANNER.w) / 2;
  const s = (SAFE_BANNER.h - 6) / PUPPET_H;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <svg viewBox="0 0 2560 1440" width="100%" height="100%" style={{ position: "absolute" }}>
        <Burst cx={1280} cy={720} r={1600} rays={28} />
        <Chalkboard x={left + PUPPET_W * s - 30} y={top + 6} w={SAFE_BANNER.w - 2 * PUPPET_W * s + 60} h={SAFE_BANNER.h - 40} />
        {/* Bóng dưới chân */}
        <ellipse cx={left + (PUPPET_W * s) / 2} cy={top + SAFE_BANNER.h - 8} rx="120" ry="12" fill="#000000" opacity="0.35" />
        <ellipse cx={left + SAFE_BANNER.w - (PUPPET_W * s) / 2} cy={top + SAFE_BANNER.h - 8} rx="110" ry="12" fill="#000000" opacity="0.35" />
        <g transform={`translate(${left} ${top}) scale(${s})`}>
          <Doll who="CD" look={CD_LOOK} mirrored={false} />
        </g>
        <g transform={`translate(${left + SAFE_BANNER.w - PUPPET_W * s} ${top}) scale(${s})`}>
          <Doll who="TC" look={TC_LOOK} mirrored />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top,
          height: SAFE_BANNER.h,
          left: left + PUPPET_W * s,
          right: left + PUPPET_W * s,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 4,
        }}
      >
        <div style={{ fontFamily: TITLE_FONT, lineHeight: 1.3, rotate: "-3deg", marginTop: -28 }}>
          <div style={{ fontSize: 84, color: CHALK, letterSpacing: 6, ...outline(12) }}>{CHANNEL_NAME[0]}</div>
          <div style={{ fontSize: 132, color: COLORS.idiom, ...outline(16) }}>{CHANNEL_NAME[1]}</div>
        </div>
        <div
          style={{
            padding: "8px 28px",
            borderRadius: 16,
            backgroundColor: COLORS.red,
            border: `5px solid ${INK}`,
            color: COLORS.white,
            fontFamily: TEXT_FONT,
            fontWeight: 900,
            fontSize: 38,
            rotate: "1.5deg",
          }}
        >
          {CHANNEL_TAGLINE}
        </div>
      </div>
    </AbsoluteFill>
  );
};
