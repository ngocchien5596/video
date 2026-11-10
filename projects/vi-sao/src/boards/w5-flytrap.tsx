/**
 * Sơ đồ "Vì sao cây bắt ruồi lại ăn côn trùng?" (4 bước):
 *   0  Cây mọc ở đầm lầy: đất ướt, chua, thiếu chất bổ (vẫn có nắng)
 *   1  Bẫy là chiếc lá gập đôi có bản lề, mặt trong có lông nhỏ xíu
 *   2  Côn trùng chạm lông, lá sập lại trong chưa đầy một giây
 *   3  Nước tiêu hoá làm tan côn trùng, cây hút chất bổ
 * Nguồn: San Diego Zoo Wildlife Explorers (Venus Flytrap), NC State Extension Plant Toolbox (Dionaea muscipula).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Đầm lầy: đất thiếu chất bổ", "Lá gập đôi, có lông nhỏ xíu", "Chạm lông: lá sập lại!", "Tiêu hoá, hút chất bổ"];

const SOIL_Y = 282;
const HINGE = { x: 430, y: 192 };
const LOBE = 200;

/** Một nửa bẫy, vẽ hướng sang phải từ bản lề; nửa dưới lật bằng scale(1,-1). */
const Lobe: React.FC<{ angle: number; flip?: boolean; hairs: number }> = ({ angle, flip, hairs }) => {
  const teeth = Array.from({ length: 6 }, (_, i) => 110 + i * 17);
  return (
    <g transform={`translate(${HINGE.x} ${HINGE.y}) rotate(${flip ? angle : -angle}) scale(1 ${flip ? -1 : 1})`}>
      <path d={`M0 0 C44 -66 ${LOBE - 36} -74 ${LOBE} -6 L0 0 Z`} fill="#7DBE4E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d={`M10 -3 C52 -46 ${LOBE - 46} -52 ${LOBE - 12} -8 Z`} fill="#E5484D" stroke="none" />
      {teeth.map((t, i) => (
        <line key={i} x1={t} y1={-t * 0.026} x2={t + 6} y2={-t * 0.026 + 24} stroke="#5E9A34" strokeWidth="4" strokeLinecap="round" />
      ))}
      {[45, 70, 95].map((t, i) => (
        <line key={i} x1={t} y1={-t * 0.026} x2={t} y2={-t * 0.026 + 18} stroke={INK} strokeWidth="3.5" strokeLinecap="round" opacity={hairs} />
      ))}
    </g>
  );
};

/** Con ruồi nhỏ. */
const Fly: React.FC<{ x: number; y: number; opacity?: number; wing: number }> = ({ x, y, opacity = 1, wing }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <ellipse cx="-8" cy="-12" rx="12" ry="7" fill="#DDF1FF" stroke={INK} strokeWidth="2.5" transform={`rotate(${-20 + wing * 15} -8 -12)`} />
    <ellipse cx="8" cy="-12" rx="12" ry="7" fill="#DDF1FF" stroke={INK} strokeWidth="2.5" transform={`rotate(${20 - wing * 15} 8 -12)`} />
    <ellipse cx="0" cy="0" rx="14" ry="9" fill="#3A3A46" stroke={INK} strokeWidth="2.5" />
    <circle cx="13" cy="-2" r="6" fill="#B03030" stroke={INK} strokeWidth="2" />
  </g>
);

export const W5FlytrapBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const bog = appear(0, 0, 16);
  const trap = appear(1, 0, 16);
  const land = appear(2, 0, 22);
  const snap = appear(2, 26, 6);
  const digest = appear(3, 0, 24);

  const angle = step < 2 ? 22 : 22 - 20 * snap;
  // Ruồi bay từ phải vào giữa bẫy.
  const flyX = step < 2 ? 900 : 900 - (900 - (HINGE.x + 120)) * land;
  const flyY = step < 2 ? 120 : 120 + (HINGE.y - 120) * land;
  const flyShown = step === 2 ? (snap < 0.5 ? 1 : 0) : 0;

  return (
    <g>
      <rect x="20" y="60" width="920" height="285" rx="24" fill="#DFF1FB" stroke={INK} strokeWidth="5" />
      <Sun x={95} y={118} r={30} pulse={1 + Math.sin(frame * 0.1) * 0.03} />

      {/* Đầm lầy. */}
      <path d={`M20 ${SOIL_Y} H940 V321 Q940 345 916 345 H44 Q20 345 20 321 Z`} fill="#6B4A2E" stroke={INK} strokeWidth="5" />
      {[120, 300, 600, 820].map((x, i) => (
        <ellipse key={i} cx={x} cy={SOIL_Y + 10} rx={44} ry={7} fill="#7FC8F8" stroke={INK} strokeWidth="3" opacity={bog} />
      ))}
      <Label x={250} y={330} text="ĐẤT ƯỚT, CHUA" opacity={appear(0, 6)} size={24} color="#FFF6E0" />
      <Label x={700} y={330} text="THIẾU CHẤT BỔ" opacity={appear(0, 16)} size={24} color="#FFD93D" />

      {/* Thân lá và gốc. */}
      <path d={`M${HINGE.x} ${HINGE.y + 4} Q${HINGE.x - 30} ${HINGE.y + 60} ${HINGE.x - 20} ${SOIL_Y}`} fill="none" stroke="#5E9A34" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx={HINGE.x - 20} cy={SOIL_Y} rx="40" ry="10" fill="#5E9A34" stroke={INK} strokeWidth="3" />

      {/* Bẫy lá: hiện từ bước 1, bước 0 là mầm nhỏ. */}
      {step === 0 ? (
        <g opacity={bog}>
          <ellipse cx={HINGE.x + 30} cy={HINGE.y} rx="40" ry="18" fill="#7DBE4E" stroke={INK} strokeWidth="4" />
        </g>
      ) : (
        <g opacity={step === 1 ? trap : 1}>
          <Lobe angle={angle} hairs={step === 1 ? appear(1, 14) : 1} />
          <Lobe angle={angle} flip hairs={step === 1 ? appear(1, 14) : 1} />
          <circle cx={HINGE.x} cy={HINGE.y} r="10" fill="#5E9A34" stroke={INK} strokeWidth="4" />
        </g>
      )}

      <Label x={350} y={186} text="BẢN LỀ" opacity={step >= 1 ? appear(1, 6) : 0} size={24} />
      <Label x={790} y={125} text="LÔNG NHỎ XÍU" opacity={step === 1 ? appear(1, 14) : 0} size={26} color="#B03030" />
      {step === 1 ? <Arrow x1={720} y1={140} x2={HINGE.x + 100} y2={HINGE.y - 20} color="#B03030" width={5} p={appear(1, 14, 12)} /> : null}

      {flyShown ? <Fly x={flyX} y={flyY} wing={Math.sin(frame * 1.4)} /> : null}
      <Label x={815} y={150} text="SẬP!" opacity={step === 2 ? snap : 0} size={40} color="#E5484D" />
      <Label x={800} y={195} text="CHƯA ĐẦY MỘT GIÂY" opacity={step === 2 ? appear(2, 34) : 0} size={22} />

      {/* Bước 3: giọt nước tiêu hoá trong bẫy, chất bổ chạy xuống cây. */}
      {step >= 3 ? (
        <g>
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={HINGE.x + 70 + i * 40}
              cy={HINGE.y - 4 + ((frame * 0.5 + i * 5) % 10)}
              r="8"
              fill="#9BE15D"
              stroke={INK}
              strokeWidth="2"
              opacity={digest}
            />
          ))}
        </g>
      ) : null}
      <Label x={800} y={150} text="NƯỚC TIÊU HOÁ" opacity={step >= 3 ? digest : 0} size={26} color="#2E8B3D" />
      <Label x={210} y={250} text="CÂY HÚT CHẤT BỔ" opacity={step >= 3 ? appear(3, 22) : 0} size={26} color="#2E8B3D" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
