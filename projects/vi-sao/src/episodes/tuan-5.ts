import { cd, makeEpisode, tc } from "./make.ts";

const week = 5;
const theme = "Cây cối và trái cây";

export const TUAN_5 = [
    makeEpisode({
    day: 13,
    week,
    theme,
    ask: "Vì sao quả ớt lại cay?",
    myth: "Ớt cay là để không con vật nào dám ăn nó.",
    answer: "Ớt cay là để đuổi những con thú hay nhai nát hạt, còn chim thì chẳng thấy cay, cứ ăn ớt rồi mang hạt đi gieo ở chỗ mới.",
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
      lines: [tc("Ông ơi, vì sao quả ớt lại cay xé lưỡi thế ạ?")],
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
        tc("Ớt cay thế, chắc là để chẳng con vật nào dám ăn nó chứ gì ông?"),
        cd("Ấy thế mà có mấy chú chim vẫn mổ ớt lia lịa, chẳng thấy cay tí nào đấy."),
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
        cd("Cháu xem, trong quả ớt có một chất gây cay, cắn vào là lưỡi nóng rát lên ngay."),
        cd("Chuột với mấy con thú nhỏ cũng thấy cay, thế nên chúng tránh xa ớt ra. Mà lỡ có ăn phải thì chúng lại nhai nát cả hạt."),
        cd("Chim thì khác hẳn! Chúng chẳng thấy cay gì sất, mà hạt ớt đi qua bụng chim lại vẫn còn nguyên xi đấy."),
        cd("Chim bay đi thật xa rồi mới thải hạt ra theo phân, thế là hạt rơi xuống chỗ mới, nảy mầm thành cây ớt con."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay quá ông ạ! Mai ông lại kể cho cháu nghe chuyện khác nữa nhé?"), cd("Được chứ! Cháu cứ hỏi, rồi ông kể dần cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

    makeEpisode({
    day: 37,
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
        tc("Chắc tại hoa mê nắng nên lúc nào cũng xoay theo Mặt Trời hả ông?"),
        cd("Đâu phải lúc nào cũng thế! Hướng dương nở hoa rồi là đứng im, cả cánh đồng cùng quay mặt về một phía đấy."),
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
        cd("Chuyện là thế này, lúc hướng dương còn non, sáng ra ngọn cây đã hướng về phía đông, là chỗ Mặt Trời mọc."),
        cd("Rồi suốt cả ngày, ngọn cây cứ nghiêng dần theo Mặt Trời sang phía tây đấy."),
        cd("Thế ban đêm thì sao? Nhờ cái đồng hồ sinh học có sẵn trong cây, ngọn cây lại quay ngược về phía đông, chờ sẵn Mặt Trời mọc lên."),
        cd("Đến khi nở hoa thì cây thôi không xoay nữa, cứ đứng yên quay về phía đông. Thế là sáng ra hoa được nắng sưởi ấm sớm hơn, ong bướm kéo đến nhiều lắm."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay quá ông ạ! Mai ông lại kể cho cháu nghe chuyện khác nữa nhé?"), cd("Được chứ! Cháu cứ hỏi, rồi ông kể dần cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 27,
    week,
    theme,
    ask: "Vì sao cây bắt ruồi lại ăn côn trùng?",
    myth: "Cây bắt ruồi không cần nắng, chỉ ăn côn trùng thay cơm để sống.",
    answer: "Cây bắt ruồi vẫn sống nhờ nắng như mọi cây khác, còn bắt côn trùng là để có thêm chất bổ mà đất đầm lầy thiếu.",
    sources: [
      { title: "San Diego Zoo Wildlife Explorers: Venus Flytrap", url: "https://kids.sandiegozoo.org/animals/venus-flytrap" },
      { title: "NC State Extension Gardener Plant Toolbox: Dionaea muscipula", url: "https://plants.ces.ncsu.edu/plants/dionaea-muscipula/" },
    ],
    question: "Bạn đoán một chiếc bẫy lá của cây bắt ruồi bắt được mấy con côn trùng?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu ngồi xổm cạnh chậu cây bắt ruồi đang há bẫy lá, mặt thắc mắc",
      lines: [tc("Ông ơi, sao cây bắt ruồi lại đi ăn côn trùng thế ạ?")],
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
        tc("Cháu đoán nhé, cây bắt ruồi chẳng cần nắng, cứ ăn côn trùng thay cơm, đúng không ông?"),
        cd("Làm gì có chuyện ấy! Lá nó vẫn xanh như mọi cây khác, vẫn lấy năng lượng từ nắng đấy."),
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
        cd("Thế này nhé, cây bắt ruồi mọc ở vùng đầm lầy, đất ở đấy vừa ướt vừa chua, lại nghèo chất bổ lắm."),
        cd("Mỗi cái bẫy là một chiếc lá gập đôi như có bản lề, mặt trong có mấy sợi lông nhỏ xíu."),
        cd("Con côn trùng nào bò vào mà chạm phải mấy sợi lông ấy, thì phập một cái! Lá sập lại trong chưa đầy một giây."),
        cd("Rồi nước tiêu hoá của cây làm tan dần con côn trùng, cây cứ thế hút lấy chất bổ mà đất thiếu."),
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
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay quá ông ạ! Mai ông lại kể cho cháu nghe chuyện khác nữa nhé?"), cd("Được chứ! Cháu cứ hỏi, rồi ông kể dần cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 43,
    week,
    theme,
    ask: "Vì sao xương rồng có gai?",
    myth: "Xương rồng không có lá, gai mọc ra chỉ để đâm người.",
    answer: "Gai xương rồng chính là lá đã biến đổi, giúp cây giữ được nước giữa sa mạc, lại khỏi bị thú vật gặm mất.",
    sources: [
      { title: "Duke Gardens: Five Ways Plants Adapt To Heat", url: "https://gardens.duke.edu/garden-talk/five-ways-plants-adapt-to-heat/" },
      { title: "National Park Service: Cacti / Desert Succulents – Arches National Park", url: "https://www.nps.gov/arch/learn/nature/cacti.htm" },
    ],
    question: "Nhà bạn có trồng xương rồng không?",
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
        tc("Chắc là xương rồng chẳng có lá, nên nó mới mọc gai ra để đâm người hả ông?"),
        cd("Đâm người gì mà đâm người! Gai nhọn ấy chính là lá của xương rồng biến thành đấy. Nhưng nhìn thôi nhé, sờ vào là đau điếng!"),
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
        cd("Cháu xem, áo phơi căng rộng ra thì mau khô, lá to cũng thế đấy, cây sẽ bị mất nước nhiều lắm, mà sa mạc thì lại khô khốc."),
        cd("Thế nên lá xương rồng mới biến thành gai bé tí, cho cây đỡ bị mất nước."),
        cd("Gai lại còn che bớt nắng, chắn gió khô cho thân cây, mà con vật nào định gặm thì cũng phải tránh xa ra."),
        cd("Còn việc làm thức ăn cho cây ấy à? Cái thân xanh kia làm thay cho lá hết rồi đấy."),
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
export const KHONG_DUNG_5 = [
  makeEpisode({
    day: 4,
    week,
    theme,
    ask: "Cây to như thế là lớn lên từ đâu ra?",
    myth: "Cây ăn đất để lớn.",
    answer: "Không kể phần nước ra thì phần lớn cái cây được làm từ khí cacbonic lấy từ không khí, nhờ có năng lượng của ánh nắng.",
    sources: [
      { title: "Ask A Biologist (Arizona State University): The Recipe for Plant Growth", url: "https://askabiologist.asu.edu/recipe-plant-growth" },
      { title: "California State University, Northridge: Plant Mass", url: "http://www.csun.edu/scied/2-longitudinal/plant_mass/index.htm" },
    ],
    question: "Hồi nhỏ, bạn nghĩ cây lớn lên nhờ ăn gì?",
    hook: {
      shot: "Ngoài sân, Thằng Cháu giang tay ôm thử thân cây, ngước lên hỏi",
      lines: [tc("Ông ơi, cây to thế kia thì lớn lên từ đâu ra ạ?")],
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
        tc("Cây ăn đất chứ gì ông! Ăn càng nhiều đất thì càng to, đúng không?"),
        cd("Ăn đất đâu mà ăn! Ngày xưa có người trồng cây liễu trong chậu suốt năm năm, chỉ tưới nước thôi. Cây nặng thêm bao nhiêu là cân, vậy mà đất trong chậu chỉ vơi đi có tí xíu."),
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
        cd("Thế phần nặng thêm ấy ở đâu ra? Từ không khí đấy cháu ạ! Lá cây hút khí cacbonic qua những lỗ li ti trên mặt lá."),
        cd("Còn rễ thì hút nước dưới đất lên, kèm theo một ít chất khoáng nữa."),
        cd("Rồi nhờ năng lượng của ánh nắng, lá ghép khí cacbonic với nước lại với nhau, làm ra đường đấy."),
        cd("Đường ấy lại nối với nhau, làm thành thân, lá với rễ mới. Cây cứ thế mà lớn dần lên."),
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
      shot: "Thằng Cháu hỏi tiếp vì sao thìa inox sờ vào lạnh hơn thìa gỗ, Cụ Đồ hẹn lần sau",
      lines: [tc("Ơ, thế sao thìa inox sờ vào lại lạnh hơn thìa gỗ hả ông?"), cd("Cái thìa ấy à? Để lần sau ông kể nhé!")],
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
    ask: "Vì sao cà chua là quả mà người ta nấu như rau?",
    myth: "Cà chua chỉ là rau.",
    answer: "Nhà khoa học gọi cà chua là quả vì nó mọc từ hoa và có hạt bên trong, còn vào bếp thì người ta lại nấu nó như rau.",
    sources: [
      { title: "Iowa State University Extension, Yard and Garden: Is a tomato a fruit or a vegetable?", url: "https://yardandgarden.extension.iastate.edu/faq/tomato-fruit-or-vegetable" },
      {
        title: "University of Maine Cooperative Extension: Ask EFNEP – Is a Tomato a Fruit or a Vegetable?",
        url: "https://extension.umaine.edu/food-health/2024/04/15/fruit-or-vegetable/",
      },
    ],
    question: "Nhà bạn hay nấu cà chua thành món gì? Thế còn quả ớt, bạn đoán là quả hay rau?",
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
        tc("Cà chua mẹ toàn đem nấu canh với xào trứng, thế thì là rau chứ còn gì nữa hả ông?"),
        cd("Mới đúng có một nửa thôi! Cháu cứ nhờ mẹ bổ đôi quả cà chua ra mà xem, bên trong đầy hạt, y như quả dưa hấu."),
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
        cd("Thế hạt ấy ở đâu ra? Cháu để ý nhé, cây cà chua nở ra những bông hoa vàng nhỏ xinh."),
        cd("Hoa ấy tàn đi, cái bầu nhụy nhỏ xíu ở giữa hoa thì phình to dần, rồi thành quả cà chua đấy."),
        cd("Với nhà khoa học thì thứ gì mọc ra từ hoa, lại có hạt ở bên trong, đều gọi là quả cả. Thế nên cà chua là quả, mà dưa chuột cũng là quả đấy!"),
        cd("Còn vào đến bếp thì khác, thứ gì không ngọt, hay được nấu để ăn với cơm, người ta cứ gọi là rau, thế là cà chua thành rau chứ sao!"),
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
      shot: "Thằng Cháu hỏi tiếp vì sao nước sông ngọt mà biển lại mặn",
      lines: [tc("Ơ, thế nước sông ngọt chảy ra biển, sao biển lại mặn chát hả ông?"), cd("Chuyện này dài đấy, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),

  makeEpisode({
    day: 45,
    week,
    theme,
    ask: "Vì sao lá cây chuyển vàng rồi rụng?",
    myth: "Trời lạnh đã sơn lá thành màu vàng.",
    answer: "Khi ngày ngắn đi, diệp lục xanh trong lá bị phân huỷ, để lộ ra màu vàng cam có sẵn, rồi lá mới rụng xuống.",
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
        tc("Cháu biết! Trời lạnh về là như có cây cọ sơn, tô cho lá vàng hết lượt, đúng không ông?"),
        cd("Sơn đâu mà sơn! Màu vàng cam nằm sẵn trong lá từ mùa hè rồi đấy, chẳng qua bị màu xanh che mất thôi."),
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
        cd("Trong lá có chất diệp lục màu xanh, lại có cả chất màu vàng cam, giống chất màu trong củ cà rốt ấy."),
        cd("Vào mùa hè thì lá đầy ắp diệp lục, nên màu xanh trùm kín cả màu vàng đi."),
        cd("Đến khi ngày ngắn lại, trời se lạnh, lá thôi không làm thức ăn nữa, thế là diệp lục cứ phân huỷ dần."),
        cd("Màu xanh mất đi thì màu vàng cam mới lộ ra. Rồi cây tạo một lớp ngăn ngay ở cuống lá, thế là lá lìa cành rụng xuống."),
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
      shot: "Thằng Cháu hỏi tiếp vì sao con nhện nước đi được trên mặt nước",
      lines: [tc("Ơ, thế sao con nhện nước lại đi được trên mặt nước hả ông?"), cd("Chuyện ấy hay lắm đấy, để lần sau ông kể nhé!")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),
];
