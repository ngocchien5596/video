/**
 * Sơ đồ "Vì sao thìa inox sờ vào thấy lạnh hơn thìa gỗ?" (4 bước):
 *   0  Tay ấm hơn không khí trong phòng: hơi ấm từ ngón tay chảy sang thìa
 *   1  Gỗ dẫn hơi ấm chậm: ít mũi tên, chảy từ từ
 *   2  Inox (kim loại) dẫn hơi ấm nhanh: nhiều mũi tên, chảy vèo vèo
 *   3  Ngón tay trên thìa inox nguội nhanh nên thấy lạnh; hai thìa nóng lạnh như nhau; đồ nóng nhờ người lớn
 * Nguồn: Illinois Physics Van, University of Houston (Engines of Our Ingenuity), HyperPhysics (Georgia State University).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, BLUE, Caption, INK, Label } from "./common.tsx";
import { SafetyBadge, Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Tay ấm: hơi ấm chảy sang thìa", "Gỗ dẫn hơi ấm chậm", "Inox dẫn hơi ấm nhanh hơn nhiều", "Tay nguội nhanh nên thấy lạnh"];

const WARM = "#E5484D";
const SPOON_Y = 230;
/** Hai chiếc thìa: inox bên trái, gỗ bên phải. `fx` là chỗ ngón tay chạm. */
const METAL = { x0: 70, x1: 330, fx: 170 };
const WOOD = { x0: 530, x1: 790, fx: 630 };

const Spoon: React.FC<{ x0: number; x1: number; fill: string; shine?: boolean }> = ({ x0, x1, fill, shine = false }) => (
  <g>
    <rect x={x0} y={SPOON_Y - 12} width={x1 - x0} height={24} rx={12} fill={fill} stroke={INK} strokeWidth="5" />
    <ellipse cx={x1 + 50} cy={SPOON_Y} rx={62} ry={40} fill={fill} stroke={INK} strokeWidth="5" />
    {shine ? <path d={`M${x1 + 20} ${SPOON_Y - 18} q25 -12 50 0`} fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" /> : null}
  </g>
);

/** Ngón tay chạm từ trên xuống, đầu ngón ở (x, SPOON_Y - 14). `cold` 0..1 ngả xanh. */
const Finger: React.FC<{ x: number; cold?: number }> = ({ x, cold = 0 }) => (
  <g>
    <rect x={x - 26} y={SPOON_Y - 120} width={52} height={108} rx={26} fill="#F8D2B0" stroke={INK} strokeWidth="5" />
    <rect x={x - 26} y={SPOON_Y - 120} width={52} height={108} rx={26} fill="#9ED8F5" opacity={0.8 * cold} />
    <ellipse cx={x} cy={SPOON_Y - 34} rx={14} ry={10} fill="#FFFFFF" stroke={INK} strokeWidth="3" />
  </g>
);

/** Các chấm hơi ấm chạy từ đầu ngón vào thìa rồi dọc theo thìa; `speed` càng lớn càng nhanh, `n` là số chấm. */
const HeatDots: React.FC<{ x: number; x1: number; frame: number; speed: number; n: number; opacity: number }> = ({ x, x1, frame, speed, n, opacity }) => {
  if (opacity <= 0) return null;
  const len = x1 - x + 80;
  return (
    <g opacity={opacity}>
      {Array.from({ length: n }, (_, i) => {
        const t = ((frame * speed + (i * len) / n) % len) / len;
        const px = x + t * len;
        return <circle key={i} cx={px} cy={SPOON_Y} r={7} fill={WARM} stroke={INK} strokeWidth="2" opacity={1 - t * 0.7} />;
      })}
    </g>
  );
};

export const SpoonBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const intro = appear(0, 2, 16);
  const wood = appear(1, 0, 14);
  const metal = appear(2, 0, 14);
  const final = appear(3, 0, 14);

  return (
    <g>
      <Spoon x0={METAL.x0} x1={METAL.x1} fill="#D9DEE5" shine />
      <Spoon x0={WOOD.x0} x1={WOOD.x1} fill="#C68B4E" />
      <Tag x={METAL.x0 + 230} y={110} text="THÌA INOX" size={24} color="#4A5568" />
      <Tag x={WOOD.x0 + 230} y={110} text="THÌA GỖ" size={24} color="#8B5A2B" />

      <Finger x={METAL.fx} cold={final} />
      <Finger x={WOOD.fx} />

      {/* Bước 0: hơi ấm từ ngón tay (gợn sóng đỏ quanh đầu ngón) */}
      {[METAL.fx, WOOD.fx].map((x) => (
        <g key={x} opacity={intro * (1 - final * (x === METAL.fx ? 1 : 0))}>
          {[-1, 1].map((sd) => (
            <path key={sd} d={`M${x + sd * 40} ${SPOON_Y - 40} q${sd * 8} -10 0 -20 q${-sd * 8} -10 0 -20`} fill="none" stroke={WARM} strokeWidth="5" strokeLinecap="round" />
          ))}
        </g>
      ))}
      <Tag x={480} y={318} text="TAY ẤM HƠN KHÔNG KHÍ" size={22} color={WARM} opacity={intro * (1 - wood)} />

      {/* Bước 1: gỗ dẫn chậm (ít chấm, chạy chậm) */}
      <HeatDots x={WOOD.fx} x1={WOOD.x1} frame={frame} speed={0.6} n={2} opacity={wood} />
      <Tag x={WOOD.x0 + 200} y={318} text="GỖ: DẪN CHẬM" size={22} color="#8B5A2B" opacity={wood * (1 - final)} />

      {/* Bước 2: inox dẫn nhanh (nhiều chấm, chạy nhanh) */}
      <HeatDots x={METAL.fx} x1={METAL.x1} frame={frame} speed={4} n={7} opacity={metal} />
      <Tag x={METAL.x0 + 200} y={318} text="INOX: DẪN NHANH" size={22} color="#4A5568" opacity={metal * (1 - final)} />

      {/* Bước 3: ngón trên thìa inox thấy lạnh */}
      <Label x={METAL.fx - 88} y={SPOON_Y - 60} text="LẠNH!" size={30} color={BLUE} opacity={final} />
      <Tag x={METAL.x0 + 200} y={318} text="NÓNG LẠNH NHƯ NHAU" size={20} opacity={final} />
      <SafetyBadge x={WOOD.x0 + 200} y={318} text="ĐỒ NÓNG: NHỜ NGƯỜI LỚN" opacity={final} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
