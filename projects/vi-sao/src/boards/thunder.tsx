/**
 * Sơ đồ "Vì sao thấy chớp trước rồi mới nghe sấm?" (4 bước):
 *   0  Tia chớp nóng làm không khí nở bung
 *   1  Không khí nở ra rồi co lại đột ngột → tiếng nổ: sấm (sinh ra cùng lúc với chớp)
 *   2  Ánh sáng tới mắt gần như ngay lập tức
 *   3  Tiếng sấm đi chậm hơn nhiều, tới tai sau
 * Nguồn: Met Office (Thunder and lightning), National Weather Service (Lightning science: thunder).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { TITLE_FONT } from "../../../../engine/components/brand.ts";
import { appearer, Arrow, Caption, CloudShape, Eye, INK, Label } from "./common.tsx";

const CAPTIONS = ["Tia chớp làm không khí nóng, nở bung", "Nở ra, co lại: tiếng nổ ẦM, cùng lúc!", "Ánh sáng tới mắt gần như ngay lập tức", "Tiếng sấm đi chậm hơn, tới tai sau"];

const BOLT = "M150 120 L120 200 L150 200 L118 300 L190 180 L158 180 L185 120 Z";

export const ThunderBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const heat = appear(0, 0, 16);
  const boom = appear(1, 0, 16);
  const light = appear(2, 0, 6);
  const sound = appear(3, 0, 50);
  const flash = step <= 1 ? 0.6 + 0.4 * Math.abs(Math.sin(frame * 0.6)) : 1;

  return (
    <g>
      <CloudShape x={160} y={95} s={0.8} base="#8C99A6" />
      <path d={BOLT} fill="#FFE45C" stroke={INK} strokeWidth="5" strokeLinejoin="round" opacity={flash} />

      {/* Bước 0: không khí quanh tia chớp nở bung */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={152} cy={210} r={(30 + i * 28) * heat} fill="none" stroke="#F28C38" strokeWidth="5" opacity={heat * (1 - i * 0.25)} />
      ))}
      <Label x={152} y={335} text="NÓNG, NỞ BUNG" opacity={heat * (1 - boom)} size={22} color="#E5484D" />

      {/* Bước 1: tiếng nổ */}
      <text
        x="255"
        y="185"
        fontFamily={TITLE_FONT}
        fontSize={56 * boom}
        fill="#E5484D"
        stroke={INK}
        strokeWidth="4"
        paintOrder="stroke"
        opacity={boom}
      >
        ẦM!
      </text>
      <Label x={152} y={335} text="CHỚP + SẤM: CÙNG LÚC" opacity={boom} size={22} color="#E5484D" />

      {/* Người nghe ở xa */}
      <Eye x={840} y={150} s={0.9} />
      <g transform="translate(860 250)">
        <path d="M-20 -30 Q20 -40 22 0 Q22 30 -6 34" fill="#F8D2B0" stroke={INK} strokeWidth="5" />
        <Label x={0} y={80} text="TAI" size={20} />
      </g>
      <Label x={840} y={95} text="MẮT" size={20} />

      {/* Bước 2: ánh sáng bay rất nhanh */}
      <Arrow x1={200} y1={150} x2={790} y2={150} color="#F2B21B" width={9} p={light} />
      <Label x={500} y={130} text="ÁNH SÁNG: SIÊU NHANH" opacity={light} size={24} color="#B5892A" />

      {/* Bước 3: tiếng sấm đi chậm (gợn sóng) */}
      {sound > 0 ? (
        <path
          d={Array.from({ length: 30 }, (_, i) => {
            const x = 220 + i * 20;
            return `${i === 0 ? "M" : "L"}${x} ${250 + Math.sin(i * 1.2 + frame * 0.3) * 14}`;
          }).join(" ")}
          fill="none"
          stroke="#8E44AD"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="620"
          strokeDashoffset={620 * (1 - sound)}
        />
      ) : null}
      <Label x={500} y={300} text="TIẾNG SẤM: CHẬM HƠN NHIỀU" opacity={sound > 0 ? 1 : 0} size={24} color="#8E44AD" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
