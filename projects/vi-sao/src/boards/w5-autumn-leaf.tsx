/**
 * Sơ đồ "Vì sao lá cây chuyển vàng rồi rụng?" (4 bước):
 *   0  Trong lá có diệp lục xanh và chất màu vàng cam (như ở cà rốt)
 *   1  Mùa hè diệp lục rất nhiều, màu xanh che kín màu vàng
 *   2  Ngày ngắn lại, lá ngừng làm thức ăn, diệp lục phân huỷ dần
 *   3  Màu vàng cam lộ ra; lớp ngăn ở cuống làm lá rụng
 * Nguồn: SUNY ESF (Why Leaves Change Color), Ask A Biologist – ASU (Why do leaves change color in the fall season?).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Lá có màu xanh và màu vàng cam", "Mùa hè: màu xanh che màu vàng", "Ngày ngắn lại: màu xanh mất dần", "Màu vàng lộ ra, lá rụng xuống"];

const LEAF_PATH = "M0 0 C-70 -20 -90 -110 0 -190 C90 -110 70 -20 0 0 Z";

export const W5AutumnLeafBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const chips = appear(0, 6, 16);
  const cover = appear(1, 0, 24);
  const fade = appear(2, 6, 50);
  const fall = appear(3, 20, 40);

  // Độ đậm của diệp lục xanh phủ trên lớp vàng cam.
  const green = step === 0 ? 0.55 : step === 1 ? 0.55 + cover * 0.45 : step === 2 ? 1 - fade * 0.85 : 0;
  const L = { x: 330, y: 130 };
  const dy = fall * 22;
  const rot = fall * 24;

  return (
    <g>
      {/* Cành cây và cuống lá */}
      <path d="M60 74 Q220 84 340 100" fill="none" stroke="#8A5A2B" strokeWidth="14" strokeLinecap="round" />
      <line x1={L.x} y1={98} x2={L.x} y2={L.y} stroke="#8A5A2B" strokeWidth="6" strokeLinecap="round" />
      {/* Bước 3: lớp ngăn ở cuống */}
      {step === 3 ? <line x1={L.x - 12} y1={L.y - 6} x2={L.x + 12} y2={L.y - 6} stroke="#E5484D" strokeWidth="6" strokeLinecap="round" /> : null}

      {/* Chiếc lá treo ngược (ngọn chĩa xuống); bước 3 rơi xuống */}
      <g transform={`translate(${L.x + fall * 70} ${L.y + dy}) rotate(${180 + rot})`}>
        <path d={LEAF_PATH} fill="#F2A33A" />
        <path d={LEAF_PATH} fill="#5DB04A" opacity={green} />
        {step === 0
          ? [
              [-20, -60],
              [24, -100],
              [-10, -140],
              [18, -40],
            ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" fill="#F28C38" opacity={chips} />)
          : null}
        <path d={LEAF_PATH} fill="none" stroke={INK} strokeWidth="5" />
        <path d="M0 -6 L0 -176 M0 -60 L-34 -92 M0 -60 L34 -92 M0 -110 L-28 -140 M0 -110 L28 -140" stroke={INK} strokeWidth="3" opacity="0.5" fill="none" />
      </g>

      {/* Bước 0: hai loại chất màu */}
      <g opacity={step === 0 ? chips : 0}>
        <circle cx="620" cy="140" r="26" fill="#5DB04A" stroke={INK} strokeWidth="4" />
        <Label x={760} y={150} text="DIỆP LỤC XANH" size={24} color="#2E7D32" />
        <circle cx="620" cy="230" r="26" fill="#F28C38" stroke={INK} strokeWidth="4" />
        <Label x={760} y={228} text="MÀU VÀNG CAM" size={24} color="#D9531E" />
        <Label x={760} y={258} text="NHƯ CỦ CÀ RỐT" size={20} />
      </g>

      <Label x={720} y={190} text="XANH CHE MẤT VÀNG" opacity={step === 1 ? cover : 0} size={28} color="#2E7D32" />

      {/* Bước 2: ngày ngắn lại */}
      <g opacity={step === 2 ? appear(2, 0, 16) : 0}>
        <Sun x={720} y={250} r={26} pulse={0.9 + Math.sin(frame * 0.05) * 0.03} />
        <line x1="600" y1="292" x2="840" y2="292" stroke={INK} strokeWidth="4" />
        <Label x={720} y={130} text="NGÀY NGẮN LẠI" size={28} />
        <Label x={720} y={168} text="DIỆP LỤC PHÂN HUỶ" size={24} color="#2E7D32" />
      </g>

      {/* Bước 3: vàng lộ ra, lá rụng */}
      <g opacity={step === 3 ? appear(3, 0, 14) : 0}>
        <Label x={720} y={150} text="VÀNG CAM LỘ RA" size={30} color="#D9531E" />
        <Label x={720} y={200} text="LỚP NGĂN Ở CUỐNG" size={22} />
        <Label x={720} y={232} text="LÁ RỤNG XUỐNG" size={22} />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
