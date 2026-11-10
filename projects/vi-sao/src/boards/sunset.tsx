/**
 * Sơ đồ "Vì sao hoàng hôn lại đỏ cam?" (4 bước):
 *   0  Buổi trưa: mặt trời trên cao, nắng đi quãng ngắn qua lớp không khí
 *   1  Buổi chiều: mặt trời thấp, nắng đi quãng rất dài
 *   2  Dọc đường dài, màu xanh bị hạt khí hắt đi hết
 *   3  Chỉ còn đỏ, cam tới mắt
 * Nguồn: Met Office, Royal Museums Greenwich, NASA Space Place.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, BLUE, Caption, Eye, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Buổi trưa: nắng đi quãng ngắn", "Buổi chiều: nắng đi quãng rất dài", "Dọc đường, màu xanh bị hắt đi hết", "Chỉ còn đỏ, cam tới mắt mình"];

/** Người xem đứng trên mặt đất cong, lớp không khí là dải xanh nhạt phía trên. */
const EYE = { x: 700, y: 300 };

export const SunsetBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const noon = step === 0 ? appear(0, 4, 18) : 0;
  const long = appear(1, 4, 24);
  const scatter = appear(2, 0, 20);
  const red = appear(3, 0, 18);

  return (
    <g>
      {/* Lớp không khí (dải) và mặt đất cong */}
      <path d="M-20 350 Q480 120 980 350 Z" fill={red > 0 ? "#F7C08A" : "#BFE3F7"} opacity={0.55 + red * 0.2} />
      <path d="M-20 350 Q480 230 980 350" fill="#6DBE45" stroke={INK} strokeWidth="6" />
      <Label x={250} y={250} text="LỚP KHÔNG KHÍ" size={22} color="#2C5FAD" />
      <Eye x={EYE.x} y={EYE.y - 18} s={0.8} />

      {/* Bước 0: mặt trời trên cao, đường ngắn */}
      {step === 0 ? (
        <>
          <Sun x={EYE.x} y={70} r={30} />
          <Arrow x1={EYE.x} y1={110} x2={EYE.x} y2={EYE.y - 50} color="#F2B21B" width={8} p={noon} />
          <Label x={EYE.x + 120} y={200} text="NGẮN" opacity={noon} size={30} />
        </>
      ) : null}

      {/* Bước 1–3: mặt trời sát chân trời, đường dài */}
      {step >= 1 ? (
        <>
          <Sun x={60} y={250} r={34} />
          <Arrow x1={110} y1={262} x2={EYE.x - 50} y2={EYE.y - 22} color={red > 0 ? "#F28C38" : "#F2B21B"} width={8} p={long} />
          <Label x={380} y={325} text="DÀI" opacity={long} size={30} />
        </>
      ) : null}

      {/* Bước 2: màu xanh bị hắt văng khỏi đường đi */}
      {[180, 260, 340, 420, 500, 580].map((x, i) => {
        const y = 262 + ((x - 110) / (EYE.x - 160)) * (EYE.y - 284 - 0);
        const p = Math.max(0, Math.min(1, scatter * 1.6 - i * 0.12));
        return <Arrow key={x} x1={x} y1={y} x2={x + (i % 2 ? 30 : -30)} y2={y - 90} color={BLUE} width={5} p={p} />;
      })}
      <Label x={420} y={150} text="XANH BỊ HẮT ĐI" opacity={scatter * (1 - red)} size={24} color={BLUE} />

      {/* Bước 3: đỏ, cam tới mắt */}
      <Label x={EYE.x + 110} y={EYE.y - 70} text="ĐỎ, CAM!" opacity={red} size={34} color="#E5484D" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
