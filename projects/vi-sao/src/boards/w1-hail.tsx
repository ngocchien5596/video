/**
 * Sơ đồ "Vì sao trời nóng mà vẫn có mưa đá?" (4 bước):
 *   0  Mặt đất nóng làm mọc mây giông rất cao, đỉnh mây rất lạnh
 *   1  Gió mạnh thổi ngược lên, đưa giọt nước lên cao, đông thành đá
 *   2  Gió giữ hạt đá lơ lửng; hạt đá va giọt nước, nước đông bám thêm, to dần
 *   3  Nặng quá, gió không đỡ nổi: hạt đá rơi xuống thành mưa đá
 * Nguồn: Met Office (Hail), NOAA National Severe Storms Laboratory (Hail Basics).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, BLUE, Caption, Drop, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Đất nóng: mây giông cao, đỉnh rất lạnh", "Gió đưa giọt nước lên cao: đông thành đá", "Va giọt nước, nước đông bám thêm: to dần", "Nặng quá, gió không đỡ nổi: rơi xuống"];

const ICE = "#E8F6FF";

/** Đám mây giông cao như cái tháp, đáy ở y=300, đỉnh ở y≈70. */
const TallCloud: React.FC = () => (
  <g>
    <defs>
      <linearGradient id="w1-hail-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#9AA6B8" />
      </linearGradient>
    </defs>
    <path
      d="M300 300 Q250 296 262 262 Q236 226 280 206 Q270 160 318 150 Q312 104 360 96 Q356 64 410 62 L520 62 Q580 60 586 92 Q636 100 626 146 Q672 160 660 204 Q702 226 676 262 Q690 298 638 300 Z"
      fill="url(#w1-hail-cloud)"
      stroke={INK}
      strokeWidth="6"
      strokeLinejoin="round"
    />
  </g>
);

/** Hạt đá: các lớp băng đồng tâm, số lớp tăng theo `layers`. */
const Hailstone: React.FC<{ x: number; y: number; r: number; layers?: number }> = ({ x, y, r, layers = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={ICE} stroke={INK} strokeWidth="4" />
    {Array.from({ length: Math.max(0, layers - 1) }, (_, i) => (
      <circle key={i} r={r * (1 - (i + 1) / (layers + 0.5))} fill="none" stroke="#8CC4E8" strokeWidth="3" />
    ))}
    <circle cx={-r * 0.35} cy={-r * 0.35} r={Math.max(2, r * 0.18)} fill="#FFFFFF" />
  </g>
);

export const W1HailBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const cloud = appear(0, 0, 18);
  const up = appear(1, 0, 24);
  const grow = appear(2, 0, 30);
  const fall = appear(3, 0, 30);

  // Hạt đá lớn dần ở bước 2, rơi ở bước 3.
  const r = step < 2 ? 16 : 16 + grow * 20;
  const layers = step < 2 ? 1 : 1 + Math.round(grow * 3);
  const stoneY = step < 3 ? 140 : 140 + fall * 150;
  const wiggle = step === 2 ? Math.sin(frame * 0.25) * 4 : 0;

  return (
    <g>
      {/* Mặt đất nóng, mặt trời */}
      <rect x="20" y="300" width="920" height="40" rx="10" fill="#E9B872" stroke={INK} strokeWidth="5" />
      <Sun x={110} y={130} r={34} />
      <Label x={130} y={330} text="ĐẤT NÓNG" size={24} color="#9A3A12" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${190 + i * 22} 292 q8 -12 0 -24 q-8 -12 0 -24`}
          fill="none"
          stroke="#E5484D"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.5 + 0.5 * Math.sin(frame * 0.2 + i)}
        />
      ))}

      {/* Bước 0: mây giông cao, đỉnh lạnh */}
      <g opacity={cloud}>
        <TallCloud />
        <Label x={790} y={92} text="ĐỈNH MÂY" size={24} color={BLUE} />
        <Label x={790} y={122} text="RẤT LẠNH" size={24} color={BLUE} />
        <Arrow x1={700} y1={102} x2={600} y2={86} color={BLUE} width={5} p={cloud} />
        <Label x={790} y={250} text="MÂY GIÔNG" opacity={step === 0 ? 1 : 0} size={24} />
        <Label x={790} y={280} text="RẤT CAO" opacity={step === 0 ? 1 : 0} size={24} />
      </g>

      {/* Bước 1: gió thổi ngược lên, giọt nước lên cao rồi đông thành đá */}
      {step >= 1 ? (
        <g>
          {[400, 470].map((x, i) => (
            <Arrow key={x} x1={x} y1={286} x2={x} y2={140} color="#3FA34D" width={7} p={Math.min(1, up * 1.4 - i * 0.2)} />
          ))}
          <Label x={340} y={238} text="GIÓ" size={22} color="#2E7D32" />
          <Label x={340} y={262} text="LÊN" size={22} color="#2E7D32" />
          {step === 1 && up < 0.6 ? <Drop x={520} y={280 - (up / 0.6) * 140} s={2.4} /> : null}
        </g>
      ) : null}

      {/* Giọt nước bám thêm ở bước 2 */}
      {step === 2
        ? [0, 1, 2].map((i) => {
            const t = ((frame * 0.02 + i / 3) % 1);
            return <Drop key={i} x={620 - t * 70} y={230 - t * 80 + i * 6} s={2} />;
          })
        : null}

      {/* Hạt đá */}
      {step >= 1 && (step > 1 || up >= 0.6) ? <Hailstone x={530 + wiggle} y={stoneY} r={r} layers={layers} /> : null}
      <Label x={790} y={240} text="ĐÔNG" opacity={step === 1 ? clampPos(up * 2 - 1) : 0} size={26} color={BLUE} />
      <Label x={790} y={272} text="THÀNH ĐÁ" opacity={step === 1 ? clampPos(up * 2 - 1) : 0} size={26} color={BLUE} />
      <Label x={790} y={256} text="TO DẦN" opacity={step === 2 ? grow : 0} size={30} color={BLUE} />

      {/* Bước 3: nặng quá, rơi xuống */}
      <g opacity={fall}>
        <Arrow x1={600} y1={130} x2={600} y2={290} color={INK} width={6} />
        <Label x={790} y={240} text="NẶNG QUÁ" size={26} />
        <Label x={790} y={272} text="RƠI XUỐNG" size={26} />
        {[370, 430, 660].map((x, i) => (
          <Hailstone key={x} x={x} y={150 + ((fall * 150 + i * 45) % 140)} r={12} />
        ))}
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};

const clampPos = (x: number) => Math.max(0, Math.min(1, x));
