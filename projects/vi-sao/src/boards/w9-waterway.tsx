/**
 * Sơ đồ "Trên sông không có đèn giao thông, sao tàu thuyền không đâm nhau?" (4 bước):
 *   0  Còi thay xi nhan: 1 ngắn rẽ phải, 2 ngắn rẽ trái, 3 ngắn lùi
 *   1  3 dài: chào nhau; 3 ngắn 3 dài 3 ngắn: có người ngã xuống nước
 *   2  Đèn trên thân tàu: mạn trái đỏ, mạn phải xanh; tàu bên phải chìa đèn đỏ về phía mình thì mình nhường
 *   3  Tàu không có phanh: tàu dài 350 m có thể trôi hơn 5 km mới dừng
 * Nguồn: Luật Giao thông đường thủy nội địa 2004, Điều 40, 46, 47; IMO COLREGs 1972 (Quy tắc 15, 21, 34);
 * Deutsche Flagge (Bộ Giao thông Đức): tàu phải dừng trong 15 lần chiều dài, tàu 350 m là hơn 5 km.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";
import { appearer, Caption, INK } from "./common.tsx";
import { Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Còi tàu thay xi nhan", "Còi còn để chào và báo nạn", "Thấy đèn đỏ của tàu kia: mình nhường", "Tàu không có phanh"];

const RED = "#E5484D";
const GREEN = "#2E9E4F";
const BLUE = "#7FC8F8";

/** Một chuỗi tiếng còi: "s" = ngắn (chấm tròn), "l" = dài (thanh dài). */
const Blasts: React.FC<{ x: number; y: number; code: string; color?: string; p?: number }> = ({ x, y, code, color = INK, p = 1 }) => {
  let cx = x;
  const out: React.ReactNode[] = [];
  [...code].forEach((c, i) => {
    if (c === " ") {
      cx += 18;
      return;
    }
    const w = c === "l" ? 56 : 22;
    const show = Math.min(1, Math.max(0, p * code.length - i));
    out.push(<rect key={i} x={cx} y={y - 11} width={w} height={22} rx={11} fill={color} opacity={show} />);
    cx += w + 10;
  });
  return <g>{out}</g>;
};

const Row: React.FC<{ y: number; code: string; text: string; p: number; color?: string; x?: number; tx?: number }> = ({ y, code, text, p, color, x = 90, tx = 470 }) => (
  <g opacity={Math.min(1, p * 2)}>
    <Blasts x={x} y={y} code={code} p={p} color={color} />
    <text x={tx} y={y + 12} fontFamily={TEXT_FONT} fontWeight="900" fontSize="36" fill={INK}>
      {text}
    </text>
  </g>
);

/** Chiếc còi tàu nhỏ (loa kèn). */
const Horn: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-30 -14 L10 -30 L10 30 L-30 14 Z" fill="#F2C14E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <rect x="-46" y="-12" width="18" height="24" rx="4" fill="#B5A898" stroke={INK} strokeWidth="5" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M${22 + i * 14} -20 Q${32 + i * 14} 0 ${22 + i * 14} 20`} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity={0.3 + 0.7 * Math.abs(Math.sin(t / 5 + i))} />
    ))}
  </g>
);

/** Tàu nhìn từ trên xuống, mũi hướng `rot` độ (0 = lên trên); đèn đỏ mạn trái, xanh mạn phải. */
const ShipTop: React.FC<{ x: number; y: number; rot: number; s?: number; glow?: number }> = ({ x, y, rot, s = 1, glow = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M0 -70 Q30 -40 30 10 L30 60 L-30 60 L-30 10 Q-30 -40 0 -70 Z" fill="#FFFDF5" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <rect x="-16" y="0" width="32" height="34" rx="6" fill="#B5A898" stroke={INK} strokeWidth="4" />
    <circle cx="-30" cy="-6" r={14} fill={RED} stroke={INK} strokeWidth="4" opacity={0.6 + 0.4 * glow} />
    <circle cx="30" cy="-6" r={14} fill={GREEN} stroke={INK} strokeWidth="4" opacity={0.6 + 0.4 * glow} />
  </g>
);

export const WaterwayBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(frame / 8));

  return (
    <g>
      {/* Bước 0: còi thay xi nhan */}
      {step === 0 ? (
        <g>
          <Horn x={60} y={190} t={frame} />
          <Row y={110} code="s" text="Rẽ phải" p={appear(0, 0, 12)} x={130} tx={420} />
          <Row y={190} code="ss" text="Rẽ trái" p={appear(0, 30, 12)} x={130} tx={420} />
          <Row y={270} code="sss" text="Đang lùi" p={appear(0, 60, 12)} x={130} tx={420} />
          <Tag x={800} y={190} text="XI NHAN" size={30} opacity={appear(0, 80, 12)} />
        </g>
      ) : null}

      {/* Bước 1: chào nhau, có người ngã xuống nước */}
      {step === 1 ? (
        <g>
          <Row y={120} code="lll" text="Chào nhau" p={appear(1, 0, 14)} x={60} tx={300} />
          <Row y={215} code="sss lll sss" text="" p={appear(1, 40, 20)} x={60} color={RED} />
          <text x={480} y={295} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="40" fill={RED} opacity={appear(1, 60, 14)}>
            Có người ngã xuống nước!
          </text>
        </g>
      ) : null}

      {/* Bước 2: đèn mạn tàu, tàu bên phải chìa đèn đỏ thì mình nhường */}
      {step === 2 ? (
        <g>
          <rect x="20" y="50" width="920" height="290" rx="18" fill="#1F3554" />
          <ShipTop x={200} y={225} rot={0} s={1.15} glow={glow} />
          <text x={320} y={300} fontFamily={TEXT_FONT} fontWeight="900" fontSize="32" fill="#FFFFFF">
            Tàu mình
          </text>
          <g opacity={appear(2, 30, 14)}>
            <ShipTop x={590} y={130} rot={-90} s={1.15} glow={glow} />
            <text x={800} y={142} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="32" fill="#FFFFFF">
              Tàu bên phải
            </text>
            {/* Đèn đỏ của tàu bên phải chiếu về phía mình */}
            <circle cx={590} cy={165} r={30 + 8 * glow} fill={RED} opacity={0.25 + 0.2 * glow} />
          </g>
          <Tag x={700} y={285} text="MÌNH NHƯỜNG!" size={32} opacity={appear(2, 70, 14)} color={RED} />
        </g>
      ) : null}

      {/* Bước 3: tàu không có phanh, trôi hơn 5 km */}
      {step === 3 ? (
        <g>
          <rect x="20" y="270" width="920" height="70" fill={BLUE} />
          {(() => {
            const p = appear(3, 0, 60);
            const sx = 200 + p * 560;
            return (
              <g>
                <line x1={120} y1={300} x2={sx - 100} y2={300} stroke="#FFFFFF" strokeWidth="6" strokeDasharray="14 10" />
                <g transform={`translate(${sx} 270)`}>
                  <path d="M-110 -40 L120 -40 L90 14 L-90 14 Z" fill="#7A8794" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
                  <rect x="-80" y="-80" width="100" height="40" rx="6" fill="#FFFDF5" stroke={INK} strokeWidth="5" />
                </g>
              </g>
            );
          })()}
          <text x={480} y={100} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="44" fill={INK} opacity={appear(3, 20, 14)}>
            Tàu dài 350 m: trôi hơn 5 km!
          </text>
          <Tag x={480} y={156} text="KHÔNG CÓ PHANH" size={30} opacity={appear(3, 50, 14)} color={RED} />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
