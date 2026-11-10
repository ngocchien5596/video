/**
 * Sơ đồ "Vì sao phi hành gia bay lơ lửng trong tàu vũ trụ?" (4 bước):
 *   0  Ở chỗ trạm vũ trụ bay, sức hút Trái Đất vẫn rất mạnh
 *   1  Trạm bay ngang rất nhanh: vừa rơi vừa trượt vòng qua, không chạm đất
 *   2  Phi hành gia và đồ vật trong trạm cũng rơi cùng lúc
 *   3  Như trò chơi rơi tự do: cùng rơi thì quả bóng trông như lơ lửng
 * Nguồn: NASA (What Is Microgravity? K-4), West Texas A&M (C. Baird: Why is there no gravity in space?).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Kid, Label } from "./common.tsx";

const CAPTIONS = ["Sức hút Trái Đất vẫn rất mạnh", "Vừa rơi, vừa bay vòng qua", "Người và đồ vật cùng rơi", "Cùng rơi: trông như lơ lửng!"];

const E = { x: 250, y: 400, r: 190 };
const ORBIT = 255;

/** Trạm vũ trụ nhỏ: thân + hai tấm pin. */
const Station: React.FC<{ x: number; y: number; angle: number }> = ({ x, y, angle }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <rect x="-46" y="-12" width="30" height="24" fill="#3D7BD9" stroke={INK} strokeWidth="3" />
    <rect x="16" y="-12" width="30" height="24" fill="#3D7BD9" stroke={INK} strokeWidth="3" />
    <rect x="-16" y="-16" width="32" height="32" rx="6" fill="#E8ECF0" stroke={INK} strokeWidth="4" />
  </g>
);

const Ball: React.FC<{ x: number; y: number }> = ({ x, y }) => <circle cx={x} cy={y} r={14} fill="#E5484D" stroke={INK} strokeWidth="4" />;

export const FloatBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const pull = appear(0, 4, 16);
  const fly = appear(1, 0, 70);
  const inside = appear(2, 0, 16);
  const ride = appear(3, 0, 16);

  // Góc của trạm trên quỹ đạo (90° = đỉnh), bước 1 trượt vòng sang phải.
  const deg = step === 0 ? 112 : 112 - fly * 70;
  const a = (deg * Math.PI) / 180;
  const sx = E.x + Math.cos(a) * ORBIT;
  const sy = E.y - Math.sin(a) * ORBIT;
  // Hướng bay ngang (tiếp tuyến) và hướng rơi (về tâm Trái Đất).
  const tx = Math.sin(a);
  const ty = Math.cos(a);
  const dx = (E.x - sx) / ORBIT;
  const dy = (E.y - sy) / ORBIT;

  // Cabin trò chơi rơi tự do (bước 3) rơi xuống rồi lặp lại.
  const fall = ((frame % 50) / 50) * 80;

  return (
    <g>
      {/* Trái Đất to ở dưới bên trái */}
      <circle cx={E.x} cy={E.y} r={E.r} fill="#3D7BD9" stroke={INK} strokeWidth="7" />
      <path d={`M${E.x - 110} ${E.y - 120} q60 -50 120 -10 q-10 50 -100 40 z M${E.x + 40} ${E.y - 150} q50 0 70 40 q-40 10 -70 -40 z`} fill="#6DBE45" />
      <circle cx={E.x} cy={E.y} r={ORBIT} fill="none" stroke={INK} strokeWidth="4" strokeDasharray="12 10" opacity={step >= 1 ? 0.5 : 0} />

      <Station x={sx} y={sy} angle={90 - deg} />
      <Arrow x1={sx + dx * 28} y1={sy + dy * 28} x2={sx + dx * 95} y2={sy + dy * 95} color="#E5484D" width={6} p={pull} />
      <Label x={sx - 40} y={sy - 45} text="SỨC HÚT" opacity={step === 0 ? pull : 0} size={24} color="#C0392B" />
      {step === 1 ? <Arrow x1={sx + tx * 40} y1={sy + ty * 40} x2={sx + tx * 120} y2={sy + ty * 120} color="#2C5FAD" width={6} p={Math.min(1, stepFrame / 14)} /> : null}
      <Label x={700} y={110} text="BAY NGANG RẤT NHANH" opacity={step === 1 ? Math.min(1, stepFrame / 14) : 0} size={24} color="#2C5FAD" />
      <Label x={700} y={300} text="RƠI VÒNG QUANH" opacity={step === 1 ? fly : 0} size={24} color="#C0392B" />

      {/* Bước 2: bên trong trạm, người và quả bóng cùng rơi */}
      <g opacity={step === 2 ? inside : 0}>
        <rect x="600" y="80" width="300" height="230" rx="20" fill="#E8ECF0" stroke={INK} strokeWidth="5" />
        <Kid x={700} y={250} s={1} />
        <Ball x={800} y={170} />
        {[700, 800].map((x) => (
          <Arrow key={x} x1={x} y1={x === 700 ? 262 : 192} x2={x} y2={x === 700 ? 300 : 236} color="#E5484D" width={5} />
        ))}
        <Label x={750} y={115} text="CÙNG RƠI" size={26} color="#C0392B" />
      </g>

      {/* Bước 3: trò chơi rơi tự do, cabin rơi, bóng lơ lửng trước mặt */}
      <g opacity={ride}>
        <rect x="830" y="60" width="26" height="285" fill="#C9D3DC" stroke={INK} strokeWidth="4" />
        <g transform={`translate(0 ${step === 3 ? fall : 0})`}>
          <rect x="620" y="70" width="200" height="150" rx="14" fill="#FFF3B0" stroke={INK} strokeWidth="5" />
          <Kid x={680} y={210} s={0.95} />
          <Ball x={760} y={130} />
        </g>
        <Label x={700} y={335} text="BÓNG LƠ LỬNG!" size={24} color="#C0392B" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
