import { cd, makeEpisode, tc } from "./make.ts";

const week = 5;
const theme = "Cây cối và trái cây";

export const TUAN_5 = [
  makeEpisode({
    day: 29,
    week,
    theme,
    ask: "Vì sao cây bắt ruồi lại ăn côn trùng?",
    myth: "Cây bắt ruồi không cần nắng, chỉ ăn côn trùng thay cơm để sống.",
    answer: "Cây bắt ruồi vẫn lấy năng lượng từ nắng, nó bắt côn trùng để có thêm chất bổ mà đất đầm lầy thiếu.",
    sources: [
      { title: "San Diego Zoo Wildlife Explorers: Venus Flytrap", url: "https://kids.sandiegozoo.org/animals/venus-flytrap" },
      { title: "NC State Extension Gardener Plant Toolbox: Dionaea muscipula", url: "https://plants.ces.ncsu.edu/plants/dionaea-muscipula/" },
    ],
    question: "Bạn đoán một chiếc bẫy lá của cây bắt ruồi bắt được mấy con côn trùng?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu ngồi xổm cạnh chậu cây bắt ruồi đang há bẫy lá, mặt thắc mắc",
      lines: [tc("Ông ơi, vì sao cây bắt ruồi ăn côn trùng thế ạ?")],
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
      shot: "Thằng Cháu đoán cây bắt ruồi không cần nắng, chỉ ăn côn trùng thay cơm; Cụ Đồ bảo nó vẫn lấy năng lượng từ nắng như mọi cây",
      lines: [
        tc("Cây bắt ruồi không cần nắng, chỉ ăn côn trùng thay cơm, phải không ông?"),
        cd("Chưa đúng đâu! Giống các cây khác, nó vẫn lấy năng lượng từ nắng đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hips", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: cây mọc ở đầm lầy đất ướt, thiếu chất bổ; bẫy là chiếc lá gập đôi có lông nhỏ; côn trùng chạm lông, lá sập lại; nước tiêu hoá làm tan côn trùng, cây hút chất bổ",
      lines: [
        cd("Cây bắt ruồi mọc ở đầm lầy, đất ướt và chua, rất thiếu chất bổ."),
        cd("Mỗi cái bẫy là một chiếc lá gập đôi có bản lề, mặt trong có những sợi lông nhỏ xíu."),
        cd("Côn trùng đậu xuống, chạm vào các sợi lông ấy, thế là chiếc lá sập lại trong chưa đầy một giây."),
        cd("Nước tiêu hoá của cây làm tan con côn trùng, rồi cây hút lấy chất bổ mà đất còn thiếu."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w5-flytrap", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w5-flytrap", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w5-flytrap", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" } },
        { line: 2, at: 0.6, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w5-flytrap", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu nhìn lên cây to trong sân, hỏi cây lớn lên từ đâu",
      lines: [tc("Thế cây to như cây đa kia, là lớn lên từ đâu ra hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 30,
    week,
    theme,
    ask: "Cây to như thế là lớn lên từ đâu ra?",
    myth: "Cây ăn đất để lớn.",
    answer: "Ngoài nước, phần lớn cái cây được làm từ khí cacbonic lấy trong không khí, nhờ năng lượng ánh nắng.",
    sources: [
      { title: "Ask A Biologist (Arizona State University): The Recipe for Plant Growth", url: "https://askabiologist.asu.edu/recipe-plant-growth" },
      { title: "California State University, Northridge: Plant Mass", url: "http://www.csun.edu/scied/2-longitudinal/plant_mass/index.htm" },
    ],
    question: "Hồi nhỏ, bạn nghĩ cây lớn lên nhờ ăn gì?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu giang tay ôm thử thân cây, ngước lên hỏi",
      lines: [tc("Ông ơi, cây to như thế, là lớn lên từ đâu ra ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "up2", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán cây ăn đất, Cụ Đồ kể thí nghiệm cây liễu trồng chậu năm năm",
      lines: [
        tc("Có phải cây ăn đất, ăn càng nhiều đất thì càng to không ông?"),
        cd("Chưa đúng đâu! Ngày xưa có người trồng cây liễu trong chậu suốt năm năm, cây nặng thêm rất nhiều, mà đất trong chậu chỉ vơi đi rất ít."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.65, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: lá hút khí cacbonic; rễ hút nước và chút khoáng; nắng giúp lá làm ra đường; đường làm thành thân, lá, rễ mới",
      lines: [
        cd("Lá cây hút khí cacbonic trong không khí, qua những lỗ nhỏ li ti trên mặt lá."),
        cd("Rễ cây hút nước từ đất lên, kèm một chút chất khoáng."),
        cd("Nhờ năng lượng ánh nắng, lá ghép khí và nước lại, làm thành đường."),
        cd("Đường nối lại với nhau, làm thành thân, lá và rễ mới, thế là cây lớn dần."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w5-plant-mass", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 1, board: { id: "w5-plant-mass", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w5-plant-mass", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "w5-plant-mass", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu nhặt chiếc lá vàng, hỏi vì sao lá chuyển vàng rồi rụng",
      lines: [tc("Thế sao lá cây lại chuyển vàng, rồi rụng xuống hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 31,
    week,
    theme,
    ask: "Vì sao lá cây chuyển vàng rồi rụng?",
    myth: "Trời lạnh đã sơn lá thành màu vàng.",
    answer: "Khi ngày ngắn lại, chất diệp lục xanh trong lá bị phân huỷ, để lộ ra màu vàng cam vốn có sẵn trong lá.",
    sources: [
      { title: "SUNY College of Environmental Science and Forestry: Why Leaves Change Color", url: "https://www.esf.edu/eis/eis-leaves-color-change.php" },
      {
        title: "Ask A Biologist (Arizona State University): Why do leaves change color in the fall season?",
        url: "https://askabiologist.asu.edu/questions/why-do-leaves-change-color",
      },
    ],
    question: "Chỗ bạn ở, cây nào hay đổi màu lá?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu giơ cao một chiếc lá vàng, hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao lá cây chuyển vàng rồi rụng xuống ạ?")],
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
      shot: "Thằng Cháu đoán trời lạnh sơn lá thành vàng, Cụ Đồ bảo màu vàng đã có sẵn trong lá",
      lines: [
        tc("Có phải trời lạnh như cây bút sơn, tô lá thành màu vàng không ông?"),
        cd("Chưa đúng đâu! Màu vàng cam đã có sẵn trong lá từ mùa hè, chỉ bị màu xanh che mất thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "wave", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.5, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: lá có diệp lục xanh và chất màu vàng cam; mùa hè xanh che vàng; ngày ngắn lại thì diệp lục phân huỷ; vàng lộ ra, lá rụng",
      lines: [
        cd("Trong lá có chất diệp lục màu xanh, và cả chất màu vàng cam, giống ở củ cà rốt."),
        cd("Mùa hè, lá chứa rất nhiều diệp lục, màu xanh che kín màu vàng."),
        cd("Khi ngày ngắn lại, trời lạnh dần, lá ngừng làm thức ăn, diệp lục bị phân huỷ dần."),
        cd("Màu xanh mất đi, màu vàng cam lộ ra, rồi cây làm một lớp ngăn ở cuống, để lá rụng xuống."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w5-autumn-leaf", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w5-autumn-leaf", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w5-autumn-leaf", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w5-autumn-leaf", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp chuyện hoa hướng dương quay theo Mặt Trời",
      lines: [tc("Thế hoa hướng dương có quay theo Mặt Trời thật không hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 32,
    week,
    theme,
    ask: "Vì sao hoa hướng dương quay theo Mặt Trời?",
    myth: "Hoa hướng dương lúc nào cũng xoay theo Mặt Trời, kể cả khi đã nở to.",
    answer: "Chỉ cây hướng dương non mới xoay theo Mặt Trời, còn hoa đã nở thì đứng yên, quay về phía đông.",
    sources: [
      { title: "Cambridge University Botanic Garden: Sunflower (Helianthus annuus)", url: "https://www.botanic.cam.ac.uk/learning/trails/plant-rhythms/sunflower/" },
      {
        title: "Takács et al. 2022, Frontiers in Plant Science: Mature Sunflower Inflorescences Face Geographical East",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8969559/",
      },
    ],
    question: "Bạn đã từng thấy cánh đồng hoa hướng dương ngoài đời chưa?",
    hook: {
      shot: "Ngoài sân buổi sáng, Thằng Cháu cầm bông hướng dương, hỏi Cụ Đồ",
      lines: [tc("Ông ơi, vì sao hoa hướng dương lại quay theo Mặt Trời ạ?")],
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
      shot: "Thằng Cháu đoán hoa lúc nào cũng xoay theo Mặt Trời, Cụ Đồ bảo hoa đã nở thì đứng yên, cùng quay về phía đông",
      lines: [
        tc("Hoa hướng dương lúc nào cũng xoay theo Mặt Trời phải không ông?"),
        cd("Chưa đúng đâu! Hướng dương đã nở hoa thì đứng yên, cả cánh đồng cùng quay về phía đông."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: cây non sáng hướng đông; ban ngày nghiêng dần sang tây; ban đêm quay về đông nhờ đồng hồ bên trong; hoa nở đứng yên hướng đông, ong bay tới",
      lines: [
        cd("Cây hướng dương còn non, buổi sáng ngọn hướng về phía đông, nơi Mặt Trời mọc."),
        cd("Ban ngày, ngọn cây nghiêng dần theo Mặt Trời sang phía tây."),
        cd("Ban đêm, nhờ một chiếc đồng hồ bên trong, ngọn cây quay ngược về phía đông, chờ Mặt Trời mọc."),
        cd("Khi đã nở hoa, cây đứng yên quay về phía đông, được nắng sớm sưởi ấm nhanh, nên nhiều côn trùng bay tới."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w5-sunflower", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w5-sunflower", step: 1 }, cd: { arms: "wave" }, tc: { expr: "happy" } },
        { line: 2, board: { id: "w5-sunflower", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w5-sunflower", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { expr: "neutral" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu chỉ cây ớt chín đỏ, hỏi sao quả ớt lại cay",
      lines: [tc("Thế sao quả ớt lại cay xè lưỡi hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 33,
    week,
    theme,
    ask: "Vì sao quả ớt lại cay?",
    myth: "Ớt cay là để không con vật nào dám ăn nó.",
    answer: "Ớt cay để đuổi những con thú hay nhai nát hạt, còn chim không thấy cay, ăn ớt rồi mang hạt đi gieo chỗ mới.",
    sources: [
      {
        title: "University of Florida News: For peppers, 'hot' quite literally the spice of life, UF research shows",
        url: "https://archive.news.ufl.edu/articles/2001/07/for-peppers-hot-quite-literally-the-spice-of-life-uf-research-shows.html",
      },
      {
        title: "Harvard University, Science in the News: The Complicated Evolutionary History of Spicy Chili Peppers",
        url: "https://sites.harvard.edu/sitn/2012/11/29/issue131b",
      },
    ],
    question: "Bạn ăn cay giỏi không? Món cay nhất bạn từng ăn là món gì?",
    hook: {
      shot: "Ngoài sân, cạnh cây ớt chín đỏ, Thằng Cháu thè lưỡi quạt quạt, hỏi ông",
      lines: [tc("Ông ơi, vì sao quả ớt cay xè lưỡi thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "shrug", expr: "shock", move: "tremble" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán ớt cay để chẳng con vật nào dám ăn, Cụ Đồ bảo có những chú chim ăn ớt ngon lành",
      lines: [
        tc("Có phải ớt cay là để chẳng con vật nào dám ăn nó không ông?"),
        cd("Chưa đúng đâu! Có những chú chim vẫn ăn ớt ngon lành, chẳng thấy cay chút nào đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: quả ớt có chất gây cay; chuột thấy cay nên tránh, lỡ ăn thì nhai nát hạt; chim không thấy cay, hạt qua bụng chim vẫn nguyên; chim bay xa, hạt rơi xuống nảy mầm thành cây ớt con",
      lines: [
        cd("Trong quả ớt có một chất gây cay, ăn vào thấy nóng rát cả lưỡi."),
        cd("Chuột và các con thú nhỏ cũng thấy cay nên tránh xa, mà lỡ ăn thì nhai nát cả hạt."),
        cd("Chim thì không thấy cay, ăn ớt ngon lành, mà hạt ớt đi qua bụng chim vẫn còn nguyên."),
        cd("Chim bay đi xa rồi đi ị, hạt ớt rơi xuống chỗ mới, nảy mầm thành cây ớt con."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w5-chili", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w5-chili", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w5-chili", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w5-chili", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp cà chua là quả hay là rau",
      lines: [tc("Thế sao cà chua là quả, mà mẹ lại nấu như rau hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 34,
    week,
    theme,
    ask: "Vì sao cà chua là quả mà người ta nấu như rau?",
    myth: "Cà chua chỉ là rau.",
    answer: "Nhà khoa học gọi cà chua là quả vì nó mọc từ hoa và có hạt bên trong, còn trong bếp, người ta nấu nó như rau.",
    sources: [
      { title: "Iowa State University Extension, Yard and Garden: Is a tomato a fruit or a vegetable?", url: "https://yardandgarden.extension.iastate.edu/faq/tomato-fruit-or-vegetable" },
      {
        title: "University of Maine Cooperative Extension: Ask EFNEP – Is a Tomato a Fruit or a Vegetable?",
        url: "https://extension.umaine.edu/food-health/2024/04/15/fruit-or-vegetable/",
      },
    ],
    question: "Nhà bạn hay nấu cà chua thành món gì? Bạn đoán dưa chuột là quả hay rau?",
    hook: {
      shot: "Trong bếp, Thằng Cháu cầm quả cà chua, nghiêng đầu hỏi",
      lines: [tc("Ông ơi, vì sao cà chua là quả, mà người ta lại nấu như rau ạ?")],
      stage: [
        {
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral" },
          tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán cà chua chắc chắn là rau, Cụ Đồ bảo nhờ mẹ bổ đôi quả cà chua, bên trong đầy hạt",
      lines: [
        tc("Cà chua mẹ nấu canh, xào trứng, thì chắc chắn là rau rồi phải không ông?"),
        cd("Chưa đúng hẳn đâu! Nhờ mẹ bổ đôi quả cà chua ra, cháu sẽ thấy bên trong đầy hạt, giống quả dưa hấu."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: cây cà chua ra hoa; hoa thành quả; bổ đôi có hạt nên là quả, dưa chuột cũng vậy; trong bếp nấu như rau",
      lines: [
        cd("Cây cà chua ra những bông hoa nhỏ xinh."),
        cd("Bông hoa lớn dần, biến thành quả cà chua."),
        cd("Theo nhà khoa học, quả mọc từ hoa và có hạt bên trong, nên cà chua là quả, dưa chuột cũng vậy."),
        cd("Còn trong bếp, thứ gì hay ăn trong bữa chính thì gọi là rau, nên cà chua cũng là rau."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w5-tomato", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w5-tomato", step: 1 }, cd: { arms: "wave" }, tc: { expr: "happy" } },
        { line: 2, board: { id: "w5-tomato", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "shock" } },
        { line: 2, at: 0.75, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w5-tomato", step: 3 }, cd: { arms: "raise", expr: "happy" }, tc: { expr: "neutral" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu hỏi tiếp vì sao xương rồng có gai",
      lines: [tc("Thế còn cây xương rồng, sao nó lại có gai hả ông?"), cd("Câu đó, mai ông kể tiếp nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 35,
    week,
    theme,
    ask: "Vì sao xương rồng có gai?",
    myth: "Xương rồng không có lá, gai mọc ra chỉ để đâm người.",
    answer: "Gai xương rồng chính là lá đã biến đổi, giúp cây giữ nước trong sa mạc và không bị con vật ăn.",
    sources: [
      { title: "Duke Gardens: Five Ways Plants Adapt To Heat", url: "https://gardens.duke.edu/garden-talk/five-ways-plants-adapt-to-heat/" },
      { title: "National Park Service: Cacti / Desert Succulents – Arches National Park", url: "https://www.nps.gov/arch/learn/nature/cacti.htm" },
    ],
    question: "Nhà bạn có trồng xương rồng không? Tuần sau là chuyện nước quanh ta, bạn muốn ông giải đáp câu nào?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu đứng cách chậu xương rồng một quãng, chỉ vào và hỏi",
      lines: [tc("Ông ơi, vì sao cây xương rồng lại có gai ạ?")],
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
      shot: "Thằng Cháu đoán gai để đâm người, Cụ Đồ bảo gai chính là lá đã biến thành, dặn cháu chỉ nhìn thôi",
      lines: [
        tc("Có phải xương rồng chẳng có lá, mọc gai ra chỉ để đâm người không ông?"),
        cd("Chưa đúng đâu! Gai nhọn ấy chính là lá xương rồng đã biến thành nhỏ xíu, nhìn thì đẹp mà sờ vào là đau đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.5, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: lá to làm cây mất nước; lá xương rồng biến thành gai; gai che bóng, chắn gió khô, chống bị ăn; thân xanh làm thức ăn",
      lines: [
        cd("Lá to thì làm cây mất nhiều nước, mà sa mạc lại rất khô."),
        cd("Vì thế, lá xương rồng biến thành gai rất nhỏ, ít làm mất nước."),
        cd("Gai còn che bóng, chắn gió khô cho thân cây, và giữ cho cây khỏi bị con vật ăn."),
        cd("Còn thân màu xanh thì làm thay việc của lá, là làm thức ăn cho cây."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w5-cactus", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused" } },
        { line: 1, board: { id: "w5-cactus", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w5-cactus", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w5-cactus", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage: [
      { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
    ],
    outro: {
      shot: "Thằng Cháu khen xương rồng giữ nước giỏi, hỏi sang chuyện nước quanh mình; Cụ Đồ hẹn tuần sau hỏi tiếp",
      lines: [
        tc("Xương rồng giữ nước giỏi thật! Thế nước quanh mình còn có điều gì lạ nữa hả ông?"),
        cd("Nhiều lắm cháu ạ! Tuần sau, cháu lại hỏi ông tiếp nhé!"),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
  }),
];
