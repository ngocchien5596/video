/**
 * Sơ đồ "Vì sao bột bánh mì lại phồng lên?" (4 bước):
 *   0  Men nở: nấm tí hon, mỗi con chỉ một tế bào
 *   1  Men ăn đường, ợ ra khí cacbonic
 *   2  Nhào bột: các sợi đạm kết thành tấm lưới chắc
 *   3  Lưới giữ khí lại thành vô số bong bóng nhỏ → bột phồng lên
 * Nguồn: Ask Dr. Universe (WSU, Breadlab), Colorado State University SOURCE (J. Miller).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK } from "./common.tsx";
import { Bubble, Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Men nở: nấm tí hon, một tế bào", "Men ăn đường, ợ ra khí cacbonic", "Nhào bột: sợi đạm kết thành lưới", "Lưới giữ khí: bột phồng to!"];

const LENS = { x: 230, y: 200, r: 118 };
const DOUGH = { x: 680, y: 240 };
const YEAST = [
  [-45, -30],
  [40, -45],
  [10, 40],
];

const Yeast: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <ellipse cx={x} cy={y} rx={34} ry={26} fill="#F2D49B" stroke={INK} strokeWidth="4" />
    <circle cx={x + 34} cy={y - 14} r={12} fill="#F2D49B" stroke={INK} strokeWidth="3" />
    <circle cx={x - 8} cy={y} r={8} fill="#C89A55" />
  </g>
);

export const BreadBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const zoom = appear(0, 2, 16);
  const eat = appear(1, 0, 20);
  const web = appear(2, 0, 20);
  const rise = appear(3, 0, 30);
  const grow = 1 + 0.35 * rise;
  const loop = (stepFrame % 40) / 40;

  return (
    <g>
      {/* Kính lúp soi men nở */}
      <g opacity={zoom}>
        <circle cx={LENS.x} cy={LENS.y} r={LENS.r} fill="#FFFDF5" stroke={INK} strokeWidth="7" />
        {YEAST.map(([dx, dy], i) => (
          <Yeast key={i} x={LENS.x + dx} y={LENS.y + dy} />
        ))}
        {/* Bước 1: hạt đường đi vào, bong bóng khí đi ra */}
        {step >= 1
          ? YEAST.map(([dx, dy], i) => {
              const t = (loop + i * 0.33) % 1;
              return (
                <g key={`e${i}`} opacity={eat}>
                  <rect x={LENS.x + dx - 60 + 34 * t - 7} y={LENS.y + dy + 22 - 7} width={14} height={14} fill="#FFFFFF" stroke={INK} strokeWidth="3" opacity={1 - t} />
                  <Bubble x={LENS.x + dx + 20 + 20 * t} y={LENS.y + dy - 26 - 30 * t} r={8 + 4 * t} fill="#DCEFFF" />
                </g>
              );
            })
          : null}
        <Tag x={LENS.x} y={LENS.y + LENS.r + 4} text={step >= 1 ? "ĂN ĐƯỜNG, THẢI KHÍ" : "MEN NỞ"} size={22} />
      </g>

      {/* Bước 2–3: cục bột với lưới sợi đạm, phồng lên */}
      {web > 0 ? (
        <g opacity={web} transform={`translate(${DOUGH.x} ${DOUGH.y + 70}) scale(${grow}) translate(${-DOUGH.x} ${-DOUGH.y - 70})`}>
          <path
            d={`M${DOUGH.x - 160} ${DOUGH.y + 70} C${DOUGH.x - 170} ${DOUGH.y - 40} ${DOUGH.x - 60} ${DOUGH.y - 80} ${DOUGH.x} ${DOUGH.y - 78}
              C${DOUGH.x + 70} ${DOUGH.y - 80} ${DOUGH.x + 170} ${DOUGH.y - 40} ${DOUGH.x + 160} ${DOUGH.y + 70} Z`}
            fill="#F7E3B5"
            stroke={INK}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Lưới sợi đạm */}
          {[-100, -50, 0, 50, 100].map((dx) => (
            <path key={`v${dx}`} d={`M${DOUGH.x + dx} ${DOUGH.y - 50 + Math.abs(dx) * 0.3} Q${DOUGH.x + dx + 14} ${DOUGH.y + 5} ${DOUGH.x + dx} ${DOUGH.y + 62}`} fill="none" stroke="#C89A55" strokeWidth="3" />
          ))}
          {[-30, 10, 45].map((dy) => (
            <path key={`h${dy}`} d={`M${DOUGH.x - 140} ${DOUGH.y + dy} Q${DOUGH.x} ${DOUGH.y + dy - 16} ${DOUGH.x + 140} ${DOUGH.y + dy}`} fill="none" stroke="#C89A55" strokeWidth="3" />
          ))}
          {/* Bước 3: bong bóng khí bị giữ trong lưới */}
          {rise > 0
            ? [
                [-90, -10],
                [-40, 30],
                [25, -25],
                [80, 20],
                [-5, 45],
                [110, -15],
                [-120, 40],
              ].map(([dx, dy], i) => (
                <Bubble key={i} x={DOUGH.x + dx} y={DOUGH.y + dy + Math.sin(frame / 8 + i) * 2} r={6 + 8 * rise} fill="#FFFDF5" />
              ))
            : null}
        </g>
      ) : null}
      <Tag x={DOUGH.x} y={110} text="LƯỚI SỢI ĐẠM" size={26} opacity={web * (1 - rise)} color="#8A5A1C" />
      <Tag x={DOUGH.x} y={72} text="GIỮ KHÍ: PHỒNG TO!" size={26} opacity={rise} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
