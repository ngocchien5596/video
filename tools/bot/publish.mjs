/**
 * Gói đăng bài (dùng chung): định dạng tin Telegram và file dang-bai.txt.
 * Nội dung gói (tiêu đề, mô tả, caption, hashtag, bình luận ghim) do từng dự án sinh
 * trong projects/<dự án>/publish.mjs → buildPublishKit().
 *
 * Kit: { day, title, when, ytTitle, ytDescription, tiktokCaption, pinned, checklist: string[] }
 * cfg.postTime truyền vào buildPublishKit là chuỗi giờ đã định dạng ("YouTube Shorts 18:30 · TikTok 20:30").
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

/** Ngày đăng (YYYY-MM-DD) của tập `day`, null nếu chưa đặt ngày bắt đầu. */
export const postDate = (startDate, day) => (startDate ? addDays(startDate, day - 1) : null);

/**
 * "01/12/2026 · YouTube Shorts 18:30 · TikTok 20:30".
 * postTime: chuỗi giờ đã định dạng sẵn (tools/schedule.mjs → slotsText).
 */
export const postWhen = (startDate, day, postTime) => {
  const date = postDate(startDate, day);
  if (date) return `${date.split("-").reverse().join("/")}${postTime ? ` · ${postTime}` : ""}`;
  return postTime || null;
};

/**
 * Việc cần làm khi đăng, chung cho mọi dự án (căn cứ: reports/Giờ đăng và cách tăng view.md).
 * Dòng bắt đầu bằng "YouTube:" / "TikTok:" chỉ hiện trong tin nhắc của nền tảng đó.
 */
export const BASE_CHECKLIST = [
  "Đăng file mp4 gốc bot gửi lên từng nền tảng, không dùng bản tải về có logo TikTok / Shorts / CapCut",
  "Bật nhãn “nội dung do AI tạo” (YouTube: Altered content = Có · TikTok: AI-generated content)",
  "Giữ nguyên tiêu đề, caption, 3 hashtag trong gói (từ khoá đã đặt đầu câu)",
  "YouTube: ngôn ngữ video Tiếng Việt · thêm vào playlist của series · thêm “Video liên quan” trỏ tới tập trước (hoặc tập 1)",
  "TikTok: chọn ảnh bìa (ảnh gửi kèm)",
  "Ghim bình luận ngay sau khi đăng, trả lời bình luận trong 1–2 giờ đầu; không xin like / follow (TikTok coi là mồi tương tác)",
  "Video yếu: KHÔNG xoá rồi đăng lại (dễ bị coi là spam / nội dung lặp), rút kinh nghiệm cho tập sau",
];

/** Việc xem số liệu một tập sau 48 giờ (gửi kèm lời nhắc đăng bài). */
export const METRICS_CHECKLIST = [
  "YouTube Studio → Phân tích: tỉ lệ “Đã xem” (so với “Đã lướt qua”), % thời lượng đã xem, chỗ người xem rời đi, “engaged views”",
  "TikTok Studio: thời gian xem trung bình, % xem hết, % lượt xem từ For You, có cờ “không đủ điều kiện For You” không",
  "Ghi lượt xem 48 giờ hai nơi vào cột ghi_chu của tracker.csv. So trung vị theo khung giờ, không so trung bình",
];

/**
 * Tin nhắn Telegram (HTML): mỗi phần trong một khối <pre> để bấm là sao chép.
 * only: "youtube" | "tiktok" → chỉ phần của nền tảng đó (nhắc đúng giờ đăng nơi đó).
 */
export const formatPublishKit = (kit, projectName = "", only = null) => {
  const yt = !only || only === "youtube";
  const tt = !only || only === "tiktok";
  const where = only === "youtube" ? " · YouTube Shorts" : only === "tiktok" ? " · TikTok" : "";
  const checklist = kit.checklist.filter((c) => (yt || !c.startsWith("YouTube:")) && (tt || !c.startsWith("TikTok:")));
  return [
    `📣 <b>${projectName ? `${esc(projectName)} · ` : ""}Đăng bài tập #${kit.day}${where} · “${esc(kit.title)}”</b>${kit.when ? `\n🕖 Đăng ${esc(kit.when)}` : ""}`,
    "",
    ...(yt ? ["<b>YouTube Shorts: tiêu đề</b>", `<pre>${esc(kit.ytTitle)}</pre>`, "<b>YouTube Shorts: mô tả</b>", `<pre>${esc(kit.ytDescription)}</pre>`] : []),
    ...(tt ? ["<b>TikTok: caption</b>", `<pre>${esc(kit.tiktokCaption)}</pre>`] : []),
    `<b>Bình luận ghim${only ? "" : " (cả hai nơi)"}</b>`,
    `<pre>${esc(kit.pinned)}</pre>`,
    checklist.map((c) => `☐ ${esc(c)}`).join("\n"),
  ].join("\n");
};

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
