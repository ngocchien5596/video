import { cd, makeEpisode, tc } from "./make.ts";

const week = 3;
const theme = "Vũ trụ quanh mình";

export const TUAN_3 = [
  makeEpisode({
    day: 12,
    week,
    theme,
    ask: "Vì sao có mùa hè nóng, mùa đông lạnh?",
    myth: "Mùa hè nóng vì Trái Đất đi tới gần Mặt Trời hơn.",
    answer: "Vì trục Trái Đất nghiêng, nên mỗi nửa Trái Đất lúc thì được nắng chiếu thẳng, lúc lại chỉ được nắng chiếu xiên, thế mới có hè, có đông.",
    sources: [
      { title: "NASA Space Place: What Causes the Seasons?", url: "https://spaceplace.nasa.gov/seasons/en/" },
      {
        title: "NOAA NESDIS: Why Does Earth Have Seasons?",
        url: "https://www.nesdis.noaa.gov/about/k-12-education/understanding-our-planet/why-does-earth-have-seasons",
      },
      { title: "National Weather Service: What Causes the Seasons?", url: "https://www.weather.gov/fsd/season" },
    ],
    question: "Chỗ bạn ở có mùa đông rét, hay chỉ có mùa mưa, mùa khô?",
    hook: {
      shot: "Đứng trên Mặt Trăng nhìn về Trái Đất, Thằng Cháu ôm người run run như đang rét, hỏi ông",
      lines: [tc("Rét quá ông ơi! Vì sao có mùa hè nóng nực, lại có mùa đông rét thế ạ?")],
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
        tc("Cháu biết rồi! Mùa hè là do Trái Đất chạy lại gần Mặt Trời hơn, nên mới nóng, chắc thế hả ông?"),
        cd("Nghe thì xuôi tai, nhưng chưa đúng đâu! Tháng một là lúc Trái Đất gần Mặt Trời nhất, thế mà miền Bắc mình đang giữa mùa đông, rét cắt da đấy."),
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
        cd("Thật ra là thế này, Trái Đất đi vòng quanh Mặt Trời, mà cái trục của nó lại nghiêng, như con quay bị lệch ấy."),
        cd("Cái lạ là, nó đi suốt cả năm trời, mà trục ấy vẫn chỉ nghiêng về đúng một hướng thôi."),
        cd("Lúc nửa phía bắc, chỗ nước mình ở, chúc về phía Mặt Trời, thì nắng rọi xuống thẳng hơn, thế là thành mùa hè."),
        cd("Nửa năm sau, nửa ấy lại chếch ra xa Mặt Trời, nắng chỉ chiếu xiên xiên thôi, thế là thành ra mùa đông."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu còn cả đống câu vì sao muốn hỏi ông nữa cơ!"), cd("Thế thì từ từ, mỗi hôm ông kể cho một chuyện nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 6,
    week,
    theme,
    ask: "Vì sao phi hành gia bay lơ lửng trong tàu vũ trụ?",
    myth: "Ngoài vũ trụ không có sức hút của Trái Đất.",
    answer: "Trạm vũ trụ và phi hành gia đang cùng nhau rơi vòng quanh Trái Đất, nên trông họ cứ như đang bay lơ lửng.",
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
    question: "Nếu được bay lơ lửng như phi hành gia, bạn muốn làm gì đầu tiên?",
    hook: {
      shot: "Ngoài vũ trụ, Thằng Cháu giơ hai tay như đang bay, hỏi ông",
      lines: [tc("Ông ơi, vì sao phi hành gia cứ bay lơ lửng trong tàu vũ trụ thế ạ?")],
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
        tc("Dễ ợt! Ra ngoài vũ trụ là hết sạch sức hút của Trái Đất, nên người ta mới bay lơ lửng chứ gì ông?"),
        cd("Dễ đâu mà dễ! Chính sức hút của Trái Đất đang giữ Mặt Trăng đi vòng quanh nó đấy thôi."),
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
        cd("Mà ở trên cao, chỗ trạm vũ trụ đang bay ấy, sức hút Trái Đất vẫn còn mạnh lắm chứ."),
        cd("Có điều trạm bay ngang nhanh khiếp, nên trong lúc nó rơi xuống thì mặt đất bên dưới cũng cong đi mất, thành ra cứ rơi mãi mà chẳng chạm đất. Lạ chưa?"),
        cd("Mà người với đồ đạc ở trong trạm cũng đang rơi theo y như thế, cùng một lúc với trạm đấy."),
        cd("Cháu cứ tưởng tượng đang ngồi trò rơi tự do, tay cầm quả bóng. Cả người lẫn bóng cùng rơi một lúc, thì quả bóng cứ như lơ lửng ngay trước mặt."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay quá ông ạ! Mai ông lại kể cho cháu nghe chuyện khác nữa nhé?"), cd("Được chứ! Cháu cứ hỏi, rồi ông kể dần cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 29,
    week,
    theme,
    ask: "Vì sao Mặt Trăng lúc tròn lúc khuyết?",
    myth: "Bóng Trái Đất che bớt Mặt Trăng.",
    answer: "Mặt Trời lúc nào cũng chiếu sáng một nửa Mặt Trăng, mà Mặt Trăng lại đi vòng quanh Trái Đất, nên mình mới thấy phần sáng ấy lúc nhiều lúc ít.",
    sources: [
      { title: "NASA Space Place: What Are the Moon's Phases?", url: "https://spaceplace.nasa.gov/moon-phases/en/" },
      {
        title: "University of Hawaiʻi, Exploring Our Fluid Earth: Weird Science – Phases of the Moon",
        url: "https://manoa.hawaii.edu/exploringourfluidearth/physical/tides/tide-formation-gravitational-pull/weird-science-phases-moon",
      },
      { title: "NASA Science: Earth's Moon – Facts", url: "https://science.nasa.gov/moon/facts/" },
    ],
    question: "Tối nay trăng chỗ bạn tròn hay khuyết?",
    hook: {
      shot: "Ngoài sân ban đêm, Thằng Cháu giơ tay vẽ hình trăng khuyết trong không trung",
      lines: [tc("Ông ơi, vì sao Mặt Trăng hôm thì tròn, hôm lại khuyết thế ạ?")],
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
        tc("Cháu biết rồi! Chắc là bóng Trái Đất che mất một miếng nên trăng mới khuyết, hả ông?"),
        cd("Che đâu mà che! Bóng Trái Đất che trăng thì gọi là nguyệt thực, lại là chuyện khác hẳn cơ. Trăng có méo đi đâu, chỉ là mình nhìn khác đi thôi."),
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
        cd("Mặt Trăng có tự sáng đâu, nó sáng là nhờ Mặt Trời chiếu vào đấy. Mà lúc nào Mặt Trời cũng chỉ rọi được một nửa Mặt Trăng thôi, nửa kia thì tối om."),
        cd("Mà Mặt Trăng lại cứ đi vòng quanh Trái Đất mình, mỗi vòng mất chừng một tháng."),
        cd("Thế nên tuỳ trăng đi tới chỗ nào trên vòng ấy, mà mình nhìn lên lại thấy phần sáng nhiều hay ít khác nhau."),
        cd("Mình thấy trọn cả nửa sáng thì là trăng tròn vành vạnh, còn chỉ thấy một mẩu thì là trăng lưỡi liềm đấy."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay thật đấy ông ạ! Thế còn chuyện khác thì sao hả ông?"), cd("Từ từ đã nào, cái thằng này! Lần sau ông kể tiếp cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 19,
    week,
    theme,
    ask: "Vì sao có sao băng vụt qua bầu trời?",
    myth: "Sao băng là một ngôi sao trên trời bị rơi xuống.",
    answer: "Sao băng không phải ngôi sao đâu, mà là một mẩu đá vũ trụ lao vào lớp không khí, làm không khí quanh nó nóng rực, phát sáng thành vệt.",
    sources: [
      { title: "NASA Space Place: What Is a Meteor Shower?", url: "https://spaceplace.nasa.gov/meteor-shower/en/" },
      { title: "NASA Science: Meteors and Meteorites – Facts", url: "https://science.nasa.gov/solar-system/meteors-meteorites/facts/" },
      {
        title: "Chandra X-ray Center (Smithsonian Astrophysical Observatory): Q&A – falling stars",
        url: "https://chandra.si.edu/resources/faq/astrophysics/astrophysics-30.html",
      },
      { title: "Caltech IPAC Cool Cosmos: What is a shooting star?", url: "https://coolcosmos.ipac.caltech.edu/ask/255-What-is-a-shooting-star" },
    ],
    question: "Bạn đã từng thấy sao băng chưa? Lúc ấy bạn ước gì?",
    hook: {
      shot: "Ngoài sân ban đêm, Thằng Cháu chỉ theo một vệt sáng vụt qua bầu trời",
      lines: [tc("Ông ơi ông! Vì sao có sao băng vụt qua bầu trời thế ạ?")],
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
        tc("Ơ, chắc là có ngôi sao nào bị rơi từ trên trời xuống hả ông? Tội nó quá!"),
        cd("Tội gì mà tội! Sao băng chỉ là một mẩu đá từ vũ trụ, thường bé bằng hạt cát hay hòn sỏi thôi, chứ ngôi sao thật thì to hơn cả Trái Đất cơ."),
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
        cd("Cháu xem này, ngoài vũ trụ lúc nào cũng có vô số mẩu đá nhỏ xíu, có mẩu chỉ bé như hạt bụi thôi."),
        cd("Thỉnh thoảng có một mẩu lao vèo vào lớp không khí bao quanh Trái Đất, mà nhanh khủng khiếp, nhanh hơn cả viên đạn hàng chục lần cơ!"),
        cd("Bị không khí cản lại, mẩu đá nóng rực lên, còn cái vệt sáng mình thấy chính là không khí quanh nó nóng quá mà phát sáng đấy."),
        cd("Phần lớn mấy mẩu đá ấy cháy sạch ngay trên trời, chưa kịp rơi xuống tới mặt đất đâu."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay thật đấy ông ạ! Thế còn chuyện khác thì sao hả ông?"), cd("Từ từ đã nào, cái thằng này! Lần sau ông kể tiếp cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 24,
    week,
    theme,
    ask: "Vì sao trên Mặt Trăng có những vết đen loang lổ?",
    myth: "Vết đen trên Mặt Trăng là chú Cuội ngồi gốc cây đa.",
    answer: "Vết đen chính là những hố khổng lồ đã bị đá nóng chảy lấp đầy, rồi nguội lại thành đá sẫm màu.",
    sources: [
      { title: "NASA Science: Earth's Moon – Facts", url: "https://science.nasa.gov/moon/facts/" },
      { title: "NASA Space Place: All About the Moon", url: "https://spaceplace.nasa.gov/all-about-the-moon/en/" },
      { title: "NASA Science: Top Moon Questions", url: "https://moon.nasa.gov/inside-and-out/top-moon-questions/" },
    ],
    question: "Hồi nhỏ, bạn có tin chuyện chú Cuội ngồi gốc cây đa không?",
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
        tc("Cháu biết rồi! Đấy là chú Cuội ngồi gốc cây đa, đúng không ông?"),
        cd("Chuyện cổ tích thôi cháu ơi! Các nhà du hành vũ trụ lên tận Mặt Trăng rồi, mang cả đá về nữa, có thấy cây cối gì đâu."),
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
        cd("Mặt Trăng ấy, thật ra là một quả cầu đá, bề mặt rỗ chi chít những hố tròn, do đá từ vũ trụ lao vào mà thành đấy."),
        cd("Trong số ấy có mấy cái hố khổng lồ, to hơn hẳn các hố khác, đã có từ xa xưa lắm rồi."),
        cd("Thế rồi sao? Đá nóng chảy trong lòng Mặt Trăng, tức là dung nham ấy, trào lên lấp đầy mấy cái hố, rồi mới nguội dần."),
        cd("Đá ấy sẫm màu hơn hẳn chỗ xung quanh, nên đứng tít dưới này nhìn lên, mình mới thấy thành những vết đen."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay thật đấy ông ạ! Thế còn chuyện khác thì sao hả ông?"), cd("Từ từ đã nào, cái thằng này! Lần sau ông kể tiếp cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 34,
    week,
    theme,
    ask: "Vì sao ngôi sao lấp lánh?",
    myth: "Ngôi sao tự nhấp nháy, lúc bật lúc tắt như đèn nháy.",
    answer: "Không khí quanh Trái Đất cứ chuyển động mãi, bẻ ánh sao lệch qua lệch lại, nên sao mới trông lấp lánh.",
    sources: [
      { title: "NASA StarChild: Why do stars twinkle?", url: "https://starchild.gsfc.nasa.gov/docs/StarChild/questions/question26.html" },
      {
        title: "NASA Imagine the Universe: Ask an Astrophysicist (Why do the stars appear to twinkle?)",
        url: "https://imagine.gsfc.nasa.gov/ask_astro/night_sky.html",
      },
    ],
    question: "Bạn còn nhớ bài “Một ông sao sáng, hai ông sáng sao” không?",
    hook: {
      shot: "Ngoài sân ban đêm, Thằng Cháu ngửa cổ ngắm sao lấp lánh",
      lines: [tc("Ông ơi, vì sao ngôi sao cứ lấp la lấp lánh thế ạ?")],
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
        tc("Hay ngôi sao cũng giống đèn nháy treo trên cây thông, lúc bật lúc tắt hả ông?"),
        cd("Bật tắt đâu mà bật tắt! Phần lớn sao vẫn sáng đều đều thôi. Cháu để ý mà xem, sao sát chân trời lấp lánh nhiều hơn sao trên đỉnh đầu đấy."),
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
        cd("Thế này nhé, ánh sao phải đi xa lắc xa lơ, rồi mới chui vào lớp không khí quanh Trái Đất mình."),
        cd("Mà lớp không khí ấy có chịu đứng yên đâu! Túi khí nóng, túi khí lạnh cứ trôi qua trôi lại suốt."),
        cd("Mỗi túi khí lại bẻ cong ánh sao một tẹo, lúc thì lệch sang bên này, lúc lại lệch sang bên kia."),
        cd("Thế là ánh sao vào tới mắt mình lúc thì nhiều, lúc thì ít. Sao sát chân trời phải xuyên qua nhiều không khí hơn, nên càng lấp lánh dữ!"),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay thật đấy ông ạ! Thế còn chuyện khác thì sao hả ông?"), cd("Từ từ đã nào, cái thằng này! Lần sau ông kể tiếp cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 40,
    week,
    theme,
    ask: "Vành đai của Sao Thổ làm bằng gì?",
    myth: "Vành đai Sao Thổ là một chiếc vòng cứng, liền một khối.",
    answer: "Vành đai Sao Thổ là hàng tỉ mẩu băng và đá, to nhỏ đủ cỡ, cùng nhau bay vòng quanh hành tinh ấy đấy.",
    sources: [
      { title: "NASA Space Place: All About Saturn", url: "https://spaceplace.nasa.gov/all-about-saturn/en/" },
      { title: "NASA Science: Saturn Facts", url: "https://science.nasa.gov/saturn/facts/" },
      { title: "NASA Astronomy Picture of the Day, 1996 April 29: Saturn's Rings Seen Sideways", url: "https://apod.nasa.gov/apod/ap960429.html" },
      { title: "University of Oregon (Davison Soper), Astronomy notes: Saturn", url: "https://pages.uoregon.edu/soper/Jovian/saturn.html" },
    ],
    question: "Nếu được bay tới gần vành đai Sao Thổ, bạn muốn ngắm mẩu băng nhỏ như hạt cát hay to bằng ngôi nhà?",
    hook: {
      shot: "Ngoài vũ trụ, Thằng Cháu khoanh tay vẽ một vòng tròn to trong không trung, hỏi ông",
      lines: [tc("Ông ơi, cái vành đai to đùng quanh Sao Thổ làm bằng gì thế ạ?")],
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
        tc("Chắc nó là cái vòng cứng, đúc liền một khối, giống như cái vòng đeo tay hả ông?"),
        cd("Cứng đâu mà cứng! Nó chẳng phải một khối liền đâu, các nhà thiên văn còn nhìn xuyên qua được nó cơ mà."),
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
        cd("Thế sao lại nhìn xuyên qua được ư? Sao Thổ có tới bảy vành đai chính, giữa các vành lại còn hở ra những khoảng trống."),
        cd("Phóng to lên mà xem, mỗi vành là hàng tỉ mẩu băng với đá, chứ chẳng phải liền một khối đâu."),
        cd("Có mẩu bé tí như hạt cát, có mẩu lại to bằng cả một ngôi nhà!"),
        cd("Cả đàn mẩu ấy cùng bay vòng quanh Sao Thổ, vành ở trong thì bay nhanh, còn vành ở ngoài thì bay chậm hơn."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Ông ơi, cháu lại vừa nghĩ ra một câu vì sao nữa rồi!"), cd("Lại câu gì nữa đây? Thôi, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),
];
