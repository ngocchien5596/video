/**
 * Khung gọi video: Cụ Đồ ngồi ở nhà, hiện trong màn hình điện thoại ở góc trên bên phải (Moment.call = true).
 * Khi máy quay chọn "CD" thì khung phóng to ra giữa màn hình để Ông kể chuyện; chọn lại "wide" / "TC" thì thu về góc.
 * Vẽ ngoài máy quay của sân khấu nên không bị phóng to theo sân khấu.
 */
import React from "react";
import { interpolate } from "remotion";
import { HEAD_FONT, WARM } from "../components/warm.ts";
import { Puppet, PUPPET_H, PUPPET_W } from "./Character.tsx";
import { FLOOR, SceneBackground } from "./scenes.tsx";
import { LINE } from "./village.tsx";

/** Khung nhỏ ở góc và khung lớn khi Ông kể (toạ độ trên khung 1080×1920). */
const SMALL = { x: 712, y: 300, w: 318, h: 424 };
const LARGE = { x: 150, y: 300, w: 780, h: 1040 };
/** Tỉ lệ con rối và chỗ đứng trong cảnh nhà, giống sân khấu chính, để dùng lại phông "home". */
const SCALE = 1.12;
const PUPPET_X = 540 - (PUPPET_W * SCALE) / 2;
const PUPPET_Y = FLOOR - (PUPPET_H - 14) * SCALE;
/** Vùng cảnh nhà được cắt vào khung: đầu và nửa trên người Cụ Đồ (tỉ lệ 3:4 như khung). */
const VIEW = { x: 540 - 195, y: PUPPET_Y - 20, w: 390, h: 520 };

export type CallPuppet = Omit<React.ComponentProps<typeof Puppet>, "who" | "mirrored" | "role">;

export const CallWindow: React.FC<{
  /** 0 = tắt máy, 1 = đang gọi (bật / tắt có hiệu ứng thu phóng). */
  open: number;
  /** 0 = khung nhỏ ở góc, 1 = khung lớn giữa màn hình. */
  big: number;
  puppet: CallPuppet;
  /** Hiệu ứng trên đầu Cụ Đồ (vẽ theo toạ độ của khung). */
  fx?: (box: { x: number; y: number; w: number; h: number }) => React.ReactNode;
}> = ({ open, big, puppet, fx }) => {
  if (open <= 0.001) return null;
  const lerp = (a: number, b: number) => a + (b - a) * big;
  const box = { x: lerp(SMALL.x, LARGE.x), y: lerp(SMALL.y, LARGE.y), w: lerp(SMALL.w, LARGE.w), h: lerp(SMALL.h, LARGE.h) };
  const s = interpolate(open, [0, 1], [0.2, 1]);
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const r = 28 + 10 * big;
  const bezel = 14 + 4 * big;
  return (
    <g opacity={Math.min(1, open * 1.5)} transform={`translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`}>
      {/* Bóng mềm sau máy */}
      <rect x={box.x - bezel + 10} y={box.y - bezel + 16} width={box.w + 2 * bezel} height={box.h + 2 * bezel} rx={r + bezel} fill={LINE} opacity="0.28" />
      {/* Vỏ điện thoại: nâu trầm, viền nâu đậm, gờ sáng vàng nghệ */}
      <rect x={box.x - bezel} y={box.y - bezel} width={box.w + 2 * bezel} height={box.h + 2 * bezel} rx={r + bezel} fill="#4A2F1E" stroke={LINE} strokeWidth="8" />
      <rect x={box.x - bezel + 6} y={box.y - bezel + 6} width={box.w + 2 * bezel - 12} height={box.h + 2 * bezel - 12} rx={r + bezel - 6} fill="none" stroke={WARM.turmeric} strokeOpacity="0.55" strokeWidth="3" />
      <svg x={box.x} y={box.y} width={box.w} height={box.h} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} preserveAspectRatio="xMidYMid slice">
        <SceneBackground id="home" />
        <g transform={`translate(${PUPPET_X} ${PUPPET_Y}) scale(${SCALE})`}>
          <Puppet who="CD" role={null} mirrored={false} {...puppet} />
        </g>
      </svg>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={r} fill="none" stroke="#2A1A10" strokeWidth="6" />
      {/* Loa thoại trên viền */}
      <rect x={box.x + box.w / 2 - 30 - 10 * big} y={box.y - bezel / 2 - 3} width={60 + 20 * big} height="6" rx="3" fill="#2A1A10" />
      {/* Nhãn cuộc gọi: thẻ giấy dó, chấm đỏ son */}
      <g transform={`translate(${box.x + 14} ${box.y + 14})`}>
        <rect width={140 + 56 * big} height={46 + 10 * big} rx={(46 + 10 * big) / 2} fill={WARM.paper} fillOpacity="0.95" stroke={LINE} strokeWidth="4" />
        <circle cx={26} cy={(46 + 10 * big) / 2} r={9 + 2 * big} fill={WARM.son} stroke={LINE} strokeWidth="3" />
        <text x={46} y={(46 + 10 * big) / 2 + 10 + 3 * big} fontFamily={HEAD_FONT} fontWeight={800} fontSize={28 + 10 * big} fill={LINE}>
          ÔNG
        </text>
      </g>
      {fx?.(box)}
    </g>
  );
};
