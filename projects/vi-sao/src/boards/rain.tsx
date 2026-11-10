/**
 * Sơ đồ "Mưa từ đâu ra?" (4 bước, vòng tuần hoàn của nước):
 *   0  Nắng sưởi ấm biển, nước bốc hơi thành hơi nước vô hình bay lên
 *   1  Lên cao lạnh, hơi nước thành giọt li ti bám bụi → mây
 *   2  Giọt nước nhập vào nhau, to dần
 *   3  Nặng quá thì rơi thành mưa, chảy về sông biển
 * Nguồn: Met Office (Rain, Water cycle, Clouds), UCAR (Water cycle).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, CloudShape, Drop, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Nắng làm nước bốc hơi bay lên", "Lên cao lạnh: thành giọt li ti, thành mây", "Các giọt nhập vào nhau, to dần", "Nặng quá thì rơi xuống: mưa!"];

export const RainBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const vapour = appear(0, 4, 20);
  const cloud = appear(1, 0, 18);
  const grow = appear(2, 0, 24);
  const fall = appear(3, 0, 30);
  const wave = Math.sin(frame * 0.2) * 4;

  return (
    <g>
      {/* Biển bên trái, đồi bên phải */}
      <path d={`M0 290 Q60 ${282 + wave} 120 290 T240 290 T360 290 L420 350 L0 350 Z`} fill="#3D7BD9" stroke={INK} strokeWidth="5" />
      <path d="M380 350 Q520 230 700 270 Q820 290 960 250 L960 350 Z" fill="#6DBE45" stroke={INK} strokeWidth="5" />
      <Label x={170} y={335} text="BIỂN" size={24} color="#FFFFFF" />
      <Sun x={70} y={80} r={32} />

      {/* Bước 0: hơi nước vô hình bay lên (nét đứt) */}
      {[120, 210, 300].map((x, i) => (
        <path
          key={x}
          d={`M${x} 280 q-14 -30 0 -60 q14 -30 0 -60`}
          fill="none"
          stroke="#7FA8C9"
          strokeWidth="5"
          strokeDasharray="10 9"
          strokeLinecap="round"
          opacity={Math.max(0, Math.min(1, vapour * 1.5 - i * 0.2))}
        />
      ))}
      <Label x={215} y={130} text="HƠI NƯỚC (VÔ HÌNH)" opacity={vapour} size={22} color="#2C5FAD" />

      {/* Bước 1: mây hình thành trên cao */}
      <g opacity={cloud}>
        <CloudShape x={560} y={110} s={0.95} base={fall > 0 ? "#8C99A6" : undefined} />
        {[[-50, -10], [-15, -30], [25, -12], [60, -25], [-30, 15], [10, 10], [45, 14]].map(([dx, dy], i) => (
          <circle key={i} cx={560 + dx} cy={110 + dy} r={3 + grow * (i % 3 === 0 ? 7 : 2)} fill="#3D7BD9" />
        ))}
      </g>
      <Label x={560} y={185} text="LẠNH → GIỌT LI TI" opacity={step === 1 ? cloud : 0} size={22} />
      <Arrow x1={330} y1={150} x2={450} y2={115} color="#7FA8C9" width={5} p={cloud} dashed />

      {/* Bước 2: giọt to dần (chỉ hiện đúng bước này để không đè nhãn khác) */}
      <Label x={560} y={185} text="GIỌT TO DẦN" opacity={step === 2 ? grow : 0} size={22} />

      {/* Bước 3: mưa rơi xuống đồi rồi chảy về biển */}
      {fall > 0
        ? [500, 540, 580, 620].map((x, i) => (
            <g key={x} opacity={fall}>
              <Drop x={x - 6 * i} y={175 + ((frame * 3 + i * 25) % 90)} s={1.3} />
            </g>
          ))
        : null}
      <Arrow x1={520} y1={300} x2={400} y2={318} color="#3D7BD9" width={6} p={fall} />
      <Label x={760} y={235} text="MƯA!" opacity={fall} size={34} color="#2C5FAD" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
