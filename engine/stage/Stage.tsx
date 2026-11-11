import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Camera, Item } from "../lib/stage-types.ts";
import type { Cue, Timeline } from "../lib/timing.ts";
import type { Episode } from "../lib/types.ts";
import { BoardPanel, type BoardRegistry } from "./board.tsx";
import { Puppet, PUPPET_H, PUPPET_W } from "./Character.tsx";
import { FX_FRAMES, FxShape } from "./fx.tsx";
import { MemoryTV } from "./memory.tsx";
import { animateArms, type ArmAngles } from "./poses.ts";
import { PROPS } from "./props.tsx";
import { FLOOR, KitchenTable, SceneBackground, TABLE_TOP } from "./scenes.tsx";
import { at, buildTrack, type Change, type CharState, propId, propText } from "./track.ts";

const W = 1080;
/** Tỉ lệ con rối trên sân khấu. */
const SCALE = 1.12;
/** Thời gian (khung hình) để chuyển tư thế / đi bộ / lia máy. */
const TRANSITION = { damping: 16, stiffness: 140, mass: 0.8 };

const mixArms = (a: ArmAngles, b: ArmAngles, p: number): ArmAngles => ({
  front: [a.front[0] + (b.front[0] - a.front[0]) * p, a.front[1] + (b.front[1] - a.front[1]) * p],
  back: [a.back[0] + (b.back[0] - a.back[0]) * p, a.back[1] + (b.back[1] - a.back[1]) * p],
});

type Ctx = { frame: number; fps: number; t: number };

const progress = (ctx: Ctx, change: Change<unknown>) =>
  change.time < 0 || change.cut ? 1 : spring({ frame: ctx.frame - Math.round(change.time * ctx.fps), fps: ctx.fps, config: TRANSITION });

/** Vị trí, tư thế hiện tại của một nhân vật, có chuyển động mượt từ trạng thái trước. */
const resolveChar = (ctx: Ctx, changes: Change<CharState>[], talking: boolean, seed: number) => {
  const { cur, prev } = at(changes, ctx.t);
  const p = progress(ctx, cur);
  const local = ctx.frame - Math.round(Math.max(0, cur.time) * ctx.fps);
  const s = cur.value;
  const from = prev.value;

  const arms = mixArms(animateArms(from.arms, local + 999), animateArms(s.arms, local), p);
  const x = from.x + (s.x - from.x) * p;
  const walking = Math.abs(s.x - from.x) > 0.01 && p < 0.97;

  let dx = 0;
  let dy = 0;
  const f = ctx.frame + seed;
  switch (s.move) {
    case "bounce":
      dy = -Math.abs(Math.sin(f * 0.3)) * 18;
      break;
    case "jump":
      dy = -Math.abs(Math.sin(f * 0.22)) * 70;
      break;
    case "shake":
      dx = Math.sin(f * 2.1) * 10;
      break;
    case "tremble":
      dx = Math.sin(f * 3.1) * 4;
      break;
    default:
      dy = Math.sin(f * 0.08) * 3 - (talking ? Math.abs(Math.sin(f * 0.25)) * 8 : 0);
  }
  if (walking) dy -= Math.abs(Math.sin(f * 0.55)) * 14;

  return {
    state: s,
    arms,
    x,
    dx,
    dy,
    legSwing: walking ? Math.sin(f * 0.55) * 26 : s.move === "jump" ? -12 : 0,
    headTilt: talking ? Math.sin(f * 0.18) * 3 : s.expr === "confused" ? 8 : 0,
    talk: talking ? 0.3 + 0.7 * Math.abs(Math.sin(f * 0.85)) : 0,
    blink: (f + 20) % 96 < 4,
  };
};

const cameraTarget = (camera: Camera, cdX: number, tcX: number) =>
  camera === "CD" ? { s: 1.28, x: cdX * W } : camera === "TC" ? { s: 1.28, x: tcX * W } : { s: 1, x: W / 2 };

const ItemShape: React.FC<{ item: Item; x: number; pop: number; table: boolean }> = ({ item, x, pop, table }) => {
  const id = propId(item.prop);
  if (!id) return null;
  const y = item.on === "table" && table ? TABLE_TOP + 4 : FLOOR;
  return (
    <g transform={`translate(${x * W} ${y}) scale(${(item.scale ?? 1) * pop})`}>
      {PROPS[id as keyof typeof PROPS].draw({ text: propText(item.prop), mirrored: false })}
    </g>
  );
};

/** Sân khấu hoạt hình con rối: phông, nhân vật, đồ vật, hiệu ứng, máy quay. */
export const Stage: React.FC<{
  episode: Episode;
  timeline: Timeline;
  cue: Cue | undefined;
  speaking: boolean;
  /** Sơ đồ của dự án cho kênh "board" (bảng minh hoạ). */
  boards?: BoardRegistry;
}> = ({ episode, timeline, cue, speaking, boards }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ctx: Ctx = { frame, fps, t };
  const track = useMemo(() => buildTrack(episode, timeline), [episode, timeline]);

  // Nhịp hồi ức đang chiếu (nếu có): con rối không mấp máy môi, vai (role) mới hiện.
  const memoryBeat = timeline.beats.find((b) => b.memory && t >= b.start && t < b.end);
  const cd = resolveChar(ctx, track.cd, !memoryBeat && speaking && cue?.who === "CD", 0);
  const tc = resolveChar(ctx, track.tc, !memoryBeat && speaking && cue?.who === "TC", 37);

  const sceneNow = at(track.scene, t).cur.value;
  const scene = typeof sceneNow === "string" ? { id: sceneNow } : sceneNow;
  const table = scene.id === "kitchen";

  // Máy quay
  const cam = at(track.camera, t);
  const pc = progress(ctx, cam.cur);
  const a = cameraTarget(cam.prev.value, cd.x, tc.x);
  const b = cameraTarget(cam.cur.value, cd.x, tc.x);
  const camS = a.s + (b.s - a.s) * pc;
  const camX = a.x + (b.x - a.x) * pc;
  const pivotY = 1000;
  // Rung máy khi có "BỐP!"
  const bop = track.fx.find((c) => c.value.kind === "bop" && frame >= c.time * fps && frame < c.time * fps + 10);
  const shake = bop ? Math.sin(frame * 2.7) * 14 : 0;
  // Giữ khung hình nằm trong phông khi phóng to.
  const half = W / 2 / camS;
  const focus = Math.min(W - half, Math.max(half, camX));
  const camera = `translate(${W / 2 + shake} ${pivotY}) scale(${camS}) translate(${-focus} ${-pivotY})`;

  // Đồ vật: cùng id thì trượt từ chỗ cũ tới chỗ mới, đồ mới thì bật ra
  const it = at(track.items, t);
  const pi = progress(ctx, it.cur);

  const placeChar = (c: ReturnType<typeof resolveChar>, who: "CD" | "TC") => {
    const mirrored = who === "TC" ? c.x > cd.x : c.x > tc.x;
    return (
      <g transform={`translate(${c.x * W - (PUPPET_W * SCALE) / 2 + c.dx} ${FLOOR - (PUPPET_H - 14) * SCALE + c.dy}) scale(${SCALE})`}>
        <Puppet
          who={who}
          role={memoryBeat ? c.state.role : null}
          expr={c.state.expr}
          arms={c.arms}
          hand={c.state.hand}
          head={c.state.head}
          face={c.state.face}
          back={c.state.back}
          talk={c.talk}
          blink={c.blink}
          legSwing={c.legSwing}
          headTilt={c.headTilt}
          mirrored={mirrored}
        />
      </g>
    );
  };

  const items = (front: boolean) =>
    it.cur.value
      .filter((i) => (i.on !== "table" || !table) && Boolean(i.front) === front)
      .map((item) => {
        const old = it.prev.value.find((o) => o.id === item.id);
        const x = old ? old.x + (item.x - old.x) * pi : item.x;
        return <ItemShape key={item.id} item={item} x={x} pop={old ? 1 : pi} table={table} />;
      });

  const picture = (
    <AbsoluteFill>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%">
        <g transform={camera}>
          <SceneBackground id={scene.id} text={"text" in scene ? scene.text : undefined} />
          {items(false)}
          {placeChar(cd, "CD")}
          {placeChar(tc, "TC")}
          {items(true)}
          {table ? <KitchenTable /> : null}
          {table
            ? it.cur.value
                .filter((i) => i.on === "table")
                .map((item) => {
                  const old = it.prev.value.find((o) => o.id === item.id);
                  const x = old ? old.x + (item.x - old.x) * pi : item.x;
                  return <ItemShape key={item.id} item={item} x={x} pop={old ? 1 : pi} table />;
                })
            : null}
          {track.fx.map((c, i) => {
            // Hiệu ứng không tràn qua ranh giới cảnh hồi ức.
            if (timeline.beats.find((b) => b.memory && c.time >= b.start && c.time < b.end) !== memoryBeat) return null;
            const start = Math.round(c.time * fps);
            const local = frame - start;
            if (local < 0 || local >= FX_FRAMES[c.value.kind]) return null;
            const who = c.value.on === "CD" ? cd : tc;
            const side = c.value.on === "CD" ? -1 : 1;
            const pop = spring({ frame: local, fps, config: { damping: 9, stiffness: 220 } });
            return (
              <FxShape
                key={i}
                kind={c.value.kind}
                text={c.value.text}
                x={who.x * W + who.dx}
                y={FLOOR - (PUPPET_H - 80) * SCALE + who.dy}
                local={local}
                pop={interpolate(pop, [0, 1], [0.2, 1])}
                side={side}
              />
            );
          })}
        </g>
        {boards ? <BoardPanel changes={track.board} registry={boards} frame={frame} fps={fps} /> : null}
      </svg>
    </AbsoluteFill>
  );

  if (!memoryBeat) return picture;
  const label = typeof memoryBeat.memory === "object" ? memoryBeat.memory.label : undefined;
  return (
    <MemoryTV frame={frame} startFrame={Math.round(memoryBeat.start * fps)} endFrame={Math.round(memoryBeat.end * fps)} label={label}>
      {picture}
    </MemoryTV>
  );
};
