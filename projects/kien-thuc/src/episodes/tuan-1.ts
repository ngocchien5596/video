import { makeEpisode, nar } from "./make.ts";

const week = 1;
const theme = "Hình học cổ đại & Vũ trụ";

export const TUAN_1 = [
  makeEpisode({
    day: 1,
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
      shot: "Sa mạc Giza năm 600 TCN, Đại kim tự tháp Cheops xoay 2.5D, Milo (vai Thales) đứng dưới chân tháp cầm 1 chiếc cọc gỗ",
      lines: [
        nar(
          "Cách đây 2.600 năm tại Ai Cập, Đại kim tự tháp Cheops đã đứng sừng sững như một ngọn núi nhân tạo suốt hai thiên niên kỷ.",
          "Cách đây hai nghìn sáu trăm năm tại Ai Cập, Đại kim tự tháp Kê-ốp đã đứng sừng sững như một ngọn núi nhân tạo suốt hai thiên niên kỷ.",
        ),
        nar(
          "Nó cao đến mức đứng dưới chân, chẳng ai đo nổi bằng thước dây. Vậy nó cao bao nhiêu mét?",
          "Nó cao đến mức đứng dưới chân, chẳng ai đo nổi bằng thước dây. Vậy nó cao bao nhiêu mét?",
        ),
        nar(
          "Vậy mà nhà thông thái Hy Lạp Thales chỉ cần đúng một chiếc cọc gỗ đã giải gọn bài toán này. Ông đã làm thế nào?",
          "Vậy mà nhà thông thái Hy Lạp Tha-lét chỉ cần đúng một chiếc cọc gỗ đã giải gọn bài toán này. Ông đã làm thế nào?",
        ),
      ],
    },
    barrier: {
      shot: "Milo trèo lên đỉnh thả dây dọc sườn nghiêng (186m ✖), rồi chuyển sang cắt lớp X-quang 2,3 triệu khối đá đè tâm đáy O (✖)",
      lines: [
        nar(
          "Bạn có thể nghĩ ngay tới cách đầu tiên: Cứ trèo lên đỉnh rồi thả một sợi dây thừng xuống đất mà đo!",
          "Bạn có thể nghĩ ngay tới cách đầu tiên: cứ trèo lên đỉnh, rồi thả một sợi dây thừng xuống đất mà đo!",
        ),
        nar(
          "Nhưng cách này sai hoàn toàn! Vì mặt tháp bị vát nghiêng, sợi dây chỉ đo được độ dài sườn dốc chứ không phải chiều cao thẳng đứng H.",
          "Nhưng cách này sai hoàn toàn! Vì mặt tháp bị vát nghiêng, sợi dây chỉ đo được độ dài sườn dốc, chứ không phải chiều cao thẳng đứng hát.",
        ),
        nar(
          "Còn cách thứ hai là đo thẳng từ đỉnh xuống tâm đáy? Cũng bất khả thi, vì tâm đáy nằm sâu dưới 2,3 triệu tảng đá đặc quánh!",
          "Còn cách thứ hai là đo thẳng từ đỉnh xuống tâm đáy? Cũng bất khả thi, vì tâm đáy nằm sâu dưới hai phẩy ba triệu tảng đá đặc quánh!",
        ),
      ],
    },
    eureka: {
      shot: "Tia nắng Mặt Trời song song chiếu góc 45°, bóng cọc bằng chiều cao cọc; hạ mặt bằng đáy 230m ở Tầng 2B cộng 115m + 31,6m = 146,6m",
      lines: [
        nar(
          "Khi mọi cách đo trực tiếp đều bế tắc, Thales không nhìn vào khối đá nữa, mà nhìn vào bóng nắng của nó trên cát!",
          "Khi mọi cách đo trực tiếp đều bế tắc, Tha-lét không nhìn vào khối đá nữa, mà nhìn vào bóng nắng của nó trên cát!",
        ),
        nar(
          "Rồi ông cắm một chiếc cọc thẳng đứng xuống cát và nhận ra: Vì Mặt Trời ở rất xa, mọi tia nắng chiếu xuống đều song song với nhau.",
          "Rồi ông cắm một chiếc cọc thẳng đứng xuống cát và nhận ra: vì Mặt Trời ở rất xa, mọi tia nắng chiếu xuống đều song song với nhau.",
        ),
        nar(
          "Thales kiên nhẫn chờ đến khoảnh khắc mặt trời nghiêng đúng góc 45° — lúc cái bóng của chiếc cọc dài bằng chính chiều cao chiếc cọc!",
          "Tha-lét kiên nhẫn chờ đến khoảnh khắc mặt trời nghiêng đúng góc bốn mươi lăm độ, lúc cái bóng của chiếc cọc dài bằng chính chiều cao chiếc cọc!",
        ),
        nar(
          "Ngay lúc đó, chiều cao kim tự tháp bằng nửa cạnh đáy, 115 mét, cộng với phần bóng nhô ra, 31,6 mét, tức là 146,6 mét!",
          "Ngay lúc đó, chiều cao kim tự tháp bằng nửa cạnh đáy, một trăm mười lăm mét, cộng với phần bóng nhô ra, ba mươi mốt mét sáu, tức là một trăm bốn mươi sáu mét sáu!",
        ),
      ],
    },
    theorem: {
      shot: "Cắm cọc ở mút bóng tháp: hai tam giác đồng dạng (tháp + bóng tháp, cọc + bóng cọc); trang Toán 8 mở ra, cọc DE song song BC, công thức tỉ lệ ở Tầng 2B",
      lines: [
        nar(
          "Nhưng chờ đúng lúc nắng nghiêng 45° đâu phải lúc nào cũng có. Theo nhà sử học Plutarch kể lại, Thales còn một cách khác: cắm cọc ở mút bóng tháp, rồi so hai cái bóng.",
          "Nhưng chờ đúng lúc nắng nghiêng bốn mươi lăm độ đâu phải lúc nào cũng có. Theo nhà sử học Plu-tác kể lại, Tha-lét còn một cách khác: cắm cọc ở mút bóng tháp, rồi so hai cái bóng.",
        ),
        nar(
          "Tháp và cọc cùng đứng thẳng, tia nắng song song, nên tạo ra hai tam giác đồng dạng: chiều cao tháp chia chiều cao cọc, đúng bằng bóng tháp chia bóng cọc.",
          "Tháp và cọc cùng đứng thẳng, tia nắng song song, nên tạo ra hai tam giác đồng dạng: chiều cao tháp chia chiều cao cọc, đúng bằng bóng tháp chia bóng cọc.",
        ),
        nar(
          "Tỉ lệ ấy chính là Định lý Thales mà bạn học trong Toán lớp 8. Giờ nào có nắng cũng đo được, chẳng cần chờ đợi!",
          "Tỉ lệ ấy chính là Định lý Tha-lét mà bạn học trong Toán lớp tám. Giờ nào có nắng cũng đo được, chẳng cần chờ đợi!",
        ),
      ],
    },
    realworld: {
      shot: "Rừng rậm không có bóng nắng, Milo đội mũ kiểm lâm giơ thước ngắm chữ L tạo góc 45° lên ngọn cây lim cổ thụ",
      lines: [
        nar(
          "Thế nhưng, nếu bước vào một khu rừng rậm âm u không hề có bóng nắng, định lý này liệu có bó tay?",
          "Thế nhưng, nếu bước vào một khu rừng rậm âm u không hề có bóng nắng, định lý này liệu có bó tay?",
        ),
        nar(
          "Không hề! Những người kiểm lâm chỉ cần ghép hai thanh gỗ bằng nhau thành chiếc thước chữ L để tự tạo tia ngắm 45° từ mắt lên ngọn cây: Đứng cách gốc bao nhiêu mét, cộng thêm chiều cao ngang mắt là ra ngay chiều cao cây!",
          "Không hề! Những người kiểm lâm chỉ cần ghép hai thanh gỗ bằng nhau thành chiếc thước chữ en lờ để tự tạo tia ngắm bốn mươi lăm độ từ mắt lên ngọn cây: đứng cách gốc bao nhiêu mét, cộng thêm chiều cao ngang mắt là ra ngay chiều cao cây!",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Trái Đất – Mặt Trăng – Mặt Trời thẳng hàng trong Nhật thực toàn phần với tỉ lệ đồng dạng khoảng 1/400; kết: Thales đoán trước nhật thực, quay về chiếc cọc gỗ và cái bóng",
      lines: [
        nar(
          "Và kỳ diệu hơn cả, nếu kéo dài những đường thẳng của Thales vượt ra khỏi bầu khí quyển, bạn sẽ chạm tới bí mật của hiện tượng Nhật thực toàn phần!",
          "Và kỳ diệu hơn cả, nếu kéo dài những đường thẳng của Tha-lét vượt ra khỏi bầu khí quyển, bạn sẽ chạm tới bí mật của hiện tượng Nhật thực toàn phần!",
        ),
        nar(
          "Mặt Trời to gấp khoảng 400 lần Mặt Trăng, nhưng cũng ở xa Trái Đất hơn khoảng 400 lần — hai tam giác đồng dạng khổng lồ, nên Mặt Trăng che vừa khít Mặt Trời!",
          "Mặt Trời to gấp khoảng bốn trăm lần Mặt Trăng, nhưng cũng ở xa Trái Đất hơn khoảng bốn trăm lần, hai tam giác đồng dạng khổng lồ, nên Mặt Trăng che vừa khít Mặt Trời!",
        ),
        nar(
          "Mà theo sử gia Herodotus, chính Thales còn đoán trước được một lần nhật thực. Hóa ra muốn đo một kỳ quan, chẳng cần thang cao hay thước dài: chỉ cần một chiếc cọc gỗ, một cái bóng, và một cái đầu biết nhìn ra tỉ lệ.",
          "Mà theo sử gia Hê-rô-đốt, chính Tha-lét còn đoán trước được một lần nhật thực. Hóa ra muốn đo một kỳ quan, chẳng cần thang cao hay thước dài: chỉ cần một chiếc cọc gỗ, một cái bóng, và một cái đầu biết nhìn ra tỉ lệ.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 2,
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
      shot: "Alexandria khoảng 240 TCN, Milo (vai Eratosthenes) đứng cạnh quả địa cầu có dấu hỏi, bên cạnh một cái giếng đá và một chiếc cọc đo bóng",
      lines: [
        nar(
          "Hơn 2.200 năm trước, người Hy Lạp đã biết Trái Đất hình cầu. Nhưng quả cầu ấy to cỡ nào?",
          "Hơn hai nghìn hai trăm năm trước, người Hy Lạp đã biết Trái Đất hình cầu. Nhưng quả cầu ấy to cỡ nào?",
        ),
        nar(
          "Nhà bác học Eratosthenes đã đo được nó mà không cần rời khỏi Ai Cập.",
          "Nhà bác học Ê-ra-tốt-xten đã đo được nó mà không cần rời khỏi Ai Cập.",
        ),
        nar(
          "Thứ ông dùng chỉ là một cái giếng, một chiếc cọc và một quãng đường. Bằng cách nào?",
          "Thứ ông dùng chỉ là một cái giếng, một chiếc cọc và một quãng đường. Bằng cách nào?",
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
          "Nhưng với Trái Đất thì không thể: đại dương và những vùng đất chưa ai biết chắn mọi lối.",
          "Nhưng với Trái Đất thì không thể: đại dương và những vùng đất chưa ai biết chắn mọi lối.",
        ),
        nar(
          "Gần 1.800 năm sau, năm 1522, đoàn thuyền của Magellan mới lần đầu đi hết một vòng.",
          "Gần một nghìn tám trăm năm sau, năm một nghìn năm trăm hai mươi hai, đoàn thuyền của Ma-gien-lăng mới lần đầu đi hết một vòng.",
        ),
      ],
    },
    eureka: {
      shot: "Trưa Hạ chí: ở Syene nắng rọi thẳng đáy giếng, cọc không bóng; ở Alexandria cọc đổ bóng, tia nắng lệch khỏi cọc 7,2° = 1/50 vòng tròn; các tia nắng vẽ song song",
      lines: [
        nar(
          "Eratosthenes không đi hết cả vòng, mà chỉ đo một khúc nhỏ của nó.",
          "Ê-ra-tốt-xten không đi hết cả vòng, mà chỉ đo một khúc nhỏ của nó.",
        ),
        nar(
          "Sách cổ chép rằng ở Syene, phía nam Ai Cập, trưa Hạ chí nắng rọi thẳng đáy giếng, cọc không có bóng.",
          "Sách cổ chép rằng ở Xi-ê-nê, phía nam Ai Cập, trưa Hạ chí nắng rọi thẳng đáy giếng, cọc không có bóng.",
        ),
        nar(
          "Cũng trưa ngày ấy ở Alexandria, cọc vẫn đổ bóng: tia nắng lệch khỏi cọc 1/50 vòng tròn, tức 7,2°.",
          "Cũng trưa ngày ấy ở A-lếch-xan-đri-a, cọc vẫn đổ bóng: tia nắng lệch khỏi cọc một phần năm mươi vòng tròn, tức bảy phẩy hai độ.",
        ),
        nar(
          "Mặt Trời rất xa nên tia nắng tới hai nơi song song. Bóng khác nhau chỉ vì mặt đất cong.",
          "Mặt Trời rất xa nên tia nắng tới hai nơi song song. Bóng khác nhau chỉ vì mặt đất cong.",
        ),
      ],
    },
    theorem: {
      shot: "Mặt cắt Trái Đất: kéo dài hai cọc gặp nhau ở tâm; tia nắng ở Alexandria song song đường cọc Syene, cọc Alexandria là cát tuyến, tô hai góc so le trong 7,2°; trang Toán 7 mở ra, 5.000 × 50 = 250.000 stadion",
      lines: [
        nar(
          "Kéo dài hai chiếc cọc, chúng gặp nhau ở tâm Trái Đất. Cọc ở Alexandria cắt hai đường song song: tia nắng và đường cọc ở Syene.",
          "Kéo dài hai chiếc cọc, chúng gặp nhau ở tâm Trái Đất. Cọc ở A-lếch-xan-đri-a cắt hai đường song song: tia nắng, và đường cọc ở Xi-ê-nê.",
        ),
        nar(
          "Hai góc so le trong bằng nhau, nên góc ở tâm cũng là 7,2°. Đó chính là tính chất hai đường thẳng song song trong Toán lớp 7.",
          "Hai góc so le trong bằng nhau, nên góc ở tâm cũng là bảy phẩy hai độ. Đó chính là tính chất hai đường thẳng song song trong Toán lớp bảy.",
        ),
        nar(
          "Góc ở tâm bằng 1/50 vòng tròn, nên chu vi gấp 50 lần quãng 5.000 stadion từ Syene tới Alexandria: 250.000 stadion.",
          "Góc ở tâm bằng một phần năm mươi vòng tròn, nên chu vi gấp năm mươi lần quãng năm nghìn xta-đi-ông từ Xi-ê-nê tới A-lếch-xan-đri-a: hai trăm năm mươi nghìn xta-đi-ông.",
        ),
        nar(
          "Tùy một stadion dài 157 hay 185 mét, con số ấy cỡ 39.000 đến 46.000 km, so với chừng 40.000 km đo ngày nay.",
          "Tùy một xta-đi-ông dài một trăm năm mươi bảy hay một trăm tám mươi lăm mét, con số ấy cỡ ba mươi chín nghìn đến bốn mươi sáu nghìn ki lô mét, so với chừng bốn mươi nghìn ki lô mét đo ngày nay.",
        ),
      ],
    },
    realworld: {
      shot: "Milo trên tàu buồm ban đêm giơ thước đo góc ngắm sao Bắc Cực; tàu chạy về phía bắc, sao nhô cao thêm 1°, thước hải đồ ghi 111 km ≈ 60 hải lý",
      lines: [
        nar(
          "Người đi biển dùng phép tính ấy theo chiều ngược lại, với ánh sao Bắc Cực cũng song song như tia nắng.",
          "Người đi biển dùng phép tính ấy theo chiều ngược lại, với ánh sao Bắc Cực cũng song song như tia nắng.",
        ),
        nar(
          "Tàu chạy thẳng về phía bắc, sao Bắc Cực nhô cao thêm 1° nghĩa là tàu đã đi thêm 1/360 vòng Trái Đất, khoảng 111 km.",
          "Tàu chạy thẳng về phía bắc, sao Bắc Cực nhô cao thêm một độ, nghĩa là tàu đã đi thêm một phần ba trăm sáu mươi vòng Trái Đất, khoảng một trăm mười một ki lô mét.",
        ),
        nar(
          "Vì thế một hải lý, 1.852 mét, vốn được định bằng một phút góc vĩ độ.",
          "Vì thế một hải lý, một nghìn tám trăm năm mươi hai mét, vốn được định bằng một phút góc vĩ độ.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: từ Trái Đất kẻ hai tia tới hai mép Mặt Trời cách 150 triệu km, góc 0,53°; vòng tròn bán kính 150 triệu km dài 940 triệu km; kết: quay về cái giếng không bóng và chiếc cọc có bóng",
      lines: [
        nar(
          "Cũng tỉ lệ góc và cung ấy, ngày nay ta đo được cả Mặt Trời.",
          "Cũng tỉ lệ góc và cung ấy, ngày nay ta đo được cả Mặt Trời.",
        ),
        nar(
          "Mặt Trời cách ta khoảng 150 triệu km và chiếm chừng 0,53° trên bầu trời, khoảng 1/675 vòng tròn.",
          "Mặt Trời cách ta khoảng một trăm năm mươi triệu ki lô mét và chiếm chừng không phẩy năm mươi ba độ trên bầu trời, khoảng một phần sáu trăm bảy mươi lăm vòng tròn.",
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
    day: 3,
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
      shot: "Milo cầm sợi dây 12 nút trước nền kim tự tháp, dấu hỏi lớn hiện trên sợi dây; cảnh lật sang một cánh đồng Lưỡng Hà và tấm bảng đất sét nhỏ vừa lòng bàn tay",
      lines: [
        nar(
          "Có lẽ bạn từng nghe: người Ai Cập cổ dùng một sợi dây thắt 12 nút để kẻ góc vuông cho kim tự tháp.",
          "Có lẽ bạn từng nghe: người Ai Cập cổ dùng một sợi dây thắt mười hai nút để kẻ góc vuông cho kim tự tháp.",
        ),
        nar(
          "Thực ra đó chỉ là giả thuyết từ thế kỷ 19, chưa có văn bản Ai Cập nào ghi lại cách ấy.",
          "Thực ra đó chỉ là giả thuyết từ thế kỷ mười chín, chưa có văn bản Ai Cập nào ghi lại cách ấy.",
        ),
        nar(
          "Nhưng bài toán thì có thật: trên cánh đồng rộng, làm sao kẻ góc vuông thật chuẩn? Dấu vết lời giải nằm trên một tấm bảng đất sét hơn 3.600 năm tuổi.",
          "Nhưng bài toán thì có thật: trên cánh đồng rộng, làm sao kẻ góc vuông thật chuẩn? Dấu vết lời giải nằm trên một tấm bảng đất sét hơn ba nghìn sáu trăm năm tuổi.",
        ),
      ],
    },
    barrier: {
      shot: "Thành Sippar cổ: Milo vai người đo đất đứng giữa thửa ruộng có hàng chà là ở ranh giới; Milo nheo mắt ngắm góc rồi ướm góc viên gạch, đường ranh kéo dài 100 m lệch dần 1°, hở ra 1,75 m và một dải tam giác đỏ ~87 m² (✖)",
      lines: [
        nar(
          "Tấm bảng đào được ở thành Sippar, nay thuộc Iraq, là bản vẽ của người đo đất khi chia lại một thửa ruộng.",
          "Tấm bảng đào được ở thành Xíp-pa, nay thuộc I-rắc, là bản vẽ của người đo đất khi chia lại một thửa ruộng.",
        ),
        nar(
          "Đất thời ấy là chuyện lớn: một tấm bảng khác ghi vụ hai người quyền thế tranh chấp hàng chà là trên đường ranh.",
          "Đất thời ấy là chuyện lớn: một tấm bảng khác ghi vụ hai người quyền thế tranh chấp hàng chà là trên đường ranh.",
        ),
        nar(
          "Cách dễ nghĩ nhất là ngắm bằng mắt, hay ướm theo góc viên gạch. Nhưng lệch 1 độ thôi, cuối cạnh 100 mét đã hở gần 1,75 mét, lấn mất gần 90 mét vuông đất!",
          "Cách dễ nghĩ nhất là ngắm bằng mắt, hay ướm theo góc viên gạch. Nhưng lệch một độ thôi, cuối cạnh một trăm mét đã hở gần một mét bảy lăm, lấn mất gần chín mươi mét vuông đất!",
        ),
      ],
    },
    eureka: {
      shot: "Milo bỏ việc ngắm góc, cầm dây đo độ dài; trên tấm bảng hiện hình chữ nhật cạnh 3 và 4 với đường chéo 5; rồi Milo căng sợi dây 12 nút thành tam giác 3 – 4 – 5 khoảng nút, góc vuông sáng lên; phóng to thành 30 – 40 – 50 m",
      lines: [
        nar(
          "Bí quyết của người đo đất Babylon: đừng đo góc, hãy đo độ dài, thứ đo chính xác dễ hơn nhiều.",
          "Bí quyết của người đo đất Ba-bi-lon: đừng đo góc, hãy đo độ dài, thứ đo chính xác dễ hơn nhiều.",
        ),
        nar(
          "Theo nhà toán học Daniel Mansfield, người giải mã tấm bảng, họ dùng những bộ ba số đặc biệt. Đơn giản nhất là 3, 4, 5: hình chữ nhật cạnh 3 và 4 thì đường chéo đúng bằng 5.",
          "Theo nhà toán học Đa-ni-en Men-phin, người giải mã tấm bảng, họ dùng những bộ ba số đặc biệt. Đơn giản nhất là ba, bốn, năm: hình chữ nhật cạnh ba và bốn thì đường chéo đúng bằng năm.",
        ),
        nar(
          "Bạn tự thử được với sợi dây 12 nút cách đều: căng thành tam giác 3, 4, 5 khoảng, góc giữa cạnh 3 và cạnh 4 tự khắc vuông.",
          "Bạn tự thử được với sợi dây mười hai nút cách đều: căng thành tam giác ba, bốn, năm khoảng, góc giữa cạnh ba và cạnh bốn tự khắc vuông.",
        ),
        nar(
          "Phóng to thành 30, 40, 50 mét, dây lệch 5 phân thì góc chỉ sai khoảng 0,12 độ, nhỏ hơn ngắm bằng mắt tám lần.",
          "Phóng to thành ba mươi, bốn mươi, năm mươi mét, dây lệch năm phân thì góc chỉ sai khoảng không phẩy mười hai độ, nhỏ hơn ngắm bằng mắt tám lần.",
        ),
      ],
    },
    theorem: {
      shot: "Ba hình vuông dựng trên ba cạnh tam giác 3 – 4 – 5: 9 ô + 16 ô xếp vừa khít 25 ô; trang Toán 8 mở ra với Định lý Pythagoras thuận và đảo ở Tầng 2B",
      lines: [
        nar(
          "Vì sao ba số ấy luôn cho góc vuông? Vì 3 bình phương cộng 4 bình phương là 9 cộng 16, bằng 25, đúng 5 bình phương.",
          "Vì sao ba số ấy luôn cho góc vuông? Vì ba bình phương cộng bốn bình phương là chín cộng mười sáu, bằng hai mươi lăm, đúng năm bình phương.",
        ),
        nar(
          "Đó chính là Định lý Pythagoras đảo mà bạn học trong Toán lớp 8: tam giác có bình phương một cạnh bằng tổng bình phương hai cạnh kia thì là tam giác vuông.",
          "Đó chính là Định lý Pi-ta-go đảo mà bạn học trong Toán lớp tám: tam giác có bình phương một cạnh bằng tổng bình phương hai cạnh kia thì là tam giác vuông.",
        ),
        nar(
          "Chiều thuận thì nói: tam giác vuông luôn có a² + b² = c². Định lý mang tên Pythagoras, người sinh sau tấm bảng hơn một nghìn năm.",
          "Chiều thuận thì nói: tam giác vuông luôn có a bình phương cộng bê bình phương bằng xê bình phương. Định lý mang tên Pi-ta-go, người sinh sau tấm bảng hơn một nghìn năm.",
        ),
      ],
    },
    realworld: {
      shot: "Công trường hiện đại: Milo đội mũ bảo hộ, căng thước dây 3 m và 4 m dọc hai đường tường, kéo thước chéo đúng 5 m; bên cạnh hiện các bội 6 – 8 – 10 và 9 – 12 – 15 m cho tường dài",
      lines: [
        nar(
          "Mẹo ấy vẫn sống trên công trường hôm nay. Muốn góc tường vuông, thợ xây đo một cạnh 3 mét, cạnh kia 4 mét.",
          "Mẹo ấy vẫn sống trên công trường hôm nay. Muốn góc tường vuông, thợ xây đo một cạnh ba mét, cạnh kia bốn mét.",
        ),
        nar(
          "Đường chéo nối hai vạch đúng 5 mét là góc đã vuông. Tường dài thì nhân lên thành 6, 8, 10 hay 9, 12, 15 mét.",
          "Đường chéo nối hai vạch đúng năm mét là góc đã vuông. Tường dài thì nhân lên thành sáu, tám, mười hay chín, mười hai, mười lăm mét.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: trạm vũ trụ quốc tế cao ~400 km, tia nhìn sượt mép Trái Đất, ô vuông nhỏ đánh dấu góc vuông giữa tia nhìn và bán kính 6.371 km; cạnh huyền 6.771 km; kết: cảnh thu về tấm bảng đất sét và sợi dây 12 nút căng thành tam giác 3 – 4 – 5",
      lines: [
        nar(
          "Chiều thuận giúp tính khoảng cách. Từ trạm vũ trụ quốc tế, cao khoảng 400 km, đường chân trời cách bao xa?",
          "Chiều thuận giúp tính khoảng cách. Từ trạm vũ trụ quốc tế, cao khoảng bốn trăm ki-lô-mét, đường chân trời cách bao xa?",
        ),
        nar(
          "Tia nhìn sượt mép Trái Đất vuông góc với bán kính 6.371 km, cạnh huyền là 6.371 cộng 400: một tam giác vuông khổng lồ.",
          "Tia nhìn sượt mép Trái Đất vuông góc với bán kính sáu nghìn ba trăm bảy mốt ki-lô-mét, cạnh huyền là sáu nghìn ba trăm bảy mốt cộng bốn trăm: một tam giác vuông khổng lồ.",
        ),
        nar(
          "Lấy 6.771 bình phương trừ 6.371 bình phương rồi khai căn: chân trời xa khoảng 2.300 km. Tất cả bắt đầu từ tấm bảng đất sét, và một sợi dây 12 nút căng thành 3, 4, 5.",
          "Lấy sáu nghìn bảy trăm bảy mốt bình phương trừ sáu nghìn ba trăm bảy mốt bình phương rồi khai căn: chân trời xa khoảng hai nghìn ba trăm ki-lô-mét. Tất cả bắt đầu từ tấm bảng đất sét, và một sợi dây mười hai nút căng thành ba, bốn, năm.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 4,
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
      shot: "Đảo Samos thế kỷ 6 TCN, mặt cắt núi đá vôi, hai đội thợ cầm cuốc, búa, đục ở hai cửa hầm A và B; Milo (vai Eupalinos) đứng giữa, nhìn hai mũi hầm tiến vào lòng núi tối",
      lines: [
        nar(
          "Hơn 2.500 năm trước, trên đảo Samos của Hy Lạp, kỹ sư Eupalinos phải đục một đường hầm dẫn nước dài hơn 1 km xuyên lòng núi đá vôi.",
          "Hơn hai nghìn năm trăm năm trước, trên đảo Xa-mốt của Hy Lạp, kỹ sư Ơ-pa-li-nốt phải đục một đường hầm dẫn nước dài hơn một ki-lô-mét xuyên lòng núi đá vôi.",
        ),
        nar(
          "Hai đội thợ đục cùng lúc từ hai phía núi, chỉ bằng cuốc, búa và đục.",
          "Hai đội thợ đục cùng lúc từ hai phía núi, chỉ bằng cuốc, búa và đục.",
        ),
        nar(
          "Giữa lòng đá tối om, không đội nào thấy đội kia. Làm sao họ biết phải đào hướng nào để gặp nhau?",
          "Giữa lòng đá tối om, không đội nào thấy đội kia. Làm sao họ biết phải đào hướng nào để gặp nhau?",
        ),
      ],
    },
    barrier: {
      shot: "Hai mũi hầm rộng 2 m; mũi phía Bắc lệch 1° so với đường đúng, sau khoảng 500 m hai đầu hầm cách nhau khoảng 9 m và trượt qua nhau (✖); rồi chiếc la bàn bị gạch chéo (✖)",
      lines: [
        nar(
          "Cách dễ nghĩ nhất là mỗi đội cứ nhắm chừng về phía bên kia núi mà đào.",
          "Cách dễ nghĩ nhất là mỗi đội cứ nhắm chừng về phía bên kia núi mà đào.",
        ),
        nar(
          "Nhưng hầm chỉ rộng chừng 2 mét. Một đội lệch 1 độ thôi, sau khoảng 500 mét đã trượt xa chừng 9 mét, thành hai cái hang cụt.",
          "Nhưng hầm chỉ rộng chừng hai mét. Một đội lệch một độ thôi, sau khoảng năm trăm mét đã trượt xa chừng chín mét, thành hai cái hang cụt.",
        ),
        nar(
          "La bàn thì người Hy Lạp thời ấy chưa có. Mà có la bàn, bạn vẫn phải biết cửa bên kia ở hướng nào.",
          "La bàn thì người Hy Lạp thời ấy chưa có. Mà có la bàn, bạn vẫn phải biết cửa bên kia ở hướng nào.",
        ),
      ],
    },
    eureka: {
      shot: "Nhìn từ trên cao: Milo (vai Heron) đi vòng chân núi từ cửa A sang cửa B theo những đoạn Đông–Tây, Bắc–Nam vuông góc; cộng lại thành hai cạnh góc vuông, cạnh huyền AB xuyên núi chính là đường hầm; hai tam giác nhỏ cùng hình dạng cắm cọc ở hai cửa",
      lines: [
        nar(
          "Không ai biết chắc Eupalinos đã làm thế nào, vì không còn ghi chép nào về cách làm.",
          "Không ai biết chắc Ơ-pa-li-nốt đã làm thế nào, vì không còn ghi chép nào về cách làm.",
        ),
        nar(
          "Khoảng 500 năm sau, kỹ sư Heron ở Alexandria viết ra một lời giải: không nhìn xuyên núi được thì đi vòng quanh núi.",
          "Khoảng năm trăm năm sau, kỹ sư Hê-rông ở A-lếch-xan-đri-a viết ra một lời giải: không nhìn xuyên núi được thì đi vòng quanh núi.",
        ),
        nar(
          "Đi từ cửa A sang cửa B, cộng các quãng đi theo hướng Đông Tây và Bắc Nam, ta có hai cạnh góc vuông của một tam giác có cạnh huyền chính là đường hầm.",
          "Đi từ cửa a sang cửa bê, cộng các quãng đi theo hướng Đông Tây và Bắc Nam, ta có hai cạnh góc vuông của một tam giác có cạnh huyền chính là đường hầm.",
        ),
        nar(
          "Dựng ở mỗi cửa một tam giác nhỏ cùng hình dạng, mỗi đội có một hàng cọc chỉ đúng hướng đào.",
          "Dựng ở mỗi cửa một tam giác nhỏ cùng hình dạng, mỗi đội có một hàng cọc chỉ đúng hướng đào.",
        ),
      ],
    },
    theorem: {
      shot: "Tam giác vuông của Heron biến thành tam giác ABC bất kỳ: mốc C trên sườn núi nhìn thấy cả hai cửa A, B; đo CA, CB và góc C; trang Toán 10 mở ra với định lý côsin tính AB và định lý sin tính góc A",
      lines: [
        nar(
          "Nhưng đi vòng toàn góc vuông vừa mệt vừa dễ sai. Thật ra tam giác chẳng cần vuông: chỉ cần một mốc C nhìn thấy cả hai cửa A và B.",
          "Nhưng đi vòng toàn góc vuông vừa mệt vừa dễ sai. Thật ra tam giác chẳng cần vuông: chỉ cần một mốc xê nhìn thấy cả hai cửa a và bê.",
        ),
        nar(
          "Đo hai cạnh CA, CB và góc C xen giữa. AB bình phương bằng CA bình phương cộng CB bình phương, trừ hai lần CA nhân CB nhân côsin C.",
          "Đo hai cạnh xê a, xê bê và góc xê xen giữa. A bê bình phương bằng xê a bình phương cộng xê bê bình phương, trừ hai lần xê a nhân xê bê nhân cô-sin xê.",
        ),
        nar(
          "Có AB rồi, tỉ số giữa mỗi cạnh và sin góc đối diện cho ra góc A, tức là hướng mũi đào so với đường ngắm AC.",
          "Có a bê rồi, tỉ số giữa mỗi cạnh và sin góc đối diện cho ra góc a, tức là hướng mũi đào so với đường ngắm a xê.",
        ),
        nar(
          "Đó chính là Định lý côsin và Định lý sin mà bạn học trong Toán lớp 10, nơi có hẳn một bài tập về đường hầm xuyên núi.",
          "Đó chính là Định lý cô-sin và Định lý sin mà bạn học trong Toán lớp mười, nơi có hẳn một bài tập về đường hầm xuyên núi.",
        ),
      ],
    },
    realworld: {
      shot: "Mặt cắt eo biển Manche: hai máy khoan từ bờ Anh và bờ Pháp tiến vào dưới đáy biển; trên mặt đất, lưới tam giác đo đạc nối mốc hai bờ, vệ tinh phía trên; hai mũi hầm dịch vụ gặp nhau năm 1990",
      lines: [
        nar(
          "Đường hầm dưới eo biển Manche nối Anh và Pháp cũng được đào từ hai phía, với gần 38 km nằm dưới đáy biển.",
          "Đường hầm dưới eo biển Măng-sơ nối Anh và Pháp cũng được đào từ hai phía, với gần ba mươi tám ki-lô-mét nằm dưới đáy biển.",
        ),
        nar(
          "Trước khi đào, người ta nối mốc đo hai bờ vào cùng một lưới tam giác, có vệ tinh hỗ trợ, rồi tính hướng cho từng máy.",
          "Trước khi đào, người ta nối mốc đo hai bờ vào cùng một lưới tam giác, có vệ tinh hỗ trợ, rồi tính hướng cho từng máy.",
        ),
        nar(
          "Năm 1990, hai mũi hầm dịch vụ gặp nhau dưới đáy biển, lệch nhau chỉ vài chục xen-ti-mét.",
          "Năm một nghìn chín trăm chín mươi, hai mũi hầm dịch vụ gặp nhau dưới đáy biển, lệch nhau chỉ vài chục xen-ti-mét.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Berlin và Mũi Hảo Vọng là hai đầu cạnh đáy gần 10.000 km, hai tia ngắm cùng chụm vào Mặt Trăng thành một tam giác khổng lồ; kết: quay về hai đội thợ Samos gặp nhau trong lòng núi",
      lines: [
        nar(
          "Còn nếu điểm cần tới là Mặt Trăng, nơi không sợi thước dây nào kéo tới được thì sao?",
          "Còn nếu điểm cần tới là Mặt Trăng, nơi không sợi thước dây nào kéo tới được thì sao?",
        ),
        nar(
          "Từ năm 1751, Lacaille ở Mũi Hảo Vọng và Lalande ở Berlin cùng ngắm Mặt Trăng, hai nơi cách nhau gần 10.000 km.",
          "Từ năm một nghìn bảy trăm năm mươi mốt, La-cai ở Mũi Hảo Vọng và La-lăng ở Béc-lin cùng ngắm Mặt Trăng, hai nơi cách nhau gần mười nghìn ki-lô-mét.",
        ),
        nar(
          "Biết cạnh đáy và hai góc ngắm ở hai đầu, định lý sin cho ra khoảng cách tới Mặt Trăng, đúng như cách tìm hướng hầm.",
          "Biết cạnh đáy và hai góc ngắm ở hai đầu, định lý sin cho ra khoảng cách tới Mặt Trăng, đúng như cách tìm hướng hầm.",
        ),
        nar(
          "Hai đội thợ Samos gặp nhau giữa lòng núi tối om không nhờ đôi mắt nhìn xuyên đá, mà nhờ một tam giác vẽ được bên ngoài núi.",
          "Hai đội thợ Xa-mốt gặp nhau giữa lòng núi tối om không nhờ đôi mắt nhìn xuyên đá, mà nhờ một tam giác vẽ được bên ngoài núi.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 5,
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
      shot: "Cung điện Syracuse thế kỷ 3 TCN, vua Hiero II cầm chiếc vương miện lá vàng, người thợ kim hoàn khúm núm; Milo (vai Archimedes) được gọi tới, dấu hỏi lớn trên vương miện",
      lines: [
        nar(
          "Theo Vitruvius kể lại, hơn 2.200 năm trước, vua Hiero II của thành Syracuse đặt thợ làm một vương miện vàng ròng để dâng thần.",
          "Theo Vi-tơ-ru-vi-út kể lại, hơn hai nghìn hai trăm năm trước, vua Hi-ê-rông thứ hai của thành Xi-ra-cút đặt thợ làm một vương miện vàng ròng để dâng thần.",
        ),
        nar(
          "Vương miện giao đủ cân nặng, nhưng có lời tố rằng người thợ đã bớt vàng và tráo vào đúng chừng ấy bạc.",
          "Vương miện giao đủ cân nặng, nhưng có lời tố rằng người thợ đã bớt vàng, và tráo vào đúng chừng ấy bạc.",
        ),
        nar(
          "Nhà vua giao Archimedes vạch trần, mà đồ dâng thần thì không được nấu chảy hay cưa ra. Làm sao biết bên trong có bạc?",
          "Nhà vua giao Ác-si-mét vạch trần, mà đồ dâng thần thì không được nấu chảy hay cưa ra. Làm sao biết bên trong có bạc?",
        ),
      ],
    },
    barrier: {
      shot: "Cân khô hai bên bằng nhau tăm tắp (✖); hai khối cùng nặng, khối bạc to gần gấp đôi khối vàng; cây thước bất lực trước những chiếc lá vàng uốn lượn (✖)",
      lines: [
        nar(
          "Cách dễ nghĩ nhất là đem cân. Nhưng vô ích: bớt bao nhiêu gam vàng thì bù bấy nhiêu gam bạc, cân nặng vẫn y như cũ.",
          "Cách dễ nghĩ nhất là đem cân. Nhưng vô ích: bớt bao nhiêu gam vàng thì bù bấy nhiêu gam bạc, cân nặng vẫn y như cũ.",
        ),
        nar(
          "Chỗ khác nằm ở độ to: cùng một khối, bạc chỉ nặng chừng nửa vàng, nên cùng cân nặng, vương miện pha bạc phải to hơn.",
          "Chỗ khác nằm ở độ to: cùng một khối, bạc chỉ nặng chừng nửa vàng, nên cùng cân nặng, vương miện pha bạc phải to hơn.",
        ),
        nar(
          "Vậy thì đo thể tích? Với hàng chục chiếc lá vàng chạm khắc uốn lượn, chẳng cây thước nào đo nổi.",
          "Vậy thì đo thể tích? Với hàng chục chiếc lá vàng chạm khắc uốn lượn, chẳng cây thước nào đo nổi.",
        ),
      ],
    },
    eureka: {
      shot: "Bồn tắm nước tràn, Milo reo EUREKA; bình nước rộng 20 cm chỉ dâng chênh 0,4 mm (kính lúp); rồi cân đòn treo vương miện và thỏi vàng cùng 1 kg, nhúng vào chậu nước, cán cân nghiêng về phía thỏi vàng, nhãn 13 g",
      lines: [
        nar(
          "Tương truyền, khi bước vào bồn tắm, Archimedes thấy người chìm xuống bao nhiêu thì nước tràn ra bấy nhiêu, liền reo lên: Eureka, tìm ra rồi!",
          "Tương truyền, khi bước vào bồn tắm, Ác-si-mét thấy người chìm xuống bao nhiêu thì nước tràn ra bấy nhiêu, liền reo lên: Ơ-rê-ca, tìm ra rồi!",
        ),
        nar(
          "Nhưng đong nước tràn thì khó: giả sử vương miện nặng 1 kg bị tráo 300 g bạc, nước trong bình rộng 20 cm chỉ dâng cao hơn chừng 0,4 mm.",
          "Nhưng đong nước tràn thì khó: giả sử vương miện nặng một ki-lô-gam bị tráo ba trăm gam bạc, nước trong bình rộng hai mươi xen-ti-mét chỉ dâng cao hơn chừng không phẩy bốn mi-li-mét.",
        ),
        nar(
          "Năm 1586, Galileo cho rằng Archimedes đã dùng một chiếc cân: treo vương miện và một thỏi vàng nặng y hệt lên hai đầu cân, rồi nhúng cả hai vào nước.",
          "Năm một nghìn năm trăm tám mươi sáu, Ga-li-lê cho rằng Ác-si-mét đã dùng một chiếc cân: treo vương miện và một thỏi vàng nặng y hệt lên hai đầu cân, rồi nhúng cả hai vào nước.",
        ),
        nar(
          "Cân lập tức nghiêng về phía thỏi vàng, chênh khoảng 13 gam, nhìn là thấy. Vương miện to hơn nên bị nước đẩy lên mạnh hơn: nó có pha bạc!",
          "Cân lập tức nghiêng về phía thỏi vàng, chênh khoảng mười ba gam, nhìn là thấy. Vương miện to hơn nên bị nước đẩy lên mạnh hơn: nó có pha bạc!",
        ),
      ],
    },
    theorem: {
      shot: "Cận cảnh chậu nước: mũi tên lực đẩy hướng lên dưới vương miện dài hơn dưới thỏi vàng; khối nước 13 cm³ tách ra đặt lên đĩa cân 13 g; trang KHTN 8 mở ra, công thức FA = d · V",
      lines: [
        nar(
          "Bí mật nằm ở lực đẩy của nước: vật chìm trong nước bị đẩy lên một lực bằng đúng trọng lượng phần nước mà nó chiếm chỗ.",
          "Bí mật nằm ở lực đẩy của nước: vật chìm trong nước bị đẩy lên một lực bằng đúng trọng lượng phần nước mà nó chiếm chỗ.",
        ),
        nar(
          "Vương miện chiếm chỗ nhiều hơn thỏi vàng khoảng 13 cm³ nước, nên được nâng thêm đúng sức nặng của 13 gam nước.",
          "Vương miện chiếm chỗ nhiều hơn thỏi vàng khoảng mười ba xen-ti-mét khối nước, nên được nâng thêm đúng sức nặng của mười ba gam nước.",
        ),
        nar(
          "Lực ấy chính là Lực đẩy Archimedes, FA = d · V, mà bạn học trong Khoa học tự nhiên lớp 8: vật chiếm chỗ càng nhiều, càng bị đẩy mạnh.",
          "Lực ấy chính là Lực đẩy Ác-si-mét, ép a bằng đê nhân vê, mà bạn học trong Khoa học tự nhiên lớp tám: vật chiếm chỗ càng nhiều, càng bị đẩy mạnh.",
        ),
      ],
    },
    realworld: {
      shot: "Phòng thí nghiệm thể thao: Milo (vai kỹ thuật viên) cân một vận động viên trên cạn, rồi cân khi người đó ngồi ghế treo chìm hẳn trong bể nước; hai khối cùng nặng, khối mỡ to hơn khối cơ",
      lines: [
        nar(
          "Ngày nay, mẹo cân trong nước vẫn được dùng để đo tỉ lệ mỡ cơ thể, gọi là cân thủy tĩnh.",
          "Ngày nay, mẹo cân trong nước vẫn được dùng để đo tỉ lệ mỡ cơ thể, gọi là cân thủy tĩnh.",
        ),
        nar(
          "Người ta cân bạn trên cạn, rồi cân lại khi bạn ngồi chìm hẳn trong bể nước. Hai lần cân chênh nhau bao nhiêu, nước đã bị chiếm chỗ bấy nhiêu.",
          "Người ta cân bạn trên cạn, rồi cân lại khi bạn ngồi chìm hẳn trong bể nước. Hai lần cân chênh nhau bao nhiêu, nước đã bị chiếm chỗ bấy nhiêu.",
        ),
        nar(
          "Mỡ nhẹ hơn cơ và xương, nên cùng cân nặng, người nhiều mỡ to hơn, bị nước đẩy mạnh hơn, và cân dưới nước nhẹ hơn.",
          "Mỡ nhẹ hơn cơ và xương, nên cùng cân nặng, người nhiều mỡ to hơn, bị nước đẩy mạnh hơn, và cân dưới nước nhẹ hơn.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Sao Thổ đặt cạnh 95 quả Trái Đất trên đĩa cân; rồi Sao Thổ nổi lềnh bềnh trong một bồn tắm khổng lồ; kết: thu về chậu nước, chiếc cân và vương miện nguyên vẹn",
      lines: [
        nar(
          "Còn nếu đặt cả một hành tinh vào phép so ấy? Sao Thổ nặng gấp khoảng 95 lần Trái Đất.",
          "Còn nếu đặt cả một hành tinh vào phép so ấy? Sao Thổ nặng gấp khoảng chín mươi lăm lần Trái Đất.",
        ),
        nar(
          "Nhưng nó to đến mức, theo NASA, khối lượng riêng trung bình chỉ khoảng 0,69 g/cm³, nhỏ hơn cả nước. Vật có khối lượng riêng nhỏ hơn nước thì nổi.",
          "Nhưng nó to đến mức, theo Na-sa, khối lượng riêng trung bình chỉ khoảng không phẩy sáu chín gam trên mỗi xen-ti-mét khối, nhỏ hơn cả nước. Vật có khối lượng riêng nhỏ hơn nước thì nổi.",
        ),
        nar(
          "Nên NASA nói vui: nếu có một bồn tắm đủ lớn, Sao Thổ sẽ nổi. Còn để bắt quả tang người thợ năm xưa, chỉ cần một chiếc cân, một chậu nước, và chiếc vương miện không một vết xước.",
          "Nên Na-sa nói vui: nếu có một bồn tắm đủ lớn, Sao Thổ sẽ nổi. Còn để bắt quả tang người thợ năm xưa, chỉ cần một chiếc cân, một chậu nước, và chiếc vương miện không một vết xước.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 6,
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
      shot: "Milo vai Johann Bernoulli cầm tờ tạp chí năm 1696, trước mặt là điểm A trên cao và điểm B thấp hơn lệch sang bên, ba máng trượt trống chờ viên bi",
      lines: [
        nar(
          "Thả một viên bi trượt từ điểm A trên cao xuống điểm B thấp hơn. Uốn máng theo hình gì thì bi về đích nhanh nhất?",
          "Thả một viên bi trượt từ điểm A trên cao xuống điểm Bê thấp hơn. Uốn máng theo hình gì thì bi về đích nhanh nhất?",
        ),
        nar(
          "Năm 1696, Johann Bernoulli đăng câu hỏi này để thách đố các nhà toán học châu Âu.",
          "Năm một nghìn sáu trăm chín mươi sáu, Giô-han Béc-nu-li đăng câu hỏi này để thách đố các nhà toán học châu Âu.",
        ),
        nar(
          "Và người thắng cuộc không phải đường thẳng ngắn nhất.",
          "Và người thắng cuộc không phải đường thẳng ngắn nhất.",
        ),
      ],
    },
    barrier: {
      shot: "Máng thẳng A–B dốc đều thoai thoải, bi bò chậm (✖); máng gãy rơi thẳng đứng rồi chạy ngang, bi nhanh nhưng đường quá dài (✖); Galileo 1638 vẽ cung tròn, gắn dấu hỏi",
      lines: [
        nar(
          "Máng thẳng ngắn nhất, nhưng dốc thoai thoải suốt đường nên bi tăng tốc rất chậm.",
          "Máng thẳng ngắn nhất, nhưng dốc thoai thoải suốt đường nên bi tăng tốc rất chậm.",
        ),
        nar(
          "Cho bi rơi thẳng đứng rồi mới chạy ngang thì nhanh thật, nhưng quãng đường lại dài ra quá nhiều.",
          "Cho bi rơi thẳng đứng rồi mới chạy ngang thì nhanh thật, nhưng quãng đường lại dài ra quá nhiều.",
        ),
        nar(
          "Ngay cả Galileo năm 1638 cũng đoán nhầm rằng cung tròn là nhanh nhất.",
          "Ngay cả Ga-li-lê năm một nghìn sáu trăm ba mươi tám cũng đoán nhầm rằng cung tròn là nhanh nhất.",
        ),
      ],
    },
    eureka: {
      shot: "Tia sáng bẻ hướng qua các lớp; chồng lên là các lớp mỏng nằm ngang, viên bi bẻ hướng qua từng lớp và vẽ ra đường cycloid; bánh xe lăn với một điểm đỏ trên vành vạch đúng đường ấy; bi trên máng cycloid về B trước; góc khung: Newton bên ngọn nến, đồng hồ chỉ 4 giờ sáng",
      lines: [
        nar(
          "Bernoulli coi viên bi như tia sáng: qua những lớp có tốc độ khác nhau, ánh sáng tự bẻ hướng để tới đích sớm nhất.",
          "Béc-nu-li coi viên bi như tia sáng: qua những lớp có tốc độ khác nhau, ánh sáng tự bẻ hướng để tới đích sớm nhất.",
        ),
        nar(
          "Viên bi cũng càng xuống sâu càng nhanh. Cho bi bẻ hướng như ánh sáng qua vô số lớp mỏng, Bernoulli thu được đường cycloid.",
          "Viên bi cũng càng xuống sâu càng nhanh. Cho bi bẻ hướng như ánh sáng qua vô số lớp mỏng, Béc-nu-li thu được đường xi-clô-ít.",
        ),
        nar(
          "Đó là đường một điểm trên vành bánh xe vạch ra khi bánh lăn: dốc đứng lúc đầu để lấy tốc độ, rồi thoải dần về B.",
          "Đó là đường một điểm trên vành bánh xe vạch ra khi bánh lăn: dốc đứng lúc đầu để lấy tốc độ, rồi thoải dần về Bê.",
        ),
        nar(
          "Theo lời kể lại, Newton nhận đề khi vừa đi làm về, thức tới bốn giờ sáng thì giải xong.",
          "Theo lời kể lại, Niu-tơn nhận đề khi vừa đi làm về, thức tới bốn giờ sáng thì giải xong.",
        ),
      ],
    },
    theorem: {
      shot: "Trang Vật lí 10 mở ra: viên bi ở độ sâu h dưới điểm thả trên ba máng khác nhau, cả ba đều có cùng tốc độ v; công thức mgh = ½mv² → v = √(2gh) ở Tầng 2B",
      lines: [
        nar(
          "Chìa khóa ấy là định luật bảo toàn cơ năng mà bạn học trong Vật lí 10.",
          "Chìa khóa ấy là định luật bảo toàn cơ năng mà bạn học trong Vật lí lớp mười.",
        ),
        nar(
          "Bỏ qua ma sát, thế năng mất đi biến thành động năng, nên ở độ sâu h, bi luôn có tốc độ v = √2gh, dù máng uốn kiểu gì.",
          "Bỏ qua ma sát, thế năng mất đi biến thành động năng, nên ở độ sâu hát, bi luôn có tốc độ vê bằng căn bậc hai của hai giê hát, dù máng uốn kiểu gì.",
        ),
        nar(
          "Vậy máng nào xuống sâu sớm thì bi chạy nhanh sớm. Cycloid cân bằng vừa khít giữa xuống sâu và đi ngắn.",
          "Vậy máng nào xuống sâu sớm thì bi chạy nhanh sớm. Xi-clô-ít cân bằng vừa khít giữa xuống sâu và đi ngắn.",
        ),
      ],
    },
    realworld: {
      shot: "Ba viên bi thả ở ba độ cao khác nhau trên máng cycloid cùng chạm đáy một lúc; chuyển sang đồng hồ quả lắc Huygens năm 1673 với hai má kim loại cong hình cycloid kẹp dây treo",
      lines: [
        nar(
          "Bernoulli sững sờ khi nhận ra Huygens đã dùng đường cong này từ trước: trên máng cycloid, thả bi ở độ cao nào cũng tới đáy cùng lúc.",
          "Béc-nu-li sững sờ khi nhận ra Huy-ghen đã dùng đường cong này từ trước: trên máng xi-clô-ít, thả bi ở độ cao nào cũng tới đáy cùng lúc.",
        ),
        nar(
          "Thả càng cao, đoạn đầu càng dốc, bi càng nhanh, bù vừa khít cho quãng đường dài hơn.",
          "Thả càng cao, đoạn đầu càng dốc, bi càng nhanh, bù vừa khít cho quãng đường dài hơn.",
        ),
        nar(
          "Năm 1673, Huygens mô tả đồng hồ quả lắc có hai má kim loại cong hình cycloid, giúp quả lắc đưa rộng hay hẹp vẫn đúng nhịp.",
          "Năm một nghìn sáu trăm bảy mươi ba, Huy-ghen mô tả đồng hồ quả lắc có hai má kim loại cong hình xi-clô-ít, giúp quả lắc đưa rộng hay hẹp vẫn đúng nhịp.",
        ),
      ],
    },
    cosmic: {
      shot: "Cắt đôi Trái Đất: hầm thẳng Hà Nội – TP Hồ Chí Minh nông, 42 phút; hầm cong cùng họ cycloid chúi sâu khoảng 360 km, 14 phút; kết: thu nhỏ về viên bi lao dốc trên máng cycloid ở đầu tập",
      lines: [
        nar(
          "Giờ phóng lên cỡ hành tinh: đào hầm xuyên đất từ Hà Nội tới TP Hồ Chí Minh, thả một toa tàu không động cơ.",
          "Giờ phóng lên cỡ hành tinh: đào hầm xuyên đất từ Hà Nội tới Thành phố Hồ Chí Minh, thả một toa tàu không động cơ.",
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
          "Từ máng nhỏ tới hầm xuyên Trái Đất, bí quyết vẫn vậy: muốn viên bi về sớm, hãy cho nó lao dốc thật sớm.",
          "Từ máng nhỏ tới hầm xuyên Trái Đất, bí quyết vẫn vậy: muốn viên bi về sớm, hãy cho nó lao dốc thật sớm.",
        ),
      ],
    },
  }),
];
