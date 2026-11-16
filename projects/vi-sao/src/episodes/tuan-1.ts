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
    question: "Câu “vì sao” nào từng làm bạn bí nhất?",
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

  makeEpisode({
    day: 2,
    week,
    theme,
    ask: "Vì sao hoàng hôn lại đỏ cam?",
    myth: "Buổi chiều, mặt trời đổi sang màu đỏ.",
    answer: "Lúc chiều tà, nắng phải đi một quãng rất dài qua không khí, nên ánh xanh, ánh tím bị hắt đi gần hết, chỉ còn ánh đỏ, ánh cam tới được mắt mình.",
    sources: [
      { title: "Met Office: Why is the sky blue and sunsets red?", url: "https://www.metoffice.gov.uk/weather/learn-about/weather/optical-effects/why-is-the-sky-blue" },
      { title: "Royal Museums Greenwich: Why is the sky blue?", url: "https://www.rmg.co.uk/stories/topics/why-sky-blue" },
      { title: "NASA Space Place: Why Is the Sky Blue?", url: "https://spaceplace.nasa.gov/blue-sky/en/" },
    ],
    question: "Bạn thích ngắm hoàng hôn hay bình minh hơn?",
    hook: {
      shot: "Ngoài sân lúc chiều, Thằng Cháu chỉ lên bầu trời đỏ cam",
      lines: [tc("Ông ơi, chiều nào trời cũng đỏ cam, vì sao thế ạ?")],
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
      shot: "Thằng Cháu đoán mặt trời mệt nên đổi màu, Cụ Đồ bảo mặt trời không đổi màu",
      lines: [
        tc("Hay là chiều rồi mặt trời mệt quá, nên mới đổi sang màu đỏ hả ông?"),
        cd("Mặt trời có đổi màu đâu cháu! Đúng lúc mình ngắm hoàng hôn thì ở nơi khác lại đang giữa trưa, nắng vẫn trắng sáng đấy."),
      ],
      stage: [
        // "mặt trời mệt quá"
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "sad", move: "idle" }, fx: { kind: "sweat", on: "TC" } },
        // "Mặt trời không đổi màu đâu cháu!"
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        // "ở nơi khác đang là buổi trưa"
        { line: 1, at: 0.5, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mặt trời trên cao đi quãng ngắn qua khí quyển, mặt trời thấp đi quãng dài trong khí quyển, xanh bị hắt đi, đỏ cam tới mắt",
      lines: [
        cd("Buổi trưa, mặt trời ở tít trên cao, nắng chỉ phải đi một quãng ngắn qua khí quyển, cái lớp không khí trùm quanh Trái Đất ấy mà."),
        cd("Đến chiều, mặt trời xuống thấp, nắng phải đi một quãng dài lắm trong khí quyển mới tới được mắt mình."),
        cd("Đường xa thế thì ánh xanh, ánh tím đi đâu hết? Bị các hạt khí hắt văng đi gần hết dọc đường rồi!"),
        cd("Chỉ còn sót lại màu đỏ, màu cam là tới được mắt mình, thế là cả bầu trời chiều đỏ rực lên đấy."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "sunset", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "sunset", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.55, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "sunset", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "sunset", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu chỉ đám mây, hỏi sang chuyện mây trắng mây đen",
      lines: [tc("Thế còn mây, sao có đám trắng tinh, có đám lại đen sì hả ông?"), cd("Câu ấy thì để mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 3,
    week,
    theme,
    ask: "Vì sao mây trắng mà mây mưa lại đen?",
    myth: "Mây đen là mây bẩn, chứa nhiều khói bụi.",
    answer: "Mây hắt đều mọi màu của ánh nắng nên trông trắng, còn mây mưa dày quá, ánh sáng lọt xuống tới đáy chẳng được bao nhiêu, thế là đáy mây trông đen sì.",
    sources: [
      { title: "Met Office: Why are clouds white?", url: "https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/clouds/why-are-clouds-white" },
      { title: "Met Office: Clouds", url: "https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/clouds" },
      { title: "National Weather Service: Cloud development and types", url: "https://www.weather.gov/source/zhu/ZHU_Training_Page/clouds/cloud_development/clouds.htm" },
    ],
    question: "Hồi nhỏ, bạn từng nghĩ mây làm bằng gì?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu nhìn lên trời có cả mây trắng lẫn mây đen",
      lines: [tc("Ông ơi, sao mây lúc thì trắng tinh, lúc lại đen sì thế ạ?")],
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
      shot: "Thằng Cháu đoán mây đen là mây bẩn, Cụ Đồ đưa bằng chứng: nhìn từ máy bay, đỉnh mây mưa vẫn trắng",
      lines: [
        tc("Cháu biết rồi! Mây đen là mây bẩn, dính đầy khói bụi đúng không ông?"),
        cd("Bẩn đâu mà bẩn! Cháu cứ thử ngồi máy bay lên cao hơn mây mà nhìn xuống, đỉnh đám mây mưa ấy vẫn trắng tinh đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mây là giọt nước li ti, hắt đều mọi màu nên trắng; ánh sáng hắt lên trên nên đáy mây tối; mây mưa giọt to hơn",
      lines: [
        cd("Mây trông thế thôi, chứ là vô số giọt nước bé tí, lơ lửng trên trời đấy."),
        cd("Mà giọt nước thì to hơn hạt khí nhiều lắm. Màu nào của ánh nắng nó cũng hắt ra đều như nhau, thế là trắng!"),
        cd("Thế ánh nắng đi đâu ư? Mây càng dày thì ánh nắng càng bị hắt ngược lên trên, tỏa ra hai bên, lọt xuống tới đáy chẳng còn bao nhiêu."),
        cd("Mây mưa thì vừa dày vừa cao. Cho nên đứng dưới nhìn lên mới thấy đáy mây tối sầm, còn đỉnh thì vẫn trắng tinh đấy."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "clouds", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "clouds", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.7, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "clouds", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "clouds", step: 3 }, cd: { arms: "raise", expr: "happy" } },
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
    day: 17,
    week,
    theme,
    ask: "Vì sao trời nóng mà vẫn có mưa đá?",
    myth: "Mưa đá chỉ rơi vào mùa đông, lúc trời lạnh.",
    answer: "Chính trời nóng đắp nên mây giông cao, gió trong mây cuốn giọt nước lên chỗ lạnh đông thành đá, hạt đá nặng quá thì rơi xuống.",
    sources: [
      { title: "Met Office: Hail", url: "https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/hail" },
      { title: "NOAA National Severe Storms Laboratory: Severe Weather 101, Hail Basics", url: "https://www.nssl.noaa.gov/education/svrwx101/hail/" },
    ],
    question: "Bạn đã bao giờ gặp mưa đá giữa trời nóng chưa? Gặp mưa đá, nhớ vào nhà ngay nhé!",
    hook: {
      shot: "Ngoài sân nắng nóng, trời bỗng tối sầm, Thằng Cháu xoè tay hứng như có hạt đá rơi, mặt ngạc nhiên",
      lines: [tc("Ông ơi ông! Trời nóng thế này mà sao vẫn có mưa đá ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "hold2", expr: "shock", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán mưa đá chỉ có vào mùa đông, Cụ Đồ bảo ở nước Anh những trận mưa đá gây hại nhiều nhất lại hay rơi vào mùa hè",
      lines: [
        tc("Ơ, cháu cứ tưởng mưa đá chỉ rơi vào mùa đông thôi chứ!"),
        cd("Đông đâu mà đông! Ở bên Anh ấy, mấy trận mưa đá gây hại nhiều nhất lại hay rơi vào mùa hè cơ."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: đất nóng làm mọc mây giông rất cao, đỉnh mây lạnh; gió thổi ngược lên đưa giọt nước lên cao, đông thành đá; hạt đá va giọt nước, to dần; nặng quá thì rơi xuống",
      lines: [
        cd("Sao lại thế ư? Mùa hè đất nóng lên, hơi nóng bốc lên cuồn cuộn, đắp thành những đám mây giông cao ngất, mà trên đỉnh thì lạnh buốt."),
        cd("Trong mây có luồng gió thốc lên mạnh lắm, cuốn những giọt nước lên tận chỗ cao lạnh giá, thế là chúng đông lại thành đá."),
        cd("Hạt đá cứ lơ lửng trong gió, va phải giọt nước nào là giọt ấy đông lại, bám luôn vào nó. Thế là hạt đá to dần, to dần."),
        cd("Đến khi hạt đá nặng quá, gió đỡ không nổi nữa, nó mới rơi bộp xuống thành mưa đá, ngay giữa trời nóng!"),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w1-hail", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, board: { id: "w1-hail", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.7, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w1-hail", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w1-hail", step: 3 }, cd: { arms: "raise", expr: "happy" } },
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

  ];

/**
 * Kịch bản KHÔNG DÙNG (chủ kênh bỏ ngày 15/11/2026 khi xếp lại thứ tự đăng). Giữ số ngày cũ để tra cứu.
 * Không nằm trong index.ts nên không xuất, không hiện trong bot; giữ lại để dùng lại sau.
 */
export const KHONG_DUNG_1 = [
  makeEpisode({
    day: 26,
    week,
    theme,
    ask: "Vì sao thấy chớp trước rồi mới nghe sấm?",
    myth: "Chớp có trước, sấm đến sau.",
    answer: "Sấm và chớp sinh ra cùng lúc, nhưng ánh sáng đi nhanh hơn âm thanh rất nhiều, nên mình thấy chớp trước rồi mới nghe sấm.",
    sources: [
      { title: "Met Office: Thunder and lightning", url: "https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/thunder-and-lightning" },
      { title: "National Weather Service: Lightning science, thunder", url: "https://www.weather.gov/safety/lightning-science-thunder" },
    ],
    question: "Bạn có hay đếm từ lúc thấy chớp đến lúc nghe sấm không? Nghe sấm là vào nhà ngay nhé!",
    hook: {
      shot: "Ngoài sân, trời giông, Thằng Cháu bịt tai, mặt giật mình",
      lines: [tc("Ối! Ông ơi, sao lúc mưa giông, cháu toàn thấy chớp trước rồi mới nghe sấm thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "up2", expr: "shock", move: "tremble" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán chớp đến trước rồi sấm mới chạy theo, Cụ Đồ bảo hai thứ sinh ra cùng một lúc",
      lines: [
        tc("Chắc là chớp chạy trước, rồi sấm mới lạch bạch chạy theo sau hả ông?"),
        cd("Chạy theo đâu mà chạy! Sét đánh ngay sát nhà thì chớp vừa lóe đã nghe ầm luôn, sấm với chớp sinh ra cùng một lúc đấy cháu ạ."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "idle" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: tia chớp làm không khí nóng nở bung, co lại thành tiếng nổ; ánh sáng tới mắt rất nhanh, tiếng sấm tới tai chậm hơn",
      lines: [
        cd("Tia chớp nóng khủng khiếp, nóng hơn cả bề mặt Mặt Trời, làm không khí quanh nó nở bung ra trong nháy mắt."),
        cd("Không khí nở bung nhanh quá, nên nổ ra một tiếng ầm ầm, ấy chính là sấm đấy."),
        cd("Thế nhưng hai thứ ấy đi nhanh chậm khác nhau lắm, ánh chớp thì lao tới mắt mình gần như ngay tắp lự."),
        cd("Còn tiếng sấm đi chậm hơn nhiều, mãi sau mới tới tai mình. Cứ đếm từ lúc thấy chớp đến lúc nghe sấm, mỗi ba giây là sét ở xa chừng một cây số."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "thunder", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "thunder", step: 1 }, cd: { arms: "wave" } },
        { line: 1, at: 0.45, tc: { expr: "shock", move: "jump" }, fx: { kind: "bop", on: "TC", text: "ẦM!" } },
        { line: 2, board: { id: "thunder", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy", move: "idle" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "thunder", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Cụ Đồ dặn nghe sấm là vào nhà ngay, Thằng Cháu vâng lời rồi hỏi tiếp vì sao mình nổi da gà",
      lines: [
        cd("Mà nhớ đấy, cứ nghe tiếng sấm là phải vào nhà ngay!"),
        tc("Vâng ạ! Ơ mà sao trời lạnh, tay cháu lại nổi da gà hả ông? Lần sau ông giải thích cho cháu nhé!"),
      ],
      stage: [
        { line: 0, camera: "CD", cd: { arms: "point", expr: "neutral" }, tc: { arms: "down", move: "idle" }, fx: { kind: "exclaim", on: "CD" } },
        { line: 1, camera: "wide", tc: { arms: "raise", expr: "confused", move: "bounce" }, fx: { kind: "question", on: "TC" } },
      ],
    },
  }),

  makeEpisode({
    day: 32,
    week,
    theme,
    ask: "Mưa từ đâu ra?",
    myth: "Mây chỉ là hơi nước.",
    answer: "Nước bốc hơi bay lên, gặp lạnh thì hoá thành những giọt nước li ti làm nên mây, những giọt ấy to dần, đến khi nặng quá thì rơi xuống thành mưa.",
    sources: [
      { title: "Met Office: Rain", url: "https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/rain" },
      { title: "Met Office: Clouds", url: "https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/clouds" },
      { title: "UCAR Center for Science Education: The Water Cycle", url: "https://scied.ucar.edu/learning-zone/how-weather-works/water-cycle" },
    ],
    question: "Nếu có người hỏi “mưa từ đâu ra”, bạn sẽ trả lời thế nào?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu ngửa mặt nhìn trời, tay hứng như đợi mưa",
      lines: [tc("Ông ơi, mưa từ đâu ra thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "hold2", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán mây là hơi nước, Cụ Đồ bảo hơi nước thì vô hình, không nhìn thấy được",
      lines: [
        tc("Dễ ợt! Mây là hơi nước, hơi nước nặng quá thì rơi xuống thành mưa chứ gì ông?"),
        cd("Dễ đâu mà dễ! Hơi nước thì vô hình, có ai nhìn thấy được đâu, thế mà mây thì trắng xoá cả trời đấy thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: nắng làm nước biển bốc hơi, lên cao lạnh thành giọt li ti làm mây, giọt to dần, rơi thành mưa, chảy về biển",
      lines: [
        cd("Thế mưa ở đâu ra ư? Chuyện bắt đầu từ nắng đấy, nắng sưởi ấm sông, biển, thế là nước bốc thành hơi, bay lên."),
        cd("Bay lên cao thì gặp trời lạnh, hơi nước lại hoá thành những giọt nước li ti bám quanh hạt bụi, thế là thành mây đấy."),
        cd("Trong mây, giọt này nhập vào giọt kia, cứ to dần, to dần. Rồi sao nữa?"),
        cd("Đến khi nặng quá, giọt nước không lơ lửng nổi nữa thì rơi xuống thành mưa, rồi lại chảy về sông, về biển."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "rain", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, board: { id: "rain", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "rain", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "rain", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.4, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao cất đồ ăn vào tủ lạnh thì lâu hỏng hơn",
      lines: [tc("Ơ, thế sao cất đồ ăn vào tủ lạnh lại để được lâu hơn hả ông?"), cd("Câu này hay đấy, để lần sau ông kể tiếp cho nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 49,
    week,
    theme,
    ask: "Vì sao ban đêm trời tối?",
    myth: "Ban đêm mặt trời đi ngủ.",
    answer: "Trái Đất luôn tự quay, nên chỗ nào quay sang phía không được mặt trời chiếu tới thì ở đó thành ban đêm.",
    sources: [
      { title: "NASA Space Place: What Causes the Seasons?", url: "https://spaceplace.nasa.gov/seasons/en/" },
      { title: "NASA Science: Earth Facts", url: "https://science.nasa.gov/earth/facts/" },
    ],
    question: "Nếu được hỏi Cụ Đồ một câu “vì sao”, bạn sẽ hỏi gì?",
    hook: {
      shot: "Ngoài sân ban đêm, trăng sao, Thằng Cháu nhìn quanh tìm mặt trời",
      lines: [tc("Ông ơi, sao ban đêm trời lại tối thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "night",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "shrug", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán mặt trời đi ngủ, Cụ Đồ bảo lúc cháu ngủ thì bên kia Trái Đất đang là ban ngày",
      lines: [
        tc("Chắc ban đêm mặt trời cũng đi ngủ, giống cháu chứ gì ông?"),
        cd("Mặt trời lúc nào cũng sáng, ngủ nghê gì! Lúc cháu đi ngủ thì ở bên kia Trái Đất, các bạn ấy đang ở giữa ban ngày đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "happy", move: "idle" }, fx: { kind: "question", on: "TC", text: "Zzz" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: Trái Đất tự quay, mỗi ngày một vòng; chỗ mình quay về phía mặt trời là ngày, quay sang bên kia là đêm",
      lines: [
        cd("Sở dĩ thế là vì Trái Đất mình lúc nào cũng tự quay, như cái con quay ấy."),
        cd("Cứ mỗi ngày là nó quay đủ một vòng."),
        cd("Chỗ mình mà quay về phía mặt trời thì được nắng chiếu tới, thế là thành ban ngày."),
        cd("Đến khi chỗ mình quay dần sang phía bên kia thì nắng không chiếu tới được nữa, thế là thành ban đêm."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "night", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, board: { id: "night", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "night", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "night", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hiểu ra lúc mình ngủ thì mặt trời chiếu cho bạn bên kia, Cụ Đồ khen",
      lines: [
        tc("À! Thế lúc cháu ngủ là mặt trời đang chiếu nắng cho các bạn ở bên kia Trái Đất à!"),
        cd("Đúng rồi đấy! Cứ chịu khó hỏi vì sao như thế, rồi cái gì cũng ra lẽ cả."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
      ],
    },
  }),
];
