/**
 * Bộ vẽ cảnh làng quê Bắc Bộ dùng chung (phong cách tranh dân gian hiện đại, đồng bộ với bản thiết kế nhân vật
 * projects/CD_TC.png): viền nâu đậm, đổ bóng mềm bằng gradient, bảng màu nâu đất · vàng nghệ · kem · đỏ ngói · xanh lá dịu.
 * Gradient dùng chung có id tiền tố "w-" (khai báo trong <WarmDefs />, phông và đạo cụ đều tự kèm nên vẽ ở đâu cũng có).
 */
import React from "react";

/** Màu viền: nâu đen ấm (thay cho mực đen lạnh). */
export const LINE = "#3A2416";

export const PAL = {
  line: LINE,
  earth: "#7A4A2A",
  wood: "#9A6236",
  woodLight: "#C08A55",
  woodDark: "#5E3A20",
  turmeric: "#E3A631",
  cream: "#F6E9CF",
  paper: "#FBF1DC",
  tile: "#B8513A",
  tileDark: "#8E3B2A",
  brick: "#B65E43",
  leaf: "#7FA557",
  leafDark: "#4E7A3A",
  leafLight: "#A9C77A",
  sky: "#F6DFAF",
  blueGlaze: "#2F5D9A",
  lacquer: "#A8362A",
  gold: "#D9A23A",
};

/** Gradient dùng chung (objectBoundingBox nên áp được cho mọi hình). */
export const WarmDefs: React.FC = () => (
  <defs>
    <linearGradient id="w-wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#B87C48" />
      <stop offset="1" stopColor="#7B4B28" />
    </linearGradient>
    <linearGradient id="w-wood-h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#C48D57" />
      <stop offset="0.55" stopColor="#9A6236" />
      <stop offset="1" stopColor="#6E4324" />
    </linearGradient>
    <linearGradient id="w-wood-dark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#8A5530" />
      <stop offset="0.5" stopColor="#6A4022" />
      <stop offset="1" stopColor="#4A2B16" />
    </linearGradient>
    <linearGradient id="w-tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#A9452F" />
      <stop offset="1" stopColor="#CF6A4B" />
    </linearGradient>
    <radialGradient id="w-clay" cx="0.36" cy="0.32" r="0.75">
      <stop offset="0" stopColor="#C98A55" />
      <stop offset="0.6" stopColor="#8E5530" />
      <stop offset="1" stopColor="#5C341C" />
    </radialGradient>
    <radialGradient id="w-glaze" cx="0.36" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.65" stopColor="#F1ECE0" />
      <stop offset="1" stopColor="#CFC6B2" />
    </radialGradient>
    <radialGradient id="w-leaf" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#A9C77A" />
      <stop offset="0.6" stopColor="#7FA557" />
      <stop offset="1" stopColor="#527E3B" />
    </radialGradient>
    <linearGradient id="w-brass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#F5CF6A" />
      <stop offset="1" stopColor="#B07A22" />
    </linearGradient>
    <linearGradient id="w-paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFF8E8" />
      <stop offset="1" stopColor="#E9D3AA" />
    </linearGradient>
    <linearGradient id="w-metal" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#F2F2EE" />
      <stop offset="0.6" stopColor="#C9C9C2" />
      <stop offset="1" stopColor="#8F8F88" />
    </linearGradient>
    <linearGradient id="w-lacquer" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#C8503C" />
      <stop offset="1" stopColor="#8A2C22" />
    </linearGradient>
    <linearGradient id="w-turmeric" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F4C55A" />
      <stop offset="1" stopColor="#C98A1E" />
    </linearGradient>
    <linearGradient id="w-dark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#4A4642" />
      <stop offset="1" stopColor="#24211F" />
    </linearGradient>
    <radialGradient id="w-shadow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#3A2416" stopOpacity="0.38" />
      <stop offset="1" stopColor="#3A2416" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="w-shine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.7" />
      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <radialGradient id="w-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#FFD77A" stopOpacity="0.85" />
      <stop offset="1" stopColor="#FFB84A" stopOpacity="0" />
    </radialGradient>
  </defs>
);

/** Bóng mềm dưới chân đồ vật. */
export const SoftShadow: React.FC<{ cx?: number; cy?: number; rx: number; ry?: number; opacity?: number }> = ({ cx = 0, cy = 0, rx, ry, opacity = 1 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry ?? rx * 0.22} fill="url(#w-shadow)" opacity={opacity} />
);

/** Vệt sáng trắng mờ (ánh bóng men, kính...). */
export const Shine: React.FC<{ d: string; opacity?: number }> = ({ d, opacity = 0.55 }) => (
  <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity={opacity} strokeWidth="6" strokeLinecap="round" />
);

/**
 * Tán lá nhiều lớp: vẽ mọi khối có viền rồi phủ lại không viền để chỉ còn viền ngoài,
 * thêm khối sáng (trên trái) và khối tối (dưới phải).
 */
export const Canopy: React.FC<{
  blobs: [number, number, number][];
  base?: string;
  light?: string;
  dark?: string;
  sw?: number;
  line?: string;
}> = ({ blobs, base = PAL.leaf, light = PAL.leafLight, dark = PAL.leafDark, sw = 7, line = LINE }) => (
  <g>
    {blobs.map(([x, y, r], i) => (
      <circle key={`o${i}`} cx={x} cy={y} r={r} fill={line} stroke={line} strokeWidth={sw * 2} />
    ))}
    {blobs.map(([x, y, r], i) => (
      <circle key={`b${i}`} cx={x} cy={y} r={r} fill={base} />
    ))}
    {blobs.map(([x, y, r], i) => (
      <circle key={`d${i}`} cx={x + r * 0.18} cy={y + r * 0.22} r={r * 0.78} fill={dark} opacity="0.55" />
    ))}
    {blobs.map(([x, y, r], i) => (
      <circle key={`m${i}`} cx={x - r * 0.08} cy={y - r * 0.08} r={r * 0.74} fill={base} />
    ))}
    {blobs.map(([x, y, r], i) => (
      <circle key={`l${i}`} cx={x - r * 0.28} cy={y - r * 0.3} r={r * 0.4} fill={light} opacity="0.75" />
    ))}
    {/* Vài nét lá nhỏ */}
    {blobs.map(([x, y, r], i) => (
      <path
        key={`s${i}`}
        d={`M${x - r * 0.2} ${y + r * 0.35} q${r * 0.12} -${r * 0.14} ${r * 0.26} 0 M${x + r * 0.3} ${y - r * 0.05} q${r * 0.1} -${r * 0.12} ${r * 0.22} 0`}
        fill="none"
        stroke={dark}
        strokeWidth={sw * 0.6}
        strokeLinecap="round"
        opacity="0.7"
      />
    ))}
  </g>
);

/** Cây tán tròn (nhãn, bàng...): gốc ở (x, y). */
export const Tree: React.FC<{ x: number; y: number; s?: number; flip?: boolean; tone?: "day" | "far" }> = ({ x, y, s = 1, flip, tone = "day" }) => {
  const far = tone === "far";
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path
        d="M-34 0 Q-20 -120 -40 -260 Q-60 -330 -110 -380 L-90 -396 Q-40 -350 -16 -300 Q-4 -380 -30 -470 L0 -476 Q24 -380 14 -290 Q50 -360 120 -390 L130 -370 Q60 -330 36 -250 Q22 -120 40 0 Z"
        fill="url(#w-wood-h)"
        stroke={LINE}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path d="M-8 -40 Q-2 -140 -18 -230" fill="none" stroke="#5E3A20" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <Canopy
        blobs={[
          [-150, -420, 110],
          [-30, -520, 140],
          [110, -440, 120],
          [180, -360, 80],
          [-200, -330, 80],
          [40, -380, 110],
        ]}
        base={far ? "#9DB57A" : PAL.leaf}
        light={far ? "#C3D49C" : PAL.leafLight}
        dark={far ? "#7E9B60" : PAL.leafDark}
        sw={far ? 5 : 7}
      />
    </g>
  );
};

/** Bụi tre: các cây tre mảnh có đốt, lá nhọn. */
export const Bamboo: React.FC<{ x: number; y: number; s?: number; flip?: boolean }> = ({ x, y, s = 1, flip }) => {
  const stems = [
    [-60, -820, -10],
    [-20, -900, 4],
    [24, -860, 12],
    [64, -760, 22],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {stems.map(([dx, h, lean], i) => (
        <g key={i}>
          <path d={`M${dx} 0 Q${dx + lean * 0.5} ${h / 2} ${dx + lean * 4} ${h}`} fill="none" stroke={LINE} strokeWidth="20" strokeLinecap="round" />
          <path d={`M${dx} 0 Q${dx + lean * 0.5} ${h / 2} ${dx + lean * 4} ${h}`} fill="none" stroke="#8FAE5A" strokeWidth="12" strokeLinecap="round" />
          {[0.18, 0.36, 0.54, 0.72].map((t) => (
            <line key={t} x1={dx + lean * t * 2 - 8} y1={h * t} x2={dx + lean * t * 2 + 8} y2={h * t} stroke={LINE} strokeWidth="4" />
          ))}
        </g>
      ))}
      {[
        [-70, -620, -30],
        [-10, -720, 20],
        [60, -660, 35],
        [100, -560, 50],
        [-90, -500, -50],
        [30, -820, -10],
        [90, -760, 40],
        [-50, -780, -40],
      ].map(([lx, ly, a], i) => (
        <g key={`l${i}`} transform={`translate(${lx} ${ly}) rotate(${a})`}>
          {[-50, -10, 30].map((r) => (
            <path key={r} transform={`rotate(${r})`} d="M0 0 Q30 -10 70 4 Q30 12 0 0 Z" fill={i % 2 ? "#86AA54" : "#6E9446"} stroke={LINE} strokeWidth="4" strokeLinejoin="round" />
          ))}
        </g>
      ))}
    </g>
  );
};

/** Hàng cây xa (hậu cảnh): mờ, viền mảnh. */
export const DistantTrees: React.FC<{ y: number; color?: string; line?: string }> = ({ y, color = "#A8BC84", line = "#8A7A5A" }) => (
  <path
    d={`M-20 ${y} Q30 ${y - 90} 90 ${y - 60} Q140 ${y - 140} 210 ${y - 90} Q260 ${y - 150} 330 ${y - 100} Q380 ${y - 60} 430 ${y - 80} Q500 ${y - 150} 570 ${y - 90} Q640 ${y - 130} 700 ${y - 80} Q760 ${y - 150} 840 ${y - 100} Q900 ${y - 60} 950 ${y - 90} Q1020 ${y - 140} 1100 ${y - 70} L1100 ${y + 200} L-20 ${y + 200} Z`}
    fill={color}
    stroke={line}
    strokeWidth="4"
    strokeLinejoin="round"
  />
);

/** Mái ngói: hình thang từ (−w/2, y) lên (−top/2, y−h), có hàng ngói vảy, bờ nóc cong hai đầu. */
export const TileRoof: React.FC<{ w: number; top: number; h: number }> = ({ w, top, h }) => {
  const rows = 7;
  return (
    <g>
      <path d={`M${-w / 2} 0 L${-top / 2} ${-h} L${top / 2} ${-h} L${w / 2} 0 Q0 18 ${-w / 2} 0 Z`} fill="url(#w-tile)" stroke={LINE} strokeWidth="9" strokeLinejoin="round" />
      {Array.from({ length: rows }, (_, r) => {
        const t = (r + 1) / (rows + 1);
        const yy = -h + h * t;
        const half = top / 2 + ((w - top) / 2) * t;
        const n = Math.round((half * 2) / 46);
        const step = (half * 2) / n;
        let d = `M${-half} ${yy}`;
        for (let i = 0; i < n; i++) d += ` q${step / 2} 12 ${step} 0`;
        return <path key={r} d={d} fill="none" stroke="#7E3324" strokeWidth="4" opacity="0.75" />;
      })}
      {/* Rãnh ngói dọc */}
      {Array.from({ length: 13 }, (_, i) => {
        const u = -1 + (2 * i) / 12;
        return <line key={i} x1={(u * top) / 2} y1={-h + 6} x2={(u * w) / 2} y2={-4} stroke="#7E3324" strokeWidth="3" opacity="0.35" />;
      })}
      {/* Nắng chiếu nửa trái mái */}
      <path d={`M${-w / 2 + 20} -6 L${-top / 2 + 10} ${-h + 8} L${-top / 2 + 200} ${-h + 8} L${-w / 2 + 260} -6 Z`} fill="#FFE2A8" opacity="0.18" />
      {/* Bờ nóc và đầu đao cong */}
      <path
        d={`M${-top / 2 - 70} ${-h - 38} Q${-top / 2 - 30} ${-h - 6} ${-top / 2} ${-h - 10} L${top / 2} ${-h - 10} Q${top / 2 + 30} ${-h - 6} ${top / 2 + 70} ${-h - 38} Q${top / 2 + 40} ${-h + 16} ${top / 2} ${-h + 10} L${-top / 2} ${-h + 10} Q${-top / 2 - 40} ${-h + 16} ${-top / 2 - 70} ${-h - 38} Z`}
        fill="#7E3324"
        stroke={LINE}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path d={`M${-top / 2 + 30} ${-h - 2} L${top / 2 - 30} ${-h - 2}`} stroke="#C46A4E" strokeWidth="4" opacity="0.7" />
      {/* Đầu đao hai góc dưới */}
      <path d={`M${-w / 2 - 6} 2 Q${-w / 2 - 40} -10 ${-w / 2 - 50} -46`} fill="none" stroke={LINE} strokeWidth="14" strokeLinecap="round" />
      <path d={`M${-w / 2 - 6} 2 Q${-w / 2 - 40} -10 ${-w / 2 - 50} -46`} fill="none" stroke="#7E3324" strokeWidth="7" strokeLinecap="round" />
      <path d={`M${w / 2 + 6} 2 Q${w / 2 + 40} -10 ${w / 2 + 50} -46`} fill="none" stroke={LINE} strokeWidth="14" strokeLinecap="round" />
      <path d={`M${w / 2 + 6} 2 Q${w / 2 + 40} -10 ${w / 2 + 50} -46`} fill="none" stroke="#7E3324" strokeWidth="7" strokeLinecap="round" />
    </g>
  );
};

/** Cánh cửa bức bàn: khung gỗ, nửa trên song tiện, nửa dưới ván. */
const DoorPanel: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => {
  const bars = Math.max(2, Math.floor((w - 16) / 14));
  return (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="url(#w-wood)" stroke={LINE} strokeWidth="5" />
    <rect x={x + 8} y={y + 10} width={w - 16} height={h * 0.45} fill="#3A2416" opacity="0.85" />
    {Array.from({ length: bars }, (_, i) => (
      <line key={i} x1={x + 8 + ((i + 1) * (w - 16)) / (bars + 1)} y1={y + 10} x2={x + 8 + ((i + 1) * (w - 16)) / (bars + 1)} y2={y + 10 + h * 0.45} stroke="#B57A47" strokeWidth="4" />
    ))}
    <rect x={x + 10} y={y + h * 0.58} width={w - 20} height={h * 0.34} rx="3" fill="none" stroke="#6E4324" strokeWidth="4" />
  </g>
  );
};

/**
 * Nhà ngói ba gian nhìn chính diện, chân thềm ở (x, y). Cao ~575·s, rộng ~1000·s.
 * open: gian giữa mở cửa (trong nhà tối, ánh vàng); lit: đêm, đèn trong nhà sáng.
 */
export const VillageHouse: React.FC<{ x: number; y: number; s?: number; lit?: boolean }> = ({ x, y, s = 1, lit }) => {
  const posts = [-390, -130, 130, 390];
  const top = -330;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Tường hậu (tối, trong nhà) */}
      <rect x="-420" y={top} width="840" height={-top - 40} fill="#5A3A24" stroke={LINE} strokeWidth="7" />
      {/* Cửa bức bàn hai gian bên */}
      {[-390, 130].map((gx) =>
        [0, 1, 2, 3].map((i) => <DoorPanel key={`${gx}-${i}`} x={gx + 14 + i * 58} y={top + 40} w={58} h={-top - 82} />),
      )}
      {/* Gian giữa mở: trong nhà ấm, thấy bàn thờ mờ */}
      <rect x="-116" y={top + 40} width="232" height={-top - 82} fill={lit ? "#E9A94A" : "#3E2615"} />
      <rect x="-116" y={top + 40} width="232" height={-top - 82} fill="url(#w-glow)" opacity={lit ? 1 : 0.45} />
      <rect x="-70" y={top + 110} width="140" height="60" fill="#8A2C22" stroke={LINE} strokeWidth="4" opacity="0.8" />
      <rect x="-36" y={top + 70} width="72" height="34" fill="#D9A23A" stroke={LINE} strokeWidth="3" opacity="0.8" />
      <rect x="-90" y={top + 170} width="180" height="20" fill="#5E3A20" opacity="0.8" />
      {/* Hai cánh cửa mở ép sát cột */}
      <DoorPanel x={-116} y={top + 40} w={40} h={-top - 82} />
      <DoorPanel x={76} y={top + 40} w={40} h={-top - 82} />
      {/* Xà ngang và bóng hiên */}
      <rect x="-440" y={top} width="880" height="40" fill="url(#w-wood)" stroke={LINE} strokeWidth="7" />
      <rect x="-420" y={top + 40} width="840" height="26" fill="#2A170C" opacity="0.35" />
      {/* Cột gỗ trên chân tảng đá */}
      {posts.map((px) => (
        <g key={px}>
          <rect x={px - 16} y={top + 30} width="32" height={-top - 70} fill="url(#w-wood-h)" stroke={LINE} strokeWidth="7" />
          <rect x={px - 26} y={-56} width="52" height="18" rx="4" fill="#B9AD98" stroke={LINE} strokeWidth="5" />
        </g>
      ))}
      {/* Thềm gạch, bậc lên giữa */}
      <rect x="-460" y="-40" width="920" height="40" fill="#A9553C" stroke={LINE} strokeWidth="7" />
      <rect x="-460" y="-40" width="920" height="9" fill="#D98A68" opacity="0.6" />
      {Array.from({ length: 23 }, (_, i) => (
        <line key={i} x1={-460 + i * 40} y1={-31} x2={-460 + i * 40} y2={-2} stroke="#7E3324" strokeWidth="3" opacity="0.5" />
      ))}
      <rect x="-120" y="-14" width="240" height="22" fill="#B9AD98" stroke={LINE} strokeWidth="6" />
      {/* Mái */}
      <g transform={`translate(0 ${top + 6})`}>
        <TileRoof w={1010} top={760} h={230} />
      </g>
    </g>
  );
};

/** Chum sành có nắp gỗ, đáy ở (x, y). */
export const Jar: React.FC<{ x: number; y: number; s?: number; lid?: boolean }> = ({ x, y, s = 1, lid = true }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-4} rx={90} />
    <path d="M-44 -150 Q-96 -120 -88 -62 Q-80 -4 -40 0 L40 0 Q80 -4 88 -62 Q96 -120 44 -150 Z" fill="url(#w-clay)" stroke={LINE} strokeWidth="7" strokeLinejoin="round" />
    <path d="M-80 -96 Q0 -80 80 -96" fill="none" stroke="#5C341C" strokeWidth="4" opacity="0.6" />
    <path d="M-62 -118 Q-74 -80 -60 -40" fill="none" stroke="#F2C79A" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
    <rect x="-48" y="-162" width="96" height="18" rx="8" fill="#7A4421" stroke={LINE} strokeWidth="6" />
    {lid ? <ellipse cx="0" cy="-166" rx="58" ry="14" fill="url(#w-wood)" stroke={LINE} strokeWidth="6" /> : null}
  </g>
);

/** Chậu sứ men lam trồng cây quất / cây cảnh, đáy ở (x, y). */
export const PotPlant: React.FC<{ x: number; y: number; s?: number; kind?: "kumquat" | "palm" | "fern" }> = ({ x, y, s = 1, kind = "kumquat" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-4} rx={86} />
    {kind === "kumquat" ? (
      <>
        <path d="M-6 -110 Q-10 -170 4 -210" fill="none" stroke={LINE} strokeWidth="14" strokeLinecap="round" />
        <path d="M-6 -110 Q-10 -170 4 -210" fill="none" stroke="#7B4B28" strokeWidth="7" strokeLinecap="round" />
        <Canopy blobs={[[-40, -250, 56], [36, -262, 60], [0, -320, 60], [-6, -220, 50]]} sw={6} />
        {[[-50, -270], [20, -300], [44, -236], [-20, -228], [6, -340], [-56, -220]].map(([fx, fy], i) => (
          <circle key={i} cx={fx} cy={fy} r="11" fill="#F0A02C" stroke={LINE} strokeWidth="4" />
        ))}
      </>
    ) : kind === "palm" ? (
      <>
        {[-60, -35, -12, 12, 35, 60].map((a, i) => (
          <path
            key={a}
            transform={`rotate(${a} 0 -110)`}
            d={`M0 -110 Q-24 ${-200 - (i % 2) * 30} 0 ${-300 - (i % 2) * 40} Q24 ${-200 - (i % 2) * 30} 0 -110 Z`}
            fill={i % 2 ? PAL.leaf : PAL.leafDark}
            stroke={LINE}
            strokeWidth="5"
            strokeLinejoin="round"
          />
        ))}
      </>
    ) : (
      <>
        {[-70, -40, -12, 14, 42, 70].map((a, i) => (
          <path key={a} transform={`rotate(${a} 0 -110)`} d="M0 -110 Q-30 -170 0 -250 Q30 -170 0 -110 Z" fill={i % 2 ? PAL.leaf : PAL.leafDark} stroke={LINE} strokeWidth="5" />
        ))}
      </>
    )}
    <path d="M-62 -118 L62 -118 L52 -20 Q46 0 30 0 L-30 0 Q-46 0 -52 -20 Z" fill="url(#w-glaze)" stroke={LINE} strokeWidth="7" strokeLinejoin="round" />
    <rect x="-70" y="-128" width="140" height="20" rx="8" fill="#EDE6D6" stroke={LINE} strokeWidth="6" />
    <path d="M-46 -84 Q-24 -100 0 -84 Q24 -68 46 -84 M-40 -52 Q-20 -62 0 -52 Q20 -42 40 -52" fill="none" stroke={PAL.blueGlaze} strokeWidth="5" strokeLinecap="round" />
    <circle cx="0" cy="-68" r="7" fill="none" stroke={PAL.blueGlaze} strokeWidth="4" />
  </g>
);

/** Ghế đẩu gỗ thấp, đáy ở (x, y). */
export const Stool: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-2} rx={70} />
    <path d="M-40 -60 L-50 0 M40 -60 L50 0" stroke={LINE} strokeWidth="18" strokeLinecap="round" />
    <path d="M-40 -60 L-50 0 M40 -60 L50 0" stroke="#8A5530" strokeWidth="9" strokeLinecap="round" />
    <path d="M-46 -26 L46 -26" stroke={LINE} strokeWidth="12" strokeLinecap="round" />
    <path d="M-46 -26 L46 -26" stroke="#8A5530" strokeWidth="5" strokeLinecap="round" />
    <rect x="-62" y="-80" width="124" height="22" rx="8" fill="url(#w-wood)" stroke={LINE} strokeWidth="6" />
    <path d="M-50 -74 L40 -74" stroke="#E2B07A" strokeWidth="3" opacity="0.7" />
  </g>
);

/**
 * Sân gạch đỏ phối cảnh: hàng gạch thưa dần về phía trước, mạch dọc hội tụ về điểm tụ (540, horizon).
 * Vẽ từ yTop xuống đáy khung.
 */
export const BrickYard: React.FC<{ yTop: number; horizon?: number; night?: boolean }> = ({ yTop, horizon = 640, night }) => {
  const rows: [number, number][] = [];
  for (let y = yTop; y < 1920; ) {
    const h = 0.085 * (y - horizon);
    rows.push([y, Math.min(1920, y + h)]);
    y += h;
  }
  const k = 0.2;
  const base = night ? ["#5E3A3A", "#563535", "#664040"] : ["#B4644A", "#A85C44", "#BC6E52", "#AE6048"];
  const mortar = night ? "#3E2A2E" : "#C98A68";
  return (
    <g>
      <rect x="0" y={yTop} width="1080" height={1920 - yTop} fill={mortar} />
      {rows.map(([y0, y1], r) => {
        const off = r % 2 ? 0.5 : 0;
        const cells = [];
        for (let u = -14 + off; u < 14; u++) {
          const xa0 = 540 + u * k * (y0 - horizon);
          const xb0 = 540 + (u + 1) * k * (y0 - horizon);
          const xa1 = 540 + u * k * (y1 - horizon);
          const xb1 = 540 + (u + 1) * k * (y1 - horizon);
          if (Math.max(xb0, xb1) < 0 || Math.min(xa0, xa1) > 1080) continue;
          const g = 2 + 0.006 * (y0 - horizon);
          cells.push(
            <path
              key={u}
              d={`M${xa0 + g} ${y0 + g} L${xb0 - g} ${y0 + g} L${xb1 - g} ${y1 - g} L${xa1 + g} ${y1 - g} Z`}
              fill={base[Math.abs(Math.round(u * 7 + r * 3)) % base.length]}
            />,
          );
        }
        return <g key={r}>{cells}</g>;
      })}
      <defs>
        <linearGradient id="w-yard-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE6B0" stopOpacity="0.25" />
          <stop offset="0.3" stopColor="#3A2416" stopOpacity="0.05" />
          <stop offset="1" stopColor="#2A170C" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="0" y={yTop} width="1080" height={1920 - yTop} fill="url(#w-yard-shade)" />
    </g>
  );
};

/** Lá cây rủ từ góc trên (tiền cảnh đóng khung). side: -1 = góc trái, 1 = góc phải. */
export const HangingLeaves: React.FC<{ side: -1 | 1; y?: number; dark?: boolean }> = ({ side, y = 0, dark }) => (
  <g transform={`translate(${side < 0 ? 0 : 1080} ${y}) scale(${side < 0 ? 1 : -1} 1)`}>
    <path d="M-10 40 Q80 70 150 160 Q190 220 200 300" fill="none" stroke={LINE} strokeWidth="9" strokeLinecap="round" />
    <path d="M-10 40 Q80 70 150 160 Q190 220 200 300" fill="none" stroke="#6E4324" strokeWidth="4" strokeLinecap="round" />
    {[
      [30, 50, 30], [70, 70, 60], [110, 110, 20], [140, 150, 70], [165, 200, 30], [185, 250, 80], [198, 300, 50], [90, 90, 100], [125, 130, -10],
    ].map(([lx, ly, a], i) => (
      <path
        key={i}
        transform={`translate(${lx} ${ly}) rotate(${a})`}
        d="M0 0 Q26 -18 64 0 Q26 18 0 0 Z"
        fill={dark ? (i % 2 ? "#2E4A2C" : "#3A5A34") : i % 2 ? PAL.leaf : PAL.leafDark}
        stroke={LINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    ))}
  </g>
);

/** Trời chiều ấm: vàng kem, quầng nắng. */
export const WarmSky: React.FC<{ id: string; h: number; top?: string; bottom?: string; sun?: [number, number] }> = ({
  id,
  h,
  top = "#F3C98A",
  bottom = "#FCEFD2",
  sun = [200, 330],
}) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bottom} />
      </linearGradient>
      <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#FFF6D8" stopOpacity="1" />
        <stop offset="0.25" stopColor="#FFE7A8" stopOpacity="0.85" />
        <stop offset="1" stopColor="#FFD27A" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={h} fill={`url(#${id})`} />
    <circle cx={sun[0]} cy={sun[1]} r="300" fill={`url(#${id}-sun)`} />
    <circle cx={sun[0]} cy={sun[1]} r="58" fill="#FFF3CF" />
  </>
);

/** Mây dạng tranh: dải mây cuộn nhẹ. */
export const Cloud: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = "#FFF8EA" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity="0.9">
    <path
      d="M-120 20 Q-130 -10 -96 -14 Q-90 -48 -50 -40 Q-30 -70 10 -56 Q40 -76 70 -46 Q110 -50 112 -16 Q140 -10 130 20 Z"
      fill={color}
      stroke="#D9B98A"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path d="M-80 4 Q-40 -8 0 4 Q40 -8 80 4" fill="none" stroke="#E7CFA6" strokeWidth="4" strokeLinecap="round" />
  </g>
);

/** Tia nắng chiều xiên từ góc trên trái. */
export const SunRays: React.FC<{ opacity?: number; from?: [number, number] }> = ({ opacity = 0.16, from = [120, 200] }) => (
  <g opacity={opacity}>
    {[
      [-8, 90],
      [8, 70],
      [22, 110],
      [38, 80],
    ].map(([a, w], i) => (
      <path key={i} transform={`translate(${from[0]} ${from[1]}) rotate(${a - 30})`} d={`M0 0 L${w / 2} 1600 L${-w / 2} 1600 Z`} fill="#FFF0C2" />
    ))}
  </g>
);

// ---------------------------------------------------------------- khối thêm cho phông truyện (engine/stage/story)

/** Dải đồi lượn (trung / hậu cảnh): đỉnh lượn quanh y, lấp xuống tới `bottom`; gradient sáng (đỉnh) → tối (chân). `id` gradient phải riêng. */
export const Hills: React.FC<{
  id: string;
  y: number;
  amp?: number;
  waves?: number;
  phase?: number;
  bottom?: number;
  top?: string;
  base?: string;
  line?: string;
  sw?: number;
}> = ({ id, y, amp = 60, waves = 3, phase = 0, bottom = 1260, top = "#A9C77A", base = "#6E9446", line = LINE, sw = 6 }) => {
  const n = waves * 2;
  const step = 1160 / n;
  const yAt = (i: number) => y + Math.sin(phase + i * Math.PI) * amp * 0.5 - Math.abs(Math.cos(phase * 0.7 + i)) * amp * 0.5;
  let d = `M-40 ${yAt(0)}`;
  for (let i = 1; i <= n; i++) {
    const x0 = -40 + step * (i - 1);
    const y0 = yAt(i - 1);
    const y1 = yAt(i);
    d += ` C${x0 + step * 0.45} ${y0} ${x0 + step * 0.55} ${y1} ${x0 + step} ${y1}`;
  }
  d += ` L1120 ${bottom} L-40 ${bottom} Z`;
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={base} />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} stroke={line} strokeWidth={sw} strokeLinejoin="round" />
    </>
  );
};

/** Dãy núi xa (hậu cảnh): các đỉnh [x, đỉnh y, nửa rộng], chân ở `foot`; sườn phải tối, tuyết tuỳ chọn. */
export const FarMountains: React.FC<{
  peaks: [number, number, number][];
  foot: number;
  color?: string;
  shade?: string;
  line?: string;
  snow?: boolean;
  opacity?: number;
}> = ({ peaks, foot, color = "#C9B89A", shade = "#A8957A", line = "#8A7458", snow, opacity = 1 }) => (
  <g opacity={opacity}>
    {peaks.map(([x, py, hw], i) => {
      const h = foot - py;
      return (
        <g key={i}>
          <path
            d={`M${x - hw} ${foot} Q${x - hw * 0.45} ${py + h * 0.35} ${x - hw * 0.08} ${py + 6} Q${x} ${py - 6} ${x + hw * 0.08} ${py + 6} Q${x + hw * 0.5} ${py + h * 0.4} ${x + hw} ${foot} Z`}
            fill={color}
            stroke={line}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d={`M${x + hw * 0.06} ${py + 10} Q${x + hw * 0.2} ${py + h * 0.5} ${x + hw * 0.1} ${foot} L${x + hw} ${foot} Q${x + hw * 0.5} ${py + h * 0.4} ${x + hw * 0.08} ${py + 6} Z`} fill={shade} opacity="0.7" />
          {snow ? (
            <path
              d={`M${x - hw * 0.2} ${py + h * 0.2} Q${x - hw * 0.1} ${py + 4} ${x} ${py} Q${x + hw * 0.1} ${py + 4} ${x + hw * 0.22} ${py + h * 0.22} Q${x + hw * 0.08} ${py + h * 0.15} ${x} ${py + h * 0.24} Q${x - hw * 0.08} ${py + h * 0.14} ${x - hw * 0.2} ${py + h * 0.2} Z`}
              fill="#FBF3E2"
              stroke={line}
              strokeWidth="4"
              strokeLinejoin="round"
            />
          ) : null}
        </g>
      );
    })}
  </g>
);

/** Mặt nước (sông / hồ) từ y0 tới y1: gradient sâu dần, vệt sáng mép trên, gợn sóng kem. `id` gradient phải riêng. */
export const WaterBand: React.FC<{ id: string; y0: number; y1: number; top?: string; bottom?: string; ripples?: number }> = ({
  id,
  y0,
  y1,
  top = "#9CC3C0",
  bottom = "#5E8E96",
  ripples = 9,
}) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bottom} />
      </linearGradient>
    </defs>
    <path d={`M-20 ${y0} Q270 ${y0 - 12} 540 ${y0} Q810 ${y0 + 12} 1100 ${y0} L1100 ${y1} L-20 ${y1} Z`} fill={`url(#${id})`} stroke={LINE} strokeWidth="6" strokeLinejoin="round" />
    <path d={`M-20 ${y0 + 10} Q270 ${y0 - 2} 540 ${y0 + 10} Q810 ${y0 + 22} 1100 ${y0 + 10}`} fill="none" stroke="#FFF3D6" strokeWidth="6" opacity="0.5" />
    {Array.from({ length: ripples }, (_, i) => {
      const yy = y0 + (y1 - y0) * (0.2 + 0.7 * ((i * 0.37) % 1));
      const xx = 40 + ((i * 397) % 960);
      const w = 50 + ((i * 53) % 50);
      return <path key={i} d={`M${xx} ${yy} q${w / 4} -9 ${w / 2} 0 t${w / 2} 0`} fill="none" stroke="#F4ECD6" strokeWidth="5" strokeLinecap="round" opacity="0.75" />;
    })}
  </>
);

/** Khóm cỏ nhỏ (tiền cảnh), gốc ở (x, y). */
export const GrassTuft: React.FC<{ x: number; y: number; s?: number; color?: string; flip?: boolean }> = ({ x, y, s = 1, color = PAL.leaf, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M-40 0 Q-46 -40 -60 -64 Q-30 -44 -18 -6 Q-16 -60 -4 -96 Q6 -50 6 -6 Q20 -50 44 -76 Q32 -34 30 0 Z" fill={color} stroke={LINE} strokeWidth="5" strokeLinejoin="round" />
    <path d="M-4 -80 Q0 -46 2 -10" fill="none" stroke={PAL.leafLight} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
  </g>
);

/** Khóm lau sậy / cỏ nến bên bờ nước, gốc ở (x, y), cao ~360·s. */
export const Reeds: React.FC<{ x: number; y: number; s?: number; flip?: boolean; heads?: boolean }> = ({ x, y, s = 1, flip, heads = true }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {[
      [-30, -260, -14],
      [-6, -330, 6],
      [20, -290, 18],
      [40, -220, 30],
    ].map(([dx, h, lean], i) => (
      <g key={i}>
        <path d={`M${dx} 0 Q${dx + lean * 0.3} ${h / 2} ${dx + lean} ${h}`} fill="none" stroke={LINE} strokeWidth="11" strokeLinecap="round" />
        <path d={`M${dx} 0 Q${dx + lean * 0.3} ${h / 2} ${dx + lean} ${h}`} fill="none" stroke="#8FAE5A" strokeWidth="5" strokeLinecap="round" />
        {heads ? <ellipse cx={dx + lean} cy={h + 30} rx="11" ry="32" fill="#8A5A2E" stroke={LINE} strokeWidth="4" transform={`rotate(${lean * 0.6} ${dx + lean} ${h + 30})`} /> : null}
      </g>
    ))}
    {[-50, 30].map((dx, i) => (
      <path key={dx} d={`M${dx} 0 Q${dx + (i ? 40 : -30)} -90 ${dx + (i ? 70 : -60)} -150 Q${dx + (i ? 20 : -10)} -80 ${dx + 14} 0 Z`} fill={PAL.leafDark} stroke={LINE} strokeWidth="4" strokeLinejoin="round" />
    ))}
  </g>
);

/** Nhà tranh vách đất nhìn chính diện, chân ở (x, y): rộng ~460·s, cao ~400·s. lit: cửa có ánh đèn. */
export const ThatchHut: React.FC<{ x: number; y: number; s?: number; flip?: boolean; lit?: boolean }> = ({ x, y, s = 1, flip, lit }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <SoftShadow cy={-4} rx={250} ry={26} />
    <rect x="-170" y="-210" width="340" height="210" fill="#D9B98A" stroke={LINE} strokeWidth="7" />
    <rect x="-170" y="-210" width="340" height="40" fill="#5E3A20" opacity="0.25" />
    {[
      [-130, -130],
      [60, -80],
      [110, -60],
      [-100, -50],
    ].map(([cx, cy], i) => (
      <path key={i} d={`M${cx} ${cy} q20 -8 40 0`} fill="none" stroke="#A9855A" strokeWidth="4" strokeLinecap="round" />
    ))}
    <rect x="-46" y="-150" width="92" height="150" fill={lit ? "#E9A94A" : "#4A2E18"} stroke={LINE} strokeWidth="6" />
    {lit ? <rect x="-46" y="-150" width="92" height="150" fill="url(#w-glow)" /> : null}
    <rect x="80" y="-150" width="60" height="56" fill="#4A2E18" stroke={LINE} strokeWidth="5" />
    {[92, 110, 128].map((wx) => (
      <line key={wx} x1={wx} y1="-148" x2={wx} y2="-96" stroke="#C9A24E" strokeWidth="5" />
    ))}
    <path d="M-230 -190 Q-120 -330 -10 -400 Q0 -406 10 -400 Q120 -330 230 -190 Q236 -168 210 -170 Q0 -150 -210 -170 Q-236 -168 -230 -190 Z" fill="#D9A84E" stroke={LINE} strokeWidth="8" strokeLinejoin="round" />
    <path d="M-220 -186 Q0 -160 220 -186 L210 -170 Q0 -150 -210 -170 Z" fill="#A9762E" opacity="0.8" />
    {Array.from({ length: 11 }, (_, i) => {
      const u = -1 + (2 * i) / 10;
      return <path key={i} d={`M${u * 20} -392 Q${u * 120} -280 ${u * 210} -178`} fill="none" stroke="#A9762E" strokeWidth="4" opacity="0.8" />;
    })}
    <path d="M-150 -260 Q-90 -330 -30 -370" fill="none" stroke="#F4D27A" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
    <path d="M-40 -398 L40 -398" stroke={LINE} strokeWidth="12" strokeLinecap="round" />
    <path d="M-40 -398 L40 -398" stroke="#8A5A2E" strokeWidth="6" strokeLinecap="round" />
  </g>
);

/** Rào tre thấp chạy ngang từ x0 tới x1, chân ở y. */
export const BambooFence: React.FC<{ x0: number; x1: number; y: number; h?: number }> = ({ x0, x1, y, h = 110 }) => {
  const n = Math.max(2, Math.round((x1 - x0) / 34));
  return (
    <g>
      {Array.from({ length: n + 1 }, (_, i) => {
        const x = x0 + ((x1 - x0) * i) / n;
        const hh = h - (i % 2) * 14;
        return <rect key={i} x={x - 8} y={y - hh} width="16" height={hh} rx="6" fill="#C9A24E" stroke={LINE} strokeWidth="4" />;
      })}
      {[0.35, 0.72].map((t) => (
        <rect key={t} x={x0 - 14} y={y - h * t - 6} width={x1 - x0 + 28} height="12" rx="6" fill="#A9853A" stroke={LINE} strokeWidth="4" />
      ))}
    </g>
  );
};

/** Tia nắng chỉ trong phần trời / cảnh nền (cắt ở mặt sàn y = floor) để không vẽ sọc lên sàn diễn. */
export const SkyRays: React.FC<{ opacity?: number; from?: [number, number]; floor?: number }> = ({ floor = 1240, ...rest }) => (
  <>
    <defs>
      <clipPath id={`w-skyrays-${floor}`}>
        <rect x="0" y="0" width="1080" height={floor} />
      </clipPath>
    </defs>
    <g clipPath={`url(#w-skyrays-${floor})`}>
      <SunRays {...rest} />
    </g>
  </>
);
