"""Sinh file tiếng cho từng câu thoại bằng OmniVoice (nhân bản từ voices/cu-do.wav, voices/thang-chau.wav).

Gọi qua `npm run voice -- [-p <dự án>] <ngày>`; không chạy trực tiếp.
Mỗi việc trong file jobs có "dir": thư mục tiếng của tập, tương đối với gốc repo (public/voice/<dự án>/ngay-XX).
"""
from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import re
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vi_text import normalize_numbers  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"

# Giọng mẫu và tốc độ đọc của từng vai.
SPEAKERS = {
    "CD": {"ref": ROOT / "voices" / "cu-do.wav", "speed": 1.0},
    "TC": {"ref": ROOT / "voices" / "thang-chau.wav", "speed": 1.08},
    "NARRATOR": {"ref": ROOT / "voices" / "narrator.wav", "fallback": ROOT / "voices" / "cu-do.wav", "speed": 1.0},
}


def resolve_ref(who: str) -> Path:
    s = SPEAKERS[who]
    ref = s["ref"]
    if ref.exists():
        return ref
    fb = s.get("fallback")
    if fb and fb.exists():
        return fb
    return ref


def tts_text(text: str) -> str:
    """Bỏ ký tự chỉ có nghĩa trên phụ đề (ngoặc kép, dấu ba chấm ở đầu câu...) và đổi số sang chữ."""
    t = re.sub(r"[\"'‘’“”«»]", "", text)
    t = re.sub(r"^\s*(\.\.\.|…)\s*", "", t)
    t = re.sub(r"\s*(\.\.\.|…)\s*$", ".", t)
    t = re.sub(r"\s*(\.\.\.|…)\s*", ", ", t)
    t = re.sub(r"([?!])[?!]+", r"\1", t)
    # Ngoặc đơn đọc thành quãng ngắt (câu có "(115m)" từng làm mô hình đọc lặp chữ).
    t = re.sub(r"\s*[()]\s*", ", ", t)
    t = re.sub(r"(,\s*)+([,.!?;:])", r"\2", t)
    t = re.sub(r",\s*$", ".", t)
    # Mô hình đọc không hiểu chữ số ("15", "1950", "5:00"), phải đổi sang chữ tiếng Việt.
    t = normalize_numbers(t)
    return re.sub(r"\s+", " ", t).strip()


# Nghe lại mỗi câu vừa sinh: khớp từ dưới mức này thì sinh lại (tối đa len(SEEDS) lần).
# Mô hình chạy chế độ tất định nên chỉ đổi hạt giống có thể ra y hệt; mỗi lần đọc lại đổi nhẹ cả tốc độ.
GOOD_MATCH = 0.9
SEEDS = [0, 1, 2, 3]
SPEED_JITTER = [1.0, 0.96, 1.04, 0.93]

# ASR viết tắt đơn vị: đổi lại thành chữ trước khi so.
ASR_ABBR = {"m": ["mét"], "km": ["ki", "lô", "mét"], "cm": ["xen", "ti", "mét"], "kg": ["ki", "lô", "gam"], "g": ["gam"]}


def words(text: str) -> list[str]:
    out: list[str] = []
    for w in re.findall(r"\w+", unicodedata.normalize("NFC", text.lower())):
        out.extend(ASR_ABBR.get(w, [w]))
    return out


def match_score(expected: str, heard: str) -> float:
    """Tỉ lệ từ khớp giữa câu cần đọc và câu ASR nghe được (đọc thừa, lặp, thiếu chữ đều làm giảm điểm)."""
    return difflib.SequenceMatcher(None, words(expected), words(heard)).ratio()


def load_listener(tts_root: Path):
    """ASR Chunkformer của repo giọng nói: trả về hàm (đường dẫn wav) -> chữ nghe được."""
    sys.path.insert(0, str(tts_root / "OmniVoice"))
    from omnivoice.models.asr_chunkformer import ASRChunkformer  # type: ignore

    asr = ASRChunkformer()
    asr.load_model(str(tts_root / "OmniVoice" / "model_ASR_chunkformer_local"))
    import contextlib
    import io

    def listen(path: str) -> str:
        # ASR in nhiều dòng tiến trình; nuốt đi cho log gọn.
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            return asr.transcribe(path, "vi")

    return listen


def file_md5(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--tts-root", required=True)
    parser.add_argument("--jobs", required=True)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    jobs = json.loads((ROOT / args.jobs).read_text(encoding="utf-8"))
    used_speakers = {line["who"] for job in jobs for line in job["lines"] if line["who"] in SPEAKERS}
    ref_paths = {who: resolve_ref(who) for who in used_speakers}
    ref_md5 = {who: file_md5(p) for who, p in ref_paths.items()}

    def spoken_raw(line: dict) -> str:
        return line.get("tts") or line["text"]

    def key(line: dict) -> str:
        s = SPEAKERS[line["who"]]
        raw = f'{line["who"]}|{tts_text(spoken_raw(line))}|{ref_md5[line["who"]]}|{s["speed"]}'
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
        listen = load_listener(Path(args.tts_root))
        prompts = {
            who: model.create_voice_clone_prompt(
                ref_audio=str(ref_paths[who]),
                ref_text=ref_paths[who].with_suffix(".txt").read_text(encoding="utf-8").strip(),
            )
            for who in used_speakers
        }

    done = 0
    for job, day_dir, manifest_path in plan:
        day_dir.mkdir(parents=True, exist_ok=True)
        entries = []
        for line in job["lines"]:
            if line["reuse"]:
                entry = dict(line["reuse"], beat=line["beat"], line=line["line"], text=line["text"])
                if line.get("tts"):
                    entry["tts"] = line["tts"]
            else:
                done += 1
                text = tts_text(spoken_raw(line))
                print(f'  [{done}/{todo}] Ngày {job["day"]} {line["name"]}: {text}', flush=True)
                wav = day_dir / line["name"]
                # Sinh, nghe lại bằng ASR, chưa khớp thì sinh lại với hạt giống khác; giữ bản khớp nhất.
                # (Bắt lỗi mô hình đọc lặp chữ, hoặc đọc lẫn câu mẫu của giọng như "…ông giảng cho mà nghe".)
                best = None
                for attempt, seed in enumerate(SEEDS):
                    torch.manual_seed(seed)
                    audio = model.generate(
                        text=text,
                        language="vi",
                        voice_clone_prompt=prompts[line["who"]],
                        speed=SPEAKERS[line["who"]]["speed"] * SPEED_JITTER[attempt],
                    )[0]
                    save_wav(wav, audio, model.sampling_rate)
                    heard = listen(str(wav))
                    score = match_score(text, heard)
                    if best is None or score > best[0]:
                        best = (score, audio, heard)
                    if score >= GOOD_MATCH:
                        break
                    print(f"        lần {attempt + 1}: khớp {score:.0%}, nghe thành: {heard}", flush=True)
                score, audio, heard = best
                save_wav(wav, audio, model.sampling_rate)
                if score < GOOD_MATCH:
                    print(f"        ⚠ sau {len(SEEDS)} lần vẫn chỉ khớp {score:.0%}, cần nghe lại: {heard}", flush=True)
                entry = {
                    "beat": line["beat"],
                    "line": line["line"],
                    "file": wav.relative_to(PUBLIC).as_posix(),
                    "seconds": round(len(audio) / model.sampling_rate, 3),
                    "text": line["text"],
                    "key": line["key"],
                    "asr": round(score, 3),
                }
                if line.get("tts"):
                    entry["tts"] = line["tts"]
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
