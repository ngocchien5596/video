/**
 * Gói đăng bài cho mỗi tập: tiêu đề + mô tả YouTube Shorts, caption TikTok, hashtag, bình luận ghim,
 * giờ đăng gợi ý. Sinh từ dữ liệu tập (không cần Claude), cấu hình trong bot.config.json → "publish".
 *
 * Mẫu câu xoay vòng theo số tập để 30 video không trùng tiêu đề / caption, tránh bị coi là nội dung lặp.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { addDays } from "./config.mjs";
import { esc } from "./telegram.mjs";

export const PUBLISH_DEFAULTS = {
  /** Giờ đăng gợi ý (HH:MM), null = không ghi. */
  postTime: "19:00",
  seriesName: "Nói Vậy Mà Không Phải Vậy",
  /** Hashtag luôn có (không có dấu #). */
  hashtags: ["thanhngu", "tucngu", "tiengviet", "hoctiengviet", "noivaymakhongphaivay"],
  /** Hashtag thêm theo chủ đề tuần (khớp trường theme của tập). */
  themeHashtags: {
    "Ăn uống": ["amthuc"],
    "Con vật": ["convat"],
    "Học hành, tiền bạc": ["hocsinh"],
    "Cư xử, gia đình": ["giadinh"],
  },
  /** Số hashtag tối đa: YouTube hiện 3 cái đầu trên tiêu đề, TikTok để ngắn cho gọn. */
  maxHashtagsYoutube: 6,
  maxHashtagsTiktok: 6,
  aiNote: "Video có giọng đọc và hình ảnh được tạo với sự hỗ trợ của AI.",
};

const TITLES = [
  (e) => `“${e.idiom}” nghĩa là gì? Đừng hiểu theo nghĩa đen!`,
  (e) => `Thằng cháu hiểu “${e.idiom}” theo kiểu này 😂`,
  (e) => `“${e.idiom}”: hoá ra không phải vậy!`,
  (e) => `Hiểu sai câu “${e.idiom}” là toang 😅`,
  (e) => `Cụ Đồ giải nghĩa “${e.idiom}” cho thằng cháu`,
  (e) => `Bạn có hiểu đúng câu “${e.idiom}” không?`,
  (e) => `“${e.idiom}” mà hiểu thế này thì Cụ Đồ cũng chịu 🤦`,
];

const TIKTOK_OPENERS = [
  (e) => `“${e.idiom}” mà hiểu theo nghĩa đen thì… 😂`,
  (e) => `Thằng cháu lại hiểu sai “${e.idiom}” rồi 🤦`,
  (e) => `Câu “${e.idiom}” bạn hiểu thế nào? 👀`,
  (e) => `Nói “${e.idiom}” mà không phải vậy đâu nha 😅`,
  (e) => `Cụ Đồ hết hồn vì cách hiểu “${e.idiom}” của cháu 😂`,
];

const PINS = [
  (e, next) => `${e.question} 👇${next ? `\nMai là câu “${next}”, ai đoán trước được nghĩa?` : ""}`,
  (e, next) => `Trả lời giúp Cụ Đồ: ${e.question}${next ? `\nTập sau: “${next}”, đoán thử xem thằng cháu sẽ hiểu sai thế nào 😆` : ""}`,
  (e, next) => `${e.question} Bình luận đi, Cụ Đồ chấm điểm 😄${next ? `\nMai: “${next}”` : ""}`,
];

const pick = (list, day) => list[(day - 1) % list.length];

/** "Ăn quả nhớ kẻ trồng cây" → "anquanhoketrongcay" */
export const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const hashtags = (episode, cfg, max) => {
  const tags = [slug(episode.idiom), ...cfg.hashtags, ...(cfg.themeHashtags[episode.theme] ?? [])];
  return [...new Set(tags.filter(Boolean))].slice(0, max).map((t) => `#${t}`);
};

/**
 * Sinh gói đăng bài.
 * opts: { config (bot.config.json), startDate (YYYY-MM-DD hoặc null) }
 */
export const buildPublishKit = (episode, next, { config = {}, startDate = null } = {}) => {
  const cfg = {
    ...PUBLISH_DEFAULTS,
    ...config.publish,
    themeHashtags: { ...PUBLISH_DEFAULTS.themeHashtags, ...config.publish?.themeHashtags },
  };
  const day = episode.day;

  const ytTags = hashtags(episode, cfg, cfg.maxHashtagsYoutube);
  let ytTitle = `${pick(TITLES, day)(episode)} #Shorts`;
  if (ytTitle.length > 100) ytTitle = `“${episode.idiom}” nghĩa là gì? #Shorts`;

  const ytDescription = [
    episode.question,
    `Nghĩa thật: ${episode.meaning}`,
    "",
    `Ngày ${day}/30 của series “${cfg.seriesName}”: mỗi ngày một câu thành ngữ, tục ngữ bị hiểu sai theo nghĩa đen.`,
    next ? `Mai là câu: “${next}”, đoán trước nghĩa trong bình luận nhé!` : "Đây là tập cuối của series, cảm ơn bạn đã xem hết 30 ngày!",
    "",
    cfg.aiNote,
    "",
    ytTags.join(" "),
  ].join("\n");

  const tiktokCaption = [
    `${pick(TIKTOK_OPENERS, day)(episode)} ${episode.question}`,
    `Ngày ${day}/30${next ? ` · Mai: “${next}”` : " · Tập cuối"}`,
    hashtags(episode, cfg, cfg.maxHashtagsTiktok).join(" "),
  ].join("\n");

  const pinned = pick(PINS, day)(episode, next);
  const postDate = startDate ? addDays(startDate, day - 1) : null;
  const when = postDate ? `${postDate.split("-").reverse().join("/")}${cfg.postTime ? ` lúc ${cfg.postTime}` : ""}` : cfg.postTime ? `lúc ${cfg.postTime}` : null;

  return { day, idiom: episode.idiom, when, ytTitle, ytDescription, tiktokCaption, pinned };
};

const CHECKLIST = [
  "Bật nhãn “nội dung do AI tạo” (YouTube: Altered content = Có · TikTok: AI-generated content)",
  "Đăng file mp4 gốc lên từng nền tảng, không tải video có watermark từ nơi khác",
  "YouTube: thêm vào playlist của series · TikTok: chọn ảnh bìa (ảnh gửi kèm)",
  "Ghim bình luận ngay sau khi đăng, trả lời bình luận trong 1 giờ đầu",
];

/** Tin nhắn Telegram (HTML): mỗi phần trong một khối <pre> để bấm là sao chép. */
export const formatPublishKit = (kit) =>
  `📣 <b>Đăng bài ngày ${kit.day}/30 · “${esc(kit.idiom)}”</b>${kit.when ? `\n🕖 Đăng ${esc(kit.when)}` : ""}

<b>YouTube Shorts: tiêu đề</b>
<pre>${esc(kit.ytTitle)}</pre>
<b>YouTube Shorts: mô tả</b>
<pre>${esc(kit.ytDescription)}</pre>
<b>TikTok: caption</b>
<pre>${esc(kit.tiktokCaption)}</pre>
<b>Bình luận ghim (cả hai nơi)</b>
<pre>${esc(kit.pinned)}</pre>
${CHECKLIST.map((c) => `☐ ${esc(c)}`).join("\n")}`;

/** Bản chữ thường, lưu cạnh video trong out/versions/ngay-XX/vN/dang-bai.txt. */
export const savePublishKit = (dir, kit) => {
  const text = [
    `ĐĂNG BÀI NGÀY ${kit.day}/30 · “${kit.idiom}”${kit.when ? ` · đăng ${kit.when}` : ""}`,
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
    ...CHECKLIST.map((c) => `- ${c}`),
    "",
  ].join("\n");
  writeFileSync(path.join(dir, "dang-bai.txt"), text, "utf8");
};
