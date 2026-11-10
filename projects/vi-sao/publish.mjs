/**
 * Gói đăng bài của "Ông Ơi, Vì Sao?": tiêu đề + mô tả YouTube Shorts (kèm nguồn kiểm chứng), caption TikTok,
 * hashtag, bình luận ghim. Định vị: nội dung cho cả nhà, phụ huynh xem cùng con.
 */
import { BASE_CHECKLIST, pick, postWhen, slug, tags } from "../../tools/bot/publish.mjs";

const TITLES = [
  (e) => `${e.ask} Giải thích dễ hiểu cho bé 🔭`,
  (e) => `Con hỏi: “${e.ask}” Trả lời thế nào cho đúng?`,
  (e) => `${e.ask} Nhiều người lớn cũng trả lời sai!`,
  (e) => `Ông ơi, ${e.ask.charAt(0).toLowerCase()}${e.ask.slice(1)} 🤔`,
];

const TIKTOK_OPENERS = [
  (e) => `${e.ask} 🤔 Hiểu lầm hay gặp: “${e.myth}”`,
  (e) => `Bé hỏi “${e.ask}”, bố mẹ trả lời được không? 👀`,
  (e) => `Không phải ai cũng biết: ${e.ask.charAt(0).toLowerCase()}${e.ask.slice(1)}`,
];

const PINS = [
  (e, next) => `${e.question}${next ? `\nTập sau: ${next}` : ""}`,
  (e, next) => `Bố mẹ lưu lại để kể cho bé nhé! ${e.question}${next ? `\nCâu tiếp: ${next}` : ""}`,
];

export const buildPublishKit = (episode, next, { cfg, startDate = null, total = 30 }) => {
  const day = episode.day;
  const allTags = (max) => tags([...cfg.hashtags.slice(0, 1), slug(episode.ask), ...cfg.hashtags.slice(1), ...(cfg.themeHashtags?.[episode.theme] ?? [])], max);

  let ytTitle = `${pick(TITLES, day)(episode)} #Shorts`;
  if (ytTitle.length > 100) ytTitle = `${episode.ask} #Shorts`;

  const ytDescription = [
    `${episode.ask}`,
    `Trả lời ngắn: ${episode.answer}`,
    `Hiểu lầm hay gặp: “${episode.myth}” (chưa đúng).`,
    "",
    `Câu ${day} của series “${cfg.seriesName}”: mỗi ngày một câu hỏi “vì sao” của trẻ, giải thích đúng khoa học, dễ hiểu. Phù hợp ${episode.ages}, bố mẹ xem cùng con.`,
    next ? `Câu hỏi tiếp theo: ${next}` : "",
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

  const tiktokCaption = [
    pick(TIKTOK_OPENERS, day)(episode),
    `Trả lời: ${episode.answer}`,
    `Câu ${day}${next ? ` · Tiếp: ${next}` : ""}`,
    allTags(cfg.maxHashtagsTiktok).join(" "),
  ].join("\n");

  return {
    day,
    total,
    title: episode.ask,
    when: postWhen(startDate, day, cfg.postTime),
    ytTitle,
    ytDescription,
    tiktokCaption,
    pinned: pick(PINS, day)(episode, next),
    checklist: [
      ...BASE_CHECKLIST,
      "YouTube: khai báo “Nội dung dành cho trẻ em” đúng sự thật (xem docs/series-bible.md, mục Đối tượng)",
      "Kiểm tra lại link nguồn trong mô tả còn mở được",
    ],
  };
};
