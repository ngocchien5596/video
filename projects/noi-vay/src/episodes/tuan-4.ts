import { cd, makeEpisode, tc } from "./make.ts";

const week = 4;
const theme = "Cư xử, gia đình";

export const TUAN_4 = [
  makeEpisode({
    day: 22,
    week,
    theme,
    idiom: "Bán anh em xa mua láng giềng gần",
    meaning: "Hàng xóm ở gần, lúc cần giúp được nhanh hơn họ hàng ở xa, nên phải quý tình láng giềng.",
    question: "Lần gần nhất hàng xóm giúp bạn một việc là việc gì?",
    hook: {
      shot: "Ảnh chụp màn hình tin rao trên chợ online: \"pass anh họ, còn mới\"",
      lines: [tc("Pass gấp ông anh họ bên Úc. Còn mới, ít dùng, bao ship!")],
    },
    ask: "Mày đăng bán cái gì lên chợ online thế?",
    misread: {
      shot: "TC chụp ảnh anh họ trong khung video call để đăng bán, rồi cầm xấp tiền sang gõ cửa chú hàng xóm",
      lines: [
        tc("Anh họ cháu ở tận Úc, mười năm gặp một lần. Cháu bán giá hữu nghị."),
        tc("Có tiền rồi, cháu sang hỏi mua chú hàng xóm. Chú ơi, chú bán mình bao nhiêu ạ?"),
        tc("Chú không bán. Cháu trả thêm cái máy lọc nước, chú vẫn đóng cửa!"),
        cd("Người ta là người, có phải máy giặt cũ đâu mà mua với bán!"),
      ],
    },
    explain:
      "Câu này không bảo bán người thật đâu. Ý là họ hàng ở xa, lúc có việc gấp chẳng về kịp. Còn hàng xóm ở ngay sát vách, tối lửa tắt đèn có nhau. Nên phải quý, phải giữ tình láng giềng.",
    example: {
      shot: "Phòng trọ nửa đêm, cô gái sốt nằm đắp chăn, chị phòng bên bưng bát cháo sang",
      lines: [
        cd("Như bạn thuê trọ, nửa đêm sốt cao. Bố mẹ ở quê chỉ gọi điện hỏi được."),
        cd("Chị phòng bên mang thuốc sang, còn nấu cho bát cháo nóng."),
      ],
    },
    punchline: {
      shot: "TC mang đĩa ổi sang nhà bên, quay về ôm nồi chè to; cảnh cuối TC cầm cái nồi rỗng đứng trước cửa hàng xóm",
      lines: [
        tc("Cháu mang sang chị hàng xóm một đĩa ổi, chị gửi lại cả nồi chè!"),
        cd("Thế mai mày định mang gì sang?"),
        tc("Mang cái nồi không sang, xem chị đổ đầy gì ạ."),
      ],
    },
  }),

  makeEpisode({
    day: 23,
    week,
    theme,
    idiom: "Tai vách mạch dừng",
    meaning: "Chuyện tưởng kín vẫn có thể bị nghe thấy và lan ra, nên nói chuyện riêng phải giữ lời.",
    question: "Bạn từng bị lộ chuyện chỉ vì nói ở chỗ tưởng là kín chưa?",
    hook: {
      shot: "TC chiếu đèn bàn vào bức tường như phòng thẩm vấn",
      lines: [tc("Tường ơi, tối qua mày nghe được những gì? Khai mau!")],
    },
    ask: "Mày đang tra hỏi bức tường đấy à?",
    misread: {
      shot: "TC dán mười cái tai giả lên tường, rồi đeo ống nghe áp vào tường như bác sĩ",
      lines: [
        tc("Vách có tai thì phải nghe. Cháu dán thêm mười cái tai giả cho nó rõ."),
        tc("Còn mạch thì cháu đo rồi. Tường nhà mình mạch đập bảy mươi, khỏe re!"),
        tc("Mà sao lại là dừng? À, nói xong phải dừng ngay, không thì tường đi mách!"),
        cd("Trời ơi, nó còn khám sức khỏe cho cái tường!"),
      ],
    },
    explain:
      "Ngày xưa vách nhà trát bằng đất, bên trong là nan tre đan làm cốt, gọi là dừng. Vách mỏng, có khe, ngoài sân nghe được hết. Ý là chuyện tưởng kín vẫn lọt ra ngoài, nên nói chuyện riêng phải giữ lời. Dạng gốc là dừng, nhiều người quen nói là rừng.",
    example: {
      shot: "Màn hình nhóm chat ba người, rồi một tấm ảnh chụp màn hình bay sang nhóm cả phòng",
      lines: [
        cd("Như nói xấu ai trong nhóm chat ba người. Một tấm chụp màn hình, chiều nay cả phòng biết."),
        cd("Nhóm chat bây giờ chính là cái vách đất ngày xưa."),
      ],
    },
    punchline: {
      shot: "TC đưa tờ giấy gấp nhỏ cho CĐ, CĐ mở ra đọc to, tròn mắt",
      lines: [
        tc("Từ nay chuyện riêng cháu viết ra giấy cho kín."),
        cd("Ông ơi, cháu lỡ làm vỡ cái ấm trà của ông... CÁI ẤM NÀO?!"),
        tc("Ông đọc to thế, tường nghe hết rồi!"),
      ],
    },
  }),

  makeEpisode({
    day: 24,
    week,
    theme,
    idiom: "Ăn ốc nói mò",
    meaning: "Nói không có căn cứ, chẳng biết rõ mà cứ đoán mò, phán bừa.",
    question: "Tin đồn vô căn cứ nào về bạn khiến bạn dở khóc dở cười nhất?",
    hook: {
      shot: "TC bịt mắt, ngồi trước rổ ốc luộc, mút chùn chụt",
      lines: [tc("Cháu mút một con ốc là biết luôn tương lai của một người.")],
    },
    ask: "Bịt mắt ngồi ăn ốc làm gì thế?",
    misread: {
      shot: "TC bịt mắt thò tay mò trong rổ, mỗi lần bốc được một thứ lại phán to; cuối cùng bốc trúng lọ mắm đổ lên áo CĐ",
      lines: [
        tc("Ăn ốc thì phải nói, mà nói thì phải mò. Cháu nhắm mắt mò trong rổ, trúng gì nói nấy."),
        tc("Trúng con ốc to: chị kia sắp lấy chồng. Trúng con ốc bé: anh kia sắp mất ví."),
        tc("Trúng lọ mắm: ông sắp bị dính mắm!"),
        cd("Câu này đúng duy nhất, vì mày vừa đổ mắm lên áo ông!"),
      ],
    },
    explain:
      "Ăn ốc nói mò là nói không có căn cứ, chẳng biết gì cũng phán bừa. Có cách giải thích là mò ốc dưới nước đục, chẳng nhìn thấy gì, mò được đâu hay đấy. Nói năng kiểu đó dễ gây hiểu lầm, có khi làm khổ người khác.",
    example: {
      shot: "Màn hình mạng xã hội: một người đổi ảnh đại diện, bên dưới bình luận bàn tán xôn xao",
      lines: [
        cd("Như thấy bạn đổi ảnh đại diện, chưa hỏi han gì đã đi kể là chia tay rồi."),
        cd("Hôm sau hóa ra người ta chỉ đổi kiểu tóc."),
      ],
    },
    punchline: {
      shot: "TC giơ điện thoại, chỉ vào một bình luận ẩn danh trên màn hình",
      lines: [
        tc("Từ nay cháu nói gì cũng phải có căn cứ. Ông ơi, ông sinh năm bao nhiêu?"),
        cd("Năm 1950."),
        tc("Sai! Căn cứ hẳn hoi: một bình luận ẩn danh bảo ông sinh năm 1802."),
      ],
    },
  }),

  makeEpisode({
    day: 25,
    week,
    theme,
    idiom: "Mật ngọt chết ruồi",
    meaning: "Lời ngon ngọt, món lợi bày sẵn trước mắt có khi lại là cái bẫy.",
    question: "Lời mời ngon ngọt nào trên mạng suýt làm bạn mắc bẫy?",
    hook: {
      shot: "TC đeo găng tay, cầm chổi quét sơn và hũ mật ong to như đi phun thuốc",
      lines: [tc("Bình xịt hết rồi. Cháu chuyển sang diệt ruồi bằng mật ong!")],
    },
    ask: "Mày cầm hũ mật đi khắp nhà làm gì?",
    misread: {
      shot: "TC quét mật lên bàn, lên cửa, lên ghế; đàn kiến xếp hàng kéo vào; CĐ ngồi xuống ghế thì dính chặt",
      lines: [
        tc("Bôi mật lên bàn, ruồi bay tới, dính chân, xong phim. Rẻ hơn bình xịt!"),
        tc("Cháu bôi thêm lên cửa, lên ghế, lên cả cánh quạt cho chắc."),
        tc("Giờ ruồi chưa thấy đâu, mà kiến cả xóm kéo sang ăn tiệc."),
        cd("Ông vừa ngồi xuống ghế. Giờ ông dính chặt rồi đây này!"),
      ],
    },
    explain:
      "Mật ngọt chết ruồi là lời ngon ngọt, món lợi bày sẵn trước mắt có khi lại là cái bẫy. Ruồi ham ngọt, sà vào là dính, không ra được nữa. Người cũng vậy, nghe lời đường mật mà không tỉnh táo thì dễ mắc lừa.",
    example: {
      shot: "Tin nhắn trúng thưởng nhấp nháy trên điện thoại, rồi cảnh người lạ nhắn rủ góp vốn",
      lines: [
        cd("Như tin nhắn báo bạn trúng điện thoại xịn, chỉ cần chuyển phí ship trước."),
        cd("Hay người lạ trên mạng khen bạn hết lời, rồi rủ góp vốn lãi gấp đôi."),
      ],
    },
    punchline: {
      shot: "CĐ vẫn dính trên ghế, cười hiền khen TC; TC nheo mắt nghi ngờ",
      lines: [
        cd("Hôm nay cháu ông ngoan quá."),
        tc("Ông khen ngọt thế này... chắc định nhờ cháu rửa bát đúng không?"),
        cd("Rửa luôn cả cái ghế ông đang ngồi nữa."),
      ],
    },
  }),

  makeEpisode({
    day: 26,
    week,
    theme,
    idiom: "Trâu buộc ghét trâu ăn",
    meaning: "Mình gặp cảnh không như ý thì sinh ra ghen tị với người đang được hưởng hơn mình.",
    question: "Lúc nào bạn thấy mình dễ thành \"trâu buộc\" nhất?",
    hook: {
      shot: "TC ngồi ở bàn học, chân buộc hờ sợi dây thừng vào chân bàn, bấm điện thoại liên tục",
      lines: [tc("Phẫn nộ. Phẫn nộ. Bấm phẫn nộ hết!")],
    },
    ask: "Ai làm gì mà mày bấm phẫn nộ ầm ầm thế?",
    misread: {
      shot: "TC đội sừng trâu bằng giấy, nhìn ảnh bạn ăn lẩu trên điện thoại, kêu \"ò\" rồi bấm phẫn nộ từng ảnh",
      lines: [
        tc("Cháu bị mẹ cấm ra ngoài để ôn thi, tức là trâu đang bị buộc. Cháu buộc dây vào chân cho đúng vai."),
        tc("Thằng bạn đăng ảnh đi ăn lẩu, tức là trâu đang ăn. Theo luật, cháu phải ghét nó."),
        tc("Cháu đã kêu ò ba tiếng và bấm phẫn nộ mười hai ảnh."),
        cd("Mày nhập vai con trâu giỏi thế, sao không nhập vai đứa ôn thi?"),
      ],
    },
    explain:
      "Ngày xưa con trâu bị buộc ở cọc, nhìn con khác thong thả gặm cỏ thì bực bội. Ý câu là mình gặp cảnh không như ý thì đâm ra ghen tị với người đang được hưởng. Ông bà nói ra để mình tự soi lại, chứ không phải để làm theo.",
    example: {
      shot: "Văn phòng ngày lễ vắng tanh, một người trực ca lướt ảnh đồng nghiệp đi biển",
      lines: [
        cd("Như mình phải trực lễ ở công ty, lướt thấy đồng nghiệp đi biển, thế là bình luận: chắc ảnh mạng."),
        cd("Người ta có lỗi gì đâu, chỉ là mình đang bị buộc thôi."),
      ],
    },
    punchline: {
      shot: "TC thi xong, giơ nồi lẩu chụp ảnh đăng; bên cạnh CĐ đang ăn kiêng, cầm bát cháo trắng, bấm điện thoại",
      lines: [
        tc("Thi xong rồi! Cháu đăng ảnh ăn lẩu đây."),
        cd("Ông đang ăn kiêng, cả tuần cháo trắng..."),
        cd("Phẫn nộ."),
      ],
    },
  }),

  makeEpisode({
    day: 27,
    week,
    theme,
    idiom: "Một con ngựa đau cả tàu bỏ cỏ",
    meaning: "Một người trong tập thể gặp chuyện thì cả tập thể cùng lo lắng, sẻ chia.",
    question: "Lần gần nhất cả nhóm cùng lo cho một người là chuyện gì?",
    hook: {
      shot: "TC đội mũ trưởng tàu, thổi còi, hất từng bó cỏ khỏi đoàn tàu hỏa đồ chơi",
      lines: [tc("Toàn bộ hành khách chú ý! Từ hôm nay cả đoàn tàu bỏ cỏ!")],
    },
    ask: "Mày hất cỏ ra khỏi đoàn tàu làm gì?",
    misread: {
      shot: "Con ngựa gỗ quấn băng ở chân; TC lần lượt dỡ cỏ khỏi tàu hỏa, tàu thủy, tàu vũ trụ đồ chơi; loa sân ga đọc thông báo",
      lines: [
        tc("Con ngựa gỗ của cháu bị trẹo chân. Thế là cả đoàn tàu phải dỡ cỏ."),
        tc("Cháu bắt cả tàu thủy, tàu ngầm, tàu vũ trụ nhịn cỏ luôn."),
        tc("Loa sân ga thông báo: chuyến tàu bị hoãn, lý do là có một con ngựa đau."),
        cd("Tàu hỏa nó có ăn cỏ bao giờ đâu mà bỏ!"),
      ],
    },
    explain:
      "Chữ tàu ở đây là chuồng ngựa, chỗ đặt máng cỏ, không phải tàu hỏa. Một con ngựa ốm, cả chuồng lo lắng, không buồn ăn. Ý câu là một người trong tập thể gặp chuyện thì mọi người cùng lo, cùng sẻ chia.",
    example: {
      shot: "Bàn làm việc trống, cả nhóm chia nhau việc trên bảng, cảnh sau cầm hộp cháo đến thăm",
      lines: [
        cd("Như trong nhóm có bạn ốm phải nghỉ, cả nhóm chia nhau làm phần việc còn dang dở."),
        cd("Tan làm còn rủ nhau mang cháo đến thăm."),
      ],
    },
    punchline: {
      shot: "CĐ chống lưng kêu đau; cả nhà nằm thành hàng quanh CĐ, không ai nhúc nhích",
      lines: [
        tc("Cháu hiểu rồi. Ông đau lưng thì cả nhà phải bỏ cỏ."),
        tc("Cháu nghỉ học, mẹ nghỉ làm, bố nghỉ nấu cơm, cả nhà nằm cạnh ông!"),
        cd("Thế ai đi mua thuốc cho ông?!"),
      ],
    },
  }),

  makeEpisode({
    day: 28,
    week,
    theme,
    idiom: "Ma cũ bắt nạt ma mới",
    meaning: "Người đến trước cậy thâm niên, đem người mới đến ra sai vặt, làm khó.",
    question: "Ngày đầu đi làm hay vào ký túc xá, bạn được \"ma cũ\" đối xử thế nào?",
    hook: {
      shot: "TC trùm chăn trắng kiểu ma hoạt hình dễ thương, đeo thẻ thực tập, lướt vào văn phòng",
      lines: [tc("Ngày đầu đi làm, cháu phải hóa trang thành ma cho đúng thủ tục.")],
    },
    ask: "Đi thực tập mà trùm chăn trắng thế kia à?",
    misread: {
      shot: "Con ma cũ hoạt hình tròn trịa sai TC ôm chồng giấy photo, xách cơm hộp; TC giơ đèn pin định chiếu",
      lines: [
        tc("Công ty có một con ma cũ, ba năm kinh nghiệm. Nó sai cháu photo hai trăm trang."),
        tc("Nó bắt cháu pha trà, xách cơm hộp, tập kêu u u cho chuẩn."),
        tc("Cháu tức quá, cháu cầm đèn pin chiếu cho ma cũ biến mất!"),
        cd("Người ta là chị trưởng nhóm, chiếu đèn vào mặt là mày nghỉ việc đấy!"),
      ],
    },
    explain:
      "Ma ở đây là cách nói ví von, chỉ người. Ma cũ là người đến trước, ma mới là người mới đến. Câu này chê người cậy mình có thâm niên, đem người mới ra sai vặt, làm khó.",
    example: {
      shot: "Phòng ký túc xá, anh năm cuối nằm chỉ tay, cậu năm nhất ôm túi rác và chậu đồ",
      lines: [
        cd("Như ở ký túc xá, anh năm cuối bắt tân sinh viên đổ rác, giặt đồ hộ."),
        cd("Quên mất ngày xưa chính mình cũng từng là ma mới."),
      ],
    },
    punchline: {
      shot: "Một năm sau, TC có thẻ nhân viên chính thức; bạn thực tập mới bước vào, TC vội đỡ lấy chồng giấy",
      lines: [
        tc("Một năm rồi, giờ cháu là ma cũ. Em mới vào à?"),
        tc("Em có cần anh đi photo hộ gì không?"),
        cd("Ơ kìa, thế ai bắt nạt ai?"),
        tc("Cháu làm quen tay quá, giờ không dừng được."),
      ],
    },
  }),

  makeEpisode({
    day: 29,
    week,
    theme,
    idiom: "Tốt gỗ hơn tốt nước sơn",
    meaning: "Chất lượng, phẩm chất bên trong quan trọng hơn vẻ đẹp bên ngoài.",
    question: "Bạn từng chọn nhầm thứ gì chỉ vì nó quá đẹp bên ngoài?",
    hook: {
      shot: "Cửa hàng nội thất, âm gõ \"cốc cốc\", TC đeo ống nghe áp vào cánh tủ",
      lines: [tc("Suỵt. Cháu đang khám bệnh cho cái tủ.")],
    },
    ask: "Đi mua tủ mà làm như bác sĩ thế?",
    misread: {
      shot: "TC gõ tủ hồng lấp lánh nghe \"bộp\", gõ tủ cũ sờn nghe \"cốc\", rồi quay sang gõ vào cái ví của CĐ",
      lines: [
        tc("Cái tủ hồng lấp lánh này gõ nghe bộp bộp, rỗng ruột. Loại!"),
        tc("Cái tủ cũ xấu xí này gõ nghe cốc cốc, chắc nịch. Chốt!"),
        tc("Giờ cháu gõ thử cái ví của ông... nghe rỗng tuếch."),
        cd("Ví ông rỗng là vì mày vừa mua ba cái tủ!"),
      ],
    },
    explain:
      "Đồ gỗ mà gỗ tốt thì dùng được mấy chục năm, còn nước sơn đẹp đến đâu cũng có ngày bong. Ý câu là phẩm chất bên trong quan trọng hơn vẻ đẹp bên ngoài. Câu này dùng cho cả đồ vật lẫn con người.",
    example: {
      shot: "Hai bản CV đặt cạnh nhau: một bản màu mè, một bản trắng đen; bảng tiến độ dự án phía sau",
      lines: [
        cd("Như tuyển người vào nhóm, có bạn CV thiết kế lung linh, nhưng hạn nào cũng trễ."),
        cd("Có bạn CV một trang trắng đen, việc gì giao cũng xong. Làm lâu mới biết ai là gỗ."),
      ],
    },
    punchline: {
      shot: "TC mở ứng dụng hẹn hò, thay ảnh đại diện bằng tấm phim X-quang",
      lines: [
        tc("Vậy cháu xóa hết ảnh chỉnh sửa trên hồ sơ hẹn hò."),
        tc("Thay bằng một tấm ảnh chụp X-quang!"),
        cd("Ai bảo mày khoe xương?"),
        tc("Bên trong tốt mà ông!"),
      ],
    },
  }),

  makeEpisode({
    day: 30,
    week,
    theme: "Tổng kết",
    idiom: "Học ăn, học nói, học gói, học mở",
    meaning: "Cách ăn, cách nói, cách cư xử đều phải học dần; gói, mở còn là biết giữ ý, biết lúc nói lúc giữ kín.",
    question: "Trong 30 câu vừa qua, câu nào bạn từng hiểu sai lâu nhất?",
    hook: {
      shot: "TC ngồi giữa núi 30 hộp quà, vừa thắt nơ xong một hộp lại xé ra mở",
      lines: [tc("Ba mươi hộp quà gói xong rồi. Giờ cháu mở hết ra!")],
    },
    ask: "Gói xong lại mở, mày định làm thế đến bao giờ?",
    misread: {
      shot: "Nhanh từng cảnh: TC ăn hết nồi bánh chưng, nói liên tục, gói cả cái điều khiển ti vi, rồi mở hộp quà ghi tên CĐ",
      lines: [
        tc("Học ăn, cháu ăn hết nồi bánh chưng. Học nói, cháu nói từ sáng đến giờ."),
        tc("Học gói, cháu gói cả cái điều khiển ti vi."),
        tc("Học mở, cháu mở cả hộp quà sinh nhật của ông chưa đến ngày."),
        cd("Mở cả quà của ông thì ông còn bất ngờ gì nữa!"),
      ],
    },
    explain:
      "Gói, mở ở đây không chỉ là gói bánh, mở quà. Gói là biết giữ ý, chuyện cần kín thì giữ kín. Mở là biết lúc nào nên nói, nói sao cho phải. Cả câu ý là ăn ở, cư xử đều phải học dần, kể cả việc tưởng nhỏ.",
    example: {
      shot: "Montage nhanh các cảnh hay nhất của 29 tập trước, dừng ở CĐ và TC ngồi cạnh nhau",
      lines: [
        cd("Như biết chuyện riêng của bạn thì gói lại, đừng đưa lên nhóm chat. Thấy đồng nghiệp làm tốt thì mở lời khen."),
        cd("Ba mươi câu ông bà, gom lại cũng là học cách sống với nhau."),
      ],
    },
    punchline: {
      shot: "TC trao cho CĐ hộp quà cuối cùng; CĐ mở ra, rút một tờ hóa đơn dài",
      lines: [
        tc("Hộp cuối cùng, cháu gói tặng ông."),
        cd("Hóa đơn ba mươi hộp quà... ghi tên ông?!"),
        tc("Cháu học gói xong rồi. Phần trả tiền, ông học nhé!"),
      ],
    },
  }),
];
