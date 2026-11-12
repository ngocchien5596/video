/**
 * Tên vai / đạo cụ / phông của các truyện dùng trong cảnh hồi ức tuần 3 (Nói vậy).
 * Mỗi tên có một dòng mô tả: AI viết phần diễn đọc file này để biết có gì dùng được.
 * Hình vẽ nằm ở engine/stage/story/tuan-3.tsx.
 */

/** Vai (role). */
export type RoleTuan3 =
  /** Ve và Kiến: con ve sầu, đầu sáng màu, hai mắt lồi to hai bên, râu ngắn, cánh mỏng trong suốt sau lưng. */
  | "ve-kien-ve"
  /** Ve và Kiến: con kiến, đầu sẫm màu, hai râu cong có chấm tròn, thân đốt màu tối. */
  | "ve-kien-kien"
  /** Mai An Tiêm: chàng trai khoẻ, khăn buộc đầu, áo cánh sáng màu, quần tối xắn gấu. */
  | "an-tiem"
  /** Mai An Tiêm: vua Hùng, mũ lông chim cao, râu dài, áo bào tối viền vàng. */
  | "an-tiem-vua-hung"
  /** Đẽo cày giữa đường: anh thợ đẽo cày, khăn quấn đầu tối, áo nâu, quần sáng xắn ống. */
  | "deo-cay-anh"
  /** Đẽo cày giữa đường: ông lão qua đường, đội nón lá, râu bạc dài. */
  | "deo-cay-ong-lao"
  /** Đẽo cày giữa đường: bà hàng xóm qua đường, khăn mỏ quạ đen, áo tứ thân sáng, yếm. */
  | "deo-cay-ba"
  /** Rùa và Thỏ: con thỏ trắng, tai dài dựng đứng, răng thỏ. */
  | "tho-rua-tho"
  /** Rùa và Thỏ: con rùa, đầu tròn, mai rùa to sẫm màu có vân sau lưng. */
  | "tho-rua-rua"
  /** Mài sắt nên kim: cậu bé Lý Bạch, hai búi tóc trái đào, áo sáng màu. */
  | "ly-bach"
  /** Mài sắt nên kim: bà lão tóc bạc búi, áo tối màu, nếp nhăn. */
  | "ly-bach-ba-lao";

/** Đạo cụ (prop). */
export type PropTuan3 =
  /** Ve và Kiến: cây đàn nguyệt của ve (cầm tay). */
  | "ve-kien-dan"
  /** Ve và Kiến: hạt thóc to kiến tha về (cầm `hold2`, hoặc đặt trên sàn). */
  | "ve-kien-hat-thoc"
  /** Ve và Kiến: đống thóc kiến tích trữ (đặt trên sàn). */
  | "ve-kien-dong-thoc"
  /** Mai An Tiêm: quả dưa hấu sọc, có chữ khắc (mặc định "AN TIÊM"); cầm `hold2` hoặc đặt sàn. */
  | "an-tiem-dua"
  /** Mai An Tiêm: cái cuốc (cầm tay). */
  | "an-tiem-cuoc"
  /** Mai An Tiêm: con chim bay cao trên trời, mỏ thả hạt rơi xuống. */
  | "an-tiem-chim"
  /** Mai An Tiêm: ruộng dưa: dây lá bò sát đất với mấy quả dưa (đặt trên sàn). */
  | "an-tiem-ruong-dua"
  /** Mai An Tiêm: thuyền buôn có buồm, nổi trên mặt nước (đặt trên sàn ở phần biển). */
  | "an-tiem-thuyen"
  /** Đẽo cày giữa đường: khúc gỗ to (đặt trên sàn). */
  | "deo-cay-go"
  /** Đẽo cày giữa đường: cái cày gỗ (đặt trên sàn, đổi `scale` để thấy to / nhỏ). */
  | "deo-cay-cay"
  /** Đẽo cày giữa đường: con voi (đặt trên sàn, cảnh tưởng tượng cày bằng voi). */
  | "deo-cay-voi"
  /** Đẽo cày giữa đường: đống vụn gỗ, mẩu cày gãy (đặt trên sàn). */
  | "deo-cay-vun"
  /** Rùa và Thỏ: cổng đích có băng chữ (mặc định "ĐÍCH"), đặt trên sàn. */
  | "tho-rua-dich"
  /** Rùa và Thỏ: cây to bóng mát giữa đường (đặt trên sàn). */
  | "tho-rua-cay"
  /** Mài sắt nên kim: thanh sắt to (cầm tay). */
  | "ly-bach-thanh-sat"
  /** Mài sắt nên kim: cây kim khâu lấp lánh (cầm tay). */
  | "ly-bach-kim"
  /** Mài sắt nên kim: tảng đá mài phẳng bên suối (đặt trên sàn). */
  | "ly-bach-da-mai";

/** Phông (scene). */
export type SceneTuan3 =
  /** Ve và Kiến: đồng cỏ mùa hè, nắng to, cây xanh, tổ kiến ụ đất bên phải. */
  | "ve-kien-he"
  /** Ve và Kiến: mùa đông, trời xám, gió bấc, cây trụi lá, tuyết; nhà kiến có cửa tròn ở bên phải (x ≈ 0.82). */
  | "ve-kien-dong"
  /** Mai An Tiêm: đảo hoang: bãi cát bên trái (x < 0.62), biển bên phải (đồ đặt x > 0.72 là nổi trên nước). */
  | "an-tiem-dao"
  /** Đẽo cày giữa đường: đường làng bên lũy tre, đồng lúa xa. */
  | "deo-cay-duong"
  /** Rùa và Thỏ: đường đua qua đồng cỏ, đồi xa, vạch xuất phát bên trái. */
  | "tho-rua-dong-co"
  /** Mài sắt nên kim: bờ suối dưới chân núi, nước chảy, đá cuội. */
  | "ly-bach-suoi";
