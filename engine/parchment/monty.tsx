/**
 * Tập 1 "Ngàn tiến sĩ nói cô ấy sai" (bài toán Monty Hall): cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc
 * (`li`, `lf`) đúng như trường `shot` trong projects/kien-thuc/src/episodes/tuan-1.ts.
 * Toạ độ gốc của sân khấu: rộng x 60..910, cao y 125..780 (mặt đất y = 780).
 */
import React from "react";
import { Easing, interpolate } from "remotion";
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
        <Pop p={bleat} cx={DOOR_X[2] + DOOR_W / 2 + 10} cy={DOOR_Y + 76}>
          <text x={DOOR_X[2] + DOOR_W / 2 + 10} y={DOOR_Y + 88} textAnchor="middle" fill={CHALK_Y} fontSize={30} {...T}>
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
                  ✉ ~{(Math.round(ease(lf, 10, 45) * 100) * 100).toLocaleString("vi-VN")}
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
                    {row.car === 0 ? "MỞ TUỲ Ý" : `BẮT BUỘC MỞ ${row.opens + 1}`}
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

const CUP_X = [270, 430, 590];
const TABLE_Y = 610;

/** Cốc nhựa úp ngược; gốc: giữa miệng cốc trên mặt bàn `y`, nhấc lên `lift` px, phóng `s`. */
const Cup: React.FC<{ x: number; lift: number; glow?: number; frame: number; y?: number; s?: number }> = ({ x, lift, glow = 0, frame, y = TABLE_Y, s = 1 }) => (
  <g transform={`translate(${x} ${y - lift}) scale(${s})`}>
    {glow > 0.01 ? <ellipse cx={0} cy={lift / s + 4} rx={78} ry={18} fill="#FFC93C" opacity={glow * (0.6 + 0.4 * Math.sin(frame * 0.2))} filter="url(#soft-glow)" /> : null}
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

/** Người bạn ngồi đối diện sau bàn (áo cam); `reach` 0..1 đưa tay chạm cốc 1. */
const Friend: React.FC<{ x: number; frame: number; p: number; reach: number }> = ({ x, frame, p, reach }) => {
  const bob = wave(frame, 0.09, 2);
  const hx = interpolate(reach, [0, 1], [x + 40, CUP_X[0] - 46]);
  const hy = interpolate(reach, [0, 1], [TABLE_Y - 30, TABLE_Y - 62]);
  return (
    <Pop p={p} cx={x} cy={TABLE_Y - 60}>
      <g transform={`translate(0 ${bob})`}>
        <path d={`M ${x - 46} ${TABLE_Y + 4} Q ${x - 48} ${TABLE_Y - 92} ${x} ${TABLE_Y - 96} Q ${x + 48} ${TABLE_Y - 92} ${x + 46} ${TABLE_Y + 4} Z`} fill="#E07A3A" stroke={INK.line} strokeWidth={4} />
        <rect x={x - 9} y={TABLE_Y - 116} width={18} height={24} fill="#EBB892" stroke={INK.line} strokeWidth={3} />
        <circle cx={x} cy={TABLE_Y - 146} r={36} fill="#EBB892" stroke={INK.line} strokeWidth={4} />
        <path d={`M ${x - 37} ${TABLE_Y - 150} Q ${x - 34} ${TABLE_Y - 196} ${x + 4} ${TABLE_Y - 186} Q ${x + 38} ${TABLE_Y - 186} ${x + 37} ${TABLE_Y - 150} Q ${x + 14} ${TABLE_Y - 170} ${x - 37} ${TABLE_Y - 150} Z`} fill="#2B1A0E" />
        <circle cx={x - 12} cy={TABLE_Y - 144} r={4.5} fill={INK.line} />
        <circle cx={x + 14} cy={TABLE_Y - 144} r={4.5} fill={INK.line} />
        <path d={`M ${x - 10} ${TABLE_Y - 128} Q ${x + 2} ${TABLE_Y - 118} ${x + 14} ${TABLE_Y - 128}`} fill="none" stroke={INK.line} strokeWidth={3.5} strokeLinecap="round" />
        <line x1={x + 30} y1={TABLE_Y - 70} x2={hx} y2={hy} stroke={INK.line} strokeWidth={22} strokeLinecap="round" />
        <line x1={x + 30} y1={TABLE_Y - 70} x2={hx} y2={hy} stroke="#E07A3A" strokeWidth={16} strokeLinecap="round" />
        <circle cx={hx} cy={hy} r={13} fill="#EBB892" stroke={INK.line} strokeWidth={3} />
      </g>
    </Pop>
  );
};

/** Mũi tên đổi cốc vẽ dần bên dưới hàng cốc (võng xuống). */
const SwapArrow: React.FC<{ x1: number; x2: number; y: number; p: number; color: string }> = ({ x1, x2, y, p, color }) => {
  if (p <= 0.01) return null;
  const sag = 26;
  const ang = Math.atan2(-sag, (x2 - x1) / 2);
  return (
    <g>
      <DrawPath p={p} length={Math.abs(x2 - x1) + 4 * sag} d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y + 2 * sag} ${x2} ${y}`} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" />
      {p > 0.95 ? (
        <path
          d={`M ${x2} ${y} L ${x2 - 18 * Math.cos(ang - 0.5)} ${y - 18 * Math.sin(ang - 0.5)} M ${x2} ${y} L ${x2 - 18 * Math.cos(ang + 0.5)} ${y - 18 * Math.sin(ang + 0.5)}`}
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
};

/**
 * Một khung "ván mẫu": bạn mình chọn cốc 1 (sáng vàng), tay người dẫn (tay áo xanh của Milo, thò từ bên phải) lật một cốc trống,
 * rồi đổi sang cốc còn lại. `coinAt`: cốc có xu; `opens`: cốc người dẫn lật; `to`: cốc đổi sang. `t`: khung kể từ lúc khung bật ra.
 */
const RoundPanel: React.FC<{
  y: number;
  t: number;
  frame: number;
  fps: number;
  title: string;
  share: string;
  color: string;
  coinAt: number;
  opens: number;
  to: number;
  forced: boolean;
}> = ({ y, t, frame, fps, title, share, color, coinAt, opens, to, forced }) => {
  const x = 66;
  const w = 650;
  const h = 310;
  const base = y + 246;
  const cx = [x + 95, x + 225, x + 355];
  const s = 0.72;
  const pick = ease(t, 6, 10);
  const arm = ease(t, 8, 16) * (1 - ease(t, 40, 12));
  const lift = (i: number) => (i === opens ? ease(t, 24, 12) * 40 : i === to ? ease(t, 48, 10) * 40 : i === 0 && coinAt === 0 ? ease(t, 52, 10) * 40 : 0);
  const grip = { x: cx[opens], y: base - 100 - lift(opens) };
  const start = { x: x + w + 12, y: y + 118 };
  const hand = { x: interpolate(arm, [0, 1], [start.x, grip.x]), y: interpolate(arm, [0, 1], [start.y, grip.y]) };
  const win = to === coinAt;
  const verdict = pop(t, fps, 56);
  return (
    <Pop p={pop(t, fps, 0)} cx={x + w / 2} cy={y + h / 2}>
      <rect x={x} y={y} width={w} height={h} rx={18} fill="#FFF6DD" stroke={color} strokeWidth={6} />
      <text x={x + 22} y={y + 48} fill={color} fontSize={34} {...T}>
        {title}
      </text>
      <rect x={x + 20} y={y + 62} width={196} height={42} rx={21} fill={color} />
      <text x={x + 118} y={y + 93} textAnchor="middle" fill="#FFFFFF" fontSize={28} {...T}>
        {share}
      </text>
      {/* Mặt bàn */}
      <rect x={x + 24} y={base} width={420} height={12} rx={4} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
      <Coin x={cx[coinAt]} y={base - 6} p={1} />
      {cx.map((px, i) => (
        <Cup key={i} x={px} y={base} s={s} frame={frame} lift={lift(i)} glow={i === 0 ? pick : i === to && win ? ease(t, 36, 10) : 0} />
      ))}
      <SwapArrow x1={cx[0]} x2={cx[to]} y={base + 22} p={ease(t, 38, 12)} color={win ? INK.green : INK.red} />
      {forced ? <Stamp x={x + 340} y={y + 86} text="BẮT BUỘC" p={ease(t, 24, 8)} size={28} rot={-6} /> : null}
      {/* Tay người dẫn thò vào lật cốc trống */}
      {arm > 0.01 ? (
        <g>
          <line x1={start.x} y1={start.y} x2={hand.x} y2={hand.y} stroke={INK.line} strokeWidth={24} strokeLinecap="round" />
          <line x1={start.x} y1={start.y} x2={hand.x} y2={hand.y} stroke="#7FA3C8" strokeWidth={18} strokeLinecap="round" />
          <circle cx={hand.x} cy={hand.y} r={14} fill="#EBB892" stroke={INK.line} strokeWidth={3} />
        </g>
      ) : null}
      <Fade p={ease(t, 40, 10)} dy={8}>
        <text x={x + 552} y={y + 160} textAnchor="middle" fill={INK.line} fontSize={32} {...T}>
          ĐỔI
        </text>
      </Fade>
      {win ? <Check x={x + 552} y={y + 206} r={46} p={verdict} /> : <Cross x={x + 552} y={y + 204} r={30} p={verdict} />}
      <Pop p={verdict} cx={x + 552} cy={y + 270}>
        <text x={x + 552} y={y + 284} textAnchor="middle" fill={win ? INK.green : INK.red} fontSize={38} {...T}>
          {win ? "THẮNG" : "THUA"}
        </text>
      </Pop>
    </Pop>
  );
};

const Realworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const lift2 = li === 0 ? ease(lf, 8, 14) * (1 - ease(lf, 40, 14)) * 120 : 0;
  const coinP = li === 0 ? pop(lf, fps, 18) : 1;
  const friendP = li === 0 ? pop(lf, fps, 52) : 1;
  const reach = li === 1 ? ease(lf, 6, 16) : 0;
  const room = li <= 1 ? 1 : li === 2 ? 1 - ease(lf, 0, 12) : 0;
  const panelsOut = li === 3 ? ease(lf, 100, 14) : 0;
  const slate = li === 3 ? pop(lf, fps, 108) : 0;
  const n = li === 3 ? Math.min(30, Math.floor(Math.max(0, lf - 116) / 2.4)) : 0;
  const wins = Array.from({ length: n }, (_, g) => g % 3 !== 2).filter(Boolean).length;
  const cards: [string, string][] = [
    ["THỬ NGAY TẠI NHÀ", "3 cái cốc · 1 đồng xu"],
    ["BẠN LÀM NGƯỜI DẪN", "Bạn mình chọn một cốc, luôn đổi"],
    ["CHỌN TRÚNG CỐC TRỐNG · 2/3", "Buộc lật cốc trống còn lại → đổi thắng"],
    ["CHỌN TRÚNG CỐC CÓ XU · 1/3", "Đổi thua · thắng ≈ 2/3 số ván"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
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
  const pose =
    li === 1
      ? poseAt(lf, 46, "present", "touch")
      : li === 2
        ? { pose: "point" as Pose, prevPose: "touch" as Pose, poseT: ease(lf, 0, 12) }
        : li === 3
          ? poseAt(lf, 150, "point", "wave")
          : { pose: "present" as Pose };
  return (
    <g>
      {/* Phòng ăn: tường kẻ sọc */}
      <rect x={60} y={92} width={850} height={688} fill="rgba(200,150,90,0.10)" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={80 + i * 72} y1={92} x2={80 + i * 72} y2={560} stroke="rgba(150,100,50,0.12)" strokeWidth={8} />
      ))}
      {room > 0.01 ? (
        <g opacity={room}>
          <rect x={150} y={170} width={260} height={210} rx={8} fill="#CFE6EE" stroke={INK.line} strokeWidth={5} />
          <line x1={280} y1={170} x2={280} y2={380} stroke={INK.line} strokeWidth={4} />
          <line x1={150} y1={275} x2={410} y2={275} stroke={INK.line} strokeWidth={4} />
          <Friend x={140} frame={frame} p={friendP} reach={reach} />
          {/* Bàn ăn */}
          <rect x={70} y={TABLE_Y} width={600} height={26} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
          <rect x={100} y={TABLE_Y + 26} width={22} height={GROUND - TABLE_Y - 26} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
          <rect x={618} y={TABLE_Y + 26} width={22} height={GROUND - TABLE_Y - 26} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
          <Coin x={CUP_X[1]} y={TABLE_Y - 8} p={coinP} />
          {CUP_X.map((cx, i) => (
            <Cup key={i} x={cx} frame={frame} lift={i === 1 ? lift2 : 0} glow={i === 0 && li === 1 ? ease(lf, 18, 10) : 0} />
          ))}
          {/* Câu 2: bạn mình chọn cốc 1, mũi tên "LUÔN ĐỔI" */}
          {li === 1 ? (
            <>
              <ArcArrow x1={CUP_X[0]} y1={TABLE_Y - 146} x2={CUP_X[2]} y2={TABLE_Y - 146} arc={70} p={ease(lf, 28, 18)} color={INK.green} w={7} />
              <Stamp x={590} y={300} text="LUÔN ĐỔI" p={ease(lf, 40, 8)} size={44} rot={-5} color={INK.green} />
            </>
          ) : null}
        </g>
      ) : null}
      {/* Câu 3–4: hai ván mẫu */}
      {li >= 2 && panelsOut < 1 ? (
        <g opacity={1 - panelsOut}>
          <RoundPanel y={140} t={li === 2 ? lf : 999} frame={frame} fps={fps} title="CHỌN TRÚNG CỐC TRỐNG" share="2/3 SỐ VÁN" color={INK.green} coinAt={2} opens={1} to={2} forced />
          {li === 3 ? <RoundPanel y={462} t={lf} frame={frame} fps={fps} title="CHỌN TRÚNG CỐC CÓ XU" share="1/3 SỐ VÁN" color={INK.red} coinAt={0} opens={2} to={1} forced={false} /> : null}
        </g>
      ) : null}
      {/* Bảng đếm vạch phấn: 30 ván, đổi thắng chừng 20 */}
      {slate > 0.01 ? (
        <Pop p={slate} cx={372} cy={300}>
          <rect x={92} y={150} width={560} height={300} rx={14} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
          <rect x={106} y={164} width={532} height={272} rx={8} fill="#2F4A3A" />
          <text x={620} y={210} textAnchor="end" fill={CHALK_Y} fontSize={38} {...T}>
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
      {li === 3 ? (
        <>
          <Pop p={pop(lf, fps, 148)} cx={372} cy={530}>
            <text x={372} y={546} textAnchor="middle" fill={INK.red} fontSize={46} {...T}>
              KẾT QUẢ CỦA BẠN?
            </text>
          </Pop>
          <DownArrow x={372} y={624} p={pop(lf, fps, 156)} frame={frame} />
        </>
      ) : null}
      <Stickman x={MILO_X} y={GROUND} accessory={li >= 1 ? "bowtie" : undefined} {...pose} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6: máy bay ném bom và Abraham Wald (thiên kiến kẻ sống sót)

/** Số ngẫu nhiên cố định (0..1) theo hạt giống, để vết đạn luôn nằm đúng chỗ ở mọi khung hình. */
const seeded = (seed: number) => {
  let i = seed;
  return () => {
    i += 1;
    const v = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const PLANE = "#A7B096";
const PLANE_DARK = "#7B8568";
const GLASS = "#BFE3F2";
const STEEL = "#8E9BA8";
const SMOKE = "#4A4038";

/** Mép trước / mép sau cánh (nhìn từ trên xuống, mũi hướng lên) tại khoảng cách |x| tính từ thân. */
const wingLE = (ax: number) => -62 + ((ax - 26) * 30) / 294;
const wingTE = (ax: number) => 22 - ((ax - 26) * 14) / 294;
const ENG_X = [-200, -100, 100, 200];

/** Vết đạn trên máy bay nhìn từ trên: thân, cánh, đuôi; tránh xa bốn động cơ. `o` = thứ tự hiện. */
const HOLES = (() => {
  const r = seeded(7);
  const out: { x: number; y: number; o: number }[] = [];
  for (let k = 0; k < 30; k++) out.push({ x: (r() * 2 - 1) * 17, y: -150 + r() * 320, o: r() });
  let n = 0;
  while (n < 46) {
    const side = r() < 0.5 ? -1 : 1;
    const ax = 42 + r() * 266;
    const ty = r();
    const o = r();
    if (Math.abs(ax - 100) < 36 || Math.abs(ax - 200) < 36) continue;
    const le = wingLE(ax);
    const te = wingTE(ax);
    out.push({ x: side * ax, y: le + 7 + ty * (te - le - 14), o });
    n++;
  }
  for (let k = 0; k < 10; k++) {
    const side = r() < 0.5 ? -1 : 1;
    const ax = 16 + r() * 80;
    const top = 152 + ((ax - 8) * 20) / 102;
    out.push({ x: side * ax, y: top + 4 + r() * (184 - top), o: r() });
  }
  return out.sort((a, b) => a.o - b.o);
})();

/** Vài vết đạn cho máy bay thu nhỏ (đọc được khi bé). */
const FEW_HOLES = [HOLES[0], HOLES[3], HOLES[5], HOLES[8], HOLES[12], HOLES[17], HOLES[22], HOLES[27]];

/**
 * Máy bay ném bom bốn động cơ nhìn từ trên xuống, mũi hướng lên (gốc: giữa thân, dài ~430, sải cánh ~650).
 * `holes` 0..1 = tỉ lệ vết đạn đã hiện (theo thứ tự), `dim` làm mờ vết đạn, `rings` vòng nét đứt quanh động cơ,
 * `armor` 0..1 tấm giáp bọc quanh từng động cơ, `engineHit` chấm đỏ mờ ở động cơ, `lw` độ dày nét (đơn vị gốc).
 */
const Bomber: React.FC<{
  frame: number;
  holes?: number;
  few?: boolean;
  dim?: number;
  dotR?: number;
  rings?: number;
  armor?: number[];
  engineHit?: number;
  lw?: number;
}> = ({ frame, holes = 0, few = false, dim = 0, dotR = 6, rings = 0, armor, engineHit = 0, lw = 4 }) => {
  const list = few ? FEW_HOLES : HOLES;
  const shown = holes * list.length;
  const wing = (d: number) =>
    `M ${26 * d} -62 L ${306 * d} -34 Q ${326 * d} -31 ${326 * d} -18 L ${324 * d} 0 Q ${322 * d} 9 ${306 * d} 9 L ${26 * d} 22 Z`;
  const stab = (d: number) => `M ${8 * d} 150 L ${104 * d} 168 Q ${118 * d} 172 ${116 * d} 184 Q ${114 * d} 192 ${100 * d} 192 L ${8 * d} 194 Z`;
  const spin = frame * 0.9;
  return (
    <g>
      {/* Cánh và đuôi ngang */}
      {[-1, 1].map((d) => (
        <g key={d}>
          <path d={wing(d)} fill={PLANE} stroke={INK.line} strokeWidth={lw} strokeLinejoin="round" />
          <path d={`M ${30 * d} 8 L ${300 * d} -4`} stroke={PLANE_DARK} strokeWidth={lw * 0.5} />
          <path d={`M ${226 * d} 3 L ${300 * d} 0`} stroke={PLANE_DARK} strokeWidth={lw * 0.9} strokeLinecap="round" />
          <path d={stab(d)} fill={PLANE} stroke={INK.line} strokeWidth={lw} strokeLinejoin="round" />
        </g>
      ))}
      {/* Bốn động cơ: vỏ động cơ nhô ra trước mép cánh, cánh quạt quay */}
      {ENG_X.map((ex, k) => {
        const le = wingLE(Math.abs(ex));
        const te = wingTE(Math.abs(ex));
        const a = armor ? armor[k] : 0;
        const L = 34 * Math.abs(Math.cos(spin + k * 0.8));
        return (
          <g key={ex}>
            {rings > 0.01 ? (
              <ellipse cx={ex} cy={le - 8} rx={46} ry={62} fill="rgba(255,246,221,0.55)" stroke={INK.green} strokeWidth={lw} strokeDasharray={`${lw * 3} ${lw * 2}`} opacity={rings * (1 - a)} />
            ) : null}
            {a > 0.01 ? (
              <g transform={`translate(${ex} ${le - 10}) scale(${0.6 + 0.4 * a}) translate(${-ex} ${-(le - 10)})`} opacity={clamp01(a * 1.5)}>
                <rect x={ex - 30} y={le - 58} width={60} height={te - le + 80} rx={22} fill={STEEL} stroke={INK.line} strokeWidth={lw} />
                {[-46, -16, 14].map((dy) => (
                  <g key={dy}>
                    <circle cx={ex - 21} cy={le + dy} r={lw * 0.8} fill={INK.line} />
                    <circle cx={ex + 21} cy={le + dy} r={lw * 0.8} fill={INK.line} />
                  </g>
                ))}
              </g>
            ) : null}
            <rect x={ex - 15} y={le - 44} width={30} height={te - le + 58} rx={13} fill={PLANE} stroke={INK.line} strokeWidth={lw} />
            <rect x={ex - 15} y={le - 44} width={30} height={16} rx={8} fill={PLANE_DARK} stroke={INK.line} strokeWidth={lw * 0.7} />
            <ellipse cx={ex} cy={le - 48} rx={38} ry={4} fill="rgba(59,38,20,0.18)" />
            <line x1={ex - L} y1={le - 48} x2={ex + L} y2={le - 48} stroke={INK.line} strokeWidth={lw * 1.1} strokeLinecap="round" />
            <circle cx={ex} cy={le - 48} r={lw * 1.3} fill={INK.line} />
            {engineHit > 0.01 ? <circle cx={ex} cy={le - 14} r={dotR * 1.6} fill={INK.red} opacity={engineHit} /> : null}
          </g>
        );
      })}
      {/* Thân */}
      <path
        d="M 0 -215 C 18 -213 26 -190 26 -160 L 26 118 C 26 160 14 190 9 206 L -9 206 C -14 190 -26 160 -26 118 L -26 -160 C -26 -190 -18 -213 0 -215 Z"
        fill={PLANE}
        stroke={INK.line}
        strokeWidth={lw}
        strokeLinejoin="round"
      />
      <path d="M 0 -213 C 12 -211 18 -198 18 -184 L -18 -184 C -18 -198 -12 -211 0 -213 Z" fill={GLASS} stroke={INK.line} strokeWidth={lw * 0.6} />
      <path d="M -16 -168 L 16 -168 L 13 -146 L -13 -146 Z" fill={GLASS} stroke={INK.line} strokeWidth={lw * 0.6} />
      <circle cx={0} cy={-112} r={11} fill={GLASS} stroke={INK.line} strokeWidth={lw * 0.6} />
      <circle cx={0} cy={70} r={10} fill={GLASS} stroke={INK.line} strokeWidth={lw * 0.6} />
      {[-128, -40, 30, 110].map((y) => (
        <line key={y} x1={-25} y1={y} x2={25} y2={y} stroke={PLANE_DARK} strokeWidth={lw * 0.5} />
      ))}
      {/* Đuôi đứng (nhìn từ trên là một gờ mảnh) */}
      <path d="M -4 132 L 4 132 L 5 210 L -5 210 Z" fill={PLANE_DARK} stroke={INK.line} strokeWidth={lw * 0.7} />
      {/* Vết đạn */}
      {shown > 0.01 ? (
        <g opacity={1 - dim * 0.6}>
          {list.map((h, k) => {
            const p = clamp01((shown - k) / 3);
            if (p <= 0.01) return null;
            const s = p < 1 ? 1 + Math.sin(p * Math.PI) * 0.5 : 1;
            return (
              <g key={k}>
                <circle cx={h.x} cy={h.y} r={dotR * 1.25 * s} fill="#6E1810" opacity={p} />
                <circle cx={h.x} cy={h.y} r={dotR * s} fill={INK.red} opacity={p} />
                <circle cx={h.x - dotR * 0.3} cy={h.y - dotR * 0.3} r={dotR * 0.3} fill="#FF9A8A" opacity={p} />
              </g>
            );
          })}
        </g>
      ) : null}
    </g>
  );
};

/** Vết đạn của máy bay nhìn ngang (thân và cánh, không ở động cơ). */
const SIDE_HOLES = (() => {
  const r = seeded(3);
  const out: { x: number; y: number }[] = [];
  while (out.length < 18) {
    const x = -116 + r() * 250;
    const y = -16 + r() * 26;
    if (x > -96 && x < -4 && y > -6) continue;
    out.push({ x, y });
  }
  return out;
})();

/**
 * Máy bay ném bom nhìn ngang, mũi hướng sang trái (gốc: giữa thân; bánh xe chạm đất ở y = 64 khi `gear`).
 * `holes` 0..1 vết đạn trên thân / cánh, `engineHit` chấm đỏ ở động cơ, `ghost` = chỉ còn bóng mờ nét đứt.
 */
const SideBomber: React.FC<{ frame: number; holes?: number; engineHit?: number; gear?: boolean; ghost?: boolean; lw?: number }> = ({
  frame,
  holes = 0,
  engineHit = 0,
  gear = false,
  ghost = false,
  lw = 4,
}) => {
  const body = ghost ? "rgba(59,38,20,0.12)" : PLANE;
  const dark = ghost ? "rgba(59,38,20,0.12)" : PLANE_DARK;
  const glass = ghost ? "none" : GLASS;
  const st = { stroke: INK.line, strokeWidth: lw, strokeLinejoin: "round" as const, strokeDasharray: ghost ? `${lw * 3} ${lw * 2}` : undefined };
  const L = 26 * Math.abs(Math.cos(frame * 0.9));
  const shown = holes * SIDE_HOLES.length;
  return (
    <g>
      {gear && !ghost ? (
        <g>
          <line x1={-50} y1={12} x2={-50} y2={48} stroke={INK.line} strokeWidth={lw * 1.4} />
          <circle cx={-50} cy={50} r={14} fill="#2B2B2B" stroke={INK.line} strokeWidth={lw * 0.8} />
          <circle cx={-50} cy={50} r={5} fill="#CFCFCF" />
          <line x1={146} y1={8} x2={146} y2={22} stroke={INK.line} strokeWidth={lw} />
          <circle cx={146} cy={24} r={7} fill="#2B2B2B" stroke={INK.line} strokeWidth={lw * 0.6} />
        </g>
      ) : null}
      {/* Đuôi đứng, động cơ phía xa */}
      <path d="M 94 -17 L 126 -80 Q 132 -86 146 -86 L 156 -86 Q 162 -84 161 -74 L 160 -12 Z" fill={body} {...st} />
      <path d="M 112 -40 L 132 -78" stroke={dark} strokeWidth={lw * 0.5} />
      <rect x={-74} y={-16} width={60} height={14} rx={7} fill={dark} {...st} />
      {/* Thân */}
      <path d="M -150 -2 C -150 -18 -138 -25 -118 -26 L 100 -18 L 160 -14 L 161 -2 L 104 8 L -118 17 C -140 16 -150 10 -150 -2 Z" fill={body} {...st} />
      <path d="M -150 -2 C -150 -14 -144 -20 -132 -22 L -128 -2 Z" fill={glass} {...st} strokeWidth={lw * 0.6} />
      <path d="M -112 -26 L -98 -36 L -76 -36 L -70 -24 Z" fill={glass} {...st} strokeWidth={lw * 0.6} />
      <path d="M -50 -24 A 10 10 0 0 1 -30 -24 Z" fill={glass} {...st} strokeWidth={lw * 0.6} />
      {[20, 46].map((x) => (
        <rect key={x} x={x} y={-12} width={12} height={9} rx={2} fill={glass} {...st} strokeWidth={lw * 0.5} />
      ))}
      <ellipse cx={136} cy={-6} rx={30} ry={5} fill={dark} {...st} strokeWidth={lw * 0.7} />
      {/* Cánh (mặt cắt) và động cơ phía gần */}
      <path d="M -82 -4 Q -76 -10 -20 -8 L 34 -5 Q 38 -2 32 1 L -78 2 Q -84 0 -82 -4 Z" fill={dark} {...st} />
      <rect x={-86} y={-2} width={74} height={16} rx={8} fill={body} {...st} />
      <rect x={-86} y={-2} width={16} height={16} rx={6} fill={dark} {...st} strokeWidth={lw * 0.6} />
      {ghost ? null : (
        <g>
          <ellipse cx={-90} cy={6} rx={3} ry={30} fill="rgba(59,38,20,0.15)" />
          <line x1={-90} y1={6 - L} x2={-90} y2={6 + L} stroke={INK.line} strokeWidth={lw} strokeLinecap="round" />
        </g>
      )}
      {engineHit > 0.01 ? <circle cx={-52} cy={6} r={7} fill={INK.red} stroke="#6E1810" strokeWidth={2} opacity={engineHit} /> : null}
      {shown > 0.01
        ? SIDE_HOLES.map((h, k) => {
            const p = clamp01((shown - k) / 2);
            return p > 0.01 ? <circle key={k} cx={h.x} cy={h.y} r={4.5 * p} fill={INK.red} stroke="#6E1810" strokeWidth={1.5} /> : null;
          })
        : null}
    </g>
  );
};

/** Nhãn chữ to trên nền giấy (một hoặc hai dòng), bật ra. */
const Label: React.FC<{ x: number; y: number; w: number; lines: string[]; p: number; size?: number; color?: string }> = ({ x, y, w, lines, p, size = 38, color = INK.red }) => {
  const h = lines.length * size * 1.18 + 26;
  return (
    <Pop p={p} cx={x} cy={y}>
      <rect x={x - w / 2 + 5} y={y - h / 2 + 7} width={w} height={h} rx={16} fill="rgba(59,38,20,0.25)" />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={16} fill="#FFF6DD" stroke={color} strokeWidth={5} />
      {lines.map((l, i) => (
        <text key={l} x={x} y={y - h / 2 + 13 + size * 1.18 * (i + 1) - size * 0.28} textAnchor="middle" fill={color} fontSize={size} {...T}>
          {l}
        </text>
      ))}
    </Pop>
  );
};

/** Mũi tên thẳng vẽ dần, đầu mũi tên đặc. */
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p: number; color?: string; w?: number }> = ({ x1, y1, x2, y2, p, color = INK.red, w = 9 }) => {
  if (p <= 0.01) return null;
  const a = Math.atan2(y2 - y1, x2 - x1);
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;
  const hl = w * 2.6;
  return (
    <g>
      <line x1={x1} y1={y1} x2={ex - Math.cos(a) * hl * 0.6} y2={ey - Math.sin(a) * hl * 0.6} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path
        d={`M ${ex} ${ey} L ${ex - hl * Math.cos(a - 0.5)} ${ey - hl * Math.sin(a - 0.5)} L ${ex - hl * Math.cos(a + 0.5)} ${ey - hl * Math.sin(a + 0.5)} Z`}
        fill={color}
        stroke={INK.line}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </g>
  );
};

/** Chân dung khắc gỗ nhà thống kê Abraham Wald (khung bầu dục, nét gạch kiểu tranh khắc). */
const WaldPortrait: React.FC<{ x: number; y: number; p: number; frame: number }> = ({ x, y, p, frame }) => {
  const C = "#3B2614";
  const blink = frame % 97 < 4 ? 0.2 : 1;
  return (
    <Pop p={p} cx={x} cy={y}>
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx={6} cy={10} rx={86} ry={100} fill="rgba(59,38,20,0.25)" />
        <ellipse cx={0} cy={0} rx={86} ry={100} fill="#6E4423" stroke={INK.line} strokeWidth={5} />
        <ellipse cx={0} cy={0} rx={72} ry={86} fill="#EBD8AE" stroke={INK.line} strokeWidth={3} />
        <clipPath id="wald-clip">
          <ellipse cx={0} cy={0} rx={72} ry={86} />
        </clipPath>
        <g clipPath="url(#wald-clip)">
          <rect x={-72} y={-86} width={144} height={172} fill="url(#hatch)" opacity={0.35} />
          {/* Vai áo vest, cổ áo, cà vạt */}
          <path d="M -80 90 Q -72 38 -30 28 L 30 28 Q 72 38 80 90 Z" fill="#4A3424" stroke={C} strokeWidth={3} />
          <path d="M -22 28 L 0 58 L 22 28 Z" fill="#F7EEDB" stroke={C} strokeWidth={2.5} />
          <path d="M -5 34 L 5 34 L 8 70 L 0 80 L -8 70 Z" fill="#8C2F22" stroke={C} strokeWidth={2} />
          {[-56, -46, 46, 56].map((lx) => (
            <line key={lx} x1={lx} y1={52} x2={lx + (lx < 0 ? 10 : -10)} y2={86} stroke="#2B1A0E" strokeWidth={2} />
          ))}
          {/* Cổ và đầu */}
          <rect x={-13} y={10} width={26} height={24} fill="#DDBB8C" stroke={C} strokeWidth={2.5} />
          <ellipse cx={0} cy={-18} rx={36} ry={44} fill="#E7C89C" stroke={C} strokeWidth={3} />
          <ellipse cx={-36} cy={-14} rx={6} ry={11} fill="#DDBB8C" stroke={C} strokeWidth={2.5} />
          <ellipse cx={36} cy={-14} rx={6} ry={11} fill="#DDBB8C" stroke={C} strokeWidth={2.5} />
          {/* Tóc chải ngược, trán cao */}
          <path d="M -36 -26 Q -40 -62 -6 -66 Q 30 -68 38 -34 Q 30 -52 6 -54 Q -22 -54 -36 -26 Z" fill="#2E2014" stroke={C} strokeWidth={2.5} />
          {[-18, -6, 8, 20].map((hx) => (
            <path key={hx} d={`M ${hx - 6} -58 Q ${hx} -64 ${hx + 8} -58`} fill="none" stroke="#6B5038" strokeWidth={1.6} />
          ))}
          {/* Nét mặt: lông mày, mắt, mũi, miệng, gạch bóng má */}
          <path d="M -24 -26 Q -15 -31 -6 -27 M 6 -27 Q 15 -31 24 -26" fill="none" stroke={C} strokeWidth={3.5} strokeLinecap="round" />
          <ellipse cx={-14} cy={-16} rx={4} ry={4 * blink} fill={C} />
          <ellipse cx={14} cy={-16} rx={4} ry={4 * blink} fill={C} />
          <path d="M 2 -12 Q 7 2 -1 6" fill="none" stroke={C} strokeWidth={2.5} strokeLinecap="round" />
          <path d="M -11 14 Q 0 19 11 14" fill="none" stroke={C} strokeWidth={3} strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={24 + i * 3} y1={-4 + i * 5} x2={30 + i * 2} y2={0 + i * 5} stroke="#B08A5E" strokeWidth={1.6} />
          ))}
        </g>
        <ellipse cx={0} cy={0} rx={72} ry={86} fill="none" stroke={INK.line} strokeWidth={3} />
      </g>
    </Pop>
  );
};

/** Đám mây giấy. */
const Puff: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.9}>
    <path d="M -60 10 Q -64 -14 -38 -14 Q -30 -36 -4 -30 Q 14 -46 36 -28 Q 64 -30 62 -4 Q 74 12 52 16 L -50 16 Q -66 16 -60 10 Z" fill="#FFFDF5" stroke="rgba(59,38,20,0.35)" strokeWidth={3} />
  </g>
);

/** Đội hình câu 4: máy bay nhìn ngang bay sang trái; `hit` = khung trúng đạn ở động cơ (null = bay về được). */
const FLEET = [
  { x: 300, y: 250, hit: null },
  { x: 610, y: 210, hit: 10 },
  { x: 430, y: 410, hit: null },
  { x: 740, y: 360, hit: 18 },
  { x: 600, y: 560, hit: 26 },
] as const;
const FLEET_S = 0.55;

/** Vị trí và góc của máy bay số `k` tại khung `t` của câu 4. */
const fleetAt = (k: number, t: number) => {
  const f = FLEET[k];
  const base = { x: f.x - t * 0.6, y: f.y + wave(t, 0.08, 4, k) };
  if (f.hit === null || t < f.hit) return { ...base, rot: 0, s: FLEET_S };
  const u = clamp01((t - f.hit - 4) / 48);
  return {
    x: base.x - 90 * u,
    y: base.y + 620 * u * u,
    rot: -14 * clamp01((t - f.hit) / 8) - 44 * u,
    s: FLEET_S * (1 - 0.25 * u),
  };
};

/** Điểm động cơ (toạ độ cảnh) của máy bay đang ở `pos`. */
const enginePt = (pos: { x: number; y: number; rot: number; s: number }) => {
  const a = (pos.rot * Math.PI) / 180;
  const lx = -52 * pos.s;
  const ly = 6 * pos.s;
  return { x: pos.x + lx * Math.cos(a) - ly * Math.sin(a), y: pos.y + lx * Math.sin(a) + ly * Math.cos(a) };
};

/** Tia lửa khi trúng đạn. */
const Burst: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => {
  if (p <= 0.01 || p >= 0.99) return null;
  const r = 10 + p * 34;
  const pts = Array.from({ length: 16 }, (_, i) => {
    const rr = i % 2 === 0 ? r : r * 0.45;
    const a = (i / 16) * Math.PI * 2;
    return `${x + Math.cos(a) * rr} ${y + Math.sin(a) * rr}`;
  }).join(" L ");
  return <path d={`M ${pts} Z`} fill="#FFC93C" stroke={INK.red} strokeWidth={3} opacity={1 - p} />;
};

/** Máy bay trong phễu câu 5: lệch ngang ở miệng phễu, có về được không, chỗ đậu ở hàng dưới. */
const SIEVE = [
  { off: -70, ok: true, slot: 0 },
  { off: 60, ok: false, slot: -1 },
  { off: -20, ok: true, slot: 1 },
  { off: 80, ok: true, slot: 2 },
  { off: -86, ok: false, slot: -1 },
  { off: 26, ok: true, slot: 3 },
];
const FUNNEL = { x: 692, rim: 334, neck: 500, spout: 540, row: 690 };
const MINI_S = 0.21;

/** Ti vi gỗ cổ chiếu trường quay thu nhỏ (câu 5, nửa trái). */
const RetroTV: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <g>
    <line x1={240} y1={298} x2={196} y2={236} stroke={INK.line} strokeWidth={5} strokeLinecap="round" />
    <line x1={300} y1={298} x2={350} y2={240} stroke={INK.line} strokeWidth={5} strokeLinecap="round" />
    <circle cx={196} cy={236} r={7} fill={INK.line} />
    <circle cx={350} cy={240} r={7} fill={INK.line} />
    <path d="M 120 704 L 104 774 M 430 704 L 446 774" stroke={INK.woodDark} strokeWidth={14} strokeLinecap="round" />
    <rect x={84} y={296} width={384} height={412} rx={26} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
    <rect x={100} y={312} width={352} height={292} rx={18} fill="#1E1410" stroke={INK.line} strokeWidth={4} />
    <clipPath id="tv-clip">
      <rect x={106} y={318} width={340} height={280} rx={14} />
    </clipPath>
    <g clipPath="url(#tv-clip)">{children}</g>
    <rect x={106} y={318} width={340} height={280} rx={14} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={6} />
    {[150, 210].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy={656} r={20} fill={INK.woodDark} stroke={INK.line} strokeWidth={4} />
        <line x1={cx} y1={656} x2={cx + 10} y2={642} stroke="#F4E4C1" strokeWidth={4} strokeLinecap="round" />
      </g>
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1={272 + i * 30} y1={636} x2={272 + i * 30} y2={680} stroke={INK.woodDark} strokeWidth={8} strokeLinecap="round" />
    ))}
  </g>
);

const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  // Lớp cảnh của từng câu (hoà cảnh ~14 khung giữa hai câu).
  const air = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const top = li === 1 ? ease(lf, 0, 14) : li === 2 ? 1 : li === 3 ? 1 - ease(lf, 0, 14) : 0;
  const sky = li === 3 ? ease(lf, 0, 14) : li === 4 ? 1 - ease(lf, 0, 14) : 0;
  const split = li === 4 ? ease(lf, 0, 14) : li === 5 ? 1 - ease(lf, 0, 16) : 0;
  const studio = li === 5 ? ease(lf, 0, 16) : 0;

  // Câu 2–3: máy bay nhìn từ trên.
  const PX = 470;
  const PY = 455;
  const ps = li === 1 ? 1 + 0.12 * ease(lf, 0, 22) : 1.12;
  const holes = li === 1 ? interpolate(lf, [8, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : li >= 2 ? 1 : 0;
  const rings = li === 1 ? ease(lf, 46, 10) : li >= 2 ? 1 : 0;
  const armor = ENG_X.map((_, k) => (li === 2 ? pop(lf, fps, 34 + k * 4) : li > 2 ? 1 : 0));
  const engScreen = ENG_X.map((ex) => ({ x: PX + ex * 1.12, y: PY + (wingLE(Math.abs(ex)) - 52) * 1.12 }));
  const askP = li === 1 ? pop(lf, fps, 56) : li === 2 ? 1 : 0;
  const askOut = li === 2 ? ease(lf, 14, 14) : 0;
  const strike = li === 2 ? ease(lf, 4, 10) : 0;

  // Câu 1: sân bay dã chiến, máy bay hạ cánh lần lượt.
  const landing = [0, 1].map((k) => {
    const u = ((lf + 20 + k * 36) % 72) / 72;
    return { u, x: interpolate(u, [0, 1], [930, 400]), y: interpolate(u, [0, 0.8, 1], [190, 520, 528]), s: interpolate(u, [0, 1], [0.42, 0.3]) };
  });
  const walk1 = li === 0 ? ease(lf, 0, 34) : 1;

  // Câu 6: Milo đi tới cửa người dẫn chừa lại.
  const walk = li === 5 ? ease(lf, 8, 44) : 0;
  const pose =
    li === 5
      ? walk < 1
        ? { pose: "idle" as Pose, prevPose: "point" as Pose, poseT: ease(lf, 0, 12) }
        : { pose: "touch" as Pose, prevPose: "idle" as Pose, poseT: ease(lf, 52, 12) }
      : li === 0
        ? poseAt(lf, 36, "idle", "point")
        : { pose: "point" as Pose };

  return (
    <g>
      {/* ---------- Câu 1: sân bay dã chiến thời Thế chiến II */}
      {air > 0.01 ? (
        <g opacity={air}>
          <rect x={60} y={125} width={850} height={415} fill="rgba(255,236,190,0.45)" />
          <path d="M 60 540 L 60 506 Q 160 486 250 500 Q 360 476 470 498 Q 600 480 720 500 Q 830 486 910 502 L 910 540 Z" fill="rgba(110,68,35,0.28)" />
          <rect x={60} y={540} width={850} height={240} fill="rgba(154,100,53,0.18)" />
          <path d="M 520 540 L 600 540 L 900 780 L 600 780 Z" fill="rgba(59,38,20,0.18)" />
          {[0, 1, 2, 3].map((i) => {
            const a = i / 4;
            const b = a + 0.12;
            return <line key={i} x1={560 + (750 - 560) * a * a} y1={540 + 240 * a * a} x2={560 + (750 - 560) * b * b} y2={540 + 240 * b * b} stroke="#FFF6DD" strokeWidth={4 + 6 * a} strokeLinecap="round" />;
          })}
          {/* Nhà chứa máy bay mái vòm và tháp canh */}
          <path d="M 86 560 L 86 520 Q 86 420 196 420 Q 306 420 306 520 L 306 560 Z" fill="#B99A6E" stroke={INK.line} strokeWidth={4} />
          {[120, 150, 180, 210, 240, 270].map((x) => (
            <path key={x} d={`M ${x} 560 L ${x} ${520 - Math.sqrt(Math.max(0, 110 * 110 - (x - 196) * (x - 196))) * 0.86 + 6}`} stroke="rgba(59,38,20,0.35)" strokeWidth={2.5} />
          ))}
          <rect x={150} y={490} width={92} height={70} fill="#3B2F22" stroke={INK.line} strokeWidth={3} />
          <rect x={420} y={420} width={50} height={120} fill="#C9AE84" stroke={INK.line} strokeWidth={4} />
          <rect x={406} y={392} width={78} height={34} rx={4} fill={GLASS} stroke={INK.line} strokeWidth={4} />
          <path d="M 400 392 L 490 392 L 476 378 L 414 378 Z" fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
          {/* Máy bay trở về hạ cánh */}
          {landing.map((l, k) => (
            <g key={k} opacity={clamp01(l.u * 8) * clamp01((1 - l.u) * 6)}>
              <g transform={`translate(${l.x} ${l.y}) rotate(${interpolate(l.u, [0, 0.8, 1], [-7, -4, 0])}) scale(${l.s})`}>
                <SideBomber frame={frame} gear={l.u > 0.5} lw={7} />
              </g>
            </g>
          ))}
          {/* Chiếc máy bay vừa về, đậu trên sân: Milo đếm vết đạn */}
          <g transform="translate(330 686) scale(1.2)">
            <SideBomber frame={frame} gear holes={li === 0 ? interpolate(lf, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1} />
          </g>
          <Stamp x={268} y={196} text="THẾ CHIẾN II" p={li === 0 ? ease(lf, 6, 10) : 1} size={46} rot={-6} />
        </g>
      ) : null}

      {/* ---------- Câu 2–3: máy bay nhìn từ trên xuống */}
      {top > 0.01 ? (
        <g opacity={top}>
          <rect x={60} y={125} width={850} height={655} fill="rgba(255,246,221,0.35)" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`v${i}`} x1={120 + i * 105} y1={140} x2={120 + i * 105} y2={770} stroke="rgba(29,106,140,0.12)" strokeWidth={2} />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1={70} y1={170 + i * 110} x2={900} y2={170 + i * 110} stroke="rgba(29,106,140,0.12)" strokeWidth={2} />
          ))}
          <ellipse cx={PX + 14} cy={PY + 22} rx={330 * ps} ry={210 * ps} fill="rgba(59,38,20,0.08)" />
          <g transform={`translate(${PX} ${PY}) scale(${ps})`}>
            <Bomber frame={frame} holes={holes} dim={li === 2 ? ease(lf, 10, 16) : 0} rings={rings} armor={armor} lw={4} />
          </g>
          {/* Câu 2: ai cũng nghĩ bọc giáp chỗ nhiều lỗ */}
          {askP > 0.01 && askOut < 0.99 ? (
            <g opacity={1 - askOut}>
              <Arrow x1={606} y1={708} x2={500} y2={596} p={li === 1 ? ease(lf, 58, 8) : 1} color={INK.blue} w={8} />
              <Label x={712} y={740} w={360} lines={["BỌC GIÁP Ở ĐÂY?"]} p={askP} size={34} color={INK.blue} />
              <DrawLine p={strike} x1={548} y1={742} x2={876} y2={736} stroke={INK.red} strokeWidth={8} strokeLinecap="round" />
            </g>
          ) : null}
          {/* Câu 3: Wald nói ngược, mũi tên đổi chiều sang động cơ */}
          {li >= 2 ? (
            <g>
              <WaldPortrait x={218} y={598} p={li === 2 ? pop(lf, fps, 0) : 1} frame={frame} />
              <Fade p={li === 2 ? ease(lf, 8, 10) : 1} dy={8}>
                <rect x={70} y={694} width={296} height={52} rx={10} fill={INK.woodDark} stroke={INK.line} strokeWidth={4} />
                <text x={218} y={729} textAnchor="middle" fill="#FFF6DD" fontSize={28} {...T}>
                  ABRAHAM WALD
                </text>
              </Fade>
              {engScreen.map((e, k) => (
                <Arrow key={k} x1={e.x} y1={e.y - 74} x2={e.x} y2={e.y - 6} p={li === 2 ? ease(lf, 18 + k * 4, 10) : 1} w={9} />
              ))}
              <Label x={650} y={200} w={440} lines={["BỌC GIÁP CHỖ", "KHÔNG CÓ LỖ THỦNG"]} p={li === 2 ? pop(lf, fps, 26) : 1} size={36} />
            </g>
          ) : null}
        </g>
      ) : null}

      {/* ---------- Câu 4: những chiếc trúng đạn ở động cơ không trở về */}
      {sky > 0.01 ? (
        <g opacity={sky}>
          <rect x={60} y={125} width={850} height={655} fill="url(#monty-sky)" />
          {[
            [160, 330, 1],
            [520, 160, 0.8],
            [820, 470, 1.1],
            [300, 640, 0.9],
          ].map(([cx, cy, s], i) => (
            <Puff key={i} x={((cx + frame * 0.9 + 60) % 980) - 40} y={cy} s={s} />
          ))}
          {FLEET.map((f, k) => {
            const t = li === 3 ? lf : 99;
            const pos = fleetAt(k, t);
            const hit = f.hit;
            const flying = hit === null || t < hit;
            return (
              <g key={k}>
                {/* Bóng ma chiếc đã rơi: chấm đỏ ở động cơ mà không ai đếm */}
                {hit !== null ? (
                  <g opacity={li === 3 ? ease(lf, hit + 22, 14) : 1}>
                    <g transform={`translate(${f.x - hit * 0.6} ${f.y}) scale(${FLEET_S})`}>
                      <SideBomber frame={frame} ghost lw={6} engineHit={0.45 + 0.2 * Math.sin(frame * 0.15 + k)} />
                    </g>
                  </g>
                ) : null}
                {/* Khói từ động cơ */}
                {!flying && hit !== null
                  ? Array.from({ length: 12 }, (_, i) => {
                      const tau = t - i * 3;
                      if (tau < hit) return null;
                      const e = enginePt(fleetAt(k, tau));
                      return <circle key={i} cx={e.x + i * 6} cy={e.y - i * 2} r={7 + i * 2.2} fill={SMOKE} opacity={0.5 * (1 - i / 12)} />;
                    })
                  : null}
                <g transform={`translate(${pos.x} ${pos.y}) rotate(${pos.rot}) scale(${pos.s})`}>
                  <SideBomber frame={frame} holes={hit === null ? 1 : 0} engineHit={hit !== null && t >= hit ? 1 : 0} lw={6} />
                </g>
                {hit !== null ? <Burst {...enginePt(fleetAt(k, hit))} p={clamp01((t - hit) / 10)} /> : null}
              </g>
            );
          })}
          <Stamp x={485} y={700} text="KHÔNG AI ĐẾM ĐƯỢC" p={li === 3 ? ease(lf, 50, 8) : 1} size={44} rot={-5} />
        </g>
      ) : null}

      {/* ---------- Câu 5: người dẫn chọn cửa để mở = chiến tranh chọn máy bay được đếm */}
      {split > 0.01 ? (
        <g opacity={split}>
          <RetroTV>
            <g transform="translate(106 318) scale(0.4) translate(-60 -92)">
              <rect x={60} y={92} width={850} height={700} fill="#F4E4C1" />
              <Studio frame={frame} />
              {[0, 1, 2].map((i) => (
                <Door key={i} i={i} frame={frame} behind={BEHIND[i]} open={i === 2 ? (li === 4 ? ease(lf, 14, 16) : 1) : 0} />
              ))}
              <g transform={`translate(${2 * HOST_X} 0) scale(-1 1)`}>
                <Host x={HOST_X} frame={frame} invite={li === 4 ? ease(lf, 6, 12) : 1} />
              </g>
            </g>
          </RetroTV>
          {/* Phễu lọc máy bay trở về */}
          <path
            d={`M ${FUNNEL.x - 136} ${FUNNEL.rim} L ${FUNNEL.x - 22} ${FUNNEL.neck} L ${FUNNEL.x - 16} ${FUNNEL.spout} L ${FUNNEL.x + 16} ${FUNNEL.spout} L ${FUNNEL.x + 22} ${FUNNEL.neck} L ${FUNNEL.x + 136} ${FUNNEL.rim} Z`}
            fill="#D9B27A"
            stroke={INK.line}
            strokeWidth={5}
            strokeLinejoin="round"
          />
          <path d={`M ${FUNNEL.x - 100} ${FUNNEL.rim + 30} L ${FUNNEL.x - 14} ${FUNNEL.neck}`} stroke="rgba(255,246,221,0.6)" strokeWidth={8} strokeLinecap="round" />
          <ellipse cx={FUNNEL.x} cy={FUNNEL.rim} rx={136} ry={22} fill="#8A6A3E" stroke={INK.line} strokeWidth={5} />
          <line x1={FUNNEL.x - 160} y1={FUNNEL.row + 110} x2={FUNNEL.x + 160} y2={FUNNEL.row + 110} stroke={INK.line} strokeWidth={4} strokeLinecap="round" />
          {SIEVE.map((m, i) => {
            const u = li === 4 ? clamp01((lf - (16 + i * 6)) / 26) : 1;
            if (li === 4 && lf < 16 + i * 6) return null;
            let x: number;
            let y: number;
            let rot = 180;
            let o = clamp01(u * 6);
            let s = MINI_S;
            if (m.ok) {
              const slotX = FUNNEL.x + (m.slot % 2 === 0 ? -82 : 82);
              const slotY = FUNNEL.row - 62 + Math.floor(m.slot / 2) * 118;
              if (u < 0.6) {
                const v = u / 0.6;
                x = FUNNEL.x + m.off * (1 - v);
                y = interpolate(v, [0, 1], [280, FUNNEL.neck]);
                s = MINI_S * (1 - 0.25 * v);
              } else {
                const v = Easing.inOut(Easing.cubic)((u - 0.6) / 0.4);
                x = interpolate(v, [0, 1], [FUNNEL.x, slotX]);
                y = interpolate(v, [0, 1], [FUNNEL.neck, slotY]);
                s = MINI_S * (0.75 + 0.25 * v);
                rot = 180 + 180 * v;
              }
            } else {
              const v = clamp01(u / 0.45);
              const w = clamp01((u - 0.45) / 0.55);
              x = FUNNEL.x + m.off * (1 - 0.3 * v) + Math.sign(m.off) * 150 * w;
              y = interpolate(v, [0, 1], [280, FUNNEL.rim + 6]) + 220 * w * w;
              rot = 180 + Math.sign(m.off) * 220 * w;
              s = MINI_S * (1 - 0.5 * w);
              o = o * (1 - w);
            }
            return (
              <g key={i} opacity={o}>
                {!m.ok && u > 0.45
                  ? [0, 1, 2].map((j) => <circle key={j} cx={x - Math.sign(m.off) * j * 16} cy={y - j * 18} r={8 + j * 4} fill={SMOKE} opacity={0.45 - j * 0.12} />)
                  : null}
                <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
                  <Bomber frame={frame} holes={m.ok ? 1 : 0} few dotR={20} engineHit={m.ok ? 0 : 1} lw={22} />
                </g>
              </g>
            );
          })}
          <Pop p={li === 4 ? pop(lf, fps, 30) : 1} cx={485} cy={460}>
            <circle cx={485} cy={460} r={34} fill="#FFF6DD" stroke={INK.gold} strokeWidth={5} />
            <text x={485} y={480} textAnchor="middle" fill={INK.gold} fontSize={56} {...T}>
              =
            </text>
          </Pop>
          <Stamp x={485} y={196} text="ĐÃ QUA CHỌN LỌC" p={li === 4 ? ease(lf, 56, 8) : 1} size={46} rot={-4} />
        </g>
      ) : null}

      {/* ---------- Câu 6: về lại trường quay, cửa người dẫn chừa lại sáng vàng */}
      {studio > 0.01 ? (
        <g opacity={studio}>
          <Studio frame={frame} />
          {[0, 1, 2].map((i) => (
            <Door key={i} i={i} frame={frame} behind={BEHIND[i]} open={i === 2 ? 1 : 0} glow={i === 1 ? ease(lf, 4, 20) : 0} />
          ))}
        </g>
      ) : null}

      {li === 0 || li === 5 || air > 0.01 ? (
        <g opacity={li === 5 ? studio : air}>
          <Stickman
            x={li === 5 ? 528 : 780}
            y={GROUND}
            scale={li === 5 ? 1 : 0.9}
            enter={li === 5 ? walk : walk1}
            from={li === 5 ? 302 : 260}
            {...pose}
          />
        </g>
      ) : null}
    </g>
  );
};

const MONTY: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const MontyScene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = MONTY[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient bầu trời cho cảnh máy bay bị bắn rơi (đặt trong <defs> của khung SVG cảnh). */
export const MontyDefs: React.FC = () => (
  <linearGradient id="monty-sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#CFE0E0" />
    <stop offset="100%" stopColor="#F4E4C1" />
  </linearGradient>
);
