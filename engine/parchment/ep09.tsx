/**
 * Tập 9 "Nếu bị bắn mà lặn xuống nước thì có an toàn không?": cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc
 * (`li`, `lf`), bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-3.ts.
 * Chỉ vẽ viên đạn, nước và đồ vật; không vẽ súng, không vẽ người bị bắn.
 * Toạ độ gốc sân khấu: x 60..910, y 93..835 (mặt đất y = 780).
 * Bể nước cắt ngang: mặt nước y 230, 1 m = 220 px (90 cm → y 428, 2,4 m → y 758).
 */
import React from "react";
import { DrawLine, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Chalkboard, Check, Cross, GROUND, linePose, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

const SURF = 230;
const PX_M = 220;
const dY = (m: number) => SURF + m * PX_M;
const CREAM = "#FFF6DD";
const FOAM = "#E6F6FD";
const GLOW = "#FFE27A";
const MILO_X = 800;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

// ---------------------------------------------------------------- mảnh ghép dùng chung

/** Chữ có viền kem, bật ra theo p. */
const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; p?: number; rot?: number; anchor?: "start" | "middle" | "end" }> = ({
  x,
  y,
  text,
  size = 46,
  color = INK.line,
  p = 1,
  rot = 0,
  anchor = "middle",
}) => (
  <Pop p={p} cx={x} cy={y - size * 0.35}>
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fill={color}
      stroke={color === CREAM || color === GLOW || color === FOAM ? INK.line : CREAM}
      strokeWidth={size * 0.16}
      strokeLinejoin="round"
      paintOrder="stroke"
      transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
      {...T}
    >
      {text}
    </text>
  </Pop>
);

/** Nhãn dạng con dấu viền đỏ / xanh. */
const Stamp: React.FC<{ x: number; y: number; text: string; p: number; color?: string; size?: number; rot?: number }> = ({ x, y, text, p, color = INK.red, size = 52, rot = -6 }) => {
  const w = text.length * size * 0.62 + 60;
  return (
    <Pop p={p} cx={x} cy={y}>
      <g transform={`rotate(${rot} ${x} ${y})`}>
        <rect x={x - w / 2} y={y - size * 0.95} width={w} height={size * 1.6} rx={size * 0.8} fill={CREAM} stroke={color} strokeWidth={7} />
        <text x={x} y={y + size * 0.15} textAnchor="middle" fontSize={size} fill={color} {...T}>
          {text}
        </text>
      </g>
    </Pop>
  );
};

/** Viên đạn mũi hướng theo trục x. mush 0..1: mũi bẹp dần. */
const Bullet: React.FC<{ x: number; y: number; rot?: number; kind: "rifle" | "pistol"; s?: number; mush?: number }> = ({ x, y, rot = 0, kind, s = 1, mush = 0 }) => {
  const tip = kind === "rifle" ? 96 - 60 * mush : 44 - 22 * mush;
  const wide = 22 + 14 * mush;
  const body = kind === "rifle" ? -90 : -40;
  const shoulder = kind === "rifle" ? 20 : 4;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
      <path
        d={`M${body} -22 L${shoulder} -22 Q${tip - 20} ${-wide} ${tip} ${mush > 0.3 ? -wide * 0.6 : 0} ${mush > 0.3 ? `L${tip} ${wide * 0.6}` : ""} Q${tip - 20} ${wide} ${shoulder} 22 L${body} 22 Z`}
        fill="url(#e09-brass)"
      />
      <line x1={body + (kind === "rifle" ? 30 : 22)} y1={-22} x2={body + (kind === "rifle" ? 30 : 22)} y2={22} />
    </g>
  );
};

/** Mảnh đạn văng ra quanh (cx, cy), k 0..1. */
const Shards: React.FC<{ cx: number; cy: number; k: number; spread?: number; t: number }> = ({ cx, cy, k, spread = 1, t }) => (
  <g>
    {[
      [-1, -0.5],
      [-0.7, 0.4],
      [-0.3, 0.95],
      [0.15, 1],
      [0.55, 0.75],
      [0.95, 0.15],
      [0.75, -0.55],
      [-0.15, -0.9],
    ].map(([dx, dy], i) => (
      <path
        key={i}
        d="M0 -11 L13 -3 L6 11 L-10 6 Z"
        transform={`translate(${cx + dx * 120 * k * spread} ${cy + dy * 80 * k * spread + 40 * k * k}) rotate(${i * 47 + t * 5}) scale(${1.3 - (i % 3) * 0.25})`}
        fill="url(#e09-brass)"
        stroke={INK.line}
        strokeWidth={3.5}
      />
    ))}
    <circle cx={cx} cy={cy} r={30 + 90 * k} fill="none" stroke={FOAM} strokeWidth={6} opacity={1 - k} />
  </g>
);

/** Vệt bọt khí sau đạn, từ (x0,y0) tới (x1,y1). */
const Trail: React.FC<{ x0: number; y0: number; x1: number; y1: number; frame: number; n?: number }> = ({ x0, y0, x1, y1, frame, n = 9 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const p = i / n;
      return (
        <circle
          key={i}
          cx={x0 + (x1 - x0) * p + wave(frame, 0.2, 9, i * 1.7)}
          cy={y0 + (y1 - y0) * p - ((frame + i * 7) % 24)}
          r={4 + (i % 3) * 3}
          fill="none"
          stroke={FOAM}
          strokeWidth={3}
          opacity={0.3 + 0.5 * p}
        />
      );
    })}
  </g>
);

/** Bọt nước bắn tung toé quanh (x, y), bắt đầu từ khung t0 của câu. */
const Splash: React.FC<{ x: number; y?: number; t: number; t0: number; big?: number }> = ({ x, y = SURF, t, t0, big = 1 }) => {
  const p = clamp01((t - t0) / 22);
  if (t < t0 || p >= 1) return null;
  return (
    <g opacity={1 - p}>
      {[-1, 1].map((d) =>
        [0, 1, 2].map((i) => (
          <circle
            key={`${d}${i}`}
            cx={x + d * (14 + i * 20) * (0.4 + p * 1.3) * big}
            cy={y - (20 + 70 * 4 * p * (1 - p) * (1 - i * 0.2)) * big}
            r={(9 - i * 2) * big}
            fill={FOAM}
            stroke={INK.line}
            strokeWidth={2.5}
          />
        )),
      )}
      <ellipse cx={x} cy={y} rx={(24 + p * 90) * big} ry={(6 + p * 16) * big} fill="none" stroke={FOAM} strokeWidth={5} />
    </g>
  );
};

/** Bể nước cắt ngang có thước đo độ sâu. marks: các vạch (mét). */
const Tank: React.FC<{ x0?: number; x1?: number; frame: number; marks?: { m: number; label: string; o?: number; color?: string }[] }> = ({ x0 = 70, x1 = 640, frame, marks = [] }) => {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / 15;
    return `${x.toFixed(1)},${(SURF + wave(frame, 0.12, 5, x / 60)).toFixed(1)}`;
  }).join(" ");
  return (
    <g>
      <polygon points={`${x0},770 ${pts} ${x1},770`} fill="url(#e09-water)" />
      <polyline points={pts} fill="none" stroke={FOAM} strokeWidth={6} />
      {[0.25, 0.55, 0.8].map((k, i) => {
        const x = x0 + (x1 - x0) * k;
        return <path key={k} d={`M${x} ${SURF} L${x + 50} ${SURF} L${x - 40} 760 L${x - 90} 760 Z`} fill="#FFFFFF" opacity={0.06 + 0.03 * Math.sin(frame / 20 + i)} />;
      })}
      <rect x={x0} y={758} width={x1 - x0} height={22} fill="#C9A86A" stroke={INK.line} strokeWidth={4} />
      <rect x={x0 - 14} y={SURF - 40} width={14} height={820 - SURF} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <rect x={x1} y={SURF - 40} width={14} height={820 - SURF} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      {/* Thước độ sâu */}
      <rect x={x0 + 8} y={SURF} width={22} height={758 - SURF} rx={5} fill={CREAM} stroke={INK.line} strokeWidth={3} />
      {Array.from({ length: 25 }, (_, i) => (
        <line key={i} x1={x0 + 8} y1={dY(i / 10)} x2={x0 + (i % 5 === 0 ? 30 : 20)} y2={dY(i / 10)} stroke={INK.line} strokeWidth={i % 5 === 0 ? 4 : 2} />
      ))}
      {marks.map(({ m, label, o = 1, color = GLOW }) => (
        <g key={label} opacity={o}>
          <line x1={x0 + 30} y1={dY(m)} x2={x1} y2={dY(m)} stroke={color} strokeWidth={5} strokeDasharray="18 12" />
          <text x={x0 + 40} y={dY(m) - 12} fontSize={40} fill={color} stroke={INK.line} strokeWidth={6} paintOrder="stroke" strokeLinejoin="round" {...T}>
            {label}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Milo đứng bên phải sân khấu. */
const Milo: React.FC<{ li: number; lf: number; poses: Parameters<typeof linePose>[2]; badge?: string; badgeP?: number; x?: number }> = ({ li, lf, poses, badge, badgeP, x = MILO_X }) => (
  <Stickman x={x} y={GROUND} scale={0.82} {...linePose(li, lf, poses)} badge={badge} badgeP={badgeP} />
);

/** Đạn súng trường lao thẳng xuống, bị hãm rồi vỡ vụn trước mốc `stopM` (mét). */
const RifleDive: React.FC<{ x: number; lf: number; frame: number; stopM?: number; breakAt?: number }> = ({ x, lf, frame, stopM = 0.82, breakAt = 40 }) => {
  const y = lf < 8 ? 110 + (SURF - 110) * (lf / 8) : SURF + (dY(stopM) - SURF) * ease(lf, 8, breakAt - 8);
  return (
    <g>
      <Splash x={x} t={lf} t0={8} />
      {lf >= 8 && lf < breakAt + 6 ? <Trail x0={x} y0={SURF + 16} x1={x} y1={y - 70} frame={frame} /> : null}
      {lf < breakAt ? (
        <Bullet x={x} y={y} rot={90 + (lf > 22 ? wave(lf, 0.6, 7) : 0)} kind="rifle" s={0.85} mush={clamp01((lf - 26) / 12)} />
      ) : (
        <Shards cx={x} cy={y} k={ease(lf, breakAt, 28)} t={lf} />
      )}
    </g>
  );
};

/** Đạn súng ngắn len xuống tới mốc `toM` (mét) trong `dur` khung. */
const PistolDive: React.FC<{ x: number; lf: number; frame: number; toM?: number; dur?: number; delay?: number }> = ({ x, lf, frame, toM = 2.4, dur = 90, delay = 0 }) => {
  const p = ease(lf, delay, dur);
  const y = SURF - 20 + (dY(toM) - 30 - SURF + 20) * p;
  return (
    <g>
      <Splash x={x} t={lf} t0={delay} />
      {lf > delay + 2 ? <Trail x0={x} y0={SURF + 16} x1={x} y1={y - 50} frame={frame} n={12} /> : null}
      <Bullet x={x} y={y} rot={90 + wave(lf, 0.15, 6) * p} kind="pistol" s={0.85} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 1: bài toán
const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <rect x={40} y={80} width={900} height={200} fill="url(#e09-sky)" />
        <path d="M40 250 Q200 220 360 240 L360 290 L40 290 Z" fill="#7FA35A" stroke={INK.line} strokeWidth={4} />
        <Tank x0={40} x1={940} frame={frame} />
        {/* Cột bọt nước lớn: ai đó vừa nhảy ùm xuống */}
        {(() => {
          const p = ease(lf, 0, 26);
          return (
            <g opacity={1 - 0.6 * p}>
              <path d={`M560 ${SURF} Q540 ${SURF - 150 * (1 - p) - 20} 590 ${SURF - 190 * (1 - p) - 30} Q640 ${SURF - 150 * (1 - p) - 20} 620 ${SURF} Z`} fill={FOAM} stroke={INK.line} strokeWidth={4} />
              {Array.from({ length: 8 }, (_, i) => (
                <circle key={i} cx={560 + (i % 4) * 22} cy={SURF + 60 + i * 34 - ((frame * 2 + i * 13) % 40)} r={7 + (i % 3) * 3} fill="none" stroke={FOAM} strokeWidth={3} />
              ))}
            </g>
          );
        })()}
        {/* Vệt đạn lao xuống nước */}
        {[0, 1, 2].map((i) => {
          const t0 = 20 + i * 16;
          const p = ease(lf, t0, 8);
          const x2 = 260 + i * 140;
          return (
            <g key={i}>
              <DrawLine p={p} x1={x2 + 260} y1={100} x2={x2} y2={SURF} stroke={GLOW} strokeWidth={6} strokeLinecap="round" opacity={1 - ease(lf, t0 + 14, 12)} />
              <Splash x={x2} t={lf} t0={t0 + 8} big={0.7} />
            </g>
          );
        })}
        <Label x={480} y={190} text="NƯỚC CÓ CẢN ĐƯỢC ĐẠN?" size={50} color={INK.red} p={pop(lf, fps, 60)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Tank frame={frame} marks={[{ m: 1, label: "1 m", o: 0.8, color: CREAM }, { m: 2, label: "2 m", o: 0.8, color: CREAM }]} />
        <Stamp x={360} y={160} text="THÍ NGHIỆM · 2005" p={pop(lf, fps, 10)} color={INK.blue} rot={-4} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Pop p={pop(lf, fps, 6)} cx={260} cy={320}>
          <Bullet x={250} y={320} kind="rifle" s={1.9} rot={wave(frame, 0.06, 4)} />
        </Pop>
        <Label x={260} y={440} text="SÚNG TRƯỜNG" size={42} p={pop(lf, fps, 12)} />
        <Pop p={pop(lf, fps, 18)} cx={270} cy={560}>
          <Bullet x={270} y={560} kind="pistol" s={1.6} rot={wave(frame, 0.06, 4, 1)} />
        </Pop>
        <Label x={270} y={665} text="SÚNG NGẮN" size={42} p={pop(lf, fps, 24)} />
        <Label x={520} y={470 + wave(frame, 0.15, 8)} text="?" size={190} color={INK.red} p={pop(lf, fps, 34)} />
        <Milo li={0} lf={lf} poses={["scratch"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 2: đập bỏ cách nghĩ thông thường
const Barrier: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        {/* Bong bóng ý nghĩ: dao cắt bơ */}
        <Pop p={pop(lf, fps, 4)} cx={360} cy={380}>
          <ellipse cx={360} cy={380} rx={270} ry={190} fill={CREAM} stroke={INK.line} strokeWidth={5} />
          <circle cx={640} cy={560} r={26} fill={CREAM} stroke={INK.line} strokeWidth={4} />
          <circle cx={690} cy={630} r={14} fill={CREAM} stroke={INK.line} strokeWidth={4} />
          <rect x={220} y={420} width={240} height={100} rx={14} fill="#FFE08A" stroke={INK.line} strokeWidth={5} />
          <g transform={`translate(0 ${66 + 44 * ease(lf, 10, 40)})`}>
            <rect x={330} y={250} width={26} height={150} fill="#C7D0D6" stroke={INK.line} strokeWidth={4} />
            <rect x={322} y={210} width={42} height={52} rx={8} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
          </g>
          <Label x={360} y={170} text="NƯỚC MỀM OẶT?" size={44} color={INK.blue} />
        </Pop>
        <Cross x={560} y={300} r={60} p={pop(lf, fps, 70)} />
        <Milo li={0} lf={lf} poses={["think"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Tank frame={frame} marks={[{ m: 0.9, label: "90 cm" }]} />
        <RifleDive x={380} lf={lf} frame={frame} />
        <Stamp x={380} y={620} text="VỠ VỤN!" p={pop(lf, fps, 46)} />
        <Label x={380} y={150} text="ĐẠN SÚNG TRƯỜNG" size={46} color={INK.line} p={pop(lf, fps, 2)} />
        <Milo li={0} lf={lf} poses={["eureka"]} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Tank frame={frame} marks={[{ m: 0.9, label: "90 cm", o: 0.5, color: CREAM }, { m: 2.4, label: "2,4 m", o: ease(lf, 70, 12) }]} />
        <PistolDive x={420} lf={lf} frame={frame} />
        <Label x={380} y={150} text="ĐẠN SÚNG NGẮN" size={44} p={pop(lf, fps, 2)} />
        <g>
          <Stamp x={360} y={520} text="SÚNG MẠNH = SÂU" p={pop(lf, fps, 100)} color={INK.line} rot={-3} size={40} />
          <Cross x={560} y={500} r={46} p={pop(lf, fps, 112)} bare />
        </g>
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 3: eureka
const Eureka: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Tank x0={70} x1={900} frame={frame} />
        {/* Cầu nhảy */}
        <rect x={70} y={120} width={30} height={110} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
        <rect x={70} y={110} width={220} height={18} rx={6} fill="#E8E2D2" stroke={INK.line} strokeWidth={4} />
        {/* Người nhảy úp bụng: thân nằm ngang rơi xuống, chạm nước lúc khung 30 */}
        {(() => {
          const p = ease(lf, 6, 24);
          const x = 260 + 220 * p;
          const y = 60 + (SURF - 60 - 20) * p * p + (lf > 30 ? 30 * ease(lf, 30, 20) : 0);
          return (
            <g transform={`translate(${x} ${y}) rotate(${-10 + 10 * p})`} stroke={INK.line} strokeWidth={4}>
              <rect x={-60} y={-14} width={120} height={28} rx={14} fill="#5B8BD1" />
              <circle cx={78} cy={-2} r={20} fill="#F2C9A0" />
              <line x1={-60} y1={-6} x2={-110} y2={-20} strokeWidth={9} stroke="#F2C9A0" />
              <line x1={-60} y1={6} x2={-110} y2={14} strokeWidth={9} stroke="#F2C9A0" />
              <line x1={30} y1={10} x2={60} y2={34} strokeWidth={9} stroke="#F2C9A0" />
            </g>
          );
        })()}
        <Splash x={480} t={lf} t0={30} big={1.6} />
        <Stamp x={560} y={190} text="BỐP!" p={pop(lf, fps, 30)} rot={8} size={64} />
        <Label x={480} y={520} text="NHẢY CÀNG CAO" size={46} color={CREAM} p={pop(lf, fps, 60)} />
        <Label x={480} y={590} text="NƯỚC ĐÁNH CÀNG ĐAU" size={46} color={GLOW} p={pop(lf, fps, 70)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        {/* Cận cảnh: viên đạn lao vào bức tường nước */}
        <rect x={500} y={90} width={440} height={760} fill="url(#e09-water)" />
        <path d={`M500 90 ${Array.from({ length: 12 }, (_, i) => `L${500 + wave(frame, 0.2, 8, i)} ${90 + i * 64}`).join(" ")}`} fill="none" stroke={FOAM} strokeWidth={6} />
        {(() => {
          const x = 120 + 330 * ease(lf, 0, 26) + 30 * ease(lf, 26, 30);
          const mush = clamp01((lf - 24) / 26);
          return lf < 60 ? (
            <g>
              {[0, 1, 2].map((i) => (
                <line key={i} x1={x - 200 - i * 40} y1={420 + (i - 1) * 40} x2={x - 120} y2={420 + (i - 1) * 40} stroke={INK.soft} strokeWidth={5} strokeLinecap="round" opacity={1 - ease(lf, 24, 10)} />
              ))}
              <Bullet x={x} y={420} kind="rifle" s={2} mush={mush} />
              {lf > 24 ? <Splash x={520} y={420} t={lf} t0={24} big={1.4} /> : null}
            </g>
          ) : (
            <Shards cx={560} cy={420} k={ease(lf, 60, 30)} spread={1.6} t={lf} />
          );
        })()}
        <Label x={290} y={220} text="BẸP ĐẦU…" size={50} color={INK.red} p={pop(lf, fps, 34)} />
        <Label x={290} y={680} text="…RỒI VỠ TAN" size={50} color={INK.red} p={pop(lf, fps, 62)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Tank frame={frame} marks={[{ m: 0.9, label: "90 cm" }]} />
        {/* Mảnh vỡ bị nước hãm lại, chìm dần rồi dừng trên vạch 90 cm */}
        {[
          [-1, 0.2],
          [-0.6, 0.55],
          [-0.2, 0.35],
          [0.25, 0.7],
          [0.6, 0.3],
          [0.95, 0.6],
          [0.1, 0.9],
        ].map(([dx, dy], i) => {
          const k = ease(lf, i * 3, 40);
          const x = 380 + dx * 110 * k;
          const y = dY(0.35) + (dY(0.8) - dY(0.35)) * dy * k;
          return (
            <g key={i}>
              <line x1={380} y1={dY(0.35)} x2={x} y2={y} stroke={FOAM} strokeWidth={3} strokeDasharray="6 8" opacity={0.6 * (1 - ease(lf, 40, 20))} />
              <path d="M0 -11 L13 -3 L6 11 L-10 6 Z" transform={`translate(${x} ${y}) rotate(${i * 47 + k * 120}) scale(${1.3 - (i % 3) * 0.2})`} fill="url(#e09-brass)" stroke={INK.line} strokeWidth={3.5} />
            </g>
          );
        })}
        <Stamp x={380} y={640} text="MẢNH VỠ DỪNG NGAY" p={pop(lf, fps, 46)} size={40} />
        <Label x={380} y={150} text="CHƯA TỚI 1 MÉT" size={48} color={INK.red} p={pop(lf, fps, 60)} />
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        <Tank frame={frame} marks={[{ m: 0.9, label: "90 cm", o: 0.5, color: CREAM }, { m: 2.4, label: "2,4 m", o: ease(lf, 60, 12) }]} />
        <PistolDive x={400} lf={lf} frame={frame} dur={80} />
        <Label x={380} y={150} text="CHẬM MÀ CHẮC" size={52} color={INK.green} p={pop(lf, fps, 50)} />
        <Milo li={0} lf={lf} poses={["eureka"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 4: SGK, lực cản của chất lưu
/** Mũi tên lực nằm ngang từ (x, y), dài len (âm = sang trái). */
const Arrow: React.FC<{ x: number; y: number; len: number; color?: string; p?: number }> = ({ x, y, len, color = INK.red, p = 1 }) => {
  const L = len * p;
  if (Math.abs(L) < 4) return null;
  const d = Math.sign(L);
  return (
    <g stroke={color} fill={color} strokeLinejoin="round">
      <line x1={x} y1={y} x2={x + L - d * 26} y2={y} strokeWidth={14} strokeLinecap="round" />
      <path d={`M${x + L} ${y} L${x + L - d * 40} ${y - 24} L${x + L - d * 40} ${y + 24} Z`} strokeWidth={3} />
    </g>
  );
};

const Theorem: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Chalkboard x={90} y={130} w={560} h={300} open={ease(lf, 0, 16)} />
        <Fade p={ease(lf, 14, 12)}>
          <text x={370} y={210} textAnchor="middle" fontSize={40} fill={CREAM} {...T}>
            VẬT LÍ 10 · BÀI 19
          </text>
          <text x={370} y={290} textAnchor="middle" fontSize={50} fill={GLOW} {...T}>
            LỰC CẢN CỦA
          </text>
          <text x={370} y={350} textAnchor="middle" fontSize={50} fill={GLOW} {...T}>
            CHẤT LƯU
          </text>
        </Fade>
        <rect x={60} y={480} width={620} height={240} rx={18} fill="url(#e09-water)" stroke={INK.line} strokeWidth={4} />
        <Bullet x={260 + wave(frame, 0.08, 10)} y={600} kind="rifle" s={1.1} />
        <Arrow x={400} y={600} len={-260} p={ease(lf, 30, 20)} />
        <Label x={250} y={690} text="CẢN NGƯỢC CHIỀU" size={38} color={INK.red} p={pop(lf, fps, 46)} />
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Label x={480} y={150} text="PHỤ THUỘC HÌNH DẠNG & TỐC ĐỘ" size={40} color={INK.blue} p={pop(lf, fps, 2)} />
        <rect x={60} y={200} width={850} height={250} rx={18} fill="url(#e09-water)" stroke={INK.line} strokeWidth={4} />
        <rect x={60} y={490} width={850} height={250} rx={18} fill="url(#e09-water)" stroke={INK.line} strokeWidth={4} />
        <Bullet x={320 + wave(frame, 0.05, 6)} y={325} kind="pistol" s={1.2} />
        <Arrow x={300} y={325} len={-110} p={ease(lf, 20, 16)} color={INK.green} />
        <Label x={680} y={345} text="CHẬM → CẢN NHỎ" size={42} color={CREAM} p={pop(lf, fps, 30)} />
        {[0, 1, 2].map((i) => (
          <line key={i} x1={180 + i * 30} y1={600 + (i - 1) * 30} x2={260 + i * 30} y2={600 + (i - 1) * 30} stroke={FOAM} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
        ))}
        <Bullet x={420 + wave(frame, 0.2, 10)} y={615} kind="rifle" s={1.2} />
        <Arrow x={300} y={615} len={-230} p={ease(lf, 60, 20)} />
        <Label x={680} y={635} text="NHANH → CẢN LỚN" size={42} color={GLOW} p={pop(lf, fps, 70)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <rect x={60} y={150} width={850} height={480} rx={18} fill="url(#e09-water)" stroke={INK.line} strokeWidth={4} />
        {/* Dòng nước trôi qua */}
        {Array.from({ length: 6 }, (_, i) => {
          const y = 200 + i * 75;
          const off = (frame * 6 + i * 50) % 120;
          return <line key={i} x1={80} y1={y} x2={890} y2={y} stroke={FOAM} strokeWidth={4} strokeDasharray="60 60" strokeDashoffset={off} opacity={0.5} />;
        })}
        {/* Tàu ngầm đầu thon */}
        <g transform={`translate(0 ${wave(frame, 0.08, 4)})`}>
          <path d="M150 300 Q180 250 300 250 L470 250 Q600 255 640 300 Q600 345 470 350 L300 350 Q180 350 150 300 Z" fill="#E2B33C" stroke={INK.line} strokeWidth={5} />
          <rect x={330} y={210} width={70} height={44} rx={8} fill="#E2B33C" stroke={INK.line} strokeWidth={5} />
          {[360, 430, 500].map((x) => (
            <circle key={x} cx={x} cy={300} r={14} fill="#BFE6FA" stroke={INK.line} strokeWidth={4} />
          ))}
        </g>
        <Check x={740} y={300} r={44} p={pop(lf, fps, 24)} />
        {/* Khối vuông vấp nước */}
        <rect x={300} y={440} width={170} height={130} rx={6} fill="#A8A29A" stroke={INK.line} strokeWidth={5} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${480 + i * 40} ${470 + i * 30} q30 -30 50 0 q-20 30 -50 10`} fill="none" stroke={FOAM} strokeWidth={4} transform={`rotate(${frame * 4 + i * 90} ${505 + i * 40} ${470 + i * 30})`} />
        ))}
        <Cross x={740} y={505} r={40} p={pop(lf, fps, 40)} />
        <Stamp x={485} y={720} text="LAO CÀNG NHANH → CẢN CÀNG MẠNH" p={pop(lf, fps, 80)} color={INK.blue} size={34} rot={-2} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 5: biến thể ngoài đời
const SKIP_SURF = 520;
/** Quỹ đạo nảy thia lia: chạm nước ở x 400 (góc A độ), nảy cao 90 tới x 700, nảy thấp 50 tới x 900, rồi bay xa. */
const skipY = (x: number, A: number) => {
  const tan = Math.tan((A * Math.PI) / 180);
  if (x < 400) return SKIP_SURF - (400 - x) * tan;
  if (x < 700) {
    const u = (x - 400) / 300;
    return SKIP_SURF - 4 * 90 * u * (1 - u);
  }
  const u = (x - 700) / 260;
  return SKIP_SURF - 4 * 50 * u * (1 - u);
};

const Realworld: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Tank frame={frame} marks={[{ m: 0.9, label: "90 cm · súng trường" }, { m: 2.4, label: "2,4 m · súng ngắn", o: ease(lf, 10, 12) }]} />
        <rect x={100} y={dY(2.4) + 3} width={540} height={dY(2.5) - dY(2.4) + 8} fill={INK.green} opacity={0.45 * ease(lf, 30, 12)} />
        <Label x={380} y={150} text="CÓ, NHƯNG PHẢI ĐỦ SÂU" size={46} color={INK.green} p={pop(lf, fps, 4)} />
        {/* Đạn bắn chéo đi đường dài hơn trong nước */}
        <g opacity={ease(lf, 70, 14)}>
          <line x1={250} y1={SURF} x2={250} y2={dY(1.2)} stroke={GLOW} strokeWidth={6} strokeDasharray="14 10" />
          <line x1={250} y1={SURF} x2={560} y2={dY(1.2)} stroke={INK.red} strokeWidth={7} strokeDasharray="14 10" />
          <Label x={470} y={dY(0.4)} text="BẮN CHÉO: ĐƯỜNG DÀI HƠN" size={30} color={GLOW} />
        </g>
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <rect x={40} y={80} width={900} height={SKIP_SURF - 80} fill="url(#e09-sky)" />
        <rect x={40} y={SKIP_SURF} width={900} height={330} fill="url(#e09-water)" />
        <path d={`M40 ${SKIP_SURF} ${Array.from({ length: 18 }, (_, i) => `L${40 + i * 53} ${SKIP_SURF + wave(frame, 0.12, 4, i)}`).join(" ")}`} fill="none" stroke={FOAM} strokeWidth={5} />
        {(() => {
          const A = 8;
          const x = 0 + lf * 13;
          const xx = Math.min(x, 960);
          const y = skipY(xx, A);
          const rot = xx < 400 ? A : xx < 700 ? -16 * (1 - (2 * (xx - 400)) / 300) : -10 * (1 - (2 * (xx - 700)) / 260);
          return (
            <g>
              {Array.from({ length: 40 }, (_, i) => {
                const px = i * 24;
                return px < xx && px > 60 ? <circle key={i} cx={px} cy={skipY(px, A)} r={4} fill={INK.line} opacity={0.5} /> : null;
              })}
              <Splash x={400} y={SKIP_SURF} t={lf} t0={31} />
              <Splash x={700} y={SKIP_SURF} t={lf} t0={54} big={0.8} />
              {x < 980 ? <Bullet x={xx} y={y - 16} rot={rot} kind="pistol" s={0.8} /> : null}
            </g>
          );
        })()}
        <g opacity={ease(lf, 34, 10)}>
          <line x1={140} y1={SKIP_SURF} x2={400} y2={SKIP_SURF} stroke={INK.red} strokeWidth={5} />
          <line x1={140} y1={SKIP_SURF - 260 * Math.tan((8 * Math.PI) / 180)} x2={400} y2={SKIP_SURF} stroke={INK.red} strokeWidth={5} strokeDasharray="14 10" />
          <path d={`M250 ${SKIP_SURF} A150 150 0 0 1 ${400 - 150 * Math.cos((8 * Math.PI) / 180)} ${SKIP_SURF - 150 * Math.sin((8 * Math.PI) / 180)}`} fill="none" stroke={INK.red} strokeWidth={6} />
          <Label x={230} y={SKIP_SURF + 80} text="DƯỚI 8°" size={52} color={GLOW} />
        </g>
        <Stamp x={520} y={250} text="NẢY THIA LIA!" p={pop(lf, fps, 60)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <rect x={40} y={80} width={900} height={SKIP_SURF - 80} fill="url(#e09-sky)" />
        <rect x={40} y={SKIP_SURF} width={900} height={330} fill="url(#e09-water)" />
        {/* Bờ bên kia */}
        <path d={`M700 ${SKIP_SURF + 4} Q760 430 940 420 L940 ${SKIP_SURF + 4} Z`} fill="#7FA35A" stroke={INK.line} strokeWidth={4} />
        <rect x={840} y={300} width={16} height={120} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
        <circle cx={848} cy={290} r={50} fill="#5E8C3A" stroke={INK.line} strokeWidth={4} />
        {(() => {
          const p = ease(lf, 0, 50);
          const x = 160 + 600 * p;
          const y = SKIP_SURF - 20 - 260 * 4 * p * (1 - p) * 0.5 - 60 * p;
          return (
            <g>
              <path d={`M160 ${SKIP_SURF - 20} Q460 ${SKIP_SURF - 220} 760 ${SKIP_SURF - 80}`} fill="none" stroke={INK.line} strokeWidth={4} strokeDasharray="12 12" opacity={0.5 * p} />
              <Bullet x={x} y={y} rot={-12 + 20 * p} kind="pistol" s={0.8} />
            </g>
          );
        })()}
        <Pop p={pop(lf, fps, 50)} cx={300} cy={220}>
          <path d="M300 120 L390 280 L210 280 Z" fill={GLOW} stroke={INK.red} strokeWidth={9} strokeLinejoin="round" />
          <text x={300} y={262} textAnchor="middle" fontSize={110} fill={INK.red} {...T}>
            !
          </text>
        </Pop>
        <Label x={480} y={760} text="KHÔNG PHẢI TRÒ ĐÙA" size={52} color={INK.red} p={pop(lf, fps, 70)} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 6: vũ trụ
const Space: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={40} y={80} width={900} height={780} fill="#121A30" />
    {Array.from({ length: 40 }, (_, i) => (
      <circle key={i} cx={60 + ((i * 137) % 860)} cy={100 + ((i * 71) % 520)} r={1.5 + (i % 3)} fill={CREAM} opacity={0.3 + 0.6 * Math.abs(Math.sin(frame * 0.06 + i))} />
    ))}
  </g>
);

/** Thiên thạch rực lửa lao từ phải trên xuống trái dưới; p 0..1 quãng đường. */
const Meteor: React.FC<{ p: number; frame: number; x0?: number; y0?: number; x1?: number; y1?: number; s?: number }> = ({ p, frame, x0 = 900, y0 = 100, x1 = 420, y1 = 420, s = 1 }) => {
  const x = x0 + (x1 - x0) * p;
  const y = y0 + (y1 - y0) * p;
  const a = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d={`M0 -26 L${-260 - wave(frame, 0.8, 20)} 0 L0 26 Z`} fill="url(#e09-fire)" opacity={0.9} />
      <circle r={30} fill="#7A6A5A" stroke={INK.line} strokeWidth={4} />
      <circle cx={-8} cy={-6} r={7} fill="#5E5246" />
      <circle cx={9} cy={8} r={5} fill="#5E5246" />
    </g>
  );
};

const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Space frame={frame} />
        <circle cx={480} cy={1060} r={560 + 30 * ease(lf, 0, 30)} fill="none" stroke="#7FD3F5" strokeWidth={40} opacity={0.35} />
        <circle cx={480} cy={1060} r={540} fill="#2F6FB5" stroke={INK.line} strokeWidth={5} />
        <path d="M120 760 Q300 600 520 660 Q700 700 860 620 L900 840 L100 840 Z" fill="#5E9A4A" opacity={0.9} />
        <Label x={480} y={300} text="KHÍ QUYỂN CŨNG LÀ CHẤT LƯU" size={44} color={GLOW} p={pop(lf, fps, 20)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Space frame={frame} />
        <rect x={40} y={620} width={900} height={240} fill="#3B4A6A" />
        <path d="M40 700 L160 660 L260 690 L380 640 L520 680 L660 650 L800 690 L940 660 L940 860 L40 860 Z" fill="#2A3550" />
        <Meteor p={ease(lf, 0, 70)} frame={frame} />
        <Label x={300} y={180} text="18 km/s" size={72} color={GLOW} p={pop(lf, fps, 40)} />
        <Label x={300} y={260} text="TO CỠ NGÔI NHÀ" size={42} color={CREAM} p={pop(lf, fps, 52)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Space frame={frame} />
        <rect x={40} y={760} width={900} height={100} fill="#2A3550" />
        {/* Thước độ cao */}
        <line x1={110} y1={760} x2={110} y2={140} stroke={CREAM} strokeWidth={5} />
        {[0, 10, 20, 30].map((km) => (
          <g key={km}>
            <line x1={96} y1={760 - km * 20} x2={124} y2={760 - km * 20} stroke={CREAM} strokeWidth={4} />
            <text x={140} y={772 - km * 20} fontSize={30} fill={CREAM} {...T}>
              {km} km
            </text>
          </g>
        ))}
        <line x1={110} y1={760 - 23 * 20} x2={900} y2={760 - 23 * 20} stroke={GLOW} strokeWidth={4} strokeDasharray="16 12" opacity={ease(lf, 20, 10)} />
        {lf < 30 ? (
          <Meteor p={ease(lf, 0, 30)} frame={frame} x0={900} y0={110} x1={560} y1={760 - 23 * 20} />
        ) : (
          <g>
            <circle cx={560} cy={300} r={40 + 160 * ease(lf, 30, 20)} fill="#FFE9A8" opacity={1 - ease(lf, 30, 40)} />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              const k = ease(lf, 30, 40);
              return <circle key={i} cx={560 + Math.cos(a) * 200 * k} cy={300 + Math.sin(a) * 140 * k + 120 * k * k} r={9 - (i % 3) * 2} fill="#7A6A5A" stroke={INK.line} strokeWidth={2.5} />;
            })}
          </g>
        )}
        <Stamp x={600} y={160} text="NỔ Ở 23 km" p={pop(lf, fps, 40)} size={50} />
        <Label x={560} y={700} text="CHƯA KỊP CHẠM ĐẤT" size={42} color={CREAM} p={pop(lf, fps, 70)} />
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        <rect x={40} y={80} width={450} height={600} fill="url(#e09-water)" />
        <g transform="translate(-60 0)">
          <Shards cx={330} cy={360} k={0.6 + 0.05 * Math.sin(frame / 10)} t={frame / 4} />
        </g>
        <rect x={490} y={80} width={450} height={600} fill="#121A30" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={510 + ((i * 97) % 410)} cy={110 + ((i * 53) % 540)} r={2 + (i % 2)} fill={CREAM} opacity={0.6} />
        ))}
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2 + frame * 0.01;
          return <circle key={i} cx={715 + Math.cos(a) * 110} cy={360 + Math.sin(a) * 80} r={8} fill="#7A6A5A" stroke={INK.line} strokeWidth={2.5} />;
        })}
        <circle cx={715} cy={360} r={46} fill="#FFE9A8" opacity={0.6 + 0.2 * Math.sin(frame / 6)} />
        <line x1={490} y1={80} x2={490} y2={680} stroke={INK.line} strokeWidth={6} />
        <Stamp x={480} y={760} text="LAO CÀNG NHANH, CÀNG BỊ CẢN DỮ" p={pop(lf, fps, 20)} color={INK.blue} size={36} rot={-2} />
      </g>
    ) : null}
  </g>
);

const EP09: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const Ep09Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP09[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient riêng của tập (id tiền tố "e09-"), đặt vào <defs> của khung cảnh. */
export const Ep09Defs: React.FC = () => (
  <>
    <linearGradient id="e09-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#4FB3E8" />
      <stop offset="0.5" stopColor="#1F6FB2" />
      <stop offset="1" stopColor="#0C2B4D" />
    </linearGradient>
    <linearGradient id="e09-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#9ED8F2" />
      <stop offset="1" stopColor="#E4F5FB" />
    </linearGradient>
    <linearGradient id="e09-brass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F6C978" />
      <stop offset="0.5" stopColor="#D08A35" />
      <stop offset="1" stopColor="#8E5520" />
    </linearGradient>
    <linearGradient id="e09-fire" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0" stopColor="#FFF3B0" />
      <stop offset="0.4" stopColor="#FFB347" />
      <stop offset="1" stopColor="#FF5E3A" stopOpacity="0" />
    </linearGradient>
  </>
);
