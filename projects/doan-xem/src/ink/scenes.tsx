/**
 * Cảnh mực cho từng câu (tên cảnh = scene.ink trong kịch bản). Vẽ trong khung 960×1000.
 * p: tiến độ câu 0..1 (kể cả quãng nghỉ sau câu), frame: khung tính từ đầu câu.
 * Cảnh nào kịch bản có ảnh AI (scene.image) mà file đã có thì player dùng ảnh thay cho cảnh này.
 */
import React from "react";
import { INK } from "../brand.ts";
import { Banner, Brush, Candle, clamp01, FakeColumn, Figure, H, InkDefs, Mountains, Roof, seg, Sword, W } from "./kit.tsx";

export type InkSceneProps = { id: string; p: number; frame: number; accent: string };

const Mist: React.FC<{ id: string; y: number; o?: number }> = ({ id, y, o = 0.8 }) => (
  <rect x={-100} y={y} width={W + 200} height={160} fill={INK.paper} opacity={o} filter={`url(#${id}-mist)`} />
);

const Ground: React.FC<{ id: string; y: number }> = ({ id, y }) => (
  <path d={`M-20,${y} Q${W * 0.3},${y - 14} ${W * 0.55},${y + 4} T${W + 20},${y - 6}`} stroke={INK.ink} strokeWidth={6} fill="none" opacity={0.7} filter={`url(#${id}-rough)`} />
);

/** Mực loang tròn rộng dần (dùng cho biến cố). */
const Bloom: React.FC<{ id: string; x: number; y: number; r: number; o?: number }> = ({ id, x, y, r, o = 0.5 }) => (
  <circle cx={x} cy={y} r={Math.max(0, r)} fill={INK.ink} opacity={o} filter={`url(#${id}-wash)`} />
);

const DinhThu: React.FC<InkSceneProps> = ({ id, p, frame }) => (
  <g>
    <Mountains id={id} baseY={560} layers={3} drift={frame / 30} />
    <Mist id={id} y={480} />
    <Roof id={id} x={300} y={520} w={420} tone={0.55} />
    <Roof id={id} x={640} y={590} w={520} />
    {/* ao sen phía trước */}
    <ellipse cx={480} cy={900} rx={380} ry={60} fill={INK.wash} opacity={0.35} filter={`url(#${id}-wash)`} />
    {[300, 420, 610, 700].map((x, i) => (
      <g key={x} opacity={seg(p, 0.1 + i * 0.1, 0.35 + i * 0.1)}>
        <ellipse cx={x} cy={890 + (i % 2) * 18} rx={36} ry={11} fill={INK.inkSoft} opacity={0.7} />
        <path d={`M${x + 6},${880 + (i % 2) * 18} q-8,-26 0,-44 q10,18 0,44 Z`} fill="#D98C8C" />
      </g>
    ))}
  </g>
);

const Guom: React.FC<InkSceneProps> = ({ id, p, accent }) => (
  <g>
    {/* đệm lụa */}
    <g filter={`url(#${id}-rough)`}>
      <path d="M150,640 Q480,560 810,640 Q830,700 800,740 Q480,800 160,740 Q130,700 150,640 Z" fill={INK.cinnabar} opacity={0.88} />
      <path d="M170,660 Q480,590 790,660" stroke="#E7B9A0" strokeWidth={5} fill="none" opacity={0.7} />
      {[160, 800].map((x) => (
        <path key={x} d={`M${x},720 q-6,60 4,110 M${x},720 q10,56 -2,104`} stroke={accent} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
    </g>
    <Sword id={id} x={480} y={630 - 20 * (1 - seg(p, 0, 0.3))} len={620} angle={-6} accent={accent} glint={seg(p, 0.35, 0.75)} opacity={seg(p, 0, 0.25)} />
  </g>
);

const HaiNgonNen: React.FC<InkSceneProps> = ({ id, p, frame }) => (
  <g>
    <rect x={120} y={780} width={720} height={26} rx={8} fill={INK.ink} opacity={0.85} filter={`url(#${id}-rough)`} />
    <Candle id={id} x={340} y={780} alive={1 - seg(p, 0.12, 0.3)} frame={frame} />
    <Candle id={id} x={620} y={780} h={230} alive={1 - seg(p, 0.6, 0.78)} frame={frame} />
    {/* bóng tối loang dần khi nến tắt */}
    <ellipse cx={480} cy={520} rx={560} ry={520} fill={`url(#${id}-dark)`} opacity={0.2 + 0.5 * seg(p, 0.6, 0.95)} />
  </g>
);

const QuanVo: React.FC<InkSceneProps> = ({ id, p, frame }) => (
  <g>
    <Mountains id={id} baseY={640} layers={3} tall={0.8} drift={frame / 40} />
    <Mist id={id} y={560} />
    {/* nửa đầu: lều thi với ngọn bút; nửa sau: cờ, ngọn giáo */}
    <g opacity={1 - seg(p, 0.42, 0.55)}>
      <path d="M260,820 L380,640 L500,820 Z" fill={INK.paperDeep} stroke={INK.ink} strokeWidth={6} filter={`url(#${id}-rough)`} />
      <Brush id={id} x={600} y={800} angle={20} s={0.8} />
    </g>
    <g opacity={seg(p, 0.48, 0.62)}>
      <Banner x={700} y={850} h={380} frame={frame} color={INK.cinnabar} />
      <Figure id={id} x={480} y={860} s={1.15} pose="back" hold="spear" />
    </g>
    <Ground id={id} y={866} />
  </g>
);

const CoTaySon: React.FC<InkSceneProps> = ({ id, p, frame }) => {
  const rise = seg(p, 0, 0.55);
  return (
    <g>
      <Roof id={id} x={480} y={420} w={560} tone={1 - seg(p, 0.45, 0.9) * 0.8} />
      <Bloom id={id} x={480} y={700} r={60 + 520 * seg(p, 0.3, 1)} o={0.35} />
      {[...Array(9)].map((_, i) => {
        const x = 70 + i * 105;
        const row = i % 2;
        return <Banner key={i} x={x} y={1000 + 260 * (1 - rise) + row * 40} h={330 - row * 60} frame={frame} color={row ? INK.ink : INK.cinnabar} phase={i} />;
      })}
    </g>
  );
};

const GioBui: React.FC<InkSceneProps> = ({ id, p, frame }) => (
  <g>
    <Mountains id={id} baseY={620} layers={2} tall={0.6} drift={frame / 25} />
    {[...Array(14)].map((_, i) => {
      const y = 280 + ((i * 53) % 560);
      const x = ((frame * (6 + (i % 4)) + i * 190) % (W + 400)) - 200;
      return <path key={i} d={`M${W - x},${y} q-80,-10 -200,6`} stroke={INK.wash} strokeWidth={4 + (i % 3) * 2} fill="none" opacity={0.5} strokeLinecap="round" />;
    })}
    <Figure id={id} x={220 + 420 * p} y={860} s={1} pose="hunch" step={frame / 26} />
    <Ground id={id} y={866} />
    {[...Array(18)].map((_, i) => (
      <circle key={i} cx={(i * 61 + frame * 3) % W} cy={840 - ((i * 29 + frame * 2) % 120)} r={3 + (i % 3)} fill={INK.wash} opacity={0.5} />
    ))}
  </g>
);

const NuiHong: React.FC<InkSceneProps> = ({ id, frame }) => (
  <g>
    <Mountains id={id} baseY={720} layers={4} tall={1.5} drift={frame / 40} />
    <Mist id={id} y={640} />
    <Figure id={id} x={560} y={900} s={0.7} pose="back" hold="bow" />
    <Ground id={id} y={904} />
  </g>
);

const GuomCung: React.FC<InkSceneProps> = ({ id, p, accent }) => (
  <g>
    <Sword id={id} x={480} y={560} len={600} angle={-35} accent={accent} opacity={seg(p, 0, 0.2)} />
    <g transform="translate(480,560) rotate(35)" opacity={seg(p, 0.15, 0.35)} filter={`url(#${id}-rough)`}>
      <path d="M-40,-300 Q120,0 -40,300" stroke={INK.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
      <line x1={-40} y1={-300} x2={-40} y2={300} stroke={INK.ink} strokeWidth={3} />
    </g>
    {/* dấu hỏi mực */}
    <g opacity={seg(p, 0.55, 0.75)} transform={`translate(780,260) scale(${0.8 + 0.2 * seg(p, 0.55, 0.75)})`} filter={`url(#${id}-rough)`}>
      <path d="M-40,-30 Q-40,-90 10,-90 Q60,-90 60,-40 Q60,0 10,20 L10,60" stroke={accent} strokeWidth={22} fill="none" strokeLinecap="round" />
      <circle cx={10} cy={110} r={14} fill={accent} />
    </g>
  </g>
);

const NhaTu: React.FC<InkSceneProps> = ({ id, p, frame }) => {
  const walk = seg(p, 0, 0.45);
  const shut = seg(p, 0.5, 0.75);
  const fx = 260 + 260 * walk;
  return (
    <g>
      <Mountains id={id} baseY={600} layers={2} tall={0.6} />
      {/* đường chấm về phía Nam (xuống dưới, sang phải) */}
      <path d="M140,500 Q420,560 640,760 T860,960" stroke={INK.cinnabar} strokeWidth={8} strokeDasharray="4 26" strokeLinecap="round" fill="none" opacity={0.85} />
      <Figure id={id} x={fx} y={860} s={0.95} pose="walk" step={walk * 4} />
      <g filter={`url(#${id}-rough)`}>
        {[...Array(7)].map((_, i) => (
          <line key={i} x1={fx - 150 + i * 50} y1={860 - 560 * shut} x2={fx - 150 + i * 50} y2={880} stroke={INK.ink} strokeWidth={14} opacity={shut} strokeLinecap="round" />
        ))}
        <line x1={fx - 170} y1={880 - 420 * shut} x2={fx + 170} y2={880 - 420 * shut} stroke={INK.ink} strokeWidth={18} opacity={shut} />
        <line x1={fx - 170} y1={880} x2={fx + 170} y2={880} stroke={INK.ink} strokeWidth={18} opacity={shut} />
      </g>
      <ellipse cx={480} cy={520} rx={560} ry={520} fill={`url(#${id}-dark)`} opacity={0.5 * seg(p, 0.6, 1) + 0.05 * Math.sin(frame / 8)} />
    </g>
  );
};

/** Cổng thành chung (không vẽ đúng một công trình cụ thể): đế đá ba cửa, lầu hai tầng mái. */
const Gate: React.FC<{ id: string; x: number; y: number; s?: number; tone?: number }> = ({ id, x, y, s = 1, tone = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={tone}>
    <g filter={`url(#${id}-rough)`}>
      <rect x={-320} y={-220} width={640} height={220} fill={INK.paperDeep} stroke={INK.ink} strokeWidth={6} />
      {[-200, 0, 200].map((cx) => (
        <path key={cx} d={`M${cx - 52},0 L${cx - 52},-110 Q${cx},-170 ${cx + 52},-110 L${cx + 52},0 Z`} fill={INK.ink} />
      ))}
      {[...Array(8)].map((_, i) => (
        <line key={i} x1={-320} y1={-190 + i * 26} x2={320} y2={-190 + i * 26} stroke={INK.stain} strokeWidth={2} />
      ))}
    </g>
    <Roof id={id} x={0} y={-430} w={560} />
    <Roof id={id} x={0} y={-560} w={380} />
  </g>
);

const KinhDo: React.FC<InkSceneProps> = ({ id, p, frame }) => (
  <g>
    <Mountains id={id} baseY={520} layers={2} tall={0.5} drift={frame / 50} />
    <Mist id={id} y={460} o={0.6} />
    <Gate id={id} x={480} y={820} s={0.95 + 0.05 * p} />
    {/* bậc thang và người bước lên */}
    {[...Array(4)].map((_, i) => (
      <rect key={i} x={300 - i * 40} y={820 + i * 30} width={360 + i * 80} height={30} fill={INK.paperDeep} stroke={INK.ink} strokeWidth={4} />
    ))}
    <Figure id={id} x={480} y={960 - 90 * seg(p, 0.1, 0.9)} s={0.55} pose="walk" step={p * 5} />
  </g>
);

const DiSu: React.FC<InkSceneProps> = ({ id, p, frame, accent }) => {
  const t = seg(p, 0.05, 0.85);
  // Sông uốn lên phía Bắc (lên trên); thuyền đi theo.
  const pt = (u: number) => ({ x: 200 + 520 * u + 140 * Math.sin(u * 5.2), y: 860 - 700 * u });
  const b = pt(t);
  const b2 = pt(Math.min(1, t + 0.02));
  const ang = (Math.atan2(b2.y - b.y, b2.x - b.x) * 180) / Math.PI;
  const path = Array.from({ length: 41 }, (_, i) => pt(i / 40));
  return (
    <g>
      <Mountains id={id} baseY={420} layers={2} tall={0.7} drift={frame / 50} />
      <polyline points={path.map((q) => `${q.x},${q.y}`).join(" ")} stroke={INK.wash} strokeWidth={60} fill="none" opacity={0.35} strokeLinecap="round" filter={`url(#${id}-wash)`} />
      <polyline points={path.map((q) => `${q.x},${q.y}`).join(" ")} stroke={INK.cinnabar} strokeWidth={6} strokeDasharray="4 22" fill="none" strokeLinecap="round" opacity={0.8} />
      <g transform={`translate(${b.x},${b.y}) rotate(${ang + 90}) scale(0.9)`} filter={`url(#${id}-rough)`}>
        <path d="M-70,0 Q0,40 70,0 L56,-16 L-56,-16 Z" fill={INK.ink} />
        <line x1={0} y1={-16} x2={0} y2={-120} stroke={INK.ink} strokeWidth={6} />
        <path d="M4,-116 Q50,-80 4,-30 Z" fill={INK.paperDeep} stroke={INK.ink} strokeWidth={4} />
        <path d="M0,-120 l34,10 l-34,10 Z" fill={accent} />
      </g>
      {/* những tờ thơ xếp chồng dần ở góc dưới bên phải */}
      {[...Array(6)].map((_, i) => (
        <g key={i} opacity={seg(p, 0.2 + i * 0.1, 0.3 + i * 0.1)} transform={`translate(${700 + i * 8},${760 - i * 14}) rotate(${-6 + i * 3})`}>
          <rect x={-90} y={-120} width={180} height={240} fill="#F6EEDC" stroke={INK.ink} strokeWidth={4} />
          <FakeColumn x={40} y={-90} n={5} reveal={1} step={40} size={0.7} />
          <FakeColumn x={-10} y={-90} n={5} reveal={1} step={40} size={0.7} />
        </g>
      ))}
    </g>
  );
};

const CuonTruyen: React.FC<InkSceneProps> = ({ id, p, frame, accent }) => {
  const open = seg(p, 0, 0.3);
  const rise = seg(p, 0.3, 0.8);
  return (
    <g>
      <g filter={`url(#${id}-rough)`}>
        <path d={`M480,860 L${480 - 330 * open},${840 - 30 * open} L${480 - 330 * open},${620 - 30 * open} L480,640 Z`} fill="#F6EEDC" stroke={INK.ink} strokeWidth={5} />
        <path d={`M480,860 L${480 + 330 * open},${840 - 30 * open} L${480 + 330 * open},${620 - 30 * open} L480,640 Z`} fill="#F6EEDC" stroke={INK.ink} strokeWidth={5} />
      </g>
      {open > 0.6
        ? [-260, -200, -140, 160, 220, 280].map((dx) => <FakeColumn key={dx} x={480 + dx} y={660} n={4} reveal={seg(p, 0.25, 0.45)} step={40} size={0.6} />)
        : null}
      {/* bóng người con gái tóc dài, quay lưng, mờ như khói mực bốc lên từ trang sách */}
      <g opacity={0.85 * rise} transform={`translate(480,${640 - 40 * rise})`}>
        <path d="M-60,0 Q-80,-180 -40,-300 L40,-300 Q80,-180 60,0 Z" fill={INK.ink} opacity={0.75} filter={`url(#${id}-wash)`} />
        <ellipse cx={0} cy={-330} rx={30} ry={34} fill={INK.ink} />
        <path d="M-26,-350 Q-40,-250 -10,-170 L10,-170 Q30,-250 26,-350 Z" fill={INK.ink} />
        <path d={`M-70,-200 q-40,${20 + Math.sin(frame / 12) * 8} -90,10`} stroke={accent} strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

const NgonBut: React.FC<InkSceneProps> = ({ id, p }) => {
  // Lục bát: dòng 6 rồi dòng 8, viết dần từ phải sang trái như sách xưa.
  const cols = [6, 8, 6, 8, 6, 8, 6, 8];
  const write = seg(p, 0.05, 0.7);
  const active = Math.min(cols.length - 1, Math.floor(write * cols.length));
  const colX = (i: number) => 800 - i * 90;
  const local = write * cols.length - active;
  return (
    <g>
      <rect x={120} y={140} width={720} height={780} fill="#F6EEDC" stroke={INK.ink} strokeWidth={5} filter={`url(#${id}-rough)`} />
      {cols.map((n, i) => (
        <FakeColumn key={i} x={colX(i)} y={220} n={n} reveal={i < active ? 1 : i === active ? local : 0} step={80} size={1.1} />
      ))}
      <Brush id={id} x={colX(active) + 14} y={220 + 80 * cols[active] * clamp01(local) - 20} angle={28} s={0.95} />
    </g>
  );
};

/** Ảnh dự phòng cảnh lật đáp án (chưa có tranh minh hoạ AI): bóng bán thân nhìn thẳng, không vẽ mặt. */
const LatDapAn: React.FC<InkSceneProps> = ({ id, p, accent }) => (
  <g>
    <circle cx={480} cy={430} r={330} fill={accent} opacity={0.22} filter={`url(#${id}-wash)`} />
    <g transform={`translate(480,${900 - 10 * p})`} filter={`url(#${id}-rough)`}>
      <path d="M-300,0 Q-280,-230 -120,-280 L120,-280 Q280,-230 300,0 Z" fill={INK.ink} />
      <path d="M-120,-280 L0,-150 L120,-280" stroke={INK.paperDeep} strokeWidth={10} fill="none" />
      <rect x={-34} y={-330} width={68} height={60} fill={INK.ink} />
      <ellipse cx={0} cy={-420} rx={96} ry={112} fill={INK.ink} />
      <path d="M-112,-450 Q0,-580 112,-450 Q120,-400 0,-396 Q-120,-400 -112,-450 Z" fill={INK.ink} />
    </g>
  </g>
);

const DichTa: React.FC<InkSceneProps> = ({ id, p, frame }) => (
  <g>
    <Gate id={id} x={480} y={760} s={0.8} tone={0.7} />
    <Bloom id={id} x={160} y={300} r={120 + 500 * seg(p, 0.3, 1)} o={0.28} />
    <Bloom id={id} x={820} y={420} r={100 + 420 * seg(p, 0.4, 1)} o={0.22} />
    <Candle id={id} x={800} y={940} h={170} alive={1} frame={frame} />
  </g>
);

const ChenThuoc: React.FC<InkSceneProps> = ({ id, p, frame }) => (
  <g>
    <rect x={140} y={760} width={680} height={30} rx={8} fill={INK.ink} filter={`url(#${id}-rough)`} />
    <g transform={`translate(${430 + 70 * seg(p, 0.15, 0.35)},760)`} filter={`url(#${id}-rough)`}>
      <path d="M-90,-80 Q-90,0 0,0 Q90,0 90,-80 Z" fill="#F6EEDC" stroke={INK.ink} strokeWidth={6} />
      <ellipse cx={0} cy={-80} rx={90} ry={18} fill="#6B4A2A" stroke={INK.ink} strokeWidth={5} />
    </g>
    {[0, 1, 2].map((k) => (
      <path
        key={k}
        d={`M${460 + k * 30 + 70 * seg(p, 0.15, 0.35)},650 q${-20 + Math.sin(frame / 10 + k) * 12},-60 0,-120 q${20},-60 0,-120`}
        stroke={INK.wash}
        strokeWidth={6}
        fill="none"
        opacity={0.45 * (1 - seg(p, 0.6, 0.9))}
        filter={`url(#${id}-mist)`}
      />
    ))}
    <Candle id={id} x={240} y={760} h={200} alive={1 - seg(p, 0.72, 0.9)} frame={frame} />
    <ellipse cx={480} cy={520} rx={560} ry={520} fill={`url(#${id}-dark)`} opacity={0.6 * seg(p, 0.72, 1)} />
  </g>
);

const GuomThanhBut: React.FC<InkSceneProps> = ({ id, p, accent }) => {
  const swap = seg(p, 0.35, 0.7);
  return (
    <g>
      <Sword id={id} x={480} y={500} len={600} angle={-60} accent={accent} opacity={1 - swap} />
      <Brush id={id} x={560} y={700} angle={30} s={1.2} opacity={swap} />
      <g opacity={seg(p, 0.65, 0.95)}>
        {[0, 1, 2].map((i) => (
          <FakeColumn key={i} x={300 - i * 80} y={260} n={i % 2 ? 8 : 6} reveal={seg(p, 0.65 + i * 0.08, 0.8 + i * 0.08)} step={70} />
        ))}
      </g>
    </g>
  );
};

export const INK_SCENES: Record<string, React.FC<InkSceneProps>> = {
  "dinh-thu": DinhThu,
  guom: Guom,
  "hai-ngon-nen": HaiNgonNen,
  "quan-vo": QuanVo,
  "co-tay-son": CoTaySon,
  "gio-bui": GioBui,
  "nui-hong": NuiHong,
  "guom-cung": GuomCung,
  "nha-tu": NhaTu,
  "kinh-do": KinhDo,
  "di-su": DiSu,
  "cuon-truyen": CuonTruyen,
  "ngon-but": NgonBut,
  "lat-dap-an": LatDapAn,
  "dich-ta": DichTa,
  "chen-thuoc": ChenThuoc,
  "guom-thanh-but": GuomThanhBut,
};

/** Một cảnh mực trong SVG riêng (bộ lọc riêng theo id để hai cảnh hoà nhau không lẫn bộ lọc). */
export const InkScene: React.FC<InkSceneProps & { name: string }> = ({ name, ...props }) => {
  const Scene = INK_SCENES[name];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
      <InkDefs id={props.id} />
      {Scene ? <Scene {...props} /> : null}
    </svg>
  );
};
