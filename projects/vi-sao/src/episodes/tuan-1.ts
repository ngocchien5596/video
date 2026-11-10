import { cd, makeEpisode, tc } from "./make.ts";

const week = 1;
const theme = "Bầu trời và thời tiết";

export const TUAN_1 = [
  makeEpisode({
    day: 1,
    week,
    theme,
    ask: "Vì sao bầu trời màu xanh?",
    myth: "Trời xanh vì soi bóng nước biển.",
    answer: "Không khí hắt ánh sáng xanh đi khắp bầu trời, nên trời có màu xanh.",
    sources: [
      { title: "NASA Space Place: Why Is the Sky Blue?", url: "https://spaceplace.nasa.gov/blue-sky/en/" },
      { title: "Royal Museums Greenwich: Why is the sky blue?", url: "https://www.rmg.co.uk/stories/topics/why-sky-blue" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn từng hỏi câu “vì sao” nào khiến bạn bí nhất? Kể ông nghe với!",
    teaser: "Vì sao hoàng hôn lại đỏ cam?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu giơ tay chỉ lên trời, mặt thắc mắc",
      lines: [tc("Ông ơi, vì sao bầu trời lại màu xanh ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán theo cách hiểu sai phổ biến, Cụ Đồ lắc đầu, đưa bằng chứng sa mạc",
      lines: [
        tc("Có phải vì trời soi bóng xuống biển, nên mới xanh như nước biển không ông?"),
        cd("Nhiều người cũng nghĩ thế, nhưng chưa đúng đâu! Ở sa mạc chẳng có biển nào, trời vẫn xanh đấy."),
      ],
      stage: [
        // "Có phải vì trời soi bóng xuống biển"
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        // "Nhiều người cũng nghĩ thế, nhưng chưa đúng đâu!"
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        // "Ở sa mạc chẳng có biển nào, trời vẫn xanh đấy."
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mặt trời chiếu ánh sáng trắng, tách thành các màu, đi qua hạt khí; màu xanh bị hắt khắp trời",
      lines: [
        cd("Ánh nắng trông màu trắng, nhưng thật ra gồm đủ các màu cầu vồng trộn lại."),
        cd("Khi chiếu xuống, ánh nắng phải đi qua vô số hạt khí li ti trong không khí."),
        cd("Ánh sáng xanh bị các hạt khí hắt văng ra khắp nơi, nhiều hơn hẳn màu đỏ, màu vàng."),
        cd("Thế là nhìn chỗ nào trên trời, mắt mình cũng gặp ánh sáng xanh."),
      ],
      stage: [
        // "Ánh nắng trông màu trắng"
        { line: 0, camera: "wide", board: { id: "sky-blue", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        // "nhưng thật ra gồm đủ các màu cầu vồng trộn lại"
        { line: 0, at: 0.45, board: { id: "sky-blue", step: 1 }, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        // "phải đi qua vô số hạt khí li ti trong không khí"
        { line: 1, at: 0.4, board: { id: "sky-blue", step: 2 }, cd: { arms: "wave" }, tc: { expr: "confused" } },
        // "Ánh sáng xanh bị các hạt khí hắt văng ra khắp nơi"
        { line: 2, at: 0.1, board: { id: "sky-blue", step: 3 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.5, tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
        // "Thế là nhìn chỗ nào trên trời, mắt mình cũng gặp ánh sáng xanh."
        { line: 3, at: 0.05, board: { id: "sky-blue", step: 4 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.55, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp về hoàng hôn, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao lúc hoàng hôn, trời lại đỏ cam hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),
];
