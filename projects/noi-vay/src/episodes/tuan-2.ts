import { cd, makeEpisode, tc } from "./make.ts";

const week = 2;
const theme = "Con vật";

export const TUAN_2 = [
  makeEpisode({
    day: 15,
    week,
    theme,
    idiom: "Nuôi ong tay áo",
    meaning: "Cả tin cưu mang, che chở kẻ xấu ngay bên mình, để rồi chính họ quay lại làm hại mình.",
    question: "Bạn từng chỉ hết nghề cho ai, rồi bị chính người đó giành mất việc chưa?",
    hook: {
      shot: "TC mặc áo khoác rộng, cầm ống hút đút nước đường vào trong ống tay áo",
      lines: [tc("Bé Ong ơi, uống miếng nước đường cho ngọt giọng nào!")],
    },
    ask: "Mày giấu con gì trong ống tay áo đấy?",
    misread: {
      shot: "TC vỗ về ống tay áo, lôi ra con ong nhồi bông, rồi bất ngờ ôm tay nhảy dựng lên",
      lines: [
        tc("Thú cưng của cháu đấy! Nuôi trong tay áo vừa ấm vừa tiện, đi đâu cũng có bạn!"),
        tc("Ui da! Cho ăn no mật rồi mà nó còn đốt cháu sưng vù cả tay thế này!"),
        cd("Khổ thân! Ai đời lại đi rước con ong vào ống tay áo mình bao giờ!"),
      ],
    },
    explain:
      "Ong mà ủ trong tay áo, cho ăn no mật rồi cũng có ngày nó quay ra đốt chính mình. Câu đầy đủ của nó là nuôi ong tay áo, nuôi cáo trong nhà đấy. Câu này là để chê những người cả tin, đem lòng cưu mang, che chở kẻ xấu ngay bên cạnh, để rồi chính kẻ ấy quay lại phản mình, hại mình. Nói gọn lại, thương người thì cũng phải nhìn cho kỹ đấy!",
    example: {
      shot: "HỒI ỨC (TV đen trắng): thành Cổ Loa, An Dương Vương cầm nỏ thần, gả Mị Châu cho Trọng Thủy, vẫy chàng rể vào ở trong thành; Trọng Thủy dỗ Mị Châu, lẻn tới giá nỏ tráo lẫy; quân Triệu Đà kéo tới, nỏ xịt, nhà vua thất thế, Trọng Thủy giơ lẫy nỏ cười",
      memory: { label: "TRUYỀN THUYẾT: NỎ THẦN" },
      lines: [
        cd("Cứ như chuyện An Dương Vương trong truyền thuyết Mị Châu, Trọng Thủy ấy. Nhà vua đem gả con gái cho Trọng Thủy, con trai Triệu Đà, rồi cho chàng rể ở ngay trong thành Cổ Loa."),
        cd("Trọng Thủy dỗ vợ cho xem nỏ thần, rồi lén đánh tráo mất cái lẫy nỏ. Đến khi Triệu Đà kéo quân sang đánh thì nỏ đã hết thiêng, nhà vua bị mất nước, chỉ vì chàng rể mà mình nuôi ngay trong nhà!"),
      ],
      // Cụ Đồ đóng An Dương Vương, Thằng Cháu đóng Trọng Thủy; Mị Châu là hình đứng (adv-mi-chau).
      stage: [
        // "Như An Dương Vương trong truyện Mị Châu, Trọng Thủy ấy": nhà vua cầm nỏ thần, Mị Châu bên cạnh
        {
          line: 0,
          cut: true,
          scene: "adv-citadel",
          camera: "wide",
          cd: { role: "an-duong-vuong", x: 0.22, hand: "adv-crossbow", back: null, head: null, face: null, arms: "hold", expr: "happy", move: "idle" },
          tc: { role: "trong-thuy", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [{ id: "mc", prop: "adv-mi-chau", x: 0.45 }],
        },
        // "gả con gái cho Trọng Thủy": chàng rể đi vào, Mị Châu bước sang
        { line: 0, at: 0.39, cd: { hand: null, arms: "point" }, tc: { x: 0.78, arms: "wave", expr: "happy" }, items: [{ id: "mc", prop: "adv-mi-chau", x: 0.56 }], fx: { kind: "hearts", on: "TC" } },
        // "con trai Triệu Đà"
        { line: 0, at: 0.6, camera: "TC", tc: { arms: "hips", expr: "smug" }, fx: { kind: "exclaim", on: "TC", text: "HÌ HÌ" } },
        // "rồi cho chàng rể ở ngay trong thành Cổ Loa": vua vẫy mời vào thành
        { line: 0, at: 0.72, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy" } },

        // "Trọng Thủy dỗ vợ cho xem nỏ thần": nỏ thần trên giá, Trọng Thủy dỗ Mị Châu
        {
          line: 1,
          cut: true,
          camera: "wide",
          cd: { x: -0.4, hand: null, arms: "down", expr: "neutral" },
          tc: { x: 0.74, hand: null, arms: "point", expr: "happy" },
          items: [
            { id: "gia", prop: "adv-crossbow-rack", x: 0.18 },
            { id: "mc", prop: "adv-mi-chau", x: 0.48 },
          ],
          fx: { kind: "hearts", on: "TC" },
        },
        // "lén tráo mất lẫy": lẻn tới giá nỏ, cầm lẫy móng rùa
        { line: 1, at: 0.21, camera: "TC", tc: { x: 0.36, arms: "hold", hand: "adv-trigger", expr: "smug" }, fx: { kind: "exclaim", on: "TC", text: "TRÁO!" } },
        // "Triệu Đà kéo quân sang đánh": quân Triệu kéo tới, nhà vua giương nỏ
        {
          line: 1,
          at: 0.38,
          cut: true,
          camera: "wide",
          cd: { x: 0.26, hand: "adv-crossbow", arms: "point", expr: "angry" },
          tc: { x: 1.4, hand: null, arms: "down" },
          items: [{ id: "quan", prop: "adv-army", x: 0.86 }],
          fx: { kind: "exclaim", on: "CD" },
        },
        // "nỏ hết thiêng"
        { line: 1, at: 0.58, cd: { expr: "shock" }, fx: [{ kind: "bop", on: "CD", text: "XỊT!" }, { kind: "sweat", on: "CD" }] },
        // "nhà vua mất nước": quân tràn vào, vua buông nỏ
        { line: 1, at: 0.69, cd: { hand: null, arms: "down", expr: "sad", move: "tremble" }, items: [{ id: "quan", prop: "adv-army", x: 0.66 }] },
        // "chỉ vì chàng rể mình nuôi trong nhà": Trọng Thủy giơ lẫy nỏ đắc ý
        { line: 1, at: 0.79, cut: true, tc: { x: 0.84, hand: "adv-trigger", arms: "raise", expr: "smug" } },
        { line: 1, at: 0.84, camera: "TC", fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC bỏ con ong xuống, cầm con cua đồ chơi nhét vào túi quần, mặt tỉnh bơ",
      lines: [
        tc("Ông nói chuẩn! Nuôi ong thì bị đốt đau thật!"),
        tc("Thế từ mai cháu chuyển sang nuôi cua trong túi quần, cho an toàn ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 16,
    week,
    theme,
    idiom: "Thả con săn sắt bắt con cá rô",
    meaning: "Bỏ ra cái lợi nhỏ để thu về cái lợi lớn hơn; có khi dùng để chê sự tính toán vụ lợi.",
    question: "Bạn từng chịu thiệt một chút lúc đầu để sau này được nhiều hơn chưa?",
    hook: {
      shot: "Bờ ao, TC buộc nguyên thanh sắt to vào cần câu, quăng tõm xuống nước",
      lines: [tc("Ông tránh ra nào! Cháu lấy thanh sắt này làm mồi câu cá rô đấy!")],
    },
    ask: "Câu cá thì ai lại móc thanh sắt làm mồi bao giờ?",
    misread: {
      shot: "TC đeo kính bảo hộ, cầm cục nam châm to đi quanh bếp; nồi, chìa khóa, kính của CĐ bay dính vào",
      lines: [
        tc("Thì phải đi săn sắt trước chứ ông! Cháu lùng sạch sắt vụn trong nhà rồi đây."),
        tc("Nào là cái nồi, chùm chìa khóa, cả cặp kính của ông nữa, cháu thả tuốt xuống ao hết rồi!"),
        cd("Cá rô thì chưa thấy đâu, mà nhà mình đã thành bãi đồng nát rồi này!"),
      ],
    },
    explain:
      "Săn sắt ở đây là tên một con cá đồng bé tí, còn bé hơn cả cá rô cơ. Người ta thả con cá bé làm mồi để bắt được con cá to hơn. Nói gọn lại là mình chịu bỏ ra cái lợi nhỏ để kiếm về cái lợi lớn hơn. Nhưng câu này cũng hay được dùng để chê mấy kẻ khôn lỏi, cho người ta một tí mà đòi lại thật nhiều đấy.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): sông Bạch Đằng, Ngô Quyền cho cắm bãi cọc đầu bịt sắt; triều lên che kín cọc, thuyền nhẹ ra khiêu chiến rồi giả thua chạy; thuyền chiến Nam Hán đuổi theo; triều rút, thuyền giặc mắc cọc vỡ toác, Ngô Quyền mừng thắng lớn",
      memory: { label: "LỊCH SỬ: BẠCH ĐẰNG 938" },
      lines: [
        cd("Cứ như chuyện Ngô Quyền đánh quân Nam Hán trên sông Bạch Đằng năm 938 ấy. Ngài cho người cắm cọc gỗ đầu bịt sắt xuống lòng sông, đợi triều lên thì sai thuyền nhẹ ra khiêu chiến, rồi vờ thua bỏ chạy."),
        cd("Thuyền chiến Nam Hán hăm hở đuổi theo, lọt thỏm vào giữa bãi cọc. Triều rút một cái, thế là thuyền giặc mắc cọc, vỡ tan tành! Chịu lép một keo nhỏ lúc đầu, mà đổi lấy được cả một trận thắng lớn đấy!"),
      ],
      // Cụ Đồ đóng Ngô Quyền, Thằng Cháu đóng tướng Nam Hán Lưu Hoằng Tháo.
      // Thứ tự items khi có nước: bãi cọc, nước triều (bd-tide), rồi thuyền (cùng x với người đứng trong thuyền).
      stage: [
        // "Như Ngô Quyền trên sông Bạch Đằng năm 938 ấy": đứng bên bờ sông lúc triều rút
        {
          line: 0,
          cut: true,
          scene: "bd-river",
          camera: "wide",
          cd: { role: "ngo-quyen", x: 0.24, hand: null, back: null, head: null, face: null, arms: "hips", expr: "neutral", move: "idle" },
          tc: { role: "luu-hoang-thao", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [],
        },
        // "cho cắm cọc gỗ đầu bịt sắt dưới lòng sông": cầm cọc nện xuống, bãi cọc mọc lên
        { line: 0, at: 0.43, cd: { hand: "bd-stake", arms: "hit", expr: "angry" }, items: [{ id: "c1", prop: "bd-stakes", x: 0.6 }], fx: { kind: "bop", on: "CD", text: "CẮM!" } },
        { line: 0, at: 0.55, items: [{ id: "c1", prop: "bd-stakes", x: 0.6 }, { id: "c2", prop: "bd-stakes", x: 0.86 }], fx: { kind: "sparkle", on: "CD" } },
        // "triều lên": nước dâng che kín bãi cọc
        {
          line: 0,
          at: 0.67,
          cd: { hand: null, arms: "point", expr: "smug" },
          items: [
            { id: "nuoc", prop: "bd-tide", x: 0.5, front: true },
          ],
        },
        // "thì sai thuyền nhẹ ra đánh": Ngô Quyền trên thuyền nhẹ, thuyền chiến Nam Hán đậu bên phải
        {
          line: 0,
          at: 0.73,
          cut: true,
          cd: { x: 0.4, arms: "raise", expr: "angry", move: "idle" },
          tc: { x: 0.8, arms: "hips", expr: "angry", move: "idle" },
          items: [
            { id: "buom", prop: "bd-sail", x: 0.8 },
            { id: "nuoc", prop: "bd-tide", x: 0.5, front: true },
            { id: "ta", prop: "bd-boat", x: 0.4, front: true },
            { id: "han", prop: "bd-warship", x: 0.8, front: true },
          ],
        },
        { line: 0, at: 0.79, fx: { kind: "bop", on: "CD", text: "ĐÁNH!" } },
        // "rồi giả thua bỏ chạy": thuyền nhẹ lùi về trái, mặt giả vờ hoảng
        {
          line: 0,
          at: 0.9,
          cd: { x: 0.2, arms: "up2", expr: "shock" },
          tc: { arms: "point", expr: "smug" },
          items: [
            { id: "buom", prop: "bd-sail", x: 0.8 },
            { id: "nuoc", prop: "bd-tide", x: 0.5, front: true },
            { id: "ta", prop: "bd-boat", x: 0.2, front: true },
            { id: "han", prop: "bd-warship", x: 0.8, front: true },
          ],
          fx: { kind: "sweat", on: "CD" },
        },
        { line: 0, at: 0.97, camera: "CD", cd: { expr: "smug" }, fx: { kind: "exclaim", on: "CD", text: "HÌ!" } },

        // "Thuyền chiến Nam Hán hăm hở đuổi theo vào bãi cọc"
        {
          line: 1,
          camera: "wide",
          tc: { x: 0.62, arms: "point", expr: "happy" },
          items: [
            { id: "buom", prop: "bd-sail", x: 0.62 },
            { id: "nuoc", prop: "bd-tide", x: 0.5, front: true },
            { id: "ta", prop: "bd-boat", x: 0.2, front: true },
            { id: "han", prop: "bd-warship", x: 0.62, front: true },
          ],
        },
        { line: 1, at: 0.17, fx: { kind: "exclaim", on: "TC", text: "ĐUỔI!" } },
        // "Triều rút, thuyền mắc cọc vỡ tan": nước rút lộ bãi cọc, thuyền chiến vỡ toác
        {
          line: 1,
          at: 0.4,
          cut: true,
          cd: { arms: "down", expr: "neutral" },
          tc: { arms: "up2", expr: "shock" },
          items: [
            { id: "c2", prop: "bd-stakes", x: 0.86 },
            { id: "vo", prop: "bd-wreck", x: 0.62, front: true },
          ],
        },
        { line: 1, at: 0.53, camera: "TC", tc: { move: "tremble" }, fx: [{ kind: "bop", on: "TC", text: "RẮC!" }, { kind: "sweat", on: "TC" }] },
        // "Chịu lép một keo nhỏ": Ngô Quyền nhún vai cười
        { line: 1, at: 0.64, camera: "CD", cd: { arms: "shrug", expr: "smug" } },
        // "đổi lấy cả trận thắng lớn!"
        { line: 1, at: 0.8, camera: "wide", cd: { arms: "up2", expr: "happy", move: "jump" }, tc: { expr: "sad", move: "idle", arms: "down" }, fx: { kind: "sparkle", on: "CD" } },
      ],
    },
    punchline: {
      shot: "TC hai tay dâng CĐ một cái kẹo mút, mắt lấp lánh nhìn cái điện thoại trên bàn",
      lines: [
        tc("À cháu hiểu rồi! Thế cháu biếu ông cái kẹo mút này..."),
        tc("...rồi ông mua cho cháu cái điện thoại mới nhé!"),
        cd("Cái thằng này, thả con săn sắt mà đòi bắt cả con cá voi à?"),
      ],
    },
  }),

  makeEpisode({
    day: 17,
    week,
    theme,
    idiom: "Con gà tức nhau tiếng gáy",
    meaning: "Ganh tị, hiếu thắng, thấy người khác hơn mình là tức, hơn thua cả chuyện nhỏ nhặt.",
    question: "Bạn từng hơn thua với ai chuyện gì mà giờ nghĩ lại thấy buồn cười?",
    hook: {
      shot: "Đồng hồ chỉ 5 giờ sáng, TC cầm loa đứng trên ghế gáy vang nhà",
      lines: [tc("Ò ó o o o!")],
    },
    ask: "Mới tờ mờ sáng, mày làm loạn cái gì thế hử?",
    misread: {
      shot: "TC chỉ ra cửa sổ mặt đầy quyết tâm, hít hơi gáy to hơn tiếng gà hàng xóm",
      lines: [
        tc("Ông ơi, gà trống nhà bên vừa gáy 3 tiếng trêu ngươi cháu!"),
        tc("Cháu phải gáy trả 10 tiếng, cho nó biết ai mới là giọng ca vàng của xóm này!"),
        cd("Gà thì nó gáy là việc của gà! Mày là người, đi thi gáy với gà làm cái gì?"),
      ],
    },
    explain:
      "Gà trống cứ nghe con khác gáy là tức, phải gáy lại cho to hơn mới chịu. Ông bà mượn chuyện ấy để chê cái thói ganh tị, hiếu thắng đấy. Thấy người ta hơn mình tí là khó chịu, rồi hơn thua cả những chuyện vặt chẳng đáng gì. Nói gọn lại, cứ hơn thua chuyện vặt thì chỉ tổ mệt mình thôi, cháu ạ.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): cung điện vua Hùng, Sơn Tinh dắt voi chín ngà, gà chín cựa, ngựa chín hồng mao tới trước, rước Mị Nương đi; Thủy Tinh đến sau tức tối; dưới núi Tản Viên, Thủy Tinh dâng sóng, Sơn Tinh bốc đồi chặn lại; Thủy Tinh thua vẫn dâng nước đánh tiếp",
      memory: { label: "TRUYỀN THUYẾT: SƠN TINH, THỦY TINH" },
      lines: [
        cd("Cũng như trong truyện Sơn Tinh, Thủy Tinh ấy. Vua Hùng thách cưới voi chín ngà, gà chín cựa, ngựa chín hồng mao. Sơn Tinh mang đủ lễ vật đến trước, thế là được rước luôn Mị Nương về núi."),
        cd("Thủy Tinh đến sau, không lấy được Mị Nương thì tức lồng lộn lên, liền dâng nước đánh Sơn Tinh. Sơn Tinh cũng chẳng vừa, bốc từng quả đồi, dời cả dãy núi ra chặn lại. Thua rồi mà vẫn không chịu thua, năm nào hắn cũng dâng nước đòi đánh lại!"),
      ],
      // Cụ Đồ đóng Sơn Tinh, Thằng Cháu đóng Thủy Tinh.
      stage: [
        // "Như trong truyện Sơn Tinh, Thủy Tinh ấy": cung điện, vua Hùng ngồi ngai
        {
          line: 0,
          cut: true,
          scene: "hung-palace",
          camera: "wide",
          cd: { role: "son-tinh", x: -0.3, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "thuy-tinh", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [],
        },
        // Sơn Tinh bước vào sân rồng
        { line: 0, at: 0.1, cd: { x: 0.16, expr: "happy" } },
        // "vua Hùng đòi": chắp tay nghe
        { line: 0, at: 0.25, cd: { arms: "hold2", expr: "neutral" }, fx: { kind: "question", on: "CD" } },
        // "voi chín ngà"
        { line: 0, at: 0.34, cd: { arms: "point", expr: "happy" }, items: [{ id: "voi", prop: "st-elephant", x: 0.77, scale: 0.55 }] },
        // "gà chín cựa"
        {
          line: 0,
          at: 0.44,
          items: [
            { id: "voi", prop: "st-elephant", x: 0.77, scale: 0.55 },
            { id: "ga", prop: "st-rooster", x: 0.4, scale: 1 },
          ],
        },
        // "ngựa chín hồng mao"
        {
          line: 0,
          at: 0.53,
          items: [
            { id: "voi", prop: "st-elephant", x: 0.77, scale: 0.55 },
            { id: "ga", prop: "st-rooster", x: 0.4, scale: 1 },
            { id: "ngua", prop: "st-horse", x: 0.58, scale: 0.6 },
          ],
        },
        // "Sơn Tinh mang đến trước"
        { line: 0, at: 0.66, cd: { arms: "up2", move: "jump" }, fx: { kind: "bop", on: "CD", text: "ĐẾN TRƯỚC!" } },
        // "rước luôn Mị Nương về núi"
        {
          line: 0,
          at: 0.8,
          cd: { arms: "wave", move: "idle" },
          items: [
            { id: "voi", prop: "st-elephant", x: 0.77, scale: 0.55 },
            { id: "ga", prop: "st-rooster", x: 0.5, scale: 1 },
            { id: "ngua", prop: "st-horse", x: 0.66, scale: 0.6 },
            { id: "mi", prop: "st-mi-nuong", x: 0.34 },
          ],
          fx: { kind: "hearts", on: "CD" },
        },
        {
          line: 0,
          at: 0.92,
          cd: { x: -0.4, arms: "down" },
          items: [
            { id: "voi", prop: "st-elephant", x: -0.3, scale: 0.55 },
            { id: "ga", prop: "st-rooster", x: -0.2, scale: 1 },
            { id: "ngua", prop: "st-horse", x: -0.25, scale: 0.6 },
            { id: "mi", prop: "st-mi-nuong", x: -0.15 },
          ],
        },

        // "Thủy Tinh đến sau": sân rồng đã vắng
        { line: 1, items: [], tc: { x: 0.6, expr: "happy" } },
        // "tức tối"
        { line: 1, at: 0.17, camera: "TC", tc: { arms: "hips", expr: "angry", move: "shake" }, fx: { kind: "anger", on: "TC" } },
        // "dâng nước đánh": dưới núi Tản Viên, sóng dâng
        {
          line: 1,
          at: 0.25,
          cut: true,
          scene: "st-mountain",
          camera: "wide",
          cd: { x: 0.24, hand: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { x: 0.84, hand: null, arms: "up2", expr: "angry", move: "idle" },
          items: [{ id: "song", prop: "st-wave", x: 0.72, scale: 0.9 }],
          fx: { kind: "bop", on: "TC", text: "ÀO!" },
        },
        { line: 1, at: 0.31, cd: { expr: "shock" }, items: [{ id: "song", prop: "st-wave", x: 0.55, scale: 0.9 }], fx: { kind: "sweat", on: "CD" } },
        // "Sơn Tinh bốc đồi"
        { line: 1, at: 0.43, cd: { hand: "st-hill-held", arms: "up2", expr: "angry", move: "jump" } },
        // "dời núi chặn lại"
        {
          line: 1,
          at: 0.52,
          cd: { hand: null, arms: "hit", move: "idle" },
          items: [
            { id: "song", prop: "st-wave", x: 0.64, scale: 0.9 },
            { id: "doi1", prop: "st-hill", x: 0.42, scale: 0.85 },
          ],
          fx: { kind: "bop", on: "CD", text: "ẦM!" },
        },
        {
          line: 1,
          at: 0.6,
          cd: { arms: "hips", expr: "smug" },
          tc: { arms: "down", expr: "shock", move: "tremble" },
          items: [
            { id: "song", prop: "st-wave", x: 0.78, scale: 0.65 },
            { id: "doi1", prop: "st-hill", x: 0.42, scale: 0.85 },
            { id: "doi2", prop: "st-hill", x: 0.56, scale: 1.05 },
          ],
          fx: { kind: "sweat", on: "TC" },
        },
        // "Thua mà không chịu"
        { line: 1, at: 0.68, camera: "TC", tc: { arms: "hips", expr: "angry", move: "shake" }, fx: { kind: "exclaim", on: "TC", text: "HỪ!" } },
        // "năm nào hắn cũng dâng nước đòi đánh lại"
        {
          line: 1,
          at: 0.8,
          camera: "wide",
          tc: { arms: "up2", move: "idle" },
          items: [
            { id: "song2", prop: "st-wave", x: 0.7, scale: 1.3 },
            { id: "doi1", prop: "st-hill", x: 0.42, scale: 0.85 },
            { id: "doi2", prop: "st-hill", x: 0.56, scale: 1.05 },
          ],
          fx: { kind: "bop", on: "TC", text: "ÀO!" },
        },
        { line: 1, at: 0.92, cd: { hand: "st-hill-held", arms: "up2", expr: "angry" }, fx: { kind: "bop", on: "CD", text: "LẠI NỮA À?" } },
      ],
    },
    punchline: {
      shot: "TC khoanh tay gật gù, rồi giơ ngón tay đếm với Cụ Đồ",
      lines: [
        tc("Cháu hiểu rồi, cháu không thèm hơn thua nữa! Nhưng từ sáng đến giờ cháu khen ông 2 câu, ông mới khen cháu có 1 câu..."),
        tc("...ông khen bù cháu 3 câu đi, không thì cháu tức lắm đấy!"),
      ],
    },
  }),

  makeEpisode({
    day: 21,
    week,
    theme,
    idiom: "Đàn gảy tai trâu",
    meaning: "Nói điều hay với người không hiểu hoặc không chịu nghe thì chỉ phí công.",
    question: "Có chuyện gì bạn đã nói cả chục lần mà người kia vẫn như chưa nghe thấy?",
    hook: {
      shot: "Giữa đồng, TC dựng sân khấu mini, dàn loa to đùng, ôm ukulele hướng về con trâu đồ chơi",
      lines: [tc("Anh Trâu ơi, em thuê nguyên dàn loa về hát riêng cho anh nghe đấy!")],
    },
    ask: "Mày mở liveshow cho ai nghe thế?",
    misread: {
      shot: "TC đổi từ đàn sang thổi sáo, rồi gõ trống ầm ĩ sát tai con trâu đồ chơi",
      lines: [
        tc("Anh không mê nhạc trữ tình à? Thế em chuyển sang nhạc sàn nhé!"),
        tc("Em gảy đứt cả ba dây đàn rồi, sao mặt anh vẫn cứ đơ ra thế?"),
        cd("Trâu nhựa đấy, cái thằng này! Mà trâu thật thì nó cũng chỉ mê bó cỏ non thôi, chứ nhạc nhẽo gì!"),
      ],
    },
    explain:
      "Trâu thì biết gì mà nghe đàn. Ông bà ví thế là ý bảo, đem điều hay ý đẹp mà nói với người không hiểu, hay người cứ bỏ ngoài tai, thì nói mấy cũng bằng không. Câu này vừa chê người nghe, lại vừa than cho mình phí công. Mà nhiều khi là tại mình chọn nhầm người nghe đấy!",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đồng cỏ, Công Minh Nghi ôm đàn gảy khúc hay, nốt nhạc bay, con trâu vẫn cầm nắm cỏ nhai; ông đổi sang tiếng muỗi vo ve, tiếng nghé ọ, trâu vểnh tai vẫy tay mừng; rồi ông gảy khúc hay, trâu lại nhai cỏ, ông nhún vai",
      memory: { label: "TÍCH XƯA: ĐÀN GẢY TAI TRÂU" },
      lines: [
        cd("Tương truyền ngày xưa bên Tàu có ông Công Minh Nghi, gảy một khúc đàn hay tuyệt cho con trâu nghe, thế mà trâu vẫn cứ cúi đầu gặm cỏ như không."),
        cd("Đến lúc ông gảy ra những tiếng như muỗi vo ve, như nghé con gọi mẹ, thì trâu mới vẫy đuôi, vểnh tai lên nghe. Nói gọn lại, khúc hay đến mấy mà người nghe không hiểu thì gảy cũng bằng thừa!"),
      ],
      // Cụ Đồ đóng Công Minh Nghi, Thằng Cháu đóng con trâu (nét mặt happy/shock thì tai trâu vểnh lên).
      stage: [
        // "Như ngày xưa ông Công Minh Nghi": ôm đàn giữa đồng, trâu cầm nắm cỏ
        {
          line: 0,
          cut: true,
          scene: "cmn-field",
          camera: "wide",
          cd: { role: "cong-minh-nghi", x: 0.27, hand: "cmn-qin", back: null, head: null, face: null, arms: "hold2", expr: "neutral", move: "idle" },
          tc: { role: "con-trau", x: 0.72, hand: "cmn-grass", back: null, head: null, face: null, arms: "hold", expr: "neutral", move: "idle" },
          items: [],
        },
        // "gảy một khúc đàn thật hay": nốt nhạc bay
        { line: 0, at: 0.42, cd: { expr: "happy", move: "bounce" }, items: [{ id: "not", prop: "cmn-notes", x: 0.5 }], fx: { kind: "sparkle", on: "CD" } },
        // "trâu vẫn cúi đầu gặm cỏ như không"
        { line: 0, at: 0.75, fx: { kind: "exclaim", on: "TC", text: "NHAI..." } },
        { line: 0, at: 0.93, camera: "wide", cd: { expr: "sad", move: "idle" }, items: [], fx: { kind: "sweat", on: "CD" } },

        // "Đến khi ông gảy tiếng như muỗi vo ve"
        { line: 1, cd: { expr: "smug", move: "bounce" }, items: [{ id: "muoi", prop: "cmn-buzz", x: 0.42 }] },
        // "như nghé con gọi mẹ"
        { line: 1, at: 0.28, items: [{ id: "nghe", prop: "cmn-calf-call", x: 0.42 }] },
        // "trâu mới vẫy đuôi vểnh tai"
        { line: 1, at: 0.42, tc: { hand: null, arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 1, at: 0.55, camera: "TC", items: [], fx: { kind: "hearts", on: "TC" } },
        // "Khúc hay đến mấy mà người nghe không hiểu": lại gảy khúc hay, trâu lại nhai cỏ
        {
          line: 1,
          at: 0.63,
          camera: "wide",
          cd: { expr: "happy", move: "bounce" },
          tc: { hand: "cmn-grass", arms: "hold", expr: "neutral", move: "idle" },
          items: [{ id: "not", prop: "cmn-notes", x: 0.5 }],
        },
        // "thì gảy cũng phí công"
        { line: 1, at: 0.88, camera: "CD", cd: { hand: null, arms: "shrug", expr: "sad", move: "idle" }, items: [], fx: { kind: "sweat", on: "CD" } },
      ],
    },
    punchline: {
      shot: "CĐ giảng xong quay lại thì thấy TC đeo tai nghe to đùng, nhún nhảy hát",
      lines: [
        cd("Đúng là... đàn gảy tai cháu!"),
        tc("Hả? Ông vừa khen cháu đánh đàn hay à ông?"),
      ],
    },
  }),

  makeEpisode({
    day: 23,
    week,
    theme,
    idiom: "Mèo khen mèo dài đuôi",
    meaning: "Tự khen mình, hoặc người cùng phe khen lẫn nhau một cách thiên vị, chẳng khách quan.",
    question: "Lời khen nào trên mạng khiến bạn nghi là mèo khen mèo nhất?",
    hook: {
      shot: "TC gắn cái đuôi mèo giả dài lê thê, xoay người trước gương, tự vỗ tay",
      lines: [tc("Trời ơi, ai mà có cái đuôi đẹp thế này! À, là cháu!")],
    },
    ask: "Mày đứng trước gương tự vỗ tay cái gì thế?",
    misread: {
      shot: "TC lấy thước dây đo đuôi, nối thêm đoạn nữa; con mèo bên cạnh cũng ngoe nguẩy đuôi, hai đuôi quấn vào nhau làm TC ngã oạch",
      lines: [
        tc("Cháu nối cái đuôi dài ra tận 2 mét rồi đấy! Mèo ơi, khen anh đi!"),
        tc("Ông nghe chưa, nó kêu meo là khen đuôi cháu dài đấy. Thế là cháu khen lại đuôi nó cũng dài. Hai đứa khen nhau từ sáng đến giờ!"),
        cd("Khen nhau cho lắm vào, giờ thì hai cái đuôi quấn vào nhau, ngã sấp mặt ra rồi kia kìa!"),
      ],
    },
    explain:
      "Mèo nào mà chẳng có đuôi dài, có gì lạ đâu mà khen. Ông bà dùng câu này để chê những người tự khen mình, hoặc người cùng một phe cứ tâng bốc lẫn nhau. Khen kiểu ấy là thiên vị, chẳng khách quan tí nào cả. Nói gọn lại, hay hay dở thì cứ để người ngoài nhận xét.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): cổng tre nhà quê, anh áo mới đứng chống nạnh chờ người khen; anh tìm lợn cầm sợi dây đứt chạy tới hỏi; anh áo mới giơ vạt áo lên khoe, anh tìm lợn ngơ ngác",
      memory: { label: "TRUYỆN CƯỜI: LỢN CƯỚI ÁO MỚI" },
      lines: [
        cd("Cũng giống như trong truyện cười Lợn cưới, áo mới ấy. Anh kia mặc áo mới, đứng ở cửa cả buổi chờ người khen. Có anh đang đi tìm lợn chạy tới hỏi, bác có thấy con lợn cưới của tôi chạy qua đây không?"),
        cd("Anh kia liền giơ ngay vạt áo lên mà bảo, từ lúc tôi mặc cái áo mới này, tôi chẳng thấy con lợn nào chạy qua cả! Đấy, chẳng ai khen thì mình tự khen mình vậy."),
      ],
      // Cụ Đồ đóng anh tìm lợn, Thằng Cháu đóng anh áo mới.
      stage: [
        // "Như truyện cười Lợn cưới, áo mới ấy": anh áo mới đứng ở cổng
        {
          line: 0,
          cut: true,
          scene: "village-gate",
          camera: "wide",
          cd: { role: "tim-lon", x: -0.4, hand: "pig-rope", back: null, head: null, face: null, arms: "down", expr: "shock", move: "idle" },
          tc: { role: "ao-moi", x: 0.64, hand: null, back: null, head: null, face: null, arms: "hips", expr: "smug", move: "idle" },
          items: [],
        },
        // "anh kia mặc áo mới"
        { line: 0, at: 0.26, camera: "TC", tc: { move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
        // "đứng ở cửa cả buổi chờ người khen"
        { line: 0, at: 0.36, camera: "wide", tc: { arms: "wave", expr: "happy", move: "idle" } },
        { line: 0, at: 0.48, tc: { arms: "down", expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
        // "Có anh tìm lợn hỏi"
        { line: 0, at: 0.56, cd: { x: 0.26, move: "shake" }, fx: { kind: "sweat", on: "CD" } },
        // "có thấy con lợn cưới của tôi chạy qua không?"
        {
          line: 0,
          at: 0.72,
          cd: { arms: "point", expr: "confused", move: "idle" },
          tc: { expr: "happy", move: "bounce" },
          fx: [
            { kind: "question", on: "CD" },
            { kind: "exclaim", on: "TC" },
          ],
        },

        // "Anh kia giơ ngay vạt áo"
        { line: 1, camera: "TC", tc: { hand: "ao-moi-flap", arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
        // "từ lúc tôi mặc cái áo mới này"
        { line: 1, at: 0.28, tc: { expr: "smug", move: "idle" }, fx: { kind: "bop", on: "TC", text: "ÁO MỚI!" } },
        // "tôi chẳng thấy con lợn nào chạy qua cả!"
        { line: 1, at: 0.52, camera: "wide", cd: { hand: "pig-rope", arms: "shrug", expr: "shock" }, fx: { kind: "sweat", on: "CD" } },
        { line: 1, at: 0.66, cd: { expr: "confused" }, fx: { kind: "question", on: "CD" } },
        // "Chẳng ai khen thì tự khen vậy."
        { line: 1, at: 0.76, tc: { hand: null, arms: "hips", expr: "smug", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        { line: 1, at: 0.88, cd: { x: -0.4, arms: "down", expr: "sad", move: "idle" } },
      ],
    },
    punchline: {
      shot: "TC cầm hai cái điện thoại, màn hình chi chít tài khoản phụ, bấm like liên tục",
      lines: [
        tc("Cháu hiểu rồi! Từ giờ cháu không tự like ảnh của mình nữa."),
        tc("Cháu sẽ lập hẳn 5 tài khoản phụ để chúng nó like hộ cháu!"),
        cd("Cái thằng này, thế thì vẫn là năm con mèo khen một cái đuôi chứ còn gì!"),
      ],
    },
  }),

  makeEpisode({
    day: 26,
    week,
    theme,
    idiom: "Vẽ rắn thêm chân",
    meaning: "Việc đã ổn mà còn bày thêm cái thừa, làm hỏng việc; cũng chỉ thói thêu dệt, bịa thêm chuyện.",
    question: "Bạn từng thêm thắt chi tiết thừa nào để rồi làm hỏng cả việc chưa?",
    hook: {
      shot: "Tay vẽ tua nhanh trên giấy A3, con rắn mọc ra hàng loạt chân kỳ quặc",
      lines: [tc("Thêm 8 cái chân này, đôi giày thể thao này, cả cái ván trượt nữa!")],
    },
    ask: "Mày vẽ con gì mà trông như quái vật thế hử?",
    misread: {
      shot: "TC giơ bức tranh con rắn có 8 chân đi giày, mặt đầy tự hào",
      lines: [
        tc("Cháu đang đi thi vẽ rắn đấy ông ạ, ai vẽ nhanh nhất thì thắng! Cháu vẽ xong đầu tiên, thấy vẫn còn thừa giờ..."),
        tc("...nên cháu tặng thêm cho nó 8 cái chân, chạy cho nhanh!"),
        cd("Cái thằng này! Ban giám khảo lại tưởng mày vẽ con rết đi giày đấy!"),
      ],
    },
    explain:
      "Rắn vốn chẳng có chân, cháu vẽ thêm vào thì nó thành con khác, hỏng cả bức tranh. Ấy là chê những người làm việc đã xong, đã ổn cả rồi, mà lại còn bày thêm cái thừa, để rồi chuốc lấy rắc rối, hỏng cả việc. Câu này còn chê cả những đứa thêm mắm thêm muối, bịa chuyện không thành có nữa đấy. Nói gọn lại, việc xong rồi thì dừng tay!",
    example: {
      shot: "HỒI ỨC (TV đen trắng): sân nhà quan nước Sở, bình rượu thưởng đặt giữa sân, hai người khách thi vẽ rắn trên ô đất; người xong trước cầm bình rượu rồi vẽ thêm chân; người kia vẽ xong giật bình rượu, chỉ vào con rắn có chân",
      memory: { label: "TÍCH XƯA: VẼ RẮN THÊM CHÂN" },
      lines: [
        cd("Cứ như tích xưa bên nước Sở ấy. Mấy người được chủ nhà thưởng cho một bình rượu, chia nhau uống thì chẳng đủ, bèn rủ nhau thi vẽ rắn trên đất, ai vẽ xong trước thì được uống cả bình."),
        cd("Có anh vẽ xong đầu tiên, thắng rồi mà vẫn còn ngứa tay, vẽ thêm chân cho con rắn. Chân chưa vẽ xong thì người kia đã vẽ xong rắn, giật luôn bình rượu mà bảo, rắn làm gì có chân mà vẽ!"),
      ],
      // Cụ Đồ đóng người khách thắng bình rượu, Thằng Cháu đóng người vẽ thêm chân.
      stage: [
        // "Như tích xưa nước Sở ấy": sân nhà quan
        {
          line: 0,
          cut: true,
          scene: "so-courtyard",
          camera: "wide",
          cd: { role: "so-khach-ruou", x: 0.14, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "so-khach-chan", x: 0.86, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [],
        },
        // "mấy người được thưởng một bình rượu"
        {
          line: 0,
          at: 0.3,
          cd: { expr: "happy" },
          tc: { expr: "happy", move: "bounce" },
          items: [{ id: "binh", prop: "so-flask", x: 0.5, scale: 1.3 }],
          fx: [
            { kind: "sparkle", on: "CD" },
            { kind: "hearts", on: "TC" },
          ],
        },
        // "bèn thi vẽ rắn trên đất"
        {
          line: 0,
          at: 0.6,
          cd: { hand: "so-stick", arms: "hit", expr: "angry" },
          tc: { hand: "so-stick", arms: "hit", expr: "angry", move: "idle" },
          items: [
            { id: "binh", prop: "so-flask", x: 0.5, scale: 1.3 },
            { id: "cat1", prop: "so-sand", x: 0.33, scale: 0.95, front: true },
            { id: "cat2", prop: "so-sand", x: 0.67, scale: 0.95, front: true },
          ],
        },
        // "ai xong trước thì được uống"
        { line: 0, at: 0.82, cd: { move: "tremble" }, tc: { move: "tremble" }, fx: { kind: "sweat", on: "TC" } },

        // "Anh xong đầu tiên"
        {
          line: 1,
          cd: { arms: "hit", move: "idle" },
          tc: { arms: "raise", expr: "happy", move: "jump" },
          items: [
            { id: "binh", prop: "so-flask", x: 0.5, scale: 1.3 },
            { id: "cat1", prop: "so-sand", x: 0.33, scale: 0.95, front: true },
            { id: "cat2", prop: "so-sand-snake", x: 0.67, scale: 0.95, front: true },
          ],
          fx: { kind: "bop", on: "TC", text: "XONG!" },
        },
        // "thắng rồi": cầm lấy bình rượu
        {
          line: 1,
          at: 0.17,
          tc: { x: 0.6, hand: "so-flask", arms: "hold", expr: "smug", move: "idle" },
          items: [
            { id: "cat1", prop: "so-sand", x: 0.33, scale: 0.95, front: true },
            { id: "cat2", prop: "so-sand-snake", x: 0.67, scale: 0.95, front: true },
          ],
          fx: { kind: "sparkle", on: "TC" },
        },
        // "còn ngứa tay vẽ thêm chân cho rắn": tay cầm bình, quay về vẽ tiếp
        { line: 1, at: 0.3, tc: { x: 0.86, expr: "happy" } },
        {
          line: 1,
          at: 0.4,
          tc: { move: "bounce" },
          items: [
            { id: "cat1", prop: "so-sand", x: 0.33, scale: 0.95, front: true },
            { id: "cat2", prop: "so-sand-legs", x: 0.67, scale: 0.95, front: true },
          ],
          fx: { kind: "bop", on: "TC", text: "+CHÂN!" },
        },
        // "Người xong sau"
        {
          line: 1,
          at: 0.6,
          cd: { arms: "raise", expr: "happy" },
          tc: { move: "idle" },
          items: [
            { id: "cat1", prop: "so-sand-snake", x: 0.33, scale: 0.95, front: true },
            { id: "cat2", prop: "so-sand-legs", x: 0.67, scale: 0.95, front: true },
          ],
          fx: { kind: "bop", on: "CD", text: "XONG!" },
        },
        // "giật luôn bình rượu"
        { line: 1, at: 0.7, cd: { x: 0.6, hand: null, arms: "down" } },
        {
          line: 1,
          at: 0.76,
          cd: { hand: "so-flask", arms: "hold", expr: "smug" },
          tc: { hand: null, arms: "shrug", expr: "shock" },
          fx: { kind: "bop", on: "CD", text: "GIẬT!" },
        },
        // "rắn vốn không có chân!": lùi lại, chỉ con rắn có chân
        { line: 1, at: 0.86, cd: { x: 0.36, arms: "point", expr: "angry" }, tc: { expr: "sad", arms: "down" }, fx: { kind: "sweat", on: "TC" } },
        { line: 1, at: 0.95, cd: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "CD" } },
      ],
    },
    punchline: {
      shot: "TC lấy cục tẩy chà mạnh làm rách giấy, rồi cầm bút vẽ đè lên chỗ rách",
      lines: [
        tc("Ông ơi, cháu xóa hết chân rắn rồi! Mỗi tội cháu tẩy mạnh tay quá, giấy bị thủng mất một lỗ..."),
        tc("...nên cháu vẽ thêm đôi cánh đại bàng để che cái lỗ thủng ấy nhé ông!"),
      ],
    },
  }),

  makeEpisode({
    day: 28,
    week,
    theme,
    idiom: "Mèo mù vớ cá rán",
    meaning: "Tình cờ gặp may bất ngờ, được điều tốt vượt quá sức mình, chứ không nhờ tài giỏi hay công sức.",
    question: "Pha ăn may đỉnh nhất mà bạn từng gặp là gì?",
    hook: {
      shot: "TC đeo bờm tai mèo, buộc khăn bịt mắt, bò quanh bàn ăn khịt khịt mũi",
      lines: [tc("Meo... Cháu ngửi thấy mùi cá rán ở đâu đây rồi!")],
    },
    ask: "Mắt sáng trưng ra đấy, bịt khăn vào làm gì hử?",
    misread: {
      shot: "TC bịt mắt quờ quạng trên bàn ăn: vớ trúng quả ớt, vớ trúng râu CĐ, rồi mới chạm đĩa cá",
      lines: [
        tc("Vớ được rồi! Ơ, cay quá, cắn phải quả ớt rồi! Vớ phát nữa... Á, sao lại có râu ông ở đây?"),
        tc("Đây rồi, đĩa cá rán! Thấy chưa, siêu mèo mù săn mồi là cháu đây!"),
        cd("Đĩa cá nằm ngay trước mũi mày đấy, mở mắt ra mà gắp! Mò kiểu ấy thì đổ cả mâm bây giờ, cái thằng này!"),
      ],
    },
    explain:
      "Mèo mù thì con mồi sống còn chẳng bắt nổi, thế mà tự dưng vớ trúng miếng cá rán thơm phức, chẳng phải rình bắt gì. Ấy là gặp may bất ngờ, được hưởng điều tốt vượt quá sức mình, chứ có phải tài giỏi gì đâu. Nói gọn lại, mèo mù vớ cá rán là ăn may thôi, may một lần chứ đừng tưởng lần nào cũng thế!",
    example: {
      shot: "Phòng phỏng vấn, ứng viên trẻ lén liếc ghi chú, nhà tuyển dụng gật gù",
      lines: [
        cd("Cũng như đi phỏng vấn ấy, người ta lại hỏi trúng ngay câu duy nhất mà mình ôn tối qua. Thế mà có người được nhận xong lại vênh mặt lên, khoe mình là thiên tài đấy!"),
      ],
    },
    punchline: {
      shot: "TC buộc chặt khăn bịt mắt, ngón tay bấm bừa trên điện thoại, màn hình hiện 'Ứng tuyển thành công'",
      lines: [
        tc("Hay quá! Thế cháu cứ bịt mắt rải hồ sơ bừa, kiểu gì chẳng vớ được việc ngon!"),
        tc("Ơ... ông ơi, cháu trúng tuyển làm mèo cho quán cà phê mèo rồi!"),
      ],
    },
  }),
];
