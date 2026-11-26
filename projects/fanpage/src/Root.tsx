/**
 * Ảnh cho trang Facebook "Năng nhặt chặt bị", phong cách phẳng, trừu tượng (khối hình học, không viền).
 * - Ảnh đại diện 1080×1080: hình chính nằm trong vòng tròn.
 * - Ảnh bìa 1640×624: ảnh đại diện trên điện thoại nằm GIỮA, đè lên phần dưới giữa ảnh bìa, nên vùng
 *   x 560..1080, y 360..624 để trống; chữ đặt ở nửa trên, trong dải giữa x 265..1375 (điện thoại cắt hai bên).
 * Xuất: npx remotion still projects/fanpage/src/index.ts <id> out/fanpage/<tên>.png
 */
import React from "react";
import { Still } from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";

const { fontFamily } = loadFont("normal", { weights: ["600", "800", "900"], subsets: ["vietnamese", "latin"] });

const C = {
  night: "#1E2A44",
  nightSoft: "#2C3B5C",
  cream: "#F7EBD3",
  creamLight: "#FFF7E8",
  amber: "#E9A23B",
  amberDark: "#C77E22",
  coral: "#E86A50",
  teal: "#2FA5A0",
  sky: "#7FB8E6",
  ink: "#26314A",
};

/** Cái bị cách điệu: khối tròn đáy rộng, cổ thắt, nút buộc. Tâm đáy (x, y), cao ~ 300·s. */
const Sack: React.FC<{ x: number; y: number; s?: number; body?: string; dark?: string }> = ({ x, y, s = 1, body = C.amber, dark = C.amberDark }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-70 -230 C-190 -170 -200 -10 -120 0 L120 0 C200 -10 190 -170 70 -230 Z" fill={body} />
    <path d="M-70 -230 C-150 -180 -160 -60 -100 -8 L-60 -8 C-110 -70 -100 -180 -40 -228 Z" fill={dark} opacity={0.35} />
    <path d="M-84 -232 L84 -232 L66 -262 L-66 -262 Z" fill={dark} />
    <circle cx={0} cy={-248} r={20} fill={dark} />
    <path d="M10 -244 Q60 -230 70 -190" fill="none" stroke={dark} strokeWidth={14} strokeLinecap="round" />
  </g>
);

/** Hạt kiến thức: vài dạng hình học phẳng. */
const Grain: React.FC<{ x: number; y: number; r: number; kind: "dot" | "square" | "tri" | "ring" | "half"; c: string; rot?: number }> = ({ x, y, r, kind, c, rot = 0 }) => {
  const t = `rotate(${rot} ${x} ${y})`;
  if (kind === "square") return <rect x={x - r} y={y - r} width={2 * r} height={2 * r} rx={r * 0.35} fill={c} transform={t} />;
  if (kind === "tri") return <path d={`M${x} ${y - r * 1.1} L${x + r} ${y + r * 0.7} L${x - r} ${y + r * 0.7} Z`} fill={c} transform={t} strokeLinejoin="round" stroke={c} strokeWidth={r * 0.2} />;
  if (kind === "ring") return <circle cx={x} cy={y} r={r * 0.8} fill="none" stroke={c} strokeWidth={r * 0.45} />;
  if (kind === "half") return <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y} Z`} fill={c} transform={t} />;
  return <circle cx={x} cy={y} r={r} fill={c} />;
};

/** Vệt rơi chấm chấm. */
const Trail: React.FC<{ d: string; c: string; w?: number }> = ({ d, c, w = 8 }) => <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeDasharray={`0.1 ${w * 2.6}`} opacity={0.7} />;

// ---------------------------------------------------------------- ảnh đại diện 1080×1080
export const Avatar: React.FC = () => (
  <svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{ fontFamily }}>
    <rect width={1080} height={1080} fill={C.night} />
    <circle cx={540} cy={540} r={430} fill={C.nightSoft} />
    <circle cx={540} cy={560} r={300} fill={C.night} opacity={0.5} />
    {/* hạt kiến thức rơi vào bị */}
    <Trail d="M300 250 Q380 330 470 470" c={C.creamLight} />
    <Trail d="M780 240 Q700 330 610 470" c={C.creamLight} />
    <Grain x={290} y={235} r={46} kind="dot" c={C.coral} />
    <Grain x={540} y={200} r={52} kind="tri" c={C.creamLight} />
    <Grain x={790} y={230} r={42} kind="square" c={C.teal} rot={18} />
    <Grain x={420} y={360} r={26} kind="ring" c={C.sky} />
    <Grain x={668} y={352} r={30} kind="half" c={C.amber} rot={-20} />
    <Grain x={540} y={330} r={18} kind="dot" c={C.amber} />
    <Sack x={540} y={860} s={1.32} />
    {/* ba hạt đã nằm trong bị, nhô lên ở miệng */}
    <Grain x={505} y={500} r={22} kind="dot" c={C.coral} />
    <Grain x={560} y={492} r={20} kind="square" c={C.teal} rot={12} />
  </svg>
);

// ---------------------------------------------------------------- ảnh bìa 1640×624
/** Bậc thang hạt: cột i có i+1 hạt, mỗi ngày thêm một. */
const Steps: React.FC<{ x: number; y: number; gap?: number; r?: number }> = ({ x, y, gap = 46, r = 15 }) => {
  const cols = [C.sky, C.teal, C.amber, C.coral, C.sky, C.teal, C.amber];
  return (
    <g>
      {cols.map((c, i) =>
        Array.from({ length: i + 1 }, (_, j) => <circle key={`${i}-${j}`} cx={x + i * gap} cy={y - j * gap} r={r} fill={j === i ? C.coral : c} opacity={j === i ? 1 : 0.85} />),
      )}
    </g>
  );
};

export const CoverFb: React.FC = () => (
  <svg width={1640} height={624} viewBox="0 0 1640 624" style={{ fontFamily }}>
    <rect width={1640} height={624} fill={C.night} />
    {/* khối nền lớn mềm */}
    <circle cx={180} cy={560} r={300} fill={C.nightSoft} />
    <circle cx={1500} cy={60} r={260} fill={C.nightSoft} />
    <circle cx={820} cy={760} r={330} fill={C.nightSoft} opacity={0.6} />
    {/* hạt rải rác phần trên */}
    <Grain x={330} y={92} r={14} kind="dot" c={C.amber} />
    <Grain x={1300} y={96} r={16} kind="square" c={C.teal} rot={20} />
    <Grain x={250} y={300} r={12} kind="ring" c={C.sky} />
    <Grain x={1400} y={300} r={13} kind="tri" c={C.coral} />
    {/* chữ chính: nửa trên, giữa */}
    <text x={820} y={196} textAnchor="middle" fontSize={108} fontWeight={900} fill={C.creamLight} letterSpacing={-1}>
      Năng nhặt <tspan fill={C.amber}>chặt bị</tspan>
    </text>
    <text x={820} y={276} textAnchor="middle" fontSize={40} fontWeight={600} fill={C.sky}>
      Mỗi ngày học thêm một kiến thức mới
    </text>
    <rect x={770} y={306} width={100} height={8} rx={4} fill={C.coral} />
    {/* trái: bậc thang hạt, mỗi ngày thêm một */}
    <Steps x={300} y={585} gap={38} r={13} />
    {/* phải: hạt rơi vào bị */}
    <Trail d="M1150 360 Q1190 420 1222 470" c={C.creamLight} w={7} />
    <Trail d="M1330 350 Q1290 420 1262 470" c={C.creamLight} w={7} />
    <Grain x={1142} y={346} r={22} kind="dot" c={C.coral} />
    <Grain x={1338} y={338} r={20} kind="square" c={C.teal} rot={16} />
    <Grain x={1242} y={378} r={16} kind="half" c={C.amber} rot={-15} />
    <Sack x={1242} y={600} s={0.52} />
  </svg>
);

export const Root: React.FC = () => (
  <>
    <Still id="Fanpage-AnhDaiDien" component={Avatar} width={1080} height={1080} />
    <Still id="Fanpage-AnhBia" component={CoverFb} width={1640} height={624} />
  </>
);
