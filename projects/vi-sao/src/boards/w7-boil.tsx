/**
 * Sơ đồ "Nước sôi thì bong bóng ở đâu ra?" (4 bước):
 *   0  Người lớn đun nước: nước sát đáy nồi được hơ nóng trước
 *   1  Đủ nóng, nước ở đáy biến thành hơi nước (nước ở dạng khí)
 *   2  Hơi nước gom thành bong bóng, nổi lên
 *   3  Lên tới mặt nước, bong bóng vỡ, hơi nước thoát ra; rất nóng, đứng xa nồi
 * Nguồn: Ohio State University (Beyond Penguins), University of Maryland (W. Breslyn),
 * Illinois Physics Van, Bigelow Laboratory for Ocean Sciences.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK } from "./common.tsx";
import { Bubble, Flame, SafetyBadge, Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Nước sát đáy nồi nóng lên trước", "Nước ở đáy biến thành hơi nước", "Hơi nước gom thành bong bóng, nổi lên", "Bong bóng vỡ, hơi nước thoát ra"];

const POT = { x0: 160, x1: 520, top: 120, bottom: 300 };
const WATER = 150;
const COLS = [210, 270, 330, 390, 450];

export const BoilBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const hot = appear(0, 2, 20);
  const vapor = appear(1, 0, 18);
  const rise = appear(2, 0, 14);
  const out = appear(3, 0, 14);
  const h = POT.bottom - WATER;

  return (
    <g>
      {/* Lửa bếp */}
      {[230, 340, 450].map((x) => (
        <Flame key={x} x={x} y={348} s={0.8} t={frame + x} />
      ))}

      {/* Nồi và nước */}
      <rect x={POT.x0 - 34} y={POT.top + 20} width={36} height={16} rx={6} fill="#5B5F6B" stroke={INK} strokeWidth="4" />
      <rect x={POT.x1 - 2} y={POT.top + 20} width={36} height={16} rx={6} fill="#5B5F6B" stroke={INK} strokeWidth="4" />
      <rect x={POT.x0} y={POT.top} width={POT.x1 - POT.x0} height={POT.bottom - POT.top} rx={14} fill="#C9CED6" stroke={INK} strokeWidth="6" />
      <rect x={POT.x0 + 12} y={WATER} width={POT.x1 - POT.x0 - 24} height={h - 10} rx={8} fill="#9FD3F5" />
      {/* Đáy nồi đỏ lên khi nóng */}
      <rect x={POT.x0 + 12} y={POT.bottom - 34} width={POT.x1 - POT.x0 - 24} height={24} rx={8} fill="#F28C38" opacity={0.7 * hot} />
      <Tag x={740} y={140} text="ĐÁY NỒI NÓNG TRƯỚC" size={24} color="#C0392B" opacity={hot * (1 - vapor)} />

      {/* Bước 1: túi hơi nước nhỏ ở đáy */}
      {step === 1
        ? COLS.map((x, i) => <Bubble key={x} x={x + (i % 2) * 12} y={POT.bottom - 30} r={6 + 8 * vapor} />)
        : null}
      <Tag x={740} y={140} text="NƯỚC THÀNH HƠI NƯỚC" size={24} opacity={vapor * (1 - rise)} />

      {/* Bước 2–3: bong bóng nổi lên */}
      {step >= 2
        ? COLS.map((x, i) => {
            const t = (stepFrame / 30 + i * 0.21) % 1;
            const y = POT.bottom - 30 - t * (h - 40);
            return <Bubble key={x} x={x + Math.sin(t * 6 + i) * 8} y={y} r={10 + 10 * t} />;
          })
        : null}
      <Tag x={740} y={140} text="BONG BÓNG HƠI NƯỚC" size={24} opacity={rise * (1 - out)} />

      {/* Bước 3: hơi nước thoát ra khỏi mặt nước */}
      {out > 0
        ? COLS.map((x, i) => {
            const t = (stepFrame / 26 + i * 0.3) % 1;
            return (
              <path
                key={x}
                d={`M${x} ${WATER - 8 - t * 50} q-12 -14 0 -28 q12 -14 0 -28`}
                fill="none"
                stroke="#8AA6C2"
                strokeWidth="6"
                strokeLinecap="round"
                opacity={out * (1 - t)}
              />
            );
          })
        : null}
      <Tag x={740} y={140} text="HƠI NƯỚC BAY RA" size={24} opacity={out} />
      <Tag x={740} y={215} text="RẤT NÓNG! ĐỨNG XA NỒI" size={24} color="#C0392B" opacity={out} />
      <SafetyBadge x={740} y={300} text="NGƯỜI LỚN ĐUN BẾP" opacity={hot} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
