import type { Board, Camera, Fx, Item, Moment, Pose, PropRef, RoleId, SceneRef } from "../lib/stage-types.ts";
import type { LineTime, Timeline } from "../lib/timing.ts";
import type { Episode } from "../lib/types.ts";

export type CharState = Required<Pick<Pose, "expr" | "arms" | "move" | "x">> & {
  role: RoleId | null;
  hand: PropRef | null;
  head: PropRef | null;
  face: PropRef | null;
  back: PropRef | null;
};

export const DEFAULT_CD: CharState = {
  role: null,
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
  role: null,
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
  /** Cụ Đồ đang ở trong khung gọi video (xem Moment.call). */
  call: Change<boolean>[];
};

const merge = (prev: CharState, pose: Pose): CharState => ({ ...prev, ...pose }) as CharState;

type Timed = { time: number; order: number; m?: Moment; snapshot?: number; restore?: number };

/** Thời điểm (giây) của một khoảnh khắc: theo câu, theo quãng lặng sau câu (`inPause`), hoặc theo cả nhịp. */
export const momentTime = (m: Moment, line: LineTime | undefined, beat: { start: number; end: number }): number => {
  const at = m.at ?? 0;
  if (line && m.inPause) return line.end + at * line.pause;
  if (line) return line.start + at * (line.end - line.start);
  return beat.start + at * (beat.end - beat.start);
};

/** Mọi tiếng động gắn với khoảnh khắc diễn (`Moment.sfx`), kèm giây phát. */
export const momentSounds = (episode: Episode, timeline: Timeline) =>
  episode.beats.flatMap((beat, b) =>
    (beat.stage ?? []).flatMap((m) => {
      if (!m.sfx) return [];
      const line = m.line === undefined ? undefined : timeline.lines.find((l) => l.beat === b && l.line === m.line);
      return [{ ...m.sfx, time: momentTime(m, line, timeline.beats[b]) }];
    }),
  );

/**
 * Tính thời điểm của từng khoảnh khắc trong kịch bản diễn rồi gom thành các kênh.
 * Nhịp hồi ức (`memory`): chụp lại sân khấu ngay trước nhịp, hết nhịp thì đặt lại y nguyên (cắt thẳng, không chuyển động).
 */
export const buildTrack = (episode: Episode, timeline: Timeline): StageTrack => {
  const timed: Timed[] = [];
  let order = 0;

  episode.beats.forEach((beat, b) => {
    const tb = timeline.beats[b];
    if (beat.memory) {
      // order âm: chạy trước mọi khoảnh khắc cùng thời điểm.
      timed.push({ time: tb.start, order: -2, snapshot: b });
      timed.push({ time: tb.end, order: -1, restore: b });
    }
    for (const m of beat.stage ?? []) {
      const line = m.line === undefined ? undefined : timeline.lines.find((l) => l.beat === b && l.line === m.line);
      const time = momentTime(m, line, tb);
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
    call: [{ time: -1, value: false }],
  };
  const last = <T,>(c: Change<T>[]) => c[c.length - 1].value;
  const saved = new Map<
    number,
    { cd: CharState; tc: CharState; camera: Camera; scene: SceneRef; items: Item[]; board: Board | null; call: boolean }
  >();

  for (const { time, m, snapshot, restore } of timed) {
    if (snapshot !== undefined) {
      saved.set(snapshot, {
        cd: last(track.cd),
        tc: last(track.tc),
        camera: last(track.camera),
        scene: last(track.scene),
        items: last(track.items),
        board: last(track.board),
        call: last(track.call),
      });
      continue;
    }
    if (restore !== undefined) {
      const s = saved.get(restore);
      if (!s) continue;
      track.cd.push({ time, cut: true, value: s.cd });
      track.tc.push({ time, cut: true, value: s.tc });
      track.camera.push({ time, cut: true, value: s.camera });
      track.scene.push({ time, value: s.scene });
      track.items.push({ time, cut: true, value: s.items });
      track.board.push({ time, cut: true, value: s.board });
      track.call.push({ time, cut: true, value: s.call });
      continue;
    }
    if (!m) continue;
    if (m.cd) track.cd.push({ time, cut: m.cut, value: merge(last(track.cd), m.cd) });
    if (m.tc) track.tc.push({ time, cut: m.cut, value: merge(last(track.tc), m.tc) });
    if (m.camera) track.camera.push({ time, cut: m.cut, value: m.camera });
    if (m.scene) track.scene.push({ time, value: m.scene });
    if (m.items) track.items.push({ time, cut: m.cut, value: m.items });
    if (m.board !== undefined) track.board.push({ time, cut: m.cut, value: m.board });
    if (m.call !== undefined) track.call.push({ time, cut: m.cut, value: m.call });
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
