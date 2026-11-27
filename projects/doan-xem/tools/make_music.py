"""Nhạc của series "Đoán Xem Là Ai" (tổng hợp bằng numpy, chạy lại ra đúng y như cũ).

    python -I projects/doan-xem/tools/make_music.py

Chất liệu chung (đặc trưng kênh): tiếng gảy dây (Karplus–Strong, gần đàn tranh / đàn nguyệt) và
motif 5 nốt của nhạc hiệu public/sfx/nhac-hieu.wav: Sol La Đô Rê Đô … Sol (ngũ cung). Mỗi đoạn đổi nhịp, màu:
  mo.wav    nền nhóm 1 (mơ hồ): chậm, thưa, có tiếng ngân trầm, motif chỉ hé vài nốt. Vòng lặp.
  thu.wav   nền nhóm 2 (thu hẹp, cú lừa "vị tướng"): trống trầm và mõ giữ nhịp, đàn hỏi đáp. Vòng lặp.
  chot.wav  nền nhóm 3 (gần chốt): nhịp dồn, ostinato lặp, căng dần. Vòng lặp; tắt hẳn lúc đếm ngược.
  lat.wav   lật đáp án: tiếng thanh la + trống + motif đầy đủ, sáng. Một lần.
  khep.wav  nền khép lại: hơi buồn (Sol Sib Đô Rê Fa), đàn có rung (vibrato), thưa. Vòng lặp.
  ket.wav   thẻ cuối: motif nhạc hiệu chậm lại, khép vòng. Một lần.
Ra public/music/doan-xem/. Player (src/Episode.tsx) đặt theo nhịp và tự hạ nhỏ khi có lời đọc.
"""
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 44100
OUT = Path(__file__).resolve().parents[3] / "public" / "music" / "doan-xem"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(11)

# Tên nốt → tần số (Sol3 = G3).
N = {
    "G2": 98.0, "D3": 146.83, "G3": 196.0, "A3": 220.0, "Bb3": 233.08, "C4": 261.63, "D4": 293.66, "F4": 349.23,
    "G4": 392.0, "A4": 440.0, "Bb4": 466.16, "C5": 523.25, "D5": 587.33, "E5": 659.25, "F5": 698.46, "G5": 783.99,
}


def pluck(freq: float, dur: float, bright: float = 0.5, vib: float = 0.0) -> np.ndarray:
    """Gảy dây Karplus–Strong (tính theo từng chu kỳ cho nhanh). vib: độ rung (bán cung) kiểu nhấn nhá đàn Việt."""
    n = int(dur * SR)
    p = max(2, int(SR / freq))
    cur = rng.uniform(-1, 1, p)
    # sáng / tối: lọc bớt tiếng chói ở lần gảy đầu
    k = max(1, int(3 * (1 - bright)) + 1)
    cur = np.convolve(cur, np.ones(k) / k, mode="same")
    out = np.empty(((n // p) + 2) * p)
    for i in range(len(out) // p):
        out[i * p : (i + 1) * p] = cur
        cur = 0.997 * 0.5 * (cur + np.roll(cur, -1))
    y = out[:n]
    if vib:
        t = np.arange(n) / SR
        depth = vib * (1 - np.exp(-t / 0.35))  # rung chậm vào sau khi gảy
        rate = 2 ** (depth * np.sin(2 * np.pi * 5.2 * t) / 12)
        idx = np.clip(np.cumsum(rate), 0, n - 1)
        y = np.interp(idx, np.arange(n), y)
    t = np.arange(n) / SR
    return y * np.minimum(1, t / 0.002) * np.exp(-t / (dur * 0.5))


def drum(dur: float = 0.7, f0: float = 70) -> np.ndarray:
    """Trống trầm: sin rơi cao độ + tiếng da."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    body = np.sin(2 * np.pi * np.cumsum(f0 + 90 * np.exp(-t * 25)) / SR) * np.exp(-t / 0.22)
    skin = np.convolve(rng.normal(0, 1, n), np.ones(30) / 30, mode="same") * np.exp(-t / 0.02) * 0.6
    return body + skin


def mo_go(dur: float = 0.18) -> np.ndarray:
    """Mõ gỗ: tiếng gõ ngắn, rỗng."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 820 * t) + 0.5 * np.sin(2 * np.pi * 1310 * t)) * np.exp(-t / 0.025)


def gong(dur: float = 4.0, f0: float = 330) -> np.ndarray:
    """Thanh la: các bội âm lệch, ngân dài, hơi lắc."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.zeros(n)
    for r, a, d in [(1, 1, 1.6), (2.41, 0.6, 1.1), (3.87, 0.4, 0.8), (5.3, 0.25, 0.5), (1.52, 0.5, 1.3)]:
        y += a * np.sin(2 * np.pi * f0 * r * t + rng.uniform(0, 6)) * np.exp(-t / d)
    return y * (1 + 0.15 * np.sin(2 * np.pi * 4 * t)) * np.minimum(1, t / 0.004)


def drone(dur: float, freqs: list[float]) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = sum(np.sin(2 * np.pi * f * t) * (1 / (i + 1)) for i, f in enumerate(freqs))
    y += 0.3 * np.sin(2 * np.pi * freqs[0] * 2 * t)
    return y * (0.8 + 0.2 * np.sin(2 * np.pi * t / dur * 2))


def reverb(y: np.ndarray, secs: float = 1.6, wet: float = 0.3, circular: bool = False) -> np.ndarray:
    n = int(secs * SR)
    t = np.arange(n) / SR
    ir = rng.normal(0, 1, n) * np.exp(-t / (secs / 5))
    ir = np.convolve(ir, np.ones(8) / 8, mode="same")
    ir /= np.sqrt(np.sum(ir**2))
    if circular:
        L = len(y)
        Y = np.fft.rfft(y, L)
        H = np.fft.rfft(np.pad(ir, (0, max(0, L - n)))[:L], L)
        w = np.fft.irfft(Y * H, L)
    else:
        L = len(y) + n
        w = np.fft.irfft(np.fft.rfft(y, L) * np.fft.rfft(ir, L), L)
        y = np.pad(y, (0, n))
    return y + wet * w


class Track:
    """Bản nhạc độ dài cố định; loop=True thì nốt tràn cuối quay về đầu (vòng lặp liền)."""

    def __init__(self, secs: float, loop: bool):
        self.y = np.zeros(int(secs * SR))
        self.loop = loop

    def add(self, at: float, s: np.ndarray, gain: float = 1.0) -> None:
        i = int(at * SR)
        L = len(self.y)
        if self.loop:
            idx = (np.arange(len(s)) + i) % L
            np.add.at(self.y, idx, s * gain)
        else:
            end = min(L, i + len(s))
            self.y[i:end] += s[: end - i] * gain


def save(name: str, tr: Track, wet: float = 0.3, peak: float = 0.8) -> None:
    y = reverb(tr.y, wet=wet, circular=tr.loop)
    if not tr.loop:
        fade = int(0.3 * SR)
        y[-fade:] *= np.linspace(1, 0, fade)
    y = y / max(1e-6, np.abs(y).max()) * peak
    sf.write(OUT / f"{name}.wav", y.astype(np.float32), SR, subtype="PCM_16")
    print(f"{name}.wav  {len(y) / SR:.1f}s")


MOTIF = ["G4", "A4", "C5", "D5", "C5", "G4"]

# 1. Mơ hồ: 72 nhịp/phút, 16 giây (~19 phách), ngân trầm Sol–Rê, motif hé từng mảnh.
mo = Track(16, loop=True)
mo.add(0, drone(16, [N["G2"], N["D3"]]), 0.18)
for at, note, g in [(0.0, "G4", 0.5), (0.83, "A4", 0.4), (1.66, "C5", 0.45), (4.2, "D5", 0.35), (5.0, "C5", 0.3),
                    (8.0, "G4", 0.45), (8.83, "A4", 0.35), (10.5, "E5", 0.25), (12.4, "D5", 0.3), (13.2, "A4", 0.3), (14.6, "G3", 0.4)]:
    mo.add(at, pluck(N[note], 2.6, bright=0.35), g)
save("mo", mo, wet=0.45)

# 2. Thu hẹp: 90 nhịp/phút, 4 ô nhịp 4/4 = 10,67 giây. Trống ở phách 1 và nửa sau phách 2, mõ ở phách 2, 4; đàn hỏi đáp.
b = 60 / 90
thu = Track(16 * b, loop=True)
for bar in range(4):
    o = bar * 4 * b
    thu.add(o, drum(), 0.55)
    thu.add(o + 1.5 * b, drum(f0=80), 0.35)
    thu.add(o + 1 * b, mo_go(), 0.25)
    thu.add(o + 3 * b, mo_go(), 0.25)
    thu.add(o, pluck(N["G2"] * 2, 1.4, bright=0.3), 0.5)
    thu.add(o + 2 * b, pluck(N["D3"], 1.2, bright=0.3), 0.4)
call = [(0, "G4"), (0.5, "A4"), (1, "C5")]
answer = [(0, "D5"), (0.5, "C5"), (1, "A4"), (2, "G4")]
for at, note in call:
    thu.add(at * b, pluck(N[note], 1.2), 0.4)
for at, note in answer:
    thu.add((4 + at) * b, pluck(N[note], 1.2), 0.35)
for at, note in call:
    thu.add((8 + at) * b, pluck(N[note], 1.2), 0.4)
for at, note in [(0, "D5"), (0.5, "E5"), (1, "D5"), (2, "C5")]:
    thu.add((12 + at) * b, pluck(N[note], 1.2), 0.35)
save("thu", thu, wet=0.3)

# 3. Gần chốt: 104 nhịp/phút, 4 ô nhịp = 9,23 giây. Trống nhịp móc dồn, ostinato Đô Rê Đô La lặp, lên cao dần.
b = 60 / 104
chot = Track(16 * b, loop=True)
osti = ["C5", "D5", "C5", "A4"]
for k in range(32):
    at = k * b / 2
    chot.add(at, pluck(N[osti[k % 4]] * (2 if k >= 24 else 1), 0.6, bright=0.6), 0.28 + 0.1 * (k / 32))
for k in range(16):
    chot.add(k * b, drum(0.5, f0=66), 0.45 if k % 4 == 0 else 0.25)
    if k % 2:
        chot.add(k * b + b / 2, mo_go(), 0.2)
chot.add(0, drone(16 * b, [N["G2"], N["D3"]]), 0.12)
save("chot", chot, wet=0.25)

# 4. Lật đáp án: thanh la + trống, rồi motif nhạc hiệu đầy đủ, sáng (một quãng tám cao).
lat = Track(4.5, loop=False)
lat.add(0, gong(4.4), 0.5)
lat.add(0, drum(0.9, f0=60), 0.8)
for i, note in enumerate(MOTIF):
    lat.add(0.35 + i * 0.22, pluck(N[note] * (2 if i < 5 else 1), 1.6 if i == 5 else 0.9, bright=0.7), 0.5)
save("lat", lat, wet=0.35)

# 5. Khép lại: 60 nhịp/phút, 16 giây, hơi buồn Sol Sib Đô Rê Fa, đàn có rung.
khep = Track(16, loop=True)
khep.add(0, drone(16, [N["G2"], N["D3"]]), 0.15)
for at, note, g in [(0, "D5", 0.4), (1.0, "C5", 0.35), (2.0, "Bb4", 0.4), (4.0, "G4", 0.45), (6.5, "F4", 0.3), (7.5, "G4", 0.35),
                    (8.0, "Bb4", 0.35), (9.0, "C5", 0.35), (10.0, "D5", 0.4), (12.0, "C5", 0.3), (13.0, "Bb4", 0.3), (14.0, "G4", 0.4)]:
    khep.add(at, pluck(N[note], 2.8, bright=0.3, vib=0.35), g)
save("khep", khep, wet=0.5)

# 6. Thẻ cuối: motif nhạc hiệu chậm gấp rưỡi, nốt cuối ngân, thanh la nhỏ.
ket = Track(5.0, loop=False)
for i, note in enumerate(MOTIF):
    ket.add(i * 0.48, pluck(N[note], 2.4 if i == 5 else 1.4, bright=0.45, vib=0.2 if i == 5 else 0), 0.5)
ket.add(2.4, gong(2.6, f0=294), 0.18)
save("ket", ket, wet=0.45)
