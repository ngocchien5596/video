/**
 * Sơ đồ "Vì sao trên Mặt Trăng có những vết đen loang lổ?" (4 bước):
 *   0  Mặt Trăng là quả cầu đá đầy hố tròn, do đá từ vũ trụ rơi vào
 *   1  Có những hố khổng lồ
 *   2  Đá nóng chảy (dung nham) tràn vào lấp đầy rồi nguội lại
 *   3  Đá nguội sẫm màu hơn: nhìn từ xa thấy vết đen
 * Nguồn: NASA Science (Moon Facts: maria are impact basins filled with lava), NASA Space Place (All About the Moon).
 */
import React from "react";
import { interpolateColors } from "remotion";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, clamp01, INK, Kid, Label } from "./common.tsx";

const CAPTIONS = ["Mặt Trăng đầy hố tròn", "Có những hố khổng lồ", "Đá nóng chảy lấp đầy hố", "Nguội lại, sẫm màu: vết đen!"];

const M = { x: 300, y: 205, r: 130 };
/** Hố nhỏ: [dx, dy, r]. */
const CRATERS: [number, number, number][] = [
  [-80, -70, 12],
  [70, -88, 10],
  [95, 30, 14],
  [-30, 95, 11],
  [-100, 40, 9],
  [20, -20, 8],
  [60, 85, 9],
];
/** Hố khổng lồ: [dx, dy, rx, ry]. */
const BASINS: [number, number, number, number][] = [
  [-40, -35, 48, 38],
  [40, 10, 40, 32],
  [-55, 45, 30, 24],
];

export const MoonSpotsBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const hits = appear(0, 0, 40);
  const big = appear(1, 0, 18);
  const lava = appear(2, 0, 26);
  const cool = appear(3, 0, 24);
  const basinFill = step < 3 ? "#F28C38" : interpolateColors(cool, [0, 1], ["#F28C38", "#5B6270"]);

  return (
    <g>
      {/* Mặt Trăng to */}
      <circle cx={M.x} cy={M.y} r={M.r} fill="#D9DCE1" stroke={INK} strokeWidth="7" />

      {/* Bước 0: đá vũ trụ bay tới, để lại hố tròn */}
      {CRATERS.map(([dx, dy, r], i) => {
        const p = clamp01(hits * 1.8 - i * 0.12);
        return p > 0 ? <circle key={i} cx={M.x + dx} cy={M.y + dy} r={r} fill="#B9BEC6" stroke={INK} strokeWidth="3" opacity={p} /> : null;
      })}
      {step === 0
        ? [0, 1, 2].map((i) => {
            const t = ((frame + i * 14) % 42) / 42;
            const [dx, dy] = CRATERS[i * 2];
            const x = M.x + dx + (1 - t) * 260;
            const y = M.y + dy - (1 - t) * 150;
            return <circle key={`r${i}`} cx={x} cy={y} r={9} fill="#8C7B6B" stroke={INK} strokeWidth="3" opacity={t < 0.95 ? 1 : 0} />;
          })
        : null}
      <Label x={710} y={140} text="ĐÁ VŨ TRỤ RƠI VÀO" opacity={step === 0 ? hits : 0} size={24} />
      <Label x={710} y={180} text="→ HỐ TRÒN" opacity={step === 0 ? hits : 0} size={24} />

      {/* Bước 1: hố khổng lồ (nét đứt), bước 2: dung nham lấp đầy, bước 3: nguội, sẫm màu */}
      {BASINS.map(([dx, dy, rx, ry], i) => (
        <g key={i} opacity={big}>
          <ellipse cx={M.x + dx} cy={M.y + dy} rx={rx} ry={ry} fill="#C3C8CF" stroke={INK} strokeWidth="4" strokeDasharray={lava > 0 ? undefined : "10 7"} />
          {lava > 0 ? <ellipse cx={M.x + dx} cy={M.y + dy} rx={rx * clamp01(lava * 1.4 - i * 0.15)} ry={ry * clamp01(lava * 1.4 - i * 0.15)} fill={basinFill} /> : null}
        </g>
      ))}
      <Label x={710} y={160} text="HỐ KHỔNG LỒ" opacity={step === 1 ? big : 0} size={30} />
      {step === 2 ? <Arrow x1={600} y1={160} x2={M.x + 60} y2={M.y - 20} color="#E5484D" width={6} p={lava} /> : null}
      <Label x={740} y={140} text="ĐÁ NÓNG CHẢY" opacity={step === 2 ? lava : 0} size={28} color="#C0392B" />
      <Label x={740} y={180} text="(DUNG NHAM)" opacity={step === 2 ? lava : 0} size={22} color="#C0392B" />

      {/* Bước 3: nhìn từ xa thấy vết đen */}
      <g opacity={cool}>
        <circle cx={700} cy={150} r={58} fill="#E9EBEE" stroke={INK} strokeWidth="5" />
        {BASINS.map(([dx, dy, rx, ry], i) => (
          <ellipse key={i} cx={700 + dx * 0.45} cy={150 + dy * 0.45} rx={rx * 0.45} ry={ry * 0.45} fill="#5B6270" />
        ))}
        <Kid x={860} y={300} s={0.9} />
        <line x1={840} y1={210} x2={760} y2={170} stroke={INK} strokeWidth="4" strokeDasharray="10 8" />
        <Label x={700} y={250} text="NHÌN TỪ XA" size={26} />
        <Label x={680} y={290} text="VẾT ĐEN!" size={30} color="#3B4250" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
