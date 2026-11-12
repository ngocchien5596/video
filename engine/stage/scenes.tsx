import React from "react";
import type { SceneId } from "../lib/stage-types.ts";
import { COLORS, TEXT_FONT } from "../components/brand.ts";
import { Floor, FLOOR } from "./draw.tsx";
import { STORY_SCENES } from "./story/index.ts";

const INK = COLORS.ink;
export { FLOOR } from "./draw.tsx";

/** Mặt bàn trong cảnh bếp: đồ đặt `on: "table"` đứng ở đây. */
export const TABLE_TOP = 1112;

const Home: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#3F6F73" />
    {Array.from({ length: 14 }, (_, i) => (
      <rect key={i} x={i * 80} y="0" width="36" height={FLOOR} fill="#FFFFFF" opacity="0.04" />
    ))}
    {/* Cửa sổ */}
    <rect x="690" y="330" width="250" height="300" rx="10" fill="#A8DDF0" stroke={INK} strokeWidth="10" />
    <circle cx="880" cy="400" r="34" fill="#FFE27A" />
    <line x1="815" y1="330" x2="815" y2="630" stroke={INK} strokeWidth="10" />
    <line x1="690" y1="480" x2="940" y2="480" stroke={INK} strokeWidth="10" />
    {/* Tranh chữ "Tâm" */}
    <rect x="110" y="320" width="190" height="320" rx="6" fill="#F6E7C1" stroke={INK} strokeWidth="8" />
    <rect x="96" y="310" width="218" height="22" rx="8" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
    <rect x="96" y="628" width="218" height="22" rx="8" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
    <text x="205" y="520" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontWeight="700" fontSize="110" fill="#8B1E24">
      Tâm
    </text>
    {/* Ốp chân tường */}
    <rect x="0" y="1010" width="1080" height={FLOOR - 1010} fill="#2E5458" />
    <line x1="0" y1="1010" x2="1080" y2="1010" stroke={INK} strokeWidth="8" />
    <Floor color="#7A4E2D" line="#6A4226" />
  </>
);

const Kitchen: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#5F8FA3" />
    {Array.from({ length: 16 }, (_, i) => (
      <line key={`v${i}`} x1={i * 72} y1="700" x2={i * 72} y2={FLOOR} stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="4" />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <line key={`h${i}`} x1="0" y1={700 + i * 72} x2="1080" y2={700 + i * 72} stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="4" />
    ))}
    {/* Kệ bếp */}
    <rect x="620" y="560" width="360" height="22" rx="6" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
    <path d="M660 560 Q660 500 720 500 Q780 500 780 560 Z" fill="#C9302C" stroke={INK} strokeWidth="6" />
    <rect x="820" y="480" width="70" height="80" rx="10" fill="#FFD93D" stroke={INK} strokeWidth="6" />
    <Floor color="#B08A5C" line="#9C784C" />
  </>
);

/** Bàn ăn đặt trước nhân vật (che phần chân). Vẽ sau nhân vật. */
export const KitchenTable: React.FC = () => (
  <>
    <rect x="110" y={TABLE_TOP} width="860" height="34" rx="10" fill="#A0663A" stroke={INK} strokeWidth="8" />
    <rect x="140" y={TABLE_TOP + 30} width="800" height={FLOOR - TABLE_TOP - 30} fill="#7A4A26" stroke={INK} strokeWidth="8" />
  </>
);

const Classroom: React.FC<{ text?: string }> = ({ text }) => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#7A9E7E" />
    <rect x="130" y="340" width="820" height="400" rx="12" fill="#1F3B2D" stroke="#8B5A2B" strokeWidth="22" />
    {(text ?? "BÀI HỌC HÔM NAY").split("\n").map((line, i, all) => (
      <text
        key={i}
        x="540"
        y={560 + (i - (all.length - 1) / 2) * 90}
        textAnchor="middle"
        fontFamily={TEXT_FONT}
        fontWeight="900"
        fontSize="72"
        fill="#F4F1E8"
        opacity="0.92"
      >
        {line}
      </text>
    ))}
    <rect x="760" y="700" width="70" height="16" rx="4" fill="#FFFFFF" />
    <rect x="0" y="1010" width="1080" height={FLOOR - 1010} fill="#5E7F62" />
    <line x1="0" y1="1010" x2="1080" y2="1010" stroke={INK} strokeWidth="8" />
    <Floor color="#C9B79C" line="#B5A385" />
  </>
);

/** Sân ngoài trời: trời, mây, hàng rào, khung thành nhỏ, nền cỏ. */
const Yard: React.FC = () => (
  <>
    <defs>
      <linearGradient id="yard-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6EC6F0" />
        <stop offset="1" stopColor="#CDEFFC" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#yard-sky)" />
    <circle cx="860" cy="330" r="70" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    {[
      [240, 380, 1],
      [620, 470, 0.8],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF">
        <ellipse cx="0" cy="0" rx="90" ry="40" />
        <ellipse cx="-60" cy="12" rx="60" ry="30" />
        <ellipse cx="64" cy="10" rx="64" ry="32" />
      </g>
    ))}
    {/* Hàng rào */}
    <rect x="0" y="930" width="1080" height="18" fill="#F4F1E8" stroke={INK} strokeWidth="5" />
    <rect x="0" y="990" width="1080" height="18" fill="#F4F1E8" stroke={INK} strokeWidth="5" />
    {Array.from({ length: 14 }, (_, i) => (
      <path
        key={i}
        d={`M${i * 80 + 18} ${FLOOR} L${i * 80 + 18} 900 L${i * 80 + 36} 876 L${i * 80 + 54} 900 L${i * 80 + 54} ${FLOOR} Z`}
        fill="#FFFFFF"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    ))}
    {/* Bụi cây sau rào */}
    <ellipse cx="120" cy="900" rx="150" ry="70" fill="#4FA85A" stroke={INK} strokeWidth="6" />
    <ellipse cx="980" cy="890" rx="170" ry="80" fill="#4FA85A" stroke={INK} strokeWidth="6" />
    <Floor color="#6DBE45" line="#5DAA3A" />
  </>
);

/** Sân ban đêm: trời tối, trăng, sao, hàng rào và cỏ sẫm màu. */
const Night: React.FC = () => (
  <>
    <defs>
      <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0B1433" />
        <stop offset="1" stopColor="#25346B" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#night-sky)" />
    {[
      [120, 260], [260, 420], [420, 300], [540, 520], [700, 380], [820, 600], [960, 470], [180, 640], [620, 700], [330, 760],
    ].map(([x, y], i) => (
      <path
        key={i}
        d={`M${x} ${y - 12} L${x + 4} ${y - 4} L${x + 12} ${y} L${x + 4} ${y + 4} L${x} ${y + 12} L${x - 4} ${y + 4} L${x - 12} ${y} L${x - 4} ${y - 4} Z`}
        fill="#FFF3A0"
        opacity={0.6 + (i % 3) * 0.15}
      />
    ))}
    <circle cx="860" cy="300" r="70" fill="#FFF3C4" stroke="#FFE27A" strokeWidth="8" />
    <circle cx="890" cy="280" r="62" fill="#14204A" />
    <rect x="0" y="930" width="1080" height="18" fill="#9AA3BF" stroke={INK} strokeWidth="5" />
    <rect x="0" y="990" width="1080" height="18" fill="#9AA3BF" stroke={INK} strokeWidth="5" />
    {Array.from({ length: 14 }, (_, i) => (
      <path
        key={i}
        d={`M${i * 80 + 18} ${FLOOR} L${i * 80 + 18} 900 L${i * 80 + 36} 876 L${i * 80 + 54} 900 L${i * 80 + 54} ${FLOOR} Z`}
        fill="#B8C0D9"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    ))}
    <ellipse cx="120" cy="900" rx="150" ry="70" fill="#2C5A37" stroke={INK} strokeWidth="6" />
    <ellipse cx="980" cy="890" rx="170" ry="80" fill="#2C5A37" stroke={INK} strokeWidth="6" />
    <Floor color="#2F6B34" line="#285C2D" />
  </>
);

/** Ngoài vũ trụ: đứng trên mặt trăng, xa xa là Trái Đất, Sao Thổ và các ngôi sao. */
const Space: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#0A0F2C" />
    {Array.from({ length: 40 }, (_, i) => {
      const x = (i * 263) % 1080;
      const y = 140 + ((i * 397) % 900);
      return <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 4 : 2} fill="#FFFFFF" opacity={0.5 + (i % 3) * 0.2} />;
    })}
    {/* Trái Đất */}
    <circle cx="830" cy="360" r="110" fill="#3D7BD9" stroke={INK} strokeWidth="8" />
    <path d="M760 320 q50 -40 100 0 q-20 50 -90 40 z M820 410 q60 -10 70 40 q-50 20 -80 -10 z" fill="#6DBE45" />
    <path d="M830 250 A110 110 0 0 1 830 470 A80 110 0 0 0 830 250 Z" fill="#0A0F2C" opacity="0.45" />
    {/* Sao Thổ */}
    <g transform="translate(220 470) rotate(-18)">
      <ellipse rx="110" ry="26" fill="none" stroke="#E8C547" strokeWidth="10" />
      <circle r="55" fill="#E8A33D" stroke={INK} strokeWidth="6" />
      <path d="M-104 -6 A110 26 0 0 0 104 -6" fill="none" stroke="#E8C547" strokeWidth="10" />
    </g>
    {/* Mặt trăng dưới chân */}
    <path d={`M0 ${FLOOR - 40} Q540 ${FLOOR - 110} 1080 ${FLOOR - 40} L1080 1920 L0 1920 Z`} fill="#A7A9B4" stroke={INK} strokeWidth="6" />
    {[[180, 1300, 70], [620, 1420, 50], [900, 1290, 40], [380, 1620, 90]].map(([x, y, r], i) => (
      <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.4} fill="#8E909C" stroke={INK} strokeWidth="4" />
    ))}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#space-shade)" />
    <defs>
      <linearGradient id="space-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  </>
);

/** Bãi biển: trời, mặt trời, đường chân trời, sóng biển, cát. */
const Beach: React.FC = () => (
  <>
    <defs>
      <linearGradient id="beach-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6EC6F0" />
        <stop offset="1" stopColor="#CDEFFC" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#beach-sky)" />
    <circle cx="860" cy="330" r="70" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    <rect x="0" y="820" width="1080" height={FLOOR - 820} fill="#2F86C9" />
    <rect x="0" y="820" width="1080" height="10" fill="#1F6FB2" />
    {[880, 960, 1040, 1120].map((y, i) => (
      <path
        key={y}
        d={`M0 ${y} q45 -16 90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        opacity={0.35 + i * 0.1}
      />
    ))}
    <path d={`M0 1180 Q540 1150 1080 1185 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#F2D49B" />
    <Floor color="#EBC685" line="#DDB26C" />
  </>
);

// ------------------------------------------------ truyện cổ tích (cảnh hồi ức)

/** Quán rượu ngày xưa: vách đất, mái tranh, cột tre, biển "QUÁN RƯỢU", chum rượu xếp góc phải. */
const Tavern: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#CDB892" />
    {/* Vách đất có vệt */}
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M${i * 130 + 20} ${560 + (i % 3) * 120} q40 -16 80 0`} fill="none" stroke="#A8916A" strokeWidth="6" strokeLinecap="round" />
    ))}
    {/* Mái tranh */}
    <path d="M-40 0 L1120 0 L1120 330 Q540 430 -40 330 Z" fill="#B08A3E" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    {Array.from({ length: 22 }, (_, i) => (
      <line key={i} x1={i * 52} y1="40" x2={i * 52 - 18} y2={350 + Math.sin(i) * 20} stroke="#8C6A2A" strokeWidth="5" />
    ))}
    {/* Cột tre */}
    {[70, 1010].map((x) => (
      <g key={x}>
        <rect x={x - 22} y="340" width="44" height={FLOOR - 340} fill="#C9A24E" stroke={INK} strokeWidth="7" />
        {[520, 720, 920, 1120].map((y) => (
          <line key={y} x1={x - 22} y1={y} x2={x + 22} y2={y} stroke={INK} strokeWidth="6" />
        ))}
      </g>
    ))}
    {/* Biển quán */}
    <line x1="440" y1="380" x2="440" y2="440" stroke={INK} strokeWidth="6" />
    <line x1="640" y1="380" x2="640" y2="440" stroke={INK} strokeWidth="6" />
    <rect x="390" y="440" width="300" height="96" rx="8" fill="#7A2E22" stroke={INK} strokeWidth="8" />
    <text x="540" y="503" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="50" fill="#FFE27A">
      QUÁN RƯỢU
    </text>
    {/* Kệ chum rượu sau quầy */}
    {[820, 920].map((x, i) => (
      <g key={x} transform={`translate(${x} ${1000 - i * 10})`}>
        <path d="M-40 -130 Q-74 -100 -66 -48 Q-58 0 0 0 Q58 0 66 -48 Q74 -100 40 -130 Z" fill="#9C5B2E" stroke={INK} strokeWidth="7" />
        <rect x="-32" y="-152" width="64" height="26" rx="8" fill="#7A4421" stroke={INK} strokeWidth="6" />
      </g>
    ))}
    <rect x="740" y="1000" width="280" height="24" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
    <Floor color="#9C7A4E" line="#8A6B42" />
  </>
);

/** Miếu cổ dưới gốc đa trong rừng đêm. */
const Temple: React.FC = () => (
  <>
    <defs>
      <linearGradient id="temple-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0E1430" />
        <stop offset="1" stopColor="#36406E" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#temple-sky)" />
    <circle cx="200" cy="300" r="64" fill="#FFF3C4" stroke="#FFE27A" strokeWidth="8" />
    {/* Rặng cây xa */}
    <path d={`M0 900 Q120 760 240 880 Q360 740 480 870 Q620 760 740 880 Q880 760 1080 860 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#1F3A2A" stroke={INK} strokeWidth="6" />
    {/* Cây đa: thân to, rễ phụ thõng xuống */}
    <path d={`M840 ${FLOOR} Q860 900 820 700 L940 700 Q920 900 980 ${FLOOR} Z`} fill="#5C4128" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <ellipse cx="880" cy="560" rx="300" ry="200" fill="#2C5A37" stroke={INK} strokeWidth="8" />
    <ellipse cx="700" cy="640" rx="170" ry="110" fill="#2C5A37" stroke={INK} strokeWidth="8" />
    {[620, 690, 760, 1000, 1050].map((x, i) => (
      <line key={x} x1={x} y1="680" x2={x + (i % 2 ? 8 : -6)} y2={980 + (i % 3) * 60} stroke="#5C4128" strokeWidth="7" strokeLinecap="round" />
    ))}
    {/* Ngôi miếu */}
    <rect x="390" y="900" width="250" height={FLOOR - 900} fill="#B9A27A" stroke={INK} strokeWidth="8" />
    <rect x="470" y="980" width="90" height={FLOOR - 980} fill="#1A1626" stroke={INK} strokeWidth="6" />
    <path d="M350 910 Q515 800 680 910 Q690 880 660 870 Q515 770 370 870 Q340 880 350 910 Z" fill="#7A2E22" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M350 910 Q330 880 320 860 M680 910 Q700 880 710 860" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <Floor color="#2F5A30" line="#284E29" />
  </>
);

/** Vách núi đá, cửa hang tối bên trái (tâm x ≈ 290). */
const Cave: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#9FB4C7" />
    {/* Núi đá */}
    <path d={`M-20 ${FLOOR} L-20 420 Q120 300 260 360 Q400 220 560 330 Q700 260 820 380 Q960 320 1100 420 L1100 ${FLOOR} Z`} fill="#7B7F8A" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    {[
      "M120 560 L220 520 L300 580",
      "M620 520 L700 470 L780 540",
      "M840 700 L940 660 L1020 720",
      "M560 860 L640 820 L700 880",
    ].map((d) => (
      <path key={d} d={d} fill="none" stroke="#5E626B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    ))}
    {/* Cửa hang */}
    <path d={`M110 ${FLOOR} Q110 760 290 740 Q470 760 470 ${FLOOR} Z`} fill="#15131C" stroke={INK} strokeWidth="10" />
    <path d={`M140 ${FLOOR} Q150 800 290 784`} fill="none" stroke="#2A2733" strokeWidth="14" />
    <Floor color="#6E6A62" line="#5E5A53" />
  </>
);

export const SceneBackground: React.FC<{ id: SceneId; text?: string }> = ({ id, text }) => {
  const Story = STORY_SCENES[id];
  if (Story) return <Story />;
  if (id === "tavern") return <Tavern />;
  if (id === "temple") return <Temple />;
  if (id === "cave") return <Cave />;
  if (id === "space") return <Space />;
  if (id === "beach") return <Beach />;
  if (id === "night") return <Night />;
  if (id === "yard") return <Yard />;
  if (id === "kitchen") return <Kitchen />;
  if (id === "classroom") return <Classroom text={text} />;
  return <Home />;
};
