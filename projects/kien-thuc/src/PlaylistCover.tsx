import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { INK, PARCHMENT } from "../../../engine/parchment/ParchmentHud.tsx";
import { MiloDefs, Stickman } from "../../../engine/parchment/Stickman.tsx";

/** Hình vẽ mực trên tờ giấy da: ba cánh cửa, kim tự tháp và bóng nắng, tam giác vuông, chiếc vương miện. */
const Doodles: React.FC = () => (
  <g fill="none" stroke={INK.line} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
    {/* Ba cánh cửa (Monty Hall) */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${70 + i * 78} 120)`}>
        <rect x={0} y={0} width={62} height={104} rx={6} fill={i === 0 ? INK.goldFill : INK.wood} />
        <circle cx={50} cy={56} r={4} fill={INK.line} />
        <text x={31} y={38} textAnchor="middle" fill={INK.line} stroke="none" fontSize={30} fontFamily={TEXT_FONT} fontWeight={900}>
          {i + 1}
        </text>
      </g>
    ))}
    <text x={310} y={190} fill={INK.red} stroke="none" fontSize={72} fontFamily={TEXT_FONT} fontWeight={900}>
      ?
    </text>
    {/* Kim tự tháp, cây cọc và hai bóng nắng song song (Thales) */}
    <path d="M 70 470 L 190 350 L 310 470 Z" fill={INK.paperDark} />
    <path d="M 190 350 L 400 470" stroke={INK.gold} strokeDasharray="10 10" />
    <line x1={360} y1={470} x2={360} y2={420} strokeWidth={7} />
    <path d="M 40 470 L 420 470" />
    {/* Tam giác vuông 3-4-5 */}
    <g transform="translate(70 560)">
      <path d="M 0 120 L 160 120 L 0 0 Z" fill="#FFF6DD" />
      <path d="M 0 100 L 20 100 L 20 120" strokeWidth={3} />
      <text x={190} y={80} fill={INK.blue} stroke="none" fontSize={40} fontFamily={TEXT_FONT} fontWeight={900}>
        a² + b² = c²
      </text>
    </g>
  </g>
);

/** Cảnh trên tờ giấy da (toạ độ 520×780): hình vẽ bên trái, Milo đứng bên phải. */
const Sheet: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <svg width={w} height={h} viewBox="0 0 900 780" style={{ display: "block" }}>
    <defs>
      <MiloDefs />
    </defs>
    <rect x={0} y={0} width={900} height={780} rx={30} fill={INK.paper} stroke="#C99A4B" strokeWidth={8} />
    <rect x={14} y={14} width={872} height={752} rx={22} fill="none" stroke="rgba(110,68,35,0.45)" strokeWidth={3} />
    <Doodles />
    <Stickman x={690} y={730} scale={1.25} pose="eureka" lively={false} />
  </svg>
);

/**
 * Ảnh bìa playlist của series "Thiên Đường Kiến Thức".
 * Khung ngang (1280×720, YouTube) xếp chữ bên trái, tờ giấy da có Milo bên phải; khung vuông xếp chữ ở trên.
 */
export const PlaylistCover: React.FC = () => {
  const { width, height } = useVideoConfig();
  const wide = width > height;
  const titleSize = wide ? 92 : 104;
  const title = (
    <div style={{ textAlign: wide ? "left" : "center" }}>
      <div style={{ fontFamily: TITLE_FONT, fontSize: titleSize * 0.62, letterSpacing: 3, color: COLORS.white, ...outline(7) }}>THIÊN ĐƯỜNG</div>
      <div style={{ fontFamily: TITLE_FONT, fontSize: titleSize, lineHeight: 1, color: PARCHMENT.gold, rotate: "-3deg", ...outline(12) }}>KIẾN THỨC</div>
      <div
        style={{
          display: "inline-block",
          marginTop: wide ? 26 : 22,
          padding: "12px 22px",
          backgroundColor: PARCHMENT.cream,
          border: `5px solid ${COLORS.ink}`,
          borderRadius: 18,
          fontFamily: TEXT_FONT,
          fontWeight: 900,
          fontSize: wide ? 30 : 34,
          lineHeight: 1.2,
          color: COLORS.ink,
          rotate: "1.5deg",
        }}
      >
        Chuyện thật sau bài học
        <br />
        Toán và Khoa học
      </div>
    </div>
  );
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 30% 30%, #8A5A2B 0%, #4A3018 55%, ${PARCHMENT.bgOuter} 100%)`,
        flexDirection: wide ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: wide ? 40 : 30,
        padding: wide ? "0 56px" : "50px 60px",
      }}
    >
      {title}
      <Sheet w={wide ? 680 : 840} h={wide ? 589 : 728} />
    </AbsoluteFill>
  );
};
