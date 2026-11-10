import { cd, makeEpisode, tc } from "./make.ts";

const week = 3;
const theme = "Vũ trụ quanh mình";

export const TUAN_3 = [
  makeEpisode({
    day: 15,
    week,
    theme,
    ask: "Vì sao có mùa hè nóng, mùa đông lạnh?",
    myth: "Mùa hè nóng vì Trái Đất đi tới gần Mặt Trời hơn.",
    answer: "Trục Trái Đất nghiêng, nên mỗi nửa Trái Đất lần lượt được nắng chiếu thẳng hơn hay xiên hơn.",
    sources: [
      { title: "NASA Space Place: What Causes the Seasons?", url: "https://spaceplace.nasa.gov/seasons/en/" },
      {
        title: "NOAA NESDIS: Why Does Earth Have Seasons?",
        url: "https://www.nesdis.noaa.gov/about/k-12-education/understanding-our-planet/why-does-earth-have-seasons",
      },
      { title: "National Weather Service: What Causes the Seasons?", url: "https://www.weather.gov/fsd/season" },
    ],
    ages: "5–9 tuổi",
    question: "Nhà bạn ở nơi có mùa đông rét, hay chỉ có mùa mưa, mùa khô? Bé nhà bạn thích mùa nào nhất?",
    hook: {
      shot: "Đứng trên Mặt Trăng nhìn về Trái Đất, Thằng Cháu ôm người run run như đang rét, hỏi ông",
      lines: [tc("Ông ơi, vì sao có mùa hè nóng nực, lại có mùa đông rét thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "space",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "hold2", expr: "confused", move: "tremble" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán mùa hè vì Trái Đất tới gần Mặt Trời, Cụ Đồ đưa bằng chứng tháng một",
      lines: [
        tc("Có phải mùa hè thì Trái Đất chạy lại gần Mặt Trời, nên mới nóng không ông?"),
        cd("Chưa đúng đâu! Tháng một, Trái Đất ở gần Mặt Trời nhất, mà miền Bắc mình đang giữa mùa đông đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: Trái Đất trục nghiêng đi vòng quanh Mặt Trời; nửa phía bắc nghiêng về Mặt Trời được nắng chiếu thẳng; nửa năm sau nắng xiên",
      lines: [
        cd("Trái Đất đi vòng quanh Mặt Trời, mà trục của nó lại nghiêng, như con quay bị lệch."),
        cd("Đi suốt cả năm, cái trục ấy vẫn luôn nghiêng về cùng một hướng."),
        cd("Khi nửa phía bắc, nơi có nước mình, nghiêng về phía Mặt Trời, nắng chiếu thẳng hơn, đó là mùa hè."),
        cd("Nửa năm sau, nửa phía bắc chếch ra xa, nắng chiếu xiên hơn, thành mùa đông."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w3-seasons", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w3-seasons", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w3-seasons", step: 2 }, cd: { arms: "point", expr: "happy" } },
        { line: 2, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w3-seasons", step: 3 }, cd: { arms: "raise", expr: "neutral" }, tc: { expr: "shock" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu chỉ lên các vì sao, hỏi sao chúng lấp lánh",
      lines: [tc("Thế ngôi sao trên trời, sao cứ lấp lánh lấp lánh thế hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 16,
    week,
    theme,
    ask: "Vì sao ngôi sao lấp lánh?",
    myth: "Ngôi sao tự nhấp nháy, lúc bật lúc tắt như đèn nháy.",
    answer: "Không khí luôn chuyển động, bẻ cong ánh sao lúc lệch lúc thẳng, nên sao trông lấp lánh.",
    sources: [
      { title: "NASA StarChild: Why do stars twinkle?", url: "https://starchild.gsfc.nasa.gov/docs/StarChild/questions/question26.html" },
      {
        title: "NASA Imagine the Universe: Ask an Astrophysicist (Why do the stars appear to twinkle?)",
        url: "https://imagine.gsfc.nasa.gov/ask_astro/night_sky.html",
      },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn đã thuộc bài “Một ông sao sáng, hai ông sáng sao” chưa? Tối nay thử cùng bé đếm sao nhé!",
    hook: {
      shot: "Ngoài sân ban đêm, Thằng Cháu ngửa cổ ngắm sao lấp lánh",
      lines: [tc("Ông ơi, vì sao ngôi sao cứ lấp lánh lấp lánh thế ạ?")],
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
      shot: "Thằng Cháu đoán sao tự bật tắt như đèn nháy, Cụ Đồ bảo sao sát chân trời lấp lánh nhiều hơn sao trên đỉnh đầu",
      lines: [
        tc("Có phải ngôi sao tự nháy, lúc bật lúc tắt, như đèn nháy không ông?"),
        cd("Chưa đúng đâu! Phần lớn ngôi sao chiếu sáng đều đều, mà sao ở sát chân trời lại lấp lánh nhiều hơn sao trên đỉnh đầu đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "happy", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.5, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: ánh sao đi rất xa tới lớp không khí, các túi khí chuyển động bẻ lệch tia sáng, mắt thấy sao lúc sáng lúc mờ",
      lines: [
        cd("Ánh sao đi rất rất xa, rồi mới chui vào lớp không khí quanh Trái Đất."),
        cd("Lớp không khí ấy luôn chuyển động, có những túi khí nóng, túi khí lạnh trôi qua lại."),
        cd("Mỗi túi khí lại bẻ cong ánh sao một chút, lúc lệch sang bên này, lúc lệch sang bên kia."),
        cd("Thế là ánh sao tới mắt mình lúc nhiều lúc ít, trông như đang lấp lánh."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w3-twinkle", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w3-twinkle", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w3-twinkle", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.5, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w3-twinkle", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu chỉ theo một vệt sáng vụt qua trời, hỏi về sao băng",
      lines: [tc("Thế sao lại có sao băng vụt qua bầu trời hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 17,
    week,
    theme,
    ask: "Vì sao có sao băng vụt qua bầu trời?",
    myth: "Sao băng là một ngôi sao trên trời bị rơi xuống.",
    answer: "Sao băng không phải ngôi sao, mà là mẩu đá vũ trụ lao vào lớp không khí, nóng rực lên thành một vệt sáng.",
    sources: [
      { title: "NASA Space Place: What Is a Meteor Shower?", url: "https://spaceplace.nasa.gov/meteor-shower/en/" },
      { title: "NASA Science: Meteors and Meteorites – Facts", url: "https://science.nasa.gov/solar-system/meteors-meteorites/facts/" },
      {
        title: "Chandra X-ray Center (Smithsonian Astrophysical Observatory): Q&A – falling stars",
        url: "https://chandra.si.edu/resources/faq/astrophysics/astrophysics-30.html",
      },
      { title: "Caltech IPAC Cool Cosmos: What is a shooting star?", url: "https://coolcosmos.ipac.caltech.edu/ask/255-What-is-a-shooting-star" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn đã từng thấy sao băng chưa? Nếu thấy, bé muốn ước điều gì? Kể ông nghe với!",
    hook: {
      shot: "Ngoài sân ban đêm, Thằng Cháu chỉ theo một vệt sáng vụt qua bầu trời",
      lines: [tc("Ông ơi, vì sao có sao băng vụt qua bầu trời thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "night",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "point", expr: "shock", move: "bounce" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán sao băng là ngôi sao rơi, Cụ Đồ bảo đó chỉ là mẩu đá bé bằng hạt cát, hòn sỏi",
      lines: [
        tc("Có phải sao băng là một ngôi sao trên trời bị rơi xuống không ông?"),
        cd("Không phải đâu! Sao băng chỉ là những mẩu đá vũ trụ, thường bé như hạt cát hay hòn sỏi thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mẩu đá bé xíu ngoài vũ trụ; lao rất nhanh vào lớp không khí; không khí nóng rực phát sáng thành vệt; mẩu đá cháy hết trên trời",
      lines: [
        cd("Ngoài vũ trụ có những mẩu đá nhỏ, có mẩu chỉ bé như hạt bụi."),
        cd("Có lúc, một mẩu đá lao thật nhanh vào lớp không khí bao quanh Trái Đất."),
        cd("Không khí cản lại làm mẩu đá nóng rực, vệt sáng mình thấy là không khí nóng phát sáng quanh nó."),
        cd("Phần lớn những mẩu đá ấy cháy hết trên trời, trước khi kịp rơi xuống mặt đất."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w3-meteor", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w3-meteor", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w3-meteor", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" } },
        { line: 2, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w3-meteor", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu chỉ lên Mặt Trăng, hỏi về những vết đen loang lổ",
      lines: [tc("Thế trên Mặt Trăng, sao lại có những vết đen loang lổ hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 18,
    week,
    theme,
    ask: "Vì sao trên Mặt Trăng có những vết đen loang lổ?",
    myth: "Vết đen trên Mặt Trăng là chú Cuội ngồi gốc cây đa.",
    answer: "Vết đen là những hố khổng lồ được đá nóng chảy lấp đầy, nguội lại thành đá sẫm màu.",
    sources: [
      { title: "NASA Science: Earth's Moon – Facts", url: "https://science.nasa.gov/moon/facts/" },
      { title: "NASA Space Place: All About the Moon", url: "https://spaceplace.nasa.gov/all-about-the-moon/en/" },
      { title: "NASA Science: Top Moon Questions", url: "https://moon.nasa.gov/inside-and-out/top-moon-questions/" },
    ],
    ages: "5–9 tuổi",
    question: "Nhìn những vết đen trên Mặt Trăng, bé nhà bạn thấy giống hình gì? Kể ông nghe với!",
    hook: {
      shot: "Ngoài sân ban đêm, Thằng Cháu chỉ lên Mặt Trăng có vết đen",
      lines: [tc("Ông ơi, vì sao trên Mặt Trăng có những vết đen loang lổ thế ạ?")],
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
      shot: "Thằng Cháu đoán vết đen là chú Cuội ngồi gốc cây đa, Cụ Đồ bảo đó là chuyện cổ tích: phi hành gia lên tận nơi chỉ thấy đá",
      lines: [
        tc("Có phải vết đen ấy là chú Cuội ngồi gốc cây đa không ông?"),
        cd("Đó là chuyện cổ tích thôi cháu ạ! Các nhà du hành đã lên tận Mặt Trăng, mang cả đá về, mà chẳng thấy cây cối gì."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: Mặt Trăng đầy hố tròn do đá vũ trụ rơi vào; có hố khổng lồ; dung nham tràn vào lấp đầy rồi nguội; nhìn từ xa thành vết sẫm",
      lines: [
        cd("Mặt Trăng là một quả cầu đá, mặt đầy những cái hố tròn, do đá từ vũ trụ rơi vào."),
        cd("Từ rất rất lâu rồi, có những cái hố khổng lồ, to hơn hẳn các hố khác."),
        cd("Đá nóng chảy, gọi là dung nham, đã tràn vào lấp đầy những hố ấy, rồi nguội lại."),
        cd("Chỗ đá nguội ấy sẫm màu hơn đá xung quanh, nên nhìn từ xa, mình thấy những vết đen."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w3-moon-spots", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w3-moon-spots", step: 1 }, cd: { arms: "up2" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w3-moon-spots", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "neutral" } },
        { line: 3, board: { id: "w3-moon-spots", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao Mặt Trăng lúc tròn lúc khuyết",
      lines: [tc("Mà sao Mặt Trăng lúc thì tròn, lúc lại khuyết hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 19,
    week,
    theme,
    ask: "Vì sao Mặt Trăng lúc tròn lúc khuyết?",
    myth: "Bóng Trái Đất che bớt Mặt Trăng.",
    answer: "Mặt Trời luôn chiếu sáng một nửa Mặt Trăng, Mặt Trăng đi vòng quanh Trái Đất, nên mình thấy phần sáng ấy lúc nhiều lúc ít.",
    sources: [
      { title: "NASA Space Place: What Are the Moon's Phases?", url: "https://spaceplace.nasa.gov/moon-phases/en/" },
      {
        title: "University of Hawaiʻi, Exploring Our Fluid Earth: Weird Science – Phases of the Moon",
        url: "https://manoa.hawaii.edu/exploringourfluidearth/physical/tides/tide-formation-gravitational-pull/weird-science-phases-moon",
      },
      { title: "NASA Science: Earth's Moon – Facts", url: "https://science.nasa.gov/moon/facts/" },
    ],
    ages: "5–9 tuổi",
    question: "Tối nay trăng nhà bạn tròn hay khuyết? Cùng bé ngắm rồi kể ông nghe nhé!",
    hook: {
      shot: "Ngoài sân ban đêm, Thằng Cháu giơ tay vẽ hình trăng khuyết trong không trung",
      lines: [tc("Ông ơi, vì sao Mặt Trăng lúc thì tròn, lúc lại khuyết ạ?")],
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
      shot: "Thằng Cháu đoán bóng Trái Đất che Mặt Trăng, Cụ Đồ bảo đó là nguyệt thực, chuyện khác hẳn",
      lines: [
        tc("Có phải bóng Trái Đất che bớt Mặt Trăng, nên trăng mới khuyết không ông?"),
        cd("Chưa đúng đâu! Bóng Trái Đất che Mặt Trăng là chuyện khác, gọi là nguyệt thực. Mặt Trăng chẳng đổi hình, chỉ là mình nhìn khác đi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.5, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: Mặt Trời chiếu sáng một nửa Mặt Trăng; Mặt Trăng đi vòng quanh Trái Đất; từ Trái Đất thấy phần sáng nhiều hay ít; trăng tròn, trăng khuyết",
      lines: [
        cd("Mặt Trăng không tự sáng, Mặt Trời chiếu sáng một nửa Mặt Trăng, nửa kia tối."),
        cd("Mặt Trăng lại đi vòng quanh Trái Đất, mỗi vòng mất khoảng một tháng."),
        cd("Tuỳ Mặt Trăng đang ở chỗ nào, mình nhìn thấy phần sáng ấy nhiều hay ít."),
        cd("Thấy trọn phần sáng là trăng tròn, thấy một mẩu là trăng khuyết lưỡi liềm."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w3-moon-phases", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w3-moon-phases", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w3-moon-phases", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w3-moon-phases", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp về phi hành gia bay lơ lửng",
      lines: [tc("Thế phi hành gia bay lên vũ trụ, sao lại lơ lửng hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 20,
    week,
    theme,
    ask: "Vì sao phi hành gia bay lơ lửng trong tàu vũ trụ?",
    myth: "Ngoài vũ trụ không có sức hút của Trái Đất.",
    answer: "Trạm vũ trụ và phi hành gia đang cùng nhau rơi vòng quanh Trái Đất, nên trông như bay lơ lửng.",
    sources: [
      {
        title: "NASA: What Is Microgravity? (Grades K-4)",
        url: "https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-k-4/",
      },
      {
        title: "West Texas A&M University (C. Baird): Why is there no gravity in space?",
        url: "https://www.wtamu.edu/~cbaird/sq/2012/12/18/why-is-there-no-gravity-in-space/",
      },
    ],
    ages: "5–9 tuổi",
    question: "Nếu được bay lơ lửng như phi hành gia, bé nhà bạn muốn làm gì đầu tiên? Kể ông nghe với!",
    hook: {
      shot: "Ngoài vũ trụ, Thằng Cháu giơ hai tay như đang bay, hỏi ông",
      lines: [tc("Ông ơi, vì sao phi hành gia lại bay lơ lửng trong tàu vũ trụ ạ?")],
      stage: [
        {
          cut: true,
          scene: "space",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "up2", expr: "confused", move: "bounce" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán ngoài vũ trụ không có sức hút, Cụ Đồ bảo chính sức hút giữ Mặt Trăng quay quanh Trái Đất",
      lines: [
        tc("Có phải ra ngoài vũ trụ là hết sức hút của Trái Đất, nên mới bay không ông?"),
        cd("Chưa đúng đâu! Chính sức hút của Trái Đất đang giữ Mặt Trăng đi vòng quanh mình đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "smug", move: "idle" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: Trái Đất kéo trạm vũ trụ; trạm bay ngang rất nhanh nên rơi vòng quanh Trái Đất; người và đồ vật cùng rơi; cùng rơi nên trông lơ lửng",
      lines: [
        cd("Ở chỗ trạm vũ trụ bay, sức hút của Trái Đất vẫn còn rất mạnh."),
        cd("Trạm bay ngang rất nhanh, nên vừa rơi về phía Trái Đất, vừa trượt vòng qua, chẳng bao giờ chạm đất."),
        cd("Phi hành gia và mọi đồ vật trong trạm cũng đang rơi cùng một lúc."),
        cd("Giống trò chơi rơi tự do, cùng rơi với nhau thì quả bóng trông như lơ lửng trước mặt."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w3-float", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w3-float", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" } },
        { line: 1, at: 0.7, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w3-float", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "neutral" } },
        { line: 3, board: { id: "w3-float", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu vẽ một vòng tròn to trong không trung, hỏi về vành đai Sao Thổ",
      lines: [tc("Ông ơi, thế vành đai quanh Sao Thổ làm bằng gì ạ?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 21,
    week,
    theme,
    ask: "Vành đai của Sao Thổ làm bằng gì?",
    myth: "Vành đai Sao Thổ là một chiếc vòng cứng, liền một khối.",
    answer: "Vành đai Sao Thổ là hàng tỉ mẩu băng và đá, to nhỏ đủ cỡ, cùng bay vòng quanh Sao Thổ.",
    sources: [
      { title: "NASA Space Place: All About Saturn", url: "https://spaceplace.nasa.gov/all-about-saturn/en/" },
      { title: "NASA Science: Saturn Facts", url: "https://science.nasa.gov/saturn/facts/" },
      { title: "NASA Astronomy Picture of the Day, 1996 April 29: Saturn's Rings Seen Sideways", url: "https://apod.nasa.gov/apod/ap960429.html" },
      { title: "University of Oregon (Davison Soper), Astronomy notes: Saturn", url: "https://pages.uoregon.edu/soper/Jovian/saturn.html" },
    ],
    ages: "5–9 tuổi",
    question: "Nếu được bay tới gần vành đai Sao Thổ, bé nhà bạn muốn ngắm mẩu băng bé như hạt cát hay mẩu to bằng ngôi nhà? Kể ông nghe với!",
    hook: {
      shot: "Ngoài vũ trụ, Thằng Cháu khoanh tay vẽ một vòng tròn to trong không trung, hỏi ông",
      lines: [tc("Ông ơi, vành đai to quanh Sao Thổ làm bằng gì thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "space",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "up2", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán vành đai là chiếc vòng cứng liền khối, Cụ Đồ bảo các nhà thiên văn nhìn xuyên qua được vành đai",
      lines: [
        tc("Có phải nó là một chiếc vòng cứng, liền một khối, không ông?"),
        cd("Chưa đúng đâu! Vành đai ấy chẳng phải một khối cứng, các nhà thiên văn còn nhìn xuyên qua được nó đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: Sao Thổ có bảy vành chính và các khoảng trống; phóng to thấy hàng tỉ mẩu băng và đá; mẩu bé như hạt cát, mẩu to bằng ngôi nhà; tất cả bay vòng quanh Sao Thổ",
      lines: [
        cd("Sao Thổ có bảy vành đai chính, giữa các vành còn có những khoảng trống."),
        cd("Mỗi vành đai không liền một khối, mà gồm hàng tỉ mẩu băng và đá."),
        cd("Có mẩu chỉ nhỏ như hạt cát, có mẩu lại to bằng cả một ngôi nhà."),
        cd("Các mẩu ấy cùng bay vòng quanh Sao Thổ, mỗi vành đai bay nhanh chậm khác nhau."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w3-saturn", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w3-saturn", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" } },
        { line: 1, at: 0.6, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w3-saturn", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w3-saturn", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu ôm bụng, hỏi sang chuyện cơ thể; Cụ Đồ hẹn tuần sau",
      lines: [
        tc("Vũ trụ lạ thật! Thế còn cơ thể cháu, có bí mật gì không hả ông?"),
        cd("Nhiều lắm! Tuần sau, ông cháu mình cùng khám phá cơ thể nhé!"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "confused", move: "bounce" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
  }),
];
