import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Camera, Item } from "../lib/stage-types.ts";
import type { Cue, Timeline } from "../lib/timing.ts";
import type { Episode } from "../lib/types.ts";
import { BoardPanel, type BoardRegistry } from "./board.tsx";
import { CallWindow } from "./call.tsx";
import { Puppet, PUPPET_H, PUPPET_W } from "./Character.tsx";
import { FX_FRAMES, FxShape } from "./fx.tsx";
import { MemoryTV } from "./memory.tsx";
import { type ArmAngles, gestureArms, gestureKey } from "./poses.ts";
import { PROPS } from "./props.tsx";
import { FLOOR, KitchenTable, SceneBackground, SceneDepth, TABLE_TOP } from "./scenes.tsx";
import { at, buildTrack, type Change, type CharState, propId, propText } from "./track.ts";

const W = 1080;
/** Tỉ lệ con rối so với phông (trong toạ độ sân khấu). */
const SCALE = 1.2;
/** Lò xo chuyển tư thế / đi bộ (không nảy quá, có chút dư âm). */
const TRANSITION = { damping: 15, stiffness: 120, mass: 0.9 };
/** Sau từng này khung, một lần chuyển coi như đã dừng hẳn. */
const SETTLE = 60;

/**
 * Máy quay. Mặt sàn của sân khấu (FLOOR) luôn hiện ở y = FLOOR_ON_SCREEN trên khung hình, ngay trên phụ đề,
 * nên chân nhân vật không bị phụ đề che và nửa dưới khung không trống.
 * wide: thấy cả hai người · CD / TC: đẩy máy vào người nói, người kia (nếu đang trên sân khấu) vẫn ở trọn trong khung.
 */
export const FLOOR_ON_SCREEN = 1300;
// Có bảng minh hoạ (BOARD hạ xuống y 350, đáy ~716): thu nhỏ còn withBoard để đầu nhân vật nằm dưới mép bảng.
const ZOOM = { wide: 1.12, close: 1.3, withBoard: 1.02, min: 1.0 };
/** Nửa bề ngang thân con rối kể cả tay (toạ độ sân khấu) + lề. */
const BODY_HALF = 136;
const MARGIN = 22;

type Ctx = { frame: number; fps: number };

const settleP = (fps: number, frame: number, start: number) => spring({ frame: frame - start, fps, config: TRANSITION });

/**
 * Giá trị số (vị trí, góc tay) tại một khung hình, chuyển mượt từ giá trị *thật* lúc bắt đầu đổi
 * (kể cả khi lần đổi trước chưa xong), nên không bao giờ nhảy khung.
 */
type NumChange = { time: number; cut?: boolean; target: (local: number) => number[] };
const valueAt = (ch: NumChange[], i: number, frame: number, fps: number): number[] => {
  const c = ch[i];
  const start = Math.round(Math.max(0, c.time) * fps);
  const local = frame - start;
  const v = c.target(local);
  if (i === 0 || c.cut || c.time < 0 || local >= SETTLE) return v;
  const p = settleP(fps, frame, start);
  const from = valueAt(ch, i - 1, start, fps);
  return v.map((x, k) => from[k] + (x - from[k]) * p);
};
const indexAt = (ch: { time: number }[], frame: number, fps: number) => {
  let i = 0;
  while (i + 1 < ch.length && Math.round(ch[i + 1].time * fps) <= frame) i++;
  return i;
};

/** Tách kênh nhân vật thành kênh vị trí và kênh tay (chỉ giữ lần đổi thật), để đổi nét mặt không làm khựng bước đi. */
const channels = (changes: Change<CharState>[], who: "CD" | "TC") => {
  const xs: NumChange[] = [];
  const arms: NumChange[] = [];
  const armKey = (c: CharState) => `${c.arms}|${gestureKey(c.arms, c.expr, who) ?? ""}`;
  changes.forEach((c, i) => {
    const prev = changes[i - 1]?.value;
    if (!prev || prev.x !== c.value.x || c.cut) xs.push({ time: c.time, cut: c.cut, target: () => [c.value.x] });
    if (!prev || armKey(prev) !== armKey(c.value) || c.cut) {
      arms.push({
        time: c.time,
        cut: c.cut,
        target: (local) => {
          const a = gestureArms(c.value.arms, c.value.expr, who, local);
          return [...a.front, ...a.back];
        },
      });
    }
  });
  return { xs, arms };
};
type Channels = ReturnType<typeof channels>;

const xAt = (ch: Channels, frame: number, fps: number) => valueAt(ch.xs, indexAt(ch.xs, frame, fps), frame, fps)[0];

/** Chớp mắt ngẫu nhiên (xác định theo khung hình): mỗi quãng ~3 giây chớp một lần, thỉnh thoảng chớp hai lần. */
const blinking = (f: number, seed: number) => {
  const BLOCK = 96;
  const k = Math.floor(f / BLOCK);
  const start = k * BLOCK + Math.floor(random(`blink-${seed}-${k}`) * 70);
  const twice = random(`blink2-${seed}-${k}`) < 0.25;
  return (f >= start && f < start + 4) || (twice && f >= start + 8 && f < start + 11);
};

/** Vị trí, tư thế hiện tại của một nhân vật, có chuyển động mượt từ trạng thái trước. */
const resolveChar = (
  ctx: Ctx,
  changes: Change<CharState>[],
  ch: Channels,
  talking: boolean,
  listening: boolean,
  seed: number,
) => {
  const { frame, fps } = ctx;
  const { cur } = at(changes, frame / fps);
  const s = cur.value;

  const a = valueAt(ch.arms, indexAt(ch.arms, frame, fps), frame, fps);
  const arms: ArmAngles = { front: [a[0], a[1]], back: [a[2], a[3]] };
  const x = xAt(ch, frame, fps);
  // Bước chân theo quãng đường đã đi (không trượt): pha = vị trí, biên độ = tốc độ.
  const speed = (x - xAt(ch, frame - 1, fps)) * W;
  const stride = Math.min(1, Math.abs(speed) / 5);
  const phase = (x * W) / 34;

  let dx = 0;
  let dy = 0;
  const f = frame + seed;
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
      break;
  }
  dy -= Math.abs(Math.sin(phase)) * 12 * stride;

  // Đổi nét mặt: đầu nhún nhẹ, chớp mắt che lúc đổi hình mắt.
  const exprIdx = changes.indexOf(cur);
  let exprStart = -999;
  for (let i = exprIdx; i > 0; i--) {
    if (changes[i].value.expr !== changes[i - 1].value.expr) {
      exprStart = Math.round(changes[i].time * fps);
      break;
    }
  }
  const sinceExpr = frame - exprStart;
  const headPop = sinceExpr >= 0 && sinceExpr < 24 ? Math.sin((sinceExpr / 24) * Math.PI) * Math.exp(-sinceExpr / 10) * 0.12 : 0;

  // Thở (chỉ nửa thân trên, chân vẫn chạm đất), nhún khi nói, gật gù khi nghe.
  const breath = Math.sin(f * 0.07) * 2.5;
  const talkBob = talking ? Math.abs(Math.sin(f * 0.25)) * 5 : 0;
  const nod = listening ? Math.pow(Math.max(0, Math.sin(f * 0.075)), 3) * 7 : 0;

  // Hướng mặt khi đang đi: nhìn theo hướng đi.
  const facing = stride > 0.3 ? Math.sign(speed) : 0;

  return {
    state: s,
    arms,
    x,
    dx,
    dy,
    facing,
    legSwing: stride > 0.02 ? Math.sin(phase) * 28 * stride : s.move === "jump" ? -12 : 0,
    headTilt: talking ? Math.sin(f * 0.18) * 3 : s.expr === "confused" ? 8 : listening ? 3 + Math.sin(f * 0.05) * 1.5 : 0,
    talk: talking ? 0.3 + 0.7 * Math.abs(Math.sin(f * 0.85)) : 0,
    blink: blinking(f, seed) || (sinceExpr >= 0 && sinceExpr < 3),
    bodyDy: breath - talkBob,
    headDy: nod,
    headPop,
  };
};

/** Khung máy quay mong muốn tại một khung hình (chưa làm mượt). */
const cameraAt = (
  mode: Camera,
  people: { who: "CD" | "TC"; x: number }[],
  board: boolean,
): { k: number; focus: number } => {
  const onStage = people.filter((p) => p.x > -0.02 && p.x < 1.02);
  const target = board ? ZOOM.withBoard : mode === "wide" ? ZOOM.wide : ZOOM.close;
  const subject = mode === "wide" ? undefined : onStage.find((p) => p.who === mode);
  if (!onStage.length || (mode !== "wide" && !subject)) return { k: board ? ZOOM.withBoard : ZOOM.wide, focus: W / 2 };
  const L = Math.min(...onStage.map((p) => p.x * W)) - BODY_HALF - MARGIN;
  const R = Math.max(...onStage.map((p) => p.x * W)) + BODY_HALF + MARGIN;
  const k = Math.max(ZOOM.min, Math.min(target, W / (R - L)));
  const half = W / 2 / k;
  const pref = subject ? subject.x * W : (L + R) / 2;
  // Giữ mọi người trên sân khấu trong khung, rồi giữ khung trong phông.
  const lo = Math.max(R - half, half);
  const hi = Math.min(L + half, W - half);
  const focus = lo <= hi ? Math.min(hi, Math.max(lo, pref)) : Math.min(W - half, Math.max(half, (L + R) / 2));
  return { k, focus };
};

const ItemShape: React.FC<{ item: Item; x: number; pop: number; table: boolean }> = ({ item, x, pop, table }) => {
  const id = propId(item.prop);
  if (!id || pop <= 0.001) return null;
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
  const ctx: Ctx = { frame, fps };
  const track = useMemo(() => buildTrack(episode, timeline), [episode, timeline]);
  const chCD = useMemo(() => channels(track.cd, "CD"), [track]);
  const chTC = useMemo(() => channels(track.tc, "TC"), [track]);
  /** Những lúc máy quay phải cắt thẳng (đổi phông, vào / ra hồi ức, đặt người tức thì). */
  const cuts = useMemo(() => {
    const times = [
      ...track.camera.filter((c) => c.cut),
      ...track.cd.filter((c) => c.cut),
      ...track.tc.filter((c) => c.cut),
      ...track.scene.filter((c, i) => i > 0 && JSON.stringify(c.value) !== JSON.stringify(track.scene[i - 1].value)),
    ].map((c) => Math.round(c.time * fps));
    for (const b of timeline.beats) if (b.memory) times.push(Math.round(b.start * fps), Math.round(b.end * fps));
    return [...new Set(times)].sort((a, b) => a - b);
  }, [track, timeline, fps]);

  // Nhịp hồi ức đang chiếu (nếu có): con rối không mấp máy môi, vai (role) mới hiện.
  const memoryBeat = timeline.beats.find((b) => b.memory && t >= b.start && t < b.end);
  const live = !memoryBeat && speaking;
  const cd = resolveChar(ctx, track.cd, chCD, live && cue?.who === "CD", live && cue?.who === "TC", 0);
  const tc = resolveChar(ctx, track.tc, chTC, live && cue?.who === "TC", live && cue?.who === "CD", 37);

  const sceneNow = at(track.scene, t).cur.value;
  const scene = typeof sceneNow === "string" ? { id: sceneNow } : sceneNow;
  const table = scene.id === "kitchen";

  // Cuộc gọi video: Cụ Đồ ở trong khung điện thoại, không đứng trên sân khấu; máy quay "CD" thì phóng to khung gọi.
  const progress = (change: Change<unknown>) =>
    change.time < 0 || change.cut ? 1 : settleP(fps, frame, Math.round(change.time * fps));
  const call = at(track.call, t);
  const callP = progress(call.cur);
  const callOpen = Number(call.prev.value) + (Number(call.cur.value) - Number(call.prev.value)) * callP;
  const inCall = call.cur.value;
  const cam = at(track.camera, t);
  const pc = progress(cam.cur);
  const callBig = (cam.prev.value === "CD" ? 1 - pc : 0) + (cam.cur.value === "CD" ? pc : 0);

  // Máy quay: khung mong muốn ở từng khung hình, lấy trung bình có trọng số (tam giác) quanh khung hiện tại
  // => mọi lần đổi máy / người đi lại đều lia, đẩy mượt (ease-in-out ~26 khung), không bao giờ giật.
  const lastCut = cuts.filter((c) => c <= frame).pop() ?? -Infinity;
  const nextCut = cuts.find((c) => c > frame) ?? Infinity;
  let sumK = 0;
  let sumF = 0;
  let sumW = 0;
  for (let o = -20; o <= 6; o += 2) {
    const fr = frame + o;
    if (fr < lastCut || fr >= nextCut) continue;
    const w = 14 - Math.abs(o + 7);
    if (w <= 0) continue;
    const ts = fr / fps;
    const mode = at(track.camera, ts).cur.value;
    const calling = at(track.call, ts).cur.value;
    const people = [
      ...(calling ? [] : [{ who: "CD" as const, x: xAt(chCD, fr, fps) }]),
      { who: "TC" as const, x: xAt(chTC, fr, fps) },
    ];
    const c = cameraAt(calling && mode === "CD" ? "wide" : mode, people, Boolean(at(track.board, ts).cur.value));
    sumK += c.k * w;
    sumF += c.focus * w;
    sumW += w;
  }
  const camK = sumW ? sumK / sumW : ZOOM.wide;
  const focus = sumW ? sumF / sumW : W / 2;
  const floorY = Math.min(FLOOR_ON_SCREEN, FLOOR * camK);
  // Rung máy khi có "BỐP!" (tắt dần).
  const bop = track.fx.find((c) => c.value.kind === "bop" && frame >= c.time * fps && frame < c.time * fps + 12);
  const shake = bop ? Math.sin(frame * 2.7) * 14 * (1 - (frame - bop.time * fps) / 12) : 0;
  const camera = `translate(${W / 2 + shake} ${floorY}) scale(${camK}) translate(${-focus} ${-FLOOR})`;

  // Đồ vật: cùng id thì trượt từ chỗ cũ tới chỗ mới, đồ mới thì bật ra, đồ bị cất thì thu nhỏ biến mất.
  const it = at(track.items, t);
  const pi = progress(it.cur);

  const placeChar = (c: ReturnType<typeof resolveChar>, who: "CD" | "TC") => {
    const other = who === "TC" ? cd : tc;
    const mirrored = c.facing !== 0 ? c.facing < 0 : c.x > other.x;
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
          bodyDy={c.bodyDy}
          headDy={c.headDy}
          headPop={c.headPop}
        />
      </g>
    );
  };
  /** Bóng đổ dưới chân: nhỏ và nhạt đi khi nhảy lên. */
  const shadow = (c: ReturnType<typeof resolveChar>, key: string) => {
    const lift = Math.min(1, -c.dy / 90);
    return (
      <ellipse
        key={key}
        cx={c.x * W + c.dx}
        cy={FLOOR + 2}
        rx={110 * (1 - lift * 0.35)}
        ry={18 * (1 - lift * 0.35)}
        fill="#000000"
        opacity={0.22 * (1 - lift * 0.5)}
      />
    );
  };

  const items = (front: boolean) => [
    ...it.cur.value
      .filter((i) => (i.on !== "table" || !table) && Boolean(i.front) === front)
      .map((item) => {
        const old = it.prev.value.find((o) => o.id === item.id);
        const x = old ? old.x + (item.x - old.x) * pi : item.x;
        return <ItemShape key={item.id} item={item} x={x} pop={old ? 1 : pi} table={table} />;
      }),
    ...(it.cur.cut || pi >= 1
      ? []
      : it.prev.value
          .filter((o) => (o.on !== "table" || !table) && Boolean(o.front) === front && !it.cur.value.some((i) => i.id === o.id))
          .map((o) => <ItemShape key={`out-${o.id}`} item={o} x={o.x} pop={Math.max(0, 1 - pi * 1.6)} table={table} />)),
  ];

  const showCD = !(inCall || callOpen > 0.01);
  const picture = (
    <AbsoluteFill>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%">
        <g transform={camera}>
          <SceneBackground id={scene.id} text={"text" in scene ? scene.text : undefined} />
          <SceneDepth id={scene.id} />
          {items(false)}
          {showCD ? shadow(cd, "sh-cd") : null}
          {shadow(tc, "sh-tc")}
          {showCD ? placeChar(cd, "CD") : null}
          {placeChar(tc, "TC")}
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
          {items(true)}
          {track.fx.map((c, i) => {
            // Hiệu ứng không tràn qua ranh giới cảnh hồi ức.
            if (timeline.beats.find((b) => b.memory && c.time >= b.start && c.time < b.end) !== memoryBeat) return null;
            const start = Math.round(c.time * fps);
            const local = frame - start;
            if (local < 0 || local >= FX_FRAMES[c.value.kind]) return null;
            if (c.value.on === "CD" && callOpen > 0.01) return null;
            const who = c.value.on === "CD" ? cd : tc;
            const side = c.value.on === "CD" ? -1 : 1;
            const pop = spring({ frame: local, fps, config: { damping: 9, stiffness: 220 } });
            return (
              <FxShape
                key={i}
                kind={c.value.kind}
                text={c.value.text}
                x={who.x * W + who.dx}
                y={FLOOR - (PUPPET_H - (c.value.on === "TC" && !memoryBeat ? 150 : 80)) * SCALE + who.dy}
                local={local}
                pop={interpolate(pop, [0, 1], [0.2, 1])}
                side={side}
              />
            );
          })}
        </g>
        {/* Tối nhẹ bốn góc để mắt dồn vào giữa khung */}
        <defs>
          <radialGradient id="stage-vignette" cx="0.5" cy="0.45" r="0.9">
            <stop offset="0.7" stopColor="#000000" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.16" />
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#stage-vignette)" />
        {boards ? <BoardPanel changes={track.board} registry={boards} frame={frame} fps={fps} /> : null}
        <CallWindow
          open={memoryBeat ? 0 : callOpen}
          big={callBig}
          puppet={{
            expr: cd.state.expr,
            arms: cd.arms,
            hand: cd.state.hand,
            head: cd.state.head,
            face: cd.state.face,
            back: cd.state.back,
            talk: cd.talk,
            blink: cd.blink,
            legSwing: 0,
            headTilt: cd.headTilt,
            bodyDy: cd.bodyDy,
            headDy: cd.headDy,
            headPop: cd.headPop,
          }}
          fx={(box) =>
            track.fx.map((c, i) => {
              if (c.value.on !== "CD") return null;
              const start = Math.round(c.time * fps);
              const local = frame - start;
              if (local < 0 || local >= FX_FRAMES[c.value.kind]) return null;
              const pop = spring({ frame: local, fps, config: { damping: 9, stiffness: 220 } });
              return (
                <FxShape
                  key={i}
                  kind={c.value.kind}
                  text={c.value.text}
                  x={box.x + box.w * 0.3}
                  y={box.y + box.h * 0.12}
                  local={local}
                  pop={interpolate(pop, [0, 1], [0.2, 1]) * (0.55 + 0.45 * callBig)}
                  side={-1}
                />
              );
            })
          }
        />
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
