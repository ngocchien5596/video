/**
 * Tập 2 "Thả búa và lông chim trên Mặt Trăng" (Apollo 15, sự rơi tự do): cảnh vẽ riêng cho từng hồi, đổi hình theo câu
 * đang đọc (`li`, `lf`) đúng như trường `shot` trong projects/kien-thuc/src/episodes/tuan-1.ts.
 * Toạ độ gốc của sân khấu: rộng x 60..910, cao y 93..834 (mặt đất y = 780).
 */
import React from "react";
import { interpolate } from "remotion";
import { countUp, DrawLine, DrawPath, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Card, Check, Cross, GROUND, linePose, poseAt, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { type Pose, Stickman } from "./Stickman.tsx";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** Tiến độ tuyến tính 0 → 1 (không làm mượt) — dùng cho rơi tự do (quãng đường ∝ t²). */
const lin = (f: number, start: number, dur: number) => clamp01((f - start) / dur);

const CREAM = "#FFF6DD";
const MOON_TXT = "#FFF3C4";

// ---------------------------------------------------------------- Milo đổi vai (phụ kiện bám theo đầu / thân)

const BASE = 1.32;
const TILT: Record<Pose, number> = {
  idle: 0,
  think: -6,
  point: 0,
  pointR: 0,
  eureka: 3,
  aimL: 0,
  scratch: 7,
  present: 0,
  touch: 0,
  wave: 0,
};
type PoseState = { pose: Pose; prevPose?: Pose; poseT?: number };
type Gear = "astro" | "toga" | "galileo" | "scholar";

/** Tay cầm vật ở tư thế "eureka" không lắc (lively = false): toạ độ bàn tay so với gốc của Milo (scale 1). */
const HOLD_DX = 56 * BASE;
const HOLD_DY = -224 * BASE;
/** Cỡ búa / lông chim khi Milo cầm (dài 100 px × OBJ). */
const OBJ = 1.3;

const HAIR_D = "M -47 -62 C -56 -92, -36 -116, -18 -110 L -12 -128 L 0 -112 L 10 -130 L 18 -110 L 30 -122 L 32 -104 C 48 -104, 56 -84, 47 -62 Q 34 -80, 16 -76 Q 0 -84, -16 -76 Q -34 -80, -47 -62 Z";

const Beard: React.FC<{ color: string }> = ({ color }) => (
  <path d="M -38 -34 Q -40 10 0 30 Q 40 10 38 -34 Q 30 -14 14 -15 Q 0 -19 -14 -15 Q -30 -14 -38 -34 Z" fill={color} stroke={INK.line} strokeWidth={2.8} strokeLinejoin="round" />
);

/** Milo + trang phục theo vai: phi hành gia (Scott), Aristotle, Galileo, học giả (kính kéo xuống mắt). */
const Hero: React.FC<
  PoseState & {
    x: number;
    y?: number;
    s?: number;
    frame: number;
    gear?: Gear;
    lively?: boolean;
    enter?: number;
    from?: number;
    float?: number;
  }
> = ({ x, y = GROUND, s = 1, frame, gear, lively = true, enter = 1, from = 320, float = 0, pose, prevPose, poseT = 1 }) => {
  const k = s * BASE;
  const t = prevPose && prevPose !== pose ? smooth(poseT) : 1;
  const tilt = mix(TILT[prevPose ?? pose], TILT[pose], t);
  const eW = (pose === "eureka" ? t : 0) + (prevPose === "eureka" && pose !== "eureka" ? 1 - t : 0);
  const walkAmp = clamp01((1 - enter) * 7);
  const phase = ((enter * Math.abs(from)) / 58) * Math.PI;
  const dir = from > 0 ? -1 : 1;
  const dx = (1 - enter) * from;
  const bob = -Math.abs(Math.sin(phase)) * 4 * walkAmp;
  const lean = dir * 4 * walkAmp;
  const hop = lively ? -Math.abs(Math.sin(frame * 0.17)) * 24 * eW * (1 - walkAmp) : 0;
  const breath = Math.sin(frame * 0.11) * 1.8;
  const sway = Math.sin(frame * 0.045) * 1.2;
  const headTilt = tilt + Math.sin(frame * 0.07) * 2.5 + (lively ? Math.sin(frame * 0.19) * 1.2 : 0);
  const legs = `translate(${x + dx} ${y}) scale(${k}) translate(0 ${hop}) rotate(${lean + sway * 0.3})`;
  const body = `${legs} translate(0 ${bob + breath * 0.5})`;
  const head = `${body} translate(0 ${-172 + breath * 0.4}) rotate(${headTilt})`;
  const fy = float ? -40 * float + wave(frame, 0.06, 12 * float) : 0;
  const fr = float ? wave(frame, 0.04, 6 * float) : 0;
  const tuck = -hop * 0.35;
  return (
    <g transform={`translate(0 ${fy}) rotate(${fr} ${x} ${y - 200})`}>
      {gear === "astro" ? (
        <g transform={body}>
          <rect x={-46} y={-182} width={92} height={98} rx={12} fill="#E3E7EA" stroke={INK.line} strokeWidth={3.2} />
          <rect x={-40} y={-174} width={10} height={80} rx={4} fill="#C9CED2" />
        </g>
      ) : null}
      <Stickman x={x} y={y} scale={s} pose={pose} prevPose={prevPose} poseT={poseT} enter={enter} from={from} lively={lively} />
      {gear === "astro" ? (
        <>
          <g transform={legs}>
            {[-1, 1].map((d) => (
              <path key={d} d={`M ${d * 14} -96 L ${d * 16} -56 L ${d * 17} ${-30 - tuck}`} fill="none" stroke="#F4F6F8" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </g>
          <g transform={body}>
            <path d="M -34 -174 Q -38 -140 -35 -98 L 35 -98 Q 38 -140 34 -174 Z" fill="#F4F6F8" stroke={INK.line} strokeWidth={3.2} strokeLinejoin="round" />
            <rect x={-36} y={-104} width={72} height={10} rx={3} fill="#C9CED2" stroke={INK.line} strokeWidth={2.4} />
            <rect x={-20} y={-156} width={40} height={30} rx={5} fill="#DDE1E4" stroke={INK.line} strokeWidth={2.6} />
            <circle cx={-10} cy={-141} r={4} fill="#D63A2F" />
            <circle cx={2} cy={-141} r={4} fill="#1D6A8C" />
            <rect x={9} y={-145} width={7} height={8} fill="#F2BE4A" />
            <path d="M 18 -166 L 30 -166 L 30 -158 L 18 -158 Z" fill="#B23A30" />
            <ellipse cx={0} cy={-174} rx={36} ry={10} fill="#BFC5CA" stroke={INK.line} strokeWidth={3} />
          </g>
          <g transform={head}>
            <circle cx={0} cy={-62} r={76} fill="url(#e02-visor)" stroke="#F4F6F8" strokeWidth={7} />
            <circle cx={0} cy={-62} r={76} fill="none" stroke={INK.line} strokeWidth={2.4} />
            <path d="M -52 -104 Q -30 -128 2 -132" fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" opacity={0.7} />
            <path d="M 46 -18 Q 58 -34 62 -56" fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" opacity={0.5} />
          </g>
        </>
      ) : null}
      {gear === "toga" ? (
        <>
          <g transform={legs}>
            <path d="M -38 -104 L 38 -104 L 44 -40 Q 0 -32 -44 -40 Z" fill="#F7F3E8" stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
            <path d="M -18 -98 L -24 -42 M 10 -98 L 16 -40" stroke="#D9D0BC" strokeWidth={3} />
          </g>
          <g transform={body}>
            <path d="M -36 -176 L -8 -176 L 38 -112 L 38 -96 L -36 -96 Z" fill="#F7F3E8" stroke={INK.line} strokeWidth={3.2} strokeLinejoin="round" />
            <path d="M -20 -168 L 22 -104 M -30 -150 L 4 -100" stroke="#D9D0BC" strokeWidth={3} />
            <circle cx={-24} cy={-168} r={6} fill="#E0AD46" stroke={INK.line} strokeWidth={2} />
          </g>
          <g transform={head}>
            <Beard color="#8E8A86" />
            {Array.from({ length: 9 }, (_, i) => {
              const a = Math.PI + (i / 8) * Math.PI;
              const lx = Math.cos(a) * 50;
              const ly = -88 + Math.sin(a) * 26;
              return <ellipse key={i} cx={lx} cy={ly} rx={11} ry={6} transform={`rotate(${(a * 180) / Math.PI + 90} ${lx} ${ly})`} fill="#6E9A4C" stroke={INK.line} strokeWidth={2} />;
            })}
          </g>
        </>
      ) : null}
      {gear === "galileo" ? (
        <>
          <g transform={body}>
            <path d="M -36 -172 L -14 -172 L -10 -100 L -37 -102 Z" fill="#3A2B22" stroke={INK.line} strokeWidth={3} />
            <path d="M 36 -172 L 14 -172 L 10 -100 L 37 -102 Z" fill="#3A2B22" stroke={INK.line} strokeWidth={3} />
            <path
              d={`M -32 -176 ${Array.from({ length: 8 }, (_, i) => `Q ${-28 + i * 8} -164 ${-24 + i * 8} -176`).join(" ")} Q 0 -186 -32 -176 Z`}
              fill="#FBF8EE"
              stroke={INK.line}
              strokeWidth={2.4}
            />
          </g>
          <g transform={head}>
            <Beard color="#A0522D" />
            <path d="M -48 -100 Q -46 -136 4 -136 Q 52 -134 50 -102 Q 0 -112 -48 -100 Z" fill="#1F1A17" stroke={INK.line} strokeWidth={3} />
            <ellipse cx={0} cy={-101} rx={50} ry={7} fill="#2E2622" stroke={INK.line} strokeWidth={2.4} />
          </g>
        </>
      ) : null}
      {gear === "scholar" ? (
        <g transform={head}>
          <path d={HAIR_D} fill="#5A3520" stroke={INK.line} strokeWidth={3.2} strokeLinejoin="round" />
          <path d="M -28 -98 Q -14 -110 0 -98 M 6 -100 Q 20 -110 32 -94" fill="none" stroke="#7D4E2C" strokeWidth={3.5} strokeLinecap="round" />
          <path d="M -46 -52 L -32 -50 M 32 -50 L 46 -52" stroke="#5E361B" strokeWidth={7} strokeLinecap="round" />
          {[-17, 17].map((ex) => (
            <g key={ex}>
              <circle cx={ex} cy={-49} r={16} fill="rgba(140,200,220,0.28)" stroke="url(#milo-brass-grad)" strokeWidth={6} />
              <circle cx={ex} cy={-49} r={16} fill="none" stroke={INK.line} strokeWidth={1.8} />
              <path d={`M ${ex - 8} ${-56} Q ${ex - 3} ${-61} ${ex + 3} ${-58}`} fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          ))}
          <rect x={-5} y={-53} width={10} height={6} rx={2} fill="#E0AD46" stroke={INK.line} strokeWidth={1.6} />
        </g>
      ) : null}
    </g>
  );
};

// ---------------------------------------------------------------- đạo cụ

/** Búa địa chất bằng nhôm, gốc: chỗ tay cầm (đầu cán), búa dài 100 px chúc xuống. */
const Hammer: React.FC<{
  x: number;
  y: number;
  r?: number;
  s?: number;
  ghost?: boolean;
}> = ({ x, y, r = 0, s = 1, ghost }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={ghost ? 0.22 : 1}>
    <rect x={-5} y={-4} width={10} height={86} rx={4} fill="#C4CCD2" stroke={INK.line} strokeWidth={3} />
    <rect x={-6.5} y={-6} width={13} height={26} rx={5} fill="#3B3F45" stroke={INK.line} strokeWidth={2.5} />
    <path d="M -32 78 L 22 78 L 34 86 L 22 100 L -32 100 Q -38 89 -32 78 Z" fill="#8E979E" stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
    <line x1={-26} y1={84} x2={16} y2={84} stroke="#C9D0D5" strokeWidth={3} strokeLinecap="round" />
  </g>
);

/** Lông chim ưng, gốc: đầu ống lông (chỗ cầm), dài 100 px chúc xuống. */
const Feather: React.FC<{
  x: number;
  y: number;
  r?: number;
  s?: number;
  ghost?: boolean;
}> = ({ x, y, r = 0, s = 1, ghost }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={ghost ? 0.22 : 1}>
    <path d="M 0 16 Q 26 36 18 92 Q 10 104 1 100 Q -20 74 -16 40 Q -12 22 0 16 Z" fill="#C79A5E" stroke={INK.line} strokeWidth={2.8} strokeLinejoin="round" />
    {[34, 52, 70, 86].map((by) => (
      <path key={by} d={`M ${-14} ${by + 4} Q 2 ${by - 4} ${17} ${by + 2}`} fill="none" stroke="#6E4A28" strokeWidth={4} opacity={0.75} />
    ))}
    <path d="M 0 -2 Q 5 50 1 100" fill="none" stroke="#F4E9D2" strokeWidth={3.4} strokeLinecap="round" />
    <path d="M 0 -2 Q 5 50 1 100" fill="none" stroke={INK.line} strokeWidth={1.2} />
  </g>
);

const Stamp: React.FC<{
  x: number;
  y: number;
  text: string;
  p: number;
  rot?: number;
  size?: number;
  color?: string;
}> = ({ x, y, text, p, rot = -8, size = 40, color = INK.red }) => {
  if (p <= 0.01) return null;
  const w = text.length * size * 0.64 + 40;
  const s = 1 + (1 - Math.min(1, p)) * 0.8;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={Math.min(1, p * 1.4)}>
      <rect x={-w / 2} y={-size * 0.95} width={w} height={size * 1.6} rx={10} fill="rgba(255,246,221,0.94)" stroke={color} strokeWidth={6} />
      <rect x={-w / 2 + 8} y={-size * 0.95 + 8} width={w - 16} height={size * 1.6 - 16} rx={6} fill="none" stroke={color} strokeWidth={2.5} />
      <text x={0} y={size * 0.32} textAnchor="middle" fill={color} fontSize={size} {...T}>
        {text}
      </text>
    </g>
  );
};

/** Bong bóng thoại có đuôi chỉ về (tx, ty). */
const Bubble: React.FC<{
  x: number;
  y: number;
  text: string;
  p: number;
  size?: number;
  tx?: number;
  ty?: number;
  color?: string;
}> = ({ x, y, text, p, size = 44, tx, ty, color = INK.line }) => {
  const w = text.length * size * 0.64 + 56;
  const h = size * 1.7;
  return (
    <Pop p={p} cx={x} cy={y}>
      {tx !== undefined && ty !== undefined ? (
        <path d={`M ${x - 20} ${y + h / 2 - 6} L ${tx} ${ty} L ${x + 20} ${y + h / 2 - 6} Z`} fill={CREAM} stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
      ) : null}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2.4} fill={CREAM} stroke={INK.line} strokeWidth={4} />
      {tx !== undefined ? <rect x={x - 17} y={y + h / 2 - 10} width={34} height={8} fill={CREAM} /> : null}
      <text x={x} y={y + size * 0.36} textAnchor="middle" fill={color} fontSize={size} {...T}>
        {text}
      </text>
    </Pop>
  );
};

/** Biển tên gỗ treo trên đầu nhân vật (thay thông tin trước nằm trên thẻ tóm tắt, nay đã tắt). */
const NamePlate: React.FC<{ x: number; y: number; text: string; p: number; size?: number }> = ({ x, y, text, p, size = 36 }) => {
  const w = text.length * size * 0.66 + 44;
  const h = size * 1.6;
  return (
    <Pop p={p} cx={x} cy={y}>
      <rect x={x - w / 2 + 4} y={y - h / 2 + 6} width={w} height={h} rx={12} fill="rgba(0,0,0,0.25)" />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={12} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fill={CREAM} fontSize={size} {...T}>
        {text}
      </text>
    </Pop>
  );
};

/** Mũi tên thẳng có đầu nhọn. */
const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  p?: number;
  color: string;
  w?: number;
  head?: number;
}> = ({ x1, y1, x2, y2, p = 1, color, w = 6, head = 16 }) => {
  if (p <= 0.01) return null;
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path
        d={`M ${ex + Math.cos(a) * 4} ${ey + Math.sin(a) * 4} L ${ex - head * Math.cos(a - 0.45)} ${ey - head * Math.sin(a - 0.45)} L ${ex - head * Math.cos(a + 0.45)} ${ey - head * Math.sin(a + 0.45)} Z`}
        fill={color}
      />
    </g>
  );
};

/** Mũi tên chỉ xuống nhún nhảy, nhấp nháy (về phía ô bình luận). */
const DownArrow: React.FC<{
  x: number;
  y: number;
  p: number;
  frame: number;
}> = ({ x, y, p, frame }) => (
  <Pop p={p} cx={x} cy={y}>
    <g transform={`translate(${x} ${y + Math.abs(Math.sin(frame * 0.18)) * 14})`} opacity={0.75 + 0.25 * Math.sin(frame * 0.3)}>
      <path d="M -14 -40 L 14 -40 L 14 0 L 30 0 L 0 34 L -30 0 L -14 0 Z" fill={INK.red} stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
    </g>
  </Pop>
);

/** Đám bụi tung lên khi chạm đất (p: 0 → 1). */
const Dust: React.FC<{ x: number; y: number; p: number; color?: string }> = ({ x, y, p, color = "#B9B9BE" }) =>
  p <= 0.01 || p >= 0.99 ? null : (
    <g opacity={1 - p}>
      {[-1, -0.5, 0, 0.5, 1].map((d, i) => (
        <circle key={i} cx={x + d * 46 * p * 1.4} cy={y - Math.sin(p * Math.PI) * (16 + (i % 2) * 14) - 4} r={7 + 9 * p} fill={color} stroke={INK.line} strokeWidth={1.5} />
      ))}
    </g>
  );

// ---------------------------------------------------------------- bối cảnh

const STARS = Array.from({ length: 36 }, (_, i) => ({
  x: 70 + ((i * 263) % 830),
  y: 100 + ((i * 151) % 430),
  r: 1.4 + (i % 3) * 0.9,
}));

const Stars: React.FC<{ frame: number; maxY?: number }> = ({ frame, maxY = 999 }) => (
  <g>
    {STARS.filter((s) => s.y < maxY).map((s, i) => (
      <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFF8E7" opacity={0.35 + 0.5 * Math.abs(Math.sin(frame * 0.05 + i))} />
    ))}
  </g>
);

/** Mô-đun đổ bộ Falcon (gốc: giữa mặt đất dưới chân). */
const Falcon: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((d) => (
      <g key={d}>
        <line x1={d * 44} y1={-40} x2={d * 80} y2={-2} stroke={INK.line} strokeWidth={6} />
        <ellipse cx={d * 82} cy={0} rx={15} ry={5} fill="#C9A13A" stroke={INK.line} strokeWidth={3} />
      </g>
    ))}
    <line x1={0} y1={-34} x2={0} y2={-2} stroke={INK.line} strokeWidth={5} />
    <path d="M -58 -88 L 58 -88 L 64 -30 L -64 -30 Z" fill="#D9A93A" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -42 -82 L -34 -38 M 0 -84 L 6 -34 M 36 -82 L 28 -38" stroke="#A97E1E" strokeWidth={3} />
    <path d="M -46 -88 L -38 -142 L 8 -160 L 46 -138 L 48 -88 Z" fill="#C3C7CA" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -26 -134 L -6 -144 L -10 -118 Z" fill="#2B2F36" />
    <line x1={30} y1={-150} x2={46} y2={-180} stroke={INK.line} strokeWidth={3} />
    <ellipse cx={48} cy={-184} rx={16} ry={6} fill="#E8E8E8" stroke={INK.line} strokeWidth={2.5} />
  </g>
);

/** Xe tự hành mặt trăng (gốc: mặt đất dưới bánh). */
const Rover: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={56} y1={-40} x2={56} y2={-112} stroke={INK.line} strokeWidth={4} />
    <path d="M 22 -112 Q 56 -146 90 -112 Z" fill="#ECECEC" stroke={INK.line} strokeWidth={3} />
    <rect x={-34} y={-66} width={24} height={26} rx={4} fill="#5B6168" stroke={INK.line} strokeWidth={3} />
    <rect x={2} y={-66} width={24} height={26} rx={4} fill="#5B6168" stroke={INK.line} strokeWidth={3} />
    <rect x={-80} y={-44} width={160} height={14} rx={4} fill="#9AA0A6" stroke={INK.line} strokeWidth={3} />
    {[-56, 56].map((wx) => (
      <g key={wx}>
        <path d={`M ${wx - 26} -30 Q ${wx} -56 ${wx + 26} -30`} fill="#C79A3A" stroke={INK.line} strokeWidth={3} />
        <circle cx={wx} cy={-18} r={19} fill="#4A4D52" stroke={INK.line} strokeWidth={3} />
        <circle cx={wx} cy={-18} r={8} fill="#9AA0A6" />
      </g>
    ))}
  </g>
);

/** Vùng Hadley trên Mặt Trăng: trời đen, núi xám, bụi xám; xa xa là Falcon và xe tự hành. */
const MoonBg: React.FC<{ frame: number; props?: boolean }> = ({ frame, props = true }) => (
  <g>
    <rect x={50} y={80} width={870} height={754} fill="url(#e02-space)" />
    <Stars frame={frame} maxY={520} />
    <path d="M 50 600 L 50 520 Q 140 450 250 500 Q 330 410 450 470 Q 560 520 650 470 Q 770 400 920 470 L 920 600 Z" fill="#4B4C54" />
    <path d="M 250 500 Q 330 410 450 470 L 420 470 Q 340 440 280 500 Z" fill="#62636B" />
    <path d="M 50 606 Q 200 566 380 590 Q 600 614 920 574 L 920 834 L 50 834 Z" fill="url(#e02-dust)" />
    {[
      [160, 700, 70, 14],
      [430, 650, 50, 9],
      [700, 690, 64, 12],
      [330, 770, 96, 16],
    ].map(([cx, cy, rx, ry]) => (
      <g key={cx}>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(55,55,62,0.35)" />
        <path d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`} fill="none" stroke="rgba(235,235,240,0.45)" strokeWidth={3} />
      </g>
    ))}
    {props ? (
      <>
        <Falcon x={190} y={614} s={0.62} />
        <Rover x={470} y={610} s={0.5} />
      </>
    ) : null}
  </g>
);

/** Sân nhà trên Trái Đất: trời xanh, mây trôi, đồi, hàng rào, bãi cỏ. */
const Yard: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={50} y={80} width={870} height={754} fill="url(#e02-sky)" />
    <circle cx={170} cy={190} r={46} fill="#FFD866" stroke="#E8A93A" strokeWidth={4} />
    {[
      [380, 170, 0],
      [700, 230, 2],
    ].map(([cx, cy, ph]) => {
      const x = cx + wave(frame, 0.01, 30, ph);
      return (
        <g key={cx} fill="#FFFFFF" opacity={0.9}>
          <ellipse cx={x} cy={cy} rx={70} ry={24} />
          <ellipse cx={x - 30} cy={cy - 16} rx={34} ry={22} />
          <ellipse cx={x + 24} cy={cy - 20} rx={30} ry={20} />
        </g>
      );
    })}
    <path d="M 50 600 Q 220 520 420 580 Q 620 520 920 570 L 920 660 L 50 660 Z" fill="#A9C98A" opacity={0.8} />
    {Array.from({ length: 15 }, (_, i) => (
      <rect key={i} x={70 + i * 60} y={590} width={14} height={70} rx={4} fill="#D8B784" stroke="rgba(59,38,20,0.5)" strokeWidth={2} />
    ))}
    <rect x={60} y={606} width={860} height={10} fill="#D8B784" stroke="rgba(59,38,20,0.5)" strokeWidth={2} />
    <rect x={60} y={634} width={860} height={10} fill="#D8B784" stroke="rgba(59,38,20,0.5)" strokeWidth={2} />
    <path d="M 50 650 Q 300 636 520 648 Q 760 660 920 642 L 920 834 L 50 834 Z" fill="#8DBB6A" />
    {Array.from({ length: 22 }, (_, i) => (
      <path key={i} d={`M ${80 + i * 38} ${700 + (i % 3) * 30} l 5 -14 l 5 14`} fill="none" stroke="#5E8F4E" strokeWidth={3} />
    ))}
  </g>
);

/** Athens cổ: đền cột trên đồi xa, nền đá cẩm thạch, cột đá lớn ở tiền cảnh. */
const Athens: React.FC = () => (
  <g>
    <rect x={50} y={80} width={870} height={754} fill="url(#e02-dusk)" />
    <path d="M 50 600 Q 200 470 380 500 Q 560 440 720 520 Q 840 500 920 540 L 920 640 L 50 640 Z" fill="#C9A77A" opacity={0.7} />
    <g transform="translate(560 480)" opacity={0.6}>
      <path d="M -150 -64 L 0 -110 L 150 -64 Z" fill="#EFE3C8" stroke={INK.line} strokeWidth={3} />
      <rect x={-150} y={-64} width={300} height={12} fill="#EFE3C8" stroke={INK.line} strokeWidth={3} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={-140 + i * 39} y={-52} width={16} height={52} fill="#F6EEDC" stroke={INK.line} strokeWidth={2.5} />
      ))}
      <rect x={-158} y={0} width={316} height={10} fill="#EFE3C8" stroke={INK.line} strokeWidth={3} />
    </g>
    <rect x={50} y={640} width={870} height={194} fill="#EDE3D0" />
    {Array.from({ length: 9 }, (_, i) => (
      <line key={i} x1={60 + i * 110} y1={640} x2={i * 140 - 40} y2={850} stroke="rgba(120,100,80,0.25)" strokeWidth={3} />
    ))}
    <line x1={50} y1={700} x2={920} y2={700} stroke="rgba(120,100,80,0.25)" strokeWidth={3} />
  </g>
);

/** Xưởng gỗ thời Phục Hưng: tường ván, cửa sổ, sàn. */
const Workshop: React.FC = () => (
  <g>
    <rect x={50} y={80} width={870} height={754} fill="#D7B482" />
    {Array.from({ length: 14 }, (_, i) => (
      <line key={i} x1={50} y1={110 + i * 46} x2={920} y2={110 + i * 46} stroke="rgba(110,68,35,0.22)" strokeWidth={4} />
    ))}
    <rect x={560} y={150} width={170} height={190} rx={6} fill="#F7E7B6" stroke={INK.line} strokeWidth={5} />
    <line x1={645} y1={150} x2={645} y2={340} stroke={INK.line} strokeWidth={4} />
    <line x1={560} y1={245} x2={730} y2={245} stroke={INK.line} strokeWidth={4} />
    <path d="M 560 340 L 470 780 L 720 780 L 730 340 Z" fill="rgba(255,240,190,0.25)" />
    <rect x={50} y={120} width={870} height={20} fill={INK.woodDark} />
    <rect x={50} y={740} width={870} height={94} fill="#A9764A" />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} x1={50 + i * 120} y1={740} x2={50 + i * 120 - 30} y2={850} stroke="rgba(59,38,20,0.3)" strokeWidth={3} />
    ))}
  </g>
);

/** Góc học ở nhà: tường, cửa sổ, bàn học. */
const DESK_Y = 620;
const Room: React.FC = () => (
  <g>
    <rect x={50} y={80} width={870} height={754} fill="#EBDDBE" />
    {Array.from({ length: 13 }, (_, i) => (
      <line key={i} x1={80 + i * 70} y1={80} x2={80 + i * 70} y2={740} stroke="rgba(150,100,50,0.10)" strokeWidth={10} />
    ))}
    <rect x={560} y={150} width={200} height={170} rx={8} fill="#CFE6EE" stroke={INK.line} strokeWidth={5} />
    <line x1={660} y1={150} x2={660} y2={320} stroke={INK.line} strokeWidth={4} />
    <rect x={50} y={740} width={870} height={94} fill="#C49A6C" />
    <rect x={70} y={DESK_Y} width={580} height={24} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
    <rect x={96} y={DESK_Y + 24} width={22} height={GROUND - DESK_Y - 24} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
    <rect x={600} y={DESK_Y + 24} width={22} height={GROUND - DESK_Y - 24} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
  </g>
);

/** Sách đóng nằm ngang (gốc: tâm). */
const Book: React.FC<{ x: number; y: number; r?: number; color?: string }> = ({ x, y, r = 0, color = "#C0392B" }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(1.35)`}>
    <rect x={-66} y={-17} width={132} height={34} rx={4} fill={color} stroke={INK.line} strokeWidth={4} />
    <rect x={-58} y={-11} width={118} height={22} fill="#FBF6EA" stroke={INK.line} strokeWidth={2} />
    {[-5, 0, 5].map((ly) => (
      <line key={ly} x1={-54} y1={ly} x2={56} y2={ly} stroke="rgba(59,38,20,0.25)" strokeWidth={1.5} />
    ))}
    <rect x={-66} y={-17} width={14} height={34} rx={3} fill={color} stroke={INK.line} strokeWidth={3} />
  </g>
);

/** Tờ giấy phẳng (nhìn nghiêng), gốc: tâm; `bend` làm giấy cong khi lượn. */
const Paper: React.FC<{ x: number; y: number; r?: number; bend?: number }> = ({ x, y, r = 0, bend = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(1.35)`}>
    <path d={`M -64 0 Q 0 ${-bend * 14} 64 0 L 64 5 Q 0 ${5 - bend * 14} -64 5 Z`} fill="#FFFFFF" stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
  </g>
);

// ---------------------------------------------------------------- hồi 1: mở đầu

/** Găng tay phi hành gia cận cảnh (nắm chặt), ống tay áo kéo xuống dưới. */
const Glove: React.FC<{ x: number; y: number; flip?: boolean }> = ({ x, y, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
    <path d="M -74 60 L 74 60 L 92 420 L -92 420 Z" fill="#EEF0F2" stroke={INK.line} strokeWidth={5} />
    <path d="M -40 120 L -46 420 M 30 120 L 36 420" stroke="#D3D7DB" strokeWidth={6} />
    <rect x={-84} y={30} width={168} height={46} rx={14} fill="#8C98A3" stroke={INK.line} strokeWidth={5} />
    <rect x={-70} y={-78} width={140} height={120} rx={44} fill="#F8F8F4" stroke={INK.line} strokeWidth={5} />
    {[-40, -12, 16, 44].map((fx) => (
      <path key={fx} d={`M ${fx - 13} -70 Q ${fx} -86 ${fx + 13} -70`} fill="#F8F8F4" stroke={INK.line} strokeWidth={4} />
    ))}
    {[-26, 2, 30].map((fx) => (
      <line key={fx} x1={fx} y1={-66} x2={fx} y2={-30} stroke="#CBCFD3" strokeWidth={4} strokeLinecap="round" />
    ))}
    <ellipse cx={-62} cy={-20} rx={22} ry={34} transform="rotate(-24 -62 -20)" fill="#F1F1EC" stroke={INK.line} strokeWidth={4} />
  </g>
);

/** Máy quay truyền hình trên chân ba càng, đèn đỏ nhấp nháy. */
const TvCamera: React.FC<{ x: number; y: number; frame: number }> = ({ x, y, frame }) => (
  <g transform={`translate(${x} ${y})`}>
    {[-30, 0, 30].map((d) => (
      <line key={d} x1={0} y1={-110} x2={d} y2={0} stroke={INK.line} strokeWidth={5} strokeLinecap="round" />
    ))}
    <rect x={-34} y={-160} width={76} height={52} rx={8} fill="#D7DBDE" stroke={INK.line} strokeWidth={4} />
    <rect x={42} y={-148} width={22} height={28} rx={4} fill="#3B3F45" stroke={INK.line} strokeWidth={3} />
    <circle cx={-20} cy={-148} r={6} fill={Math.floor(frame / 12) % 2 === 0 ? "#FF4A3A" : "#7A2A22"} />
  </g>
);

const MILO_HOOK = 760;

const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  const close = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 22) : 0;
  const wide = li === 0 ? 0 : li === 1 ? ease(lf, 0, 28) : 1;
  const zoom = 1 + (1 - wide) * 0.35;
  const rise = li === 0 ? (1 - ease(lf, 0, 20)) * 70 : 0;
  const freeze = li === 2 ? ease(lf, 0, 10) : 0;
  const pose: PoseState = li === 2 ? { pose: "present", prevPose: "eureka", poseT: ease(lf, 6, 14) } : { pose: "eureka" };
  const hx = MILO_HOOK;
  const hy = GROUND + HOLD_DY + 8;
  // Câu 3: vật đóng băng ngay sau lúc buông tay (lệch khỏi bàn tay một chút).
  const drop = li === 2 ? ease(lf, 0, 10) * 26 : 0;
  const cards: [string, string][] = [
    ["CÁI NÀO CHẠM ĐẤT TRƯỚC?", "Ai cũng đáp: chiếc búa!"],
    ["APOLLO 15 · DAVID SCOTT", "Thả thử ngay trên Mặt Trăng"],
    ["BẠN CƯỢC GÌ?", "Ghi vào bình luận trước nhé!"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  return (
    <g>
      <g clipPath="url(#e02-stage)">
        <MoonBg frame={frame} />
        {/* Toàn cảnh: Milo-Scott ở vùng Hadley */}
        {wide > 0.01 ? (
          <g opacity={wide} transform={`translate(${hx} 480) scale(${zoom}) translate(${-hx} -480)`}>
            <Pop p={li === 1 ? pop(lf, fps, 50) : 1} cx={140} cy={700}>
              <TvCamera x={140} y={780} frame={frame} />
            </Pop>
            <Hero x={hx} frame={frame} gear="astro" lively={li === 2 && lf > 24} {...pose} />
            <Feather x={hx - HOLD_DX} y={hy + drop} r={li === 2 ? -6 * freeze : 0} s={OBJ} />
            <Hammer x={hx + HOLD_DX} y={hy + drop} s={OBJ} />
            {li === 2 ? (
              <line
                x1={hx - HOLD_DX - 40}
                y1={hy + drop + 100 * OBJ + 8}
                x2={hx + HOLD_DX + 40}
                y2={hy + drop + 100 * OBJ + 8}
                stroke="#9FE2FF"
                strokeWidth={3}
                strokeDasharray="8 8"
                opacity={freeze}
              />
            ) : null}
          </g>
        ) : null}
        {li === 1 ? <Stamp x={330} y={200} text="2/8/1971 · APOLLO 15" p={ease(lf, 34, 8)} size={36} rot={-6} /> : null}
        {li === 1 ? <NamePlate x={730} y={318} text="DAVID SCOTT" p={pop(lf, fps, 44)} /> : null}
        {/* Đóng băng hình + tấm bảng ba ô */}
        {li === 2 ? (
          <>
            <rect x={50} y={80} width={870} height={754} fill="rgba(150,200,240,0.10)" opacity={freeze} />
            <Pop p={pop(lf, fps, 2)} cx={110} cy={140}>
              <rect x={84} y={116} width={18} height={50} rx={4} fill={CREAM} stroke={INK.line} strokeWidth={3} />
              <rect x={112} y={116} width={18} height={50} rx={4} fill={CREAM} stroke={INK.line} strokeWidth={3} />
            </Pop>
            <Pop p={pop(lf, fps, 18)} cx={370} cy={260}>
              <rect x={86} y={176} width={572} height={176} rx={18} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
              {(
                [
                  ["BÚA?", "", "#C0392B"],
                  ["LÔNG", "CHIM?", "#A8650A"],
                  ["CÙNG", "LÚC?", "#23864D"],
                ] as const
              ).map(([a, b, c], i) => (
                <g key={a}>
                  <rect x={102 + i * 186} y={192} width={168} height={144} rx={12} fill={c} stroke={INK.line} strokeWidth={3} />
                  <text x={186 + i * 186} y={b ? 256 : 280} textAnchor="middle" fill="#FFFFFF" fontSize={44} {...T}>
                    {a}
                  </text>
                  {b ? (
                    <text x={186 + i * 186} y={308} textAnchor="middle" fill="#FFFFFF" fontSize={44} {...T}>
                      {b}
                    </text>
                  ) : null}
                </g>
              ))}
            </Pop>
            <DownArrow x={372} y={420} p={pop(lf, fps, 40)} frame={frame} />
          </>
        ) : null}
        {/* Cận cảnh hai bàn tay găng trắng */}
        {close > 0.01 ? (
          <g opacity={close} transform={`translate(480 470) scale(${1 + (1 - close) * 0.5}) translate(-480 ${-470 + rise})`}>
            <rect x={50} y={80} width={870} height={754} fill="rgba(5,6,12,0.35)" />
            <Feather x={300} y={470} r={180} s={2.3} />
            <Glove x={300} y={510} />
            <Hammer x={640} y={474} r={180} s={2.3} />
            <Glove x={640} y={510} flip />
            {li === 0 ? (
              <>
                <Pop p={pop(lf, fps, 10)} cx={470} cy={330}>
                  <text x={470} y={380} textAnchor="middle" fill={MOON_TXT} fontSize={150} {...T}>
                    ?
                  </text>
                </Pop>
                <Bubble x={770} y={170} text="BÚA!" p={pop(lf, fps, 40)} size={42} tx={700} ty={230} color={INK.red} />
                <Bubble x={560} y={140} text="BÚA!" p={pop(lf, fps, 48)} size={36} color={INK.red} />
                <Bubble x={820} y={300} text="BÚA!" p={pop(lf, fps, 56)} size={34} color={INK.red} />
              </>
            ) : null}
          </g>
        ) : null}
      </g>
      <Card title={title} formula={formula} p={1} fp={li === 0 ? 1 : pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2: rào cản

const Stone: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -22 4 Q -26 -16 -6 -20 Q 18 -24 24 -6 Q 28 14 4 18 Q -18 20 -22 4 Z" fill="#8E8A84" stroke={INK.line} strokeWidth={3.5} />
    <path d="M -10 -10 Q 0 -14 10 -8" fill="none" stroke="#B9B4AC" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Leaf: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <path d="M -30 0 Q 0 -22 30 0 Q 0 22 -30 0 Z" fill="#7DAE4E" stroke={INK.line} strokeWidth={3} />
    <line x1={-30} y1={0} x2={34} y2={0} stroke="#4E7A2E" strokeWidth={2.5} />
  </g>
);

/** Thả hòn đá (rơi thẳng), chiếc lá và tờ giấy (chao lượn). */
const YardDrop: React.FC<{ lf: number; fps: number }> = ({ lf, fps }) => {
  const mx = MILO_HOOK;
  const hy = GROUND + HOLD_DY;
  const st = lin(lf, 12, 13);
  const sy = hy + 10 + (GROUND - 18 - hy - 10) * st * st;
  const leafAt = (tt: number) => ({
    x: mx - HOLD_DX - tt * 1.1 + Math.sin(tt * 0.11) * 44,
    y: Math.min(GROUND - 8, hy + 10 + tt * 1.35),
  });
  const lt = Math.max(0, lf - 12);
  const leaf = leafAt(lt);
  const leafR = Math.sin(lt * 0.11 + 1.2) * 34;
  const pt = Math.max(0, lf - 30);
  const paperY = Math.min(GROUND - 4, 150 + pt * 1.5);
  const paperX = 360 + Math.sin(pt * 0.09) * 70;
  const paperR = Math.sin(pt * 0.09 + 1.4) * 26;
  return (
    <g>
      {/* Vệt chao lượn của chiếc lá */}
      {lt > 2 ? (
        <path
          d={`M ${mx - HOLD_DX} ${hy + 10} ${Array.from({ length: 16 }, (_, i) => {
            const p = leafAt((lt * (i + 1)) / 16);
            return `L ${p.x} ${p.y}`;
          }).join(" ")}`}
          fill="none"
          stroke="rgba(59,38,20,0.35)"
          strokeWidth={3}
          strokeDasharray="6 8"
        />
      ) : null}
      <Stone x={mx + HOLD_DX} y={sy} />
      <Dust x={mx + HOLD_DX} y={GROUND} p={ease(lf, 25, 22)} color="#C9B48A" />
      <Bubble x={560} y={600} text="CỘP!" tx={640} ty={700} p={pop(lf, fps, 25) * (1 - ease(lf, 70, 12))} size={40} />
      <Leaf x={leaf.x} y={leaf.y} r={leaf.y >= GROUND - 9 ? 0 : leafR} />
      {lf > 30 ? <Paper x={paperX} y={paperY} r={paperY >= GROUND - 5 ? 0 : paperR} bend={Math.sin(pt * 0.18)} /> : null}
    </g>
  );
};

/** Cuộn giấy da mở ngang; chữ viết dần (`write`), khung vàng vẽ dần (`frameP`). */
const Scroll: React.FC<{
  open: number;
  lines: string[];
  write: number;
  size: number;
  frameP?: number;
}> = ({ open, lines, write, size, frameP = 0 }) => {
  const cx = 355;
  const half = 265 * Math.max(0.04, open);
  return (
    <g>
      <rect x={cx - half} y={160} width={half * 2} height={220} fill="#FBF0D6" stroke={INK.line} strokeWidth={4} />
      <clipPath id="e02-scroll-write">
        <rect x={cx - 250} y={170} width={500 * write} height={200} />
      </clipPath>
      {open > 0.9 ? (
        <g clipPath="url(#e02-scroll-write)">
          {lines.map((l, i) => (
            <text key={l} x={cx} y={270 + i * (size * 1.3) - ((lines.length - 1) * size * 1.3) / 2 + size * 0.3} textAnchor="middle" fill={INK.line} fontSize={size} {...T}>
              {l}
            </text>
          ))}
        </g>
      ) : null}
      {frameP > 0.01 ? (
        <DrawPath p={frameP} length={1400} d={`M ${cx - 240} 176 L ${cx + 240} 176 L ${cx + 240} 364 L ${cx - 240} 364 Z`} fill="none" stroke="#D99A1E" strokeWidth={8} strokeLinejoin="round" />
      ) : null}
      <rect x={cx - half - 22} y={146} width={26} height={248} rx={12} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <rect x={cx + half - 4} y={146} width={26} height={248} rx={12} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
    </g>
  );
};

const Barrier: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const flip = li === 1 ? ease(lf, 0, 20) : li > 1 ? 1 : 0;
  const scrollOpen = li === 1 ? ease(lf, 10, 22) : li > 1 ? 1 : 0;
  const write1 = li === 1 ? ease(lf, 24, 26) : 1;
  const spheres = li === 1 ? ease(lf, 44, 14) : li === 2 ? 1 - ease(lf, 0, 14) : 0;
  const arrows = li === 1 ? ease(lf, 52, 18) : 1;
  const sink = li === 2 ? ease(lf, 26, 22) : 0;
  const cards: [string, string, boolean][] = [
    ["TRỰC GIÁC NGOÀI ĐỜI", "Đá rơi nhanh · lá, giấy chao lượn", true],
    ["ARISTOTLE · HƠN 2.300 NĂM TRƯỚC", "Vật nặng hơn thì rơi nhanh hơn", false],
    ["ĐƯỢC DẠY SUỐT NHIỀU THẾ KỶ", "Nặng gấp đôi → rơi nhanh gấp đôi", false],
  ];
  const [title, formula, ok] = cards[Math.min(li, 2)];
  const books: [number, number, string][] = [
    [440, 0, "#7A3E22"],
    [400, 18, "#1D6A8C"],
    [420, -10, "#6B7346"],
    [380, 10, "#9E2A2B"],
  ];
  const yardPose: PoseState = li === 0 ? (lf < 14 ? { pose: "eureka" } : { pose: "point", prevPose: "eureka", poseT: ease(lf, 14, 14) }) : { pose: "point" };
  return (
    <g>
      <g clipPath="url(#e02-stage)">
        {li >= 1 ? (
          <g>
            <Athens />
            {li === 2
              ? books.map(([w, off, c], i) => {
                  const p = pop(lf, fps, 14 + i * 6);
                  const by = GROUND - 62 * (i + 1);
                  const bx = 355 - w / 2 + off;
                  return p > 0.01 ? (
                    <g key={i} transform={`translate(0 ${(1 - Math.min(1, p)) * -200})`} opacity={Math.min(1, p * 2)}>
                      <rect x={bx} y={by} width={w} height={60} rx={6} fill={c} stroke={INK.line} strokeWidth={4} />
                      <rect x={bx + 8} y={by + 8} width={w - 16} height={44} rx={4} fill="none" stroke="#E0AD46" strokeWidth={2.5} />
                      <line x1={bx + 40} y1={by} x2={bx + 40} y2={by + 60} stroke="#E0AD46" strokeWidth={5} />
                      <line x1={bx + w - 40} y1={by} x2={bx + w - 40} y2={by + 60} stroke="#E0AD46" strokeWidth={5} />
                    </g>
                  ) : null;
                })
              : null}
            <g transform={`translate(0 ${sink * 152}) translate(355 270) scale(${1 - sink * 0.12}) translate(-355 -270)`}>
              <Scroll
                open={scrollOpen}
                size={li === 2 ? 38 : 44}
                lines={li === 2 ? ["NẶNG GẤP ĐÔI", "→ RƠI NHANH GẤP ĐÔI"] : ["VẬT NẶNG HƠN", "→ RƠI NHANH HƠN"]}
                write={li === 2 ? ease(lf, 0, 14) : write1}
                frameP={li === 2 ? ease(lf, 10, 22) : 0}
              />
            </g>
            {li === 2 ? <Stamp x={355} y={180} text="SUỐT NHIỀU THẾ KỶ" p={ease(lf, 54, 8)} size={36} rot={-4} color={INK.gold} /> : null}
            {spheres > 0.01 ? (
              <g opacity={spheres}>
                {(
                  [
                    [230, 46, "1 kg", 70, "v"],
                    [450, 58, "2 kg", 140, "2v"],
                  ] as const
                ).map(([cx, r, label, len, v]) => (
                  <g key={label}>
                    <circle cx={cx} cy={480} r={r} fill="#B9864A" stroke={INK.line} strokeWidth={4} />
                    <circle cx={cx - r * 0.35} cy={480 - r * 0.35} r={r * 0.25} fill="#E2B87A" />
                    <text x={cx} y={492} textAnchor="middle" fill={CREAM} fontSize={32} {...T}>
                      {label}
                    </text>
                    <Arrow x1={cx} y1={480 + r + 10} x2={cx} y2={480 + r + 10 + len} p={arrows} color={INK.blue} w={9} head={22} />
                    <Fade p={arrows}>
                      <text x={cx + 30} y={480 + r + 20 + len / 2} fill={INK.blue} fontSize={40} {...T}>
                        {v}
                      </text>
                    </Fade>
                  </g>
                ))}
              </g>
            ) : null}
            <Hero x={790} frame={frame} gear="toga" enter={li === 1 ? ease(lf, 6, 30) : 1} from={200} {...linePose(li - 1, lf, ["present", "point"])} />
            <NamePlate x={760} y={330} text="ARISTOTLE" p={li === 1 ? pop(lf, fps, 34) : 1} />
          </g>
        ) : null}
        {/* Sân Trái Đất; sang câu 2 thì lật như trang giấy sang trái */}
        {flip < 0.99 ? (
          <g transform={`translate(60 0) scale(${1 - flip} 1) translate(-60 0)`}>
            <Yard frame={frame} />
            <Hero x={MILO_HOOK} frame={frame} lively={li > 0 || lf > 30} {...yardPose} />
            <YardDrop lf={li === 0 ? lf : 400} fps={fps} />
            {flip > 0.01 ? <rect x={50} y={80} width={870} height={754} fill={`rgba(59,38,20,${flip * 0.5})`} /> : null}
          </g>
        ) : null}
      </g>
      <Card title={title} formula={formula} p={pop(bf, fps, 6)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3: eureka (Galileo)

const Pisa: React.FC<{ frame: number }> = ({ frame }) => {
  const levels = 7;
  const balls = (frame % 70) / 50;
  const by = 238 + 450 * Math.min(1, balls) ** 2;
  return (
    <g>
      <g transform="rotate(5 360 720)">
        {Array.from({ length: levels }, (_, i) => {
          const y = 720 - (i + 1) * 64;
          return (
            <g key={i}>
              <rect x={290} y={y} width={140} height={64} fill="#F2E3C2" stroke="#6E4A28" strokeWidth={3} />
              {[0, 1, 2, 3].map((a) => (
                <path
                  key={a}
                  d={`M ${300 + a * 32} ${y + 56} L ${300 + a * 32} ${y + 26} Q ${312 + a * 32} ${y + 12} ${324 + a * 32} ${y + 26} L ${324 + a * 32} ${y + 56}`}
                  fill="rgba(110,74,40,0.35)"
                />
              ))}
              <line x1={284} y1={y} x2={436} y2={y} stroke="#6E4A28" strokeWidth={5} />
            </g>
          );
        })}
        <rect x={318} y={720 - levels * 64 - 52} width={84} height={52} fill="#F2E3C2" stroke="#6E4A28" strokeWidth={3} />
        <path d={`M 312 ${720 - levels * 64 - 52} L 360 ${720 - levels * 64 - 74} L 408 ${720 - levels * 64 - 52} Z`} fill="#D9C39A" stroke="#6E4A28" strokeWidth={3} />
        {/* Người nhỏ trên đỉnh tháp cầm hai quả cầu */}
        <g stroke="#3B2614" strokeWidth={4} strokeLinecap="round">
          <circle cx={404} cy={248} r={9} fill="#3B2614" />
          <line x1={404} y1={256} x2={404} y2={282} />
          <line x1={404} y1={264} x2={424} y2={256} />
        </g>
      </g>
      <circle cx={438} cy={by} r={9} fill="#6E4A28" />
      <circle cx={458} cy={by} r={13} fill="#6E4A28" />
    </g>
  );
};

const Painting: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={76} y={112} width={600} height={660} rx={8} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
    <rect x={96} y={132} width={560} height={620} fill="url(#e02-sepia)" stroke={INK.line} strokeWidth={3} />
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M ${120 + i * 70} ${170 + (i % 3) * 30} q 20 -10 40 0`} fill="none" stroke="rgba(110,74,40,0.3)" strokeWidth={3} />
    ))}
    <path d="M 96 720 Q 300 700 656 724 L 656 752 L 96 752 Z" fill="rgba(110,74,40,0.25)" />
    <Pisa frame={frame} />
  </g>
);

/** Máng nghiêng của Galileo: từ A (cao, trái) xuống B (thấp, phải). */
const RA = { x: 110, y: 330 };
const RB = { x: 620, y: 680 };
const RLEN = Math.hypot(RB.x - RA.x, RB.y - RA.y);
const RU = { x: (RB.x - RA.x) / RLEN, y: (RB.y - RA.y) / RLEN };
const RN = { x: RU.y, y: -RU.x };
const rampAt = (u: number, off = 0) => ({
  x: RA.x + (RB.x - RA.x) * u + RN.x * off,
  y: RA.y + (RB.y - RA.y) * u + RN.y * off,
});

const Ramp: React.FC<{ u: number; ballO?: number; theta: number }> = ({ u, ballO = 1, theta }) => {
  const b = rampAt(u, 22);
  const roll = (u * RLEN * 180) / (Math.PI * 18);
  const mid = rampAt(0.5);
  return (
    <g>
      {/* Quả lắc */}
      <line x1={250} y1={140} x2={250 + Math.sin(theta) * 200} y2={140 + Math.cos(theta) * 200} stroke={INK.line} strokeWidth={4} />
      <circle cx={250} cy={140} r={8} fill={INK.line} />
      <circle cx={250 + Math.sin(theta) * 200} cy={140 + Math.cos(theta) * 200} r={22} fill="#C9A13A" stroke={INK.line} strokeWidth={4} />
      {/* Chân đỡ */}
      <rect x={RA.x + 10} y={RA.y + 16} width={18} height={GROUND - RA.y - 16} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
      <rect x={mid.x - 9} y={mid.y + 16} width={18} height={GROUND - mid.y - 16} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
      <rect x={RB.x - 30} y={RB.y + 10} width={18} height={GROUND - RB.y - 10} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
      {/* Máng gỗ có rãnh */}
      <path
        d={`M ${RA.x} ${RA.y} L ${RB.x} ${RB.y} L ${RB.x - RN.x * 26} ${RB.y - RN.y * 26} L ${RA.x - RN.x * 26} ${RA.y - RN.y * 26} Z`}
        fill="#C4843F"
        stroke={INK.line}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <line x1={RA.x + RN.x * 3} y1={RA.y + RN.y * 3} x2={RB.x + RN.x * 3} y2={RB.y + RN.y * 3} stroke="#7A4A20" strokeWidth={5} />
      {ballO > 0.01 ? (
        <g opacity={ballO} transform={`translate(${b.x} ${b.y}) rotate(${roll})`}>
          <circle r={18} fill="#C47A2C" stroke={INK.line} strokeWidth={4} />
          <line x1={-12} y1={0} x2={12} y2={0} stroke="#8A5220" strokeWidth={3} />
          <circle cx={-6} cy={-6} r={5} fill="#F2C27A" />
        </g>
      ) : null}
    </g>
  );
};

const MARKS = [1, 4, 9].map((n) => 0.06 + (0.9 * n) / 9);
const LABEL_POS: [number, number][] = [
  [215, 456],
  [362, 566],
  [470, 744],
];

const Eureka: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const painting = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 16, 16) : 0;
  const shop = li === 1 ? ease(lf, 12, 18) : li === 2 ? 1 : 0;
  // Câu 2: bi lăn lặp lại; câu 3: lăn theo nhịp quả lắc (nhịp = 18 khung), quãng đường 1 : 4 : 9.
  let u = 0.06;
  let ballO = 1;
  let theta = 0.38 * Math.cos((Math.PI * (lf - 6)) / 18);
  if (li === 1) {
    const c = Math.max(0, lf - 30) % 84;
    u = 0.06 + 0.9 * Math.min(1, c / 56) ** 2;
    ballO = lf < 30 ? 0 : Math.min(ease(c, 0, 6), 1 - ease(c, 72, 10));
    theta = 0.38 * Math.sin(frame * 0.17);
  } else if (li === 2) {
    const c = (lf - 90) % 90;
    const beat = lf < 90 ? (lf - 6) / 18 : c / 18;
    u = 0.06 + (0.9 * Math.min(9, Math.max(0, beat) ** 2)) / 9;
    ballO = lf < 90 ? 1 : Math.min(ease(c, 0, 6), 1 - ease(c, 80, 8));
  }
  const pose: PoseState = li === 0 ? { pose: "point" } : li === 1 ? { pose: "present", prevPose: "point", poseT: ease(lf, 20, 14) } : poseAt(lf, 64, "present", "point");
  // Câu 4: thả trên Mặt Trăng, quay chậm.
  const mx = 600;
  const hy = GROUND + HOLD_DY + 8;
  const fallLen = GROUND - 4 - (hy + 100 * OBJ);
  const ft = lin(lf, 8, 44);
  const fall = fallLen * ft * ft;
  const landed = li === 3 && lf >= 52;
  const cards: [string, string][] = [
    ["GALILEO · THÁP NGHIÊNG PISA?", "Tương truyền · Viviani kể lại"],
    ["CÓ GHI CHÉP · KHOẢNG NĂM 1604", "Bi lăn xuống máng nghiêng"],
    lf < 66 ? ["NHANH DẦN ĐỀU", "1 nhịp → 1 · 2 nhịp → 4 · 3 nhịp → 9"] : ["GALILEO KẾT LUẬN", "Không khí cản → mọi vật rơi như nhau"],
    ["MẶT TRĂNG GẦN NHƯ KHÔNG CÓ KHÍ", "Búa và lông chim chạm đất cùng lúc!"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
  return (
    <g>
      <g clipPath="url(#e02-stage)">
        {li <= 2 ? (
          <>
            {shop > 0.01 ? (
              <g opacity={shop}>
                <Workshop />
                <Ramp u={u} ballO={ballO} theta={theta} />
                {li === 1 ? <Stamp x={480} y={420} text="~ NĂM 1604" p={ease(lf, 40, 8)} size={40} rot={-6} color={INK.gold} /> : null}
                {li === 2
                  ? MARKS.map((m, i) => {
                      const p = pop(lf, fps, 24 + i * 18);
                      const a = rampAt(m, 0);
                      const b = rampAt(m, 50);
                      const [lx, ly] = LABEL_POS[i];
                      return (
                        <g key={i}>
                          <Pop p={p} cx={a.x} cy={a.y}>
                            <line x1={a.x - RN.x * 8} y1={a.y - RN.y * 8} x2={b.x} y2={b.y} stroke={INK.red} strokeWidth={6} strokeLinecap="round" />
                          </Pop>
                          <Pop p={p} cx={lx} cy={ly}>
                            <rect x={lx - 112} y={ly - 38} width={224} height={60} rx={12} fill={CREAM} stroke={INK.red} strokeWidth={4} />
                            <text x={lx} y={ly + 6} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                              {i + 1} nhịp → {[1, 4, 9][i]}
                            </text>
                          </Pop>
                        </g>
                      );
                    })
                  : null}
              </g>
            ) : null}
            {painting > 0.01 ? (
              <g opacity={painting} transform={`translate(${-(1 - painting) * 120} 0)`}>
                <Painting frame={frame} />
                {li === 0 ? (
                  <>
                    <Stamp x={380} y={430} text="TƯƠNG TRUYỀN" p={ease(lf, 28, 8)} size={50} rot={-14} />
                    <g
                      transform={`translate(${interpolate(ease(lf, 44, 22), [0, 1], [900, 470])} ${interpolate(ease(lf, 44, 22), [0, 1], [240, 640])}) rotate(${interpolate(ease(lf, 44, 22), [0, 1], [-40, -6])})`}
                      opacity={lf > 44 ? 1 : 0}
                    >
                      <rect x={-104} y={-62} width={208} height={124} rx={8} fill="#7A3E22" stroke={INK.line} strokeWidth={4} />
                      <rect x={-92} y={-50} width={184} height={100} rx={4} fill="none" stroke="#E0AD46" strokeWidth={3} />
                      <text x={0} y={-6} textAnchor="middle" fill={CREAM} fontSize={36} {...T}>
                        VIVIANI
                      </text>
                      <text x={0} y={36} textAnchor="middle" fill="#F2BE4A" fontSize={34} {...T}>
                        kể lại
                      </text>
                    </g>
                    {[
                      [190, 300, 62],
                      [600, 240, 68],
                      [620, 470, 74],
                    ].map(([qx, qy, d]) => (
                      <Pop key={qx} p={pop(lf, fps, d)} cx={qx} cy={qy}>
                        <text x={qx} y={qy + 26 + wave(frame, 0.12, 5, qx)} textAnchor="middle" fill={INK.red} fontSize={76} {...T}>
                          ?
                        </text>
                      </Pop>
                    ))}
                  </>
                ) : null}
                {li === 1 ? (
                  <>
                    <DrawLine p={ease(lf, 0, 10)} x1={110} y1={150} x2={640} y2={740} stroke={INK.red} strokeWidth={16} strokeLinecap="round" />
                    <DrawLine p={ease(lf, 6, 10)} x1={640} y1={150} x2={110} y2={740} stroke={INK.red} strokeWidth={16} strokeLinecap="round" />
                  </>
                ) : null}
              </g>
            ) : null}
            <Hero x={800} frame={frame} gear="galileo" {...pose} />
            <NamePlate x={790} y={322} text="GALILEO" p={li === 0 ? pop(lf, fps, 6) : 1} />
          </>
        ) : (
          <>
            <MoonBg frame={frame} />
            {/* Máy quay áp sát lúc thả, lùi ra khi chạm đất */}
            <g transform={`translate(${mx} 660) scale(${1 + 0.35 * ease(lf, 0, 14) * (1 - ease(lf, 54, 18))}) translate(${-mx} -660)`}>
              <Hero x={mx} frame={frame} gear="astro" lively={landed} pose="eureka" />
              {/* Vệt mờ: hai vật rơi song song */}
              {lf > 12 && !landed
                ? [1, 2, 3].map((g) => {
                    const tg = lin(lf - g * 6, 8, 44);
                    const fg = fallLen * tg * tg;
                    return (
                      <g key={g}>
                        <Feather x={mx - HOLD_DX} y={hy + fg} s={OBJ} ghost />
                        <Hammer x={mx + HOLD_DX} y={hy + fg} s={OBJ} ghost />
                      </g>
                    );
                  })
                : null}
              <Feather x={mx - HOLD_DX} y={hy + fall} r={landed ? interpolate(ease(lf, 52, 10), [0, 1], [0, -8]) : 0} s={OBJ} />
              <Hammer x={mx + HOLD_DX} y={hy + fall} r={landed ? interpolate(ease(lf, 52, 10), [0, 1], [0, 8]) : 0} s={OBJ} />
              {lf > 10 ? (
                <line
                  x1={mx - HOLD_DX - 50}
                  y1={hy + fall + 100 * OBJ}
                  x2={mx + HOLD_DX + 50}
                  y2={hy + fall + 100 * OBJ}
                  stroke="#9FE2FF"
                  strokeWidth={4}
                  strokeDasharray="10 8"
                  opacity={ease(lf, 10, 8) * (1 - ease(lf, 60, 14))}
                />
              ) : null}
              <Dust x={mx - HOLD_DX} y={GROUND} p={ease(lf, 52, 26)} />
              <Dust x={mx + HOLD_DX} y={GROUND} p={ease(lf, 52, 26)} />
            </g>
            <Fade p={ease(lf, 0, 8) * (1 - ease(lf, 56, 10))}>
              <rect x={84} y={112} width={262} height={60} rx={14} fill="rgba(5,6,12,0.75)" stroke={MOON_TXT} strokeWidth={3} />
              <text x={215} y={154} textAnchor="middle" fill={MOON_TXT} fontSize={34} {...T}>
                ▶ QUAY CHẬM
              </text>
            </Fade>
            <Pop p={pop(lf, fps, 52) * (1 - ease(lf, 90, 14))} cx={300} cy={600}>
              <rect x={180} y={570} width={240} height={60} rx={14} fill={INK.green} stroke={INK.line} strokeWidth={4} />
              <text x={300} y={613} textAnchor="middle" fill="#FFFFFF" fontSize={38} {...T}>
                CÙNG LÚC!
              </text>
            </Pop>
            <Bubble x={345} y={250} text="GALILEO ĐÃ ĐÚNG!" p={pop(lf, fps, 60)} size={42} tx={500} ty={320} color={INK.green} />
          </>
        )}
      </g>
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, li === 2 && lf >= 66 ? 66 : 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4: định lý

const TUBE = { x: 360, y: 210, w: 170, h: 510 };
const TUBE_TOP = 250;

const GlassTube: React.FC<{ air: number; frame: number; vacuum: number }> = ({ air, frame, vacuum }) => (
  <g>
    <rect x={TUBE.x} y={TUBE.y} width={TUBE.w} height={TUBE.h} rx={22} fill="url(#e02-glass)" stroke={INK.line} strokeWidth={4} />
    {air > 0.01
      ? Array.from({ length: 22 }, (_, i) => {
          const o = clamp01(air * 22 - i);
          return (
            <circle
              key={i}
              cx={TUBE.x + 20 + ((i * 53) % (TUBE.w - 40)) + wave(frame, 0.3, 5, i)}
              cy={TUBE.y + 30 + ((i * 97) % (TUBE.h - 60)) + wave(frame, 0.27, 5, i * 2)}
              r={6}
              fill="#6AB7D8"
              opacity={o * 0.8}
            />
          );
        })
      : null}
    <rect x={TUBE.x + 14} y={TUBE.y + 16} width={14} height={TUBE.h - 32} rx={7} fill="rgba(255,255,255,0.55)" />
    <rect x={TUBE.x - 16} y={TUBE.y - 18} width={TUBE.w + 32} height={26} rx={8} fill="#9AA3A8" stroke={INK.line} strokeWidth={4} />
    <rect x={TUBE.x - 26} y={TUBE.y + TUBE.h - 6} width={TUBE.w + 52} height={34} rx={8} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
    <Pop p={vacuum} cx={TUBE.x + TUBE.w / 2} cy={TUBE.y - 46}>
      <rect x={TUBE.x - 40} y={TUBE.y - 80} width={TUBE.w + 80} height={54} rx={14} fill={INK.blue} stroke={INK.line} strokeWidth={4} />
      <text x={TUBE.x + TUBE.w / 2} y={TUBE.y - 41} textAnchor="middle" fill="#FFFFFF" fontSize={34} {...T}>
        CHÂN KHÔNG
      </text>
    </Pop>
  </g>
);

const Stopwatch: React.FC<{ x: number; y: number; sec: number }> = ({ x, y, sec }) => (
  <g>
    <rect x={x - 16} y={y - 120} width={32} height={26} rx={5} fill="#9AA3A8" stroke={INK.line} strokeWidth={4} />
    <circle cx={x} cy={y} r={96} fill="#FFFDF5" stroke={INK.line} strokeWidth={7} />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <line key={i} x1={x + Math.sin(a) * 78} y1={y - Math.cos(a) * 78} x2={x + Math.sin(a) * 88} y2={y - Math.cos(a) * 88} stroke={INK.line} strokeWidth={4} />;
    })}
    {sec > 0.01 ? (
      <path d={`M ${x} ${y} L ${x} ${y - 84} A 84 84 0 ${sec > 1 ? 1 : 0} 1 ${x + Math.sin(sec * Math.PI) * 84} ${y - Math.cos(sec * Math.PI) * 84} Z`} fill="rgba(35,134,77,0.25)" />
    ) : null}
    <line x1={x} y1={y} x2={x + Math.sin(sec * Math.PI) * 76} y2={y - Math.cos(sec * Math.PI) * 76} stroke={INK.red} strokeWidth={6} strokeLinecap="round" />
    <circle cx={x} cy={y} r={8} fill={INK.line} />
    <text x={x} y={y + 56} textAnchor="middle" fill={INK.line} fontSize={40} {...T}>
      {sec >= 1.19 ? "> 1 s" : `${countUp(sec / 1.2, 1.2, 1)} s`}
    </text>
  </g>
);

const Theorem: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const air = li === 0 ? 1 - ease(lf, 22, 34) : 0;
  const vacuum = li === 0 ? pop(lf, fps, 52) : li === 1 ? 1 : 0;
  const pump = li === 0 && lf > 18 && lf < 60 ? Math.abs(Math.sin((lf - 18) * 0.3)) * 22 : 0;
  // Câu 2: búa và lông rơi trong ống chân không (vệt chớp sáng: khoảng cách tăng dần).
  const ft = li === 1 ? lin(lf, 6, 36) : 0;
  const tubeFall = TUBE.y + TUBE.h - 12 - (TUBE_TOP + 100);
  const drop = tubeFall * ft * ft;
  const cx1 = TUBE.x + 52;
  const cx2 = TUBE.x + 122;
  const leftFeather = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const fy = 180 + ((frame * 1.1) % 400);
  const fx = 190 + Math.sin(frame * 0.08) * 26;
  // Câu 3: cú thả ngang tầm vai trên Mặt Trăng mất hơn một giây (~1,2 giây đo trên phim = 36 khung).
  const cyc = Math.max(0, lf - 24) % 120;
  const mt = li === 2 && lf >= 24 ? Math.min(1, cyc / 36) : 0;
  const book = li === 3 ? ease(lf, 12, 22) : 0;
  const cards: [string, string][] = [
    ["THỦ PHẠM: SỨC CẢN KHÔNG KHÍ", "Hết không khí → chỉ còn trọng lực"],
    ["RƠI TỰ DO · CÙNG GIA TỐC g", "s = ½gt²"],
    ["MẶT TRĂNG HÚT YẾU HƠN", "Thả ngang tầm vai: hơn 1 giây"],
    ["VẬT LÍ 10 · SỰ RƠI TỰ DO", "Bài học mở đầu bằng cú thả này"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
  const pose: PoseState =
    li === 0
      ? { pose: "touch" }
      : li === 1
        ? { pose: "point", prevPose: "touch", poseT: ease(lf, 0, 14) }
        : li === 2
          ? { pose: "point" }
          : { pose: "present", prevPose: "point", poseT: ease(lf, 0, 14) };
  return (
    <g>
      <g clipPath="url(#e02-stage)">
        {li <= 1 ? (
          <>
            <Yard frame={frame} />
            {leftFeather > 0.01 ? (
              <g opacity={leftFeather}>
                <Feather x={fx} y={fy} r={Math.sin(frame * 0.08 + 1) * 24} s={1} />
                {[-34, 0, 34].map((d, i) => (
                  <Arrow key={d} x1={fx + d} y1={fy + 172 - (i % 2) * 14} x2={fx + d} y2={fy + 118 - (i % 2) * 14} color={INK.blue} w={5} head={14} />
                ))}
                <rect x={80} y={108} width={226} height={56} rx={12} fill={CREAM} stroke={INK.blue} strokeWidth={3} />
                <text x={193} y={149} textAnchor="middle" fill={INK.blue} fontSize={34} {...T}>
                  SỨC CẢN ↑
                </text>
              </g>
            ) : null}
            <GlassTube air={air} frame={frame} vacuum={vacuum} />
            {/* Ống dẫn + bơm tay */}
            <path d={`M ${TUBE.x + TUBE.w} ${TUBE.y + TUBE.h - 30} Q 600 ${TUBE.y + TUBE.h - 30} 620 690`} fill="none" stroke={INK.line} strokeWidth={12} />
            <path d={`M ${TUBE.x + TUBE.w} ${TUBE.y + TUBE.h - 30} Q 600 ${TUBE.y + TUBE.h - 30} 620 690`} fill="none" stroke="#7E8A90" strokeWidth={7} />
            <rect x={600} y={640} width={44} height={110} rx={8} fill="#B7791F" stroke={INK.line} strokeWidth={4} />
            <line x1={622} y1={640} x2={622} y2={600 + pump} stroke={INK.line} strokeWidth={8} />
            <rect x={590} y={592 + pump} width={66} height={14} rx={6} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
            {li === 0 && air > 0.05 && lf > 20
              ? [0, 1, 2].map((i) => {
                  const k = (lf * 0.03 + i / 3) % 1;
                  return <circle key={i} cx={TUBE.x + TUBE.w + k * 80} cy={TUBE.y + TUBE.h - 30 + k * k * 60} r={5} fill="#6AB7D8" opacity={air} />;
                })
              : null}
            {/* Búa và lông trong ống */}
            {li === 1
              ? [0.25, 0.5, 0.75].map((k) =>
                  ft > k ? (
                    <g key={k}>
                      <Hammer x={cx1} y={TUBE_TOP + tubeFall * k * k} s={0.8} ghost />
                      <Feather x={cx2} y={TUBE_TOP + tubeFall * k * k} s={0.8} ghost />
                    </g>
                  ) : null,
                )
              : null}
            <Hammer x={cx1} y={TUBE_TOP + drop} s={0.8} />
            <Feather x={cx2} y={TUBE_TOP + drop} s={0.8} />
            {li === 0 ? (
              <>
                <Arrow x1={cx1} y1={TUBE_TOP + 90} x2={cx1} y2={TUBE_TOP + 190} p={ease(lf, 58, 12)} color={INK.red} w={7} head={18} />
                <Arrow x1={cx2} y1={TUBE_TOP + 90} x2={cx2} y2={TUBE_TOP + 190} p={ease(lf, 62, 12)} color={INK.red} w={7} head={18} />
                <Fade p={ease(lf, 64, 10)}>
                  <text x={cx1 - 30} y={TUBE_TOP + 176} textAnchor="middle" fill={INK.red} fontSize={40} {...T}>
                    P
                  </text>
                  <text x={cx2 + 32} y={TUBE_TOP + 176} textAnchor="middle" fill={INK.red} fontSize={40} {...T}>
                    P
                  </text>
                </Fade>
              </>
            ) : null}
            {li === 1 ? (
              <>
                <DrawLine p={ft} x1={cx1 - 30} y1={TUBE_TOP} x2={cx1 - 30} y2={TUBE_TOP + 90 + tubeFall} stroke="rgba(192,57,43,0.6)" strokeWidth={5} strokeDasharray="4 8" />
                <DrawLine p={ft} x1={cx2 + 30} y1={TUBE_TOP} x2={cx2 + 30} y2={TUBE_TOP + 90 + tubeFall} stroke="rgba(192,57,43,0.6)" strokeWidth={5} strokeDasharray="4 8" />
                <Pop p={pop(lf, fps, 40)} cx={200} cy={380}>
                  <g transform={`translate(0 ${wave(frame, 0.08, 4)})`}>
                    <rect x={76} y={300} width={262} height={150} rx={14} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
                    <rect x={88} y={312} width={238} height={126} rx={8} fill="#2F4A3A" />
                    <text x={207} y={lf >= 110 ? 372 : 396} textAnchor="middle" fill="#FFE27A" fontSize={lf >= 110 ? 50 : 56} {...T}>
                      s = ½gt²
                    </text>
                    <Fade p={ease(lf, 110, 10)}>
                      <text x={207} y={424} textAnchor="middle" fill="#FFFFFF" fontSize={36} {...T}>
                        t ×2 → s ×4
                      </text>
                    </Fade>
                  </g>
                </Pop>
                <Pop p={pop(lf, fps, 54)} cx={207} cy={540}>
                  <rect x={86} y={500} width={242} height={124} rx={14} fill={CREAM} stroke={INK.green} strokeWidth={4} />
                  <text x={207} y={548} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                    nặng hay nhẹ
                  </text>
                  <text x={207} y={600} textAnchor="middle" fill={INK.green} fontSize={44} {...T}>
                    cùng g
                  </text>
                </Pop>
              </>
            ) : null}
          </>
        ) : null}
        {li === 2 ? (
          <>
            <rect x={50} y={80} width={870} height={754} fill="#F3E6C8" />
            {(
              [
                [74, "TRÁI ĐẤT", "g ≈ 9,8 m/s²", "#3A86FF", 0],
                [376, "MẶT TRĂNG", "g ≈ 1,62 m/s²", "#B9B9BE", 12],
              ] as const
            ).map(([x, name, g, c, d]) => (
              <Pop key={name} p={pop(lf, fps, d)} cx={x + 145} cy={235}>
                <rect x={x} y={130} width={290} height={210} rx={18} fill={CREAM} stroke={d ? INK.gold : INK.line} strokeWidth={d ? 6 : 4} />
                <circle cx={x + 145} cy={186} r={36} fill={c} stroke={INK.line} strokeWidth={4} />
                {d ? (
                  <>
                    <circle cx={x + 132} cy={176} r={8} fill="#8E8E94" />
                    <circle cx={x + 158} cy={198} r={6} fill="#8E8E94" />
                  </>
                ) : (
                  <path d={`M ${x + 124} ${176} q 14 -10 24 4 q 10 14 -6 24 q -14 4 -18 -10 z`} fill="#5CC27A" />
                )}
                <text x={x + 145} y={262} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                  {name}
                </text>
                <text x={x + 145} y={314} textAnchor="middle" fill={d ? INK.gold : INK.blue} fontSize={34} {...T}>
                  {g}
                </text>
              </Pop>
            ))}
            <Pop p={pop(lf, fps, 30)} cx={652} cy={140}>
              <rect x={584} y={106} width={136} height={68} rx={34} fill={INK.gold} stroke={INK.line} strokeWidth={4} />
              <text x={652} y={153} textAnchor="middle" fill="#FFFFFF" fontSize={36} {...T}>
                ≈ 1/6
              </text>
            </Pop>
            <g opacity={ease(lf, 14, 14)}>
              <path d="M 370 712 Q 520 700 690 714 L 690 780 L 370 780 Z" fill="#A9A9AF" stroke={INK.line} strokeWidth={3} />
              <rect x={398} y={460} width={30} height={320} fill="#F2BE4A" stroke={INK.line} strokeWidth={3} />
              {Array.from({ length: 9 }, (_, i) => (
                <line key={i} x1={398} y1={460 + i * 40} x2={i % 2 ? 412 : 420} y2={460 + i * 40} stroke={INK.line} strokeWidth={3} />
              ))}
              <text x={413} y={444} textAnchor="middle" fill={INK.line} fontSize={36} {...T}>
                TẦM VAI
              </text>
              <Hammer x={515} y={460 + 186 * mt * mt} s={1.3} />
              <Feather x={615} y={460 + 186 * mt * mt} s={1.3} />
              <Dust x={565} y={778} p={ease(cyc, 36, 22)} />
            </g>
            <Pop p={pop(lf, fps, 18)} cx={210} cy={570}>
              <Stopwatch x={210} y={580} sec={1.2 * mt} />
            </Pop>
          </>
        ) : null}
        {li === 3 ? (
          <>
            <rect x={50} y={80} width={870} height={754} fill="#F3E6C8" />
            <Pop p={pop(lf, fps, 0)} cx={370} cy={420}>
              <rect x={84} y={176} width={572} height={480} rx={10} fill="rgba(0,0,0,0.18)" transform="translate(8 10)" />
              {/* Trang phải: hình búa và lông chim trên Mặt Trăng */}
              <path d="M 370 180 Q 520 168 650 182 L 650 650 Q 520 636 370 652 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
              <g opacity={book}>
                <rect x={396} y={214} width={230} height={250} rx={6} fill="#141826" stroke={INK.line} strokeWidth={3} />
                <path d="M 396 400 Q 500 380 626 396 L 626 464 L 396 464 Z" fill="#9A9AA0" />
                <Hammer x={470} y={290} />
                <Feather x={556} y={290} />
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1={400} y1={500 + i * 34} x2={620 - (i === 3 ? 80 : 0)} y2={500 + i * 34} stroke={INK.soft} strokeWidth={5} />
                ))}
              </g>
              {book < 0.5 ? (
                <g transform={`translate(370 0) scale(${1 - book * 2} 1) translate(-370 0)`}>
                  <path d="M 370 176 L 660 176 L 660 656 L 370 656 Z" fill={INK.blue} stroke={INK.line} strokeWidth={5} />
                  <text x={515} y={330} textAnchor="middle" fill="#FFFFFF" fontSize={56} {...T}>
                    VẬT LÍ
                  </text>
                  <text x={515} y={440} textAnchor="middle" fill="#FFE27A" fontSize={110} {...T}>
                    10
                  </text>
                </g>
              ) : (
                <g transform={`translate(370 0) scale(${book * 2 - 1} 1) translate(-370 0)`}>
                  <path d="M 370 180 Q 220 168 90 182 L 90 650 Q 220 636 370 652 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
                  <text x={230} y={262} textAnchor="middle" fill={INK.blue} fontSize={32} {...T}>
                    VẬT LÍ 10
                  </text>
                  <text x={230} y={360} textAnchor="middle" fill={INK.red} fontSize={66} {...T}>
                    BÀI 10
                  </text>
                  <text x={230} y={450} textAnchor="middle" fill={INK.line} fontSize={46} {...T}>
                    SỰ RƠI
                  </text>
                  <text x={230} y={510} textAnchor="middle" fill={INK.line} fontSize={46} {...T}>
                    TỰ DO
                  </text>
                </g>
              )}
              <line x1={370} y1={176} x2={370} y2={656} stroke={INK.line} strokeWidth={4} />
            </Pop>
          </>
        ) : null}
        <Hero x={800} frame={frame} gear="scholar" {...pose} />
      </g>
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5: thử ở nhà, tháp rơi NASA Glenn

const DropTower: React.FC<{ lf: number; frame: number }> = ({ lf, frame }) => {
  const t = lin(lf, 12, 54);
  const cy = 250 + 410 * t * t;
  return (
    <g>
      <rect x={50} y={80} width={870} height={130} fill="#CFE6EE" />
      <rect x={50} y={210} width={870} height={624} fill="#8A6A48" />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M 50 ${270 + i * 80} Q 300 ${255 + i * 80} 500 ${272 + i * 80} T 920 ${262 + i * 80}`} fill="none" stroke="rgba(59,38,20,0.35)" strokeWidth={4} />
      ))}
      <rect x={50} y={200} width={870} height={14} fill="#6E9A4C" />
      <rect x={272} y={130} width={170} height={74} fill="#E6E2D8" stroke={INK.line} strokeWidth={4} />
      <rect x={294} y={150} width={36} height={30} fill="#9CC3D5" stroke={INK.line} strokeWidth={3} />
      <rect x={384} y={150} width={36} height={30} fill="#9CC3D5" stroke={INK.line} strokeWidth={3} />
      {/* Giếng bê tông + ống thép hút khí */}
      <rect x={292} y={210} width={130} height={560} fill="#B7B2A8" stroke={INK.line} strokeWidth={4} />
      <rect x={312} y={214} width={90} height={540} fill="#2F3940" stroke={INK.line} strokeWidth={3} />
      <rect x={318} y={700} width={78} height={50} fill="#C9A45C" stroke={INK.line} strokeWidth={3} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={326 + (i % 6) * 12} cy={714 + Math.floor(i / 6) * 14} r={5} fill="#E8D4A0" />
      ))}
      <g transform={`translate(357 ${cy})`}>
        <rect x={-30} y={-34} width={60} height={68} rx={8} fill="#F07B2A" stroke={INK.line} strokeWidth={4} />
        <rect x={-20} y={-22} width={40} height={24} rx={4} fill="#FFFDF5" stroke={INK.line} strokeWidth={2.5} />
        <circle cx={wave(frame, 0.13, 8)} cy={-10 + wave(frame, 0.1, 4)} r={5} fill={INK.blue} />
      </g>
      {/* Thước 132 m */}
      <line x1={250} y1={214} x2={250} y2={760} stroke={CREAM} strokeWidth={5} />
      <line x1={236} y1={214} x2={264} y2={214} stroke={CREAM} strokeWidth={5} />
      <line x1={236} y1={760} x2={264} y2={760} stroke={CREAM} strokeWidth={5} />
      <rect x={96} y={450} width={136} height={70} rx={12} fill={CREAM} stroke={INK.line} strokeWidth={4} />
      <text x={164} y={500} textAnchor="middle" fill={INK.line} fontSize={44} {...T}>
        132 m
      </text>
    </g>
  );
};

const Realworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const restY = DESK_Y - 23;
  // Câu 1: thả riêng.
  const bt = lin(lf, 10, 18);
  const bookY0 = li === 0 ? 260 + (restY - 260) * bt * bt : restY;
  const pt = Math.max(0, lf - 10);
  const paperY0 = Math.min(DESK_Y - 3, 260 + pt * 1.6);
  const paperX0 = 470 + Math.sin(pt * 0.08) * 60;
  // Câu 2: giấy nằm trên sách, thả quay chậm.
  const st = lin(lf, 26, 36);
  const sy = 260 + (restY - 260) * st * st;
  const slide = ease(lf, 2, 18);
  const landed2 = li === 1 && lf >= 62;
  const tower = li === 2 ? ease(lf, 0, 16) : 0;
  const cards: [string, string, boolean][] = [
    ["THẢ RIÊNG", "Sách xuống trước · giấy lượn lờ", false],
    ["ĐẶT GIẤY NẰM TRÊN SÁCH", "Sách rẽ gió → chạm bàn cùng lúc!", true],
    ["THÁP RƠI NASA GLENN", "132 m · 5,18 giây gần như không trọng lượng", true],
  ];
  const [title, formula, ok] = cards[Math.min(li, 2)];
  const pose: PoseState =
    li === 0
      ? { pose: "point" }
      : li === 1
        ? landed2
          ? { pose: "eureka", prevPose: "point", poseT: ease(lf, 62, 12) }
          : { pose: "point" }
        : { pose: "point", prevPose: "eureka", poseT: ease(lf, 0, 14) };
  return (
    <g>
      <g clipPath="url(#e02-stage)">
        {li <= 1 ? (
          <>
            <Room />
            <line x1={110} y1={232} x2={620} y2={232} stroke={INK.soft} strokeWidth={4} strokeDasharray="12 10" />
            {li === 0 ? (
              <>
                <Book x={250} y={bookY0} />
                <Dust x={250} y={DESK_Y} p={ease(lf, 28, 20)} color="#E6D3AE" />
                <Bubble x={250} y={500} text="BỘP!" p={pop(lf, fps, 28) * (1 - ease(lf, 80, 12))} size={42} />
                <Paper x={paperX0} y={paperY0} r={paperY0 >= DESK_Y - 4 ? 0 : Math.sin(pt * 0.08 + 1.3) * 26} bend={Math.sin(pt * 0.16)} />
                <Cross x={470} y={170} p={pop(lf, fps, 46)} r={34} />
              </>
            ) : (
              <>
                <Fade p={ease(lf, 22, 6) * (1 - ease(lf, 64, 10))}>
                  <rect x={84} y={112} width={262} height={60} rx={14} fill="rgba(59,38,20,0.85)" />
                  <text x={215} y={154} textAnchor="middle" fill={CREAM} fontSize={34} {...T}>
                    ▶ QUAY CHẬM
                  </text>
                </Fade>
                {/* Luồng gió nét chì bị cuốn sách rẽ sang hai bên */}
                {st > 0.05 && st < 1
                  ? [-1, 1].map((d) =>
                      [0, 1].map((j) => (
                        <path
                          key={`${d}-${j}`}
                          d={`M ${360 + d * (10 + j * 22)} ${sy + 130 + j * 20} Q ${360 + d * (20 + j * 22)} ${sy + 40} ${360 + d * (90 + j * 26)} ${sy + 6} Q ${360 + d * (110 + j * 26)} ${sy - 20} ${360 + d * (100 + j * 30)} ${sy - 70}`}
                          fill="none"
                          stroke="rgba(59,38,20,0.55)"
                          strokeWidth={3.5}
                          strokeDasharray="14 10"
                          strokeDashoffset={-frame * 3}
                        />
                      )),
                    )
                  : null}
                <Book x={360} y={sy} />
                <Paper x={360} y={sy - 27 - (1 - slide) * 70} r={(1 - slide) * 8} />
                <Dust x={360} y={DESK_Y} p={ease(lf, 62, 20)} color="#E6D3AE" />
                <Check x={360} y={470} p={pop(lf, fps, 64)} r={46} />
                <Bubble x={360} y={360} text="CÙNG LÚC!" p={pop(lf, fps, 60)} size={40} color={INK.green} />
              </>
            )}
          </>
        ) : null}
        {tower > 0.01 ? (
          <g opacity={tower}>
            <DropTower lf={lf} frame={frame} />
            <Pop p={pop(lf, fps, 6)} cx={558} cy={260}>
              <rect x={428} y={226} width={260} height={70} rx={14} fill={INK.blue} stroke={INK.line} strokeWidth={4} />
              <text x={558} y={274} textAnchor="middle" fill="#FFFFFF" fontSize={34} {...T}>
                NASA GLENN
              </text>
            </Pop>
            <Pop p={pop(lf, fps, 22)} cx={558} cy={420}>
              <line x1={428} y1={420} x2={404} y2={420} stroke={CREAM} strokeWidth={4} />
              <rect x={428} y={360} width={260} height={116} rx={14} fill={CREAM} stroke={INK.line} strokeWidth={4} />
              <text x={558} y={408} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                GẦN NHƯ
              </text>
              <text x={558} y={454} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                CHÂN KHÔNG
              </text>
            </Pop>
            <Pop p={pop(lf, fps, 10)} cx={558} cy={590}>
              <rect x={428} y={526} width={260} height={128} rx={14} fill="#16261C" stroke={INK.line} strokeWidth={4} />
              <text x={558} y={598} textAnchor="middle" fill="#7CFF8A" fontSize={62} {...T}>
                {countUp(lin(lf, 12, 54), 5.18, 2)}
              </text>
              <text x={558} y={640} textAnchor="middle" fill="#7CFF8A" fontSize={34} {...T}>
                GIÂY
              </text>
            </Pop>
          </g>
        ) : null}
        <Hero x={800} frame={frame} {...pose} />
      </g>
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6: trạm ISS cũng đang rơi tự do

const ISS: React.FC<{ x: number; y: number; s: number; r?: number }> = ({ x, y, s, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-6} width={300} height={12} fill="#C9CED2" stroke={INK.line} strokeWidth={3} />
    {[-130, -96, 96, 130].map((sx) => (
      <g key={sx}>
        <rect x={sx - 14} y={-90} width={28} height={78} fill="#C58B2A" stroke={INK.line} strokeWidth={3} />
        <rect x={sx - 14} y={12} width={28} height={78} fill="#C58B2A" stroke={INK.line} strokeWidth={3} />
        <line x1={sx} y1={-90} x2={sx} y2={90} stroke="#7A5418" strokeWidth={2} />
      </g>
    ))}
    <rect x={-50} y={-16} width={100} height={32} rx={12} fill="#EDEDED" stroke={INK.line} strokeWidth={3} />
    <rect x={-16} y={-46} width={32} height={92} rx={12} fill="#E2E2E2" stroke={INK.line} strokeWidth={3} />
    <rect x={-36} y={22} width={72} height={14} fill="#FFFFFF" stroke={INK.line} strokeWidth={2} />
  </g>
);

const EarthDisk: React.FC<{
  cx: number;
  cy: number;
  r: number;
  id: string;
}> = ({ cx, cy, r, id }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 16} fill="rgba(110,190,255,0.25)" />
    <circle cx={cx} cy={cy} r={r} fill="url(#e02-earth)" stroke="#BFE3FF" strokeWidth={4} />
    <clipPath id={id}>
      <circle cx={cx} cy={cy} r={r} />
    </clipPath>
    <g clipPath={`url(#${id})`} fill="#5CB46A" opacity={0.9}>
      <path
        d={`M ${cx - r * 0.7} ${cy - r * 0.5} q ${r * 0.3} ${-r * 0.2} ${r * 0.5} ${r * 0.1} q ${r * 0.1} ${r * 0.3} ${-r * 0.2} ${r * 0.4} q ${-r * 0.3} ${-r * 0.05} ${-r * 0.3} ${-r * 0.5} z`}
      />
      <path
        d={`M ${cx + r * 0.1} ${cy - r * 0.2} q ${r * 0.4} ${-r * 0.2} ${r * 0.6} ${r * 0.2} q ${-r * 0.1} ${r * 0.5} ${-r * 0.4} ${r * 0.5} q ${-r * 0.3} ${-r * 0.3} ${-r * 0.2} ${-r * 0.7} z`}
      />
      <ellipse cx={cx - r * 0.2} cy={cy + r * 0.6} rx={r * 0.25} ry={r * 0.12} />
    </g>
    <path d={`M ${cx - r * 0.6} ${cy - r * 0.75} q ${r * 0.4} ${-r * 0.2} ${r * 0.8} 0`} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={6} strokeLinecap="round" />
  </g>
);

const Cosmic: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const issX = li === 0 ? interpolate(ease(lf, 0, 60), [0, 1], [-60, 380]) + Math.max(0, lf - 60) * 0.25 : 0;
  const inside = li === 1 ? ease(lf, 0, 18) : 0;
  const ang = li === 2 ? -Math.PI / 2 + Math.max(0, lf - 64) * 0.012 : 0;
  const OC = { x: 300, y: 500 };
  const OR = 220;
  const issO = { x: OC.x + Math.cos(ang) * OR, y: OC.y + Math.sin(ang) * OR };
  const moon = li === 3 ? ease(lf, 0, 40) : 0;
  const zoom = 1.7 - moon * 0.7;
  const cards: [string, string][] = [
    ["TRẠM VŨ TRỤ QUỐC TẾ ISS", "Cũng đang rơi tự do!"],
    ["THEO NASA · Ở ĐỘ CAO CỦA TRẠM", "Trọng lực vẫn còn ≈ 90%"],
    lf < 64 ? ["LAO NGANG ≈ 28.000 km/h", "Rơi mãi mà hụt mặt đất cong"] : ["NGƯỜI VÀ ĐỒ RƠI CÙNG NHAU", "Nên trông như lơ lửng"],
    ["CÙNG MỘT QUY LUẬT", "Trạm ISS · búa · lông chim"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
  const floatPose: PoseState =
    li === 1 ? { pose: "scratch", prevPose: "point", poseT: ease(lf, 30, 14) } : li === 2 ? { pose: "present", prevPose: "scratch", poseT: ease(lf, 0, 14) } : { pose: "point" };
  return (
    <g>
      <g clipPath="url(#e02-stage)">
        {li !== 3 ? (
          <>
            <rect x={50} y={80} width={870} height={754} fill="url(#e02-space)" />
            <Stars frame={frame} />
          </>
        ) : null}
        {li === 0 ? (
          <>
            <EarthDisk cx={420} cy={1260} r={620} id="e02-earth-big" />
            <g transform={`translate(0 ${wave(frame, 0.05, 6)})`}>
              <ISS x={issX} y={330} s={0.8} r={-6} />
            </g>
            <Pop p={pop(lf, fps, 44)} cx={issX} cy={200}>
              <rect x={issX - 70} y={170} width={140} height={58} rx={14} fill={CREAM} stroke={INK.line} strokeWidth={4} />
              <text x={issX} y={212} textAnchor="middle" fill={INK.line} fontSize={40} {...T}>
                ISS
              </text>
            </Pop>
            <Pop p={pop(lf, fps, 56)} cx={issX} cy={470}>
              <Arrow x1={issX} y1={420} x2={issX} y2={530} color="#FFE27A" w={8} head={22} />
              <text x={issX + 30} y={500} fill="#FFE27A" fontSize={36} {...T}>
                ĐANG RƠI
              </text>
            </Pop>
          </>
        ) : null}
        {li === 1 ? (
          <g opacity={inside}>
            {/* Bên trong trạm: vách mô-đun, tay vịn, cửa sổ nhìn xuống Trái Đất */}
            <rect x={50} y={80} width={870} height={754} fill="#D8DCE0" />
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={`t${i}`} x={70 + i * 140} y={110} width={124} height={130} rx={10} fill="#E9ECEF" stroke="#9AA3A8" strokeWidth={3} />
            ))}
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={`b${i}`} x={70 + i * 140} y={720} width={124} height={110} rx={10} fill="#E9ECEF" stroke="#9AA3A8" strokeWidth={3} />
            ))}
            <rect x={60} y={250} width={850} height={14} rx={7} fill="#F2BE4A" stroke={INK.line} strokeWidth={2} />
            <circle cx={290} cy={450} r={136} fill="#0B0E18" stroke="#7E8A90" strokeWidth={18} />
            <clipPath id="e02-port">
              <circle cx={290} cy={450} r={128} />
            </clipPath>
            <g clipPath="url(#e02-port)">
              <Stars frame={frame} />
              <EarthDisk cx={290} cy={760} r={300} id="e02-earth-port" />
            </g>
            <circle cx={290} cy={450} r={136} fill="none" stroke={INK.line} strokeWidth={4} />
            <Pop p={pop(lf, fps, 12)} cx={290} cy={640}>
              <rect x={110} y={606} width={360} height={70} rx={14} fill={CREAM} stroke={INK.line} strokeWidth={4} />
              <text x={290} y={654} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                TRỌNG LỰC ≈ 90%
              </text>
            </Pop>
            <Pop p={pop(lf, fps, 40)} cx={520} cy={300}>
              <text x={520} y={370 + wave(frame, 0.12, 8)} textAnchor="middle" fill={INK.red} fontSize={170} {...T} transform={`rotate(${wave(frame, 0.08, 6)} 520 300)`}>
                ?
              </text>
            </Pop>
          </g>
        ) : null}
        {li === 2 ? (
          <>
            <EarthDisk cx={OC.x} cy={OC.y} r={120} id="e02-earth-orbit" />
            <DrawPath
              p={ease(lf, 30, 30)}
              length={2 * Math.PI * OR}
              d={`M ${OC.x} ${OC.y - OR} A ${OR} ${OR} 0 1 1 ${OC.x - 0.1} ${OC.y - OR}`}
              fill="none"
              stroke="#FFE27A"
              strokeWidth={5}
              strokeDasharray="14 10"
            />
            <ISS x={issO.x} y={issO.y} s={0.32} r={(ang * 180) / Math.PI + 90} />
            {lf < 64 ? (
              <>
                <Arrow x1={OC.x + 30} y1={OC.y - OR} x2={OC.x + 210} y2={OC.y - OR} p={ease(lf, 4, 16)} color="#6AD7FF" w={8} head={22} />
                <Arrow x1={OC.x} y1={OC.y - OR + 30} x2={OC.x} y2={OC.y - OR + 96} p={ease(lf, 16, 14)} color="#FF8A7A" w={8} head={22} />
              </>
            ) : null}
            <Pop p={pop(lf, fps, 6)} cx={360} cy={180}>
              <rect x={150} y={146} width={420} height={68} rx={16} fill={CREAM} stroke={INK.line} strokeWidth={4} />
              <text x={360} y={194} textAnchor="middle" fill={INK.blue} fontSize={42} {...T}>
                ≈ 28.000 km/h
              </text>
            </Pop>
            {/* Búa và lông chim lơ lửng song song cạnh Milo */}
            <Pop p={pop(lf, fps, 50)} cx={650} cy={300}>
              <g transform={`translate(0 ${wave(frame, 0.05, 10)})`}>
                <Hammer x={640} y={236} s={OBJ} r={wave(frame, 0.03, 14) + 20} />
                <Feather x={720} y={226} s={OBJ} r={wave(frame, 0.03, 14, 1) + 24} />
              </g>
            </Pop>
          </>
        ) : null}
        {li === 3 ? (
          <g transform={`translate(400 720) scale(${zoom}) translate(-400 -720)`}>
            <MoonBg frame={frame} />
            <Hammer x={280} y={754} r={-90} s={OBJ} />
            <Feather x={480} y={760} r={-88} s={OBJ} />
            <clipPath id="e02-handwrite">
              <rect x={120} y={600} width={600 * ease(lf, 24, 34)} height={110} />
            </clipPath>
            <g clipPath="url(#e02-handwrite)">
              <text x={400} y={676} textAnchor="middle" fill={MOON_TXT} fontSize={62} {...T} fontStyle="italic">
                CÙNG MỘT LÚC
              </text>
              <path d="M 170 700 Q 400 716 630 696" fill="none" stroke={MOON_TXT} strokeWidth={5} strokeLinecap="round" />
            </g>
          </g>
        ) : null}
        {li === 3 ? (
          <Hero x={790} frame={frame} gear="astro" {...poseAt(lf, 30, "point", "present")} />
        ) : (
          <Hero x={li === 1 ? 700 : 790} y={li === 1 ? 720 : GROUND} frame={frame} gear="astro" float={1} {...floatPose} />
        )}
      </g>
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, li === 2 && lf >= 64 ? 64 : 4)} />
    </g>
  );
};

const EP02: Record<string, React.FC<Anim>> = {
  hook: Hook,
  barrier: Barrier,
  eureka: Eureka,
  theorem: Theorem,
  realworld: Realworld,
  cosmic: Cosmic,
};

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

export const Ep02Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP02[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient / pattern riêng của tập (id đặt tiền tố "e02-"), được đặt vào <defs> của khung cảnh. */
export const Ep02Defs: React.FC = () => (
  <>
    <clipPath id="e02-stage">
      <rect x={40} y={80} width={890} height={754} />
    </clipPath>
    <linearGradient id="e02-space" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#05060C" />
      <stop offset="100%" stopColor="#1B1F2E" />
    </linearGradient>
    <linearGradient id="e02-dust" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#8E8E95" />
      <stop offset="100%" stopColor="#B4B4BA" />
    </linearGradient>
    <linearGradient id="e02-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#A9D8EE" />
      <stop offset="100%" stopColor="#F4EBD2" />
    </linearGradient>
    <linearGradient id="e02-dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F2C98A" />
      <stop offset="100%" stopColor="#F6E8C8" />
    </linearGradient>
    <radialGradient id="e02-sepia" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stopColor="#F4E2BC" />
      <stop offset="100%" stopColor="#D2B07A" />
    </radialGradient>
    <linearGradient id="e02-glass" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="rgba(200,235,250,0.55)" />
      <stop offset="50%" stopColor="rgba(235,250,255,0.25)" />
      <stop offset="100%" stopColor="rgba(160,210,235,0.55)" />
    </linearGradient>
    <radialGradient id="e02-visor" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
      <stop offset="80%" stopColor="rgba(170,215,245,0.22)" />
      <stop offset="100%" stopColor="rgba(150,200,240,0.45)" />
    </radialGradient>
    <radialGradient id="e02-earth" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#6FB8F0" />
      <stop offset="100%" stopColor="#1E4E8C" />
    </radialGradient>
  </>
);
