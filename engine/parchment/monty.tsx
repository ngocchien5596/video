/**
 * Tập 1 "Ngàn tiến sĩ nói cô ấy sai" (bài toán Monty Hall): cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc
 * (`li`, `lf`) đúng như trường `shot` trong projects/kien-thuc/src/episodes/tuan-1.ts.
 * Toạ độ gốc của sân khấu: rộng x 60..910, cao y 125..780 (mặt đất y = 780).
 */
import React from "react";
import { interpolate } from "remotion";
import { DrawLine, DrawPath, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Card, Chalkboard, Check, Cross, GROUND, linePose, poseAt, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { type Pose, Stickman } from "./Stickman.tsx";

const DOOR_X = [85, 255, 425];
const DOOR_Y = 490;
const DOOR_W = 150;
const DOOR_H = 290;
const MILO_X = 805;
const HOST_X = 626;
const CHALK = "#F4F1E6";
const CHALK_Y = "#FFE27A";
const CHALK_G = "#9BE8A8";
const CHALK_R = "#FF9A8A";

// ---------------------------------------------------------------- đạo cụ

/** Chiếc ô tô đỏ nhìn ngang (gốc: giữa đáy bánh xe). */
const Car: React.FC<{ x: number; y: number; s?: number; ghost?: boolean }> = ({ x, y, s = 1, ghost }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M -74 -20 Q -76 -44 -52 -46 L -34 -46 L -16 -72 L 30 -72 L 50 -46 L 68 -44 Q 80 -40 77 -20 Z"
      fill={ghost ? INK.line : "#D63A2F"}
      stroke={INK.line}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    {ghost ? null : (
      <>
        <path d="M -10 -66 L 26 -66 L 40 -47 L -10 -47 Z" fill="#BFE3F2" stroke={INK.line} strokeWidth={3} />
        <path d="M -16 -66 L -28 -47 L -16 -47 Z" fill="#BFE3F2" stroke={INK.line} strokeWidth={3} />
        <circle cx={71} cy={-33} r={6} fill="#FFE27A" stroke={INK.line} strokeWidth={2} />
        <line x1={-60} y1={-34} x2={60} y2={-34} stroke="#A82A22" strokeWidth={3} />
      </>
    )}
    {[-44, 46].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-18} r={18} fill="#2B2B2B" stroke={INK.line} strokeWidth={3} />
        {ghost ? null : <circle cx={wx} cy={-18} r={7} fill="#CFCFCF" />}
      </g>
    ))}
  </g>
);

/** Con dê nhìn ngang, quay mặt sang trái; `bleat` 0..1 há miệng kêu. */
const Goat: React.FC<{ x: number; y: number; s?: number; bleat?: number; frame: number; ghost?: boolean }> = ({ x, y, s = 1, bleat = 0, frame, ghost }) => {
  const fill = ghost ? INK.line : "#F4F1EA";
  const nod = bleat * wave(frame, 0.5, 6) + wave(frame, 0.08, 2);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-22, -8, 22, 36].map((lx) => (
        <g key={lx}>
          <rect x={lx} y={-36} width={9} height={34} rx={3} fill={ghost ? INK.line : "#E2DED2"} stroke={INK.line} strokeWidth={2.5} />
          <rect x={lx} y={-6} width={9} height={7} fill="#4A3B2A" />
        </g>
      ))}
      <ellipse cx={10} cy={-52} rx={44} ry={26} fill={fill} stroke={INK.line} strokeWidth={3.5} />
      <path d="M 52 -62 Q 64 -74 58 -56" fill={fill} stroke={INK.line} strokeWidth={3} />
      <g transform={`rotate(${nod} -24 -62)`}>
        <path d="M -24 -66 L -36 -92 L -18 -96 L -6 -64 Z" fill={fill} stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
        <path d="M -34 -104 Q -26 -128 -6 -120" fill="none" stroke="#8D6E4A" strokeWidth={7} strokeLinecap="round" />
        <ellipse cx={-42} cy={-96} rx={22} ry={15} transform="rotate(-18 -42 -96)" fill={fill} stroke={INK.line} strokeWidth={3.5} />
        <ellipse cx={-22} cy={-102} rx={12} ry={6} transform="rotate(25 -22 -102)" fill={ghost ? INK.line : "#D9D3C4"} stroke={INK.line} strokeWidth={2.5} />
        {ghost ? null : (
          <>
            <circle cx={-44} cy={-101} r={3.5} fill={INK.line} />
            <path d="M -56 -84 L -52 -66 L -46 -82 Z" fill="#CFC8B6" stroke={INK.line} strokeWidth={2} />
            {bleat > 0.05 ? <ellipse cx={-60} cy={-90} rx={5} ry={6 * bleat} fill="#7A2E2A" /> : <line x1={-63} y1={-90} x2={-55} y2={-89} stroke={INK.line} strokeWidth={2.5} />}
          </>
        )}
      </g>
    </g>
  );
};

/** Cánh cửa gỗ lớn của trường quay: số cửa, mở cánh theo `open`, sau cửa là xe hoặc dê; `peek` = thoáng thấy bóng sau cửa. */
const Door: React.FC<{
  i: number;
  open?: number;
  glow?: number;
  behind?: "car" | "goat";
  peek?: number;
  tint?: string;
  tintP?: number;
  bleat?: number;
  frame: number;
}> = ({ i, open = 0, glow = 0, behind, peek = 0, tint, tintP = 0, bleat = 0, frame }) => {
  const x = DOOR_X[i];
  const y = DOOR_Y;
  const w = DOOR_W;
  const h = DOOR_H;
  const k = Math.cos(Math.min(1, open) * 1.3);
  const pulse = 0.65 + 0.35 * Math.sin(frame * 0.2);
  const inside =
    behind === "car" ? <Car x={x + w / 2} y={y + h - 8} s={0.88} /> : behind === "goat" ? <Goat x={x + w / 2 + 6} y={y + h - 6} s={1} bleat={bleat} frame={frame} /> : null;
  return (
    <g>
      {glow > 0.01 ? (
        <rect x={x - 16} y={y - 16} width={w + 32} height={h + 16} rx={14} fill="none" stroke="#FFC93C" strokeWidth={34} opacity={Math.min(1, glow * pulse * 1.3)} filter="url(#soft-glow)" />
      ) : null}
      <rect x={x - 10} y={y - 12} width={w + 20} height={h + 12} rx={6} fill={INK.woodDark} stroke={INK.line} strokeWidth={4} />
      <rect x={x} y={y} width={w} height={h} fill="#2E1D12" />
      {open > 0.02 ? (
        <>
          <ellipse cx={x + w / 2} cy={y + h - 6} rx={w * 0.45} ry={14} fill="rgba(255,226,140,0.35)" />
          <g opacity={Math.min(1, open * 2)}>{inside}</g>
        </>
      ) : null}
      {/* Cánh cửa xoay quanh bản lề trái */}
      <g transform={`translate(${x} 0) scale(${Math.max(0.02, k)} 1) translate(${-x} 0)`}>
        <rect x={x} y={y} width={w} height={h} fill="#C4843F" stroke={INK.line} strokeWidth={4} />
        <rect x={x + 18} y={y + 110} width={w - 36} height={70} rx={4} fill="none" stroke="#8A5527" strokeWidth={4} />
        <rect x={x + 18} y={y + 196} width={w - 36} height={76} rx={4} fill="none" stroke="#8A5527" strokeWidth={4} />
        <circle cx={x + w / 2} cy={y + 56} r={38} fill="#FFE08A" stroke={INK.line} strokeWidth={4} />
        <text x={x + w / 2} y={y + 74} textAnchor="middle" fill={INK.line} fontSize={52} {...T}>
          {i + 1}
        </text>
        <circle cx={x + w - 20} cy={y + 186} r={9} fill="#E0AD46" stroke={INK.line} strokeWidth={3} />
        {open > 0.02 ? <rect x={x} y={y} width={w} height={h} fill={`rgba(0,0,0,${open * 0.35})`} /> : null}
        {peek > 0.01 && behind ? (
          <g opacity={peek * 0.55}>
            {behind === "car" ? <Car x={x + w / 2} y={y + h - 14} s={0.88} ghost /> : <Goat x={x + w / 2 + 6} y={y + h - 10} frame={frame} ghost />}
          </g>
        ) : null}
        {tint && tintP > 0.01 ? <rect x={x} y={y} width={w} height={h} fill={tint} opacity={tintP * 0.45} /> : null}
        {glow > 0.01 ? <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="rgba(255,226,122,0.25)" stroke="#FFC93C" strokeWidth={8} opacity={glow * pulse} /> : null}
      </g>
      {tint && tintP > 0.01 && open > 0.5 ? <rect x={x} y={y} width={w} height={h} fill={tint} opacity={tintP * 0.35} /> : null}
    </g>
  );
};

/** Người dẫn chương trình: bóng đen đeo nơ đỏ. `arm`: giơ thẻ / chìa tay mời / đẩy. `fall`: trượt ngã (0 → 1). */
const Host: React.FC<{ x: number; y?: number; frame: number; sign?: [string, string] | null; signP?: number; invite?: number; fall?: number; p?: number }> = ({
  x,
  y = GROUND,
  frame,
  sign,
  signP = 1,
  invite = 0,
  fall = 0,
  p = 1,
}) => {
  const C = "#2A221E";
  const bob = wave(frame, 0.1, 2);
  const holding = !!sign && signP > 0.01 && fall < 0.3;
  const armR = holding ? { x: 44, y: -330 } : { x: interpolate(invite, [0, 1], [30, 104]), y: interpolate(invite, [0, 1], [-140, -205]) };
  const armL = holding ? { x: -44, y: -330 } : { x: -32, y: -140 };
  return (
    <Pop p={p} cx={x} cy={y - 150}>
      <g transform={`translate(${x - fall * 50} ${y}) rotate(${-fall * 78})`}>
        <ellipse cx={0} cy={4} rx={46} ry={9} fill="rgba(40,24,10,0.3)" />
        <rect x={-24} y={-128} width={20} height={124} rx={6} fill={C} />
        <rect x={4} y={-128} width={20} height={124} rx={6} fill={C} />
        <ellipse cx={-18} cy={-4} rx={18} ry={8} fill="#111" />
        <ellipse cx={18} cy={-4} rx={18} ry={8} fill="#111" />
        <g transform={`translate(0 ${bob})`}>
          <line x1={-34} y1={-226} x2={armL.x} y2={armL.y} stroke={C} strokeWidth={20} strokeLinecap="round" />
          <path d="M -40 -232 Q 0 -246 40 -232 L 34 -116 L -34 -116 Z" fill={C} />
          <path d="M -14 -236 L 0 -180 L 14 -236 Z" fill="#F4F1EA" />
          <path d="M 0 -226 L -16 -236 L -16 -216 Z M 0 -226 L 16 -236 L 16 -216 Z" fill="#D32F2F" stroke="#7A1010" strokeWidth={2} />
          <rect x={-10} y={-258} width={20} height={20} fill={C} />
          <circle cx={0} cy={-284} r={34} fill={C} />
          <path d="M -34 -292 Q -30 -326 6 -322 Q 34 -318 34 -290 Q 14 -306 -34 -292 Z" fill="#111" />
          <circle cx={-12} cy={-284} r={5} fill="#FFFFFF" />
          <circle cx={12} cy={-284} r={5} fill="#FFFFFF" />
          <path d="M -12 -266 Q 0 -258 12 -266" fill="none" stroke="#FFFFFF" strokeWidth={3.5} strokeLinecap="round" />
          <line x1={34} y1={-226} x2={armR.x} y2={armR.y} stroke={C} strokeWidth={20} strokeLinecap="round" />
          <circle cx={armR.x} cy={armR.y} r={11} fill="#F4F1EA" stroke={C} strokeWidth={3} />
          {holding ? <circle cx={armL.x} cy={armL.y} r={11} fill="#F4F1EA" stroke={C} strokeWidth={3} /> : null}
          {holding ? (
            <Pop p={signP} cx={0} cy={-380}>
              <rect x={-112} y={-436} width={224} height={106} rx={12} fill="#FFF6DD" stroke={INK.line} strokeWidth={4} />
              <text x={0} y={-394} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                {sign?.[0]}
              </text>
              <text x={0} y={-350} textAnchor="middle" fill={INK.red} fontSize={34} {...T}>
                {sign?.[1]}
              </text>
            </Pop>
          ) : null}
        </g>
      </g>
    </Pop>
  );
};

/** Phong bì thư. */
const Envelope: React.FC<{ x: number; y: number; r?: number; s?: number }> = ({ x, y, r = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-34} y={-22} width={68} height={44} rx={3} fill="#FBF6EA" stroke={INK.line} strokeWidth={3} />
    <path d="M -34 -22 L 0 6 L 34 -22" fill="none" stroke={INK.line} strokeWidth={3} />
    <rect x={18} y={-18} width={11} height={13} fill={INK.red} />
  </g>
);

/** Con dấu cao su đỏ đóng mạnh xuống (phóng to rồi thu về). */
const Stamp: React.FC<{ x: number; y: number; text: string; p: number; rot?: number; size?: number; color?: string }> = ({ x, y, text, p, rot = -8, size = 40, color = INK.red }) => {
  if (p <= 0.01) return null;
  const w = text.length * size * 0.66 + 40;
  const s = 1 + (1 - Math.min(1, p)) * 0.8;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={Math.min(1, p * 1.4)}>
      <rect x={-w / 2} y={-size * 0.95} width={w} height={size * 1.6} rx={10} fill="rgba(255,246,221,0.92)" stroke={color} strokeWidth={6} />
      <rect x={-w / 2 + 8} y={-size * 0.95 + 8} width={w - 16} height={size * 1.6 - 16} rx={6} fill="none" stroke={color} strokeWidth={2.5} />
      <text x={0} y={size * 0.32} textAnchor="middle" fill={color} fontSize={size} {...T}>
        {text}
      </text>
    </g>
  );
};

/** Mũi tên cong vẽ dần từ (x1, y1) tới (x2, y2), vồng lên `arc` px. */
const ArcArrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; arc?: number; p: number; color: string; w?: number }> = ({ x1, y1, x2, y2, arc = 40, p, color, w = 5 }) => {
  if (p <= 0.01) return null;
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - arc;
  const len = Math.hypot(x2 - x1, y2 - y1) + arc * 1.6;
  const ang = Math.atan2(y2 - my, x2 - mx);
  return (
    <g>
      <DrawPath p={p} length={len} d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />
      {p > 0.95 ? (
        <path
          d={`M ${x2} ${y2} L ${x2 - 16 * Math.cos(ang - 0.5)} ${y2 - 16 * Math.sin(ang - 0.5)} M ${x2} ${y2} L ${x2 - 16 * Math.cos(ang + 0.5)} ${y2 - 16 * Math.sin(ang + 0.5)}`}
          stroke={color}
          strokeWidth={w}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
};

/** Mũi tên chỉ xuống nhún nhảy (về phía ô bình luận). */
const DownArrow: React.FC<{ x: number; y: number; p: number; frame: number; color?: string }> = ({ x, y, p, frame, color = INK.red }) => (
  <Pop p={p} cx={x} cy={y}>
    <g transform={`translate(${x} ${y + Math.abs(Math.sin(frame * 0.18)) * 14})`}>
      <path d="M -14 -40 L 14 -40 L 14 0 L 30 0 L 0 34 L -30 0 L -14 0 Z" fill={color} stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
    </g>
  </Pop>
);

/** Trường quay truyền hình thập niên 1990: rèm đỏ hai bên, diềm trên, vòm đèn bóng nhấp nháy sau ba cánh cửa, đèn rọi quét. */
const Studio: React.FC<{ frame: number; lights?: number }> = ({ frame, lights = 1 }) => {
  const bulbs = 17;
  return (
    <g>
      <path d="M 60 92 L 910 92 L 910 780 L 60 780 Z" fill="rgba(155,60,45,0.08)" />
      {/* Đèn rọi quét chậm */}
      {[0, 1].map((i) => {
        const sx = i === 0 ? 140 : 830;
        const tx = 335 + wave(frame, 0.03, 140, i * 2.4);
        return <path key={i} d={`M ${sx - 18} 92 L ${sx + 18} 92 L ${tx + 120} 780 L ${tx - 120} 780 Z`} fill="rgba(255,236,170,0.22)" />;
      })}
      {/* Vòm đèn bóng */}
      <path d="M 70 780 L 70 520 A 265 160 0 0 1 600 520 L 600 780" fill="rgba(120,45,35,0.12)" stroke="#8C3B2E" strokeWidth={10} />
      {Array.from({ length: bulbs }, (_, i) => {
        const a = Math.PI - (i / (bulbs - 1)) * Math.PI;
        const bx = 335 + Math.cos(a) * 265;
        const by = 520 - Math.sin(a) * 160;
        const on = (Math.floor(frame / 6) + i) % 2 === 0;
        return <circle key={i} cx={bx} cy={by} r={9} fill={on && lights > 0.5 ? "#FFE27A" : "#C9A45C"} stroke={INK.line} strokeWidth={2} />;
      })}
      {/* Rèm hai bên và diềm trên */}
      {[
        [60, 1],
        [910, -1],
      ].map(([cx, d]) => (
        <g key={cx}>
          <path d={`M ${cx} 92 L ${cx + d * 58} 92 Q ${cx + d * 40} 400 ${cx + d * 52} 780 L ${cx} 780 Z`} fill="#B23A30" stroke={INK.line} strokeWidth={3} />
          {[16, 32, 46].map((o) => (
            <path key={o} d={`M ${cx + d * o} 97 Q ${cx + d * (o - 8)} 420 ${cx + d * o} 778`} fill="none" stroke="#7E2620" strokeWidth={3} />
          ))}
        </g>
      ))}
      <path
        d={`M 60 92 L 910 92 L 910 136 ${Array.from({ length: 10 }, (_, i) => `Q ${910 - i * 85 - 42} 170 ${910 - (i + 1) * 85} 136`).join(" ")} Z`}
        fill="#B23A30"
        stroke={INK.line}
        strokeWidth={3}
      />
    </g>
  );
};

/** Trang tạp chí PARADE 1990, cột "Ask Marilyn" (gạch chân dòng NÊN ĐỔI CỬA theo `underline`). */
const Magazine: React.FC<{ x: number; y: number; s: number; r: number; underline: number }> = ({ x, y, s, r, underline }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-122} y={-158} width={244} height={316} rx={6} fill="rgba(0,0,0,0.2)" transform="translate(8 10)" />
    <rect x={-122} y={-158} width={244} height={316} rx={6} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
    <rect x={-122} y={-158} width={244} height={70} fill="#D63A2F" stroke={INK.line} strokeWidth={4} />
    <text x={0} y={-108} textAnchor="middle" fill="#FFFFFF" fontSize={46} {...T} letterSpacing={3}>
      PARADE
    </text>
    <text x={88} y={-70} textAnchor="middle" fill={INK.line} fontSize={22} {...T}>
      1990
    </text>
    <text x={-102} y={-40} fill={INK.blue} fontSize={26} {...T}>
      Ask Marilyn
    </text>
    {[0, 1, 2].map((i) => (
      <line key={i} x1={-102} y1={-14 + i * 18} x2={102 - (i === 2 ? 50 : 0)} y2={-14 + i * 18} stroke={INK.soft} strokeWidth={5} />
    ))}
    <text x={0} y={72} textAnchor="middle" fill={INK.line} fontSize={32} {...T}>
      NÊN ĐỔI CỬA
    </text>
    <DrawLine p={underline} x1={-102} y1={86} x2={102} y2={86} stroke={INK.red} strokeWidth={6} strokeLinecap="round" />
    {[0, 1].map((i) => (
      <line key={i} x1={-102} y1={112 + i * 18} x2={102} y2={112 + i * 18} stroke={INK.soft} strokeWidth={5} />
    ))}
  </g>
);

/** Ba cánh cửa trường quay. Xe sau cửa 2, dê sau cửa 1 và 3 (khớp lời kể: chọn cửa 1, người dẫn mở cửa 3). */
const BEHIND: ("car" | "goat")[] = ["goat", "car", "goat"];

// ---------------------------------------------------------------- hồi 1: mở đầu

const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  const magIn = li === 0 ? ease(lf, 0, 26) : 1;
  const magOut = li >= 2 ? ease(lf, 0, 20) : 0;
  const magZoom = li === 1 ? ease(lf, 0, 24) : li > 1 ? 1 : 0;
  const rain = li <= 1 ? 1 : 1 - ease(lf, 0, 20);
  const peek = li === 2 ? ease(lf, 8, 16) * (1 - ease(lf, 70, 20)) : 0;
  const glow1 = li === 2 ? ease(lf, 48, 14) : li > 2 ? 1 : 0;
  const open3 = li === 3 ? ease(lf, 40, 22) : li > 3 ? 1 : 0;
  const bleat = li === 3 ? ease(lf, 62, 6) * (1 - ease(lf, 100, 10)) : 0;
  const host = li >= 3 ? (li === 3 ? pop(lf, fps, 0) : 1) : 0;
  const invite = li === 3 ? ease(lf, 95, 14) : li > 3 ? 1 : 0;
  const pose =
    li === 2
      ? poseAt(lf, 46, "present", "point")
      : li === 3
        ? { pose: "think" as Pose, prevPose: "point" as Pose, poseT: ease(lf, 0, 12) }
        : linePose(li, lf, ["idle", "present", "present", "think", "present"]);
  const cards: [string, string][] = [
    ["📍 TẠP CHÍ PARADE · 1990", "~1.000 tiến sĩ phản đối"],
    ["MARILYN VOS SAVANT", "Đổi cửa → thắng gấp đôi"],
    ["LUẬT CHƠI", "1 xe · 2 dê · chọn 1 cửa"],
    ["NGƯỜI DẪN BIẾT XE Ở ĐÂU", "Luôn mở một cửa có dê"],
    ["CÒN BẠN?", "ĐỔI hay GIỮ? Ghi bình luận!"],
  ];
  const [title, formula] = cards[Math.min(li, cards.length - 1)];
  return (
    <g>
      <Studio frame={frame} />
      {DOOR_X.map((_, i) => (
        <Door key={i} i={i} frame={frame} behind={BEHIND[i]} peek={peek} glow={i === 0 ? glow1 : 0} open={i === 2 ? open3 : 0} bleat={i === 2 ? bleat : 0} />
      ))}
      {open3 > 0.6 ? (
        <Pop p={bleat} cx={470} cy={430}>
          <text x={470} y={452} textAnchor="middle" fill={INK.line} fontSize={40} {...T}>
            BE-E-E!
          </text>
        </Pop>
      ) : null}
      {/* Thư phản đối đổ ào xuống như mưa */}
      {rain > 0.01 ? (
        <g opacity={rain}>
          {Array.from({ length: 14 }, (_, i) => {
            const fy = ((frame * (3.2 + (i % 4) * 0.6) + i * 97) % 760) + 60;
            const fx = 90 + ((i * 131) % 640) + wave(frame, 0.05, 20, i);
            return <Envelope key={i} x={fx} y={fy} r={wave(frame, 0.07, 25, i)} s={0.8} />;
          })}
        </g>
      ) : null}
      {li <= 2 && magOut < 1 ? (
        <g transform={`translate(${magOut * 500} ${-magOut * 500})`}>
          <Magazine
            x={interpolate(magIn, [0, 1], [-160, 250]) + magZoom * 50}
            y={interpolate(magIn, [0, 1], [120, 330]) + magZoom * 10}
            s={0.95 + magZoom * 0.25}
            r={interpolate(magIn, [0, 1], [-40, -6]) + magZoom * 4}
            underline={li === 1 ? ease(lf, 30, 20) : li > 1 ? 1 : 0}
          />
        </g>
      ) : null}
      {li === 0 ? <Stamp x={600} y={240} text="~1.000 TIẾN SĨ" p={ease(lf, 40, 8)} size={38} /> : null}
      {li === 1 ? (
        <Pop p={pop(lf, fps, 52)} cx={590} cy={250}>
          <circle cx={590} cy={250} r={62} fill={INK.green} stroke={INK.line} strokeWidth={4} />
          <text x={590} y={270} textAnchor="middle" fill="#FFFFFF" fontSize={54} {...T}>
            ×2
          </text>
        </Pop>
      ) : null}
      {host > 0 ? <Host x={HOST_X} frame={frame} p={host} sign={["TÔI BIẾT", "CHỖ CÓ DÊ"]} signP={li === 3 ? pop(lf, fps, 10) * (1 - ease(lf, 88, 8)) : 0} invite={invite} /> : null}
      <Stickman x={MILO_X} y={GROUND} {...pose} badge="CỬA 1!" badgeP={li === 2 ? pop(lf, fps, 52) : 0} />
      {li >= 4 ? (
        <Pop p={pop(lf, fps, 4)} cx={335} cy={260}>
          <rect x={130} y={180} width={410} height={140} rx={18} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
          <rect x={146} y={196} width={182} height={108} rx={10} fill={INK.green} />
          <rect x={342} y={196} width={182} height={108} rx={10} fill={INK.red} />
          <text x={237} y={270} textAnchor="middle" fill="#FFFFFF" fontSize={50} {...T}>
            ĐỔI?
          </text>
          <text x={433} y={270} textAnchor="middle" fill="#FFFFFF" fontSize={50} {...T}>
            GIỮ?
          </text>
          <DownArrow x={335} y={380} p={1} frame={frame} />
        </Pop>
      ) : null}
      <Card title={title} formula={formula} p={1} fp={li === 0 ? 1 : pop(lf, fps, 0)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2: rào cản

/** Chân dung khắc gỗ nhà toán học Paul Erdős khoanh tay lắc đầu. */
const Erdos: React.FC<{ x: number; y: number; frame: number; shake: number }> = ({ x, y, frame, shake }) => (
  <g>
    <ellipse cx={x} cy={y} rx={150} ry={185} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
    <ellipse cx={x} cy={y} rx={132} ry={167} fill="#F3E3BE" stroke={INK.line} strokeWidth={3} />
    <clipPath id="erdos-clip">
      <ellipse cx={x} cy={y} rx={132} ry={167} />
    </clipPath>
    <g clipPath="url(#erdos-clip)">
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} x1={x - 160 + i * 12} y1={y - 170} x2={x - 260 + i * 12} y2={y + 170} stroke="rgba(90,60,30,0.12)" strokeWidth={3} />
      ))}
      {/* Vai, áo vest và hai tay khoanh */}
      <path d={`M ${x - 130} ${y + 170} Q ${x - 120} ${y + 40} ${x} ${y + 40} Q ${x + 120} ${y + 40} ${x + 130} ${y + 170} Z`} fill="#5B5F66" stroke={INK.line} strokeWidth={4} />
      <rect x={x - 90} y={y + 92} width={180} height={44} rx={22} fill="#4A4E55" stroke={INK.line} strokeWidth={4} />
      <rect x={x - 80} y={y + 104} width={160} height={40} rx={20} fill="#5B5F66" stroke={INK.line} strokeWidth={4} />
      <g transform={`rotate(${shake * wave(frame, 0.32, 7)} ${x} ${y + 40})`}>
        <rect x={x - 18} y={y + 8} width={36} height={40} fill="#E2B48C" stroke={INK.line} strokeWidth={3} />
        <ellipse cx={x} cy={y - 40} rx={62} ry={74} fill="#EBC199" stroke={INK.line} strokeWidth={4} />
        <path d={`M ${x - 62} ${y - 52} Q ${x - 72} ${y - 92} ${x - 50} ${y - 104}`} fill="none" stroke="#9A9A9A" strokeWidth={10} strokeLinecap="round" />
        <path d={`M ${x + 62} ${y - 52} Q ${x + 72} ${y - 92} ${x + 50} ${y - 104}`} fill="none" stroke="#9A9A9A" strokeWidth={10} strokeLinecap="round" />
        <circle cx={x - 24} cy={y - 46} r={20} fill="rgba(255,255,255,0.4)" stroke={INK.line} strokeWidth={4} />
        <circle cx={x + 24} cy={y - 46} r={20} fill="rgba(255,255,255,0.4)" stroke={INK.line} strokeWidth={4} />
        <line x1={x - 4} y1={y - 46} x2={x + 4} y2={y - 46} stroke={INK.line} strokeWidth={4} />
        <circle cx={x - 24} cy={y - 44} r={4} fill={INK.line} />
        <circle cx={x + 24} cy={y - 44} r={4} fill={INK.line} />
        <path d={`M ${x - 40} ${y - 78} L ${x - 12} ${y - 70} M ${x + 40} ${y - 78} L ${x + 12} ${y - 70}`} stroke={INK.line} strokeWidth={4} strokeLinecap="round" />
        <path d={`M ${x} ${y - 30} L ${x - 8} ${y - 6} L ${x + 6} ${y - 6}`} fill="none" stroke={INK.line} strokeWidth={3} />
        <path d={`M ${x - 20} ${y + 16} Q ${x} ${y + 6} ${x + 20} ${y + 16}`} fill="none" stroke={INK.line} strokeWidth={4} strokeLinecap="round" />
      </g>
    </g>
  </g>
);

/** Máy tính đời cũ màn hình xanh, bộ đếm số ván chạy vùn vụt. */
const OldComputer: React.FC<{ x: number; y: number; games: number; frame: number }> = ({ x, y, games, frame }) => {
  const pct = games > 30 ? 66.7 + Math.sin(frame * 0.7) * Math.max(0.1, 400 / games) : games > 0 ? 50 + Math.sin(frame) * 15 : 0;
  return (
    <g>
      <rect x={x} y={y} width={290} height={230} rx={18} fill="#E6DCC2" stroke={INK.line} strokeWidth={5} />
      <rect x={x + 22} y={y + 20} width={246} height={170} rx={12} fill="#0F2A1A" stroke={INK.line} strokeWidth={4} />
      <rect x={x + 22} y={y + 20} width={246} height={170} rx={12} fill="rgba(80,255,120,0.08)" />
      <text x={x + 145} y={y + 66} textAnchor="middle" fill="#7CFF8A" fontSize={30} {...T}>
        VÁN {games.toLocaleString("vi-VN")}
      </text>
      <text x={x + 145} y={y + 118} textAnchor="middle" fill="#7CFF8A" fontSize={34} {...T}>
        ĐỔI ✔ {games > 0 ? pct.toFixed(1).replace(".", ",") : "—"}%
      </text>
      <rect x={x + 40} y={y + 140} width={210 * Math.min(1, pct / 100)} height={22} fill="#7CFF8A" opacity={0.85} />
      <rect x={x + 40} y={y + 140} width={210} height={22} fill="none" stroke="#7CFF8A" strokeWidth={2} />
      <rect x={x + 105} y={y + 230} width={80} height={24} fill="#CFC3A5" stroke={INK.line} strokeWidth={4} />
      <rect x={x - 10} y={y + 254} width={310} height={26} rx={6} fill="#D9CDAF" stroke={INK.line} strokeWidth={4} />
    </g>
  );
};

const Barrier: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const pile = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 18) : 0;
  const doors = li === 1 ? ease(lf, 10, 16) : 0;
  const portrait = li === 2 ? pop(lf, fps, 0) : 0;
  const pc = li === 2 ? ease(lf, 70, 22) : 0;
  const games = li === 2 ? Math.floor(Math.max(0, lf - 92) ** 1.6 * 2.3) : 0;
  const cards: [string, string, boolean][] = [
    ["~10.000 LÁ THƯ", "Phần lớn: cô ấy sai!", false],
    ["LÝ LẼ NGHE RẤT XUÔI", "Còn 2 cửa → mỗi cửa 50%?", false],
    ["NHÀ TOÁN HỌC PAUL ERDŐS", "Xem mô phỏng mới chịu tin", true],
  ];
  const [title, formula, ok] = cards[Math.min(li, 2)];
  return (
    <g>
      <path d="M 60 690 Q 300 640 520 690 Q 720 650 910 690 L 910 780 L 60 780 Z" fill="rgba(160,120,70,0.14)" />
      {/* Núi thư chất cao */}
      {pile > 0.01 ? (
        <g opacity={pile} transform={`translate(0 ${(1 - pile) * 120})`}>
          {Array.from({ length: 7 }, (_, r) =>
            Array.from({ length: 8 - r }, (_, c) => {
              const d = r * 7 + c * 1.6;
              const p = li === 0 ? pop(bf, fps, d) : 1;
              return p > 0.01 ? (
                <g key={`${r}-${c}`} transform={`translate(0 ${(1 - Math.min(1, p)) * -260})`}>
                  <Envelope x={120 + r * 34 + c * 66} y={GROUND - 26 - r * 40} r={((r * 7 + c * 13) % 21) - 10} s={1} />
                </g>
              ) : null;
            }),
          )}
          {li === 0 ? (
            <>
              {[
                [210, 300, -7, "50/50!", 40],
                [450, 250, 6, "CÔ ẤY SAI!", 70],
              ].map(([x, y, r, text, d]) => (
                <Pop key={text as string} p={pop(lf, fps, d as number)} cx={x as number} cy={y as number}>
                  <g transform={`rotate(${r} ${x} ${y})`}>
                    <rect x={(x as number) - 130} y={(y as number) - 70} width={260} height={140} rx={6} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
                    <text x={x as number} y={(y as number) - 4} textAnchor="middle" fill={INK.blue} fontSize={40} {...T}>
                      {text}
                    </text>
                    <text x={(x as number) + 100} y={(y as number) + 50} textAnchor="end" fill={INK.line} fontSize={30} {...T} fontStyle="italic">
                      – Ph.D.
                    </text>
                  </g>
                </Pop>
              ))}
              <Fade p={ease(lf, 10, 14)}>
                <text x={690} y={210} textAnchor="middle" fill={INK.line} fontSize={58} {...T}>
                  ✉ {Math.round(ease(lf, 10, 80) * 10000).toLocaleString("vi-VN")}
                </text>
              </Fade>
            </>
          ) : null}
        </g>
      ) : null}
      {/* Hai cửa đóng treo nhãn 50% rung rinh, rồi ✖ */}
      {doors > 0.01 ? (
        <g opacity={doors}>
          {DOOR_X.map((dx, i) => (
            <g key={i}>
              <Door i={i} frame={frame} behind={BEHIND[i]} open={i === 2 ? 1 : 0} />
              {i < 2 ? (
                <g transform={`rotate(${wave(frame, 0.16, 9, i * 1.7)} ${dx + DOOR_W / 2} ${DOOR_Y - 90})`}>
                  <line x1={dx + DOOR_W / 2} y1={DOOR_Y - 90} x2={dx + DOOR_W / 2} y2={DOOR_Y - 44} stroke={INK.line} strokeWidth={3} />
                  <rect x={dx + 10} y={DOOR_Y - 150} width={DOOR_W - 20} height={66} rx={12} fill="#FFF6DD" stroke={INK.line} strokeWidth={4} />
                  <text x={dx + DOOR_W / 2} y={DOOR_Y - 102} textAnchor="middle" fill={INK.blue} fontSize={44} {...T}>
                    50%
                  </text>
                  <Cross x={dx + DOOR_W / 2} y={DOOR_Y - 118} r={44} bare p={pop(lf, fps, 60 + i * 6)} />
                </g>
              ) : null}
            </g>
          ))}
        </g>
      ) : null}
      {/* Erdős lắc đầu, rồi máy tính chạy mô phỏng */}
      {portrait > 0.01 ? (
        <Pop p={portrait} cx={240} cy={420}>
          <g transform={`translate(${-pc * 40} 0)`}>
            <Erdos x={240} y={420} frame={frame} shake={1 - pc * 0.7} />
            <Stamp x={240} y={640} text="KHÔNG TIN" p={ease(lf, 24, 8)} size={40} rot={-6} />
          </g>
        </Pop>
      ) : null}
      {pc > 0.01 ? (
        <g transform={`translate(${(1 - pc) * 500} 0)`} opacity={pc}>
          <OldComputer x={410} y={440} games={games} frame={frame} />
        </g>
      ) : null}
      <Stickman x={MILO_X} y={GROUND} {...linePose(li, lf, ["think", "scratch", "think"])} badge="50/50?" badgeP={li === 1 ? pop(lf, fps, 30) * (1 - ease(lf, 60, 8)) : 0} />
      <Card title={title} formula={formula} p={pop(bf, fps, 6)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3: eureka (bảng 3 trường hợp)

const ROW_Y = [176, 372, 568];
const MINI_X = [112, 210, 308];
const MINI_W = 78;
const MINI_H = 116;

/** Cửa nhỏ vẽ phấn: số cửa, ngôi sao (cửa đã chọn), mở ra thấy dê, bóng xe. */
const MiniDoor: React.FC<{ x: number; y: number; n: number; star?: number; open?: number; car?: number; frame: number; w?: number; h?: number }> = ({
  x,
  y,
  n,
  star = 0,
  open = 0,
  car = 0,
  frame,
  w = MINI_W,
  h = MINI_H,
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={4} fill={open > 0.5 ? "#16261C" : "rgba(244,241,230,0.08)"} stroke={CHALK} strokeWidth={4} />
    {open > 0.02 ? (
      <g opacity={open}>
        <Goat x={x + w / 2 + 4} y={y + h - 6} s={0.55} frame={frame} />
      </g>
    ) : (
      <text x={x + w / 2} y={y + 44} textAnchor="middle" fill={CHALK} fontSize={34} {...T}>
        {n}
      </text>
    )}
    {car > 0.01 ? (
      <g opacity={car}>
        <Car x={x + w / 2} y={y + h - 8} s={0.46} />
      </g>
    ) : null}
    {star > 0.01 ? (
      <Pop p={star} cx={x + w - 6} cy={y + 6}>
        <path
          d={`M ${x + w - 6} ${y - 14} L ${x + w} ${y + 1} L ${x + w + 16} ${y + 2} L ${x + w + 3} ${y + 12} L ${x + w + 8} ${y + 28} L ${x + w - 6} ${y + 19} L ${x + w - 20} ${y + 28} L ${x + w - 15} ${y + 12} L ${x + w - 28} ${y + 2} L ${x + w - 12} ${y + 1} Z`}
          fill="#FFC93C"
          stroke={INK.line}
          strokeWidth={2.5}
        />
      </Pop>
    ) : null}
  </g>
);

/** Mỗi hàng: xe ở cửa nào, người dẫn mở cửa nào, đổi sang cửa nào, và câu (li) diễn hàng đó. */
const ROWS = [
  { car: 0, opens: 2, to: 1, line: 3 },
  { car: 1, opens: 2, to: 1, line: 1 },
  { car: 2, opens: 1, to: 2, line: 2 },
];

const Eureka: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const rowsOut = li === 4 ? ease(lf, 0, 16) : 0;
  const grid = li === 4 ? ease(lf, 10, 16) : 0;
  const pose = li === 3 ? poseAt(lf, 95, "point", "eureka") : li === 4 ? { pose: "scratch" as Pose, prevPose: "eureka" as Pose, poseT: ease(lf, 30, 14) } : linePose(li, lf, ["present", "point", "point"]);
  const cards: [string, string][] = [
    ["GIẢ SỬ BẠN LUÔN CHỌN CỬA 1", "Xe ở cửa 1, 2 hay 3?"],
    ["XE Ở CỬA 2", "Mở cửa 3 → đổi sang 2: THẮNG"],
    ["XE Ở CỬA 3", "Mở cửa 2 → đổi sang 3: THẮNG"],
    ["3 TRƯỜNG HỢP · ĐỔI: ✔ ✔ ✖", "Đổi thắng 2/3 · Giữ 1/3"],
    ["THỬ VỚI 100 CỬA", "Mở 98 cửa dê → bạn có đổi?"],
  ];
  const [title, formula] = cards[Math.min(li, 4)];
  return (
    <g>
      <Chalkboard x={78} y={150} w={620} h={612} open={ease(bf, 0, 18)} />
      {rowsOut < 1 ? (
        <g opacity={1 - rowsOut}>
          {ROWS.map((row, r) => {
            const y = ROW_Y[r];
            const show = li === 0 ? ease(lf, 8 + r * 26, 14) : 1;
            const active = li === row.line ? lf : li > row.line ? 999 : -1;
            const hl = li === row.line ? ease(lf, 0, 12) : 0;
            const opened = active >= 0 ? ease(active, 18, 14) : 0;
            const arrow = active >= 0 ? ease(active, 46, 22) : 0;
            const verdict = active >= 0 ? pop(active, fps, 72) : 0;
            const win = row.to === row.car;
            return (
              <Fade key={r} p={show} dy={20}>
                {hl > 0.01 ? <rect x={92} y={y - 14} width={592} height={190} rx={14} fill="rgba(255,226,122,0.10)" stroke={CHALK_Y} strokeWidth={4} opacity={hl} /> : null}
                <text x={110} y={y + 30} fill={CHALK_Y} fontSize={32} {...T}>
                  XE Ở CỬA {row.car + 1}
                </text>
                {opened > 0.5 && active < 999 ? (
                  <text x={420} y={y + 30} fill={CHALK_R} fontSize={30} {...T} opacity={1 - ease(active, 70, 10)}>
                    BẮT BUỘC MỞ {row.opens + 1}
                  </text>
                ) : null}
                {MINI_X.map((mx, d) => (
                  <MiniDoor
                    key={d}
                    x={mx}
                    y={y + 50}
                    n={d + 1}
                    frame={frame}
                    star={d === 0 ? (li === 0 ? pop(lf, fps, 90 + r * 6) : 1) : 0}
                    open={d === row.opens ? opened : 0}
                    car={d === row.car ? (li === 0 ? ease(lf, 20 + r * 26, 14) * 0.9 : 0.9) : 0}
                  />
                ))}
                <ArcArrow x1={MINI_X[0] + MINI_W / 2} y1={y + 52} x2={MINI_X[row.to] + MINI_W / 2} y2={y + 50} arc={34} p={arrow} color={CHALK_Y} />
                {verdict > 0.01 ? (
                  <g>
                    {win ? <Check x={460} y={y + 112} r={40} p={verdict} color={CHALK_G} /> : <Cross x={460} y={y + 112} r={30} p={verdict} />}
                    <Pop p={verdict} cx={580} cy={y + 112}>
                      <text x={580} y={y + 126} textAnchor="middle" fill={win ? CHALK_G : CHALK_R} fontSize={38} {...T}>
                        {win ? "THẮNG" : "THUA"}
                      </text>
                    </Pop>
                  </g>
                ) : null}
              </Fade>
            );
          })}
        </g>
      ) : null}
      {/* Bức tường 100 cửa: mở 98 cửa có dê, chừa lại đúng một cửa phát sáng */}
      {grid > 0.01 ? (
        <g opacity={grid}>
          {Array.from({ length: 100 }, (_, k) => {
            const cx = 104 + (k % 10) * 58;
            const cy = 172 + Math.floor(k / 10) * 58;
            const keep = k === 0 || k === 67;
            const order = (k * 37) % 100;
            const o = keep ? 0 : ease(lf, 34 + order * 0.7, 6);
            const glow = k === 67 ? ease(lf, 110, 16) * (0.6 + 0.4 * Math.sin(frame * 0.2)) : 0;
            return (
              <g key={k}>
                {glow > 0.01 ? <rect x={cx - 8} y={cy - 8} width={56} height={60} rx={8} fill="#FFC93C" opacity={glow} filter="url(#soft-glow)" /> : null}
                <rect x={cx} y={cy} width={40} height={44} rx={3} fill={o > 0.5 ? "#132119" : glow > 0.01 ? "#FFE27A" : "rgba(244,241,230,0.12)"} stroke={CHALK} strokeWidth={2.5} />
                {o > 0.5 ? <circle cx={cx + 20} cy={cy + 28} r={7} fill="#E8E4DA" opacity={o} /> : null}
                {k === 0 ? <circle cx={cx + 34} cy={cy + 6} r={9} fill="#FFC93C" stroke={INK.line} strokeWidth={2} /> : null}
              </g>
            );
          })}
        </g>
      ) : null}
      <Stickman x={815} y={GROUND} {...pose} badge="2/3!" badgeP={li === 3 ? pop(lf, fps, 98) : 0} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4: định lý

const Theorem: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const tint = li === 0 ? ease(lf, 30, 16) : 0;
  const slip = li === 1 ? ease(lf, 92, 16) : 0;
  const open3 = li === 1 ? ease(lf, 102, 14) : 0;
  const board = li === 2 ? ease(lf, 0, 18) : 0;
  const write = li === 2 ? ease(lf, 8, 50) : 0;
  const cards: [string, string][] = [
    ["MẤU CHỐT", "Đổi thắng ⇔ lần đầu chọn sai"],
    ["NGƯỜI DẪN BIẾT · KHÔNG MỞ TRÚNG XE", "Mở bừa mà ra dê → mới 50/50"],
    ["📖 TOÁN 12 · XÁC SUẤT CÓ ĐIỀU KIỆN", "Biết thêm tin → tính lại xác suất"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  return (
    <g>
      {li <= 1 ? <Studio frame={frame} lights={li === 1 ? 1 : 0} /> : null}
      {li === 0 ? (
        <>
          <Pop p={pop(bf, fps, 4)} cx={335} cy={230}>
            <rect x={110} y={160} width={450} height={136} rx={14} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
            <text x={335} y={218} textAnchor="middle" fill="#FFF6DD" fontSize={38} {...T}>
              ĐỔI = THẮNG KHI
            </text>
            <text x={335} y={268} textAnchor="middle" fill="#FFE27A" fontSize={38} {...T}>
              LẦN ĐẦU CHỌN SAI
            </text>
          </Pop>
          {[0, 1, 2].map((i) => (
            <Door key={i} i={i} frame={frame} behind={i === 2 ? "car" : "goat"} open={ease(bf, 10 + i * 8, 16)} tint={i < 2 ? INK.red : INK.green} tintP={tint} />
          ))}
          <Fade p={ease(lf, 40, 14)} dy={12}>
            <rect x={98} y={372} width={294} height={62} rx={12} fill="#FFF6DD" stroke={INK.red} strokeWidth={4} />
            <path d="M 95 470 L 95 446 L 395 446 L 395 470" fill="none" stroke={INK.red} strokeWidth={5} />
            <text x={245} y={416} textAnchor="middle" fill={INK.red} fontSize={36} {...T}>
              SAI 2/3
            </text>
            <rect x={404} y={372} width={192} height={62} rx={12} fill="#FFF6DD" stroke={INK.green} strokeWidth={4} />
            <path d="M 435 470 L 435 446 L 565 446 L 565 470" fill="none" stroke={INK.green} strokeWidth={5} />
            <text x={500} y={416} textAnchor="middle" fill={INK.green} fontSize={36} {...T}>
              ĐÚNG 1/3
            </text>
          </Fade>
        </>
      ) : null}
      {li === 1 ? (
        <>
          {[0, 1, 2].map((i) => (
            <Door key={i} i={i} frame={frame} behind={BEHIND[i]} open={i === 2 ? open3 : 0} bleat={i === 2 ? ease(lf, 112, 6) : 0} />
          ))}
          <Pop p={pop(lf, fps, 70)} cx={600} cy={770}>
            <path d="M 580 778 Q 596 750 604 776 Q 612 752 626 778 Q 604 770 580 778 Z" fill="#F2D33C" stroke={INK.line} strokeWidth={3} />
          </Pop>
          <Host x={HOST_X} frame={frame} p={pop(lf, fps, 0)} sign={["TÔI BIẾT", "XE Ở ĐÂU"]} signP={pop(lf, fps, 8)} fall={slip} />
          <Fade p={ease(lf, 108, 14)} dy={14}>
            <rect x={110} y={170} width={460} height={140} rx={16} fill="#FFF6DD" stroke={INK.red} strokeWidth={4} />
            <text x={340} y={232} textAnchor="middle" fill={INK.red} fontSize={44} {...T}>
              MỞ BỪA → 1/2 · 1/2
            </text>
            <text x={340} y={284} textAnchor="middle" fill={INK.line} fontSize={30} {...T}>
              (Rosenthal, 2008)
            </text>
          </Fade>
        </>
      ) : null}
      {board > 0.01 ? (
        <g opacity={board}>
          <Chalkboard x={86} y={160} w={612} h={470} open={board} />
          <clipPath id="formula-write">
            <rect x={90} y={270} width={600 * write} height={230} />
          </clipPath>
          <g clipPath="url(#formula-write)">
            <text x={256} y={340} textAnchor="end" fill={CHALK} fontSize={58} {...T}>
              P(A|
            </text>
            <text x={282} y={340} textAnchor="middle" fill={CHALK_Y} fontSize={58} {...T}>
              B
            </text>
            <text x={308} y={340} fill={CHALK} fontSize={58} {...T}>
              ) =
            </text>
            <text x={392} y={470} textAnchor="middle" fill={CHALK} fontSize={56} {...T}>
              P(A∩B) : P(B)
            </text>
          </g>
          <DrawPath p={ease(lf, 64, 18)} length={240} d="M 282 278 A 32 40 0 1 1 281 278" fill="none" stroke={CHALK_Y} strokeWidth={5} />
          <ArcArrow x1={330} y1={236} x2={292} y2={274} arc={6} p={ease(lf, 80, 12)} color={CHALK_Y} />
          <Fade p={ease(lf, 86, 12)} dy={10}>
            <text x={392} y={226} textAnchor="middle" fill={CHALK_Y} fontSize={34} {...T}>
              B = người dẫn mở cửa 3
            </text>
          </Fade>
          <Pop p={pop(lf, fps, 40)} cx={200} cy={720}>
            <g transform="rotate(-4 200 720)">
              <rect x={96} y={668} width={214} height={92} rx={8} fill={INK.blue} stroke={INK.line} strokeWidth={4} />
              <rect x={96} y={746} width={214} height={14} fill="#F4E4C1" stroke={INK.line} strokeWidth={3} />
              <text x={203} y={722} textAnchor="middle" fill="#FFFFFF" fontSize={32} {...T}>
                TOÁN 12
              </text>
            </g>
          </Pop>
        </g>
      ) : null}
      <Stickman x={MILO_X + 10} y={GROUND} {...(li === 1 ? poseAt(lf, 104, "think", "scratch") : linePose(li, lf, ["point", "think", "point"]))} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5: thử tại nhà với ba cái cốc

const CUP_X = [190, 375, 560];
const TABLE_Y = 610;

const Cup: React.FC<{ x: number; lift: number; glow?: number; frame: number }> = ({ x, lift, glow = 0, frame }) => (
  <g transform={`translate(${x} ${TABLE_Y - lift})`}>
    {glow > 0.01 ? <ellipse cx={0} cy={lift + 4} rx={78} ry={18} fill="#FFC93C" opacity={glow * (0.6 + 0.4 * Math.sin(frame * 0.2))} filter="url(#soft-glow)" /> : null}
    <path d="M -55 0 L -36 -128 L 36 -128 L 55 0 Z" fill="#D9443A" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-58} y={-14} width={116} height={14} rx={4} fill="#B8352C" stroke={INK.line} strokeWidth={3} />
    <path d="M -28 -116 L -40 -22" stroke="rgba(255,255,255,0.5)" strokeWidth={8} strokeLinecap="round" />
    <rect x={-38} y={-136} width={76} height={10} rx={4} fill="#B8352C" stroke={INK.line} strokeWidth={3} />
  </g>
);

const Coin: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => (
  <Pop p={p} cx={x} cy={y}>
    <ellipse cx={x} cy={y} rx={28} ry={11} fill="#E0AD46" stroke={INK.line} strokeWidth={3} />
    <ellipse cx={x} cy={y - 3} rx={20} ry={6} fill="#FFD866" />
  </Pop>
);

const Realworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const lift2 = li === 0 ? ease(lf, 10, 16) * (1 - ease(lf, 58, 16)) * 120 : 0;
  const coinP = li === 0 ? pop(lf, fps, 30) : 0;
  const hand = li === 1 ? ease(lf, 8, 20) : li > 1 ? 1 : 0;
  const lift3 = li === 1 ? ease(lf, 52, 16) * 120 : 0;
  const slate = li === 2 ? pop(lf, fps, 0) : 0;
  const n = li === 2 ? Math.min(30, Math.floor(Math.max(0, lf - 10) / 4)) : 0;
  const wins = Array.from({ length: n }, (_, g) => g % 3 !== 2).filter(Boolean).length;
  const cards: [string, string][] = [
    ["THỬ NGAY TẠI NHÀ", "3 cái cốc · 1 đồng xu"],
    ["BẠN LÀM NGƯỜI DẪN", "Bạn chọn sai → mình buộc chừa cốc có xu"],
    ["30 VÁN · VÁN NÀO CŨNG ĐỔI", "Thắng ≈ 2/3 số ván"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  const tally = (count: number, x: number, y: number, color: string) => (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = x + g * 78;
        return k < 4 ? (
          <line key={i} x1={gx + k * 14} y1={y - 44} x2={gx + k * 14} y2={y + 4} stroke={color} strokeWidth={5} strokeLinecap="round" />
        ) : (
          <line key={i} x1={gx - 8} y1={y - 6} x2={gx + 52} y2={y - 38} stroke={color} strokeWidth={5} strokeLinecap="round" />
        );
      })}
    </g>
  );
  return (
    <g>
      {/* Phòng ăn: tường kẻ sọc, khung cửa sổ */}
      <rect x={60} y={92} width={850} height={688} fill="rgba(200,150,90,0.10)" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={80 + i * 72} y1={92} x2={80 + i * 72} y2={560} stroke="rgba(150,100,50,0.12)" strokeWidth={8} />
      ))}
      {li < 2 ? (
        <g>
          <rect x={150} y={170} width={260} height={210} rx={8} fill="#CFE6EE" stroke={INK.line} strokeWidth={5} />
          <line x1={280} y1={170} x2={280} y2={380} stroke={INK.line} strokeWidth={4} />
          <line x1={150} y1={275} x2={410} y2={275} stroke={INK.line} strokeWidth={4} />
        </g>
      ) : null}
      {/* Bàn ăn */}
      <rect x={70} y={TABLE_Y} width={600} height={26} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <rect x={100} y={TABLE_Y + 26} width={22} height={GROUND - TABLE_Y - 26} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
      <rect x={618} y={TABLE_Y + 26} width={22} height={GROUND - TABLE_Y - 26} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
      <Coin x={CUP_X[1]} y={TABLE_Y - 8} p={li === 0 ? coinP : 1} />
      {CUP_X.map((cx, i) => (
        <Cup key={i} x={cx} frame={frame} lift={i === 1 ? lift2 : i === 2 ? lift3 : 0} glow={i === 0 && li === 1 ? ease(lf, 20, 10) : 0} />
      ))}
      {/* Tay người bạn chọn cốc 1 */}
      {hand > 0.01 && li === 1 ? (
        <g transform={`translate(${interpolate(hand, [0, 1], [-200, 0])} 0)`}>
          <rect x={40} y={420} width={100} height={40} rx={18} fill="#E07A3A" stroke={INK.line} strokeWidth={4} />
          <circle cx={150} cy={440} r={18} fill="#EBB892" stroke={INK.line} strokeWidth={3} />
          <rect x={160} y={432} width={34} height={12} rx={6} fill="#EBB892" stroke={INK.line} strokeWidth={3} transform="rotate(30 160 432)" />
        </g>
      ) : null}
      {/* Bong bóng ý nghĩ: người dẫn nhìn thấy xu */}
      {li === 1 ? (
        <Pop p={pop(lf, fps, 80)} cx={640} cy={290}>
          <circle cx={735} cy={330} r={9} fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
          <circle cx={710} cy={300} r={14} fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
          <ellipse cx={590} cy={225} rx={130} ry={82} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
          <path d="M 548 268 L 560 196 L 600 196 L 612 268 Z" fill="rgba(217,68,58,0.35)" stroke={INK.line} strokeWidth={3} strokeDasharray="6 5" />
          <ellipse cx={580} cy={262} rx={18} ry={7} fill="#E0AD46" stroke={INK.line} strokeWidth={2.5} />
          <text x={660} y={244} textAnchor="middle" fill={INK.red} fontSize={46} {...T}>
            !
          </text>
        </Pop>
      ) : null}
      {/* Bảng đếm vạch phấn */}
      {slate > 0.01 ? (
        <Pop p={slate} cx={360} cy={330}>
          <rect x={92} y={150} width={560} height={300} rx={14} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
          <rect x={106} y={164} width={532} height={272} rx={8} fill="#2F4A3A" />
          <text x={620} y={206} textAnchor="end" fill={CHALK_Y} fontSize={34} {...T}>
            {n}/30 VÁN
          </text>
          <text x={124} y={290} fill={CHALK_G} fontSize={36} {...T}>
            ĐỔI ✔
          </text>
          {tally(wins, 290, 292, CHALK_G)}
          <text x={124} y={392} fill={CHALK_R} fontSize={36} {...T}>
            ĐỔI ✖
          </text>
          {tally(n - wins, 290, 394, CHALK_R)}
        </Pop>
      ) : null}
      {li === 2 ? <DownArrow x={710} y={250} p={pop(lf, fps, 130)} frame={frame} /> : null}
      <Stickman
        x={MILO_X}
        y={GROUND}
        accessory={li >= 1 ? "bowtie" : undefined}
        {...(li === 1 ? poseAt(lf, 46, "present", "touch") : li === 2 ? { pose: "wave" as Pose, prevPose: "touch" as Pose, poseT: ease(lf, 0, 14) } : { pose: "present" as Pose })}
      />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6: tìm xác Air France 447

const DOT = { x: 500, y: 430 };

/** Ô lưới bản đồ xác suất quanh vị trí cuối: mức đậm theo xác suất, nhóm vùng đã dò. */
const CELLS = (() => {
  const out: { x: number; y: number; p: number; zone: number }[] = [];
  for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
      const x = DOT.x + i * 40;
      const y = DOT.y + j * 40;
      const cx = x + 20 - DOT.x;
      const cy = y + 20 - DOT.y;
      const d = Math.hypot(cx, cy);
      if (d > 190) continue;
      const p = Math.exp(-(d * d) / (2 * 95 * 95));
      // Vùng chưa dò (sẽ đậm lên): phía bắc – đông bắc, cách tâm vừa phải.
      const zone = cy < -40 && cx > -20 && d > 50 ? 9 : d < 75 ? 0 : cx < 0 && cy < 0 ? 1 : cx >= 0 ? 2 : 3;
      out.push({ x, y, p, zone });
    }
  }
  return out;
})();

const Cosmic: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const map = li <= 1 ? 1 : li === 2 ? 1 - ease(lf, 0, 16) : 0;
  const sea = li === 2 ? ease(lf, 0, 16) : 0;
  const studio = li === 3 ? ease(lf, 0, 16) : 0;
  const plane = li === 0 ? ease(lf, 0, 40) : 1;
  const searched = (z: number) => (li === 0 ? ease(lf, 40 + z * 22, 10) : 1);
  const shift = li === 1 ? ease(lf, 20, 60) : li > 1 ? 1 : 0;
  const robot = li === 2 ? ease(lf, 22, 70) : 0;
  const light = li === 2 ? ease(lf, 80, 14) : 0;
  const walk = li === 3 ? ease(lf, 14, 50) : 0;
  const cards: [string, string][] = [
    ["AIR FRANCE 447 · 1/6/2009", "4 đợt tìm, gần 2 năm: trắng tay"],
    ["NHÓM METRON", "Dò hụt → vùng đó hạ xác suất"],
    ["THÁNG 4/2011", "Sâu hơn 4.000 m · sau 1 tuần dò"],
    ["LẦN SAU GẶP HAI CỬA ĐÓNG", "Nhớ cửa người dẫn cố tình chừa lại"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
  const pose =
    li === 3
      ? walk < 1
        ? { pose: "idle" as Pose, prevPose: "point" as Pose, poseT: ease(lf, 0, 12) }
        : { pose: "touch" as Pose, prevPose: "idle" as Pose, poseT: ease(lf, 64, 14) }
      : li === 2
        ? poseAt(lf, 96, "point", "eureka")
        : { pose: "point" as Pose };
  return (
    <g>
      {map > 0.01 ? (
        <g opacity={map}>
          <rect x={70} y={132} width={700} height={620} rx={18} fill="#CFE2DC" stroke={INK.line} strokeWidth={5} />
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M ${110 + (i % 3) * 210} ${180 + i * 62} q 15 -10 30 0 t 30 0`} fill="none" stroke="rgba(29,106,140,0.35)" strokeWidth={3} />
          ))}
          <path d="M 70 150 L 210 150 Q 250 230 300 268 Q 320 310 278 360 Q 236 430 206 520 Q 176 620 130 700 L 70 752 Z" fill="#E7CF9A" stroke={INK.line} strokeWidth={4} />
          <path d="M 770 150 L 690 150 Q 650 210 664 262 Q 676 312 740 338 L 770 346 Z" fill="#E7CF9A" stroke={INK.line} strokeWidth={4} />
          <text x={130} y={300} textAnchor="middle" fill={INK.line} fontSize={30} {...T} transform="rotate(-70 130 300)">
            BRAZIL
          </text>
          <text x={724} y={232} textAnchor="middle" fill={INK.line} fontSize={28} {...T} transform="rotate(70 724 232)">
            CHÂU PHI
          </text>
          {CELLS.map((c) => {
            const s = c.zone < 9 ? searched(c.zone) : 0;
            const heat = c.zone === 9 ? c.p * (0.6 + shift * 1.4) + shift * 0.25 : c.p * (1 - 0.8 * shift * (s > 0.5 ? 1 : 0));
            const pulse = c.zone === 9 && shift > 0.5 ? 0.85 + 0.15 * Math.sin(frame * 0.2) : 1;
            return (
              <g key={`${c.x}-${c.y}`}>
                <rect x={c.x + 1} y={c.y + 1} width={38} height={38} fill={`rgba(214,60,30,${Math.min(0.9, 0.12 + 0.6 * heat) * pulse})`} />
                {s > 0.01 ? <rect x={c.x + 1} y={c.y + 1} width={38} height={38} fill="url(#hatch)" opacity={s} /> : null}
              </g>
            );
          })}
          <circle cx={DOT.x} cy={DOT.y} r={190} fill="none" stroke={INK.line} strokeWidth={3} strokeDasharray="10 7" />
          <circle cx={DOT.x} cy={DOT.y} r={11 + wave(frame, 0.25, 3)} fill={INK.red} stroke="#FFFFFF" strokeWidth={3} />
          {/* Chiếc máy bay lao xuống vị trí cuối */}
          {plane < 1 ? (
            <g transform={`translate(${interpolate(plane, [0, 1], [160, DOT.x])} ${interpolate(plane, [0, 1], [180, DOT.y])}) rotate(32) scale(${1 - plane * 0.6})`} opacity={1 - plane * 0.5}>
              <path d="M -40 0 L 40 0 M -6 0 L -24 -30 M -6 0 L -24 30 M 32 0 L 26 -12" stroke={INK.line} strokeWidth={9} strokeLinecap="round" />
            </g>
          ) : null}
          <Fade p={ease(li === 0 ? lf : 99, 34, 12)}>
            <rect x={380} y={640} width={240} height={52} rx={10} fill="#FFF6DD" stroke={INK.red} strokeWidth={3} />
            <text x={500} y={678} textAnchor="middle" fill={INK.red} fontSize={32} {...T}>
              ĐÃ DÒ · HỤT
            </text>
          </Fade>
          {li === 1 ? (
            <Pop p={pop(lf, fps, 70)} cx={520} cy={190}>
              <text x={520} y={204} textAnchor="middle" fill={INK.red} fontSize={40} {...T}>
                ↑ XÁC SUẤT
              </text>
            </Pop>
          ) : null}
        </g>
      ) : null}
      {/* Mặt cắt đại dương: robot lặn soi thấy xác máy bay */}
      {sea > 0.01 ? (
        <g opacity={sea}>
          <rect x={70} y={132} width={640} height={240} fill="#F6E7C6" />
          <rect x={70} y={272} width={640} height={480} fill="url(#ocean-grad)" />
          <path d={`M 70 272 ${Array.from({ length: 8 }, (_, i) => `Q ${70 + i * 80 + 40} ${262 + wave(frame, 0.1, 6, i)} ${70 + (i + 1) * 80} 272`).join(" ")}`} fill="none" stroke="#FFFFFF" strokeWidth={4} />
          <path d="M 70 752 L 70 712 Q 200 690 300 712 Q 420 734 540 700 Q 640 680 710 706 L 710 752 Z" fill="#3B2F22" />
          <rect x={70} y={132} width={640} height={620} rx={18} fill="none" stroke={INK.line} strokeWidth={5} />
          {/* Tàu */}
          <g transform={`translate(380 ${272 + wave(frame, 0.1, 4)})`}>
            <path d="M -80 -6 L 80 -6 L 60 22 L -64 22 Z" fill="#7A3E22" stroke={INK.line} strokeWidth={4} />
            <rect x={-30} y={-40} width={56} height={34} fill="#F4F1EA" stroke={INK.line} strokeWidth={3} />
            <line x1={50} y1={-6} x2={50} y2={-60} stroke={INK.line} strokeWidth={5} />
            <line x1={50} y1={-60} x2={80} y2={-40} stroke={INK.line} strokeWidth={4} />
          </g>
          {/* Dây cáp + robot lặn */}
          <line x1={430} y1={290} x2={430} y2={300 + robot * 330} stroke={INK.line} strokeWidth={3} />
          {light > 0.01 ? <path d={`M 418 ${646} L 330 735 L 560 735 L 442 646 Z`} fill="rgba(255,240,170,0.5)" opacity={light} /> : null}
          <g transform={`translate(430 ${310 + robot * 330})`}>
            <rect x={-30} y={-22} width={60} height={40} rx={8} fill="#F2C14E" stroke={INK.line} strokeWidth={4} />
            <circle cx={0} cy={22} r={9} fill="#FFFBE0" stroke={INK.line} strokeWidth={3} />
            <rect x={-44} y={-10} width={14} height={20} fill="#9AA3A8" stroke={INK.line} strokeWidth={3} />
            <rect x={30} y={-10} width={14} height={20} fill="#9AA3A8" stroke={INK.line} strokeWidth={3} />
          </g>
          {/* Xác máy bay dưới đáy */}
          <g opacity={0.35 + light * 0.65}>
            <path d="M 380 728 L 470 716 L 486 740 L 380 744 Z" fill="#C9CED2" stroke={INK.line} strokeWidth={3} />
            <path d="M 500 742 L 520 680 L 548 684 L 540 742 Z" fill="#B7BEC4" stroke={INK.line} strokeWidth={3} />
          </g>
          {/* Thước độ sâu */}
          <line x1={110} y1={280} x2={110} y2={728} stroke="#FFFFFF" strokeWidth={4} />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={100} y1={280 + i * 112} x2={120} y2={280 + i * 112} stroke="#FFFFFF" strokeWidth={4} />
          ))}
          <text x={130} y={700} fill="#FFFFFF" fontSize={34} {...T}>
            4.000 M
          </text>
          {[0, 1].map((i) => {
            const fx = 640 - ((frame * (1.2 + i * 0.5) + i * 200) % 520);
            return <path key={i} d={`M ${fx} ${420 + i * 90} q 18 -12 36 0 q -18 12 -36 0 l -12 -8 l 0 16 z`} fill="#F2A65A" stroke={INK.line} strokeWidth={2} />;
          })}
          <Stamp x={390} y={196} text="4/2011 · 1 TUẦN" p={ease(lf, 96, 8)} size={40} rot={-4} color={INK.green} />
        </g>
      ) : null}
      {/* Về lại trường quay: cửa người dẫn chừa lại sáng vàng */}
      {studio > 0.01 ? (
        <g opacity={studio}>
          <Studio frame={frame} />
          {[0, 1, 2].map((i) => (
            <Door key={i} i={i} frame={frame} behind={BEHIND[i]} open={i === 2 ? 1 : 0} glow={i === 1 ? ease(lf, 10, 20) : 0} />
          ))}
        </g>
      ) : null}
      <Stickman
        x={li === 3 ? 528 : 830}
        y={GROUND}
        scale={li === 3 ? 1 : 0.95}
        accessory={li === 2 ? "lifevest" : undefined}
        enter={li === 3 ? walk : 1}
        from={li === 3 ? 302 : 320}
        badge="Ở ĐÂY!"
        badgeP={li === 2 ? pop(lf, fps, 100) : 0}
        {...pose}
      />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

const MONTY: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const MontyScene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = MONTY[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient cho cảnh đại dương (đặt trong <defs> của khung SVG cảnh). */
export const MontyDefs: React.FC = () => (
  <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#4F9BB3" />
    <stop offset="100%" stopColor="#0C2536" />
  </linearGradient>
);

