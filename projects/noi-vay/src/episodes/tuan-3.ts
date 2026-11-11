import { cd, makeEpisode, tc } from "./make.ts";

const week = 3;
const theme = "Học hành, công việc, tiền bạc";

export const TUAN_3 = [
  makeEpisode({
    day: 15,
    week,
    theme,
    idiom: "Nước đến chân mới nhảy",
    meaning: "Chê thói chần chừ, việc để đến sát giờ chót mới cuống cuồng lo làm.",
    question: "Deadline nào bạn từng làm xong chỉ vài phút trước giờ nộp?",
    hook: {
      shot: "Phòng trọ, TC ngồi trên giường lướt điện thoại, hai chân thả hờ trên một xô nước đang được vòi nước rót dần",
      lines: [tc("Còn đúng 5 phân nữa thôi, nước chạm chân là cháu nhảy!")],
    },
    ask: "Mày ngồi canh cái xô nước làm gì thế?",
    misread: {
      shot: "TC nằm lướt điện thoại cạnh xô nước sắp tràn; nước vừa chạm ngón chân, TC bật dậy nhảy tưng tưng, nước bắn khắp phòng",
      lines: [
        tc("Ông bà dạy nước đến chân mới nhảy mà ông!"),
        tc("Nước chưa đến thì cháu cứ nằm lướt điện thoại, chạm chân một cái là bật như lò xo."),
        tc("Cháu còn cài báo thức: nước chạm ngón cái là nhạc nhảy tự bật!"),
        cd("Ngập cả phòng trọ rồi, chủ nhà sắp nhảy lên đây kìa!"),
      ],
    },
    explain:
      "Ngày xưa lũ dâng đến chân mới chạy thì đã muộn. Câu này chê thói chần chừ, việc gì cũng để sát nút mới cuống cuồng làm, nên vừa vội vừa dễ hỏng.",
    example: {
      shot: "Văn phòng tối om, đồng hồ chỉ 23 giờ 50 Chủ nhật, một người gõ máy tính cuống cuồng, biểu tượng wifi chập chờn",
      lines: [
        cd("Như sếp giao báo cáo từ thứ Hai, cả tuần cứ bảo còn sớm."),
        cd("Mười một giờ đêm Chủ nhật mới mở máy, đúng lúc wifi rớt, file lại chưa lưu!"),
      ],
    },
    punchline: {
      shot: "Sáng thứ Hai, TC đứng trong chậu, giơ tay ra hiệu cho bạn cùng phòng dội nguyên xô nước vào chân mình",
      lines: [
        tc("Cháu hiểu rồi, phải nhảy sớm!"),
        tc("Nên cháu nhờ bạn cùng phòng, cứ sáng thứ Hai là dội một xô vào chân cháu."),
        tc("Thế là tuần nào cháu cũng nhảy từ sớm ông ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 16,
    week,
    theme,
    idiom: "Muốn ăn hét phải đào giun",
    meaning: "Muốn hưởng thành quả thì phải chịu bỏ công sức, chuẩn bị từ trước.",
    question: "Thành quả nào bạn từng phải chuẩn bị rất lâu mới có được?",
    hook: {
      shot: "Ban công chung cư buổi tối, TC cầm xẻng nhỏ đào chậu hoa, rồi chúi đầu vào cái hố gào thật to",
      lines: [tc("Đào được con thứ ba rồi, giờ cháu được hét tiếp!")],
    },
    ask: "Đêm hôm mày đào chậu hoa rồi gào cái gì thế?",
    misread: {
      shot: "TC xếp từng con giun vào hộp, mỗi con lại cầm micro karaoke hét một câu; hàng xóm bên cạnh bịt tai, đèn các căn hộ lần lượt bật sáng",
      lines: [
        tc("Sách bảo muốn ăn hét phải đào giun. Cháu thèm hét cho đã!"),
        tc("Đào một con giun được hét một câu. Năm con là đủ cả bài karaoke!"),
        tc("Cháu còn tính xuống đào bồn hoa của tòa nhà, hét luôn cả album."),
        cd("Bảo vệ gọi lên ba lần rồi, ông cũng muốn hét theo đây!"),
      ],
    },
    explain:
      "Hét ở đây là con chim hét, lông đen, to hơn chim sáo và rất mê ăn giun. Muốn bẫy chim hét thì phải đào giun làm mồi trước. Ý là muốn có thành quả thì phải chịu bỏ công chuẩn bị.",
    example: {
      shot: "Một bạn trẻ mở laptop sửa CV, xem video luyện phỏng vấn, bên cạnh là tờ lịch dán chi chít ghi chú",
      lines: [
        cd("Như muốn vào được công ty mơ ước, phải sửa CV, luyện phỏng vấn, làm vài dự án nhỏ trước."),
        cd("Chứ gửi đúng một cái CV từ năm ngoái rồi ngồi chờ thì ai gọi!"),
      ],
    },
    punchline: {
      shot: "TC đứng ở quầy bưu điện, đặt lên bàn phong bì CV kèm một hộp nhựa có lỗ thở, bên trong lúc nhúc giun",
      lines: [
        tc("Cháu hiểu rồi, muốn có thì phải chuẩn bị mồi!"),
        tc("Nên cháu gửi CV kèm luôn một hộp giun tươi. Công ty nào mê giun là gọi cháu ngay!"),
        cd("Mày đi xin việc hay đi tuyển chim thế hả?"),
      ],
    },
  }),

  makeEpisode({
    day: 17,
    week,
    theme,
    idiom: "Đẽo cày giữa đường",
    meaning: "Chê người không có chủ kiến, ai bảo gì cũng nghe theo nên cuối cùng hỏng việc.",
    question: "Bạn từng sửa một bài làm theo góp ý của quá nhiều người đến mức hỏng chưa?",
    hook: {
      shot: "Hành lang khu trọ chật hẹp, TC kê ghế ngồi chính giữa, ôm khúc gỗ to cầm cái bào gỗ; hàng xóm xách xe đạp phải nghiêng người lách qua",
      lines: [tc("Mọi người đi vòng giúp cháu nhé, cháu đang làm nghề truyền thống!")],
    },
    ask: "Sao mày bày gỗ chắn hết lối đi thế này?",
    misread: {
      shot: "TC cầm thước dây đo hai bên tường, dịch khúc gỗ từng phân cho thật chính giữa; phía sau người xếp hàng chờ qua mỗi lúc một dài",
      lines: [
        tc("Ông bà dặn đẽo cày giữa đường mà ông! Đẽo trong phòng là sai bài."),
        tc("Cháu đo bằng thước hẳn hoi, lệch một phân là cháu dời ghế ngay."),
        tc("Chiều nay cháu chuyển ra giữa cầu thang, giữa hơn mà lại thoáng!"),
        cd("Cả khu trọ phải trèo qua khúc gỗ đi làm, ông xin mày đấy!"),
      ],
    },
    explain:
      "Đây là truyện ngụ ngôn. Anh chàng ngồi bên đường đẽo cày, ai đi qua góp ý gì cũng sửa theo, người bảo to, người bảo nhỏ. Cuối cùng khúc gỗ thành đồ vô dụng. Câu này chê người không có chủ kiến.",
    example: {
      shot: "Nhóm sinh viên trước màn hình slide thuyết trình, mỗi người chỉ một chỗ, slide đổi màu và đổi bố cục liên tục",
      lines: [
        cd("Như làm slide thuyết trình, nhóm trưởng bảo thêm chữ, bạn này bảo bớt chữ, bạn kia đòi đổi màu."),
        cd("Nghe hết thì sáng hôm nộp, slide thành ba kiểu đánh nhau. Góp ý thì nghe, nhưng phải tự chọn!"),
      ],
    },
    punchline: {
      shot: "TC đeo tai nghe chụp to, khoanh tay quay lưng lại, Cụ Đồ đứng sau phe phẩy quạt nói vọng vào",
      lines: [
        tc("Cháu hiểu rồi! Từ nay cháu có chủ kiến, không nghe ai cả."),
        cd("Ừ, nhưng góp ý đúng thì vẫn nên nghe."),
        tc("Cháu không nghe! Kể cả câu ông vừa nói!"),
      ],
    },
  }),

  makeEpisode({
    day: 18,
    week,
    theme,
    idiom: "Đầu voi đuôi chuột",
    meaning: "Việc mở đầu rầm rộ, hoành tráng nhưng kết thúc nhỏ bé hoặc bỏ dở giữa chừng.",
    question: "Kế hoạch đầu năm nào của bạn đang ở đoạn đuôi chuột?",
    hook: {
      shot: "TC áp điện thoại lên tai, nói rất nghiêm túc, phía sau là tấm ảnh shop thú cưng",
      lines: [tc("Alo shop ạ? Cho cháu một con đầu voi đuôi chuột, giao trong 2 giờ!")],
    },
    ask: "Mày đặt con gì mà nghe lạ thế?",
    misread: {
      shot: "TC ghép một cái đầu voi bằng thùng carton to tướng với sợi dây sạc làm đuôi; đầu voi chắn kín cửa phòng trọ, chỉ cái đuôi nằm lọt trong phòng",
      lines: [
        tc("Ông bà nói đầu voi đuôi chuột thì chắc phải có con này chứ ông!"),
        tc("Shop bảo hết hàng, nên cháu tự ghép: đầu voi bằng thùng carton, đuôi là sợi dây sạc."),
        tc("Có điều đầu to quá không lọt cửa, nên đầu ở ngoài ngõ, đuôi nằm trong phòng."),
        cd("Phòng trọ mười lăm mét vuông mà mày nuôi cả con voi, ông chịu!"),
      ],
    },
    explain:
      "Đây là lối so sánh: đầu to như voi, đuôi bé như chuột. Câu này chê việc mở đầu thì hoành tráng, rầm rộ, càng về sau càng nhỏ dần rồi bỏ dở giữa chừng.",
    example: {
      shot: "Bài đăng mạng xã hội 'Năm nay mình sẽ...' dài cả trang; ảnh tập gym tuần đầu, rồi tấm thẻ tập nằm trong ví, người nằm trên võng",
      lines: [
        cd("Như đầu năm đăng lên mạng: tập gym, học tiếng Anh, đọc năm mươi cuốn sách, mua hẳn thẻ tập một năm."),
        cd("Tuần đầu ngày nào cũng khoe ảnh. Sang tháng thứ hai, thẻ tập nằm trong ví, còn người nằm trên võng."),
      ],
    },
    punchline: {
      shot: "TC giơ tờ giấy ghi 'Mục tiêu năm nay: tập gym 1 buổi', mặt rạng rỡ như vừa giành giải",
      lines: [
        tc("Cháu hiểu rồi! Năm nay cháu chơi đầu chuột đuôi chuột."),
        tc("Mục tiêu cả năm: tập gym đúng một buổi. Đầu nhỏ đuôi nhỏ, không bao giờ bỏ dở!"),
      ],
    },
  }),

  makeEpisode({
    day: 19,
    week,
    theme,
    idiom: "Năng nhặt chặt bị",
    meaning: "Chăm chỉ góp nhặt từng chút nhỏ mỗi ngày thì lâu dần sẽ thành nhiều.",
    question: "Khoản tiết kiệm nhỏ mỗi ngày nào của bạn đã thành số tiền đáng kể?",
    hook: {
      shot: "TC ngồi đè lên một cái bị cói căng phồng, quấn dây thừng hết vòng này đến vòng khác, cắn răng siết thật mạnh",
      lines: [tc("Vòng thứ bảy rồi, thế này mới đúng chuẩn chặt bị!")],
    },
    ask: "Mày nhét cái gì vào mà buộc bảy vòng thế?",
    misread: {
      shot: "TC mở bị đổ ra cả núi đồ: túi nilon siêu thị, đũa dùng một lần, gói tương ớt, gói mẫu thử, móc treo quần áo",
      lines: [
        tc("Cháu thực hành năng nhặt chặt bị đấy ông! Cái gì miễn phí là cháu nhặt."),
        tc("Túi nilon siêu thị, đũa dùng một lần, gói tương ớt, mẫu thử dầu gội. Nhặt xong phải buộc bị thật chặt kẻo rơi!"),
        cd("Chặt bị là đầy chặt cái bị, chứ ai bảo mày buộc cho chặt!"),
      ],
    },
    explain:
      "Năng là chăm, thường xuyên. Bị là cái túi đan bằng cói ngày xưa, chặt bị là đầy ắp cả túi. Ý là chịu khó góp nhặt từng chút nhỏ mỗi ngày thì lâu dần sẽ thành nhiều.",
    example: {
      shot: "Màn hình ứng dụng ngân hàng, mỗi ngày một khoản 40 nghìn chuyển vào tài khoản tiết kiệm, số dư tăng dần qua từng tháng",
      lines: [
        cd("Như mỗi ngày bớt một cốc trà sữa bốn mươi nghìn, chuyển vào tài khoản tiết kiệm."),
        cd("Một năm được hơn mười bốn triệu, đủ một chuyến du lịch mà chẳng thấy xót!"),
      ],
    },
    punchline: {
      shot: "TC đập con heo đất, ôm đống tiền lẻ chạy thẳng ra quầy trà sữa, chỉ vào cốc size to nhất",
      lines: [
        tc("Cháu làm rồi! Mỗi ngày bỏ heo năm nghìn, hết tháng được trăm rưỡi."),
        tc("Thế là cháu đập heo mua ngay cốc trà sữa to nhất, thưởng cho sự kiên trì!"),
      ],
    },
  }),

  makeEpisode({
    day: 20,
    week,
    theme,
    idiom: "Vung tay quá trán",
    meaning: "Tiêu xài quá tay, vượt quá khả năng tài chính của mình.",
    question: "Đợt sale nào từng khiến bạn vung tay quá trán nhất?",
    hook: {
      shot: "TC đeo băng trán thể thao đứng trước gương, vung mạnh cánh tay lên rồi bốp một cái trúng ngay trán mình",
      lines: [tc("Ui da! Lần này quá trán chuẩn luôn!")],
    },
    ask: "Mày tự vả vào trán từ sáng đến giờ là sao?",
    misread: {
      shot: "TC dán một vạch kẻ trên trán; lần một vung tới mắt, lần hai qua trán, lần ba đứng nhón chân vung chạm cả bóng đèn trần, bóng đèn lắc lư",
      lines: [
        tc("Cháu luyện vung tay quá trán đấy ông. Tay phải vượt khỏi trán mới đạt!"),
        tc("Lúc đầu cháu vung ngang mắt, rồi ngang trán, giờ đã chạm được cả bóng đèn."),
        tc("Cháu còn mở lớp online, ai vung qua vạch trên trán là được cấp chứng chỉ!"),
        cd("Trán mày sưng như quả ổi rồi, tha cho nó đi con ơi!"),
      ],
    },
    explain:
      "Vung tay quá trán là vung quá đà, quá tầm của mình. Ông bà ví với chuyện tiêu tiền: chi tiêu vượt quá khả năng, kiếm được mười mà tiêu mười lăm.",
    example: {
      shot: "Màn hình giỏ hàng online dài vượt khung hình; giữa tháng quẹt thẻ tín dụng, cuối tháng ngồi húp mì gói nhìn lịch chờ lương",
      lines: [
        cd("Như lương mười triệu, đầu tháng thấy sale là bấm đặt liên tục, giỏ hàng kéo mãi không hết."),
        cd("Giữa tháng đã quẹt thẻ tín dụng, cuối tháng ăn mì gói chờ lương."),
      ],
    },
    punchline: {
      shot: "TC ngồi trước điện thoại, tay giơ thấp đúng tầm lông mày, bấm nút đặt hàng; giỏ hàng vẫn hiện số 20",
      lines: [
        tc("Cháu hiểu rồi! Từ nay mỗi lần bấm đặt hàng, cháu chỉ giơ tay đến lông mày thôi."),
        cd("Thế giỏ hàng còn bao nhiêu món?"),
        tc("Vẫn hai mươi món ạ, nhưng tư thế rất tiết kiệm!"),
      ],
    },
  }),

  makeEpisode({
    day: 21,
    week,
    theme,
    idiom: "Học thầy không tày học bạn",
    meaning: "Học thầy rất quý, nhưng học hỏi từ bạn bè, đồng nghiệp cũng gần gũi và hiệu quả không kém.",
    question: "Mẹo hay nhất bạn từng học được từ bạn bè hay đồng nghiệp là gì?",
    hook: {
      shot: "Văn phòng, TC ngồi sát cạnh một đồng nghiệp, mở cuốn sổ đề 'BÍ KÍP SƯ PHỤ', vừa liếc vừa ghi lia lịa",
      lines: [tc("Chín giờ mười lăm, sư phụ ngáp. Cháu ngáp theo!")],
    },
    ask: "Mày gọi đồng nghiệp là sư phụ rồi ngồi chép cái gì thế?",
    misread: {
      shot: "TC bắt chước y hệt đồng nghiệp: cùng cốc cà phê đen, giấu tám ngón tay vào túi để gõ phím bằng hai ngón, rồi đặt tờ đơn nghỉ phép lên bàn sếp ngay sau bạn",
      lines: [
        tc("Ông bà dạy học thầy không tày học bạn. Tày là gì cháu chưa rõ, nhưng học bạn thì phải giống hệt!"),
        tc("Bạn ấy gõ phím bằng hai ngón, cháu cũng giấu tám ngón vào túi."),
        tc("Hôm nay bạn ấy xin nghỉ phép, thế là cháu cũng xin nghỉ theo!"),
        cd("Học ai không học, mày học cả cái đơn nghỉ phép, ông chịu!"),
      ],
    },
    explain:
      "Tày nghĩa là bằng. Học từ bạn bè, đồng nghiệp rất quý vì gần gũi, hỏi nhiều cũng không ngại. Nhưng ông bà cũng dạy không thầy đố mày làm nên: học thầy để có nền, học bạn để hiểu sâu thêm.",
    example: {
      shot: "Nhân viên mới lúng túng trước bảng Excel; đồng nghiệp ngồi cạnh kéo ghế sang chỉ vài phím tắt, bảng tính chạy vèo vèo",
      lines: [
        cd("Như mới vào công ty, có hàm Excel không dám hỏi sếp."),
        cd("Đồng nghiệp ngồi cạnh chỉ năm phút, kèm mấy phím tắt, thế là cả tuần làm nhanh gấp đôi."),
      ],
    },
    punchline: {
      shot: "TC hớn hở giơ điện thoại khoe lời mời kết bạn đã được chấp nhận, rồi màn hình hiện liền một loạt tin nhắn giao việc",
      lines: [
        tc("Cháu tính rồi: học bạn hơn học thầy, nên cháu kết bạn với sếp luôn!"),
        cd("Thế sếp đồng ý chưa?"),
        tc("Dạ, sếp vừa chấp nhận kết bạn, rồi giao cho cháu gấp đôi việc!"),
      ],
    },
  }),
];
