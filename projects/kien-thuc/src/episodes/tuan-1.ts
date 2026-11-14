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
    ],
    hook: {
      shot: "Sa mạc Giza năm 600 TCN, Đại kim tự tháp Cheops xoay 2.5D, Stickman Thales đứng dưới chân tháp cầm 1 chiếc cọc gỗ",
      lines: [
        nar(
          "Cách đây 2.600 năm tại Ai Cập, Đại kim tự tháp Cheops đã đứng sừng sững như một ngọn núi nhân tạo suốt hai thiên niên kỷ.",
          "Cách đây hai nghìn sáu trăm năm tại Ai Cập, Đại kim tự tháp Kê-ốp đã đứng sừng sững như một ngọn núi nhân tạo suốt hai thiên niên kỷ.",
        ),
        nar(
          "Nhưng kỳ lạ thay, không một ai trong suốt 2.000 năm đó biết chính xác nó cao bao nhiêu mét!",
          "Nhưng kỳ lạ thay, không một ai trong suốt hai nghìn năm đó biết chính xác nó cao bao nhiêu mét!",
        ),
        nar(
          "Vậy mà nhà thông thái Hy Lạp Thales chỉ cần đúng một chiếc cọc gỗ đã giải gọn bài toán này. Ông đã làm thế nào?",
          "Vậy mà nhà thông thái Hy Lạp Tha-lét chỉ cần đúng một chiếc cọc gỗ đã giải gọn bài toán này. Ông đã làm thế nào?",
        ),
      ],
    },
    barrier: {
      shot: "Stickman trèo lên đỉnh thả dây dọc sườn nghiêng (186m ✖), rồi chuyển sang cắt lớp X-quang 2,3 triệu khối đá đè tâm đáy O (✖)",
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
          "Ông cắm một chiếc cọc thẳng đứng xuống cát và nhận ra: Vì Mặt Trời ở rất xa, mọi tia nắng chiếu xuống đều song song với nhau.",
          "Ông cắm một chiếc cọc thẳng đứng xuống cát và nhận ra: vì Mặt Trời ở rất xa, mọi tia nắng chiếu xuống đều song song với nhau.",
        ),
        nar(
          "Ông kiên nhẫn chờ đến khoảnh khắc mặt trời nghiêng đúng góc 45° — lúc cái bóng của chiếc cọc dài bằng chính chiều cao chiếc cọc!",
          "Ông kiên nhẫn chờ đến khoảnh khắc mặt trời nghiêng đúng góc bốn mươi lăm độ, lúc cái bóng của chiếc cọc dài bằng chính chiều cao chiếc cọc!",
        ),
        nar(
          "Ngay giây phút đó, chiều cao kim tự tháp cũng bằng đúng tổng một nửa cạnh đáy (115m) cộng với phần bóng nhô ra (31,6m), tức là 146,6m!",
          "Ngay giây phút đó, chiều cao kim tự tháp cũng bằng đúng tổng một nửa cạnh đáy một trăm mười lăm mét, cộng với phần bóng nhô ra ba mươi mốt phẩy sáu mét, tức là một trăm bốn mươi sáu phẩy sáu mét!",
        ),
      ],
    },
    theorem: {
      shot: "Mở trang SGK Toán lớp 8, dịch chuyển cọc DE song song BC trong tam giác ABC, hiện công thức AD/AB = DE/BC ở Tầng 2B",
      lines: [
        nar(
          "Nhưng nếu không có thời gian ngồi chờ nắng đúng góc 45° thì sao? Đó chính là lúc trang Sách giáo khoa Toán lớp 8 của chúng ta xuất hiện!",
          "Nhưng nếu không có thời gian ngồi chờ nắng đúng góc bốn mươi lăm độ thì sao? Đó chính là lúc trang Sách giáo khoa Toán lớp tám của chúng ta xuất hiện!",
        ),
        nar(
          "Khi đặt chiếc cọc DE song song với chiều cao BC, hai tam giác lớn và nhỏ luôn đồng dạng theo Định lý Thales: AD/AB = DE/BC.",
          "Khi đặt chiếc cọc Đê E song song với chiều cao Bê Xê, hai tam giác lớn và nhỏ luôn đồng dạng theo Định lý Tha-lét: A Đê phần A Bê, bằng Đê E phần Bê Xê.",
        ),
        nar(
          "Nhờ tỉ lệ vàng này, vào bất kỳ giờ nào có nắng, bạn chỉ cần đo bóng cọc và bóng tháp là tính ra ngay chiều cao mà chẳng cần chờ đợi!",
          "Nhờ tỉ lệ vàng này, vào bất kỳ giờ nào có nắng, bạn chỉ cần đo bóng cọc và bóng tháp là tính ra ngay chiều cao mà chẳng cần chờ đợi!",
        ),
      ],
    },
    realworld: {
      shot: "Rừng rậm không có bóng nắng, Stickman kiểm lâm giơ thước ngắm chữ L tạo góc 45° lên ngọn cây lim cổ thụ",
      lines: [
        nar(
          "Thế nhưng, nếu bước vào một khu rừng rậm âm u không hề có bóng nắng, định lý này liệu có bó tay?",
          "Thế nhưng, nếu bước vào một khu rừng rậm âm u không hề có bóng nắng, định lý này liệu có bó tay?",
        ),
        nar(
          "Không hề! Những người kiểm lâm chỉ cần ghép hai thanh gỗ bằng nhau thành chiếc thước chữ L để tự tạo tia ngắm 45° từ mắt lên ngọn cây: Đứng cách gốc bao nhiêu mét, cộng thêm chiều cao ngang mắt là ra ngay chiều cao cây!",
          "Không hề! Những người kiểm lâm chỉ cần ghép hai thanh gỗ bằng nhau thành chiếc thước chữ L để tự tạo tia ngắm bốn mươi lăm độ từ mắt lên ngọn cây: đứng cách gốc bao nhiêu mét, cộng thêm chiều cao ngang mắt là ra ngay chiều cao cây!",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Trái Đất – Mặt Trăng – Mặt Trời thẳng hàng trong Nhật thực toàn phần với tỉ lệ đồng dạng 1/400",
      lines: [
        nar(
          "Và kỳ diệu hơn cả, nếu kéo dài những đường thẳng của Thales vượt ra khỏi bầu khí quyển, bạn sẽ chạm tới bí mật của hiện tượng Nhật thực toàn phần!",
          "Và kỳ diệu hơn cả, nếu kéo dài những đường thẳng của Tha-lét vượt ra khỏi bầu khí quyển, bạn sẽ chạm tới bí mật của hiện tượng Nhật thực toàn phần!",
        ),
        nar(
          "Mặt Trời có đường kính lớn gấp 400 lần Mặt Trăng, nhưng lại nằm xa Trái Đất hơn đúng 400 lần — tạo nên hai tam giác đồng dạng khổng lồ giúp Mặt Trăng che vừa khít Mặt Trời!",
          "Mặt Trời có đường kính lớn gấp bốn trăm lần Mặt Trăng, nhưng lại nằm xa Trái Đất hơn đúng bốn trăm lần, tạo nên hai tam giác đồng dạng khổng lồ giúp Mặt Trăng che vừa khít Mặt Trời!",
        ),
        nar(
          "Từ một chiếc cọc gỗ trên cát sa mạc đến trật tự của các thiên hà — đôi khi công cụ mạnh nhất để đo cả vũ trụ lại nằm ngay trong trang vở học trò của bạn.",
          "Từ một chiếc cọc gỗ trên cát sa mạc đến trật tự của các thiên hà, đôi khi công cụ mạnh nhất để đo cả vũ trụ, lại nằm ngay trong trang vở học trò của bạn.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 2,
    week,
    theme,
    title: "Đo chu vi Trái Đất 2.200 năm trước chỉ bằng một cái giếng và một chiếc gậy",
    hudTitle: "ĐO TRÁI ĐẤT BẰNG MỘT CHIẾC GẬY",
    textbook: "Toán 7 · Hai góc so le trong",
    era: "Alexandria, Ai Cập · 240 TCN",
    question: "Nếu không có vệ tinh hay internet, bạn có nghĩ ra cách nào để tự chứng minh Trái Đất hình cầu không?",
    sources: [
      { title: "SGK Toán lớp 7 — Hai đường thẳng song song", url: "https://hanhtrangso.nxbgd.vn/" },
      { title: "NASA — Eratosthenes Measures the Earth", url: "https://www.nasa.gov/" },
    ],
    hook: {
      shot: "Thư viện Alexandria năm 240 TCN, quả địa cầu 40.000 km cùng 1 cái giếng đá và 1 chiếc gậy gỗ",
      lines: [
        nar(
          "Năm 240 TCN, khi con người chưa có máy bay, vệ tinh hay thậm chí một tấm bản đồ thế giới hoàn chỉnh...",
          "Năm hai trăm bốn mươi trước công nguyên, khi con người chưa có máy bay, vệ tinh hay thậm chí một tấm bản đồ thế giới hoàn chỉnh.",
        ),
        nar(
          "Nhà bác học Eratosthenes đã đo được chu vi Trái Đất với sai số chỉ khoảng 1% — mà không cần bước chân ra khỏi Ai Cập, chỉ nhờ một cái giếng và một chiếc gậy!",
          "Nhà bác học Ê-ra-tô-xten đã đo được chu vi Trái Đất với sai số chỉ khoảng một phần trăm, mà không cần bước chân ra khỏi Ai Cập, chỉ nhờ một cái giếng và một chiếc gậy!",
        ),
      ],
    },
    barrier: {
      shot: "Giếng nước sâu tại Syene trưa Hạ chí nắng chiếu thẳng đáy không bóng, trong khi cột ở Alexandria cách 800 km lại đổ bóng nghiêng",
      lines: [
        nar(
          "Thời cổ đại, việc đi vòng quanh Trái Đất để căng dây đo là điều hoàn toàn viển vông vì đại dương mênh mông chắn lối.",
          "Thời cổ đại, việc đi vòng quanh Trái Đất để căng dây đo là điều hoàn toàn viển vông, vì đại dương mênh mông chắn lối.",
        ),
        nar(
          "Manh mối bắt đầu từ một bức thư lạ: Tại thành phố Syene, đúng 12 giờ trưa ngày Hạ chí, ánh nắng chiếu thẳng đứng xuống tận đáy giếng sâu mà không để lại chút bóng nào!",
          "Manh mối bắt đầu từ một bức thư lạ: tại thành phố Xuyên, đúng mười hai giờ trưa ngày Hạ chí, ánh nắng chiếu thẳng đứng xuống tận đáy giếng sâu mà không để lại chút bóng nào!",
        ),
        nar(
          "Nếu mặt đất là một mặt phẳng, thì cùng giờ phút đó tại Alexandria cách 800 km về phía Bắc, mọi cây cột cũng phải không có bóng. Nhưng thực tế, chiếc cột lại đổ bóng nghiêng rất rõ!",
          "Nếu mặt đất là một mặt phẳng, thì cùng giờ phút đó tại A-lếch-xan-đri-a cách tám trăm ki lô mét về phía Bắc, mọi cây cột cũng phải không có bóng. Nhưng thực tế, chiếc cột lại đổ bóng nghiêng rất rõ!",
        ),
      ],
    },
    eureka: {
      shot: "Mặt đất uốn cong thành cung tròn, đo góc bóng gậy tại Alexandria được 7,2° = 1/50 vòng tròn 360°",
      lines: [
        nar(
          "Khoảnh khắc đó, Eratosthenes bừng tỉnh: Cách duy nhất để hai chiếc cột thẳng đứng cùng lúc có bóng khác nhau là bề mặt Trái Đất phải cong!",
          "Khoảnh khắc đó, Ê-ra-tô-xten bừng tỉnh: cách duy nhất để hai chiếc cột thẳng đứng cùng lúc có bóng khác nhau, là bề mặt Trái Đất phải cong!",
        ),
        nar(
          "Ông cắm một chiếc gậy tại Alexandria đúng trưa ngày Hạ chí và đo góc lệch giữa bóng nắng với đầu gậy: Góc đó bằng đúng 7,2°!",
          "Ông cắm một chiếc gậy tại A-lếch-xan-đri-a đúng trưa ngày Hạ chí và đo góc lệch giữa bóng nắng với đầu gậy: góc đó bằng đúng bảy phẩy hai độ!",
        ),
        nar(
          "Mà 7,2° lại chính bằng đúng 1/50 của một vòng tròn 360° trọn vẹn!",
          "Mà bảy phẩy hai độ lại chính bằng đúng một phần năm mươi của một vòng tròn ba trăm sáu mươi độ trọn vẹn!",
        ),
      ],
    },
    theorem: {
      shot: "Mở SGK Toán lớp 7 — Hai góc so le trong bằng nhau (7,2°), nhân 800 km × 50 = 40.000 km",
      lines: [
        nar(
          "Nhưng làm sao góc bóng nắng trên mặt đất lại bằng đúng góc ở tâm Trái Đất sâu hàng nghìn cây số? Câu trả lời nằm ngay ở bài Toán lớp 7: Hai góc so le trong!",
          "Nhưng làm sao góc bóng nắng trên mặt đất lại bằng đúng góc ở tâm Trái Đất sâu hàng nghìn cây số? Câu trả lời nằm ngay ở bài Toán lớp bảy: hai góc so le trong!",
        ),
        nar(
          "Vì tia nắng tại Syene và Alexandria song song với nhau, nên góc bóng gậy 7,2° trên mặt đất bằng hệt góc mở ở tâm Trái Đất. Chỉ cần lấy khoảng cách 800 km nhân với 50, ông tìm ra chu vi Trái Đất là 40.000 km!",
          "Vì tia nắng tại Xuyên và A-lếch-xan-đri-a song song với nhau, nên góc bóng gậy bảy phẩy hai độ trên mặt đất bằng hệt góc mở ở tâm Trái Đất. Chỉ cần lấy khoảng cách tám trăm ki lô mét nhân với năm mươi, ông tìm ra chu vi Trái Đất là bốn mươi nghìn ki lô mét!",
        ),
        nar(
          "Ngày nay, vệ tinh hiện đại đo qua hai cực được 40.008 km — nghĩa là phép tính bằng gậy gỗ 2.200 năm trước gần như trúng phóc!",
          "Ngày nay, vệ tinh hiện đại đo qua hai cực được bốn mươi nghìn không trăm lẻ tám ki lô mét, nghĩa là phép tính bằng gậy gỗ hai nghìn hai trăm năm trước gần như trúng phóc!",
        ),
      ],
    },
    realworld: {
      shot: "Tàu buồm trên đại dương ban đêm đo góc cao của sao Bắc Đẩu để suy ra Vĩ độ Bắc",
      lines: [
        nar(
          "Cũng nhờ nguyên lý hai tia sáng song song này, các thủy thủ hàng trăm năm qua chỉ cần đo góc cao của sao Bắc Đẩu trên đường chân trời...",
          "Cũng nhờ nguyên lý hai tia sáng song song này, các thủy thủ hàng trăm năm qua chỉ cần đo góc cao của sao Bắc Đẩu trên đường chân trời.",
        ),
        nar(
          "Góc ngước lên bao nhiêu độ thì con tàu đang ở đúng bấy nhiêu độ Vĩ Bắc — định vị giữa biển khơi mà không cần bất kỳ vệ tinh GPS nào!",
          "Góc ngước lên bao nhiêu độ thì con tàu đang ở đúng bấy nhiêu độ Vĩ Bắc, định vị giữa biển khơi mà không cần bất kỳ vệ tinh định vị nào!",
        ),
      ],
    },
    cosmic: {
      shot: "Bóng Trái Đất in lên Mặt Trăng trong đêm Nguyệt thực, tính ra khoảng cách 384.000 km từ Đất lên Trăng",
      lines: [
        nar(
          "Thậm chí, ngay sau khi biết kích thước Trái Đất, các nhà thiên văn cổ đại đã nhìn vào cái bóng của Trái Đất in lên Mặt Trăng trong đêm Nguyệt thực...",
          "Thậm chí, ngay sau khi biết kích thước Trái Đất, các nhà thiên văn cổ đại đã nhìn vào cái bóng của Trái Đất in lên Mặt Trăng trong đêm Nguyệt thực.",
        ),
        nar(
          "Thấy bóng Trái Đất rộng gấp gần 4 lần Mặt Trăng, họ tính tiếp được luôn đường kính Mặt Trăng và khoảng cách 384.000 km từ Đất lên Trăng!",
          "Thấy bóng Trái Đất rộng gấp gần bốn lần Mặt Trăng, họ tính tiếp được luôn đường kính Mặt Trăng và khoảng cách ba trăm tám mươi tư nghìn ki lô mét từ Đất lên Trăng!",
        ),
        nar(
          "Đôi chân con người có thể bị giữ lại trên mặt đất, nhưng chỉ cần một định lý hình học lớp 7, trí tuệ đã bước những bước đầu tiên ra ngoài vũ trụ.",
          "Đôi chân con người có thể bị giữ lại trên mặt đất, nhưng chỉ cần một định lý hình học lớp bảy, trí tuệ đã bước những bước đầu tiên ra ngoài vũ trụ.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 3,
    week,
    theme,
    title: "Sợi dây thừng 12 nút thắt của người Ai Cập & Định lý Pythagoras",
    hudTitle: "BÍ MẬT SỢI DÂY 12 NÚT THẮT",
    textbook: "Toán 8 · Định lý Pythagoras",
    era: "Thung lũng sông Nile · 2500 TCN",
    question: "Bạn đã từng thấy các bác thợ xây dùng mẹo đo 60 – 80 – 100 để lấy góc vuông ngoài đời chưa?",
    sources: [
      { title: "SGK Toán lớp 8 — Định lý Pythagoras", url: "https://hanhtrangso.nxbgd.vn/" },
      { title: "Britannica — Pythagorean theorem", url: "https://www.britannica.com/science/Pythagorean-theorem" },
    ],
    hook: {
      shot: "Thung lũng sông Nile 2500 TCN, sợi dây thừng 12 nút thắt phát sáng trước nền móng Kim tự tháp",
      lines: [
        nar(
          "Làm thế nào người Ai Cập cổ đại kẻ được bốn góc vuông 90° hoàn hảo cho đáy Kim tự tháp rộng bằng 10 sân bóng đá, khi nhân loại chưa hề có thước ê-ke hay tia laser?",
          "Làm thế nào người Ai Cập cổ đại kẻ được bốn góc vuông chín mươi độ hoàn hảo cho đáy Kim tự tháp rộng bằng mười sân bóng đá, khi nhân loại chưa hề có thước ê ke hay tia la-de?",
        ),
        nar(
          "Bí mật quốc gia của các Pharaoh hóa ra lại nằm gọn trong một sợi dây thừng thắt đúng 12 cái nút!",
          "Bí mật quốc gia của các Pha-ra-ông hóa ra lại nằm gọn trong một sợi dây thừng thắt đúng mười hai cái nút!",
        ),
      ],
    },
    barrier: {
      shot: "Lũ sông Nile xóa bờ ruộng; nếu góc móng dài 230m lệch 1° thì hai tường lệch nhau 4m làm sập kim tự tháp",
      lines: [
        nar(
          "Hàng năm, lũ sông Nile tràn về xóa sạch mọi bờ ruộng, buộc các kỹ sư phải chia lại đất vuông vức và dựng móng đền đài từ con số không.",
          "Hàng năm, lũ sông Nin tràn về xóa sạch mọi bờ ruộng, buộc các kỹ sư phải chia lại đất vuông vức và dựng móng đền đài từ con số không.",
        ),
        nar(
          "Nếu chỉ ngắm góc vuông bằng mắt thường, chỉ cần lệch đúng 1° ở góc móng dài 230m, hai bức tường sẽ lệch nhau tới 4m và làm sập cả kim tự tháp khi xây lên đỉnh!",
          "Nếu chỉ ngắm góc vuông bằng mắt thường, chỉ cần lệch đúng một độ ở góc móng dài hai trăm ba mươi mét, hai bức tường sẽ lệch nhau tới bốn mét và làm sập cả kim tự tháp khi xây lên đỉnh!",
        ),
      ],
    },
    eureka: {
      shot: "Kỹ sư căng dây 12 nút thành tam giác 3 - 4 - 5 khoảng nút, tạo góc vuông 90° tuyệt đối",
      lines: [
        nar(
          "Để giải bài toán sinh tử này, một nhóm kỹ sư đặc biệt gọi là 'Những người căng dây' đã lấy một sợi dây thừng thắt 12 nút cách đều nhau.",
          "Để giải bài toán sinh tử này, một nhóm kỹ sư đặc biệt gọi là Những người căng dây, đã lấy một sợi dây thừng thắt mười hai nút cách đều nhau.",
        ),
        nar(
          "Họ đóng chiếc cọc thứ nhất ở nút đầu tiên, đếm 3 khoảng đóng cọc thứ hai, đếm tiếp 4 khoảng đóng cọc thứ ba, rồi kéo căng phần dây 5 khoảng còn lại về cọc đầu!",
          "Họ đóng chiếc cọc thứ nhất ở nút đầu tiên, đếm ba khoảng đóng cọc thứ hai, đếm tiếp bốn khoảng đóng cọc thứ ba, rồi kéo căng phần dây năm khoảng còn lại về cọc đầu!",
        ),
        nar(
          "Ngay khi ba cạnh dây 3 - 4 - 5 căng thẳng tắp, góc kẹp giữa cạnh 3 và cạnh 4 tự khắc tạo thành một góc vuông 90° tuyệt đối trên mọi địa hình!",
          "Ngay khi ba cạnh dây ba, bốn, năm căng thẳng tắp, góc kẹp giữa cạnh ba và cạnh bốn tự khắc tạo thành một góc vuông chín mươi độ tuyệt đối trên mọi địa hình!",
        ),
      ],
    },
    theorem: {
      shot: "Mở SGK Toán lớp 8 — Định lý Pythagoras đảo: 3² + 4² = 5² (9 + 16 = 25)",
      lines: [
        nar(
          "Hơn một thiên niên kỷ sau, nhà toán học Pythagoras đã chứng minh bí mật của sợi dây ấy thành định lý nổi tiếng nhất trong Sách giáo khoa Toán lớp 8!",
          "Hơn một thiên niên kỷ sau, nhà toán học Pi-ta-go đã chứng minh bí mật của sợi dây ấy thành định lý nổi tiếng nhất trong Sách giáo khoa Toán lớp tám!",
        ),
        nar(
          "Theo Định lý Pythagoras đảo: Trong một tam giác, nếu bình phương hai cạnh nhỏ cộng lại bằng đúng bình phương cạnh lớn (3² + 4² = 5²), thì đó bắt buộc phải là tam giác vuông!",
          "Theo Định lý Pi-ta-go đảo: trong một tam giác, nếu bình phương hai cạnh nhỏ cộng lại bằng đúng bình phương cạnh lớn, ba bình phương cộng bốn bình phương bằng năm bình phương, thì đó bắt buộc phải là tam giác vuông!",
        ),
      ],
    },
    realworld: {
      shot: "Thợ xây hiện đại đo hai cạnh tường 60 cm – 80 cm và đường chéo 100 cm để bắt góc vuông móng nhà",
      lines: [
        nar(
          "Cho tới tận hôm nay, trên khắp các công trường xây dựng, các bác thợ cả vẫn dùng nguyên xi tuyệt chiêu của người Ai Cập cổ đại!",
          "Cho tới tận hôm nay, trên khắp các công trường xây dựng, các bác thợ cả vẫn dùng nguyên xi tuyệt chiêu của người Ai Cập cổ đại!",
        ),
        nar(
          "Khi xây móng nhà, thợ xây chỉ cần đo một vạch 60 cm, một vạch 80 cm; nếu kéo thước chéo giữa hai vạch đúng bằng 100 cm thì góc nhà đã vuông chuẩn không lệch một ly!",
          "Khi xây móng nhà, thợ xây chỉ cần đo một vạch sáu mươi xen ti mét, một vạch tám mươi xen ti mét; nếu kéo thước chéo giữa hai vạch đúng bằng một trăm xen ti mét, thì góc nhà đã vuông chuẩn không lệch một ly!",
        ),
      ],
    },
    cosmic: {
      shot: "Phương pháp Thị sai (Stellar Parallax) lấy quỹ đạo Trái Đất (150 triệu km) làm cạnh góc vuông đo khoảng cách tới các vì sao",
      lines: [
        nar(
          "Và khi phóng tam giác vuông ấy lên bầu trời đêm, các nhà thiên văn đã dựng một tam giác khổng lồ lấy chính khoảng cách từ Trái Đất tới Mặt Trời làm cạnh góc vuông!",
          "Và khi phóng tam giác vuông ấy lên bầu trời đêm, các nhà thiên văn đã dựng một tam giác khổng lồ, lấy chính khoảng cách từ Trái Đất tới Mặt Trời làm cạnh góc vuông!",
        ),
        nar(
          "Quan sát một ngôi sao vào tháng Một và tháng Bảy từ hai đầu quỹ đạo Trái Đất, họ dùng tam giác vuông để đo được khoảng cách tới những vì sao xa hàng chục năm ánh sáng!",
          "Quan sát một ngôi sao vào tháng Một và tháng Bảy từ hai đầu quỹ đạo Trái Đất, họ dùng tam giác vuông để đo được khoảng cách tới những vì sao xa hàng chục năm ánh sáng!",
        ),
        nar(
          "Từ 12 nút thắt trên bãi bùn sông Nile đến thước đo những vì sao — toàn bộ nền văn minh của chúng ta đều được dựng lên từ một góc vuông giản dị.",
          "Từ mười hai nút thắt trên bãi bùn sông Nin đến thước đo những vì sao, toàn bộ nền văn minh của chúng ta đều được dựng lên từ một góc vuông giản dị.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 4,
    week,
    theme,
    title: "Đào hầm xuyên núi từ hai đầu — Làm sao gặp nhau giữa lòng đá đặc?",
    hudTitle: "ĐÀO HẦM XUYÊN NÚI TỪ HAI ĐẦU",
    textbook: "Toán 10 · Định lý Sin & Cosin",
    era: "Hy Lạp cổ đại & Hầm Hải Vân",
    question: "Mỗi lần đi qua Hầm Hải Vân hay hầm đường bộ, bạn có từng tự hỏi làm sao họ đào xuyên núi mà không bị lệch hướng không?",
    sources: [
      { title: "SGK Toán lớp 10 — Hệ thức lượng trong tam giác", url: "https://hanhtrangso.nxbgd.vn/" },
      { title: "Britannica — Tunnel of Eupalinos", url: "https://www.britannica.com/" },
    ],
    hook: {
      shot: "Mặt cắt quả núi đá dài hơn 6 km, hai đội khoan từ hai sườn núi đối diện tiến vào giữa lòng đá đặc",
      lines: [
        nar(
          "Khi đào một đường hầm xuyên núi dài hơn 6 km như Hầm Hải Vân, để tiết kiệm một nửa thời gian, các kỹ sư buộc phải khoan đồng thời từ hai sườn núi đối diện vào giữa!",
          "Khi đào một đường hầm xuyên núi dài hơn sáu ki lô mét như Hầm Hải Vân, để tiết kiệm một nửa thời gian, các kỹ sư buộc phải khoan đồng thời từ hai sườn núi đối diện vào giữa!",
        ),
        nar(
          "Nhưng trong lòng đá đặc quánh hàng triệu tấn, không nhìn thấy nhau và cũng không có sóng GPS, làm sao hai mũi khoan gặp nhau ở giữa núi mà chỉ lệch vài centimet?",
          "Nhưng trong lòng đá đặc quánh hàng triệu tấn, không nhìn thấy nhau và cũng không có sóng định vị, làm sao hai mũi khoan gặp nhau ở giữa núi mà chỉ lệch vài xen ti mét?",
        ),
      ],
    },
    barrier: {
      shot: "Nếu lệch góc 0,5° sau 3 km đào hầm, hai đường hầm sẽ trượt qua nhau gần 30m thành hai hang cụt",
      lines: [
        nar(
          "Sai lầm ở đây không có chỗ để sửa: Chỉ cần lệch góc nửa độ (0,5°), sau 3 km đào hầm, hai đội sẽ đi trượt qua nhau tới gần 30m — biến một đường hầm thành hai cái hang cụt!",
          "Sai lầm ở đây không có chỗ để sửa: chỉ cần lệch góc nửa độ, sau ba ki lô mét đào hầm, hai đội sẽ đi trượt qua nhau tới gần ba mươi mét, biến một đường hầm thành hai cái hang cụt!",
        ),
        nar(
          "Bạn cũng không thể kéo một sợi dây thẳng tắp vượt qua đỉnh núi dựng đứng hay nhìn xuyên qua khối đá để ngắm hướng giữa cửa Bắc và cửa Nam!",
          "Bạn cũng không thể kéo một sợi dây thẳng tắp vượt qua đỉnh núi dựng đứng, hay nhìn xuyên qua khối đá để ngắm hướng giữa cửa Bắc và cửa Nam!",
        ),
      ],
    },
    eureka: {
      shot: "Chọn đỉnh mốc C bên ngoài sườn núi nhìn thấy cả hai cửa hầm A và B, tạo thành tam giác ABC",
      lines: [
        nar(
          "Thế nhưng từ 2.500 năm trước, khi đào đường hầm Eupalinos xuyên núi ở Hy Lạp cho đến các kỹ sư hiện đại, con người đã dùng một lối đi vòng cực kỳ thông minh!",
          "Thế nhưng từ hai nghìn năm trăm năm trước, khi đào đường hầm Ơ-pa-li-nốt xuyên núi ở Hy Lạp cho đến các kỹ sư hiện đại, con người đã dùng một lối đi vòng cực kỳ thông minh!",
        ),
        nar(
          "Không nhìn xuyên được qua núi từ A sang B, các kỹ sư chọn một đỉnh mốc C bên ngoài sườn núi — nơi có thể nhìn thấy rõ cả hai cửa hầm A và B!",
          "Không nhìn xuyên được qua núi từ A sang Bê, các kỹ sư chọn một đỉnh mốc Xê bên ngoài sườn núi, nơi có thể nhìn thấy rõ cả hai cửa hầm A và Bê!",
        ),
        nar(
          "Khi đó, hai đường ngắm bên ngoài và trục hầm xuyên núi hợp thành một tam giác ABC mà ta đo được dễ dàng hai cạnh ngoài trời cùng góc kẹp giữa chúng!",
          "Khi đó, hai đường ngắm bên ngoài và trục hầm xuyên núi hợp thành một tam giác A Bê Xê, mà ta đo được dễ dàng hai cạnh ngoài trời cùng góc kẹp giữa chúng!",
        ),
      ],
    },
    theorem: {
      shot: "Mở SGK Toán lớp 10 — Định lý Cosin và Định lý Sin tính chính xác cạnh AB và góc khoan tại A, B",
      lines: [
        nar(
          "Và để tính chính xác độ dài cũng như góc khoan của cạnh AB nằm khuất trong lòng núi, các kỹ sư mở đúng công thức trong Sách giáo khoa Toán lớp 10!",
          "Và để tính chính xác độ dài cũng như góc khoan của cạnh A Bê nằm khuất trong lòng núi, các kỹ sư mở đúng công thức trong Sách giáo khoa Toán lớp mười!",
        ),
        nar(
          "Nhờ Định lý Cosin (c² = a² + b² - 2ab·cosC), họ tính ra độ dài chính xác của đường hầm; và nhờ Định lý Sin, họ tìm ra góc khoan tại cửa A và cửa B chính xác tới từng giây độ!",
          "Nhờ Định lý Cô-sin, xê bình phương bằng a bình phương cộng bê bình phương trừ hai a bê cô-sin Xê, họ tính ra độ dài chính xác của đường hầm; và nhờ Định lý Sin, họ tìm ra góc khoan tại cửa A và cửa Bê chính xác tới từng giây độ!",
        ),
      ],
    },
    realworld: {
      shot: "Tia laser dẫn hướng trong lòng hầm kết hợp lưới tam giác trắc địa ôm quanh đèo Hải Vân",
      lines: [
        nar(
          "Khi bắt đầu khoan sâu vào lòng núi, các kỹ sư lắp máy chiếu tia laser dọc theo đúng góc đã tính để dẫn đường cho máy đào không lệch một milimet.",
          "Khi bắt đầu khoan sâu vào lòng núi, các kỹ sư lắp máy chiếu tia la-de dọc theo đúng góc đã tính, để dẫn đường cho máy đào không lệch một mi li mét.",
        ),
        nar(
          "Thậm chí với những dãy núi ngoằn ngoèo như đèo Hải Vân, họ nối hàng chục tam giác liên tiếp quanh núi thành một 'lưới tam giác trắc địa' khóa chặt tọa độ hai đầu hầm!",
          "Thậm chí với những dãy núi ngoằn ngoèo như đèo Hải Vân, họ nối hàng chục tam giác liên tiếp quanh núi thành một lưới tam giác trắc địa, khóa chặt tọa độ hai đầu hầm!",
        ),
      ],
    },
    cosmic: {
      shot: "Đường hầm Eo biển Manche dài 50 km dưới đáy đại dương giữa Anh và Pháp gặp nhau lệch chưa tới một gang tay",
      lines: [
        nar(
          "Đỉnh cao của phương pháp này là khi nhân loại đào đường hầm Eo biển Manche dài tới 50 km nằm sâu dưới đáy biển nối liền nước Anh và nước Pháp!",
          "Đỉnh cao của phương pháp này là khi nhân loại đào đường hầm Eo biển Măng-sơ dài tới năm mươi ki lô mét nằm sâu dưới đáy biển, nối liền nước Anh và nước Pháp!",
        ),
        nar(
          "Hai cỗ máy khoan khổng lồ xuất phát từ hai quốc gia, đi ngầm dưới đáy đại dương suốt ba năm trời, rồi gặp nhau giữa lòng biển với độ lệch tâm chưa tới một gang tay!",
          "Hai cỗ máy khoan khổng lồ xuất phát từ hai quốc gia, đi ngầm dưới đáy đại dương suốt ba năm trời, rồi gặp nhau giữa lòng biển với độ lệch tâm chưa tới một gang tay!",
        ),
        nar(
          "Toán học không cho chúng ta đôi mắt nhìn xuyên qua đá tảng, nhưng lại trao cho con người chiếc la bàn để đi xuyên qua cả những ngọn núi hùng vĩ nhất.",
          "Toán học không cho chúng ta đôi mắt nhìn xuyên qua đá tảng, nhưng lại trao cho con người chiếc la bàn, để đi xuyên qua cả những ngọn núi hùng vĩ nhất.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 5,
    week,
    theme,
    title: "Chiếc vương miện vàng & Lực đẩy Archimedes",
    hudTitle: "VƯƠNG MIỆN VÀNG & ĐIỂM TỰA ARCHIMEDES",
    textbook: "Vật lý 8 · Lực đẩy Archimedes",
    era: "Syracuse, Hy Lạp · 250 TCN",
    question: "Theo bạn, câu nói 'Hãy cho tôi một điểm tựa, tôi sẽ nhấc bổng Trái Đất' của Archimedes là nói quá hay hoàn toàn tính được bằng toán học?",
    sources: [
      { title: "SGK Khoa học tự nhiên / Vật lý 8 — Lực đẩy Archimedes", url: "https://hanhtrangso.nxbgd.vn/" },
      { title: "Britannica — Archimedes' principle", url: "https://www.britannica.com/science/Archimedes-principle" },
    ],
    hook: {
      shot: "Cung điện Syracuse năm 250 TCN, vua Hiero II giao chiếc vương miện vàng cho Archimedes kiểm tra mà cấm làm trầy xước",
      lines: [
        nar(
          "Nhà vua Hiero II giao cho thợ kim hoàn một thỏi vàng ròng để đúc vương miện, nhưng khi nhận lại, ông nghi ngờ người thợ đã lén ăn bớt vàng rồi pha bạc vào bên trong!",
          "Nhà vua Hi-ê-rô hai giao cho thợ kim hoàn một thỏi vàng ròng để đúc vương miện, nhưng khi nhận lại, ông nghi ngờ người thợ đã lén ăn bớt vàng rồi pha bạc vào bên trong!",
        ),
        nar(
          "Nhà vua ra một đề bài hóc búa cho nhà bác học Archimedes: Phải vạch trần sự gian dối này mà tuyệt đối không được nấu chảy hay làm trầy xước chiếc vương miện!",
          "Nhà vua ra một đề bài hóc búa cho nhà bác học Ác-si-mét: phải vạch trần sự gian dối này, mà tuyệt đối không được nấu chảy hay làm trầy xước chiếc vương miện!",
        ),
      ],
    },
    barrier: {
      shot: "Cân khô chỉ đúng 1 kg bằng nhau (✖), hoa văn lá nguyệt quế tinh xảo không thể dùng thước đo thể tích (✖)",
      lines: [
        nar(
          "Nếu chỉ đặt lên bàn cân thông thường thì vô ích: Vì người thợ rất tinh vi, hắn rút ra bao nhiêu gam vàng thì bù vào đúng bấy nhiêu gam bạc để cân nặng y hệt ban đầu!",
          "Nếu chỉ đặt lên bàn cân thông thường thì vô ích: vì người thợ rất tinh vi, hắn rút ra bao nhiêu gam vàng thì bù vào đúng bấy nhiêu gam bạc, để cân nặng y hệt ban đầu!",
        ),
        nar(
          "Muốn biết có pha bạc hay không thì phải đo được thể tích của vương miện, nhưng với hàng trăm chiếc lá vàng chạm khắc uốn lượn, không một cây thước hình học nào đo nổi!",
          "Muốn biết có pha bạc hay không thì phải đo được thể tích của vương miện, nhưng với hàng trăm chiếc lá vàng chạm khắc uốn lượn, không một cây thước hình học nào đo nổi!",
        ),
      ],
    },
    eureka: {
      shot: "Nước tràn bồn tắm EUREKA; treo thỏi vàng và vương miện vào hai đầu cân đòn bẩy rồi nhúng chìm vào bể nước",
      lines: [
        nar(
          "Bế tắc suốt nhiều ngày, cho đến khi bước vào bồn tắm đầy ắp, Archimedes chợt thấy nước tràn ra sàn tương ứng đúng với phần cơ thể mình chìm xuống!",
          "Bế tắc suốt nhiều ngày, cho đến khi bước vào bồn tắm đầy ắp, Ác-si-mét chợt thấy nước tràn ra sàn tương ứng đúng với phần cơ thể mình chìm xuống!",
        ),
        nar(
          "Ông reo lên 'Eureka — Tìm ra rồi!': Vì bạc nhẹ hơn vàng gần một nửa, nên nếu vương miện bị pha bạc, dù có cùng cân nặng nó bắt buộc phải có thể tích phình to hơn vàng nguyên chất!",
          "Ông reo lên Ơ-rê-ka, tìm ra rồi! Vì bạc nhẹ hơn vàng gần một nửa, nên nếu vương miện bị pha bạc, dù có cùng cân nặng, nó bắt buộc phải có thể tích phình to hơn vàng nguyên chất!",
        ),
        nar(
          "Thay vì chỉ đong nước tràn dễ sai số, Archimedes treo thỏi vàng mẫu và chiếc vương miện vào hai đầu một chiếc cân đòn bẩy, rồi nhúng chìm cả hai xuống bể nước: Lập tức cán cân nghiêng hẳn xuống phía thỏi vàng!",
          "Thay vì chỉ đong nước tràn dễ sai số, Ác-si-mét treo thỏi vàng mẫu và chiếc vương miện vào hai đầu một chiếc cân đòn bẩy, rồi nhúng chìm cả hai xuống bể nước: lập tức cán cân nghiêng hẳn xuống phía thỏi vàng!",
        ),
      ],
    },
    theorem: {
      shot: "Mở SGK Vật lý lớp 8 — Công thức Lực đẩy Archimedes F_A = d·V và Quy tắc Đòn bẩy F₁·l₁ = F₂·l₂",
      lines: [
        nar(
          "Chiếc cân định mệnh ấy chính là sự kết hợp hoàn hảo của hai định luật kinh điển trong Sách giáo khoa Vật lý lớp 8!",
          "Chiếc cân định mệnh ấy chính là sự kết hợp hoàn hảo của hai định luật kinh điển trong Sách giáo khoa Vật lý lớp tám!",
        ),
        nar(
          "Theo công thức F_A = d · V, vật nào có thể tích V lớn hơn sẽ bị nước đẩy lên mạnh hơn. Vương miện bị pha bạc nên to hơn, chịu lực đẩy lớn hơn và bị hất bồng lên ngay trước mắt nhà vua!",
          "Theo công thức ép A bằng đê nhân vê, vật nào có thể tích vê lớn hơn sẽ bị nước đẩy lên mạnh hơn. Vương miện bị pha bạc nên to hơn, chịu lực đẩy lớn hơn và bị hất bồng lên ngay trước mắt nhà vua!",
        ),
      ],
    },
    realworld: {
      shot: "Tàu biển bằng thép nặng 100.000 tấn nổi trên đại dương nhờ khoang rỗng tăng thể tích V",
      lines: [
        nar(
          "Chính định luật từ bồn tắm của Archimedes đã giải thích vì sao một viên bi sắt thì chìm nghỉm, nhưng con tàu thép nặng 100.000 tấn lại nổi hiên ngang trên đại dương!",
          "Chính định luật từ bồn tắm của Ác-si-mét đã giải thích vì sao một viên bi sắt thì chìm nghỉm, nhưng con tàu thép nặng một trăm nghìn tấn lại nổi hiên ngang trên đại dương!",
        ),
        nar(
          "Bằng cách làm rỗng lòng tàu để tăng thể tích V lên hàng trăm nghìn mét khối, lực đẩy của nước dễ dàng nâng bổng cả tòa lâu đài thép trên mặt biển!",
          "Bằng cách làm rỗng lòng tàu để tăng thể tích vê lên hàng trăm nghìn mét khối, lực đẩy của nước dễ dàng nâng bổng cả tòa lâu đài thép trên mặt biển!",
        ),
      ],
    },
    cosmic: {
      shot: "Đòn bẩy vũ trụ của Archimedes nhấc Trái Đất với tỉ lệ khối lượng 10²³ lần và quãng đường đẩy 1 tỷ năm ánh sáng",
      lines: [
        nar(
          "Không dừng lại ở đó, khi khám phá ra quy tắc Đòn bẩy, Archimedes đã tuyên bố câu nói bất hủ: 'Hãy cho tôi một điểm tựa, tôi sẽ nhấc bổng cả Trái Đất!'",
          "Không dừng lại ở đó, khi khám phá ra quy tắc Đòn bẩy, Ác-si-mét đã tuyên bố câu nói bất hủ: Hãy cho tôi một điểm tựa, tôi sẽ nhấc bổng cả Trái Đất!",
        ),
        nar(
          "Về mặt toán học, ông hoàn toàn đúng! Chỉ có điều Trái Đất nặng gấp 10²³ lần cơ thể người, nên để nhấc Trái Đất nhích lên đúng 1 cm, Archimedes sẽ phải đẩy đầu đòn bẩy bên kia đi một quãng đường dài... hơn một tỷ năm ánh sáng!",
          "Về mặt toán học, ông hoàn toàn đúng! Chỉ có điều Trái Đất nặng gấp mười mũ hai mươi ba lần cơ thể người, nên để nhấc Trái Đất nhích lên đúng một xen ti mét, Ác-si-mét sẽ phải đẩy đầu đòn bẩy bên kia đi một quãng đường dài hơn một tỷ năm ánh sáng!",
        ),
        nar(
          "Dù không ai sống đủ lâu để đi hết cánh tay đòn ấy, các định luật vật lý từ hai nghìn năm trước vẫn đang nâng đỡ từng con tàu và từng giấc mơ chinh phục vũ trụ của con người.",
          "Dù không ai sống đủ lâu để đi hết cánh tay đòn ấy, các định luật vật lý từ hai nghìn năm trước vẫn đang nâng đỡ từng con tàu và từng giấc mơ chinh phục vũ trụ của con người.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 6,
    week,
    theme,
    title: "Bí mật Đường cong nhanh nhất — Tại sao đường thẳng chưa chắc về đích sớm nhất?",
    hudTitle: "ĐƯỜNG THẲNG CÓ PHẢI ĐƯỜNG NHANH NHẤT?",
    textbook: "Toán 9 & Vật lý 10 · Parabol & Cơ năng",
    era: "Châu Âu · Lời thách đố 1696",
    question: "Trước khi xem video này, nếu được chọn 1 trong 3 đường trượt để đua xuống dốc, bạn sẽ chọn đường nào?",
    sources: [
      { title: "SGK Toán lớp 9 — Đồ thị hàm số y = ax²", url: "https://hanhtrangso.nxbgd.vn/" },
      { title: "Britannica — Brachistochrone problem", url: "https://www.britannica.com/science/brachistochrone" },
    ],
    hook: {
      shot: "Lời thách đố năm 1696 của Johann Bernoulli: Đua 3 viên bi lăn từ điểm A trên cao xuống điểm B ở thấp",
      lines: [
        nar(
          "Ai cũng thuộc lòng câu nói: 'Đường thẳng là khoảng cách ngắn nhất giữa hai điểm'. Nhưng nếu thả một viên bi lăn từ điểm A trên cao xuống điểm B ở thấp, đường thẳng có phải là đường về đích nhanh nhất?",
          "Ai cũng thuộc lòng câu nói: đường thẳng là khoảng cách ngắn nhất giữa hai điểm. Nhưng nếu thả một viên bi lăn từ điểm A trên cao xuống điểm Bê ở thấp, đường thẳng có phải là đường về đích nhanh nhất?",
        ),
        nar(
          "Năm 1696, nhà toán học Johann Bernoulli đã gửi bài toán này đi thách đố toàn bộ giới khoa học châu Âu, và câu trả lời đã làm đảo lộn trực giác của tất cả mọi người!",
          "Năm một nghìn sáu trăm chín mươi sáu, nhà toán học Giô-han Béc-nu-li đã gửi bài toán này đi thách đố toàn bộ giới khoa học châu Âu, và câu trả lời đã làm đảo lộn trực giác của tất cả mọi người!",
        ),
      ],
    },
    barrier: {
      shot: "Đường thẳng ngắn nhất nhưng dốc thoai thoải nên tăng tốc chậm (✖); đường võng quá sâu lấy đà nhanh nhưng quãng đường quá dài (✖)",
      lines: [
        nar(
          "Hãy thử phương án đầu tiên là Đường thẳng: Dù quãng đường ngắn nhất, nhưng vì độ dốc quá thoai thoải nên viên bi tăng tốc cực kỳ chậm chạp!",
          "Hãy thử phương án đầu tiên là Đường thẳng: dù quãng đường ngắn nhất, nhưng vì độ dốc quá thoai thoải nên viên bi tăng tốc cực kỳ chậm chạp!",
        ),
        nar(
          "Còn nếu cho bi rơi thẳng đứng xuống thật sâu để lấy vận tốc tối đa rồi mới chạy ngang sang B? Viên bi lao đi rất nhanh lúc đầu, nhưng quãng đường lại bị kéo dài quá mức nên vẫn thua cuộc!",
          "Còn nếu cho bi rơi thẳng đứng xuống thật sâu để lấy vận tốc tối đa rồi mới chạy ngang sang Bê? Viên bi lao đi rất nhanh lúc đầu, nhưng quãng đường lại bị kéo dài quá mức nên vẫn thua cuộc!",
        ),
      ],
    },
    eureka: {
      shot: "Isaac Newton tìm ra đường cong Cycloid (quỹ đạo điểm trên vành bánh xe lăn) về đích đầu tiên và có tính đẳng thời",
      lines: [
        nar(
          "Khi bài toán gửi tới tay Isaac Newton, ông chỉ mất đúng một đêm thức trắng để tìm ra đường cong chiến thắng: Đó là đường Cycloid — quỹ đạo của một điểm nằm trên vành bánh xe đang lăn!",
          "Khi bài toán gửi tới tay I-sắc Niu-tơn, ông chỉ mất đúng một đêm thức trắng để tìm ra đường cong chiến thắng: đó là đường Xi-clô-ít, quỹ đạo của một điểm nằm trên vành bánh xe đang lăn!",
        ),
        nar(
          "Đường cong này tạo ra sự cân bằng hoàn hảo: Đủ dốc ở ngay đoạn đầu để trọng lực kéo viên bi vọt lên tốc độ cao, rồi uốn mượt mà để giữ trọn đà lao về đích sớm nhất!",
          "Đường cong này tạo ra sự cân bằng hoàn hảo: đủ dốc ở ngay đoạn đầu để trọng lực kéo viên bi vọt lên tốc độ cao, rồi uốn mượt mà để giữ trọn đà lao về đích sớm nhất!",
        ),
        nar(
          "Kỳ lạ hơn nữa, trên đường cong này, dù bạn thả viên bi từ đỉnh cao hay từ lưng chừng dốc, tất cả đều chạm tới điểm đáy trong cùng một khoảng thời gian y hệt nhau!",
          "Kỳ lạ hơn nữa, trên đường cong này, dù bạn thả viên bi từ đỉnh cao hay từ lưng chừng dốc, tất cả đều chạm tới điểm đáy trong cùng một khoảng thời gian y hệt nhau!",
        ),
      ],
    },
    theorem: {
      shot: "Mở SGK Vật lý 10 (Bảo toàn cơ năng v = √2gh) và Toán 9 (Đường cong Parabol y = ax² hội tụ tại tiêu điểm F)",
      lines: [
        nar(
          "Bí mật đằng sau những đường cong kỳ diệu ấy bắt nguồn ngay từ bài Bảo toàn cơ năng trong Vật lý 10 và họ hàng gần của nó trong Toán lớp 9: Đường cong Parabol!",
          "Bí mật đằng sau những đường cong kỳ diệu ấy bắt nguồn ngay từ bài Bảo toàn cơ năng trong Vật lý mười, và họ hàng gần của nó trong Toán lớp chín: đường cong Pa-ra-bôn!",
        ),
        nar(
          "Nếu đường Đoản thời giúp chuyển hóa độ cao thành tốc độ v = √(2gh) tối ưu nhất, thì đường cong Parabol (y = ax²) lại có khả năng gom mọi tia sáng song song hội tụ về đúng một điểm duy nhất gọi là Tiêu điểm!",
          "Nếu đường Đoản thời giúp chuyển hóa độ cao thành tốc độ tối ưu nhất, thì đường cong Pa-ra-bôn y bằng a nhân ích bình phương lại có khả năng gom mọi tia sáng song song hội tụ về đúng một điểm duy nhất, gọi là Tiêu điểm!",
        ),
      ],
    },
    realworld: {
      shot: "Mái đình chùa cổ Việt Nam ('tàu đao lá mái') uốn cong giúp nước mưa trượt nhanh nhất và phóng xa khỏi chân cột gỗ",
      lines: [
        nar(
          "Ông cha ta từ hàng trăm năm trước, dù không viết phương trình vi phân, đã uốn cong mái đình chùa theo đúng dáng đường trượt nhanh ấy!",
          "Ông cha ta từ hàng trăm năm trước, dù không viết phương trình vi phân, đã uốn cong mái đình chùa theo đúng dáng đường trượt nhanh ấy!",
        ),
        nar(
          "Nhờ mái ngói dốc đứng ở trên rồi uốn cong vút lên ở diềm mái, nước mưa trượt xuống với tốc độ nhanh nhất và phóng vọt ra xa, giúp chân cột gỗ không bị ẩm mục suốt hàng thế kỷ!",
          "Nhờ mái ngói dốc đứng ở trên rồi uốn cong vút lên ở diềm mái, nước mưa trượt xuống với tốc độ nhanh nhất và phóng vọt ra xa, giúp chân cột gỗ không bị ẩm mục suốt hàng thế kỷ!",
        ),
      ],
    },
    cosmic: {
      shot: "Chảo kính thiên văn vô tuyến Parabol khổng lồ hội tụ tín hiệu sóng từ các thiên hà cách đây 13 tỷ năm ánh sáng",
      lines: [
        nar(
          "Và khi con người ngước nhìn lên bầu trời, chúng ta lại dùng chính đường cong Parabol để chế tạo những chiếc chảo kính thiên văn khổng lồ rộng hàng trăm mét!",
          "Và khi con người ngước nhìn lên bầu trời, chúng ta lại dùng chính đường cong Pa-ra-bôn để chế tạo những chiếc chảo kính thiên văn khổng lồ rộng hàng trăm mét!",
        ),
        nar(
          "Những tín hiệu sóng yếu ớt phát ra từ các thiên hà cách đây 13 tỷ năm ánh sáng, khi chạm vào lòng chảo Parabol đều được gom về đúng một tiêu điểm để kể cho chúng ta nghe lịch sử buổi bình minh của vũ trụ!",
          "Những tín hiệu sóng yếu ớt phát ra từ các thiên hà cách đây mười ba tỷ năm ánh sáng, khi chạm vào lòng chảo Pa-ra-bôn đều được gom về đúng một tiêu điểm, để kể cho chúng ta nghe lịch sử buổi bình minh của vũ trụ!",
        ),
        nar(
          "Trong toán học cũng như trong cuộc đời, con đường thẳng tắp trước mắt chưa chắc đã là con đường nhanh nhất — đôi khi một đường cong đúng quy luật mới đưa bạn đi xa nhất.",
          "Trong toán học cũng như trong cuộc đời, con đường thẳng tắp trước mắt chưa chắc đã là con đường nhanh nhất, đôi khi một đường cong đúng quy luật mới đưa bạn đi xa nhất.",
        ),
      ],
    },
  }),
];
