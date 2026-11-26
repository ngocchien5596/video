/**
 * Tập 10 "Lỗ tròn trên con dao dùng để làm gì?": cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc
 * (`li`, `lf`), bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-3.ts.
 * Toạ độ gốc sân khấu: x 60..910, y 93..835 (mặt đất y = 780).
 * Hai loại dao: dao phay (một lỗ nhỏ ở góc trên phía trước) và dao có hàng lỗ dọc thân (dao pho mát).
 */
import React from "react";
import { DrawLine, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Chalkboard, Check, Cross, GROUND, linePose, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

const CREAM = "#FFF6DD";
const GLOW = "#FFE27A";
const SPACE_BLUE = "#7FD3F5";
const ONION = "#5FA845";
const MILO_X = 800;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

// ---------------------------------------------------------------- mảnh ghép dùng chung

/** Chữ có viền, bật ra theo p. */
export const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; p?: number; rot?: number; anchor?: "start" | "middle" | "end" }> = ({
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
      stroke={color === CREAM || color === GLOW || color === SPACE_BLUE ? INK.line : CREAM}
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

/** Nhãn dạng con dấu có viền màu. */
export const Stamp: React.FC<{ x: number; y: number; text: string; p: number; color?: string; size?: number; rot?: number }> = ({ x, y, text, p, color = INK.red, size = 52, rot = -6 }) => {
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

const Milo: React.FC<{ li: number; lf: number; poses: Parameters<typeof linePose>[2]; x?: number }> = ({ li, lf, poses, x = MILO_X }) => (
  <Stickman x={x} y={GROUND} scale={0.82} {...linePose(li, lf, poses)} />
);

/** Vòng sáng nhấp nháy quanh một cái lỗ. */
const Ring: React.FC<{ x: number; y: number; r: number; frame: number; p?: number }> = ({ x, y, r, frame, p = 1 }) =>
  p <= 0.01 ? null : (
    <g opacity={p}>
      <circle cx={x} cy={y} r={r + 10 + 6 * Math.sin(frame / 5)} fill="none" stroke={INK.red} strokeWidth={6} />
      <circle cx={x} cy={y} r={r + 28 + 10 * Math.sin(frame / 5)} fill="none" stroke={INK.red} strokeWidth={3} opacity={0.5} />
    </g>
  );

/** Hình tròn đục lỗ (vẽ theo chiều ngược để fillRule evenodd khoét rỗng). */
const holeD = (cx: number, cy: number, r: number) => ` M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0 Z`;

/** Toạ độ lỗ dao phay trong hệ toạ độ riêng của dao. */
const CLEAVER_HOLE = { x: 318, y: 42, r: 20 };

/** Dao phay: lưỡi chữ nhật to bản, chuôi gỗ bên trái, lỗ nhỏ ở góc trên phía trước. Gốc toạ độ = góc trên trái của lưỡi. */
const Cleaver: React.FC<{ x: number; y: number; s?: number; rot?: number; hole?: boolean }> = ({ x, y, s = 1, rot = 0, hole = true }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <rect x={-175} y={44} width={178} height={58} rx={24} fill={INK.wood} />
    {[-130, -80, -30].map((rx) => (
      <circle key={rx} cx={rx} cy={73} r={6} fill="#D9D2C2" strokeWidth={3} />
    ))}
    <rect x={-16} y={34} width={24} height={78} rx={6} fill="#B9C2C8" />
    <path d={`M0 0 L360 0 L360 196 Q190 226 0 212 Z${hole ? holeD(CLEAVER_HOLE.x, CLEAVER_HOLE.y, CLEAVER_HOLE.r) : ""}`} fill="url(#e10-steel)" fillRule="evenodd" />
    <path d="M6 198 Q190 212 354 184" fill="none" stroke="#F4F8FA" strokeWidth={5} opacity={0.8} />
  </g>
);

const KNIFE_HOLES = [110, 220, 330];
/** Dao có hàng lỗ dọc thân (dao pho mát). Gốc = góc trên trái lưỡi; lưỡi dài 500, cao 92. holes=false: lưỡi trơn. */
const HoleKnife: React.FC<{ x: number; y: number; s?: number; rot?: number; holes?: boolean; children?: React.ReactNode }> = ({ x, y, s = 1, rot = 0, holes = true, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <rect x={-170} y={18} width={174} height={56} rx={24} fill={INK.woodDark} />
    {[-125, -75].map((rx) => (
      <circle key={rx} cx={rx} cy={46} r={6} fill="#D9D2C2" strokeWidth={3} />
    ))}
    <path d={`M0 0 L400 0 Q470 20 500 70 Q300 94 0 92 Z${holes ? KNIFE_HOLES.map((hx) => holeD(hx, 44, 25)).join("") : ""}`} fill="url(#e10-steel)" fillRule="evenodd" />
    {children}
  </g>
);

/** Thớt gỗ. */
const Board: React.FC<{ x: number; y: number; w: number; h?: number }> = ({ x, y, w, h = 70 }) => (
  <g stroke={INK.line} strokeWidth={5}>
    <rect x={x} y={y} width={w} height={h} rx={16} fill="#C99A5B" />
    <line x1={x + 20} y1={y + h * 0.4} x2={x + w - 40} y2={y + h * 0.4} stroke="#A57A43" strokeWidth={3} />
    <circle cx={x + w - 30} cy={y + h / 2} r={9} fill="#A57A43" strokeWidth={3} />
  </g>
);

/** Lát mỏng (pho mát, khoai) áp trên mặt dao; nhìn chính diện là một mảng màu bo góc. */
const Slice: React.FC<{ x: number; y: number; w: number; h: number; color?: string; rot?: number; o?: number }> = ({ x, y, w, h, color = "#FFD75E", rot = 0, o = 1 }) => (
  <g transform={`rotate(${rot} ${x + w / 2} ${y + h})`} opacity={o}>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={color} stroke={INK.line} strokeWidth={4} />
    {color === "#FFD75E" ? (
      <>
        <circle cx={x + w * 0.3} cy={y + h * 0.35} r={7} fill="#E8B83A" stroke="none" />
        <circle cx={x + w * 0.7} cy={y + h * 0.65} r={9} fill="#E8B83A" stroke="none" />
      </>
    ) : null}
  </g>
);

/** Mũi tên ngang từ (x, y), dài len (âm = sang trái). */
export const Arrow: React.FC<{ x: number; y: number; len: number; color?: string; p?: number; w?: number }> = ({ x, y, len, color = INK.red, p = 1, w = 12 }) => {
  const L = len * p;
  if (Math.abs(L) < 4) return null;
  const d = Math.sign(L);
  return (
    <g stroke={color} fill={color} strokeLinejoin="round">
      <line x1={x} y1={y} x2={x + L - d * 24} y2={y} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${x + L} ${y} L${x + L - d * 36} ${y - 22} L${x + L - d * 36} ${y + 22} Z`} strokeWidth={3} />
    </g>
  );
};

/** Bọt khí nhỏ trong các lỗ của dao, toạ độ tuyệt đối. */
const AirPuffs: React.FC<{ pts: [number, number][]; frame: number; r?: number }> = ({ pts, frame, r = 16 }) => (
  <g>
    {pts.map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={r + 2 * Math.sin(frame / 6 + i)} fill="#E6F6FD" stroke={INK.blue} strokeWidth={3} opacity={0.9} />
        <text x={x} y={y + 7} textAnchor="middle" fontSize={20} fill={INK.blue} {...T}>
          khí
        </text>
      </g>
    ))}
  </g>
);

/** Móc treo trên thanh gỗ gắn tường, đầu móc ở (x, y). */
const WallHook: React.FC<{ x: number; y: number; railX0?: number; railX1?: number }> = ({ x, y, railX0 = x - 160, railX1 = x + 160 }) => (
  <g stroke={INK.line} strokeWidth={5}>
    <rect x={railX0} y={y - 62} width={railX1 - railX0} height={30} rx={8} fill={INK.wood} />
    <path d={`M${x} ${y - 34} L${x} ${y - 6} Q${x} ${y + 14} ${x + 16} ${y + 8}`} fill="none" stroke="#8C949A" strokeWidth={9} strokeLinecap="round" />
  </g>
);

/** Dao phay treo qua lỗ trên móc ở (hx, hy), đung đưa nhẹ. */
const HangingCleaver: React.FC<{ hx: number; hy: number; frame: number; s?: number; swing?: number }> = ({ hx, hy, frame, s = 0.85, swing = 4 }) => (
  <g transform={`translate(${hx} ${hy}) rotate(${-68 + wave(frame, 0.08, swing)}) scale(${s}) translate(${-CLEAVER_HOLE.x} ${-CLEAVER_HOLE.y})`}>
    <Cleaver x={0} y={0} />
  </g>
);

// ---------------------------------------------------------------- hồi 1: bài toán
const ARTICLE_ROWS = ["TREO DAO", "CHỐNG DÍNH", "ĐO HÀNH LÁ", "GIẢI PHÓNG ÁP SUẤT"];
const CARDS = [["TREO", "DAO"], ["CHỐNG", "DÍNH"], ["ĐO", "HÀNH LÁ"], ["GIẢI PHÓNG", "ÁP SUẤT"]];

const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Board x={80} y={600} w={620} h={90} />
        <Pop p={pop(lf, fps, 0)} cx={330} cy={360}>
          <Cleaver x={230} y={230 + wave(frame, 0.06, 4)} s={1.05} />
        </Pop>
        <Ring x={230 + CLEAVER_HOLE.x * 1.05} y={230 + CLEAVER_HOLE.y * 1.05} r={CLEAVER_HOLE.r * 1.05} frame={frame} p={ease(lf, 20, 10)} />
        <Pop p={pop(lf, fps, 75)} cx={380} cy={560}>
          <HoleKnife x={220} y={520 + wave(frame, 0.06, 4, 1)} s={0.85} />
        </Pop>
        {KNIFE_HOLES.map((hx, i) => (
          <Ring key={hx} x={220 + hx * 0.85} y={520 + 44 * 0.85} r={20} frame={frame + i * 4} p={ease(lf, 90 + i * 6, 10)} />
        ))}
        <Label x={380} y={170} text="LỖ NÀY ĐỂ LÀM GÌ?" size={46} color={INK.red} p={pop(lf, fps, 120)} />
        <Milo li={0} lf={lf} poses={["think"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Pop p={pop(lf, fps, 0)} cx={360} cy={420}>
          <rect x={80} y={130} width={570} height={600} rx={18} fill={CREAM} stroke={INK.line} strokeWidth={5} />
          <rect x={80} y={130} width={570} height={80} rx={18} fill={INK.blue} stroke={INK.line} strokeWidth={5} />
          <text x={365} y={186} textAnchor="middle" fontSize={40} fill={CREAM} {...T}>
            LỖ TRÊN DAO
          </text>
          <text x={365} y={280} textAnchor="middle" fontSize={48} fill={INK.line} {...T}>
            4 CÔNG DỤNG
          </text>
        </Pop>
        {ARTICLE_ROWS.map((t, i) => (
          <Fade key={t} p={ease(lf, 24 + i * 34, 12)} dy={10}>
            <circle cx={150} cy={370 + i * 95} r={30} fill={GLOW} stroke={INK.line} strokeWidth={4} />
            <text x={150} y={383 + i * 95} textAnchor="middle" fontSize={36} fill={INK.line} {...T}>
              {i + 1}
            </text>
            <text x={200} y={384 + i * 95} fontSize={38} fill={INK.line} {...T}>
              {t}
            </text>
          </Fade>
        ))}
        <Stamp x={370} y={800} text="4 VIỆC MỘT CÁI LỖ" p={pop(lf, fps, 170)} color={INK.green} size={40} rot={-3} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        
        {CARDS.map((c, i) => {
          const x = 80 + (i % 2) * 300;
          const y = 170 + Math.floor(i / 2) * 300;
          return (
            <Pop key={c[0]} p={pop(lf, fps, 20 + i * 24)} cx={x + 140} cy={y + 135}>
              <rect x={x} y={y} width={280} height={270} rx={18} fill={CREAM} stroke={INK.line} strokeWidth={5} />
              <circle cx={x + 140} cy={y + 70 + wave(frame, 0.12, 4, i * 2)} r={44} fill={GLOW} stroke={INK.line} strokeWidth={5} />
              <text x={x + 140} y={y + 88 + wave(frame, 0.12, 4, i * 2)} textAnchor="middle" fontSize={52} fill={INK.line} {...T}>
                {i + 1}
              </text>
              <text x={x + 140} y={y + 172} textAnchor="middle" fontSize={34} fill={INK.green} {...T}>
                {c[0]}
              </text>
              <text x={x + 140} y={y + 222} textAnchor="middle" fontSize={34} fill={INK.green} {...T}>
                {c[1]}
              </text>
            </Pop>
          );
        })}
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 2: công dụng treo dao
const Barrier: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Pop p={pop(lf, fps, 0)} cx={360} cy={390}>
          <Cleaver x={210} y={230} s={1.2} />
        </Pop>
        <Ring x={210 + CLEAVER_HOLE.x * 1.2} y={230 + CLEAVER_HOLE.y * 1.2} r={CLEAVER_HOLE.r * 1.2} frame={frame} p={ease(lf, 14, 10)} />
        <Pop p={pop(lf, fps, 60)} cx={370} cy={640}>
          <rect x={80} y={560} width={590} height={170} rx={18} fill={CREAM} stroke={INK.blue} strokeWidth={6} />
          <text x={110} y={606} fontSize={30} fill={INK.blue} {...T}>
            WIKIPEDIA · CLEAVER
          </text>
          <text x={110} y={660} fontSize={38} fill={INK.line} {...T}>
            LỖ NHỎ GÓC TRÊN
          </text>
          <text x={110} y={708} fontSize={38} fill={INK.line} {...T}>
            ĐỂ TREO LÊN TƯỜNG
          </text>
        </Pop>
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        {/* Ống cắm dao: dao phay to bản cắm không vừa */}
        <g stroke={INK.line} strokeWidth={5}>
          {[212, 240, 268].map((hx) => (
            <rect key={hx} x={hx - 11} y={480} width={22} height={60} rx={8} fill={INK.woodDark} />
          ))}
          <path d="M160 540 L320 540 L305 770 L175 770 Z" fill="#8A5A30" />
          <rect x={190} y={530} width={100} height={14} rx={5} fill="#5B3A1C" />
        </g>
        {(() => {
          // dao phay dựng đứng hạ xuống, vướng miệng ống rồi bật lên
          const down = ease(lf, 6, 22) - 0.4 * ease(lf, 30, 10);
          return <Cleaver x={318} y={110 + 130 * down} s={0.72} rot={90} />;
        })()}
        <Cross x={400} y={430} r={46} p={pop(lf, fps, 36)} />
        <Label x={250} y={818} text="KHÔNG VỪA ỐNG" size={34} color={INK.red} p={pop(lf, fps, 44)} />
        {/* Móc tường: treo gọn */}
        <WallHook x={620} y={250} railX0={470} railX1={880} />
        <Fade p={ease(lf, 80, 14)}>
          <HangingCleaver hx={630} hy={258} frame={frame} />
        </Fade>
        <Check x={820} y={470} r={44} p={pop(lf, fps, 120)} />
        <Label x={680} y={720} text="GỌN, DỄ LẤY" size={40} color={INK.green} p={pop(lf, fps, 130)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <WallHook x={380} y={230} railX0={200} railX1={560} />
        <HangingCleaver hx={390} hy={238} frame={frame} />
        <Stamp x={360} y={700} text="CÔNG DỤNG 1 · TREO DAO" p={pop(lf, fps, 70)} color={INK.green} size={38} rot={-4} />
        <Label x={380} y={160} text="SINH RA ĐỂ TREO!" size={46} color={INK.blue} p={pop(lf, fps, 30)} />
        <Milo li={0} lf={lf} poses={["eureka"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 3: công dụng chống dính
/** Bảng so sánh: dao ở (kx, ky), lát áp trên mặt dao; fall 0..1 lát trượt rơi khỏi dao. */
const KnifeWithSlice: React.FC<{ kx: number; ky: number; holes: boolean; fall: number; frame: number; color?: string; thin?: boolean }> = ({ kx, ky, holes, fall, frame, color, thin }) => (
  <g>
    <HoleKnife x={kx} y={ky} holes={holes} />
    {holes && fall > 0.05 ? (
      <AirPuffs
        pts={KNIFE_HOLES.map((hx) => [kx + hx, ky + 44] as [number, number])}
        frame={frame}
        r={14}
      />
    ) : null}
    <Slice
      x={kx + 70}
      y={ky + 6 + 240 * fall * fall}
      w={320}
      h={80}
      color={color}
      rot={fall * 24 + (fall < 0.05 ? wave(frame, 0.25, 1.5) : 0)}
      o={thin ? 0.75 : 1 - 0.6 * clamp01((fall - 0.7) / 0.3)}
    />
  </g>
);

const Eureka: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Board x={80} y={640} w={620} h={80} />
        {/* Khối pho mát */}
        <path d="M150 640 L150 500 L560 470 L620 640 Z" fill="#FFD75E" stroke={INK.line} strokeWidth={5} strokeLinejoin="round" />
        {[
          [230, 580, 16],
          [330, 540, 11],
          [450, 600, 14],
          [520, 520, 9],
        ].map(([cx, cy, r]) => (
          <circle key={cx} cx={cx} cy={cy} r={r} fill="#E8B83A" stroke={INK.line} strokeWidth={3} />
        ))}
        <HoleKnife x={210} y={300 + 150 * ease(lf, 20, 40) - 150 * ease(lf, 70, 30) + 150 * ease(lf, 110, 40)} s={0.9} />
        <Label x={380} y={190} text="HAY GẶP Ở DAO PHO MÁT" size={38} color={INK.blue} p={pop(lf, fps, 100)} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <rect x={70} y={110} width={840} height={320} rx={18} fill="rgba(255,246,221,0.65)" stroke={INK.line} strokeWidth={4} />
        <rect x={70} y={450} width={840} height={320} rx={18} fill="rgba(255,246,221,0.65)" stroke={INK.line} strokeWidth={4} />
        <KnifeWithSlice kx={260} ky={200} holes={false} fall={0} frame={frame} />
        <Label x={480} y={170} text="LƯỠI TRƠN: DÍNH CHẶT" size={38} color={INK.red} p={pop(lf, fps, 20)} />
        <g clipPath="url(#e10-clip-low)">
          <KnifeWithSlice kx={260} ky={540} holes fall={ease(lf, 70, 50)} frame={frame} />
        </g>
        <Label x={480} y={510} text="CÓ LỖ: RỜI RA" size={38} color={INK.green} p={pop(lf, fps, 70)} />
        <Stamp x={490} y={805} text="KHÔNG KHÍ = LỚP CHỐNG DÍNH" p={pop(lf, fps, 130)} color={INK.blue} size={34} rot={-2} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Stamp x={480} y={160} text="LÁT DÀY: RÕ NHẤT" p={pop(lf, fps, 6)} color={INK.blue} size={42} rot={-3} />
        <KnifeWithSlice kx={260} ky={290} holes={false} fall={0} frame={frame} color="#F3E6C4" thin />
        <KnifeWithSlice kx={260} ky={500} holes fall={0} frame={frame} color="#F3E6C4" thin />
        <Cross x={840} y={330} r={34} p={pop(lf, fps, 80)} bare />
        <Cross x={840} y={540} r={34} p={pop(lf, fps, 90)} bare />
        <Label x={480} y={720} text="KHOAI THÁI MỎNG:" size={40} color={INK.line} p={pop(lf, fps, 70)} />
        <Label x={480} y={780} text="DAO NÀO CŨNG DÍNH" size={40} color={INK.red} p={pop(lf, fps, 80)} />
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        <Cleaver x={200} y={140} s={0.95} />
        {(() => {
          const hx = 200 + CLEAVER_HOLE.x * 0.95;
          const hy = 140 + CLEAVER_HOLE.y * 0.95;
          return (
            <g>
              <Ring x={hx} y={hy} r={18} frame={frame} />
              <DrawLine p={ease(lf, 14, 20)} x1={hx} y1={hy + 30} x2={hx - 40} y2={140 + 195} stroke={INK.red} strokeWidth={6} strokeDasharray="14 10" />
              <Slice x={hx - 150} y={140 + 200} w={160} h={44} />
              <Label x={hx + 120} y={hy + 110} text="XA THỨC ĂN" size={36} color={INK.red} p={pop(lf, fps, 36)} />
              <Cross x={hx + 120} y={hy + 170} r={30} p={pop(lf, fps, 46)} bare />
            </g>
          );
        })()}
        <HoleKnife x={240} y={520} s={0.8} />
        {KNIFE_HOLES.map((hx, i) => (
          <Ring key={hx} x={240 + hx * 0.8} y={520 + 44 * 0.8} r={18} frame={frame + i * 4} p={ease(lf, 100 + i * 5, 10)} />
        ))}
        <Stamp x={380} y={720} text="CÔNG DỤNG 2 · CHỐNG DÍNH" p={pop(lf, fps, 130)} color={INK.green} size={34} rot={-3} />
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 4: SGK, áp suất khí quyển (phần suy luận)
const Theorem: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Chalkboard x={90} y={130} w={560} h={320} open={ease(lf, 0, 16)} />
        <Fade p={ease(lf, 14, 12)}>
          <text x={370} y={215} textAnchor="middle" fontSize={40} fill={CREAM} {...T}>
            KHTN 8 · BÀI 16
          </text>
          <text x={370} y={305} textAnchor="middle" fontSize={54} fill={GLOW} {...T}>
            ÁP SUẤT
          </text>
          <text x={370} y={375} textAnchor="middle" fontSize={54} fill={GLOW} {...T}>
            KHÍ QUYỂN
          </text>
        </Fade>
        <Stamp x={370} y={600} text="VÌ SAO HẾT DÍNH?" p={pop(lf, fps, 90)} color={INK.blue} size={46} rot={-4} />
        <Milo li={0} lf={lf} poses={["think"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        {/* Bức tường gạch men bên phải */}
        <rect x={640} y={110} width={270} height={680} fill="#D8E4E8" stroke={INK.line} strokeWidth={5} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={640} y1={110 + i * 113} x2={910} y2={110 + i * 113} stroke="#A9BAC0" strokeWidth={3} />
        ))}
        {/* Giác mút: chén cao su úp vào tường, núm cầm hướng sang trái */}
        {(() => {
          const depth = 130 - 35 * ease(lf, 6, 16);
          const ax = 640 - depth * 0.975;
          return (
            <g stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
              <path d={`M640 340 C${640 - depth * 1.3} 350 ${640 - depth * 1.3} 550 640 560 Z`} fill="#E8766F" />
              <path d={`M640 380 C${640 - depth * 0.6} 390 ${640 - depth * 0.6} 510 640 520 Z`} fill="#F7D4CF" strokeWidth={3} />
              <rect x={ax - 60} y={434} width={64} height={32} rx={10} fill="#D9534F" />
              <circle cx={ax - 66} cy={450} r={26} fill="#D9534F" />
              <Label x={640 - depth * 0.2} y={588} text="ÍT KHÍ" size={28} color={INK.red} p={pop(lf, fps, 40)} anchor="end" />
            </g>
          );
        })()}
        {[
          [220, 500],
          [360, 420],
          [450, 300],
          [540, 420],
          [690, 500],
        ].map(([y, len], i) => (
          <Arrow key={y} x={110} y={y} len={len} p={ease(lf, 50 + i * 6, 16)} color={INK.red} w={10} />
        ))}
        <Label x={340} y={160} text="ÁP SUẤT KHÍ QUYỂN" size={36} color={INK.red} p={pop(lf, fps, 60)} />
        <Label x={340} y={780} text="ĐÈ TỪ NGOÀI VÀO" size={36} color={INK.line} p={pop(lf, fps, 90)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <HoleKnife x={250} y={300} />
        {(() => {
          const air = ease(lf, 60, 40);
          return (
            <g>
              {KNIFE_HOLES.map((hx, i) => {
                const x = 250 + hx;
                return <circle key={hx} cx={x - 160 * (1 - air) - i * 10} cy={344 - 120 * (1 - air)} r={14} fill="#E6F6FD" stroke={INK.blue} strokeWidth={3} opacity={air > 0.02 ? 0.95 : 0} />;
              })}
              <Slice x={320} y={306 + 260 * ease(lf, 110, 40) ** 2} w={320} h={80} rot={22 * ease(lf, 110, 40)} />
            </g>
          );
        })()}
        <Label x={480} y={200} text="KHÔNG KHÍ LỌT VÀO" size={42} color={INK.blue} p={pop(lf, fps, 60)} />
        <Label x={480} y={620} text="LÁT BONG RA NGAY" size={42} color={INK.line} p={pop(lf, fps, 120)} />
        <Stamp x={480} y={750} text="HẾT DÍNH!" p={pop(lf, fps, 170)} color={INK.green} size={48} rot={-3} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 5: hai công dụng chưa có sở cứ
const SCORE = [
  { t: "TREO DAO", ok: true },
  { t: "CHỐNG DÍNH", ok: true },
  { t: "ĐO HÀNH LÁ", ok: true },
  { t: "GIẢI PHÓNG ÁP SUẤT", ok: true },
];

const Realworld: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Cleaver x={230} y={150} s={0.9} />
        {(() => {
          const hx = 230 + CLEAVER_HOLE.x * 0.9;
          const hy = 150 + CLEAVER_HOLE.y * 0.9;
          const k = ease(lf, 10, 30);
          // cọng hành luồn chéo vào lỗ từ bên phải
          return (
            <g>
              <line x1={hx + 420 - 400 * k} y1={hy - 160 + 150 * k} x2={hx + 760 - 400 * k} y2={hy - 480 + 150 * k} stroke={ONION} strokeWidth={22} strokeLinecap="round" />
              <line x1={hx + 420 - 400 * k} y1={hy - 160 + 150 * k} x2={hx + 760 - 400 * k} y2={hy - 480 + 150 * k} stroke="#9AD47E" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
              <Ring x={hx} y={hy} r={16} frame={frame} p={ease(lf, 40, 10)} />
            </g>
          );
        })()}
        <Board x={90} y={560} w={600} h={70} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Pop key={i} p={pop(lf, fps, 60 + i * 8)} cx={150 + i * 110} cy={540}>
            <rect x={110 + i * 110} y={528} width={80} height={24} rx={12} fill={ONION} stroke={INK.line} strokeWidth={4} />
          </Pop>
        ))}
        <Label x={380} y={480} text="KHÚC NÀO CŨNG ĐỀU" size={40} color={INK.line} p={pop(lf, fps, 50)} />
        <Stamp x={380} y={720} text="CÔNG DỤNG 3 · ĐO HÀNH LÁ" p={pop(lf, fps, 200)} color={INK.green} size={34} rot={-4} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Board x={90} y={560} w={600} h={80} />
        {/* Khúc xương */}
        <g stroke={INK.line} strokeWidth={5}>
          <rect x={250} y={510} width={300} height={44} rx={20} fill="#F3EBD9" />
          {[250, 550].map((cx) =>
            [-16, 16].map((dy) => <circle key={`${cx}${dy}`} cx={cx} cy={532 + dy} r={26} fill="#F3EBD9" />),
          )}
        </g>
        {(() => {
          const cyc = lf % 50;
          const drop = cyc < 14 ? ease(cyc, 0, 14) : 1 - ease(cyc, 24, 24);
          const hit = cyc >= 14 && cyc < 26;
          return (
            <g>
              <Cleaver x={260} y={110 + 180 * drop} s={0.85} />
              {hit
                ? [-1, 1].map((d) =>
                    [0, 1, 2].map((i) => (
                      <line key={`${d}${i}`} x1={400 + d * (150 + i * 10)} y1={500 - i * 24} x2={400 + d * (190 + i * 20)} y2={480 - i * 34} stroke={INK.red} strokeWidth={6} strokeLinecap="round" />
                    )),
                  )
                : null}
            </g>
          );
        })()}
        <Label x={400} y={720} text="GIẢI PHÓNG ÁP SUẤT" size={42} color={INK.line} p={pop(lf, fps, 30)} />
        <Stamp x={400} y={810} text="CÔNG DỤNG 4" p={pop(lf, fps, 150)} color={INK.green} size={40} rot={-3} />
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <rect x={80} y={140} width={600} height={560} rx={20} fill={CREAM} stroke={INK.line} strokeWidth={5} />
        <text x={380} y={210} textAnchor="middle" fontSize={44} fill={INK.line} {...T}>
          4 CÔNG DỤNG
        </text>
        {SCORE.map((r, i) => {
          const y = 300 + i * 110;
          const p = ease(lf, 10 + i * 30, 12);
          return (
            <Fade key={r.t} p={p} dy={10}>
              <line x1={110} y1={y + 40} x2={650} y2={y + 40} stroke={INK.soft} strokeWidth={3} />
              <text x={120} y={y + 14} fontSize={36} fill={INK.line} {...T}>
                {r.t}
              </text>
              {r.ok ? (
                <Check x={610} y={y} r={28} p={p} />
              ) : (
                <text x={610} y={y + 22} textAnchor="middle" fontSize={60} fill={INK.gold} {...T}>
                  ?
                </text>
              )}
            </Fade>
          );
        })}
        <Stamp x={380} y={790} text="MỘT CÁI LỖ, BỐN VIỆC" p={pop(lf, fps, 140)} color={INK.green} size={40} rot={-2} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 6: vũ trụ
export const Space: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={40} y={80} width={900} height={780} fill="#121A30" />
    {Array.from({ length: 40 }, (_, i) => (
      <circle key={i} cx={60 + ((i * 137) % 860)} cy={100 + ((i * 71) % 620)} r={1.5 + (i % 3)} fill={CREAM} opacity={0.3 + 0.6 * Math.abs(Math.sin(frame * 0.06 + i))} />
    ))}
  </g>
);

/** Trạm vũ trụ giản lược: khoang giữa, giàn ngang, hai cặp tấm pin. */
const Station: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={4}>
    <rect x={-260} y={-8} width={520} height={16} fill="#B9C2C8" />
    {[-230, -150, 150, 230].map((px) => (
      <g key={px}>
        <rect x={px - 30} y={-110} width={60} height={96} fill="#2B5FA8" />
        <rect x={px - 30} y={14} width={60} height={96} fill="#2B5FA8" />
        <line x1={px} y1={-110} x2={px} y2={110} stroke="#8FB4E8" strokeWidth={2} />
      </g>
    ))}
    <rect x={-70} y={-30} width={140} height={60} rx={26} fill="#E8E8E2" />
    <circle cx={0} cy={0} r={12} fill="#7FD3F5" />
  </g>
);

/** Cờ lê. */
const Wrench: React.FC<{ x: number; y: number; rot?: number; s?: number }> = ({ x, y, rot = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={INK.line} strokeWidth={4} strokeLinejoin="round">
    <rect x={-60} y={-10} width={120} height={20} rx={8} fill="#B9C2C8" />
    <path d="M60 -26 A30 30 0 1 1 60 26 L72 8 L90 8 L90 -8 L72 -8 Z" fill="#B9C2C8" />
    <circle cx={-66} cy={0} r={18} fill="#B9C2C8" />
    <circle cx={-66} cy={0} r={7} fill="#121A30" />
  </g>
);

/** Phi hành gia mặc đồ trắng, đứng trôi ở (x, y) (tâm thân). */
const Astronaut: React.FC<{ x: number; y: number; frame: number; s?: number }> = ({ x, y, frame, s = 1 }) => (
  <g transform={`translate(${x} ${y + wave(frame, 0.05, 6)}) rotate(${wave(frame, 0.04, 4)}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
    <rect x={-58} y={-60} width={34} height={90} rx={10} fill="#D6D6CF" />
    <line x1={-14} y1={50} x2={-30} y2={130} stroke={INK.line} strokeWidth={34} />
    <line x1={-14} y1={50} x2={-30} y2={130} stroke="#F4F4EE" strokeWidth={24} />
    <line x1={18} y1={50} x2={34} y2={128} stroke={INK.line} strokeWidth={34} />
    <line x1={18} y1={50} x2={34} y2={128} stroke="#F4F4EE" strokeWidth={24} />
    <rect x={-38} y={-60} width={76} height={118} rx={26} fill="#F4F4EE" />
    <line x1={30} y1={-36} x2={92} y2={2} stroke={INK.line} strokeWidth={30} />
    <line x1={30} y1={-36} x2={92} y2={2} stroke="#F4F4EE" strokeWidth={20} />
    <line x1={-30} y1={-36} x2={-80} y2={10} stroke={INK.line} strokeWidth={30} />
    <line x1={-30} y1={-36} x2={-80} y2={10} stroke="#F4F4EE" strokeWidth={20} />
    <circle cx={0} cy={-100} r={44} fill="#F4F4EE" />
    <ellipse cx={8} cy={-100} rx={30} ry={24} fill="#22406B" />
    <path d="M-4 -112 Q8 -120 22 -110" fill="none" stroke="#9FC4F0" strokeWidth={4} />
    <rect x={-20} y={-30} width={40} height={24} rx={5} fill="#C0392B" strokeWidth={3} />
  </g>
);

/** Túi đồ nghề trắng có quai. */
const ToolBag: React.FC<{ x: number; y: number; rot?: number; s?: number }> = ({ x, y, rot = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={INK.line} strokeWidth={4}>
    <path d="M-20 -30 Q0 -52 20 -30" fill="none" strokeWidth={6} />
    <rect x={-40} y={-30} width={80} height={62} rx={12} fill="#F4F4EE" />
    <line x1={-40} y1={-6} x2={40} y2={-6} />
  </g>
);

/** Dây buộc mềm từ (x1,y1) tới (x2,y2), võng nhẹ. */
const Tether: React.FC<{ x1: number; y1: number; x2: number; y2: number; frame: number; sag?: number; p?: number }> = ({ x1, y1, x2, y2, frame, sag = 50, p = 1 }) => {
  if (p <= 0.01) return null;
  const mx = (x1 + x2) / 2 + wave(frame, 0.07, 14);
  const my = (y1 + y2) / 2 + sag + wave(frame, 0.05, 10, 1);
  return <path d={`M${x1} ${y1} Q${mx} ${my} ${x1 + (x2 - x1) * p} ${y1 + (y2 - y1) * p}`} fill="none" stroke={GLOW} strokeWidth={6} strokeDasharray="4 8" strokeLinecap="round" />;
};

const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Space frame={frame} />
        <Station x={480} y={230} />
        {(() => {
          const k = ease(lf, 40, 160);
          return <Wrench x={330 + 420 * k} y={480 + 160 * k} rot={lf * 1.5} s={1.3 - 0.8 * k} />;
        })()}
        <Label x={480} y={700} text="BUÔNG TAY LÀ TRÔI" size={46} color={GLOW} p={pop(lf, fps, 60)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Space frame={frame} />
        <Station x={480} y={200} s={0.8} />
        <Astronaut x={420} y={480} frame={frame} />
        <Tether x1={340} y1={490} x2={330} y2={210} frame={frame} sag={-20} p={ease(lf, 10, 20)} />
        {(() => {
          const wx = 690 + wave(frame, 0.05, 20);
          const wy = 520 + wave(frame, 0.04, 16, 1);
          return (
            <g>
              <Tether x1={512} y1={482} x2={wx - 66} y2={wy} frame={frame} sag={40} p={ease(lf, 40, 24)} />
              <Wrench x={wx} y={wy} rot={wave(frame, 0.05, 20)} />
              <Ring x={wx - 66} y={wy} r={26} frame={frame} p={ease(lf, 80, 12)} />
            </g>
          );
        })()}
        <Label x={480} y={770} text="VÒNG NHỎ ĐỂ BUỘC DÂY" size={42} color={GLOW} p={pop(lf, fps, 70)} />
        <Stamp x={690} y={380} text="Y NHƯ LỖ DAO" p={pop(lf, fps, 110)} color={INK.blue} size={36} rot={6} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Space frame={frame} />
        <circle cx={480} cy={1180} r={520} fill="none" stroke={SPACE_BLUE} strokeWidth={30} opacity={0.35} />
        <circle cx={480} cy={1180} r={500} fill="#2F6FB5" stroke={INK.line} strokeWidth={5} />
        <path d="M120 760 Q300 660 520 700 Q700 730 860 680 L900 860 L80 860 Z" fill="#5E9A4A" opacity={0.9} />
        {(() => {
          const a = -Math.PI * (0.92 - 0.84 * ease(lf, 0, 220));
          return <ToolBag x={480 + Math.cos(a) * 400} y={1180 + Math.sin(a) * 820 * 0.78} rot={lf * 0.8} />;
        })()}
        {/* Người dưới đất cầm ống nhòm */}
        <g transform="translate(480 680)" stroke={INK.line} strokeWidth={5} strokeLinecap="round">
          <line x1={0} y1={0} x2={-12} y2={-40} />
          <line x1={0} y1={0} x2={12} y2={-40} />
          <line x1={0} y1={-40} x2={0} y2={-90} />
          <circle cx={0} cy={-108} r={16} fill={CREAM} />
          <line x1={0} y1={-80} x2={10} y2={-124} />
          <rect x={2} y={-140} width={20} height={26} rx={5} fill="#3B4A6A" transform="rotate(-20 12 -127)" />
        </g>
        <Stamp x={330} y={190} text="THÁNG 11/2023" p={pop(lf, fps, 20)} size={42} />
        <Label x={640} y={560} text="THẤY BẰNG ỐNG NHÒM" size={38} color={GLOW} p={pop(lf, fps, 150)} />
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        <rect x={40} y={80} width={450} height={620} fill="#EADBB8" />
        <WallHook x={270} y={220} railX0={90} railX1={450} />
        <HangingCleaver hx={280} hy={228} frame={frame} s={0.7} />
        <rect x={490} y={80} width={450} height={620} fill="#121A30" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={510 + ((i * 97) % 410)} cy={110 + ((i * 53) % 540)} r={2 + (i % 2)} fill={CREAM} opacity={0.6} />
        ))}
        <Tether x1={600} y1={200} x2={720} y2={420} frame={frame} sag={30} />
        <Wrench x={780} y={430 + wave(frame, 0.05, 10)} rot={wave(frame, 0.05, 14)} />
        <line x1={490} y1={80} x2={490} y2={700} stroke={INK.line} strokeWidth={6} />
        <Stamp x={480} y={780} text="MỘT CÁI LỖ, KHỎI THẤT LẠC" p={pop(lf, fps, 30)} color={INK.blue} size={36} rot={-2} />
      </g>
    ) : null}
  </g>
);

const EP10: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const Ep10Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP10[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient và vùng cắt riêng của tập (id tiền tố "e10-"), đặt vào <defs> của khung cảnh. */
export const Ep10Defs: React.FC = () => (
  <>
    <linearGradient id="e10-steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#E9EEF1" />
      <stop offset="0.6" stopColor="#B7C1C8" />
      <stop offset="1" stopColor="#8E9AA3" />
    </linearGradient>
    <clipPath id="e10-clip-low">
      <rect x={70} y={450} width={840} height={320} rx={18} />
    </clipPath>
  </>
);
