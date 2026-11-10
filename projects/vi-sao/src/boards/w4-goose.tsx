/**
 * Sơ đồ "Vì sao mình nổi da gà?" (4 bước):
 *   0  Lát cắt da: mỗi sợi lông mọc từ một túi nhỏ (nang lông), gắn một cơ tí hon
 *   1  Lạnh: dây thần kinh báo, cơ tí hon co lại, kéo sợi lông dựng lên
 *   2  Chỗ mỗi sợi lông dựng nổi thành nốt nhỏ: da gà
 *   3  Lông dựng nghiêng giữ lớp không khí sát da, ấm lên một chút
 * Nguồn: Ask Dr. Universe (WSU), Cleveland Clinic, Harvard HSCRB.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, BLUE, Caption, INK, Label } from "./common.tsx";
import { SKIN, SKIN_DARK, Tag, Zigzag } from "./w4-parts.tsx";

const CAPTIONS = ["Mỗi sợi lông gắn với một cơ tí hon", "Lạnh: cơ co lại, kéo lông dựng lên", "Da nổi thành nốt nhỏ: nổi da gà", "Lông dựng giữ không khí, ấm lên một chút"];

const TOP = 175; // mặt da
const BOTTOM = 330;
const LEFT = 50;
const RIGHT = 590;
const HAIRS = [160, 320, 480];
const MUSCLE = "#E5677A";
const HAIR = "#6B4423";

/** Mặt da: phẳng, hoặc gồ lên thành nốt ở chân mỗi sợi lông. */
const surface = (bump: number) => {
  let d = `M${LEFT} ${TOP}`;
  for (const x of HAIRS) {
    d += ` L${x - 40} ${TOP} Q${x - 30} ${TOP - 30 * bump} ${x} ${TOP - 32 * bump} Q${x + 30} ${TOP - 30 * bump} ${x + 40} ${TOP}`;
  }
  return d + ` L${RIGHT} ${TOP}`;
};

export const GooseBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const intro = appear(0, 2, 16);
  const pull = appear(1, 8, 20);
  const bump = appear(2, 0, 16);
  const warm = appear(3, 0, 18);
  // Góc nghiêng của sợi lông so với phương thẳng đứng: nằm rạp 65°, dựng lên 25°.
  const angle = 65 - 40 * pull;
  const a = (angle * Math.PI) / 180;
  const dir = { x: Math.sin(a), y: -Math.cos(a) };
  const lift = 32 * bump;
  // Nang lông cắm sâu hơn sợi lông (dốc hơn), để nằm hẳn trong da.
  const fa = ((angle - 25) * Math.PI) / 180;
  const fdir = { x: Math.sin(fa), y: -Math.cos(fa) };
  const only = (k: number, v: number) => (step === k ? v : 0);

  return (
    <g>
      {/* Bước 3: lớp không khí giữ lại giữa các sợi lông */}
      {warm > 0 ? (
        <g opacity={warm}>
          <rect x={LEFT} y={TOP - 95} width={RIGHT - LEFT} height={95} rx={20} fill="#FFE9B8" opacity={0.85} />
          {[110, 240, 400, 540].map((x, i) => (
            <path key={x} d={`M${x} ${TOP - 30 - 6 * Math.sin(frame / 8 + i)} q12 -12 24 0 q12 12 24 0`} fill="none" stroke="#E07A2E" strokeWidth="4" strokeLinecap="round" />
          ))}
        </g>
      ) : null}

      {/* Lát cắt da */}
      <path d={`${surface(bump)} L${RIGHT} ${BOTTOM} L${LEFT} ${BOTTOM} Z`} fill={SKIN} stroke={INK} strokeWidth="6" strokeLinejoin="round" />

      {HAIRS.map((x) => {
        const sx = x;
        const sy = TOP - lift;
        // Nang lông: từ mặt da đi chếch xuống, ngược hướng sợi lông.
        const fx = sx - fdir.x * 105;
        const fy = sy - fdir.y * 105;
        const mid = { x: sx - fdir.x * 62, y: sy - fdir.y * 62 };
        const anchor = { x: x + 40, y: TOP + 80 };
        const thick = 12 + 6 * pull;
        return (
          <g key={x}>
            <line x1={sx} y1={sy} x2={fx} y2={fy} stroke={INK} strokeWidth="26" strokeLinecap="round" />
            <line x1={sx} y1={sy} x2={fx} y2={fy} stroke={SKIN_DARK} strokeWidth="18" strokeLinecap="round" />
            <line x1={sx} y1={sy} x2={fx} y2={fy} stroke={HAIR} strokeWidth="5" strokeLinecap="round" />
            {/* Cơ tí hon */}
            <line x1={mid.x} y1={mid.y} x2={anchor.x} y2={anchor.y} stroke={INK} strokeWidth={thick + 6} strokeLinecap="round" opacity={intro} />
            <line x1={mid.x} y1={mid.y} x2={anchor.x} y2={anchor.y} stroke={MUSCLE} strokeWidth={thick} strokeLinecap="round" opacity={intro} />
            {/* Sợi lông ngoài da */}
            <line x1={sx} y1={sy} x2={sx + dir.x * 110} y2={sy + dir.y * 110} stroke={HAIR} strokeWidth="6" strokeLinecap="round" />
            {/* Bước 1: tia thần kinh tới cơ */}
            {step === 1 ? <Zigzag x1={x + 70} y1={BOTTOM - 6} x2={anchor.x} y2={anchor.y} p={appear(1, 0, 14)} teeth={4} /> : null}
          </g>
        );
      })}

      {/* Bước 1: bông tuyết lạnh */}
      {step >= 1 && step < 3
        ? [90, 250, 420, 560].map((x, i) => (
            <text key={x} x={x} y={95 + 10 * Math.sin(frame / 10 + i)} textAnchor="middle" fontSize="34" fill={BLUE} opacity={appear(1, 0, 12)}>
              ❄
            </text>
          ))
        : null}

      {/* Nhãn bên phải */}
      <Tag x={770} y={170} text="SỢI LÔNG" size={24} color={HAIR} opacity={only(0, intro)} />
      <Tag x={770} y={230} text="TÚI NHỎ (NANG LÔNG)" size={22} opacity={only(0, intro)} />
      <Tag x={770} y={290} text="CƠ TÍ HON" size={24} color="#C0392B" opacity={only(0, intro)} />

      <Tag x={770} y={170} text="LẠNH!" size={26} color={BLUE} opacity={only(1, pull)} />
      <Tag x={770} y={240} text="CƠ CO LẠI" size={24} color="#C0392B" opacity={only(1, pull)} />
      <Tag x={770} y={300} text="LÔNG DỰNG LÊN" size={24} color={HAIR} opacity={only(1, pull)} />

      <Label x={770} y={200} text="NỔI DA GÀ!" size={40} color="#C0392B" opacity={only(2, bump)} />
      <Tag x={770} y={260} text="MỖI SỢI LÔNG MỘT NỐT" size={20} opacity={only(2, bump)} />

      <Tag x={770} y={180} text="GIỮ KHÔNG KHÍ SÁT DA" size={20} color="#B4561B" opacity={warm} />
      <Tag x={770} y={250} text="ẤM LÊN MỘT CHÚT" size={24} color="#B4561B" opacity={warm} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
