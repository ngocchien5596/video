import React from "react";
import type { SceneId } from "../lib/stage-types.ts";
import { COLORS, TEXT_FONT } from "../components/brand.ts";

const INK = COLORS.ink;

/** Mặt sàn (toạ độ y trên khung 1080×1920). Phụ đề nằm ngay dưới. */
export const FLOOR = 1240;
/** Mặt bàn trong cảnh bếp: đồ đặt `on: "table"` đứng ở đây. */
export const TABLE_TOP = 1112;

const Floor: React.FC<{ color: string; line: string }> = ({ color, line }) => (
  <>
    <defs>
      <linearGradient id="floor-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.75" />
      </linearGradient>
    </defs>
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill={color} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1="0" y1={FLOOR + 30 + i * 60} x2="1080" y2={FLOOR + 30 + i * 60} stroke={line} strokeWidth="4" />
    ))}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#floor-shade)" />
    <rect x="0" y={FLOOR - 6} width="1080" height="12" fill={INK} />
  </>
);

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

export const SceneBackground: React.FC<{ id: SceneId; text?: string }> = ({ id, text }) => {
  if (id === "kitchen") return <Kitchen />;
  if (id === "classroom") return <Classroom text={text} />;
  return <Home />;
};
