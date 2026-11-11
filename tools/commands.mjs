/**
 * In danh sách lệnh của repo kèm mục đích ngắn gọn.
 *   npm run lenh
 * Lệnh nào có trong package.json mà chưa mô tả ở đây thì vẫn được in (mục "Khác").
 */
import { readFileSync } from "node:fs";
import { loadProjects } from "./projects.mjs";

const GROUPS = [
  {
    title: "Xem và kiểm tra",
    items: [
      ["lenh", "", "Danh sách lệnh này"],
      ["dev", "", "Mở Remotion Studio, xem mọi tập của mọi dự án"],
      ["lint", "", "Kiểm tra code và kịch bản có gõ sai cấu trúc không"],
    ],
  },
  {
    title: "Sản xuất một tập (thêm -p vs cho series Vì sao)",
    items: [
      ["voice", "-- 1", "Lồng tiếng tập 1 (chỉ sinh lại câu đã sửa; --force để sinh lại hết)"],
      ["voice:check", "-- 1", "Máy nghe lại tiếng, báo câu đọc sai"],
      ["render", "-- 1", "Xuất video mp4 vào out/<dự án>/video/"],
      ["cover", "-- 1", "Xuất ảnh bìa vào out/<dự án>/cover/"],
      ["srt", "-- 1", "Xuất phụ đề .srt (--no-names để bỏ tên người nói)"],
      ["sheets", "", "Sinh lại kịch bản in trong projects/<dự án>/docs/kich-ban/"],
      ["playlist", "", "Tiêu đề, mô tả để tạo playlist YouTube/TikTok, ghi vào docs/playlist.md"],
      ["build", "", "Đóng gói Remotion (ít khi cần)"],
    ],
  },
  {
    title: "Giọng mẫu (dùng chung mọi dự án)",
    items: [
      ["voice:design", "", "Tạo 4 phương án giọng mỗi vai vào voices/mau/"],
      ["voice:pick", "-- cu-do 3", "Chọn phương án 3 làm giọng Cụ Đồ (thang-chau cho Thằng Cháu)"],
    ],
  },
  {
    title: "Bot Telegram",
    items: [
      ["bot", "", "Chạy bot ở cửa sổ hiện tại (để thử)"],
      ["bot:install", "", "Cài bot chạy ngầm khi đăng nhập Windows (cũng dùng để khởi động lại)"],
      ["bot:uninstall", "", "Gỡ bot chạy ngầm"],
    ],
  },
];

const scripts = Object.keys(JSON.parse(readFileSync("package.json", "utf8")).scripts);
const described = new Set(GROUPS.flatMap((g) => g.items.map(([name]) => name)));
const others = scripts.filter((s) => !described.has(s));

const width = Math.max(...GROUPS.flatMap((g) => g.items.map(([n, a]) => `npm run ${n} ${a}`.trim().length)));
const row = (name, args, desc) => `  ${`npm run ${name} ${args}`.trim().padEnd(width)}   ${desc}`;

const projects = await loadProjects();
console.log("\nDỰ ÁN (chọn bằng -p <mã>, bỏ trống là noi-vay)");
for (const p of projects) console.log(`  ${p.short.padEnd(4)} ${p.id.padEnd(9)} ${p.name}`);
console.log("  Ví dụ: npm run render -- -p vs 1   |   ngày: 5, 1 3 5, 1-7, tuan-2, all");

for (const g of GROUPS) {
  // Viết hoa tên nhóm, giữ nguyên phần trong ngoặc (có tham số như -p vs).
  console.log(`\n${g.title.replace(/^[^(]*/, (s) => s.toUpperCase())}`);
  for (const [name, args, desc] of g.items) if (scripts.includes(name)) console.log(row(name, args, desc));
}
if (others.length) {
  console.log("\nKHÁC");
  for (const name of others) console.log(row(name, "", "(chưa có mô tả)"));
}
console.log("\nTRONG TELEGRAM: gõ /lenh để xem lệnh của bot.\n");
