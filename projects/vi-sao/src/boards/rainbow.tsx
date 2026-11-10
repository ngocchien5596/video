/**
 * Sơ đồ "Vì sao có cầu vồng sau mưa?" (4 bước):
 *   0  Nắng chiếu từ sau lưng, giọt mưa ở phía trước
 *   1  Nắng vào giọt mưa bị bẻ cong, tách thành nhiều màu
 *   2  Dội vào mặt sau giọt nước rồi đi ra về phía mắt
 *   3  Rất nhiều giọt cùng làm vậy → vòng cung nhiều màu
 * Nguồn: Met Office (Rainbows), National Geographic Education (Rainbow).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, Drop, INK, Kid, Label, RAINBOW, Sun } from "./common.tsx";

const CAPTIONS = ["Nắng sau lưng, mưa phía trước", "Vào giọt mưa: bẻ cong, tách màu", "Dội vào mặt sau rồi đi ra", "Nhiều giọt cùng làm: cầu vồng!"];

/** Giọt mưa phóng to ở giữa bảng. */
const D = { x: 520, y: 190, r: 92 };

export const RainbowBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const setup = appear(0, 4);
  const bend = appear(1, 0, 20);
  const back = appear(2, 0, 20);
  const bow = appear(3, 0, 24);
  const zoom = step >= 1 && step <= 2;

  return (
    <g>
      {/* Bước 0 & 3: cảnh toàn: mặt trời sau lưng, bé, mưa phía trước */}
      <g opacity={zoom ? 0.25 : 1}>
        <Sun x={70} y={90} r={30} />
        <Kid x={200} y={320} s={1.1} />
        <Arrow x1={110} y1={110} x2={175} y2={200} color="#F2B21B" width={6} p={setup} />
        {[640, 700, 760, 820, 880, 670, 730, 790, 850].map((x, i) => (
          <Drop key={i} x={x} y={i < 5 ? 220 : 280} s={1} />
        ))}
        <Label x={760} y={335} text="MƯA PHÍA TRƯỚC" opacity={setup * (1 - bow)} size={22} />
        <Label x={110} y={170} text="SAU LƯNG" opacity={setup * (1 - bow)} size={20} />
      </g>

      {/* Bước 1–2: giọt mưa phóng to */}
      {zoom ? (
        <g>
          <circle cx={D.x} cy={D.y} r={D.r} fill="#D8EEFB" stroke={INK} strokeWidth="7" />
          <Arrow x1={250} y1={150} x2={D.x - D.r + 6} y2={D.y - 40} color="#F2B21B" width={8} p={Math.max(bend, 1)} />
          {/* Tách màu bên trong giọt */}
          {[RAINBOW[0], RAINBOW[3], RAINBOW[6]].map((c, i) => (
            <Arrow key={c} x1={D.x - D.r + 8} y1={D.y - 40} x2={D.x + D.r - 12} y2={D.y - 20 + i * 22} color={c} width={5} p={bend} />
          ))}
          {/* Dội ở mặt sau rồi đi ra về phía mắt (bên trái, phía dưới) */}
          {[RAINBOW[0], RAINBOW[3], RAINBOW[6]].map((c, i) => (
            <Arrow key={`b${c}`} x1={D.x + D.r - 12} y1={D.y - 20 + i * 22} x2={D.x - 30} y2={D.y + D.r - 6} color={c} width={5} p={back} />
          ))}
          {[RAINBOW[0], RAINBOW[3], RAINBOW[6]].map((c, i) => (
            <Arrow key={`o${c}`} x1={D.x - 30} y1={D.y + D.r - 6} x2={300 - i * 20} y2={330 - i * 6} color={c} width={5} p={back} />
          ))}
          <Label x={D.x + 190} y={110} text="BẺ CONG" opacity={bend} size={26} />
          <Label x={D.x + 210} y={250} text="DỘI LẠI" opacity={back} size={26} />
        </g>
      ) : null}

      {/* Bước 3: vòng cung cầu vồng phía trước */}
      {bow > 0
        ? RAINBOW.map((c, i) => (
            <path
              key={c}
              d={`M${560 + i * 9} 330 A${200 - i * 9} ${200 - i * 9} 0 0 1 ${960 - i * 9} 330`}
              fill="none"
              stroke={c}
              strokeWidth="9"
              strokeDasharray="700"
              strokeDashoffset={700 * (1 - bow)}
            />
          ))
        : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
