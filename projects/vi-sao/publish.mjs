/**
 * Gói đăng bài của "Ông Ơi, Vì Sao?": tiêu đề + mô tả YouTube Shorts (kèm nguồn kiểm chứng), caption TikTok,
 * hashtag, bình luận ghim.
 * Định vị: kiến thức thường thức cho người từ 13 tuổi (học sinh THCS, THPT) và người lớn:
 * "những câu tưởng dễ mà người lớn cũng hay trả lời sai".
 * Không phải nội dung dành cho trẻ dưới 13 tuổi: không viết "cho bé", không ghi lứa tuổi nhỏ, không nói với trẻ nhỏ.
 */
import { BASE_CHECKLIST, pick, postWhen, tags } from "../../tools/bot/publish.mjs";

// Câu hỏi (từ khoá tìm kiếm) luôn đứng đầu.
const TITLES = [
  (e) => `${e.ask} Người lớn cũng hay trả lời sai!`,
  (e) => `${e.ask} Câu tưởng dễ mà nhiều người trả lời sai`,
  (e) => `${e.ask} Hoá ra không phải như bạn nghĩ 🤔`,
  (e) => `${e.ask} Giải thích đúng khoa học trong một phút 🔭`,
];

const TIKTOK_OPENERS = [
  (e) => `${e.ask} 🤔 Nhiều người vẫn nghĩ: “${e.myth}”`,
  (e) => `${e.ask} Câu tưởng dễ, bạn trả lời được không? 👀`,
  (e) => `${e.ask} Lưu lại, lần tới có người hỏi là trả lời được ngay 🔭`,
];

const PINS = [
  (e, next) => `${e.question}${next ? `\nTập sau: ${next}` : ""}`,
  (e, next) => `${e.question}${next ? `\nCâu tiếp: ${next}` : ""}`,
];

export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  // 3 hashtag (TikTok khuyên 2–3): tag series, tag ngách, tag chủ đề tuần.
  const theme = cfg.themeHashtags?.[episode.theme] ?? [];
  const allTags = (max) => tags([...cfg.hashtags.slice(0, 2), ...theme.slice(0, 1), ...cfg.hashtags.slice(2), ...theme.slice(1)], max);

  let ytTitle = `${pick(TITLES, day)(episode)} #Shorts`;
  if (ytTitle.length > 100) ytTitle = `${episode.ask} #Shorts`;

  const ytDescription = [
    `${episode.ask}`,
    `Trả lời ngắn: ${episode.answer}`,
    `Hiểu lầm hay gặp: “${episode.myth}” (chưa đúng).`,
    "",
    `Câu ${day} của series “${cfg.seriesName}”: mỗi ngày một câu hỏi “vì sao” tưởng dễ mà người lớn cũng hay trả lời sai, giải thích đúng khoa học, ngắn gọn.`,
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
    title: episode.ask,
    when: postWhen(startDate, day, cfg.postTime),
    ytTitle,
    ytDescription,
    tiktokCaption,
    pinned: pick(PINS, day)(episode, next),
    checklist: [
      ...BASE_CHECKLIST,
      "YouTube: Đối tượng → “Không, nội dung này không dành cho trẻ em” (series cho người từ 13 tuổi và người lớn, xem docs/series-bible.md mục Đối tượng). Kịch bản nào lỡ nói với trẻ thì sửa trước khi đăng",
      "Kiểm tra lại link nguồn trong mô tả còn mở được",
    ],
  };
};
