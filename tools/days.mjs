/**
 * Đọc danh sách ngày từ tham số dòng lệnh.
 * Ví dụ: `1`, `1 3 5`, `1-7`, `tuan-2`, `all`.
 */
export const parseDays = (args) => {
  const days = new Set();
  for (const arg of args) {
    if (arg === "all") {
      for (let d = 1; d <= 30; d++) days.add(d);
    } else if (/^tuan-[1-4]$/.test(arg)) {
      const w = Number(arg.slice(5));
      const ranges = { 1: [1, 7], 2: [8, 14], 3: [15, 21], 4: [22, 30] };
      const [a, b] = ranges[w];
      for (let d = a; d <= b; d++) days.add(d);
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
  if (list.some((d) => d < 1 || d > 30)) throw new Error("Ngày phải từ 1 đến 30");
  return list;
};

export const pad2 = (n) => String(n).padStart(2, "0");
