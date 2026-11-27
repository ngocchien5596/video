"""Tạo tạm 3 tiếng cho series Đoán Xem Là Ai (tổng hợp bằng numpy, thay được bằng tiếng thật cùng tên):
public/sfx/tich-tac.wav (đếm ngược), dong-an.wav (đóng ấn), nhac-hieu.wav (nhạc hiệu 3 giây, ngũ cung).
    python -I projects/doan-xem/tools/make_sfx.py
"""
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 44100
OUT = Path(__file__).resolve().parents[3] / "public" / "sfx"
rng = np.random.default_rng(7)


def env(n, a=0.002, d=0.1):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)


def tick():
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    y = (np.sin(2 * np.pi * 1900 * t) * 0.6 + np.sin(2 * np.pi * 3100 * t) * 0.3) * env(n, 0.0005, 0.012)
    y += rng.normal(0, 1, n) * env(n, 0.0002, 0.004) * 0.3
    return y


def stamp():
    n = int(0.6 * SR)
    t = np.arange(n) / SR
    thud = np.sin(2 * np.pi * (110 * np.exp(-t * 8) + 45) * t) * env(n, 0.001, 0.09)
    noise = rng.normal(0, 1, n)
    k = np.ones(40) / 40
    noise = np.convolve(noise, k, mode="same") * env(n, 0.0005, 0.03) * 2.5
    return thud * 0.9 + noise * 0.5


def pluck(freq, dur):
    # Karplus–Strong: tiếng gảy dây, gần với đàn tranh / đàn nguyệt.
    n = int(dur * SR)
    p = int(SR / freq)
    buf = rng.uniform(-1, 1, p)
    out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = 0.996 * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out * env(n, 0.002, dur * 0.6)


def theme():
    # Ngũ cung (Đô Rê Fa Sol La), năm nốt rồi một nốt ngân.
    notes = [(392, 0.0), (440, 0.32), (523.25, 0.64), (587.33, 0.96), (523.25, 1.28), (392, 1.7)]
    y = np.zeros(int(3.0 * SR))
    for f, at in notes:
        d = 1.3 if at > 1.6 else 0.9
        s = pluck(f, d)
        i = int(at * SR)
        y[i : i + len(s)] += s[: len(y) - i]
    y += np.convolve(y, np.r_[np.zeros(int(0.09 * SR)), [0.25]], mode="full")[: len(y)]
    fade = np.ones(len(y))
    fade[-int(0.4 * SR) :] = np.linspace(1, 0, int(0.4 * SR))
    return y * fade


for name, y in [("tich-tac", tick()), ("dong-an", stamp()), ("nhac-hieu", theme())]:
    y = y / max(1e-6, np.abs(y).max()) * 0.85
    sf.write(OUT / f"{name}.wav", y.astype(np.float32), SR, subtype="PCM_16")
    print(name, round(len(y) / SR, 2), "s")
