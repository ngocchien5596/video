import type { ArmPose, Expr } from "../lib/stage-types.ts";

/**
 * Góc tay tính bằng độ, nhân vật quay mặt sang phải.
 * [vai, khuỷu]: vai 0 = buông thẳng, 90 = ngang ra ngoài, 180 = giơ thẳng lên.
 * Khuỷu cộng thêm vào góc vai; số âm = gập vào trong thân.
 * front = tay phía người đối diện, back = tay còn lại.
 */
export type ArmAngles = { front: [number, number]; back: [number, number] };

export const ARM_POSES: Record<ArmPose, ArmAngles> = {
  down: { front: [12, 0], back: [12, 0] },
  point: { front: [92, -4], back: [12, 0] },
  raise: { front: [165, 0], back: [12, 0] },
  up2: { front: [150, 15], back: [150, 15] },
  hips: { front: [35, -120], back: [35, -120] },
  hold: { front: [45, 50], back: [12, 0] },
  hold2: { front: [22, -98], back: [22, -98] },
  shrug: { front: [60, 90], back: [60, 90] },
  hit: { front: [80, 0], back: [12, 0] },
  wave: { front: [150, 30], back: [12, 0] },
};

/** Tư thế có chuyển động lặp: trả về góc theo số khung hình kể từ lúc vào tư thế. */
export const animateArms = (pose: ArmPose, local: number): ArmAngles => {
  const base = ARM_POSES[pose];
  if (pose === "hit") {
    // Vung quạt 3 lần trong ~1 giây đầu rồi dừng ở tư thế chĩa ra trước.
    if (local < 30) {
      const swing = Math.cos(local * 0.63);
      return { ...base, front: [125 + 50 * swing, 0] };
    }
    return base;
  }
  if (pose === "wave") {
    return { ...base, front: [150, 30 + 25 * Math.sin(local * 0.5)] };
  }
  return base;
};

/**
 * Cử chỉ theo nét mặt khi tay đang buông (`arms: "down"`), theo bảng "Biểu cảm tiêu biểu" của bản thiết kế:
 * suy nghĩ (confused): Cụ Đồ vuốt râu, Thằng Cháu gãi đầu · cau mày (angry): khoanh tay.
 * Trả về khoá cử chỉ (để biết khi nào phải chuyển tay) hoặc null nếu không có cử chỉ riêng.
 */
export const gestureKey = (pose: ArmPose, expr: Expr, who: "CD" | "TC"): string | null => {
  if (pose !== "down") return null;
  if (expr === "confused") return who === "CD" ? "stroke-beard" : "scratch-head";
  if (expr === "angry") return "fold";
  return null;
};

/** Góc tay theo tư thế + cử chỉ của nét mặt (xem gestureKey). */
export const gestureArms = (pose: ArmPose, expr: Expr, who: "CD" | "TC", local: number): ArmAngles => {
  // Thằng Cháu tay dài hơn: chống nạnh thì bàn tay đặt đúng hai bên hông.
  if (pose === "hips" && who === "TC") return { front: [38, -95], back: [38, -95] };
  switch (gestureKey(pose, expr, who)) {
    case "stroke-beard":
      return { front: [20, -160 + 8 * Math.sin(local * 0.16)], back: [12, 0] };
    case "scratch-head":
      return { front: [137, 80 + 12 * Math.sin(local * 0.7)], back: [12, 0] };
    case "fold":
      return { front: [28, -118], back: [28, -118] };
    default:
      return animateArms(pose, local);
  }
};
