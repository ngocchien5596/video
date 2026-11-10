/**
 * Sơ đồ "Vì sao con bò cứ nhai đi nhai lại mãi?" (4 bước):
 *   0  Bò nhai cỏ rồi nuốt xuống ngăn đầu tiên của dạ dày (dạ dày một cái, bốn ngăn)
 *   1  Ngăn ấy có rất nhiều vi khuẩn li ti, giúp tiêu hoá cỏ cứng
 *   2  Bò ợ phần cỏ tiêu hoá dở lên miệng: miếng nhai lại
 *   3  Nhai thêm lần nữa rồi nuốt xuống tiêu hoá tiếp
 * Nguồn: SDSU Extension (Ruminants: A Digestive Powerhouse), USDA ARS (Rumens Make Cows Special).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Nhai cỏ, nuốt xuống ngăn đầu tiên", "Vi khuẩn li ti giúp tiêu hoá cỏ cứng", "Ợ cỏ tiêu hoá dở lên miệng", "Nhai thêm lần nữa, rồi nuốt xuống"];

const GRASS = "#5DAE4B";
const RUMEN = { x: 470, y: 230 };

/** Con bò nhìn ngang, đầu bên trái; thân để trống để thấy dạ dày bên trong. */
const Cow: React.FC<{ chew: number }> = ({ chew }) => (
  <g stroke={INK} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
    {/* chân */}
    {[330, 380, 600, 650].map((x) => (
      <rect key={x} x={x} y={286} width="26" height="50" rx="8" fill="#FFFFFF" />
    ))}
    {/* thân */}
    <rect x="300" y="140" width="400" height="160" rx="70" fill="#FFFFFF" />
    <path d="M560 150 Q600 190 650 160 Q680 200 690 230 L690 180 Q680 150 640 146 Z" fill={INK} opacity="0.85" />
    <path d="M330 270 Q350 240 390 262 Q370 290 330 280 Z" fill={INK} opacity="0.85" />
    {/* đuôi */}
    <path d="M700 170 Q740 200 726 262" fill="none" />
    {/* cổ + đầu */}
    <path d="M310 190 L236 170 L230 236 L320 250 Z" fill="#FFFFFF" />
    <rect x="150" y="128" width="104" height="96" rx="36" fill="#FFFFFF" />
    <path d="M168 128 L156 100 M236 128 L248 100" />
    <ellipse cx="190" cy={226 + chew * 6} rx="48" ry="22" fill="#F4B6C2" />
    <circle cx="176" cy="226" r="4" fill={INK} />
    <circle cx="204" cy="226" r="4" fill={INK} />
    <circle cx="180" cy="168" r="6" fill={INK} />
    <circle cx="226" cy="168" r="6" fill={INK} />
  </g>
);

export const W2CowBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const swallow = appear(0, 4, 24);
  const bugs = appear(1, 0, 20);
  const up = appear(2, 0, 26);
  const again = appear(3, 0, 20);
  const down = appear(3, 24, 26);
  const chewing = step === 0 || step === 3 ? (Math.sin(frame * 0.5) + 1) / 2 : 0;

  // Viên cỏ đi xuống (bước 0), đi lên (bước 2), xuống lại (bước 3).
  const ballPos = (t: number) => ({ x: 200 + (RUMEN.x - 200) * t, y: 236 + (RUMEN.y - 236) * t - Math.sin(t * Math.PI) * 50 });
  const ball =
    step === 0 ? ballPos(swallow) : step === 2 ? ballPos(1 - up) : step === 3 ? ballPos(down) : ballPos(1);

  return (
    <g>
      {/* Cỏ dưới chân */}
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M${40 + i * 18} 338 l6 -26 l6 26`} fill={GRASS} stroke={INK} strokeWidth="2" />
      ))}

      <Cow chew={chewing} />

      {/* Dạ dày: một cái, bốn ngăn; ngăn đầu tiên to nhất */}
      <g stroke={INK} strokeWidth="4">
        <ellipse cx={RUMEN.x} cy={RUMEN.y} rx="92" ry="52" fill={step >= 1 ? "#CDE8B8" : "#E9F3DD"} />
        <circle cx="584" cy="204" r="22" fill="#F7D9A8" />
        <circle cx="604" cy="246" r="20" fill="#F7D9A8" />
        <ellipse cx="560" cy="276" rx="28" ry="15" fill="#F7D9A8" />
      </g>
      <Label x={RUMEN.x} y={RUMEN.y - 62} text="NGĂN ĐẦU TIÊN" opacity={swallow} size={22} color="#2E7D32" />
      <Label x={845} y={110} text="MỘT DẠ DÀY" opacity={swallow} size={24} />
      <Label x={845} y={140} text="BỐN NGĂN" opacity={swallow} size={24} />

      {/* Bước 1: vi khuẩn li ti */}
      <g opacity={bugs}>
        {Array.from({ length: 16 }, (_, i) => {
          const a = i * 2.4 + frame * 0.03;
          const rr = 20 + (i % 4) * 16;
          return <circle key={i} cx={RUMEN.x + Math.cos(a) * rr * 1.5} cy={RUMEN.y + Math.sin(a) * rr * 0.6} r="4" fill="#7B4FA3" />;
        })}
        <Label x={845} y={200} text="VI KHUẨN" size={26} color="#7B4FA3" />
        <Label x={845} y={230} text="TIÊU HOÁ" size={22} color="#7B4FA3" />
        <Label x={845} y={256} text="CỎ CỨNG" size={22} color="#7B4FA3" />
      </g>

      {/* Viên cỏ */}
      <circle cx={ball.x} cy={ball.y} r="13" fill={GRASS} stroke={INK} strokeWidth="4" />

      {/* Bước 2: ợ lên miệng */}
      <g opacity={step === 2 ? up : step > 2 ? 1 - again : 0}>
        <Arrow x1={RUMEN.x - 60} y1={RUMEN.y - 30} x2={240} y2={200} color="#D9531E" width={6} dashed />
        <Label x={360} y={110} text="Ợ LÊN MIỆNG" size={24} color="#D9531E" />
      </g>

      {/* Bước 3: nhai lại, nuốt xuống */}
      <g opacity={again}>
        <Label x={130} y={90} text="NHAI LẠI!" size={28} color="#C2185B" />
        <Arrow x1={240} y1={214} x2={RUMEN.x - 70} y2={RUMEN.y - 10} color="#2E7D32" width={6} p={down} dashed />
        <Label x={360} y={110} text="NUỐT XUỐNG" opacity={down} size={24} color="#2E7D32" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
