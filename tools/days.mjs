/**
 * Đọc danh sách tập từ tham số dòng lệnh.
 * Ví dụ: `1`, `1 3 5`, `1-7`, `tuan-2`, `all`.
 * Không giới hạn số tập: `all` là mọi tập đã viết, `tuan-N` là các tập có `week: N` trong kịch bản.
 * `episodes` là danh sách tập của dự án (loadEpisodes).
 */
export const parseDays = (args, episodes) => {
  const days = new Set();
  for (const arg of args) {
    if (arg === "all") {
      for (const e of episodes) days.add(e.day);
    } else if (/^tuan-\d+$/.test(arg)) {
      const week = Number(arg.slice(5));
      const inWeek = episodes.filter((e) => e.week === week);
      if (!inWeek.length) {
        const weeks = [...new Set(episodes.map((e) => e.week))].join(", ");
        throw new Error(`Dự án chưa có ${arg}. Các tuần đã có: ${weeks || "(chưa có tập nào)"}`);
      }
      for (const e of inWeek) days.add(e.day);
    } else if (/^\d+-\d+$/.test(arg)) {
      const [a, b] = arg.split("-").map(Number);
      for (let d = a; d <= b; d++) days.add(d);
    } else if (/^\d+$/.test(arg)) {
      days.add(Number(arg));
    } else {
      throw new Error(`Không hiểu tham số "${arg}". Dùng: 1 | 1-7 | tuan-2 | all`);
    }
  }
  const list = [...days].sort((a, b) => a - b);
  if (list.some((d) => d < 1)) throw new Error("Số tập phải từ 1 trở lên");
  return list;
};

export { pad2 } from "./projects.mjs";
