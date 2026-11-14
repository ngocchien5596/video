// Chọn giọng mẫu: npm run voice:pick -- cu-do 2
import { copyFileSync, existsSync } from "node:fs";

const [name, n] = process.argv.slice(2);
const names = ["cu-do", "thang-chau", "narrator"];
if (!names.includes(name) || !n) {
  console.error(`Cách dùng: npm run voice:pick -- <${names.join("|")}> <số phương án>`);
  process.exit(1);
}
for (const ext of ["wav", "txt"]) {
  const src = `voices/mau/${name}-${n}.${ext}`;
  if (!existsSync(src)) {
    console.error(`Không có ${src}. Chạy npm run voice:design trước.`);
    process.exit(1);
  }
  copyFileSync(src, `voices/${name}.${ext}`);
}
console.log(`voices/${name}.wav = phương án ${n}. Nhớ tạo lại tiếng các tập đã làm (npm run voice -- ...).`);
