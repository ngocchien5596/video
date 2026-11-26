import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { countUp, DrawLine, DrawPath, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Card, CardFrame, Chalkboard, Cross, fitText, GROUND, linePose, poseAt, T } from "./kit.tsx";
import { INK, LAYOUT, PARCHMENT, STAGE_S, STAGE_TX, STAGE_TY } from "./ParchmentHud.tsx";
import { MontyDefs, MontyScene } from "./monty.tsx";
import * as E05 from "./ep05.tsx";
import * as E09 from "./ep09.tsx";
import * as E10 from "./ep10.tsx";
import * as E11 from "./ep11.tsx";
import * as E12 from "./ep12.tsx";
import * as E13 from "./ep13.tsx";
import * as E14 from "./ep14.tsx";
import * as E15 from "./ep15.tsx";

/** Tập có cảnh vẽ riêng (file epXX.tsx tự bật bằng READY). */
const CUSTOM: Partial<Record<number, React.FC<Anim & { beatKind: string }>>> = {
  1: MontyScene,
  // ep02–ep04.tsx (búa và lông chim, cơm nguội, thư mật Mary) thuộc các tập đã bỏ, không đăng ký.
  ...(E05.READY ? { 2: E05.Ep05Scene } : {}),
  ...(E09.READY ? { 9: E09.Ep09Scene } : {}),
  ...(E10.READY ? { 10: E10.Ep10Scene } : {}),
  ...(E11.READY ? { 11: E11.Ep11Scene } : {}),
  ...(E12.READY ? { 12: E12.Ep12Scene } : {}),
  ...(E13.READY ? { 13: E13.Ep13Scene } : {}),
  ...(E14.READY ? { 14: E14.Ep14Scene } : {}),
  ...(E15.READY ? { 15: E15.Ep15Scene } : {}),
};
import { MiloDefs, type Pose, Stickman } from "./Stickman.tsx";
import { TOPICS } from "./topics.ts";

/**
 * Sân khấu hình học của "Thiên Đường Kiến Thức". Bản vẽ dùng toạ độ gốc (mặt đất y = 780, rộng x 60..910),
 * được phóng lên tấm giấy da của khung (STAGE_S, STAGE_TX, STAGE_TY). Thẻ chữ vẽ theo toạ độ khung qua <Screen>.
 * Mọi hình chuyển động theo lời kể: `beatFrame` (khung hình kể từ đầu nhịp), `lineIndex` + `lineFrame` (câu đang đọc).
 */
export type BeatState = {
  beatKind: string;
  lineIndex: number;
  /** Số khung hình kể từ đầu nhịp. */
  beatFrame: number;
  /** Số khung hình kể từ đầu câu đang đọc. */
  lineFrame: number;
};

export type ParchmentSceneProps = BeatState & {
  day: number;
  beatProgress: number;
  fps: number;
  /** Nhịp vừa qua (trong lúc hoà cảnh sang nhịp mới). */
  prev?: BeatState | null;
};

/** Mặt Trời có tia sáng xoay chậm. */
const Sun: React.FC<{ x: number; y: number; r?: number; frame: number; p?: number; dark?: boolean }> = ({ x, y, r = 36, frame, p = 1, dark = false }) => (
  <Pop p={p} cx={x} cy={y}>
    <circle cx={x} cy={y} r={r * 2.1} fill={dark ? "rgba(245,197,66,0.15)" : "rgba(255,214,102,0.35)"} />
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
            stroke={dark ? PARCHMENT.gold : "#D88A12"}
            strokeWidth={5}
            strokeLinecap="round"
          />
        );
      })}
    </g>
    <circle cx={x} cy={y} r={r + wave(frame, 0.12, 2)} fill="#FFC93C" stroke={dark ? PARCHMENT.cream : "#B8650E"} strokeWidth={4} />
  </Pop>
);

/** Đám mây trôi ngang. */
const Cloud: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 12 Q -70 -10 -40 -14 Q -30 -36 0 -30 Q 20 -46 46 -26 Q 72 -24 66 0 Q 76 14 56 18 L -50 18 Q -66 18 -60 12 Z" fill="#FFFBF0" stroke={INK.soft} strokeWidth={3} />
  </g>
);

/** Kim tự tháp mọc lên từ mặt đất (rise 0 → 1). */
const Pyramid: React.FC<{ apex: [number, number]; left: number; right: number; side?: number; rise?: number }> = ({ apex, left, right, side, rise = 1 }) => (
  <g transform={`translate(0 ${GROUND}) scale(1 ${Math.max(0.001, rise)}) translate(0 ${-GROUND})`}>
    {side ? <polygon points={`${apex[0]},${apex[1]} ${right},${GROUND} ${side},${GROUND - 50}`} fill="#A8723C" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" /> : null}
    <polygon points={`${apex[0]},${apex[1]} ${left},${GROUND} ${right},${GROUND}`} fill="#D9A25C" stroke={INK.line} strokeWidth={4.5} strokeLinejoin="round" />
    {[0.25, 0.5, 0.75].map((k) => {
      const y = apex[1] + (GROUND - apex[1]) * k;
      const half = ((right - left) / 2) * k;
      return <line key={k} x1={apex[0] - half} y1={y} x2={apex[0] + half} y2={y} stroke="rgba(90,55,25,0.35)" strokeWidth={2.5} />;
    })}
  </g>
);

/** Chiếc cọc gỗ. */
const Stake: React.FC<{ x: number; top: number }> = ({ x, top }) => (
  <rect x={x - 6} y={top} width={12} height={GROUND - top} rx={3} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
);

// ---------------------------------------------------------------- tập 3: Thales đo kim tự tháp

const ThalesHook: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const enter = li >= 2 ? ease(lf, 0, 45) : 0;
  const stakeX = 818 + (1 - enter) * 320;
  return (
    <g>
      <Cloud x={200 + ((bf * 0.6) % 700)} y={230} />
      <Cloud x={640 - ((bf * 0.4) % 500)} y={300} s={0.7} />
      <Sun x={150 + bf * 0.15} y={260} frame={frame} />
      <Pyramid apex={[420, 340]} left={170} right={560} side={680} />
      {li >= 1 ? (
        <>
          <DrawLine p={ease(lf, 0, 26)} x1={420} y1={340} x2={420} y2={GROUND} stroke={INK.red} strokeWidth={6} strokeDasharray="14 10" />
          <Pop p={pop(lf, fps, 18)} cx={500} cy={560}>
            <rect x={440} y={515} width={150} height={66} rx={14} fill="#FFF6DD" stroke={INK.red} strokeWidth={4} />
            <text x={515} y={562} textAnchor="middle" fill={INK.red} fontSize={44 + wave(frame, 0.2, 2)} {...T}>
              H = ?
            </text>
          </Pop>
          {[0, 1, 2].map((i) => (
            <Pop key={i} p={pop(lf, fps, 26 + i * 6) * (li >= 2 ? 1 - ease(lf, 0, 10) : 1)} cx={600 + i * 60} cy={400}>
              <text x={590 + i * 60} y={420 + wave(frame, 0.15, 10, i * 2)} fill={INK.line} fontSize={46} {...T} opacity={0.7}>
                ?
              </text>
            </Pop>
          ))}
        </>
      ) : null}
      {li >= 2 ? (
        <>
          <Stickman
            x={720}
            y={GROUND}
            pose={enter < 1 ? "idle" : "eureka"}
            prevPose="idle"
            poseT={ease(lf, 45, 12)}
            enter={enter}
            badge="1 CỌC!"
            badgeP={pop(lf, fps, 50)}
          />
          <Stake x={stakeX} top={640} />
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
  const { x, y } = LAYOUT.card;
  return (
    <g>
      <Cloud x={160 + ((bf * 0.5) % 600)} y={220} s={0.8} />
      <polygon points={`450,340 190,${GROUND} 710,${GROUND}`} fill="#D9A25C" stroke={INK.line} strokeWidth={4.5} strokeLinejoin="round" />
      {xray > 0 ? <polygon points={`450,340 190,${GROUND} 710,${GROUND}`} fill={`rgba(60,38,18,${0.82 * xray})`} stroke={INK.line} strokeWidth={4.5} /> : null}
      {li <= 1 ? (
        <>
          <DrawLine p={ropeP} x1={450} y1={340} x2={710} y2={GROUND} stroke={li === 1 ? INK.red : INK.line} strokeWidth={8} strokeLinecap="round" />
          <Pop p={pop(bf, fps, 4)} cx={450} cy={280}>
            <Stickman x={450} y={342} scale={0.5} {...linePose(li, lf, ["point", "think"])} />
          </Pop>
          {li === 1 ? (
            <>
              <DrawLine p={ease(lf, 6, 28)} x1={450} y1={342} x2={450} y2={GROUND} stroke={INK.gold} strokeWidth={6} strokeDasharray="12 9" />
              <Cross x={610} y={590} p={pop(lf, fps, 30)} />
              <Fade p={ease(lf, 40, 14)} dy={16}>
                <text x={466} y={690} fill={INK.line} fontSize={40} {...T}>
                  H
                </text>
              </Fade>
            </>
          ) : null}
        </>
      ) : (
        <>
          {[420, 490, 560, 630, 700].map((yy, i) => (
            <DrawLine key={yy} p={ease(lf, 8 + i * 6, 16)} x1={262 + i * 26} y1={yy} x2={638 - i * 26} y2={yy} stroke="rgba(255,248,231,0.5)" strokeWidth={3} />
          ))}
          <DrawLine p={ease(lf, 30, 24)} x1={450} y1={340} x2={450} y2={GROUND} stroke={PARCHMENT.red} strokeWidth={6} strokeDasharray="10 8" />
          <circle cx={450} cy={GROUND - 6} r={12 + wave(frame, 0.25, 4)} fill={PARCHMENT.red} opacity={ease(lf, 40, 10)} />
          <Cross x={450} y={540} p={pop(lf, fps, 50)} />
        </>
      )}
      {/* Thẻ: mặt bằng đáy vuông (vẽ dần), tâm O hiện khi nói tới cách 2 */}
      <CardFrame p={pop(bf, fps, 8)} ok={false}>
        <DrawPath
          p={ease(bf, 10, 40)}
          length={760}
          d={`M${x + 70} ${y + 30} L${x + 260} ${y + 30} L${x + 260} ${y + 220} L${x + 70} ${y + 220} Z`}
          fill="rgba(245,197,66,0.14)"
          stroke={PARCHMENT.gold}
          strokeWidth={6}
        />
        {li >= 2 ? (
          <Pop p={pop(lf, fps, 20)} cx={x + 165} cy={y + 125}>
            <circle cx={x + 165} cy={y + 125} r={12 + wave(frame, 0.25, 3)} fill={PARCHMENT.red} />
            <text x={x + 165} y={y + 100} textAnchor="middle" fill={PARCHMENT.gold} fontSize={34} {...T}>
              O
            </text>
          </Pop>
        ) : null}
        <text x={x + 310} y={y + 100} fill={PARCHMENT.red} fontSize={40} {...T}>
          {li <= 1 ? "✖ CÁCH 1: THẢ DÂY" : "✖ CÁCH 2: TỪ TÂM ĐÁY"}
        </text>
        <text x={x + 310} y={y + 180} fill={PARCHMENT.cream} fontSize={50} {...T}>
          Đáy 230 m × 230 m
        </text>
      </CardFrame>
    </g>
  );
};

const ThalesEureka: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const sunT = li < 2 ? 0 : ease(lf, 0, 50);
  const sunX = interpolate(sunT, [0, 1], [300, 150]);
  const sunY = interpolate(sunT, [0, 1], [230, 340]);
  const pyrShadow = li === 0 ? ease(lf, 10, 70) : 1;
  const stakeDrop = li >= 1 ? pop(li === 1 ? lf : 999, fps, 4) : 0;
  const stakeShadow = li < 2 ? 0.45 : interpolate(ease(lf, 10, 50), [0, 1], [0.45, 1]);
  const { x, y } = LAYOUT.card;
  const pose =
    li === 0
      ? { pose: "think" as Pose }
      : li === 1
        ? { pose: "point" as Pose, prevPose: "think" as Pose, poseT: ease(lf, 0, 12) }
        : li === 2
          ? poseAt(lf, 55, "point", "eureka")
          : { pose: "present" as Pose, prevPose: "eureka" as Pose, poseT: ease(lf, 0, 14) };
  return (
    <g>
      <Sun x={sunX} y={sunY} frame={frame} p={pop(bf, fps, 0)} />
      {li >= 1
        ? [0, 1, 2].map((i) => (
            <DrawLine
              key={i}
              p={li === 1 ? ease(lf, 20 + i * 12, 30) : 1}
              x1={180 + i * 150}
              y1={370 - i * 60}
              x2={610 + i * 150}
              y2={GROUND - i * 60}
              stroke="#D88A12"
              strokeWidth={4}
              strokeDasharray="12 9"
            />
          ))
        : null}
      <Pyramid apex={[340, 500]} left={180} right={500} />
      <line x1={340} y1={500} x2={340} y2={GROUND} stroke={INK.red} strokeWidth={5} strokeDasharray="10 8" opacity={li >= 3 ? 1 : 0.6} />
      <DrawLine p={pyrShadow} x1={340} y1={GROUND - 3} x2={610} y2={GROUND - 3} stroke={INK.blue} strokeWidth={11} strokeLinecap="round" />
      {stakeDrop > 0 ? (
        <g transform={`translate(0 ${(1 - Math.min(1, stakeDrop)) * -160})`}>
          <Stake x={680} top={668} />
        </g>
      ) : null}
      {li >= 1 ? <DrawLine p={stakeShadow} x1={686} y1={GROUND - 3} x2={796} y2={GROUND - 3} stroke={INK.blue} strokeWidth={10} strokeLinecap="round" /> : null}
      {li >= 2 ? (
        <Pop p={pop(lf, fps, 50)} cx={560} cy={750}>
          <path d="M 556 780 A 50 50 0 0 0 571 745" fill="none" stroke={INK.gold} strokeWidth={5} />
          <text x={500} y={736} fill={INK.gold} fontSize={36} {...T}>
            45°
          </text>
        </Pop>
      ) : null}
      <Stickman x={850} y={GROUND} scale={0.8} {...pose} enter={li === 0 ? ease(lf, 0, 40) : 1} badge="45°!" badgeP={li === 2 && lf > 55 ? pop(lf, fps, 58) : 0} />
      {li < 3 ? (
        <Card
          title={li === 0 ? "👀 NHÌN VÀO BÓNG NẮNG" : li === 1 ? "☀ TIA NẮNG SONG SONG" : "💡 GÓC NẮNG 45°"}
          formula={li === 0 ? "Bóng tháp trên cát" : li === 1 ? "Mọi tia nắng // nhau" : "Bóng cọc = Cọc"}
          p={pop(bf, fps, 8)}
          fp={pop(lf, fps, 6)}
        />
      ) : (
        <CardFrame p={pop(lf, fps, 0)}>
          {/* Mặt bằng: nửa cạnh đáy + phần bóng nhô ra = H (số đếm dần) */}
          <rect x={x + 60} y={y + 40} width={230} height={170} fill="rgba(245,197,66,0.14)" stroke={PARCHMENT.cream} strokeWidth={3} />
          <DrawLine p={ease(lf, 10, 30)} x1={x + 175} y1={y + 150} x2={x + 290} y2={y + 150} stroke={PARCHMENT.gold} strokeWidth={9} />
          <DrawLine p={ease(lf, 45, 30)} x1={x + 290} y1={y + 150} x2={x + 400} y2={y + 150} stroke={PARCHMENT.cyan} strokeWidth={9} />
          <circle cx={x + 175} cy={y + 150} r={8} fill={PARCHMENT.gold} />
          <Fade p={ease(lf, 20, 14)} dy={10}>
            <text x={x + 232} y={y + 125} textAnchor="middle" fill={PARCHMENT.gold} fontSize={36} {...T}>
              {countUp(ease(lf, 20, 30), 115)} m
            </text>
          </Fade>
          <Fade p={ease(lf, 55, 14)} dy={10}>
            <text x={x + 350} y={y + 125} textAnchor="middle" fill={PARCHMENT.cyan} fontSize={36} {...T}>
              +{countUp(ease(lf, 55, 30), 31.6, 1)}
            </text>
          </Fade>
          <Pop p={pop(lf, fps, 95)} cx={x + 660} cy={y + 130}>
            <text x={x + 660} y={y + 150} textAnchor="middle" fill={PARCHMENT.green} fontSize={62} {...T}>
              = {countUp(ease(lf, 95, 40), 146.6, 1)} m
            </text>
          </Pop>
        </CardFrame>
      )}
    </g>
  );
};

const ThalesTheorem: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const open = ease(bf, 0, 24);
  const dx = li === 0 ? 700 : li === 1 ? interpolate(ease(lf, 10, 45), [0, 1], [700, 460]) : 460;
  const ey = 710 - ((dx - 220) * 300) / 480;
  const blink = 0.55 + 0.45 * Math.abs(Math.sin(frame * 0.18));
  return (
    <g>
      <Chalkboard x={100} y={320} w={660} h={440} open={open} />
      <Fade p={li >= 2 ? ease(lf, 0, 14) : 0}>
        <text x={430} y={370} textAnchor="middle" fill={PARCHMENT.gold} fontSize={32} {...T}>
          📖 TOÁN 8 · ĐỊNH LÝ THALES
        </text>
      </Fade>
      <DrawLine p={ease(bf, 24, 20)} x1={180} y1={710} x2={660} y2={710} stroke={li === 2 ? PARCHMENT.gold : PARCHMENT.cream} strokeWidth={li === 2 ? 8 * blink : 5} />
      <DrawLine p={ease(bf, 40, 20)} x1={660} y1={710} x2={660} y2={410} stroke={PARCHMENT.gold} strokeWidth={6} />
      <DrawLine p={ease(bf, 56, 24)} x1={660} y1={410} x2={180} y2={710} stroke={PARCHMENT.cream} strokeWidth={5} />
      {li >= 1 ? (
        <>
          <line x1={dx - 40} y1={710} x2={dx - 40} y2={ey + 25} stroke={PARCHMENT.cyan} strokeWidth={7} />
          {li === 2 ? <line x1={180} y1={716} x2={dx - 40} y2={716} stroke={PARCHMENT.cyan} strokeWidth={8 * blink} /> : null}
          <text x={dx - 52} y={744} fill={PARCHMENT.cyan} fontSize={32} {...T}>
            D
          </text>
          <text x={dx - 56} y={ey + 10} fill={PARCHMENT.cyan} fontSize={32} {...T}>
            E
          </text>
        </>
      ) : null}
      <Fade p={ease(bf, 70, 12)}>
        {(
          [
            ["A", 152, 744, PARCHMENT.cream],
            ["B", 670, 744, PARCHMENT.gold],
            ["C", 672, 412, PARCHMENT.gold],
          ] as const
        ).map(([t, tx, ty, c]) => (
          <text key={t} x={tx} y={ty} fill={c} fontSize={32} {...T}>
            {t}
          </text>
        ))}
      </Fade>
      <Stickman x={850} y={GROUND} scale={0.8} {...(li === 0 ? { pose: "think" as Pose, prevPose: "present" as Pose, poseT: ease(lf, 0, 14) } : linePose(li, lf, ["think", "point", "point"]))} />
      <Card
        title={li === 2 ? "TOÁN 8 · ĐỊNH LÝ THALES" : "CÁCH CỦA THALES (THEO PLUTARCH)"}
        formula={li === 0 ? "Cọc ở mút bóng tháp" : li === 1 ? "H / Cọc = Bóng tháp / Bóng cọc" : "AD / AB = DE / BC"}
        p={pop(bf, fps, 30)}
        fp={pop(lf, fps, li === 0 ? 34 : li === 2 ? 10 : 30)}
      />
    </g>
  );
};

const Tree: React.FC<{ x: number; h: number; r: number; frame: number; i: number; fade?: number }> = ({ x, h, r, frame, i, fade = 1 }) => (
  <g transform={`rotate(${wave(frame, 0.05, 2, i)} ${x} ${GROUND})`} opacity={fade}>
    <rect x={x - 12} y={GROUND - h} width={24} height={h} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
    <circle cx={x} cy={GROUND - h - r * 0.4} r={r} fill="#5E8F4E" stroke={INK.line} strokeWidth={3.5} />
    <circle cx={x - r * 0.45} cy={GROUND - h - r * 0.75} r={r * 0.5} fill="#74A863" />
  </g>
);

const ThalesRealworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const sway = wave(frame, 0.05, 2.5);
  const aim = li >= 1;
  return (
    <g>
      <rect x={60} y={120} width={850} height={660} fill="rgba(40,60,30,0.16)" opacity={ease(bf, 0, 20)} />
      {[140, 420, 860].map((tx, i) => (
        <Tree key={tx} x={tx} h={150} r={60} frame={frame} i={i} fade={0.55} />
      ))}
      <g transform={`rotate(${sway} 649 ${GROUND})`}>
        <rect x={628} y={420} width={42} height={360} fill="#7A4E26" stroke={INK.line} strokeWidth={4} />
        <circle cx={649} cy={380} r={95} fill="#4E7D46" stroke={INK.line} strokeWidth={4} />
        <circle cx={608} cy={345} r={44} fill="#6A9B5A" />
      </g>
      <Stickman
        x={250}
        y={GROUND}
        {...linePose(li, lf, ["think", "aimL"])}
        enter={ease(bf, 0, 45)}
        from={-320}
        badge={aim ? "45°" : "?"}
        badgeP={aim ? pop(lf, fps, 10) : pop(bf, fps, 45)}
      />
      {aim ? (
        <>
          <DrawLine p={ease(lf, 20, 40)} x1={340} y1={505} x2={649} y2={300} stroke={INK.gold} strokeWidth={5} strokeDasharray="12 9" />
          <DrawLine p={ease(lf, 60, 30)} x1={340} y1={560} x2={649} y2={560} stroke={INK.blue} strokeWidth={5} strokeDasharray="8 7" />
          <Fade p={ease(lf, 80, 14)} dy={10}>
            <text x={490} y={606} textAnchor="middle" fill={INK.blue} fontSize={40} {...T}>
              d
            </text>
          </Fade>
          <DrawLine p={ease(lf, 100, 20)} x1={352} y1={GROUND} x2={352} y2={560} stroke={INK.green} strokeWidth={6} />
        </>
      ) : null}
      <Card
        title="🌲 RỪNG RẬM, KHÔNG CÓ NẮNG"
        formula={!aim ? "Đo cây bằng gì?" : lf < 110 ? "Thước chữ L ngắm 45°" : "H = d + chiều cao mắt"}
        p={pop(bf, fps, 10)}
        fp={pop(lf, fps, !aim ? 10 : lf < 110 ? 6 : 110)}
      />
    </g>
  );
};

const ThalesCosmic: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const orbit = frame * 0.05;
  const align = li >= 1 ? ease(li === 1 ? lf : 999, 0, 40) : 0;
  const mx = interpolate(align, [0, 1], [170 + Math.cos(orbit) * 110, 380]);
  const my = interpolate(align, [0, 1], [470 + Math.sin(orbit) * 70, 470]);
  const zoom = li === 2 ? interpolate(ease(lf, 0, 200), [0, 1], [1, 0.82]) : 1;
  return (
    <g>
      <rect x={70} y={132} width={830} height={600} rx={22} fill="#141B2E" stroke={INK.line} strokeWidth={4} opacity={ease(bf, 0, 12)} />
      {Array.from({ length: 30 }, (_, i) => (
        <circle
          key={i}
          cx={90 + ((i * 137) % 790)}
          cy={150 + ((i * 89) % 560)}
          r={1.5 + (i % 3)}
          fill={PARCHMENT.cream}
          opacity={0.3 + 0.5 * Math.abs(Math.sin(frame * 0.07 + i))}
        />
      ))}
      <g transform={`translate(484 470) scale(${zoom}) translate(-484 -470)`}>
        <Pop p={pop(bf, fps, 4)} cx={170} cy={470}>
          <circle cx={170} cy={470} r={46} fill="#3A86FF" stroke={PARCHMENT.cream} strokeWidth={3} />
          <path d="M 140 450 Q 160 440 172 456 Q 186 470 170 486 Q 150 492 144 474 Z" fill="#5CC27A" />
        </Pop>
        <Sun x={760} y={470} r={100} frame={frame} p={pop(bf, fps, 14)} dark />
        <circle cx={mx} cy={my} r={20} fill="#D9D9D9" stroke={PARCHMENT.cream} strokeWidth={2.5} opacity={ease(bf, 20, 10)} />
        {li >= 1 ? (
          <>
            <DrawLine p={ease(li === 1 ? lf : 999, 40, 30)} x1={170} y1={470} x2={760} y2={370} stroke={PARCHMENT.gold} strokeWidth={3} strokeDasharray="8 6" />
            <DrawLine p={ease(li === 1 ? lf : 999, 40, 30)} x1={170} y1={470} x2={760} y2={570} stroke={PARCHMENT.gold} strokeWidth={3} strokeDasharray="8 6" />
            <Pop p={pop(li === 1 ? lf : 999, fps, 70)} cx={560} cy={660}>
              <text x={560} y={672} textAnchor="middle" fill={PARCHMENT.gold} fontSize={40} {...T}>
                ~×400
              </text>
            </Pop>
          </>
        ) : null}
      </g>
      {li === 2 ? <Stickman x={310} y={GROUND} scale={0.75} pose="eureka" enter={ease(lf, 0, 40)} from={-300} badge="WOW!" badgeP={pop(lf, fps, 40)} /> : null}
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

// ---------------------------------------------------------------- cảnh chung cho các tập chưa có cảnh riêng

/** Biểu tượng của từng hồi (vẽ quanh tâm cx, cy): mở đầu = cuộn giấy dấu hỏi, rào cản = bức tường + ✖, eureka = bóng đèn sáng,
 * định lý = sách lật trang, đời thực = bánh răng, vũ trụ = hành tinh có vành. */
const Emblem: React.FC<{ kind: string; bf: number; fps: number; frame: number; text: string; first: boolean }> = ({ kind, bf, fps, frame, text, first }) => {
  const cx = 330;
  const big = fitText(text, 340, 56, 34);
  const label = (y: number, color: string, p: number) => (
    <Pop p={p} cx={cx} cy={y}>
      {big.lines.map((l, i) => (
        <text key={l} x={cx} y={y + i * big.size * 1.1} textAnchor="middle" fill={color} fontSize={big.size} {...T}>
          {l}
        </text>
      ))}
    </Pop>
  );
  if (kind === "barrier") {
    const rows = 6;
    return (
      <g>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => {
            const i = r * 5 + c;
            const p = first ? 1 : pop(bf, fps, 4 + i * 1.5);
            const bx = 110 + c * 88 + (r % 2 ? 44 : 0) - (r % 2 && c === 4 ? 0 : 0);
            const by = GROUND - 62 * (r + 1);
            if (r % 2 && c === 4) return null;
            return (
              <g key={i} transform={`translate(0 ${(1 - Math.min(1, p)) * -80})`} opacity={Math.min(1, p * 2)}>
                <rect x={bx} y={by} width={84} height={58} rx={5} fill={r % 3 === 0 ? "#B9653C" : "#C97A4A"} stroke={INK.line} strokeWidth={3.5} />
              </g>
            );
          }),
        )}
        <Cross x={cx} y={460} r={70} p={first ? 1 : pop(bf, fps, 55)} />
        {label(300, INK.red, first ? 1 : pop(bf, fps, 70))}
      </g>
    );
  }
  if (kind === "eureka") {
    const swing = wave(frame, 0.06, 8);
    const on = first ? 1 : ease(bf, 30, 14);
    return (
      <g>
        <g transform={`rotate(${swing} ${cx} 130)`}>
          <line x1={cx} y1={130} x2={cx} y2={300} stroke={INK.line} strokeWidth={5} />
          <circle cx={cx} cy={420} r={150 * on} fill="rgba(255,214,90,0.35)" />
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2 + frame * 0.01;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * 125}
                y1={420 + Math.sin(a) * 125}
                x2={cx + Math.cos(a) * (150 + wave(frame, 0.2, 10, i))}
                y2={420 + Math.sin(a) * (150 + wave(frame, 0.2, 10, i))}
                stroke="#D88A12"
                strokeWidth={7}
                strokeLinecap="round"
                opacity={on}
              />
            );
          })}
          <rect x={cx - 38} y={300} width={76} height={52} rx={8} fill="#9AA3A8" stroke={INK.line} strokeWidth={4} />
          <line x1={cx - 38} y1={318} x2={cx + 38} y2={318} stroke={INK.line} strokeWidth={3} />
          <line x1={cx - 38} y1={334} x2={cx + 38} y2={334} stroke={INK.line} strokeWidth={3} />
          <path d={`M ${cx - 40} 352 Q ${cx - 100} 400 ${cx - 70} 450 Q ${cx} 540 ${cx + 70} 450 Q ${cx + 100} 400 ${cx + 40} 352 Z`} fill={on > 0.5 ? "#FFE27A" : "#EFE6CF"} stroke={INK.line} strokeWidth={5} />
          <path d={`M ${cx - 14} 352 L ${cx - 14} 420 c 4 -14 8 14 10 0 c 2 -14 6 14 8 0 c 2 -14 6 14 10 0 L ${cx + 14} 352`} fill="none" stroke={on > 0.5 ? "#D86A12" : INK.soft} strokeWidth={4} />
        </g>
        {label(640, INK.gold, first ? 1 : pop(bf, fps, 40))}
      </g>
    );
  }
  if (kind === "theorem") {
    const flip = (bf % 70) / 70;
    const k = Math.cos(Math.min(1, flip * 1.6) * Math.PI);
    return (
      <g>
        <path d={`M ${cx - 230} 650 L ${cx + 230} 650 L ${cx + 190} 700 L ${cx - 190} 700 Z`} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
        <rect x={cx - 15} y={700} width={30} height={80} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
        <path d={`M ${cx} 300 Q ${cx - 120} 280 ${cx - 230} 300 L ${cx - 230} 640 Q ${cx - 120} 620 ${cx} 650 Z`} fill="#FFF8E7" stroke={INK.line} strokeWidth={4} />
        <path d={`M ${cx} 300 Q ${cx + 120} 280 ${cx + 230} 300 L ${cx + 230} 640 Q ${cx + 120} 620 ${cx} 650 Z`} fill="#FFF8E7" stroke={INK.line} strokeWidth={4} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={cx - 200} y1={350 + i * 45} x2={cx - 30} y2={350 + i * 45} stroke={INK.soft} strokeWidth={4} />
        ))}
        {flip < 0.62 ? (
          <g transform={`translate(${cx} 0) scale(${k} 1) translate(${-cx} 0)`}>
            <path d={`M ${cx} 300 Q ${cx + 120} 280 ${cx + 230} 300 L ${cx + 230} 640 Q ${cx + 120} 620 ${cx} 650 Z`} fill={k > 0 ? "#FFF8E7" : "#F1E2C0"} stroke={INK.line} strokeWidth={3} />
          </g>
        ) : null}
        {label(470, INK.blue, first ? 1 : pop(bf, fps, 30))}
      </g>
    );
  }
  if (kind === "realworld") {
    const gear = (gx: number, gy: number, r: number, teeth: number, rot: number, fill: string) => (
      <g transform={`rotate(${rot} ${gx} ${gy})`}>
        {Array.from({ length: teeth }, (_, i) => (
          <rect key={i} x={gx - 11} y={gy - r - 18} width={22} height={30} rx={4} fill={fill} stroke={INK.line} strokeWidth={3} transform={`rotate(${(i * 360) / teeth} ${gx} ${gy})`} />
        ))}
        <circle cx={gx} cy={gy} r={r} fill={fill} stroke={INK.line} strokeWidth={4} />
        <circle cx={gx} cy={gy} r={r * 0.35} fill="#F4E4C1" stroke={INK.line} strokeWidth={4} />
      </g>
    );
    return (
      <g>
        {gear(250, 440, 90, 12, bf * 1.2, "#C9A45C")}
        {gear(410, 590, 62, 9, -bf * 1.75 + 20, "#9AA3A8")}
        <g transform={`rotate(${wave(frame, 0.08, 10)} 470 360)`}>
          <rect x={460} y={260} width={20} height={150} rx={8} fill="#7E8A90" stroke={INK.line} strokeWidth={4} />
          <path d="M 440 250 A 30 30 0 1 1 500 250 L 486 268 L 454 268 Z" fill="#7E8A90" stroke={INK.line} strokeWidth={4} />
        </g>
        {label(720, INK.green, first ? 1 : pop(bf, fps, 30))}
      </g>
    );
  }
  if (kind === "cosmic") {
    const a = frame * 0.03;
    return (
      <g>
        <circle cx={cx} cy={430} r={250} fill="#18213A" stroke={INK.line} strokeWidth={5} />
        {Array.from({ length: 22 }, (_, i) => {
          const sx = cx - 220 + ((i * 97) % 440);
          const sy = 220 + ((i * 61) % 420);
          return Math.hypot(sx - cx, sy - 430) < 235 ? (
            <circle key={i} cx={sx} cy={sy} r={2 + (i % 3)} fill={PARCHMENT.cream} opacity={0.3 + 0.6 * Math.abs(Math.sin(frame * 0.08 + i))} />
          ) : null;
        })}
        <ellipse cx={cx} cy={430} rx={150} ry={36} fill="none" stroke="#E8C77A" strokeWidth={10} transform={`rotate(-14 ${cx} 430)`} />
        <circle cx={cx} cy={430} r={90} fill="#E2A65A" stroke={PARCHMENT.cream} strokeWidth={4} />
        <path d={`M ${cx - 86} 410 Q ${cx} 395 ${cx + 86} 410 M ${cx - 88} 450 Q ${cx} 470 ${cx + 88} 448`} stroke="#B8763A" strokeWidth={8} fill="none" />
        <path d={`M ${cx - 150} 430 A 150 36 0 0 0 ${cx + 150} 430`} fill="none" stroke="#E8C77A" strokeWidth={10} transform={`rotate(-14 ${cx} 430)`} />
        <circle cx={cx + Math.cos(a) * 200} cy={430 + Math.sin(a) * 70} r={18} fill="#D9D9D9" stroke={PARCHMENT.cream} strokeWidth={2.5} />
        {label(740, INK.line, first ? 1 : pop(bf, fps, 30))}
      </g>
    );
  }
  // hook: cuộn giấy mở ra, dấu hỏi lớn nhún nhảy
  const unroll = first ? 1 : ease(bf, 0, 30);
  const half = 230 * unroll;
  return (
    <g>
      <rect x={cx - half} y={250} width={half * 2} height={400} fill="#FFF8E7" stroke={INK.line} strokeWidth={4} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={cx - half + 30} y1={540 + i * 26} x2={cx + half - 30} y2={540 + i * 26} stroke={INK.soft} strokeWidth={4} opacity={unroll} />
      ))}
      <rect x={cx - half - 22} y={232} width={26} height={436} rx={12} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <rect x={cx + half - 4} y={232} width={26} height={436} rx={12} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <Fade p={unroll}>
        <text x={cx} y={470 + wave(frame, 0.15, 10)} textAnchor="middle" fill={INK.red} fontSize={200} {...T} transform={`rotate(${wave(frame, 0.1, 6)} ${cx} 420)`}>
          ?
        </text>
      </Fade>
      {label(160, INK.line, first ? 1 : pop(bf, fps, 25))}
    </g>
  );
};

const BEAT_ORDER = ["hook", "barrier", "eureka", "theorem", "realworld", "cosmic"];

const TOPIC_POSE: Record<string, Pose> = {
  hook: "present",
  barrier: "think",
  eureka: "eureka",
  theorem: "point",
  realworld: "present",
  cosmic: "point",
};

/** Cảnh chung: biểu tượng của hồi (bên trái), Milo đi vào và diễn theo hồi (bên phải), thẻ chữ ở dưới. */
const TopicScene: React.FC<Anim & { day: number; beatKind: string }> = ({ day, beatKind, li, lf, bf, fps, frame }) => {
  const epCfg = TOPICS[day] ?? TOPICS[4];
  const info = epCfg[beatKind] ?? epCfg.hook;
  const first = beatKind === "hook";
  const pose = TOPIC_POSE[beatKind] ?? "point";
  // Milo đứng yên một chỗ suốt tập; sang hồi mới thì chuyển dần từ tư thế của hồi trước.
  const prevKind = BEAT_ORDER[BEAT_ORDER.indexOf(beatKind) - 1];
  return (
    <g>
      {/* Hậu cảnh: đồi xa nhạt màu */}
      <path d="M 60 700 Q 200 600 360 680 Q 520 610 700 690 Q 820 640 910 670 L 910 780 L 60 780 Z" fill="rgba(160,120,70,0.16)" />
      <Emblem kind={beatKind} bf={bf} fps={fps} frame={frame} text={info.badge} first={first} />
      <Stickman
        x={770}
        y={GROUND}
        pose={pose}
        prevPose={prevKind ? TOPIC_POSE[prevKind] : undefined}
        poseT={ease(bf, 4, 16)}
      />
      <Card title={info.cardTitle} formula={info.formula} p={first ? 1 : pop(bf, fps, 12)} fp={first && li === 0 ? 1 : li === 0 ? pop(lf, fps, 20) : 1} ok={beatKind !== "barrier"} />
    </g>
  );
};

const BeatView: React.FC<{ day: number; s: BeatState; fps: number; frame: number }> = ({ day, s, fps, frame }) => {
  const a: Anim = { li: s.lineIndex, lf: s.lineFrame, bf: s.beatFrame, fps, frame };
  const Custom = CUSTOM[day];
  if (Custom) return <Custom beatKind={s.beatKind} {...a} />;
  const Beat = day === 3 ? THALES[s.beatKind] : undefined;
  return Beat ? <Beat {...a} /> : <TopicScene {...a} day={day} beatKind={s.beatKind} />;
};

/** Thời lượng hoà cảnh giữa hai nhịp (khung). */
export const BEAT_DISSOLVE = 14;

/** Cảnh của tập: tập 1 (Monty Hall) và tập 3 (Thales) có cảnh riêng từng nhịp, các tập khác dùng khung chung. */
export const ParchmentScene: React.FC<ParchmentSceneProps> = ({ day, fps, prev, ...cur }) => {
  const frame = useCurrentFrame();
  const enter = cur.beatKind === "hook" || !prev ? 1 : ease(cur.beatFrame, 0, BEAT_DISSOLVE);
  const stage = `translate(${STAGE_TX} ${STAGE_TY}) scale(${STAGE_S})`;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <MiloDefs />
        <MontyDefs />
        <E05.Ep05Defs />
        <E09.Ep09Defs />
        <E10.Ep10Defs />
        <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <radialGradient id="chalk-smudge" cx="40%" cy="35%" r="80%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </radialGradient>
        <pattern id="hatch" width={12} height={12} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={12} stroke="rgba(59,38,20,0.55)" strokeWidth={4} />
        </pattern>
      </defs>
      {/* Cắt theo tấm giấy sân khấu + ô thẻ chữ: nhân vật đi vào từ mép giấy, không tràn ra nền gỗ */}
      <clipPath id="stage-clip">
        <rect x={LAYOUT.stage.x} y={LAYOUT.stage.y} width={LAYOUT.stage.w} height={LAYOUT.stage.h} rx={26} />
      </clipPath>
      <g clipPath="url(#stage-clip)">
        {prev && enter < 1 ? (
          <g transform={stage} opacity={1 - enter}>
            <BeatView day={day} s={prev} fps={fps} frame={frame} />
          </g>
        ) : null}
        <g transform={`translate(0 ${(1 - enter) * 24}) ${stage}`} opacity={enter}>
          <BeatView day={day} s={cur} fps={fps} frame={frame} />
        </g>
      </g>
    </svg>
  );
};
