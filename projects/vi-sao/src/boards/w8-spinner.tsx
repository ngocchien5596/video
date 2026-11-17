/**
 * Sơ đồ "Vì sao Claude lúc đang nghĩ lại hiện toàn chữ lạ?" (5 bước):
 *   0  Máy trả lời mất vài giây; màn hình đứng im thì dễ tưởng máy treo
 *   1  Hình sao nhấp nháy + chữ chạy báo máy vẫn đang làm việc
 *   2  Harvard: trang web cho xem đang làm gì thì người ta chọn chờ lâu, hơn trang trả kết quả ngay
 *   3  Claude giấu sẵn 187 chữ (nấu nướng, nhảy nhót, Clauding), đổi liên tục
 *   4  Ba chữ hài kèm nghĩa: Honking (bấm còi), Photosynthesizing (quang hợp), Lollygagging (la cà)
 *   5  Trong 187 chữ ấy có cả "Thinking"
 * Nguồn: Nielsen Norman Group (K. Sherwin, 2014); Buell & Norton (2011) "The Labor Illusion", Management Science;
 * danh sách chữ mặc định trong Claude Code 2.1.325 (187 chữ, có "Thinking", "Clauding"); Claude Code docs (spinnerVerbs).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";
import { appearer, Caption, INK } from "./common.tsx";
import { Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Màn hình đứng im: tưởng máy treo", "Chữ chạy báo: máy vẫn đang làm", "Thấy máy đang làm, chịu chờ lâu hơn", "187 chữ vui, đổi liên tục", "Mấy chữ hài nhất", "Trong đó có cả chữ “Thinking”"];

const ORANGE = "#D9774B";
const FUNNY: [string, string][] = [
  ["Honking", "bấm còi"],
  ["Photosynthesizing", "quang hợp"],
  ["Lollygagging", "la cà"],
];
const FUNNY_ICON = ["📯", "🌿", "🚶"];
const WORDS = ["Baking…", "Moonwalking…", "Simmering…", "Boogieing…", "Clauding…", "Marinating…", "Shimmying…", "Brewing…"];

/** Ngôi sao nhiều cánh nhấp nháy, xoay chậm. */
const Spark: React.FC<{ x: number; y: number; r: number; t: number }> = ({ x, y, r, t }) => {
  const k = 0.75 + 0.25 * Math.abs(Math.sin(t / 6));
  return (
    <g transform={`translate(${x} ${y}) rotate(${t * 3}) scale(${k})`}>
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <line key={a} x1={0} y1={-r} x2={0} y2={r} stroke={ORANGE} strokeWidth={r * 0.32} strokeLinecap="round" transform={`rotate(${a})`} />
      ))}
    </g>
  );
};

/** Khung màn hình tối, chữ sáng. */
const Screen: React.FC<{ x: number; y: number; w: number; h: number; children?: React.ReactNode }> = ({ x, y, w, h, children }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="18" fill="#2B2420" stroke={INK} strokeWidth="6" />
    <rect x={x} y={y} width={w} height="30" rx="14" fill="#4A3C33" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={x + 22 + i * 22} cy={y + 15} r="6" fill={["#E5484D", "#FFD93D", "#3FA34D"][i]} />
    ))}
    {children}
  </g>
);

/** Đồng hồ cát nhỏ. */
const Clock: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="40" fill="#FFFDF5" stroke={INK} strokeWidth="6" />
    <line x1="0" y1="0" x2="0" y2="-28" stroke={INK} strokeWidth="6" strokeLinecap="round" transform={`rotate(${t * 6})`} />
    <line x1="0" y1="0" x2="18" y2="0" stroke={INK} strokeWidth="6" strokeLinecap="round" />
  </g>
);

export const SpinnerBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const a0 = appear(0, 0, 14);
  const a1 = appear(1, 0, 14);
  const a2 = appear(2, 0, 30);
  const a3 = appear(3, 0, 14);
  const a5 = appear(5, 0, 14);
  const word = WORDS[Math.floor(stepFrame / 16) % WORDS.length];

  return (
    <g>
      {/* Bước 0–1: một màn hình, lúc đứng im, lúc có hình chạy */}
      {step <= 1 ? (
        <g opacity={step === 0 ? a0 : 1}>
          <Screen x={140} y={70} w={520} h={250}>
            <text x={170} y={140} fontFamily={TEXT_FONT} fontWeight="900" fontSize="36" fill="#F2EBDD">
              {"> Viết giúp cháu bài văn…"}
            </text>
            {step === 0 ? (
              <text x={170} y={200} fontFamily={TEXT_FONT} fontWeight="900" fontSize="30" fill="#8C7D70">
                _
              </text>
            ) : (
              <g opacity={a1}>
                <Spark x={190} y={210} r={22} t={frame} />
                <text x={228} y={224} fontFamily={TEXT_FONT} fontWeight="900" fontSize="40" fill={ORANGE}>
                  {"Đang chạy" + ".".repeat(1 + (Math.floor(frame / 10) % 3))}
                </text>
              </g>
            )}
          </Screen>
          <Clock x={790} y={150} t={frame} />
          {step === 0 ? (
            <Tag x={790} y={258} text="TREO RỒI À?" size={32} color="#C8402E" />
          ) : (
            <Tag x={790} y={258} text="VẪN ĐANG LÀM!" size={32} opacity={a1} color="#2E7D32" />
          )}
        </g>
      ) : null}

      {/* Bước 2: hai trang web, người ta chọn trang cho xem đang làm */}
      {step === 2 ? (
        <g>
          <g opacity={a2}>
            <rect x={60} y={66} width={390} height={250} rx="18" fill="#FFFDF5" stroke={INK} strokeWidth="6" />
            <text x={255} y={116} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="34" fill={INK}>
              Trang A
            </text>
            <text x={255} y={196} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="40" fill="#8C7D70">
              Có ngay!
            </text>
            <text x={255} y={262} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="30" fill="#8C7D70">
              (không thấy gì)
            </text>
          </g>
          <g opacity={appear(2, 12, 14)}>
            <rect x={510} y={66} width={390} height={250} rx="18" fill="#FFFDF5" stroke={ORANGE} strokeWidth="8" />
            <text x={705} y={116} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="34" fill={INK}>
              Trang B
            </text>
            {["Đang tìm hãng 1…", "Đang tìm hãng 2…", "Đang tìm hãng 3…"].map((t, i) => (
              <text key={t} x={545} y={170 + i * 46} fontFamily={TEXT_FONT} fontWeight="900" fontSize="32" fill={ORANGE} opacity={appear(2, 20 + i * 14, 10)}>
                {t}
              </text>
            ))}
          </g>
          <Tag x={705} y={330} text="CHỌN CÁI NÀY!" size={30} opacity={appear(2, 70, 14)} color="#2E7D32" />
        </g>
      ) : null}

      {/* Bước 4: ba thẻ chữ hài kèm nghĩa */}
      {step === 4
        ? FUNNY.map(([en, vi], i) => (
            <g key={en} opacity={appear(4, i * 45, 14)} transform={`translate(${170 + i * 310} 200)`}>
              <rect x={-150} y={-120} width={300} height={240} rx="20" fill="#FFFDF5" stroke={INK} strokeWidth="6" />
              <text y={-50} textAnchor="middle" fontFamily={TEXT_FONT} fontSize="64">
                {FUNNY_ICON[i]}
              </text>
              <text y={22} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={Math.min(40, Math.round(470 / en.length))} fill={ORANGE}>
                {en}
              </text>
              <text y={84} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="36" fill={INK}>
                {vi}
              </text>
            </g>
          ))
        : null}

      {/* Bước 3 và 5: màn hình đổi chữ; bước 5 dừng ở chữ Thinking */}
      {step === 3 || step >= 5 ? (
        <g opacity={step === 3 ? a3 : 1}>
          <Screen x={40} y={70} w={560} h={250}>
            <Spark x={100} y={190} r={30} t={frame} />
            <text x={150} y={206} fontFamily={TEXT_FONT} fontWeight="900" fontSize={step >= 5 ? 56 : 50} fill={step >= 5 ? "#FFD93D" : ORANGE}>
              {step >= 5 ? "Thinking…" : word}
            </text>
          </Screen>
          {step === 3 ? (
            <g>
              <text x={800} y={170} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="96" fill={ORANGE} stroke={INK} strokeWidth="4" paintOrder="stroke">
                187
              </text>
              <text x={800} y={222} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="40" fill={INK}>
                chữ vui
              </text>
              <Tag x={800} y={290} text="NẤU, NHẢY…" size={30} opacity={appear(3, 30, 14)} />
            </g>
          ) : (
            <g opacity={a5}>
              <Tag x={785} y={150} text="CÓ CẢ CHỮ NÀY!" size={32} color="#C8402E" />
              <text x={785} y={240} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="30" fill={INK}>
                Vì sao chọn chữ vui?
              </text>
              <text x={785} y={284} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="30" fill="#C8402E">
                Hãng chưa nói
              </text>
            </g>
          )}
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
