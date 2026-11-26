import type { Item, Moment, Pose } from "../../../../engine/lib/stage-types.ts";
import { cd, makeEpisode, tc } from "./make.ts";

const week = 7;
const theme = "Căn bếp nhà mình";

/** Mở tập: trong bếp, Thằng Cháu hỏi. */
const hookStage = (opts: { tc?: Pose; items?: Item[]; fx?: Moment["fx"] } = {}): Moment[] => [
  {
    cut: true,
    scene: "kitchen",
    camera: "wide",
    cd: { x: 0.26, expr: "neutral", arms: "down", hand: null },
    tc: { x: 0.66, arms: "raise", expr: "confused", move: "idle", hand: null, ...opts.tc },
    items: opts.items ?? [],
    fx: opts.fx ?? { kind: "question", on: "TC" },
  },
];

const recapStage: Moment[] = [
  { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
];

export const TUAN_7 = [
  makeEpisode({
    day: 15,
    week,
    theme,
    ask: "Vì sao thìa inox sờ vào thấy lạnh hơn thìa gỗ?",
    myth: "Thìa inox lạnh hơn thìa gỗ thật, dù cùng để một chỗ.",
    answer: "Hai cái thìa thật ra nóng lạnh như nhau, chỉ là inox kéo hơi ấm khỏi tay nhanh hơn gỗ, thế nên sờ vào mới thấy lạnh hơn.",
    sources: [
      { title: "Illinois Physics Van (University of Illinois): Cold Metal", url: "https://van.physics.illinois.edu/ask/listing/1829" },
      { title: "University of Houston, The Engines of Our Ingenuity No. 1149: Heat Transfer", url: "https://www.uh.edu/engines/epi1149.htm" },
      { title: "HyperPhysics (Georgia State University): Steel and Wood at Zero Celsius", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/woodmet.html" },
    ],
    question: "Bạn thử sờ thìa inox và thìa gỗ để cạnh nhau chưa? Nhớ chỉ thử với thìa nguội nhé!",
    hook: {
      shot: "Trong bếp, Thằng Cháu cầm thử chiếc thìa inox rồi chiếc thìa gỗ để trên bàn, rụt tay lại",
      lines: [tc("Ông ơi, cùng để trên bàn mà sao thìa inox sờ vào lạnh hơn thìa gỗ thế ạ?")],
      stage: hookStage({ tc: { arms: "hold" }, items: [{ id: "bat", prop: "bowl", x: 0.47, on: "table" }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán thìa inox lạnh hơn thật, Cụ Đồ bảo để cùng một chỗ thì hai cái thìa nóng lạnh như nhau",
      lines: [
        tc("Ơ, chắc tại thìa inox lạnh hơn thìa gỗ thật hả ông?"),
        cd("Lạnh đâu mà lạnh! Để cùng một chỗ thì hai cái thìa nóng lạnh như nhau, chỉ là tay mình thấy khác thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: thìa inox và thìa gỗ, mỗi thìa có một ngón tay chạm vào; hơi ấm từ tay chảy sang thìa; gỗ dẫn chậm, ít mũi tên; inox dẫn nhanh, nhiều mũi tên; ngón tay trên thìa inox thấy lạnh, thẻ ĐỒ NÓNG: NHỜ NGƯỜI LỚN",
      lines: [
        cd("Thìa nằm trong phòng thì chỉ ấm bằng căn phòng thôi, mà tay cháu ấm hơn, thế là vừa chạm vào, hơi ấm đã chảy sang thìa."),
        cd("Gỗ thì dẫn hơi ấm chậm lắm, cho nên thìa gỗ chỉ rút hơi ấm khỏi tay cháu từ từ thôi."),
        cd("Còn inox là kim loại, mà kim loại thì dẫn nhiệt giỏi hơn gỗ nhiều, nên kéo hơi ấm khỏi tay nhanh ơi là nhanh."),
        cd("Tay mình bị mất hơi ấm nhanh, thế mới thấy lạnh. Ngược lại, thìa mà đang nóng thì inox sờ vào lại thấy nóng hơn đấy, nhớ cẩn thận nhé!"),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-spoon", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-spoon", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-spoon", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-spoon", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
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
    day: 22,
    week,
    theme,
    ask: "Nước sôi thì bong bóng ở đâu ra?",
    myth: "Bong bóng trong nồi nước sôi là không khí.",
    answer: "Bong bóng to lúc nước sôi chính là hơi nước, do nước ngay dưới đáy nồi hoá thành khí mà ra.",
    sources: [
      {
        title: "Ohio State University, Beyond Penguins: Common Misconceptions about States and Changes of Matter",
        url: "https://beyondpenguins.ehe.osu.edu/issue/water-ice-and-snow/common-misconceptions-about-states-and-changes-of-matter-and-the-water-cycle",
      },
      { title: "University of Maryland (W. Breslyn): Boiling, Atmospheric Pressure, and Vapor Pressure", url: "https://terpconnect.umd.edu/~wbreslyn/chemistry/pressure/index-pressure.html" },
      { title: "Illinois Physics Van: What is in the Bubbles When Water Boils?", url: "https://van.physics.illinois.edu/ask/listing/29573" },
      { title: "Bigelow Laboratory for Ocean Sciences: Observing Dissolved Air in Water", url: "https://archive.bigelow.org/virtual/handson/diss_air.html" },
    ],
    question: "Bạn có để ý bong bóng nổi lên lúc nước gần sôi không? Nhớ đứng xa nồi nước sôi nhé!",
    hook: {
      shot: "Trong bếp, nồi nước sôi trên bàn bếp, Thằng Cháu đứng xa nhìn bong bóng sùng sục",
      lines: [tc("Ông ơi, nước sôi sùng sục thế kia, bong bóng ở đâu ra ạ?")],
      stage: hookStage({ items: [{ id: "noi", prop: "pan", x: 0.47, on: "table" }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán bong bóng là không khí, Cụ Đồ bảo chỉ bọt li ti lúc mới ấm là không khí",
      lines: [
        tc("Chắc bong bóng ấy là không khí lẫn trong nước hả ông?"),
        cd("Đúng được một tí thôi! Bọt li ti lúc nước mới ấm là không khí đấy. Thế nhưng nồi nước đã sôi một lần thì không khí cũng bay đi gần hết rồi, vậy mà đun lại vẫn sủi bong bóng to như thường."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down", expr: "confused" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: nồi nước trên lửa (thẻ NGƯỜI LỚN ĐUN BẾP), đáy nồi đỏ lên; túi hơi nước nhỏ ở đáy; bong bóng hơi nước nổi lên; hơi nước bay ra, nhắc đứng xa nồi",
      lines: [
        cd("Thế bong bóng to là gì ư? Đun nước thì phần nước sát đáy nồi được hơ nóng trước tiên."),
        cd("Đến lúc đủ nóng thì nước ở đáy biến thành hơi nước, tức là nước đã hoá thành khí đấy."),
        cd("Hơi nước gom lại thành bong bóng, rồi cứ thế nổi dần lên trên."),
        cd("Bong bóng lên tới mặt nước thì vỡ ra, mà hơi nước thoát ra thì nóng bỏng lắm, nhớ đứng xa nồi nhé."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-boil", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-boil", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 1, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 2, board: { id: "w7-boil", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w7-boil", step: 3 }, cd: { arms: "raise", expr: "neutral" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
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
    day: 9,
    week,
    theme,
    ask: "Vì sao thái hành lại cay mắt?",
    myth: "Mùi hăng của củ hành làm cay mắt.",
    answer: "Dao làm vỡ các tế bào của củ hành, sinh ra một chất bay lên làm cay mắt, thế nên mình mới chảy nước mắt.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Onions: Why do they make us cry?", url: "https://askdruniverse.wsu.edu/2016/08/22/onions-make-us-cry/" },
      { title: "University of Illinois Extension: Preparing Onions", url: "https://extension.illinois.edu/gardening/preparing-onions" },
    ],
    question: "Nhà bạn có mẹo gì để thái hành đỡ cay mắt? Các nhà khoa học gợi ý cho hành vào tủ lạnh một lúc trước khi thái đấy!",
    hook: {
      shot: "Trong bếp, Thằng Cháu đứng xa xem mẹ thái hành, dụi mắt rưng rưng",
      lines: [tc("Ông ơi, sao thái hành mà cay mắt thế ạ?")],
      stage: hookStage({ tc: { arms: "up2", expr: "sad" }, fx: { kind: "sweat", on: "TC" } }),
    },
    guess: {
      shot: "Thằng Cháu đoán mùi hăng làm cay mắt, Cụ Đồ bảo củ hành để nguyên chẳng làm ai chảy nước mắt",
      lines: [
        tc("Ơ, chắc tại mùi hành hăng quá nên mới cay mắt hả ông?"),
        cd("Hăng thì hăng thật, nhưng không phải tại thế đâu cháu! Củ hành để nguyên trên bàn thì có ai chảy nước mắt đâu, phải cắt ra mới cay chứ."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: củ hành và kính lúp thấy tế bào; dao (thẻ NGƯỜI LỚN CẦM DAO) làm vỡ tế bào; làn chất có lưu huỳnh bay lên mắt; mắt chảy nước mắt",
      lines: [
        cd("Bí mật nằm ở chính nhát dao đấy. Củ hành được tạo nên từ vô số tế bào nhỏ xíu, xếp sát bên nhau."),
        cd("Lúc dao thái xuống, các tế bào bị vỡ ra, thế là các chất bên trong trộn hết vào nhau."),
        cd("Chúng vừa gặp nhau là sinh ra ngay một chất mới có chứa lưu huỳnh, chất ấy bay lên rồi lọt vào tận mắt mình đấy."),
        cd("Các dây thần kinh ở mắt bị kích thích, báo ngay cho tuyến nước mắt, và nước mắt cứ thế trào ra."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-onion", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-onion", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-onion", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-onion", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
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
    day: 29,
    week,
    theme,
    ask: "Vì sao cất đồ ăn vào tủ lạnh thì lâu hỏng hơn?",
    myth: "Tủ lạnh làm chết hết vi khuẩn, nên đồ ăn trong tủ không bao giờ hỏng.",
    answer: "Tủ lạnh chỉ làm vi khuẩn sinh sôi chậm lại nên đồ ăn lâu hỏng hơn, chứ vi khuẩn không chết hết đâu, vì thế đồ trong tủ vẫn phải ăn sớm.",
    sources: [
      { title: "University of Illinois Extension: Meat Safety: Storing", url: "https://extension.illinois.edu/meat-safety/storing" },
      { title: "Virginia Cooperative Extension (Virginia Tech): Food Storage Guidelines For Consumers", url: "https://www.pubs.ext.vt.edu/348/348-960/348-960.html" },
      { title: "Penn State Extension: Refrigerator and Freezer Storage Guidelines", url: "https://extension.psu.edu/refrigerator-and-freezer-storage-guidelines" },
    ],
    question: "Tủ lạnh nhà bạn có món gì hay bị để quên lâu nhất? Nhớ ăn đồ trong tủ sớm nhé!",
    hook: {
      shot: "Trong bếp, cạnh tủ lạnh, Thằng Cháu tò mò nhìn hộp đồ ăn mẹ vừa cất vào",
      lines: [tc("Ông ơi, sao cất đồ ăn vào tủ lạnh lại lâu hỏng thế ạ?")],
      stage: hookStage({ tc: { arms: "point" }, items: [{ id: "tu", prop: "fridge", x: 0.47 }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán tủ lạnh làm chết hết vi khuẩn, Cụ Đồ bảo đồ ăn cất trong tủ lâu quá vẫn hỏng, vẫn có mùi lạ",
      lines: [
        tc("Cháu biết rồi! Tủ lạnh làm vi khuẩn chết hết, nên đồ ăn mới không hỏng chứ gì ông?"),
        cd("Chết đâu mà chết! Đồ ăn cất trong tủ lạnh lâu quá thì vẫn hỏng, vẫn bốc mùi lạ như thường đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: miếng thịt với kính lúp, vài con vi khuẩn bám trên mặt; bên chỗ ấm vi khuẩn sinh sôi đầy, thịt đổi màu, bốc mùi; bên tủ lạnh vi khuẩn ngủ gật, lớn rất chậm; vi khuẩn vẫn còn, thẻ ĂN SỚM NHÉ",
      lines: [
        cd("Cháu xem này, đồ tươi như thịt, như cá, thường có sẵn vi khuẩn bám ở bề mặt rồi đấy."),
        cd("Nếu để ở chỗ ấm thì vi khuẩn sinh sôi nhanh lắm, đồ ăn nhớt ra, đổi màu, có mùi lạ, thế là hỏng."),
        cd("Còn khi cất vào tủ lạnh, gặp lạnh thì hầu hết vi khuẩn sinh sôi chậm rì, đồ ăn nhờ thế mà giữ được lâu hơn."),
        cd("Thế nhưng cái lạnh không giết hết vi khuẩn đâu, để lâu thì đồ ăn vẫn hỏng, nhớ ăn sớm đồ cất trong tủ nhé."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-fridge", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-fridge", step: 1 }, cd: { arms: "wave" }, tc: { expr: "shock" } },
        { line: 2, board: { id: "w7-fridge", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "happy" } },
        { line: 3, board: { id: "w7-fridge", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("À, thế là cháu hiểu rồi! Mai ông kể thêm một chuyện vì sao nữa nhé?"), cd("Ừ, mai ông kể tiếp, nhớ ra mà nghe đấy!")],
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
    ask: "Vì sao nước ngọt có ga sủi bọt khi mở nắp?",
    myth: "Bọt là do không khí bên ngoài lọt vào chai.",
    answer: "Khí cacbonic bị ép cho tan vào trong nước, mở nắp ra thì áp suất giảm, khí liền thoát ra thành bọt.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Soda: Why does it fizz?", url: "https://askdruniverse.wsu.edu/2016/05/09/soda-why-does-it-fizz/" },
      { title: "Illinois Physics Van: Soda Explosions!", url: "https://van.physics.illinois.edu/ask/listing/623" },
      { title: "Illinois Physics Van: Soda Equilibria", url: "https://van.physics.illinois.edu/ask/listing/16078" },
    ],
    question: "Bạn đã bao giờ bị nước ngọt bắn tung toé vì lỡ lắc chai chưa?",
    hook: {
      shot: "Trong bếp, Thằng Cháu nhìn cốc nước ngọt có ga sủi bọt lăn tăn",
      lines: [tc("Ông ơi, sao vừa mở nắp chai nước ngọt có ga là bọt sủi lên thế ạ?")],
      stage: hookStage(),
    },
    guess: {
      shot: "Thằng Cháu đoán không khí lọt vào chai, Cụ Đồ bảo bọt sủi từ trong lòng nước, trong bọt là khí cacbonic",
      lines: [
        tc("Thì mở nắp ra, không khí lọt vào chai nên mới có bọt chứ gì ông?"),
        cd("Không khí đâu mà không khí! Bọt sủi lên từ trong lòng nước cơ, trong bọt là khí cacbonic, cũng là cái khí có trong hơi mình thở ra đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "neutral" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: bình khí nhà máy bơm khí cacbonic vào chai; nắp đậy kín, đồng hồ áp suất vọt lên; nắp mở, kim tụt xuống; bong bóng nổi lên, chữ XÈO XÈO",
      lines: [
        cd("Ở nhà máy, người ta bơm khí cacbonic vào nước, cho khí tan lẫn vào trong."),
        cd("Rồi đóng nắp thật kín, bao nhiêu khí bị ép chặt trong đó, nên áp suất trong chai cao lắm."),
        cd("Vậy mà vừa mở nắp ra, áp suất tụt xuống, nước không giữ nổi nhiều khí như trước nữa."),
        cd("Thế khí thừa đi đâu? Nó thoát ra thành vô số bong bóng, nổi lên rồi vỡ, kêu xèo xèo đấy."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-soda", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-soda", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-soda", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.5, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-soda", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("À, thế là cháu hiểu rồi! Mai ông kể thêm một chuyện vì sao nữa nhé?"), cd("Ừ, mai ông kể tiếp, nhớ ra mà nghe đấy!")],
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
    ask: "Vì sao táo cắt ra để lâu bị thâm?",
    myth: "Táo bị thâm là táo đã hỏng, bẩn, không ăn được nữa.",
    answer: "Khi cắt táo ra, enzim trong táo gặp ôxy ngoài không khí rồi sinh ra chất màu nâu, chứ táo vẫn ăn được bình thường.",
    sources: [
      { title: "UW–Madison News: Curiosities: Why do apple slices turn brown?", url: "https://news.wisc.edu/curiosities-why-do-apple-slices-turn-brown/" },
      {
        title: "Tufts Health & Nutrition Letter: Why do sliced fruits turn brown?",
        url: "https://www.nutritionletter.tufts.edu/ask-experts/q-why-do-sliced-fruits-turn-brown-when-sitting-for-a-period-of-time-at-room-temperature-is-it-safe-to-eat-brown-fruit/",
      },
    ],
    question: "Nhà bạn có mẹo gì giữ táo cắt sẵn không bị thâm?",
    hook: {
      shot: "Trong bếp, Thằng Cháu nhìn đĩa táo cắt để từ sáng, mặt táo đã ngả nâu",
      lines: [tc("Ông ơi, táo cắt ra để lâu sao lại thâm sì thế ạ?")],
      stage: hookStage(),
    },
    guess: {
      shot: "Thằng Cháu sợ táo thâm là hỏng, Cụ Đồ bảo táo thâm vẫn ăn được, chỉ mặt cắt mới thâm",
      lines: [
        tc("Thâm thế này là hỏng rồi, không ăn được nữa hả ông?"),
        cd("Hỏng đâu mà hỏng! Táo thâm vẫn ăn được, mà cháu xem, chỉ có mặt cắt phơi ra không khí mới thâm thôi."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "shrug", expr: "sad", move: "idle" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { arms: "down", expr: "confused" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: nửa quả táo, dao cắt (thẻ NGƯỜI LỚN CẦM DAO); chấm xanh enzim tràn ra; bong bóng ôxy bay tới; mặt cắt ngả nâu, giống sắt gỉ, vẫn ăn được",
      lines: [
        cd("Lúc cắt táo, dao làm vỡ các tế bào ở mặt cắt."),
        cd("Thế là một chất tên là enzim, vốn nằm yên trong tế bào, tràn hết cả ra ngoài."),
        cd("Enzim gặp ôxy trong không khí thì hai đứa hợp sức, biến đổi các chất có sẵn trong táo."),
        cd("Thế màu nâu ở đâu ra? Chính là chất mới sinh ra đấy, nó làm mặt cắt thâm dần, giống sắt để lâu bị gỉ ấy."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-apple", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-apple", step: 1 }, cd: { arms: "wave" }, tc: { expr: "neutral" } },
        { line: 2, board: { id: "w7-apple", step: 2 }, cd: { arms: "point", expr: "neutral" } },
        { line: 2, at: 0.6, tc: { expr: "shock" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, board: { id: "w7-apple", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.6, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
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
    day: 45,
    week,
    theme,
    ask: "Vì sao bột bánh mì lại phồng lên?",
    myth: "Bột phồng lên vì lúc nhào, mình nhồi không khí vào.",
    answer: "Men nở ăn đường trong bột rồi thải ra khí, khí bị giữ lại thành vô số bong bóng nhỏ làm bột phồng lên.",
    sources: [
      { title: "Ask Dr. Universe (Washington State University): Why does bread expand in the oven?", url: "https://askdruniverse.wsu.edu/2026/04/30/bread-expand-oven/" },
      {
        title: "Colorado State University SOURCE: What every new baker should know about the yeast around us",
        url: "https://source.colostate.edu/what-every-new-baker-should-know-about-the-yeast-all-around-us/",
      },
    ],
    question: "Bạn đã bao giờ tự nhào bột làm bánh chưa?",
    hook: {
      shot: "Trong bếp, cạnh âu bột đã phồng to, Thằng Cháu tròn mắt ngạc nhiên",
      lines: [tc("Ông ơi ông, âu bột này sao lại phồng to thế ạ?")],
      stage: hookStage({ items: [{ id: "bot", prop: "bowl", x: 0.47, on: "table" }] }),
    },
    guess: {
      shot: "Thằng Cháu đoán nhào bột là nhồi không khí vào, Cụ Đồ bảo men pha nước đường chưa cần nhào đã sủi bọt",
      lines: [
        tc("Chắc là lúc nhào, mình nhồi không khí vào nên bột mới phồng lên hả ông?"),
        cd("Nhồi gì mà nhồi! Cháu cứ thử pha men với nước ấm và đường xem, chưa nhào gì mà nó đã sủi bọt lăn tăn rồi đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "hold2", expr: "smug", move: "bounce" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle", arms: "down" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: kính lúp thấy men nở tí hon; men ăn hạt đường, thải bong bóng khí; cục bột với lưới sợi đạm; lưới giữ bong bóng, bột phồng to",
      lines: [
        cd("Men nở ấy à, là một loài nấm tí hon, mỗi con men chỉ có một tế bào thôi, nhỏ đến mức mắt thường không nhìn thấy được."),
        cd("Men ăn đường trong bột rồi ợ ra khí cacbonic, mà ợ liên tục luôn ấy chứ!"),
        cd("Thế nhào bột để làm gì ư? Lúc nhào, các sợi đạm trong bột kết lại thành một tấm lưới vừa dai vừa co giãn, như mạng nhện ấy."),
        cd("Lưới ấy giữ khí lại thành vô số bong bóng nhỏ, thế là bột cứ phồng dần lên, như quả bóng bay đang được thổi."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w7-bread", step: 0 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "confused", arms: "down" } },
        { line: 1, board: { id: "w7-bread", step: 1 }, cd: { arms: "wave" }, tc: { expr: "happy" } },
        { line: 2, board: { id: "w7-bread", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 3, board: { id: "w7-bread", step: 3 }, cd: { arms: "raise", expr: "happy" } },
        { line: 3, at: 0.5, tc: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay thật đấy ông ạ! Thế còn chuyện khác thì sao hả ông?"), cd("Từ từ đã nào, cái thằng này! Lần sau ông kể tiếp cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),
];
