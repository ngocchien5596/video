/**
 * Sơ đồ "Vành đai của Sao Thổ làm bằng gì?" (4 bước):
 *   0  Sao Thổ có bảy vành đai chính, giữa các vành có khoảng trống
 *   1  Phóng to: vành đai gồm hàng tỉ mẩu băng và đá, không liền một khối
 *   2  Mẩu nhỏ như hạt cát, mẩu to bằng ngôi nhà
 *   3  Tất cả bay vòng quanh Sao Thổ, mỗi vành nhanh chậm khác nhau
 * Nguồn: NASA Space Place (All About Saturn), NASA Science (Saturn Facts), NASA APOD 1996-04-29, University of Oregon (Saturn notes).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Bảy vành đai, có khoảng trống", "Hàng tỉ mẩu băng và đá", "Bé như hạt cát, to bằng ngôi nhà", "Cùng bay vòng quanh Sao Thổ"];

const SAT = { x: 260, y: 205, r: 62 };
const RING_RY = 0.26;
/** Bảy vành chính: [bán kính ngang, màu]; khoảng trống lớn giữa vành thứ 4 và 5. */
const RINGS: [number, string][] = [
  [92, "#C9B79C"],
  [104, "#D8C7A8"],
  [116, "#E6D5B5"],
  [128, "#D9C49E"],
  [152, "#E3D2B0"],
  [164, "#CDBB98"],
  [176, "#E8DCC4"],
];
const GAP_RX = 140;

const upper = (rx: number) => `M${SAT.x - rx} ${SAT.y} A${rx} ${rx * RING_RY} 0 0 1 ${SAT.x + rx} ${SAT.y}`;
const lower = (rx: number) => `M${SAT.x + rx} ${SAT.y} A${rx} ${rx * RING_RY} 0 0 1 ${SAT.x - rx} ${SAT.y}`;

const MAG = { x: 700, y: 185, r: 118 };
/** Mẩu trong kính lúp: [dx, dy, bán kính, băng?]. */
const CHUNKS: [number, number, number, boolean][] = [
  [-80, -50, 9, true], [-50, -78, 6, false], [-15, -60, 11, true], [25, -85, 5, true], [60, -55, 8, false],
  [88, -20, 6, true], [-92, 0, 7, false], [-58, -15, 5, true], [-25, 10, 8, true], [10, -22, 6, false],
  [45, 5, 10, true], [80, 30, 5, false], [-75, 45, 10, true], [-40, 60, 6, false], [-5, 45, 7, true],
  [30, 70, 5, true], [60, 60, 8, false], [-20, 88, 5, true], [15, 95, 4, false], [-95, 25, 4, true],
];

const Chunk: React.FC<{ x: number; y: number; r: number; ice: boolean; opacity?: number }> = ({ x, y, r, ice, opacity = 1 }) => (
  <circle cx={x} cy={y} r={r} fill={ice ? "#EAF6FF" : "#9A9AA6"} stroke={INK} strokeWidth="2.5" opacity={opacity} />
);

/** Ngôi nhà nhỏ để so cỡ. */
const House: React.FC<{ x: number; y: number; s?: number; opacity?: number }> = ({ x, y, s = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <rect x="-22" y="-10" width="44" height="34" fill="#F7C873" stroke={INK} strokeWidth="3.5" />
    <polygon points="-30,-8 0,-34 30,-8" fill="#E5484D" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    <rect x="-6" y="6" width="12" height="18" fill="#8A5A3B" stroke={INK} strokeWidth="2.5" />
  </g>
);

export const SaturnBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const rings = appear(0, 0, 24);
  const zoom = appear(1, 0, 18);
  const sizes = appear(2, 0, 16);
  const orbit = appear(3, 0, 14);
  const zoomed = step >= 1;

  // Bước 3: các mẩu chạy dọc vành, vành trong nhanh hơn.
  const runners = RINGS.flatMap(([rx], i) =>
    [0, 1, 2].map((k) => {
      const speed = 0.05 * (110 / rx) ** 1.5;
      const a = frame * speed + (k * 2 * Math.PI) / 3 + i;
      return { x: SAT.x + Math.cos(a) * rx, y: SAT.y + Math.sin(a) * rx * RING_RY, front: Math.sin(a) > 0, key: `${i}-${k}` };
    }),
  );

  const ringStroke = (rx: number, i: number) => (
    <path key={`u${i}`} d={upper(rx)} fill="none" stroke={RINGS[i][1]} strokeWidth="6" opacity={rings} />
  );

  return (
    <g>
      <rect x="20" y="60" width="920" height="285" rx="24" fill="#1B2440" stroke={INK} strokeWidth="5" />

      {/* Nửa sau của vành. */}
      {RINGS.map(([rx], i) => ringStroke(rx, i))}
      {step >= 3 ? runners.filter((p) => !p.front).map((p) => <circle key={p.key} cx={p.x} cy={p.y} r="4" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" opacity={orbit} />) : null}

      {/* Hành tinh. */}
      <circle cx={SAT.x} cy={SAT.y} r={SAT.r} fill="#E9C46A" stroke={INK} strokeWidth="5" />
      <path d={`M${SAT.x - 58} ${SAT.y - 22} Q${SAT.x} ${SAT.y - 12} ${SAT.x + 58} ${SAT.y - 22}`} fill="none" stroke="#C99A3B" strokeWidth="7" />
      <path d={`M${SAT.x - 60} ${SAT.y + 14} Q${SAT.x} ${SAT.y + 24} ${SAT.x + 60} ${SAT.y + 14}`} fill="none" stroke="#C99A3B" strokeWidth="7" />

      {/* Nửa trước của vành. */}
      {RINGS.map(([rx, color], i) => (
        <path key={`l${i}`} d={lower(rx)} fill="none" stroke={color} strokeWidth="6" opacity={rings} />
      ))}
      {step >= 3 ? runners.filter((p) => p.front).map((p) => <circle key={p.key} cx={p.x} cy={p.y} r="4" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" opacity={orbit} />) : null}

      <Label x={SAT.x} y={100} text="BẢY VÀNH CHÍNH" opacity={appear(0, 10)} size={26} color="#FFD93D" />
      <line x1={SAT.x + 40} y1={SAT.y + GAP_RX * RING_RY + 30} x2={SAT.x + 30} y2={SAT.y + GAP_RX * RING_RY + 4} stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity={appear(0, 22)} />
      <Label x={SAT.x + 40} y={330} text="KHOẢNG TRỐNG" opacity={appear(0, 22)} size={24} color="#FFFFFF" />

      {/* Kính lúp phóng to một mẩu vành. */}
      {zoomed ? (
        <g opacity={zoom}>
          <line x1={SAT.x + 150} y1={SAT.y + 22} x2={MAG.x - MAG.r * 0.92} y2={MAG.y + 40} stroke="#FFFFFF" strokeWidth="4" strokeDasharray="10 8" />
          <circle cx={SAT.x + 150} cy={SAT.y + 22} r="12" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <circle cx={MAG.x} cy={MAG.y} r={MAG.r} fill="#2B3760" stroke="#FFFFFF" strokeWidth="6" />
          {CHUNKS.map(([dx, dy, r, ice], i) => (
            <Chunk key={i} x={MAG.x + dx} y={MAG.y + dy + Math.sin(frame * 0.05 + i) * 2} r={r} ice={ice} opacity={step === 2 ? 1 - sizes * 0.6 : 1} />
          ))}
        </g>
      ) : null}
      <Label x={MAG.x} y={333} text="BĂNG VÀ ĐÁ" opacity={step === 1 || step === 2 ? zoom : 0} size={26} color="#FFFFFF" />

      {/* Bước 2: hạt cát và mẩu to bằng ngôi nhà. */}
      {step >= 2 ? (
        <g opacity={step === 2 ? sizes : 1 - orbit * 0.5}>
          <circle cx={MAG.x - 50} cy={MAG.y - 40} r="3.5" fill="#EAF6FF" stroke="#FFD93D" strokeWidth="2" />
          <circle cx={MAG.x - 50} cy={MAG.y - 40} r="14" fill="none" stroke="#FFD93D" strokeWidth="3" />
          <Chunk x={MAG.x + 40} y={MAG.y + 35} r={36} ice />
          <House x={MAG.x - 40} y={MAG.y + 38} s={1} />
          <line x1={MAG.x - 36} y1={MAG.y - 40} x2={865} y2={110} stroke="#FFD93D" strokeWidth="3" />
          <line x1={MAG.x + 76} y1={MAG.y + 35} x2={850} y2={250} stroke="#FFD93D" strokeWidth="3" />
        </g>
      ) : null}
      <Label x={880} y={102} text="HẠT CÁT" opacity={step === 2 ? sizes : 0} size={22} color="#FFD93D" />
      <Label x={878} y={276} text="NGÔI NHÀ" opacity={step === 2 ? sizes : 0} size={22} color="#FFD93D" />

      <Label x={560} y={333} text="BAY VÒNG QUANH" opacity={step >= 3 ? orbit : 0} size={26} color="#FFD93D" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
