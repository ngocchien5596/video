/**
 * Sơ đồ "Vì sao cú quay đầu được rất xa?" (4 bước):
 *   0  Mắt cú rất to nhưng bị giữ chặt, không đảo qua lại được
 *   1  Muốn nhìn sang bên, cú phải quay cả cái đầu
 *   2  Cổ người bảy đốt xương, cổ cú mười bốn đốt
 *   3  Cú quay đầu được khoảng ba phần tư vòng, chưa đủ một vòng
 * Nguồn: WSU College of Veterinary Medicine (Great horned owl: 14 vertebrae vs 7, about 270 degrees, eyes fixed),
 *        University of Illinois Vet Med (Owl Oddities: 270 not 360, eyes do not move).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Mắt cú không đảo qua lại được", "Nên cú phải quay cả cái đầu", "Người 7 đốt cổ, cú 14 đốt", "Quay được khoảng ba phần tư vòng"];

const BROWN = "#9C6B3F";

/** Đầu cú nhìn thẳng; `turn` -1..1 dịch mặt sang trái/phải như đang quay đầu. */
const OwlHead: React.FC<{ x: number; y: number; turn: number }> = ({ x, y, turn }) => {
  const fx = turn * 34;
  return (
    <g transform={`translate(${x} ${y})`} stroke={INK} strokeLinejoin="round">
      <path d="M-70 60 Q-90 -40 -56 -78 L-40 -112 L-16 -80 Q0 -86 16 -80 L40 -112 L56 -78 Q90 -40 70 60 Q0 96 -70 60 Z" fill={BROWN} strokeWidth="6" />
      <g transform={`translate(${fx} 0) scale(${1 - Math.abs(turn) * 0.25} 1)`}>
        <ellipse cx="-30" cy="-14" rx="34" ry="36" fill="#E8D3B0" strokeWidth="4" />
        <ellipse cx="30" cy="-14" rx="34" ry="36" fill="#E8D3B0" strokeWidth="4" />
        <circle cx="-30" cy="-14" r="22" fill="#FFD93D" strokeWidth="4" />
        <circle cx="30" cy="-14" r="22" fill="#FFD93D" strokeWidth="4" />
        <circle cx="-30" cy="-14" r="11" fill={INK} strokeWidth="0" />
        <circle cx="30" cy="-14" r="11" fill={INK} strokeWidth="0" />
        <circle cx="-34" cy="-19" r="4" fill="#FFFFFF" strokeWidth="0" />
        <circle cx="26" cy="-19" r="4" fill="#FFFFFF" strokeWidth="0" />
        <path d="M-10 18 L10 18 L0 40 Z" fill="#F2B21B" strokeWidth="4" />
      </g>
    </g>
  );
};

/** Chồng đốt xương cổ, từ y0 xuống y1. */
const Neck: React.FC<{ x: number; y0: number; y1: number; n: number; color: string; p: number }> = ({ x, y0, y1, n, color, p }) => {
  const h = (y1 - y0) / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) =>
        p * n > i ? (
          <rect key={i} x={x - 30} y={y0 + i * h + 2} width="60" height={h - 4} rx={Math.min(8, h / 3)} fill={color} stroke={INK} strokeWidth="3" />
        ) : null,
      )}
    </g>
  );
};

export const W2OwlBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const lock = appear(0, 8, 14);
  const turnP = appear(1, 0, 20);
  const necks = appear(2, 0, 40);
  const dial = appear(3, 6, 40);
  const turn = step === 1 ? Math.sin(frame * 0.07) * turnP : 0;

  // Vòng quay: ba phần tư vòng (270 độ), bắt đầu từ trên cùng.
  const D = { x: 810, y: 200, r: 92 };
  const end = -90 + 270 * dial;
  const ex = D.x + Math.cos((end * Math.PI) / 180) * D.r;
  const ey = D.y + Math.sin((end * Math.PI) / 180) * D.r;
  const arc = `M${D.x} ${D.y - D.r} A${D.r} ${D.r} 0 ${270 * dial > 180 ? 1 : 0} 1 ${ex} ${ey}`;

  return (
    <g>
      <OwlHead x={170} y={190} turn={turn} />

      {/* Bước 0: mắt bị giữ chặt */}
      <g opacity={step === 0 ? lock : 0}>
        <path d="M100 290 L240 290" stroke="#E5484D" strokeWidth="6" strokeLinecap="round" />
        <path d="M100 290 l14 -10 M100 290 l14 10 M240 290 l-14 -10 M240 290 l-14 10" stroke="#E5484D" strokeWidth="6" strokeLinecap="round" />
        <path d="M150 270 L190 310 M190 270 L150 310" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <Label x={420} y={180} text="MẮT KHÔNG" size={28} color="#C0392B" />
        <Label x={420} y={216} text="ĐẢO ĐƯỢC" size={28} color="#C0392B" />
      </g>
      <Label x={170} y={320} text="QUAY CẢ ĐẦU" opacity={step === 1 ? turnP : 0} size={28} color="#7A4A1E" />

      {/* Bước 2: đốt sống cổ */}
      <g opacity={step >= 2 ? 1 : 0}>
        <Neck x={420} y0={90} y1={290} n={7} color="#F8D2B0" p={necks} />
        <Neck x={560} y0={90} y1={290} n={14} color="#D9B48A" p={Math.max(0, necks * 1.2 - 0.2)} />
        <Label x={420} y={325} text="NGƯỜI: 7" size={24} />
        <Label x={560} y={325} text="CÚ: 14" size={24} color="#7A4A1E" />
      </g>

      {/* Bước 3: ba phần tư vòng */}
      <g opacity={step >= 3 ? 1 : 0}>
        <circle cx={D.x} cy={D.y} r={D.r} fill="none" stroke="#B9B9B9" strokeWidth="10" strokeDasharray="14 12" />
        {dial > 0.01 ? <path d={arc} fill="none" stroke="#F28C38" strokeWidth="14" strokeLinecap="round" /> : null}
        <Label x={D.x} y={D.y - 4} text="BA PHẦN TƯ" size={24} color="#D9531E" />
        <Label x={D.x} y={D.y + 26} text="VÒNG" size={24} color="#D9531E" />
        <Label x={D.x} y={330} text="CHƯA ĐỦ MỘT VÒNG" opacity={dial > 0.95 ? 1 : 0} size={22} />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
