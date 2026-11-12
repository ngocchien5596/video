/**
 * Tên vai / đạo cụ / phông của các truyện dùng trong cảnh hồi ức tuần 4 (Nói vậy).
 * Mỗi tên có một dòng mô tả: AI viết phần diễn đọc file này để biết có gì dùng được.
 * Hình vẽ nằm ở engine/stage/story/tuan-4.tsx.
 */

/** Vai (role). */
export type RoleTuan4 =
  /** Vua Mi-đát (thần thoại Hy Lạp): đôi tai lừa dựng cao, vòng vàng trên trán, râu xoăn, áo choàng tím sẫm. Đội `midas-mu` để giấu tai. */
  | "midas-vua"
  /** Người thợ cạo của vua Mi-đát: đầu hói, ria cong, áo tối, tạp dề trắng. */
  | "midas-tho-cao"
  /** Thầy bói xem voi: ông béo, khăn xếp tối, mắt nhắm, râu bạc dài, áo the tối. */
  | "thay-boi-beo"
  /** Thầy bói xem voi: ông gầy, đầu hói có chỏm tóc, kính đen tròn, râu dê, áo sáng thắt lưng tối. */
  | "thay-boi-gay"
  /** Quạ và Cáo: con quạ lông đen, mỏ to chĩa ngang (expr happy/shock thì há mỏ). */
  | "qua-cao-qua"
  /** Quạ và Cáo: con cáo, tai nhọn, mõm trắng, đuôi xù đầu trắng. */
  | "qua-cao-cao"
  /** Tấm Cám: cô Tấm hiền, búi tóc cài hoa, áo tứ thân sáng, váy đen. */
  | "tam-cam-tam"
  /** Tấm Cám: cô Cám, tóc búi hai bên, nốt ruồi, áo chấm bi sẫm. */
  | "tam-cam-cam"
  /** Tấm Cám: dì ghẻ (mẹ Cám), khăn vấn đen to, nếp nhăn, nốt ruồi, áo tối. */
  | "tam-cam-di-ghe";

/** Đạo cụ (prop). */
export type PropTuan4 =
  /** Mũ trùm cao chóp cong của vua Mi-đát (đội `head` vai `midas-vua`, che kín tai lừa). */
  | "midas-mu"
  /** Kéo cắt tóc (cầm tay). */
  | "midas-keo"
  /** Xẻng đào đất (cầm tay). */
  | "midas-xeng"
  /** Hố đất mới đào, đống đất bên cạnh (đặt sàn). */
  | "midas-ho"
  /** Ụ đất đã lấp (đặt sàn, thay cho `midas-ho`). */
  | "midas-u-dat"
  /** Khóm lau sậy cao, gió thổi; `text` là lời rì rào hiện trong dải gió phía trên (đặt sàn). */
  | "midas-lau-say"
  /** Gậy trúc dò đường của thầy bói (cầm tay). */
  | "thay-boi-gay-truc"
  /** Con voi to quay đầu sang trái: vòi bên trái, đuôi bên phải (đặt sàn, scale ~1, x 0.5). */
  | "thay-boi-voi"
  /** Miếng pho mát ngậm ở mỏ quạ (đeo `face` vai `qua-cao-qua`). */
  | "qua-cao-pho-mat-mo"
  /** Miếng pho mát ngậm ở miệng cáo (đeo `face` vai `qua-cao-cao`). */
  | "qua-cao-pho-mat-cao"
  /** Miếng pho mát rời (đặt sàn hoặc cầm tay). */
  | "qua-cao-pho-mat"
  /** Chiếc hài thêu của Tấm (cầm `hold` hoặc đặt sàn). */
  | "tam-cam-hai"
  /** Mũ phượng hoàng hậu (đội `head`). */
  | "tam-cam-mu-phuong";

/** Phông (scene). */
export type SceneTuan4 =
  /** Vua Mi-đát: cung điện Hy Lạp, cột đá trắng, rèm sẫm, ngai vàng giữa. */
  | "midas-cung"
  /** Vua Mi-đát: bãi đất ven sông vắng, đồi xa, nền cỏ (chỗ đào hố, lau sậy mọc). */
  | "midas-dong-co"
  /** Thầy bói xem voi: đầu làng, cổng làng, mái đình xa, lũy tre. */
  | "thay-boi-lang"
  /** Quạ và Cáo: rừng ban ngày, gốc cây to bên trái có cành thấp chìa ngang dưới chân (quạ đứng x ≈ 0.25). */
  | "qua-cao-rung"
  /** Tấm Cám: điện vua, cột đỏ, ngai vàng, đèn lồng. */
  | "tam-cam-cung"
  /** Tấm Cám: nhà tranh mẹ con Cám ban đêm, cửa sổ trăng, đèn dầu. */
  | "tam-cam-nha";
