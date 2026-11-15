/** Tuần 2 "Thiên Đường Kiến Thức": các bài toán cổ đại đo bằng công cụ thô sơ (tập 6 Thales có cảnh vẽ riêng). */
import { makeEpisode, nar } from "./make.ts";

const week = 2;
const theme = "Hình học cổ đại & Vũ trụ";

export const TUAN_2 = [
  makeEpisode({
    day: 6,
    week,
    theme,
    title: "Đo chiều cao Đại Kim Tự Tháp chỉ bằng một chiếc cọc",
    hudTitle: "ĐO KIM TỰ THÁP BẰNG MỘT CHIẾC CỌC",
    textbook: "Toán 8 · Định lý Thales",
    era: "Giza, Ai Cập · 600 TCN",
    question: "Hồi đi học, bạn có từng thắc mắc học Định lý Thales để làm gì ngoài đời thực không?",
    sources: [
      { title: "SGK Toán lớp 8 — Định lý Thales trong tam giác", url: "https://hanhtrangso.nxbgd.vn/" },
      { title: "Britannica — Thales of Miletus", url: "https://www.britannica.com/biography/Thales-of-Miletus" },
      { title: "MacTutor (ĐH St Andrews) — Thales of Miletus", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Thales/" },
    ],
    hook: {
      shot: "Sa mạc Giza năm 600 TCN, Đại kim tự tháp Cheops xoay 2.5D (câu 1); đường cao vàng và 'H = ?' hiện ra (câu 2); Milo (vai Thales) bước vào, cầm 1 chiếc cọc gỗ (câu 3)",
      lines: [
        nar(
          "Thử quay về Ai Cập 2.600 năm trước. Khi ấy, Đại kim tự tháp Cheops đã sừng sững giữa sa mạc như một ngọn núi nhân tạo suốt hai thiên niên kỷ.",
          "Thử quay về Ai Cập hai nghìn sáu trăm năm trước. Khi ấy, Đại kim tự tháp Kê-ốp đã sừng sững giữa sa mạc như một ngọn núi nhân tạo suốt hai thiên niên kỷ.",
        ),
        nar(
          "Nó cao đến mức đứng dưới chân, chẳng ai đo nổi bằng thước dây. Vậy rốt cuộc, nó cao bao nhiêu mét?",
          "Nó cao đến mức đứng dưới chân, chẳng ai đo nổi bằng thước dây. Vậy rốt cuộc, nó cao bao nhiêu mét?",
        ),
        nar(
          "Vậy mà nhà thông thái Hy Lạp Thales đã giải gọn bài toán ấy, chỉ với đúng một chiếc cọc gỗ. Bạn thử đoán xem, ông làm thế nào?",
          "Vậy mà nhà thông thái Hy Lạp Tha-lét đã giải gọn bài toán ấy, chỉ với đúng một chiếc cọc gỗ. Bạn thử đoán xem, ông làm thế nào?",
        ),
      ],
    },
    barrier: {
      shot: "Milo trèo lên đỉnh thả dây dọc sườn nghiêng (câu 1); dây hóa đỏ, đường cao H thẳng đứng hiện ra, dấu ✖ (câu 2); chuyển sang cắt lớp X-quang 2,3 triệu khối đá đè tâm đáy O, dấu ✖ (câu 3)",
      lines: [
        nar(
          "Cách đầu tiên ai cũng nghĩ tới là trèo lên đỉnh, thả một sợi dây thừng xuống đất, rồi đo sợi dây.",
          "Cách đầu tiên ai cũng nghĩ tới là trèo lên đỉnh, thả một sợi dây thừng xuống đất, rồi đo sợi dây.",
        ),
        nar(
          "Nghe thì hợp lý, nhưng sai ngay từ gốc. Mặt tháp vát nghiêng, nên sợi dây chỉ đo được sườn dốc, chứ không phải chiều cao thẳng đứng H.",
          "Nghe thì hợp lý, nhưng sai ngay từ gốc. Mặt tháp vát nghiêng, nên sợi dây chỉ đo được sườn dốc, chứ không phải chiều cao thẳng đứng hát.",
        ),
        nar(
          "Vậy đo thẳng từ đỉnh xuống tâm đáy thì sao? Cũng chịu thua, vì tâm đáy nằm sâu bên dưới 2,3 triệu tảng đá đặc quánh.",
          "Vậy đo thẳng từ đỉnh xuống tâm đáy thì sao? Cũng chịu thua, vì tâm đáy nằm sâu bên dưới hai phẩy ba triệu tảng đá đặc quánh.",
        ),
      ],
    },
    eureka: {
      shot: "Bóng kim tự tháp dài dần trên cát (câu 1); cọc cắm xuống, tia nắng Mặt Trời song song (câu 2); nắng nghiêng 45°, bóng cọc dài bằng cọc (câu 3); hạ mặt bằng đáy 230m ở Tầng 2B, cộng 115m + 31,6m = 146,6m (câu 4)",
      lines: [
        nar(
          "Đo trực tiếp kiểu gì cũng bế tắc. Thế là Thales thôi nhìn vào khối đá, và quay sang nhìn cái bóng của nó trên cát.",
          "Đo trực tiếp kiểu gì cũng bế tắc. Thế là Tha-lét thôi nhìn vào khối đá, và quay sang nhìn cái bóng của nó trên cát.",
        ),
        nar(
          "Rồi ông cắm một chiếc cọc thẳng đứng xuống cát. Vì Mặt Trời ở rất xa, mọi tia nắng chiếu xuống đều song song với nhau.",
          "Rồi ông cắm một chiếc cọc thẳng đứng xuống cát. Vì Mặt Trời ở rất xa, mọi tia nắng chiếu xuống đều song song với nhau.",
        ),
        nar(
          "Thales kiên nhẫn chờ đến lúc nắng nghiêng đúng 45°. Đó là khoảnh khắc cái bóng của chiếc cọc dài đúng bằng chính chiếc cọc!",
          "Tha-lét kiên nhẫn chờ đến lúc nắng nghiêng đúng bốn mươi lăm độ. Đó là khoảnh khắc cái bóng của chiếc cọc dài đúng bằng chính chiếc cọc!",
        ),
        nar(
          "Ngay lúc ấy, chiều cao kim tự tháp bằng nửa cạnh đáy, 115 mét, cộng với phần bóng nhô ra, 31,6 mét. Tức là 146,6 mét!",
          "Ngay lúc ấy, chiều cao kim tự tháp bằng nửa cạnh đáy, một trăm mười lăm mét, cộng với phần bóng nhô ra, ba mươi mốt mét sáu. Tức là một trăm bốn mươi sáu mét sáu!",
        ),
      ],
    },
    theorem: {
      shot: "Cắm cọc ở mút bóng tháp (câu 1); hai tam giác đồng dạng (tháp + bóng tháp, cọc + bóng cọc), cọc DE trượt về song song BC (câu 2); trang Toán 8 mở ra, công thức tỉ lệ ở Tầng 2B (câu 3)",
      lines: [
        nar(
          "Có điều, đâu phải ngày nào cũng chờ được nắng nghiêng đúng 45°. Theo nhà sử học Plutarch kể lại, Thales còn một cách khác. Cắm cọc ngay mút bóng tháp, rồi so hai cái bóng.",
          "Có điều, đâu phải ngày nào cũng chờ được nắng nghiêng đúng bốn mươi lăm độ. Theo nhà sử học Plu-tác kể lại, Tha-lét còn một cách khác. Cắm cọc ngay mút bóng tháp, rồi so hai cái bóng.",
        ),
        nar(
          "Tháp và cọc cùng đứng thẳng, tia nắng lại song song, nên ta có hai tam giác đồng dạng. Chiều cao tháp chia chiều cao cọc, đúng bằng bóng tháp chia bóng cọc.",
          "Tháp và cọc cùng đứng thẳng, tia nắng lại song song, nên ta có hai tam giác đồng dạng. Chiều cao tháp chia chiều cao cọc, đúng bằng bóng tháp chia bóng cọc.",
        ),
        nar(
          "Tỉ lệ ấy chính là Định lý Thales mà bạn từng học ở Toán lớp 8. Nhờ nó, giờ nào có nắng cũng đo được, chẳng cần chờ đợi!",
          "Tỉ lệ ấy chính là Định lý Tha-lét mà bạn từng học ở Toán lớp tám. Nhờ nó, giờ nào có nắng cũng đo được, chẳng cần chờ đợi!",
        ),
      ],
    },
    realworld: {
      shot: "Rừng rậm tối không có bóng nắng, Milo đội mũ kiểm lâm bối rối trước cây lim cổ thụ (câu 1); giơ thước ngắm chữ L tạo góc 45° lên ngọn cây, hiện khoảng cách d và chiều cao mắt (câu 2)",
      lines: [
        nar(
          "Nhưng nếu bạn đang đứng giữa một khu rừng rậm âm u, chẳng có lấy một vệt nắng, thì định lý này có bó tay không?",
          "Nhưng nếu bạn đang đứng giữa một khu rừng rậm âm u, chẳng có lấy một vệt nắng, thì định lý này có bó tay không?",
        ),
        nar(
          "Không hề! Người kiểm lâm ghép hai thanh gỗ bằng nhau thành chiếc thước chữ L, ngắm ngọn cây theo góc 45°. Đứng cách gốc bao xa, cộng thêm chiều cao ngang mắt, là ra chiều cao cây.",
          "Không hề! Người kiểm lâm ghép hai thanh gỗ bằng nhau thành chiếc thước chữ en lờ, ngắm ngọn cây theo góc bốn mươi lăm độ. Đứng cách gốc bao xa, cộng thêm chiều cao ngang mắt, là ra chiều cao cây.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Mặt Trăng quay quanh Trái Đất (câu 1), rồi Trái Đất – Mặt Trăng – Mặt Trời thẳng hàng trong Nhật thực toàn phần với tỉ lệ đồng dạng khoảng 1/400 (câu 2); kết: cảnh lùi xa, Thales đoán trước nhật thực, quay về chiếc cọc gỗ và cái bóng (câu 3)",
      lines: [
        nar(
          "Và đây mới là chỗ kỳ diệu nhất. Kéo dài những đường thẳng của Thales ra khỏi bầu khí quyển, bạn sẽ chạm tới bí mật của Nhật thực toàn phần.",
          "Và đây mới là chỗ kỳ diệu nhất. Kéo dài những đường thẳng của Tha-lét ra khỏi bầu khí quyển, bạn sẽ chạm tới bí mật của Nhật thực toàn phần.",
        ),
        nar(
          "Mặt Trời to gấp khoảng 400 lần Mặt Trăng, nhưng cũng ở xa Trái Đất hơn khoảng 400 lần. Hai tam giác đồng dạng khổng lồ ấy khiến Mặt Trăng che vừa khít Mặt Trời.",
          "Mặt Trời to gấp khoảng bốn trăm lần Mặt Trăng, nhưng cũng ở xa Trái Đất hơn khoảng bốn trăm lần. Hai tam giác đồng dạng khổng lồ ấy khiến Mặt Trăng che vừa khít Mặt Trời.",
        ),
        nar(
          "Theo sử gia Herodotus, Thales còn đoán trước được một lần nhật thực. Hóa ra muốn đo một kỳ quan, chẳng cần thang cao hay thước dài, chỉ cần một chiếc cọc gỗ, một cái bóng, và một cái đầu biết nhìn ra tỉ lệ.",
          "Theo sử gia Hê-rô-đốt, Tha-lét còn đoán trước được một lần nhật thực. Hóa ra muốn đo một kỳ quan, chẳng cần thang cao hay thước dài, chỉ cần một chiếc cọc gỗ, một cái bóng, và một cái đầu biết nhìn ra tỉ lệ.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 7,
    week,
    theme,
    title: "Đo chu vi Trái Đất 2.200 năm trước bằng một cái giếng và một chiếc cọc",
    hudTitle: "ĐO TRÁI ĐẤT BẰNG MỘT CHIẾC CỌC",
    textbook: "Toán 7 · Hai đường thẳng song song",
    era: "Alexandria, Ai Cập · khoảng 240 TCN",
    question: "Nếu Trái Đất to gấp đôi, bóng cọc ở Alexandria sẽ lệch nhiều hơn hay ít hơn 7,2°?",
    sources: [
      { title: "MacTutor (ĐH St Andrews) — Eratosthenes of Cyrene", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Eratosthenes/" },
      { title: "Strabo, Geography 17.1.48 — giếng ở Syene (LacusCurtius, ĐH Chicago)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/17A3*.html" },
      { title: "Ohio State University, Astronomy 161 — Eratosthenes measures the Earth", url: "https://www.astronomy.ohio-state.edu/~thompson/161/measearth.html" },
      { title: "Toán 7 Kết nối tri thức, Bài 10 — Tính chất hai đường thẳng song song (HĐ2 tr. 52)", url: "https://www.vietjack.com/toan-7-kn/hd2-trang-52-toan-7-tap-1.jsp" },
      { title: "NOAA — What is the difference between a nautical mile and a knot?", url: "https://oceanservice.noaa.gov/facts/nauticalmile_knot.html" },
      { title: "NASA — Sun Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html" },
      { title: "HISTORY — Magellan's expedition circumnavigates globe (1522)", url: "https://www.history.com/this-day-in-history/september-6/magellans-expedition-circumnavigates-globe" },
    ],
    hook: {
      shot: "Alexandria khoảng 240 TCN, Milo (vai Eratosthenes) đứng cạnh quả địa cầu có dấu hỏi, bên cạnh một cái giếng đá và một chiếc cọc đo bóng; câu cuối Milo chỉ tay xuống ô bình luận",
      lines: [
        nar(
          "Hơn 2.200 năm trước, người Hy Lạp đã biết Trái Đất hình cầu. Nhưng quả cầu ấy to cỡ nào?",
          "Hơn hai nghìn hai trăm năm trước, người Hy Lạp đã biết Trái Đất hình cầu. Nhưng quả cầu ấy to cỡ nào?",
        ),
        nar(
          "Và nhà bác học Eratosthenes đã đo được nó, mà chẳng cần bước chân ra khỏi Ai Cập.",
          "Và nhà bác học Ê-ra-tốt-xten đã đo được nó, mà chẳng cần bước chân ra khỏi Ai Cập.",
        ),
        nar(
          "Trong tay chỉ có một cái giếng, một chiếc cọc và một quãng đường. Bạn đoán ông làm cách nào? Ghi vào bình luận nhé!",
          "Trong tay chỉ có một cái giếng, một chiếc cọc và một quãng đường. Bạn đoán ông làm cách nào? Ghi vào bình luận nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Milo cầm cuộn dây định đi vòng quanh quả địa cầu, bị đại dương mênh mông chắn lối (✖); mốc thời gian 240 TCN → 1522 chạy qua",
      lines: [
        nar(
          "Muốn biết chu vi một quả cầu, cách dễ nghĩ nhất là đi trọn một vòng quanh nó rồi đo.",
          "Muốn biết chu vi một quả cầu, cách dễ nghĩ nhất là đi trọn một vòng quanh nó rồi đo.",
        ),
        nar(
          "Nhưng với Trái Đất thì không thể. Đại dương và những vùng đất chưa ai biết tới chắn hết mọi lối.",
          "Nhưng với Trái Đất thì không thể. Đại dương và những vùng đất chưa ai biết tới chắn hết mọi lối.",
        ),
        nar(
          "Phải gần 1.800 năm sau, tới năm 1522, đoàn thuyền của Magellan mới lần đầu đi hết một vòng.",
          "Phải gần một nghìn tám trăm năm sau, tới năm một nghìn năm trăm hai mươi hai, đoàn thuyền của Ma-gien-lăng mới lần đầu đi hết một vòng.",
        ),
      ],
    },
    eureka: {
      shot: "Trưa Hạ chí: ở Syene nắng rọi thẳng đáy giếng, cọc không bóng; ở Alexandria cọc đổ bóng, tia nắng lệch khỏi cọc 7,2° = 1/50 vòng tròn; các tia nắng vẽ song song",
      lines: [
        nar(
          "Eratosthenes chọn lối khác, chỉ đo một khúc nhỏ của vòng tròn ấy.",
          "Ê-ra-tốt-xten chọn lối khác, chỉ đo một khúc nhỏ của vòng tròn ấy.",
        ),
        nar(
          "Sách cổ chép rằng ở Syene, phía nam Ai Cập, trưa Hạ chí, nắng rọi thẳng đáy giếng, và chiếc cọc không hề có bóng.",
          "Sách cổ chép rằng ở Xi-ê-nê, phía nam Ai Cập, trưa Hạ chí, nắng rọi thẳng đáy giếng, và chiếc cọc không hề có bóng.",
        ),
        nar(
          "Cũng trưa hôm ấy, ở Alexandria, chiếc cọc vẫn đổ bóng. Tia nắng lệch khỏi cọc 1/50 vòng tròn, tức là 7,2°.",
          "Cũng trưa hôm ấy, ở A-lếch-xan-đri-a, chiếc cọc vẫn đổ bóng. Tia nắng lệch khỏi cọc một phần năm mươi vòng tròn, tức là bảy phẩy hai độ.",
        ),
        nar(
          "Vì sao vậy? Mặt Trời ở rất xa, nên tia nắng tới hai nơi song song. Bóng lệch chỉ vì mặt đất cong.",
          "Vì sao vậy? Mặt Trời ở rất xa, nên tia nắng tới hai nơi song song. Bóng lệch chỉ vì mặt đất cong.",
        ),
      ],
    },
    theorem: {
      shot: "Mặt cắt Trái Đất: kéo dài hai cọc gặp nhau ở tâm; tia nắng ở Alexandria song song đường cọc Syene, cọc Alexandria là cát tuyến, tô hai góc so le trong 7,2°; trang Toán 7 mở ra, 5.000 × 50 = 250.000 stadion; câu cuối: thước 39.000–46.000 km đặt cạnh mốc 40.000 km",
      lines: [
        nar(
          "Giờ kéo dài hai chiếc cọc, chúng gặp nhau ở tâm Trái Đất. Cọc ở Alexandria cắt hai đường song song, là tia nắng và đường cọc ở Syene.",
          "Giờ kéo dài hai chiếc cọc, chúng gặp nhau ở tâm Trái Đất. Cọc ở A-lếch-xan-đri-a cắt hai đường song song, là tia nắng, và đường cọc ở Xi-ê-nê.",
        ),
        nar(
          "Hai góc so le trong thì bằng nhau, nên góc ở tâm cũng là 7,2°. Đó chính là tính chất hai đường thẳng song song bạn học ở Toán lớp 7.",
          "Hai góc so le trong thì bằng nhau, nên góc ở tâm cũng là bảy phẩy hai độ. Đó chính là tính chất hai đường thẳng song song bạn học ở Toán lớp bảy.",
        ),
        nar(
          "Góc ấy bằng 1/50 vòng tròn. Vậy chu vi Trái Đất gấp 50 lần quãng 5.000 stadion từ Syene tới Alexandria, tức là 250.000 stadion.",
          "Góc ấy bằng một phần năm mươi vòng tròn. Vậy chu vi Trái Đất gấp năm mươi lần quãng năm nghìn xta-đi-ông từ Xi-ê-nê tới A-lếch-xan-đri-a, tức là hai trăm năm mươi nghìn xta-đi-ông.",
        ),
        nar(
          "Tùy một stadion dài 157 hay 185 mét, con số ấy cỡ 39.000 đến 46.000 km. Ngày nay ta đo được chừng 40.000 km.",
          "Tùy một xta-đi-ông dài một trăm năm mươi bảy hay một trăm tám mươi lăm mét, con số ấy cỡ ba mươi chín nghìn đến bốn mươi sáu nghìn ki lô mét. Ngày nay ta đo được chừng bốn mươi nghìn ki lô mét.",
        ),
      ],
    },
    realworld: {
      shot: "Milo trên tàu buồm ban đêm giơ thước đo góc ngắm sao Bắc Cực; tàu chạy về phía bắc, sao nhô cao thêm 1°, thước hải đồ ghi 111 km ≈ 60 hải lý",
      lines: [
        nar(
          "Người đi biển cũng dùng phép tính ấy, chỉ là theo chiều ngược lại. Ánh sao Bắc Cực tới tàu cũng song song như tia nắng.",
          "Người đi biển cũng dùng phép tính ấy, chỉ là theo chiều ngược lại. Ánh sao Bắc Cực tới tàu cũng song song như tia nắng.",
        ),
        nar(
          "Tàu chạy thẳng về phía bắc, cứ sao Bắc Cực nhô cao thêm 1°, là tàu đã đi thêm 1/360 vòng Trái Đất, khoảng 111 km.",
          "Tàu chạy thẳng về phía bắc, cứ sao Bắc Cực nhô cao thêm một độ, là tàu đã đi thêm một phần ba trăm sáu mươi vòng Trái Đất, khoảng một trăm mười một ki lô mét.",
        ),
        nar(
          "Cũng vì thế mà một hải lý, dài 1.852 mét, vốn được định bằng một phút góc vĩ độ.",
          "Cũng vì thế mà một hải lý, dài một nghìn tám trăm năm mươi hai mét, vốn được định bằng một phút góc vĩ độ.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: từ Trái Đất kẻ hai tia tới hai mép Mặt Trời cách 150 triệu km, góc 0,53°; vòng tròn bán kính 150 triệu km dài 940 triệu km; kết: quay về cái giếng không bóng và chiếc cọc có bóng",
      lines: [
        nar(
          "Cũng tỉ lệ giữa góc và cung ấy, ngày nay giúp ta đo cả Mặt Trời.",
          "Cũng tỉ lệ giữa góc và cung ấy, ngày nay giúp ta đo cả Mặt Trời.",
        ),
        nar(
          "Mặt Trời cách ta khoảng 150 triệu km. Trên bầu trời, nó chỉ chiếm chừng 0,53°, khoảng 1/675 vòng tròn.",
          "Mặt Trời cách ta khoảng một trăm năm mươi triệu ki lô mét. Trên bầu trời, nó chỉ chiếm chừng không phẩy năm mươi ba độ, khoảng một phần sáu trăm bảy mươi lăm vòng tròn.",
        ),
        nar(
          "Vòng tròn bán kính ấy dài khoảng 940 triệu km. Chia cho 675, Mặt Trời rộng gần 1,4 triệu km, khớp với số đo hiện đại.",
          "Vòng tròn bán kính ấy dài khoảng chín trăm bốn mươi triệu ki lô mét. Chia cho sáu trăm bảy mươi lăm, Mặt Trời rộng gần một phẩy bốn triệu ki lô mét, khớp với số đo hiện đại.",
        ),
        nar(
          "Tất cả bắt đầu từ một cái giếng không có bóng, một chiếc cọc có bóng, và một người biết đổi góc lệch thành quãng đường.",
          "Tất cả bắt đầu từ một cái giếng không có bóng, một chiếc cọc có bóng, và một người biết đổi góc lệch thành quãng đường.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 8,
    week,
    theme,
    title: "Sợi dây 12 nút, tấm bảng đất sét 3.600 năm & Định lý Pythagoras",
    hudTitle: "GÓC VUÔNG TỪ SỢI DÂY 12 NÚT",
    textbook: "Toán 8 · Định lý Pythagoras",
    era: "Sippar, Lưỡng Hà · 1900–1600 TCN",
    question: "Nếu hai cạnh góc tường dài 6 mét và 8 mét, đường chéo phải dài bao nhiêu mét thì góc ấy vuông?",
    sources: [
      { title: "UNSW Sydney — Australian mathematician reveals world's oldest example of applied geometry (tấm bảng Si.427)", url: "https://www.unsw.edu.au/news/2021/08/australian-mathematician-reveals-world-s-oldest-example-of-appli" },
      { title: "ScienceDaily — Mathematician reveals world's oldest example of applied geometry (Mansfield, Foundations of Science 2021)", url: "https://www.sciencedaily.com/releases/2021/08/210804123503.htm" },
      { title: "MacTutor (ĐH St Andrews) — Pythagoras of Samos", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Pythagoras/" },
      { title: "SGK Toán 8 Kết nối tri thức — Bài 35: Định lí Pythagore và ứng dụng (lý thuyết)", url: "https://vietjack.com/toan-8-kn/ly-thuyet-bai-35-dinh-li-pythagore-va-ung-dung.jsp" },
      { title: "JLC — Snapping Layout Lines for Walls (phương pháp 3-4-5)", url: "https://www.jlconline.com/Training-the-Trades/snapping-layout-lines-for-walls_o?o=1" },
      { title: "NASA — International Space Station (độ cao khoảng 250 dặm)", url: "https://www.nasa.gov/International%20Space%20Station/" },
      { title: "NASA NSSDC — Earth Fact Sheet (bán kính trung bình 6.371 km)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
    ],
    hook: {
      shot: "Câu 1–2: Milo cầm sợi dây 12 nút trước nền kim tự tháp, dấu hỏi lớn hiện trên sợi dây. Câu 3: cảnh lật sang một cánh đồng Lưỡng Hà rộng. Câu 4: hiện tấm bảng đất sét nhỏ vừa lòng bàn tay",
      lines: [
        nar(
          "Có lẽ bạn từng nghe rằng người Ai Cập cổ dùng một sợi dây thắt 12 nút để kẻ góc vuông cho kim tự tháp.",
          "Có lẽ bạn từng nghe rằng người Ai Cập cổ dùng một sợi dây thắt mười hai nút để kẻ góc vuông cho kim tự tháp.",
        ),
        nar(
          "Nghe hợp lý, nhưng đó chỉ là giả thuyết từ thế kỷ 19. Chưa có văn bản Ai Cập nào ghi lại cách ấy.",
          "Nghe hợp lý, nhưng đó chỉ là giả thuyết từ thế kỷ mười chín. Chưa có văn bản Ai Cập nào ghi lại cách ấy.",
        ),
        nar(
          "Còn bài toán thì có thật. Giữa một cánh đồng rộng, làm sao kẻ được góc vuông thật chuẩn?",
          "Còn bài toán thì có thật. Giữa một cánh đồng rộng, làm sao kẻ được góc vuông thật chuẩn?",
        ),
        nar(
          "Dấu vết lời giải nằm trên một tấm bảng đất sét hơn 3.600 năm tuổi.",
          "Dấu vết lời giải nằm trên một tấm bảng đất sét hơn ba nghìn sáu trăm năm tuổi.",
        ),
      ],
    },
    barrier: {
      shot: "Thành Sippar cổ: Câu 1: Milo vai người đo đất đứng giữa thửa ruộng. Câu 2: hàng chà là ở ranh giới. Câu 3: Milo nheo mắt ngắm góc rồi ướm góc viên gạch. Câu 4: đường ranh kéo dài 100 m lệch dần 1°, hở ra 1,75 m và một dải tam giác đỏ ~87 m² (✖)",
      lines: [
        nar(
          "Tấm bảng ấy đào được ở thành Sippar, nay thuộc Iraq. Đó là bản vẽ của một người đo đất khi chia lại ruộng.",
          "Tấm bảng ấy đào được ở thành Xíp-pa, nay thuộc I-rắc. Đó là bản vẽ của một người đo đất khi chia lại ruộng.",
        ),
        nar(
          "Thời ấy, đất là chuyện lớn. Một tấm bảng khác ghi vụ hai người quyền thế tranh chấp hàng chà là trên đường ranh.",
          "Thời ấy, đất là chuyện lớn. Một tấm bảng khác ghi vụ hai người quyền thế tranh chấp hàng chà là trên đường ranh.",
        ),
        nar(
          "Cách dễ nghĩ nhất là ngắm bằng mắt, hoặc ướm theo góc viên gạch.",
          "Cách dễ nghĩ nhất là ngắm bằng mắt, hoặc ướm theo góc viên gạch.",
        ),
        nar(
          "Thế nhưng chỉ lệch 1 độ thôi, cuối cạnh 100 mét đã hở gần 1,75 mét. Gần 90 mét vuông đất bị lấn mất!",
          "Thế nhưng chỉ lệch một độ thôi, cuối cạnh một trăm mét đã hở gần một mét bảy lăm. Gần chín mươi mét vuông đất bị lấn mất!",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: Milo bỏ việc ngắm góc, cầm dây đo độ dài. Câu 2–3: trên tấm bảng hiện hình chữ nhật cạnh 3 và 4 với đường chéo 5. Câu 4: Milo căng sợi dây 12 nút thành tam giác 3 – 4 – 5 khoảng nút, góc vuông sáng lên. Câu 5: phóng to thành 30 – 40 – 50 m",
      lines: [
        nar(
          "Người đo đất Babylon chọn một lối khác hẳn. Đừng đo góc, hãy đo độ dài, vì độ dài đo chính xác dễ hơn nhiều.",
          "Người đo đất Ba-bi-lon chọn một lối khác hẳn. Đừng đo góc, hãy đo độ dài, vì độ dài đo chính xác dễ hơn nhiều.",
        ),
        nar(
          "Theo Daniel Mansfield, nhà toán học đã giải mã tấm bảng, họ dùng những bộ ba số đặc biệt.",
          "Theo Đa-ni-en Men-phin, nhà toán học đã giải mã tấm bảng, họ dùng những bộ ba số đặc biệt.",
        ),
        nar(
          "Bộ đơn giản nhất là 3, 4, 5. Hình chữ nhật cạnh 3 và 4 thì đường chéo đúng bằng 5.",
          "Bộ đơn giản nhất là ba, bốn, năm. Hình chữ nhật cạnh ba và bốn thì đường chéo đúng bằng năm.",
        ),
        nar(
          "Bạn tự thử được với một sợi dây 12 nút cách đều. Căng thành tam giác 3, 4, 5 khoảng, và góc giữa cạnh 3 với cạnh 4 tự khắc vuông.",
          "Bạn tự thử được với một sợi dây mười hai nút cách đều. Căng thành tam giác ba, bốn, năm khoảng, và góc giữa cạnh ba với cạnh bốn tự khắc vuông.",
        ),
        nar(
          "Phóng lên thành 30, 40, 50 mét, dây lệch 5 phân thì góc chỉ sai khoảng 0,12 độ. Sai số nhỏ hơn ngắm bằng mắt tám lần.",
          "Phóng lên thành ba mươi, bốn mươi, năm mươi mét, dây lệch năm phân thì góc chỉ sai khoảng không phẩy mười hai độ. Sai số nhỏ hơn ngắm bằng mắt tám lần.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1–2: ba hình vuông dựng trên ba cạnh tam giác 3 – 4 – 5: 9 ô + 16 ô xếp vừa khít 25 ô. Câu 3–4: trang Toán 8 mở ra với Định lý Pythagoras đảo rồi thuận ở Tầng 2B",
      lines: [
        nar(
          "Vì sao bộ ba ấy lần nào cũng cho góc vuông? Thử bình phương từng số lên xem.",
          "Vì sao bộ ba ấy lần nào cũng cho góc vuông? Thử bình phương từng số lên xem.",
        ),
        nar(
          "3 bình phương là 9, 4 bình phương là 16. Cộng lại được 25, đúng bằng 5 bình phương.",
          "Ba bình phương là chín, bốn bình phương là mười sáu. Cộng lại được hai mươi lăm, đúng bằng năm bình phương.",
        ),
        nar(
          "Đó chính là Định lý Pythagoras đảo trong Toán lớp 8. Tam giác nào có bình phương một cạnh bằng tổng bình phương hai cạnh kia thì là tam giác vuông.",
          "Đó chính là Định lý Pi-ta-go đảo trong Toán lớp tám. Tam giác nào có bình phương một cạnh bằng tổng bình phương hai cạnh kia thì là tam giác vuông.",
        ),
        nar(
          "Chiều thuận thì nói tam giác vuông luôn có a² + b² = c². Định lý mang tên Pythagoras, dù nhà toán học này sinh sau tấm bảng hơn một nghìn năm.",
          "Chiều thuận thì nói tam giác vuông luôn có a bình phương cộng bê bình phương bằng xê bình phương. Định lý mang tên Pi-ta-go, dù nhà toán học này sinh sau tấm bảng hơn một nghìn năm.",
        ),
      ],
    },
    realworld: {
      shot: "Công trường hiện đại: Câu 1–2: Milo đội mũ bảo hộ, căng thước dây 3 m và 4 m dọc hai đường tường. Câu 3: kéo thước chéo đúng 5 m; bên cạnh hiện các bội 6 – 8 – 10 và 9 – 12 – 15 m cho tường dài",
      lines: [
        nar(
          "Mẹo cổ ấy vẫn sống khỏe trên công trường hôm nay.",
          "Mẹo cổ ấy vẫn sống khỏe trên công trường hôm nay.",
        ),
        nar(
          "Muốn góc tường vuông, thợ xây đo một cạnh 3 mét, cạnh kia 4 mét, rồi kéo thước nối hai vạch.",
          "Muốn góc tường vuông, thợ xây đo một cạnh ba mét, cạnh kia bốn mét, rồi kéo thước nối hai vạch.",
        ),
        nar(
          "Đường chéo đúng 5 mét là góc đã vuông. Tường dài thì nhân lên thành 6, 8, 10 hay 9, 12, 15 mét.",
          "Đường chéo đúng năm mét là góc đã vuông. Tường dài thì nhân lên thành sáu, tám, mười hay chín, mười hai, mười lăm mét.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Câu 1: trạm vũ trụ quốc tế cao ~400 km nhìn về chân trời. Câu 2: tia nhìn sượt mép Trái Đất, ô vuông nhỏ đánh dấu góc vuông giữa tia nhìn và bán kính 6.371 km; cạnh huyền 6.771 km. Câu 3: hiện kết quả ~2.300 km. Câu 4: cảnh thu về tấm bảng đất sét và sợi dây 12 nút căng thành tam giác 3 – 4 – 5",
      lines: [
        nar(
          "Chiều thuận thì giúp tính những khoảng cách không sợi dây nào với tới. Từ trạm vũ trụ quốc tế, cao khoảng 400 km, chân trời cách bạn bao xa?",
          "Chiều thuận thì giúp tính những khoảng cách không sợi dây nào với tới. Từ trạm vũ trụ quốc tế, cao khoảng bốn trăm ki-lô-mét, chân trời cách bạn bao xa?",
        ),
        nar(
          "Tia nhìn sượt qua mép Trái Đất vuông góc với bán kính 6.371 km. Cạnh huyền là bán kính cộng 400 km. Một tam giác vuông khổng lồ!",
          "Tia nhìn sượt qua mép Trái Đất vuông góc với bán kính sáu nghìn ba trăm bảy mốt ki-lô-mét. Cạnh huyền là bán kính cộng bốn trăm ki-lô-mét. Một tam giác vuông khổng lồ!",
        ),
        nar(
          "Lấy 6.771 bình phương trừ 6.371 bình phương rồi khai căn, chân trời xa khoảng 2.300 km.",
          "Lấy sáu nghìn bảy trăm bảy mốt bình phương trừ sáu nghìn ba trăm bảy mốt bình phương rồi khai căn, chân trời xa khoảng hai nghìn ba trăm ki-lô-mét.",
        ),
        nar(
          "Một tầm nhìn từ quỹ đạo, khởi đầu từ tấm bảng đất sét và sợi dây 12 nút căng thành 3, 4, 5.",
          "Một tầm nhìn từ quỹ đạo, khởi đầu từ tấm bảng đất sét và sợi dây mười hai nút căng thành ba, bốn, năm.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 9,
    week,
    theme,
    title: "Đào hầm xuyên núi từ hai đầu — Làm sao hai đội gặp nhau giữa lòng đá?",
    hudTitle: "ĐÀO HẦM XUYÊN NÚI TỪ HAI ĐẦU",
    textbook: "Toán 10 · Định lý côsin & Định lý sin",
    era: "Đảo Samos, Hy Lạp · thế kỷ 6 TCN",
    question: "Đứng ở cửa hầm A, muốn biết hướng đào, bạn cần đo những gì ngoài trời?",
    sources: [
      { title: "Tom M. Apostol — The Tunnel of Samos, Engineering & Science (Caltech), 2004", url: "https://calteches.library.caltech.edu/689/2/Samos.pdf" },
      { title: "Toán 10 Kết nối tri thức — Bài 6. Hệ thức lượng trong tam giác (có Bài 3.11 đường hầm xuyên núi)", url: "https://loigiaihay.com/bai-6-he-thuc-luong-trong-tam-giac-toan-10-ket-noi-tri-thuc-e24966.html" },
      { title: "Les Bâtisseurs du Tunnel sous la Manche — Jonctions et percée (1/12/1990)", url: "https://batisseurs-tunnel.com/?p=3845" },
      { title: "MacTutor (ĐH St Andrews) — Nicolas Louis de Lacaille", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Lacaille/" },
      { title: "MacTutor (ĐH St Andrews) — Joseph-Jérôme Lefrançais de Lalande", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Lalande/" },
    ],
    hook: {
      shot: "Đảo Samos thế kỷ 6 TCN, mặt cắt núi đá vôi. Câu 1: Milo (vai Eupalinos) đứng trước núi. Câu 2: hai đội thợ cầm cuốc, búa, đục ở hai cửa hầm A và B. Câu 3–4: hai mũi hầm tiến vào lòng núi tối, Milo đứng giữa nhìn theo, dấu hỏi lớn",
      lines: [
        nar(
          "Hơn 2.500 năm trước, trên đảo Samos của Hy Lạp, kỹ sư Eupalinos phải đục một đường hầm dẫn nước dài hơn 1 km xuyên lòng núi đá vôi.",
          "Hơn hai nghìn năm trăm năm trước, trên đảo Xa-mốt của Hy Lạp, kỹ sư Ơ-pa-li-nốt phải đục một đường hầm dẫn nước dài hơn một ki-lô-mét xuyên lòng núi đá vôi.",
        ),
        nar(
          "Hai đội thợ đục cùng lúc từ hai phía núi, trong tay chỉ có cuốc, búa và đục.",
          "Hai đội thợ đục cùng lúc từ hai phía núi, trong tay chỉ có cuốc, búa và đục.",
        ),
        nar(
          "Giữa lòng đá tối om, không đội nào nhìn thấy đội kia. Vậy làm sao họ biết phải đào hướng nào để gặp nhau?",
          "Giữa lòng đá tối om, không đội nào nhìn thấy đội kia. Vậy làm sao họ biết phải đào hướng nào để gặp nhau?",
        ),
        nar(
          "Nếu đứng ở cửa hầm, bạn sẽ đo những gì? Nghĩ thử trước khi xem tiếp nhé.",
          "Nếu đứng ở cửa hầm, bạn sẽ đo những gì? Nghĩ thử trước khi xem tiếp nhé.",
        ),
      ],
    },
    barrier: {
      shot: "Câu 1: hai đội nhắm chừng mà đào. Câu 2: hai mũi hầm rộng 2 m; mũi phía Bắc lệch 1° so với đường đúng, sau khoảng 500 m hai đầu hầm cách nhau khoảng 9 m và trượt qua nhau (✖). Câu 3: chiếc la bàn bị gạch chéo (✖)",
      lines: [
        nar(
          "Cách dễ nghĩ nhất là mỗi đội cứ nhắm chừng về phía bên kia núi mà đào. Nghe thì ổn, cho tới khi bạn tính thử.",
          "Cách dễ nghĩ nhất là mỗi đội cứ nhắm chừng về phía bên kia núi mà đào. Nghe thì ổn, cho tới khi bạn tính thử.",
        ),
        nar(
          "Hầm chỉ rộng chừng 2 mét. Một đội lệch 1 độ thôi, sau khoảng 500 mét đã trượt xa chừng 9 mét. Thế là thành hai cái hang cụt.",
          "Hầm chỉ rộng chừng hai mét. Một đội lệch một độ thôi, sau khoảng năm trăm mét đã trượt xa chừng chín mét. Thế là thành hai cái hang cụt.",
        ),
        nar(
          "Dùng la bàn ư? Người Hy Lạp thời ấy chưa có. Mà kể cả có, bạn vẫn phải biết cửa bên kia nằm ở hướng nào.",
          "Dùng la bàn ư? Người Hy Lạp thời ấy chưa có. Mà kể cả có, bạn vẫn phải biết cửa bên kia nằm ở hướng nào.",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: mặt cắt núi, dấu hỏi trên hầm Eupalinos. Câu 2: Milo (vai Heron) xuất hiện. Câu 3: nhìn từ trên cao, Milo đi vòng chân núi từ cửa A sang cửa B theo những đoạn Đông–Tây, Bắc–Nam vuông góc; cộng lại thành hai cạnh góc vuông, cạnh huyền AB xuyên núi chính là đường hầm. Câu 4: hai tam giác nhỏ cùng hình dạng cắm cọc ở hai cửa",
      lines: [
        nar(
          "Vậy Eupalinos đã làm thế nào? Thật ra không ai biết chắc, vì không còn ghi chép nào về cách làm.",
          "Vậy Ơ-pa-li-nốt đã làm thế nào? Thật ra không ai biết chắc, vì không còn ghi chép nào về cách làm.",
        ),
        nar(
          "Khoảng 500 năm sau, kỹ sư Heron ở Alexandria mới viết ra một lời giải. Ý tưởng gọn đến bất ngờ. Không nhìn xuyên núi được, thì đi vòng quanh núi.",
          "Khoảng năm trăm năm sau, kỹ sư Hê-rông ở A-lếch-xan-đri-a mới viết ra một lời giải. Ý tưởng gọn đến bất ngờ. Không nhìn xuyên núi được, thì đi vòng quanh núi.",
        ),
        nar(
          "Đi từ cửa A sang cửa B, bạn cộng dồn các quãng theo hướng Đông Tây và Bắc Nam. Thế là có hai cạnh góc vuông, còn cạnh huyền chính là đường hầm.",
          "Đi từ cửa a sang cửa bê, bạn cộng dồn các quãng theo hướng Đông Tây và Bắc Nam. Thế là có hai cạnh góc vuông, còn cạnh huyền chính là đường hầm.",
        ),
        nar(
          "Dựng ở mỗi cửa một tam giác nhỏ cùng hình dạng, và mỗi đội có một hàng cọc chỉ đúng hướng đào.",
          "Dựng ở mỗi cửa một tam giác nhỏ cùng hình dạng, và mỗi đội có một hàng cọc chỉ đúng hướng đào.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1: tam giác vuông của Heron biến thành tam giác ABC bất kỳ, mốc C trên sườn núi nhìn thấy cả hai cửa A, B. Câu 2: đo CA, CB và góc C, hiện công thức định lý côsin tính AB. Câu 3: định lý sin tính góc A, mũi tên hướng đào. Câu 4: trang Toán 10 mở ra",
      lines: [
        nar(
          "Thế nhưng đi vòng toàn góc vuông vừa mệt vừa dễ sai. Hóa ra tam giác chẳng cần vuông, chỉ cần một mốc C nhìn thấy cả hai cửa A và B.",
          "Thế nhưng đi vòng toàn góc vuông vừa mệt vừa dễ sai. Hóa ra tam giác chẳng cần vuông, chỉ cần một mốc xê nhìn thấy cả hai cửa a và bê.",
        ),
        nar(
          "Đo hai cạnh CA, CB và góc C xen giữa. AB bình phương bằng CA bình phương cộng CB bình phương, trừ hai lần CA nhân CB nhân côsin C.",
          "Đo hai cạnh xê a, xê bê và góc xê xen giữa. A bê bình phương bằng xê a bình phương cộng xê bê bình phương, trừ hai lần xê a nhân xê bê nhân cô-sin xê.",
        ),
        nar(
          "Có AB rồi, tỉ số giữa mỗi cạnh và sin góc đối diện cho ra góc A. Đó chính là hướng mũi đào so với đường ngắm AC.",
          "Có a bê rồi, tỉ số giữa mỗi cạnh và sin góc đối diện cho ra góc a. Đó chính là hướng mũi đào so với đường ngắm a xê.",
        ),
        nar(
          "Hai công cụ ấy là Định lý côsin và Định lý sin trong Toán lớp 10, nơi có hẳn một bài tập về đường hầm xuyên núi.",
          "Hai công cụ ấy là Định lý cô-sin và Định lý sin trong Toán lớp mười, nơi có hẳn một bài tập về đường hầm xuyên núi.",
        ),
      ],
    },
    realworld: {
      shot: "Mặt cắt eo biển Manche: Câu 1: hai máy khoan từ bờ Anh và bờ Pháp tiến vào dưới đáy biển. Câu 2: trên mặt đất, lưới tam giác đo đạc nối mốc hai bờ, vệ tinh phía trên. Câu 3: hai mũi hầm dịch vụ gặp nhau năm 1990",
      lines: [
        nar(
          "Bài toán ấy chưa bao giờ cũ. Đường hầm dưới eo biển Manche nối Anh và Pháp cũng được đào từ hai phía, với gần 38 km nằm dưới đáy biển.",
          "Bài toán ấy chưa bao giờ cũ. Đường hầm dưới eo biển Măng-sơ nối Anh và Pháp cũng được đào từ hai phía, với gần ba mươi tám ki-lô-mét nằm dưới đáy biển.",
        ),
        nar(
          "Trước khi đào, người ta nối mốc đo hai bờ vào cùng một lưới tam giác, có vệ tinh hỗ trợ, rồi tính hướng cho từng máy.",
          "Trước khi đào, người ta nối mốc đo hai bờ vào cùng một lưới tam giác, có vệ tinh hỗ trợ, rồi tính hướng cho từng máy.",
        ),
        nar(
          "Năm 1990, hai mũi hầm dịch vụ gặp nhau. Độ lệch chỉ vài chục xen-ti-mét.",
          "Năm một nghìn chín trăm chín mươi, hai mũi hầm dịch vụ gặp nhau. Độ lệch chỉ vài chục xen-ti-mét.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Câu 1: Mặt Trăng xa tít phía trên. Câu 2: Berlin và Mũi Hảo Vọng là hai đầu cạnh đáy gần 10.000 km. Câu 3: hai tia ngắm cùng chụm vào Mặt Trăng thành một tam giác khổng lồ. Câu 4: quay về hai đội thợ Samos gặp nhau trong lòng núi",
      lines: [
        nar(
          "Còn nếu đích đến là Mặt Trăng, nơi không sợi thước dây nào kéo tới được, thì sao?",
          "Còn nếu đích đến là Mặt Trăng, nơi không sợi thước dây nào kéo tới được, thì sao?",
        ),
        nar(
          "Từ năm 1751, Lacaille ở Mũi Hảo Vọng và Lalande ở Berlin cùng ngắm Mặt Trăng. Hai nơi cách nhau gần 10.000 km.",
          "Từ năm một nghìn bảy trăm năm mươi mốt, La-cai ở Mũi Hảo Vọng và La-lăng ở Béc-lin cùng ngắm Mặt Trăng. Hai nơi cách nhau gần mười nghìn ki-lô-mét.",
        ),
        nar(
          "Biết cạnh đáy và hai góc ngắm ở hai đầu, định lý sin cho ra khoảng cách tới Mặt Trăng. Vẫn là cách tìm hướng hầm năm xưa.",
          "Biết cạnh đáy và hai góc ngắm ở hai đầu, định lý sin cho ra khoảng cách tới Mặt Trăng. Vẫn là cách tìm hướng hầm năm xưa.",
        ),
        nar(
          "Hai đội thợ Samos gặp nhau giữa lòng núi tối om. Không phải nhờ đôi mắt nhìn xuyên đá, mà nhờ một tam giác vẽ bên ngoài núi.",
          "Hai đội thợ Xa-mốt gặp nhau giữa lòng núi tối om. Không phải nhờ đôi mắt nhìn xuyên đá, mà nhờ một tam giác vẽ bên ngoài núi.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 10,
    week,
    theme,
    title: "Chiếc vương miện vàng & Lực đẩy Archimedes",
    hudTitle: "VƯƠNG MIỆN VÀNG CÓ PHA BẠC KHÔNG?",
    textbook: "KHTN 8 · Lực đẩy Archimedes",
    era: "Syracuse, đảo Sicily · khoảng 250 TCN",
    question: "Cùng nặng 1 kg, khi nhúng vào nước, thỏi vàng ròng hay vương miện pha bạc bị nước đẩy lên mạnh hơn?",
    sources: [
      { title: "SGK KHTN 8 Kết nối tri thức — Bài 17. Lực đẩy Archimedes", url: "https://loigiaihay.com/giai-khoa-hoc-tu-nhien-8-bai-17-luc-day-archimedes-trang-73-74-75-ket-noi-tri-thuc-a135334.html" },
      { title: "Vitruvius, De Architectura, Quyển IX — chuyện vương miện (C. Rorres, ĐH New York)", url: "https://www.math.nyu.edu/~crorres/Archimedes/Crown/Vitruvius.html" },
      { title: "Galileo, La Bilancetta (1586) — phương pháp cân trong nước (C. Rorres, ĐH New York)", url: "https://www.math.nyu.edu/~crorres/Archimedes/Crown/bilancetta.html" },
      { title: "The Golden Crown — tính chênh mực nước và chênh cân (C. Rorres, ĐH New York)", url: "https://www.math.nyu.edu/~crorres/Archimedes/Crown/CrownIntro.html" },
      { title: "MacTutor (ĐH St Andrews) — Archimedes of Syracuse", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Archimedes/" },
      { title: "SAGE Encyclopedia of Obesity — Hydrodensitometry", url: "https://sk.sagepub.com/ency/edvol/embed/obesity/chpt/hydrodensitometry" },
      { title: "NASA Science — Saturn Facts", url: "https://science.nasa.gov/saturn/facts/" },
      { title: "NASA NSSDC — Saturn Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturnfact.html" },
    ],
    hook: {
      shot: "Cung điện Syracuse thế kỷ 3 TCN, vua Hiero II cầm chiếc vương miện lá vàng, người thợ kim hoàn khúm núm (câu 1–2); Milo (vai Archimedes) được gọi tới, dấu hỏi lớn trên vương miện (câu 3–4)",
      lines: [
        nar(
          "Hơn 2.200 năm trước, theo lời Vitruvius kể lại, vua Hiero II của thành Syracuse đặt thợ làm một chiếc vương miện vàng ròng để dâng thần.",
          "Hơn hai nghìn hai trăm năm trước, theo lời Vi-tơ-ru-vi-út kể lại, vua Hi-ê-rông thứ hai của thành Xi-ra-cút đặt thợ làm một chiếc vương miện vàng ròng để dâng thần.",
        ),
        nar(
          "Vương miện giao tới nặng đủ cân. Thế nhưng có lời tố rằng người thợ đã lén bớt vàng, và bù vào đúng chừng ấy bạc.",
          "Vương miện giao tới nặng đủ cân. Thế nhưng có lời tố rằng người thợ đã lén bớt vàng, và bù vào đúng chừng ấy bạc.",
        ),
        nar(
          "Nhà vua giao cho Archimedes vạch trần chuyện này. Có điều, đồ dâng thần thì không được nấu chảy, cũng chẳng được cưa ra.",
          "Nhà vua giao cho Ác-si-mét vạch trần chuyện này. Có điều, đồ dâng thần thì không được nấu chảy, cũng chẳng được cưa ra.",
        ),
        nar(
          "Vậy làm sao biết bên trong có bạc? Nếu là bạn, bạn sẽ làm gì?",
          "Vậy làm sao biết bên trong có bạc? Nếu là bạn, bạn sẽ làm gì?",
        ),
      ],
    },
    barrier: {
      shot: "Cân khô hai bên bằng nhau tăm tắp (✖) ở câu 1; hai khối cùng nặng, khối bạc to gần gấp đôi khối vàng ở câu 2; cây thước bất lực trước những chiếc lá vàng uốn lượn (✖) ở câu 3",
      lines: [
        nar(
          "Ai cũng nghĩ ngay tới cái cân. Nhưng vô ích, vì bớt bao nhiêu gam vàng thì bù bấy nhiêu gam bạc, cân nặng vẫn y như cũ.",
          "Ai cũng nghĩ ngay tới cái cân. Nhưng vô ích, vì bớt bao nhiêu gam vàng thì bù bấy nhiêu gam bạc, cân nặng vẫn y như cũ.",
        ),
        nar(
          "Chỗ khác nhau nằm ở độ to. Cùng một khối, bạc chỉ nặng chừng nửa vàng, nên cùng cân nặng, vương miện pha bạc phải to hơn.",
          "Chỗ khác nhau nằm ở độ to. Cùng một khối, bạc chỉ nặng chừng nửa vàng, nên cùng cân nặng, vương miện pha bạc phải to hơn.",
        ),
        nar(
          "Vậy thì đo thể tích? Khổ nỗi, với hàng chục chiếc lá vàng chạm khắc uốn lượn, chẳng cây thước nào đo nổi.",
          "Vậy thì đo thể tích? Khổ nỗi, với hàng chục chiếc lá vàng chạm khắc uốn lượn, chẳng cây thước nào đo nổi.",
        ),
      ],
    },
    eureka: {
      shot: "Bồn tắm nước tràn, Milo reo EUREKA (câu 1); bình nước rộng 20 cm chỉ dâng chênh 0,4 mm, soi kính lúp (câu 2); cân đòn treo vương miện và thỏi vàng cùng 1 kg, nhúng vào chậu nước (câu 3); cán cân nghiêng về phía thỏi vàng, nhãn 13 g (câu 4)",
      lines: [
        nar(
          "Tương truyền, lời giải đến ngay trong bồn tắm. Archimedes thấy người chìm xuống bao nhiêu thì nước tràn ra bấy nhiêu, và reo lên, Eureka, tìm ra rồi!",
          "Tương truyền, lời giải đến ngay trong bồn tắm. Ác-si-mét thấy người chìm xuống bao nhiêu thì nước tràn ra bấy nhiêu, và reo lên, Ơ-rê-ca, tìm ra rồi!",
        ),
        nar(
          "Nghe thì gọn, nhưng đong nước tràn lại rất khó. Giả sử vương miện 1 kg bị tráo 300 g bạc, nước trong bình rộng 20 cm chỉ dâng thêm chừng 0,4 mm.",
          "Nghe thì gọn, nhưng đong nước tràn lại rất khó. Giả sử vương miện một ki-lô-gam bị tráo ba trăm gam bạc, nước trong bình rộng hai mươi xen-ti-mét chỉ dâng thêm chừng không phẩy bốn mi-li-mét.",
        ),
        nar(
          "Năm 1586, Galileo cho rằng Archimedes đã dùng một chiếc cân. Treo vương miện ở một đầu, thỏi vàng nặng y hệt ở đầu kia, rồi nhúng cả hai vào nước.",
          "Năm một nghìn năm trăm tám mươi sáu, Ga-li-lê cho rằng Ác-si-mét đã dùng một chiếc cân. Treo vương miện ở một đầu, thỏi vàng nặng y hệt ở đầu kia, rồi nhúng cả hai vào nước.",
        ),
        nar(
          "Cân lập tức nghiêng về phía thỏi vàng, chênh khoảng 13 gam, nhìn là thấy. Vương miện to hơn, nên bị nước đẩy lên mạnh hơn. Nó có pha bạc!",
          "Cân lập tức nghiêng về phía thỏi vàng, chênh khoảng mười ba gam, nhìn là thấy. Vương miện to hơn, nên bị nước đẩy lên mạnh hơn. Nó có pha bạc!",
        ),
      ],
    },
    theorem: {
      shot: "Cận cảnh chậu nước: mũi tên lực đẩy hướng lên dưới vương miện dài hơn dưới thỏi vàng (câu 1); khối nước 13 cm³ tách ra đặt lên đĩa cân 13 g (câu 2); trang KHTN 8 mở ra, công thức FA = d · V (câu 3)",
      lines: [
        nar(
          "Vì sao nước lại thiên vị như thế? Bởi vật chìm trong nước luôn bị đẩy lên một lực, bằng đúng trọng lượng phần nước mà nó chiếm chỗ.",
          "Vì sao nước lại thiên vị như thế? Bởi vật chìm trong nước luôn bị đẩy lên một lực, bằng đúng trọng lượng phần nước mà nó chiếm chỗ.",
        ),
        nar(
          "Vương miện chiếm chỗ nhiều hơn thỏi vàng khoảng 13 cm³ nước. Thế là nó được nâng thêm đúng sức nặng của 13 gam nước.",
          "Vương miện chiếm chỗ nhiều hơn thỏi vàng khoảng mười ba xen-ti-mét khối nước. Thế là nó được nâng thêm đúng sức nặng của mười ba gam nước.",
        ),
        nar(
          "Lực ấy chính là Lực đẩy Archimedes, FA = d · V, mà bạn học trong Khoa học tự nhiên lớp 8. Vật chiếm chỗ càng nhiều, càng bị đẩy mạnh.",
          "Lực ấy chính là Lực đẩy Ác-si-mét, ép a bằng đê nhân vê, mà bạn học trong Khoa học tự nhiên lớp tám. Vật chiếm chỗ càng nhiều, càng bị đẩy mạnh.",
        ),
      ],
    },
    realworld: {
      shot: "Phòng thí nghiệm thể thao: Milo (vai kỹ thuật viên) cân một vận động viên trên cạn, rồi cân khi người đó ngồi ghế treo chìm hẳn trong bể nước (câu 1–2); hai khối cùng nặng, khối mỡ to hơn khối cơ (câu 3)",
      lines: [
        nar(
          "Mẹo cân trong nước ấy đến nay vẫn được dùng, để đo tỉ lệ mỡ cơ thể. Người ta gọi là cân thủy tĩnh.",
          "Mẹo cân trong nước ấy đến nay vẫn được dùng, để đo tỉ lệ mỡ cơ thể. Người ta gọi là cân thủy tĩnh.",
        ),
        nar(
          "Bạn được cân trên cạn, rồi cân lại khi ngồi chìm hẳn trong bể nước. Hai lần cân chênh nhau bao nhiêu, nước đã bị chiếm chỗ bấy nhiêu.",
          "Bạn được cân trên cạn, rồi cân lại khi ngồi chìm hẳn trong bể nước. Hai lần cân chênh nhau bao nhiêu, nước đã bị chiếm chỗ bấy nhiêu.",
        ),
        nar(
          "Mỡ nhẹ hơn cơ và xương. Nên cũng như chiếc vương miện, cùng cân nặng, người nhiều mỡ to hơn, bị nước đẩy mạnh hơn, và cân dưới nước nhẹ hơn.",
          "Mỡ nhẹ hơn cơ và xương. Nên cũng như chiếc vương miện, cùng cân nặng, người nhiều mỡ to hơn, bị nước đẩy mạnh hơn, và cân dưới nước nhẹ hơn.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Sao Thổ đặt cạnh 95 quả Trái Đất trên đĩa cân (câu 1); số 0,69 g/cm³ so với nước (câu 2); Sao Thổ nổi lềnh bềnh trong một bồn tắm khổng lồ (câu 3); kết: thu về chậu nước, chiếc cân và vương miện nguyên vẹn (câu 4)",
      lines: [
        nar(
          "Thử đem phép so ấy ra ngoài vũ trụ xem sao. Sao Thổ nặng gấp khoảng 95 lần Trái Đất.",
          "Thử đem phép so ấy ra ngoài vũ trụ xem sao. Sao Thổ nặng gấp khoảng chín mươi lăm lần Trái Đất.",
        ),
        nar(
          "Vậy mà nó to đến mức, theo NASA, khối lượng riêng trung bình chỉ khoảng 0,69 g/cm³. Nhỏ hơn cả nước!",
          "Vậy mà nó to đến mức, theo Na-sa, khối lượng riêng trung bình chỉ khoảng không phẩy sáu chín gam trên mỗi xen-ti-mét khối. Nhỏ hơn cả nước!",
        ),
        nar(
          "Mà vật có khối lượng riêng nhỏ hơn nước thì nổi. Nên NASA mới nói vui, nếu có một bồn tắm đủ lớn, Sao Thổ sẽ nổi.",
          "Mà vật có khối lượng riêng nhỏ hơn nước thì nổi. Nên Na-sa mới nói vui, nếu có một bồn tắm đủ lớn, Sao Thổ sẽ nổi.",
        ),
        nar(
          "Còn để bắt quả tang người thợ năm xưa, chỉ cần một chiếc cân, một chậu nước, và chiếc vương miện không một vết xước.",
          "Còn để bắt quả tang người thợ năm xưa, chỉ cần một chiếc cân, một chậu nước, và chiếc vương miện không một vết xước.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 11,
    week,
    theme,
    title: "Đường cong nhanh nhất: vì sao máng thẳng không về đích trước?",
    hudTitle: "ĐƯỜNG THẲNG CÓ PHẢI NHANH NHẤT?",
    textbook: "Vật lí 10 · Định luật bảo toàn cơ năng",
    era: "Châu Âu · Lời thách đố năm 1696",
    question: "Vì sao máng cong dốc đứng lúc đầu lại thắng máng thẳng ngắn hơn?",
    sources: [
      { title: "MacTutor (ĐH St Andrews) — The brachistochrone problem", url: "https://mathshistory.st-andrews.ac.uk/HistTopics/Brachistochrone/" },
      { title: "MacTutor (ĐH St Andrews) — Christiaan Huygens", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Huygens/" },
      { title: "Linda Hall Library — Scientist of the Day: Christiaan Huygens", url: "https://www.lindahall.org/about/news/scientist-of-the-day/christian-huygens/" },
      { title: "Klotz, The Gravity Tunnel in a Non-Uniform Earth, Am. J. Phys. 83, 231 (2015)", url: "https://arxiv.org/abs/1308.1342" },
      { title: "Vật lí 10 Kết nối tri thức — Bài 26: Cơ năng và định luật bảo toàn cơ năng", url: "https://www.vietjack.com/vat-li-10-kn/ly-thuyet-bai-26-co-nang-va-dinh-luat-bao-toan-co-nang.jsp" },
    ],
    hook: {
      shot: "Điểm A trên cao và điểm B thấp hơn lệch sang bên, ba máng trượt trống chờ viên bi (câu 1); Milo vai Johann Bernoulli cầm tờ tạp chí năm 1696 (câu 2); viên bi đặt ở A, máng thẳng gắn dấu hỏi (câu 3)",
      lines: [
        nar(
          "Bạn thả một viên bi từ điểm A trên cao xuống điểm B thấp hơn. Uốn máng hình gì thì bi về đích nhanh nhất?",
          "Bạn thả một viên bi từ điểm A trên cao xuống điểm Bê thấp hơn. Uốn máng hình gì thì bi về đích nhanh nhất?",
        ),
        nar(
          "Năm 1696, Johann Bernoulli đem đúng câu hỏi này ra thách đố giới toán học châu Âu.",
          "Năm một nghìn sáu trăm chín mươi sáu, Giô-han Béc-nu-li đem đúng câu hỏi này ra thách đố giới toán học châu Âu.",
        ),
        nar(
          "Bạn đoán đường thẳng, vì nó ngắn nhất? Người thắng cuộc lại không phải nó.",
          "Bạn đoán đường thẳng, vì nó ngắn nhất? Người thắng cuộc lại không phải nó.",
        ),
      ],
    },
    barrier: {
      shot: "Máng thẳng A–B dốc đều thoai thoải, bi bò chậm (✖) ở câu 1; máng gãy rơi thẳng đứng rồi chạy ngang, bi nhanh nhưng đường quá dài (✖) ở câu 2; Galileo 1638 vẽ cung tròn, gắn dấu hỏi ở câu 3",
      lines: [
        nar(
          "Đường thẳng ngắn nhất thật, nhưng dốc thoai thoải suốt đường, nên bi tăng tốc rất chậm.",
          "Đường thẳng ngắn nhất thật, nhưng dốc thoai thoải suốt đường, nên bi tăng tốc rất chậm.",
        ),
        nar(
          "Vậy cho bi rơi thẳng đứng rồi mới chạy ngang? Nhanh thật đấy, nhưng quãng đường lại dài ra quá nhiều.",
          "Vậy cho bi rơi thẳng đứng rồi mới chạy ngang? Nhanh thật đấy, nhưng quãng đường lại dài ra quá nhiều.",
        ),
        nar(
          "Ngay cả Galileo, năm 1638, cũng đoán nhầm rằng cung tròn là nhanh nhất.",
          "Ngay cả Ga-li-lê, năm một nghìn sáu trăm ba mươi tám, cũng đoán nhầm rằng cung tròn là nhanh nhất.",
        ),
      ],
    },
    eureka: {
      shot: "Tia sáng bẻ hướng qua các lớp (câu 1); chồng lên là các lớp mỏng nằm ngang, viên bi bẻ hướng qua từng lớp và vẽ ra đường cycloid (câu 2); bánh xe lăn với một điểm đỏ trên vành vạch đúng đường ấy, bi trên máng cycloid về B trước (câu 3); góc khung: Newton bên ngọn nến, đồng hồ chỉ 4 giờ sáng (câu 4)",
      lines: [
        nar(
          "Bernoulli nảy ra một ý bất ngờ, coi viên bi như tia sáng. Qua những lớp có tốc độ khác nhau, ánh sáng tự bẻ hướng để tới đích sớm nhất.",
          "Béc-nu-li nảy ra một ý bất ngờ, coi viên bi như tia sáng. Qua những lớp có tốc độ khác nhau, ánh sáng tự bẻ hướng để tới đích sớm nhất.",
        ),
        nar(
          "Mà viên bi thì càng xuống sâu càng nhanh. Cho bi bẻ hướng như ánh sáng qua vô số lớp mỏng, Bernoulli thu được đường cycloid.",
          "Mà viên bi thì càng xuống sâu càng nhanh. Cho bi bẻ hướng như ánh sáng qua vô số lớp mỏng, Béc-nu-li thu được đường xi-clô-ít.",
        ),
        nar(
          "Đó là đường một điểm trên vành bánh xe vạch ra khi bánh lăn. Dốc đứng lúc đầu để lấy tốc độ, rồi thoải dần về B.",
          "Đó là đường một điểm trên vành bánh xe vạch ra khi bánh lăn. Dốc đứng lúc đầu để lấy tốc độ, rồi thoải dần về Bê.",
        ),
        nar(
          "Còn Newton, theo lời kể lại, nhận đề khi vừa đi làm về, thức tới bốn giờ sáng thì giải xong.",
          "Còn Niu-tơn, theo lời kể lại, nhận đề khi vừa đi làm về, thức tới bốn giờ sáng thì giải xong.",
        ),
      ],
    },
    theorem: {
      shot: "Trang Vật lí 10 mở ra (câu 1); viên bi ở độ sâu h dưới điểm thả trên ba máng khác nhau, cả ba đều có cùng tốc độ v, công thức mgh = ½mv² → v = √(2gh) ở Tầng 2B (câu 2); bi trên máng cycloid vượt lên sớm (câu 3)",
      lines: [
        nar(
          "Nhưng vì sao cứ xuống sâu là nhanh? Nhờ định luật bảo toàn cơ năng, mà bạn học ở Vật lí 10.",
          "Nhưng vì sao cứ xuống sâu là nhanh? Nhờ định luật bảo toàn cơ năng, mà bạn học ở Vật lí lớp mười.",
        ),
        nar(
          "Bỏ qua ma sát, thế năng mất đi biến thành động năng. Nên ở độ sâu h, bi luôn có tốc độ v = √2gh, dù máng uốn kiểu gì.",
          "Bỏ qua ma sát, thế năng mất đi biến thành động năng. Nên ở độ sâu hát, bi luôn có tốc độ vê bằng căn bậc hai của hai giê hát, dù máng uốn kiểu gì.",
        ),
        nar(
          "Nói cách khác, máng nào xuống sâu sớm thì bi chạy nhanh sớm. Đường cycloid cân bằng vừa khít giữa xuống sâu và đi ngắn.",
          "Nói cách khác, máng nào xuống sâu sớm thì bi chạy nhanh sớm. Đường xi-clô-ít cân bằng vừa khít giữa xuống sâu và đi ngắn.",
        ),
      ],
    },
    realworld: {
      shot: "Ba viên bi thả ở ba độ cao khác nhau trên máng cycloid cùng chạm đáy một lúc (câu 1–3); chuyển sang đồng hồ quả lắc Huygens năm 1673 với hai má kim loại cong hình cycloid kẹp dây treo (câu 4)",
      lines: [
        nar(
          "Và đây mới là chỗ thú vị. Bernoulli sững sờ khi nhận ra Huygens đã dùng đường cong này từ trước.",
          "Và đây mới là chỗ thú vị. Béc-nu-li sững sờ khi nhận ra Huy-ghen đã dùng đường cong này từ trước.",
        ),
        nar(
          "Trên máng cycloid, thả bi ở độ cao nào cũng tới đáy cùng lúc. Nghe vô lý, đúng không?",
          "Trên máng xi-clô-ít, thả bi ở độ cao nào cũng tới đáy cùng lúc. Nghe vô lý, đúng không?",
        ),
        nar(
          "Bởi thả càng cao, đoạn đầu càng dốc, bi càng nhanh, bù vừa khít cho quãng đường dài hơn.",
          "Bởi thả càng cao, đoạn đầu càng dốc, bi càng nhanh, bù vừa khít cho quãng đường dài hơn.",
        ),
        nar(
          "Năm 1673, Huygens mô tả đồng hồ quả lắc có hai má kim loại cong hình cycloid, giúp quả lắc đưa rộng hay hẹp vẫn đúng nhịp.",
          "Năm một nghìn sáu trăm bảy mươi ba, Huy-ghen mô tả đồng hồ quả lắc có hai má kim loại cong hình xi-clô-ít, giúp quả lắc đưa rộng hay hẹp vẫn đúng nhịp.",
        ),
      ],
    },
    cosmic: {
      shot: "Cắt đôi Trái Đất: hầm thẳng Hà Nội – TP Hồ Chí Minh nông, 42 phút (câu 1–2); hầm cong cùng họ cycloid chúi sâu khoảng 360 km, 14 phút (câu 3); kết: thu nhỏ về viên bi lao dốc trên máng cycloid ở đầu tập (câu 4)",
      lines: [
        nar(
          "Thử phóng bài toán lên cỡ hành tinh xem. Đào một đường hầm xuyên lòng đất từ Hà Nội tới TP Hồ Chí Minh, thả vào một toa tàu không động cơ.",
          "Thử phóng bài toán lên cỡ hành tinh xem. Đào một đường hầm xuyên lòng đất từ Hà Nội tới Thành phố Hồ Chí Minh, thả vào một toa tàu không động cơ.",
        ),
        nar(
          "Trên giấy, coi Trái Đất đồng chất và không ma sát, hầm thẳng mất khoảng 42 phút.",
          "Trên giấy, coi Trái Đất đồng chất và không ma sát, hầm thẳng mất khoảng bốn mươi hai phút.",
        ),
        nar(
          "Còn hầm nhanh nhất là một đường cong cùng họ với cycloid, chúi sâu khoảng 360 km rồi vòng lên, chỉ mất chừng 14 phút.",
          "Còn hầm nhanh nhất là một đường cong cùng họ với xi-clô-ít, chúi sâu khoảng ba trăm sáu mươi ki-lô-mét rồi vòng lên, chỉ mất chừng mười bốn phút.",
        ),
        nar(
          "Từ chiếc máng nhỏ tới hầm xuyên Trái Đất, bí quyết vẫn vậy. Muốn viên bi về sớm, hãy cho nó lao dốc thật sớm.",
          "Từ chiếc máng nhỏ tới hầm xuyên Trái Đất, bí quyết vẫn vậy. Muốn viên bi về sớm, hãy cho nó lao dốc thật sớm.",
        ),
      ],
    },
  }),
];
