/**
 * Sơ đồ "Vì sao nước biển màu xanh?" (4 bước):
 *   0  Ánh nắng có đủ các màu cầu vồng, chiếu xuống biển
 *   1  Vào nước, đỏ, cam, vàng bị nước hút mất trước
 *   2  Màu xanh khó bị hút nhất, đi sâu hơn rồi bị hắt ngược ra
 *   3  Ánh xanh tới mắt: biển càng sâu càng thấy rõ màu xanh của nước
 * Nguồn: NOAA Ocean Service, Illinois Physics Van (Why the Ocean is Blue), Scripps Institution of Oceanography.
 */
import React from "react";
import { interpolateColors } from "remotion";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, clamp01, Eye, INK, Label, RAINBOW, Sun } from "./common.tsx";

const CAPTIONS = ["Nắng có đủ các màu", "Nước hút đỏ, cam, vàng", "Màu xanh đi sâu, hắt ngược ra", "Biển càng sâu, càng xanh"];

const SURFACE = 150;
const ENTRY = { x: 300, y: SURFACE };
/** Độ dài mỗi màu đi được trong nước (đỏ ngắn nhất, xanh dài nhất). */
const DEPTH = [36, 56, 80, 130, 175, 150, 120];

export const SeaBlueBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const sun = appear(0, 0, 20);
  const absorb = appear(1, 0, 24);
  const back = appear(2, 0, 24);
  const deep = appear(3, 0, 24);
  const water = interpolateColors(deep, [0, 1], ["#BFE3F7", "#2F6FC9"]);

  // Hướng đi trong nước: chéo xuống bên phải.
  const dir = { x: 0.55, y: 0.83 };
  const blueTip = { x: ENTRY.x + 4 * 12 - 6 * 3 + dir.x * DEPTH[4], y: ENTRY.y + dir.y * DEPTH[4] };

  return (
    <g>
      {/* Biển */}
      <rect x="0" y={SURFACE} width="960" height={350 - SURFACE} fill={water} />
      <line x1="0" y1={SURFACE} x2="960" y2={SURFACE} stroke={INK} strokeWidth="5" />
      <Label x={110} y={330} text="NƯỚC BIỂN" size={24} color={deep > 0.5 ? "#FFFFFF" : INK} />
      <Sun x={90} y={80} r={28} />

      {/* Bước 0: chùm nắng nhiều màu chiếu xuống mặt biển */}
      {RAINBOW.map((c, i) => {
        const x0 = 140 + i * 5;
        const y0 = 90 + i * 4;
        const x1 = ENTRY.x + i * 12 - 18;
        return <line key={c} x1={x0} y1={y0} x2={x0 + (x1 - x0) * sun} y2={y0 + (ENTRY.y - y0) * sun} stroke={c} strokeWidth="6" strokeLinecap="round" />;
      })}

      {/* Bước 1–2: các màu đi vào nước, màu nóng dừng sớm */}
      {RAINBOW.map((c, i) => {
        const len = DEPTH[i] * (i < 3 ? absorb : Math.max(absorb, back));
        if (len < 2) return null;
        const x0 = ENTRY.x + i * 12 - 18;
        return (
          <g key={c}>
            <line x1={x0} y1={ENTRY.y} x2={x0 + dir.x * len} y2={ENTRY.y + dir.y * len} stroke={c} strokeWidth="6" strokeLinecap="round" />
            {i < 3 && absorb >= 1 ? (
              <circle cx={x0 + dir.x * len} cy={ENTRY.y + dir.y * len} r={7} fill="#FFFFFF" stroke={c} strokeWidth="4" />
            ) : null}
          </g>
        );
      })}
      <Label x={560} y={200} text="ĐỎ, CAM, VÀNG BỊ HÚT" opacity={step === 1 ? absorb : 0} size={26} color="#C0392B" />

      {/* Bước 2: ánh xanh bị hắt ngược ra ngoài */}
      <Arrow x1={blueTip.x} y1={blueTip.y} x2={760} y2={90} color="#2C5FAD" width={7} p={back} />
      <Label x={640} y={300} text="XANH ĐI SÂU, HẮT RA" opacity={step === 2 ? back : 0} size={24} color="#2C5FAD" />

      {/* Mắt nhìn biển */}
      <g opacity={Math.max(back, deep)}>
        <Eye x={830} y={80} s={1} />
      </g>
      <Label x={640} y={300} text="BIỂN XANH!" opacity={deep} size={32} color="#FFFFFF" />
      <Label x={700} y={250} text="CÀNG SÂU, CÀNG XANH" opacity={deep} size={24} color="#FFFFFF" />

      {/* Cốc nước nhỏ trông trong veo (so sánh) */}
      <g opacity={clamp01(deep * 2 - 1)}>
        <path d="M860 210 L920 210 L912 290 L868 290 Z" fill="#EAF6FF" stroke={INK} strokeWidth="4" />
        <Label x={890} y={320} text="TRONG VEO" size={18} color="#FFFFFF" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
