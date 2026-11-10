import { cd, makeEpisode, tc } from "./make.ts";

const week = 2;
const theme = "Con vật kỳ lạ";

export const TUAN_2 = [
  makeEpisode({
    day: 8,
    week,
    theme,
    ask: "Vì sao chim hồng hạc lại màu hồng?",
    myth: "Hồng hạc sinh ra đã có sẵn bộ lông màu hồng.",
    answer: "Hồng hạc màu hồng vì thức ăn của nó có sắc tố, giống chất màu trong củ cà rốt.",
    sources: [
      { title: "Smithsonian's National Zoo: American flamingo", url: "https://nationalzoo.si.edu/animals/american-flamingo" },
      { title: "San Diego Zoo Animals & Plants: Flamingo", url: "https://animals.sandiegozoo.org/animals/flamingo" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn thích con vật nào có màu sắc lạ nhất? Kể ông nghe với!",
    hook: {
      shot: "Ngoài sân, Thằng Cháu giơ tay hỏi về chim hồng hạc, mặt thắc mắc",
      lines: [tc("Ông ơi, vì sao chim hồng hạc lại màu hồng ạ?")],
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
      shot: "Thằng Cháu đoán hồng hạc sinh ra đã hồng, Cụ Đồ đưa bằng chứng: hồng hạc con có lông tơ xám hay trắng",
      lines: [
        tc("Có phải hồng hạc sinh ra đã mặc sẵn bộ lông màu hồng không ông?"),
        cd("Chưa đúng đâu cháu! Hồng hạc con mới nở chỉ có lông tơ màu xám hay trắng, phải mấy năm sau mới hồng dần."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: hồng hạc ăn tảo và tôm tép; trong đó có sắc tố giống chất màu cà rốt; sắc tố vào lông; bố mẹ mớm sữa cho con thì lông nhạt đi",
      lines: [
        cd("Hồng hạc thích ăn tảo và những con tôm tép nhỏ xíu sống dưới nước."),
        cd("Trong tảo và tôm tép có rất nhiều sắc tố, giống chất màu trong củ cà rốt."),
        cd("Hồng hạc ăn vào, sắc tố ấy đi vào bộ lông, làm lông ngả sang màu hồng."),
        cd("Lạ là khi mớm sữa nuôi con, lông bố mẹ hồng hạc nhạt hẳn đi, có khi gần như trắng."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w2-flamingo", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w2-flamingo", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.7, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w2-flamingo", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" } },
        { line: 3, board: { id: "w2-flamingo", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao con bò cứ nhai đi nhai lại, Cụ Đồ hẹn mai kể",
      lines: [tc("Thế còn con bò, sao nó cứ nhai đi nhai lại mãi hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 9,
    week,
    theme,
    ask: "Vì sao con bò cứ nhai đi nhai lại mãi?",
    myth: "Bò có bốn cái dạ dày.",
    answer: "Bò ợ cỏ tiêu hoá dở lên miệng để nhai lại, nhờ thế bò dùng được cả cỏ cứng mà người không ăn nổi.",
    sources: [
      { title: "SDSU Extension (South Dakota State University): Ruminants, A Digestive Powerhouse", url: "https://extension.sdstate.edu/ruminants-digestive-powerhouse" },
      {
        title: "USDA Agricultural Research Service, U.S. Dairy Forage Research Center: Rumens Make Cows Special",
        url: "https://www.ars.usda.gov/ARSUserFiles/50901500/pdf's/rumens%20are%20special_v2.pdf",
      },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn đã thấy con bò nhai lại bao giờ chưa? Kể ông nghe với!",
    hook: {
      shot: "Ngoài sân, Thằng Cháu phồng má nhai nhóp nhép bắt chước con bò, rồi hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao con bò cứ nhai đi nhai lại mãi thế ạ?")],
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
      shot: "Thằng Cháu đoán bò có bốn cái bụng, Cụ Đồ bảo bò chỉ có một dạ dày chia làm bốn ngăn",
      lines: [
        tc("Có phải bò có bốn cái bụng, nên phải nhai mãi cho đầy không ông?"),
        cd("Chưa đúng đâu! Bò chỉ có một cái dạ dày, nhưng chia làm bốn ngăn."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: bò nhai cỏ rồi nuốt xuống ngăn đầu của dạ dày; trong ngăn có vi khuẩn li ti giúp tiêu hoá cỏ cứng; bò ợ cỏ tiêu hoá dở lên miệng; nhai thêm rồi nuốt xuống",
      lines: [
        cd("Bò gặm cỏ, nhai rồi nuốt xuống ngăn đầu tiên của dạ dày."),
        cd("Ngăn ấy có vô số vi khuẩn li ti, giúp bò tiêu hoá cỏ cứng mà người không ăn được."),
        cd("Sau đó, bò ợ phần cỏ tiêu hoá dở lên miệng, gọi là miếng nhai lại."),
        cd("Bò nhai thêm lần nữa rồi nuốt xuống, cứ thế cho tới khi thức ăn sẵn sàng đi tiếp."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w2-cow", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w2-cow", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w2-cow", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w2-cow", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao tắc kè bò trên trần nhà mà không rơi",
      lines: [tc("Thế con tắc kè, sao bò trên trần nhà mà không bị rơi hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 10,
    week,
    theme,
    ask: "Vì sao tắc kè bò trên trần nhà mà không rơi?",
    myth: "Chân tắc kè có keo dính, hoặc có giác hút.",
    answer: "Chân tắc kè có hàng triệu sợi lông li ti, áp sát tường sinh ra lực hút nhỏ, cộng lại đủ giữ tắc kè trên trần nhà.",
    sources: [
      {
        title: "UC Berkeley News: It's not glue, suction or static electricity that keep geckos from falling off the ceiling",
        url: "https://newsarchive.berkeley.edu/news/media/releases/2000/06/07_gecko.html",
      },
      {
        title: "Lewis & Clark College: Biologists unlock secret of gecko sticking power",
        url: "https://www.lclark.edu/live/news/19290-biologists-unlock-secret-of-gecko-sticking-power",
      },
      {
        title: "Georgia Tech, Agile Systems Lab: How do geckos stick to almost any surface?",
        url: "https://sponberg.gatech.edu/2015/10/09/how-do-geckos-adhere-to-nearly-any-surface/",
      },
    ],
    ages: "5–9 tuổi",
    question: "Nhà bạn có thạch sùng hay tắc kè bò trên tường không? Bé có thích ngắm chúng không?",
    hook: {
      shot: "Trong nhà, Thằng Cháu ngửa cổ chỉ lên trần nhà nơi có con tắc kè đang bò, mặt thắc mắc",
      lines: [tc("Ông ơi, vì sao tắc kè bò trên trần nhà mà không bị rơi ạ?")],
      stage: [
        {
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "point", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán chân tắc kè có keo hay giác hút, Cụ Đồ bảo chân tắc kè chẳng có keo, không để lại vết keo",
      lines: [
        tc("Có phải chân tắc kè có keo, hay có giác hút như móc dán tường không ông?"),
        cd("Chưa đúng đâu! Chân tắc kè chẳng có keo, bò qua cũng không để lại vết keo nào."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: ngón chân tắc kè phóng to có hàng triệu sợi lông; đầu mỗi sợi tách thành nhiều tấm đệm; đệm áp sát tường sinh lực hút nhỏ; nhiều lực nhỏ cộng lại giữ tắc kè trên trần",
      lines: [
        cd("Dưới ngón chân tắc kè có hàng triệu sợi lông li ti."),
        cd("Đầu mỗi sợi lông lại tách ra hàng trăm, hàng nghìn tấm đệm còn bé hơn nữa."),
        cd("Các tấm đệm áp sát rạt vào tường, sát đến mức sinh ra lực hút nhỏ."),
        cd("Cả tỉ lực hút nhỏ cộng lại thành lực rất khoẻ, giữ chặt tắc kè cả trên trần nhà."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w2-gecko", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, board: { id: "w2-gecko", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w2-gecko", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "w2-gecko", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao gấu trúc ăn tre gần như cả ngày",
      lines: [tc("Thế còn gấu trúc, sao suốt ngày nó cứ ngồi ăn tre hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 11,
    week,
    theme,
    ask: "Vì sao gấu trúc ăn tre gần như cả ngày?",
    myth: "Gấu trúc là loài ăn cỏ, bụng sinh ra để tiêu hoá tre.",
    answer: "Bụng gấu trúc tiêu hoá tre kém, tre lại ít chất bổ, nên phải ăn thật nhiều, mỗi ngày ít nhất mười hai tiếng.",
    sources: [
      { title: "Smithsonian's National Zoo: Giant panda", url: "https://nationalzoo.si.edu/animals/giant-panda" },
      {
        title: "Smithsonian's National Zoo: To Keep the National Zoo's Pandas Satisfied, Staff Prepare an Endless Supply of Bamboo",
        url: "https://nationalzoo.si.edu/node/17420",
      },
      { title: "San Diego Zoo Animals & Plants: Giant panda", url: "https://animals.sandiegozoo.org/animals/giant-panda" },
    ],
    ages: "5–9 tuổi",
    question: "Nếu được ăn một món suốt cả ngày, bé nhà bạn sẽ chọn món gì? Kể ông nghe với!",
    hook: {
      shot: "Ngoài sân, Thằng Cháu ôm một cành tre giả làm gấu trúc gặm, rồi hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao gấu trúc ăn tre gần như cả ngày thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "hold", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán gấu trúc là loài ăn cỏ như con bò, Cụ Đồ bảo gấu trúc là một loài gấu, đôi khi còn ăn sâu bọ, chuột nhỏ",
      lines: [
        tc("Có phải gấu trúc là loài ăn cỏ như con bò, bụng chuyên tiêu hoá tre không ông?"),
        cd("Chưa đúng đâu! Gấu trúc là một loài gấu, đôi khi còn ăn cả sâu bọ, chuột nhỏ."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: bữa ăn của gấu trúc gần như toàn tre; bụng giống loài ăn thịt nên tiêu hoá tre kém; tre ít chất bổ nên phải ăn rất nhiều; mỗi ngày ăn ít nhất mười hai tiếng, còn lại là ngủ",
      lines: [
        cd("Thức ăn của gấu trúc gần như toàn là tre."),
        cd("Bụng gấu trúc giống bụng loài ăn thịt hơn loài ăn cỏ, tiêu hoá tre kém, nhiều phần bị thải ra."),
        cd("Tre lại ít chất bổ, nên mỗi ngày gấu trúc phải ăn rất nhiều tre."),
        cd("Vì thế, mỗi ngày gấu trúc ăn ít nhất mười hai tiếng, còn lại phần lớn là ngủ, nghỉ."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w2-panda", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, board: { id: "w2-panda", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w2-panda", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "w2-panda", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao con cú quay đầu được rất xa",
      lines: [tc("Thế sao con cú lại quay đầu được xa thế hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 12,
    week,
    theme,
    ask: "Vì sao cú quay đầu được rất xa?",
    myth: "Cú quay đầu được trọn một vòng tròn.",
    answer: "Cú có số đốt xương cổ nhiều gấp đôi người, nên quay đầu được khoảng ba phần tư vòng, chưa đủ một vòng.",
    sources: [
      { title: "WSU College of Veterinary Medicine: Eugene, great horned owl", url: "https://vetmed.wsu.edu/eugene-great-horned-owl/" },
      { title: "University of Illinois Veterinary Medicine: Owl Oddities", url: "https://vetmed.illinois.edu/vetmed-wildlife-blog/owl-oddities/" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn thích con vật nào ăn đêm nhất: cú, dơi hay đom đóm? Kể ông nghe với!",
    hook: {
      shot: "Sân ban đêm, Thằng Cháu nghiêng đầu bắt chước con cú, hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao con cú quay đầu được xa thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "night",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán cú quay đầu tròn một vòng như chong chóng, Cụ Đồ bảo chỉ khoảng ba phần tư vòng",
      lines: [
        tc("Cú quay đầu được tròn một vòng, như cái chong chóng ấy, phải không ông?"),
        cd("Chưa đúng đâu! Trông thì giống thật, nhưng cú chỉ quay được khoảng ba phần tư vòng thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "wave", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mắt cú không đảo được; cú phải quay cả đầu; cổ người bảy đốt, cổ cú mười bốn đốt; vòng quay ba phần tư",
      lines: [
        cd("Mắt cú rất to, nhưng bị giữ chặt một chỗ, không đảo qua lại được như mắt mình."),
        cd("Vì thế, muốn nhìn sang bên, cú phải quay cả cái đầu."),
        cd("Cổ người có bảy đốt xương, còn cổ cú có tới mười bốn đốt, nên cú quay đầu được xa hơn nhiều."),
        cd("Cú quay được khoảng ba phần tư vòng, chưa tới một vòng tròn đâu."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w2-owl", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w2-owl", step: 1 }, cd: { arms: "wave" }, tc: { expr: "happy" } },
        { line: 2, board: { id: "w2-owl", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w2-owl", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { expr: "neutral" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao mắt mèo sáng lên trong đêm",
      lines: [tc("Thế còn mèo, sao ban đêm mắt nó lại sáng lên hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 13,
    week,
    theme,
    ask: "Vì sao mắt mèo sáng lên trong đêm?",
    myth: "Mèo nhìn được cả trong bóng tối đen kịt.",
    answer: "Phía sau mắt mèo có lớp đặc biệt hắt ánh sáng lại như tấm gương, giúp mèo nhìn trong tối, nên đèn chiếu vào là mắt ánh lên.",
    sources: [
      { title: "San Diego Zoo Animals & Plants: Small cats", url: "https://animals.sandiegozoo.org/animals/small-cat" },
      { title: "National Park Service: Deer Monitoring at Pea Ridge National Military Park, 2023 (eyeshine)", url: "https://www.nps.gov/articles/000/peri-deer-2023.htm" },
      { title: "Ask Extension (Cooperative Extension): Human and cat eyes", url: "https://ask.extension.org/kb/faq.php?id=215821" },
      { title: "University of Tennessee College of Veterinary Medicine (VOLVet Vision): Why do cats' eyes glow?", url: "https://volvetvision.tennessee.edu/periodical/fall-2024/answers-big-and-small/" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn đã bao giờ thấy mắt mèo sáng lên trong đêm chưa? Kể ông nghe với!",
    hook: {
      shot: "Sân ban đêm, Thằng Cháu chỉ vào góc tối có hai đốm mắt mèo sáng xanh, mặt thắc mắc",
      lines: [tc("Ông ơi, vì sao mắt mèo lại sáng lên trong đêm ạ?")],
      stage: [
        {
          cut: true,
          scene: "night",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "point", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán mắt mèo tự phát sáng như đèn pin, Cụ Đồ bảo mắt mèo chỉ ánh lên khi có đèn chiếu vào, tối đen hẳn thì mèo cũng không thấy gì",
      lines: [
        tc("Có phải trong mắt mèo có cái đèn pin nhỏ không ông?"),
        cd("Chưa đúng! Mắt mèo chỉ ánh lên khi có đèn chiếu vào, tối đen hẳn thì mèo chẳng thấy gì."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mắt mèo cắt ngang có lớp hắt sáng phía sau; ánh sáng vào mắt bị hắt ngược lại, dùng thêm lần nữa; con ngươi mèo mở to gấp ba, nhìn trong tối giỏi gấp sáu; đèn chiếu vào thì mắt mèo ánh xanh, ánh đỏ",
      lines: [
        cd("Phía sau mắt mèo có một lớp đặc biệt, biết hắt ánh sáng lại."),
        cd("Ánh sáng chạm lớp ấy bị hắt ngược lại, nên mắt mèo dùng được ánh sáng hai lần."),
        cd("Con ngươi mèo lại mở to gấp ba của người, nên trong tối, mèo nhìn giỏi hơn người tới sáu lần."),
        cd("Đèn chiếu vào, lớp ấy hắt ánh sáng ra, làm mắt mèo như phát sáng xanh hay đỏ."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w2-cat-eyes", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, board: { id: "w2-cat-eyes", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w2-cat-eyes", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" } },
        { line: 3, board: { id: "w2-cat-eyes", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao đom đóm phát sáng",
      lines: [tc("Thế còn đom đóm, sao nó lại phát sáng được hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 14,
    week,
    theme,
    ask: "Vì sao đom đóm phát sáng?",
    myth: "Trong bụng đom đóm có một đốm lửa nhỏ, hay một bóng đèn nóng.",
    answer: "Đom đóm phát sáng nhờ một phản ứng hoá học trong bụng, tạo ra ánh sáng mát, để nháy đèn tìm bạn.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): What makes fireflies light up at night?", url: "https://askdruniverse.wsu.edu/2023/08/31/makes-fireflies-light-night/" },
      { title: "National Park Service: Fireflies – Great Smoky Mountains", url: "https://www.nps.gov/grsm/learn/nature/fireflies.htm" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn đã từng ngắm đom đóm chưa? Cùng bé ngắm thôi, đừng bắt nhốt đom đóm nhé! Tuần sau bé muốn hỏi ông gì về vũ trụ?",
    hook: {
      shot: "Sân ban đêm, Thằng Cháu chụm tay nhìn theo những đốm sáng đom đóm",
      lines: [tc("Ông ơi, vì sao đom đóm lại phát sáng được ạ?")],
      stage: [
        {
          cut: true,
          scene: "night",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán trong bụng đom đóm có lửa, Cụ Đồ bảo ánh sáng đom đóm gần như không nóng",
      lines: [
        tc("Có phải trong bụng đom đóm có một đốm lửa nhỏ không ông?"),
        cd("Chưa đúng đâu! Ánh sáng đom đóm gần như không nóng, chẳng giống ngọn lửa hay bóng đèn."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.5, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: đèn ở bụng đom đóm có hai chất; khí ôxy vào gây phản ứng hoá học; sáng mà gần như không nóng; nháy đèn tìm bạn",
      lines: [
        cd("Ở bụng đom đóm có một chiếc đèn nhỏ, bên trong có hai chất, tự chúng chưa sáng."),
        cd("Giống que phát sáng, khi đom đóm cho khí ôxy vào đèn, ở đó xảy ra phản ứng hoá học."),
        cd("Phản ứng ấy tạo ra ánh sáng, mà gần như không toả nóng."),
        cd("Mỗi loài đom đóm nháy đèn theo một kiểu riêng, để tìm bạn cùng loài."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w2-firefly", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w2-firefly", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.7, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w2-firefly", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w2-firefly", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu nhìn lên bầu trời sao, hỏi trên đó còn có gì; Cụ Đồ hẹn tuần sau hỏi tiếp",
      lines: [
        tc("Đom đóm nhấp nháy như sao nhỏ! Thế trên bầu trời đêm còn có gì nữa hả ông?"),
        cd("Cả một vũ trụ đấy cháu ạ! Tuần sau, cháu lại hỏi ông tiếp nhé!"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "happy", move: "bounce" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "up2", expr: "happy", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
  }),
];
