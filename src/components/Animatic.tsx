import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { Cue, TimedBeat } from "../lib/timing.ts";
import { FPS } from "../lib/timing.ts";
import { BEAT_STYLE, COLORS, SAFE, SPEAKERS, TEXT_FONT, TITLE_FONT } from "./brand.ts";

/**
 * Nền tạm khi chưa có footage: hiện nhịp, mô tả cảnh quay và ai đang nói.
 * Xem trong Studio như một storyboard động trước khi đi quay.
 */
export const Animatic: React.FC<{ beat: TimedBeat; cue: Cue | undefined }> = ({
  beat,
  cue,
}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const style = BEAT_STYLE[beat.kind];
  const progress = interpolate(t, [beat.start, beat.end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const speaker = cue ? SPEAKERS[cue.who] : null;
  const bob = Math.sin(frame * 0.25) * 6;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${style.bg[0]} 0%, ${style.bg[1]} 85%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 1500,
          left: SAFE.left,
          right: SAFE.right,
          fontFamily: TEXT_FONT,
          color: COLORS.white,
        }}
      >
        <div
          style={{
            fontFamily: TITLE_FONT,
            fontSize: 54,
            letterSpacing: 3,
            color: COLORS.idiom,
          }}
        >
          NHỊP: {style.label} · {beat.seconds}s
        </div>
        <div
          style={{
            marginTop: 12,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#FFFFFF22",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              backgroundColor: COLORS.idiom,
            }}
          />
        </div>
        <div style={{ marginTop: 26, fontSize: 38, fontWeight: 700, lineHeight: 1.35, opacity: 0.8 }}>
          CẢNH: {beat.shot}
        </div>
      </div>

      {speaker && speaker.name ? (
        <div
          style={{
            position: "absolute",
            top: 860 + bob,
            left: cue?.who === "CD" ? SAFE.left : undefined,
            right: cue?.who === "TC" ? SAFE.right : undefined,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: speaker.color,
            border: `10px solid ${COLORS.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: TITLE_FONT,
            fontSize: 58,
            lineHeight: 1,
            color: COLORS.ink,
          }}
        >
          {speaker.name}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
