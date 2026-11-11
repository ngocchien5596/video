/**
 * Giờ đăng theo từng nền tảng (YouTube Shorts, TikTok), ngày thường / cuối tuần.
 *
 * project.json → publish.postTimes:
 *   { "youtube": { "weekday": "18:30", "weekend": "08:30" }, "tiktok": { "weekday": "20:30", "weekend": "20:30" } }
 * Đặt qua bot (/giodang) thì lưu vào .bot/state.json → projects.<id>.postTimes, cùng dạng, ghi đè từng ô.
 * Dự án cũ chỉ có publish.postTime ("11:30") thì dùng giờ đó cho mọi nền tảng, mọi ngày.
 * Căn cứ chọn giờ: reports/Giờ đăng và cách tăng view.md.
 */

export const PLATFORMS = [
  { id: "youtube", name: "YouTube Shorts", short: "yt" },
  { id: "tiktok", name: "TikTok", short: "tt" },
];

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
export const isTime = (t) => TIME.test(t ?? "");

/** "YYYY-MM-DD" → true nếu là thứ 7 hoặc chủ nhật. */
export const isWeekend = (date) => {
  const [y, m, d] = date.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return wd === 0 || wd === 6;
};

/** Bảng giờ đầy đủ { youtube: {weekday, weekend}, tiktok: {...} } sau khi gộp project.json và giá trị đặt qua bot. */
export const postTable = (project, override = {}) => {
  const base = project.publish?.postTimes ?? {};
  const legacy = override.postTime || project.publish?.postTime || "11:30";
  return Object.fromEntries(
    PLATFORMS.map(({ id }) => {
      const b = base[id] ?? {};
      const o = override.postTimes?.[id] ?? {};
      const weekday = o.weekday || (override.postTime && !override.postTimes ? legacy : b.weekday) || legacy;
      const weekend = o.weekend || (override.postTime && !override.postTimes ? legacy : b.weekend) || weekday;
      return [id, { weekday, weekend }];
    }),
  );
};

/** Các mốc đăng của một ngày: [{ platform, name, time }], sắp theo giờ. */
export const postSlots = (project, date, override = {}) => {
  const table = postTable(project, override);
  const key = date && isWeekend(date) ? "weekend" : "weekday";
  return PLATFORMS.map((p) => ({ platform: p.id, name: p.name, short: p.short, time: table[p.id][key] })).sort((a, b) =>
    a.time.localeCompare(b.time),
  );
};

/** "YouTube Shorts 18:30 · TikTok 20:30" cho một ngày (không biết ngày thì lấy ngày thường). */
export const slotsText = (project, date, override = {}) =>
  postSlots(project, date, override)
    .map((s) => `${s.name} ${s.time}`)
    .join(" · ");

/** Tóm tắt cả tuần: "YouTube Shorts 18:30 (T7, CN 08:30) · TikTok 20:30". */
export const tableText = (project, override = {}) => {
  const table = postTable(project, override);
  return PLATFORMS.map(({ id, name }) => {
    const { weekday, weekend } = table[id];
    return weekday === weekend ? `${name} ${weekday}` : `${name} ${weekday} (T7, CN ${weekend})`;
  }).join(" · ");
};
