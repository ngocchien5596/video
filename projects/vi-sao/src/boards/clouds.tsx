/**
 * Sơ đồ "Vì sao mây trắng mà mây mưa lại đen?" (4 bước):
 *   0  Mây là vô số giọt nước li ti (kính lúp phóng to)
 *   1  Giọt nước hắt đều mọi màu của nắng → vẫn trắng
 *   2  Ánh sáng bị hắt lên trên và sang hai bên → đáy mây ít sáng
 *   3  Mây mưa giọt to hơn → đáy càng tối
 * Nguồn: Met Office (Why are clouds white?), National Weather Service (cloud guide).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, CloudShape, Drop, INK, Label, RAINBOW, Sun } from "./common.tsx";

const CAPTIONS = ["Mây là vô số giọt nước li ti", "Giọt nước hắt đều mọi màu: mây trắng", "Ánh sáng bị hắt lên trên, sang hai bên", "Mây mưa giọt to hơn: đáy càng tối"];

const DROPS = [
  [-50, -40], [-10, -55], [35, -35], [-60, 5], [-20, -10], [25, 5], [60, -5], [-35, 40], [10, 35], [50, 40],
];

export const CloudsBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const lens = appear(0, 4);
  const light = appear(1, 0, 20);
  const bounce = appear(2, 0, 20);
  const rain = appear(3, 0, 18);
  const baseShade = Math.min(1, bounce * 0.5 + rain * 0.5);
  const base = `rgb(${Math.round(255 - baseShade * 150)}, ${Math.round(255 - baseShade * 145)}, ${Math.round(255 - baseShade * 130)})`;

  return (
    <g>
      <Sun x={70} y={95} r={34} />
      <CloudShape x={330} y={200} s={1.25} base={baseShade > 0.02 ? base : undefined} />

      {/* Bước 0: kính lúp phóng to giọt nước */}
      <g opacity={lens}>
        <line x1={420} y1={200} x2={640} y2={190} stroke={INK} strokeWidth="5" strokeDasharray="10 8" />
        <circle cx={760} cy={190} r={115 * (0.6 + lens * 0.4)} fill="#E8F4FC" stroke={INK} strokeWidth="8" />
        {DROPS.map(([dx, dy], i) => (
          <Drop key={i} x={760 + dx * (1 + rain * 0.25)} y={190 + dy} s={1.1 + rain * 1.1} />
        ))}
        <Label x={760} y={335} text={rain > 0.5 ? "GIỌT TO HƠN" : "GIỌT NƯỚC LI TI"} size={22} />
      </g>

      {/* Bước 1: nắng trắng vào mây, hắt ra đủ màu như nhau */}
      <Arrow x1={110} y1={120} x2={230} y2={170} color="#F2B21B" width={8} p={light} />
      {RAINBOW.map((c, i) => {
        const a = (-150 + i * 22) * (Math.PI / 180);
        return <Arrow key={c} x1={330} y1={170} x2={330 + Math.cos(a) * 80} y2={170 + Math.sin(a) * 60} color={c} width={4} p={light * (1 - bounce)} />;
      })}

      {/* Bước 2: ánh sáng hắt lên trên và sang hai bên */}
      {[
        [330, 100, 330, 40],
        [200, 180, 140, 150],
        [460, 180, 530, 150],
        [260, 110, 220, 60],
        [400, 110, 440, 60],
      ].map(([x1, y1, x2, y2], i) => (
        <Arrow key={i} x1={x1} y1={y1} x2={x2} y2={y2} color="#F2B21B" width={6} p={bounce} />
      ))}
      <Label x={330} y={300} text="ĐÁY MÂY: ÍT SÁNG" opacity={bounce} size={22} />

      {/* Bước 3: mưa rơi từ đáy mây */}
      {rain > 0
        ? [250, 290, 330, 370, 410].map((x, i) => (
            <line key={x} x1={x} y1={260} x2={x - 10} y2={260 + 50 * rain} stroke="#3D7BD9" strokeWidth="5" strokeLinecap="round" opacity={0.9 - i * 0.05} />
          ))
        : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
