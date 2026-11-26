/**
 * Gói đăng bài của "Ông Ơi, Vì Sao?": tiêu đề + mô tả YouTube Shorts (kèm nguồn kiểm chứng), caption TikTok,
 * hashtag, bình luận ghim.
 * Định vị: kiến thức thường thức cho người từ 13 tuổi (học sinh THCS, THPT) và người lớn:
 * "những câu tưởng dễ mà người lớn cũng hay trả lời sai".
 * Không phải nội dung dành cho trẻ dưới 13 tuổi: không viết "cho bé", không ghi lứa tuổi nhỏ, không nói với trẻ nhỏ.
 */
import { BASE_CHECKLIST, pick, tags } from "../../tools/bot/publish.mjs";

const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const unquote = (s) => s.replace(/[.!]+$/, "");

// Câu hỏi (từ khoá tìm kiếm) luôn đứng đầu; đuôi câu gợi tò mò, không lộ đáp án.
const TITLES = [
  (e) => `${e.ask} Người lớn cũng hay trả lời sai!`,
  (e) => `${e.ask} Hoá ra không phải như bạn nghĩ`,
  (e) => `${e.ask} Đáp án đơn giản mà ít ai nói đúng`,
  (e) => `${e.ask} Nghe Cụ Đồ giải thích là nhớ luôn`,
];

// Caption TikTok KHÔNG nói đáp án: người xem phải xem video mới biết.
const TIKTOK_OPENERS = [
  (e) => `${e.ask} Nhiều người tin là “${unquote(e.myth)}”, nhưng không phải đâu 🤔`,
  (e) => `Hỏi nhanh: ${lowerFirst(e.ask)} Đoán trước rồi xem Cụ Đồ giải thích nhé 👀`,
  (e) => `${e.ask} Câu tưởng dễ mà khối người lớn trả lời sai đấy 😅`,
];

const PINS = [
  (e, next) => `${e.question}${next ? `\nCâu tiếp theo: ${next} Bạn đoán thử xem!` : ""}`,
  (e, next) => `${e.question}${next ? `\nTập sau Thằng Cháu sẽ hỏi: ${next}` : ""}`,
];

export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  // Thứ tự: tag ngách, tag lớn, tag series, tag chủ đề tuần (xem docs/hashtag.md).
  const theme = cfg.themeHashtags?.[episode.theme] ?? [];
  const allTags = (max) => tags([...cfg.hashtags, ...theme], max);

  // Tiêu đề chỉ chứa chữ; YouTube tự đưa 3 hashtag đầu trong mô tả lên cạnh tiêu đề, #Shorts không bắt buộc.
  let ytTitle = pick(TITLES, day)(episode);
  if (ytTitle.length > 100) ytTitle = episode.ask;

  const ytDescription = [
    `${episode.ask} Nhiều người nghĩ là “${unquote(episode.myth)}”, nhưng chưa đúng.`,
    `Tóm lại: ${episode.answer}`,
    "",
    `“${cfg.seriesName}”: những câu “vì sao” tưởng dễ mà người lớn cũng hay trả lời sai, Cụ Đồ giải thích ngắn gọn, đúng khoa học.`,
    next ? `Câu tiếp theo: ${next}` : "",
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
    next ? `Câu tiếp theo: ${next}` : "",
    allTags(cfg.maxHashtagsTiktok).join(" "),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    day,
    title: episode.ask,
    when: cfg.postTime || null,
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
