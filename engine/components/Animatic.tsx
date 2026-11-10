import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { Cue, TimedBeat } from "../lib/timing.ts";
import { BEAT_STYLE, COLORS, DEFAULT_BEAT_STYLE, SAFE, SPEAKERS } from "./brand.ts";

/** Chân dung minh họa Cụ Đồ: khăn đóng, kính tròn, râu bạc, áo dài the. */
const CuDoPortrait: React.FC<{ talking: boolean; frame: number }> = ({ talking, frame }) => {
  const mouthOpen = talking ? 6 + Math.abs(Math.sin(frame * 0.45)) * 14 : 3;
  const blink = frame % 90 < 4;

  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%">
      {/* Áo dài the */}
      <path d="M35 240 C40 178, 200 178, 205 240 Z" fill="#2B3A55" stroke={COLORS.ink} strokeWidth="8" />
      <path d="M92 182 L120 218 L148 182" fill="none" stroke="#FFF8E7" strokeWidth="7" strokeLinecap="round" />

      {/* Cổ & Khuôn mặt */}
      <rect x="102" y="152" width="36" height="32" rx="12" fill="#F6C89F" stroke={COLORS.ink} strokeWidth="6" />
      <ellipse cx="70" cy="122" rx="12" ry="18" fill="#F6C89F" stroke={COLORS.ink} strokeWidth="6" />
      <ellipse cx="170" cy="122" rx="12" ry="18" fill="#F6C89F" stroke={COLORS.ink} strokeWidth="6" />
      <rect x="72" y="68" width="96" height="96" rx="44" fill="#F6C89F" stroke={COLORS.ink} strokeWidth="7" />

      {/* Khăn đóng truyền thống */}
      <path d="M62 84 C62 42, 178 42, 178 84 Z" fill="#1E1B2E" stroke={COLORS.ink} strokeWidth="7" />
      <path d="M68 68 Q120 52 172 68" fill="none" stroke="#FFD93D" strokeWidth="5" />
      <path d="M64 80 Q120 66 176 80" fill="none" stroke="#FFD93D" strokeWidth="5" />

      {/* Lông mày bạc */}
      <path d="M84 96 Q98 88 110 95" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      <path d="M130 95 Q142 88 156 96" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />

      {/* Kính tròn ông đồ */}
      <circle cx="98" cy="112" r="16" fill="#FFFFFF55" stroke={COLORS.ink} strokeWidth="6" />
      <circle cx="142" cy="112" r="16" fill="#FFFFFF55" stroke={COLORS.ink} strokeWidth="6" />
      <line x1="114" y1="112" x2="126" y2="112" stroke={COLORS.ink} strokeWidth="6" />

      {/* Mắt */}
      {blink ? (
        <>
          <line x1="91" y1="112" x2="105" y2="112" stroke={COLORS.ink} strokeWidth="5" strokeLinecap="round" />
          <line x1="135" y1="112" x2="149" y2="112" stroke={COLORS.ink} strokeWidth="5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="98" cy="112" r="5" fill={COLORS.ink} />
          <circle cx="142" cy="112" r="5" fill={COLORS.ink} />
        </>
      )}

      {/* Miệng nói */}
      <ellipse cx="120" cy="142" rx="12" ry={mouthOpen} fill="#8B1E24" stroke={COLORS.ink} strokeWidth="5" />

      {/* Bộ râu bạc */}
      <path
        d="M92 136 Q120 128 148 136 Q136 146 120 144 Q104 146 92 136 Z"
        fill="#FFFFFF"
        stroke={COLORS.ink}
        strokeWidth="5"
      />
      <path
        d="M100 154 Q120 205 140 154 Z"
        fill="#FFFFFF"
        stroke={COLORS.ink}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Chân dung minh họa Thằng Cháu: cậu bé hiếu động, tóc chỏm, mắt sáng. */
const ThangChauPortrait: React.FC<{ talking: boolean; frame: number }> = ({ talking, frame }) => {
  const mouthOpen = talking ? 7 + Math.abs(Math.sin(frame * 0.5)) * 15 : 4;
  const blink = (frame + 35) % 85 < 4;

  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%">
      {/* Áo thun năng động */}
      <path d="M40 240 C46 182, 194 182, 200 240 Z" fill="#FF6B35" stroke={COLORS.ink} strokeWidth="8" />
      <path d="M94 184 Q120 202 146 184" fill="none" stroke="#FFD93D" strokeWidth="7" strokeLinecap="round" />

      {/* Cổ & Khuôn mặt bầu bĩnh */}
      <rect x="104" y="154" width="32" height="30" rx="10" fill="#FAD2B0" stroke={COLORS.ink} strokeWidth="6" />
      <ellipse cx="66" cy="126" rx="13" ry="16" fill="#FAD2B0" stroke={COLORS.ink} strokeWidth="6" />
      <ellipse cx="174" cy="126" rx="13" ry="16" fill="#FAD2B0" stroke={COLORS.ink} strokeWidth="6" />
      <rect x="70" y="72" width="100" height="94" rx="46" fill="#FAD2B0" stroke={COLORS.ink} strokeWidth="7" />

      {/* Tóc ngố + chỏm tóc tinh nghịch */}
      <path
        d="M66 102 C64 54, 176 54, 174 102 Q145 86 120 92 Q95 86 66 102 Z"
        fill="#1E1B2E"
        stroke={COLORS.ink}
        strokeWidth="7"
      />
      <path d="M116 56 Q128 32 146 46 Q132 56 126 62" fill="#1E1B2E" stroke={COLORS.ink} strokeWidth="7" strokeLinecap="round" />

      {/* Lông mày */}
      <path d="M88 100 Q98 93 108 99" fill="none" stroke={COLORS.ink} strokeWidth="5" strokeLinecap="round" />
      <path d="M132 99 Q142 93 152 100" fill="none" stroke={COLORS.ink} strokeWidth="5" strokeLinecap="round" />

      {/* Mắt to tròn */}
      {blink ? (
        <>
          <line x1="88" y1="116" x2="108" y2="116" stroke={COLORS.ink} strokeWidth="5" strokeLinecap="round" />
          <line x1="132" y1="116" x2="152" y2="116" stroke={COLORS.ink} strokeWidth="5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="98" cy="116" r="9" fill={COLORS.ink} />
          <circle cx="101" cy="113" r="3" fill="#FFFFFF" />
          <circle cx="142" cy="116" r="9" fill={COLORS.ink} />
          <circle cx="145" cy="113" r="3" fill="#FFFFFF" />
        </>
      )}

      {/* Má hồng */}
      <ellipse cx="84" cy="130" rx="8" ry="5" fill="#FF8FA3" opacity="0.7" />
      <ellipse cx="156" cy="130" rx="8" ry="5" fill="#FF8FA3" opacity="0.7" />

      {/* Miệng cười / nói */}
      <ellipse cx="120" cy="142" rx="14" ry={mouthOpen} fill="#D62828" stroke={COLORS.ink} strokeWidth="5" />
    </svg>
  );
};

/**
 * Nền hoạt hình khi chưa có footage quay thật:
 * Hiển thị chân dung Cụ Đồ và Thằng Cháu đối đáp (không hiện text kỹ thuật NHỊP/CẢNH).
 */
export const Animatic: React.FC<{ beat: TimedBeat; cue: Cue | undefined }> = ({
  beat,
  cue,
}) => {
  const frame = useCurrentFrame();
  const style = BEAT_STYLE[beat.kind] ?? DEFAULT_BEAT_STYLE;
  const activeWho = cue?.who;
  const bob = Math.sin(frame * 0.25) * 8;

  const renderAvatar = (who: "CD" | "TC") => {
    const isTalking = activeWho === who;
    const info = SPEAKERS[who];
    return (
      <div
        style={{
          position: "absolute",
          top: 820 + (isTalking ? bob : 0),
          left: who === "CD" ? SAFE.left + 20 : undefined,
          right: who === "TC" ? SAFE.right + 20 : undefined,
          width: 310,
          height: 310,
          borderRadius: 155,
          backgroundColor: info.color,
          border: `10px solid ${COLORS.ink}`,
          boxShadow: isTalking ? `0 14px 0 ${COLORS.ink}` : "none",
          overflow: "hidden",
          scale: isTalking ? "1.06" : "0.88",
          opacity: isTalking || !activeWho ? 1 : 0.55,
        }}
      >
        {who === "CD" ? (
          <CuDoPortrait talking={isTalking} frame={frame} />
        ) : (
          <ThangChauPortrait talking={isTalking} frame={frame} />
        )}
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${style.bg[0]} 0%, ${style.bg[1]} 85%)`,
      }}
    >
      {renderAvatar("CD")}
      {renderAvatar("TC")}
    </AbsoluteFill>
  );
};
