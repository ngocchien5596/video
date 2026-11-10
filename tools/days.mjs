/**
 * Đọc danh sách ngày từ tham số dòng lệnh.
 * Ví dụ: `1`, `1 3 5`, `1-7`, `tuan-2`, `all`.
 * `project` cho biết số tập và các tuần (project.json → totalDays, weeks).
 */
export const parseDays = (args, project) => {
  const total = project?.totalDays ?? 30;
  const weeks = project?.weeks ?? {};
  const days = new Set();
  for (const arg of args) {
    if (arg === "all") {
      for (let d = 1; d <= total; d++) days.add(d);
    } else if (/^tuan-\d+$/.test(arg)) {
      const range = weeks[arg.slice(5)];
      if (!range) throw new Error(`Dự án không có ${arg}. Các tuần: ${Object.keys(weeks).join(", ") || "(không chia tuần)"}`);
      for (let d = range[0]; d <= range[1]; d++) days.add(d);
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
  if (list.some((d) => d < 1 || d > total)) throw new Error(`Ngày phải từ 1 đến ${total}`);
  return list;
};

export { pad2 } from "./projects.mjs";
