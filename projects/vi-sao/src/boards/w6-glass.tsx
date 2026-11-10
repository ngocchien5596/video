/**
 * Sơ đồ "Vì sao cốc nước đá lại đổ mồ hôi?" (4 bước):
 *   0  Không khí luôn có hơi nước li ti, vô hình
 *   1  Không khí chạm thành cốc lạnh thì bị lạnh đi
 *   2  Hơi nước lạnh đi thì chậm lại, tụm vào nhau thành giọt bám ngoài cốc
 *   3  Trời càng ẩm, càng nhiều hơi nước, cốc càng nhiều giọt
 * Nguồn: NOAA JetStream (Sweatin' to the Coldies), TERC Inquiry Project (Condensation), Ohio State Beyond Penguins (Misconceptions).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, clamp01, Drop, INK, Label } from "./common.tsx";

const CAPTIONS = ["Không khí có hơi nước vô hình", "Chạm cốc lạnh: không khí lạnh đi", "Hơi nước tụm lại thành giọt", "Trời càng ẩm, càng nhiều giọt"];

const G = { x: 480, top: 90, bottom: 330, wTop: 90, wBottom: 70 };

/** Hạt hơi nước: [x, y, pha]. Nửa sau chỉ hiện khi trời ẩm (bước 3). */
const VAPOUR: [number, number, number][] = [
  [120, 110, 0], [200, 200, 1], [140, 290, 2], [300, 140, 3], [330, 260, 4], [250, 320, 5],
  [660, 120, 6], [740, 210, 7], [700, 300, 8], [820, 140, 9], [860, 270, 10], [620, 220, 11],
  [90, 200, 12], [260, 90, 13], [360, 200, 14], [600, 300, 15], [780, 90, 16], [900, 200, 17], [180, 160, 18], [800, 320, 19],
];
/** Giọt nước bám ngoài thành cốc: [bên (-1 trái / 1 phải), độ cao 0..1]. */
const DROPS: [number, number][] = [
  [-1, 0.2], [1, 0.3], [-1, 0.5], [1, 0.6], [-1, 0.8], [1, 0.85],
  [-1, 0.35], [1, 0.15], [-1, 0.65], [1, 0.45], [-1, 0.95], [1, 0.75],
];

export const GlassBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const air = appear(0, 0, 16);
  const cold = appear(1, 0, 18);
  const drops = appear(2, 0, 30);
  const humid = appear(3, 0, 24);

  const edgeX = (side: number, h: number) => G.x + side * (G.wTop - (G.wTop - G.wBottom) * h) + side * 8;
  const vapourCount = step === 3 ? 12 + Math.round(humid * 8) : 12;
  const dropCount = step === 3 ? 6 + Math.round(humid * 6) : 6;

  return (
    <g>
      {/* Nền ẩm dần ở bước 3 */}
      <rect x="20" y="60" width="920" height="285" rx="20" fill="#DDF1FB" opacity={humid * 0.6} />

      {/* Hơi nước vô hình: chấm nét đứt trôi lung tung */}
      {VAPOUR.slice(0, vapourCount).map(([x, y, ph], i) => {
        const near = Math.abs(x - G.x) < 200;
        const slow = near ? 1 - cold * 0.7 : 1;
        const dx = Math.sin(frame * 0.08 * slow + ph) * 14;
        const dy = Math.cos(frame * 0.07 * slow + ph * 1.3) * 12;
        const p = i < 12 ? clamp01(air * 1.5 - i * 0.04) : clamp01(humid * 2 - (i - 12) * 0.1);
        return <circle key={i} cx={x + dx} cy={y + dy} r={11} fill="none" stroke="#5E8DB5" strokeWidth="4" strokeDasharray="5 4" opacity={p} />;
      })}
      <Label x={190} y={75} text="HƠI NƯỚC (VÔ HÌNH)" opacity={step === 0 ? air : 0} size={22} color="#2C5FAD" />

      {/* Quầng lạnh quanh cốc */}
      <ellipse cx={G.x} cy={(G.top + G.bottom) / 2} rx={150} ry={150} fill="#BFE3FF" opacity={cold * 0.45} />
      <Label x={G.x + 160} y={100} text="LẠNH!" opacity={step === 1 ? cold : 0} size={28} color="#2C5FAD" />

      {/* Cốc nước đá */}
      <path
        d={`M${G.x - G.wTop} ${G.top} L${G.x + G.wTop} ${G.top} L${G.x + G.wBottom} ${G.bottom} L${G.x - G.wBottom} ${G.bottom} Z`}
        fill="#FFFFFF"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d={`M${G.x - G.wTop + 9} ${G.top + 50} L${G.x + G.wTop - 9} ${G.top + 50} L${G.x + G.wBottom - 4} ${G.bottom - 4} L${G.x - G.wBottom + 4} ${G.bottom - 4} Z`} fill="#BFE3F7" />
      {[
        [-40, 150, -10],
        [20, 170, 14],
        [-10, 220, 6],
      ].map(([dx, y, r], i) => (
        <rect key={i} x={G.x + dx - 22} y={y - 20} width="44" height="40" rx="6" fill="#F4FBFF" stroke={INK} strokeWidth="3" transform={`rotate(${r} ${G.x + dx} ${y})`} />
      ))}

      {/* Bước 2–3: giọt nước bám ngoài thành cốc */}
      {DROPS.slice(0, dropCount).map(([side, h], i) => {
        const p = i < 6 ? clamp01(drops * 1.6 - i * 0.12) : clamp01(humid * 2 - (i - 6) * 0.15);
        const y = G.top + 20 + h * (G.bottom - G.top - 40);
        return p > 0 ? (
          <g key={i} opacity={p}>
            <Drop x={edgeX(side, (y - G.top) / (G.bottom - G.top))} y={y} s={1.3} />
          </g>
        ) : null;
      })}
      <Label x={G.x + 220} y={200} text="THÀNH GIỌT" opacity={step === 2 ? drops : 0} size={28} color="#2C5FAD" />
      <Label x={G.x + 220} y={160} text="TRỜI ẨM" opacity={humid} size={28} color="#2C5FAD" />
      <Label x={G.x + 220} y={200} text="→ NHIỀU GIỌT" opacity={humid} size={26} color="#2C5FAD" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
