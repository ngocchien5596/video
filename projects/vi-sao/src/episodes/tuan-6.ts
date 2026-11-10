import { cd, makeEpisode, tc } from "./make.ts";

const week = 6;
const theme = "Nước quanh ta";

export const TUAN_6 = [
  makeEpisode({
    day: 36,
    week,
    theme,
    ask: "Nước sông ngọt chảy ra biển, vì sao biển lại mặn?",
    myth: "Nước sông không có tí muối nào, muối có sẵn trong biển từ đầu.",
    answer: "Mưa hoà tan chút muối trong đất đá, sông mang ra biển, nước biển bốc hơi còn muối ở lại, lâu dần biển mặn.",
    sources: [
      { title: "NOAA National Ocean Service: Why is the ocean salty?", url: "https://oceanservice.noaa.gov/facts/whysalty.html" },
      {
        title: "Woods Hole Oceanographic Institution: What makes the ocean salty?",
        url: "https://www.whoi.edu/ocean-learning-hub/ocean-facts/what-makes-the-ocean-salty/",
      },
      { title: "Ask Dr. Universe (Washington State University): Oceans – Why are they salty?", url: "https://askdruniverse.wsu.edu/2016/04/18/oceans-why-are-they-salty/" },
    ],
    ages: "5–9 tuổi",
    question: "Lần đầu tắm biển, bé nhà bạn có lỡ uống phải ngụm nước mặn chát không? Kể ông nghe với!",
    hook: {
      shot: "Trên bãi biển, Thằng Cháu nhăn mặt lè lưỡi vì nước mặn, hỏi ông",
      lines: [tc("Ông ơi, nước sông ngọt chảy ra biển, sao nước biển lại mặn thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "beach",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "shrug", expr: "sad", move: "shake" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán muối có sẵn trong biển, nước sông không có muối; Cụ Đồ bảo nước sông cũng có chút muối",
      lines: [
        tc("Có phải nước sông chẳng có tí muối nào, còn muối thì có sẵn trong biển từ đầu không ông?"),
        cd("Chưa đúng đâu! Nước sông cũng có một chút muối đấy, chỉ là ít quá nên mình không thấy mặn."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", expr: "neutral", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mưa rơi xuống đá hoà tan muối; sông mang muối ra biển; nắng làm nước biển bốc hơi, muối ở lại; rất lâu, biển mặn",
      lines: [
        cd("Nước mưa rơi xuống đất đá, hoà tan từng chút muối có trong đá."),
        cd("Sông suối mang chút muối ấy, chảy mãi ra biển."),
        cd("Nắng làm nước biển bốc hơi bay lên thành mây, nhưng muối thì ở lại trong biển."),
        cd("Cứ thế rất rất lâu, muối dồn lại mỗi lúc một nhiều, nên nước biển mặn."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w6-salty", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w6-salty", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w6-salty", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w6-salty", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu chỉ ra biển, hỏi sao biển màu xanh",
      lines: [tc("Thế sao nước biển lại xanh ngắt thế hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 37,
    week,
    theme,
    ask: "Vì sao nước biển màu xanh?",
    myth: "Biển xanh chỉ vì soi bóng bầu trời.",
    answer: "Nước hút bớt ánh đỏ, cam, vàng của nắng, còn ánh xanh bị hắt ngược ra tới mắt mình, nên biển xanh.",
    sources: [
      { title: "NOAA National Ocean Service: Why is the ocean blue?", url: "https://oceanservice.noaa.gov/facts/oceanblue.html" },
      { title: "University of Illinois Physics Van: Why the Ocean is Blue", url: "https://van.physics.illinois.edu/ask/listing/22358" },
      { title: "Scripps Institution of Oceanography (UC San Diego): Why is the ocean blue?", url: "https://scripps.ucsd.edu/news/voyager-why-ocean-blue" },
    ],
    ages: "5–9 tuổi",
    question: "Biển ở chỗ nhà bạn màu xanh lam, xanh lục hay nâu đục? Kể ông nghe với!",
    hook: {
      shot: "Trên bãi biển, Thằng Cháu giơ tay chỉ ra mặt biển xanh",
      lines: [tc("Ông ơi, vì sao nước biển lại màu xanh ạ?")],
      stage: [
        {
          cut: true,
          scene: "beach",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "point", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán biển soi bóng trời, Cụ Đồ bảo không chỉ thế, chính nước có màu xanh",
      lines: [
        tc("Có phải biển soi bóng bầu trời, nên mới xanh giống trời không ông?"),
        cd("Không chỉ thế đâu! Chính nước biển có màu xanh đấy, chỉ là cốc nước ít quá, nên trông trong veo."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: nắng đủ màu chiếu vào biển; nước hút đỏ, cam, vàng; màu xanh đi sâu và bị hắt ngược ra; mắt thấy biển xanh",
      lines: [
        cd("Ánh nắng có đủ các màu cầu vồng, chiếu xuống mặt biển."),
        cd("Đi vào nước, màu đỏ, màu cam, màu vàng bị nước hút mất trước."),
        cd("Màu xanh khó bị hút nhất, nên đi được sâu hơn, rồi bị hắt ngược ra ngoài."),
        cd("Ánh xanh ấy tới mắt mình, biển càng sâu, mình càng thấy rõ màu xanh của nước."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w6-sea-blue", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w6-sea-blue", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" } },
        { line: 2, board: { id: "w6-sea-blue", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w6-sea-blue", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Trời lất phất mưa, Thằng Cháu xoè tay hứng giọt mưa, hỏi giọt mưa có hình gì",
      lines: [tc("Thế giọt mưa thật ra có hình gì hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 38,
    week,
    theme,
    ask: "Giọt mưa thật ra có hình gì?",
    myth: "Giọt mưa có hình giọt lệ, đầu nhọn, đáy tròn.",
    answer: "Giọt mưa nhỏ thì tròn xoe, giọt to rơi xuống bị không khí đẩy dẹt đáy như chiếc bánh hamburger, chứ không nhọn đầu.",
    sources: [
      {
        title: "NASA Scientific Visualization Studio (GPM): Anatomy of a Raindrop – script",
        url: "https://svs.gsfc.nasa.gov/vis/a010000/a011200/a011288/script_17936_00.html",
      },
      { title: "UCAR Center for Science Education: The Shape of Raindrops", url: "https://scied.ucar.edu/video/shape-raindrops" },
      { title: "Penn State University (Alistair B. Fraser): Bad Rain", url: "https://personal.ems.psu.edu/~fraser/Bad/BadRain.html" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn hay vẽ giọt mưa hình gì? Thử cùng bé vẽ một giọt mưa hình chiếc bánh hamburger nhé!",
    hook: {
      shot: "Bên bờ biển lất phất mưa, Thằng Cháu xoè tay hứng giọt mưa, nhìn chăm chú",
      lines: [tc("Ông ơi, giọt mưa thật ra có hình gì thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "beach",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "hold2", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán giọt mưa đầu nhọn như cháu vẫn vẽ, Cụ Đồ bảo hình đầu nhọn chỉ có trong tranh, giọt mưa mới thành thì tròn xoe",
      lines: [
        tc("Giọt mưa có đầu nhọn, đáy tròn, giống cháu vẫn vẽ, phải không ông?"),
        cd("Chưa đúng đâu! Hình đầu nhọn chỉ có trong tranh vẽ thôi, giọt mưa thật lúc mới thành thì tròn xoe."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: giọt nước nhỏ tròn xoe nhờ lớp da của nước; giọt rơi, va nhau, to dần; không khí đẩy dẹt đáy như bánh hamburger; giọt to phồng như cái dù rồi vỡ thành giọt nhỏ tròn",
      lines: [
        cd("Giọt nước nhỏ xíu trên trời thì tròn xoe, vì mặt nước có một lớp như lớp da, níu giọt nước lại."),
        cd("Khi rơi xuống, giọt mưa va vào các giọt khác, to dần lên và rơi nhanh hơn."),
        cd("Không khí đẩy ngược lên đáy giọt mưa, làm đáy dẹt ra, trông như chiếc bánh hamburger."),
        cd("Giọt to quá thì phồng ra như cái dù, rồi vỡ thành những giọt nhỏ tròn hơn."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w6-raindrop", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w6-raindrop", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w6-raindrop", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" } },
        { line: 2, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w6-raindrop", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu nghĩ tới con nhện nước lướt trên ao, hỏi ông",
      lines: [tc("Thế sao con nhện nước lại đi được trên mặt nước hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 39,
    week,
    theme,
    ask: "Vì sao con nhện nước đi được trên mặt nước?",
    myth: "Nhện nước là một loài nhện.",
    answer: "Nhện nước rất nhẹ, chân dang rộng lại có lông đẩy nước, nên không làm đứt mối níu của các hạt nước trên mặt nước.",
    sources: [
      { title: "MIT News: MIT leaps to solution of walking-on-water mystery", url: "https://news.mit.edu/2003/robostrider" },
      { title: "EarthDate (Bureau of Economic Geology, University of Texas at Austin): Walking on Water", url: "https://www.earthdate.org/episodes/walking-on-water" },
      { title: "Ask Dr. Universe (Washington State University): How do bugs walk on water?", url: "https://askdruniverse.wsu.edu/2016/12/12/bugs_on_water/" },
    ],
    ages: "5–9 tuổi",
    question: "Ở Việt Nam có loài nhện nước khổng lồ, dài tới hai mươi xăng-ti-mét! Bé nhà bạn đã thấy nhện nước lướt trên ao chưa? Ra ao hồ nhớ đi cùng người lớn nhé!",
    hook: {
      shot: "Ngoài sân, cạnh cái ao nhỏ, Thằng Cháu cúi xuống nhìn con nhện nước lướt trên mặt nước",
      lines: [tc("Ông ơi, vì sao con nhện nước lại đi được trên mặt nước thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "point", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán nhện nước là con nhện biết bơi, Cụ Đồ bảo nó có sáu chân, là côn trùng chứ không phải nhện",
      lines: [
        tc("Có phải nhện nước là một con nhện biết đi trên nước không ông?"),
        cd("Chưa đúng đâu! Nó có sáu chân, là côn trùng, chứ chẳng phải nhện."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: các hạt nước níu nhau ở mặt nước; nhện nước nhẹ, sáu chân dài dang rộng chia sức nặng; lông chân đẩy nước như giày trượt; đầu chân làm mặt nước lõm, chân giữa chèo như mái chèo",
      lines: [
        cd("Ở mặt nước, các hạt nước bé tí níu chặt lấy nhau, gọi là sức căng mặt nước."),
        cd("Nhện nước rất nhẹ, chân dài dang rộng chia đều sức nặng, nên không kéo đứt được mối níu ấy."),
        cd("Chân nó lại có lông tí hon đẩy nước ra, như đi đôi giày trượt trên mặt nước."),
        cd("Đầu chân chỉ làm mặt nước lõm xuống chút xíu, rồi nó chèo đôi chân giữa như mái chèo."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w6-strider", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w6-strider", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" } },
        { line: 1, at: 0.6, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w6-strider", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "neutral" } },
        { line: 3, board: { id: "w6-strider", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu chỉ con tàu ngoài khơi, hỏi sao tàu sắt không chìm",
      lines: [tc("Ông ơi, tàu bằng sắt nặng thế, sao không chìm ạ?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 40,
    week,
    theme,
    ask: "Tàu bằng sắt nặng thế, sao không chìm?",
    myth: "Vật nặng thì chìm, vật nhẹ thì nổi.",
    answer: "Tàu rỗng, bên trong nhiều không khí, nên nhẹ hơn khối nước cùng một cỡ, và nước đẩy tàu nổi lên.",
    sources: [
      { title: "University of Illinois Physics Van: Why do Ships Float? Why Don't They Sink?", url: "https://van.physics.illinois.edu/ask/listing/2174" },
      {
        title: "Alabama Cooperative Extension System: Understanding Buoyancy & Barge Building",
        url: "https://www.aces.edu/blog/topics/4h/understanding-buoyancy-barge-building/",
      },
      {
        title: "Texas A&M Engineering: Floating masterpieces – How engineers design ships to stay afloat",
        url: "https://engineering.tamu.edu/news/2021/10/ocen-floating-masterpieces-how-engineers-design-ships-to-stay-afloat.html",
      },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn đoán đồ vật nào trong nhà sẽ nổi, đồ nào sẽ chìm? Thử cùng bé trong chậu nước, có người lớn bên cạnh nhé!",
    hook: {
      shot: "Trên bãi biển, Thằng Cháu chỉ con tàu to ngoài khơi",
      lines: [tc("Ông ơi, tàu bằng sắt nặng thế, sao lại không chìm ạ?")],
      stage: [
        {
          cut: true,
          scene: "beach",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "point", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu bảo vật nặng thì phải chìm, Cụ Đồ đưa bằng chứng cục sắt nhỏ chìm mà tàu sắt to lại nổi",
      lines: [
        tc("Cháu tưởng vật nặng thì phải chìm, vật nhẹ mới nổi chứ ông?"),
        cd("Chưa đúng đâu! Một cục sắt đặc bé xíu thì chìm nghỉm, mà con tàu sắt nặng hơn gấp bao nhiêu lần lại nổi đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hips", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: tàu đè xuống đẩy nước dạt ra; nước đẩy ngược tàu lên; tàu rỗng nhiều không khí, nhẹ hơn khối nước cùng cỡ; tàu nổi, cục sắt đặc chìm",
      lines: [
        cd("Tàu đè xuống nước, đẩy nước dạt sang hai bên."),
        cd("Nước bị đẩy thì đẩy ngược lại, nâng đáy tàu lên."),
        cd("Tàu rỗng ruột, bên trong có rất nhiều không khí, nên nhẹ hơn khối nước to bằng chừng ấy."),
        cd("Nước đẩy lên mạnh hơn sức nặng của tàu, nên tàu nổi, còn cục sắt đặc thì chìm."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w6-ship", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w6-ship", step: 1 }, cd: { arms: "up2" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w6-ship", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w6-ship", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao cục đá cũng nổi trên nước",
      lines: [tc("Thế cục đá trong cốc nước, sao cũng nổi lềnh bềnh hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 41,
    week,
    theme,
    ask: "Vì sao cục đá lại nổi trên nước?",
    myth: "Đông cứng lại thì phải nặng hơn nước và chìm xuống.",
    answer: "Khi đông thành đá, nước nở ra, các hạt nước đứng thưa hơn, nên đá nhẹ hơn nước cùng một cỡ và nổi lên.",
    sources: [
      { title: "University of Alaska Fairbanks, Geophysical Institute: Freezing of Water", url: "https://www.gi.alaska.edu/alaska-science-forum/freezing-water" },
      {
        title: "Ohio State University, Beyond Penguins and Polar Bears: All About Icebergs",
        url: "https://beyondpenguins.ehe.osu.edu/issue/icebergs-and-glaciers/all-about-icebergs",
      },
      { title: "Penn State EMS (EARTH 111): Thermal Expansion and Density", url: "https://courses.ems.psu.edu/earth111/node/842" },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn thích uống nước có đá không? Lần tới thử cùng bé ngắm xem cục đá nổi thế nào nhé!",
    hook: {
      shot: "Trong bếp, Thằng Cháu ngồi cạnh bàn nhìn cốc nước có cục đá nổi",
      lines: [tc("Ông ơi, vì sao cục đá lại nổi trên nước thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "point", expr: "confused", move: "idle" },
          items: [{ id: "fridge", prop: "fridge", x: 0.88, on: "floor" }],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán đông cứng thì phải chìm, Cụ Đồ bảo nước đông lại còn nở ra, nhìn viên đá gồ lên trong khay",
      lines: [
        tc("Cháu tưởng nước đông cứng lại thì phải nặng hơn, chìm xuống chứ ông?"),
        cd("Hầu hết các thứ khác đúng là thế, nhưng nước thì ngược lại! Cháu xem, nước trong khay đông xong, viên đá còn gồ lên đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: hạt nước lỏng chen chúc lộn xộn; khi đông xếp hàng ngay ngắn, đứng xa nhau; cùng chừng ấy nước mà đá chiếm nhiều chỗ hơn; đá nhẹ hơn nên nổi",
      lines: [
        cd("Trong nước, các hạt nước li ti chen chúc nhau, chạy lung tung."),
        cd("Khi đông thành đá, chúng xếp hàng ngay ngắn, đứng xa nhau hơn."),
        cd("Vẫn chừng ấy nước, mà đá lại chiếm nhiều chỗ hơn, nên nhẹ hơn nước cùng một cỡ."),
        cd("Nhẹ hơn thì nổi, nên cục đá lúc nào cũng nổi trên mặt cốc."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w6-ice", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w6-ice", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w6-ice", step: 2 }, cd: { arms: "up2", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w6-ice", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu sờ thành cốc ướt, hỏi sao cốc nước đá đổ mồ hôi",
      lines: [tc("Ơ, mà sao cốc nước đá lại đổ mồ hôi ướt nhẹp thế hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 42,
    week,
    theme,
    ask: "Vì sao cốc nước đá lại “đổ mồ hôi”?",
    myth: "Nước trong cốc thấm qua thành cốc ra ngoài.",
    answer: "Hơi nước vô hình trong không khí chạm vào thành cốc lạnh thì đọng lại thành giọt nước.",
    sources: [
      { title: "NOAA JetStream: Sweatin' to the Coldies", url: "https://www.noaa.gov/jetstream/ll-sweatin" },
      {
        title: "Ohio State University, Beyond Penguins and Polar Bears: Common Misconceptions about States and Changes of Matter and the Water Cycle",
        url: "https://beyondpenguins.ehe.osu.edu/issue/water-ice-and-snow/common-misconceptions-about-states-and-changes-of-matter-and-the-water-cycle",
      },
      {
        title: "TERC Inquiry Project: Condensation Concept Cartoon",
        url: "https://inquiryproject.terc.edu/curriculum/curriculum5/concept_cartoon/condensation/index.html",
      },
    ],
    ages: "5–9 tuổi",
    question: "Bé nhà bạn từng nghĩ cốc nước đá “đổ mồ hôi” vì sao? Kể ông nghe với!",
    hook: {
      shot: "Trong bếp, Thằng Cháu sờ thành cốc nước đá ướt, giơ tay ướt lên hỏi ông",
      lines: [tc("Ông ơi, vì sao cốc nước đá lại đổ mồ hôi thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle" },
          items: [{ id: "fridge", prop: "fridge", x: 0.88, on: "floor" }],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán nước thấm qua thành cốc, Cụ Đồ bảo thuỷ tinh rắn chắc, và chỉ cốc lạnh mới ướt",
      lines: [
        tc("Có phải nước trong cốc thấm qua thành cốc, chảy ra ngoài không ông?"),
        cd("Chưa đúng đâu! Thành cốc thuỷ tinh rắn chắc, nước không thấm qua được. Mà sao chỉ cốc lạnh mới ướt nhỉ?"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.65, camera: "wide", tc: { expr: "confused" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: không khí có hơi nước vô hình; không khí chạm cốc lạnh bị lạnh đi; hơi nước tụm lại thành giọt bám ngoài cốc; trời càng ẩm càng nhiều giọt",
      lines: [
        cd("Không khí quanh mình luôn có hơi nước, nhỏ li ti, mắt không nhìn thấy."),
        cd("Không khí chạm vào thành cốc lạnh, thì bị lạnh đi."),
        cd("Hơi nước lạnh đi thì chậm lại, tụm vào nhau, thành những giọt nước bám ngoài cốc."),
        cd("Trời càng ẩm, không khí càng nhiều hơi nước, cốc càng đổ mồ hôi nhiều."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w6-glass", step: 0 }, cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 1, board: { id: "w6-glass", step: 1 }, cd: { arms: "point" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w6-glass", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w6-glass", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu nhìn quanh căn bếp, hỏi trong bếp còn chuyện lạ gì; Cụ Đồ hẹn tuần sau",
      lines: [
        tc("Thế trong bếp nhà mình, còn những chuyện lạ gì nữa hả ông?"),
        cd("Được! Tuần sau, ông cháu mình cùng khám phá căn bếp nhé!"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "confused", move: "bounce" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
  }),
];
