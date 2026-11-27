"""Đo âm bị ngân dài trong tiếng đã sinh (mô hình đôi khi kéo một chữ ra gần một giây, vd "chương trình…").

Cách đo: phổ tiếng theo từng khung 10 ms; chỗ có tiếng mà phổ gần như đứng yên (độ đổi phổ thấp) liên tục
là một âm đang bị giữ. Âm đọc bình thường giữ chừng 0,1–0,5 giây; quá HELD_MAX là ngân.
"""
from __future__ import annotations

HELD_MAX = 0.7


def held_runs(y: np.ndarray, sr: int) -> list[tuple[float, float]]:
    """[(bắt đầu, độ dài)] các đoạn âm bị giữ, dài nhất trước."""
    import numpy as np  # nạp khi đo, để make_voice vẫn import được bằng python không có numpy (bước review)

    y = np.asarray(y, dtype=np.float32)
    if y.ndim > 1:
        y = y.mean(axis=1)
    h, w = int(sr * 0.01), int(sr * 0.03)
    n = (len(y) - w) // h
    if n < 10:
        return []
    win = np.hanning(w)
    frames = np.lib.stride_tricks.sliding_window_view(y, w)[::h][:n] * win
    spec = np.abs(np.fft.rfft(frames, axis=1))
    db = 20 * np.log10(np.sqrt((spec**2).mean(axis=1)) + 1e-9)
    voiced = db > db.max() - 30
    top = max(2, int(4000 / (sr / w)))
    log = np.log(spec[:, :top] + 1e-6)
    log -= log.mean(axis=1, keepdims=True)
    flux = np.r_[0, np.abs(np.diff(log, axis=0)).mean(axis=1)]
    flux = np.convolve(flux, np.ones(5) / 5, "same")
    if voiced.sum() < 10:
        return []
    steady = voiced & (flux < np.percentile(flux[voiced], 30))
    runs: list[tuple[float, float]] = []
    i = 0
    while i < n:
        if steady[i]:
            j = i
            while j < n and steady[j]:
                j += 1
            s, d = i * 0.01, (j - i) * 0.01
            if runs and s - (runs[-1][0] + runs[-1][1]) < 0.06:
                runs[-1] = (runs[-1][0], s + d - runs[-1][0])
            else:
                runs.append((s, d))
            i = j
        else:
            i += 1
    return sorted(runs, key=lambda r: -r[1])


def longest_held(y, sr: int) -> tuple[float, float]:
    runs = held_runs(y, sr)
    return runs[0] if runs else (0.0, 0.0)
