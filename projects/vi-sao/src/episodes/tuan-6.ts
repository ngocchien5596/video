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
    question: "Lần đầu tắm biển, bạn có lỡ uống phải ngụm nước mặn chát không?",
    hook: {
      shot: "Trên bãi biển, Thằng Cháu nhăn mặt lè lưỡi vì nước mặn, hỏi ông",
      lines: [tc("Phì phì! Ông ơi, nước sông ngọt chảy ra biển, sao biển lại mặn chát thế ạ?")],
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
        tc("Hay là nước sông chẳng có tí muối nào, còn muối thì có sẵn trong biển từ đầu hả ông?"),
        cd("Chưa đúng đâu! Nước sông cũng có tí muối đấy, có điều ít quá nên mình uống chẳng thấy mặn thôi."),
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
        cd("Cháu xem, mưa rơi xuống đất đá, hoà tan từng tí muối có trong đá."),
        cd("Sông suối gom chỗ muối ấy, cứ thế chảy mãi ra biển."),
        cd("Nắng hun nước biển bốc hơi lên thành mây, còn muối thì ở lại, có bay theo được đâu!"),
        cd("Cứ thế rất rất lâu, muối dồn mỗi lúc một nhiều, biển mới mặn thế đấy."),
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
      lines: [tc("Ơ, thế sao nước biển lại xanh ngắt thế hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
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
    question: "Biển chỗ bạn hay đi màu xanh lam, xanh lục hay nâu đục?",
    hook: {
      shot: "Trên bãi biển, Thằng Cháu giơ tay chỉ ra mặt biển xanh",
      lines: [tc("Ông ơi ông, sao nước biển lại xanh thế ạ?")],
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
        tc("Cháu biết! Biển soi bóng bầu trời nên mới xanh giống trời, đúng không ông?"),
        cd("Không chỉ thế đâu! Chính nước biển có màu xanh đấy, có điều múc ra một cốc thì ít quá, nên trông trong veo."),
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
        cd("Ánh nắng thì có đủ các màu cầu vồng, chiếu xuống mặt biển."),
        cd("Vào đến nước, màu đỏ, màu cam, màu vàng bị nước hút mất trước tiên."),
        cd("Màu xanh dai nhất, khó bị hút nhất, nên lặn được sâu hơn, rồi bị hắt ngược ra ngoài."),
        cd("Ánh xanh ấy về tới mắt mình. Biển càng sâu, mình càng thấy nước xanh rõ."),
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
      lines: [tc("Thế còn giọt mưa, thật ra nó hình gì hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
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
    question: "Hồi nhỏ, bạn hay vẽ giọt mưa hình gì?",
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
        tc("Thì đầu nhọn, đáy tròn, như cháu vẫn vẽ ấy, phải không ông?"),
        cd("Chưa đúng đâu! Đầu nhọn là chỉ có trong tranh thôi, chứ giọt mưa thật lúc mới thành thì tròn xoe."),
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
        cd("Trên trời, giọt nước bé xíu thì tròn xoe, vì mặt nước có một lớp như lớp da, níu nó lại."),
        cd("Rơi xuống, nó va vào các giọt khác, to dần lên, rơi mỗi lúc một nhanh."),
        cd("Không khí đẩy ngược lên đáy, làm đáy dẹt ra, trông cứ như cái bánh hamburger ấy!"),
        cd("Giọt nào to quá thì phồng ra như cái dù, rồi vỡ toác thành những giọt nhỏ tròn hơn."),
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
      lines: [tc("Ơ, thế sao con nhện nước lại đi được trên mặt nước hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
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
    question: "Ở Việt Nam có loài nhện nước khổng lồ, dài tới hai mươi xăng-ti-mét! Bạn đã thấy nhện nước lướt trên ao chưa?",
    hook: {
      shot: "Ngoài sân, cạnh cái ao nhỏ, Thằng Cháu cúi xuống nhìn con nhện nước lướt trên mặt nước",
      lines: [tc("Ông ơi, con nhện nước kia sao đi được trên mặt nước thế ạ?")],
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
        tc("Chắc nó là một con nhện biết đi trên nước, phải không ông?"),
        cd("Chưa đúng đâu! Cháu đếm xem, nó có sáu chân, là côn trùng đấy, chứ có phải nhện đâu."),
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
        cd("Ở mặt nước, các hạt nước bé tí níu chặt lấy nhau, người ta gọi là sức căng mặt nước."),
        cd("Nhện nước thì nhẹ tênh, chân dài dang rộng chia đều sức nặng, nên chẳng kéo đứt được mối níu ấy."),
        cd("Chân nó lại có lông tí hon đẩy nước ra, cứ như đi giày trượt trên mặt nước."),
        cd("Đầu chân chỉ làm mặt nước lõm xuống tí xíu, còn đôi chân giữa thì nó chèo như mái chèo."),
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
      lines: [tc("Ông ơi, thế tàu bằng sắt nặng thế, sao không chìm ạ?"), cd("Câu đó, mai ông kể tiếp nhé!")],
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
    question: "Trong nhà bạn, đồ gì to mà vẫn nổi trên nước?",
    hook: {
      shot: "Trên bãi biển, Thằng Cháu chỉ con tàu to ngoài khơi",
      lines: [tc("Ông ơi, tàu bằng sắt nặng thế kia, sao lại không chìm ạ?")],
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
        cd("Chưa đúng đâu! Cục sắt đặc bé tí thì chìm nghỉm, thế mà con tàu sắt nặng gấp bao nhiêu lần lại nổi đấy thôi."),
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
        cd("Tàu đè xuống, nước bị đẩy dạt sang hai bên."),
        cd("Nước bị đẩy thì nó đẩy lại, nâng đáy tàu lên đấy."),
        cd("Mà tàu thì rỗng ruột, bên trong nhiều không khí lắm, nên nhẹ hơn khối nước to bằng chừng ấy."),
        cd("Nước đẩy lên mạnh hơn sức nặng của tàu, thế là tàu nổi, còn cục sắt đặc thì chìm."),
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
      lines: [tc("Ơ, thế cục đá trong cốc nước, sao cũng nổi lềnh bềnh hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
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
    question: "Bạn thích uống nước có đá không? Lần tới thử ngắm xem cục đá nổi thế nào nhé!",
    hook: {
      shot: "Trong bếp, Thằng Cháu ngồi cạnh bàn nhìn cốc nước có cục đá nổi",
      lines: [tc("Ông ơi, cục đá trong cốc sao lại nổi thế ạ?")],
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
        cd("Hầu hết các thứ khác đúng là thế, nhưng nước thì ngược đời! Cháu xem, khay nước đông xong, viên đá còn gồ hẳn lên kia kìa."),
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
        cd("Trong nước, các hạt nước li ti chen chúc nhau, chạy lung tung cả lên."),
        cd("Đông thành đá thì chúng lại xếp hàng ngay ngắn, đứng xa nhau hơn."),
        cd("Vẫn chừng ấy nước thôi, mà thành đá lại chiếm nhiều chỗ hơn, nên nhẹ hơn nước cùng một cỡ."),
        cd("Mà nhẹ hơn thì nổi chứ sao! Cục đá cứ thế nổi trên mặt cốc."),
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
    question: "Hồi nhỏ, bạn từng nghĩ cốc nước đá “đổ mồ hôi” vì sao?",
    hook: {
      shot: "Trong bếp, Thằng Cháu sờ thành cốc nước đá ướt, giơ tay ướt lên hỏi ông",
      lines: [tc("Ông ơi, cốc nước đá này sao lại đổ mồ hôi thế ạ?")],
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
        tc("Hay là nước trong cốc thấm qua thành cốc, rỉ ra ngoài hả ông?"),
        cd("Chưa đúng đâu! Thuỷ tinh chắc thế, nước thấm qua sao được. Mà cháu để ý xem, sao chỉ cốc lạnh mới ướt nhỉ?"),
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
        cd("Không khí quanh mình lúc nào cũng có hơi nước, nhỏ li ti, mắt không nhìn thấy."),
        cd("Không khí chạm vào thành cốc lạnh, thế là bị lạnh đi."),
        cd("Hơi nước lạnh đi thì chậm lại, tụm vào nhau, thành giọt nước bám ngoài cốc đấy."),
        cd("Hôm nào trời càng ẩm, không khí càng nhiều hơi nước, cốc càng đổ mồ hôi nhiều."),
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
        tc("Thế trong bếp nhà mình còn chuyện gì lạ nữa không ông?"),
        cd("Nhiều lắm! Tuần sau, ông dẫn cháu đi một vòng căn bếp nhé!"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "confused", move: "bounce" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
  }),
];
