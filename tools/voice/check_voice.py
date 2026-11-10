"""Nghe lại tiếng đã sinh bằng ASR Chunkformer và báo câu đọc sai / nuốt chữ.

    npm run voice:check -- 1
"""
from __future__ import annotations

import argparse
import difflib
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"
# Tỉ lệ từ khớp dưới mức này thì đánh dấu để nghe lại.
THRESHOLD = 0.8


def words(text: str) -> list[str]:
    t = unicodedata.normalize("NFC", text.lower())
    return re.findall(r"\w+", t)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--tts-root", required=True)
    # Danh sách file manifest.json, tương đối với gốc repo (public/voice/<dự án>/ngay-XX/manifest.json).
    parser.add_argument("manifests", nargs="+")
    args = parser.parse_args()

    sys.path.insert(0, str(Path(args.tts_root) / "OmniVoice"))
    from omnivoice.models.asr_chunkformer import ASRChunkformer  # type: ignore

    asr = ASRChunkformer()
    asr.load_model(str(Path(args.tts_root) / "OmniVoice" / "model_ASR_chunkformer_local"))

    bad = 0
    for rel in args.manifests:
        manifest = ROOT / rel
        if not manifest.exists():
            print(f"{rel}: chưa có tiếng (chạy npm run voice)")
            continue
        day = json.loads(manifest.read_text(encoding="utf-8"))["day"]
        print(f"\nNgày {day}")
        for item in json.loads(manifest.read_text(encoding="utf-8"))["lines"]:
            heard = asr.transcribe(str(PUBLIC / item["file"]), "vi")
            score = difflib.SequenceMatcher(None, words(item["text"]), words(heard)).ratio()
            mark = "OK " if score >= THRESHOLD else "XEM"
            bad += score < THRESHOLD
            print(f"  {mark} {score:4.0%}  {Path(item['file']).name}")
            if score < THRESHOLD:
                print(f"        viết: {item['text']}\n        nghe: {heard}")
    print(f"\n{bad} câu cần nghe lại." if bad else "\nTất cả câu đều khớp.")


if __name__ == "__main__":
    main()
