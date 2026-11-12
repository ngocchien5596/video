import React from "react";
import type { PropId } from "../lib/stage-types.ts";
import { COLORS, TEXT_FONT, TITLE_FONT } from "../components/brand.ts";
import { fitSize, Lines, type PropDef, Unmirror } from "./draw.tsx";

export type { PropDef };
import { STORY_PROPS } from "./story/index.ts";

const INK = COLORS.ink;

const Mango: React.FC<{ bitten?: boolean }> = ({ bitten }) => (
  <g>
    <path d="M2 -78 Q14 -96 34 -92 Q22 -76 4 -74 Z" fill="#3FA34D" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <ellipse cx="0" cy="-38" rx="33" ry="40" fill="#FFB22C" stroke={INK} strokeWidth="6" transform="rotate(-18 0 -38)" />
    <ellipse cx="-10" cy="-52" rx="9" ry="14" fill="#FFE08A" opacity="0.8" transform="rotate(-18 -10 -52)" />
    {bitten ? (
      <path
        d="M30 -62 Q14 -56 18 -40 Q8 -30 22 -18 Q30 -26 34 -40 Z"
        fill="#FFE08A"
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    ) : null}
  </g>
);

const Bowl: React.FC<{ y?: number; dirty?: boolean; rice?: boolean }> = ({ y = 0, dirty, rice }) => (
  <g transform={`translate(0 ${y})`}>
    {rice ? <ellipse cx="0" cy="-34" rx="40" ry="18" fill="#FFFFFF" stroke={INK} strokeWidth="5" /> : null}
    <path d="M-48 -32 Q-44 4 0 6 Q44 4 48 -32 Z" fill="#E8F1F8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-40 -18 Q0 -10 40 -18" fill="none" stroke="#3D7BD9" strokeWidth="5" />
    {dirty ? (
      <>
        <circle cx="-20" cy="-6" r="4" fill="#8B5A2B" />
        <circle cx="14" cy="-2" r="3" fill="#8B5A2B" />
        <circle cx="26" cy="-12" r="3" fill="#8B5A2B" />
      </>
    ) : null}
  </g>
);

const Plate: React.FC<{ rx?: number }> = ({ rx = 110 }) => (
  <>
    <ellipse cx="0" cy="-12" rx={rx} ry="22" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
    <ellipse cx="0" cy="-16" rx={rx - 26} ry="12" fill="#EEF3F7" />
  </>
);

const Drumstick: React.FC<{ x?: number; y?: number; r?: number; s?: number }> = ({ x = 0, y = 0, r = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x="-8" y="-44" width="16" height="44" rx="8" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
    <circle cx="-9" cy="-2" r="9" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
    <circle cx="9" cy="-2" r="9" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
    <ellipse cx="0" cy="-78" rx="34" ry="42" fill="#C8762E" stroke={INK} strokeWidth="6" />
    <ellipse cx="-10" cy="-92" rx="10" ry="16" fill="#E9A75A" />
  </g>
);

const Bun: React.FC<{ x?: number; y?: number; s?: number }> = ({ x = 0, y = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-44 0 Q-46 -62 0 -66 Q46 -62 44 0 Z" fill="#FFFDF6" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-8 -60 Q0 -48 8 -60 M0 -66 L0 -52" stroke="#D9C9A8" strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>
);

const Milk: React.FC<{ x?: number; s?: number }> = ({ x = 0, s = 1 }) => (
  <g transform={`translate(${x} 0) scale(${s})`}>
    <rect x="-30" y="-96" width="60" height="96" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
    <path d="M-30 -96 L0 -124 L30 -96 Z" fill="#7FB8F0" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <rect x="-30" y="-70" width="60" height="30" fill="#3D7BD9" />
    <text x="0" y="-48" textAnchor="middle" fontFamily={TITLE_FONT} fontSize="22" fill="#FFFFFF">
      SỮA
    </text>
  </g>
);

const BASE_PROPS = {
  fan: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-6" x2="0" y2="24" stroke={INK} strokeWidth="12" strokeLinecap="round" />
        <line x1="0" y1="-6" x2="0" y2="24" stroke="#8B5A2B" strokeWidth="6" strokeLinecap="round" />
        <path d="M0 20 L-58 92 A92 92 0 0 0 58 92 Z" fill="#C0392B" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {[-40, -20, 0, 20, 40].map((a) => (
          <line
            key={a}
            x1="0"
            y1="20"
            x2={Math.sin((a * Math.PI) / 180) * 90}
            y2={20 + Math.cos((a * Math.PI) / 180) * 90}
            stroke="#FFD93D"
            strokeWidth="3"
          />
        ))}
      </g>
    ),
  },
  magnifier: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-6" x2="0" y2="42" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-6" x2="0" y2="42" stroke="#8B5A2B" strokeWidth="10" strokeLinecap="round" />
        <circle cx="0" cy="76" r="32" fill="#BFE8FF" fillOpacity="0.75" stroke={INK} strokeWidth="9" />
        <path d="M-14 62 Q-6 54 6 56" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  mango: { mode: "upright", draw: () => <Mango /> },
  "mango-bitten": { mode: "upright", draw: () => <Mango bitten /> },
  "detective-hat": {
    mode: "upright",
    draw: () => (
      <g>
        <ellipse cx="0" cy="-8" rx="104" ry="20" fill="#8B6B43" stroke={INK} strokeWidth="7" />
        <path d="M-78 -12 Q-80 -92 0 -96 Q80 -92 78 -12 Z" fill="#A9845A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-76 -34 Q0 -22 76 -34" fill="none" stroke="#5C4128" strokeWidth="12" />
        <path d="M-40 -88 L-30 -60 M0 -94 L0 -60 M40 -88 L30 -60" stroke="#8B6B43" strokeWidth="5" />
        <path d="M0 -96 Q14 -110 8 -120" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  backpack: {
    mode: "upright",
    draw: () => (
      <g>
        <rect x="-62" y="-150" width="124" height="150" rx="34" fill="#3D7BD9" stroke={INK} strokeWidth="7" />
        <rect x="-44" y="-70" width="88" height="54" rx="16" fill="#2C5FAD" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
  sign: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <rect x="-112" y="-214" width="224" height="214" rx="10" fill="#F6E7C1" stroke={INK} strokeWidth="7" />
          <text x="0" y="-168" textAnchor="middle" fontFamily={TITLE_FONT} fontSize="46" fill={COLORS.red}>
            TRUY NÃ
          </text>
          <g transform="translate(0 -62) scale(0.95)">
            <Mango />
            <circle cx="-8" cy="-44" r="5" fill={INK} />
            <circle cx="10" cy="-48" r="5" fill={INK} />
            <path d="M-10 -24 Q2 -32 14 -26" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          </g>
          <text x="0" y="-22" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="26" fill={INK}>
            {text ?? ""}
          </text>
        </g>
      </Unmirror>
    ),
  },
  "rice-cooker": {
    mode: "upright",
    draw: () => (
      <g>
        <rect x="-64" y="-92" width="128" height="92" rx="26" fill="#FDF5F0" stroke={INK} strokeWidth="7" />
        <path d="M-60 -86 Q0 -128 60 -86 Z" fill="#F2B8C6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="-14" y="-124" width="28" height="12" rx="6" fill={INK} />
        <rect x="-26" y="-56" width="52" height="24" rx="8" fill="#E5484D" stroke={INK} strokeWidth="5" />
        <circle cx="0" cy="-44" r="6" fill="#FFD93D" />
      </g>
    ),
  },
  bowls: {
    mode: "upright",
    draw: () => (
      <g>
        <Bowl y={0} dirty />
        <Bowl y={-26} dirty />
        <Bowl y={-52} dirty />
        <Bowl y={-78} dirty />
      </g>
    ),
  },
  bowl: { mode: "upright", draw: () => <Bowl rice /> },
  book: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <rect x="-56" y="-120" width="112" height="120" rx="8" fill="#3FA34D" stroke={INK} strokeWidth="7" />
          <rect x="-46" y="-100" width="92" height="34" rx="4" fill="#FFF8E7" />
          <text x="0" y="-75" textAnchor="middle" fontFamily={TITLE_FONT} fontSize={fitSize(text ?? "VỞ BÀI", 84, 26)} fill={INK}>
            {text ?? "VỞ BÀI"}
          </text>
        </g>
      </Unmirror>
    ),
  },
  "rice-tray": {
    mode: "upright",
    draw: () => (
      <g>
        <ellipse cx="0" cy="-10" rx="170" ry="34" fill="#C9302C" stroke={INK} strokeWidth="7" />
        <g transform="translate(-100 -20) scale(0.75)">
          <Bowl rice />
        </g>
        <g transform="translate(100 -20) scale(0.75)">
          <Bowl rice />
        </g>
        <ellipse cx="0" cy="-30" rx="62" ry="20" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
        <ellipse cx="-14" cy="-38" rx="26" ry="12" fill="#3FA34D" />
        <ellipse cx="18" cy="-36" rx="20" ry="10" fill="#E8A33D" />
      </g>
    ),
  },

  // ------------------------------------------------------------ đồ ăn, đồ bếp
  "bowl-empty": { mode: "upright", draw: () => <Bowl /> },
  "chicken-plate": {
    mode: "upright",
    draw: () => (
      <g>
        <Drumstick x={-56} y={-14} r={-62} s={0.75} />
        <Drumstick x={-14} y={-18} r={-20} s={0.75} />
        <Drumstick x={22} y={-18} r={18} s={0.75} />
        <Drumstick x={60} y={-14} r={58} s={0.75} />
        <Plate />
      </g>
    ),
  },
  drumstick: { mode: "upright", draw: () => <Drumstick /> },
  "bun-plate": {
    mode: "upright",
    draw: () => (
      <g>
        <Plate />
        <Bun x={-50} y={-16} s={0.8} />
        <Bun x={50} y={-16} s={0.8} />
        <Bun x={0} y={-30} s={0.85} />
      </g>
    ),
  },
  bun: { mode: "upright", draw: () => <Bun /> },
  milk: { mode: "upright", draw: () => <Milk /> },
  cucumber: {
    mode: "upright",
    draw: () => (
      <g transform="rotate(12)">
        <rect x="-20" y="-120" width="40" height="120" rx="20" fill="#3FA34D" stroke={INK} strokeWidth="6" />
        {[-96, -70, -44, -20].map((y, i) => (
          <circle key={y} cx={i % 2 ? 6 : -6} cy={y} r="3.5" fill="#2A7A37" />
        ))}
        <rect x="-6" y="-132" width="12" height="16" rx="4" fill="#2A7A37" stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  candy: {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -30) rotate(-15)">
        <path d="M-30 0 L-58 -20 L-58 20 Z M30 0 L58 -20 L58 20 Z" fill="#FF8FB1" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="0" cy="0" rx="34" ry="24" fill="#FF5C8A" stroke={INK} strokeWidth="6" />
        <path d="M-16 -10 Q0 4 16 -10" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  pan: {
    mode: "upright",
    draw: () => (
      <g>
        <rect x="70" y="-36" width="110" height="18" rx="9" fill="#3A3A3A" stroke={INK} strokeWidth="5" />
        <ellipse cx="0" cy="-26" rx="84" ry="26" fill="#4A4A4A" stroke={INK} strokeWidth="7" />
        <ellipse cx="0" cy="-30" rx="66" ry="17" fill="#2B2B2B" />
        <ellipse cx="-4" cy="-32" rx="38" ry="11" fill="#1A1A1A" />
        <circle cx="-4" cy="-33" r="9" fill="#3B2A16" />
        {[-30, 0, 30].map((x, i) => (
          <path
            key={x}
            d={`M${x} -60 q-14 -18 0 -36 q14 -18 0 -36`}
            stroke="#9A9A9A"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            opacity={0.8 - i * 0.1}
          />
        ))}
      </g>
    ),
  },
  fridge: {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        <rect x="-110" y="-400" width="220" height="400" rx="22" fill="#E8F1F8" stroke={INK} strokeWidth="8" />
        <line x1="-110" y1="-262" x2="110" y2="-262" stroke={INK} strokeWidth="7" />
        <rect x="74" y="-330" width="14" height="50" rx="7" fill="#9AA8B4" stroke={INK} strokeWidth="4" />
        <rect x="74" y="-236" width="14" height="80" rx="7" fill="#9AA8B4" stroke={INK} strokeWidth="4" />
        {text ? (
          <>
            {/* Bìa carton và băng dính quấn kín */}
            <rect x="-100" y="-250" width="200" height="170" rx="6" fill="#C9A26B" stroke={INK} strokeWidth="5" />
            <g stroke="#E8C547" strokeWidth="26" opacity="0.92">
              <line x1="-118" y1="-360" x2="118" y2="-40" />
              <line x1="118" y1="-360" x2="-118" y2="-40" />
            </g>
            <rect x="-104" y="-200" width="208" height="70" rx="6" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
            <Lines text={text} cy={-165} width={190} max={34} color={COLORS.red} />
          </>
        ) : null}
      </g>
    ),
  },

  // ------------------------------------------------------------ đồ dùng
  compass: {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -48)">
        <circle r="46" fill="#C99A3B" stroke={INK} strokeWidth="7" />
        <circle r="34" fill="#FFF8E7" stroke={INK} strokeWidth="4" />
        <path d="M0 -28 L9 0 L-9 0 Z" fill={COLORS.red} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M0 28 L9 0 L-9 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <circle r="5" fill={INK} />
      </g>
    ),
  },
  "alarm-clock": {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g transform="translate(0 -58)">
          <circle cx="-34" cy="-40" r="18" fill="#FFD93D" stroke={INK} strokeWidth="6" />
          <circle cx="34" cy="-40" r="18" fill="#FFD93D" stroke={INK} strokeWidth="6" />
          <path d="M-30 44 L-40 58 M30 44 L40 58" stroke={INK} strokeWidth="8" strokeLinecap="round" />
          <circle r="50" fill={COLORS.red} stroke={INK} strokeWidth="7" />
          <circle r="38" fill="#FFF8E7" />
          {text ? (
            <Lines text={text} cy={2} width={64} max={34} />
          ) : (
            <path d="M0 0 L0 -26 M0 0 L18 8" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          )}
        </g>
      </Unmirror>
    ),
  },
  pillow: {
    mode: "upright",
    draw: () => (
      <g>
        <path
          d="M-80 -6 Q-92 -44 -76 -82 Q0 -96 76 -82 Q92 -44 80 -6 Q0 6 -80 -6 Z"
          fill="#E9E1FF"
          stroke={INK}
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <path d="M-50 -44 Q0 -34 50 -44" stroke="#C3B6EE" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  tent: {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-160 0 L0 -250 L160 0 Z" fill="#F28C38" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M0 -250 L-44 0 L44 0 Z" fill="#B85A18" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M0 -250 L0 -282" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <path d="M0 -282 L36 -270 L0 -258 Z" fill={COLORS.red} stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  ball: {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -48)">
        <circle r="48" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
        <polygon points="0,-16 15,-5 9,13 -9,13 -15,-5" fill={INK} />
        {[0, 72, 144, 216, 288].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0 -16 L0 -30" stroke={INK} strokeWidth="4" />
            <path d="M-12 -44 Q0 -36 12 -44 L8 -30 L-8 -30 Z" fill={INK} />
          </g>
        ))}
      </g>
    ),
  },
  broom: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-20" x2="0" y2="150" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <line x1="0" y1="-20" x2="0" y2="150" stroke="#C8934E" strokeWidth="9" strokeLinecap="round" />
        <path d="M-14 146 L14 146 L46 240 L-46 240 Z" fill="#E8C547" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-20 172 L20 172" stroke="#B5892A" strokeWidth="6" />
        {[-30, -10, 10, 30].map((x) => (
          <line key={x} x1={x * 0.4} y1="180" x2={x} y2="236" stroke="#B5892A" strokeWidth="3" />
        ))}
      </g>
    ),
  },
  pen: {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-9" y="-20" width="18" height="110" rx="4" fill="#3D7BD9" stroke={INK} strokeWidth="5" />
        <rect x="-9" y="-20" width="18" height="18" rx="4" fill="#E5484D" stroke={INK} strokeWidth="5" />
        <path d="M-9 90 L0 118 L9 90 Z" fill="#F6E7C1" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  paper: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g transform="rotate(-4)">
          <rect x="-86" y="-130" width="172" height="130" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
          {[-104, -84, -64, -44, -24].map((y) => (
            <line key={y} x1="-70" y1={y} x2="70" y2={y} stroke="#BFD7F2" strokeWidth="3" />
          ))}
          {text ? <Lines text={text} cy={-65} width={150} max={46} color={COLORS.red} /> : null}
        </g>
      </Unmirror>
    ),
  },
  plant: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <path d="M-56 -90 L56 -90 L42 0 L-42 0 Z" fill="#C0663A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="-8" y="-200" width="16" height="112" fill="#8B5A2B" stroke={INK} strokeWidth="5" />
          <circle cx="0" cy="-230" r="74" fill="#3FA34D" stroke={INK} strokeWidth="7" />
          <circle cx="-30" cy="-250" r="13" fill="#B7E36A" stroke={INK} strokeWidth="4" />
          <circle cx="28" cy="-220" r="13" fill="#B7E36A" stroke={INK} strokeWidth="4" />
          <circle cx="4" cy="-266" r="13" fill="#B7E36A" stroke={INK} strokeWidth="4" />
          {text ? (
            <>
              {/* Rào: dây quấn quanh tán cây và bảng tên */}
              <g stroke="#E8C547" strokeWidth="9" fill="none">
                <ellipse cx="0" cy="-230" rx="82" ry="22" transform="rotate(-12 0 -230)" />
                <ellipse cx="0" cy="-200" rx="80" ry="18" transform="rotate(10 0 -200)" />
              </g>
              <rect x="-80" y="-80" width="160" height="50" rx="6" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
              <Lines text={text} cy={-55} width={150} max={30} color={COLORS.red} />
            </>
          ) : null}
        </g>
      </Unmirror>
    ),
  },
  // ------------------------------------------------ truyện cổ tích (cảnh hồi ức)
  axe: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-10" x2="0" y2="150" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-10" x2="0" y2="150" stroke="#9C6B3C" strokeWidth="10" strokeLinecap="round" />
        <path d="M-4 112 L52 92 Q78 136 52 182 L-4 162 Z" fill="#C9CED6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M50 100 Q70 136 50 174" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  bow: {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M-96 40 Q0 -40 96 40" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path d="M-96 40 Q0 -40 96 40" fill="none" stroke="#B5892A" strokeWidth="11" strokeLinecap="round" />
        <line x1="-96" y1="40" x2="96" y2="40" stroke={INK} strokeWidth="4" />
        <line x1="0" y1="-30" x2="0" y2="96" stroke={INK} strokeWidth="6" />
        <path d="M-12 96 L0 124 L12 96 Z" fill="#C9CED6" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "wine-jar": {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <g>
        <path d="M-46 -150 Q-86 -116 -76 -56 Q-66 0 0 0 Q66 0 76 -56 Q86 -116 46 -150 Z" fill="#9C5B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="-38" y="-176" width="76" height="30" rx="8" fill="#7A4421" stroke={INK} strokeWidth="6" />
        <path d="M-30 -176 Q0 -206 30 -176 Z" fill="#E8C547" stroke={INK} strokeWidth="5" />
        <Unmirror mirrored={mirrored}>
          <rect x="-34" y="-112" width="68" height="68" fill="#C0392B" stroke={INK} strokeWidth="5" transform="rotate(45 0 -78)" />
          <Lines text={text ?? "RƯỢU"} cy={-78} width={56} max={26} color="#FFE27A" font={TEXT_FONT} />
        </Unmirror>
      </g>
    ),
  },
  firewood: {
    mode: "upright",
    draw: () => (
      <g>
        {[-42, -20, 2, 24, 44].map((x, i) => (
          <rect key={x} x={x - 11} y={-330 + (i % 2) * 18} width="22" height="300" rx="10" fill="#9C6B3C" stroke={INK} strokeWidth="6" />
        ))}
        <path d="M-58 -250 Q0 -232 58 -250 M-58 -110 Q0 -92 58 -110" fill="none" stroke="#5C4128" strokeWidth="10" strokeLinecap="round" />
      </g>
    ),
  },
  "mandarin-hat": {
    mode: "upright",
    draw: () => (
      <g>
        <ellipse cx="-118" cy="-40" rx="56" ry="18" fill="#1E1B2E" stroke={INK} strokeWidth="6" transform="rotate(-10 -118 -40)" />
        <ellipse cx="118" cy="-40" rx="56" ry="18" fill="#1E1B2E" stroke={INK} strokeWidth="6" transform="rotate(10 118 -40)" />
        <path d="M-92 0 Q-96 -96 0 -100 Q96 -96 92 0 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-90 -18 Q0 -4 90 -18" fill="none" stroke="#E8C547" strokeWidth="8" />
        <circle cx="0" cy="-60" r="12" fill="#E8C547" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "demon-head": {
    mode: "upright",
    draw: () => (
      <g transform="scale(0.8)">
        <path d="M-60 -120 L-84 -190 L-30 -140 Z M60 -120 L84 -190 L30 -140 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="0" cy="-70" rx="86" ry="78" fill="#5E8C3E" stroke={INK} strokeWidth="7" />
        <path d="M-50 -96 L-14 -82 M50 -96 L14 -82" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <circle cx="-32" cy="-72" r="11" fill="#FFE27A" stroke={INK} strokeWidth="4" />
        <circle cx="32" cy="-72" r="11" fill="#FFE27A" stroke={INK} strokeWidth="4" />
        <path d="M-46 -26 Q0 -6 46 -26 L36 -12 Q0 6 -36 -12 Z" fill="#3B1E1E" stroke={INK} strokeWidth="5" />
        <path d="M-30 -24 L-24 -6 L-18 -22 M18 -22 L24 -6 L30 -24" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      </g>
    ),
  },
  "python-demon": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Thân trăn cuộn tròn */}
        <ellipse cx="0" cy="-60" rx="210" ry="66" fill="#4E7A3A" stroke={INK} strokeWidth="9" />
        <ellipse cx="-10" cy="-140" rx="170" ry="58" fill="#5E8C3E" stroke={INK} strokeWidth="9" />
        <ellipse cx="0" cy="-212" rx="128" ry="48" fill="#4E7A3A" stroke={INK} strokeWidth="9" />
        {[-150, -90, -30, 30, 90, 150].map((x) => (
          <path key={x} d={`M${x - 18} -64 q18 -22 36 0`} fill="none" stroke="#9BC06B" strokeWidth="6" />
        ))}
        {/* Cổ vươn lên, đầu có sừng */}
        <path d="M40 -230 Q120 -330 70 -440" fill="none" stroke={INK} strokeWidth="78" strokeLinecap="round" />
        <path d="M40 -230 Q120 -330 70 -440" fill="none" stroke="#5E8C3E" strokeWidth="62" strokeLinecap="round" />
        <path d="M14 -530 L-4 -600 L40 -540 Z M110 -530 L132 -600 L86 -540 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="62" cy="-482" rx="88" ry="64" fill="#5E8C3E" stroke={INK} strokeWidth="8" />
        <path d="M14 -508 L46 -494 M110 -508 L78 -494" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <circle cx="32" cy="-486" r="12" fill="#FFE27A" stroke={INK} strokeWidth="5" />
        <circle cx="92" cy="-486" r="12" fill="#FFE27A" stroke={INK} strokeWidth="5" />
        <path d="M10 -444 Q62 -420 114 -444 L100 -430 Q62 -410 24 -430 Z" fill="#3B1E1E" stroke={INK} strokeWidth="5" />
        <path d="M30 -442 L36 -424 L42 -440 M82 -440 L88 -424 L94 -442" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
        <path d="M62 -420 L58 -392 L48 -380 M58 -392 L68 -380" fill="none" stroke="#D62828" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  eagle: {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -760)">
        <path d="M-20 -10 Q-120 -110 -230 -70 Q-170 -40 -190 -10 Q-130 -20 -120 10 Q-70 0 -20 20 Z" fill="#6B4423" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M20 -10 Q120 -110 230 -70 Q170 -40 190 -10 Q130 -20 120 10 Q70 0 20 20 Z" fill="#6B4423" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <ellipse cx="0" cy="10" rx="44" ry="66" fill="#7A4E2D" stroke={INK} strokeWidth="7" />
        <path d="M-30 70 L0 110 L30 70 Z" fill="#6B4423" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <circle cx="0" cy="-56" r="36" fill="#F2EBDD" stroke={INK} strokeWidth="7" />
        <path d="M-6 -48 L30 -40 L0 -26 Z" fill="#FFB22C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-22 -66 L-2 -58" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <circle cx="-12" cy="-60" r="5" fill={INK} />
        <path d="M-20 70 l-8 26 M20 70 l8 26" stroke="#FFB22C" strokeWidth="7" strokeLinecap="round" />
      </g>
    ),
  },
  boulder: {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-190 0 L-200 -150 Q-170 -300 -40 -320 Q110 -330 180 -220 Q214 -120 196 0 Z" fill="#8A8F99" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
        <path d="M-120 -230 Q-60 -270 20 -262 M-60 -100 L-10 -160 L40 -120 M90 -60 L130 -140" fill="none" stroke="#5E626B" strokeWidth="8" strokeLinecap="round" />
        <path d="M-150 -170 Q-130 -250 -60 -276" fill="none" stroke="#B4B9C2" strokeWidth="10" strokeLinecap="round" />
      </g>
    ),
  },
} satisfies Partial<Record<PropId, PropDef>>;

/** Mọi đạo cụ: đạo cụ chung + đạo cụ truyện (engine/stage/story). */
export const PROPS = { ...BASE_PROPS, ...STORY_PROPS } as Record<PropId, PropDef>;

