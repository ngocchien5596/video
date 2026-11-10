"""Sinh file tiếng cho từng câu thoại bằng OmniVoice (nhân bản từ voices/cu-do.wav, voices/thang-chau.wav).

Gọi qua `npm run voice -- [-p <dự án>] <ngày>`; không chạy trực tiếp.
Mỗi việc trong file jobs có "dir": thư mục tiếng của tập, tương đối với gốc repo (public/voice/<dự án>/ngay-XX).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"

# Giọng mẫu và tốc độ đọc của từng vai.
SPEAKERS = {
    "CD": {"ref": ROOT / "voices" / "cu-do.wav", "speed": 1.0},
    "TC": {"ref": ROOT / "voices" / "thang-chau.wav", "speed": 1.08},
}


def tts_text(text: str) -> str:
    """Bỏ ký tự chỉ có nghĩa trên phụ đề (ngoặc kép, dấu ba chấm ở đầu câu...)."""
    t = re.sub(r"[\"'‘’“”«»]", "", text)
    t = re.sub(r"^\s*(\.\.\.|…)\s*", "", t)
    t = re.sub(r"\s*(\.\.\.|…)\s*$", ".", t)
    t = re.sub(r"\s*(\.\.\.|…)\s*", ", ", t)
    t = re.sub(r"([?!])[?!]+", r"\1", t)
    return re.sub(r"\s+", " ", t).strip()


def file_md5(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--tts-root", required=True)
    parser.add_argument("--jobs", required=True)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    jobs = json.loads((ROOT / args.jobs).read_text(encoding="utf-8"))
    ref_md5 = {who: file_md5(s["ref"]) for who, s in SPEAKERS.items()}

    def key(line: dict) -> str:
        s = SPEAKERS[line["who"]]
        raw = f'{line["who"]}|{tts_text(line["text"])}|{ref_md5[line["who"]]}|{s["speed"]}'
        return hashlib.sha1(raw.encode("utf-8")).hexdigest()[:16]

    # Lập danh sách việc cần làm trước, để không phải nạp model nếu mọi câu đã có tiếng.
    plan = []
    for job in jobs:
        day_dir = ROOT / job["dir"]
        manifest_path = day_dir / "manifest.json"
        old = {}
        if manifest_path.exists() and not args.force:
            for item in json.loads(manifest_path.read_text(encoding="utf-8"))["lines"]:
                old[item.get("key")] = item
        for line in job["lines"]:
            if line["who"] not in SPEAKERS:
                sys.exit(f'Không có giọng cho vai {line["who"]}')
            line["key"] = key(line)
            line["name"] = f'{line["beat"] + 1}-{line["line"] + 1}-{line["who"].lower()}.wav'
            prev = old.get(line["key"])
            line["reuse"] = prev if prev and (PUBLIC / prev["file"]).exists() else None
        plan.append((job, day_dir, manifest_path))

    todo = sum(1 for job, _, _ in plan for line in job["lines"] if not line["reuse"])
    print(f"Cần sinh {todo} câu, giữ lại {sum(len(j['lines']) for j, _, _ in plan) - todo} câu cũ.", flush=True)

    model = prompts = None
    if todo:
        sys.path.insert(0, str(Path(__file__).parent))
        from omni_loader import load_model, save_wav  # noqa: E402

        import torch

        model = load_model(Path(args.tts_root))
        prompts = {
            who: model.create_voice_clone_prompt(
                ref_audio=str(s["ref"]),
                ref_text=s["ref"].with_suffix(".txt").read_text(encoding="utf-8").strip(),
            )
            for who, s in SPEAKERS.items()
        }

    done = 0
    for job, day_dir, manifest_path in plan:
        day_dir.mkdir(parents=True, exist_ok=True)
        entries = []
        for line in job["lines"]:
            if line["reuse"]:
                entry = dict(line["reuse"], beat=line["beat"], line=line["line"], text=line["text"])
            else:
                done += 1
                text = tts_text(line["text"])
                print(f'  [{done}/{todo}] Ngày {job["day"]} {line["name"]}: {text}', flush=True)
                torch.manual_seed(0)
                audio = model.generate(
                    text=text,
                    language="vi",
                    voice_clone_prompt=prompts[line["who"]],
                    speed=SPEAKERS[line["who"]]["speed"],
                )[0]
                wav = day_dir / line["name"]
                save_wav(wav, audio, model.sampling_rate)
                entry = {
                    "beat": line["beat"],
                    "line": line["line"],
                    "file": wav.relative_to(PUBLIC).as_posix(),
                    "seconds": round(len(audio) / model.sampling_rate, 3),
                    "text": line["text"],
                    "key": line["key"],
                }
            entries.append(entry)

        manifest = {"day": job["day"], "lines": entries}
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        # Dọn file tiếng của câu đã bị xoá / đổi chỗ.
        keep = {Path(e["file"]).name for e in entries}
        for wav in day_dir.glob("*.wav"):
            if wav.name not in keep:
                wav.unlink()
        print(f"  -> {manifest_path.relative_to(ROOT)}", flush=True)


if __name__ == "__main__":
    main()
