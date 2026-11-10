/**
 * Sơ đồ "Nước sông ngọt chảy ra biển, vì sao biển lại mặn?" (4 bước):
 *   0  Nước mưa rơi xuống đất đá, hoà tan từng chút muối
 *   1  Sông suối mang muối ra biển
 *   2  Nước biển bốc hơi thành mây, muối ở lại
 *   3  Rất rất lâu, muối dồn lại: biển mặn
 * Nguồn: NOAA Ocean Service (Why is the ocean salty?), WHOI (What makes the ocean salty?), Ask Dr. Universe (WSU).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, clamp01, CloudShape, Drop, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Mưa hoà tan chút muối trong đá", "Sông mang muối ra biển", "Nước bốc hơi, muối ở lại", "Rất lâu: biển mặn!"];

/** Hạt muối nhỏ (ô vuông trắng). */
const Salt: React.FC<{ x: number; y: number; opacity?: number }> = ({ x, y, opacity = 1 }) =>
  opacity > 0 ? <rect x={x - 6} y={y - 6} width="12" height="12" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" opacity={opacity} transform={`rotate(20 ${x} ${y})`} /> : null;

/** Đường sông từ chân núi ra biển (điểm theo tham số t). */
const RIVER: [number, number][] = [
  [250, 250],
  [330, 280],
  [420, 270],
  [510, 300],
  [600, 300],
];
const riverAt = (t: number): [number, number] => {
  const seg = Math.min(RIVER.length - 2, Math.floor(t * (RIVER.length - 1)));
  const k = t * (RIVER.length - 1) - seg;
  const [x0, y0] = RIVER[seg];
  const [x1, y1] = RIVER[seg + 1];
  return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
};
/** Muối trong biển: tích dần ở bước 3. */
const SEA_SALT: [number, number][] = [
  [650, 300], [700, 320], [750, 296], [800, 326], [850, 304], [900, 322], [680, 336], [780, 336], [880, 338], [720, 278], [830, 280], [910, 290],
];

export const SaltyBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const rain = appear(0, 0, 20);
  const river = appear(1, 0, 20);
  const vapour = appear(2, 0, 20);
  const pile = appear(3, 0, 40);
  const wave = Math.sin(frame * 0.15) * 4;

  return (
    <g>
      {/* Núi đá bên trái, biển bên phải */}
      <path d="M0 340 L0 210 L90 120 L160 170 L230 110 L320 250 L330 340 Z" fill="#A39E98" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d={`M600 290 Q680 ${282 + wave} 760 290 T920 290 L960 290 L960 350 L600 350 Z`} fill="#3D7BD9" stroke={INK} strokeWidth="5" />
      <Label x={860} y={276} text="BIỂN" size={24} />
      <Sun x={905} y={100} r={26} />
      <CloudShape x={140} y={80} s={0.55} fill="#E8ECF0" />

      {/* Bước 0: mưa rơi xuống đá, muối tách ra */}
      {step <= 1
        ? [90, 140, 190].map((x, i) => (
            <g key={x} opacity={rain}>
              <Drop x={x} y={110 + ((frame * 3 + i * 20) % 60)} s={1.2} />
            </g>
          ))
        : null}
      {[[120, 190], [170, 210], [215, 175]].map(([x, y], i) => (
        <Salt key={i} x={x} y={y} opacity={step === 0 ? clamp01(rain * 2 - i * 0.3) : 0} />
      ))}
      <Label x={470} y={140} text="MƯA HOÀ TAN MUỐI" opacity={step === 0 ? rain : 0} size={26} />

      {/* Bước 1: sông mang muối ra biển */}
      <polyline
        points={RIVER.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="#7FC8F8"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={river}
      />
      {step >= 1
        ? [0, 1, 2].map((i) => {
            const [x, y] = riverAt(((frame * 0.012 + i / 3) % 1 + 1) % 1);
            return <Salt key={i} x={x} y={y} opacity={river} />;
          })
        : null}
      <Label x={430} y={225} text="SÔNG" opacity={step === 1 ? river : 0} size={26} color="#2C5FAD" />

      {/* Bước 2: hơi nước bay lên, muối ở lại */}
      {[660, 740, 820].map((x, i) => (
        <path
          key={x}
          d={`M${x} 280 q-12 -26 0 -52 q12 -26 0 -52`}
          fill="none"
          stroke="#7FA8C9"
          strokeWidth="5"
          strokeDasharray="10 9"
          strokeLinecap="round"
          opacity={clamp01(vapour * 1.5 - i * 0.2)}
        />
      ))}
      <Label x={720} y={160} text="HƠI NƯỚC BAY LÊN" opacity={step >= 2 ? vapour : 0} size={22} color="#2C5FAD" />
      {SEA_SALT.slice(0, 4).map(([x, y], i) => (
        <Salt key={i} x={x} y={y} opacity={step >= 2 ? vapour : 0} />
      ))}
      <Label x={470} y={140} text="MUỐI Ở LẠI" opacity={step === 2 ? vapour : 0} size={28} color="#C0392B" />

      {/* Bước 3: muối tích dần */}
      {SEA_SALT.slice(4).map(([x, y], i) => (
        <Salt key={i} x={x} y={y} opacity={clamp01(pile * 1.6 - i * 0.12)} />
      ))}
      <Label x={470} y={140} text="RẤT RẤT LÂU…" opacity={step === 3 ? pile : 0} size={26} />
      <Label x={470} y={180} text="BIỂN MẶN!" opacity={step === 3 ? clamp01(pile * 2 - 1) : 0} size={34} color="#C0392B" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
