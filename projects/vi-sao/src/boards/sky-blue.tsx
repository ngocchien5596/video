/**
 * Sơ đồ "Vì sao bầu trời màu xanh?" (5 bước, vẽ trong khung 960×350):
 *   0  Mặt trời chiếu ánh nắng trông màu trắng
 *   1  Ánh nắng gồm đủ các màu cầu vồng
 *   2  Ánh nắng đi qua vô số hạt khí li ti
 *   3  Màu xanh bị hạt khí hắt ra khắp nơi, màu đỏ / vàng đi gần như thẳng
 *   4  Nhìn chỗ nào trên trời, mắt cũng gặp ánh sáng xanh
 * Nguồn: NASA Space Place, Royal Museums Greenwich (tán xạ Rayleigh).
 */
import React from "react";
import { COLORS, TEXT_FONT } from "../../../../engine/components/brand.ts";
import type { BoardProps } from "../../../../engine/stage/board.tsx";

const INK = COLORS.ink;
const RAINBOW = ["#E5484D", "#F28C38", "#FFD93D", "#3FA34D", "#3D7BD9", "#4B3FA3", "#8E44AD"];
const BLUE = "#3D7BD9";
const CAPTIONS = [
  "Ánh nắng trông màu trắng…",
  "…nhưng gồm đủ các màu cầu vồng",
  "Ánh nắng đi qua vô số hạt khí li ti",
  "Màu xanh bị hắt văng ra khắp nơi!",
  "Nhìn đâu cũng thấy xanh",
];

/** Vị trí các hạt khí (cố định để mỗi lần xuất giống nhau). */
const MOLECULES = [
  [450, 92], [492, 150], [470, 238], [528, 96], [548, 286], [580, 172], [606, 118], [618, 240],
  [656, 80], [668, 196], [700, 292], [712, 132], [744, 226], [760, 100], [520, 206], [640, 300],
];
/** Hạt khí "hắt" màu xanh ở bước 3, kèm các hướng tia. */
const SCATTER = [
  { at: [492, 150], dirs: [-140, -60, 30, 120] },
  { at: [580, 172], dirs: [-100, -20, 70, 160] },
  { at: [668, 196], dirs: [-120, -40, 50, 140] },
  { at: [606, 118], dirs: [-80, 10, 100, -170] },
];

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const Arrow: React.FC<{ x: number; y: number; angle: number; len: number; color: string }> = ({ x, y, angle, len, color }) => {
  if (len < 4) return null;
  const a = (angle * Math.PI) / 180;
  const ex = x + Math.cos(a) * len;
  const ey = y + Math.sin(a) * len;
  const head = (d: number) => `${ex - Math.cos(a + d) * 14},${ey - Math.sin(a + d) * 14}`;
  return (
    <g stroke={color} strokeWidth="6" strokeLinecap="round" fill={color}>
      <line x1={x} y1={y} x2={ex} y2={ey} />
      <polygon points={`${ex},${ey} ${head(0.5)} ${head(-0.5)}`} strokeWidth="2" />
    </g>
  );
};

export const SkyBlueBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  /** Mức hiện của phần tử thuộc bước k: bước cũ = 1, bước đang chạy = tăng dần, bước sau = 0. */
  const appear = (k: number, delay = 0, dur = 14) => (step > k ? 1 : step === k ? clamp01((stepFrame - delay) / dur) : 0);
  const sunPulse = 1 + Math.sin(frame * 0.12) * 0.04;
  const beamX0 = 160;
  const beamX1 = 410;
  const beamY = 200;

  const white = appear(0, 4);
  const colors = appear(1);
  const air = appear(2);
  const scatter = appear(3, 0, 20);
  const sky = appear(4, 0, 18);

  return (
    <g>
      {/* Nền trời xanh dần ở bước cuối */}
      <rect x="420" y="50" width="540" height="300" rx="24" fill="#8FD3F4" opacity={sky * 0.6} />

      {/* Chú thích bước hiện tại */}
      <text x="480" y="36" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="32" fill={INK}>
        {CAPTIONS[Math.min(step, CAPTIONS.length - 1)]}
      </text>

      {/* Mặt trời */}
      <g transform={`translate(95 ${beamY}) scale(${sunPulse})`}>
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={Math.cos((i * Math.PI) / 6) * 66}
            y1={Math.sin((i * Math.PI) / 6) * 66}
            x2={Math.cos((i * Math.PI) / 6) * 84}
            y2={Math.sin((i * Math.PI) / 6) * 84}
            stroke="#F2B21B"
            strokeWidth="8"
            strokeLinecap="round"
          />
        ))}
        <circle r="56" fill="#FFD93D" stroke={INK} strokeWidth="6" />
      </g>

      {/* Tia nắng trắng (bước 0), rồi tách thành các màu (bước 1) */}
      {white > 0 ? (
        <rect
          x={beamX0}
          y={beamY - 24}
          width={(beamX1 - beamX0) * white}
          height="48"
          rx="10"
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth="5"
          opacity={1 - colors}
        />
      ) : null}
      {colors > 0
        ? RAINBOW.map((c, i) => (
            <rect key={c} x={beamX0} y={beamY - 24 + i * 7} width={(beamX1 - beamX0) * colors} height="7" fill={c} />
          ))
        : null}
      {colors > 0 ? (
        <rect x={beamX0} y={beamY - 24} width={(beamX1 - beamX0) * colors} height="49" fill="none" stroke={INK} strokeWidth="4" rx="4" />
      ) : null}

      {/* Màu đỏ, cam, vàng đi gần như thẳng qua lớp khí (bước 3) */}
      {scatter > 0
        ? RAINBOW.slice(0, 3).map((c, i) => (
            <rect key={c} x={beamX1} y={beamY - 24 + i * 7} width={530 * scatter} height="7" fill={c} opacity="0.9" />
          ))
        : null}

      {/* Hạt khí li ti (bước 2) */}
      {MOLECULES.map(([x, y], i) => {
        const p = clamp01(air * 1.6 - i * 0.04);
        return p > 0 ? (
          <circle key={i} cx={x} cy={y} r={12 * p} fill="#E8F1F8" stroke={INK} strokeWidth="3" />
        ) : null;
      })}

      {/* Màu xanh bị hắt ra khắp nơi (bước 3) */}
      {SCATTER.map(({ at: [x, y], dirs }, i) =>
        dirs.map((d) => <Arrow key={`${i}-${d}`} x={x} y={y} angle={d} len={70 * clamp01(scatter * 1.4 - i * 0.12)} color={BLUE} />),
      )}

      {/* Mắt nhìn lên: ánh xanh từ mọi hướng đi vào mắt (bước 4) */}
      {sky > 0 ? (
        <g opacity={sky}>
          {[
            [606, 118],
            [712, 132],
            [744, 226],
            [668, 196],
          ].map(([x, y]) => (
            <line key={`${x}`} x1={x} y1={y} x2={870} y2={286} stroke={BLUE} strokeWidth="5" strokeDasharray="12 10" />
          ))}
          <g transform="translate(880 296)">
            <ellipse rx="56" ry="32" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
            <circle r="22" fill={BLUE} stroke={INK} strokeWidth="4" />
            <circle r="10" fill={INK} />
            <circle cx="-7" cy="-8" r="5" fill="#FFFFFF" />
          </g>
        </g>
      ) : null}

      {/* Nhãn */}
      <text x="95" y="320" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="26" fill={INK}>
        MẶT TRỜI
      </text>
      {air > 0 ? (
        <text x="600" y="342" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="26" fill={INK} opacity={air}>
          HẠT KHÍ
        </text>
      ) : null}
    </g>
  );
};
