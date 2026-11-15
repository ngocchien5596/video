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
    answer: "Chiều tà, nắng đi quãng rất dài qua không khí, màu xanh bị hắt hết, chỉ còn đỏ cam tới mắt mình.",
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
        cd("Mặt trời có đổi màu đâu cháu! Đúng lúc mình ngắm hoàng hôn, có nơi đang giữa trưa, nắng vẫn trắng sáng đấy."),
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
        cd("Buổi trưa, mặt trời ở tít trên cao, nắng chỉ đi một quãng ngắn qua khí quyển, tức là lớp không khí trùm quanh Trái Đất."),
        cd("Đến chiều, mặt trời xuống thấp, nắng phải đi một quãng dài lắm trong khí quyển mới tới được mắt mình."),
        cd("Đường xa thế, thì màu xanh bị các hạt khí hắt văng đi hết dọc đường rồi."),
        cd("Còn sót lại mỗi màu đỏ, màu cam tới được mắt, thế là cả trời chiều đỏ cam."),
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
      lines: [tc("Thế còn mây, sao có đám trắng tinh, có đám lại đen sì hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
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
    answer: "Mây hắt ánh nắng nên trông trắng, còn đáy mây mưa nhận rất ít ánh sáng nên trông đen.",
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
        cd("Bẩn đâu mà bẩn! Cứ ngồi máy bay lên trên mà nhìn xuống, đỉnh đám mây mưa ấy vẫn trắng tinh đấy."),
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
        cd("Giọt nước to hơn hạt khí nhiều, màu nào của ánh nắng nó cũng hắt đều, thế là mây trông trắng."),
        cd("Thế ánh sáng đi đâu? Bị hắt ngược lên trên với sang hai bên, xuống tới đáy mây chẳng còn bao nhiêu."),
        cd("Mây mưa thì giọt nước to hơn, hắt ánh sáng đi nhiều hơn, nên đáy mây càng tối sầm."),
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
      shot: "Thằng Cháu hỏi tiếp mưa từ đâu ra",
      lines: [tc("Ơ, thế mưa thì ở đâu ra hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 4,
    week,
    theme,
    ask: "Mưa từ đâu ra?",
    myth: "Mây chỉ là hơi nước.",
    answer: "Nước bốc hơi bay lên, gặp lạnh thành giọt li ti làm mây, giọt to dần, nặng quá thì rơi xuống thành mưa.",
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
        cd("Nhiều người cũng tưởng mây là hơi nước đấy, nhưng chưa đúng! Hơi nước thì vô hình, có ai nhìn thấy được đâu."),
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
        cd("Nắng sưởi ấm sông, biển, thế là nước bốc thành hơi, bay lên."),
        cd("Lên cao trời lạnh, hơi nước lại hoá thành giọt nước li ti, bám vào hạt bụi, thành mây đấy."),
        cd("Trong mây, giọt này nhập vào giọt kia, cứ to dần, to dần."),
        cd("Nặng quá, không lơ lửng nổi nữa thì rơi xuống thành mưa, rồi lại chảy về sông, về biển."),
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
      shot: "Thằng Cháu hỏi tiếp vì sao trời nóng mà vẫn có mưa đá",
      lines: [tc("Ơ, thế mùa hè nóng nực thế, sao vẫn có mưa đá hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 5,
    week,
    theme,
    ask: "Vì sao trời nóng mà vẫn có mưa đá?",
    myth: "Mưa đá chỉ rơi vào mùa đông, lúc trời lạnh.",
    answer: "Trong mây giông, gió đưa giọt nước lên cao lạnh giá, đông thành đá, to dần, nặng quá thì rơi xuống, kể cả mùa hè.",
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
        cd("Tưởng thế thôi! Ở bên Anh ấy, mấy trận mưa đá gây hại nhiều nhất lại hay rơi vào mùa hè cơ."),
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
        cd("Mùa hè đất nóng, làm mọc lên những đám mây giông cao ngất, mà trên đỉnh thì lạnh buốt."),
        cd("Gió thổi ngược lên mạnh lắm, đưa giọt nước lên tận chỗ cao lạnh giá, đông lại thành đá."),
        cd("Hạt đá cứ lơ lửng trong gió, va phải giọt nước nào là nước đông bám thêm vào, to dần lên."),
        cd("Nặng quá, gió đỡ không nổi nữa, thế là rơi bộp xuống thành mưa đá!"),
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
      shot: "Thằng Cháu hỏi tiếp về sấm chớp lúc mưa giông",
      lines: [tc("Thế lúc mưa giông, sao cháu thấy chớp trước rồi mới nghe sấm hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 6,
    week,
    theme,
    ask: "Vì sao thấy chớp trước rồi mới nghe sấm?",
    myth: "Chớp có trước, sấm đến sau.",
    answer: "Sấm và chớp sinh ra cùng lúc, nhưng ánh sáng đi nhanh hơn âm thanh rất nhiều, nên mình thấy chớp trước.",
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
        cd("Chạy theo đâu mà chạy! Sấm với chớp sinh ra cùng một lúc đấy cháu ạ."),
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
        cd("Tia chớp nóng khủng khiếp, làm không khí quanh nó nở bung ra trong nháy mắt."),
        cd("Nở bung rồi lại co vào đột ngột, nổ một tiếng ầm ầm, ấy chính là sấm đấy."),
        cd("Ánh chớp thì lao tới mắt mình gần như ngay tắp lự."),
        cd("Còn tiếng sấm đi chậm hơn nhiều, nên mãi sau mới tới tai mình."),
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
      shot: "Cụ Đồ dặn nghe sấm là vào nhà ngay, Thằng Cháu vâng lời rồi hỏi tiếp về ban đêm",
      lines: [
        cd("Mà nhớ đấy, cứ nghe tiếng sấm là phải vào nhà ngay!"),
        tc("Vâng ạ! Ơ mà ban đêm, mặt trời trốn đi đâu mất hả ông?"),
      ],
      stage: [
        { line: 0, camera: "CD", cd: { arms: "point", expr: "neutral" }, tc: { arms: "down", move: "idle" }, fx: { kind: "exclaim", on: "CD" } },
        { line: 1, camera: "wide", tc: { arms: "raise", expr: "confused", move: "bounce" }, fx: { kind: "question", on: "TC" } },
      ],
    },
  }),

  makeEpisode({
    day: 7,
    week,
    theme,
    ask: "Vì sao ban đêm trời tối?",
    myth: "Ban đêm mặt trời đi ngủ.",
    answer: "Trái Đất luôn tự quay, chỗ mình quay sang phía không có mặt trời chiếu thì thành ban đêm.",
    sources: [
      { title: "NASA Space Place: What Causes the Seasons?", url: "https://spaceplace.nasa.gov/seasons/en/" },
      { title: "NASA Science: Earth Facts", url: "https://science.nasa.gov/earth/facts/" },
    ],
    question: "Tuần sau là chuyện con vật. Bạn muốn ông giải đáp câu nào?",
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
        cd("Mặt trời lúc nào cũng sáng, ngủ nghê gì! Lúc cháu đi ngủ, bên kia Trái Đất các bạn đang giữa ban ngày đấy."),
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
        cd("Trái Đất mình lúc nào cũng tự quay, như cái con quay ấy."),
        cd("Cứ mỗi ngày là nó quay đủ một vòng."),
        cd("Chỗ mình quay về phía mặt trời, nắng chiếu tới, thế là ban ngày."),
        cd("Quay dần sang phía bên kia, nắng không chiếu tới nữa, thế là thành ban đêm."),
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
      shot: "Thằng Cháu hiểu ra lúc mình ngủ thì mặt trời chiếu cho bạn bên kia, Cụ Đồ hẹn tuần sau hỏi tiếp",
      lines: [
        tc("À! Thế lúc cháu ngủ là mặt trời đang chiếu nắng cho các bạn bên kia à!"),
        cd("Giỏi! Tuần sau cháu lại hỏi ông tiếp nhé!"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
      ],
    },
  }),
];
