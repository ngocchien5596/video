/**
 * Tập 3 "Cơm nguội để qua đêm ăn có sao không?" (Tin được hay Tin đồn?): cảnh vẽ riêng cho từng hồi, đổi hình theo câu
 * đang đọc (`li`, `lf`) đúng như trường `shot` trong projects/kien-thuc/src/episodes/tuan-1.ts.
 * Toạ độ gốc của sân khấu: rộng x 60..910, cao y 93..780 (mặt đất y = 780). Mọi hiệu ứng chính của một câu xong trong
 * ~70 khung đầu câu, sau đó chỉ còn chuyển động nhẹ lặp lại.
 */
import React from "react";
import { interpolate } from "remotion";
import { DrawLine, DrawPath, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Card, Cross, GROUND, linePose, poseAt, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { type Pose, Stickman } from "./Stickman.tsx";

type PoseState = { pose: Pose; prevPose?: Pose; poseT?: number };

const OUTLINE = "#2B1A0E";
const RICE = "#FFFDF4";
const BRASS = "#E0AD46";
const GERM = "#7CC36E";
const TOXIN = "#FF8A1F";
const HOT = "#E2533F";
const COLD = "#4C9BD6";

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

// ---------------------------------------------------------------- Milo: phụ kiện đổi vai bám theo cơ thể

/** Vị trí bàn tay (toạ độ riêng của Milo) ở từng tư thế, chép từ Stickman.tsx để gắn đạo cụ vào tay. */
const HANDS: Record<Pose, { R: [number, number]; L: [number, number] }> = {
  idle: { R: [38, -98], L: [-38, -98] },
  point: { R: [50, -112], L: [-92, -192] },
  pointR: { R: [92, -192], L: [-38, -98] },
  think: { R: [10, -184], L: [-50, -112] },
  eureka: { R: [56, -224], L: [-56, -224] },
  aimL: { R: [58, -204], L: [-38, -98] },
  scratch: { R: [40, -232], L: [-38, -98] },
  present: { R: [38, -98], L: [-94, -134] },
  touch: { R: [38, -98], L: [-96, -116] },
  wave: { R: [72, -214], L: [-38, -98] },
};
const TILT: Partial<Record<Pose, number>> = { think: -6, scratch: 7, eureka: 3 };

/** Tính lại nhịp thở, nhảy, đi bộ, nghiêng đầu y hệt Stickman để phụ kiện dính vào người khi Milo cử động. */
const rig = (ps: PoseState, frame: number, enter = 1, from = 320) => {
  const t = ps.prevPose && ps.prevPose !== ps.pose ? smooth(ps.poseT ?? 1) : 1;
  const A = ps.prevPose ?? ps.pose;
  const B = ps.pose;
  const traveled = enter * Math.abs(from);
  const walkAmp = Math.min(1, Math.max(0, (1 - enter) * 7));
  const phase = (traveled / 58) * Math.PI;
  const dir = from > 0 ? -1 : 1;
  const dx = (1 - enter) * from;
  const bob = -Math.abs(Math.sin(phase)) * 4 * walkAmp;
  const lean = dir * 4 * walkAmp;
  const eurekaW = (B === "eureka" ? t : 0) + (A === "eureka" && B !== "eureka" ? 1 - t : 0);
  const hop = -Math.abs(Math.sin(frame * 0.17)) * 24 * eurekaW * (1 - walkAmp);
  const breath = Math.sin(frame * 0.11) * 1.8;
  const sway = Math.sin(frame * 0.045) * 1.2;
  const idleWave = Math.sin(frame * 0.16);
  const waveR = B === "wave" ? Math.sin(frame * 0.35) * 8 * t : 0;
  const R = {
    x: mix(HANDS[A].R[0], HANDS[B].R[0] + waveR, t) + Math.sin(phase) * 10 * walkAmp,
    y: mix(HANDS[A].R[1], HANDS[B].R[1], t) + idleWave * 2.5,
  };
  const L = {
    x: mix(HANDS[A].L[0], HANDS[B].L[0], t) - Math.sin(phase) * 10 * walkAmp,
    y: mix(HANDS[A].L[1], HANDS[B].L[1], t) - idleWave * 2.5,
  };
  const headTilt = mix(TILT[A] ?? 0, TILT[B] ?? 0, t) + Math.sin(frame * 0.07) * 2.5 + Math.sin(frame * 0.19) * 1.2;
  const torso = bob + breath * 0.5;
  return { dx, hop, rot: lean + sway * 0.3, torso, breath, R, L, headTilt };
};

type Gear = {
  apron?: boolean;
  coat?: boolean;
  /** Kính bảo hộ: 0 = đẩy trên trán (như thường), 1 = hạ xuống mắt. */
  goggles?: number;
  glasses?: boolean;
  notebook?: boolean;
  pointer?: boolean;
};

/** Milo kèm phụ kiện theo vai: tạp dề (nội trợ), sổ ghi chép (thanh tra), áo blouse + kính hạ (nhà nghiên cứu), kính + que chỉ (thầy giáo). */
const Milo: React.FC<
  { x: number; y?: number; scale?: number; ps: PoseState; frame: number; enter?: number; from?: number; badge?: string; badgeP?: number } & Gear
> = ({ x, y = GROUND, scale = 1, ps, frame, enter = 1, from = 320, badge, badgeP, apron, coat, goggles, glasses, notebook, pointer }) => {
  const r = rig(ps, frame, enter, from);
  const gy = goggles ?? 0;
  const dirX = r.L.x + 30;
  const dirY = r.L.y + 162;
  const dl = Math.hypot(dirX, dirY) || 1;
  return (
    <g>
      <Stickman x={x} y={y} scale={scale} {...ps} enter={enter} from={from} badge={badge} badgeP={badgeP} />
      <g transform={`translate(${x + r.dx} ${y}) scale(${scale * 1.32})`}>
        <g transform={`translate(0 ${r.hop}) rotate(${r.rot})`}>
          <g transform={`translate(0 ${r.torso})`}>
            {coat ? (
              <g>
                <path d="M -36 -171 L -9 -169 L -11 -40 L -41 -40 Q -38 -110 -36 -171 Z" fill="#FBFBF7" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
                <path d="M 36 -171 L 9 -169 L 11 -40 L 41 -40 Q 38 -110 36 -171 Z" fill="#FBFBF7" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
                <path d="M -9 -169 L -20 -146 L -10 -138 Z M 9 -169 L 20 -146 L 10 -138 Z" fill="#E4E6E0" stroke={OUTLINE} strokeWidth={2} strokeLinejoin="round" />
                <rect x={14} y={-132} width={18} height={20} rx={2} fill="#EDEFE9" stroke={OUTLINE} strokeWidth={2} />
                <rect x={18} y={-142} width={4} height={16} rx={1.5} fill="#2F6FB0" stroke={OUTLINE} strokeWidth={1.2} />
                <rect x={-34} y={-80} width={18} height={18} rx={2} fill="#EDEFE9" stroke={OUTLINE} strokeWidth={2} />
              </g>
            ) : null}
            {apron ? (
              <g>
                <path d="M -20 -166 L -12 -176 M 20 -166 L 12 -176" stroke="#B83A2E" strokeWidth={5} strokeLinecap="round" />
                <path d="M -22 -166 L 22 -166 L 25 -106 L 35 -46 Q 0 -40 -35 -46 L -25 -106 Z" fill="url(#e03-check)" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
                <path d="M -26 -106 L 26 -106" stroke="#B83A2E" strokeWidth={6} />
                <rect x={-14} y={-88} width={28} height={20} rx={3} fill="#FFF6E8" stroke={OUTLINE} strokeWidth={2} />
              </g>
            ) : null}
            {notebook ? (
              <g transform={`translate(${r.L.x - 4} ${r.L.y - 14}) rotate(-12)`}>
                <rect x={-17} y={-22} width={34} height={44} rx={3} fill="#C0392B" stroke={OUTLINE} strokeWidth={2.4} />
                <rect x={-13} y={-18} width={27} height={36} rx={2} fill="#FFFDF4" stroke={OUTLINE} strokeWidth={1.4} />
                {[-10, -3, 4, 11].map((ly) => (
                  <line key={ly} x1={-9} y1={ly} x2={10} y2={ly} stroke="#8AA9C7" strokeWidth={1.6} />
                ))}
                <path d="M -8 -26 L -8 -20 M 0 -26 L 0 -20 M 8 -26 L 8 -20" stroke={OUTLINE} strokeWidth={2} strokeLinecap="round" />
              </g>
            ) : null}
            {pointer ? (
              <g>
                <line x1={r.L.x - (dirX / dl) * 8} y1={r.L.y - (dirY / dl) * 8} x2={r.L.x + (dirX / dl) * 78} y2={r.L.y + (dirY / dl) * 78} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
                <line x1={r.L.x - (dirX / dl) * 8} y1={r.L.y - (dirY / dl) * 8} x2={r.L.x + (dirX / dl) * 78} y2={r.L.y + (dirY / dl) * 78} stroke="#B07A3E" strokeWidth={3} strokeLinecap="round" />
                <circle cx={r.L.x + (dirX / dl) * 78} cy={r.L.y + (dirY / dl) * 78} r={3.5} fill="#FFF8E7" stroke={OUTLINE} strokeWidth={1.5} />
              </g>
            ) : null}
            <g transform={`translate(0 ${-172 + r.breath * 0.4}) rotate(${r.headTilt})`}>
              {goggles !== undefined ? (
                <g>
                  {/* Tóc phủ lại chỗ kính cũ trên trán, rồi vẽ kính ở vị trí mới */}
                  <path
                    d="M -47 -62 C -56 -92, -36 -116, -18 -110 L -12 -128 L 0 -112 L 10 -130 L 18 -110 L 30 -122 L 32 -104 C 48 -104, 56 -84, 47 -62 Q 34 -80, 16 -76 Q 0 -84, -16 -76 Q -34 -80, -47 -62 Z"
                    fill="#5A3520"
                    stroke={OUTLINE}
                    strokeWidth={3.2}
                    strokeLinejoin="round"
                  />
                  <path d="M -28 -98 Q -14 -110 0 -98 M 6 -100 Q 20 -110 32 -94" fill="none" stroke="#7D4E2C" strokeWidth={3.5} strokeLinecap="round" />
                  <g transform={`translate(0 ${-86 + gy * 37})`}>
                    <path d="M -46 4 Q 0 -6 46 4" fill="none" stroke="#5E361B" strokeWidth={8} strokeLinecap="round" />
                    <rect x={-6} y={-5} width={12} height={7} rx={2} fill={BRASS} stroke={OUTLINE} strokeWidth={2.2} />
                    {[-19, 19].map((gx) => (
                      <g key={gx}>
                        <circle cx={gx} cy={0} r={14.5 + gy * 2} fill="url(#milo-brass-grad)" stroke={OUTLINE} strokeWidth={2.8} />
                        <circle cx={gx} cy={0} r={9.5 + gy * 2.5} fill={gy > 0.5 ? "rgba(170,225,240,0.32)" : "#253035"} stroke={OUTLINE} strokeWidth={2} />
                        <path d={`M ${gx - 5} -4 Q ${gx - 1} -8 ${gx + 4} -5`} fill="none" stroke="#FFF8E7" strokeWidth={2.2} strokeLinecap="round" opacity={0.85} />
                      </g>
                    ))}
                  </g>
                </g>
              ) : null}
              {glasses ? (
                <g>
                  <circle cx={-17} cy={-49} r={15} fill="rgba(200,235,250,0.18)" stroke={OUTLINE} strokeWidth={3} />
                  <circle cx={17} cy={-49} r={15} fill="rgba(200,235,250,0.18)" stroke={OUTLINE} strokeWidth={3} />
                  <path d="M -3 -50 Q 0 -54 3 -50" fill="none" stroke={OUTLINE} strokeWidth={3} />
                </g>
              ) : null}
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};

/** Toạ độ khung sân khấu của bàn tay Milo (bỏ qua góc lắc rất nhỏ của thân). */
const handAt = (side: "L" | "R", x: number, ps: PoseState, frame: number, scale = 1, enter = 1, from = 320) => {
  const r = rig(ps, frame, enter, from);
  const h = r[side];
  const k = scale * 1.32;
  return { x: x + r.dx + h.x * k, y: GROUND + (h.y + r.torso + r.hop) * k };
};

// ---------------------------------------------------------------- căn bếp

/** Tường bếp: cửa sổ (sáng ↔ đêm), giá treo muôi, gạch ốp, sàn, quầy bếp gỗ chạy ngang. */
const Kitchen: React.FC<{ frame: number; night?: number; counter?: [number, number] }> = ({ frame, night = 0, counter = [70, 900] }) => (
  <g>
    <rect x={60} y={93} width={850} height={600} fill="rgba(255,244,214,0.45)" />
    <rect x={60} y={430} width={850} height={170} fill="url(#e03-tile)" opacity={0.75} />
    <rect x={60} y={600} width={850} height={180} fill="rgba(150,100,60,0.16)" />
    {/* Cửa sổ */}
    <g>
      <rect x={96} y={130} width={204} height={196} rx={8} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <rect x={108} y={142} width={180} height={172} fill="#CFEAF7" />
      <rect x={108} y={142} width={180} height={172} fill="url(#e03-night)" opacity={night} />
      <g opacity={1 - night}>
        <circle cx={238} cy={192} r={26} fill="#FFD45A" stroke="#D88A12" strokeWidth={3} />
        <path d="M 120 280 Q 160 250 200 276 Q 240 250 288 274 L 288 314 L 120 314 Z" fill="#9CCB8A" />
      </g>
      <g opacity={night}>
        <path d="M 236 172 A 24 24 0 1 0 258 206 A 18 18 0 1 1 236 172 Z" fill="#FFF3C4" />
        {[
          [140, 170],
          [180, 220],
          [270, 260],
          [150, 260],
        ].map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r={2.5 + 1.5 * Math.abs(Math.sin(frame * 0.08 + i))} fill="#FFF8E7" />
        ))}
      </g>
      <line x1={198} y1={142} x2={198} y2={314} stroke={INK.wood} strokeWidth={8} />
      <line x1={108} y1={228} x2={288} y2={228} stroke={INK.wood} strokeWidth={8} />
      <path d="M 96 128 L 128 128 Q 116 230 130 330 L 96 330 Z" fill="#E9A23B" stroke={INK.line} strokeWidth={3} />
      <path d="M 300 128 L 268 128 Q 280 230 266 330 L 300 330 Z" fill="#E9A23B" stroke={INK.line} strokeWidth={3} />
    </g>
    {/* Giá treo muôi, sạn */}
    <line x1={660} y1={140} x2={880} y2={140} stroke={INK.woodDark} strokeWidth={8} strokeLinecap="round" />
    {[700, 760, 820].map((hx, i) => (
      <g key={hx} transform={`rotate(${wave(frame, 0.05, 2.5, i)} ${hx} 140)`}>
        <line x1={hx} y1={140} x2={hx} y2={238} stroke="#8D9AA3" strokeWidth={7} strokeLinecap="round" />
        {i === 0 ? <ellipse cx={hx} cy={248} rx={22} ry={14} fill="#AFBAC2" stroke={INK.line} strokeWidth={3} /> : null}
        {i === 1 ? <rect x={hx - 15} y={232} width={30} height={34} rx={5} fill="#C08A4E" stroke={INK.line} strokeWidth={3} /> : null}
        {i === 2 ? <circle cx={hx} cy={250} r={17} fill="none" stroke="#AFBAC2" strokeWidth={6} /> : null}
      </g>
    ))}
    {/* Quầy bếp */}
    <rect x={counter[0]} y={596} width={counter[1] - counter[0]} height={20} rx={4} fill="#C4843F" stroke={INK.line} strokeWidth={4} />
    <rect x={counter[0] + 14} y={616} width={counter[1] - counter[0] - 28} height={164} fill="#B07338" stroke={INK.line} strokeWidth={4} />
    {Array.from({ length: Math.floor((counter[1] - counter[0] - 28) / 140) }, (_, i) => (
      <g key={i}>
        <rect x={counter[0] + 30 + i * 140} y={632} width={124} height={132} rx={6} fill="none" stroke="#8A5527" strokeWidth={4} />
        <circle cx={counter[0] + 92 + i * 140} cy={650} r={6} fill={BRASS} stroke={INK.line} strokeWidth={2} />
      </g>
    ))}
  </g>
);

/** Đồng hồ treo tường; `h` là giờ (số thực), kim phút theo phần lẻ. */
const WallClock: React.FC<{ x: number; y: number; r?: number; h: number; glow?: number }> = ({ x, y, r = 54, h, glow = 0 }) => {
  const hh = ((h % 12) + 12) % 12;
  const ha = (hh / 12) * Math.PI * 2;
  const ma = (((h % 1) + 1) % 1) * Math.PI * 2;
  return (
    <g>
      {glow > 0.01 ? <circle cx={x} cy={y} r={r + 18} fill="#FFC93C" opacity={glow * 0.55} filter="url(#soft-glow)" /> : null}
      <circle cx={x} cy={y} r={r + 8} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <circle cx={x} cy={y} r={r} fill="#FFFBEF" stroke={INK.line} strokeWidth={2.5} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const big = i % 3 === 0;
        return (
          <line
            key={i}
            x1={x + Math.sin(a) * r * (big ? 0.72 : 0.8)}
            y1={y - Math.cos(a) * r * (big ? 0.72 : 0.8)}
            x2={x + Math.sin(a) * r * 0.92}
            y2={y - Math.cos(a) * r * 0.92}
            stroke={INK.line}
            strokeWidth={big ? 5 : 3}
            strokeLinecap="round"
          />
        );
      })}
      <line x1={x} y1={y} x2={x + Math.sin(ha) * r * 0.5} y2={y - Math.cos(ha) * r * 0.5} stroke={INK.line} strokeWidth={7} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x + Math.sin(ma) * r * 0.76} y2={y - Math.cos(ma) * r * 0.76} stroke={INK.red} strokeWidth={4.5} strokeLinecap="round" />
      <circle cx={x} cy={y} r={5} fill={INK.line} />
    </g>
  );
};

/** Hơi nóng bốc lên (vài làn khói uốn lượn, lặp mãi). */
const Steam: React.FC<{ x: number; y: number; p: number; frame: number; s?: number; n?: number; spread?: number }> = ({ x, y, p, frame, s = 1, n = 3, spread = 26 }) =>
  p <= 0.01 ? null : (
    <g opacity={p}>
      {Array.from({ length: n }, (_, i) => {
        const k = ((frame * 0.9 + i * (60 / n)) % 60) / 60;
        const sx = x + (i - (n - 1) / 2) * spread * s;
        const sy = y - k * 70 * s;
        return (
          <path
            key={i}
            d={`M ${sx} ${sy} q ${10 * s} ${-14 * s} 0 ${-28 * s} q ${-10 * s} ${-14 * s} 0 ${-28 * s}`}
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth={6 * s}
            strokeLinecap="round"
            opacity={Math.sin(k * Math.PI)}
          />
        );
      })}
    </g>
  );

/** Nồi cơm điện (gốc: giữa đáy). `light` 1 = đèn nấu đỏ, 0 = đã tắt (đèn giữ ấm vàng). */
const RiceCooker: React.FC<{ x: number; y: number; s?: number; light?: number; steam?: number; frame: number; open?: number }> = ({
  x,
  y,
  s = 1,
  light = 0,
  steam = 0,
  frame,
  open = 0,
}) => (
  <g>
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={78} ry={8} fill="rgba(40,24,10,0.25)" />
      <path d="M -70 -6 Q -76 -60 -66 -100 L 66 -100 Q 76 -60 70 -6 Q 0 6 -70 -6 Z" fill="#F4F0E6" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
      <path d="M -66 -82 L 66 -82" stroke="#E07A8A" strokeWidth={6} />
      <rect x={-30} y={-62} width={60} height={34} rx={8} fill="#DCD6C8" stroke={INK.line} strokeWidth={3} />
      <circle cx={-12} cy={-45} r={7} fill={light > 0.5 ? "#FF4D3D" : "#8C7F72"} stroke={INK.line} strokeWidth={2} />
      <circle cx={12} cy={-45} r={7} fill={light > 0.5 ? "#8C7F72" : "#FFC93C"} stroke={INK.line} strokeWidth={2} />
      {open > 0.02 ? (
        <g>
          <ellipse cx={0} cy={-100} rx={62} ry={14} fill="#2B1A0E" />
          <ellipse cx={0} cy={-102} rx={56} ry={10} fill={RICE} />
        </g>
      ) : null}
      <g transform={`translate(-66 -100) rotate(${-open * 75}) translate(66 100)`}>
        <path d="M -68 -100 Q -60 -140 0 -142 Q 60 -140 68 -100 Z" fill="#FBF8F0" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
        <rect x={-20} y={-152} width={40} height={14} rx={6} fill="#B8B0A2" stroke={INK.line} strokeWidth={3} />
      </g>
    </g>
    <Steam x={x} y={y - 150 * s} p={steam} frame={frame} s={s} />
  </g>
);

/** Bát cơm men lam; `plate` 1 = có đĩa úp lên trên. */
const RiceBowl: React.FC<{ x: number; y: number; s?: number; plate?: number }> = ({ x, y, s = 1, plate = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={2} rx={66} ry={8} fill="rgba(40,24,10,0.25)" />
    <rect x={-22} y={-14} width={44} height={14} rx={4} fill="#EAF2F6" stroke={INK.line} strokeWidth={3} />
    {plate < 0.99 ? (
      <g opacity={1 - plate}>
        <path d="M -54 -66 Q -52 -104 0 -106 Q 52 -104 54 -66 Z" fill={RICE} stroke={INK.line} strokeWidth={3} />
        {[-30, -12, 8, 26, -20, 2, 20].map((gx, i) => (
          <ellipse key={i} cx={gx} cy={i < 4 ? -78 : -92} rx={5} ry={3} fill="#EFE9D8" />
        ))}
      </g>
    ) : null}
    <path d="M -64 -66 L 64 -66 Q 60 -16 0 -12 Q -60 -16 -64 -66 Z" fill="#F7FBFD" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -60 -50 Q 0 -40 60 -50" fill="none" stroke="#2F6FB0" strokeWidth={5} />
    <path d="M -40 -32 q 8 -8 16 0 q 8 8 16 0 q 8 -8 16 0 q 8 8 16 0" fill="none" stroke="#2F6FB0" strokeWidth={3} />
    {plate > 0.01 ? (
      <g transform={`translate(0 ${-(1 - plate) * 60})`} opacity={plate}>
        <ellipse cx={0} cy={-72} rx={80} ry={14} fill="#F7FBFD" stroke={INK.line} strokeWidth={4} />
        <ellipse cx={0} cy={-76} rx={34} ry={6} fill="#E3EEF4" stroke="#2F6FB0" strokeWidth={2.5} />
      </g>
    ) : null}
  </g>
);

/** Bong bóng lời thoại nhiều dòng, có đuôi chỉ về `tail`. */
const Bubble: React.FC<{ x: number; y: number; w: number; lines: string[]; color: string; p: number; tail: [number, number]; size?: number }> = ({
  x,
  y,
  w,
  lines,
  color,
  p,
  tail,
  size = 38,
}) => {
  const h = lines.length * size * 1.2 + 34;
  return (
    <Pop p={p} cx={tail[0]} cy={tail[1]}>
      <path d={`M ${x - 26} ${y + h / 2 - 6} L ${tail[0]} ${tail[1]} L ${x + 26} ${y + h / 2 - 6} Z`} fill="#FFFDF5" stroke={color} strokeWidth={5} strokeLinejoin="round" />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={26} fill="#FFFDF5" stroke={color} strokeWidth={5} />
      <rect x={x - 22} y={y + h / 2 - 12} width={44} height={10} fill="#FFFDF5" />
      {lines.map((l, i) => (
        <text key={l} x={x} y={y - h / 2 + 17 + size * 0.95 + i * size * 1.2} textAnchor="middle" fill={color} fontSize={size} {...T}>
          {l}
        </text>
      ))}
    </Pop>
  );
};

/** Dấu mộc đóng mạnh xuống (phóng to rồi thu về đúng chỗ). */
const StampMark: React.FC<{ x: number; y: number; lines: string[]; p: number; rot?: number; size?: number; color?: string }> = ({
  x,
  y,
  lines,
  p,
  rot = -6,
  size = 40,
  color = INK.red,
}) => {
  if (p <= 0.01) return null;
  const w = Math.max(...lines.map((l) => l.length)) * size * 0.64 + 44;
  const h = lines.length * size * 1.15 + size * 0.5;
  const s = 1 + (1 - Math.min(1, p)) * 0.8;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={Math.min(1, p * 1.4)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="rgba(255,246,221,0.94)" stroke={color} strokeWidth={6} />
      <rect x={-w / 2 + 8} y={-h / 2 + 8} width={w - 16} height={h - 16} rx={6} fill="none" stroke={color} strokeWidth={2.5} />
      {lines.map((l, i) => (
        <text key={l} x={0} y={-h / 2 + size * 0.25 + size * 0.95 + i * size * 1.15} textAnchor="middle" fill={color} fontSize={size} {...T}>
          {l}
        </text>
      ))}
    </g>
  );
};

/** Mũi tên chỉ xuống nhún nhảy (về phía ô bình luận). */
const DownArrow: React.FC<{ x: number; y: number; p: number; frame: number }> = ({ x, y, p, frame }) => (
  <Pop p={p} cx={x} cy={y}>
    <g transform={`translate(${x} ${y + Math.abs(Math.sin(frame * 0.18)) * 14})`}>
      <path d="M -16 -46 L 16 -46 L 16 0 L 34 0 L 0 38 L -34 0 L -16 0 Z" fill={INK.red} stroke={INK.line} strokeWidth={3.5} strokeLinejoin="round" />
    </g>
  </Pop>
);

/** Mũi tên cong vẽ dần từ (x1, y1) tới (x2, y2), vồng `arc` px. */
const ArcArrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; arc?: number; p: number; color: string; w?: number }> = ({ x1, y1, x2, y2, arc = 40, p, color, w = 6 }) => {
  if (p <= 0.01) return null;
  const mx = (x1 + x2) / 2 - arc * 0.4;
  const my = Math.min(y1, y2) - arc;
  const len = Math.hypot(x2 - x1, y2 - y1) + arc * 1.6;
  const ang = Math.atan2(y2 - my, x2 - mx);
  return (
    <g>
      <DrawPath p={p} length={len} d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />
      {p > 0.95 ? (
        <path
          d={`M ${x2} ${y2} L ${x2 - 20 * Math.cos(ang - 0.5)} ${y2 - 20 * Math.sin(ang - 0.5)} M ${x2} ${y2} L ${x2 - 20 * Math.cos(ang + 0.5)} ${y2 - 20 * Math.sin(ang + 0.5)}`}
          stroke={color}
          strokeWidth={w}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
};

/** Bảng ký hiệu treo (chữ 1–2 dòng). */
const Sign: React.FC<{ x: number; y: number; w: number; lines: string[]; color?: string; size?: number; fill?: string }> = ({
  x,
  y,
  w,
  lines,
  color = INK.line,
  size = 38,
  fill = "#FFF6DD",
}) => {
  const h = lines.length * size * 1.18 + 28;
  return (
    <g>
      <rect x={x - w / 2 + 5} y={y - h / 2 + 7} width={w} height={h} rx={14} fill="rgba(40,24,10,0.25)" />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={14} fill={fill} stroke={color} strokeWidth={5} />
      {lines.map((l, i) => (
        <text key={l} x={x} y={y - h / 2 + 12 + size * 0.95 + i * size * 1.18} textAnchor="middle" fill={color} fontSize={size} {...T}>
          {l}
        </text>
      ))}
    </g>
  );
};

// ---------------------------------------------------------------- vi sinh vật

/** Bào tử: lõi nhỏ có mặt, bọc vòng áo giáp đồng thau. `open` tách áo (nảy mầm), `dead` vỡ áo + lõi xám, `sleep` ngủ. */
const Spore: React.FC<{ x: number; y: number; s?: number; frame: number; open?: number; dead?: number; sleep?: number; shine?: number }> = ({
  x,
  y,
  s = 1,
  frame,
  open = 0,
  dead = 0,
  sleep = 0,
  shine = 0,
}) => {
  const k = Math.max(open, dead);
  const armorO = 1 - Math.max(open * 0.9, Math.max(0, dead - 0.5) * 2);
  const core = dead > 0.3 ? "#A9A49A" : "#E8D46A";
  return (
    <g transform={`translate(${x} ${y + wave(frame, 0.09, 2)}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={22} ry={15} fill={core} stroke={OUTLINE} strokeWidth={3} />
      {dead > 0.3 ? (
        <path d="M -12 -6 l 6 6 m 0 -6 l -6 6 M 6 -6 l 6 6 m 0 -6 l -6 6" stroke={OUTLINE} strokeWidth={2.4} strokeLinecap="round" />
      ) : sleep > 0.5 ? (
        <path d="M -12 -2 q 3 3 6 0 M 6 -2 q 3 3 6 0" fill="none" stroke={OUTLINE} strokeWidth={2.4} strokeLinecap="round" />
      ) : (
        <g>
          <circle cx={-8} cy={-2} r={2.8} fill={OUTLINE} />
          <circle cx={8} cy={-2} r={2.8} fill={OUTLINE} />
        </g>
      )}
      <path d={dead > 0.3 ? "M -5 8 q 5 -4 10 0" : "M -5 6 q 5 4 10 0"} fill="none" stroke={OUTLINE} strokeWidth={2.2} strokeLinecap="round" />
      {armorO > 0.01 ? (
        <g opacity={armorO}>
          {[-1, 1].map((side) => (
            <g key={side} transform={`translate(${side * k * 12} ${side * (open * 26 + dead * 40)}) rotate(${side * (dead * 50 + open * 18)})`}>
              <path d={side < 0 ? "M -33 0 A 33 25 0 0 1 33 0" : "M -33 0 A 33 25 0 0 0 33 0"} fill="none" stroke={OUTLINE} strokeWidth={15} strokeLinecap="round" />
              <path d={side < 0 ? "M -33 0 A 33 25 0 0 1 33 0" : "M -33 0 A 33 25 0 0 0 33 0"} fill="none" stroke="url(#e03-brass)" strokeWidth={10} strokeLinecap="round" />
              {[-0.75, 0, 0.75].map((a) => (
                <circle key={a} cx={Math.sin(a) * 33} cy={side * Math.cos(a) * 25} r={2.4} fill="#7A5310" />
              ))}
            </g>
          ))}
        </g>
      ) : null}
      {shine > 0.01 ? (
        <path d="M -24 -26 L -18 -34 M -32 -16 L -40 -20 M 24 -26 L 30 -34" stroke="#FFE27A" strokeWidth={3.5} strokeLinecap="round" opacity={shine * (0.5 + 0.5 * Math.sin(frame * 0.3))} />
      ) : null}
      {sleep > 0.01 ? (
        <g opacity={sleep}>
          {[0, 1, 2].map((i) => {
            const kz = (frame * 0.025 + i / 3) % 1;
            return (
              <text key={i} x={30 + kz * 18} y={-22 - kz * 40} fill={INK.blue} fontSize={16 + kz * 10} opacity={Math.sin(kz * Math.PI)} {...T}>
                z
              </text>
            );
          })}
        </g>
      ) : null}
    </g>
  );
};

/** Một con trực khuẩn (thân que xanh, có roi). `k` 0 → 1 = thắt eo rồi tách làm đôi. */
const Rod: React.FC<{ x: number; y: number; s?: number; k?: number; rot?: number; frame: number; dead?: number; face?: boolean }> = ({
  x,
  y,
  s = 1,
  k = 0,
  rot = 0,
  frame,
  dead = 0,
  face = true,
}) => {
  const fill = dead > 0.5 ? "#A9A49A" : GERM;
  const a = 26;
  const hh = 13;
  const cell = (cx: number, len: number, key: string, waist = 0) => (
    <g key={key}>
      {[-1, 1].map((d) => (
        <path
          key={d}
          d={`M ${cx + d * len} 0 q ${d * 8} ${-6 + wave(frame, 0.4, 4, cx)} ${d * 16} 0 q ${d * 8} ${6 - wave(frame, 0.4, 4, cx)} ${d * 16} 0`}
          fill="none"
          stroke={OUTLINE}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
      <rect x={cx - len} y={-hh} width={len * 2} height={hh * 2} rx={hh} fill={fill} stroke={OUTLINE} strokeWidth={3} />
      {waist > 0.02 ? <path d={`M ${cx} ${-hh} q -4 ${waist * 7} 0 ${waist * 10} M ${cx} ${hh} q -4 ${-waist * 7} 0 ${-waist * 10}`} fill="none" stroke={OUTLINE} strokeWidth={3} /> : null}
      {face ? (
        dead > 0.5 ? (
          <path d={`M ${cx - 9} -5 l 5 5 m 0 -5 l -5 5 M ${cx + 4} -5 l 5 5 m 0 -5 l -5 5`} stroke={OUTLINE} strokeWidth={2} strokeLinecap="round" />
        ) : (
          <g>
            <circle cx={cx - 6} cy={-3} r={2.4} fill={OUTLINE} />
            <circle cx={cx + 6} cy={-3} r={2.4} fill={OUTLINE} />
            <path d={`M ${cx - 4} 4 q 4 3 8 0`} fill="none" stroke={OUTLINE} strokeWidth={2} strokeLinecap="round" />
          </g>
        )
      ) : (
        <ellipse cx={cx - len * 0.3} cy={-4} rx={len * 0.35} ry={3} fill="rgba(255,255,255,0.35)" />
      )}
    </g>
  );
  let body: React.ReactNode;
  if (k < 0.5) {
    const e = k / 0.5;
    body = cell(0, a * (1 + 0.3 * e), "one", e);
  } else {
    const g = (k - 0.5) / 0.5;
    const len = a * 0.65 * (1 + 0.35 * g);
    const off = a * 0.65 + g * a * 0.75;
    body = (
      <>
        {cell(-off, len, "a")}
        {cell(off, len, "b")}
      </>
    );
  }
  return <g transform={`translate(${x} ${y + wave(frame, 0.12, 1.5, x)}) rotate(${rot}) scale(${s})`}>{body}</g>;
};

/** Chấm độc tố màu cam lơ lửng. */
const Toxin: React.FC<{ x: number; y: number; r?: number; p: number; frame: number; i: number }> = ({ x, y, r = 8, p, frame, i }) =>
  p <= 0.01 ? null : (
    <g transform={`translate(${x + wave(frame, 0.06, 6, i)} ${y + wave(frame, 0.08, 7, i * 1.7)}) scale(${p})`}>
      <circle r={r * 1.9} fill={TOXIN} opacity={0.25} />
      <circle r={r} fill={TOXIN} stroke="#9A4A08" strokeWidth={2} />
      <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.3} fill="#FFD9A8" />
    </g>
  );

// ---------------------------------------------------------------- dụng cụ đo

/** Nhiệt kế đứng (0..max °C ứng với `bottom`..`top`), cột đỏ dâng tới `t` độ. */
const Thermo: React.FC<{ x: number; top: number; bottom: number; t: number; max?: number; marks?: number[]; w?: number }> = ({ x, top, bottom, t, max = 130, marks = [], w = 22 }) => {
  const yOf = (v: number) => bottom - (Math.min(max, Math.max(0, v)) / max) * (bottom - top);
  return (
    <g>
      <rect x={x - w} y={top - 22} width={w * 2} height={bottom - top + 40} rx={w} fill="#FFFFFF" stroke={INK.line} strokeWidth={4} />
      <circle cx={x} cy={bottom + 34} r={w + 12} fill="#FFFFFF" stroke={INK.line} strokeWidth={4} />
      <rect x={x - w * 0.42} y={yOf(t)} width={w * 0.84} height={bottom - yOf(t) + 20} fill={HOT} />
      <circle cx={x} cy={bottom + 34} r={w + 3} fill={HOT} />
      <ellipse cx={x - 9} cy={bottom + 24} rx={6} ry={9} fill="rgba(255,255,255,0.5)" />
      {Array.from({ length: Math.floor(max / 10) + 1 }, (_, i) => (
        <line key={i} x1={x + w * 0.45} y1={yOf(i * 10)} x2={x + w * 0.9} y2={yOf(i * 10)} stroke={INK.line} strokeWidth={2.5} />
      ))}
      {marks.map((m) => (
        <line key={m} x1={x - w - 10} y1={yOf(m)} x2={x + w + 10} y2={yOf(m)} stroke={INK.line} strokeWidth={4} strokeDasharray="6 4" />
      ))}
    </g>
  );
};

/** Đồng hồ cát; cát chảy theo `p` (0 → 1). */
const Hourglass: React.FC<{ x: number; y: number; s?: number; p: number }> = ({ x, y, s = 1, p }) => {
  const top = 1 - p;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-44} y={-78} width={88} height={12} rx={4} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
      <rect x={-44} y={66} width={88} height={12} rx={4} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
      <path d="M -34 -66 L 34 -66 Q 34 -20 6 0 Q 34 20 34 66 L -34 66 Q -34 20 -6 0 Q -34 -20 -34 -66 Z" fill="rgba(220,240,250,0.55)" stroke={INK.line} strokeWidth={3.5} />
      {top > 0.02 ? <path d={`M ${-28 * top} ${-8 - 50 * top} L ${28 * top} ${-8 - 50 * top} L 0 -4 Z`} fill="#E6B65C" /> : null}
      {p > 0.02 ? <path d={`M -30 62 Q 0 ${62 - 44 * p} 30 62 Z`} fill="#E6B65C" /> : null}
      {p > 0.02 && p < 0.98 ? <line x1={0} y1={-2} x2={0} y2={60} stroke="#E6B65C" strokeWidth={3} /> : null}
    </g>
  );
};

/** Đồng hồ bấm giờ; `turns` = số vòng kim đã quay. */
const Stopwatch: React.FC<{ x: number; y: number; r?: number; turns: number; glow?: number }> = ({ x, y, r = 80, turns, glow = 0 }) => {
  const a = turns * Math.PI * 2;
  const frac = turns % 1;
  return (
    <g>
      {glow > 0.01 ? <circle cx={x} cy={y} r={r + 20} fill="#FFC93C" opacity={glow * 0.5} filter="url(#soft-glow)" /> : null}
      <rect x={x - 14} y={y - r - 30} width={28} height={22} rx={5} fill="#B8B0A2" stroke={INK.line} strokeWidth={3} />
      <circle cx={x} cy={y} r={r + 10} fill="#D9DEE2" stroke={INK.line} strokeWidth={4} />
      <circle cx={x} cy={y} r={r} fill="#FFFDF5" stroke={INK.line} strokeWidth={2.5} />
      {frac > 0.005 ? (
        <path
          d={`M ${x} ${y} L ${x} ${y - r * 0.9} A ${r * 0.9} ${r * 0.9} 0 ${frac > 0.5 ? 1 : 0} 1 ${x + Math.sin(a) * r * 0.9} ${y - Math.cos(a) * r * 0.9} Z`}
          fill="rgba(124,195,110,0.4)"
        />
      ) : null}
      {Array.from({ length: 12 }, (_, i) => {
        const b = (i / 12) * Math.PI * 2;
        return <line key={i} x1={x + Math.sin(b) * r * 0.8} y1={y - Math.cos(b) * r * 0.8} x2={x + Math.sin(b) * r * 0.94} y2={y - Math.cos(b) * r * 0.94} stroke={INK.line} strokeWidth={i % 3 === 0 ? 5 : 3} />;
      })}
      <line x1={x} y1={y} x2={x + Math.sin(a) * r * 0.82} y2={y - Math.cos(a) * r * 0.82} stroke={INK.red} strokeWidth={6} strokeLinecap="round" />
      <circle cx={x} cy={y} r={7} fill={INK.line} />
    </g>
  );
};

// ---------------------------------------------------------------- bếp núc

/** Ngọn lửa bếp ga (boost > 0 bùng to). */
const Flame: React.FC<{ x: number; y: number; s?: number; frame: number; boost?: number }> = ({ x, y, s = 1, frame, boost = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-40, -14, 12, 38].map((fx, i) => {
      const hgt = (26 + wave(frame, 0.5, 6, i * 1.3)) * (1 + boost * 1.6);
      const wd = 11 * (1 + boost * 0.5);
      return (
        <g key={fx}>
          <path d={`M ${fx - wd} 0 Q ${fx - wd - 1} ${-hgt * 0.5} ${fx} ${-hgt} Q ${fx + wd + 1} ${-hgt * 0.5} ${fx + wd} 0 Z`} fill="#FF8A1F" stroke="#B4480A" strokeWidth={2} />
          <path d={`M ${fx - wd * 0.45} 0 Q ${fx - wd * 0.55} ${-hgt * 0.35} ${fx} ${-hgt * 0.6} Q ${fx + wd * 0.55} ${-hgt * 0.35} ${fx + wd * 0.45} 0 Z`} fill="#FFE27A" />
        </g>
      );
    })}
  </g>
);

/** Bếp ga nhỏ đặt trên quầy (gốc: giữa đáy). */
const Stove: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-92} y={-30} width={184} height={30} rx={6} fill="#4A4E55" stroke={INK.line} strokeWidth={4} />
    <circle cx={-60} cy={-15} r={7} fill="#C9CED2" stroke={INK.line} strokeWidth={2} />
    <circle cx={60} cy={-15} r={7} fill="#C9CED2" stroke={INK.line} strokeWidth={2} />
    <path d="M -56 -30 L -50 -42 M 56 -30 L 50 -42 M 0 -30 L 0 -42" stroke={INK.line} strokeWidth={5} strokeLinecap="round" />
  </g>
);

/** Nồi cơm nấu trên bếp ga (nắp hé, nước sôi sùng sục). Gốc: giữa đáy bếp. */
const BoilingPot: React.FC<{ x: number; y: number; frame: number }> = ({ x, y, frame }) => (
  <g>
    <Stove x={x} y={y} />
    <Flame x={x} y={y - 34} frame={frame} s={0.9} />
    <path d={`M ${x - 92} ${y - 150} L ${x + 92} ${y - 150} L ${x + 84} ${y - 50} Q ${x} ${y - 38} ${x - 84} ${y - 50} Z`} fill="#AEB8BF" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <rect x={x - 116} y={y - 136} width={26} height={14} rx={6} fill="#4A4E55" stroke={INK.line} strokeWidth={3} />
    <rect x={x + 90} y={y - 136} width={26} height={14} rx={6} fill="#4A4E55" stroke={INK.line} strokeWidth={3} />
    <ellipse cx={x} cy={y - 150} rx={92} ry={16} fill="#F2F2EC" stroke={INK.line} strokeWidth={4} />
    {Array.from({ length: 7 }, (_, i) => {
      const k = (frame * 0.07 + i * 0.37) % 1;
      return <circle key={i} cx={x - 66 + i * 22} cy={y - 150 - Math.sin(k * Math.PI) * 10} r={4 + k * 6} fill="#FFFFFF" stroke={INK.soft} strokeWidth={2} opacity={1 - k * 0.6} />;
    })}
    <g transform={`rotate(${-12 + wave(frame, 0.6, 3)} ${x + 92} ${y - 154})`}>
      <path d={`M ${x - 94} ${y - 154} Q ${x} ${y - 196} ${x + 94} ${y - 154} Z`} fill="#C9D1D6" stroke={INK.line} strokeWidth={4} />
      <rect x={x - 16} y={y - 196} width={32} height={14} rx={6} fill="#4A4E55" stroke={INK.line} strokeWidth={3} />
    </g>
    <Steam x={x - 10} y={y - 196} p={1} frame={frame} s={1.1} />
  </g>
);

/** Chảo cơm rang (gốc: giữa đáy chảo), cán chảo chĩa sang phải. */
const Pan: React.FC<{ x: number; y: number; s?: number; rice?: boolean; toss?: number }> = ({ x, y, s = 1, rice = true, toss = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 96 -26 L 196 -48" stroke={INK.line} strokeWidth={16} strokeLinecap="round" />
    <path d="M 96 -26 L 196 -48" stroke="#7A4A26" strokeWidth={10} strokeLinecap="round" />
    <path d="M -104 -34 Q -96 0 0 0 Q 96 0 104 -34 Z" fill="#3E4248" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx={0} cy={-34} rx={104} ry={18} fill="#2A2D31" stroke={INK.line} strokeWidth={4} />
    {rice ? (
      <g transform={`translate(0 ${-toss * 16})`}>
        <path d="M -86 -36 Q -60 -66 0 -68 Q 60 -66 86 -36 Q 0 -24 -86 -36 Z" fill="#F4D774" stroke={INK.line} strokeWidth={2.5} />
        {[-60, -36, -12, 14, 38, 62, -46, -2, 26].map((gx, i) => (
          <circle key={i} cx={gx} cy={i < 6 ? -44 : -56} r={5} fill={i % 3 === 0 ? "#6DBE5A" : i % 3 === 1 ? "#E8743B" : "#FFF6D0"} stroke={INK.line} strokeWidth={1.4} />
        ))}
      </g>
    ) : null}
  </g>
);

/** Hộp nhựa nông chứa cơm (gốc: giữa đáy), `fill` 0..1, có nắp xanh khi `lid`. */
const Box: React.FC<{ x: number; y: number; s?: number; fill?: number; lid?: number }> = ({ x, y, s = 1, fill = 1, lid = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -46 -36 L 46 -36 L 40 0 L -40 0 Z" fill="rgba(225,240,248,0.9)" stroke={INK.line} strokeWidth={3.5} strokeLinejoin="round" />
    {fill > 0.02 ? <path d={`M -43 -32 Q 0 ${-32 - 18 * fill} 43 -32 L 40 -4 L -40 -4 Z`} fill={RICE} stroke={INK.soft} strokeWidth={2} opacity={Math.min(1, fill * 2)} /> : null}
    {lid > 0.01 ? <rect x={-50} y={-44 - (1 - lid) * 30} width={100} height={10} rx={4} fill="#5BB5D9" stroke={INK.line} strokeWidth={3} opacity={Math.min(1, lid * 2)} /> : null}
  </g>
);

/** Tủ lạnh (gốc: góc trên trái), cửa ngăn mát mở theo `door` (0 đóng, 1 mở), bên trong là `children`. */
const Fridge: React.FC<{ x: number; y: number; w: number; h: number; door: number; children?: React.ReactNode }> = ({ x, y, w, h, door, children }) => {
  const k = Math.cos(Math.min(1, door) * 1.35);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill="#E6EEF2" stroke={INK.line} strokeWidth={4} />
      <rect x={x + 10} y={y + 10} width={w - 20} height={h * 0.62} rx={6} fill="#CFEAF7" stroke={INK.line} strokeWidth={3} />
      {[0.22, 0.42].map((f) => (
        <line key={f} x1={x + 10} y1={y + 10 + h * f} x2={x + w - 10} y2={y + 10 + h * f} stroke="#8FB7CC" strokeWidth={4} />
      ))}
      {children}
      <g transform={`translate(${x + w} 0) scale(${Math.max(0.03, k)} 1) translate(${-(x + w)} 0)`}>
        <rect x={x} y={y} width={w} height={h * 0.66} rx={12} fill="#F4F8FA" stroke={INK.line} strokeWidth={4} />
        <rect x={x + 14} y={y + 40} width={10} height={90} rx={5} fill="#B8C4CB" stroke={INK.line} strokeWidth={2.5} />
        <path d={`M ${x + w / 2 + 8} ${y + 70} l 0 44 m -19 -33 l 38 22 m 0 -22 l -38 22`} stroke={COLD} strokeWidth={5} strokeLinecap="round" />
      </g>
      <rect x={x} y={y + h * 0.66 + 6} width={w} height={h * 0.34 - 6} rx={12} fill="#F4F8FA" stroke={INK.line} strokeWidth={4} />
      <rect x={x + 14} y={y + h * 0.7} width={10} height={60} rx={5} fill="#B8C4CB" stroke={INK.line} strokeWidth={2.5} />
    </g>
  );
};

/** Lịch treo: trang cũ lật bay lên (flip 0 → 1), lộ trang mới có chữ `after`. */
const Calendar: React.FC<{ x: number; y: number; flip: number; after: string }> = ({ x, y, flip, after }) => (
  <g>
    <rect x={x - 112} y={y - 76} width={224} height={164} rx={8} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
    <rect x={x - 112} y={y - 76} width={224} height={40} rx={8} fill={INK.red} stroke={INK.line} strokeWidth={4} />
    <text x={x} y={y + 44} textAnchor="middle" fill={INK.red} fontSize={38} {...T}>
      {after}
    </text>
    {flip < 0.99 ? (
      <g transform={`translate(${x} ${y - 36}) rotate(${-flip * 50}) scale(1 ${1 - flip * 0.85}) translate(${-x} ${-(y - 36)})`} opacity={1 - flip * flip}>
        <rect x={x - 112} y={y - 36} width={224} height={124} fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
        <text x={x} y={y + 54} textAnchor="middle" fill={INK.line} fontSize={76} {...T}>
          ?
        </text>
      </g>
    ) : null}
    {[-60, -20, 20, 60].map((rx) => (
      <rect key={rx} x={x + rx - 4} y={y - 86} width={8} height={22} rx={3} fill="#9AA3A8" stroke={INK.line} strokeWidth={2} />
    ))}
  </g>
);

/** Thẻ số bước tròn vàng. */
const StepTag: React.FC<{ x: number; y: number; n: number; p: number }> = ({ x, y, n, p }) => (
  <Pop p={p} cx={x} cy={y}>
    <circle cx={x} cy={y} r={30} fill={INK.goldFill} stroke={INK.line} strokeWidth={4} />
    <text x={x} y={y + 14} textAnchor="middle" fill={INK.line} fontSize={40} {...T}>
      {n}
    </text>
  </Pop>
);

/** Kính lúp: vòng kính + cán, bên trong là `children` (đã phóng to sẵn). */
const Lens: React.FC<{ x: number; y: number; r: number; p: number; id: string; handle?: number; children: React.ReactNode }> = ({ x, y, r, p, id, handle = 135, children }) => {
  const a = (handle * Math.PI) / 180;
  return (
    <Pop p={p} cx={x} cy={y}>
      <line x1={x + Math.cos(a) * r} y1={y + Math.sin(a) * r} x2={x + Math.cos(a) * (r + 80)} y2={y + Math.sin(a) * (r + 80)} stroke={INK.line} strokeWidth={22} strokeLinecap="round" />
      <line x1={x + Math.cos(a) * r} y1={y + Math.sin(a) * r} x2={x + Math.cos(a) * (r + 80)} y2={y + Math.sin(a) * (r + 80)} stroke="#7A4A26" strokeWidth={15} strokeLinecap="round" />
      <clipPath id={id}>
        <circle cx={x} cy={y} r={r} />
      </clipPath>
      <circle cx={x} cy={y} r={r} fill="#F3F8F4" />
      <g clipPath={`url(#${id})`}>{children}</g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={INK.line} strokeWidth={16} />
      <circle cx={x} cy={y} r={r} fill="none" stroke={BRASS} strokeWidth={10} />
      <path d={`M ${x - r * 0.62} ${y - r * 0.32} A ${r * 0.7} ${r * 0.7} 0 0 1 ${x - r * 0.25} ${y - r * 0.66}`} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={6} strokeLinecap="round" />
    </Pop>
  );
};

/** Hạt cơm phóng to. */
const Grain: React.FC<{ x: number; y: number; rx: number; ry: number; rot?: number }> = ({ x, y, rx, ry, rot = -12 }) => (
  <g transform={`rotate(${rot} ${x} ${y})`}>
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={RICE} stroke={INK.line} strokeWidth={4} />
    <ellipse cx={x - rx * 0.3} cy={y - ry * 0.35} rx={rx * 0.4} ry={ry * 0.18} fill="rgba(230,220,190,0.6)" />
  </g>
);

// ---------------------------------------------------------------- hồi 1: mở đầu (căn bếp buổi sáng)

/** Tấm bảng ba ô Milo giơ lên bằng hai que (bám theo hai bàn tay). */
const VoteBoard: React.FC<{ ps: PoseState; x: number; frame: number; p: number }> = ({ ps, x, frame, p }) => {
  if (p <= 0.01) return null;
  const hl = handAt("L", x, ps, frame);
  const hr = handAt("R", x, ps, frame);
  const by = (hl.y + hr.y) / 2 - 92;
  const cells: [string, string, string][] = [
    ["TIN ĐƯỢC", INK.green, "#FFFFFF"],
    ["TIN ĐỒN", INK.red, "#FFFFFF"],
    ["TÙY?", INK.goldFill, INK.line],
  ];
  return (
    <Fade p={p} dy={50}>
      {[hl, hr].map((h, i) => (
        <g key={i}>
          <line x1={h.x} y1={h.y + 6} x2={h.x} y2={by} stroke={INK.line} strokeWidth={11} strokeLinecap="round" />
          <line x1={h.x} y1={h.y + 6} x2={h.x} y2={by} stroke={INK.wood} strokeWidth={6} strokeLinecap="round" />
        </g>
      ))}
      <rect x={x - 306} y={by - 124} width={612} height={124} rx={14} fill="rgba(40,24,10,0.25)" transform="translate(6 8)" />
      <rect x={x - 306} y={by - 124} width={612} height={124} rx={14} fill="#FFF6DD" stroke={INK.line} strokeWidth={5} />
      {cells.map(([t, c, tc], i) => (
        <g key={t}>
          <rect x={x - 296 + i * 200} y={by - 114} width={192} height={104} rx={10} fill={c} stroke={INK.line} strokeWidth={3} />
          <text x={x - 200 + i * 200} y={by - 48} textAnchor="middle" fill={tc} fontSize={i === 2 ? 44 : 32} {...T}>
            {t}
          </text>
        </g>
      ))}
    </Fade>
  );
};

const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  const MX = 480;
  const b1 = li === 0 ? pop(lf, fps, 8) : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const b2 = li === 0 ? pop(lf, fps, 40) : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const rew = li === 1 ? ease(lf, 12, 52) : 0;
  const back = li === 2 ? ease(lf, 0, 26) : 0;
  const hours = li === 1 ? 7 - 10 * rew : li === 2 ? -3 + 10 * back : 7;
  const night = li === 1 ? rew : li === 2 ? 1 - back : 0;
  const zoom = li === 1 ? ease(lf, 0, 20) : li === 2 ? 1 - ease(lf, 0, 20) : 0;
  const ps: PoseState =
    li === 0
      ? lf < 40
        ? poseAt(lf, 8, "idle", "point")
        : poseAt(lf, 40, "point", "pointR")
      : li === 1
        ? { pose: "scratch", prevPose: "pointR", poseT: ease(lf, 0, 12) }
        : { pose: "eureka", prevPose: "scratch", poseT: ease(lf, 6, 12) };
  const cards: [string, string][] = [
    ["CƠM NGUỘI ĐỂ QUA ĐÊM", "Có sao đâu · hay thành độc?"],
    ["VẬY AI ĐÚNG?", "Quyết định ở mấy tiếng sau khi tắt bếp"],
    ["TIN ĐƯỢC · TIN ĐỒN · HAY TÙY?", "Ghi lựa chọn vào bình luận!"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  return (
    <g>
      <Kitchen frame={frame} night={night} />
      <g transform={`translate(480 205) scale(${1 + 0.5 * zoom}) translate(-480 -205)`}>
        <WallClock x={480} y={205} r={50} h={hours} glow={li === 1 ? ease(lf, 0, 14) : 0} />
      </g>
      {li === 1 ? (
        <Fade p={ease(lf, 56, 16)} dy={12}>
          <text x={480} y={352} textAnchor="middle" fill={INK.red} fontSize={46} fontStyle="italic" {...T}>
            mấy tiếng đầu…
          </text>
        </Fade>
      ) : null}
      <RiceBowl x={220} y={596} s={1 + (li === 2 ? 0.22 * ease(lf, 80, 40) : 0)} />
      <RiceCooker x={720} y={596} frame={frame} light={0} steam={night} />
      <Bubble x={235} y={222} w={330} lines={["ĂN BAO NĂM", "CÓ SAO ĐÂU!"]} color={INK.green} p={b1} tail={[300, 330]} size={36} />
      <Bubble x={728} y={222} w={346} lines={["ĐỂ QUA ĐÊM", "LÀ THÀNH ĐỘC!"]} color={INK.red} p={b2} tail={[660, 330]} size={36} />
      <Milo x={MX} ps={ps} frame={frame} apron />
      {li === 2 ? <VoteBoard ps={ps} x={MX} frame={frame} p={ease(lf, 14, 16)} /> : null}
      {li === 2 ? <DownArrow x={850} y={500} p={pop(lf, fps, 40)} frame={frame} /> : null}
      <Card title={title} formula={formula} p={1} fp={li === 0 ? 1 : pop(lf, fps, 0)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2: rào cản (chia đôi sân khấu)

/** Tủ bếp treo tường, hai cánh mở thấy hộp cơm. */
const Cupboard: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x - 116} y={y - 66} width={232} height={132} rx={8} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
    <rect x={x - 104} y={y - 54} width={208} height={108} fill="#5A3A20" />
    <line x1={x - 104} y1={y + 8} x2={x + 104} y2={y + 8} stroke={INK.woodDark} strokeWidth={5} />
    <Box x={x - 44} y={y + 6} s={0.7} fill={1} lid={1} />
    <Box x={x + 44} y={y + 6} s={0.7} fill={1} lid={1} />
    <Box x={x} y={y + 52} s={0.7} fill={1} lid={1} />
    <path d={`M ${x - 104} ${y - 54} L ${x - 146} ${y - 64} L ${x - 146} ${y + 64} L ${x - 104} ${y + 54} Z`} fill="#C4843F" stroke={INK.line} strokeWidth={3.5} />
    <path d={`M ${x + 104} ${y - 54} L ${x + 146} ${y - 64} L ${x + 146} ${y + 64} L ${x + 104} ${y + 54} Z`} fill="#C4843F" stroke={INK.line} strokeWidth={3.5} />
  </g>
);

const Barrier: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const lens = li === 1 ? pop(lf, fps, 6) : li > 1 ? 1 : 0;
  const tag = li === 1 ? pop(lf, fps, 28) : li > 1 ? 1 : 0;
  const crossP = li === 1 ? pop(lf, fps, 54) : li > 1 ? 1 : 0;
  const leftO = li === 2 ? 1 - 0.45 * ease(lf, 0, 16) : 1;
  const rightO = li === 2 ? 0.4 + 0.6 * ease(lf, 0, 14) : 0.4;
  const oldSign = li === 2 ? pop(lf, fps, 4) * (1 - ease(lf, 42, 12)) : 0;
  const strike = li === 2 ? ease(lf, 22, 14) : 0;
  const newSign = li === 2 ? pop(lf, fps, 48) : 0;
  const cupP = li === 2 ? pop(lf, fps, 36) : 0;
  const arrow = li === 2 ? ease(lf, 46, 18) : 0;
  const cards: [string, string, boolean][] = [
    ["PHE YÊN TÂM", "Nấu sôi kỹ → sạch hẳn?", true],
    ["NHS · GẠO SỐNG CÓ THỂ MANG BÀO TỬ", "Bào tử sống sót qua nồi cơm", false],
    ["CƠ QUAN TIÊU CHUẨN THỰC PHẨM ANH", "Lỗi ở cách cất, không ở lúc hâm", false],
  ];
  const [title, formula, ok] = cards[Math.min(li, 2)];
  return (
    <g>
      <rect x={70} y={108} width={330} height={664} rx={22} fill="rgba(255,190,120,0.18)" stroke={INK.soft} strokeWidth={3} strokeDasharray="12 10" />
      <rect x={570} y={108} width={330} height={664} rx={22} fill="rgba(150,200,230,0.18)" stroke={INK.soft} strokeWidth={3} strokeDasharray="12 10" />
      {/* Bên trái: nồi cơm sôi → kính lúp lộ bào tử */}
      <g opacity={leftO}>
        <BoilingPot x={235} y={770} frame={frame} />
        {li === 0
          ? [
              [170, 470, -20],
              [295, 445, 15],
              [225, 405, 5],
              [320, 505, -10],
            ].map(([gx, gy, gr], i) => {
              const dead = ease(lf, 34 + i * 5, 8);
              const gone = ease(lf, 58 + i * 4, 12);
              return (
                <g key={i} opacity={Math.min(1, pop(lf, fps, 6 + i * 4)) * (1 - gone)}>
                  <Rod x={gx} y={gy - gone * 40} s={0.7} rot={gr + wave(frame, 0.1, 6, i)} frame={frame} dead={dead > 0.5 ? 1 : 0} />
                </g>
              );
            })
          : null}
        <Lens x={235} y={380} r={100} p={lens} id="e03-lens-a" handle={45}>
          <Grain x={235} y={380} rx={92} ry={52} />
          <Spore x={250} y={384} s={1.1} frame={frame} shine={1} />
        </Lens>
        <Pop p={tag} cx={235} cy={536}>
          <Sign x={235} y={536} w={318} lines={["BÀO TỬ", "BACILLUS CEREUS"]} color={INK.red} size={30} />
        </Pop>
        <Pop p={li === 0 ? pop(lf, fps, 14) : 1} cx={235} cy={190}>
          <Sign x={235} y={190} w={300} lines={["ĐÃ NẤU CHÍN", "= SẠCH?"]} color={INK.blue} size={38} />
        </Pop>
        <Cross x={235} y={190} r={58} bare p={crossP} />
      </g>
      {/* Bên phải: chảo hâm cơm → cách cất mới là chuyện */}
      <g opacity={rightO}>
        <Stove x={735} y={770} />
        <Flame x={735} y={736} frame={frame} s={0.85} />
        <Pan x={718} y={728} s={0.8} />
        <Steam x={710} y={660} p={1} frame={frame} />
        <ArcArrow x1={640} y1={640} x2={668} y2={462} arc={30} p={arrow} color={INK.green} w={8} />
        <Pop p={cupP} cx={735} cy={380}>
          <Cupboard x={735} y={380} />
        </Pop>
        {oldSign > 0.01 ? (
          <Pop p={oldSign} cx={735} cy={190}>
            <Sign x={735} y={190} w={300} lines={["HÂM LẠI", "LÀ HỎNG?"]} color={INK.blue} size={38} />
            <DrawLine p={strike} x1={598} y1={150} x2={872} y2={232} stroke={INK.red} strokeWidth={11} strokeLinecap="round" />
          </Pop>
        ) : null}
        <Pop p={newSign} cx={735} cy={190}>
          <Sign x={735} y={190} w={316} lines={["CẤT THẾ NÀO", "MỚI LÀ CHUYỆN"]} color={INK.green} size={34} />
        </Pop>
      </g>
      <Milo x={485} scale={0.92} ps={linePose(li, lf, ["touch", "scratch", "pointR"])} frame={frame} notebook badge="?" badgeP={li === 1 ? pop(lf, fps, 70) : 0} />
      <Card title={title} formula={formula} p={pop(bf, fps, 6)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3: eureka (phòng thí nghiệm)

/** Nền phòng thí nghiệm: tường kẻ ô, giá bình thủy tinh, bàn thí nghiệm. */
const Lab: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={60} y={93} width={850} height={600} fill="rgba(215,235,240,0.35)" />
    {Array.from({ length: 9 }, (_, i) => (
      <line key={i} x1={60 + i * 100} y1={93} x2={60 + i * 100} y2={690} stroke="rgba(120,150,160,0.15)" strokeWidth={2} />
    ))}
    <line x1={650} y1={176} x2={890} y2={176} stroke={INK.woodDark} strokeWidth={8} strokeLinecap="round" />
    {[680, 740, 800, 856].map((fx, i) => (
      <g key={fx}>
        <path d={`M ${fx - 10} 120 L ${fx + 10} 120 L ${fx + 10} 138 L ${fx + 22} 172 L ${fx - 22} 172 L ${fx - 10} 138 Z`} fill="rgba(230,245,250,0.8)" stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
        <path d={`M ${fx - 18} 160 L ${fx + 18} 160 L ${fx + 22} 172 L ${fx - 22} 172 Z`} fill={["#7CC36E", "#E8743B", "#5BB5D9", "#F2BE4A"][i]} opacity={0.8 + wave(frame, 0.1, 0.2, i)} />
      </g>
    ))}
    <rect x={66} y={690} width={640} height={22} rx={4} fill="#8F9AA1" stroke={INK.line} strokeWidth={4} />
    <rect x={80} y={712} width={612} height={68} fill="#6F7A82" stroke={INK.line} strokeWidth={4} />
  </g>
);

/** Đám vi khuẩn xếp xoắn ốc quanh tâm, hiện dần `count` con (con mới bật ra). */
const SWARM = Array.from({ length: 320 }, (_, i) => {
  const r = 168 * Math.sqrt((i + 0.5) / 320);
  const a = i * 2.39996;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.92, rot: (a * 180) / Math.PI + 90 };
});

const Swarm: React.FC<{ cx: number; cy: number; count: number; frame: number }> = ({ cx, cy, count, frame }) => (
  <g>
    {SWARM.map((d, i) => {
      const k = Math.min(1, Math.max(0, count - i));
      if (k <= 0.01) return null;
      return (
        <g key={i} transform={`translate(${cx + d.x + wave(frame, 0.08, 1.5, i)} ${cy + d.y}) rotate(${d.rot}) scale(${k})`}>
          <rect x={-10} y={-5} width={20} height={10} rx={5} fill={GERM} stroke={OUTLINE} strokeWidth={1.8} />
        </g>
      );
    })}
  </g>
);

const Eureka: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  // câu 1: hai nhiệt kế
  const t1 = li === 0 ? 25 + 75 * ease(lf, 6, 34) : 100;
  const t2 = li === 0 ? 25 + 96 * ease(lf, 6, 40) : 121;
  const thermO = li === 0 ? ease(lf, 0, 12) : li === 1 ? 1 : 0;
  const t2O = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const t1O = li <= 1 ? (li === 1 ? 1 - ease(lf, 34, 14) : 1) : 0;
  const glass = li === 0 ? pop(lf, fps, 36) : 1;
  const sand = li === 0 ? ease(lf, 40, 22) : 1;
  const dead2 = li === 0 ? ease(lf, 58, 14) : 1;
  // câu 2: bào tử ngủ → ra bàn bếp ban đêm → cởi áo, nảy mầm
  const move = li === 1 ? ease(lf, 30, 22) : 0;
  const nightP = li === 1 ? ease(lf, 30, 18) : li === 2 ? 1 - ease(lf, 0, 12) : 0;
  const openP = li === 1 ? ease(lf, 48, 14) : 0;
  const rodP = li === 1 ? pop(lf, fps, 56) : 0;
  // câu 3–4: chia đôi theo đồng hồ 20 phút → 24 lần
  const sw = li === 2 ? ease(lf, 0, 14) : li === 3 ? 1 : 0;
  const turns = li === 2 ? ease(lf, 10, 30) : li === 3 ? 1 + 24 * Math.min(1, Math.max(0, (lf - 4) / 58)) : 0;
  const nDiv = li === 3 ? Math.min(24, Math.floor(24 * Math.min(1, Math.max(0, (lf - 4) / 58)))) : 0;
  const split = li === 2 ? ease(lf, 30, 26) : 0;
  const swarmO = li === 3 ? 1 : li === 4 ? 1 - ease(lf, 0, 14) : 0;
  // câu 5: độc tố quanh hạt cơm, lửa bùng mà độc tố vẫn còn
  const pan = li === 4 ? ease(lf, 6, 16) : 0;
  const boost = li === 4 ? ease(lf, 30, 10) * (1 - 0.6 * ease(lf, 56, 20)) : 0;
  const rodDead = li === 4 ? ease(lf, 44, 6) : 0;
  const goggles = li === 3 ? ease(lf, 0, 12) : li > 3 ? 1 : 0;
  const ps: PoseState =
    li === 3 ? { pose: "eureka", prevPose: "point", poseT: ease(lf, 6, 12) } : li === 4 ? { pose: "scratch", prevPose: "eureka", poseT: ease(lf, 0, 12) } : linePose(li, lf, ["point", "present", "point"]);
  const cards: [string, string][] = [
    ["TRUNG TÂM AN TOÀN THỰC PHẨM HỒNG KÔNG", "Diệt bào tử: 121 °C suốt 3 phút"],
    ["NỒI CƠM CHỈ SÔI QUANH 100 °C", "Bào tử nằm im → nảy mầm, sinh sôi"],
    ["NHANH CỠ NÀO?", "Cứ 20 phút chia đôi"],
    ["LÝ THUYẾT · ĐIỀU KIỆN LÝ TƯỞNG", "8 giờ = 24 lần chia → hơn 16 triệu"],
    ["THEO NHS", "Hâm nóng không xóa được độc tố"],
  ];
  const [title, formula] = cards[Math.min(li, 4)];
  const count = li === 3 ? 2 ** nDiv : 0;
  const yOf = (v: number) => 560 - (v / 130) * 360;
  return (
    <g>
      <Lab frame={frame} />
      {/* Ban đêm ở bàn bếp (câu 2) */}
      {nightP > 0.01 ? (
        <g opacity={nightP}>
          <rect x={390} y={124} width={230} height={150} rx={8} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
          <rect x={402} y={136} width={206} height={126} fill="url(#e03-night)" />
          <path d="M 560 160 A 20 20 0 1 0 578 188 A 15 15 0 1 1 560 160 Z" fill="#FFF3C4" />
          <circle cx={430} cy={170} r={3} fill="#FFF8E7" />
          <circle cx={470} cy={225} r={2.5} fill="#FFF8E7" />
          <RiceBowl x={300} y={690} s={0.8} plate={0} />
          <Sign x={505} y={318} w={300} lines={["NHIỆT ĐỘ PHÒNG"]} color={INK.gold} size={32} />
        </g>
      ) : null}
      {/* Hai nhiệt kế: nồi cơm 100 °C, nồi hấp 121 °C */}
      {thermO > 0.01 && t1O > 0.01 ? (
        <g opacity={thermO * t1O}>
          <Thermo x={160} top={200} bottom={560} t={t1} marks={li === 1 ? [100] : []} />
          <text x={196} y={yOf(t1) + 14} fill={INK.red} fontSize={40} {...T}>
            {Math.round(t1)} °C
          </text>
          <text x={160} y={760} textAnchor="middle" fill="#FFFFFF" fontSize={36} {...T}>
            NỒI CƠM
          </text>
        </g>
      ) : null}
      {thermO > 0.01 && t2O > 0.01 ? (
        <g opacity={thermO * t2O}>
          <Thermo x={450} top={200} bottom={560} t={t2} />
          <text x={486} y={yOf(t2) + 14} fill={INK.red} fontSize={40} {...T}>
            {Math.round(t2)} °C
          </text>
          <text x={450} y={760} textAnchor="middle" fill="#FFFFFF" fontSize={36} {...T}>
            NỒI HẤP
          </text>
          <Pop p={glass} cx={600} cy={360}>
            <Hourglass x={600} y={352} s={0.72} p={sand} />
            <text x={600} y={440} textAnchor="middle" fill={INK.line} fontSize={36} {...T}>
              3 PHÚT
            </text>
          </Pop>
          <Spore x={575} y={540} s={1.4} frame={frame} dead={dead2} />
        </g>
      ) : null}
      {li <= 1 ? (
        <g opacity={li === 0 ? thermO : 1 - ease(lf, 58, 8)}>
          <Spore
            x={mix(282, 470, move)}
            y={mix(540, 470, move)}
            s={mix(1.4, 2.4, move)}
            frame={frame}
            shine={li === 0 ? ease(lf, 60, 10) : 0}
            sleep={li === 1 ? ease(lf, 4, 10) * (1 - openP) : 0}
            open={openP}
          />
        </g>
      ) : null}
      {li === 1 || (li === 2 && lf < 12) ? (
        <g opacity={li === 2 ? 1 - ease(lf, 0, 12) : 1}>
          <Pop p={li === 2 ? 1 : rodP} cx={470} cy={470}>
            <Rod x={470} y={470} s={2} rot={wave(frame, 0.08, 8)} frame={frame} />
          </Pop>
          {[
            [372, 556, 30, 72],
            [575, 560, -25, 80],
          ].map(([rx, ry, rr, d], i) => (
            <Pop key={i} p={li === 2 ? 1 : pop(lf, fps, d)} cx={rx} cy={ry}>
              <Rod x={rx} y={ry} s={1.2} rot={rr + wave(frame, 0.1, 10, i)} frame={frame} />
            </Pop>
          ))}
        </g>
      ) : null}
      {/* Đồng hồ 20 phút + phép chia đôi */}
      {sw > 0.01 ? (
        <Fade p={sw}>
          <Stopwatch x={200} y={330} r={84} turns={turns} glow={li === 2 ? ease(lf, 38, 8) * (1 - ease(lf, 50, 16)) : 0} />
          <text x={200} y={482} textAnchor="middle" fill={INK.line} fontSize={46} {...T}>
            {li === 3 ? "8 GIỜ" : "20 PHÚT"}
          </text>
          {li === 3 ? (
            <text x={200} y={548} textAnchor="middle" fill={INK.blue} fontSize={44} {...T}>
              n = {nDiv}
            </text>
          ) : null}
        </Fade>
      ) : null}
      {li === 2 || (li === 3 && lf < 12) ? (
        <g opacity={li === 3 ? 1 - ease(lf, 0, 12) : 1}>
          <Rod x={490} y={500} s={2.1} k={li === 3 ? 1 : split} frame={frame} rot={wave(frame, 0.05, 3)} />
          <Pop p={li === 3 ? 1 : pop(lf, fps, 56)} cx={490} cy={370}>
            <circle cx={490} cy={370} r={50} fill={INK.green} stroke={INK.line} strokeWidth={4} />
            <text x={490} y={388} textAnchor="middle" fill="#FFFFFF" fontSize={48} {...T}>
              ×2
            </text>
          </Pop>
        </g>
      ) : null}
      {swarmO > 0.01 ? (
        <g opacity={swarmO}>
          <Swarm cx={510} cy={500} count={li === 3 ? count : 320} frame={frame} />
          <rect x={300} y={160} width={420} height={78} rx={14} fill="#FFFDF5" stroke={INK.green} strokeWidth={5} />
          <text x={510} y={220} textAnchor="middle" fill={INK.green} fontSize={58} {...T}>
            {(li === 3 ? count : 2 ** 24).toLocaleString("vi-VN")}
          </text>
          <Fade p={li === 3 ? ease(lf, 20, 14) : 1}>
            <Sign x={390} y={738} w={560} lines={["LÝ THUYẾT · 8 GIỜ = 24 LẦN CHIA"]} color={INK.line} size={30} />
          </Fade>
        </g>
      ) : null}
      {/* Chảo hâm: độc tố vẫn còn */}
      {pan > 0.01 ? (
        <Fade p={pan} dy={30}>
          <Stove x={380} y={690} />
          <Flame x={380} y={656} frame={frame} boost={boost} s={1.2} />
          <Pan x={360} y={640} s={1.45} />
          {[
            [280, 530, -10],
            [360, 520, 12],
            [440, 532, -6],
          ].map(([rx, ry, rr], i) => (
            <g key={i} opacity={1 - ease(lf, 56 + i * 3, 12)}>
              <Rod x={rx} y={ry - ease(lf, 56, 20) * 30} s={0.75} rot={rr} frame={frame} dead={rodDead} />
            </g>
          ))}
          {Array.from({ length: 14 }, (_, i) => {
            const tx = 200 + ((i * 53) % 330);
            const ty = 330 + ((i * 41) % 190);
            return <Toxin key={i} x={tx} y={ty} r={14} p={Math.min(1, pop(lf, fps, 10 + i * 2))} frame={frame} i={i} />;
          })}
          <Pop p={pop(lf, fps, 22)} cx={620} cy={300}>
            <Sign x={620} y={300} w={190} lines={["ĐỘC TỐ"]} color={TOXIN} size={36} />
          </Pop>
          <StampMark x={390} y={190} lines={["HÂM NÓNG", "KHÔNG XÓA ĐƯỢC"]} p={ease(lf, 60, 8)} size={40} rot={-4} />
        </Fade>
      ) : null}
      <Milo x={815} ps={ps} frame={frame} coat goggles={goggles} badge="!!!" badgeP={li === 3 ? pop(lf, fps, 40) : 0} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} ok={li !== 4} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4: định lý (bảng giấy da của học giả)

/** Trực khuẩn có nội bào tử bên trong (vẽ dần viền, rồi bào tử bật ra). */
const CellWithSpore: React.FC<{ draw: number; spore: number; frame: number }> = ({ draw, spore, frame }) => (
  <g>
    {draw > 0.6 ? (
      <g opacity={(draw - 0.6) / 0.4}>
        <path d="M 270 330 L 510 330 A 95 95 0 0 1 510 520 L 270 520 A 95 95 0 0 1 270 330 Z" fill="rgba(124,195,110,0.45)" />
        {[
          [250, 380],
          [300, 470],
          [350, 400],
          [390, 480],
          [230, 450],
        ].map(([dx, dy], i) => (
          <circle key={i} cx={dx} cy={dy + wave(frame, 0.06, 3, i)} r={6} fill="rgba(60,110,50,0.45)" />
        ))}
        {[-1, 1].map((d) => (
          <path
            key={d}
            d={`M ${d < 0 ? 176 : 604} 425 q ${d * 20} ${-16 + wave(frame, 0.2, 6)} ${d * 40} 0 q ${d * 20} ${16 - wave(frame, 0.2, 6)} ${d * 40} 0`}
            fill="none"
            stroke={INK.line}
            strokeWidth={5}
            strokeLinecap="round"
          />
        ))}
      </g>
    ) : null}
    <DrawPath p={draw} length={1077} d="M 270 330 L 510 330 A 95 95 0 0 1 510 520 L 270 520 A 95 95 0 0 1 270 330 Z" fill="none" stroke={INK.line} strokeWidth={8} strokeLinejoin="round" />
    <Pop p={spore} cx={475} cy={425}>
      <ellipse cx={475} cy={425} rx={58} ry={42} fill="#E8D46A" stroke="#8A5A10" strokeWidth={14} />
      <ellipse cx={475} cy={425} rx={58} ry={42} fill="none" stroke={INK.line} strokeWidth={3} />
      <ellipse cx={475} cy={425} rx={30} ry={18} fill="#F6E9A8" stroke={INK.line} strokeWidth={2.5} />
    </Pop>
  </g>
);

/** Công thức N = N₀ · 2ⁿ (chỉ số dưới, số mũ vẽ bằng tspan). */
const Formula: React.FC<{ x: number; y: number; size: number; color?: string }> = ({ x, y, size, color = INK.line }) => (
  <text x={x} y={y} textAnchor="middle" fill={color} fontSize={size} {...T}>
    N = N
    <tspan fontSize={size * 0.55} dy={size * 0.22}>
      0
    </tspan>
    <tspan dy={-size * 0.22}> · 2</tspan>
    <tspan fontSize={size * 0.6} dy={-size * 0.42} fill={INK.red}>
      n
    </tspan>
  </text>
);

const Theorem: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const draw = li === 0 ? ease(lf, 8, 30) : li === 1 ? 1 : 0;
  const sporeP = li === 0 ? pop(lf, fps, 34) : li === 1 ? 1 : 0;
  const shrink = li === 1 ? ease(lf, 0, 20) : 0;
  const part1 = li === 2 ? 1 - ease(lf, 0, 12) : li < 2 ? 1 : 0;
  const lbl = li === 0 ? ease(lf, 46, 14) : 1;
  const ecoli = li === 1 ? pop(lf, fps, 16) : 0;
  const split = li === 1 ? ease(lf, 26, 30) : 0;
  const s = 1 - 0.5 * shrink;
  const cx = mix(390, 236, shrink);
  const cy = mix(425, 360, shrink);
  const cards: [string, string][] = [
    ["SINH HỌC 10 · BÀI 21", "Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật"],
    ["NỘI BÀO TỬ · VÍ DỤ E. COLI", "Cứ 20 phút phân chia một lần"],
    ["THỜI GIAN THẾ HỆ = 20 PHÚT", "Hai mũ 24 = hơn 16 triệu"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  const groups = [1, 2, 4, 8];
  const gx = [138, 258, 400, 586];
  return (
    <g>
      {/* Bảng giấy da */}
      <rect x={74} y={110} width={632} height={630} rx={16} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
      <rect x={90} y={126} width={600} height={598} rx={8} fill="#FBF3DC" stroke={INK.woodDark} strokeWidth={3} />
      <Pop p={li === 0 ? pop(lf, fps, 6) : 1} cx={294} cy={164}>
        <rect x={104} y={138} width={380} height={54} rx={8} fill={INK.red} stroke={INK.line} strokeWidth={3} />
        <rect x={104} y={138} width={18} height={54} fill="#8E2A20" />
        <text x={302} y={176} textAnchor="middle" fill="#FFFFFF" fontSize={30} {...T}>
          SINH HỌC 10 · BÀI 21
        </text>
      </Pop>
      {part1 > 0.01 ? (
        <g opacity={part1}>
          <g transform={`translate(${cx} ${cy}) scale(${s}) translate(-390 -425)`}>
            <CellWithSpore draw={draw} spore={sporeP} frame={frame} />
          </g>
          <Fade p={lbl}>
            <line x1={mix(420, 236, shrink)} y1={mix(586, 482, shrink)} x2={cx + 85 * s} y2={cy + 40 * s} stroke={INK.red} strokeWidth={4} />
            <text x={mix(400, 236, shrink)} y={mix(626, 516, shrink)} textAnchor="middle" fill={INK.red} fontSize={mix(52, 36, shrink)} {...T}>
              NỘI BÀO TỬ
            </text>
          </Fade>
          {li === 1 ? (
            <g>
              <Pop p={ecoli} cx={530} cy={400}>
                <text x={530} y={300} textAnchor="middle" fill={INK.blue} fontSize={44} {...T}>
                  E. COLI
                </text>
                <Rod x={530} y={400} s={1.75} k={split} frame={frame} />
              </Pop>
              <Pop p={pop(lf, fps, 22)} cx={400} cy={610}>
                <Stopwatch x={300} y={610} r={46} turns={ease(lf, 26, 30)} />
                <text x={366} y={628} fill={INK.line} fontSize={50} {...T}>
                  20 PHÚT
                </text>
              </Pop>
            </g>
          ) : null}
        </g>
      ) : null}
      {li === 2 ? (
        <g>
          <Fade p={ease(lf, 4, 12)} dy={14}>
            <Stopwatch x={180} y={262} r={36} turns={(lf % 90) / 90} />
            <text x={236} y={280} fill={INK.gold} fontSize={52} {...T}>
              20 PHÚT =
            </text>
            <text x={390} y={346} textAnchor="middle" fill={INK.line} fontSize={44} {...T}>
              THỜI GIAN THẾ HỆ
            </text>
          </Fade>
          {groups.map((n, gi) => {
            const p = Math.min(1, pop(lf, fps, 14 + gi * 6));
            const cols = n === 8 ? 4 : n === 4 ? 2 : 1;
            const rows = n === 1 ? 1 : 2;
            return (
              <Pop key={n} p={p} cx={gx[gi]} cy={620}>
                {Array.from({ length: n }, (_, k) => (
                  <g key={k} transform={`translate(${gx[gi] + ((k % cols) - (cols - 1) / 2) * 46} ${620 + (Math.floor(k / cols) - (rows - 1) / 2) * 34})`}>
                    <rect x={-19} y={-11} width={38} height={22} rx={11} fill={GERM} stroke={OUTLINE} strokeWidth={2.5} />
                  </g>
                ))}
                <text x={gx[gi]} y={704} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                  {n}
                </text>
                {gi < 3 ? (
                  <text x={(gx[gi] + gx[gi + 1]) / 2 + (gi === 2 ? 14 : 0)} y={634} textAnchor="middle" fill={INK.soft} fontSize={40} {...T}>
                    →
                  </text>
                ) : null}
              </Pop>
            );
          })}
          <Pop p={pop(lf, fps, 36)} cx={390} cy={440}>
            <Formula x={390} y={466} size={84} />
          </Pop>
          <StampMark x={390} y={534} lines={["n = 24 → HƠN 16 TRIỆU"]} p={ease(lf, 58, 8)} size={34} rot={-3} color={INK.green} />
        </g>
      ) : null}
      <Milo x={815} ps={linePose(li, lf, ["point", "present", "point"])} frame={frame} glasses pointer />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5: ứng dụng (4 bước trong bếp nhà)

const BOX_X = [300, 405, 510];
const FRIDGE = { x: 596, y: 300, w: 156, h: 480 };
const SHELF_Y = [412, 508, 600];

const Realworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const lid = li === 1 ? ease(lf, 0, 12) : 0;
  const glass = li === 0 ? pop(lf, fps, 18) : li === 1 ? 1 : 1 - ease(lf, 0, 12);
  const sand = li === 0 ? ease(lf, 22, 48) : 1;
  const door = li === 1 ? ease(lf, 40, 10) * (1 - ease(lf, 68, 10)) : 0;
  const cooker = li === 2 ? 1 - ease(lf, 14, 12) : 1;
  const pan = li === 2 ? ease(lf, 22, 14) : 0;
  const flip = li === 2 ? ease(lf, 4, 20) : 0;
  const pose: PoseState = li === 2 ? poseAt(lf, 30, "present", "point") : linePose(li, lf, ["present", "point"]);
  const cards: [string, string][] = [
    ["CƠ QUAN TIÊU CHUẨN THỰC PHẨM SCOTLAND", "Làm nguội thật nhanh, lý tưởng trong 1 giờ"],
    ["XỚI RA · CHIA NHỎ · CẤT NGAY", "Đừng để cơm nằm mãi trong nồi"],
    ["ĂN TRONG 24 GIỜ", "Hâm nóng bốc hơi đều · chỉ 1 lần"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  // Hộp cơm: hiện trên quầy (câu 2), nhận cơm xới, rồi bay vào tủ lạnh.
  const boxes = BOX_X.map((bx, i) => {
    const show = li === 1 ? Math.min(1, pop(lf, fps, 4 + i * 4)) : li > 1 ? 1 : 0;
    const scoop = li === 1 ? ease(lf, 14 + i * 8, 10) : li > 1 ? 1 : 0;
    const fly = li === 1 ? ease(lf, 48 + i * 5, 12) : li > 1 ? 1 : 0;
    return { bx, i, show, scoop, fly };
  });
  return (
    <g>
      <Kitchen frame={frame} counter={[70, 580]} />
      <Calendar x={430} y={226} flip={flip} after="≤ 24 GIỜ" />
      <Fridge x={FRIDGE.x} y={FRIDGE.y} w={FRIDGE.w} h={FRIDGE.h} door={door}>
        {boxes.map((b) => (b.fly >= 1 ? <Box key={b.i} x={FRIDGE.x + FRIDGE.w / 2} y={SHELF_Y[b.i]} s={0.8} fill={1} lid={1} /> : null))}
      </Fridge>
      {cooker > 0.01 ? (
        <g opacity={cooker}>
          <RiceCooker x={190} y={596} frame={frame} light={0} steam={1} open={lid} />
        </g>
      ) : null}
      {pan > 0.01 ? (
        <Fade p={pan} dy={20}>
          <Stove x={200} y={596} />
          <Flame x={200} y={562} frame={frame} s={0.9} />
          <Pan x={190} y={552} s={0.92} toss={Math.max(0, Math.sin(frame * 0.2)) * 0.6} />
          <Steam x={184} y={480} p={1} frame={frame} n={5} spread={30} s={1.1} />
        </Fade>
      ) : null}
      {glass > 0.01 ? (
        <Pop p={glass} cx={360} cy={470}>
          <Hourglass x={360} y={470} s={0.78} p={sand} />
          <text x={418} y={494} fill={INK.red} fontSize={50} {...T}>
            1 GIỜ
          </text>
        </Pop>
      ) : null}
      {boxes.map(({ bx, i, show, scoop, fly }) => {
        if (show <= 0.01 || fly >= 1) return null;
        const tx = mix(bx, FRIDGE.x + FRIDGE.w / 2, fly);
        const ty = mix(596, SHELF_Y[i], fly) - Math.sin(fly * Math.PI) * 70;
        const lump = scoop > 0.01 && scoop < 1;
        return (
          <g key={i}>
            <Pop p={show} cx={bx} cy={580}>
              <Box x={tx} y={ty} s={mix(1, 0.8, fly)} fill={scoop >= 1 ? 1 : 0} lid={ease(lf, 40 + i * 2, 6)} />
            </Pop>
            {scoop >= 1 && fly < 0.05 ? <Steam x={bx} y={548} p={1 - ease(lf, 34, 14)} frame={frame} n={2} s={0.6} /> : null}
            {lump ? <ellipse cx={mix(190, bx, scoop)} cy={mix(480, 560, scoop) - Math.sin(scoop * Math.PI) * 90} rx={22} ry={14} fill={RICE} stroke={INK.line} strokeWidth={3} /> : null}
          </g>
        );
      })}
      <StepTag x={190} y={384} n={1} p={li === 0 ? pop(lf, fps, 6) : 1} />
      <StepTag x={674} y={262} n={2} p={li === 1 ? pop(lf, fps, 40) : li > 1 ? 1 : 0} />
      <StepTag x={556} y={150} n={3} p={li === 2 ? pop(lf, fps, 4) : 0} />
      <StepTag x={86} y={470} n={4} p={li === 2 ? pop(lf, fps, 30) : 0} />
      {li === 2 ? (
        <Pop p={pop(lf, fps, 44)} cx={330} cy={410}>
          <Sign x={330} y={410} w={370} lines={["NÓNG BỐC HƠI ĐỀU", "CHỈ HÂM 1 LẦN"]} color={INK.red} size={30} />
        </Pop>
      ) : null}
      <text x={86} y={766} fill="#FFF3D6" fontSize={24} {...T}>
        Nguồn: Food Standards Scotland · NHS
      </text>
      <Milo x={838} scale={0.95} ps={pose} frame={frame} apron />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6: vũ trụ (nhà hàng → thước nhiệt → phán quyết)

/** Khay inox cơm rang trong bếp nhà hàng (gốc: giữa đáy khay). */
const Tray: React.FC<{ x: number; y: number; bad?: number; frame: number }> = ({ x, y, bad = 0, frame }) => (
  <g>
    {bad > 0.01 ? <rect x={x - 92} y={y - 64} width={184} height={74} rx={12} fill={INK.red} opacity={bad * (0.35 + 0.15 * Math.sin(frame * 0.25))} filter="url(#soft-glow)" /> : null}
    <path d={`M ${x - 80} ${y - 40} Q ${x - 50} ${y - 74} ${x} ${y - 76} Q ${x + 50} ${y - 74} ${x + 80} ${y - 40} Z`} fill="#F4D774" stroke={INK.line} strokeWidth={2.5} />
    {[-50, -24, 4, 30, 56, -36, 16].map((gx, i) => (
      <circle key={i} cx={x + gx} cy={y - (i < 5 ? 48 : 62)} r={4.5} fill={i % 3 === 0 ? "#6DBE5A" : i % 3 === 1 ? "#E8743B" : "#FFF6D0"} stroke={INK.line} strokeWidth={1.2} />
    ))}
    <path d={`M ${x - 86} ${y - 42} L ${x + 86} ${y - 42} L ${x + 78} ${y} L ${x - 78} ${y} Z`} fill="url(#e03-steel)" stroke={INK.line} strokeWidth={3.5} strokeLinejoin="round" />
  </g>
);

/** Bếp nhà hàng giữa lòng thành phố: phố cao tầng sau cửa kính, chụp hút khói, giá khay cơm rang. */
const Restaurant: React.FC<{ frame: number; bad: number }> = ({ frame, bad }) => (
  <g>
    <rect x={60} y={93} width={850} height={600} fill="rgba(205,215,220,0.4)" />
    <rect x={76} y={108} width={820} height={170} rx={10} fill="#CFE6F2" stroke={INK.line} strokeWidth={4} />
    {[
      [90, 70, 140],
      [170, 60, 100],
      [240, 90, 150],
      [340, 70, 120],
      [420, 60, 160],
      [490, 90, 110],
      [590, 70, 145],
      [670, 80, 105],
      [760, 60, 150],
      [830, 60, 120],
    ].map(([bx, bw, bh], i) => (
      <g key={i}>
        <rect x={bx} y={278 - bh} width={bw} height={bh} fill={i % 2 ? "#9DB4C4" : "#B4C7D3"} stroke="rgba(59,38,20,0.35)" strokeWidth={2} />
        {Array.from({ length: Math.floor(bh / 30) }, (_, r) => (
          <rect key={r} x={bx + 10} y={278 - bh + 12 + r * 30} width={bw - 20} height={10} fill="rgba(255,248,200,0.7)" opacity={0.5 + 0.5 * Math.sin(frame * 0.05 + i + r)} />
        ))}
      </g>
    ))}
    <line x1={340} y1={108} x2={340} y2={278} stroke={INK.line} strokeWidth={4} />
    <line x1={620} y1={108} x2={620} y2={278} stroke={INK.line} strokeWidth={4} />
    <path d="M 120 300 L 640 300 L 600 360 L 160 360 Z" fill="url(#e03-steel)" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <rect x={110} y={470} width={540} height={12} rx={4} fill="#9AA6AD" stroke={INK.line} strokeWidth={3} />
    {[120, 640].map((lx) => (
      <rect key={lx} x={lx - 4} y={380} width={8} height={216} fill="#9AA6AD" stroke={INK.line} strokeWidth={2} />
    ))}
    <rect x={70} y={596} width={620} height={20} rx={4} fill="#B9C3C9" stroke={INK.line} strokeWidth={4} />
    <rect x={84} y={616} width={592} height={164} fill="url(#e03-steel)" stroke={INK.line} strokeWidth={4} />
    {[200, 380, 560].map((tx, i) => (
      <g key={tx}>
        <Tray x={tx} y={470} frame={frame} bad={i === 2 ? bad : 0} />
        <Tray x={tx} y={596} frame={frame} />
        <Steam x={tx} y={530} p={0.6} frame={frame + i * 13} n={2} s={0.6} />
      </g>
    ))}
  </g>
);

/** Ba vùng của thước nhiệt: nóng (trên 60 °C), lửng lơ (ở giữa), lạnh (4 °C trở xuống). */
const ZONES = [
  { y: 140, h: 160, color: HOT, fill: "rgba(226,83,63,0.22)", lines: ["TRÊN 60 °C", "GIỮ NÓNG"], at: 6 },
  { y: 312, h: 186, color: "#6E6E6E", fill: "rgba(120,120,120,0.22)", lines: ["ĐỪNG", "LỬNG LƠ"], at: 46 },
  { y: 510, h: 160, color: COLD, fill: "rgba(76,155,214,0.22)", lines: ["4 °C TRỞ XUỐNG", "GIỮ LẠNH"], at: 26 },
];

const Cosmic: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const MX = 828;
  const zoomOut = li === 0 ? ease(lf, 0, 26) : 1;
  const bad = li === 0 ? ease(lf, 40, 12) : 1;
  const rest = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 16) : 0;
  const ruler = li === 1 ? ease(lf, 0, 16) : li === 2 ? 1 - ease(lf, 0, 16) : 0;
  const home = li >= 2 ? (li === 2 ? ease(lf, 0, 16) : 1) : 0;
  // Mức thuỷ ngân: lên vùng nóng, xuống vùng lạnh, rồi lửng lơ ở giữa (bị gạch).
  const level = li === 1 ? interpolate(lf, [0, 6, 20, 26, 42, 46, 60], [420, 420, 200, 200, 600, 600, 410], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + (lf > 60 ? wave(frame, 0.12, 8) : 0) : 420;
  // Phán quyết: con dấu đồng từ tay Milo bay lên giấy, đóng "TÙY!".
  const ps: PoseState =
    li === 2
      ? lf < 36
        ? { pose: "wave", prevPose: "point", poseT: ease(lf, 0, 12) }
        : { pose: "eureka", prevPose: "wave", poseT: ease(lf, 36, 12) }
      : li === 3
        ? { pose: "think", prevPose: "eureka", poseT: ease(lf, 0, 14) }
        : { pose: "point" };
  const hand = handAt("R", MX, ps, frame);
  const fly = li === 2 ? ease(lf, 16, 14) : 0;
  const slam = li === 2 ? interpolate(lf, [30, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const lift = li === 2 ? ease(lf, 44, 16) : 0;
  const stampX = mix(hand.x, 510, fly);
  const stampY = mix(hand.y + 6, 196, fly) - Math.sin(fly * Math.PI) * 90 + slam * 92 - lift * 120;
  const stampO = li === 2 ? 1 - ease(lf, 52, 10) : 0;
  const mark = li === 2 ? (lf >= 36 ? Math.min(1, pop(lf, fps, 36)) : 0) : li > 2 ? 1 : 0;
  const shake = li === 2 && lf >= 36 && lf < 46 ? Math.sin(lf * 2.2) * (46 - lf) * 0.6 : 0;
  const rew = li === 3 ? ease(lf, 10, 50) : 0;
  const zoom = li === 3 ? ease(lf, 0, 20) : 0;
  const cards: [string, string][] = [
    ["2022 · HỒNG KÔNG", "Cơm rang nhà hàng: quá nhiều Bacillus cereus"],
    ["CƠM NẤU SẴN", "Giữ trên 60 °C hoặc từ 4 °C trở xuống"],
    ["PHÁN QUYẾT: TÙY!", "Vào tủ lạnh nhanh · lên chảo trong 24 giờ"],
    ["SỐ PHẬN BÁT CƠM", "Định đoạt ở mấy tiếng đầu sau khi tắt bếp"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
  return (
    <g>
      {rest > 0.01 ? (
        <g opacity={rest} transform={`translate(400 480) scale(${1.25 - 0.25 * zoomOut}) translate(-400 -480)`}>
          <Restaurant frame={frame} bad={bad} />
          {Array.from({ length: 9 }, (_, i) => (
            <Pop key={i} p={li === 0 ? Math.min(1, pop(lf, fps, 44 + i * 2)) : 1} cx={560} cy={420}>
              <Rod x={480 + (i % 3) * 80 + wave(frame, 0.07, 8, i)} y={400 + Math.floor(i / 3) * 26} s={0.45} rot={(i * 47) % 360} frame={frame} face={false} />
            </Pop>
          ))}
          <Pop p={li === 0 ? pop(lf, fps, 54) : 1} cx={560} cy={340}>
            <Sign x={540} y={346} w={330} lines={["QUÁ NHIỀU", "BACILLUS CEREUS"]} color={INK.red} size={30} />
          </Pop>
        </g>
      ) : null}
      {li === 0 ? <StampMark x={260} y={196} lines={["2022 · HỒNG KÔNG"]} p={ease(lf, 26, 8)} size={40} rot={-5} color={INK.blue} /> : null}
      {/* Thước nhiệt độ khổng lồ */}
      {ruler > 0.01 ? (
        <g opacity={ruler}>
          {ZONES.map((z) => {
            const p = li === 1 ? ease(lf, z.at, 12) : 1;
            return (
              <g key={z.lines[0]} opacity={p} transform={`translate(${(1 - p) * 40} 0)`}>
                <rect x={250} y={z.y} width={470} height={z.h} rx={16} fill={z.fill} stroke={z.color} strokeWidth={5} />
                {z.lines.map((l, i) => (
                  <text key={l} x={420} y={z.y + z.h / 2 - 8 + i * 48} textAnchor="middle" fill={z.color} fontSize={i === 0 ? 36 : 34} {...T}>
                    {l}
                  </text>
                ))}
              </g>
            );
          })}
          <Pop p={li === 1 ? ease(lf, 10, 12) : 1} cx={655} cy={220}>
            <g transform="translate(655 250) scale(0.62) translate(-655 -250)">
              <Tray x={655} y={250} frame={frame} />
            </g>
            <Steam x={655} y={186} p={1} frame={frame} n={3} s={0.8} />
          </Pop>
          <Pop p={li === 1 ? ease(lf, 30, 12) : 1} cx={660} cy={590}>
            <Box x={660} y={624} s={0.85} fill={1} lid={1} />
            <path d="M 660 552 l 0 34 m -15 -26 l 30 18 m 0 -18 l -30 18" stroke={COLD} strokeWidth={5} strokeLinecap="round" />
          </Pop>
          {li === 1 && lf >= 46
            ? [0, 1, 2].map((i) => (
                <Pop key={i} p={Math.min(1, pop(lf, fps, 50 + i * 4))} cx={655} cy={405}>
                  <Rod x={630 + i * 24} y={372 + i * 32} s={0.6} rot={20 - i * 25 + wave(frame, 0.1, 10, i)} frame={frame} face={false} />
                </Pop>
              ))
            : null}
          <Cross x={655} y={405} r={44} bare p={li === 1 ? pop(lf, fps, 62) : 1} />
          {/* Ống nhiệt kế */}
          <rect x={160} y={124} width={64} height={560} rx={32} fill="#FFFFFF" stroke={INK.line} strokeWidth={5} />
          <rect x={178} y={level} width={28} height={700 - level} fill={HOT} />
          <circle cx={192} cy={712} r={50} fill="#FFFFFF" stroke={INK.line} strokeWidth={5} />
          <circle cx={192} cy={712} r={40} fill={HOT} />
          <rect x={178} y={660} width={28} height={30} fill={HOT} />
          {[
            [306, "60°"],
            [504, "4°"],
          ].map(([ty, tl]) => (
            <g key={tl}>
              <line x1={150} y1={ty as number} x2={234} y2={ty as number} stroke={INK.line} strokeWidth={5} />
              <text x={140} y={(ty as number) + 12} textAnchor="end" fill={INK.line} fontSize={32} {...T}>
                {tl}
              </text>
            </g>
          ))}
        </g>
      ) : null}
      {/* Về lại căn bếp mở đầu */}
      {home > 0.01 ? (
        <g opacity={home}>
          <Kitchen frame={frame} night={rew} />
          <RiceBowl x={220} y={596} />
          <RiceCooker x={560} y={596} frame={frame} steam={rew} />
          <g transform={`translate(${shake} ${shake * 0.4})`}>
            <rect x={322} y={134} width={376} height={300} rx={8} fill="#FFF8E7" stroke={INK.line} strokeWidth={4} transform="rotate(-2 510 284)" />
            <circle cx={510} cy={146} r={9} fill={INK.red} stroke={INK.line} strokeWidth={2} />
            <text x={510} y={186} textAnchor="middle" fill={INK.line} fontSize={30} {...T}>
              PHÁN QUYẾT
            </text>
            {mark > 0.01 ? (
              <g transform={`translate(510 276) rotate(-7) scale(${1 + (1 - mark) * 0.5})`} opacity={Math.min(1, mark * 1.5)}>
                <rect x={-150} y={-62} width={300} height={124} rx={14} fill="none" stroke={INK.red} strokeWidth={8} />
                <text x={0} y={36} textAnchor="middle" fill={INK.red} fontSize={104} {...T}>
                  TÙY!
                </text>
              </g>
            ) : null}
            <Fade p={li === 2 ? ease(lf, 50, 14) : 1}>
              <text x={510} y={376} textAnchor="middle" fill={INK.line} fontSize={30} {...T}>
                Nguội nhanh · tủ lạnh
              </text>
              <text x={510} y={414} textAnchor="middle" fill={INK.line} fontSize={30} {...T}>
                24 giờ · hâm 1 lần
              </text>
            </Fade>
          </g>
          <g transform={`translate(800 210) scale(${1 + 0.45 * zoom}) translate(-800 -210)`}>
            <WallClock x={800} y={210} r={50} h={7 - 10 * rew} glow={li === 3 ? ease(lf, 0, 14) : 0} />
          </g>
          {li === 3 ? (
            <Fade p={ease(lf, 52, 14)} dy={10}>
              <text x={800} y={352} textAnchor="middle" fill={INK.red} fontSize={44} fontStyle="italic" {...T}>
                tắt bếp
              </text>
            </Fade>
          ) : null}
          <text x={86} y={766} fill="#FFF3D6" fontSize={22} {...T}>
            Nguồn: NHS · FSA · FSS · CFS Hồng Kông
          </text>
        </g>
      ) : null}
      <Milo x={MX} ps={ps} frame={frame} />
      {stampO > 0.01 ? (
        <g opacity={stampO} transform={`translate(${stampX} ${stampY})`}>
          <circle cx={0} cy={-62} r={18} fill="#8A5527" stroke={INK.line} strokeWidth={4} />
          <rect x={-9} y={-48} width={18} height={26} fill="#8A5527" stroke={INK.line} strokeWidth={3} />
          <rect x={-44} y={-24} width={88} height={24} rx={4} fill="url(#e03-brass)" stroke={INK.line} strokeWidth={4} />
          <rect x={-48} y={0} width={96} height={10} rx={2} fill={INK.red} stroke={INK.line} strokeWidth={2.5} />
        </g>
      ) : null}
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

const EP03: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

export const Ep03Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP03[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient / pattern riêng của tập (id tiền tố "e03-"), đặt vào <defs> của khung cảnh. */
export const Ep03Defs: React.FC = () => (
  <>
    <linearGradient id="e03-brass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFE08A" />
      <stop offset="55%" stopColor="#E0AD46" />
      <stop offset="100%" stopColor="#9C6A1C" />
    </linearGradient>
    <linearGradient id="e03-night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0E1A33" />
      <stop offset="100%" stopColor="#2C3E6B" />
    </linearGradient>
    <linearGradient id="e03-steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E9EEF1" />
      <stop offset="100%" stopColor="#A7B3BA" />
    </linearGradient>
    <pattern id="e03-tile" width={46} height={46} patternUnits="userSpaceOnUse">
      <rect width={46} height={46} fill="#EAF3F1" />
      <rect x={1} y={1} width={44} height={44} fill="none" stroke="rgba(110,140,140,0.45)" strokeWidth={2} />
    </pattern>
    <pattern id="e03-check" width={14} height={14} patternUnits="userSpaceOnUse">
      <rect width={14} height={14} fill="#FFF6E8" />
      <rect width={7} height={7} fill="#E46A5A" />
      <rect x={7} y={7} width={7} height={7} fill="#E46A5A" />
    </pattern>
  </>
);
