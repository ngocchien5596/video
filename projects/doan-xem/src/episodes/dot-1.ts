import { GUESS_PAUSE, makeEpisode, n } from "./make.ts";

// Nguồn và chỗ các nguồn vênh nhau: docs/nghien-cuu/ngay-01.md.
export const DOT_1 = [
  makeEpisode({
    day: 1,
    week: 1,
    theme: "Văn chương",
    person: "Nguyễn Du",
    known: "Truyện Kiều",
    title: "Con tể tướng, được tặng gươm báu, lớn lên lại thành người được nhớ hơn hai trăm năm",
    coverTitle: "Con tể tướng được tặng gươm báu. Là ai?",
    accent: "#5FA8A0",
    portrait: "minh-hoa",
    question: "Câu thơ nào bạn nhớ nhất trong Truyện Kiều?",
    sources: [
      { title: "Wikipedia tiếng Việt: Nguyễn Du", url: "https://vi.wikipedia.org/wiki/Nguy%E1%BB%85n_Du" },
      { title: "Wikipedia tiếng Anh: Nguyễn Du", url: "https://en.wikipedia.org/wiki/Nguy%E1%BB%85n_Du" },
      { title: "Báo Hà Tĩnh: Nguyễn Du (1765–1820)", url: "https://baohatinh.vn/nguyen-du-1765-1820-post47585.html" },
      { title: "Báo Nghệ An: Great Poet Nguyen Du: His Last Days", url: "https://baonghean.vn/en/dai-thi-hao-nguyen-du-nhung-ngay-cuoi-10033265.html" },
      { title: "Wikipedia tiếng Anh: The Tale of Kiều", url: "https://en.wikipedia.org/wiki/The_Tale_of_Kieu" },
    ],
    mo: {
      shot: "Nhóm 1, mơ hồ: dinh thự Thăng Long, gươm báu, hai ngọn nến tắt, chàng trai đi thi rồi làm quan võ, Tây Sơn ra Bắc, mười năm gió bụi.",
      lines: [
        n("Bạn thử đoán xem đây là ai nhé. Có một cậu bé sinh ra ở kinh thành Thăng Long, trong một gia đình quyền thế bậc nhất, cha cậu là tể tướng của triều Lê.", {
          ink: "dinh-thu",
          image: "doan-xem/ngay-01/thang-long.png",
          prompt: "a grand 18th century Vietnamese noble residence in Thăng Long, low tiled roofs with curved ridges, wooden pillars, courtyard with lotus pond, seen from above at dawn mist",
          chip: "Thăng Long",
        }),
        n("Theo gia phả kể lại, có một vị đại tướng từng tặng cậu một thanh gươm báu. Ai nghe cũng nghĩ, lớn lên cậu sẽ cầm quân.", { ink: "guom" }),
        n("Thế nhưng mới chừng mười tuổi, cậu đã mất cha. Chỉ mấy năm sau, mẹ cậu cũng qua đời.", { ink: "hai-ngon-nen" }),
        n("Lớn lên, chàng trai đi thi Hương và đỗ tam trường. Rồi chàng nhận một chức quan võ ở tận Thái Nguyên.", { ink: "quan-vo", chip: "Thái Nguyên" }),
        n("Sau đó quân Tây Sơn kéo ra Bắc, và cả dòng họ giàu sang bỗng chốc tan tác.", { ink: "co-tay-son" }),
        n("Chàng về quê vợ ở Thái Bình. Sau này, chính chàng gọi những năm ấy là mười năm gió bụi.", { ink: "gio-bui", chip: "Thái Bình", big: "10 năm" }),
      ],
    },
    thu: {
      shot: "Nhóm 2, thu hẹp, cú lừa 'vị tướng': núi Hồng và người đi săn, gươm cùng cung, bị bắt giữa đường vào Gia Định, làm quan ở Huế, đi sứ nhà Thanh.",
      lines: [
        n("Rồi chàng trở về quê cha ở Hà Tĩnh, và tự đặt cho mình một cái hiệu là người đi săn ở núi Hồng.", {
          ink: "nui-hong",
          image: "doan-xem/ngay-01/nui-hong.png",
          prompt: "the Hồng Lĩnh mountain range in Hà Tĩnh, Vietnam, layered misty peaks, a lone hunter seen from behind holding a bow, wearing a Vietnamese turban and long tunic, tiny figure in a vast landscape",
          chip: "Hà Tĩnh",
        }),
        n("Một quan võ, lại còn là một tay đi săn… Nghe giống một vị tướng lắm, phải không?", { ink: "guom-cung" }),
        n("Năm 1796, chàng tìm đường vào Gia Định theo Nguyễn Ánh, nhưng mới đi giữa đường thì bị bắt, phải ngồi tù ba tháng.", { ink: "nha-tu", chip: "1796" }),
        n("Mãi tới khi nhà Nguyễn lên ngôi, chàng mới ra làm quan, bắt đầu từ một chức tri huyện nhỏ, rồi lên dần tới bậc học sĩ ở kinh đô Huế.", { ink: "kinh-do", chip: "Huế" }),
        n("Năm 1813, ông được cử làm chánh sứ sang nhà Thanh. Trên suốt chặng đường dài ấy, ông làm hơn một trăm ba mươi bài thơ chữ Hán.", { ink: "di-su", chip: "1813", big: "131 bài thơ" }),
      ],
    },
    chot: {
      shot: "Nhóm 3, gần chốt: cuốn truyện mở ra với bóng người con gái, ngọn bút viết thơ lục bát, dừng đoán 3 giây có đồng hồ, lật đáp án với tranh minh hoạ và ấn đỏ.",
      lines: [
        n("Và đây là gợi ý cuối cùng. Người ấy từng đọc một cuốn truyện Trung Hoa, kể về một người con gái tài sắc mà bạc mệnh.", { ink: "cuon-truyen" }),
        n("Rồi ông kể lại câu chuyện ấy bằng hơn ba nghìn hai trăm câu thơ lục bát.", { ink: "ngon-but", big: "hơn 3.200 câu" }, { pauseAfter: GUESS_PAUSE }),
        n("Đúng rồi đấy! Đó là Nguyễn Du. Tác phẩm ấy tên là Đoạn trường tân thanh, mà chúng ta vẫn quen gọi là Truyện Kiều.", {
          ink: "lat-dap-an",
          image: "doan-xem/ngay-01/chan-dung.png",
          prompt: "an illustrated portrait of an early 19th century Vietnamese scholar-official in his fifties, thin face, wearing a black Vietnamese turban (khăn đóng) and a dark blue official robe, holding a writing brush, calm melancholic expression, upper body, plain background",
        }),
      ],
    },
    khep: {
      shot: "Khép lại: Huế năm 1820, dịch tả, ngọn nến leo lét rồi tắt; câu kết, thanh gươm mờ đi, chỉ còn ngọn bút.",
      lines: [
        n("Năm 1820, triều đình lại cử ông đi sứ thêm lần nữa. Nhưng đúng lúc ấy, dịch tả tràn tới kinh thành, và chính ông cũng bị nhiễm bệnh.", { ink: "dich-ta", chip: "1820" }),
        n("Tương truyền, con cháu bưng thuốc tới, ông không chịu uống. Người nhà sờ tay chân thấy đã lạnh cả rồi, ông chỉ khẽ đáp rằng như thế là được.", { ink: "chen-thuoc" }),
        n("Cậu bé năm xưa được tặng một thanh gươm báu. Vậy mà hơn hai trăm năm nay, người ta nhớ tới ông bằng những câu thơ.", { ink: "guom-thanh-but" }),
      ],
    },
  }),
];
