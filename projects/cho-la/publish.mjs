/**
 * Gói đăng bài của "Ông Ơi, Chỗ Này Lạ Lắm!": tiêu đề + mô tả YouTube Shorts (kèm nguồn), caption TikTok,
 * hashtag, bình luận ghim (câu hỏi kéo bình luận + nguồn).
 */
import { BASE_CHECKLIST, pick, tags } from "../../tools/bot/publish.mjs";

const TITLES = [
  (e) => `${e.title}? Chuyện có thật ở ${e.place}`,
  (e) => `${e.title}? Lý do thật nghe xong mới thấy hợp lý`,
  (e) => `${e.title}: chuyện thật ở ${e.place} mà ít người biết`,
];

const TIKTOK_OPENERS = [
  (e) => `${e.title}? Chuyện thật ở ${e.place} đấy, bạn đoán vì sao không? 🤯`,
  (e) => `📍 ${e.place}. ${e.title}, nghe thì vô lý mà lại có lý do hẳn hoi 👀`,
  (e) => `${e.title}. Thằng Cháu vừa phát hiện ra, gọi ngay cho Ông hỏi cho ra nhẽ 📱`,
];

export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  const theme = cfg.themeHashtags?.[episode.theme] ?? [];
  // Thứ tự: tag ngách, tag lớn, tag series, tag chủ đề (xem docs/hashtag.md).
  const allTags = (max) => tags([...cfg.hashtags, ...theme], max);

  // Tiêu đề chỉ chứa chữ; YouTube tự đưa 3 hashtag đầu trong mô tả lên cạnh tiêu đề, #Shorts không bắt buộc.
  let ytTitle = pick(TITLES, day)(episode);
  if (ytTitle.length > 100) ytTitle = episode.title;

  const ytDescription = [
    `${episode.title}? Chuyện có thật ở ${episode.place}, và lý do đằng sau mới là phần thú vị.`,
    "",
    `Series “${cfg.seriesName}”: Thằng Cháu đi khắp nơi, gặp chuyện lạ là gọi video hỏi Ông. Mỗi tập một điều có thật ở Việt Nam, kèm số liệu và nguồn.`,
    next ? `Chỗ lạ tiếp theo: ${next}` : "",
    "",
    "Nguồn tham khảo:",
    ...episode.sources.map((s) => `• ${s.title}: ${s.url}`),
    "",
    cfg.aiNote,
    "",
    allTags(cfg.maxHashtagsYoutube).join(" "),
  ]
    .filter((l, i, all) => !(l === "" && all[i - 1] === ""))
    .join("\n");

  const tiktokCaption = [pick(TIKTOK_OPENERS, day)(episode), episode.question, allTags(cfg.maxHashtagsTiktok).join(" ")].join("\n");

  return {
    day,
    title: episode.title,
    when: cfg.postTime || null,
    ytTitle,
    ytDescription,
    tiktokCaption,
    pinned: `${episode.question}\n📚 Nguồn: ${episode.sources.map((s) => s.url).join(" · ")}`,
    checklist: [
      ...BASE_CHECKLIST,
      "YouTube: Đối tượng → “Không, nội dung này không dành cho trẻ em”",
      "Mở lại các link nguồn, kiểm tra số liệu và mốc thời gian còn đúng",
      "Có bản đồ Việt Nam trong video? Phải có Hoàng Sa, Trường Sa",
      "Trong giờ đầu sau khi đăng: trả lời vài bình luận",
    ],
  };
};
