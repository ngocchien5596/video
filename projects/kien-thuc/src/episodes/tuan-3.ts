import { makeEpisode, nar } from "./make.ts";

const week = 3;
const theme = "Vật lí quanh ta";

export const TUAN_3 = [
  makeEpisode({
    day: 9,
    week,
    theme,
    title: "Nếu bị bắn mà lặn xuống nước thì có an toàn không?",
    hudTitle: "NƯỚC CÓ CẢN ĐƯỢC ĐẠN?",
    textbook: "Vật lí 10 · Lực cản và lực nâng",
    era: "Mỹ · Thí nghiệm năm 2005",
    question: "Đạn súng trường và đạn súng ngắn, viên nào đi xuống nước sâu hơn? Bạn đoán đúng không?",
    sources: [
      {
        title:
          "MythBusters, tập 34 “Bulletproof Water” (Discovery, 13/7/2005), tóm tắt kết quả trên Wikipedia: đạn siêu thanh tới cỡ .50 vỡ trong chưa tới 90 cm nước; đạn súng ngắn cần tới 2,4 m; bắn chéo thì cần ít độ sâu hơn",
        url: "https://en.wikipedia.org/wiki/MythBusters_(2005_season)#Bulletproof_Water",
      },
      {
        title:
          "David Bookstaber (2014), Shooting Bullets Into Water, Part III: Underwater Ballistics: ở tốc độ cao, đạn bẹp đầu hoặc vỡ ra rồi dừng lại sau vài feet nước",
        url: "https://david.bookstaber.com/Interests/2014/10/shooting-bullets-into-water-part-iii-underwater-ballistics/",
      },
      {
        title:
          "Diaczuk & Bongiovi (2012), What’s New on the Water Front, Viện Khoa học Pháp y Hoa Kỳ (AAFS), tóm tắt A102: đạn 9 mm bắn chéo dưới khoảng 8 độ thì nảy khỏi mặt nước",
        url: "https://www.aafs.org/sites/default/files/media/documents/AAFS-2012-A102.pdf",
      },
      {
        title: "Vật lí 10 Kết nối tri thức, Bài 19. Lực cản và lực nâng: lực cản của chất lưu phụ thuộc vào hình dạng và tốc độ của vật (VietJack)",
        url: "https://www.vietjack.com/vat-li-10-kn/ly-thuyet-bai-19-luc-can-va-luc-nang.jsp",
      },
      {
        title: "Vật lí 10 Kết nối tri thức, Hoạt động trang 77: thí nghiệm lực cản phụ thuộc tốc độ và hình dạng (VietJack)",
        url: "https://www.vietjack.com/vat-li-10-kn/hoat-dong-trang-77-vat-li-10.jsp",
      },
      {
        title: "NASA Science, Meteors and Meteorites: Facts (thiên thạch Chelyabinsk 18 km/s, nổ ở độ cao 23 km; đá nhỏ hơn sân bóng đa số vỡ trong khí quyển)",
        url: "https://science.nasa.gov/solar-system/meteors-meteorites/facts/",
      },
    ],
    hook: {
      shot: "Mặt sông, nhân vật bị truy đuổi lao xuống nước, vệt đạn lao theo, dấu hỏi NƯỚC CÓ CẢN ĐƯỢC ĐẠN? (câu 1); bể thí nghiệm có thước độ sâu, nhãn THÍ NGHIỆM 2005 (câu 2); viên đạn súng trường và súng ngắn phía trên bể, đo độ sâu, Milo gãi đầu, dấu hỏi (câu 3)",
      lines: [
        nar(
          "Trong phim hành động, có khi nhân vật bị truy đuổi lao ùm xuống sông để tránh làn đạn. Nhưng ngoài đời, nước có cản được đạn thật không?",
          "Trong phim hành động, có khi nhân vật bị truy đuổi lao ùm xuống sông để tránh làn đạn. Nhưng ngoài đời, nước có cản được đạn thật không?",
        ),
        nar(
          "Để tìm câu trả lời, năm 2005, một chương trình truyền hình khoa học của Mỹ đã làm hẳn một thí nghiệm.",
          "Để tìm câu trả lời, năm hai nghìn lẻ năm, một chương trình truyền hình khoa học của Mỹ đã làm hẳn một thí nghiệm.",
        ),
        nar(
          "Họ bắn nhiều loại đạn vào một bể nước sâu, rồi đo xem mỗi viên xuống được bao xa. Bạn đoán thử xem, súng càng mạnh thì đạn càng xuống sâu, đúng không?",
          "Họ bắn nhiều loại đạn vào một bể nước sâu, rồi đo xem mỗi viên xuống được bao xa. Bạn đoán thử xem, súng càng mạnh thì đạn càng xuống sâu, đúng không?",
        ),
      ],
    },
    barrier: {
      shot: "Bong bóng ý nghĩ: dao cắt bơ, nước mềm oặt, đóng dấu ✖ (câu 1); bể nước: viên đạn súng trường lao xuống, vỡ vụn trước vạch 90 cm (câu 2); viên đạn súng ngắn len xuống tới vạch 2,4 m, đóng dấu ✖ lên ý SÚNG MẠNH = SÂU (câu 3)",
      lines: [
        nar(
          "Nhiều người nghĩ nước mềm oặt, đạn xuyên qua như dao cắt bơ. Nhưng nước đặc hơn không khí rất nhiều, viên đạn phải gạt nước sang hai bên mới đi được.",
          "Nhiều người nghĩ nước mềm oặt, đạn xuyên qua như dao cắt bơ. Nhưng nước đặc hơn không khí rất nhiều, viên đạn phải gạt nước sang hai bên mới đi được.",
        ),
        nar(
          "Kết quả làm cả đoàn bất ngờ. Đạn súng trường bay nhanh hơn cả âm thanh, kể cả loại cỡ lớn nhất họ thử, đều vỡ vụn khi chưa xuống được chín mươi phân.",
          "Kết quả làm cả đoàn bất ngờ. Đạn súng trường bay nhanh hơn cả âm thanh, kể cả loại cỡ lớn nhất họ thử, đều vỡ vụn khi chưa xuống được chín mươi phân.",
        ),
        nar(
          "Còn đạn súng ngắn, vốn yếu hơn, lại xuống sâu tới hai mét tư mới hết nguy hiểm. Súng mạnh hơn, mà đạn lại dừng nông hơn!",
          "Còn đạn súng ngắn, vốn yếu hơn, lại xuống sâu tới hai mét tư mới hết nguy hiểm. Súng mạnh hơn, mà đạn lại dừng nông hơn!",
        ),
      ],
    },
    eureka: {
      shot: "Cầu nhảy hồ bơi, cú nhảy úp bụng xuống mặt nước, chữ BỐP! (câu 1); cận viên đạn súng trường lao vào bức tường nước: mũi bẹp ra rồi vỡ thành mảnh (câu 2); bể nước: các mảnh vỡ bị hãm lại, chìm dần, dừng trên vạch 90 cm (câu 3); viên đạn súng ngắn nguyên vẹn chậm rãi len xuống vạch 2,4 m, Milo reo (câu 4)",
      lines: [
        nar(
          "Vì sao ư? Bạn nhớ lần nhảy xuống hồ bơi mà bị úp bụng chứ. Nhảy càng cao, chạm nước càng nhanh, thì mặt nước đánh càng đau, cứ như mặt sàn.",
          "Vì sao ư? Bạn nhớ lần nhảy xuống hồ bơi mà bị úp bụng chứ. Nhảy càng cao, chạm nước càng nhanh, thì mặt nước đánh càng đau, cứ như mặt sàn.",
        ),
        nar(
          "Viên đạn cũng vậy. Đạn súng trường lao vào nước quá nhanh, nước cản lại mạnh tới mức đầu đạn bằng kim loại bị bẹp ra, rồi vỡ tan.",
          "Viên đạn cũng vậy. Đạn súng trường lao vào nước quá nhanh, nước cản lại mạnh tới mức đầu đạn bằng kim loại bị bẹp ra, rồi vỡ tan.",
        ),
        nar(
          "Mà đã vỡ thành những mảnh nhỏ méo mó, thì mảnh nào cũng bị nước hãm lại chỉ trong chớp mắt. Thế nên chưa xuống được một mét, đạn đã dừng.",
          "Mà đã vỡ thành những mảnh nhỏ méo mó, thì mảnh nào cũng bị nước hãm lại chỉ trong chớp mắt. Thế nên chưa xuống được một mét, đạn đã dừng.",
        ),
        nar(
          "Đạn súng ngắn chậm hơn, nên bị nước cản nhẹ hơn. Viên đạn không vỡ, giữ nguyên hình dạng, cứ thế len xuống sâu. Chậm mà chắc, hoá ra lại đi xa hơn.",
          "Đạn súng ngắn chậm hơn, nên bị nước cản nhẹ hơn. Viên đạn không vỡ, giữ nguyên hình dạng, cứ thế len xuống sâu. Chậm mà chắc, hoá ra lại đi xa hơn.",
        ),
      ],
    },
    theorem: {
      shot: "Bảng phấn: Vật lí 10, Bài 19, mũi tên lực cản ngược chiều viên đạn (câu 1); hai viên đạn, viên chậm mũi tên cản ngắn, viên nhanh mũi tên cản dài (câu 2); tàu ngầm đầu thon rẽ nước êm cạnh khối vuông vấp nước, câu chốt (câu 3)",
      lines: [
        nar(
          "Lực mà nước đẩy ngược lại viên đạn chính là lực cản của chất lưu, trong bài mười chín, Vật lí lớp mười.",
          "Lực mà nước đẩy ngược lại viên đạn chính là lực cản của chất lưu, trong bài mười chín, Vật lí lớp mười.",
        ),
        nar(
          "Sách viết rằng, lực cản của nước hay không khí phụ thuộc vào hình dạng và tốc độ của vật. Vật lao càng nhanh, lực cản càng lớn.",
          "Sách viết rằng, lực cản của nước hay không khí phụ thuộc vào hình dạng và tốc độ của vật. Vật lao càng nhanh, lực cản càng lớn.",
        ),
        nar(
          "Vì thế tàu ngầm mới có đầu thon và dài để rẽ nước. Nói gọn lại, vật lao vào nước càng nhanh thì càng bị cản mạnh.",
          "Vì thế tàu ngầm mới có đầu thon và dài để rẽ nước. Nói gọn lại, vật lao vào nước càng nhanh thì càng bị cản mạnh.",
        ),
      ],
    },
    realworld: {
      shot: "Bể nước: vạch 90 cm (súng trường) và 2,4 m (súng ngắn), dưới 2,4 m là VÙNG AN TOÀN; đường đạn bắn chéo dài hơn đường thẳng đứng (câu 1); đạn bắn chéo thấp, góc dưới 8°, chạm mặt nước rồi nảy lên như ném thia lia (câu 2); viên đạn bay tiếp về phía bờ bên kia, biển cảnh báo (câu 3)",
      lines: [
        nar(
          "Vậy nước có cản được đạn không? Có, nhưng phải đủ sâu. Với đạn súng ngắn là hơn hai mét tư. Còn bắn chéo thì đạn đi đường dài hơn, nên chẳng cần sâu thế.",
          "Vậy nước có cản được đạn không? Có, nhưng phải đủ sâu. Với đạn súng ngắn là hơn hai mét tư. Còn bắn chéo thì đạn đi đường dài hơn, nên chẳng cần sâu thế.",
        ),
        nar(
          "Có điều, nếu bắn chéo thật thấp, dưới khoảng tám độ, thì đạn lại chẳng xuống nước. Các chuyên gia pháp y thấy nó nảy bật lên, như hòn đá ném thia lia.",
          "Có điều, nếu bắn chéo thật thấp, dưới khoảng tám độ, thì đạn lại chẳng xuống nước. Các chuyên gia pháp y thấy nó nảy bật lên, như hòn đá ném thia lia.",
        ),
        nar(
          "Viên đạn nảy lên ấy vẫn có thể bay tiếp sang bờ bên kia. Bắn xuống nước chưa bao giờ là trò đùa.",
          "Viên đạn nảy lên ấy vẫn có thể bay tiếp sang bờ bên kia. Bắn xuống nước chưa bao giờ là trò đùa.",
        ),
      ],
    },
    cosmic: {
      shot: "Trái Đất với lớp khí quyển phát sáng mỏng (câu 1); khối đá vũ trụ to cỡ ngôi nhà lao vào bầu trời, nhãn 18 km/s (câu 2); khối đá nổ tung thành mảnh ở vạch 23 km (câu 3); kết: viên đạn vỡ trong nước và khối đá vỡ trên trời đặt cạnh nhau, câu chốt, rồi nhắc lặn đủ sâu (câu 4)",
      lines: [
        nar(
          "Giờ thử phóng to lên tầm vũ trụ. Bầu khí quyển cũng là một lớp chất lưu, bọc kín quanh Trái Đất.",
          "Giờ thử phóng to lên tầm vũ trụ. Bầu khí quyển cũng là một lớp chất lưu, bọc kín quanh Trái Đất.",
        ),
        nar(
          "Năm 2013, một khối đá vũ trụ to cỡ ngôi nhà lao vào bầu trời nước Nga, với tốc độ mười tám ki lô mét mỗi giây.",
          "Năm hai nghìn mười ba, một khối đá vũ trụ to cỡ ngôi nhà lao vào bầu trời nước Nga, với tốc độ mười tám ki lô mét mỗi giây.",
        ),
        nar(
          "Không khí cản dữ tới mức nó nổ tung ở độ cao hai mươi ba ki lô mét. Đá vũ trụ nhỏ hơn một sân bóng, phần lớn đều vỡ vụn như thế trước khi chạm đất.",
          "Không khí cản dữ tới mức nó nổ tung ở độ cao hai mươi ba ki lô mét. Đá vũ trụ nhỏ hơn một sân bóng, phần lớn đều vỡ vụn như thế trước khi chạm đất.",
        ),
        nar(
          "Từ viên đạn trong nước tới khối đá giữa trời, lao càng nhanh, càng bị cản dữ. Còn muốn nước che được đạn, thì nhớ lặn thật sâu nhé.",
          "Từ viên đạn trong nước tới khối đá giữa trời, lao càng nhanh, càng bị cản dữ. Còn muốn nước che được đạn, thì nhớ lặn thật sâu nhé.",
        ),
      ],
    },
  }),
  makeEpisode({
    day: 10,
    week,
    theme,
    title: "Lỗ tròn trên con dao dùng để làm gì? 4 công dụng ít ai biết",
    hudTitle: "LỖ TRÊN DAO ĐỂ LÀM GÌ?",
    textbook: "KHTN 8 · Áp suất khí quyển",
    era: "Căn bếp · Chuyện thường ngày",
    question: "Con dao nhà bạn có lỗ không, và bạn đã dùng cái lỗ ấy vào việc gì?",
    sources: [
      {
        title: "khoahoc.tv, “Đừng nhận sai, cam cái có đến 90% người dùng không thực sự biết lỗ tròn trên thân dao dùng để làm gì” (cập nhật 17/10/2026, không ghi tác giả, không dẫn nguồn): bốn công dụng chống dính, đo hành lá, giải phóng áp suất, treo dao",
        url: "https://khoahoc.tv/dung-nhan-sai-cam-cai-co-den-90-nguoi-dung-khong-thuc-su-biet-lo-tron-tren-than-dao-dung-de-lam-gi-125725",
      },
      {
        title: "Wikipedia, Cleaver: một số dao phay có lỗ nhỏ ở góc trên phía trước để treo lên tường",
        url: "https://en.wikipedia.org/wiki/Cleaver",
      },
      {
        title: "Sous Chef (Kristin Lohse, 7/5/2024), Buyer’s guide to Chinese cleavers: dao phay quá to so với ống cắm dao, treo lên móc gọn chỗ, dễ lấy",
        url: "https://www.souschef.co.uk/blogs/the-bureau-of-taste/buyer-s-guide-to-chinese-cleavers-or-choppers",
      },
      {
        title: "Gear Patrol (Tyler Chin, 19/9/2023): lỗ trên dao phay chỉ để treo; lỗ nằm quá xa chỗ dao chạm thức ăn nên không chống dính",
        url: "https://www.gearpatrol.com/food/a38151864/cleaver-hole-further-details/",
      },
      {
        title: "Wikipedia, Kitchen knife indentation: lỗ trên lưỡi dao giảm bám dính thêm nữa, hay gặp nhất ở dao cắt pho mát mềm",
        url: "https://en.wikipedia.org/wiki/Kitchen_knife_indentation",
      },
      {
        title: "Wikipedia, Skeleton knife (dẫn Cook’s Illustrated 1999): lỗ giảm diện tích mặt dao để thức ăn dính không bám vào",
        url: "https://en.wikipedia.org/wiki/Skeleton_knife",
      },
      {
        title: "Knivesandtools (cửa hàng dao, Hà Lan), Granton edge on a kitchen knife: cắt thử, không khí trong rãnh và lỗ như lớp chống dính; lát dày rõ hơn; khoai thái rất mỏng thì dao nào cũng dính",
        url: "https://knivesandtools.com/en/ct/granton-edge-on-a-kitchen-knife.htm",
      },
      {
        title: "Chowhound (Jennifer M. McNeill, 5/11/2025), Why some knives have holes: túi khí giảm diện tích tiếp xúc; dao pho mát có lỗ",
        url: "https://www.chowhound.com/1854713/why-knife-has-holes/",
      },
      {
        title: "SGK KHTN 8 Kết nối tri thức, Bài 16. Áp suất chất lỏng, áp suất khí quyển: giác mút bám tường vì áp suất bên trong nhỏ hơn áp suất khí quyển bên ngoài (VietJack). Phần nối với con dao là suy luận của kênh",
        url: "https://vietjack.com/khoa-hoc-tu-nhien-8-kn/ly-thuyet-bai-16-ap-suat-chat-long-ap-suat-khi-quyen.jsp",
      },
      {
        title: "Bảo tàng Hàng không và Vũ trụ Quốc gia Mỹ (Smithsonian), Handle, McTether Ratchet Wrench Tool: cờ lê có vòng buộc dây; dụng cụ luôn được móc vào dây ở cổ tay hoặc chỗ làm việc để khỏi trôi",
        url: "https://artsandculture.google.com/asset/handle-mctether-ratchet-wrench-tool/ZQGdstslT9fyCw",
      },
      {
        title: "Bảo tàng Hàng không và Vũ trụ Quốc gia Mỹ, Tether, Tool Set, Command Module, Apollo 11: dây buộc có móc, móc vào vòng buộc trên dụng cụ",
        url: "https://airandspace.si.edu/collection-objects/tether-tool-set-command-module-apollo-11/nasm_A19980050006",
      },
      {
        title: "NASA, What Is a Spacewalk? (Grades 5-8): phi hành gia buộc dụng cụ vào bộ đồ bằng dây để khỏi trôi",
        url: "https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-a-spacewalk-grades-5-8/",
      },
      {
        title: "NASA Space Station blog (1/11/2023): Jasmin Moghbeli và Loral O’Hara làm tuột mất một túi dụng cụ khi đi bộ ngoài không gian",
        url: "https://www.nasa.gov/blogs/spacestation/2023/11/01/astronauts-complete-spacewalk-dragon-launch-moves-to-nov-7/",
      },
      {
        title: "Space.com (Robert Lea, 10/11/2023): túi dụng cụ bay quanh Trái Đất, nhìn được bằng ống nhòm",
        url: "https://www.space.com/astronauts-international-space-station-tool-bag-visible",
      },
    ],
    hook: {
      shot: "Thớt gỗ, dao phay có lỗ tròn ở góc trên được khoanh sáng, rồi dao có hàng lỗ dọc thân bật ra (câu 1); bảng LỖ TRÊN DAO · 4 CÔNG DỤNG, bốn dòng hiện lần lượt (câu 2); bốn thẻ đánh số 1 TREO DAO, 2 CHỐNG DÍNH, 3 ĐO HÀNH LÁ, 4 GIẢI PHÓNG ÁP SUẤT, Milo giới thiệu (câu 3)",
      lines: [
        nar(
          "Con dao phay trong bếp thường có một cái lỗ tròn nhỏ ở góc trên. Có loại dao còn đục cả một hàng lỗ dọc thân. Mấy cái lỗ ấy để làm gì nhỉ?",
          "Con dao phay trong bếp thường có một cái lỗ tròn nhỏ ở góc trên. Có loại dao còn đục cả một hàng lỗ dọc thân. Mấy cái lỗ ấy để làm gì nhỉ?",
        ),
        nar(
          "Nhìn thì nhỏ vậy thôi, chứ mấy cái lỗ ấy gánh tới bốn việc đấy, là treo dao, chống dính, đo hành lá, và giải phóng áp suất khi chặt.",
          "Nhìn thì nhỏ vậy thôi, chứ mấy cái lỗ ấy gánh tới bốn việc đấy, là treo dao, chống dính, đo hành lá, và giải phóng áp suất khi chặt.",
        ),
        nar(
          "Bạn đoán thử xem, trong bốn công dụng của cái lỗ trên dao, công dụng nào là quan trọng nhất?",
          "Bạn đoán thử xem, trong bốn công dụng của cái lỗ trên dao, công dụng nào là quan trọng nhất?",
        ),
      ],
    },
    barrier: {
      shot: "Dao phay cận cảnh, lỗ góc trên, thẻ trích WIKIPEDIA: LỖ ĐỂ TREO LÊN TƯỜNG (câu 1); ống cắm dao: dao phay cắm không vừa ✖, rồi dao treo đung đưa trên móc tường ✔ (câu 2); nhãn SINH RA ĐỂ TREO!, dấu CÔNG DỤNG 1 · TREO DAO (câu 3)",
      lines: [
        nar(
          "Việc quan trọng nhất hoá ra lại đơn giản nhất, đó là treo dao. Wikipedia ghi rõ hẳn hoi, cái lỗ ở góc trên dao phay là để treo lên tường.",
          "Việc quan trọng nhất hoá ra lại đơn giản nhất, đó là treo dao. Wikipedia ghi rõ hẳn hoi, cái lỗ ở góc trên dao phay là để treo lên tường.",
        ),
        nar(
          "Dao phay to bản, cắm vào ống dao thì chẳng vừa. Treo lên móc thì vừa gọn chỗ, lại với tay là lấy được ngay.",
          "Dao phay to bản, cắm vào ống dao thì chẳng vừa. Treo lên móc thì vừa gọn chỗ, lại với tay là lấy được ngay.",
        ),
        nar(
          "Một tạp chí đồ dùng của Mỹ cũng khẳng định chắc nịch, cái lỗ ở góc dao phay sinh ra chính là để treo.",
          "Một tạp chí đồ dùng của Mỹ cũng khẳng định chắc nịch, cái lỗ ở góc dao phay sinh ra chính là để treo.",
        ),
      ],
    },
    eureka: {
      shot: "Dao cắt pho mát ba lỗ to cắt khối pho mát, nhãn HAY GẶP Ở DAO PHO MÁT (câu 1); so sánh: lưỡi trơn lát dính chặt, lưỡi có lỗ lát rơi ra, túi khí trong lỗ (câu 2); khoai thái mỏng dính cả hai dao, dấu LÁT DÀY: RÕ NHẤT (câu 3); dao phay: mũi tên từ lỗ góc tới chỗ chạm thức ăn XA THỨC ĂN, dấu CÔNG DỤNG 2 · CHỐNG DÍNH trên hàng lỗ dọc thân (câu 4)",
      lines: [
        nar(
          "Công dụng thứ hai thì lại nằm ở hàng lỗ dọc thân dao, đó là chống dính. Loại lỗ này hay gặp nhất ở dao cắt pho mát mềm đấy.",
          "Công dụng thứ hai thì lại nằm ở hàng lỗ dọc thân dao, đó là chống dính. Loại lỗ này hay gặp nhất ở dao cắt pho mát mềm đấy.",
        ),
        nar(
          "Một cửa hàng dao ở Hà Lan đã cắt thử. Lưỡi trơn thì lát dính chặt, lưỡi có lỗ thì lát rời ra dễ dàng. Hoá ra, chỗ không khí đọng trong lỗ đóng vai một lớp chống dính.",
          "Một cửa hàng dao ở Hà Lan đã cắt thử. Lưỡi trơn thì lát dính chặt, lưỡi có lỗ thì lát rời ra dễ dàng. Hoá ra, chỗ không khí đọng trong lỗ đóng vai một lớp chống dính.",
        ),
        nar(
          "Lát càng dày thì cái lỗ càng phát huy tác dụng. Còn khoai thái mỏng như giấy thì dao nào cũng dính, chẳng trách được cái lỗ.",
          "Lát càng dày thì cái lỗ càng phát huy tác dụng. Còn khoai thái mỏng như giấy thì dao nào cũng dính, chẳng trách được cái lỗ.",
        ),
        nar(
          "Cái lỗ ở góc dao phay thì nằm xa chỗ chạm thức ăn quá, nên việc chống dính cứ để hàng lỗ dọc thân lo.",
          "Cái lỗ ở góc dao phay thì nằm xa chỗ chạm thức ăn quá, nên việc chống dính cứ để hàng lỗ dọc thân lo.",
        ),
      ],
    },
    theorem: {
      shot: "Bảng phấn KHTN 8 · BÀI 16 · ÁP SUẤT KHÍ QUYỂN, dấu VÌ SAO HẾT DÍNH? (câu 1); giác mút ép trên tường, mũi tên áp suất khí quyển đè từ ngoài vào (câu 2); lát thức ăn áp mặt dao, không khí lọt qua lỗ, lát bong ra, dấu HẾT DÍNH! (câu 3)",
      lines: [
        nar(
          "Thế vì sao cứ có không khí là hết dính? Bí mật nằm ở áp suất khí quyển, mà bài mười sáu, Khoa học tự nhiên lớp tám, có nói tới đấy.",
          "Thế vì sao cứ có không khí là hết dính? Bí mật nằm ở áp suất khí quyển, mà bài mười sáu, Khoa học tự nhiên lớp tám, có nói tới đấy.",
        ),
        nar(
          "Trong bài có ví dụ cái giác mút. Ép sát vào tường thì áp suất bên trong nhỏ hơn áp suất khí quyển bên ngoài, nên nó bị đè dính chặt.",
          "Trong bài có ví dụ cái giác mút. Ép sát vào tường thì áp suất bên trong nhỏ hơn áp suất khí quyển bên ngoài, nên nó bị đè dính chặt.",
        ),
        nar(
          "Lát thức ăn ướt áp sát mặt dao cũng y như cái giác mút ấy. Lỗ trên dao cho không khí lọt vào giữa, thế là lát thức ăn bong ra ngay.",
          "Lát thức ăn ướt áp sát mặt dao cũng y như cái giác mút ấy. Lỗ trên dao cho không khí lọt vào giữa, thế là lát thức ăn bong ra ngay.",
        ),
      ],
    },
    realworld: {
      shot: "Cọng hành lá luồn qua lỗ đầu dao, các khúc hành thái đều, dấu CÔNG DỤNG 3 · ĐO HÀNH LÁ (câu 1); dao phay chặt khúc xương, vạch va chạm, nhãn GIẢI PHÓNG ÁP SUẤT, dấu CÔNG DỤNG 4 (câu 2); bảng bốn dòng đều tích xanh: TREO DAO, CHỐNG DÍNH, ĐO HÀNH LÁ, GIẢI PHÓNG ÁP SUẤT (câu 3)",
      lines: [
        nar(
          "Công dụng thứ ba lại quay về cái lỗ ở góc dao, là đo hành lá. Bạn luồn cọng hành qua lỗ để ước độ dài, rồi cứ thế mà thái, khúc nào cũng đều tăm tắp.",
          "Công dụng thứ ba lại quay về cái lỗ ở góc dao, là đo hành lá. Bạn luồn cọng hành qua lỗ để ước độ dài, rồi cứ thế mà thái, khúc nào cũng đều tăm tắp.",
        ),
        nar(
          "Và công dụng thứ tư, là giải phóng áp suất khi chặt xương. Lúc lưỡi dao ngập sâu vào thịt, cái lỗ cho không khí lọt vào, nên rút dao ra nhẹ hơn hẳn.",
          "Và công dụng thứ tư, là giải phóng áp suất khi chặt xương. Lúc lưỡi dao ngập sâu vào thịt, cái lỗ cho không khí lọt vào, nên rút dao ra nhẹ hơn hẳn.",
        ),
        nar(
          "Nói gọn lại, cái lỗ chỉ bé bằng đầu ngón tay, mà gánh đủ bốn việc, từ treo dao, chống dính, tới đo hành lá và giải phóng áp suất.",
          "Nói gọn lại, cái lỗ chỉ bé bằng đầu ngón tay, mà gánh đủ bốn việc, từ treo dao, chống dính, tới đo hành lá và giải phóng áp suất.",
        ),
      ],
    },
    cosmic: {
      shot: "Trạm vũ trụ trên nền sao, cờ lê buông tay trôi xa dần (câu 1); phi hành gia ngoài trạm, dây buộc móc vào vòng nhỏ ở chuôi cờ lê, vòng được khoanh sáng, nhãn Y NHƯ LỖ DAO (câu 2); túi đồ nghề trôi quanh Trái Đất, nhãn THÁNG 11/2023, người dưới đất cầm ống nhòm (câu 3); kết: dao treo trên móc cạnh cờ lê buộc dây, dấu MỘT CÁI LỖ, KHỎI THẤT LẠC (câu 4)",
      lines: [
        nar(
          "Cái lỗ để treo ấy, hoá ra còn được đem lên tận vũ trụ. Bên ngoài Trạm Vũ trụ Quốc tế, cứ buông tay ra là dụng cụ trôi mất.",
          "Cái lỗ để treo ấy, hoá ra còn được đem lên tận vũ trụ. Bên ngoài Trạm Vũ trụ Quốc tế, cứ buông tay ra là dụng cụ trôi mất.",
        ),
        nar(
          "Thế nên chiếc cờ lê của phi hành gia cũng có một cái vòng nhỏ, y như lỗ trên dao phay. Theo một bảo tàng hàng không ở Mỹ, dụng cụ luôn được móc dây vào cổ tay.",
          "Thế nên chiếc cờ lê của phi hành gia cũng có một cái vòng nhỏ, y như lỗ trên dao phay. Theo một bảo tàng hàng không ở Mỹ, dụng cụ luôn được móc dây vào cổ tay.",
        ),
        nar(
          "Thế mà năm 2023, hai phi hành gia vẫn lỡ tuột mất cả một túi đồ nghề. Nó bay vòng quanh Trái Đất, người dưới mặt đất cầm ống nhòm còn nhìn thấy được.",
          "Thế mà năm hai nghìn hai mươi ba, hai phi hành gia vẫn lỡ tuột mất cả một túi đồ nghề. Nó bay vòng quanh Trái Đất, người dưới mặt đất cầm ống nhòm còn nhìn thấy được.",
        ),
        nar(
          "Từ con dao phay trong bếp tới chiếc cờ lê ngoài vũ trụ, chỉ cần một cái lỗ nhỏ để treo, để buộc, là đồ đạc khỏi thất lạc. Lần tới cầm dao, bạn nhớ tận dụng cái lỗ ấy nhé.",
          "Từ con dao phay trong bếp tới chiếc cờ lê ngoài vũ trụ, chỉ cần một cái lỗ nhỏ để treo, để buộc, là đồ đạc khỏi thất lạc. Lần tới cầm dao, bạn nhớ tận dụng cái lỗ ấy nhé.",
        ),
      ],
    },
  }),
  makeEpisode({
    day: 11,
    week,
    theme: "Nghịch lý & Tin đồn khoa học",
    title: "Con gà hay quả trứng có trước? Khoa học trả lời thế nào",
    hudTitle: "GÀ HAY TRỨNG CÓ TRƯỚC?",
    textbook: "Sinh học 12 · Đột biến gene",
    era: "Anh · Năm 2006 và 2010",
    question: "Trước khi xem, bạn đã đoán gà hay trứng có trước?",
    sources: [
      {
        title: "khoahoc.tv, “Đáp án của các nhà khoa học: gà có trước trứng” (theo VietNamNet, cập nhật 27/9/2026, không ghi tác giả, không ghi năm nghiên cứu): kết luận gà có trước nhờ protein “ovocledidin-17”",
        url: "https://khoahoc.tv/da-p-a-n-cu-a-ca-c-nha-khoa-ho-c-ga-co-truo-c-tru-ng-28608",
      },
      {
        title: "Đại học Warwick, thông cáo 9/7/2010 (bổ sung 15/7/2010): protein OC-17 giúp canxi cacbonat thành tinh thể canxit; Mark Rodger: câu hỏi “vui nhưng vô nghĩa”",
        url: "https://warwick.ac.uk/newsandevents/pressreleases/researchers_apply_computing",
      },
      {
        title: "ScienceDaily (12/7/2010), theo Đại học Warwick: OC-17 bám vào hạt canxi cacbonat để khởi động tinh thể, buông ra khi nhân tinh thể đủ lớn; chỉ là “câu trả lời một phần”",
        url: "https://www.sciencedaily.com/releases/2010/07/100709083751.htm",
      },
      {
        title: "Freeman, Harding, Quigley, Rodger (2010), Structural Control of Crystal Nuclei by an Eggshell Protein, Angewandte Chemie 49(30):5135",
        url: "https://doi.org/10.1002/anie.201000679",
      },
      {
        title: "NBC News (14/7/2010), dẫn Daily Mail: câu “bằng chứng khoa học” của Colin Freeman với báo chí",
        url: "https://www.nbcnews.com/id/38238685",
      },
      {
        title: "Scientific American (Michael Moyer, 1/9/2009), Egg: John Brookfield (ĐH Nottingham) và hội đồng năm 2006 kết luận trứng có trước; loài đổi dần qua nhiều thế hệ",
        url: "https://www.scientificamerican.com/article/egg/",
      },
      {
        title: "The Week, Science speaks: why the chicken came before the egg: “không hẳn”, trích Brookfield",
        url: "https://theweek.com/articles/492706/science-speaks-why-chicken-came-before-egg",
      },
      {
        title: "Viện Hàn lâm Khoa học Úc, Curious: Which came first, the chicken or the egg? (con gà đầu tiên do đột biến ở hợp tử; gà rừng lông đỏ được thuần hoá khoảng 10.000 năm trước)",
        url: "https://curious.science.org.au/earth-environment/which-came-first-chicken-or-egg",
      },
      {
        title: "Stein và cộng sự (2019), Scientific Reports: trứng, vỏ trứng cổ nhất được biết tới thuộc ba loài khủng long chân thằn lằn, 195–192 triệu năm trước",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6418122/",
      },
      {
        title: "Wikipedia, Origin of birds: chim là một nhóm khủng long chân thú (maniraptoran theropod); Archaeopteryx từng được xem là con chim đầu tiên",
        url: "https://en.wikipedia.org/wiki/Origin_of_birds",
      },
      {
        title: "Smithsonian Human Origins, Introduction to Human Evolution: con người có nguồn gốc từ tổ tiên giống vượn; người và vượn lớn có chung tổ tiên sống cách đây 8 đến 6 triệu năm",
        url: "https://humanorigins.si.edu/education/introduction-human-evolution",
      },
      {
        title: "Đại học Bristol (12/6/2023): động vật có màng ối xuất hiện khoảng 320 triệu năm trước",
        url: "https://bristol.ac.uk/news/2023/june/earliest-reptiles-may-have-borne-live-young.html",
      },
      {
        title: "Sinh học 12 Kết nối tri thức, Bài 4. Đột biến gene: đột biến xảy ra ở tế bào sinh dục, là nguyên liệu cho tiến hoá (VietJack)",
        url: "https://vietjack.com/sinh-hoc-12-kn/ly-thuyet-bai-4-dot-bien-gene.jsp",
      },
      {
        title: "Sinh học 12 Kết nối tri thức, Lý thuyết đột biến NST: di truyền truyền lại những đột biến mới phát sinh (loigiaihay)",
        url: "https://loigiaihay.com/ly-thuyet-dot-bien-nhiem-sac-the-sinh-12-ket-noi-tri-thuc-a168934.html",
      },
      {
        title: "NASA Astrobiology (Keith Cooper, 30/3/2017), Looking for LUCA: tổ tiên chung của mọi sự sống, khoảng 4 tỉ năm trước",
        url: "https://astrobiology.nasa.gov/news/looking-for-luca-the-last-universal-common-ancestor/",
      },
    ],
    hook: {
      shot: "Con gà và quả trứng đứng hai bên, dấu hỏi lớn ở giữa, hai mũi tên vòng tròn đuổi nhau (câu 1); tờ báo mạng giật tít GÀ CÓ TRƯỚC! (câu 2); siêu máy tính nhấp nháy đèn, Milo gãi đầu, hai nút GÀ / TRỨNG (câu 3)",
      lines: [
        nar(
          "Con gà có trước, hay quả trứng có trước? Chắc ai cũng từng ít nhất một lần cãi nhau về câu đố này, mà cãi mãi chẳng ai chịu ai.",
          "Con gà có trước, hay quả trứng có trước? Chắc ai cũng từng ít nhất một lần cãi nhau về câu đố này, mà cãi mãi chẳng ai chịu ai.",
        ),
        nar(
          "Có một bài báo trên mạng khẳng định chắc nịch rằng, các nhà khoa học Anh đã dùng cả siêu máy tính, và chứng minh được con gà có trước.",
          "Có một bài báo trên mạng khẳng định chắc nịch rằng, các nhà khoa học Anh đã dùng cả siêu máy tính, và chứng minh được con gà có trước.",
        ),
        nar(
          "Vậy câu đố gà hay trứng đã thật sự được giải chưa? Bạn thử đoán xem, con gà hay quả trứng mới là cái có trước?",
          "Vậy câu đố gà hay trứng đã thật sự được giải chưa? Bạn thử đoán xem, con gà hay quả trứng mới là cái có trước?",
        ),
      ],
    },
    barrier: {
      shot: "Siêu máy tính phóng to vào vỏ trứng, nhãn NĂM 2010 · PROTEIN OC-17 (câu 1); protein như cái kẹp gom các hạt vôi li ti thành tinh thể, dấu VỎ CỨNG NHANH (câu 2); tít báo PHẢI CÓ GÀ MỚI CÓ TRỨNG! bay ra (câu 3); thẻ trích của nhóm nghiên cứu CHỈ LÀ MỘT PHẦN, dấu CHƯA PHẢI LỜI GIẢI CUỐI, đóng dấu ✖ lên tít báo (câu 4)",
      lines: [
        nar(
          "Năm 2010, hai trường đại học ở Anh đã dùng siêu máy tính để soi kỹ một loại protein có trong vỏ trứng gà, tên là OC-17.",
          "Năm hai nghìn không trăm mười, hai trường đại học ở Anh đã dùng siêu máy tính để soi kỹ một loại protein có trong vỏ trứng gà, tên là ô xê mười bảy.",
        ),
        nar(
          "Protein này giống như một chiếc kẹp, gom những hạt chất vôi li ti lại với nhau thành tinh thể. Nhờ thế mà vỏ trứng gà cứng lại rất nhanh.",
          "Protein này giống như một chiếc kẹp, gom những hạt chất vôi li ti lại với nhau thành tinh thể. Nhờ thế mà vỏ trứng gà cứng lại rất nhanh.",
        ),
        nar(
          "Vì protein này do cơ thể gà mái làm ra, nên báo chí liền giật tít rằng, phải có gà thì mới có trứng, vậy là gà có trước!",
          "Vì protein này do cơ thể gà mái làm ra, nên báo chí liền giật tít rằng, phải có gà thì mới có trứng, vậy là gà có trước!",
        ),
        nar(
          "Thế nhưng, chính thông cáo của trường đại học làm nghiên cứu lại nói rằng, đây mới chỉ là câu trả lời một phần, chứ chưa phải lời giải cuối cùng.",
          "Thế nhưng, chính thông cáo của trường đại học làm nghiên cứu lại nói rằng, đây mới chỉ là câu trả lời một phần, chứ chưa phải lời giải cuối cùng.",
        ),
      ],
    },
    eureka: {
      shot: "Dòng thời gian dài: đầu bên phải con gà nhà, nhãn KHOẢNG 10.000 NĂM (câu 1); kéo ngược về trái, khủng long cổ dài đứng cạnh ổ trứng, nhãn 195 TRIỆU NĂM (câu 2); hai mốc đặt cạnh nhau, trứng bỏ xa gà, dấu TRỨNG CÓ TRƯỚC, rồi quả trứng gà với dấu hỏi (câu 3)",
      lines: [
        nar(
          "Muốn có câu trả lời thật, ta phải lật lại lịch sử. Theo Viện Hàn lâm Khoa học Úc, gà nhà được con người thuần hoá từ gà rừng, vào khoảng mười nghìn năm trước.",
          "Muốn có câu trả lời thật, ta phải lật lại lịch sử. Theo Viện Hàn lâm Khoa học Úc, gà nhà được con người thuần hoá từ gà rừng, vào khoảng mười nghìn năm trước.",
        ),
        nar(
          "Còn trứng thì đã có từ lâu hơn thế rất nhiều. Những quả trứng cổ nhất mà con người từng tìm thấy là trứng khủng long, có tuổi khoảng một trăm chín mươi lăm triệu năm.",
          "Còn trứng thì đã có từ lâu hơn thế rất nhiều. Những quả trứng cổ nhất mà con người từng tìm thấy là trứng khủng long, có tuổi khoảng một trăm chín mươi lăm triệu năm.",
        ),
        nar(
          "Vậy nếu hỏi về trứng nói chung, thì trứng đã có trước con gà từ lâu lắm rồi. Nhưng nếu hỏi riêng về quả trứng gà thì sao nhỉ?",
          "Vậy nếu hỏi về trứng nói chung, thì trứng đã có trước con gà từ lâu lắm rồi. Nhưng nếu hỏi riêng về quả trứng gà thì sao nhỉ?",
        ),
      ],
    },
    theorem: {
      shot: "Bảng phấn SINH HỌC 12 · BÀI 4 · ĐỘT BIẾN GENE, mũi tên từ tế bào sinh dục bố mẹ sang con (câu 1); con chim gần giống gà, tinh trùng và trứng có một vạch gene đổi màu, gặp nhau thành hợp tử trong quả trứng (câu 2); phôi trong trứng có gene mới, nhãn ĐÃ LÀ GÀ (câu 3); trứng nứt, chú gà con đầu tiên chui ra, dấu TRỨNG CÓ TRƯỚC (câu 4)",
      lines: [
        nar(
          "Câu trả lời nằm ngay trong sách Sinh học lớp mười hai. Sách viết rằng, đột biến gene có thể xảy ra ở tế bào sinh dục, rồi được truyền sang đời con, và trở thành nguyên liệu cho tiến hoá.",
          "Câu trả lời nằm ngay trong sách Sinh học lớp mười hai. Sách viết rằng, đột biến gene có thể xảy ra ở tế bào sinh dục, rồi được truyền sang đời con, và trở thành nguyên liệu cho tiến hoá.",
        ),
        nar(
          "Thử tưởng tượng một đôi chim rất giống gà, nhưng chưa hẳn là gà. Trứng và tinh trùng của chúng mang một thay đổi nhỏ trong gene, rồi gặp nhau thành hợp tử, nằm trong một quả trứng.",
          "Thử tưởng tượng một đôi chim rất giống gà, nhưng chưa hẳn là gà. Trứng và tinh trùng của chúng mang một thay đổi nhỏ trong gene, rồi gặp nhau thành hợp tử, nằm trong một quả trứng.",
        ),
        nar(
          "Nhà di truyền học John Brookfield, ở Đại học Nottingham, giải thích rằng gene của một con vật không thay đổi suốt cả đời nó. Vì thế, con gà đầu tiên đã là gà ngay từ khi còn là cái phôi nằm trong trứng.",
          "Nhà di truyền học Giôn Bờ rúc phin, ở Đại học Nốt ting ham, giải thích rằng gene của một con vật không thay đổi suốt cả đời nó. Vì thế, con gà đầu tiên đã là gà ngay từ khi còn là cái phôi nằm trong trứng.",
        ),
        nar(
          "Nói gọn lại, quả trứng có trước. Chỉ có điều, con chim mẹ đẻ ra quả trứng ấy thì vẫn chưa hẳn là gà, còn chú gà con nở ra từ nó mới là con gà đầu tiên.",
          "Nói gọn lại, quả trứng có trước. Chỉ có điều, con chim mẹ đẻ ra quả trứng ấy thì vẫn chưa hẳn là gà, còn chú gà con nở ra từ nó mới là con gà đầu tiên.",
        ),
      ],
    },
    realworld: {
      shot: "Cây tiến hoá của gà: khủng long chân thú → chim cổ Archaeopteryx → gà rừng lông đỏ → gà nhà, dải màu chuyển dần VÔ SỐ THẾ HỆ (câu 1); tiến hoá của người: tổ tiên giống vượn → người cổ → người nay, nhãn ~6 TRIỆU NĂM, dấu KHÔNG CÓ NGÀY NHẢY VỌT (câu 2); quả trứng lớn, protein OC-17 kẹp hạt vôi ở mép vỏ, nhãn VỎ CỨNG NHANH, dấu ĐÁP ÁN: TRỨNG (câu 3)",
      lines: [
        nar(
          "Có điều, con gà đầu tiên chỉ là cách nói cho dễ hình dung thôi. Thật ra, chim vốn tiến hoá từ một nhóm khủng long, rồi qua vô số thế hệ, một nhánh trong đó mới dần thành gà rừng, tổ tiên của gà nhà.",
          "Có điều, con gà đầu tiên chỉ là cách nói cho dễ hình dung thôi. Thật ra, chim vốn tiến hoá từ một nhóm khủng long, rồi qua vô số thế hệ, một nhánh trong đó mới dần thành gà rừng, tổ tiên của gà nhà.",
        ),
        nar(
          "Con người cũng vậy. Tổ tiên xa xưa của chúng ta là những loài giống vượn, và phải qua chừng sáu triệu năm, mỗi đời đổi khác một chút, mới thành người như bây giờ. Chẳng có ngày nào một con vượn bỗng dưng đẻ ra người cả.",
          "Con người cũng vậy. Tổ tiên xa xưa của chúng ta là những loài giống vượn, và phải qua chừng sáu triệu năm, mỗi đời đổi khác một chút, mới thành người như bây giờ. Chẳng có ngày nào một con vượn bỗng dưng đẻ ra người cả.",
        ),
        nar(
          "Thế còn nghiên cứu protein năm 2010 thì sao? Nó chỉ cho ta biết vỏ trứng gà cứng lại nhanh như thế nào, chứ chẳng phân xử được gà hay trứng có trước.",
          "Thế còn nghiên cứu protein năm 2010 thì sao? Nó chỉ cho ta biết vỏ trứng gà cứng lại nhanh như thế nào, chứ chẳng phân xử được gà hay trứng có trước.",
        ),
      ],
    },
    cosmic: {
      shot: "Đường thời gian dọc đi xuống: con gà, rồi khủng long, rồi loài bò sát cổ với quả trứng có màng ối, nhãn 320 TRIỆU NĂM (câu 1); rễ cây hội về một chấm sáng LUCA, nhãn 4 TỈ NĂM (câu 2); từ LUCA toả ra cây, cá, gà, người (câu 3); kết: quả trứng và con gà, mũi tên vòng tròn dừng lại ở quả trứng (câu 4)",
      lines: [
        nar(
          "Nếu cứ lần ngược xa hơn nữa, thì trước gà có khủng long, và trước khủng long lại có những loài đẻ trứng có màng ối. Chúng xuất hiện từ khoảng ba trăm hai mươi triệu năm trước.",
          "Nếu cứ lần ngược xa hơn nữa, thì trước gà có khủng long, và trước khủng long lại có những loài đẻ trứng có màng ối. Chúng xuất hiện từ khoảng ba trăm hai mươi triệu năm trước.",
        ),
        nar(
          "Cứ lần tới tận cùng, theo NASA, ta sẽ gặp một vi sinh vật sống cách đây khoảng bốn tỉ năm, gọi là LUCA. Đó là tổ tiên chung của mọi sự sống trên Trái Đất.",
          "Cứ lần tới tận cùng, theo NASA, ta sẽ gặp một vi sinh vật sống cách đây khoảng bốn tỉ năm, gọi là LUCA. Đó là tổ tiên chung của mọi sự sống trên Trái Đất.",
        ),
        nar(
          "Từ nó mà có cái cây, con cá, con gà, và có cả bạn, người đang xem video này. Hoá ra, tất cả chúng ta đều là họ hàng rất xa của nhau.",
          "Từ nó mà có cái cây, con cá, con gà, và có cả bạn, người đang xem video này. Hoá ra, tất cả chúng ta đều là họ hàng rất xa của nhau.",
        ),
        nar(
          "Nên lần sau, có ai lôi câu đố gà hay trứng ra cãi, bạn cứ tự tin trả lời là quả trứng có trước nhé.",
          "Nên lần sau, có ai lôi câu đố gà hay trứng ra cãi, bạn cứ tự tin trả lời là quả trứng có trước nhé.",
        ),
      ],
    },
  }),
  makeEpisode({
    day: 12,
    week,
    theme: "Công nghệ quanh ta",
    title: "Mở khoá điện thoại bằng hơi thở: máy nhận ra bạn bằng cách nào?",
    hudTitle: "THỞ MỘT HƠI LÀ MỞ KHOÁ?",
    coverTitle: "TẠI SAO CHỈ CẦN THỞ MỘT HƠI LÀ MÁY CÓ THỂ NHẬN RA BẠN?",
    textbook: "Công nghệ · Mũi điện tử và học máy",
    era: "Nhật Bản · Năm 2022",
    question: "Nếu được chọn, bạn muốn mở khoá điện thoại bằng hơi thở, hay vẫn dùng vân tay?",
    sources: [
      {
        title: "Đại học Kyushu, thông cáo 22/6/2022 (EurekAlert!), Sniffing out your identity with breath biometrics: 16 cảm biến, 28 hợp chất, trung bình 97,8% với 6 người, vẫn giữ được khi tăng lên 20 người; nhịn ăn 6 tiếng trước khi thử; chất bay hơi từ da chỉ phần tỉ, từ hơi thở tới phần triệu",
        url: "https://www.eurekalert.org/news-releases/956683",
      },
      {
        title: "khoahoc.tv, “Công nghệ mới dùng hơi thở để mở khóa điện thoại” (7/10/2022): nhóm ĐH Kyushu và ĐH Tokyo, mũi điện tử, 28 hợp chất, 97,8%",
        url: "https://khoahoc.tv/cong-nghe-moi-dung-hoi-tho-de-mo-khoa-dien-thoai-123421",
      },
    ],
    hook: {
      shot: "Cô gái và chiếc điện thoại to: gõ mật khẩu, chạm vân tay, soi mặt (câu 1); cô gái thở vào điện thoại, ổ khoá bật mở (câu 2); đám mây hơi thở đầy hạt và dấu hỏi, Milo gãi đầu (câu 3)",
      lines: [
        nar(
          "Muốn mở khoá điện thoại, ta thường gõ mật khẩu, chạm vân tay, hoặc để máy nhìn khuôn mặt.",
          "Muốn mở khoá điện thoại, ta thường gõ mật khẩu, chạm vân tay, hoặc để máy nhìn khuôn mặt.",
        ),
        nar(
          "Thế mà ở Nhật Bản, các nhà khoa học lại đang thử một cách lạ lắm. Bạn chỉ cần thở ra một hơi, là máy có thể nhận ra bạn.",
          "Thế mà ở Nhật Bản, các nhà khoa học lại đang thử một cách lạ lắm. Bạn chỉ cần thở ra một hơi, là máy có thể nhận ra bạn.",
        ),
        nar(
          "Vậy trong hơi thở có gì, mà máy lại biết đó là bạn nhỉ?",
          "Vậy trong hơi thở có gì, mà máy lại biết đó là bạn nhỉ?",
        ),
      ],
    },
    barrier: {
      shot: "Vân tay bị in ra bản sao, rồi đầu ngón tay bị dán băng (câu 1); cánh tay chỉ toả lác đác vài hạt, chiếc mũi máy cố hít mà ngơ ngác (câu 2); hơi thở dày đặc hạt, hai nhà khoa học nhìn theo thích thú (câu 3)",
      lines: [
        nar(
          "Vân tay hay khuôn mặt thì tiện thật, nhưng vẫn có thể bị người khác sao chép, hoặc bị đổi khác đi sau một chấn thương.",
          "Vân tay hay khuôn mặt thì tiện thật, nhưng vẫn có thể bị người khác sao chép, hoặc bị đổi khác đi sau một chấn thương.",
        ),
        nar(
          "Nên người ta mới nghĩ tới mùi cơ thể. Nhưng mùi toả ra từ da thì lại ít quá, máy khó mà ngửi ra được.",
          "Nên người ta mới nghĩ tới mùi cơ thể. Nhưng mùi toả ra từ da thì lại ít quá, máy khó mà ngửi ra được.",
        ),
        nar(
          "Còn trong hơi thở, lượng chất bay hơi có thể nhiều gấp cả nghìn lần. Thế là nhóm nghiên cứu ở Đại học Kyushu và Đại học Tokyo chọn luôn hơi thở.",
          "Còn trong hơi thở, lượng chất bay hơi có thể nhiều gấp cả nghìn lần. Thế là nhóm nghiên cứu ở Đại học Kiu xiu và Đại học Tô ki ô chọn luôn hơi thở.",
        ),
      ],
    },
    eureka: {
      shot: "Kính lúp soi làn hơi, 28 phân tử hiện dần (câu 1); con chip 16 ô cảm biến, hạt màu nào rơi xuống thì ô màu ấy sáng (câu 2)",
      lines: [
        nar(
          "Trong hơi thở ấy, họ chọn ra được hai mươi tám chất có thể dùng để phân biệt người này với người kia.",
          "Trong hơi thở ấy, họ chọn ra được hai mươi tám chất có thể dùng để phân biệt người này với người kia.",
        ),
        nar(
          "Rồi họ làm một chiếc mũi điện tử, có mười sáu cảm biến. Mỗi cảm biến lại chuyên ngửi một nhóm chất riêng.",
          "Rồi họ làm một chiếc mũi điện tử, có mười sáu cảm biến. Mỗi cảm biến lại chuyên ngửi một nhóm chất riêng.",
        ),
      ],
    },
    theorem: {
      shot: "Mũi máy ngơ ngác giữa mớ hạt, rồi đội mũ cử nhân ngồi học trước bảng HỌC MÁY (câu 1); ba người ba hồ sơ cột trên bảng phấn, hơi thở mới trượt qua và trùng khít một hồ sơ (câu 2)",
      lines: [
        nar(
          "Nhưng ngửi được thôi thì chưa đủ. Máy còn phải học nữa, kỹ thuật ấy gọi là học máy, một nhánh của trí tuệ nhân tạo.",
          "Nhưng ngửi được thôi thì chưa đủ. Máy còn phải học nữa, kỹ thuật ấy gọi là học máy, một nhánh của trí tuệ nhân tạo.",
        ),
        nar(
          "Máy xem trong hơi thở mỗi người, chất nào nhiều, chất nào ít, rồi ghi nhớ thành một hồ sơ riêng. Lần sau bạn thở vào, nó chỉ việc so lại với hồ sơ ấy.",
          "Máy xem trong hơi thở mỗi người, chất nào nhiều, chất nào ít, rồi ghi nhớ thành một hồ sơ riêng. Lần sau bạn thở vào, nó chỉ việc so lại với hồ sơ ấy.",
        ),
      ],
    },
    realworld: {
      shot: "Sáu người đứng thử, trăm chấm tròn lần lượt sáng xanh gần hết, rồi thành hai mươi người (câu 1); cô gái ngồi trước mâm cơm, đồng hồ quay sáu tiếng, làn hơi đổi màu (câu 2)",
      lines: [
        nar(
          "Khi thử với sáu người, trung bình cứ một trăm lần thì máy nhận đúng gần chín mươi tám lần. Tăng lên hai mươi người, máy vẫn nhận ra tốt như thế.",
          "Khi thử với sáu người, trung bình cứ một trăm lần thì máy nhận đúng gần chín mươi tám lần. Tăng lên hai mươi người, máy vẫn nhận ra tốt như thế.",
        ),
        nar(
          "Nhưng còn một chuyện hơi phiền, là mọi người đều phải nhịn ăn sáu tiếng trước khi thử. Vì ăn uống vào thì hơi thở cũng đổi khác theo mất rồi.",
          "Nhưng còn một chuyện hơi phiền, là mọi người đều phải nhịn ăn sáu tiếng trước khi thử. Vì ăn uống vào thì hơi thở cũng đổi khác theo mất rồi.",
        ),
      ],
    },
    cosmic: {
      shot: "Cô gái ăn món nào hơi thở đổi màu theo món ấy, mũi máy vẫn cố nhận ra (câu 1); cô gái bên mẹt bún đậu, điện thoại nhăn mặt lắc đầu, Milo vẫy tay (câu 2)",
      lines: [
        nar(
          "Nên bước tiếp theo, nhóm nghiên cứu muốn làm sao để dù bạn vừa ăn gì, máy vẫn nhận ra bạn.",
          "Nên bước tiếp theo, nhóm nghiên cứu muốn làm sao để dù bạn vừa ăn gì, máy vẫn nhận ra bạn.",
        ),
        nar(
          "Chứ giờ mà dùng luôn, lỡ bạn vừa ăn xong một bát bún đậu mắm tôm, có khi điện thoại lại chẳng nhận ra chủ nữa đâu nhé!",
          "Chứ giờ mà dùng luôn, lỡ bạn vừa ăn xong một bát bún đậu mắm tôm, có khi điện thoại lại chẳng nhận ra chủ nữa đâu nhé!",
        ),
      ],
    },
  }),
  makeEpisode({
    day: 13,
    week,
    theme: "Toán quanh ta",
    title: "Không ai gấp đôi tờ giấy quá 7 lần? Một nữ sinh đã gấp được 12 lần",
    hudTitle: "GẤP GIẤY QUÁ 7 LẦN?",
    coverTitle: "CÓ THẬT KHÔNG AI GẤP ĐÔI ĐƯỢC TỜ GIẤY QUÁ 7 LẦN?",
    textbook: "Toán 11 · Cấp số nhân",
    era: "Mỹ · Năm 2002",
    question: "Bạn đã từng gấp đôi một tờ giấy được mấy lần?",
    sources: [
      {
        title: "Guinness World Records, Most times to fold a piece of paper: Britney Gallivan, 27/1/2002, Pomona (California), 12 lần, giấy dài 4.000 feet (1.219 m)",
        url: "https://www.guinnessworldrecords.com/world-records/494571-most-times-to-fold-a-piece-of-paper",
      },
      {
        title: "Guinness World Records (10/2025), How many times can you actually fold a piece of paper?: thầy dạy toán thách năm 2001; mỗi lần gấp thêm cần dài gấp 4",
        url: "https://www.guinnessworldrecords.com/news/2025/10/how-many-times-can-you-actually-fold-a-piece-of-paper-student-busts-myth",
      },
      {
        title: "Science News: lời đồn không gấp quá 7–8 lần; mỗi lần gấp độ dày tăng gấp đôi; giấy mất ở mép gấp; công thức của Gallivan",
        url: "https://www.sciencenews.org/?p=26078",
      },
      {
        title: "Scientific American, How many paper folds would get you to the Moon?: giấy 0,1 mm, gấp 42 lần vượt Mặt Trăng, 103 lần vượt vũ trụ quan sát được",
        url: "https://www.scientificamerican.com/article/how-many-paper-folds-would-get-you-to-the-moon/",
      },
      {
        title: "Toán 11 Kết nối tri thức, Bài 7. Cấp số nhân: uₙ = u₁·qⁿ⁻¹ (loigiaihay)",
        url: "https://loigiaihay.com/bai-7-cap-so-nhan-toan-11-ket-noi-tri-thuc-e31493.html",
      },
    ],
    hook: {
      shot: "Hai bàn tay gấp đôi tờ giấy liên tục, bộ đếm lên 7 thì cứng đơ (câu 1); nữ sinh giơ khối giấy, bộ đếm 7 rồi huy chương 12 (câu 2); nữ sinh, cuộn giấy, Milo gãi đầu, dấu hỏi (câu 3)",
      lines: [
        nar(
          "Bạn thử lấy một tờ giấy, gấp đôi lại, rồi cứ thế gấp đôi tiếp xem. Tới lần thứ sáu, thứ bảy là nó đã cứng như một mẩu gỗ, bẻ kiểu gì cũng không được nữa.",
          "Bạn thử lấy một tờ giấy, gấp đôi lại, rồi cứ thế gấp đôi tiếp xem. Tới lần thứ sáu, thứ bảy là nó đã cứng như một mẩu gỗ, bẻ kiểu gì cũng không được nữa.",
        ),
        nar(
          "Nhiều người vẫn bảo, chẳng ai gấp đôi được một tờ giấy quá bảy lần. Thế mà có một nữ sinh đã gấp được tới mười hai lần đấy!",
          "Nhiều người vẫn bảo, chẳng ai gấp đôi được một tờ giấy quá bảy lần. Thế mà có một nữ sinh đã gấp được tới mười hai lần đấy!",
        ),
        nar(
          "Cô ấy đã làm cách nào vậy nhỉ?",
          "Cô ấy đã làm cách nào vậy nhỉ?",
        ),
      ],
    },
    barrier: {
      shot: "Mặt cắt tờ giấy mỏng, mỗi lần gấp số lớp gấp đôi (câu 1); các chồng giấy 2, 4, 8 … 128 lớp cao dần (câu 2)",
      lines: [
        nar(
          "Trước hết, sao tờ giấy mỏng thế mà lại khó gấp vậy? Là vì cứ mỗi lần gấp, số lớp giấy lại tăng lên gấp đôi.",
          "Trước hết, sao tờ giấy mỏng thế mà lại khó gấp vậy? Là vì cứ mỗi lần gấp, số lớp giấy lại tăng lên gấp đôi.",
        ),
        nar(
          "Gấp một lần thì có hai lớp, hai lần có bốn lớp, ba lần có tám lớp. Tới lần thứ bảy thì đã là một trăm hai mươi tám lớp chồng lên nhau rồi.",
          "Gấp một lần thì có hai lớp, hai lần có bốn lớp, ba lần có tám lớp. Tới lần thứ bảy thì đã là một trăm hai mươi tám lớp chồng lên nhau rồi.",
        ),
      ],
    },
    eureka: {
      shot: "Lớp học, thầy viết 12 trên bảng, nữ sinh ngồi nghe (câu 1); mặt cắt nếp gấp, phần cuộn ở mép tô đỏ dài dần (câu 2); dải giấy kéo dài gấp bốn (câu 3); cuộn giấy dài trải trên hành lang, gấp dần tới 12, huy chương (câu 4)",
      lines: [
        nar(
          "Năm 2001, thầy dạy toán của Britney Gallivan, một nữ sinh người Mỹ, đã thách cả lớp gấp đôi một thứ gì đó đủ mười hai lần.",
          "Năm hai nghìn không trăm linh một, thầy dạy toán của Bờ rít ni Ga li vần, một nữ sinh người Mỹ, đã thách cả lớp gấp đôi một thứ gì đó đủ mười hai lần.",
        ),
        nar(
          "Cô để ý thấy, mỗi lần gấp lại có một phần giấy bị cuộn mất ở mép gấp. Chồng giấy càng dày thì phần bị mất ấy lại càng nhiều.",
          "Cô để ý thấy, mỗi lần gấp lại có một phần giấy bị cuộn mất ở mép gấp. Chồng giấy càng dày thì phần bị mất ấy lại càng nhiều.",
        ),
        nar(
          "Thế nên cứ muốn gấp thêm được một lần nữa, tờ giấy lại phải dài gấp khoảng bốn lần.",
          "Thế nên cứ muốn gấp thêm được một lần nữa, tờ giấy lại phải dài gấp khoảng bốn lần.",
        ),
        nar(
          "Vậy là cô kiếm một cuộn giấy thật mỏng, dài khoảng một nghìn hai trăm mét, rồi cứ gấp đôi theo chiều dài. Và cô đã gấp được đủ mười hai lần, lập nên một kỷ lục Guinness.",
          "Vậy là cô kiếm một cuộn giấy thật mỏng, dài khoảng một nghìn hai trăm mét, rồi cứ gấp đôi theo chiều dài. Và cô đã gấp được đủ mười hai lần, lập nên một kỷ lục Ghi nét.",
        ),
      ],
    },
    theorem: {
      shot: "Bảng phấn CẤP SỐ NHÂN, q = 2 (câu 1); đường cong nhân đôi vọt lên (câu 2)",
      lines: [
        nar(
          "Số lớp giấy cứ nhân đôi lên như thế, sách Toán lớp mười một gọi là một cấp số nhân, với công bội bằng hai.",
          "Số lớp giấy cứ nhân đôi lên như thế, sách Toán lớp mười một gọi là một cấp số nhân, với công bội bằng hai.",
        ),
        nar(
          "Lúc đầu thì tăng chẳng đáng bao nhiêu, nhưng càng về sau, con số lại càng lớn nhanh tới mức khó mà tưởng tượng nổi.",
          "Lúc đầu thì tăng chẳng đáng bao nhiêu, nhưng càng về sau, con số lại càng lớn nhanh tới mức khó mà tưởng tượng nổi.",
        ),
      ],
    },
    cosmic: {
      shot: "Tờ giấy 0,1 mm rồi chồng giấy từ Trái Đất vượt Mặt Trăng, số 42 (câu 1); các thiên hà, số 103 (câu 2); kết: tờ giấy gấp 7 lần trên bàn, Milo vẫy tay (câu 3)",
      lines: [
        nar(
          "Giả sử tờ giấy chỉ dày một phần mười mi li mét, mà bạn lại gấp được mãi. Thì chỉ cần bốn mươi hai lần, chồng giấy đã cao quá cả Mặt Trăng rồi.",
          "Giả sử tờ giấy chỉ dày một phần mười mi li mét, mà bạn lại gấp được mãi. Thì chỉ cần bốn mươi hai lần, chồng giấy đã cao quá cả Mặt Trăng rồi.",
        ),
        nar(
          "Còn gấp tới một trăm linh ba lần, nó sẽ dày hơn cả vũ trụ mà con người nhìn thấy được.",
          "Còn gấp tới một trăm linh ba lần, nó sẽ dày hơn cả vũ trụ mà con người nhìn thấy được.",
        ),
        nar(
          "Nên lần sau gấp giấy mà tới lần thứ bảy đã phải chịu thua, thì bạn cũng đừng trách tay mình yếu nhé. Tại cái phép nhân đôi ấy ghê gớm quá thôi!",
          "Nên lần sau gấp giấy mà tới lần thứ bảy đã phải chịu thua, thì bạn cũng đừng trách tay mình yếu nhé. Tại cái phép nhân đôi ấy ghê gớm quá thôi!",
        ),
      ],
    },
  }),
  makeEpisode({
    day: 14,
    week,
    theme: "Vật lí quanh ta",
    title: "Rét âm độ mà sao Việt Nam vẫn hiếm có tuyết?",
    hudTitle: "RÉT MÀ SAO KHÔNG CÓ TUYẾT?",
    coverTitle: "TẠI SAO MÙA ĐÔNG VIỆT NAM RÉT THẾ MÀ KHÔNG CÓ TUYẾT RƠI?",
    textbook: "Địa lý 6 · Lớp khí quyển",
    era: "Việt Nam · Vùng núi phía Bắc",
    question: "Bạn đã từng được thấy tuyết rơi ở Việt Nam chưa?",
    sources: [
      {
        title: "VTV News (21/11/2026), video “Vì sao tuyết là hiện tượng hiếm gặp ở nước ta?”: mạch nội dung của tập",
        url: "https://vtv.vn",
      },
      {
        title: "NSIDC, The Science of Snow: tuyết hình thành khi khí quyển ở 0 °C trở xuống, cần có hơi ẩm; mặt đất trên 0 °C một chút tuyết vẫn có thể chạm đất",
        url: "https://nsidc.org/learn/parts-cryosphere/snow/science-snow",
      },
      {
        title: "NOAA NSSL, Winter Precipitation Types: tuyết rơi khi từ chân mây xuống đất không quá 0 °C; gặp lớp khí ấm thì bông tuyết tan",
        url: "https://www.nssl.noaa.gov/education/svrwx101/winter/types/",
      },
      {
        title: "Địa lí 6 Kết nối tri thức, Bài 15. Lớp vỏ khí của Trái Đất: tầng đối lưu, lên cao 100 m nhiệt độ giảm 0,6 °C (VietJack)",
        url: "https://vietjack.com/dia-li-6-ket-noi/ly-thuyet-bai-15-lop-vo-khi-cua-trai-dat-khi-ap-va-gio.jsp",
      },
      {
        title: "Wikipedia tiếng Việt, Sương muối: hơi nước đóng băng thành hạt trắng ngay trên mặt đất, cây cỏ",
        url: "https://vi.wikipedia.org/wiki/Sương_muối",
      },
      {
        title: "Wikipedia, Sa Pa: từng ghi nhận tuyết ở độ cao khoảng 1.571 m",
        url: "https://en.wikipedia.org/wiki/Sa_Pa",
      },
      {
        title: "Wikipedia tiếng Việt, Mẫu Sơn: mùa đông có băng giá và tuyết rơi",
        url: "https://vi.wikipedia.org/wiki/Mẫu_Sơn",
      },
    ],
    hook: {
      shot: "Dãy núi phía Bắc, nhiệt kế tụt xuống 0 °C rồi âm (câu 1); cây cối đóng băng trắng, gió rét thổi (câu 2); Milo ngước nhìn bầu trời xám không có bông tuyết nào, dấu hỏi (câu 3)",
      lines: [
        nar(
          "Vì sao ở nước ta, tuyết lại hiếm gặp đến thế? Những đợt rét đậm, rét hại, vùng núi phía Bắc có khi xuống tới 0 độ C, thậm chí còn âm độ.",
          "Vì sao ở nước ta, tuyết lại hiếm gặp đến thế? Những đợt rét đậm, rét hại, vùng núi phía Bắc có khi xuống tới không độ xê, thậm chí còn âm độ.",
        ),
        nar(
          "Cây cối phủ trắng băng giá, mặt đất cứng lại vì rét. Thế mà ngay giữa cái lạnh ấy, tuyết vẫn là thứ rất hiếm khi được thấy.",
          "Cây cối phủ trắng băng giá, mặt đất cứng lại vì rét. Thế mà ngay giữa cái lạnh ấy, tuyết vẫn là thứ rất hiếm khi được thấy.",
        ),
        nar(
          "Trời đã rét đến vậy, sao tuyết vẫn chẳng chịu rơi?",
          "Trời đã rét đến vậy, sao tuyết vẫn chẳng chịu rơi?",
        ),
      ],
    },
    barrier: {
      shot: "Nhiệt kế cắm dưới đất, rồi ánh mắt đi ngược lên đám mây (câu 1); quả địa cầu với dải nhiệt đới, luồng khí lạnh tràn từ phía bắc xuống (câu 2); cột không khí: sát đất lạnh, ở giữa còn một lớp ấm (câu 3)",
      lines: [
        nar(
          "Câu trả lời nằm ở một điều ít ai để ý. Có tuyết hay không, đâu phải chỉ do nhiệt độ ở mặt đất quyết định.",
          "Câu trả lời nằm ở một điều ít ai để ý. Có tuyết hay không, đâu phải chỉ do nhiệt độ ở mặt đất quyết định.",
        ),
        nar(
          "Việt Nam nằm trong vùng nhiệt đới gió mùa, ở vĩ độ khá thấp. Không khí lạnh tràn xuống có thể làm nhiệt độ giảm rất sâu.",
          "Việt Nam nằm trong vùng nhiệt đới gió mùa, ở vĩ độ khá thấp. Không khí lạnh tràn xuống có thể làm nhiệt độ giảm rất sâu.",
        ),
        nar(
          "Nhưng không phải lần nào, cả lớp không khí từ trên cao xuống sát mặt đất cũng đều đủ lạnh.",
          "Nhưng không phải lần nào, cả lớp không khí từ trên cao xuống sát mặt đất cũng đều đủ lạnh.",
        ),
      ],
    },
    eureka: {
      shot: "Trong mây, hơi nước tụ lại thành bông tuyết sáu cánh (câu 1); bông tuyết rơi qua lớp không khí lạnh xuống tới đất (câu 2); bông tuyết gặp lớp khí ấm, tan thành giọt mưa, nhiệt kế 1–2 °C (câu 3)",
      lines: [
        nar(
          "Muốn có tuyết, trong đám mây phải đủ lạnh, để hơi nước kết lại thành những tinh thể băng.",
          "Muốn có tuyết, trong đám mây phải đủ lạnh, để hơi nước kết lại thành những tinh thể băng.",
        ),
        nar(
          "Rồi những bông tuyết ấy còn phải rơi qua cả lớp không khí bên dưới, mà không bị tan chảy giữa đường.",
          "Rồi những bông tuyết ấy còn phải rơi qua cả lớp không khí bên dưới, mà không bị tan chảy giữa đường.",
        ),
        nar(
          "Chỉ cần gặp một lớp không khí ấm hơn 0 độ C, tuyết có thể tan thành mưa, trước khi kịp chạm đất. Vì vậy, có hôm ngoài trời chỉ một, hai độ, mà trời vẫn chỉ đổ mưa lạnh.",
          "Chỉ cần gặp một lớp không khí ấm hơn không độ xê, tuyết có thể tan thành mưa, trước khi kịp chạm đất. Vì vậy, có hôm ngoài trời chỉ một, hai độ, mà trời vẫn chỉ đổ mưa lạnh.",
        ),
      ],
    },
    theorem: {
      shot: "Đỉnh núi cao vượt trên mây, tuyết rơi trên đỉnh (câu 1); sườn núi chia bậc 100 m, mỗi bậc nhiệt kế tụt 0,6 °C (câu 2); khí lạnh và hơi ẩm gặp nhau trên đỉnh, tuyết rơi (câu 3)",
      lines: [
        nar(
          "Vậy tại sao Sa Pa hay Mẫu Sơn đôi khi vẫn có tuyết? Bí mật nằm ở độ cao.",
          "Vậy tại sao Sa Pa hay Mẫu Sơn đôi khi vẫn có tuyết? Bí mật nằm ở độ cao.",
        ),
        nar(
          "Sách Địa lí lớp sáu viết rằng, trong lớp không khí gần mặt đất nhất, cứ lên cao một trăm mét, nhiệt độ lại giảm khoảng 0,6 độ C.",
          "Sách Địa lí lớp sáu viết rằng, trong lớp không khí gần mặt đất nhất, cứ lên cao một trăm mét, nhiệt độ lại giảm khoảng không phẩy sáu độ xê.",
        ),
        nar(
          "Khi không khí lạnh đủ mạnh, lại gặp thêm độ ẩm thích hợp, tuyết mới có cơ hội rơi xuống những đỉnh núi ấy.",
          "Khi không khí lạnh đủ mạnh, lại gặp thêm độ ẩm thích hợp, tuyết mới có cơ hội rơi xuống những đỉnh núi ấy.",
        ),
      ],
    },
    realworld: {
      shot: "Ba khung TUYẾT · BĂNG GIÁ · SƯƠNG MUỐI (câu 1); cận cảnh chiếc lá buổi sáng, tinh thể băng mọc dần ngay trên mặt lá (câu 2)",
      lines: [
        nar(
          "Nhưng cứ thấy trắng xoá thì chưa chắc đã là tuyết đâu nhé. Phải phân biệt tuyết với băng giá và sương muối.",
          "Nhưng cứ thấy trắng xoá thì chưa chắc đã là tuyết đâu nhé. Phải phân biệt tuyết với băng giá và sương muối.",
        ),
        nar(
          "Lớp trắng phủ trên cây cỏ lúc sáng sớm, có khi chỉ là những tinh thể băng, hình thành ngay trên bề mặt lá mà thôi.",
          "Lớp trắng phủ trên cây cỏ lúc sáng sớm, có khi chỉ là những tinh thể băng, hình thành ngay trên bề mặt lá mà thôi.",
        ),
      ],
    },
    cosmic: {
      shot: "Bông tuyết rời đám mây, rơi một quãng dài xuống đất (câu 1); cột không khí từ mây xuống đất đều lạnh, tuyết rơi trắng núi, Milo vẫy tay (câu 2)",
      lines: [
        nar(
          "Còn tuyết thì phải sinh ra từ trong mây, rồi rơi cả một quãng đường dài mới xuống tới đất.",
          "Còn tuyết thì phải sinh ra từ trong mây, rồi rơi cả một quãng đường dài mới xuống tới đất.",
        ),
        nar(
          "Nên muốn có tuyết, chỉ rét dưới mặt đất thôi thì chưa đủ. Cả bầu trời phía trên cũng phải đủ lạnh nữa.",
          "Nên muốn có tuyết, chỉ rét dưới mặt đất thôi thì chưa đủ. Cả bầu trời phía trên cũng phải đủ lạnh nữa.",
        ),
      ],
    },
  }),
  makeEpisode({
    day: 15,
    week,
    theme: "Vật lí quanh ta",
    title: "Vì sao trời càng rét càng phải cẩn thận với khí gas?",
    hudTitle: "TRỜI RÉT, SAO PHẢI CẨN THẬN KHÍ GAS?",
    coverTitle: "TẠI SAO TRỜI CÀNG RÉT CÀNG PHẢI CẨN THẬN VỚI KHÍ GAS?",
    textbook: "KHTN 8 · Tỉ khối chất khí",
    era: "Việt Nam · Mùa đông",
    question: "Nhà bạn có khoá van bình gas sau khi nấu không?",
    sources: [
      {
        title: "VTV (25/11/2026), video “Vì sao trời càng rét, khí gas càng dễ phát nổ?”: mạch nội dung của tập",
        url: "https://vtv.vn",
      },
      {
        title: "VTV (24/11/2026), Công an Hà Nội thông tin nguyên nhân vụ nổ: rò rỉ khí gas",
        url: "https://vtv.vn/cong-an-ha-noi-thong-tin-nguyen-nhan-vu-no-tai-pho-nguyen-van-tuyet-100261124202507474.htm",
      },
      {
        title: "VOH, Cách xử lý khi bị rò rỉ gas: gas nặng hơn không khí nên ở sát mặt đất; không bật tắt thiết bị điện, không gọi điện thoại tại chỗ",
        url: "https://voh.com.vn/giao-duc/cach-xu-ly-khi-bi-ro-ri-gas-267011.html",
      },
      {
        title: "Tuổi Trẻ (8/2026), Cách xử lý khi bình gas bị rò rỉ, theo PC07: khoá van, mở cửa, không bật tắt công tắc, gọi 114, thử bằng nước xà phòng",
        url: "https://tuoitre.vn/tu-vu-no-khi-gas-o-phuong-an-phu-dong-cach-xu-ly-khi-binh-gas-bi-ro-ri-sao-cho-dung-10026080409563419.htm",
      },
      {
        title: "LP Gas Magazine: mùa đông độ ẩm thấp dễ có tĩnh điện; tia tĩnh điện nhỏ nhất ta cảm thấy đã đủ gấp đôi năng lượng để mồi cháy propan",
        url: "https://www.lpgasmagazine.com/?p=43089",
      },
      {
        title: "Wikipedia, Liquefied petroleum gas: khí gas nặng hơn không khí, chảy dọc sàn, đọng ở chỗ thấp",
        url: "https://en.wikipedia.org/wiki/Liquefied_petroleum_gas",
      },
      {
        title: "Energy Safe Victoria: dây nứt, mục thì phải thay; thử chỗ nối bằng nước xà phòng, sủi bọt là hở",
        url: "https://www.energysafe.vic.gov.au/know-the-drill",
      },
      {
        title: "Apple Rubber: trời lạnh cao su cứng và co lại, đệm kín có thể bị hở",
        url: "https://www.applerubber.com/blog/the-effects-of-temperature-on-o-ring-function",
      },
      {
        title: "KHTN 8 Kết nối tri thức, Bài 3. Mol và tỉ khối chất khí (VietJack)",
        url: "https://vietjack.com/giao-an-khoa-hoc-tu-nhien-8/bai-3-mol-va-ti-khoi-chat-khi-kntt.jsp",
      },
    ],
    hook: {
      shot: "Phòng khách, ti vi đưa tin có hình bình gas và dấu cảnh báo (câu 1); đêm đông gió rét, nhà cửa đóng kín, nhiệt kế tụt (câu 2); gian bếp có bình gas, Milo nghĩ, dấu hỏi (câu 3)",
      lines: [
        nar(
          "Một vụ nổ khí gas ở Hà Nội mới đây khiến nhiều người bàng hoàng. Công an bước đầu xác định, nguyên nhân là do khí gas bị rò rỉ.",
          "Một vụ nổ khí ga ở Hà Nội mới đây khiến nhiều người bàng hoàng. Công an bước đầu xác định, nguyên nhân là do khí ga bị rò rỉ.",
        ),
        nar(
          "Nhân chuyện ấy mới nói, có một điều ít ai để ý, là cứ trời rét thì ta lại càng phải cẩn thận với khí gas hơn.",
          "Nhân chuyện ấy mới nói, có một điều ít ai để ý, là cứ trời rét thì ta lại càng phải cẩn thận với khí ga hơn.",
        ),
        nar(
          "Vì sao lại thế nhỉ?",
          "Vì sao lại thế nhỉ?",
        ),
      ],
    },
    barrier: {
      shot: "Gian bếp gió lùa qua cửa sổ, rồi cửa sổ đóng lại, luồng gió biến mất",
      lines: [
        nar(
          "Thứ nhất, trời rét thì nhà nào cũng đóng kín hết cửa lại để chắn gió. Thế là trong bếp chẳng còn luồng gió nào lùa qua nữa.",
          "Thứ nhất, trời rét thì nhà nào cũng đóng kín hết cửa lại để chắn gió. Thế là trong bếp chẳng còn luồng gió nào lùa qua nữa.",
        ),
      ],
    },
    eureka: {
      shot: "Gas rò từ bình chảy xuống, lan sát sàn (câu 1); cân: không khí và khí gas, bên khí gas nặng hơn (câu 2); đêm, đồng hồ quay, lớp gas dày dần (câu 3)",
      lines: [
        nar(
          "Mà khí gas thì lại nặng hơn không khí. Rò ra là nó chìm xuống, rồi lan ra sát mặt sàn.",
          "Mà khí ga thì lại nặng hơn không khí. Rò ra là nó chìm xuống, rồi lan ra sát mặt sàn.",
        ),
        nar(
          "Trong sách Khoa học tự nhiên lớp tám, bạn chỉ cần tính tỉ khối là thấy ngay, khí gas nặng gấp khoảng một lần rưỡi tới hai lần không khí.",
          "Trong sách Khoa học tự nhiên lớp tám, bạn chỉ cần tính tỉ khối là thấy ngay, khí ga nặng gấp khoảng một lần rưỡi tới hai lần không khí.",
        ),
        nar(
          "Không có gió thổi đi, gas cứ thế dày dần lên. Chỉ rò một chút thôi, mà để qua cả một đêm, cũng có thể tích đủ để phát nổ.",
          "Không có gió thổi đi, ga cứ thế dày dần lên. Chỉ rò một chút thôi, mà để qua cả một đêm, cũng có thể tích đủ để phát nổ.",
        ),
      ],
    },
    theorem: {
      shot: "Cô gái cởi áo len, tóc dựng lên, tia lách tách (câu 1); căn phòng đầy gas, bật lửa bị gạch (câu 2); ngón tay chạm tay nắm cửa loé tia lửa, rồi công tắc đèn (câu 3)",
      lines: [
        nar(
          "Thứ hai là tĩnh điện. Những hôm trời rét khô, người mặc áo len, áo nỉ rất dễ bị tích điện, cởi áo ra là nghe lách tách ngay.",
          "Thứ hai là tĩnh điện. Những hôm trời rét khô, người mặc áo len, áo nỉ rất dễ bị tích điện, cởi áo ra là nghe lách tách ngay.",
        ),
        nar(
          "Bình thường thì chẳng sao. Nhưng trong căn phòng đã đầy khí gas, đâu cứ phải bật lửa mới nguy hiểm.",
          "Bình thường thì chẳng sao. Nhưng trong căn phòng đã đầy khí ga, đâu cứ phải bật lửa mới nguy hiểm.",
        ),
        nar(
          "Chỉ một tia lửa bé xíu, lúc bạn chạm tay vào tay nắm cửa kim loại, hay bật công tắc đèn, cũng có thể làm gas bốc cháy rồi.",
          "Chỉ một tia lửa bé xíu, lúc bạn chạm tay vào tay nắm cửa kim loại, hay bật công tắc đèn, cũng có thể làm ga bốc cháy rồi.",
        ),
      ],
    },
    realworld: {
      shot: "Cận cảnh dây dẫn gas chai cứng, nứt dần (câu 1); bôi nước xà phòng lên chỗ nối, sủi bọt (câu 2)",
      lines: [
        nar(
          "Thứ ba là dây dẫn gas. Dây cao su dùng lâu ngày sẽ bị chai cứng rồi nứt ra, mà trời lạnh thì cao su lại càng kém dẻo hơn.",
          "Thứ ba là dây dẫn ga. Dây cao su dùng lâu ngày sẽ bị chai cứng rồi nứt ra, mà trời lạnh thì cao su lại càng kém dẻo hơn.",
        ),
        nar(
          "Chỗ nối không còn khít nữa thì gas sẽ rò ra. Muốn kiểm tra, bạn cứ bôi nước xà phòng lên, thấy sủi bọt tức là đang bị hở.",
          "Chỗ nối không còn khít nữa thì ga sẽ rò ra. Muốn kiểm tra, bạn cứ bôi nước xà phòng lên, thấy sủi bọt tức là đang bị hở.",
        ),
      ],
    },
    cosmic: {
      shot: "Bếp hé cửa sổ thoáng gió, tay khoá van bình gas (câu 1); bếp có mùi gas, công tắc và điện thoại bị gạch, rồi mở cửa, rời đi (câu 2); ngoài sân, cô gái gọi 114 (câu 3)",
      lines: [
        nar(
          "Nên dù trời rét tới đâu, gian bếp cũng phải chừa một khe cho thoáng, và nấu xong thì nhớ khoá van bình gas lại nhé.",
          "Nên dù trời rét tới đâu, gian bếp cũng phải chừa một khe cho thoáng, và nấu xong thì nhớ khoá van bình ga lại nhé.",
        ),
        nar(
          "Còn lỡ ngửi thấy mùi gas, bạn đừng bật tắt công tắc điện, cũng đừng dùng điện thoại ở đó. Hãy khoá van lại, mở hết cửa ra, rồi rời khỏi nhà.",
          "Còn lỡ ngửi thấy mùi ga, bạn đừng bật tắt công tắc điện, cũng đừng dùng điện thoại ở đó. Hãy khoá van lại, mở hết cửa ra, rồi rời khỏi nhà.",
        ),
        nar(
          "Ra tới chỗ an toàn rồi, bạn mới gọi số 114 nhé.",
          "Ra tới chỗ an toàn rồi, bạn mới gọi số một, một, bốn nhé.",
        ),
      ],
    },
  }),
  makeEpisode({
    day: 16,
    week,
    theme: "Toán học quanh ta",
    title: "Vì sao Lầu Năm Góc lại có hình năm cạnh?",
    hudTitle: "SAO LẦU NĂM GÓC CÓ NĂM CẠNH?",
    coverTitle: "TẠI SAO LẦU NĂM GÓC LẠI CÓ HÌNH NĂM CẠNH?",
    textbook: "Toán 9 · Đa giác đều",
    era: "Nước Mỹ · Năm 1941",
    question: "Theo bạn, chuyện tên lửa chĩa vào quầy xúc xích là thật hay chỉ là lời đồn?",
    sources: [
      {
        title: "Alfred Goldberg, The Pentagon: The First Fifty Years (Văn phòng Lịch sử Bộ Quốc phòng Mỹ, 1992): khu đất bị đường cắt, vòng A tới E, mười hành lang, 17,5 dặm",
        url: "https://archive.org/download/pentagonthefirst00wash/pentagonthefirst00wash_djvu.txt",
      },
      {
        title: "Wikipedia, The Pentagon: khoảng 23.000 người làm việc; chỉ vòng E nhìn ra ngoài, dành cho quan chức cấp cao; dùng ít thép để dành cho chiến tranh; khởi công 9/1941, xong 1/1943",
        url: "https://en.wikipedia.org/wiki/The_Pentagon",
      },
      {
        title: "NPR, phỏng vấn Steve Vogel: địa điểm bị dời nhưng không còn thời gian để đổi bản vẽ",
        url: "https://www.npr.org/transcripts/11817357",
      },
      {
        title: "Mental Floss: cát sỏi từ sông Potomac; không có thang máy vì tốn thép; 284 nhà vệ sinh, luật phân biệt của bang Virginia, Roosevelt có thể đã không cho chia khu",
        url: "https://www.mentalfloss.com/history/military/9-amazing-facts-about-pentagon",
      },
      {
        title: "Defense Media Network, Lost and Found in the Pentagon: trung bình khoảng bảy phút; chuyện Eisenhower đi lạc",
        url: "https://www.defensemedianetwork.com/stories/lost-and-found-in-the-pentagon/",
      },
      {
        title: "Bộ Quốc phòng Mỹ (2006): quầy xúc xích giữa sân, lời đồn hai quả tên lửa, chưa từng được phía Nga xác nhận",
        url: "https://www.dvidshub.net/news/printable/541373",
      },
    ],
    hook: {
      shot: "Toàn cảnh 3D: Lầu Năm Góc giữa đường sá, bãi xe, sông; năm vòng nhà tách nhau nhô lên (câu 1); dòng người nhỏ xíu đổ vào, số 23.000 đếm lên (câu 2); máy quay lao xuống toà nhà (câu 3)",
      lines: [
        nar(
          "Lầu Năm Góc, trụ sở quân đội Mỹ, thật ra không phải một toà nhà, mà là năm toà nhà lồng vào nhau.",
          "Lầu Năm Góc, trụ sở quân đội Mỹ, thật ra không phải một toà nhà, mà là năm toà nhà lồng vào nhau.",
        ),
        nar(
          "Mỗi ngày có chừng hai mươi ba nghìn người làm việc ở đây, đông hơn cả dân của rất nhiều thị trấn ở Mỹ.",
          "Mỗi ngày có chừng hai mươi ba nghìn người làm việc ở đây, đông hơn cả dân của rất nhiều thị trấn ở Mỹ.",
        ),
        nar(
          "Ta cùng vào trong xem thử nhé!",
          "Ta cùng vào trong xem thử nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Nhìn thẳng từ trên: đường sá bao quanh khu đất, năm cạnh sáng lần lượt (câu 1); toà nhà trượt sang chỗ khác, đồng hồ chạy (câu 2); toà nhà mọc lên từng vòng, cần cẩu, cát hút từ sông bay vào (câu 3); bên trong, đường dốc thoai thoải, người đẩy xe đi lên (câu 4)",
      lines: [
        nar(
          "Vì sao lại là năm cạnh? Vì ban đầu, nó được vẽ cho vừa một khu đất bị đường sá bao quanh, méo thành hình năm cạnh.",
          "Vì sao lại là năm cạnh? Vì ban đầu, nó được vẽ cho vừa một khu đất bị đường sá bao quanh, méo thành hình năm cạnh.",
        ),
        nar(
          "Sau đó khu đất bị dời đi chỗ khác, nhưng chiến tranh đã tới gần, chẳng còn kịp mà vẽ lại nữa.",
          "Sau đó khu đất bị dời đi chỗ khác, nhưng chiến tranh đã tới gần, chẳng còn kịp mà vẽ lại nữa.",
        ),
        nar(
          "Thế là toà nhà mọc lên chỉ trong mười sáu tháng. Thép phải dành cho chiến tranh, nên nó được đổ gần như toàn bê tông, trộn với cát lấy từ sông Potomac.",
          "Thế là toà nhà mọc lên chỉ trong mười sáu tháng. Thép phải dành cho chiến tranh, nên nó được đổ gần như toàn bê tông, trộn với cát lấy từ sông Pô tô mác.",
        ),
        nar(
          "Thang máy cũng tốn thép, nên để lên xuống các tầng, người ta làm những đường dốc thoai thoải.",
          "Thang máy cũng tốn thép, nên để lên xuống các tầng, người ta làm những đường dốc thoai thoải.",
        ),
      ],
    },
    eureka: {
      shot: "Vòng A trong cùng rồi vòng E ngoài cùng sáng lên, phòng vị tướng nhìn ra cửa sổ (câu 1); mười hành lang sáng như nan hoa, chấm người đi xuyên, đồng hồ bảy phút (câu 2)",
      lines: [
        nar(
          "Bên trong là năm vòng nhà, vòng A ở giữa, vòng E ở ngoài cùng. Chỉ vòng E là nhìn được ra bên ngoài, nên các vị tướng ngồi ở đó.",
          "Bên trong là năm vòng nhà, vòng A ở giữa, vòng E ở ngoài cùng. Chỉ vòng E là nhìn được ra bên ngoài, nên các vị tướng ngồi ở đó.",
        ),
        nar(
          "Mười hành lang cắt ngang các vòng, trông y như nan hoa bánh xe. Cộng lại dài tới hai mươi tám cây số, vậy mà đi giữa hai chỗ bất kỳ, trung bình chỉ mất chừng bảy phút.",
          "Mười hành lang cắt ngang các vòng, trông y như nan hoa bánh xe. Cộng lại dài tới hai mươi tám cây số, vậy mà đi giữa hai chỗ bất kỳ, trung bình chỉ mất chừng bảy phút.",
        ),
      ],
    },
    theorem: {
      shot: "Nhìn thẳng từ trên: ngũ giác đều phủ lên toà nhà, cạnh bằng nhau, góc bằng nhau, xoay 72 độ trùng khít; đa giác thêm cạnh dần thành tròn, đường đi ngắn lại (câu 1)",
      lines: [
        nar(
          "Trong sách Toán lớp chín, mỗi vòng nhà ấy là một ngũ giác đều, năm cạnh bằng nhau, năm góc cũng bằng nhau. Mà nhà càng gần tròn thì đi lại càng gần.",
          "Trong sách Toán lớp chín, mỗi vòng nhà ấy là một ngũ giác đều, năm cạnh bằng nhau, năm góc cũng bằng nhau. Mà nhà càng gần tròn thì đi lại càng gần.",
        ),
      ],
    },
    realworld: {
      shot: "Vị tướng đi giữa dãy cửa giống hệt nhau, ngơ ngác (câu 1); hai toà chọc trời mọc cạnh, rồi toà nhà mái vòm đặt vừa một phần năm (câu 2); chấm nhà vệ sinh hiện khắp toà nhà, hai dãy cửa riêng (câu 3); vách ngăn hạ xuống, mọi người dùng chung (câu 4)",
      lines: [
        nar(
          "Thế mà tướng Eisenhower vẫn đi lạc ở đây đấy.",
          "Thế mà tướng Ai xen hao ơ vẫn đi lạc ở đây đấy.",
        ),
        nar(
          "Diện tích văn phòng ở đây gấp đôi toà nhà Empire State. Cả toà Quốc hội Mỹ cũng đặt vừa vào chỉ một phần năm của nó.",
          "Diện tích văn phòng ở đây gấp đôi toà nhà Em pai ơ Xơ tết. Cả toà Quốc hội Mỹ cũng đặt vừa vào chỉ một phần năm của nó.",
        ),
        nar(
          "Nhà vệ sinh thì có tới hai trăm tám mươi tư cái. Vì luật bang Virginia hồi ấy bắt người da trắng và người da màu phải dùng riêng.",
          "Nhà vệ sinh thì có tới hai trăm tám mươi tư cái. Vì luật bang Vơ gi ni a hồi ấy bắt người da trắng và người da màu phải dùng riêng.",
        ),
        nar(
          "Thế nhưng, chuyện kể rằng tổng thống Roosevelt không chịu chia khu, nên cuối cùng mọi người vẫn dùng chung.",
          "Thế nhưng, chuyện kể rằng tổng thống Ru dơ ven không chịu chia khu, nên cuối cùng mọi người vẫn dùng chung.",
        ),
      ],
    },
    cosmic: {
      shot: "Máy quay lao xuống sân giữa, quầy xúc xích nhỏ; vệ tinh nhìn xuống, khung ngắm, đúng trưa người kéo vào quầy (câu 1); hầm ngầm tưởng tượng dưới quầy, hai quả tên lửa trong rừng tuyết dựng lên, tâm ngắm vào sân (câu 2); cận cảnh quầy, sĩ quan cầm bánh xúc xích (câu 3)",
      lines: [
        nar(
          "Còn ở chính giữa sân, có một quầy xúc xích nhỏ xíu. Thời Chiến tranh Lạnh, ngày nào vệ tinh Liên Xô cũng thấy, cứ đúng trưa là cả đám sĩ quan kéo vào căn nhà bé tí ấy.",
          "Còn ở chính giữa sân, có một quầy xúc xích nhỏ xíu. Thời Chiến tranh Lạnh, ngày nào vệ tinh Liên Xô cũng thấy, cứ đúng trưa là cả đám sĩ quan kéo vào căn nhà bé tí ấy.",
        ),
        nar(
          "Thế là họ đoán, đây hẳn là lối xuống một căn hầm bí mật. Chuyện kể rằng, họ chĩa hẳn hai quả tên lửa hạt nhân vào đó, phòng khi có chiến tranh.",
          "Thế là họ đoán, đây hẳn là lối xuống một căn hầm bí mật. Chuyện kể rằng, họ chĩa hẳn hai quả tên lửa hạt nhân vào đó, phòng khi có chiến tranh.",
        ),
        nar(
          "Chiến tranh chẳng bao giờ nổ ra. Còn suốt ngần ấy năm, cái quầy ấy chỉ bán xúc xích thôi!",
          "Chiến tranh chẳng bao giờ nổ ra. Còn suốt ngần ấy năm, cái quầy ấy chỉ bán xúc xích thôi!",
        ),
      ],
    },
  }),
];
