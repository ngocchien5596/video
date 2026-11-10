/**
 * Sinh kịch bản quay dạng Markdown từ dữ liệu trong projects/<dự án>/src/episodes.
 * Dữ liệu là nguồn duy nhất; đừng sửa tay file trong docs/kich-ban.
 *   npm run sheets                 -> projects/noi-vay/docs/kich-ban/tuan-1.md ...
 *   npm run sheets -- -p vi-sao
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { timedBeats } from "../engine/lib/timing.ts";
import { loadEpisodes, loadProject, takeProjectArg } from "./projects.mjs";

const WHO = { CD: "**CĐ**", TC: "**TC**", NARRATOR: "" };
const cell = (s) => s.replace(/\|/g, "\|");
const sec = (n) => (Number.isInteger(n) ? n : n.toFixed(1));

const { id } = takeProjectArg(process.argv.slice(2));
const project = await loadProject(id);
const { EPISODES } = await loadEpisodes(project);
mkdirSync(project.paths.sheets, { recursive: true });

const weeks = [...new Set(EPISODES.map((e) => e.week))].sort((a, b) => a - b);
for (const week of weeks) {
  const eps = EPISODES.filter((e) => e.week === week);
  const parts = [
    `# Kịch bản tuần ${week}: ${eps[0].theme}`,
    "",
    `> File sinh tự động bằng \`npm run sheets -- -p ${project.id}\` từ \`${project.rel}/src/episodes/\`. Sửa ở đó, đừng sửa ở đây.`,
    "> CĐ = Cụ Đồ, TC = Thằng Cháu.",
    "",
  ];
  for (const ep of eps) {
    parts.push(`## Ngày ${ep.day}: ${project.headline(ep)}`, "");
    for (const f of project.fields(ep)) parts.push(`- **${f.label}:** ${f.text}`);
    for (const line of project.sheetInfo?.(ep) ?? []) parts.push(`- ${line}`);
    parts.push(`- **Footage:** ${ep.footage ?? "chưa có (đặt file vào public/footage/)"}`, "");
    parts.push("| Giây | Nhịp | Cảnh | Thoại |", "| --- | --- | --- | --- |");
    for (const b of timedBeats(ep)) {
      const lines = b.lines.map((l) => `${WHO[l.who]}: ${cell(l.text)}`).join("<br>") || "_(không thoại)_";
      parts.push(`| ${sec(b.start)}–${sec(b.end)} | ${project.beats[b.kind] ?? b.kind} | ${cell(b.shot)} | ${lines} |`);
    }
    parts.push("");
  }
  const file = `${project.paths.sheets}/tuan-${week}.md`;
  writeFileSync(file, parts.join("\n"), "utf8");
  console.log(`✔ ${file}`);
}
