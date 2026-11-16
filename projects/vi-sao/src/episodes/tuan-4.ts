import type { Moment } from "../../../../engine/lib/stage-types.ts";
import { cd, makeEpisode, tc } from "./make.ts";

const week = 4;
const theme = "Cơ thể mình";

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

export const TUAN_4 = [
  makeEpisode({
    day: 5,
    week,
    theme,
    ask: "Vì sao gân xanh trên tay màu xanh mà máu lại đỏ?",
    myth: "Máu trong gân có màu xanh, ra ngoài gặp không khí mới hoá đỏ.",
    answer: "Máu lúc nào cũng đỏ cả, còn gân trông xanh là vì ánh đỏ bị máu nuốt bớt, ánh xanh lại dội về mắt nhiều hơn.",
    sources: [
      { title: "Ask A Biologist (Arizona State University): Is blood blue?", url: "https://askabiologist.asu.edu/questions/is-blood-blue" },
      { title: "West Texas A&M University (C. Baird): Why are veins blue?", url: "https://www.wtamu.edu/~cbaird/sq/2012/12/18/why-are-veins-blue/" },
    ],
    question: "Bạn từng nghĩ máu trong gân tay màu xanh chưa?",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu giơ mu bàn tay lên, chỉ vào những đường gân xanh",
      lines: [tc("Ông ơi, vì sao gân tay cháu màu xanh, mà máu lại đỏ ạ?")],
      stage: hookStage(),
    },
    guess: {
      shot: "Thằng Cháu đoán máu trong gân màu xanh, Cụ Đồ bảo máu người lúc nào cũng đỏ, chỉ con sam mới có máu xanh",
      lines: [
        tc("Cháu biết rồi! Máu trong gân vốn màu xanh, chảy ra ngoài gặp không khí thì mới hoá đỏ, đúng không ông?"),
        cd("Xanh đâu mà xanh! Máu người lúc nào chả đỏ, nằm trong gân thì nó chỉ đỏ sẫm hơn tí thôi. Máu xanh thật thì phải tìm đến con sam ngoài biển cơ."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.7, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: lát cắt da tay, chùm nắng nhiều màu chiếu vào; ánh đỏ chui sâu tới gân, bị máu nuốt bớt, ánh xanh vào nông dội ra mắt; gân trông xanh mà máu vẫn đỏ sẫm",
      lines: [
        cd("Cháu xem này, ánh sáng rọi vào tay mình có đủ các màu, như cầu vồng trộn lại với nhau ấy."),
        cd("Thế ánh đỏ đi đâu? Nó chui tọt sâu vào trong da, tới tận chỗ gân, rồi bị máu trong gân nuốt bớt đi đấy."),
        cd("Còn ánh xanh chỉ đi vào được một quãng nông thôi, phần lớn lại dội ngược ra, về tới mắt mình."),
        cd("Đã thế, gân lại nằm giữa làn da sáng màu hơn nó, nên mắt mình càng thấy nó xanh sẫm."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu lại vừa nghĩ ra một câu vì sao nữa rồi!"), cd("Lại câu gì nữa đây? Thôi, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 25,
    week,
    theme,
    ask: "Vì sao ngâm nước lâu thì ngón tay nhăn nheo?",
    myth: "Da ngón tay hút no nước nên nhăn lại.",
    answer: "Ngón tay nhăn là vì thần kinh ra lệnh cho mạch máu ở đầu ngón tay co lại, làm đầu ngón bớt căng đầy.",
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
    question: "Bạn có hay ngâm nước lâu đến mức ngón tay nhăn nheo không?",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu vừa tắm xong, giơ mười đầu ngón tay nhăn nheo lên ngắm",
      lines: [tc("Ông ơi, vì sao ngâm nước lâu, ngón tay cháu lại nhăn nheo thế ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "up2", expr: "confused", move: "idle", hand: null } }),
    },
    guess: {
      shot: "Thằng Cháu đoán da uống no nước, Cụ Đồ bảo nếu hút nước thì ngón tay phải phồng tròn",
      lines: [
        tc("Chắc tại da ngón tay uống no nước quá nên mới nhăn lại hả ông?"),
        cd("Uống no gì mà uống! Hút no nước thì ngón tay phải phồng căng lên chứ, đằng này nó lại nhăn nheo, thế là thế nào?"),
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
        cd("Nước có vào được mấy đâu! Da mình như cái áo mưa ấy, chỉ thấm tí chút ở lớp ngoài, chứ khó mà lọt sâu vào trong."),
        cd("Thế mà ngâm nước một lúc, dây thần kinh ở tay lại ra lệnh, bắt các mạch máu ở đầu ngón tay co nhỏ lại."),
        cd("Mạch máu co lại thì đầu ngón tay bớt căng đầy, thế là lớp da bên ngoài mới nhăn lại, như quả nho phơi thành nho khô đấy."),
        cd("Mà các nhà khoa học cho rằng, ngón tay nhăn thế lại giúp mình cầm đồ ướt chắc tay hơn cơ."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu lại vừa nghĩ ra một câu vì sao nữa rồi!"), cd("Lại câu gì nữa đây? Thôi, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 10,
    week,
    theme,
    ask: "Vì sao mình không tự cù mình được?",
    myth: "Tự cù không nhột là vì mình không có máu buồn.",
    answer: "Não đoán trước được cú cù của chính tay mình, mà đã không bất ngờ thì chẳng thấy nhột nữa.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why can’t we tickle ourselves?", url: "https://askdruniverse.wsu.edu/2024/10/31/why-cant-we-tickle-ourselves/" },
      { title: "Neuroscience for Kids (University of Washington): Tickling", url: "https://faculty.washington.edu/chudler/funny.html" },
    ],
    question: "Bạn có sợ nhột không? Bị cù chỗ nào là bạn chịu thua ngay?",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu tự cù nách mình, mặt tỉnh bơ",
      lines: [tc("Ông ơi, vì sao cháu tự cù mình mà chẳng thấy nhột gì ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "hips", expr: "confused", move: "idle", hand: null } }),
    },
    guess: {
      shot: "Thằng Cháu đoán mình không có máu buồn, Cụ Đồ cù thử, Thằng Cháu cười nắc nẻ",
      lines: [
        tc("Chắc tại cháu không có máu buồn, nên tự cù mình mới chẳng thấy nhột gì hả ông?"),
        cd("Máu buồn gì mà máu buồn! Để ông cù thử xem nào... Đấy, cười nắc nẻ thế kia còn gì!"),
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
        cd("Thấy chưa, ông cù thì cháu nhột ngay, vì muốn thấy nhột thì cú cù phải bất ngờ, mình không đoán trước được cơ."),
        cd("Thế mà cháu vừa định đưa tay lên cù mình, thì một phần não gọi là tiểu não đã đoán sẵn cảm giác sắp tới rồi."),
        cd("Rồi tiểu não đem cảm giác thật trên da ra so với cái nó đã đoán, thì thấy khớp y hệt luôn."),
        cd("Mà đã khớp thì não sẽ dìm bớt cảm giác nhột đi. Thế nên cháu tự cù cũng chỉ thấy như gãi ngứa thôi."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu lại vừa nghĩ ra một câu vì sao nữa rồi!"), cd("Lại câu gì nữa đây? Thôi, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 31,
    week,
    theme,
    ask: "Vì sao mình nổi da gà?",
    myth: "Chỉ khi bị lạnh, mình mới nổi da gà.",
    answer: "Lúc bị lạnh hay xúc động, cơ tí hon dưới mỗi sợi lông sẽ co lại, kéo lông dựng đứng, làm da nổi thành những nốt nhỏ.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why do we get goosebumps?", url: "https://askdruniverse.wsu.edu/2021/03/09/why-do-we-get-goosebumps/" },
      { title: "Cleveland Clinic: Goosebumps: What They Are and Why They Happen", url: "https://health.clevelandclinic.org/why-do-you-get-goosebumps" },
      { title: "Harvard Stem Cell & Regenerative Biology: The real reason behind goosebumps", url: "https://hscrb.harvard.edu/news/the-real-reason-behind-goosebumps" },
      { title: "Ask Dr. Universe (Washington State University): Why does music give us chills?", url: "https://askdruniverse.wsu.edu/2018/06/21/music-part-one/" },
    ],
    question: "Bạn hay nổi da gà lúc nào: lúc lạnh hay lúc nghe một bản nhạc hay?",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu xoa hai cánh tay nổi da gà, nhìn những nốt nhỏ li ti",
      lines: [tc("Ông ơi, vì sao tay cháu lại nổi da gà thế ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "hold2", expr: "confused", move: "tremble", hand: null } }),
    },
    guess: {
      shot: "Thằng Cháu đoán chỉ lạnh mới nổi da gà, Cụ Đồ bảo nghe bản nhạc hay hay lúc bất ngờ cũng nổi da gà",
      lines: [
        tc("Cái này dễ! Chỉ khi bị lạnh mình mới nổi da gà, đúng không ông?"),
        cd("Đâu chỉ có lạnh cháu ạ! Có người nghe một bản nhạc hay, hoặc lúc bị giật mình, lúc phấn khích, cũng nổi da gà như thường đấy."),
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
        cd("Cháu xem, mỗi sợi lông trên tay mọc ra từ một cái túi nhỏ trong da, có gắn một cơ tí hon."),
        cd("Hễ gặp lạnh, hay lúc mình xúc động mạnh, dây thần kinh lại bảo cơ tí hon ấy co lại, kéo sợi lông dựng đứng lên."),
        cd("Sợi lông dựng chỗ nào, da nổi lên một nốt nhỏ chỗ ấy, trông y như da con gà vừa vặt lông vậy."),
        cd("Với thú nhiều lông, lông dựng lên sẽ giữ được lớp không khí ấm sát da, còn người mình lông thưa nên chẳng ấm thêm được bao nhiêu."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay quá ông ạ! Mai ông lại kể cho cháu nghe chuyện khác nữa nhé?"), cd("Được chứ! Cháu cứ hỏi, rồi ông kể dần cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 15,
    week,
    theme,
    ask: "Vì sao mình hắt xì hơi?",
    myth: "Hắt xì hơi là do có người đang nhắc tên mình.",
    answer: "Hắt xì là cách cơ thể tống bụi với phấn hoa ra khỏi mũi bằng một luồng hơi thật mạnh.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why do we sneeze?", url: "https://askdruniverse.wsu.edu/2019/07/12/why-do-we-sneeze/" },
      { title: "Cleveland Clinic: Sneezing", url: "https://my.clevelandclinic.org/health/symptoms/sneezing" },
    ],
    question: "Ở nhà bạn, mỗi lần có người hắt xì, mọi người hay nói câu gì?",
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
        tc("Bà bảo hắt xì là có ai đang nhắc tên cháu đấy, đúng không ông?"),
        cd("Bà nói vui đấy thôi cháu ạ! Hít phải tí bụi hay phấn hoa là mũi hắt xì ngay, cần gì ai nhắc."),
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
        cd("Bụi hay phấn hoa vừa lọt vào mũi là tế bào thần kinh trong mũi nhận ra ngay có thứ lạ chui vào đấy."),
        cd("Chúng báo ngay lên não, thế là não tự ra lệnh hắt xì, cháu chẳng phải nghĩ gì cả."),
        cd("Cháu hít vào một hơi thật sâu, rồi cơ bụng với cổ họng cùng siết mạnh, đẩy bật luồng hơi từ phổi ra."),
        cd("Hắt xì! Hơi phụt ra cả đằng mũi lẫn đằng miệng, cuốn bụi ra ngoài. Mà nhớ lấy khuỷu tay che miệng lại nhé!"),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu lại vừa nghĩ ra một câu vì sao nữa rồi!"), cd("Lại câu gì nữa đây? Thôi, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 20,
    week,
    theme,
    ask: "Vì sao ăn kem nhanh lại bị buốt đầu?",
    myth: "Ăn kem lạnh làm não bị đông cứng.",
    answer: "Kem lạnh làm mạch máu ở vòm miệng co giãn thật nhanh, dây thần kinh liền báo về não, thế là buốt cả đầu. Vậy nên cứ ăn kem từ từ thôi.",
    sources: [
      { title: "Harvard Health Publishing: What causes brain freeze?", url: "https://www.health.harvard.edu/diseases-and-conditions/what-causes-brain-freeze" },
      { title: "Virginia Tech News: Neuroscientist explains the science of the ‘brain freeze’", url: "https://news.vt.edu/articles/2023/05/Brain_freeze_expert.html" },
    ],
    question: "Bạn thích kem vị gì nhất?",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu ôm đầu, nhăn mặt sau khi ăn kem vội",
      lines: [tc("Ông ơi, vì sao cháu ăn kem nhanh lại bị buốt đầu thế ạ?")],
      stage: hookStage({ tc: { x: 0.66, arms: "up2", expr: "sad", move: "idle", hand: null }, fx: { kind: "sweat", on: "TC" } }),
    },
    guess: {
      shot: "Thằng Cháu sợ não bị đông cứng, Cụ Đồ trấn an: cơn buốt chỉ một lúc là hết, không làm hại gì",
      lines: [
        tc("Chết rồi, hay kem lạnh quá, làm não cháu đông cứng lại rồi hả ông?"),
        cd("Làm gì có chuyện ấy cháu! Não chẳng đông cứng tí nào đâu, cơn buốt một lúc là hết, chẳng hại gì cả."),
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
        cd("Thật ra là thế này, miếng kem lạnh buốt chạm ngay vào vòm miệng, chỗ phía trên lưỡi ấy."),
        cd("Thế là mạch máu ở vòm miệng co lại, rồi giãn ra, nhanh như chớp."),
        cd("Dây thần kinh ở đó thấy thay đổi đột ngột quá, liền vội vàng báo tin về não."),
        cd("Não lại tưởng đấy là cơn đau ở trán, thế là cháu bị buốt cả đầu đấy!"),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu lại vừa nghĩ ra một câu vì sao nữa rồi!"), cd("Lại câu gì nữa đây? Thôi, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 37,
    week,
    theme,
    ask: "Vì sao mình đổ mồ hôi?",
    myth: "Mồ hôi tự nó có mùi hôi.",
    answer: "Mồ hôi bay hơi để làm mát người, còn mùi hôi là do vi khuẩn trên da phân huỷ mồ hôi.",
    sources: [
      { title: "Cleveland Clinic: Sweat", url: "https://my.clevelandclinic.org/health/body/sweat" },
      { title: "Cleveland Clinic: Body Odor", url: "https://my.clevelandclinic.org/health/symptoms/17865-body-odor" },
      { title: "Harvard Health Publishing: What’s that smell? Common and less common causes of body odor", url: "https://www.health.harvard.edu/healthy-aging-and-longevity/whats-that-smell-common-and-less-common-causes-of-body-odor" },
      { title: "Ohio State University Wexner Medical Center: How to combat excessive sweating", url: "https://health.osu.edu/health/skin-and-body/excessive-sweating" },
    ],
    question: "Bạn hay đổ mồ hôi nhất lúc nào: lúc vận động hay lúc trời nắng?",
    hook: {
      shot: "Trong phòng khách, Thằng Cháu vừa chạy nhảy xong, mồ hôi lấm tấm trên trán",
      lines: [tc("Ông ơi, vì sao chạy nhảy xong, cháu lại đổ mồ hôi ạ?")],
      stage: hookStage({ fx: { kind: "sweat", on: "TC" } }),
    },
    guess: {
      shot: "Thằng Cháu nhăn mũi đoán mồ hôi tự nó hôi, Cụ Đồ bảo mồ hôi gần như toàn là nước, chẳng có mùi gì",
      lines: [
        tc("Eo, mồ hôi hôi rình! Chắc tự nó sinh ra đã hôi sẵn rồi hả ông?"),
        cd("Hôi đâu mà hôi! Mồ hôi gần như toàn là nước thôi, lúc mới rịn ra thì chẳng có mùi gì đâu."),
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
        cd("Thế mồ hôi tiết ra để làm gì? Cháu chạy nhảy hay ra nắng một lúc là não biết ngay người mình đang nóng lên đấy."),
        cd("Não liền ra lệnh cho các tuyến mồ hôi nằm dưới da, bắt chúng đẩy mồ hôi ra ngoài."),
        cd("Đến lúc mồ hôi bay hơi, nó mang theo hơi nóng đi mất, nhờ vậy người mình mới mát dần, không bị nóng quá."),
        cd("Còn mùi hôi á? Ấy là do lũ vi khuẩn sống sẵn trên da phân huỷ mồ hôi đấy, nên chịu khó tắm rửa sạch sẽ là đỡ mùi hẳn."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu còn cả đống câu vì sao muốn hỏi ông nữa cơ!"), cd("Thế thì từ từ, mỗi hôm ông kể cho một chuyện nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),
];
