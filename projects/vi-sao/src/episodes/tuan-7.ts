import type { Item, Moment, Pose } from "../../../../engine/lib/stage-types.ts";
import { cd, makeEpisode, tc } from "./make.ts";

const week = 7;
const theme = "Căn bếp nhà mình";

/** Mở tập: trong bếp, Thằng Cháu hỏi. */
const hookStage = (opts: { tc?: Pose; items?: Item[]; fx?: Moment["fx"] } = {}): Moment[] => [
  {
    cut: true,
    scene: "kitchen",
    camera: "wide",
    cd: { x: 0.26, expr: "neutral", arms: "down", hand: null },
    tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle", hand: null, ...opts.tc },
    items: opts.items ?? [],
    fx: opts.fx ?? { kind: "question", on: "TC" },
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

export const TUAN_7 = [
  makeEpisode({
    day: 43,
    week,
    theme,
    ask: "Vì sao thái hành lại cay mắt?",
    myth: "Mùi hăng của củ hành làm cay mắt.",
    answer: "Dao làm vỡ tế bào củ hành, sinh ra một chất bay lên làm cay mắt, nên mắt chảy nước mắt.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Onions: Why do they make us cry?", url: "https://askdruniverse.wsu.edu/2016/08/22/onions-make-us-cry/" },
      { title: "University of Illinois Extension: Preparing Onions", url: "https://extension.illinois.edu/gardening/preparing-onions" },
    ],
    question: "Nhà bạn có mẹo gì để thái hành đỡ cay mắt? Các nhà khoa học gợi ý cho hành vào tủ lạnh một lúc trước khi thái đấy!",
    hook: {
      shot: "Trong bếp, Thằng Cháu đứng xa xem mẹ thái hành, dụi mắt rưng rưng",
      lines: [tc("Ông ơi, vì sao thái hành lại cay mắt thế ạ?")],
      stage: hookStage({ tc: { arms: "up2", expr: "sad" }, fx: { kind: "sweat", on: "TC" } }),
    },
    guess: {
      shot: "Thằng Cháu đoán mùi hăng làm cay mắt, Cụ Đồ bảo củ hành để nguyên chẳng làm ai chảy nước mắt",
      lines: [
        tc("Có phải mùi củ hành hăng quá, nên mới làm cay mắt không ông?"),
        cd("Chưa đúng đâu cháu! Củ hành để nguyên trên bàn thì chẳng làm ai chảy nước mắt cả, phải cắt ra mới cay."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: củ hành và kính lúp thấy tế bào; dao (thẻ NGƯỜI LỚN CẦM DAO) làm vỡ tế bào; làn chất có lưu huỳnh bay lên mắt; mắt chảy nước mắt",
      lines: [
        cd("Củ hành cũng được làm từ vô số tế bào nhỏ xíu, xếp sát bên nhau."),
        cd("Khi thái hành, dao làm vỡ tế bào, các chất bên trong trộn vào nhau."),
        cd("Chúng biến thành một chất mới có lưu huỳnh, bay lên không khí, tới tận mắt mình."),
        cd("Dây thần kinh ở mắt thấy cay, liền báo cho tuyến nước mắt, thế là nước mắt chảy ra."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-onion", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-onion", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-onion", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-onion", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp về táo cắt để lâu bị thâm, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao táo cắt ra để lâu lại bị thâm hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 44,
    week,
    theme,
    ask: "Vì sao táo cắt ra để lâu bị thâm?",
    myth: "Táo bị thâm là táo đã hỏng, bẩn, không ăn được nữa.",
    answer: "Cắt táo làm enzim trong táo gặp ôxy trong không khí, sinh ra chất màu nâu, mà táo vẫn ăn được.",
    sources: [
      { title: "UW–Madison News: Curiosities: Why do apple slices turn brown?", url: "https://news.wisc.edu/curiosities-why-do-apple-slices-turn-brown/" },
      {
        title: "Tufts Health & Nutrition Letter: Why do sliced fruits turn brown?",
        url: "https://www.nutritionletter.tufts.edu/ask-experts/q-why-do-sliced-fruits-turn-brown-when-sitting-for-a-period-of-time-at-room-temperature-is-it-safe-to-eat-brown-fruit/",
      },
    ],
    question: "Nhà bạn có mẹo gì giữ táo cắt sẵn không bị thâm? Kể ông nghe với!",
    hook: {
      shot: "Trong bếp, Thằng Cháu nhìn đĩa táo cắt để từ sáng, mặt táo đã ngả nâu",
      lines: [tc("Ông ơi, vì sao táo cắt ra để lâu lại bị thâm ạ?")],
      stage: hookStage(),
    },
    guess: {
      shot: "Thằng Cháu sợ táo thâm là hỏng, Cụ Đồ bảo táo thâm vẫn ăn được, chỉ mặt cắt mới thâm",
      lines: [
        tc("Có phải táo bị thâm là hỏng rồi, không ăn được nữa không ông?"),
        cd("Chưa đúng đâu cháu! Táo thâm vẫn ăn được, mà chỉ có mặt cắt phơi ra không khí mới thâm thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "sad", move: "idle" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: nửa quả táo, dao cắt (thẻ NGƯỜI LỚN CẦM DAO); chấm xanh enzim tràn ra; bong bóng ôxy bay tới; mặt cắt ngả nâu, giống sắt gỉ, vẫn ăn được",
      lines: [
        cd("Khi cắt táo, dao làm vỡ các tế bào ở mặt cắt."),
        cd("Một chất tên là enzim, vốn nằm yên trong tế bào, liền tràn ra."),
        cd("Enzim gặp ôxy trong không khí, cùng nhau biến đổi các chất có sẵn trong táo."),
        cd("Các chất mới sinh ra có màu nâu, nên mặt cắt thâm dần, giống như sắt để lâu bị gỉ."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-apple", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-apple", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-apple", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-apple", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu nhìn mẹ cất đĩa táo vào tủ lạnh, hỏi tiếp, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao cất đồ ăn vào tủ lạnh lại lâu hỏng hơn hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 45,
    week,
    theme,
    ask: "Vì sao cất đồ ăn vào tủ lạnh thì lâu hỏng hơn?",
    myth: "Tủ lạnh làm chết hết vi khuẩn, nên đồ ăn trong tủ không bao giờ hỏng.",
    answer: "Tủ lạnh làm vi khuẩn sinh sôi rất chậm nên đồ ăn lâu hỏng, nhưng vi khuẩn không chết hết, nên vẫn phải ăn sớm.",
    sources: [
      { title: "University of Illinois Extension: Meat Safety: Storing", url: "https://extension.illinois.edu/meat-safety/storing" },
      { title: "Virginia Cooperative Extension (Virginia Tech): Food Storage Guidelines For Consumers", url: "https://www.pubs.ext.vt.edu/348/348-960/348-960.html" },
      { title: "Penn State Extension: Refrigerator and Freezer Storage Guidelines", url: "https://extension.psu.edu/refrigerator-and-freezer-storage-guidelines" },
    ],
    question: "Tủ lạnh nhà bạn có món gì hay bị để quên lâu nhất? Nhớ ăn đồ trong tủ sớm nhé!",
    hook: {
      shot: "Trong bếp, cạnh tủ lạnh, Thằng Cháu tò mò nhìn hộp đồ ăn mẹ vừa cất vào",
      lines: [tc("Ông ơi, vì sao cất đồ ăn vào tủ lạnh lại lâu hỏng ạ?")],
      stage: hookStage({ tc: { arms: "point" }, items: [{ id: "tu", prop: "fridge", x: 0.47 }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán tủ lạnh làm chết hết vi khuẩn, Cụ Đồ bảo đồ ăn cất trong tủ lâu quá vẫn hỏng, vẫn có mùi lạ",
      lines: [
        tc("Có phải tủ lạnh làm chết hết vi khuẩn, nên đồ ăn không hỏng không ông?"),
        cd("Chưa đúng đâu cháu! Đồ ăn cất tủ lạnh lâu quá vẫn hỏng, vẫn có mùi lạ đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: miếng thịt với kính lúp, vài con vi khuẩn bám trên mặt; bên chỗ ấm vi khuẩn sinh sôi đầy, thịt đổi màu, bốc mùi; bên tủ lạnh vi khuẩn ngủ gật, lớn rất chậm; vi khuẩn vẫn còn, thẻ ĂN SỚM NHÉ",
      lines: [
        cd("Đồ ăn tươi như thịt, cá, thường có sẵn vi khuẩn bám trên mặt."),
        cd("Ở chỗ ấm, vi khuẩn sinh sôi rất nhanh, làm đồ ăn nhớt, đổi màu, có mùi lạ, thế là hỏng."),
        cd("Trong tủ lạnh, hầu hết vi khuẩn lớn rất chậm, nên đồ ăn giữ được lâu hơn."),
        cd("Nhưng lạnh không làm chết hết vi khuẩn, để lâu vẫn hỏng, nên đồ trong tủ nhớ ăn sớm nhé."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-fridge", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-fridge", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" } },
        { line: 2, board: { id: "w7-fridge", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w7-fridge", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp về bột bánh mì phồng lên, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao bột bánh mì lại phồng to lên được hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 46,
    week,
    theme,
    ask: "Vì sao bột bánh mì lại phồng lên?",
    myth: "Bột phồng lên vì lúc nhào, mình nhồi không khí vào.",
    answer: "Men nở ăn đường trong bột rồi thải ra khí, khí bị giữ lại thành vô số bong bóng nhỏ làm bột phồng lên.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why does bread expand in the oven?", url: "https://askdruniverse.wsu.edu/2026/04/30/bread-expand-oven/" },
      {
        title: "Colorado State University SOURCE: What every new baker should know about the yeast around us",
        url: "https://source.colostate.edu/what-every-new-baker-should-know-about-the-yeast-all-around-us/",
      },
    ],
    question: "Bạn đã bao giờ tự nhào bột làm bánh chưa?",
    hook: {
      shot: "Trong bếp, cạnh âu bột đã phồng to, Thằng Cháu tròn mắt ngạc nhiên",
      lines: [tc("Ông ơi, vì sao bột bánh mì lại phồng lên được ạ?")],
      stage: hookStage({ items: [{ id: "bot", prop: "bowl", x: 0.47, on: "table" }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán nhào bột là nhồi không khí vào, Cụ Đồ bảo men pha nước đường chưa cần nhào đã sủi bọt",
      lines: [
        tc("Có phải lúc nhào bột, mình nhồi không khí vào nên bột phồng không ông?"),
        cd("Chưa đúng đâu cháu! Pha men với nước ấm và đường, chưa cần nhào gì, nó đã sủi bọt lăn tăn rồi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: kính lúp thấy men nở tí hon; men ăn hạt đường, thải bong bóng khí; cục bột với lưới sợi đạm; lưới giữ bong bóng, bột phồng to",
      lines: [
        cd("Men nở là những cây nấm tí hon, mỗi cây chỉ là một tế bào, nhỏ đến mức mắt không nhìn thấy."),
        cd("Men ăn đường trong bột, rồi ợ ra khí cacbonic."),
        cd("Nhào bột làm các sợi đạm trong bột kết thành một tấm lưới chắc, như mạng nhện."),
        cd("Tấm lưới ấy giữ khí lại thành vô số bong bóng nhỏ, làm bột phồng lên như quả bóng."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-bread", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-bread", step: 1 }, cd: { arms: "wave" }, tc: { expr: "happy" } },
        { line: 2, board: { id: "w7-bread", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "w7-bread", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu cầm thìa inox và thìa gỗ, hỏi tiếp, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao thìa inox sờ vào lại lạnh hơn thìa gỗ hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 47,
    week,
    theme,
    ask: "Vì sao thìa inox sờ vào thấy lạnh hơn thìa gỗ?",
    myth: "Thìa inox lạnh hơn thìa gỗ thật, dù cùng để một chỗ.",
    answer: "Hai thìa nóng lạnh như nhau, nhưng inox kéo hơi ấm khỏi tay nhanh hơn gỗ, nên sờ thấy lạnh hơn.",
    sources: [
      { title: "Illinois Physics Van (University of Illinois): Cold Metal", url: "https://van.physics.illinois.edu/ask/listing/1829" },
      { title: "University of Houston, The Engines of Our Ingenuity No. 1149: Heat Transfer", url: "https://www.uh.edu/engines/epi1149.htm" },
      { title: "HyperPhysics (Georgia State University): Steel and Wood at Zero Celsius", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/woodmet.html" },
    ],
    question: "Bạn thử sờ thìa inox và thìa gỗ để cạnh nhau chưa? Nhớ chỉ thử với thìa nguội nhé!",
    hook: {
      shot: "Trong bếp, Thằng Cháu cầm thử chiếc thìa inox rồi chiếc thìa gỗ để trên bàn, rụt tay lại",
      lines: [tc("Ông ơi, vì sao thìa inox sờ vào lại lạnh hơn thìa gỗ thế ạ?")],
      stage: hookStage({ tc: { arms: "hold" }, items: [{ id: "bat", prop: "bowl", x: 0.47, on: "table" }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán thìa inox lạnh hơn thật, Cụ Đồ bảo để cùng một chỗ thì hai cái thìa nóng lạnh như nhau",
      lines: [
        tc("Có phải thìa inox lạnh hơn thìa gỗ thật không ông?"),
        cd("Chưa đúng đâu! Để cùng một chỗ, hai cái thìa nóng lạnh như nhau, chỉ là tay mình thấy khác thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: thìa inox và thìa gỗ, mỗi thìa có một ngón tay chạm vào; hơi ấm từ tay chảy sang thìa; gỗ dẫn chậm, ít mũi tên; inox dẫn nhanh, nhiều mũi tên; ngón tay trên thìa inox thấy lạnh, thẻ ĐỒ NÓNG: NHỜ NGƯỜI LỚN",
      lines: [
        cd("Tay cháu ấm hơn không khí trong phòng, nên hơi ấm từ tay chảy sang cái thìa."),
        cd("Gỗ dẫn hơi ấm chậm, nên thìa gỗ chỉ lấy đi hơi ấm của tay cháu từ từ thôi."),
        cd("Inox là kim loại, dẫn hơi ấm tốt hơn gỗ nhiều, kéo hơi ấm khỏi ngón tay thật nhanh."),
        cd("Tay nguội nhanh nên thấy lạnh, còn khi thìa nóng, inox lại thấy nóng hơn, nên đồ nóng phải cẩn thận nhé."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-spoon", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-spoon", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-spoon", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-spoon", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp về bong bóng khi nước sôi, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế lúc nước sôi, bong bóng ở đâu ra hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 48,
    week,
    theme,
    ask: "Nước sôi thì bong bóng ở đâu ra?",
    myth: "Bong bóng trong nồi nước sôi là không khí.",
    answer: "Bong bóng to khi nước sôi là hơi nước, tức là nước đã biến thành khí ngay dưới đáy nồi.",
    sources: [
      {
        title: "Ohio State University, Beyond Penguins: Common Misconceptions about States and Changes of Matter",
        url: "https://beyondpenguins.ehe.osu.edu/issue/water-ice-and-snow/common-misconceptions-about-states-and-changes-of-matter-and-the-water-cycle",
      },
      { title: "University of Maryland (W. Breslyn): Boiling, Atmospheric Pressure, and Vapor Pressure", url: "https://terpconnect.umd.edu/~wbreslyn/chemistry/pressure/index-pressure.html" },
      { title: "Illinois Physics Van: What is in the Bubbles When Water Boils?", url: "https://van.physics.illinois.edu/ask/listing/29573" },
      { title: "Bigelow Laboratory for Ocean Sciences: Observing Dissolved Air in Water", url: "https://archive.bigelow.org/virtual/handson/diss_air.html" },
    ],
    question: "Bạn có để ý bong bóng nổi lên lúc nước gần sôi không? Nhớ đứng xa nồi nước sôi nhé!",
    hook: {
      shot: "Trong bếp, nồi nước sôi trên bàn bếp, Thằng Cháu đứng xa nhìn bong bóng sùng sục",
      lines: [tc("Ông ơi, nước sôi thì bong bóng ở đâu ra ạ?")],
      stage: hookStage({ items: [{ id: "noi", prop: "pan", x: 0.47, on: "table" }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán bong bóng là không khí, Cụ Đồ bảo chỉ bọt li ti lúc mới ấm là không khí",
      lines: [
        tc("Có phải bong bóng trong nồi là không khí không ông?"),
        cd("Chỉ đúng một chút thôi! Bọt li ti lúc nước mới ấm là không khí, nhưng đun lại nồi nước ấy, nó vẫn sôi sùng sục bong bóng to."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down", expr: "confused" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: nồi nước trên lửa (thẻ NGƯỜI LỚN ĐUN BẾP), đáy nồi đỏ lên; túi hơi nước nhỏ ở đáy; bong bóng hơi nước nổi lên; hơi nước bay ra, nhắc đứng xa nồi",
      lines: [
        cd("Khi đun nước, phần nước sát đáy nồi được hơ nóng trước."),
        cd("Nóng đủ rồi, nước ở đáy biến thành hơi nước, tức là nước ở dạng khí."),
        cd("Hơi nước gom lại thành bong bóng, rồi nổi dần lên trên."),
        cd("Lên tới mặt nước, bong bóng vỡ, hơi nước thoát ra rất nóng, nên phải đứng xa nồi nhé."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-boil", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-boil", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w7-boil", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w7-boil", step: 3 }, cd: { arms: "raise", expr: "neutral" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hỏi tiếp về nước ngọt có ga sủi bọt, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế sao mở chai nước ngọt có ga, bọt lại sủi lên hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: nextStage,
    },
  }),

  makeEpisode({
    day: 49,
    week,
    theme,
    ask: "Vì sao nước ngọt có ga sủi bọt khi mở nắp?",
    myth: "Bọt là do không khí bên ngoài lọt vào chai.",
    answer: "Khí cacbonic bị ép tan trong nước, mở nắp thì áp suất giảm, khí thoát ra thành bọt.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Soda: Why does it fizz?", url: "https://askdruniverse.wsu.edu/2016/05/09/soda-why-does-it-fizz/" },
      { title: "Illinois Physics Van: Soda Explosions!", url: "https://van.physics.illinois.edu/ask/listing/623" },
      { title: "Illinois Physics Van: Soda Equilibria", url: "https://van.physics.illinois.edu/ask/listing/16078" },
    ],
    question: "Tuần sau là chuyện con vật. Bạn muốn ông giải đáp câu nào?",
    hook: {
      shot: "Trong bếp, Thằng Cháu nhìn cốc nước ngọt có ga sủi bọt lăn tăn",
      lines: [tc("Ông ơi, vì sao mở nắp chai nước ngọt có ga, bọt lại sủi lên ạ?")],
      stage: hookStage(),
    },
    guess: {
      shot: "Thằng Cháu đoán không khí lọt vào chai, Cụ Đồ bảo bọt sủi từ trong lòng nước, trong bọt là khí cacbonic",
      lines: [
        tc("Có phải mở nắp ra, không khí lọt vào chai nên mới có bọt không ông?"),
        cd("Chưa đúng đâu cháu! Bọt sủi lên từ trong lòng nước, trong bọt là khí cacbonic, chính là khí mình thở ra."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: bình khí nhà máy bơm khí cacbonic vào chai; nắp đậy kín, đồng hồ áp suất vọt lên; nắp mở, kim tụt xuống; bong bóng nổi lên, chữ XÈO XÈO",
      lines: [
        cd("Ở nhà máy, người ta bơm khí cacbonic vào nước, khí tan lẫn vào trong nước."),
        cd("Đóng nắp thật kín, rất nhiều khí bị ép chặt, nên áp suất trong chai rất cao."),
        cd("Mở nắp ra, áp suất giảm xuống, nước không giữ nổi nhiều khí như trước nữa."),
        cd("Khí thoát ra thành vô số bong bóng, nổi lên rồi vỡ, kêu xèo xèo."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-soda", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-soda", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-soda", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.5, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-soda", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu hiểu ra vì sao lắc chai rồi mở thì nước bắn tung toé, hứa không lắc nữa; Cụ Đồ hẹn tuần sau hỏi tiếp",
      lines: [
        tc("Thảo nào lắc chai rồi mở là nước bắn tung toé, cháu không lắc nữa đâu!"),
        cd("Ngoan lắm! Tuần sau, cháu lại hỏi ông tiếp nhé!"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
  }),
];
