/**
 * Gói đăng bài của "Nói Vậy Mà Không Phải Vậy": tiêu đề + mô tả YouTube Shorts, caption TikTok,
 * hashtag, bình luận ghim. Cấu hình (giờ đăng, hashtag) trong projects/noi-vay/project.json → "publish".
 *
 * Mẫu câu xoay vòng theo số tập để 30 video không trùng tiêu đề / caption, tránh bị coi là nội dung lặp.
 */
import { BASE_CHECKLIST, pick, postWhen, slug, tags } from "../../tools/bot/publish.mjs";

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
  // Chỉ hỏi thật, không xin like / follow / bình luận (TikTok coi là mồi tương tác).
  (e, next) => `Cụ Đồ hỏi thật: ${e.question} 😄${next ? `\nMai: “${next}”` : ""}`,
];

/** cfg = project.publish, startDate = ngày đăng tập 1 (YYYY-MM-DD) hoặc null. */
export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  const allTags = (max) => tags([slug(episode.idiom), ...cfg.hashtags, ...(cfg.themeHashtags?.[episode.theme] ?? [])], max);

  let ytTitle = `${pick(TITLES, day)(episode)} #Shorts`;
  if (ytTitle.length > 100) ytTitle = `“${episode.idiom}” nghĩa là gì? #Shorts`;

  const ytDescription = [
    episode.question,
    `Nghĩa thật: ${episode.meaning}`,
    "",
    `Tập ${day} của series “${cfg.seriesName}”: mỗi ngày một câu thành ngữ, tục ngữ bị hiểu sai theo nghĩa đen.`,
    next ? `Mai là câu: “${next}”, đoán trước nghĩa trong bình luận nhé!` : "",
    "",
    cfg.aiNote,
    "",
    allTags(cfg.maxHashtagsYoutube).join(" "),
  ]
    // Bỏ dòng trống liền nhau (khi chưa có câu ngày mai).
    .filter((l, i, all) => !(l === "" && all[i - 1] === ""))
    .join("\n");

  const tiktokCaption = [
    `${pick(TIKTOK_OPENERS, day)(episode)} ${episode.question}`,
    `Tập ${day}${next ? ` · Mai: “${next}”` : ""}`,
    allTags(cfg.maxHashtagsTiktok).join(" "),
  ].join("\n");

  return {
    day,
    title: episode.idiom,
    when: postWhen(startDate, day, cfg.postTime),
    ytTitle,
    ytDescription,
    tiktokCaption,
    pinned: pick(PINS, day)(episode, next),
    checklist: BASE_CHECKLIST,
  };
};
