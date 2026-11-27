"""Kiểm ngắt nghỉ của tiếng đã sinh: chỗ ngắt có đúng dấu câu không, dấu câu có được nghỉ không.

    npm run voice:pauses -- -p kt 17

Mỗi file: tìm các quãng lặng trong câu (bỏ đầu, cuối), cắt tiếng thành đoạn theo quãng lặng, cho ASR nghe
từng đoạn rồi khớp với lời viết để biết mỗi chỗ ngắt rơi sau chữ nào. Báo:
  SAI   ngắt giữa cụm từ (sau chữ đó không có dấu câu), từ LONG_BAD giây trở lên.
  DÀI   nghỉ quá lâu ở dấu phẩy (trên COMMA_MAX) hoặc dấu chấm (trên STOP_MAX).
  LIỀN  dấu chấm / chấm hỏi giữa câu mà đọc liền, không nghỉ chút nào.
  NGÂN  một chữ bị kéo dài quá HELD_MAX giây (tools/voice/prosody.py); in chữ bị ngân.
Không sửa gì; câu bị báo thì sửa lời (thêm/bớt dấu phẩy, tách câu) hoặc sinh lại tiếng.
"""
from __future__ import annotations

import argparse
import contextlib
import difflib
import io
import json
import re
import sys
import tempfile
import unicodedata
from pathlib import Path

import numpy as np
import soundfile as sf

sys.path.insert(0, str(Path(__file__).resolve().parent))
from make_voice import tts_text  # noqa: E402
from prosody import HELD_MAX, held_runs  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"

FRAME = 0.02
MIN_PAUSE = 0.16  # quãng lặng ngắn hơn coi như hơi thở giữa chữ, bỏ qua
LONG_BAD = 0.22  # ngắt sai chỗ từ chừng này trở lên mới báo
COMMA_MAX = 0.75
STOP_MAX = 1.1

ASR_ABBR = {"m": ["mét"], "km": ["ki", "lô", "mét"], "cm": ["xen", "ti", "mét"], "kg": ["ki", "lô", "gam"], "g": ["gam"]}


def norm_words(text: str) -> list[str]:
    out: list[str] = []
    for w in re.findall(r"\w+", unicodedata.normalize("NFC", text.lower())):
        out.extend(ASR_ABBR.get(w, [w]))
    return out


def bare(w: str) -> str:
    """Bỏ dấu thanh, dấu mũ để khớp chữ nghe với chữ viết (ASR hay nghe "rơi" thành "rời")."""
    return "".join(c for c in unicodedata.normalize("NFD", w) if not unicodedata.combining(c)).replace("đ", "d")


def tokens(text: str) -> list[tuple[str, str]]:
    """[(chữ, dấu câu ngay sau chữ)] của câu đã chuẩn hoá để đọc."""
    t = unicodedata.normalize("NFC", text)
    out: list[tuple[str, str]] = []
    for m in re.finditer(r"(\w+)([^\w\s]*)", t):
        out.append((m.group(1).lower(), m.group(2)))
    return out


def silences(y: np.ndarray, sr: int) -> list[tuple[float, float]]:
    hop = int(sr * FRAME)
    n = len(y) // hop
    if n < 3:
        return []
    rms = np.sqrt(np.mean(y[: n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)
    db = 20 * np.log10(rms)
    speech = db[db > db.max() - 45]
    thr = np.percentile(speech, 60) - 28
    quiet = db < thr
    voiced = np.where(~quiet)[0]
    if len(voiced) == 0:
        return []
    first, last = voiced[0], voiced[-1]
    out = []
    i = first
    while i <= last:
        if quiet[i]:
            j = i
            while j <= last and quiet[j]:
                j += 1
            if (j - i) * FRAME >= MIN_PAUSE:
                out.append((i * FRAME, j * FRAME))
            i = j
        else:
            i += 1
    return out


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--tts-root", required=True)
    parser.add_argument("manifests", nargs="+")
    args = parser.parse_args()

    sys.path.insert(0, str(Path(args.tts_root) / "OmniVoice"))
    from omnivoice.models.asr_chunkformer import ASRChunkformer  # type: ignore

    asr = ASRChunkformer()
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
        asr.load_model(str(Path(args.tts_root) / "OmniVoice" / "model_ASR_chunkformer_local"))

    def listen(path: str) -> str:
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            return asr.transcribe(path, "vi")

    tmp = Path(tempfile.mkdtemp())
    total_bad = 0
    report = []
    for rel in args.manifests:
        manifest = ROOT / rel
        data = json.loads(manifest.read_text(encoding="utf-8"))
        print(f"\nNgày {data['day']}")
        for item in data["lines"]:
            name = Path(item["file"]).name
            spoken = tts_text(item.get("tts") or item["text"])
            toks = tokens(spoken)
            exp = [w for w, _ in toks]
            y, sr = sf.read(str(PUBLIC / item["file"]), dtype="float32")
            if y.ndim > 1:
                y = y.mean(axis=1)
            sil = silences(y, sr)
            segs = []
            if not sil:
                cuts = []
            else:
                # Cắt đoạn giữa các quãng lặng, ASR từng đoạn, ghép lại kèm vị trí ranh giới.
                bounds = [0.0] + [(a + b) / 2 for a, b in sil] + [len(y) / sr]
                heard: list[str] = []
                edges: list[int] = []
                segs: list[str] = []
                pad = np.zeros(int(sr * 0.15), dtype=np.float32)
                for k in range(len(bounds) - 1):
                    seg = y[int(bounds[k] * sr) : int(bounds[k + 1] * sr)]
                    f = tmp / f"seg{k}.wav"
                    sf.write(str(f), np.concatenate([pad, seg, pad]), sr)
                    said = listen(str(f))
                    segs.append(said.strip())
                    heard += norm_words(said)
                    edges.append(len(heard))
                edges = edges[:-1]
                # Khớp chữ nghe với chữ viết: ranh giới sau chữ nghe thứ e-1 → sau chữ viết tương ứng.
                flat = []
                owner = []
                for i, w in enumerate(exp):
                    for p in norm_words(w):
                        flat.append(p)
                        owner.append(i)
                sm = difflib.SequenceMatcher(None, [bare(w) for w in heard], [bare(w) for w in flat], autojunk=False)
                h2e = {}
                for a, b, size in sm.get_matching_blocks():
                    for d in range(size):
                        h2e[a + d] = b + d
                cuts = []
                for (s0, s1), e in zip(sil, edges):
                    # chữ nghe cuối cùng trước ranh giới có khớp → chữ viết
                    k = e - 1
                    while k >= 0 and k not in h2e:
                        k -= 1
                    widx = owner[h2e[k]] if k >= 0 else -1
                    cuts.append((s0, s1, widx))
            issues = []
            paused_after = set()
            for s0, s1, widx in cuts:
                dur = s1 - s0
                if widx < 0 or widx >= len(toks) - 1:
                    continue
                paused_after.add(widx)
                w, punct = toks[widx]
                ctx = " ".join(x for x, _ in toks[max(0, widx - 3) : widx + 1]) + " ‖ " + " ".join(x for x, _ in toks[widx + 1 : widx + 4])
                if not punct and dur >= LONG_BAD:
                    issues.append(("SAI", f"nghỉ {dur:.2f}s giữa cụm: …{ctx}…"))
                elif punct and "," in punct and dur > COMMA_MAX:
                    issues.append(("DÀI", f"nghỉ {dur:.2f}s ở dấu phẩy: …{ctx}…"))
                elif punct and re.search(r"[.?!]", punct) and dur > STOP_MAX:
                    issues.append(("DÀI", f"nghỉ {dur:.2f}s ở dấu chấm: …{ctx}…"))
            for i, (w, punct) in enumerate(toks[:-1]):
                if re.search(r"[.?!:;]", punct) and i not in paused_after and not any(abs(i - j) <= 1 for j in paused_after):
                    ctx = " ".join(x for x, _ in toks[max(0, i - 3) : i + 1]) + punct + " " + " ".join(x for x, _ in toks[i + 1 : i + 4])
                    issues.append(("LIỀN", f"không nghỉ sau dấu câu: …{ctx}…"))
            for h0, hd in held_runs(y, sr):
                if hd <= HELD_MAX:
                    break
                # Chữ bị ngân: chữ cuối cùng nghe được trong đoạn từ đầu câu tới hết chỗ ngân.
                f = tmp / "held.wav"
                sf.write(str(f), y[: int((h0 + hd * 0.7) * sr)], sr)
                said = norm_words(listen(str(f)))
                issues.append(("NGÂN", f"chữ \"{said[-1] if said else '?'}\" kéo dài {hd:.2f}s (giây {h0:.1f}): …{' '.join(said[-4:])}…"))
            shown = " ".join(f"{w}{p}" for w, p in toks)
            marks = ", ".join(f"{s1 - s0:.2f}s" for s0, s1, _ in cuts) or "không"
            if issues:
                total_bad += 1
                print(f"  XEM  {name}  (quãng nghỉ: {marks})")
                print(f"        viết: {shown}")
                print(f"        nghe: {' ‖ '.join(segs)}")
                for kind, msg in issues:
                    print(f"        {kind}: {msg}")
            else:
                print(f"  OK   {name}  (quãng nghỉ: {marks})")
            report.append({"file": item["file"], "pauses": [[round(a, 2), round(b, 2), i] for a, b, i in cuts], "issues": issues})
    out = ROOT / "out" / "voice-pauses.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n{total_bad} câu ngắt nghỉ / ngân giọng cần xem." if total_bad else "\nNgắt nghỉ ổn ở mọi câu.")


if __name__ == "__main__":
    main()
