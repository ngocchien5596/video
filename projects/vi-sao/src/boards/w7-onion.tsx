/**
 * Sơ đồ "Vì sao thái hành lại cay mắt?" (4 bước):
 *   0  Củ hành gồm vô số tế bào nhỏ xếp sát nhau
 *   1  Người lớn thái hành: dao làm vỡ tế bào, các chất bên trong trộn vào nhau
 *   2  Sinh ra một chất mới có lưu huỳnh, bay lên tới mắt
 *   3  Thần kinh ở mắt thấy cay, báo tuyến nước mắt → chảy nước mắt
 * Nguồn: Ask Dr. Universe (WSU), University of Illinois Extension.
 * Không nói tới "axit sunfuric" (giữ phần các nguồn cùng mô tả, đủ cho trẻ).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, Drop, Eye, INK } from "./common.tsx";
import { Knife, SafetyBadge, Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Củ hành có vô số tế bào nhỏ xíu", "Thái hành: tế bào bị vỡ ra", "Chất mới có lưu huỳnh bay lên mắt", "Mắt thấy cay, nước mắt chảy ra"];

const ON = { x: 210, y: 225 };
const LENS = { x: 580, y: 200, r: 112 };
const EYE = { x: 820, y: 110 };

const Onion: React.FC = () => (
  <g>
    <path
      d={`M${ON.x} ${ON.y - 115} C${ON.x + 20} ${ON.y - 80} ${ON.x + 110} ${ON.y - 60} ${ON.x + 105} ${ON.y + 10}
        C${ON.x + 100} ${ON.y + 80} ${ON.x + 40} ${ON.y + 100} ${ON.x} ${ON.y + 100}
        C${ON.x - 40} ${ON.y + 100} ${ON.x - 100} ${ON.y + 80} ${ON.x - 105} ${ON.y + 10}
        C${ON.x - 110} ${ON.y - 60} ${ON.x - 20} ${ON.y - 80} ${ON.x} ${ON.y - 115} Z`}
      fill="#E9C46A"
      stroke={INK}
      strokeWidth="6"
      strokeLinejoin="round"
    />
    {[40, 70].map((d) => (
      <path key={d} d={`M${ON.x} ${ON.y - 100 + d * 0.4} C${ON.x + d} ${ON.y - 40} ${ON.x + d} ${ON.y + 60} ${ON.x} ${ON.y + 96}`} fill="none" stroke="#B8893A" strokeWidth="4" />
    ))}
    {[40, 70].map((d) => (
      <path key={-d} d={`M${ON.x} ${ON.y - 100 + d * 0.4} C${ON.x - d} ${ON.y - 40} ${ON.x - d} ${ON.y + 60} ${ON.x} ${ON.y + 96}`} fill="none" stroke="#B8893A" strokeWidth="4" />
    ))}
  </g>
);

export const OnionBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const cells = appear(0, 2, 16);
  const cut = appear(1, 0, 18);
  const gas = appear(2, 0, 24);
  const tears = appear(3, 0, 14);
  const lensOn = step <= 1;

  return (
    <g>
      <Onion />

      {/* Bước 0–1: kính lúp thấy tế bào, rồi tế bào vỡ */}
      {lensOn ? (
        <g opacity={cells}>
          <line x1={ON.x + 60} y1={ON.y - 30} x2={LENS.x - LENS.r * 0.8} y2={LENS.y - 30} stroke={INK} strokeWidth="3" strokeDasharray="8 8" />
          <circle cx={LENS.x} cy={LENS.y} r={LENS.r} fill="#FFF6D6" stroke={INK} strokeWidth="7" />
          {[-1, 0, 1].map((row) =>
            [-1.5, -0.5, 0.5, 1.5].map((col) => {
              const broken = step >= 1 && (row + col * 2) % 2 !== 0;
              const cx = LENS.x + col * 46;
              const cy = LENS.y + row * 52;
              return (
                <g key={`${row}${col}`}>
                  <rect
                    x={cx - 20}
                    y={cy - 22}
                    width={40}
                    height={44}
                    rx={10}
                    fill="#F4E3A1"
                    stroke={INK}
                    strokeWidth="3"
                    strokeDasharray={broken ? `${30 * (1 - cut) + 10} ${14 * cut}` : undefined}
                  />
                  {broken ? <circle cx={cx + 22 * cut} cy={cy + 18 * cut} r={5} fill="#7FB800" stroke={INK} strokeWidth="2" opacity={cut} /> : null}
                </g>
              );
            }),
          )}
          <Tag x={LENS.x} y={LENS.y + LENS.r + 6} text={step >= 1 ? "TẾ BÀO VỠ RA" : "TẾ BÀO"} size={22} />
        </g>
      ) : null}

      {/* Bước 1: dao (người lớn cầm) */}
      {step === 1 ? (
        <g opacity={cut}>
          <Knife x={ON.x - 40} y={ON.y - 130 + 70 * cut} angle={-8} s={0.9} />
        </g>
      ) : null}
      <SafetyBadge x={210} y={70} text="NGƯỜI LỚN CẦM DAO" opacity={step === 1 ? cut : step > 1 ? 1 : 0} size={20} />

      {/* Bước 2: chất mới bay lên tới mắt */}
      {gas > 0
        ? [0, 1, 2].map((i) => {
            const p = Math.min(1, gas * 1.4 - i * 0.15);
            if (p <= 0) return null;
            const x1 = ON.x - 30 + i * 40;
            const y1 = ON.y - 105;
            const x2 = EYE.x - 60;
            const y2 = EYE.y + 4 + i * 16;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.hypot(dx, dy);
            const pts = Array.from({ length: 26 }, (_, k) => {
              const t = (k / 25) * p;
              const off = 14 * Math.sin(t * 14 + frame / 5 + i * 2);
              return `${x1 + dx * t - (dy / len) * off},${y1 + dy * t + (dx / len) * off}`;
            });
            return <polyline key={i} points={pts.join(" ")} fill="none" stroke="#7FB800" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />;
          })
        : null}
      <Tag x={560} y={250} text="CHẤT CÓ LƯU HUỲNH" size={24} color="#4E7A00" opacity={gas * (1 - tears)} />
      {step >= 2 ? <Eye x={EYE.x} y={EYE.y} s={1.1} /> : null}

      {/* Bước 3: nước mắt chảy */}
      {tears > 0 ? (
        <g opacity={tears}>
          {[0, 1].map((i) => {
            const t = (frame / 24 + i * 0.5) % 1;
            return <Drop key={i} x={EYE.x - 20 + i * 40} y={EYE.y + 40 + t * 80} s={1.5} />;
          })}
          <Tag x={600} y={300} text="MẮT CAY: CHẢY NƯỚC MẮT" size={24} />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
