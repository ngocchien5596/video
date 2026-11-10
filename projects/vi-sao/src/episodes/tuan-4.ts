import type { Moment } from "../../../../engine/lib/stage-types.ts";
import { cd, makeEpisode, tc } from "./make.ts";

const week = 4;
const theme = "Cơ thể mình";
const ages = "5–9 tuổi";

/** Mở tập: trong phòng khách, Thằng Cháu hỏi. */
const hookStage = (extra: Partial<Moment> = {}): Moment[] => [
  {
    cut: true,
    scene: "home",
    camera: "wide",
    cd: { x: 0.26, expr: "neutral", arms: "down", hand: null },
    tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle", hand: null },
    items: [],
    fx: { kind: "question", on: "TC" },
    ...extra,
  },
];

const recapStage: Moment[] = [
  { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
];

/** Hỏi tiếp câu của tập sau, Cụ Đồ hẹn mai. */
const nextStage: Moment[] = [
  { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
  { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
];

export const TUAN_4 = [
  makeEpisode({
    day: 22,
    week,
    theme,
    ask: "Vì sao gân xanh trên tay màu xanh mà máu lại đỏ?",
    myth: "Máu trong gân có màu xanh, ra ngoài gặp không khí mới hoá đỏ.",
    answer: "Máu lúc nào cũng đỏ, gân trông xanh là do ánh sáng đi qua da rồi dội lại mắt.",
    sources: [
      { title: "Ask A Biologist (Arizona State University): Is blood blue?", url: "https://askabiologist.asu.edu/questions/is-blood-blue" },
      { title: "West Texas A&M University (C. Baird): Why are veins blue?", url: "https://www.wtamu.edu/~cbaird/sq/2012/12/18/why-are-veins-blue/" },
    ],
    ages,
    question: "Bé nhà bạn từng nghĩ máu trong gân màu xanh chưa? Kể ông nghe với!",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu giơ mu bàn tay lên, chỉ vào những đường gân xanh",
      lines: [tc("Ông ơi, vì sao gân tay cháu màu xanh, mà máu lại đỏ ạ?")],
      stage: hookStage(),
    },
    guess: {
      shot: "Thằng Cháu đoán máu trong gân màu xanh, Cụ Đồ bảo máu người lúc nào cũng đỏ, chỉ con sam mới có máu xanh",
      lines: [
        tc("Có phải máu trong gân màu xanh, ra ngoài gặp không khí mới hoá đỏ không ông?"),
        cd("Chưa đúng đâu cháu! Máu người lúc nào cũng đỏ, trong gân chỉ đỏ sẫm hơn thôi. Máu xanh thật là của con sam ngoài biển cơ."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.7, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: lát cắt da tay, chùm nắng nhiều màu chiếu vào; ánh đỏ chui sâu tản đi, ánh xanh vào nông dội ra mắt; gân trông xanh mà máu vẫn đỏ sẫm",
      lines: [
        cd("Ánh sáng chiếu vào tay mình có đủ các màu, như cầu vồng trộn lại."),
        cd("Ánh sáng đỏ chui sâu vào da, rồi bị da và lớp mỡ hắt tản đi."),
        cd("Ánh sáng xanh chỉ vào nông, rồi phần lớn dội ngược ra, đi tới mắt mình."),
        cd("Thêm nữa, gân nằm giữa làn da sáng màu hơn, nên mắt càng thấy gân xanh sẫm."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w4-veins", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w4-veins", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w4-veins", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w4-veins", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp về ngón tay nhăn khi ngâm nước, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao ngâm nước lâu, ngón tay cháu lại nhăn nheo hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 23,
    week,
    theme,
    ask: "Vì sao ngâm nước lâu thì ngón tay nhăn nheo?",
    myth: "Da ngón tay hút no nước nên nhăn lại.",
    answer: "Ngón tay nhăn vì thần kinh ra lệnh cho mạch máu đầu ngón co lại, làm đầu ngón bớt đầy.",
    sources: [
      {
        title: "West Texas A&M University (C. Baird): Why do my fingers absorb water and become wrinkled?",
        url: "https://www.wtamu.edu/~cbaird/sq/2015/02/18/why-do-my-fingers-absorb-water-and-become-wrinkled/",
      },
      {
        title: "Binghamton University News: Fingers wrinkle the same way with every water immersion",
        url: "https://www.binghamton.edu/news/story/5547/do-your-fingers-wrinkle-the-same-way-every-time-youre-in-the-water-too-long-new-research-says-yes",
      },
      { title: "UTMB Medical Discovery News: Why Do We Prune in Water?", url: "https://www.utmb.edu/mdnews/welcome/episode/why-do-we-prune-in-water" },
    ],
    ages,
    question: "Bé nhà bạn thích tắm lâu đến mức ngón tay nhăn nheo không? Kể ông nghe với!",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu vừa tắm xong, giơ mười đầu ngón tay nhăn nheo lên ngắm",
      lines: [tc("Ông ơi, vì sao ngâm nước lâu, ngón tay cháu lại nhăn nheo thế ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "up2", expr: "confused", move: "idle", hand: null } }),
    },
    guess: {
      shot: "Thằng Cháu đoán da uống no nước, Cụ Đồ bảo nếu hút nước thì ngón tay phải phồng tròn",
      lines: [
        tc("Có phải da ngón tay uống no nước, nên mới nhăn lại không ông?"),
        cd("Chưa đúng đâu cháu! Nếu da hút no nước, ngón tay phải phồng căng tròn lên chứ, đằng này lại nhăn lại."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: ngón tay nằm ngang, giọt nước bật ra khỏi da; tín hiệu thần kinh chạy tới đầu ngón, mạch máu co lại; đầu ngón nhăn như nho thành nho khô; ngón nhăn cầm viên bi ướt",
      lines: [
        cd("Da mình như một lớp áo mưa, giữ cho nước bên ngoài khó lọt vào trong."),
        cd("Ngâm nước một lúc, dây thần kinh ở tay ra lệnh cho mạch máu ở đầu ngón co nhỏ lại."),
        cd("Mạch máu co lại thì đầu ngón bớt đầy, giống quả nho phơi thành nho khô, da nhăn lại."),
        cd("Các nhà khoa học cho rằng, ngón tay nhăn giúp mình cầm đồ ướt chắc tay hơn."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w4-fingers", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w4-fingers", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w4-fingers", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w4-fingers", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao chạy nhảy xong lại đổ mồ hôi, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao chạy nhảy xong, cháu lại đổ mồ hôi hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 24,
    week,
    theme,
    ask: "Vì sao mình đổ mồ hôi?",
    myth: "Mồ hôi tự nó có mùi hôi.",
    answer: "Mồ hôi bay hơi làm người mình mát đi cho khỏi nóng quá, còn mùi hôi là do vi khuẩn trên da biến đổi mồ hôi.",
    sources: [
      { title: "Cleveland Clinic: Sweat", url: "https://my.clevelandclinic.org/health/body/sweat" },
      { title: "Cleveland Clinic: Body Odor", url: "https://my.clevelandclinic.org/health/symptoms/17865-body-odor" },
      { title: "Harvard Health Publishing: What’s that smell? Common and less common causes of body odor", url: "https://www.health.harvard.edu/healthy-aging-and-longevity/whats-that-smell-common-and-less-common-causes-of-body-odor" },
      { title: "Ohio State University Wexner Medical Center: How to combat excessive sweating", url: "https://health.osu.edu/health/skin-and-body/excessive-sweating" },
    ],
    ages,
    question: "Bé nhà bạn hay đổ mồ hôi nhất lúc nào: lúc chạy nhảy hay lúc trời nắng? Kể ông nghe với!",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu vừa chạy nhảy xong, mồ hôi lấm tấm trên trán",
      lines: [tc("Ông ơi, vì sao chạy nhảy xong, cháu lại đổ mồ hôi ạ?")],
      stage: hookStage({ fx: { kind: "sweat", on: "TC" } }),
    },
    guess: {
      shot: "Thằng Cháu nhăn mũi đoán mồ hôi tự nó hôi, Cụ Đồ bảo mồ hôi gần như toàn là nước, chẳng có mùi gì",
      lines: [
        tc("Mồ hôi hôi lắm, có phải tự nó có mùi hôi không ông?"),
        cd("Chưa đúng đâu! Mồ hôi gần như toàn là nước, tự nó chẳng có mùi gì cả."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "smug", move: "idle" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: bé chạy dưới nắng, nhiệt kế vọt lên, não sáng nháy; lát cắt da với tuyến mồ hôi đẩy giọt mồ hôi ra mặt da; giọt mồ hôi bay hơi, da mát lại; vi khuẩn hoạt hình bên giọt mồ hôi bốc mùi, bọt xà phòng rửa sạch",
      lines: [
        cd("Khi cháu chạy nhảy hay ra nắng, não nhận ra người mình đang nóng hơn bình thường."),
        cd("Não liền báo cho các tuyến mồ hôi trong da, đẩy mồ hôi ra ngoài mặt da."),
        cd("Mồ hôi bay hơi khỏi da, làm da và người mình mát đi, không bị nóng quá."),
        cd("Còn mùi hôi là do vi khuẩn sống sẵn trên da biến đổi mồ hôi, nên tắm rửa sạch sẽ là hết mùi."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w4-sweat", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down", move: "idle" } },
        { line: 1, board: { id: "w4-sweat", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w4-sweat", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w4-sweat", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { expr: "shock" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp về hắt xì hơi, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế còn hắt xì hơi thì sao hả ông, vì sao mình lại hắt xì?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 25,
    week,
    theme,
    ask: "Vì sao mình hắt xì hơi?",
    myth: "Hắt xì hơi là do có người đang nhắc tên mình.",
    answer: "Hắt xì là cách cơ thể tống bụi, phấn hoa ra khỏi mũi bằng một luồng hơi thật mạnh.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why do we sneeze?", url: "https://askdruniverse.wsu.edu/2019/07/12/why-do-we-sneeze/" },
      { title: "Cleveland Clinic: Sneezing", url: "https://my.clevelandclinic.org/health/symptoms/sneezing" },
    ],
    ages,
    question: "Ở nhà bạn, mỗi lần bé hắt xì mọi người hay nói câu gì? Kể ông nghe với!",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu hỏi rồi hắt xì một cái thật to",
      lines: [tc("Ông ơi, vì sao cháu lại hắt xì hơi ạ? Hắt xì!")],
      stage: [
        ...hookStage(),
        { line: 0, at: 0.75, tc: { move: "jump", expr: "shock", arms: "up2" }, fx: { kind: "exclaim", on: "TC", text: "HẮT XÌ!" } },
      ],
    },
    guess: {
      shot: "Thằng Cháu nhắc câu bà hay nói, Cụ Đồ cười: ngửi phải bụi là hắt xì, chẳng cần ai nhắc",
      lines: [
        tc("Bà bảo hắt xì là có người đang nhắc tên cháu, có đúng không ông?"),
        cd("Đó chỉ là câu nói vui thôi cháu! Ngửi phải bụi hay phấn hoa là mũi hắt xì ngay, chẳng cần ai nhắc cả."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: đầu nhìn nghiêng, hạt phấn hoa bay vào mũi; tia thần kinh chạy lên não; phổi bóp, hơi đẩy lên; HẮT XÌ, bụi bay ra, nhắc che miệng",
      lines: [
        cd("Khi bụi hay phấn hoa lọt vào mũi, các tế bào thần kinh trong mũi phát hiện có thứ lạ."),
        cd("Chúng gửi tín hiệu báo lên não, và não tự động ra lệnh, cháu không cần nghĩ."),
        cd("Các cơ ở bụng và cổ họng cùng siết thật mạnh, đẩy hơi từ phổi ra."),
        cd("Hắt xì! Hơi phụt ra qua mũi và miệng, cuốn bụi ra ngoài, nên nhớ che miệng lại nhé."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w4-sneeze", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w4-sneeze", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w4-sneeze", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "w4-sneeze", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { move: "jump", expr: "shock" } },
        { line: 3, at: 0.6, tc: { arms: "hold", expr: "happy", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp về buốt đầu khi ăn kem, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao ăn kem nhanh, cháu lại bị buốt đầu hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 26,
    week,
    theme,
    ask: "Vì sao ăn kem nhanh lại bị buốt đầu?",
    myth: "Ăn kem lạnh làm não bị đông cứng.",
    answer: "Kem lạnh chạm vòm miệng làm mạch máu ở đó đổi kích thước thật nhanh, dây thần kinh báo về não thành cơn buốt đầu, nên ăn kem chậm thôi.",
    sources: [
      { title: "Harvard Health Publishing: What causes brain freeze?", url: "https://www.health.harvard.edu/diseases-and-conditions/what-causes-brain-freeze" },
      { title: "Virginia Tech News: Neuroscientist explains the science of the ‘brain freeze’", url: "https://news.vt.edu/articles/2023/05/Brain_freeze_expert.html" },
    ],
    ages,
    question: "Bé nhà bạn thích kem vị gì nhất? Bình luận cho ông biết nhé!",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu ôm đầu, nhăn mặt sau khi ăn kem vội",
      lines: [tc("Ông ơi, vì sao cháu ăn kem nhanh lại bị buốt đầu thế ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "up2", expr: "sad", move: "idle", hand: null }, fx: { kind: "sweat", on: "TC" } }),
    },
    guess: {
      shot: "Thằng Cháu sợ não bị đông cứng, Cụ Đồ trấn an: cơn buốt chỉ một lúc là hết, không làm hại gì",
      lines: [
        tc("Có phải kem lạnh quá, làm não cháu bị đông cứng lại không ông?"),
        cd("Không phải đâu cháu! Não không hề bị đông cứng, cơn buốt chỉ một lúc là hết, chẳng làm hại gì cả."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "shock", move: "tremble" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down", expr: "confused" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: đầu nhìn nghiêng há miệng, cây kem chạm vòm miệng; mạch máu ở vòm miệng to nhỏ liên hồi; tia thần kinh lên não; ngôi sao BUỐT ĐẦU, một lúc là hết",
      lines: [
        cd("Miếng kem lạnh buốt chạm vào vòm miệng, ở ngay phía trên lưỡi."),
        cd("Mạch máu ở vòm miệng liền thay đổi kích thước, nhanh như chớp."),
        cd("Dây thần kinh nhận ra sự thay đổi đột ngột ấy, vội báo về não."),
        cd("Não hiểu đó là cơn đau, nên cháu thấy buốt ở đầu, nhưng chỉ một lúc là hết."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w4-freeze", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w4-freeze", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w4-freeze", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "w4-freeze", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu ôm hai cánh tay nổi da gà, hỏi tiếp, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao trời lạnh, tay cháu lại nổi da gà hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 27,
    week,
    theme,
    ask: "Vì sao mình nổi da gà?",
    myth: "Chỉ khi bị lạnh, mình mới nổi da gà.",
    answer: "Lúc lạnh hay xúc động, cơ tí hon dưới mỗi sợi lông co lại, kéo lông dựng lên thành những nốt nhỏ.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why do we get goosebumps?", url: "https://askdruniverse.wsu.edu/2021/03/09/why-do-we-get-goosebumps/" },
      { title: "Cleveland Clinic: Goosebumps: What They Are and Why They Happen", url: "https://health.clevelandclinic.org/why-do-you-get-goosebumps" },
      { title: "Harvard Stem Cell & Regenerative Biology: The real reason behind goosebumps", url: "https://hscrb.harvard.edu/news/the-real-reason-behind-goosebumps" },
      { title: "Ask Dr. Universe (Washington State University): Why does music give us chills?", url: "https://askdruniverse.wsu.edu/2018/06/21/music-part-one/" },
    ],
    ages,
    question: "Bé nhà bạn hay nổi da gà lúc nào: lúc lạnh hay lúc nghe nhạc hay? Kể ông nghe với!",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu xoa hai cánh tay nổi da gà, nhìn những nốt nhỏ li ti",
      lines: [tc("Ông ơi, vì sao tay cháu lại nổi da gà thế ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "hold2", expr: "confused", move: "tremble", hand: null } }),
    },
    guess: {
      shot: "Thằng Cháu đoán chỉ lạnh mới nổi da gà, Cụ Đồ bảo nghe bản nhạc hay hay lúc bất ngờ cũng nổi da gà",
      lines: [
        tc("Có phải chỉ khi bị lạnh, mình mới nổi da gà không ông?"),
        cd("Chưa đúng đâu! Có người nghe bản nhạc thật hay, hay lúc bất ngờ, phấn khích, cũng nổi da gà đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "smug", move: "idle" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: lát cắt da với ba sợi lông, mỗi sợi mọc từ nang lông gắn cơ tí hon; bông tuyết, tia thần kinh, cơ co kéo lông dựng; da nổi thành nốt nhỏ; lông dựng giữ lớp không khí sát da",
      lines: [
        cd("Mỗi sợi lông trên tay mọc ra từ một cái túi nhỏ trong da, gắn với một cơ tí hon."),
        cd("Khi bị lạnh, dây thần kinh báo cho cơ tí hon ấy co lại, kéo sợi lông dựng lên."),
        cd("Chỗ mỗi sợi lông dựng nổi lên một nốt nhỏ, trông như da gà."),
        cd("Những sợi lông dựng nghiêng giữ lại một lớp không khí sát da, giúp người mình ấm lên một chút."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w4-goose", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down", move: "idle" } },
        { line: 1, board: { id: "w4-goose", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral", arms: "hold2" } },
        { line: 2, board: { id: "w4-goose", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w4-goose", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu thử tự cù mình mà không thấy nhột, hỏi tiếp, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao cháu tự cù mình lại chẳng thấy nhột gì hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 28,
    week,
    theme,
    ask: "Vì sao mình không tự cù mình được?",
    myth: "Tự cù không nhột là vì mình không có máu buồn.",
    answer: "Não đoán trước được cú cù của chính tay mình, không bất ngờ nên không thấy nhột.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why can’t we tickle ourselves?", url: "https://askdruniverse.wsu.edu/2024/10/31/why-cant-we-tickle-ourselves/" },
      { title: "Neuroscience for Kids (University of Washington): Tickling", url: "https://faculty.washington.edu/chudler/funny.html" },
    ],
    ages,
    question: "Tuần sau là chủ đề cây cối và trái cây. Bé nhà bạn muốn hỏi ông câu gì về cây? Bình luận để ông trả lời nhé!",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu tự cù nách mình, mặt tỉnh bơ",
      lines: [tc("Ông ơi, vì sao cháu tự cù mình mà chẳng thấy nhột gì ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "hips", expr: "confused", move: "idle", hand: null } }),
    },
    guess: {
      shot: "Thằng Cháu đoán mình không có máu buồn, Cụ Đồ cù thử, Thằng Cháu cười nắc nẻ",
      lines: [
        tc("Có phải tại cháu không có máu buồn, nên tự cù chẳng thấy nhột không ông?"),
        cd("Chưa đúng đâu! Thế mà lúc ông cù, cháu cười nắc nẻ đấy thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "smug", move: "idle" } },
        { line: 1, camera: "wide", cd: { arms: "point", expr: "happy", x: 0.42 }, tc: { arms: "down" } },
        { line: 1, at: 0.45, tc: { arms: "up2", expr: "happy", move: "shake" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: lông vũ cù bất ngờ, bé cười; não nhìn nghiêng, tiểu não đoán trước cú cù của tay mình; hai thẻ ĐOÁN = THẬT, khớp; thanh NHỘT tụt xuống, chỉ như gãi",
      lines: [
        cd("Muốn bị nhột, cú cù phải bất ngờ, mình không đoán trước được."),
        cd("Khi tay cháu sắp cù, một phần của não tên là tiểu não đã đoán trước cảm giác sắp tới."),
        cd("Tiểu não so cảm giác thật trên da với điều nó đã đoán, thấy khớp nhau."),
        cd("Khớp rồi thì não tắt bớt cảm giác nhột đi, nên cháu tự cù chỉ thấy như bị gãi thôi."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w4-tickle", step: 0 }, cd: { x: 0.26, arms: "point", expr: "happy" }, tc: { arms: "down", move: "idle", expr: "happy" } },
        { line: 1, board: { id: "w4-tickle", step: 1 }, cd: { arms: "wave" }, tc: { expr: "confused" } },
        { line: 2, board: { id: "w4-tickle", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w4-tickle", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi sang chủ đề cây cối: vì sao cây bắt ruồi lại ăn côn trùng, Cụ Đồ hẹn tuần sau",
      lines: [tc("Ông ơi, thế sao cây bắt ruồi lại ăn côn trùng ạ?"), cd("Câu đó hay lắm! Tuần sau, ông kể cháu nghe nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
  }),
];
