/**
 * Sơ đồ "Vì sao thợ mỏ ngày xưa lại nuôi chuột dưới hầm lò?" (5 bước):
 *   0  Trước khi sập, đá nóc lò bị đè nứt dần, kêu lách tách; có tiếng nứt li ti cao vút tai người không nghe thấy
 *   1  Tai người nghe tới khoảng 20.000 Hz, tai chuột tới khoảng 76.000 Hz (gần gấp bốn)
 *   2  Chuột kéo nhau chạy ra, thợ mỏ bỏ đồ nghề chạy theo
 *   3  Chuột còn quanh quẩn kiếm ăn thì thợ mỏ yên tâm đào tiếp
 *   4  Chuột báo sập là kinh nghiệm truyền đời của thợ mỏ, khoa học chưa kiểm chứng
 * Nguồn: Li và cộng sự 2021 (Frontiers in Physics), Forinash & Christian (LibreTexts, Animal Hearing),
 * Denver Public Library, Minett Park, Thomas & Thomas (Kentucky Superstitions).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";
import { appearer, Arrow, Caption, clamp01, INK } from "./common.tsx";
import { Tag } from "./w7-parts.tsx";

const CAPTIONS = [
  "Đá nóc lò nứt dần trước khi sập",
  "Tai chuột nghe cao gần gấp 4",
  "Chuột chạy, thợ mỏ chạy theo",
  "Chuột còn đó: yên tâm đào tiếp",
  "Chuột báo sập: khoa học chưa kiểm chứng",
];

const RED = "#E5484D";
const SEA = "#3D7BD9";
const GREEN = "#2F9E44";
const ROCK = "#6B6157";
const ROCK_D = "#4A423A";
const RAT = "#8C7E73";

const Big: React.FC<{ x: number; y: number; text: string; size: number; color?: string; opacity?: number; anchor?: "start" | "middle" | "end" }> = ({
  x,
  y,
  text,
  size,
  color = INK,
  opacity = 1,
  anchor = "middle",
}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={TEXT_FONT} fontWeight="900" fontSize={size} fill={color} opacity={opacity}>
    {text}
  </text>
);

/** Con chuột nhìn sang phải (flip = nhìn sang trái); `run` 0..1 nhịp chân. */
const Rat: React.FC<{ x: number; y: number; s?: number; flip?: boolean; run?: number; ear?: number }> = ({ x, y, s = 1, flip, run = 0, ear = 1 }) => {
  const leg = Math.sin(run * Math.PI * 2) * 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M-46 -10 Q-80 -8 -96 -30" fill="none" strokeWidth="5" />
      <line x1={-22 + leg} y1="-4" x2={-26 + leg} y2="6" />
      <line x1={18 - leg} y1="-4" x2={22 - leg} y2="6" />
      <path d="M-50 -6 Q-50 -42 -6 -44 Q30 -44 42 -24 L60 -14 Q44 -2 20 -4 L-40 -4 Z" fill={RAT} />
      <ellipse cx="22" cy="-44" rx={13 * ear} ry={15 * ear} fill="#E9B8B0" />
      <circle cx="40" cy="-26" r="4" fill={INK} stroke="none" />
      <circle cx="60" cy="-14" r="4" fill="#E9B8B0" />
    </g>
  );
};

/** Thợ mỏ: mũ bảo hộ có đèn, áo xám; `run` > 0 thì chạy. */
const Miner: React.FC<{ x: number; y: number; s?: number; run?: number; flip?: boolean }> = ({ x, y, s = 1, run, flip }) => {
  const k = run === undefined ? 0 : Math.sin(run * Math.PI * 2) * 14;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="-8" y1="-40" x2={-14 - k} y2="0" />
      <line x1="8" y1="-40" x2={14 + k} y2="0" />
      <rect x="-20" y="-96" width="40" height="58" rx="10" fill="#7A8794" />
      <line x1="10" y1="-84" x2={34 + k * 0.6} y2={run === undefined ? -56 : -80} />
      <circle cx="0" cy="-116" r="20" fill="#F2C9A0" />
      <path d="M-24 -118 Q-22 -144 0 -144 Q22 -144 24 -118 Z" fill="#FFC83D" />
      <circle cx="20" cy="-128" r="6" fill="#FFF6D6" />
    </g>
  );
};

export const W2MineRatBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);

  return (
    <g>
      {/* Bước 0: nóc lò nứt dần, tiếng lách tách; có tiếng cao vút tai người không nghe */}
      {step === 0
        ? (() => {
            const crack = clamp01(stepFrame / 70);
            const ring = (frame % 30) / 30;
            return (
              <g>
                <path d="M20 60 L940 60 L940 150 Q700 175 480 160 Q260 175 20 150 Z" fill={ROCK} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
                <path
                  d="M300 72 L330 110 L310 135 L350 158 M600 70 L580 104 L620 128 L600 160"
                  fill="none"
                  stroke={INK}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - crack)}
                />
                {[0, 1].map((i) => (
                  <path
                    key={i}
                    d={`M${460 - 60 - i * 50} ${170 + ring * 60 + i * 30} Q460 ${210 + ring * 60 + i * 40} ${460 + 60 + i * 50} ${170 + ring * 60 + i * 30}`}
                    fill="none"
                    stroke={SEA}
                    strokeWidth="5"
                    opacity={(1 - ring) * crack}
                  />
                ))}
                <Big x={480} y={210} text="lách tách… răng rắc…" size={42} color={RED} opacity={appear(0, 25, 12)} />
                
                <g opacity={appear(0, 40, 14)}>
                  <Miner x={110} y={345} s={1.05} />
                  <Big x={190} y={275} text="?" size={60} color={SEA} />
                  <Rat x={800} y={340} s={1.6} ear={1 + 0.15 * Math.abs(Math.sin(frame / 6))} />
                  <Big x={915} y={280} text="!" size={70} color={RED} />
                </g>
              </g>
            );
          })()
        : null}

      {/* Bước 1: so tai người và tai chuột */}
      {step === 1
        ? (() => {
            const grow = clamp01(stepFrame / 40);
            const grow2 = clamp01((stepFrame - 30) / 50);
            return (
              <g>
                <Miner x={75} y={180} s={0.85} />
                <rect x={160} y={92} width={680 * 0.25 * grow} height={64} rx={10} fill={SEA} stroke={INK} strokeWidth="4" />
                <Big x={185 + 680 * 0.25 * grow} y={138} text="20.000 Hz" size={42} anchor="start" opacity={grow} />
                <Rat x={70} y={310} s={1.05} />
                <rect x={160} y={240} width={723 * grow2} height={64} rx={10} fill={RED} stroke={INK} strokeWidth="4" />
                <Big x={160 + 723 * grow2 - 18} y={286} text="76.000 Hz" size={42} color="#FFFFFF" anchor="end" opacity={clamp01(grow2 * 2 - 1)} />
                <Tag x={780} y={198} text="GẦN GẤP 4" size={38} color={RED} opacity={appear(1, 85, 14)} />
              </g>
            );
          })()
        : null}

      {/* Bước 2: chuột kéo nhau chạy ra, thợ mỏ chạy theo */}
      {step === 2
        ? (() => {
            const t = stepFrame;
            const ratX = (i: number) => 480 + ((t * 6 + i * 150) % 450);
            const minerX = 200 + Math.min(t * 3, 150);
            return (
              <g>
                <line x1={20} y1={330} x2={940} y2={330} stroke={INK} strokeWidth="5" />
                {[0, 1, 2].map((i) => (
                  <Rat key={i} x={ratX(i)} y={326} s={1.15} run={(t / 8 + i * 0.3) % 1} />
                ))}
                <Miner x={minerX} y={330} s={1.25} run={(t / 10) % 1} />
                <g opacity={appear(2, 30, 12)}>
                  <rect x={40} y={290} width={70} height={38} rx={6} fill="#9B8B7A" stroke={INK} strokeWidth="4" />
                  <line x1={52} y1={288} x2={96} y2={244} stroke={INK} strokeWidth="6" strokeLinecap="round" />
                </g>
                <Arrow x1={600} y1={200} x2={920} y2={200} color={RED} width={8} p={appear(2, 10, 16)} />
                <Big x={640} y={100} text="Chuột chạy ra" size={42} color={RED} opacity={appear(2, 5, 12)} />
                <Big x={640} y={150} text="thợ mỏ chạy theo!" size={42} color={RED} opacity={appear(2, 40, 12)} />
              </g>
            );
          })()
        : null}

      {/* Bước 3: chuột còn quanh quẩn kiếm ăn, thợ mỏ yên tâm đào tiếp */}
      {step === 3
        ? (() => {
            const dig = Math.sin(frame / 5) * 10;
            return (
              <g>
                <line x1={20} y1={330} x2={940} y2={330} stroke={INK} strokeWidth="5" />
                <path d="M20 330 L20 90 Q80 70 140 100 L160 330 Z" fill={ROCK_D} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
                <g transform={`rotate(${dig} 210 220)`}>
                  <Miner x={240} y={330} s={1.2} flip />
                  <line x1={190} y1={210} x2={150} y2={170} stroke={INK} strokeWidth="7" strokeLinecap="round" />
                  <path d="M140 150 L170 175 L150 200" fill="none" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
                </g>
                <Rat x={430} y={326} s={1.2} run={(frame / 20) % 1} />
                <Rat x={640} y={326} s={1.1} flip />
                <ellipse cx={535} cy={326} rx={22} ry={8} fill="#F2E6C9" stroke={INK} strokeWidth="3" />
                <Tag x={680} y={110} text="CHUỘT CÒN ĐÓ" size={38} opacity={appear(3, 10, 14)} />
                <Tag x={680} y={185} text="= YÊN TÂM" size={40} color={GREEN} opacity={appear(3, 35, 14)} />
              </g>
            );
          })()
        : null}

      {/* Bước 4: chuột báo sập là kinh nghiệm truyền đời, khoa học chưa kiểm chứng */}
      {step === 4
        ? (() => {
            const pop = appear(4, 35, 10);
            const sc = pop < 1 ? 1.4 - 0.4 * pop : 1;
            return (
              <g>
                <line x1={20} y1={330} x2={480} y2={330} stroke={INK} strokeWidth="5" />
                <Miner x={170} y={330} s={1.3} />
                <Rat x={370} y={326} s={1.2} flip ear={1 + 0.12 * Math.abs(Math.sin(frame / 7))} />
                <Big x={700} y={115} text="Kinh nghiệm" size={44} opacity={appear(4, 5, 12)} />
                <Big x={700} y={170} text="truyền đời" size={44} opacity={appear(4, 15, 12)} />
                <g opacity={pop} transform={`rotate(-6 700 250) translate(700 250) scale(${sc}) translate(-700 -250)`}>
                  <rect x={510} y={210} width={380} height={80} rx={12} fill="#FFFFFF" stroke={RED} strokeWidth="6" />
                  <Big x={700} y={263} text="CHƯA KIỂM CHỨNG" size={36} color={RED} />
                </g>
              </g>
            );
          })()
        : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
