/**
 * Thông tin để tạo playlist (YouTube + TikTok) cho từng dự án, lấy từ project.json → playlist.
 *   npm run playlist            mọi dự án
 *   npm run playlist -- -p vs   một dự án
 * In ra màn hình và ghi projects/<dự án>/docs/playlist.md.
 * Dự án mới bắt buộc có mục "playlist" trong project.json (thiếu thì lệnh báo lỗi).
 */
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadProject, loadProjects, ROOT, takeProjectArg } from "./projects.mjs";

const REQUIRED = ["title", "description", "tiktokTitle", "visibility", "order", "madeForKids"];
const YT_TITLE_MAX = 150;
const YT_DESC_MAX = 5000;

const fill = (project, text) =>
  text.replaceAll("{postTime}", project.publish?.postTime ?? "").replaceAll("{aiNote}", project.publish?.aiNote ?? "");

/** Ảnh bìa playlist đã xuất (out/<id>/playlist/). */
const coverFiles = (project) =>
  ["bia-playlist-1280x720.png", "bia-playlist-1080x1080.png"]
    .map((f) => `out/${project.id}/playlist/${f}`)
    .filter((f) => existsSync(path.join(ROOT, f)));

export const playlistKit = (project) => {
  const pl = project.playlist;
  const missing = REQUIRED.filter((k) => !pl?.[k]);
  if (missing.length) {
    throw new Error(`Dự án ${project.id}: project.json thiếu playlist.${missing.join(", playlist.")}`);
  }
  const kit = {
    title: fill(project, pl.title),
    description: pl.description.map((l) => fill(project, l)).join("\n"),
    tiktokTitle: fill(project, pl.tiktokTitle),
    visibility: pl.visibility,
    order: pl.order,
    madeForKids: pl.madeForKids,
    covers: coverFiles(project),
  };
  const warn = [];
  if (kit.title.length > YT_TITLE_MAX) warn.push(`Tiêu đề YouTube dài ${kit.title.length} ký tự (tối đa ${YT_TITLE_MAX}).`);
  if (kit.description.length > YT_DESC_MAX) warn.push(`Mô tả YouTube dài ${kit.description.length} ký tự (tối đa ${YT_DESC_MAX}).`);
  if (!kit.covers.length) warn.push("Chưa xuất ảnh bìa playlist (out/<dự án>/playlist/).");
  return { ...kit, warn };
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Tin nhắn Telegram (HTML), mỗi phần một khối <pre> để bấm là sao chép. */
export const formatPlaylistKit = (kit, projectName) =>
  `🎞 <b>${esc(projectName)} · Thông tin tạo playlist</b>

<b>YouTube: tiêu đề</b>
<pre>${esc(kit.title)}</pre>
<b>YouTube: mô tả</b>
<pre>${esc(kit.description)}</pre>
<b>TikTok: tên danh sách phát</b>
<pre>${esc(kit.tiktokTitle)}</pre>
<b>Cài đặt</b>
• Chế độ hiển thị: ${esc(kit.visibility)}
• Thứ tự video: ${esc(kit.order)}
• Dành cho trẻ em: ${esc(kit.madeForKids)}
• Ảnh bìa: ảnh ngang 1280×720 gửi kèm${kit.warn.length ? `\n\n⚠️ ${kit.warn.map(esc).join("\n⚠️ ")}` : ""}`;

export const playlistMarkdown = (kit, project) => `# Thông tin tạo playlist: ${project.name}

Sinh tự động từ \`projects/${project.id}/project.json\` → \`playlist\` bằng \`npm run playlist\`. Muốn sửa thì sửa project.json rồi chạy lại lệnh.

## YouTube

**Tiêu đề** (${kit.title.length}/${YT_TITLE_MAX} ký tự)

\`\`\`text
${kit.title}
\`\`\`

**Mô tả** (${kit.description.length}/${YT_DESC_MAX} ký tự)

\`\`\`text
${kit.description}
\`\`\`

## TikTok

**Tên danh sách phát**

\`\`\`text
${kit.tiktokTitle}
\`\`\`

## Cài đặt

| Mục | Chọn |
| --- | --- |
| Chế độ hiển thị | ${kit.visibility} |
| Thứ tự video | ${kit.order} |
| Dành cho trẻ em | ${kit.madeForKids} |
| Ảnh bìa | ${kit.covers.length ? kit.covers.map((c) => `\`${c}\``).join(", ") : "chưa xuất"} (YouTube dùng ảnh ngang 1280×720) |
${kit.warn.length ? `\n## Cần xử lý\n\n${kit.warn.map((w) => `- ${w}`).join("\n")}\n` : ""}`;

const main = async () => {
  const args = process.argv.slice(2);
  const one = args.some((a) => a === "-p" || a === "--project" || a.startsWith("--project="));
  const projects = one ? [await loadProject(takeProjectArg(args).id)] : await loadProjects();
  let failed = false;
  for (const project of projects) {
    try {
      const kit = playlistKit(project);
      const file = `${project.rel}/docs/playlist.md`;
      writeFileSync(path.join(ROOT, file), playlistMarkdown(kit, project));
      console.log(`\n=== ${project.name} ===\nYouTube tiêu đề:\n${kit.title}\n\nYouTube mô tả:\n${kit.description}\n\nTikTok:\n${kit.tiktokTitle}`);
      for (const w of kit.warn) console.log(`⚠️  ${w}`);
      console.log(`✔ ${file}`);
    } catch (e) {
      failed = true;
      console.error(`✘ ${e.message}`);
    }
  }
  if (failed) process.exitCode = 1;
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) await main();
