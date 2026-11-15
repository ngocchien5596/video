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

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vi_text import apply_pronounce, leaked_ref, normalize_numbers  # noqa: E402

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
    leaks = []
    for rel in args.manifests:
        manifest = ROOT / rel
        if not manifest.exists():
            print(f"{rel}: chưa có tiếng (chạy npm run voice)")
            continue
        day = json.loads(manifest.read_text(encoding="utf-8"))["day"]
        print(f"\nNgày {day}")
        for item in json.loads(manifest.read_text(encoding="utf-8"))["lines"]:
            heard = asr.transcribe(str(PUBLIC / item["file"]), "vi")
            ref_str = item.get("tts") or item["text"]
            expected = normalize_numbers(apply_pronounce(ref_str))
            score = difflib.SequenceMatcher(None, words(expected), words(heard)).ratio()
            leak = leaked_ref(expected, heard)
            mark = "LẪN" if leak else ("OK " if score >= THRESHOLD else "XEM")
            bad += bool(leak) or score < THRESHOLD
            print(f"  {mark} {score:4.0%}  {Path(item['file']).name}" + (f"  ⛔ đọc lẫn câu mẫu: {'; '.join(leak)}" if leak else ""))
            if leak:
                leaks.append({"manifest": rel, "file": item["file"], "leak": leak, "heard": heard})
            if leak or score < THRESHOLD:
                print(f"        viết: {ref_str}\n        nghe: {heard}")
    print(f"\n{bad} câu cần nghe lại." if bad else "\nTất cả câu đều khớp.")
    if leaks:
        out = ROOT / "out" / "voice-leaks.json"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(leaks, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"⛔ {len(leaks)} câu đọc lẫn câu mẫu giọng, danh sách: {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
