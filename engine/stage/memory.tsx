/**
 * Cảnh hồi ức kiểu TV đen trắng ngày xưa, dùng cho nhịp có `memory` (xem engine/lib/types.ts).
 * - Vào nhịp: bật TV (vệt sáng ngang mở ra thành cả màn hình).
 * - Trong nhịp: đen trắng, sọc quét, nhiễu hạt, vệt sáng trôi, vết xước phim, hình hơi rung, nháy sáng, viền màn hình bo góc.
 * - Ra nhịp: tắt TV (hình co lại thành vệt sáng rồi tắt).
 * Chỉ phủ lên phần hình hoạt hình; thanh tiêu đề, phụ đề vẫn giữ màu như cũ.
 */
import React from "react";
import { AbsoluteFill, interpolate, random } from "remotion";
import { TEXT_FONT } from "../components/brand.ts";

/** Số khung hình bật / tắt TV. */
const ON_FRAMES = 10;
const OFF_FRAMES = 8;

export const MemoryTV: React.FC<{
  frame: number;
  startFrame: number;
  endFrame: number;
  label?: string;
  children: React.ReactNode;
}> = ({ frame, startFrame, endFrame, label, children }) => {
  const local = frame - startFrame;
  const left = endFrame - frame;

  // Bật: vệt sáng dài ra (0 → 40%), rồi mở cao (40% → 100%). Tắt: ngược lại.
  const on = Math.min(1, local / ON_FRAMES);
  const off = Math.min(1, left / OFF_FRAMES);
  const p = Math.min(on, off);
  const sx = interpolate(p, [0, 0.4], [0.05, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sy = interpolate(p, [0.4, 1], [0.008, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = interpolate(p, [0.3, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Rung hình, nháy sáng (xác định theo khung hình để lần xuất nào cũng giống nhau).
  const jitterY = (random(`jy-${frame}`) - 0.5) * 5;
  const jitterX = random(`jx-${Math.floor(frame / 3)}`) < 0.08 ? (random(`jxa-${frame}`) - 0.5) * 14 : 0;
  const flicker = 0.92 + random(`fl-${frame}`) * 0.12;
  const band = ((frame * 9) % 2400) - 300;
  const scratches = Array.from({ length: 3 }, (_, i) => ({
    show: random(`sc-${i}-${Math.floor(frame / 2)}`) < 0.35,
    x: random(`sx-${i}-${Math.floor(frame / 2)}`) * 1080,
  }));
  const specks = Array.from({ length: 6 }, (_, i) => ({
    x: random(`dx-${i}-${frame}`) * 1080,
    y: random(`dy-${i}-${frame}`) * 1920,
    r: 2 + random(`dr-${i}-${frame}`) * 5,
    show: random(`ds-${i}-${frame}`) < 0.5,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${jitterX}px, ${jitterY}px) scale(${sx}, ${sy})`,
          filter: `grayscale(1) contrast(1.25) brightness(${flicker + glow * 1.5}) sepia(0.12)`,
          overflow: "hidden",
        }}
      >
        {children}
        {/* Sọc quét */}
        <AbsoluteFill
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 2px, transparent 2px, transparent 6px)",
          }}
        />
        {/* Vệt sáng trôi từ trên xuống */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: band,
            height: 220,
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.10), transparent)",
          }}
        />
        {/* Nhiễu hạt */}
        <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <filter id={`grain-${frame % 8}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 8} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="1080" height="1920" filter={`url(#grain-${frame % 8})`} opacity="0.16" />
          {scratches.map((s, i) =>
            s.show ? <line key={i} x1={s.x} y1="0" x2={s.x + 6} y2="1920" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" /> : null,
          )}
          {specks.map((d, i) => (d.show ? <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#111111" opacity="0.5" /> : null))}
        </svg>
        {/* Tối bốn góc */}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)" }} />
        {label ? (
          <div
            style={{
              position: "absolute",
              left: 80,
              top: 300,
              padding: "10px 22px",
              backgroundColor: "rgba(0,0,0,0.6)",
              border: "3px solid rgba(255,255,255,0.8)",
              borderRadius: 10,
              color: "#FFFFFF",
              fontFamily: TEXT_FONT,
              fontWeight: 900,
              fontSize: 34,
              letterSpacing: 1,
            }}
          >
            ▶ {label}
          </div>
        ) : null}
        {/* Vệt sáng lúc bật / tắt TV */}
        {glow > 0 ? <AbsoluteFill style={{ backgroundColor: "#FFFFFF", opacity: glow * 0.8 }} /> : null}
      </AbsoluteFill>
      {/* Viền màn hình TV bo góc */}
      <AbsoluteFill
        style={{
          margin: 18,
          borderRadius: 70,
          boxShadow: "0 0 0 60px #050505, inset 0 0 60px 20px rgba(0,0,0,0.85)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
