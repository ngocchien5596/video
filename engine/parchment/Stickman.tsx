import React from "react";
import { useCurrentFrame } from "remotion";
import { TEXT_FONT } from "../components/brand.ts";

export type Pose = "idle" | "think" | "point" | "pointR" | "eureka" | "aimL" | "scratch" | "present" | "touch" | "wave";

export type StickmanProps = {
  x: number;
  y: number;
  scale?: number;
  role?: "ancient" | "ranger" | "worker" | "sailor" | "scholar";
  pose?: Pose;
  /** Tư thế trước đó: chuyển dần từ `prevPose` sang `pose` theo `poseT` (0 → 1), không bật tức thì. */
  prevPose?: Pose;
  poseT?: number;
  badge?: string;
  /** Độ hiện của bong bóng chữ trên đầu (0 → 1, dùng lò xo để bật ra). */
  badgeP?: number;
  /** Tiến độ đi vào cảnh 0 → 1 (mặc định 1 = đã đứng yên tại chỗ). Đang đi thì bước chân theo quãng đường. */
  enter?: number;
  /** Đi vào từ cách vị trí đứng bao nhiêu px (âm = từ bên trái). Mặc định 320 (từ bên phải). */
  from?: number;
  /** Đang kể / hào hứng: miệng mấp máy, tay đung đưa nhẹ. Mặc định true. */
  lively?: boolean;
  /** Phụ kiện đổi vai: nơ người dẫn chương trình, áo phao nhà thám hiểm biển. */
  accessory?: "bowtie" | "lifevest";
};

/** Hệ số phóng to chung: Milo ở scale 1 cao ~390 px, đầu ~115 px (chuẩn: đầu ≥ 110 px trong cảnh toàn). */
const BASE = 1.32;

const OUTLINE = "#2B1A0E";
const SKIN = "#EBB892";
const SKIN_SHADOW = "#D69B72";
const HAIR = "#5A3520";
const HAIR_LIGHT = "#7D4E2C";
const SHIRT = "#7FA3C8";
const SHIRT_DARK = "#5F84AA";
const VEST = "#6B7346";
const VEST_DARK = "#525934";
const PANTS = "#C2A682";
const PANTS_DARK = "#A88B66";
const CUFF = "#DCC7A6";
const BOOT = "#6E4326";
const LEATHER = "#5E361B";
const BRASS = "#E0AD46";

type Hand = "fist" | "open" | "point";
type Arm = { x: number; y: number; bend: 1 | -1; hand: Hand };
type Face = {
  browY: number;
  browTilt: number;
  eye: number;
  mouthW: number;
  curve: number;
  open: number;
  lookX: number;
  lookY: number;
  tilt: number;
};
type PoseSpec = { R: Arm; L: Arm; face: Face; ruler?: boolean };

const RELAX_R: Arm = { x: 38, y: -98, bend: -1, hand: "fist" };
const RELAX_L: Arm = { x: -38, y: -98, bend: 1, hand: "fist" };
const HIP_R: Arm = { x: 50, y: -112, bend: -1, hand: "fist" };

const FACE: Face = { browY: 0, browTilt: 0, eye: 1, mouthW: 12, curve: 7, open: 0.1, lookX: -0.3, lookY: 0, tilt: 0 };

/** Tư thế = vị trí bàn tay (khớp vai – khuỷu – cổ tay tự tính) + nét mặt. Tay "L" là tay phía trái khung hình. */
const POSES: Record<Pose, PoseSpec> = {
  idle: { R: RELAX_R, L: RELAX_L, face: FACE },
  point: {
    R: HIP_R,
    L: { x: -92, y: -192, bend: -1, hand: "point" },
    face: { ...FACE, browY: -3, browTilt: 2, eye: 1.05, mouthW: 13, curve: 8, open: 0.4, lookX: -0.9, lookY: -0.3 },
  },
  pointR: {
    R: { x: 92, y: -192, bend: 1, hand: "point" },
    L: RELAX_L,
    face: { ...FACE, browY: -3, browTilt: 2, eye: 1.05, mouthW: 13, curve: 8, open: 0.4, lookX: 0.9, lookY: -0.3 },
  },
  think: {
    R: { x: 10, y: -184, bend: -1, hand: "fist" },
    L: { x: -50, y: -112, bend: 1, hand: "fist" },
    face: { ...FACE, browY: 2, browTilt: -4, eye: 0.85, mouthW: 8, curve: -1, open: 0, lookX: 0.6, lookY: -0.9, tilt: -6 },
  },
  eureka: {
    R: { x: 56, y: -224, bend: 1, hand: "open" },
    L: { x: -56, y: -224, bend: -1, hand: "open" },
    face: { ...FACE, browY: -8, browTilt: 3, eye: 1.25, mouthW: 15, curve: 10, open: 1, lookX: 0, lookY: -0.2, tilt: 3 },
  },
  aimL: {
    R: { x: 58, y: -204, bend: 1, hand: "fist" },
    L: RELAX_L,
    face: { ...FACE, eye: 0.9, browTilt: -2, mouthW: 9, curve: 3, open: 0, lookX: 1, lookY: -0.4 },
    ruler: true,
  },
  scratch: {
    R: { x: 40, y: -232, bend: 1, hand: "open" },
    L: RELAX_L,
    face: { ...FACE, browY: -2, browTilt: 5, eye: 1, mouthW: 9, curve: -2, open: 0.2, lookX: -0.8, lookY: -0.5, tilt: 7 },
  },
  present: {
    R: RELAX_R,
    L: { x: -94, y: -134, bend: 1, hand: "open" },
    face: { ...FACE, browY: -2, eye: 1.05, curve: 8, open: 0.35, lookX: -1, lookY: 0 },
  },
  touch: {
    R: RELAX_R,
    L: { x: -96, y: -116, bend: 1, hand: "open" },
    face: { ...FACE, browY: -4, browTilt: 1, eye: 1.12, curve: 9, open: 0.2, lookX: -1, lookY: 0.1 },
  },
  wave: {
    R: { x: 72, y: -214, bend: 1, hand: "open" },
    L: RELAX_L,
    face: { ...FACE, browY: -4, eye: 1.1, mouthW: 14, curve: 10, open: 0.6, lookX: 0, lookY: 0 },
  },
};

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

type P = { x: number; y: number };

/** Khớp giữa của chi hai đoạn (IK hai xương): gốc S, đích T, độ dài a, b, chiều gập `bend`. */
const joint = (S: P, T: P, a: number, b: number, bend: number): { mid: P; end: P } => {
  let dx = T.x - S.x;
  let dy = T.y - S.y;
  let d = Math.hypot(dx, dy) || 0.001;
  const max = a + b - 0.5;
  if (d > max) {
    dx *= max / d;
    dy *= max / d;
    d = max;
  }
  const ux = dx / d;
  const uy = dy / d;
  const cosA = Math.min(1, Math.max(-1, (a * a + d * d - b * b) / (2 * a * d)));
  const ang = Math.acos(cosA) * bend;
  const vx = ux * Math.cos(ang) - uy * Math.sin(ang);
  const vy = ux * Math.sin(ang) + uy * Math.cos(ang);
  return { mid: { x: S.x + vx * a, y: S.y + vy * a }, end: { x: S.x + dx, y: S.y + dy } };
};

const UPPER = 36;
const FORE = 34;

/** Bàn tay vẽ theo hướng cẳng tay (`angle` độ): nắm tay, xoè tay, hay chỉ ngón trỏ. */
const HandShape: React.FC<{ x: number; y: number; angle: number; shape: Hand; mirror: boolean }> = ({ x, y, angle, shape, mirror }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(1 ${mirror ? -1 : 1})`}>
    {shape === "open" ? (
      <>
        {[-9, -3, 3, 9].map((o, i) => (
          <rect key={o} x={6} y={o - 3} width={i === 0 || i === 3 ? 13 : 16} height={6.5} rx={3.2} fill={SKIN} stroke={OUTLINE} strokeWidth={2.2} />
        ))}
        <ellipse cx={4} cy={0} rx={10} ry={12} fill={SKIN} stroke={OUTLINE} strokeWidth={2.6} />
        <ellipse cx={4} cy={-12} rx={4} ry={6.5} transform="rotate(-35 4 -12)" fill={SKIN} stroke={OUTLINE} strokeWidth={2.2} />
      </>
    ) : (
      <>
        {shape === "point" ? <rect x={8} y={-7} width={22} height={7} rx={3.5} fill={SKIN} stroke={OUTLINE} strokeWidth={2.4} /> : null}
        <circle cx={4} cy={0} r={11} fill={SKIN} stroke={OUTLINE} strokeWidth={2.6} />
        <path d="M 8 -5 Q 13 -1 9 4" fill="none" stroke={SKIN_SHADOW} strokeWidth={2} strokeLinecap="round" />
        <ellipse cx={2} cy={-10} rx={4.5} ry={6} transform="rotate(-50 2 -10)" fill={SKIN} stroke={OUTLINE} strokeWidth={2.2} />
      </>
    )}
  </g>
);

/** Một cánh tay: bắp tay áo sơ mi, nếp xắn tay ở khuỷu, cẳng tay da và bàn tay. */
const ArmShape: React.FC<{ S: P; E: P; W: P; hand: Hand; side: 1 | -1 }> = ({ S, E, W, hand, side }) => {
  const ang = (Math.atan2(W.y - E.y, W.x - E.x) * 180) / Math.PI;
  return (
    <g>
      <path d={`M ${S.x} ${S.y} L ${E.x} ${E.y}`} stroke={OUTLINE} strokeWidth={24} strokeLinecap="round" />
      <path d={`M ${E.x} ${E.y} L ${W.x} ${W.y}`} stroke={OUTLINE} strokeWidth={19} strokeLinecap="round" />
      <path d={`M ${E.x} ${E.y} L ${W.x} ${W.y}`} stroke={SKIN} strokeWidth={13.5} strokeLinecap="round" />
      <path d={`M ${S.x} ${S.y} L ${E.x} ${E.y}`} stroke={SHIRT} strokeWidth={18.5} strokeLinecap="round" />
      {/* Nếp xắn tay áo ở khuỷu */}
      <circle cx={E.x} cy={E.y} r={10.5} fill={CUFF} stroke={OUTLINE} strokeWidth={2.6} />
      <HandShape x={W.x} y={W.y} angle={ang} shape={hand} mirror={side < 0} />
    </g>
  );
};

/** Một chân: ống quần (đùi – gối – cẳng), gấu xắn, giày bốt có đế và dây. */
const LegShape: React.FC<{ H: P; K: P; A: P; side: 1 | -1; toe: number }> = ({ H, K, A, side, toe }) => (
  <g>
    <path d={`M ${H.x} ${H.y} L ${K.x} ${K.y} L ${A.x} ${A.y - 6}`} fill="none" stroke={OUTLINE} strokeWidth={27} strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${H.x} ${H.y} L ${K.x} ${K.y} L ${A.x} ${A.y - 6}`} fill="none" stroke={PANTS} strokeWidth={21} strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${K.x - 5 * side} ${K.y - 3} q ${4 * side} 4 ${9 * side} 2`} fill="none" stroke={PANTS_DARK} strokeWidth={2} strokeLinecap="round" />
    <g transform={`translate(${A.x} ${A.y}) rotate(${toe * side})`}>
      {/* Gấu quần xắn */}
      <rect x={-15} y={-14} width={30} height={11} rx={4} fill={CUFF} stroke={OUTLINE} strokeWidth={2.6} />
      {/* Giày bốt da: mũi giày chĩa ra ngoài */}
      <path
        d={side > 0 ? "M -12 -4 L 10 -4 Q 26 -2 26 10 L -13 10 Z" : "M 12 -4 L -10 -4 Q -26 -2 -26 10 L 13 10 Z"}
        fill={BOOT}
        stroke={OUTLINE}
        strokeWidth={2.8}
        strokeLinejoin="round"
      />
      <rect x={side > 0 ? -14 : -27} y={8} width={41} height={6} rx={2.5} fill="#361F10" stroke={OUTLINE} strokeWidth={2} />
      <line x1={side > 0 ? -4 : 4} y1={0} x2={side > 0 ? 6 : -6} y2={0} stroke={CUFF} strokeWidth={2} />
      <line x1={side > 0 ? -4 : 4} y1={4} x2={side > 0 ? 6 : -6} y2={4} stroke={CUFF} strokeWidth={2} />
    </g>
  </g>
);

/**
 * Nhân vật MILO — The Young Inventor (dựng theo `projects/kien-thuc/docs/kich-ban/nhan_vat.jpg`):
 * tóc nâu dựng nhọn, kính bảo hộ đồng trên trán, sơ mi xanh xắn tay, ghi-lê rêu, túi da đeo chéo, quần kaki, giày bốt.
 * Khung xương: tay và chân hai đoạn (tính khớp khuỷu / gối tự động), tư thế và nét mặt chuyển dần (`prevPose` → `pose`),
 * thở, chớp mắt mượt, đi bộ có bước chân bám theo quãng đường (không trượt).
 * Gốc tọa độ (x, y) tại điểm chạm đất giữa hai bàn chân. Cần <MiloDefs /> trong <defs> của khung SVG.
 */
export const Stickman: React.FC<StickmanProps> = ({
  x,
  y,
  scale = 1,
  pose = "idle",
  prevPose,
  poseT = 1,
  badge,
  badgeP = 1,
  enter = 1,
  from = 320,
  lively = true,
  accessory,
}) => {
  const frame = useCurrentFrame();
  const t = prevPose && prevPose !== pose ? smooth(poseT) : 1;
  const A = POSES[prevPose ?? pose];
  const B = POSES[pose];
  const fm = (k: keyof Face) => mix(A.face[k], B.face[k], t);

  // ---- Đi bộ: pha bước theo quãng đường đã đi, nên chân không trượt; nhún thân mỗi bước.
  const traveled = enter * Math.abs(from);
  const walkAmp = Math.min(1, Math.max(0, (1 - enter) * 7));
  const phase = (traveled / 58) * Math.PI;
  const dir = from > 0 ? -1 : 1;
  const dx = (1 - enter) * from;
  const liftL = Math.max(0, Math.sin(phase)) * 20 * walkAmp;
  const liftR = Math.max(0, -Math.sin(phase)) * 20 * walkAmp;
  const bob = -Math.abs(Math.sin(phase)) * 4 * walkAmp;
  const lean = dir * 4 * walkAmp;

  // ---- Nhảy cẫng khi Eureka (chỉ khi đã đứng yên).
  const eurekaW = (pose === "eureka" ? t : 0) + (prevPose === "eureka" && pose !== "eureka" ? 1 - t : 0);
  const hopRaw = Math.abs(Math.sin(frame * 0.17));
  const hop = lively ? -hopRaw * 24 * eurekaW * (1 - walkAmp) : 0;
  const tuck = -hop * 0.35;

  // ---- Thở & đung đưa.
  const breath = Math.sin(frame * 0.11) * 1.8;
  const sway = Math.sin(frame * 0.045) * 1.2;
  const headTilt = fm("tilt") + Math.sin(frame * 0.07) * 2.5 + (lively ? Math.sin(frame * 0.19) * 1.2 : 0);

  // ---- Chớp mắt mượt (đóng – mở trong ~6 khung), thỉnh thoảng chớp đôi.
  const cyc = (frame + 37) % 113;
  const blinkK = cyc < 6 ? Math.sin((cyc / 6) * Math.PI) : cyc >= 14 && cyc < 20 && frame % 339 < 113 ? Math.sin(((cyc - 14) / 6) * Math.PI) : 0;
  const eyeOpen = Math.max(0.06, fm("eye") * (1 - blinkK * 0.95));

  // ---- Miệng: mấp máy khi đang kể.
  const talk = lively ? Math.max(0, Math.sin(frame * 0.55)) * (Math.sin(frame * 0.09) > -0.4 ? 0.35 : 0) : 0;
  const mouthOpen = Math.min(1.1, fm("open") + talk * (1 - eurekaW));

  // ---- Hai tay: nội suy vị trí bàn tay giữa hai tư thế, cộng đung đưa nhẹ; tay đánh ngược nhịp chân khi đi.
  const idleWave = lively ? Math.sin(frame * 0.16) : 0;
  const solveArm = (S: P, a: Arm, b: Arm, side: 1 | -1, swing: number) => {
    const T = { x: mix(a.x, b.x, t) + Math.sin(phase) * 10 * walkAmp * side, y: mix(a.y, b.y, t) + swing };
    // Hai lời giải khuỷu của hai tư thế, trộn theo t để không bật khi đổi chiều gập.
    const ja = joint(S, T, UPPER, FORE, a.bend);
    const jb = joint(S, T, UPPER, FORE, b.bend);
    const E = { x: mix(ja.mid.x, jb.mid.x, t), y: mix(ja.mid.y, jb.mid.y, t) };
    return { S, E, W: ja.end, hand: t < 0.5 ? a.hand : b.hand };
  };
  const waveR = pose === "wave" ? Math.sin(frame * 0.35) * 8 * t : 0;
  const armR = solveArm({ x: 30, y: -162 }, A.R, { ...B.R, x: B.R.x + waveR }, 1, idleWave * 2.5);
  const armL = solveArm({ x: -30, y: -162 }, A.L, B.L, -1, -idleWave * 2.5);
  const rulerP = (A.ruler ? 1 - t : 0) + (B.ruler ? t : 0);

  // ---- Hai chân.
  const hipL: P = { x: -14, y: -96 };
  const hipR: P = { x: 14, y: -96 };
  const footX = Math.cos(phase) * 7 * walkAmp * dir;
  const legL = joint(hipL, { x: -17 + footX, y: -12 - liftL - tuck }, 44, 44, 1);
  const legR = joint(hipR, { x: 17 - footX, y: -12 - liftR - tuck }, 44, 44, -1);

  const lookX = fm("lookX") * 3.6;
  const lookY = fm("lookY") * 3;
  const browY = fm("browY");
  const browTilt = fm("browTilt");
  const mouthW = fm("mouthW");
  const curve = fm("curve");

  const eye = (cx: number) => (
    <g transform={`translate(${cx} -49) scale(1 ${eyeOpen}) translate(${-cx} 49)`}>
      <ellipse cx={cx} cy={-49} rx={10.5} ry={12} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2.6} />
      <circle cx={cx + 1 + lookX} cy={-49 + lookY} r={7.2} fill="#4A2A14" />
      <circle cx={cx + 1 + lookX} cy={-49 + lookY} r={4} fill="#1E1008" />
      <circle cx={cx - 1.5 + lookX} cy={-52 + lookY} r={2.6} fill="#FFFFFF" />
    </g>
  );

  const mouthY = -25;
  const mouth =
    mouthOpen < 0.06 ? (
      <path d={`M ${-mouthW} ${mouthY} Q 0 ${mouthY + curve} ${mouthW} ${mouthY - curve * 0.15}`} fill="none" stroke={OUTLINE} strokeWidth={3.4} strokeLinecap="round" />
    ) : (
      <g>
        <path
          d={`M ${-mouthW} ${mouthY} Q 0 ${mouthY + curve * 0.35} ${mouthW} ${mouthY} Q 0 ${mouthY + curve * 0.6 + mouthOpen * 15} ${-mouthW} ${mouthY} Z`}
          fill="#9E2A2B"
          stroke={OUTLINE}
          strokeWidth={2.8}
          strokeLinejoin="round"
        />
        <ellipse cx={0} cy={mouthY + curve * 0.35 + mouthOpen * 8} rx={mouthW * 0.45} ry={mouthOpen * 3.5} fill="#E06A6A" />
      </g>
    );

  const badgeW = badge ? Math.max(120, badge.length * 19 + 44) : 0;
  const shadowK = 1 + hop / 80;

  return (
    <g transform={`translate(${x + dx} ${y}) scale(${scale * BASE})`}>
      {/* Bóng đổ dưới chân: nhỏ lại khi nhảy lên */}
      <ellipse cx={0} cy={4} rx={50 * shadowK} ry={10 * shadowK} fill="rgba(40,24,10,0.32)" />

      <g transform={`translate(0 ${hop}) rotate(${lean + sway * 0.3})`}>
        {/* ==================== HAI CHÂN & GIÀY BỐT ==================== */}
        <LegShape H={hipL} K={legL.mid} A={legL.end} side={-1} toe={liftL * 0.5} />
        <LegShape H={hipR} K={legR.mid} A={legR.end} side={1} toe={liftR * 0.5} />

        {/* ==================== THÂN (nhún theo bước, phồng nhẹ theo nhịp thở) ==================== */}
        <g transform={`translate(0 ${bob + breath * 0.5})`}>
          {/* Cạp quần + thắt lưng */}
          <path d="M -30 -108 L 30 -108 L 31 -90 L -31 -90 Z" fill={PANTS} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
          <rect x={-31} y={-108} width={62} height={8} fill={LEATHER} stroke={OUTLINE} strokeWidth={2.2} />
          <rect x={-6} y={-109} width={12} height={10} rx={2} fill={BRASS} stroke={OUTLINE} strokeWidth={2} />

          {/* Cánh tay trái khung hình (phía sau thân) */}
          <ArmShape S={armL.S} E={armL.E} W={armL.W} hand={armL.hand} side={-1} />

          {/* Sơ mi xanh */}
          <path d="M -32 -172 Q -36 -140 -33 -104 L 33 -104 Q 36 -140 32 -172 Z" fill={SHIRT} stroke={OUTLINE} strokeWidth={3.2} strokeLinejoin="round" />
          {/* Ghi-lê rêu hai vạt */}
          <path d="M -34 -170 L -9 -170 L -6 -100 L -35 -104 Z" fill={VEST} stroke={OUTLINE} strokeWidth={3.2} strokeLinejoin="round" />
          <path d="M 34 -170 L 9 -170 L 6 -100 L 35 -104 Z" fill={VEST} stroke={OUTLINE} strokeWidth={3.2} strokeLinejoin="round" />
          <rect x={-31} y={-140} width={18} height={20} rx={3} fill={VEST_DARK} stroke="#C8CE9E" strokeWidth={1.6} strokeDasharray="3 2" />
          <rect x={13} y={-140} width={18} height={20} rx={3} fill={VEST_DARK} stroke="#C8CE9E" strokeWidth={1.6} strokeDasharray="3 2" />
          {[-150, -132, -114].map((cy) => (
            <circle key={cy} cx={-11} cy={cy} r={2.6} fill={BRASS} stroke={OUTLINE} strokeWidth={1.2} />
          ))}
          {/* Cổ áo sơ mi */}
          <polygon points="-13,-174 0,-156 13,-174" fill={SKIN} stroke={OUTLINE} strokeWidth={2.4} />
          <polygon points="-18,-176 -4,-156 -22,-162" fill={SHIRT_DARK} stroke={OUTLINE} strokeWidth={2.2} />
          <polygon points="18,-176 4,-156 22,-162" fill={SHIRT_DARK} stroke={OUTLINE} strokeWidth={2.2} />

          {accessory === "lifevest" ? (
            <g>
              <path d="M -36 -168 L -8 -170 L -6 -104 L -37 -106 Z" fill="#F07B2A" stroke={OUTLINE} strokeWidth={3} />
              <path d="M 36 -168 L 8 -170 L 6 -104 L 37 -106 Z" fill="#F07B2A" stroke={OUTLINE} strokeWidth={3} />
              <rect x={-34} y={-140} width={68} height={7} fill="#E8E8E8" stroke={OUTLINE} strokeWidth={1.6} />
            </g>
          ) : null}

          {/* Dây da đeo chéo + túi đồ nghề bên hông */}
          <path d="M 26 -170 L -34 -100" stroke={OUTLINE} strokeWidth={13} strokeLinecap="round" />
          <path d="M 26 -170 L -34 -100" stroke={LEATHER} strokeWidth={8.5} strokeLinecap="round" />
          <line x1={24} y1={-168} x2={-32} y2={-102} stroke="#C99666" strokeWidth={1.4} strokeDasharray="4 3" />
          <g transform="translate(-42 -98)">
            <rect x={-10} y={-22} width={5} height={14} rx={2} fill="#B0BEC5" stroke={OUTLINE} strokeWidth={1.8} />
            <circle cx={-7.5} cy={-24} r={4.5} fill="#B0BEC5" stroke={OUTLINE} strokeWidth={1.8} />
            <rect x={0} y={-20} width={5} height={12} rx={2} fill="#D4883A" stroke={OUTLINE} strokeWidth={1.8} />
            <rect x={-16} y={-10} width={30} height={32} rx={7} fill={LEATHER} stroke={OUTLINE} strokeWidth={3} />
            <path d="M -14 -8 L 12 -8 L 10 6 L -12 6 Z" fill="#734423" stroke="#C99666" strokeWidth={1.4} strokeDasharray="3 2" />
            <circle cx={-1} cy={1} r={3} fill={BRASS} stroke={OUTLINE} strokeWidth={1.2} />
          </g>

          {accessory === "bowtie" ? (
            <g transform="translate(0 -168)">
              <path d="M 0 0 L -16 -9 L -16 9 Z M 0 0 L 16 -9 L 16 9 Z" fill="#C62828" stroke={OUTLINE} strokeWidth={2.4} strokeLinejoin="round" />
              <circle r={4.5} fill="#E53935" stroke={OUTLINE} strokeWidth={2} />
            </g>
          ) : null}

          {/* ==================== CỔ & ĐẦU ==================== */}
          <g transform={`translate(0 ${-172 + breath * 0.4}) rotate(${headTilt})`}>
            <rect x={-10} y={-14} width={20} height={20} rx={6} fill={SKIN_SHADOW} stroke={OUTLINE} strokeWidth={2.5} />
            {/* Tai */}
            <ellipse cx={-45} cy={-46} rx={10} ry={13} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
            <ellipse cx={-44} cy={-46} rx={5} ry={7} fill={SKIN_SHADOW} />
            <ellipse cx={45} cy={-46} rx={10} ry={13} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
            <ellipse cx={44} cy={-46} rx={5} ry={7} fill={SKIN_SHADOW} />
            {/* Mặt */}
            <rect x={-42} y={-94} width={84} height={86} rx={38} fill="url(#milo-face-grad)" stroke={OUTLINE} strokeWidth={3.4} />
            <ellipse cx={-25} cy={-34} rx={9} ry={5.5} fill="#E08266" opacity={0.5 + 0.2 * eurekaW} />
            <ellipse cx={25} cy={-34} rx={9} ry={5.5} fill="#E08266" opacity={0.5 + 0.2 * eurekaW} />
            {eye(-17)}
            {eye(17)}
            {/* Lông mày: cao thấp và độ xếch nội suy theo cảm xúc */}
            <path
              d={`M -28 ${-64 + browY + browTilt * 0.3} Q -18 ${-70 + browY} -7 ${-64 + browY - browTilt}`}
              fill="none"
              stroke={HAIR}
              strokeWidth={4.8}
              strokeLinecap="round"
            />
            <path
              d={`M 7 ${-64 + browY - browTilt} Q 18 ${-70 + browY} 28 ${-64 + browY + browTilt * 0.3}`}
              fill="none"
              stroke={HAIR}
              strokeWidth={4.8}
              strokeLinecap="round"
            />
            <ellipse cx={0} cy={-38} rx={6.5} ry={5} fill="#DF9E76" stroke={OUTLINE} strokeWidth={2.2} />
            {mouth}
            {/* Tóc nâu dựng nhọn */}
            <path
              d="M -47 -62 C -56 -92, -36 -116, -18 -110 L -12 -128 L 0 -112 L 10 -130 L 18 -110 L 30 -122 L 32 -104 C 48 -104, 56 -84, 47 -62 Q 34 -80, 16 -76 Q 0 -84, -16 -76 Q -34 -80, -47 -62 Z"
              fill={HAIR}
              stroke={OUTLINE}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
            <path d="M -28 -98 Q -14 -110 0 -98 M 6 -100 Q 20 -110 32 -94" fill="none" stroke={HAIR_LIGHT} strokeWidth={3.5} strokeLinecap="round" />
            {/* Kính bảo hộ đồng thau trên trán */}
            <g transform="translate(0 -86)">
              <path d="M -44 4 Q 0 -6 44 4" fill="none" stroke={LEATHER} strokeWidth={8} strokeLinecap="round" />
              <rect x={-6} y={-5} width={12} height={7} rx={2} fill="url(#milo-brass-grad)" stroke={OUTLINE} strokeWidth={2.2} />
              <circle cx={-19} cy={0} r={14.5} fill="url(#milo-brass-grad)" stroke={OUTLINE} strokeWidth={2.8} />
              <circle cx={-19} cy={0} r={9.5} fill="#253035" stroke={OUTLINE} strokeWidth={2} />
              <path d="M -24 -4 Q -20 -8 -15 -5" fill="none" stroke="#FFF8E7" strokeWidth={2.2} strokeLinecap="round" opacity={0.85} />
              <circle cx={19} cy={0} r={14.5} fill="url(#milo-brass-grad)" stroke={OUTLINE} strokeWidth={2.8} />
              <circle cx={19} cy={0} r={9.5} fill="#253035" stroke={OUTLINE} strokeWidth={2} />
              <path d="M 14 -4 Q 18 -8 23 -5" fill="none" stroke="#FFF8E7" strokeWidth={2.2} strokeLinecap="round" opacity={0.85} />
            </g>
          </g>

          {/* Cánh tay phải khung hình (phía trước thân) + thước chữ L khi ngắm */}
          <ArmShape S={armR.S} E={armR.E} W={armR.W} hand={armR.hand} side={1} />
          {rulerP > 0.02 ? (
            <polyline
              points={`${armR.W.x - 8},${armR.W.y - 6} ${armR.W.x + 34},${armR.W.y - 6} ${armR.W.x + 34},${armR.W.y - 46}`}
              fill="none"
              stroke="#B7791F"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={rulerP}
            />
          ) : null}

          {/* Bong bóng chữ phía trên đầu (bật ra bằng lò xo, lơ lửng nhẹ) */}
          {badge && badgeP > 0.01 ? (
            <g transform={`translate(0 ${-322 + Math.sin(frame * 0.09) * 3}) scale(${badgeP})`} opacity={Math.min(1, badgeP * 1.5)}>
              <path d="M -10 22 L 0 40 L 12 22 Z" fill="#FFF6DD" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
              <rect x={-badgeW / 2} y={-30} width={badgeW} height={54} rx={20} fill="#FFF6DD" stroke={OUTLINE} strokeWidth={3.5} />
              <rect x={-6} y={18} width={22} height={8} fill="#FFF6DD" />
              <text x={0} y={8} textAnchor="middle" fill="#3B2614" fontSize={32} fontWeight={900} fontFamily={TEXT_FONT}>
                {badge}
              </text>
            </g>
          ) : null}
        </g>
      </g>
    </g>
  );
};

/** Gradient dùng chung cho Milo (đặt một lần trong <defs> của khung SVG cảnh). */
export const MiloDefs: React.FC = () => (
  <>
    <radialGradient id="milo-face-grad" cx="45%" cy="38%" r="58%">
      <stop offset="0%" stopColor="#F5CBA7" />
      <stop offset="70%" stopColor={SKIN} />
      <stop offset="100%" stopColor={SKIN_SHADOW} />
    </radialGradient>
    <linearGradient id="milo-brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFE082" />
      <stop offset="55%" stopColor={BRASS} />
      <stop offset="100%" stopColor="#9E7020" />
    </linearGradient>
  </>
);
