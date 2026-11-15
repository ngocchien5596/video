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
    question: "Theo bạn, con vật nào có màu sắc lạ nhất?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu giơ tay hỏi về chim hồng hạc, mặt thắc mắc",
      lines: [tc("Ông ơi, vì sao chim hồng hạc lại hồng rực thế ạ?")],
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
        tc("Cháu biết rồi! Hồng hạc vừa nở ra là mặc sẵn áo hồng luôn, đúng không ông?"),
        cd("Chưa đúng đâu! Hồng hạc con mới nở, lông tơ chỉ xam xám, trăng trắng thôi, phải mấy năm sau mới hồng dần đấy."),
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
        cd("Cháu biết hồng hạc ăn gì không? Tảo với tôm tép bé tí dưới nước đấy."),
        cd("Mà trong tảo với tôm tép lại lắm sắc tố, giống chất màu trong củ cà rốt ấy."),
        cd("Ăn vào bụng rồi, sắc tố ấy theo vào tận bộ lông, thế là lông ngả sang hồng."),
        cd("Buồn cười nhất là lúc mớm sữa nuôi con, lông bố mẹ lại nhạt hẳn đi, có khi gần như trắng luôn!"),
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
      lines: [tc("Ơ, thế con bò ngoài đồng, sao cứ nhai nhóp nhép suốt ngày hả ông?"), cd("Chuyện con bò thì mai ông kể nhé!")],
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
    question: "Bạn đã từng thấy con bò nhai lại ngoài đời chưa?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu phồng má nhai nhóp nhép bắt chước con bò, rồi hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao con bò cứ nhai đi nhai lại mãi không chán thế ạ?")],
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
        tc("Cháu nghe bảo bò có tận bốn cái bụng, nên phải nhai mãi mới đầy, phải không ông?"),
        cd("Nghe nhầm rồi! Bò chỉ có một cái dạ dày thôi, có điều nó chia ra bốn ngăn."),
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
        cd("Này nhé, bò gặm cỏ, nhai rồi nuốt xuống ngăn đầu tiên của dạ dày."),
        cd("Ngăn ấy có vô số vi khuẩn bé tí, chuyên giúp bò tiêu hoá thứ cỏ cứng mà người chịu, không ăn nổi."),
        cd("Rồi bò ợ cỏ tiêu hoá dở lên lại miệng đấy, người ta gọi là miếng nhai lại."),
        cd("Nhai thêm một chặp lại nuốt, cứ thế đến khi thức ăn sẵn sàng đi tiếp."),
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
      lines: [tc("Ơ, thế con tắc kè bò ngược trên trần nhà, sao không rơi bộp xuống hả ông?"), cd("Để mai ông kể tiếp nhé!")],
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
    question: "Nhà bạn có thạch sùng hay tắc kè bò trên tường không?",
    hook: {
      shot: "Trong nhà, Thằng Cháu ngửa cổ chỉ lên trần nhà nơi có con tắc kè đang bò, mặt thắc mắc",
      lines: [tc("Ông ơi, nhìn kìa! Vì sao tắc kè bò trên trần mà không rơi ạ?")],
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
        tc("Cháu đoán chân nó có keo, hoặc có giác hút như cái móc dán tường, đúng không ông?"),
        cd("Không phải đâu cháu! Chân tắc kè làm gì có keo, bò qua đâu có để lại tí keo nào."),
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
        cd("Cháu biết không, dưới ngón chân tắc kè có hàng triệu sợi lông li ti đấy."),
        cd("Mà đầu mỗi sợi lại toè ra hàng trăm, hàng nghìn tấm đệm, còn bé tí tẹo hơn nữa cơ."),
        cd("Mấy tấm đệm ấy áp sát rạt vào tường, sát quá nên sinh ra một lực hút nho nhỏ."),
        cd("Cả tỉ lực nhỏ ấy cộng lại thì khoẻ lắm, đủ giữ tắc kè dính chặt trên trần nhà luôn!"),
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
      lines: [tc("Thế còn gấu trúc, sao nó ngồi gặm tre suốt ngày không chán hả ông?"), cd("Chuyện gấu trúc, mai ông kể nhé!")],
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
    question: "Nếu phải ăn một món suốt cả ngày như gấu trúc, bạn sẽ chọn món gì?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu ôm một cành tre giả làm gấu trúc gặm, rồi hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao gấu trúc cứ ôm tre gặm gần như cả ngày thế ạ?")],
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
        tc("Chắc gấu trúc ăn cỏ như con bò, bụng chuyên để tiêu hoá tre, phải không ông?"),
        cd("Chưa đúng! Gấu trúc là gấu hẳn hoi đấy, thỉnh thoảng còn xơi cả sâu bọ, chuột nhỏ."),
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
        cd("Bữa nào của gấu trúc cũng gần như toàn tre là tre."),
        cd("Khổ nỗi bụng nó lại giống bụng loài ăn thịt hơn loài ăn cỏ, tiêu hoá tre kém, ăn vào thải ra khối."),
        cd("Đã thế tre lại chẳng bổ béo gì, nên ngày nào nó cũng phải ăn thật nhiều."),
        cd("Thế là ngày nào cũng ăn ít nhất mười hai tiếng, còn lại thì chủ yếu ngủ với nghỉ!"),
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
      lines: [tc("Ơ ông ơi, thế con cú, sao nó ngoái đầu được xa thế hả ông?"), cd("Mai ông kể chuyện con cú nhé!")],
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
    question: "Cú, dơi hay đom đóm: bạn thấy con vật ăn đêm nào thú vị nhất?",
    hook: {
      shot: "Sân ban đêm, Thằng Cháu nghiêng đầu bắt chước con cú, hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao con cú quay đầu được xa ghê thế ạ?")],
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
        tc("Cháu biết! Cú quay đầu được tròn một vòng, y như cái chong chóng, đúng không ông?"),
        cd("Chưa đâu! Trông thì tưởng thế, chứ cú chỉ quay được chừng ba phần tư vòng thôi cháu ạ."),
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
        cd("Mắt cú to thế, nhưng lại bị giữ chặt một chỗ, chẳng đảo qua đảo lại được như mắt mình."),
        cd("Thế muốn nhìn sang bên thì làm sao? Quay cả cái đầu chứ sao!"),
        cd("Cổ mình có bảy đốt xương, cổ cú có những mười bốn đốt, gấp đôi đấy, nên nó quay được xa hơn nhiều."),
        cd("Nhưng cũng chỉ được chừng ba phần tư vòng thôi, chưa tròn một vòng đâu nhé."),
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
      lines: [tc("Thế con mèo nhà mình, đêm đến mắt nó cứ sáng quắc lên là sao hả ông?"), cd("Cái đó mai ông kể nhé!")],
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
    question: "Bạn đã bao giờ giật mình vì đôi mắt mèo ánh lên trong đêm chưa?",
    hook: {
      shot: "Sân ban đêm, Thằng Cháu chỉ vào góc tối có hai đốm mắt mèo sáng xanh, mặt thắc mắc",
      lines: [tc("Ông ơi, kìa! Vì sao mắt mèo lại sáng lên trong đêm thế ạ?")],
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
        tc("Hay trong mắt mèo có lắp cái đèn pin tí hon hả ông?"),
        cd("Làm gì có! Phải có đèn chiếu vào mắt mèo mới ánh lên, tối đen hẳn thì mèo cũng chẳng thấy gì."),
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
        cd("Ở đằng sau mắt mèo có một lớp đặc biệt, hắt ánh sáng lại như tấm gương ấy."),
        cd("Ánh sáng vào tới đấy bị hắt ngược ra, thế là mèo được dùng ánh sáng hai lần."),
        cd("Con ngươi mèo lại mở to gấp ba con ngươi người, nên trong tối, mèo nhìn giỏi hơn mình tới sáu lần cơ!"),
        cd("Rọi đèn vào là lớp ấy hắt sáng ra, trông mắt mèo như tự phát sáng, xanh có, đỏ có."),
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
      lines: [tc("Thế con đom đóm thì sao, nó lấy đâu ra ánh sáng hả ông?"), cd("Chuyện đom đóm, mai ông kể tiếp nhé!")],
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
    question: "Lần cuối bạn thấy đom đóm là ở đâu? Tuần sau là chuyện vũ trụ, bạn muốn ông giải đáp câu nào?",
    hook: {
      shot: "Sân ban đêm, Thằng Cháu chụm tay nhìn theo những đốm sáng đom đóm",
      lines: [tc("Ông ơi, đẹp quá! Vì sao đom đóm lại phát sáng được ạ?")],
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
        tc("Chắc trong bụng đom đóm có đốm lửa tí xíu, phải không ông?"),
        cd("Lửa đâu mà lửa! Ánh sáng đom đóm gần như chẳng nóng, khác hẳn ngọn lửa hay bóng đèn."),
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
        cd("Ở bụng đom đóm có cái đèn bé tí, trong đèn có hai chất, để yên thì chưa sáng đâu."),
        cd("Cũng giống que phát sáng ấy, đom đóm cho khí ôxy vào đèn là xảy ra phản ứng hoá học."),
        cd("Phản ứng ấy sinh ra ánh sáng, mà gần như chẳng toả nóng, nên gọi là ánh sáng mát."),
        cd("Mà mỗi loài lại nháy một kiểu riêng, như ám hiệu, để tìm bạn cùng loài đấy."),
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
        tc("Ông ơi, đom đóm nhấp nháy y như sao con! Thế trên trời đêm còn có gì nữa ạ?"),
        cd("Ối, cả một vũ trụ ấy chứ! Tuần sau cháu cứ hỏi, ông kể dần cho."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "happy", move: "bounce" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "up2", expr: "happy", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
  }),
];
