/**
 * Gói đăng bài của "Nói Vậy Mà Không Phải Vậy": tiêu đề + mô tả YouTube Shorts, caption TikTok,
 * hashtag, bình luận ghim. Cấu hình (giờ đăng, hashtag) trong projects/noi-vay/project.json → "publish".
 *
 * Mẫu câu xoay vòng theo số tập để 30 video không trùng tiêu đề / caption, tránh bị coi là nội dung lặp.
 */
import { BASE_CHECKLIST, pick, postWhen, tags } from "../../tools/bot/publish.mjs";

const TITLES = [
  (e) => `“${e.idiom}” nghĩa là gì? Đừng hiểu theo nghĩa đen!`,
  (e) => `Thằng cháu hiểu “${e.idiom}” theo kiểu này 😂`,
  (e) => `“${e.idiom}” hoá ra không phải nghĩa như bạn tưởng!`,
  (e) => `Hiểu sai câu “${e.idiom}” là toang 😅`,
  (e) => `“${e.idiom}” nghĩa thật là gì? Cụ Đồ giảng mới vỡ lẽ`,
  (e) => `Bạn có hiểu đúng câu “${e.idiom}” không?`,
  (e) => `“${e.idiom}” mà hiểu thế này thì Cụ Đồ cũng chịu 🤦`,
];

const TIKTOK_OPENERS = [
  (e) => `“${e.idiom}” mà hiểu theo nghĩa đen thì… 😂`,
  (e) => `Thằng cháu lại hiểu “${e.idiom}” theo kiểu không ai ngờ tới 🤦`,
  (e) => `Câu “${e.idiom}” bạn hiểu thế nào? 👀`,
  (e) => `Ông bà nói “${e.idiom}”, mà không phải vậy đâu nha 😅`,
  (e) => `Cụ Đồ hết hồn vì cách hiểu “${e.idiom}” của cháu 😂`,
];

const PINS = [
  (e, next) => `${e.question} 👇${next ? `\nCâu tiếp theo là “${next}”, ai đoán trước được nghĩa?` : ""}`,
  (e, next) => `Trả lời giúp Cụ Đồ: ${e.question}${next ? `\nCâu tiếp theo: “${next}”, đoán thử xem thằng cháu sẽ hiểu sai thế nào 😆` : ""}`,
  // Chỉ hỏi thật, không xin like / follow / bình luận (TikTok coi là mồi tương tác).
  (e, next) => `Cụ Đồ hỏi thật: ${e.question} 😄${next ? `\nCâu tiếp theo: “${next}”, thằng cháu lại sắp hiểu sai rồi đấy!` : ""}`,
];

/** cfg = project.publish, startDate = ngày đăng tập 1 (YYYY-MM-DD) hoặc null. */
export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  // Thứ tự: tag ngách, tag lớn, tag series, tag chủ đề (xem docs/hashtag.md). Câu thành ngữ đã nằm trong caption để TikTok tìm theo chữ.
  const allTags = (max) => tags([...cfg.hashtags, ...(cfg.themeHashtags?.[episode.theme] ?? [])], max);

  // Tiêu đề chỉ chứa chữ; YouTube tự đưa 3 hashtag đầu trong mô tả lên cạnh tiêu đề, #Shorts không bắt buộc.
  let ytTitle = pick(TITLES, day)(episode);
  if (ytTitle.length > 100) ytTitle = `“${episode.idiom}” nghĩa là gì?`;

  const ytDescription = [
    episode.question,
    `Nghĩa thật: ${episode.meaning}`,
    "",
    `Tập ${day} của “${cfg.seriesName}”: mỗi tập một câu thành ngữ, tục ngữ quen tai mà nhiều người vẫn hiểu sai.`,
    next ? `Câu tiếp theo: “${next}”. Bạn hiểu câu này thế nào?` : "",
    "",
    cfg.aiNote,
    "",
    allTags(cfg.maxHashtagsYoutube).join(" "),
  ]
    // Bỏ dòng trống liền nhau (khi chưa có câu ngày mai).
    .filter((l, i, all) => !(l === "" && all[i - 1] === ""))
    .join("\n");

  const tiktokCaption = [
    pick(TIKTOK_OPENERS, day)(episode),
    episode.question,
    next ? `Câu tiếp theo: “${next}”` : "",
    allTags(cfg.maxHashtagsTiktok).join(" "),
  ]
    .filter(Boolean)
    .join("\n");

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
