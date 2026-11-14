/**
 * Khung gọi video: Cụ Đồ ngồi ở nhà, hiện trong màn hình điện thoại ở góc trên bên phải (Moment.call = true).
 * Khi máy quay chọn "CD" thì khung phóng to ra giữa màn hình để Ông kể chuyện; chọn lại "wide" / "TC" thì thu về góc.
 * Vẽ ngoài máy quay của sân khấu nên không bị phóng to theo sân khấu.
 */
import React from "react";
import { interpolate } from "remotion";
import { COLORS, TEXT_FONT } from "../components/brand.ts";
import { Puppet, PUPPET_H, PUPPET_W } from "./Character.tsx";
import { FLOOR, SceneBackground } from "./scenes.tsx";

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
      {/* Vỏ điện thoại */}
      <rect x={box.x - bezel} y={box.y - bezel} width={box.w + 2 * bezel} height={box.h + 2 * bezel} rx={r + bezel} fill="#222222" stroke={COLORS.ink} strokeWidth="8" />
      <svg x={box.x} y={box.y} width={box.w} height={box.h} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} preserveAspectRatio="xMidYMid slice">
        <SceneBackground id="home" />
        <g transform={`translate(${PUPPET_X} ${PUPPET_Y}) scale(${SCALE})`}>
          <Puppet who="CD" role={null} mirrored={false} {...puppet} />
        </g>
      </svg>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={r} fill="none" stroke="#222222" strokeWidth="6" />
      {/* Nhãn cuộc gọi */}
      <g transform={`translate(${box.x + 16} ${box.y + 16})`}>
        <rect width={150 + 60 * big} height={44 + 10 * big} rx="22" fill="rgba(0,0,0,0.55)" />
        <circle cx={26} cy={(44 + 10 * big) / 2} r={9 + 2 * big} fill="#FF3B30" />
        <text x={46} y={(44 + 10 * big) / 2 + 9 + 3 * big} fontFamily={TEXT_FONT} fontWeight={900} fontSize={26 + 10 * big} fill={COLORS.white}>
          ÔNG
        </text>
      </g>
      {fx?.(box)}
    </g>
  );
};
