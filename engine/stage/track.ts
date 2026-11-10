import type { Board, Camera, Fx, Item, Moment, Pose, PropRef, SceneRef } from "../lib/stage-types.ts";
import type { Timeline } from "../lib/timing.ts";
import type { Episode } from "../lib/types.ts";

export type CharState = Required<Pick<Pose, "expr" | "arms" | "move" | "x">> & {
  hand: PropRef | null;
  head: PropRef | null;
  face: PropRef | null;
  back: PropRef | null;
};

export const DEFAULT_CD: CharState = {
  expr: "neutral",
  arms: "down",
  move: "idle",
  x: 0.28,
  hand: "fan",
  head: null,
  face: null,
  back: null,
};

export const DEFAULT_TC: CharState = {
  expr: "neutral",
  arms: "down",
  move: "idle",
  x: 0.68,
  hand: null,
  head: null,
  face: null,
  back: null,
};

/** Một lần thay đổi của một kênh (nhân vật, máy quay, phông, đồ vật) tại thời điểm `time` (giây). */
export type Change<T> = { time: number; value: T; cut?: boolean };

export type StageTrack = {
  cd: Change<CharState>[];
  tc: Change<CharState>[];
  camera: Change<Camera>[];
  scene: Change<SceneRef>[];
  items: Change<Item[]>[];
  fx: Change<Fx>[];
  board: Change<Board | null>[];
};

const merge = (prev: CharState, pose: Pose): CharState => ({ ...prev, ...pose }) as CharState;

/** Tính thời điểm của từng khoảnh khắc trong kịch bản diễn rồi gom thành các kênh. */
export const buildTrack = (episode: Episode, timeline: Timeline): StageTrack => {
  const timed: { time: number; order: number; m: Moment }[] = [];
  let order = 0;

  episode.beats.forEach((beat, b) => {
    const tb = timeline.beats[b];
    for (const m of beat.stage ?? []) {
      const at = m.at ?? 0;
      const line = m.line === undefined ? undefined : timeline.lines.find((l) => l.beat === b && l.line === m.line);
      const time = line ? line.start + at * (line.end - line.start) : tb.start + at * (tb.end - tb.start);
      timed.push({ time, order: order++, m });
    }
  });
  timed.sort((a, b) => a.time - b.time || a.order - b.order);

  const track: StageTrack = {
    cd: [{ time: -1, value: DEFAULT_CD }],
    tc: [{ time: -1, value: DEFAULT_TC }],
    camera: [{ time: -1, value: "wide" }],
    scene: [{ time: -1, value: "home" }],
    items: [{ time: -1, value: [] }],
    fx: [],
    board: [{ time: -1, value: null }],
  };

  for (const { time, m } of timed) {
    if (m.cd) track.cd.push({ time, cut: m.cut, value: merge(track.cd[track.cd.length - 1].value, m.cd) });
    if (m.tc) track.tc.push({ time, cut: m.cut, value: merge(track.tc[track.tc.length - 1].value, m.tc) });
    if (m.camera) track.camera.push({ time, cut: m.cut, value: m.camera });
    if (m.scene) track.scene.push({ time, value: m.scene });
    if (m.items) track.items.push({ time, cut: m.cut, value: m.items });
    if (m.board !== undefined) track.board.push({ time, cut: m.cut, value: m.board });
    for (const fx of m.fx === undefined ? [] : Array.isArray(m.fx) ? m.fx : [m.fx]) {
      track.fx.push({ time, value: fx });
    }
  }
  return track;
};

/** Giá trị hiện tại và giá trị trước đó của một kênh tại thời điểm t (để chuyển động mượt). */
export const at = <T,>(changes: Change<T>[], t: number) => {
  let i = 0;
  while (i + 1 < changes.length && changes[i + 1].time <= t) i++;
  return { cur: changes[i], prev: changes[Math.max(0, i - 1)] };
};

export const propId = (p: PropRef | null): string | null => (p === null ? null : typeof p === "string" ? p : p.id);
export const propText = (p: PropRef | null): string | undefined =>
  p !== null && typeof p !== "string" ? p.text : undefined;
