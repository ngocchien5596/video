import React from "react";
import type { PropId } from "../lib/stage-types.ts";
import { TEXT_FONT, TITLE_FONT } from "../components/brand.ts";
import { fitSize, Lines, type PropDef, Unmirror } from "./draw.tsx";

export type { PropDef };
import { STORY_PROPS } from "./story/index.ts";
import { LINE, PAL, PotPlant, SoftShadow, WarmDefs } from "./village.tsx";

const INK = LINE;
const RED = "#B8382A";

/** Điểm trên cung tròn tâm (0, cy), bán kính r, góc a (độ) tính từ trục +y. */
const pxy = (r: number, a: number, cy = 0): [number, number] => [
  Math.round(Math.sin((a * Math.PI) / 180) * r * 10) / 10,
  Math.round((cy + Math.cos((a * Math.PI) / 180) * r) * 10) / 10,
];
const pt = (r: number, a: number, cy = 0) => pxy(r, a, cy).join(" ");

const Mango: React.FC<{ bitten?: boolean }> = ({ bitten }) => (
  <g>
    <SoftShadow cy={-2} rx={40} />
    <path d="M2 -78 Q14 -98 36 -92 Q24 -74 4 -74 Z" fill={PAL.leaf} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M4 -76 Q20 -86 30 -88" fill="none" stroke={PAL.leafDark} strokeWidth="3" />
    <ellipse cx="0" cy="-38" rx="33" ry="40" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" transform="rotate(-18 0 -38)" />
    <ellipse cx="-12" cy="-54" rx="8" ry="14" fill="#FFF0B8" opacity="0.75" transform="rotate(-18 -12 -54)" />
    <path d="M18 -14 Q28 -30 26 -50" fill="none" stroke="#B5701A" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    {bitten ? (
      <path d="M30 -62 Q14 -56 18 -40 Q8 -30 22 -18 Q30 -26 34 -40 Z" fill="#FFE08A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    ) : null}
  </g>
);

/** Bát sứ men lam (hoa văn xanh), có thể có cơm, bẩn (bát chưa rửa). */
const Bowl: React.FC<{ y?: number; dirty?: boolean; rice?: boolean; shadow?: boolean }> = ({ y = 0, dirty, rice, shadow = true }) => (
  <g transform={`translate(0 ${y})`}>
    {shadow ? <SoftShadow cy={2} rx={56} /> : null}
    {rice ? (
      <>
        <path d="M-42 -32 Q-36 -66 0 -68 Q36 -66 42 -32 Z" fill="#FFFDF6" stroke={INK} strokeWidth="5" />
        {[[-18, -50], [6, -58], [20, -44], [-4, -42], [-26, -38]].map(([x, yy], i) => (
          <ellipse key={i} cx={x} cy={yy} rx="5" ry="2.6" fill="#E6DCC4" transform={`rotate(${i * 35} ${x} ${yy})`} />
        ))}
        <path d="M-28 -48 Q-20 -60 -6 -62" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      </>
    ) : null}
    <rect x="-18" y="0" width="36" height="8" rx="3" fill="#E6DFCF" stroke={INK} strokeWidth="4" />
    <path d="M-50 -32 Q-46 6 0 6 Q46 6 50 -32 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <ellipse cx="0" cy="-32" rx="50" ry="7" fill="#F7F2E6" stroke={INK} strokeWidth="4" />
    <path d="M-46 -22 Q0 -12 46 -22" fill="none" stroke={PAL.blueGlaze} strokeWidth="4" />
    <path d="M-30 -10 q8 -8 16 0 q8 8 16 0 q8 -8 16 0 q8 8 12 2" fill="none" stroke={PAL.blueGlaze} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M-38 -24 Q-36 -10 -24 -2" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
    {dirty ? (
      <>
        <circle cx="-20" cy="-30" r="4" fill="#9A6A3A" />
        <circle cx="14" cy="-31" r="3" fill="#9A6A3A" />
        <path d="M22 -12 q6 6 2 12" stroke="#9A6A3A" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    ) : null}
  </g>
);

/** Đĩa sứ trắng viền lam. */
const Plate: React.FC<{ rx?: number }> = ({ rx = 110 }) => (
  <>
    <SoftShadow cy={-2} rx={rx + 16} />
    <ellipse cx="0" cy="-10" rx={rx} ry="22" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" />
    <ellipse cx="0" cy="-14" rx={rx - 22} ry="12" fill="#F4EEE0" />
    <ellipse cx="0" cy="-12" rx={rx - 8} ry="18" fill="none" stroke={PAL.blueGlaze} strokeWidth="3" />
  </>
);

const Drumstick: React.FC<{ x?: number; y?: number; r?: number; s?: number }> = ({ x = 0, y = 0, r = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x="-8" y="-44" width="16" height="44" rx="8" fill="#FFF6E2" stroke={INK} strokeWidth="5" />
    <circle cx="-9" cy="-2" r="9" fill="#FFF6E2" stroke={INK} strokeWidth="5" />
    <circle cx="9" cy="-2" r="9" fill="#FFF6E2" stroke={INK} strokeWidth="5" />
    <path d="M-34 -78 Q-36 -122 0 -122 Q36 -122 34 -78 Q30 -40 0 -38 Q-30 -40 -34 -78 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" />
    <path d="M10 -112 Q30 -96 26 -70 Q20 -50 4 -46" fill="none" stroke="#A5641A" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
    <ellipse cx="-12" cy="-96" rx="8" ry="14" fill="#FFE7A0" opacity="0.8" />
    {[[-14, -70], [8, -84], [16, -62], [-4, -104]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2.5" fill="#B5701A" />
    ))}
  </g>
);

/** Bánh bao: vỏ kem, nếp gấp xoắn trên đỉnh, bóng mềm. */
const Bun: React.FC<{ x?: number; y?: number; s?: number }> = ({ x = 0, y = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-2} rx={52} />
    <path d="M-46 0 Q-50 -58 0 -66 Q50 -58 46 0 Q0 8 -46 0 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-30 -8 Q-34 -36 -14 -52" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
    <path d="M30 -6 Q38 -30 26 -48" fill="none" stroke="#D9CBAE" strokeWidth="5" strokeLinecap="round" />
    {[-30, -14, 0, 14, 30].map((a) => (
      <path key={a} transform={`rotate(${a} 0 -62)`} d="M0 -62 Q-4 -50 0 -40" fill="none" stroke="#CDBB95" strokeWidth="3.5" strokeLinecap="round" />
    ))}
    <circle cx="0" cy="-63" r="5" fill="#E9DDC3" stroke="#CDBB95" strokeWidth="3" />
  </g>
);

const Milk: React.FC<{ x?: number; s?: number }> = ({ x = 0, s = 1 }) => (
  <g transform={`translate(${x} 0) scale(${s})`}>
    <SoftShadow cy={-2} rx={44} />
    <rect x="-30" y="-96" width="60" height="96" rx="4" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" />
    <path d="M-30 -96 L0 -124 L30 -96 Z" fill="#9CC0D8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <rect x="-30" y="-70" width="60" height="30" fill={PAL.blueGlaze} />
    <text x="0" y="-48" textAnchor="middle" fontFamily={TITLE_FONT} fontSize="22" fill="#FFF6E2">
      SỮA
    </text>
  </g>
);

/** Quạt giấy xếp vẽ tre mực tàu, nan tre nâu (trục quạt ở (0, 12), mở về phía +y). */
const PaperFan: React.FC = () => {
  const C = 12;
  const A = 52;
  const stalks: [number, number, number, number][] = [
    [40, -34, 106, -24],
    [44, -10, 100, 8],
  ];
  const leaves: [number, number, number][] = [
    [92, -26, 200],
    [78, 6, -20],
    [96, 12, 40],
    [64, -14, 160],
  ];
  const [sx, sy] = pxy(86, -38, C);
  return (
    <g>
      <path d="M-6 -6 L6 -6 L4 26 L-4 26 Z" fill="#7B4B28" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      {[-44, -26, -9, 9, 26, 44].map((a) => {
        const [x, y] = pxy(38, a, C);
        return <line key={a} x1="0" y1={C} x2={x} y2={y} stroke="#8A5530" strokeWidth="4" strokeLinecap="round" />;
      })}
      <path
        d={`M${pt(36, -A, C)} L${pt(108, -A, C)} A108 108 0 0 0 ${pt(108, A, C)} L${pt(36, A, C)} A36 36 0 0 1 ${pt(36, -A, C)} Z`}
        fill="url(#w-paper)"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {Array.from({ length: 12 }, (_, i) => {
        const a0 = -A + (i * 2 * A) / 12;
        const a1 = a0 + (2 * A) / 12;
        return i % 2 ? <path key={i} d={`M${pt(36, a0, C)} L${pt(108, a0, C)} L${pt(108, a1, C)} L${pt(36, a1, C)} Z`} fill="#C9A46A" opacity="0.22" /> : null;
      })}
      {/* Tranh tre mực tàu: hai thân tre có đốt, khóm lá nhọn */}
      {stalks.map(([r0, a0, r1, a1], i) => (
        <g key={`st${i}`}>
          <line x1={pxy(r0, a0, C)[0]} y1={pxy(r0, a0, C)[1]} x2={pxy(r1, a1, C)[0]} y2={pxy(r1, a1, C)[1]} stroke="#3A2A1E" strokeWidth="5" strokeLinecap="round" />
          {[0.35, 0.65].map((t) => {
            const [nx, ny] = pxy(r0 + (r1 - r0) * t, a0 + (a1 - a0) * t, C);
            return <circle key={t} cx={nx} cy={ny} r="3.5" fill="#F6E9CF" stroke="#3A2A1E" strokeWidth="2" />;
          })}
        </g>
      ))}
      {leaves.map(([r, a, rot], i) => {
        const [lx, ly] = pxy(r, a, C);
        return (
          <g key={i} transform={`translate(${lx} ${ly}) rotate(${rot})`}>
            {[-28, 0, 28].map((d) => (
              <path key={d} transform={`rotate(${d})`} d="M0 0 Q10 -5 26 0 Q10 4 0 0 Z" fill="#3A2A1E" opacity="0.88" />
            ))}
          </g>
        );
      })}
      <circle cx={sx} cy={sy} r="6" fill={RED} opacity="0.85" />
      {[-A, A].map((a) => {
        const [x, y] = pxy(110, a, C);
        return (
          <g key={a}>
            <line x1="0" y1={C} x2={x} y2={y} stroke={INK} strokeWidth="9" strokeLinecap="round" />
            <line x1="0" y1={C} x2={x} y2={y} stroke="#8A5530" strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      })}
      <circle cx="0" cy={C} r="6" fill="url(#w-brass)" stroke={INK} strokeWidth="3" />
    </g>
  );
};

const BASE_PROPS = {
  fan: { mode: "extend", draw: () => <PaperFan /> },
  magnifier: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-6" x2="0" y2="42" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-6" x2="0" y2="42" stroke="#9A6236" strokeWidth="10" strokeLinecap="round" />
        <circle cx="0" cy="76" r="32" fill="#E9F1EE" fillOpacity="0.6" stroke="url(#w-brass)" strokeWidth="10" />
        <circle cx="0" cy="76" r="37" fill="none" stroke={INK} strokeWidth="3" />
        <circle cx="0" cy="76" r="27" fill="none" stroke={INK} strokeWidth="3" />
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
        <ellipse cx="0" cy="-8" rx="104" ry="20" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
        <path d="M-78 -12 Q-80 -92 0 -96 Q80 -92 78 -12 Z" fill="url(#w-wood-h)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-76 -34 Q0 -22 76 -34" fill="none" stroke="#3A2416" strokeWidth="12" />
        <path d="M-50 -80 Q-30 -88 -10 -86" fill="none" stroke="#E2B07A" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      </g>
    ),
  },
  /** Túi vải đeo màu vàng nghệ, nắp nâu. */
  backpack: {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={70} />
        <path d="M-40 -150 Q-40 -186 0 -186 Q40 -186 40 -150" fill="none" stroke={INK} strokeWidth="14" />
        <path d="M-40 -150 Q-40 -186 0 -186 Q40 -186 40 -150" fill="none" stroke="#8A5530" strokeWidth="7" />
        <rect x="-62" y="-150" width="124" height="150" rx="26" fill="url(#w-turmeric)" stroke={INK} strokeWidth="7" />
        <path d="M-62 -110 Q-62 -150 -30 -150 L30 -150 Q62 -150 62 -110 L62 -70 Q0 -56 -62 -70 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="-10" y="-76" width="20" height="24" rx="4" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        <rect x="-40" y="-44" width="80" height="34" rx="8" fill="none" stroke="#B5781A" strokeWidth="4" strokeDasharray="6 5" />
      </g>
    ),
  },
  sign: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <rect x="-112" y="-214" width="224" height="214" rx="6" fill="url(#w-paper)" stroke={INK} strokeWidth="7" />
          <path d="M-100 -200 L100 -200" stroke="#C9A46A" strokeWidth="3" />
          <text x="0" y="-168" textAnchor="middle" fontFamily={TITLE_FONT} fontSize="46" fill={RED}>
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
        <SoftShadow cy={-2} rx={80} />
        <rect x="-64" y="-92" width="128" height="92" rx="26" fill="url(#w-glaze)" stroke={INK} strokeWidth="7" />
        <path d="M-60 -86 Q0 -128 60 -86 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="-16" y="-126" width="32" height="12" rx="6" fill="#5E3A20" stroke={INK} strokeWidth="3" />
        <rect x="-26" y="-56" width="52" height="24" rx="8" fill="#5E3A20" stroke={INK} strokeWidth="5" />
        <circle cx="0" cy="-44" r="6" fill="#F4C55A" />
        <path d="M-48 -70 Q-52 -36 -40 -14" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        {[-20, 18].map((x, i) => (
          <path key={x} d={`M${x} -134 q-10 -16 0 -32 q10 -16 0 -32`} fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity={0.6 - i * 0.15} />
        ))}
      </g>
    ),
  },
  bowls: {
    mode: "upright",
    draw: () => (
      <g>
        <Bowl y={0} dirty />
        <Bowl y={-26} dirty shadow={false} />
        <Bowl y={-52} dirty shadow={false} />
        <Bowl y={-78} dirty shadow={false} />
      </g>
    ),
  },
  /** Bát cơm men lam kèm đôi đũa tre. */
  bowl: {
    mode: "upright",
    draw: () => (
      <g>
        <Bowl rice />
        {[0, 12].map((d) => (
          <g key={d}>
            <line x1={20 + d} y1={-86 - d / 2} x2={64 + d} y2={-30 - d / 2} stroke={INK} strokeWidth="9" strokeLinecap="round" />
            <line x1={20 + d} y1={-86 - d / 2} x2={64 + d} y2={-30 - d / 2} stroke="#C48D57" strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}
      </g>
    ),
  },
  /** Sách cổ đóng chỉ, bìa nâu, nhãn giấy dán ghi chữ. */
  book: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <SoftShadow cy={-2} rx={70} />
          <rect x="-52" y="-120" width="112" height="120" rx="6" fill="#F3E3BE" stroke={INK} strokeWidth="6" />
          {[-110, -96, -82, -68, -54, -40, -26, -12].map((y) => (
            <line key={y} x1="48" y1={y} x2="58" y2={y} stroke="#C9A46A" strokeWidth="2" />
          ))}
          <rect x="-58" y="-124" width="108" height="122" rx="6" fill="url(#w-wood-h)" stroke={INK} strokeWidth="7" />
          {[-104, -74, -44, -14].map((y) => (
            <g key={y}>
              <line x1="-58" y1={y} x2="-42" y2={y} stroke="#F3E3BE" strokeWidth="4" />
              <circle cx="-44" cy={y} r="3" fill="#F3E3BE" />
            </g>
          ))}
          <line x1="-44" y1="-118" x2="-44" y2="-8" stroke="#5E3A20" strokeWidth="3" />
          <rect x="-34" y="-108" width="74" height="40" rx="3" fill="url(#w-paper)" stroke={INK} strokeWidth="4" />
          <text x="3" y="-81" textAnchor="middle" fontFamily={TITLE_FONT} fontSize={fitSize(text ?? "VỞ BÀI", 66, 24)} fill={INK}>
            {text ?? "VỞ BÀI"}
          </text>
          <path d="M-30 -60 Q0 -56 36 -60" fill="none" stroke="#E2B07A" strokeWidth="3" opacity="0.6" />
        </g>
      </Unmirror>
    ),
  },
  /** Mâm gỗ sơn son: bát cơm, đĩa rau. */
  "rice-tray": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={2} rx={190} />
        <ellipse cx="0" cy="-4" rx="172" ry="30" fill="#6E2A20" stroke={INK} strokeWidth="6" />
        <ellipse cx="0" cy="-14" rx="170" ry="34" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" />
        <ellipse cx="0" cy="-16" rx="150" ry="24" fill="none" stroke="#E9B949" strokeWidth="3" opacity="0.8" />
        <g transform="translate(-104 -22) scale(0.7)">
          <Bowl rice shadow={false} />
        </g>
        <g transform="translate(104 -22) scale(0.7)">
          <Bowl rice shadow={false} />
        </g>
        <ellipse cx="0" cy="-30" rx="62" ry="18" fill="url(#w-glaze)" stroke={INK} strokeWidth="5" />
        <path d="M-40 -34 Q-20 -54 0 -38 Q16 -56 36 -36 Q20 -26 -40 -34 Z" fill={PAL.leaf} stroke={INK} strokeWidth="4" />
        <circle cx="12" cy="-40" r="6" fill="#E3A631" stroke={INK} strokeWidth="3" />
      </g>
    ),
  },

  // ------------------------------------------------------------ đồ ăn, đồ bếp
  "bowl-empty": { mode: "upright", draw: () => <Bowl /> },
  "chicken-plate": {
    mode: "upright",
    draw: () => (
      <g>
        <Plate />
        <Drumstick x={-56} y={-14} r={-62} s={0.75} />
        <Drumstick x={-14} y={-18} r={-20} s={0.75} />
        <Drumstick x={22} y={-18} r={18} s={0.75} />
        <Drumstick x={60} y={-14} r={58} s={0.75} />
        <path d="M-90 -18 Q-80 -34 -66 -24 M76 -26 Q90 -36 96 -18" fill="none" stroke={PAL.leaf} strokeWidth="7" strokeLinecap="round" />
      </g>
    ),
  },
  /** Đĩa gà chỉ còn 2 miếng. */
  "chicken-plate-2": {
    mode: "upright",
    draw: () => (
      <g>
        <Plate />
        <Drumstick x={-30} y={-16} r={-35} s={0.75} />
        <Drumstick x={30} y={-16} r={35} s={0.75} />
      </g>
    ),
  },
  /** Đĩa gà chỉ còn 1 miếng. */
  "chicken-plate-1": {
    mode: "upright",
    draw: () => (
      <g>
        <Plate />
        <Drumstick x={10} y={-16} r={20} s={0.75} />
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
        <rect x="-20" y="-120" width="40" height="120" rx="20" fill={PAL.leaf} stroke={INK} strokeWidth="6" />
        <path d="M-10 -108 Q-14 -60 -8 -14" fill="none" stroke={PAL.leafLight} strokeWidth="6" strokeLinecap="round" />
        {[-96, -70, -44, -20].map((y, i) => (
          <circle key={y} cx={i % 2 ? 8 : -2} cy={y} r="3.5" fill={PAL.leafDark} />
        ))}
        <rect x="-6" y="-132" width="12" height="16" rx="4" fill={PAL.leafDark} stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  candy: {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -30) rotate(-15)">
        <path d="M-30 0 L-58 -20 L-58 20 Z M30 0 L58 -20 L58 20 Z" fill="#F2B6A0" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="0" cy="0" rx="34" ry="24" fill="#D9604A" stroke={INK} strokeWidth="6" />
        <path d="M-16 -10 Q0 4 16 -10" stroke="#FFF6E2" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  /** Điện thoại đang mở tin nhắn. */
  phone: {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -70) rotate(-8)">
        <rect x="-38" y="-68" width="76" height="136" rx="14" fill="url(#w-dark)" stroke={INK} strokeWidth="6" />
        <rect x="-29" y="-56" width="58" height="108" rx="6" fill="#FBF3E2" />
        <rect x="-24" y="-46" width="40" height="18" rx="8" fill="#FFFFFF" stroke="#D9C4A0" strokeWidth="2" />
        <rect x="-16" y="-20" width="40" height="18" rx="8" fill="#E3A631" />
        <rect x="-24" y="6" width="34" height="18" rx="8" fill="#FFFFFF" stroke="#D9C4A0" strokeWidth="2" />
        <rect x="-8" y="-62" width="16" height="3" rx="1.5" fill="#5A5550" />
        <path d="M-32 -60 L-32 30" stroke="#FFFFFF" strokeWidth="3" opacity="0.25" />
      </g>
    ),
  },
  pan: {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={110} />
        <rect x="70" y="-36" width="110" height="18" rx="9" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
        <ellipse cx="0" cy="-26" rx="84" ry="26" fill="url(#w-dark)" stroke={INK} strokeWidth="7" />
        <ellipse cx="0" cy="-30" rx="66" ry="17" fill="#2B2724" />
        <ellipse cx="-4" cy="-32" rx="38" ry="11" fill="#1E1B19" />
        <circle cx="-4" cy="-33" r="9" fill="#3B2A16" />
        {[-30, 0, 30].map((x, i) => (
          <path key={x} d={`M${x} -60 q-14 -18 0 -36 q14 -18 0 -36`} stroke="#E9E0CF" strokeWidth="9" fill="none" strokeLinecap="round" opacity={0.7 - i * 0.1} />
        ))}
      </g>
    ),
  },
  /** Tủ lạnh kiểu cũ màu kem, tay nắm đồng. */
  fridge: {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        <SoftShadow cy={-2} rx={150} />
        <rect x="-110" y="-400" width="220" height="400" rx="26" fill="url(#w-glaze)" stroke={INK} strokeWidth="8" />
        <line x1="-110" y1="-262" x2="110" y2="-262" stroke={INK} strokeWidth="7" />
        <rect x="74" y="-330" width="14" height="50" rx="7" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        <rect x="74" y="-236" width="14" height="80" rx="7" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        <path d="M-90 -380 L-90 -280 M-90 -240 L-90 -30" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
        <rect x="-100" y="-12" width="200" height="8" fill="#B9AD98" />
        {text ? (
          <>
            {/* Bìa carton và băng dính quấn kín */}
            <rect x="-100" y="-250" width="200" height="170" rx="6" fill="#C9A26B" stroke={INK} strokeWidth="5" />
            <g stroke="#E3B95A" strokeWidth="26" opacity="0.92">
              <line x1="-118" y1="-360" x2="118" y2="-40" />
              <line x1="118" y1="-360" x2="-118" y2="-40" />
            </g>
            <rect x="-104" y="-200" width="208" height="70" rx="6" fill="url(#w-paper)" stroke={INK} strokeWidth="5" />
            <Lines text={text} cy={-165} width={190} max={34} color={RED} />
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
        <SoftShadow cy={46} rx={50} />
        <circle r="46" fill="url(#w-brass)" stroke={INK} strokeWidth="7" />
        <circle r="34" fill="url(#w-paper)" stroke={INK} strokeWidth="4" />
        <path d="M0 -28 L9 0 L-9 0 Z" fill={RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
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
          <SoftShadow cy={58} rx={60} />
          <circle cx="-34" cy="-40" r="18" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
          <circle cx="34" cy="-40" r="18" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
          <path d="M-30 44 L-40 58 M30 44 L40 58" stroke={INK} strokeWidth="8" strokeLinecap="round" />
          <circle r="50" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" />
          <circle r="38" fill="url(#w-paper)" stroke={INK} strokeWidth="3" />
          {text ? <Lines text={text} cy={2} width={64} max={34} color={INK} /> : <path d="M0 0 L0 -26 M0 0 L18 8" stroke={INK} strokeWidth="6" strokeLinecap="round" />}
          <path d="M-36 -20 Q-40 0 -32 18" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        </g>
      </Unmirror>
    ),
  },
  /** Gối vải kem thêu hoa. */
  pillow: {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={96} />
        <path d="M-80 -6 Q-92 -44 -76 -82 Q0 -96 76 -82 Q92 -44 80 -6 Q0 6 -80 -6 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-66 -16 Q-74 -44 -62 -72 Q0 -82 62 -72 Q74 -44 66 -16 Q0 -8 -66 -16 Z" fill="none" stroke="#C9A46A" strokeWidth="3" strokeDasharray="6 5" />
        {[[-26, -44], [0, -50], [26, -44]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill={i === 1 ? RED : "#E3A631"} stroke={INK} strokeWidth="3" />
            <path d={`M${x - 14} ${y + 10} q6 -8 14 -2`} fill="none" stroke={PAL.leaf} strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}
      </g>
    ),
  },
  /** Lều vải bạt màu đất. */
  tent: {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={190} />
        <path d="M-160 0 L0 -250 L160 0 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M0 -250 L60 0 L160 0 Z" fill="#A5641A" opacity="0.35" />
        <path d="M0 -250 L-44 0 L44 0 Z" fill="#5E3A20" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M0 -250 L0 -282" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <path d="M0 -282 L36 -270 L0 -258 Z" fill={RED} stroke={INK} strokeWidth="4" />
        <path d="M-160 0 L-200 10 M160 0 L200 10" stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  ball: {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -48)">
        <SoftShadow cy={46} rx={54} />
        <circle r="48" fill="url(#w-glaze)" stroke={INK} strokeWidth="7" />
        <polygon points="0,-16 15,-5 9,13 -9,13 -15,-5" fill="#3A2A1E" />
        {[0, 72, 144, 216, 288].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0 -16 L0 -30" stroke={INK} strokeWidth="4" />
            <path d="M-12 -44 Q0 -36 12 -44 L8 -30 L-8 -30 Z" fill="#3A2A1E" />
          </g>
        ))}
      </g>
    ),
  },
  /** Chổi rơm cán tre. */
  broom: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-20" x2="0" y2="150" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <line x1="0" y1="-20" x2="0" y2="150" stroke="#C9A85E" strokeWidth="9" strokeLinecap="round" />
        {[20, 60, 100].map((y) => (
          <line key={y} x1="-7" y1={y} x2="7" y2={y} stroke={INK} strokeWidth="3" />
        ))}
        <path d="M-14 146 L14 146 L50 244 L-50 244 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-20 172 L20 172" stroke={RED} strokeWidth="7" />
        {[-36, -20, -6, 8, 22, 36].map((x) => (
          <line key={x} x1={x * 0.35} y1="180" x2={x} y2="240" stroke="#A5741A" strokeWidth="3" />
        ))}
      </g>
    ),
  },
  /** Bút lông: cán tre, ngòi lông đen. */
  pen: {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-8" y="-24" width="16" height="104" rx="6" fill="#C9A85E" stroke={INK} strokeWidth="5" />
        {[0, 34, 64].map((y) => (
          <line key={y} x1="-8" y1={y} x2="8" y2={y} stroke="#8A6A2A" strokeWidth="3" />
        ))}
        <rect x="-9" y="76" width="18" height="12" rx="3" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        <path d="M-9 88 Q-12 108 0 128 Q12 108 9 88 Z" fill="#2A221C" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="0" cy="-30" r="5" fill="none" stroke={RED} strokeWidth="3" />
      </g>
    ),
  },
  /** Tờ giấy dó ngả vàng, mép hơi quăn. */
  paper: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g transform="rotate(-4)">
          <path d="M-86 -130 L86 -130 L86 -14 Q70 -2 60 0 L-86 0 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M86 -14 Q68 -14 60 0 Q72 -4 86 -14 Z" fill="#D9BE8C" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          {[-104, -84, -64, -44, -24].map((y) => (
            <line key={y} x1="-70" y1={y} x2="70" y2={y} stroke="#D9C09A" strokeWidth="3" />
          ))}
          {text ? <Lines text={text} cy={-65} width={150} max={46} color={RED} /> : null}
        </g>
      </Unmirror>
    ),
  },
  /** Chậu sứ men lam trồng cây quất. */
  plant: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <PotPlant x={0} y={0} s={0.95} />
          {text ? (
            <>
              {/* Rào: dây quấn quanh tán cây và bảng tên */}
              <g stroke="#E3B95A" strokeWidth="9" fill="none">
                <ellipse cx="0" cy="-270" rx="82" ry="22" transform="rotate(-12 0 -270)" />
                <ellipse cx="0" cy="-232" rx="80" ry="18" transform="rotate(10 0 -232)" />
              </g>
              <rect x="-80" y="-86" width="160" height="50" rx="6" fill="url(#w-paper)" stroke={INK} strokeWidth="5" />
              <Lines text={text} cy={-61} width={150} max={30} color={RED} />
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
        <path d="M-30 -176 Q0 -206 30 -176 Z" fill="#E3B23C" stroke={INK} strokeWidth="5" />
        <Unmirror mirrored={mirrored}>
          <rect x="-34" y="-112" width="68" height="68" fill="#B8402E" stroke={INK} strokeWidth="5" transform="rotate(45 0 -78)" />
          <Lines text={text ?? "RƯỢU"} cy={-78} width={56} max={26} color="#F4D27A" font={TEXT_FONT} />
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
        <ellipse cx="-118" cy="-40" rx="56" ry="18" fill="#2E2420" stroke={INK} strokeWidth="6" transform="rotate(-10 -118 -40)" />
        <ellipse cx="118" cy="-40" rx="56" ry="18" fill="#2E2420" stroke={INK} strokeWidth="6" transform="rotate(10 118 -40)" />
        <path d="M-92 0 Q-96 -96 0 -100 Q96 -96 92 0 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-90 -18 Q0 -4 90 -18" fill="none" stroke="#E3B23C" strokeWidth="8" />
        <circle cx="0" cy="-60" r="12" fill="#E3B23C" stroke={INK} strokeWidth="5" />
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
        <circle cx="-32" cy="-72" r="11" fill="#F4D27A" stroke={INK} strokeWidth="4" />
        <circle cx="32" cy="-72" r="11" fill="#F4D27A" stroke={INK} strokeWidth="4" />
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
        <circle cx="32" cy="-486" r="12" fill="#F4D27A" stroke={INK} strokeWidth="5" />
        <circle cx="92" cy="-486" r="12" fill="#F4D27A" stroke={INK} strokeWidth="5" />
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
  // ---- Đồ thư phòng / đồ quê theo bản thiết kế projects/CD_TC.png ----
  /** Nghiên mực đá đen, lòng nghiên đọng mực, bút lông cán tre gác chéo. Đặt trên bàn / sàn. */
  inkstone: {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={0} rx={100} />
        {/* Thân nghiên: khối đá dày */}
        <path d="M-84 -34 L-84 -14 Q-84 4 -60 4 L60 4 Q84 4 84 -14 L84 -34 Z" fill="#2B2724" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="0" cy="-34" rx="84" ry="28" fill="url(#w-dark)" stroke={INK} strokeWidth="6" />
        {/* Lòng nghiên và giếng mực */}
        <ellipse cx="-10" cy="-36" rx="58" ry="17" fill="#3A3633" stroke="#1A1714" strokeWidth="4" />
        <ellipse cx="-30" cy="-36" rx="26" ry="9" fill="#0F0D0C" />
        <path d="M-46 -40 Q-36 -44 -22 -42" fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
        <path d="M-70 -46 Q-40 -58 10 -58" fill="none" stroke="#8C8680" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        {/* Thỏi mực nằm cạnh */}
        <g transform="translate(46 -40) rotate(-12)">
          <rect x="-22" y="-9" width="44" height="18" rx="3" fill="#1E1B19" stroke={INK} strokeWidth="4" />
          <rect x="-12" y="-5" width="20" height="8" rx="1" fill="none" stroke={PAL.gold} strokeWidth="2" />
        </g>
        {/* Bút lông gác chéo trên miệng nghiên */}
        <g transform="translate(6 -62) rotate(-24)">
          <rect x="-96" y="-7" width="150" height="14" rx="6" fill="#C9A85E" stroke={INK} strokeWidth="5" />
          {[-60, -20, 20].map((x) => (
            <line key={x} x1={x} y1="-7" x2={x} y2="7" stroke="#8A6A2A" strokeWidth="3" />
          ))}
          <circle cx="-100" cy="0" r="5" fill="none" stroke={RED} strokeWidth="3" />
          <rect x="52" y="-8" width="14" height="16" rx="3" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
          <path d="M66 -8 Q92 -6 108 0 Q92 6 66 8 Z" fill="#1E1B19" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        </g>
      </g>
    ),
  },
  /** Chén trà sứ men lam trên đĩa lót, có khói trà. Cầm tay hoặc đặt trên bàn. */
  "tea-cup": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={2} rx={66} />
        {/* Đĩa lót */}
        <ellipse cx="0" cy="-6" rx="62" ry="14" fill="url(#w-glaze)" stroke={INK} strokeWidth="5" />
        <ellipse cx="0" cy="-9" rx="40" ry="7" fill="none" stroke={PAL.blueGlaze} strokeWidth="3" />
        {/* Chén */}
        <rect x="-16" y="-20" width="32" height="10" rx="3" fill="#E6DFCF" stroke={INK} strokeWidth="4" />
        <path d="M-42 -66 Q-40 -16 0 -16 Q40 -16 42 -66 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="0" cy="-66" rx="42" ry="9" fill="#C98A3A" stroke={INK} strokeWidth="4" />
        <ellipse cx="0" cy="-65" rx="34" ry="6" fill="#D9A24E" />
        {/* Hoa văn lam: dây lá + bông cúc */}
        <path d="M-38 -54 Q0 -46 38 -54" fill="none" stroke={PAL.blueGlaze} strokeWidth="3.5" />
        <circle cx="-4" cy="-36" r="8" fill="none" stroke={PAL.blueGlaze} strokeWidth="3.5" />
        <circle cx="-4" cy="-36" r="2.5" fill={PAL.blueGlaze} />
        <path d="M-30 -32 q6 -8 14 -4 M10 -30 q8 -10 18 -4 M-24 -42 q-6 -6 -10 0" fill="none" stroke={PAL.blueGlaze} strokeWidth="3" strokeLinecap="round" />
        <path d="M-32 -58 Q-32 -36 -20 -24" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        {/* Khói trà */}
        {[-12, 12].map((x, i) => (
          <path key={x} d={`M${x} -82 q-8 -12 0 -24 q8 -12 0 -24`} fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity={0.65 - i * 0.15} />
        ))}
      </g>
    ),
  },
  /** Nón lá: chóp nhọn, vành rộng, nan tre; đội đầu (`head`) hoặc cầm tay. Vành hạ thấp 24px để nón úp sâu xuống tóc khi đội. */
  "non-la": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 24)">
        <defs>
          <linearGradient id="w-nonla" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F6E4B4" />
            <stop offset="0.5" stopColor="#E7CB8C" />
            <stop offset="1" stopColor="#C9A463" />
          </linearGradient>
        </defs>
        {/* Mặt dưới vành (thấy qua mép) */}
        <ellipse cx="0" cy="-10" rx="126" ry="20" fill="#B8924F" stroke={INK} strokeWidth="6" />
        {/* Chóp nón */}
        <path d="M-126 -12 L0 -150 L126 -12 Q0 14 -126 -12 Z" fill="url(#w-nonla)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Nan tre toả từ chóp */}
        {[-96, -64, -32, 0, 32, 64, 96].map((x) => (
          <line key={x} x1="0" y1="-146" x2={x} y2={-2 - Math.abs(x) * 0.06} stroke="#B08848" strokeWidth="2.5" opacity="0.7" />
        ))}
        {/* Vòng nan ngang */}
        {[0.3, 0.55, 0.8].map((t) => (
          <path
            key={t}
            d={`M${-126 * t} ${-150 + 138 * t} Q0 ${-150 + 138 * t + 16 * t} ${126 * t} ${-150 + 138 * t}`}
            fill="none"
            stroke="#A47C3E"
            strokeWidth="3"
            opacity="0.8"
          />
        ))}
        {/* Nắng bên trái */}
        <path d="M-6 -136 L-96 -22" stroke="#FFF6DA" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
        {/* Vành nón */}
        <path d="M-126 -12 Q0 14 126 -12" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <path d="M-120 -8 Q0 16 120 -8" fill="none" stroke="#8E6A30" strokeWidth="3" opacity="0.8" />
      </g>
    ),
  },
  /** Cuộn giấy dó mở ngang, hai trục gỗ; `text` là chữ viết trên giấy (bỏ trống thì vẽ nét chữ nho). */
  scroll: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <SoftShadow cy={0} rx={110} />
          {/* Giấy */}
          <rect x="-96" y="-132" width="192" height="116" fill="url(#w-paper)" stroke={INK} strokeWidth="6" />
          <rect x="-84" y="-122" width="168" height="96" fill="none" stroke="#C9A46A" strokeWidth="3" />
          {text ? (
            <Lines text={text} cy={-74} width={150} max={44} color={INK} font={TEXT_FONT} />
          ) : (
            <g stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M-52 -104 L-52 -48 M-66 -92 L-38 -92 M-62 -70 Q-52 -64 -40 -72" />
              <path d="M-10 -106 L-6 -46 M-22 -96 Q-6 -100 10 -94 M-20 -64 L8 -68" />
              <path d="M34 -104 Q46 -90 36 -74 M30 -66 L58 -70 M44 -88 L48 -48" />
            </g>
          )}
          <rect x="42" y="-46" width="20" height="20" rx="2" fill={RED} stroke="#7E2A20" strokeWidth="2" />
          {/* Hai trục gỗ */}
          {[-104, 104].map((x) => (
            <g key={x}>
              <rect x={x - 11} y="-146" width="22" height="144" rx="10" fill="url(#w-wood-h)" stroke={INK} strokeWidth="6" />
              <rect x={x - 8} y="-160" width="16" height="16" rx="5" fill={PAL.woodDark} stroke={INK} strokeWidth="4" />
              <rect x={x - 8} y="-4" width="16" height="16" rx="5" fill={PAL.woodDark} stroke={INK} strokeWidth="4" />
            </g>
          ))}
        </g>
      </Unmirror>
    ),
  },
} satisfies Partial<Record<PropId, PropDef>>;

/** Mọi đạo cụ: đạo cụ chung + đạo cụ truyện (engine/stage/story). Mỗi đạo cụ tự kèm gradient dùng chung (WarmDefs). */
export const PROPS = Object.fromEntries(
  Object.entries({ ...BASE_PROPS, ...STORY_PROPS } as Record<string, PropDef>).map(([id, def]) => [
    id,
    {
      ...def,
      draw: (o: { text?: string; mirrored: boolean }) => (
        <>
          <WarmDefs />
          {def.draw(o)}
        </>
      ),
    },
  ]),
) as Record<PropId, PropDef>;

