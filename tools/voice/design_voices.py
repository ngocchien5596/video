"""Tạo giọng mẫu cho Cụ Đồ và Thằng Cháu bằng chế độ voice design của OmniVoice.

Không dùng giọng người thật: giọng được tạo từ mô tả (giới tính, tuổi, cao độ).
Mỗi nhân vật sinh vài phương án vào voices/mau/, nghe rồi chọn một bằng:
    npm run voice:pick -- cu-do 2

Chạy bằng Python của repo giọng nói (xem tools/voice/config.mjs):
    npm run voice:design
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VOICES = ROOT / "voices"

CHARACTERS = {
    "cu-do": {
        "instruct": "male, elderly, low pitch",
        "text": "Này cháu, ông bà ta nói vậy, mà không phải vậy đâu. Ngồi xuống đây, ông giảng cho mà nghe.",
    },
    "thang-chau": {
        "instruct": "male, teenager, high pitch",
        "text": "Ơ, cháu hiểu rồi mà ông! Chuyện này dễ ợt, để cháu làm cho ông xem luôn nhé!",
    },
    "narrator": {
        "instruct": "male, mature, warm, calm storyteller, low pitch",
        "text": "Cách đây hơn hai nghìn năm, chỉ với một chiếc cọc gỗ nhỏ cắm trên cát, con người đã đo được chiều cao của Đại kim tự tháp.",
    },
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--tts-root", required=True, help="Thư mục repo Tao_giong_noi_local")
    parser.add_argument("--count", type=int, default=4, help="Số phương án mỗi nhân vật")
    parser.add_argument("--only", choices=list(CHARACTERS), help="Chỉ tạo cho một nhân vật")
    args = parser.parse_args()

    from omni_loader import load_model, save_wav  # noqa: E402

    import torch

    model = load_model(Path(args.tts_root))
    out_dir = VOICES / "mau"
    out_dir.mkdir(parents=True, exist_ok=True)

    for name, spec in CHARACTERS.items():
        if args.only and name != args.only:
            continue
        for i in range(1, args.count + 1):
            torch.manual_seed(1000 * i + 7)
            # Repo giọng nói đặt nhiệt độ = 0 (tất định); bật lại để mỗi seed ra một giọng khác.
            audio = model.generate(
                text=spec["text"],
                language="vi",
                instruct=spec["instruct"],
                position_temperature=5.0,
                class_temperature=0.4,
            )[0]
            wav = out_dir / f"{name}-{i}.wav"
            save_wav(wav, audio, model.sampling_rate)
            wav.with_suffix(".txt").write_text(spec["text"], encoding="utf-8")
            print(f"  {wav.relative_to(ROOT)}  ({len(audio) / model.sampling_rate:.1f}s)", flush=True)

        # Chưa chọn thì lấy phương án 1 làm mặc định.
        target = VOICES / f"{name}.wav"
        if not target.exists():
            shutil.copy(out_dir / f"{name}-1.wav", target)
            shutil.copy(out_dir / f"{name}-1.txt", target.with_suffix(".txt"))
            print(f"  -> mặc định voices/{name}.wav = phương án 1", flush=True)


if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).parent))
    main()
