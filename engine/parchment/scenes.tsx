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
      <Fade p={ease(bf, 16, 14)}>
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
        title="ĐỊNH LÝ THALES · DE // BC"
        formula={li === 0 ? "Đo lúc nào cũng được?" : li === 2 ? "BC = DE × AB / AD" : "AD / AB = DE / BC"}
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
                ×400
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
        formula={li === 0 ? "Trăng che khít Mặt Trời?" : li === 1 ? (lf < 70 ? "Đất · Trăng · Trời thẳng hàng" : "To gấp 400 · Xa gấp 400") : "1 chiếc cọc → cả vũ trụ"}
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
      stageTitle: "QUẢ ĐỊA CẦU · GIẾNG ĐÁ SYENE & GẬY GỖ ALEXANDRIA",
      badge: "40.000KM",
      role: "ancient",
      cardTitle: "📍 ALEXANDRIA · AI CẬP (240 TCN)",
      formula: "1 Cái giếng + 1 Chiếc gậy → Chu vi Trái Đất",
      note: "✔ Sai số chỉ ~1% khi chưa có vệ tinh hay bản đồ thế giới!",
    },
    barrier: {
      stageTitle: "TRƯA HẠ CHÍ: GIẾNG SYENE 0° BÓNG ≠ CỘT ALEXANDRIA ĐỔ BÓNG",
      badge: "LẠ THẬT!",
      role: "ancient",
      cardTitle: "✖ NẾU TRÁI ĐẤT PHẲNG: HAI NƠI PHẢI CÙNG KHÔNG CÓ BÓNG",
      formula: "Syene: Bóng = 0°  |  Alexandria (cách 800 km): Bóng nghiêng!",
      note: "✖ Bác bỏ hoàn toàn giả thuyết mặt đất phẳng!",
    },
    eureka: {
      stageTitle: "MẶT ĐẤT CONG · GÓC BÓNG NẮNG α = 7,2° = 1/50 VÒNG TRÒN",
      badge: "7,2°!",
      role: "ancient",
      cardTitle: "💡 GÓC LỆCH BÓNG GẬY TẠI ALEXANDRIA",
      formula: "α = 7,2° = 360° / 50  (1/50 vòng tròn)",
      note: "✔ Khoảng cách 800 km ứng với đúng 1/50 chu vi Trái Đất!",
    },
    theorem: {
      stageTitle: "📖 SGK TOÁN LỚP 7 · HAI ĐƯỜNG THẲNG SONG SONG",
      badge: "SO LE!",
      role: "scholar",
      cardTitle: "ĐỊNH LÝ HAI GÓC SO LE TRONG (TOÁN 7)",
      formula: "Góc tâm Trái Đất = 7,2° → C = 800 × 50 = 40.000 km",
      note: "✔ Vệ tinh hiện đại đo được 40.008 km (Chính xác 99,98%!)",
    },
    realworld: {
      stageTitle: "⛵ HÀNG HẢI CỔ ĐẠI · NGẮM GÓC SAO BẮC ĐẨU TRÊN BIỂN",
      badge: "VĨ ĐỘ!",
      role: "ranger",
      cardTitle: "ĐỊNH VỊ TRÊN ĐẠI DƯƠNG KHÔNG CẦN GPS",
      formula: "Góc cao Sao Bắc Đẩu (α) = Vĩ độ Bắc (φ)",
      note: "✔ Ứng dụng trực tiếp hai tia sáng song song từ vũ trụ!",
    },
    cosmic: {
      stageTitle: "🌕 ĐÊM NGUYỆT THỰC · BÓNG TRÁI ĐẤT IN LÊN MẶT TRĂNG",
      badge: "384.000KM",
      role: "scholar",
      cardTitle: "ĐO KHOẢNG CÁCH TỪ TRÁI ĐẤT LÊN MẶT TRĂNG",
      formula: "D_Đất ≈ 3,7 × D_Trăng → Khoảng cách ≈ 384.000 km",
      note: "✔ Từ chiếc gậy gỗ bước thẳng ra không gian liên hành tinh!",
    },
  },
  3: {
    hook: {
      stageTitle: "SỢI DÂY THỪNG 12 NÚT THẮT · NỀN MÓNG KIM TỰ THÁP",
      badge: "12 NÚT!",
      role: "ancient",
      cardTitle: "📍 THUNG LŨNG SÔNG NILE (2500 TCN)",
      formula: "Làm sao kẻ góc vuông 90,0° khi chưa có thước ê-ke?",
      note: "✔ Bí mật nằm trong sợi dây thừng thắt 12 nút cách đều nhau!",
    },
    barrier: {
      stageTitle: "LŨ SÔNG NILE XÓA BỜ RUỘNG · LỆCH 1° LÀ SẬP THÁP",
      badge: "✖ LỆCH 4M",
      role: "ancient",
      cardTitle: "✖ NGẮM BẰNG MẮT THƯỜNG TRÊN CẠNH MÓNG 230M",
      formula: "Sai lệch 1° → Hai góc tường lệch nhau 4 mét!",
      note: "✖ Đỉnh kim tự tháp sẽ bị xoắn lệch và sụp đổ!",
    },
    eureka: {
      stageTitle: "CĂNG DÂY THÀNH TAM GIÁC 3 – 4 – 5 KHOẢNG NÚT",
      badge: "90°!",
      role: "ancient",
      cardTitle: "💡 TUYỆT CHIÊU 'NHỮNG NGƯỜI CĂNG DÂY' AI CẬP",
      formula: "Cạnh 3 nút + Cạnh 4 nút + Cạnh 5 nút = 12 nút",
      note: "✔ Góc kẹp giữa cạnh 3 và cạnh 4 tự khóa cứng ở 90,0°!",
    },
    theorem: {
      stageTitle: "📖 SGK TOÁN LỚP 8 · ĐỊNH LÝ PYTHAGORAS THUẬN & ĐẢO",
      badge: "a²+b²=c²",
      role: "scholar",
      cardTitle: "ĐỊNH LÝ PYTHAGORAS ĐẢO (TOÁN 8)",
      formula: "3² + 4² = 9 + 16 = 25 = 5²  ⇔  Góc vuông 90°",
      note: "✔ Chứng minh hình học chặt chẽ cho sợi dây 12 nút!",
    },
    realworld: {
      stageTitle: "🧱 CÔNG TRƯỜNG HIỆN ĐẠI · MẸO THỢ XÂY BẮT GÓC MÓNG NHÀ",
      badge: "60-80-100",
      role: "worker",
      cardTitle: "QUY TẮC BẮT GÓC VUÔNG 60 – 80 – 100 CM",
      formula: "60² + 80² = 100²  →  Đường chéo đúng 100 cm",
      note: "✔ Góc tường nhà vuông chuẩn xác không lệch một ly!",
    },
    cosmic: {
      stageTitle: "✨ THỊ SAI VÌ SAO (STELLAR PARALLAX) · QUỸ ĐẠO TRÁI ĐẤT",
      badge: "VÌ SAO!",
      role: "scholar",
      cardTitle: "TAM GIÁC VUÔNG VŨ TRỤ ĐO KHOẢNG CÁCH CÁC VÌ SAO",
      formula: "Cạnh đáy R = 150 triệu km (Tháng 1 ↔ Tháng 7)",
      note: "✔ Đo chính xác những ngôi sao cách xa hàng chục năm ánh sáng!",
    },
  },
  4: {
    hook: {
      stageTitle: "ĐÀO HẦM XUYÊN NÚI DÀI 6,28 KM TỪ HAI SƯỜN ĐỐI DIỆN",
      badge: "6,28 KM",
      role: "worker",
      cardTitle: "📍 BÀI TOÁN ĐÀO HẦM HẢI VÂN & HẦM EUPALINOS",
      formula: "Khoan trong đá đặc không GPS → Làm sao gặp nhau ở giữa?",
      note: "✔ Độ lệch cho phép giữa lòng núi chỉ vài centimet!",
    },
    barrier: {
      stageTitle: "✖ LỆCH GÓC 0,5° SAU 3 KM → HAI ĐƯỜNG HẦM TRƯỢT NHAU 30M",
      badge: "✖ LỆCH 30M",
      role: "worker",
      cardTitle: "✖ KHÔNG THỂ NHÌN XUYÊN NÚI HAY CĂNG DÂY QUA ĐỈNH ĐÈO",
      formula: "Lệch 0,5° × 3.000m ≈ Trượt qua nhau 26–30 mét!",
      note: "✖ Biến một đường hầm xuyên núi thành hai cái hang cụt!",
    },
    eureka: {
      stageTitle: "LƯỚI TAM GIÁC NGOÀI SƯỜN NÚI · ĐỈNH MỐC C NHÌN THẤY A & B",
      badge: "△ABC!",
      role: "ancient",
      cardTitle: "💡 ĐI VÒNG QUA SƯỜN NÚI BẰNG TAM GIÁC TRẮC ĐỊA",
      formula: "Đo ngoài trời: Cạnh AC, Cạnh BC và Góc kẹp ∠C",
      note: "✔ Biến đường hầm ẩn AB thành cạnh thứ 3 của tam giác ABC!",
    },
    theorem: {
      stageTitle: "📖 SGK TOÁN LỚP 10 · ĐỊNH LÝ COSIN & ĐỊNH LÝ SIN",
      badge: "COSIN!",
      role: "scholar",
      cardTitle: "HỆ THỨC LƯỢNG TRONG TAM GIÁC (TOÁN 10)",
      formula: "AB² = AC² + BC² - 2·AC·BC·cosC  |  AB/sinC = BC/sinA",
      note: "✔ Tính chính xác chiều dài hầm & góc khoan tại hai cửa A, B!",
    },
    realworld: {
      stageTitle: "🔦 TIA LASER DẪN HƯỚNG & LƯỚI TAM GIÁC QUANH ĐÈO HẢI VÂN",
      badge: "LASER!",
      role: "worker",
      cardTitle: "KẾT HỢP LƯỚI TAM GIÁC LIÊN TIẾP & TIA LASER",
      formula: "Chuỗi △₁ → △₂ → △₃ khóa chặt tọa độ 2 cửa hầm",
      note: "✔ Máy đào tiến vào lòng núi bám sát tia laser từng milimet!",
    },
    cosmic: {
      stageTitle: "🌊 ĐƯỜNG HẦM EO BIỂN MANCHE DÀI 50 KM DƯỚI ĐÁY ĐẠI DƯƠNG",
      badge: "50 KM!",
      role: "worker",
      cardTitle: "SIÊU CÔNG TRÌNH NỐI ANH – PHÁP DƯỚI ĐÁY BIỂN",
      formula: "Dài 50 km + Cộng độ cong Trái Đất → Lệch tâm < 20 cm",
      note: "✔ Toán học giúp con người nhìn xuyên qua cả núi đá và đại dương!",
    },
  },
  5: {
    hook: {
      stageTitle: "VƯƠNG MIỆN VÀNG CỦA VUA HIERO II · NGHI ÁN PHA BẠC",
      badge: "THẬT/GIẢ?",
      role: "ancient",
      cardTitle: "📍 SYRACUSE · HY LẠP (250 TCN)",
      formula: "Kiểm tra vương miện có pha bạc không mà cấm làm trầy xước!",
      note: "✔ Thử thách lịch sử tạo nên tiếng reo EUREKA bất hủ!",
    },
    barrier: {
      stageTitle: "✖ CÂN NẶNG BẰNG HỆT 1 KG · HOA VĂN KHÔNG THỂ ĐO THỂ TÍCH",
      badge: "✖ BẾ TẮC",
      role: "ancient",
      cardTitle: "✖ CÂN KHÔ VÀ THƯỚC HÌNH HỌC ĐỀU BÓ TAY",
      formula: "Rút 100g Vàng + Bù 100g Bạc → Cân nặng vẫn đúng 1 kg!",
      note: "✖ Hàng trăm chiếc lá vàng chạm khắc không thể đo bằng thước!",
    },
    eureka: {
      stageTitle: "🛁 NƯỚC TRÀN BỒN TẮM & CÂN ĐÒN BẨY NHÚNG CHÌM TRONG NƯỚC",
      badge: "EUREKA!",
      role: "ancient",
      cardTitle: "💡 BẠC NHẸ HƠN VÀNG NÊN THỂ TÍCH PHÌNH TO HƠN",
      formula: "V_VươngMiện (pha bạc) > V_VàngRòng (cùng 1 kg)",
      note: "✔ Nhúng cân đòn bẩy vào nước: Vương miện bị nước đẩy bồng lên!",
    },
    theorem: {
      stageTitle: "📖 SGK VẬT LÝ LỚP 8 · LỰC ĐẨY ARCHIMEDES & ĐÒN BẨY",
      badge: "F_A = d·V",
      role: "scholar",
      cardTitle: "HAI ĐỊNH LUẬT KINH ĐIỂN TRONG VẬT LÝ LỚP 8",
      formula: "F_A = d · V   và   F₁ · l₁ = F₂ · l₂",
      note: "✔ Thể tích V lớn hơn → Lực đẩy F_A lớn hơn → Vạch trần gian lận!",
    },
    realworld: {
      stageTitle: "🚢 TÀU THÉP 100.000 TẤN NỔI TRÊN BIỂN & KHOANG DẰN TÀU NGẦM",
      badge: "100.000T",
      role: "worker",
      cardTitle: "TẠI SAO TÒA LÂU ĐÀI THÉP NỔI TRÊN ĐẠI DƯƠNG?",
      formula: "Khoang rỗng tăng V cực lớn → F_A = d_nước · V ≥ Trọng lượng tàu",
      note: "✔ Tàu ngầm bơm/xả nước vào khoang dằn để lặn xuống hoặc nổi lên!",
    },
    cosmic: {
      stageTitle: "🌍 'HÃY CHO TÔI MỘT ĐIỂM TỰA, TÔI SẼ NHẤC BỔNG TRÁI ĐẤT!'",
      badge: "10²³ LẦN!",
      role: "scholar",
      cardTitle: "TÍNH TOÁN CÁNH TAY ĐÒN NHẤC TRÁI ĐẤT LÊN 1 CM",
      formula: "M_Đất / m_người ≈ 10²³ → Quãng đường đẩy ≈ 1 tỷ năm ánh sáng!",
      note: "✔ Hoàn toàn đúng về toán học theo quy tắc Đòn bẩy Archimedes!",
    },
  },
  6: {
    hook: {
      stageTitle: "LỜI THÁCH ĐỐ BERNOULLI 1696: ĐƯỜNG NÀO LĂN TỪ A XUỐNG B NHANH NHẤT?",
      badge: "ĐUA 3 BI!",
      role: "scholar",
      cardTitle: "📍 BÀI TOÁN ĐƯỜNG ĐOẢN THỜI (1696)",
      formula: "Đường thẳng là ngắn nhất, nhưng có phải là NHANH NHẤT?",
      note: "✔ Bài toán khiến cả giới toán học châu Âu đau đầu!",
    },
    barrier: {
      stageTitle: "✖ ĐƯỜNG THẲNG TĂNG TỐC CHẬM · ĐƯỜNG VÕNG SÂU QUÁ DÀI",
      badge: "✖ THUA!",
      role: "scholar",
      cardTitle: "✖ TẠI SAO CẢ HAI PHƯƠNG ÁN QUEN THUỘC ĐỀU THUA?",
      formula: "Đường thẳng: Gia tốc nhỏ  |  Đường gấp khúc: Quãng đường quá xa",
      note: "✖ Ngắn nhất chưa chắc đã nhanh nhất khi có trọng lực!",
    },
    eureka: {
      stageTitle: "🎡 ĐƯỜNG CONG CYCLOID (ĐIỂM TRÊN VÀNH BÁNH XE LĂN) VỀ ĐÍCH ĐẦU TIÊN!",
      badge: "CYCLOID!",
      role: "scholar",
      cardTitle: "💡 ĐƯỜNG ĐOẢN THỜI & ĐẲNG THỜI CỦA ISAAC NEWTON",
      formula: "Dốc đứng lúc đầu lấy tốc độ + Uốn mượt giữ đà về đích!",
      note: "✔ Thả bi ở mọi vị trí trên máng Cycloid đều chạm đáy cùng lúc!",
    },
    theorem: {
      stageTitle: "📖 SGK TOÁN 9 & VẬT LÝ 10 · BẢO TOÀN CƠ NĂNG & PARABOL",
      badge: "y = ax²",
      role: "scholar",
      cardTitle: "CHUYỂN HÓA ĐỘ CAO THÀNH VẬN TỐC & HỘI TỤ TIÊU ĐIỂM",
      formula: "v = √(2gh)   |   Parabol y = ax² hội tụ tại Tiêu điểm F",
      note: "✔ Mọi tia song song chạm mặt Parabol đều gom về đúng 1 điểm!",
    },
    realworld: {
      stageTitle: "🏯 MÁI ĐÌNH CHÙA CỔ VIỆT NAM ('TÀU ĐAO LÁ MÁI') PHÓNG NƯỚC MƯA",
      badge: "MÁI ĐÌNH",
      role: "ancient",
      cardTitle: "TRÍ TUỆ KIẾN TRÚC CỔ CỦA ÔNG CHA TA",
      formula: "Mái cong dốc → Nước mưa trượt nhanh nhất & phóng xa móng gỗ!",
      note: "✔ Giữ chân cột gỗ đình chùa khô ráo suốt hàng trăm năm!",
    },
    cosmic: {
      stageTitle: "📡 CHẢO KÍNH THIÊN VĂN PARABOL THU SÓNG TỪ RÌA VŨ TRỤ 13 TỶ NĂM",
      badge: "13 TỶ NĂM",
      role: "scholar",
      cardTitle: "HỘI TỤ ÁNH SÁNG TỪ BUỔI BÌNH MINH CỦA VŨ TRỤ",
      formula: "Chảo Parabol 500m → Gom sóng thiên hà về Tiêu điểm F",
      note: "✔ Đôi khi một đường cong đúng quy luật mới đưa bạn đi xa nhất!",
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
