"""Ghép các ảnh cảnh của một tập thành một ảnh tổng, mỗi ô đánh số "hồi.câu".

    python tools/review/sheet.py <ảnh ra .jpg> <tiêu đề> <mã 1> <ảnh 1> <mã 2> <ảnh 2> ...
"""
from __future__ import annotations

import math
import sys

from PIL import Image, ImageDraw, ImageFont

TILE_W = 270
TILE_H = 480
GAP = 8
HEAD = 56
MAX_COLS = 6


def font(size: int):
    for name in ("arialbd.ttf", "C:/Windows/Fonts/arialbd.ttf", "DejaVuSans-Bold.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def main() -> None:
    out, title, *rest = sys.argv[1:]
    items = list(zip(rest[0::2], rest[1::2]))
    if not items:
        raise SystemExit("Không có ảnh nào")
    cols = min(MAX_COLS, len(items))
    rows = math.ceil(len(items) / cols)
    width = cols * TILE_W + (cols + 1) * GAP
    height = HEAD + rows * TILE_H + (rows + 1) * GAP
    sheet = Image.new("RGB", (width, height), (24, 24, 28))
    draw = ImageDraw.Draw(sheet)
    draw.text((GAP * 2, 12), title, fill=(240, 240, 240), font=font(30))
    label_font = font(30)
    for i, (code, path) in enumerate(items):
        r, c = divmod(i, cols)
        x = GAP + c * (TILE_W + GAP)
        y = HEAD + GAP + r * (TILE_H + GAP)
        try:
            img = Image.open(path).convert("RGB").resize((TILE_W, TILE_H), Image.LANCZOS)
        except OSError:
            img = Image.new("RGB", (TILE_W, TILE_H), (80, 0, 0))
        sheet.paste(img, (x, y))
        box = draw.textbbox((0, 0), code, font=label_font)
        bw, bh = box[2] - box[0] + 16, box[3] - box[1] + 14
        draw.rectangle((x, y, x + bw, y + bh), fill=(200, 30, 40))
        draw.text((x + 8 - box[0], y + 7 - box[1]), code, fill=(255, 255, 255), font=label_font)
    sheet.save(out, quality=85)


if __name__ == "__main__":
    main()
