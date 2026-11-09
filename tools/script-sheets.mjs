/**
 * Sinh kịch bản quay dạng Markdown từ dữ liệu trong src/episodes.
 * Dữ liệu là nguồn duy nhất; đừng sửa tay file trong docs/kich-ban.
 *   npm run sheets   -> docs/kich-ban/tuan-1.md ... tuan-4.md
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { EPISODES } from "../src/episodes/index.ts";
import { timedBeats } from "../src/lib/timing.ts";

const BEAT = {
  hook: "Hook",
  title: "Đặt câu",
  misread: "Hiểu sai",
  flip: "Lật nghĩa",
  example: "Ví dụ",
  punchline: "Punchline",
};
const WHO = { CD: "**CĐ**", TC: "**TC**", NARRATOR: "" };
const cell = (s) => s.replace(/\|/g, "\|");
const sec = (n) => (Number.isInteger(n) ? n : n.toFixed(1));

mkdirSync("docs/kich-ban", { recursive: true });

for (const week of [1, 2, 3, 4]) {
  const eps = EPISODES.filter((e) => e.week === week);
  const parts = [
    `# Kịch bản tuần ${week}: ${eps[0].theme}`,
    "",
    "> File sinh tự động bằng `npm run sheets` từ `src/episodes/`. Sửa ở đó, đừng sửa ở đây.",
    "> CĐ = Cụ Đồ, TC = Thằng Cháu.",
    "",
  ];
  for (const ep of eps) {
    parts.push(`## Ngày ${ep.day}: ${ep.idiom}`, "");
    parts.push(`- **Nghĩa thật:** ${ep.meaning}`);
    parts.push(`- **Câu hỏi ghim bình luận:** ${ep.question}`);
    parts.push(`- **Footage:** ${ep.footage ?? "chưa có (đặt file vào public/footage/)"}`, "");
    parts.push("| Giây | Nhịp | Cảnh | Thoại |", "| --- | --- | --- | --- |");
    for (const b of timedBeats(ep)) {
      const lines = b.lines.map((l) => `${WHO[l.who]}: ${cell(l.text)}`).join("<br>") || "_(không thoại)_";
      parts.push(`| ${sec(b.start)}–${sec(b.end)} | ${BEAT[b.kind]} | ${cell(b.shot)} | ${lines} |`);
    }
    parts.push("");
  }
  const file = `docs/kich-ban/tuan-${week}.md`;
  writeFileSync(file, parts.join("\n"), "utf8");
  console.log(`✔ ${file}`);
}
