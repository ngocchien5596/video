/**
 * Gói đăng bài (dùng chung): định dạng tin Telegram và file dang-bai.txt.
 * Nội dung gói (tiêu đề, mô tả, caption, hashtag, bình luận ghim) do từng dự án sinh
 * trong projects/<dự án>/publish.mjs → buildPublishKit().
 *
 * Kit: { day, title, when, ytTitle, ytDescription, tiktokCaption, pinned, checklist: string[] }
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { addDays } from "./config.mjs";
import { esc } from "./telegram.mjs";

/** "Ăn quả nhớ kẻ trồng cây" → "anquanhoketrongcay" (dùng làm hashtag). */
export const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

/** Hashtag không trùng, tối đa `max` cái, có dấu #. */
export const tags = (list, max) => [...new Set(list.filter(Boolean))].slice(0, max).map((t) => `#${t}`);

/** Chọn mẫu câu xoay vòng theo số tập, để các tập không trùng tiêu đề / caption. */
export const pick = (list, day) => list[(day - 1) % list.length];

/** "01/12/2026 lúc 19:00" từ ngày bắt đầu + số tập, hoặc chỉ giờ nếu chưa đặt ngày bắt đầu. */
export const postWhen = (startDate, day, postTime) => {
  const date = startDate ? addDays(startDate, day - 1) : null;
  if (date) return `${date.split("-").reverse().join("/")}${postTime ? ` lúc ${postTime}` : ""}`;
  return postTime ? `lúc ${postTime}` : null;
};

/** Việc cần làm trước khi bấm đăng, chung cho mọi dự án. */
export const BASE_CHECKLIST = [
  "Bật nhãn “nội dung do AI tạo” (YouTube: Altered content = Có · TikTok: AI-generated content)",
  "Đăng file mp4 gốc lên từng nền tảng, không tải video có watermark từ nơi khác",
  "YouTube: thêm vào playlist của series · TikTok: chọn ảnh bìa (ảnh gửi kèm)",
  "Ghim bình luận ngay sau khi đăng, trả lời bình luận trong 1 giờ đầu",
];

/** Tin nhắn Telegram (HTML): mỗi phần trong một khối <pre> để bấm là sao chép. */
export const formatPublishKit = (kit, projectName = "") =>
  `📣 <b>${projectName ? `${esc(projectName)} · ` : ""}Đăng bài tập #${kit.day} · “${esc(kit.title)}”</b>${kit.when ? `\n🕖 Đăng ${esc(kit.when)}` : ""}

<b>YouTube Shorts: tiêu đề</b>
<pre>${esc(kit.ytTitle)}</pre>
<b>YouTube Shorts: mô tả</b>
<pre>${esc(kit.ytDescription)}</pre>
<b>TikTok: caption</b>
<pre>${esc(kit.tiktokCaption)}</pre>
<b>Bình luận ghim (cả hai nơi)</b>
<pre>${esc(kit.pinned)}</pre>
${kit.checklist.map((c) => `☐ ${esc(c)}`).join("\n")}`;

/** Bản chữ thường, lưu cạnh video trong out/<dự án>/versions/ngay-XX/vN/dang-bai.txt. */
export const savePublishKit = (dir, kit) => {
  const text = [
    `ĐĂNG BÀI TẬP #${kit.day} · “${kit.title}”${kit.when ? ` · đăng ${kit.when}` : ""}`,
    "",
    "== YouTube Shorts: tiêu đề ==",
    kit.ytTitle,
    "",
    "== YouTube Shorts: mô tả ==",
    kit.ytDescription,
    "",
    "== TikTok: caption ==",
    kit.tiktokCaption,
    "",
    "== Bình luận ghim ==",
    kit.pinned,
    "",
    "== Trước khi bấm đăng ==",
    ...kit.checklist.map((c) => `- ${c}`),
    "",
  ].join("\n");
  writeFileSync(path.join(dir, "dang-bai.txt"), text, "utf8");
};
