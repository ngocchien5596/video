import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { countUp, DrawLine, DrawPath, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { PARCHMENT, STAGE_DROP } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

/**
 * Sân khấu hình học của "Thiên Đường Kiến Thức". Toạ độ vẽ theo bản gốc (mặt đất y = 780, khung mặt bằng 805..1185);
 * cả sân khấu được hạ xuống STAGE_DROP px để chừa chỗ cho tiêu đề.
 * Mọi hình chuyển động theo lời kể: `beatFrame` (khung hình kể từ đầu nhịp), `lineIndex` + `lineFrame` (câu đang đọc).
 */
export type ParchmentSceneProps = {
  day: number;
  beatKind: string;
  lineIndex: number;
  beatProgress: number;
  /** Số khung hình kể từ đầu nhịp. */
  beatFrame: number;
  /** Số khung hình kể từ đầu câu đang đọc. */
  lineFrame: number;
  fps: number;
};

type Anim = { li: number; lf: number; bf: number; fps: number; frame: number };

const GROUND = 780;
const T = { fontFamily: "sans-serif", fontWeight: 900 } as const;

/** Thẻ công thức ở khung mặt bằng: tiêu đề ngắn + một dòng công thức (bật ra khi đổi nội dung). */
const Card: React.FC<{ title: string; formula: string; p: number; fp?: number; ok?: boolean; size?: number }> = ({
  title,
  formula,
  p,
  fp = 1,
  ok = true,
  size = 42,
}) => (
  <Pop p={p} cx={484} cy={990}>
    <g transform="translate(100, 840)">
      <rect x={0} y={0} width={768} height={300} rx={16} fill="rgba(35, 23, 13, 0.85)" stroke={ok ? PARCHMENT.gold : PARCHMENT.red} strokeWidth={3} />
      <text x={384} y={58} textAnchor="middle" fill={ok ? PARCHMENT.gold : PARCHMENT.red} fontSize={28} {...T}>
        {title}
      </text>
      <Pop p={fp} cx={384} cy={170}>
        <rect x={44} y={96} width={680} height={150} rx={14} fill="rgba(245,197,66,0.12)" stroke={PARCHMENT.cream} strokeWidth={2} />
        <text x={384} y={186} textAnchor="middle" fill={PARCHMENT.cream} fontSize={size} {...T}>
          {formula}
        </text>
      </Pop>
    </g>
  </Pop>
);

/** Dấu ✖ đỏ đóng lên hình. */
const Cross: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 34 }) => (
  <Pop p={p} cx={x} cy={y}>
    <circle cx={x} cy={y} r={r + 8} fill="rgba(30,20,11,0.7)" stroke={PARCHMENT.red} strokeWidth={5} />
    <path d={`M${x - r * 0.55} ${y - r * 0.55} L${x + r * 0.55} ${y + r * 0.55} M${x + r * 0.55} ${y - r * 0.55} L${x - r * 0.55} ${y + r * 0.55}`} stroke={PARCHMENT.red} strokeWidth={9} strokeLinecap="round" />
  </Pop>
);

/** Mặt Trời có tia sáng xoay chậm. */
const Sun: React.FC<{ x: number; y: number; r?: number; frame: number; p?: number }> = ({ x, y, r = 36, frame, p = 1 }) => (
  <Pop p={p} cx={x} cy={y}>
    <g transform={`rotate(${frame * 0.6} ${x} ${y})`}>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <line
            key={i}
            x1={x + Math.cos(a) * (r + 8)}
            y1={y + Math.sin(a) * (r + 8)}
            x2={x + Math.cos(a) * (r + 22 + wave(frame, 0.15, 5, i))}
            y2={y + Math.sin(a) * (r + 22 + wave(frame, 0.15, 5, i))}
            stroke={PARCHMENT.gold}
            strokeWidth={4}
            strokeLinecap="round"
          />
        );
      })}
    </g>
    <circle cx={x} cy={y} r={r + wave(frame, 0.12, 2)} fill={PARCHMENT.gold} stroke={PARCHMENT.cream} strokeWidth={3} />
  </Pop>
);

/** Đám mây trôi ngang. */
const Cloud: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.35}>
    <ellipse cx={0} cy={0} rx={52} ry={20} fill={PARCHMENT.cream} />
    <ellipse cx={34} cy={-12} rx={36} ry={18} fill={PARCHMENT.cream} />
    <ellipse cx={-30} cy={-8} rx={30} ry={15} fill={PARCHMENT.cream} />
  </g>
);

/** Kim tự tháp mọc lên từ mặt đất (rise 0 → 1). */
const Pyramid: React.FC<{ apex: [number, number]; left: number; right: number; side?: number; rise?: number; fill?: string; sideFill?: string }> = ({
  apex,
  left,
  right,
  side,
  rise = 1,
  fill = "#B58952",
  sideFill = "#8C6538",
}) => (
  <g transform={`translate(0 ${GROUND}) scale(1 ${Math.max(0.001, rise)}) translate(0 ${-GROUND})`}>
    <polygon points={`${apex[0]},${apex[1]} ${left},${GROUND} ${right},${GROUND}`} fill={fill} stroke={PARCHMENT.cream} strokeWidth={4} />
    {side ? <polygon points={`${apex[0]},${apex[1]} ${right},${GROUND} ${side},${GROUND - 50}`} fill={sideFill} stroke={PARCHMENT.cream} strokeWidth={3.5} /> : null}
    {/* Các lớp đá */}
    {[0.25, 0.5, 0.75].map((k) => {
      const y = apex[1] + (GROUND - apex[1]) * k;
      const half = ((right - left) / 2) * k;
      return <line key={k} x1={apex[0] - half} y1={y} x2={apex[0] + half} y2={y} stroke="rgba(255,248,231,0.25)" strokeWidth={2} />;
    })}
  </g>
);

// ---------------------------------------------------------------- tập 1: Thales đo kim tự tháp

const ThalesHook: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  // Khung hình đầu tiên phải có đủ hình (làm hook trên bảng tin và khung lặp lại cuối video): không cho "mọc lên" từ 0.
  const rise = 1;
  const enter = li >= 2 ? ease(lf, 0, 45) : 0;
  const stakeX = 795 + (1 - enter) * 320;
  return (
    <g>
      <Cloud x={200 + ((bf * 0.6) % 700)} y={270} />
      <Cloud x={620 - ((bf * 0.4) % 500)} y={330} s={0.7} />
      <Sun x={150 + bf * 0.15} y={300} frame={frame} />
      <Pyramid apex={[440, 360]} left={200} right={560} side={680} rise={rise} />
      {li >= 1 ? (
        <>
          <DrawLine p={ease(lf, 0, 26)} x1={440} y1={360} x2={440} y2={GROUND} stroke={PARCHMENT.gold} strokeWidth={6} strokeDasharray="14 10" />
          <Pop p={pop(lf, fps, 18)} cx={500} cy={580}>
            <text x={456} y={592} fill={PARCHMENT.gold} fontSize={46 + wave(frame, 0.2, 3)} {...T}>
              H = ?
            </text>
          </Pop>
          {[0, 1, 2].map((i) => (
            <Pop key={i} p={pop(lf, fps, 26 + i * 6)} cx={600 + i * 60} cy={420}>
              <text x={590 + i * 60} y={440 + wave(frame, 0.15, 10, i * 2)} fill={PARCHMENT.cream} fontSize={44} {...T} opacity={0.75}>
                ?
              </text>
            </Pop>
          ))}
        </>
      ) : null}
      {li >= 2 ? (
        <>
          <Stickman x={740} y={GROUND} role="ancient" pose={enter < 1 ? "idle" : "eureka"} enter={enter} badge={enter >= 1 ? "1 CỌC!" : undefined} />
          <line x1={stakeX} y1={650} x2={stakeX} y2={GROUND} stroke={PARCHMENT.gold} strokeWidth={8} strokeLinecap="round" />
        </>
      ) : null}
      <Card
        title="📍 KIM TỰ THÁP GIZA · AI CẬP"
        formula={li === 0 ? "2.000 năm không ai đo được" : li === 1 ? "Chiều cao H = ?" : "1 chiếc cọc gỗ → H"}
        p={1}
        fp={li === 0 ? 1 : pop(lf, fps, 0)}
      />
    </g>
  );
};

const ThalesBarrier: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const xray = li >= 2 ? ease(lf, 0, 22) : 0;
  const ropeP = li === 0 ? ease(lf, 12, 50) : 1;
  return (
    <g>
      <polygon
        points={`450,360 210,${GROUND} 690,${GROUND}`}
        fill={xray > 0 ? `rgba(30,20,11,${0.75 * xray})` : "#9E7442"}
        stroke={PARCHMENT.cream}
        strokeWidth={4}
      />
      {xray < 1 ? <polygon points={`450,360 210,${GROUND} 690,${GROUND}`} fill="#9E7442" opacity={1 - xray} /> : null}
      {/* Cách 1: thả dây dọc sườn nghiêng */}
      {li <= 1 ? (
        <>
          <DrawLine p={ropeP} x1={450} y1={360} x2={690} y2={GROUND} stroke={li === 1 ? PARCHMENT.red : PARCHMENT.cream} strokeWidth={8} strokeLinecap="round" />
          <Pop p={pop(bf, fps, 4)} cx={450} cy={300}>
            <Stickman x={450} y={360} scale={0.5} role="ancient" pose={li === 1 ? "think" : "point"} />
          </Pop>
          {li === 1 ? (
            <>
              <DrawLine p={ease(lf, 6, 28)} x1={450} y1={360} x2={450} y2={GROUND} stroke={PARCHMENT.gold} strokeWidth={5} strokeDasharray="12 9" />
              <Cross x={600} y={600} p={pop(lf, fps, 30)} />
              <Fade p={ease(lf, 40, 14)} dy={16}>
                <text x={470} y={700} fill={PARCHMENT.gold} fontSize={34} {...T}>
                  H
                </text>
              </Fade>
            </>
          ) : null}
        </>
      ) : (
        <>
          {/* Cách 2: cắt lớp, tâm đáy nằm dưới khối đá */}
          {[430, 500, 570, 640, 710].map((y, i) => (
            <DrawLine key={i} p={ease(lf, 8 + i * 6, 16)} x1={260 + i * 22} y1={y} x2={640 - i * 22} y2={y} stroke="rgba(255,248,231,0.45)" strokeWidth={3} />
          ))}
          <DrawLine p={ease(lf, 30, 24)} x1={450} y1={360} x2={450} y2={GROUND} stroke={PARCHMENT.red} strokeWidth={5} strokeDasharray="10 8" />
          <circle cx={450} cy={GROUND} r={12 + wave(frame, 0.25, 4)} fill={PARCHMENT.red} opacity={ease(lf, 40, 10)} />
          <Cross x={450} y={560} p={pop(lf, fps, 50)} />
        </>
      )}
      {/* Mặt bằng đáy vuông: vẽ dần chu vi, tâm O hiện khi nói tới cách 2 */}
      <Pop p={pop(bf, fps, 8)} cx={484} cy={990}>
        <text x={484} y={862} textAnchor="middle" fill={PARCHMENT.red} fontSize={30} {...T}>
          {li <= 1 ? "✖ CÁCH 1: THẢ DÂY" : "✖ CÁCH 2: ĐO TỪ TÂM ĐÁY"}
        </text>
        <DrawPath p={ease(bf, 10, 40)} length={1040} d="M354 890 L614 890 L614 1150 L354 1150 Z" fill="rgba(245,197,66,0.12)" stroke={PARCHMENT.cream} strokeWidth={3} />
        {li >= 2 ? (
          <Pop p={pop(lf, fps, 20)} cx={484} cy={1020}>
            <circle cx={484} cy={1020} r={10 + wave(frame, 0.25, 3)} fill={PARCHMENT.red} />
            <text x={484} y={1000} textAnchor="middle" fill={PARCHMENT.gold} fontSize={26} {...T}>
              O
            </text>
          </Pop>
        ) : null}
        <text x={484} y={1180} textAnchor="middle" fill={PARCHMENT.cream} fontSize={24} {...T}>
          230m × 230m
        </text>
      </Pop>
    </g>
  );
};

const ThalesEureka: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  // Mặt Trời trượt xuống dần tới góc 45° ở câu 3.
  const sunT = li < 2 ? 0 : ease(lf, 0, 50);
  const sunX = interpolate(sunT, [0, 1], [300, 150]);
  const sunY = interpolate(sunT, [0, 1], [250, 360]);
  // Bóng kim tự tháp dài dần (câu 1), bóng cọc dài dần tới bằng cọc (câu 3).
  const pyrShadow = li === 0 ? ease(lf, 10, 70) : 1;
  const stakeDrop = li >= 1 ? pop(li === 1 ? lf : 999, fps, 4) : 0;
  const stakeShadow = li < 2 ? 0.45 : interpolate(ease(lf, 10, 50), [0, 1], [0.45, 1]);
  return (
    <g>
      <Sun x={sunX} y={sunY} frame={frame} p={pop(bf, fps, 0)} />
      {/* Tia nắng song song (câu 2) */}
      {li >= 1
        ? [0, 1, 2].map((i) => (
            <DrawLine
              key={i}
              p={li === 1 ? ease(lf, 20 + i * 12, 30) : 1}
              x1={180 + i * 150}
              y1={370 - i * 60}
              x2={610 + i * 150}
              y2={GROUND - i * 60 + 0}
              stroke={PARCHMENT.gold}
              strokeWidth={3.5}
              strokeDasharray="10 8"
              opacity={0.85}
            />
          ))
        : null}
      <Pyramid apex={[340, 510]} left={190} right={490} />
      <line x1={340} y1={510} x2={340} y2={GROUND} stroke={PARCHMENT.gold} strokeWidth={5} opacity={li >= 3 ? 1 : 0.5} />
      <DrawLine p={pyrShadow} x1={340} y1={GROUND} x2={610} y2={GROUND} stroke={PARCHMENT.cyan} strokeWidth={9} strokeLinecap="round" />
      {/* Chiếc cọc rơi cắm xuống cát + bóng cọc */}
      {stakeDrop > 0 ? (
        <g transform={`translate(0 ${(1 - Math.min(1, stakeDrop)) * -160})`}>
          <line x1={680} y1={670} x2={680} y2={GROUND} stroke={PARCHMENT.gold} strokeWidth={8} strokeLinecap="round" />
        </g>
      ) : null}
      {li >= 1 ? <DrawLine p={stakeShadow} x1={680} y1={GROUND} x2={790} y2={GROUND} stroke={PARCHMENT.cyan} strokeWidth={8} strokeLinecap="round" /> : null}
      {li >= 2 ? (
        <Pop p={pop(lf, fps, 50)} cx={560} cy={750}>
          <path d="M 560 780 A 50 50 0 0 0 575 745" fill="none" stroke={PARCHMENT.gold} strokeWidth={4} />
          <text x={520} y={740} fill={PARCHMENT.gold} fontSize={30} {...T}>
            45°
          </text>
        </Pop>
      ) : null}
      <Stickman
        x={845}
        y={GROUND}
        scale={0.8}
        role="ancient"
        pose={li >= 2 && lf > 55 ? "eureka" : li === 0 ? "think" : "point"}
        enter={li === 0 ? ease(lf, 0, 40) : 1}
        badge={li >= 2 && lf > 55 ? "45°!" : undefined}
      />
      {li < 3 ? (
        <Card
          title={li === 0 ? "👀 NHÌN VÀO BÓNG NẮNG" : li === 1 ? "☀ TIA NẮNG SONG SONG" : "💡 GÓC NẮNG 45°"}
          formula={li === 0 ? "Bóng tháp trên cát" : li === 1 ? "Mọi tia nắng // nhau" : "Bóng cọc = Cọc"}
          p={pop(bf, fps, 8)}
          fp={pop(lf, fps, 6)}
        />
      ) : (
        <Pop p={pop(lf, fps, 0)} cx={484} cy={990}>
          {/* Mặt bằng: nửa cạnh đáy + phần bóng nhô ra = H (số đếm dần) */}
          <rect x={100} y={840} width={768} height={300} rx={16} fill="rgba(35, 23, 13, 0.85)" stroke={PARCHMENT.gold} strokeWidth={3} />
          <rect x={150} y={880} width={300} height={220} fill="rgba(245,197,66,0.14)" stroke={PARCHMENT.cream} strokeWidth={3} />
          <DrawLine p={ease(lf, 10, 30)} x1={300} y1={990} x2={450} y2={990} stroke={PARCHMENT.gold} strokeWidth={8} />
          <DrawLine p={ease(lf, 45, 30)} x1={450} y1={990} x2={570} y2={990} stroke={PARCHMENT.cyan} strokeWidth={8} />
          <circle cx={300} cy={990} r={8} fill={PARCHMENT.gold} />
          <Fade p={ease(lf, 20, 14)} dy={10}>
            <text x={375} y={968} textAnchor="middle" fill={PARCHMENT.gold} fontSize={28} {...T}>
              {countUp(ease(lf, 20, 30), 115)}m
            </text>
          </Fade>
          <Fade p={ease(lf, 55, 14)} dy={10}>
            <text x={515} y={968} textAnchor="middle" fill={PARCHMENT.cyan} fontSize={28} {...T}>
              +{countUp(ease(lf, 55, 30), 31.6, 1)}m
            </text>
          </Fade>
          <Pop p={pop(lf, fps, 95)} cx={720} cy={1000}>
            <text x={720} y={1012} textAnchor="middle" fill={PARCHMENT.green} fontSize={44} {...T}>
              = {countUp(ease(lf, 95, 40), 146.6, 1)}m
            </text>
          </Pop>
        </Pop>
      )}
    </g>
  );
};

const ThalesTheorem: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const open = ease(bf, 0, 24);
  // Cọc DE trượt từ BC về vị trí D (câu 2).
  const dx = li === 0 ? 700 : li === 1 ? interpolate(ease(lf, 10, 45), [0, 1], [700, 460]) : 460;
  const ey = 710 - ((dx - 220) * 300) / 480;
  const blink = 0.55 + 0.45 * Math.abs(Math.sin(frame * 0.18));
  return (
    <g>
      <g transform={`translate(480 0) scale(${Math.max(0.001, open)} 1) translate(-480 0)`}>
        <rect x={120} y={335} width={720} height={415} rx={16} fill="rgba(255,248,231,0.1)" stroke={PARCHMENT.gold} strokeWidth={3} />
        <line x1={480} y1={345} x2={480} y2={740} stroke="rgba(245,197,66,0.25)" strokeWidth={2} />
      </g>
      <Fade p={li >= 2 ? ease(lf, 0, 14) : 0}>
        <text x={480} y={378} textAnchor="middle" fill={PARCHMENT.gold} fontSize={26} {...T}>
          📖 TOÁN 8 · ĐỊNH LÝ THALES
        </text>
      </Fade>
      <DrawLine p={ease(bf, 24, 20)} x1={220} y1={710} x2={700} y2={710} stroke={li === 2 ? PARCHMENT.gold : PARCHMENT.cream} strokeWidth={li === 2 ? 8 * blink : 4} />
      <DrawLine p={ease(bf, 40, 20)} x1={700} y1={710} x2={700} y2={410} stroke={PARCHMENT.gold} strokeWidth={6} />
      <DrawLine p={ease(bf, 56, 24)} x1={700} y1={410} x2={220} y2={710} stroke={PARCHMENT.cream} strokeWidth={4} />
      {li >= 1 ? (
        <>
          <line x1={dx} y1={710} x2={dx} y2={ey} stroke={PARCHMENT.cyan} strokeWidth={7} />
          {li === 2 ? <line x1={220} y1={716} x2={dx} y2={716} stroke={PARCHMENT.cyan} strokeWidth={8 * blink} /> : null}
          <text x={dx - 10} y={738} fill={PARCHMENT.cyan} fontSize={28} {...T}>
            D
          </text>
          <text x={dx - 15} y={ey - 12} fill={PARCHMENT.cyan} fontSize={28} {...T}>
            E
          </text>
        </>
      ) : null}
      <Fade p={ease(bf, 70, 12)}>
        {[
          ["A", 200, 738, PARCHMENT.cream],
          ["B", 712, 738, PARCHMENT.gold],
          ["C", 712, 420, PARCHMENT.gold],
        ].map(([t, x, y, c]) => (
          <text key={t as string} x={x as number} y={y as number} fill={c as string} fontSize={28} {...T}>
            {t}
          </text>
        ))}
      </Fade>
      <Stickman x={900} y={GROUND} scale={0.7} role="scholar" pose={li === 0 ? "think" : "point"} enter={ease(bf, 0, 40)} from={260} />
      <Card
        title={li === 2 ? "TOÁN 8 · ĐỊNH LÝ THALES" : "CÁCH CỦA THALES (THEO PLUTARCH)"}
        formula={li === 0 ? "Cọc ở mút bóng tháp" : li === 1 ? "H / Cọc = Bóng tháp / Bóng cọc" : "AD / AB = DE / BC"}
        size={li === 1 ? 34 : 42}
        p={pop(bf, fps, 30)}
        fp={pop(lf, fps, li === 0 ? 34 : li === 2 ? 10 : 30)}
      />
    </g>
  );
};

const ThalesRealworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const sway = wave(frame, 0.05, 2.5);
  const aim = li >= 1;
  return (
    <g>
      {/* Rừng: vài cây nhỏ phía sau, cây lim cổ thụ đung đưa */}
      {[180, 420, 840].map((x, i) => (
        <g key={x} transform={`rotate(${wave(frame, 0.05, 2, i)} ${x} ${GROUND})`} opacity={0.55}>
          <rect x={x - 10} y={GROUND - 170} width={20} height={170} fill="#4A321A" />
          <circle cx={x} cy={GROUND - 200} r={58} fill="#25472C" />
        </g>
      ))}
      <g transform={`rotate(${sway} 649 ${GROUND})`}>
        <rect x={630} y={440} width={38} height={340} fill="#5C3D1E" stroke={PARCHMENT.cream} strokeWidth={3} />
        <circle cx={649} cy={410} r={85} fill="#2D5A36" stroke={PARCHMENT.cream} strokeWidth={3.5} />
        <circle cx={610} cy={380} r={40} fill="#356B40" />
      </g>
      {/* Rừng tối, không có nắng */}
      <rect x={60} y={200} width={850} height={580} fill="rgba(10,8,5,0.25)" opacity={ease(bf, 0, 20)} />
      <Stickman x={250} y={GROUND} role="ranger" pose={aim ? "aimL" : "think"} enter={ease(bf, 0, 45)} from={-320} badge={aim ? "45°" : "?"} />
      {aim ? (
        <>
          <DrawLine p={ease(lf, 20, 40)} x1={308} y1={658} x2={649} y2={335} stroke={PARCHMENT.gold} strokeWidth={4} strokeDasharray="10 8" />
          <DrawLine p={ease(lf, 60, 30)} x1={308} y1={680} x2={649} y2={680} stroke={PARCHMENT.cyan} strokeWidth={4} strokeDasharray="6 6" />
          <Fade p={ease(lf, 80, 14)} dy={10}>
            <text x={470} y={720} textAnchor="middle" fill={PARCHMENT.cyan} fontSize={30} {...T}>
              d
            </text>
          </Fade>
          <DrawLine p={ease(lf, 100, 20)} x1={330} y1={GROUND} x2={330} y2={680} stroke={PARCHMENT.green} strokeWidth={5} />
        </>
      ) : null}
      <Card title="🌲 RỪNG RẬM, KHÔNG CÓ NẮNG" formula={!aim ? "Đo cây bằng gì?" : lf < 110 ? "Thước chữ L ngắm 45°" : "H = d + chiều cao mắt"}
        p={pop(bf, fps, 10)}
        fp={pop(lf, fps, !aim ? 10 : lf < 110 ? 6 : 110)}
      />
    </g>
  );
};

const ThalesCosmic: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  // Mặt Trăng quay quanh Trái Đất rồi trượt vào thẳng hàng (câu 2); câu 3 cả cảnh lùi xa dần.
  const orbit = frame * 0.05;
  const align = li >= 1 ? ease(li === 1 ? lf : 999, 0, 40) : 0;
  const mx = interpolate(align, [0, 1], [150 + Math.cos(orbit) * 110, 380]);
  const my = interpolate(align, [0, 1], [560 + Math.sin(orbit) * 70, 560]);
  const zoom = li === 2 ? interpolate(ease(lf, 0, 200), [0, 1], [1, 0.82]) : 1;
  return (
    <g>
      {Array.from({ length: 26 }, (_, i) => (
        <circle
          key={i}
          cx={80 + ((i * 137) % 820)}
          cy={230 + ((i * 89) % 520)}
          r={1.5 + (i % 3)}
          fill={PARCHMENT.cream}
          opacity={0.3 + 0.5 * Math.abs(Math.sin(frame * 0.07 + i))}
        />
      ))}
      <g transform={`translate(484 560) scale(${zoom}) translate(-484 -560)`}>
        <Pop p={pop(bf, fps, 4)} cx={150} cy={560}>
          <circle cx={150} cy={560} r={42} fill="#3A86FF" stroke={PARCHMENT.cream} strokeWidth={3} />
        </Pop>
        <Sun x={780} y={560} r={96} frame={frame} p={pop(bf, fps, 14)} />
        <circle cx={mx} cy={my} r={18} fill="#D9D9D9" stroke={PARCHMENT.cream} strokeWidth={2.5} opacity={ease(bf, 20, 10)} />
        {li >= 1 ? (
          <>
            <DrawLine p={ease(li === 1 ? lf : 999, 40, 30)} x1={150} y1={560} x2={780} y2={464} stroke={PARCHMENT.gold} strokeWidth={2.5} strokeDasharray="8 6" />
            <DrawLine p={ease(li === 1 ? lf : 999, 40, 30)} x1={150} y1={560} x2={780} y2={656} stroke={PARCHMENT.gold} strokeWidth={2.5} strokeDasharray="8 6" />
            <Pop p={pop(li === 1 ? lf : 999, fps, 70)} cx={780} cy={700}>
              <text x={780} y={712} textAnchor="middle" fill={PARCHMENT.gold} fontSize={30} {...T}>
                ~×400
              </text>
            </Pop>
          </>
        ) : null}
      </g>
      {li === 2 ? (
        <Stickman x={905} y={GROUND} scale={0.6} role="scholar" pose="eureka" enter={ease(lf, 0, 40)} from={260} badge="WOW!" />
      ) : null}
      <Card
        title="🌑 NHẬT THỰC TOÀN PHẦN"
        formula={li === 0 ? "Trăng che khít Mặt Trời?" : li === 1 ? (lf < 70 ? "Đất · Trăng · Trời thẳng hàng" : "To ~400 lần · Xa ~400 lần") : "1 cọc gỗ · 1 cái bóng · 1 tỉ lệ"}
        p={pop(bf, fps, 10)}
        fp={pop(lf, fps, li === 1 ? (lf < 70 ? 6 : 70) : 8)}
      />
    </g>
  );
};

const THALES: Record<string, React.FC<Anim>> = {
  hook: ThalesHook,
  barrier: ThalesBarrier,
  eureka: ThalesEureka,
  theorem: ThalesTheorem,
  realworld: ThalesRealworld,
  cosmic: ThalesCosmic,
};

// ---------------------------------------------------------------- tập 2..6: dữ liệu từng nhịp

/** Dữ liệu trực quan hoá cho tập 2 – 6. */
const CONFIG: Record<
  number,
  Record<string, { stageTitle: string; badge: string; role: "ancient" | "worker" | "ranger" | "scholar"; cardTitle: string; formula: string; note: string }>
> = {
  2: {
    hook: {
      stageTitle: "TRÁI ĐẤT HÌNH CẦU · NHƯNG TO CỠ NÀO?",
      badge: "BAO XA?",
      role: "ancient",
      cardTitle: "📍 ALEXANDRIA · KHOẢNG 240 TCN",
      formula: "1 giếng + 1 cọc → chu vi Trái Đất",
      note: "Đo cả Trái Đất mà không rời Ai Cập",
    },
    barrier: {
      stageTitle: "ĐI TRỌN MỘT VÒNG QUANH TRÁI ĐẤT MÀ ĐO?",
      badge: "KHÔNG THỂ",
      role: "ancient",
      cardTitle: "✖ ĐẠI DƯƠNG CHẮN MỌI LỐI",
      formula: "Vòng đầu tiên: năm 1522",
      note: "Gần 1.800 năm sau mới có người đi hết một vòng",
    },
    eureka: {
      stageTitle: "HẠ CHÍ · SYENE KHÔNG BÓNG, ALEXANDRIA CÓ BÓNG",
      badge: "7,2°!",
      role: "ancient",
      cardTitle: "💡 TIA NẮNG LỆCH KHỎI CỌC",
      formula: "7,2° = 360° : 50",
      note: "Tia nắng song song · bóng khác vì đất cong",
    },
    theorem: {
      stageTitle: "📖 TOÁN 7 · HAI ĐƯỜNG THẲNG SONG SONG",
      badge: "SO LE!",
      role: "scholar",
      cardTitle: "GÓC Ở TÂM = GÓC LỆCH BÓNG = 7,2°",
      formula: "5.000 × 50 = 250.000 stadion",
      note: "≈ 39.000–46.000 km · ngày nay ≈ 40.000 km",
    },
    realworld: {
      stageTitle: "⛵ NGẮM SAO BẮC CỰC TRÊN BIỂN",
      badge: "1°≈111KM",
      role: "ranger",
      cardTitle: "SAO CAO THÊM 1° → ĐI 1/360 VÒNG",
      formula: "40.000 km : 360 ≈ 111 km",
      note: "1 hải lý = 1.852 m ≈ 1 phút vĩ độ",
    },
    cosmic: {
      stageTitle: "☀️ CÙNG TỈ LỆ GÓC – CUNG · ĐO MẶT TRỜI",
      badge: "1,4TR KM",
      role: "scholar",
      cardTitle: "ĐƯỜNG KÍNH MẶT TRỜI",
      formula: "940 triệu km : 675 ≈ 1,4 triệu km",
      note: "Một cái giếng, một chiếc cọc, một góc lệch",
    },
  },
  3: {
    hook: {
      stageTitle: "SỢI DÂY 12 NÚT · GIẢ THUYẾT HAY SỰ THẬT?",
      badge: "12 NÚT?",
      role: "ancient",
      cardTitle: "📍 LƯỠNG HÀ · TẤM BẢNG 3.600 NĂM",
      formula: "Kẻ góc vuông chuẩn trên cánh đồng?",
      note: "Dây 3-4-5 Ai Cập: chỉ là giả thuyết",
    },
    barrier: {
      stageTitle: "SIPPAR · NGẮM BẰNG MẮT, LỆCH 1° TRÊN CẠNH 100 M",
      badge: "✖ 1,75 M",
      role: "ancient",
      cardTitle: "✖ NGẮM BẰNG MẮT HAY ƯỚM GÓC GẠCH",
      formula: "Lệch 1° → hở 1,75 m, mất ~87 m²",
      note: "Tranh chấp hàng chà là trên đường ranh",
    },
    eureka: {
      stageTitle: "BỘ BA SỐ 3 – 4 – 5 · ĐO ĐỘ DÀI, KHÔNG ĐO GÓC",
      badge: "90°!",
      role: "ancient",
      cardTitle: "💡 TẤM BẢNG SI.427 · NGƯỜI ĐO ĐẤT",
      formula: "3 + 4 + 5 = 12 khoảng → góc vuông",
      note: "30-40-50 m: dây lệch 5 cm → sai ~0,12°",
    },
    theorem: {
      stageTitle: "📖 SGK TOÁN LỚP 8 · ĐỊNH LÝ PYTHAGORAS",
      badge: "a²+b²=c²",
      role: "scholar",
      cardTitle: "ĐỊNH LÝ PYTHAGORAS ĐẢO (TOÁN 8)",
      formula: "3² + 4² = 9 + 16 = 25 = 5²",
      note: "Pythagoras sinh sau tấm bảng >1.000 năm",
    },
    realworld: {
      stageTitle: "🧱 CÔNG TRƯỜNG HÔM NAY · BẮT GÓC TƯỜNG 3-4-5",
      badge: "3-4-5 M",
      role: "worker",
      cardTitle: "THỢ XÂY KIỂM ĐƯỜNG CHÉO 5 MÉT",
      formula: "3-4-5 · 6-8-10 · 9-12-15 m",
      note: "Tường dài: nhân bộ số lên cho chuẩn",
    },
    cosmic: {
      stageTitle: "🛰️ TRẠM VŨ TRỤ · CHÂN TRỜI CÁCH BAO XA?",
      badge: "2.300 KM",
      role: "scholar",
      cardTitle: "TIA NHÌN VUÔNG GÓC BÁN KÍNH TRÁI ĐẤT",
      formula: "d² = 6.771² − 6.371² → d≈2.300km",
      note: "Từ sợi dây 12 nút tới quỹ đạo",
    },
  },
  4: {
    hook: {
      stageTitle: "ĐẢO SAMOS · HẦM DẪN NƯỚC XUYÊN NÚI ĐÁ VÔI",
      badge: "> 1 KM",
      role: "ancient",
      cardTitle: "📍 HẦM EUPALINOS · SAMOS (TK 6 TCN)",
      formula: "2 đội · 2 phía núi · gặp ở đâu?",
      note: "Đục bằng cuốc, búa, đục từ hai cửa A và B",
    },
    barrier: {
      stageTitle: "✖ NHẮM CHỪNG MÀ ĐÀO: LỆCH 1° LÀ TRƯỢT NHAU",
      badge: "✖ 9 M",
      role: "ancient",
      cardTitle: "✖ HẦM RỘNG 2 M · LỆCH 1° SAU ~500 M",
      formula: "500 m × tan 1° ≈ 9 m",
      note: "✖ La bàn chưa có, mà có cũng chưa biết hướng",
    },
    eureka: {
      stageTitle: "HERON: ĐI VÒNG QUANH NÚI BẰNG CÁC GÓC VUÔNG",
      badge: "△ VUÔNG!",
      role: "scholar",
      cardTitle: "💡 ĐƯỜNG HẦM = CẠNH HUYỀN",
      formula: "Tổng Đông–Tây · Tổng Bắc–Nam",
      note: "✔ Tam giác nhỏ cùng hình dạng chỉ hướng ở hai cửa",
    },
    theorem: {
      stageTitle: "📖 SGK TOÁN 10 · ĐỊNH LÝ CÔSIN & ĐỊNH LÝ SIN",
      badge: "COSIN!",
      role: "scholar",
      cardTitle: "MỐC C NHÌN THẤY CẢ HAI CỬA A, B",
      formula: "AB² = CA² + CB² − 2·CA·CB·cosC",
      note: "✔ AB/sinC = CB/sinA → góc A = hướng đào",
    },
    realworld: {
      stageTitle: "🌊 HẦM EO BIỂN MANCHE · ĐÀO TỪ BỜ ANH & BỜ PHÁP",
      badge: "~38 KM",
      role: "worker",
      cardTitle: "LƯỚI TAM GIÁC NỐI MỐC HAI BỜ",
      formula: "1990: gặp nhau, lệch vài chục cm",
      note: "✔ Mốc đo hai bờ chung một lưới, có vệ tinh hỗ trợ",
    },
    cosmic: {
      stageTitle: "🌕 BERLIN & MŨI HẢO VỌNG CÙNG NGẮM MẶT TRĂNG",
      badge: "1751",
      role: "scholar",
      cardTitle: "TAM GIÁC TRÁI ĐẤT – MẶT TRĂNG",
      formula: "Cạnh đáy + 2 góc → khoảng cách",
      note: "✔ Như hai đội thợ Samos: một tam giác ngoài núi",
    },
  },
  5: {
    hook: {
      stageTitle: "VƯƠNG MIỆN DÂNG THẦN CỦA VUA HIERO II",
      badge: "PHA BẠC?",
      role: "ancient",
      cardTitle: "📍 SYRACUSE · SICILY · ~250 TCN",
      formula: "Bớt vàng, bù bạc: cân vẫn đủ?",
      note: "Theo Vitruvius kể lại",
    },
    barrier: {
      stageTitle: "✖ CÂN KHÔ BẰNG NHAU · ✖ THƯỚC BÓ TAY",
      badge: "✖ BẾ TẮC",
      role: "ancient",
      cardTitle: "✖ CÂN VÀ THƯỚC ĐỀU VÔ ÍCH",
      formula: "Cùng cân nặng: pha bạc thì to hơn",
      note: "Cùng một khối, bạc nặng chừng nửa vàng",
    },
    eureka: {
      stageTitle: "🛁 NƯỚC TRÀN → ⚖️ CÂN NHÚNG TRONG NƯỚC",
      badge: "EUREKA!",
      role: "ancient",
      cardTitle: "💡 VƯƠNG MIỆN 1 KG · TRÁO 300 G BẠC",
      formula: "Nước tràn: 0,4 mm · Cân: 13 g",
      note: "Cách cân trong nước: giả thuyết Galileo 1586",
    },
    theorem: {
      stageTitle: "📖 KHTN 8 · LỰC ĐẨY ARCHIMEDES",
      badge: "FA=d·V",
      role: "scholar",
      cardTitle: "LỰC ĐẨY = TRỌNG LƯỢNG NƯỚC BỊ CHIẾM",
      formula: "FA = d · V",
      note: "Thêm 13 cm³ nước → nâng thêm 13 g",
    },
    realworld: {
      stageTitle: "⚖️ CÂN THỦY TĨNH · ĐO TỈ LỆ MỠ CƠ THỂ",
      badge: "CÂN NƯỚC",
      role: "worker",
      cardTitle: "CÂN TRÊN CẠN, RỒI CÂN DƯỚI NƯỚC",
      formula: "Nhiều mỡ → to hơn → nhẹ dưới nước",
      note: "Chênh hai lần cân → thể tích cơ thể",
    },
    cosmic: {
      stageTitle: "🪐 SAO THỔ NỔI TRONG BỒN TẮM KHỔNG LỒ?",
      badge: "0,69 < 1",
      role: "scholar",
      cardTitle: "NẶNG GẤP 95 TRÁI ĐẤT MÀ NHẸ HƠN NƯỚC",
      formula: "D Sao Thổ ≈ 0,69 g/cm³ < D nước",
      note: "1 chiếc cân · 1 chậu nước · 0 vết xước",
    },
  },
  6: {
    hook: {
      stageTitle: "THÁCH ĐỐ 1696: MÁNG NÀO ĐƯA BI VỀ B NHANH NHẤT?",
      badge: "1696",
      role: "scholar",
      cardTitle: "📍 LỜI THÁCH ĐỐ CỦA BERNOULLI",
      formula: "A cao → B thấp: máng hình gì?",
      note: "Bỏ qua ma sát, chỉ có trọng lực kéo bi",
    },
    barrier: {
      stageTitle: "✖ MÁNG THẲNG CHẬM · ✖ RƠI ĐỨNG RỒI CHẠY NGANG",
      badge: "✖ THUA",
      role: "scholar",
      cardTitle: "✖ NGẮN NHẤT CHƯA CHẮC NHANH NHẤT",
      formula: "Thẳng: dốc thoải, tăng tốc chậm",
      note: "Galileo 1638 đoán nhầm cung tròn là nhanh nhất",
    },
    eureka: {
      stageTitle: "💡 BI ĐI NHƯ TIA SÁNG → ĐƯỜNG CYCLOID",
      badge: "CYCLOID",
      role: "scholar",
      cardTitle: "💡 ĐIỂM TRÊN VÀNH BÁNH XE ĐANG LĂN",
      formula: "Dốc đứng lúc đầu → thoải dần về B",
      note: "Newton giải xong lúc 4 giờ sáng",
    },
    theorem: {
      stageTitle: "📖 VẬT LÍ 10 · ĐỊNH LUẬT BẢO TOÀN CƠ NĂNG",
      badge: "√2gh",
      role: "scholar",
      cardTitle: "TỐC ĐỘ CHỈ PHỤ THUỘC ĐỘ SÂU h",
      formula: "mgh = ½mv² → v = √2gh",
      note: "Máng uốn kiểu gì, cùng độ sâu thì cùng tốc độ",
    },
    realworld: {
      stageTitle: "🕰 ĐỒNG HỒ QUẢ LẮC HUYGENS 1673 · MÁ CONG CYCLOID",
      badge: "ĐÚNG NHỊP",
      role: "worker",
      cardTitle: "THẢ Ở ĐÂU CŨNG TỚI ĐÁY CÙNG LÚC",
      formula: "Thả cao hơn → dốc hơn → bù quãng",
      note: "Quả lắc đưa rộng hay hẹp vẫn cùng nhịp",
    },
    cosmic: {
      stageTitle: "🌍 HẦM XUYÊN LÒNG ĐẤT HÀ NỘI – TP HỒ CHÍ MINH",
      badge: "14 PHÚT",
      role: "scholar",
      cardTitle: "HẦM THẲNG HAY HẦM CONG?",
      formula: "Thẳng ~42 phút · Cong ~14 phút",
      note: "Hầm cong chúi sâu ~360 km rồi vòng lên",
    },
  },
  7: {
    hook: {
      stageTitle: "BA CÁNH CỬA · MỘT CHIẾC XE · HAI CON DÊ",
      badge: "ĐỔI?",
      role: "worker",
      cardTitle: "📍 TẠP CHÍ PARADE · HOA KỲ · 1990",
      formula: "Người dẫn biết, luôn mở cửa có dê",
      note: "Bạn đổi hay giữ? Ghi vào bình luận!",
    },
    barrier: {
      stageTitle: "✖ CÒN HAI CỬA ĐÓNG THÌ 50/50?",
      badge: "✖ 50/50",
      role: "scholar",
      cardTitle: "~10.000 THƯ · ~1.000 TIẾN SĨ",
      formula: "2 cửa đóng ≠ mỗi cửa 1/2",
      note: "Erdős chỉ tin khi xem mô phỏng lặp lại",
    },
    eureka: {
      stageTitle: "💡 PHÓNG TO LÊN 100 CÁNH CỬA",
      badge: "99%!",
      role: "worker",
      cardTitle: "💡 MỞ 98 CỬA DÊ · CHỪA ĐÚNG 1 CỬA",
      formula: "Giữ 1/3 · Đổi 2/3",
      note: "300 ván: giữ thắng ~100, đổi thắng ~200",
    },
    theorem: {
      stageTitle: "📖 TOÁN 12 · XÁC SUẤT CÓ ĐIỀU KIỆN",
      badge: "P(A|B)",
      role: "scholar",
      cardTitle: "CHỌN CỬA 1 · NGƯỜI DẪN MỞ CỬA 3",
      formula: "P(A|B) = P(A∩B) : P(B)",
      note: "Cửa 1: 1/6 : 1/2 = 1/3 · Cửa 2: 1/3 : 1/2 = 2/3",
    },
    realworld: {
      stageTitle: "🧪 DƯƠNG TÍNH CHƯA CHẮC LÀ CÓ BỆNH",
      badge: "1/11",
      role: "worker",
      cardTitle: "VÍ DỤ GIẢ ĐỊNH · 1.000 NGƯỜI",
      formula: "1 bệnh thật + ~10 báo nhầm",
      note: "Sàng lọc bất thường → làm thêm xét nghiệm",
    },
    cosmic: {
      stageTitle: "🌊 TÌM XÁC AIR FRANCE 447 GIỮA ĐẠI TÂY DƯƠNG",
      badge: "1 TUẦN",
      role: "ranger",
      cardTitle: "4 ĐỢT TÌM HỤT CŨNG LÀ THÔNG TIN",
      formula: "Dò hụt → hạ xác suất vùng đó",
      note: "Tìm thấy 4/2011 · sâu hơn 4.000 m",
    },
  },
  8: {
    hook: {
      stageTitle: "BÚA VÀ LÔNG CHIM: CÁI NÀO CHẠM ĐẤT TRƯỚC?",
      badge: "CƯỢC ĐI!",
      role: "ranger",
      cardTitle: "📍 MẶT TRĂNG · APOLLO 15 · 2/8/1971",
      formula: "Búa? · Lông chim? · Cùng lúc?",
      note: "David Scott thả cả hai trước ống kính",
    },
    barrier: {
      stageTitle: "✖ VẬT NẶNG RƠI NHANH HƠN?",
      badge: "✖ NẶNG?",
      role: "ancient",
      cardTitle: "ARISTOTLE · HƠN 2.300 NĂM TRƯỚC",
      formula: "Nặng gấp đôi → rơi nhanh gấp đôi?",
      note: "Ngoài đời: đá rơi nhanh hơn lá thật",
    },
    eureka: {
      stageTitle: "THÁP PISA: TƯƠNG TRUYỀN · MÁNG NGHIÊNG: CÓ THẬT",
      badge: "EUREKA!",
      role: "scholar",
      cardTitle: "💡 GALILEO · MÁNG NGHIÊNG · ~1604",
      formula: "1 nhịp→1 · 2 nhịp→4 · 3 nhịp→9",
      note: "1971: búa và lông chạm đất cùng lúc",
    },
    theorem: {
      stageTitle: "📖 VẬT LÍ 10 · SỰ RƠI TỰ DO",
      badge: "s=½gt²",
      role: "scholar",
      cardTitle: "CHỈ CÒN TRỌNG LỰC: MỌI VẬT CÙNG g",
      formula: "s = ½ g t²",
      note: "Mặt Trăng g ≈ 1,62 m/s²: 1,6 m mất ~1,4 s",
    },
    realworld: {
      stageTitle: "📚 TỜ GIẤY TRÊN CUỐN SÁCH · THÁP RƠI NASA",
      badge: "THỬ NGAY",
      role: "worker",
      cardTitle: "SÁCH RẼ KHÔNG KHÍ CHO TỜ GIẤY",
      formula: "132 m chân không → 5,18 s",
      note: "Tháp rơi ở trung tâm NASA Glenn",
    },
    cosmic: {
      stageTitle: "🛰️ TRẠM VŨ TRỤ ISS ĐANG RƠI TỰ DO",
      badge: "≈ 90% g",
      role: "scholar",
      cardTitle: "RƠI MÃI MÀ KHÔNG CHẠM ĐẤT",
      formula: "Rơi xuống + lao ngang 28.000 km/h",
      note: "Một chiếc búa · một chiếc lông · cùng lúc",
    },
  },
  9: {
    hook: {
      stageTitle: "🍚 CƠM NGUỘI QUA ĐÊM: ĂN ĐƯỢC KHÔNG?",
      badge: "ĐẶT CƯỢC",
      role: "worker",
      cardTitle: "TIN ĐƯỢC · TIN ĐỒN · HAY TÙY?",
      formula: "Quyết định ở mấy tiếng sau tắt bếp",
      note: "Ghi lựa chọn vào bình luận trước",
    },
    barrier: {
      stageTitle: "✖ NẤU CHÍN LÀ SẠCH? · ✖ HÂM LẠI LÀ HỎNG?",
      badge: "✖ SAI CẢ",
      role: "worker",
      cardTitle: "BÀO TỬ BACILLUS CEREUS SỐNG SÓT",
      formula: "Lỗi ở cách cất, không ở lúc hâm",
      note: "Theo NHS và Cơ quan Tiêu chuẩn Thực phẩm Anh",
    },
    eureka: {
      stageTitle: "🛡️ BÀO TỬ MẶC ÁO GIÁP · 1 → 16 TRIỆU",
      badge: "121 °C",
      role: "scholar",
      cardTitle: "NỒI CƠM 100 °C · DIỆT BÀO TỬ 121 °C",
      formula: "8 giờ ÷ 20 phút = 24 lần chia",
      note: "Lý thuyết: 2²⁴ ≈ 16,8 triệu · độc tố bền nhiệt",
    },
    theorem: {
      stageTitle: "📖 SINH HỌC 10 · BÀI 21 · VI SINH VẬT",
      badge: "N₀·2ⁿ",
      role: "scholar",
      cardTitle: "NỘI BÀO TỬ & THỜI GIAN THẾ HỆ",
      formula: "N = N₀ · 2ⁿ",
      note: "Ví dụ trong sách: E. coli chia đôi sau 20 phút",
    },
    realworld: {
      stageTitle: "🧊 NGUỘI NHANH · TỦ LẠNH · 24 GIỜ",
      badge: "4 BƯỚC",
      role: "worker",
      cardTitle: "XỚI RA · CHIA NHỎ · CẤT NGAY",
      formula: "Nguội 1 giờ · ăn trong 24 giờ",
      note: "Theo Food Standards Scotland và NHS",
    },
    cosmic: {
      stageTitle: "🏙️ BẾP NHÀ HÀNG: TRÊN 60 °C HOẶC ≤ 4 °C",
      badge: "TÙY!",
      role: "ranger",
      cardTitle: "PHÁN QUYẾT: TÙY!",
      formula: "Giữ nóng > 60 °C · giữ lạnh ≤ 4 °C",
      note: "Ăn được nếu nguội nhanh, cất lạnh, ăn trong 24h",
    },
  },
  10: {
    hook: {
      stageTitle: "CHARTLEY 1586 · THƯ MẬT GIẤU TRONG THÙNG BIA",
      badge: "1586",
      role: "ancient",
      cardTitle: "📍 THƯ MẬT CỦA NỮ HOÀNG MARY",
      formula: "Ký hiệu lạ + phép đếm = ?",
      note: "Phelippes vẽ giá treo cổ sau khi giải mã",
    },
    barrier: {
      stageTitle: "✖ THỬ TỪNG CÁCH THAY CHỮ CHO TỚI KHI RA NGHĨA",
      badge: "✖ 12 TỈ",
      role: "ancient",
      cardTitle: "✖ 26 CHỮ CÁI · ~4×10²⁶ CÁCH XẾP",
      formula: "26! ≈ 4 × 10²⁶ cách",
      note: "1 tỉ cách/giây → hơn 12 tỉ năm",
    },
    eureka: {
      stageTitle: "💡 AL-KINDI · BAGHDAD ~850: ĐỪNG THỬ, HÃY ĐẾM",
      badge: "E≈13%",
      role: "scholar",
      cardTitle: "💡 KÝ HIỆU HAY GẶP NHẤT ≈ CHỮ E",
      formula: "E ≈ 12,7% · J+Q+X+Z < 1%",
      note: "Đếm là chìa khoá đầu tiên, rồi đoán từ",
    },
    theorem: {
      stageTitle: "📖 TOÁN 9 · BẢNG TẦN SỐ VÀ BIỂU ĐỒ TẦN SỐ",
      badge: "TẦN SỐ",
      role: "scholar",
      cardTitle: "1.000 CHỮ CÁI TIẾNG ANH · CỘT E ≈ 127",
      formula: "Tần số = số lần xuất hiện",
      note: "Cột cao của bản mã khớp cột cao của ngôn ngữ",
    },
    realworld: {
      stageTitle: "🔤 HỘP CỜ SCRABBLE · CHỮ HAY GẶP THÌ RẺ",
      badge: "E = 1 Đ",
      role: "worker",
      cardTitle: "100 QUÂN CHỮ · E CÓ TỚI 12 QUÂN",
      formula: "Hay gặp → nhiều quân, ít điểm",
      note: "Q, Z: mỗi chữ một quân, điểm cao ngất",
    },
    cosmic: {
      stageTitle: "🖥 2023 · 57 LÁ THƯ MẬT TRONG KHO SỐ NƯỚC PHÁP",
      badge: "57 THƯ",
      role: "scholar",
      cardTitle: "MÃ ĐỒNG ÂM: 1 CHỮ, NHIỀU KÝ HIỆU",
      formula: "> 150.000 ký hiệu → ~50.000 từ",
      note: "Bắt đầu từ chiếc giá treo cổ trên lá thư 1586",
    },
  },
  11: {
    hook: {
      stageTitle: "SÉT ĐÁNH TRÚNG Ô TÔ · NGƯỜI TRONG XE VẪN ỔN?",
      badge: "ĐẶT CƯỢC",
      role: "worker",
      cardTitle: "❓ TIN ĐƯỢC HAY TIN ĐỒN?",
      formula: "Lốp cao su cách điện → an toàn?",
      note: "Ghi phe của bạn vào bình luận",
    },
    barrier: {
      stageTitle: "✖ SÉT ĐÃ XUYÊN HÀNG CÂY SỐ KHÔNG KHÍ",
      badge: "LỜI ĐỒN",
      role: "scholar",
      cardTitle: "KHÔNG KHÍ CŨNG LÀ CHẤT CÁCH ĐIỆN",
      formula: "Hàng km không khí ≫ lớp lốp",
      note: "Sét còn hay phá hỏng lốp qua lõi thép",
    },
    eureka: {
      stageTitle: "⚡ CHIẾC LỒNG CỦA FARADAY · LONDON 1836",
      badge: "EUREKA!",
      role: "scholar",
      cardTitle: "📍 VIỆN HOÀNG GIA · CẠNH ≈ 3,7 M",
      formula: "Ngoài: tia lửa · Trong: 0",
      note: "Theo chính Faraday kể lại",
    },
    theorem: {
      stageTitle: "📖 KHTN 8 · VẬT DẪN ĐIỆN, VẬT CÁCH ĐIỆN",
      badge: "DẪN ĐIỆN",
      role: "scholar",
      cardTitle: "VỎ Ô TÔ KÍN = LỒNG FARADAY",
      formula: "Sét → vỏ kim loại → đất",
      note: "Mui trần, vỏ sợi thủy tinh: không bảo vệ",
    },
    realworld: {
      stageTitle: "🏍️ ĐI XE MÁY GIỮA ĐỒNG GẶP GIÔNG",
      badge: "TRÚ ĐÂU?",
      role: "ranger",
      cardTitle: "NGHE SẤM = ĐANG TRONG TẦM SÉT",
      formula: "Rời xe → nhà kiên cố / ô tô kín",
      note: "✖ Gốc cây, cột điện · chờ 30 phút",
    },
    cosmic: {
      stageTitle: "✈️ MÁY BAY: LỒNG FARADAY TRÊN TẦNG MÂY",
      badge: "TIN ĐỒN!",
      role: "scholar",
      cardTitle: "MỖI MÁY BAY: HƠN 1 LẦN SÉT/NĂM",
      formula: "Mũi, cánh → vỏ nhôm → đuôi",
      note: "Không nhờ lốp, nhờ lớp vỏ kim loại",
    },
  },
};


/** Tập 2..6: khung hình học chung, Milo đi vào và diễn theo nhịp, thẻ công thức bật ra. */
const TopicScene: React.FC<Anim & { day: number; beatKind: string }> = ({ day, beatKind, li, lf, bf, fps, frame }) => {
  const epCfg = CONFIG[day] ?? CONFIG[2];
  const info = epCfg[beatKind] ?? epCfg.hook;
  // Nhịp mở đầu hiện đủ ngay từ khung đầu tiên.
  const first = beatKind === "hook";
  const draw = first ? 1 : ease(bf, 10, 40);
  return (
    <g>
      <Pop p={first ? 1 : pop(bf, fps, 0)} cx={488} cy={440}>
        <rect x={96} y={330} width={784} height={220} rx={18} fill="rgba(28, 19, 11, 0.55)" stroke={PARCHMENT.gold} strokeWidth={2.5} />
        <text x={488} y={388} textAnchor="middle" fill={PARCHMENT.gold} fontSize={24} {...T}>
          {info.stageTitle}
        </text>
      </Pop>
      <g transform="translate(220, 420)">
        <DrawLine p={draw} x1={0} y1={95} x2={520} y2={95} stroke={PARCHMENT.cream} strokeWidth={3} strokeDasharray="8 6" />
        <DrawPath p={draw} length={760} d="M80 95 L260 15 L440 95 Z" fill="rgba(245,197,66,0.18)" stroke={PARCHMENT.gold} strokeWidth={3.5} />
        <circle cx={260} cy={15} r={8 + wave(frame, 0.2, 3)} fill={PARCHMENT.cyan} opacity={draw} />
        <circle cx={80} cy={95} r={8} fill={PARCHMENT.gold} opacity={draw} />
        <circle cx={440} cy={95} r={8} fill={PARCHMENT.gold} opacity={draw} />
      </g>
      <Stickman
        x={760}
        y={GROUND}
        role={info.role}
        pose={beatKind === "eureka" || beatKind === "cosmic" ? "eureka" : beatKind === "barrier" ? "think" : "point"}
        badge={first || ease(bf, 40, 1) >= 1 ? info.badge : undefined}
        enter={first ? 1 : ease(bf, 0, 40)}
      />
      <Card title={info.cardTitle} formula={info.formula} p={first ? 1 : pop(bf, fps, 12)} fp={first && li === 0 ? 1 : pop(lf, fps, li === 0 ? 20 : 0)} ok={beatKind !== "barrier"} size={30} />
    </g>
  );
};

/** Cảnh của tập: tập 1 có cảnh riêng từng nhịp, các tập khác dùng khung chung. Hạ cả sân khấu xuống STAGE_DROP. */
export const ParchmentScene: React.FC<ParchmentSceneProps> = ({ day, beatKind, lineIndex, beatFrame, lineFrame, fps }) => {
  const frame = useCurrentFrame();
  const a: Anim = { li: lineIndex, lf: lineFrame, bf: beatFrame, fps, frame };
  const Beat = day === 1 ? THALES[beatKind] : undefined;
  // Chuyển nhịp: cảnh mới trượt nhẹ lên và hiện dần.
  const enter = beatKind === "hook" ? 1 : ease(beatFrame, 0, 12);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <g transform={`translate(0 ${STAGE_DROP + (1 - enter) * 40})`} opacity={enter}>
        {Beat ? <Beat {...a} /> : <TopicScene {...a} day={day} beatKind={beatKind} />}
      </g>
    </svg>
  );
};
