/**
 * Gói đăng bài của "Ông Ơi, Chỗ Này Lạ Lắm!": tiêu đề + mô tả YouTube Shorts (kèm nguồn), caption TikTok,
 * hashtag, bình luận ghim (câu hỏi kéo bình luận + nguồn).
 */
import { BASE_CHECKLIST, pick, postWhen, tags } from "../../tools/bot/publish.mjs";

const TITLES = [
  (e) => `${e.title}? Chuyện có thật ở ${e.place}`,
  (e) => `${e.title} 🤯 Vì sao vậy?`,
  (e) => `${e.title}: ít người biết lý do thật`,
];

const TIKTOK_OPENERS = [
  (e) => `${e.title} 🤯 Bạn có biết vì sao không?`,
  (e) => `📍 ${e.place}: ${e.title}`,
  (e) => `${e.title}. Lưu lại để kể cho bạn bè nghe 👀`,
];

export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  const theme = cfg.themeHashtags?.[episode.theme] ?? [];
  const allTags = (max) => tags([...cfg.hashtags.slice(0, 2), ...theme.slice(0, 1), ...cfg.hashtags.slice(2), ...theme.slice(1)], max);

  let ytTitle = `${pick(TITLES, day)(episode)} #Shorts`;
  if (ytTitle.length > 100) ytTitle = `${episode.title} #Shorts`;

  const ytDescription = [
    `${episode.title} (${episode.place}).`,
    "",
    `Tập ${day} của series “${cfg.seriesName}”: Thằng Cháu đi khắp nơi, gặp chuyện lạ là gọi video hỏi Ông. Mỗi tập một điều có thật ở Việt Nam, có số liệu và nguồn.`,
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
    when: postWhen(startDate, day, cfg.postTime),
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
