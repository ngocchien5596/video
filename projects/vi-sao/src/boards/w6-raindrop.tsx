/**
 * Sơ đồ "Giọt mưa thật ra có hình gì?" (4 bước):
 *   0  Giọt nước nhỏ tròn xoe, vì nước có "lớp da" (sức căng mặt nước) níu lại
 *   1  Rơi xuống, va vào giọt khác, to dần và rơi nhanh hơn
 *   2  Không khí đẩy ngược lên đáy, đáy dẹt ra như bánh hamburger
 *   3  Giọt to quá phồng như cái dù rồi vỡ thành giọt nhỏ tròn hơn
 * Nguồn: NASA SVS / GPM (Anatomy of a Raindrop), UCAR Center for Science Education (The Shape of Raindrops), Penn State (A. Fraser, Bad Rain).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Giọt nhỏ tròn xoe", "Va nhau, to dần, rơi nhanh", "Không khí đẩy: đáy dẹt ra", "To quá thì vỡ thành giọt nhỏ"];

const WATER = "#7FC8F8";
const SKIN = "#2C5FAD";

/** Giọt "bánh hamburger": nóc tròn, đáy dẹt; flat = 0 tròn, 1 dẹt hẳn. */
const BunDrop: React.FC<{ x: number; y: number; r: number; flat: number }> = ({ x, y, r, flat }) => {
  const by = r * (1 - 0.45 * flat);
  return (
    <path
      d={`M${x - r} ${y} C${x - r} ${y - r * 1.33} ${x + r} ${y - r * 1.33} ${x + r} ${y} C${x + r} ${y + by * 0.9} ${x - r} ${y + by * 0.9} ${x - r} ${y} Z`}
      fill={WATER}
      stroke={INK}
      strokeWidth="5"
    />
  );
};

/** Bánh hamburger nhỏ để so hình. */
const Burger: React.FC<{ x: number; y: number; opacity?: number }> = ({ x, y, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <path d="M-34 0 C-34 -34 34 -34 34 0 Z" fill="#E9A848" stroke={INK} strokeWidth="4" />
    <rect x="-36" y="0" width="72" height="9" rx="4" fill="#3FA34D" stroke={INK} strokeWidth="3" />
    <rect x="-34" y="9" width="68" height="10" rx="4" fill="#8A4B2A" stroke={INK} strokeWidth="3" />
    <path d="M-34 19 H34 Q34 30 24 30 H-24 Q-34 30 -34 19 Z" fill="#E9A848" stroke={INK} strokeWidth="4" />
  </g>
);

export const RaindropBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const round = appear(0, 0, 14);
  const merge = appear(1, 0, 30);
  const flat = appear(2, 0, 26);
  const burst = appear(3, 20, 18);
  const puff = appear(3, 0, 20);
  const bob = Math.sin(frame * 0.12) * 3;

  return (
    <g>
      <rect x="20" y="60" width="920" height="285" rx="24" fill="#EAF4FB" stroke={INK} strokeWidth="5" />
      {[290, 510, 730].map((x) => (
        <line key={x} x1={x} y1={80} x2={x} y2={300} stroke="#C5D6E3" strokeWidth="3" strokeDasharray="8 8" />
      ))}

      {/* Bước 0: giọt nhỏ tròn có "lớp da". */}
      <g opacity={round}>
        <circle cx={150} cy={195 + bob} r={40} fill={WATER} stroke={INK} strokeWidth="5" />
        <circle cx={150} cy={195 + bob} r={50} fill="none" stroke={SKIN} strokeWidth="4" strokeDasharray="6 6" opacity={0.6 + 0.4 * Math.sin(frame * 0.2)} />
        <circle cx={136} cy={180 + bob} r={9} fill="#FFFFFF" opacity="0.8" />
      </g>
      <Label x={150} y={118} text="LỚP DA CỦA NƯỚC" opacity={appear(0, 10)} size={22} color={SKIN} />
      <Label x={150} y={290} text="TRÒN XOE" opacity={appear(0, 18)} size={26} />

      {/* Bước 1: hai giọt nhập thành giọt to, rơi nhanh hơn. */}
      {step >= 1 ? (
        <g>
          <circle cx={400 - 40 * (1 - merge)} cy={150 + 60 * merge} r={26 + 18 * merge} fill={WATER} stroke={INK} strokeWidth="4" />
          <circle cx={400 + 40 * (1 - merge)} cy={130 + 80 * merge} r={22 * (1 - merge)} fill={WATER} stroke={INK} strokeWidth="4" opacity={merge < 0.98 ? 1 : 0} />
          <Arrow x1={475} y1={130} x2={475} y2={260} color="#E5484D" width={6} p={appear(1, 18, 14)} />
        </g>
      ) : null}
      <Label x={400} y={300} text="TO DẦN, RƠI NHANH" opacity={step >= 1 ? appear(1, 24) : 0} size={20} />

      {/* Bước 2: không khí đẩy đáy dẹt ra như bánh hamburger. */}
      {step >= 2 ? (
        <g>
          <BunDrop x={620} y={205} r={56} flat={flat} />
          {[590, 620, 650].map((x, i) => (
            <Arrow key={x} x1={x} y1={286} x2={x} y2={250} color="#8A9BB0" width={5} p={appear(2, 6 + i * 3, 12)} />
          ))}
          <Burger x={620} y={110} opacity={appear(2, 24)} />
        </g>
      ) : null}
      <Label x={620} y={320} text="KHÔNG KHÍ ĐẨY" opacity={step >= 2 ? appear(2, 10) : 0} size={22} color="#5A6B80" />

      {/* Bước 3: phồng như cái dù rồi vỡ thành giọt nhỏ. */}
      {step >= 3 ? (
        burst < 1 ? (
          <g opacity={1 - burst}>
            <path
              d={`M${835 - 50 - 10 * puff} 220 C${835 - 50} ${150 - 20 * puff} ${835 + 50} ${150 - 20 * puff} ${835 + 50 + 10 * puff} 220 C${835 + 30} ${200 - 10 * puff} ${835 - 30} ${200 - 10 * puff} ${835 - 50 - 10 * puff} 220 Z`}
              fill={WATER}
              stroke={INK}
              strokeWidth="5"
            />
          </g>
        ) : null
      ) : null}
      {step >= 3
        ? [
            [-50, 0],
            [-18, -22],
            [18, -10],
            [50, 6],
            [0, 26],
          ].map(([dx, dy], i) => (
            <circle key={i} cx={835 + dx * (0.6 + burst * 0.6)} cy={200 + dy * (0.6 + burst * 0.6) + burst * 30} r={12} fill={WATER} stroke={INK} strokeWidth="3.5" opacity={burst} />
          ))
        : null}
      <Label x={835} y={110} text="NHƯ CÁI DÙ" opacity={step >= 3 ? puff : 0} size={22} />
      <Label x={835} y={300} text="VỠ RA GIỌT NHỎ" opacity={step >= 3 ? burst : 0} size={22} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
