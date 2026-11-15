import React from "react";
import type { SceneId } from "../lib/stage-types.ts";
import { TEXT_FONT } from "../components/brand.ts";
import { Floor, FLOOR } from "./draw.tsx";
import { STORY_SCENES } from "./story/index.ts";
import {
  Bamboo,
  BrickYard,
  Cloud,
  DistantTrees,
  HangingLeaves,
  Jar,
  LINE,
  PAL,
  PotPlant,
  SoftShadow,
  Stool,
  Tree,
  VillageHouse,
  WarmDefs,
  WarmSky,
} from "./village.tsx";

/**
 * Phông nền sân khấu, phong cách tranh dân gian Việt Nam hiện đại (đồng bộ bản thiết kế nhân vật projects/CD_TC.png):
 * làng quê Bắc Bộ, nhà ngói ba gian, sân gạch đỏ, chum vại, chậu cây, nắng vàng chiều.
 * Mỗi phông tách ba lớp: hậu cảnh (nhạt, viền mảnh) · trung cảnh (nhà, đồ đạc) · tiền cảnh đóng khung ở mép (lá, chum, chậu).
 * Vùng giữa (x 200–880, y 700–1240) để trống cho nhân vật và đạo cụ.
 */

const INK = LINE;
export { FLOOR } from "./draw.tsx";

/** Mặt bàn trong cảnh bếp: đồ đặt `on: "table"` đứng ở đây. */
export const TABLE_TOP = 1112;

/** Bụi cỏ. */
const Tuft: React.FC<{ x: number; y: number; s: number; color: string }> = ({ x, y, s, color }) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M-40 0 Q-36 -40 -24 -60 Q-20 -30 -10 -16 Q-6 -66 6 -84 Q8 -40 14 -18 Q24 -52 40 -62 Q30 -30 40 0 Z"
    fill={color}
    stroke={INK}
    strokeWidth="5"
    strokeLinejoin="round"
  />
);

// ---------------------------------------------------------------- sân nhà (phông chính)

/** Sân gạch trước nhà ngói ba gian: nắng chiều, cây nhãn bên trái, bụi tre, chum vại, chậu quất. */
const Courtyard: React.FC<{ night?: boolean }> = ({ night }) => (
  <>
    {night ? (
      <>
        <defs>
          <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141A3A" />
            <stop offset="1" stopColor="#3A3F6A" />
          </linearGradient>
          <radialGradient id="night-moon" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFF4CF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FFF4CF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#night-sky)" />
        {[
          [120, 260], [260, 420], [420, 300], [560, 230], [700, 380], [960, 470], [330, 470], [620, 440], [880, 200],
        ].map(([x, y], i) => (
          <path
            key={i}
            d={`M${x} ${y - 10} L${x + 3} ${y - 3} L${x + 10} ${y} L${x + 3} ${y + 3} L${x} ${y + 10} L${x - 3} ${y + 3} L${x - 10} ${y} L${x - 3} ${y - 3} Z`}
            fill="#FFF3C4"
            opacity={0.55 + (i % 3) * 0.15}
          />
        ))}
        <circle cx="820" cy="330" r="200" fill="url(#night-moon)" />
        <circle cx="820" cy="330" r="64" fill="#FFF1C2" stroke="#E9CB7A" strokeWidth="6" />
        <circle cx="800" cy="316" r="12" fill="#EBD495" />
        <circle cx="840" cy="352" r="8" fill="#EBD495" />
      </>
    ) : (
      <>
        <WarmSky id="yard-sky" h={FLOOR} sun={[880, 330]} />
        <Cloud x={300} y={300} s={0.9} />
        <Cloud x={640} y={420} s={0.6} />
      </>
    )}
    <DistantTrees y={640} color={night ? "#2B3554" : "#B3C28E"} line={night ? "#1E2440" : "#9C8A62"} />
    <Bamboo x={1010} y={860} s={0.85} />
    <Bamboo x={60} y={820} s={0.7} flip />
    <BrickYard yTop={1120} night={night} />
    <VillageHouse x={540} y={1120} lit={night} />
    {/* Cây nhãn già bên trái, tán che góc mái (tiền cảnh trên) */}
    <Tree x={40} y={1150} s={1.05} />
    {/* Chum vại, chậu quất, ghế đẩu ở hai mép sân */}
    <Jar x={985} y={1215} s={0.82} />
    <Jar x={1075} y={1180} s={0.66} />
    <PotPlant x={905} y={1180} s={0.62} />
    <PotPlant x={150} y={1228} s={0.7} kind="palm" />
    <Stool x={60} y={1260} s={0.8} />
    {[260, 470, 640, 820].map((x, i) => (
      <Tuft key={x} x={x} y={1124} s={0.32 + (i % 2) * 0.08} color={night ? "#2F4A33" : "#7FA557"} />
    ))}
    {/* Nắng chiều loang trên sân */}
    {night ? null : (
      <>
        <ellipse cx="560" cy="1330" rx="520" ry="90" fill="#FFE6AE" opacity="0.18" />
      </>
    )}
    {night ? (
      <>
        <rect x="0" y="420" width="1080" height={1920 - 420} fill="#1A2046" opacity="0.5" />
        {/* Ánh đèn từ gian giữa, đèn lồng dưới hiên */}
        <rect x="424" y="830" width="232" height="248" fill="#F2B04F" opacity="0.55" />
        <ellipse cx="540" cy="1160" rx="300" ry="60" fill="url(#w-glow)" opacity="0.5" />
        {[300, 780].map((x) => (
          <g key={x}>
            <circle cx={x} cy="880" r="90" fill="url(#w-glow)" />
            <line x1={x} y1="808" x2={x} y2="850" stroke={INK} strokeWidth="4" />
            <path d={`M${x - 22} 852 Q${x - 30} 880 ${x - 22} 908 L${x + 22} 908 Q${x + 30} 880 ${x + 22} 852 Z`} fill="#E0523A" stroke={INK} strokeWidth="5" />
            <rect x={x - 14} y="846" width="28" height="8" fill="#D9A23A" stroke={INK} strokeWidth="3" />
            <rect x={x - 14} y="906" width="28" height="8" fill="#D9A23A" stroke={INK} strokeWidth="3" />
          </g>
        ))}
        {/* Đom đóm */}
        {[[200, 1000], [880, 960], [700, 1060], [120, 900], [960, 1080]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#FFF3A0" opacity="0.9" />
        ))}
      </>
    ) : null}
    <HangingLeaves side={1} y={120} dark={night} />
  </>
);

// ---------------------------------------------------------------- trong nhà

/** Gian giữa nhà gỗ: tường vôi vàng, cột gỗ, hoành phi, tranh chữ "Tâm", cửa sổ song nhìn ra vườn, tủ chè. */
const Home: React.FC = () => (
  <>
    <defs>
      <linearGradient id="home-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E6CB98" />
        <stop offset="1" stopColor="#F2DFB8" />
      </linearGradient>
      <linearGradient id="home-garden" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FCEBC2" />
        <stop offset="1" stopColor="#B9CF8E" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#home-wall)" />
    {/* Vệt vữa cũ */}
    {[[200, 820], [820, 300], [640, 760], [380, 260]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} q30 -10 60 2 q20 8 40 -4`} fill="none" stroke="#CFAE76" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    ))}
    {/* Kèo, xà trên cao */}
    <rect x="0" y="150" width="1080" height="56" fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
    <rect x="0" y="206" width="1080" height="16" fill="#3A2416" opacity="0.25" />
    {/* Hoành phi sơn son thếp vàng */}
    <g transform="translate(540 505) scale(0.68)">
      <rect x="-200" y="-56" width="400" height="112" rx="10" fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" />
      <rect x="-184" y="-42" width="368" height="84" rx="6" fill="none" stroke="#E9B949" strokeWidth="5" />
      <text x="0" y="20" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontWeight="700" fontSize="58" fill="#F4CB5E">
        Phúc Đức
      </text>
      <line x1="-150" y1="-56" x2="-120" y2="-104" stroke={INK} strokeWidth="5" />
      <line x1="150" y1="-56" x2="120" y2="-104" stroke={INK} strokeWidth="5" />
    </g>
    {/* Tranh chữ "Tâm" */}
    <g transform="translate(205 70)">
      <rect x="-88" y="400" width="176" height="330" fill="url(#w-paper)" stroke={INK} strokeWidth="7" />
      <rect x="-76" y="414" width="152" height="302" fill="none" stroke="#C9A46A" strokeWidth="3" />
      <rect x="-104" y="388" width="208" height="20" rx="8" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
      <rect x="-104" y="722" width="208" height="20" rx="8" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
      <text x="0" y="600" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontWeight="700" fontSize="104" fill="#2E1E14">
        Tâm
      </text>
      <rect x="20" y="640" width="26" height="26" fill="#B8382A" opacity="0.85" />
    </g>
    {/* Cửa sổ song gỗ nhìn ra vườn tre */}
    <g transform="translate(830 70)">
      <rect x="-140" y="410" width="280" height="320" fill="url(#home-garden)" />
      <Bamboo x={-60} y={760} s={0.45} />
      <path d="M-140 690 Q-60 640 20 680 Q90 650 140 690 L140 730 L-140 730 Z" fill="#8DAE64" />
      {[-105, -70, -35, 0, 35, 70, 105].map((x) => (
        <rect key={x} x={x - 6} y="410" width="12" height="320" fill="url(#w-wood-h)" stroke={INK} strokeWidth="3" />
      ))}
      <rect x="-140" y="410" width="280" height="320" fill="none" stroke={INK} strokeWidth="8" />
      <rect x="-160" y="390" width="320" height="26" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
      <rect x="-160" y="726" width="320" height="26" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
    </g>
    {/* Nắng xiên qua cửa sổ */}
    <path d="M690 490 L970 490 L760 1240 L380 1240 Z" fill="#FFF0C4" opacity="0.18" />
    {/* Chân tường ốp gỗ */}
    <rect x="0" y="1020" width="1080" height={FLOOR - 1020} fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={20 + i * 120} y="1044" width="96" height="160" rx="4" fill="none" stroke="#6E4324" strokeWidth="4" />
    ))}
    {/* Tủ chè, ấm chén men lam, lọ hoa */}
    <g transform="translate(540 0)">
      <SoftShadow cy={FLOOR} rx={220} />
      <rect x="-170" y="960" width="340" height={FLOOR - 960} fill="url(#w-wood-dark)" stroke={INK} strokeWidth="8" />
      <rect x="-186" y="944" width="372" height="24" rx="6" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
      {[-110, 0, 110].map((x) => (
        <rect key={x} x={x - 46} y="992" width="92" height="190" rx="4" fill="none" stroke="#C48D57" strokeWidth="4" opacity="0.8" />
      ))}
      {/* Khay, ấm, chén */}
      <ellipse cx="-70" cy="942" rx="80" ry="12" fill="#8A2C22" stroke={INK} strokeWidth="5" />
      <path d="M-100 940 Q-104 900 -70 896 Q-36 900 -40 940 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="5" />
      <path d="M-40 920 Q-20 916 -16 900" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <path d="M-86 896 Q-70 884 -54 896" fill="#EDE6D6" stroke={INK} strokeWidth="4" />
      <path d="M-92 924 Q-70 914 -48 924" fill="none" stroke={PAL.blueGlaze} strokeWidth="4" />
      {[-130, -10].map((x) => (
        <path key={x} d={`M${x - 14} 940 L${x - 16} 924 L${x + 16} 924 L${x + 14} 940 Z`} fill="#F3EEE2" stroke={INK} strokeWidth="4" />
      ))}
      <path d="M70 942 Q50 900 66 862 L104 862 Q120 900 100 942 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" />
      <path d="M60 900 Q84 892 108 900" fill="none" stroke={PAL.blueGlaze} strokeWidth="5" />
      {[[-30, -70], [0, -96], [30, -74], [-46, -40], [44, -44]].map(([dx, dy], i) => (
        <g key={i}>
          <line x1="85" y1="862" x2={85 + dx} y2={862 + dy} stroke="#4E7A3A" strokeWidth="4" />
          <circle cx={85 + dx} cy={862 + dy} r="13" fill={i % 2 ? "#F0A6A0" : "#F5C9BF"} stroke={INK} strokeWidth="4" />
        </g>
      ))}
    </g>
    {/* Cột gỗ lim hai bên (tiền cảnh đóng khung) */}
    {[46, 1034].map((x) => (
      <g key={x}>
        <rect x={x - 40} y="150" width="80" height={FLOOR - 150} fill="url(#w-wood-dark)" stroke={INK} strokeWidth="8" />
        <rect x={x - 54} y={FLOOR - 44} width="108" height="44" rx="6" fill="#B9AD98" stroke={INK} strokeWidth="6" />
      </g>
    ))}
    <PotPlant x={940} y={FLOOR} s={0.8} kind="palm" />
    <BrickYard yTop={FLOOR} horizon={760} />
    {/* Chiếu cói dưới chân */}
    <path d={`M250 ${FLOOR + 30} L830 ${FLOOR + 30} L920 ${FLOOR + 170} L160 ${FLOOR + 170} Z`} fill="#E3C27E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    {Array.from({ length: 6 }, (_, i) => (
      <line key={i} x1={240 - i * 14} y1={FLOOR + 50 + i * 22} x2={840 + i * 14} y2={FLOOR + 50 + i * 22} stroke="#C79E57" strokeWidth="4" />
    ))}
    <path d={`M262 ${FLOOR + 48} L818 ${FLOOR + 48} L896 ${FLOOR + 154} L184 ${FLOOR + 154} Z`} fill="none" stroke="#B5523B" strokeWidth="6" />
    <rect x="0" y={FLOOR - 4} width="1080" height="8" fill={INK} opacity="0.85" />
  </>
);

/**
 * Lớp tạo chiều sâu, vẽ ngay sau phông và trước nhân vật: hậu cảnh hơi mờ sương (bớt tương phản so với nhân vật),
 * ánh nắng chiều ấm phủ nhẹ (đồng bộ màu cho mọi phông, kể cả phông truyện), bóng tối ở chân tường để sàn tách khỏi tường.
 */
const DARK_SCENES = new Set<string>(["night", "space", "temple"]);
export const SceneDepth: React.FC<{ id: SceneId }> = ({ id }) => {
  const dark = DARK_SCENES.has(id);
  const gid = `depth-${dark ? "d" : "l"}`;
  return (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dark ? "#0B1433" : "#FFF4DC"} stopOpacity="0" />
          <stop offset="0.55" stopColor={dark ? "#0B1433" : "#FFF4DC"} stopOpacity={dark ? 0.1 : 0.08} />
          <stop offset="1" stopColor={dark ? "#0B1433" : "#FFF4DC"} stopOpacity={dark ? 0.22 : 0.18} />
        </linearGradient>
        <radialGradient id="depth-sun" cx="0.85" cy="0.12" r="0.9">
          <stop offset="0" stopColor="#FFD58A" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#F7B866" stopOpacity="0.06" />
          <stop offset="1" stopColor="#F7B866" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="depth-contact" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A2416" stopOpacity="0" />
          <stop offset="1" stopColor="#3A2416" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1080" height={FLOOR - 6} fill={`url(#${gid})`} />
      {dark ? null : <rect x="0" y="0" width="1080" height="1920" fill="url(#depth-sun)" />}
      {dark ? null : <rect x="0" y="0" width="1080" height="1920" fill="#F2B45E" opacity="0.05" />}
      <rect x="0" y={FLOOR - 90} width="1080" height="84" fill="url(#depth-contact)" />
    </>
  );
};

// ---------------------------------------------------------------- bếp

/** Gian bếp quê: tường vàng đất, cửa sổ song tre, chạn bát, niêu đất, rổ rá, chuỗi tỏi ớt, bếp gạch. */
const Kitchen: React.FC = () => (
  <>
    <defs>
      <linearGradient id="kitchen-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D9B57A" />
        <stop offset="1" stopColor="#ECD3A2" />
      </linearGradient>
      <linearGradient id="kitchen-out" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FCEBC2" />
        <stop offset="1" stopColor="#A9C77A" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#kitchen-wall)" />
    {[[160, 900], [900, 860], [560, 300], [300, 240]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} q30 -10 60 2 q20 8 40 -4`} fill="none" stroke="#C49A5E" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    ))}
    {/* Xà gỗ */}
    <rect x="0" y="170" width="1080" height="46" fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
    {/* Cửa sổ song tre nhìn ra vườn chuối */}
    <g transform="translate(240 0)">
      <rect x="-130" y="380" width="260" height="280" fill="url(#kitchen-out)" />
      <path d="M-130 560 Q-60 500 0 540 Q70 500 130 560 L130 660 L-130 660 Z" fill="#7FA557" />
      <path d="M-40 660 Q-30 520 -60 440 M-60 440 Q-120 430 -130 470 M-60 440 Q-20 400 30 420" fill="none" stroke="#4E7A3A" strokeWidth="10" strokeLinecap="round" />
      {[-90, -45, 0, 45, 90].map((x) => (
        <rect key={x} x={x - 7} y="380" width="14" height="280" fill="#C9A85E" stroke={INK} strokeWidth="3" />
      ))}
      <rect x="-130" y="380" width="260" height="280" fill="none" stroke={INK} strokeWidth="8" />
      <rect x="-150" y="362" width="300" height="24" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
      <rect x="-150" y="656" width="300" height="24" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
    </g>
    <path d="M110 400 L370 400 L560 1112 L160 1112 Z" fill="#FFF0C4" opacity="0.16" />
    {/* Chuỗi tỏi, ớt treo */}
    <line x1="500" y1="216" x2="500" y2="300" stroke={INK} strokeWidth="4" />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${500 + (i % 2 ? 10 : -10)} ${310 + i * 34} q-16 -6 -14 -22 q14 -14 28 0 q2 16 -14 22 Z`} fill="#F4ECD8" stroke={INK} strokeWidth="4" />
    ))}
    <line x1="580" y1="216" x2="580" y2="290" stroke={INK} strokeWidth="4" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${580 + (i % 2 ? 8 : -8)} ${296 + i * 28} q6 20 -2 34 q-10 -16 2 -34 Z`} fill="#C8382A" stroke={INK} strokeWidth="3" />
    ))}
    {/* Chạn bát: kệ gỗ, niêu đất, bát men lam */}
    <g transform="translate(830 0)">
      {[520, 700].map((y) => (
        <rect key={y} x="-170" y={y} width="340" height="20" rx="4" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
      ))}
      <path d="M-150 520 Q-160 470 -120 456 L-60 456 Q-20 470 -30 520 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="6" />
      <rect x="-120" y="440" width="60" height="18" rx="6" fill="#7A4421" stroke={INK} strokeWidth="5" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M10 ${520 - i * 18} Q12 ${504 - i * 18} 60 ${502 - i * 18} Q108 ${504 - i * 18} 110 ${520 - i * 18} Z`} fill="url(#w-glaze)" stroke={INK} strokeWidth="5" />
      ))}
      <path d="M28 488 Q60 482 92 488" fill="none" stroke={PAL.blueGlaze} strokeWidth="4" />
      <path d="M-140 700 Q-150 650 -100 640 Q-40 650 -60 700 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" />
      <path d="M20 700 L20 640 Q60 620 100 640 L100 700 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="6" />
      <ellipse cx="60" cy="640" rx="40" ry="10" fill="#5C341C" stroke={INK} strokeWidth="4" />
    </g>
    {/* Rổ tre treo */}
    <g transform="translate(680 300)">
      <line x1="0" y1="-84" x2="0" y2="-36" stroke={INK} strokeWidth="4" />
      <ellipse cx="0" cy="0" rx="64" ry="40" fill="#D9B46A" stroke={INK} strokeWidth="6" />
      {[-40, -20, 0, 20, 40].map((x) => (
        <line key={x} x1={x} y1="-36" x2={x * 1.1} y2="36" stroke="#A9823E" strokeWidth="3" />
      ))}
      <ellipse cx="0" cy="0" rx="48" ry="28" fill="none" stroke="#A9823E" strokeWidth="3" />
    </g>
    {/* Bếp gạch, nồi đồng, khói */}
    <g transform="translate(980 0)">
      <rect x="-110" y="930" width="220" height={FLOOR - 930} fill="#A9553C" stroke={INK} strokeWidth="7" />
      {[960, 1000, 1040, 1080].map((y, i) => (
        <line key={y} x1="-110" y1={y} x2="110" y2={y} stroke="#7E3324" strokeWidth="3" opacity={0.6 - i * 0.05} />
      ))}
      <path d="M-46 1100 Q0 1040 46 1100 Z" fill="#2A170C" stroke={INK} strokeWidth="5" />
      <path d="M-24 1100 Q0 1070 24 1100 Z" fill="#F2A43A" />
      <path d="M-70 930 Q-74 870 0 864 Q74 870 70 930 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
      <rect x="-80" y="856" width="160" height="14" rx="7" fill="#9A6A22" stroke={INK} strokeWidth="5" />
      {[-24, 18].map((x, i) => (
        <path key={x} d={`M${x} 840 q-16 -30 0 -60 q16 -30 0 -60`} fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" opacity={0.45 - i * 0.1} />
      ))}
    </g>
    <BrickYard yTop={FLOOR} horizon={760} />
    <rect x="0" y={FLOOR - 4} width="1080" height="8" fill={INK} opacity="0.85" />
  </>
);

/** Bàn ăn gỗ đặt trước nhân vật (che phần chân). Vẽ sau nhân vật. */
export const KitchenTable: React.FC = () => (
  <>
    <WarmDefs />
    <SoftShadow cx={540} cy={FLOOR + 10} rx={520} ry={40} />
    {/* Chân bàn */}
    {[160, 920].map((x) => (
      <rect key={x} x={x - 18} y={TABLE_TOP + 40} width="36" height={FLOOR - TABLE_TOP - 30} fill="url(#w-wood-dark)" stroke={INK} strokeWidth="7" />
    ))}
    {/* Diềm bàn */}
    <rect x="130" y={TABLE_TOP + 28} width="820" height="48" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="7" />
    <path d={`M150 ${TABLE_TOP + 52} L930 ${TABLE_TOP + 52}`} stroke="#B57A47" strokeWidth="3" opacity="0.7" />
    {/* Mặt bàn */}
    <rect x="100" y={TABLE_TOP} width="880" height="36" rx="10" fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
    <path d={`M120 ${TABLE_TOP + 9} L960 ${TABLE_TOP + 9}`} stroke="#E2B07A" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
    <path d={`M300 ${TABLE_TOP + 20} q60 -6 120 0 M640 ${TABLE_TOP + 22} q70 -6 140 0`} fill="none" stroke="#6E4324" strokeWidth="3" opacity="0.6" />
  </>
);

// ---------------------------------------------------------------- lớp học

/** Lớp học trường làng: tường vôi vàng, bảng đen khung gỗ, cửa chớp gỗ, tre ngoài cửa. */
const Classroom: React.FC<{ text?: string }> = ({ text }) => (
  <>
    <defs>
      <linearGradient id="class-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E9CF8E" />
        <stop offset="1" stopColor="#F3E1B4" />
      </linearGradient>
      <linearGradient id="class-board" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#35503E" />
        <stop offset="1" stopColor="#22382B" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#class-wall)" />
    <rect x="0" y="160" width="1080" height="40" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
    {/* Cửa chớp hai bên */}
    {[-30, 1110].map((x) => (
      <g key={x}>
        <rect x={x - 90} y="380" width="180" height="420" fill="#F7E7BE" stroke={INK} strokeWidth="7" />
        <Bamboo x={x} y={820} s={0.4} />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={x - 90} y1={400 + i * 34} x2={x + 90} y2={400 + i * 34} stroke="#4E7A3A" strokeWidth="9" opacity="0.8" />
        ))}
        <rect x={x - 90} y="380" width="180" height="420" fill="none" stroke={INK} strokeWidth="8" />
      </g>
    ))}
    <rect x="130" y="320" width="820" height="420" rx="10" fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
    <rect x="152" y="342" width="776" height="376" rx="4" fill="url(#class-board)" stroke={INK} strokeWidth="5" />
    <path d="M180 370 Q300 360 420 372" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.08" />
    {(text ?? "BÀI HỌC HÔM NAY").split("\n").map((line, i, all) => (
      <text
        key={i}
        x="540"
        y={555 + (i - (all.length - 1) / 2) * 90}
        textAnchor="middle"
        fontFamily={TEXT_FONT}
        fontWeight="900"
        fontSize="72"
        fill="#F6EEDA"
        opacity="0.92"
      >
        {line}
      </text>
    ))}
    <rect x="150" y="736" width="780" height="18" rx="4" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
    <rect x="760" y="724" width="60" height="14" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
    <rect x="0" y="1020" width="1080" height={FLOOR - 1020} fill="#C79A5E" stroke={INK} strokeWidth="7" />
    <BrickYard yTop={FLOOR} horizon={760} />
    <rect x="0" y={FLOOR - 4} width="1080" height="8" fill={INK} opacity="0.85" />
  </>
);

// ---------------------------------------------------------------- vũ trụ, biển

/** Ngoài vũ trụ: đứng trên mặt trăng, xa xa là Trái Đất, Sao Thổ và các ngôi sao. */
const Space: React.FC = () => (
  <>
    <defs>
      <linearGradient id="space-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0E0C24" />
        <stop offset="1" stopColor="#2A2350" />
      </linearGradient>
      <radialGradient id="space-earth" cx="0.35" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#6FA6D8" />
        <stop offset="1" stopColor="#2C5A8A" />
      </radialGradient>
      <linearGradient id="space-moon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#CFC6B6" />
        <stop offset="1" stopColor="#8E8578" />
      </linearGradient>
      <linearGradient id="space-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.55" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#space-sky)" />
    {Array.from({ length: 40 }, (_, i) => {
      const x = (i * 263) % 1080;
      const y = 140 + ((i * 397) % 900);
      return <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 4 : 2} fill="#FFF4D6" opacity={0.5 + (i % 3) * 0.2} />;
    })}
    {/* Trái Đất */}
    <circle cx="830" cy="360" r="130" fill="#6FA6D8" opacity="0.18" />
    <circle cx="830" cy="360" r="110" fill="url(#space-earth)" stroke={INK} strokeWidth="7" />
    <path d="M760 320 q50 -40 100 0 q-20 50 -90 40 z M820 410 q60 -10 70 40 q-50 20 -80 -10 z" fill="#8DB65E" stroke={INK} strokeWidth="3" />
    <path d="M830 250 A110 110 0 0 1 830 470 A80 110 0 0 0 830 250 Z" fill="#0E0C24" opacity="0.4" />
    {/* Sao Thổ */}
    <g transform="translate(220 470) rotate(-18)">
      <ellipse rx="110" ry="26" fill="none" stroke="#E3B95A" strokeWidth="10" />
      <circle r="55" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" />
      <path d="M-104 -6 A110 26 0 0 0 104 -6" fill="none" stroke="#E3B95A" strokeWidth="10" />
    </g>
    {/* Mặt trăng dưới chân */}
    <path d={`M0 ${FLOOR - 40} Q540 ${FLOOR - 110} 1080 ${FLOOR - 40} L1080 1920 L0 1920 Z`} fill="url(#space-moon)" stroke={INK} strokeWidth="6" />
    {[[180, 1300, 70], [620, 1420, 50], [900, 1290, 40], [380, 1620, 90]].map(([x, y, r], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx={r} ry={r * 0.4} fill="#8A8174" stroke={INK} strokeWidth="4" />
        <ellipse cx={x + r * 0.1} cy={y + r * 0.08} rx={r * 0.8} ry={r * 0.26} fill="#A39A8C" />
      </g>
    ))}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#space-shade)" />
  </>
);

/** Bãi biển buổi chiều: trời vàng, biển xanh ngọc, thuyền thúng, rặng dừa, cát vàng. */
const Beach: React.FC = () => (
  <>
    <defs>
      <linearGradient id="beach-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4E93A6" />
        <stop offset="1" stopColor="#7DB9B8" />
      </linearGradient>
    </defs>
    <WarmSky id="beach-sky" h={FLOOR} sun={[820, 560]} />
    <Cloud x={260} y={360} s={0.8} />
    {/* Núi xa mờ */}
    <path d="M-20 820 Q120 700 260 760 Q380 680 520 800 L-20 820 Z" fill="#B7B79A" stroke="#9C8A62" strokeWidth="4" />
    <rect x="0" y="800" width="1080" height={FLOOR - 800} fill="url(#beach-sea)" />
    <rect x="600" y="800" width="440" height="200" fill="#FFE6A8" opacity="0.25" />
    {[860, 940, 1020, 1100].map((y, i) => (
      <path
        key={y}
        d={`M0 ${y} q45 -14 90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0`}
        fill="none"
        stroke="#F6F0DC"
        strokeWidth="5"
        opacity={0.35 + i * 0.1}
      />
    ))}
    {/* Thuyền thúng ngoài khơi */}
    <path d="M660 900 Q700 926 740 900 Z" fill="#8A5530" stroke={INK} strokeWidth="4" />
    <path d={`M0 1150 Q540 1110 1080 1160 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#EED6A2" stroke="#C9A46A" strokeWidth="4" />
    <path d="M0 1150 Q540 1110 1080 1160" fill="none" stroke="#FFFFFF" strokeWidth="8" opacity="0.6" />
    {/* Rặng dừa bên trái */}
    <g transform="translate(90 1200)">
      <path d="M-10 0 Q10 -260 70 -520 L92 -514 Q34 -260 26 0 Z" fill="url(#w-wood-h)" stroke={INK} strokeWidth="7" />
      {[-150, -110, -60, -10, 30, 70].map((a, i) => (
        <path
          key={a}
          transform={`translate(80 -520) rotate(${a})`}
          d="M0 0 Q90 -40 200 30 Q90 0 0 0 Z"
          fill={i % 2 ? PAL.leaf : PAL.leafDark}
          stroke={INK}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      ))}
      <circle cx="70" cy="-506" r="16" fill="#7A5A2A" stroke={INK} strokeWidth="4" />
      <circle cx="94" cy="-500" r="16" fill="#7A5A2A" stroke={INK} strokeWidth="4" />
    </g>
    {/* Thuyền thúng trên cát bên phải */}
    <g transform="translate(980 1230)">
      <SoftShadow rx={150} />
      <path d="M-130 -70 Q-120 0 0 6 Q120 0 130 -70 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
      {[-90, -45, 0, 45, 90].map((x) => (
        <line key={x} x1={x} y1="-66" x2={x * 0.9} y2="0" stroke="#6E4324" strokeWidth="3" />
      ))}
      <ellipse cx="0" cy="-70" rx="130" ry="20" fill="#5E3A20" stroke={INK} strokeWidth="6" />
    </g>
    <Floor color="#E7C88C" line="#D6B272" />
  </>
);

// ------------------------------------------------ truyện cổ tích (cảnh hồi ức)

/** Quán rượu ngày xưa: vách đất, mái tranh, cột tre, biển "QUÁN RƯỢU", chum rượu xếp góc phải. */
const Tavern: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#D9C094" />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M${i * 130 + 20} ${560 + (i % 3) * 120} q40 -16 80 0`} fill="none" stroke="#B49B6E" strokeWidth="6" strokeLinecap="round" />
    ))}
    {/* Mái tranh */}
    <path d="M-40 0 L1120 0 L1120 330 Q540 430 -40 330 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    {Array.from({ length: 22 }, (_, i) => (
      <line key={i} x1={i * 52} y1="40" x2={i * 52 - 18} y2={350 + Math.sin(i) * 20} stroke="#9A6A22" strokeWidth="5" />
    ))}
    <path d="M-40 330 Q540 430 1120 330 L1120 360 Q540 460 -40 360 Z" fill="#3A2416" opacity="0.25" />
    {[70, 1010].map((x) => (
      <g key={x}>
        <rect x={x - 22} y="340" width="44" height={FLOOR - 340} fill="#C9A24E" stroke={INK} strokeWidth="7" />
        {[520, 720, 920, 1120].map((y) => (
          <line key={y} x1={x - 22} y1={y} x2={x + 22} y2={y} stroke={INK} strokeWidth="6" />
        ))}
      </g>
    ))}
    <line x1="440" y1="380" x2="440" y2="440" stroke={INK} strokeWidth="6" />
    <line x1="640" y1="380" x2="640" y2="440" stroke={INK} strokeWidth="6" />
    <rect x="390" y="440" width="300" height="96" rx="8" fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" />
    <text x="540" y="503" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="50" fill="#FFE27A">
      QUÁN RƯỢU
    </text>
    <Jar x={820} y={1000} s={0.85} />
    <Jar x={930} y={990} s={0.8} />
    <rect x="740" y="1000" width="280" height="24" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
    <Floor color="#A8835A" line="#93704A" />
  </>
);

/** Tán đa đêm. */
const BanyanCanopy: React.FC = () => (
  <g>
    <ellipse cx="880" cy="560" rx="300" ry="200" fill="#2F5236" stroke={INK} strokeWidth="8" />
    <ellipse cx="700" cy="640" rx="170" ry="110" fill="#2F5236" stroke={INK} strokeWidth="8" />
    <ellipse cx="820" cy="500" rx="180" ry="100" fill="#3D6643" opacity="0.7" />
  </g>
);

/** Miếu cổ dưới gốc đa trong rừng đêm. */
const Temple: React.FC = () => (
  <>
    <defs>
      <linearGradient id="temple-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#141A3A" />
        <stop offset="1" stopColor="#3A3F6A" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#temple-sky)" />
    <circle cx="200" cy="300" r="64" fill="#FFF1C2" stroke="#E9CB7A" strokeWidth="8" />
    <path d={`M0 900 Q120 760 240 880 Q360 740 480 870 Q620 760 740 880 Q880 760 1080 860 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#24382E" stroke={INK} strokeWidth="5" />
    <path d={`M840 ${FLOOR} Q860 900 820 700 L940 700 Q920 900 980 ${FLOOR} Z`} fill="url(#w-wood-dark)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <BanyanCanopy />
    {[620, 690, 760, 1000, 1050].map((x, i) => (
      <line key={x} x1={x} y1="680" x2={x + (i % 2 ? 8 : -6)} y2={980 + (i % 3) * 60} stroke="#5C4128" strokeWidth="7" strokeLinecap="round" />
    ))}
    <rect x="390" y="900" width="250" height={FLOOR - 900} fill="#B9A27A" stroke={INK} strokeWidth="8" />
    <rect x="470" y="980" width="90" height={FLOOR - 980} fill="#2A170C" stroke={INK} strokeWidth="6" />
    <ellipse cx="515" cy="1150" rx="40" ry="60" fill="url(#w-glow)" opacity="0.6" />
    <path d="M350 910 Q515 800 680 910 Q690 880 660 870 Q515 770 370 870 Q340 880 350 910 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M350 910 Q330 880 320 860 M680 910 Q700 880 710 860" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <Floor color="#34502F" line="#2B4428" />
  </>
);

/** Vách núi đá, cửa hang tối bên trái (tâm x ≈ 290). */
const Cave: React.FC = () => (
  <>
    <WarmSky id="cave-sky" h={FLOOR} sun={[900, 260]} />
    <path d={`M-20 ${FLOOR} L-20 420 Q120 300 260 360 Q400 220 560 330 Q700 260 820 380 Q960 320 1100 420 L1100 ${FLOOR} Z`} fill="#8C8273" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <path d="M-20 480 Q120 360 260 420 Q400 290 560 390 L560 520 Q300 460 -20 600 Z" fill="#A39885" opacity="0.6" />
    {[
      "M120 560 L220 520 L300 580",
      "M620 520 L700 470 L780 540",
      "M840 700 L940 660 L1020 720",
      "M560 860 L640 820 L700 880",
    ].map((d) => (
      <path key={d} d={d} fill="none" stroke="#6A6052" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    ))}
    {[[700, 380], [940, 360], [420, 300]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} q20 -30 40 -10 q20 -24 36 4`} fill="#7FA557" stroke={INK} strokeWidth="5" />
    ))}
    <path d={`M110 ${FLOOR} Q110 760 290 740 Q470 760 470 ${FLOOR} Z`} fill="#1E1611" stroke={INK} strokeWidth="10" />
    <path d={`M140 ${FLOOR} Q150 800 290 784`} fill="none" stroke="#3A2C22" strokeWidth="14" />
    <Floor color="#8A7C66" line="#776A56" />
  </>
);

const pick = (id: SceneId, text?: string): React.ReactNode => {
  const Story = STORY_SCENES[id];
  if (Story) return <Story />;
  if (id === "tavern") return <Tavern />;
  if (id === "temple") return <Temple />;
  if (id === "cave") return <Cave />;
  if (id === "space") return <Space />;
  if (id === "beach") return <Beach />;
  if (id === "night") return <Courtyard night />;
  if (id === "yard") return <Courtyard />;
  if (id === "kitchen") return <Kitchen />;
  if (id === "classroom") return <Classroom text={text} />;
  return <Home />;
};

export const SceneBackground: React.FC<{ id: SceneId; text?: string }> = ({ id, text }) => (
  <>
    <WarmDefs />
    {pick(id, text)}
  </>
);
