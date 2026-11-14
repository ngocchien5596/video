"""Chuẩn hoá chữ trước khi đưa vào mô hình đọc (OmniVoice): đổi chữ số, giờ, phần trăm, đơn vị... sang chữ tiếng Việt.

Mô hình đọc không tự hiểu chữ số ("15", "1950", "5:00") nên đọc ra tiếng lạ. Kịch bản và phụ đề vẫn viết số cho gọn;
chỉ câu gửi cho mô hình đọc mới đi qua `normalize_numbers`.

    python tools/voice/vi_text.py "Năm 1950, lúc 5:00 sáng, giá 300.000 đồng, tăng 2,5%"   # tự kiểm tra
"""
from __future__ import annotations

import re

DIGITS = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
SCALES = ["", "nghìn", "triệu", "tỷ"]


def _three(n: int, full: bool) -> str:
    """Đọc một nhóm 3 chữ số (0–999). full=True: nhóm đứng sau nhóm khác nên phải đọc đủ "không trăm", "lẻ"."""
    h, t, u = n // 100, (n // 10) % 10, n % 10
    out: list[str] = []
    if h or full:
        out += [DIGITS[h], "trăm"]
    if t == 0:
        if u and (h or full):
            out.append("lẻ")
    elif t == 1:
        out.append("mười")
    else:
        out += [DIGITS[t], "mươi"]
    if u:
        if u == 1 and t >= 2:
            out.append("mốt")
        elif u == 4 and t >= 2:
            out.append("tư")
        elif u == 5 and t >= 1:
            out.append("lăm")
        else:
            out.append(DIGITS[u])
    return " ".join(out)


def read_int(n: int) -> str:
    """Đọc số nguyên không âm: 15 → mười lăm, 1802 → một nghìn tám trăm lẻ hai, 2000000 → hai triệu."""
    if n == 0:
        return "không"
    if n >= 10**12:
        return " ".join(DIGITS[int(d)] for d in str(n))
    groups = []
    while n:
        groups.append(n % 1000)
        n //= 1000
    parts = []
    for i in range(len(groups) - 1, -1, -1):
        g = groups[i]
        if g == 0:
            continue
        full = i < len(groups) - 1
        parts.append(_three(g, full) + (f" {SCALES[i]}" if SCALES[i] else ""))
    return " ".join(parts)


def read_digits(s: str) -> str:
    """Đọc từng chữ số (phần sau dấu phẩy thập phân, số điện thoại): 05 → không năm."""
    return " ".join(DIGITS[int(d)] for d in s)


def read_number(s: str) -> str:
    """Đọc số viết kiểu Việt: dấu chấm ngăn nghìn (300.000), dấu phẩy thập phân (2,5)."""
    s = s.strip()
    if re.fullmatch(r"\d{1,3}(\.\d{3})+", s):
        s = s.replace(".", "")
    if "," in s or "." in s:
        a, b = re.split(r"[,.]", s, maxsplit=1)
        b = b.rstrip("0") or "0"
        text = f"{read_int(int(a))} phẩy {read_int(int(b)) if len(b) <= 2 and not b.startswith('0') else read_digits(b)}"
    elif len(s) > 1 and s.startswith("0"):
        text = read_digits(s)
    else:
        text = read_int(int(s))
    return text


ORDINAL = {"1": "nhất", "4": "tư"}

UNITS = {
    "%": "phần trăm",
    "°C": "độ C",
    "°": "độ",
    "km/h": "ki lô mét một giờ",
    "km2": "ki lô mét vuông",
    "km²": "ki lô mét vuông",
    "km": "ki lô mét",
    "kg": "ki lô gam",
    "cm": "xen ti mét",
    "mm": "mi li mét",
    "m3": "mét khối",
    "m³": "mét khối",
    "m2": "mét vuông",
    "m²": "mét vuông",
    "m": "mét",
    "g": "gam",
    "ml": "mi li lít",
    "l": "lít",
    "h": "giờ",
    "đ": "đồng",
    "k": "nghìn",
}
SYMBOLS = {
    "△": " tam giác ",
    "//": " song song với ",
    "⊥": " vuông góc với ",
    "≈": " xấp xỉ bằng ",
}
_NUM = r"\d+(?:[.,]\d+)*"
_UNIT_RE = "|".join(re.escape(u) for u in sorted(UNITS, key=len, reverse=True))


def normalize_numbers(text: str) -> str:
    t = text
    for sym, word in SYMBOLS.items():
        t = t.replace(sym, word)
    t = re.sub(r"\bTCN\b", "trước công nguyên", t)
    t = re.sub(r"\bSCN\b", "sau công nguyên", t)
    # Giờ: 5:00 → năm giờ, 9:15 → chín giờ mười lăm.
    def clock(m: re.Match) -> str:
        h, mi = int(m.group(1)), int(m.group(2))
        return f"{read_int(h)} giờ" + (f" {read_int(mi)}" if mi else "")

    t = re.sub(r"\b(\d{1,2}):(\d{2})\b", clock, t)
    # Ngày tháng (có chữ "ngày" đứng trước, hoặc đủ ngày/tháng/năm): ngày 2/9 → ngày mùng hai tháng chín.
    def date(m: re.Match) -> str:
        d, mo, y = int(m.group(2)), int(m.group(3)), m.group(4)
        if not (1 <= d <= 31 and 1 <= mo <= 12) or not (m.group(1) or y):
            return m.group(0)
        out = f"{m.group(1) or ''}{'mùng ' if d <= 10 else ''}{read_int(d)} tháng {'tư' if mo == 4 else read_int(mo)}"
        return out + (f" năm {read_int(int(y))}" if y else "")

    t = re.sub(r"(\bngày\s+)?\b(\d{1,2})/(\d{1,2})(?:/(\d{4}))?\b", date, t, flags=re.IGNORECASE)
    # Phân số: 3/4 → ba phần tư, 1/2 → một phần hai.
    t = re.sub(
        r"\b(\d+)/(\d+)\b",
        lambda m: f"{read_int(int(m.group(1)))} phần {'tư' if m.group(2) == '4' else read_int(int(m.group(2)))}",
        t,
    )
    # Khoảng: 3-5 → ba đến năm.
    t = re.sub(rf"(?<![\w-])({_NUM})\s*[-–]\s*({_NUM})(?!\w)", lambda m: f"{m.group(1)} đến {m.group(2)}", t)
    # Thứ tự: thứ 1 → thứ nhất, thứ 4 → thứ tư.
    t = re.sub(r"\b(thứ|hạng)\s+(1|4)\b", lambda m: f"{m.group(1)} {ORDINAL[m.group(2)]}", t, flags=re.IGNORECASE)
    # Số kèm đơn vị: 2,5% → hai phẩy năm phần trăm, 2m → hai mét.
    # Đơn vị một chữ cái (m, g, l, h, đ, k) phải viết liền số, để "3 lần", "5 gà" không bị đọc thành đơn vị.
    t = re.sub(
        rf"({_NUM})(\s*)({_UNIT_RE})(?![\wÀ-ỹ])",
        lambda m: (
            m.group(0)
            if m.group(2) and len(m.group(3)) == 1 and m.group(3).isalpha()
            else f"{read_number(m.group(1))} {UNITS[m.group(3)]}"
        ),
        t,
    )
    # Số đứng một mình.
    t = re.sub(_NUM, lambda m: f" {read_number(m.group(0))} ", t)
    # Bỏ khoảng trắng thừa sinh ra trước dấu câu.
    t = re.sub(r"\s+([,.!?;:…])", r"\1", t)
    return re.sub(r"\s+", " ", t).strip()


if __name__ == "__main__":
    import sys

    samples = sys.argv[1:] or [
        "Lệch 15 độ Bắc",
        "đĩa gà 4 miếng, gắp 3 miếng",
        "mật khẩu dài 20 số",
        "8 giờ, 9 giờ, 10 giờ",
        "vay 5 triệu, hẹn 30 năm",
        "lúc 5 giờ sáng, cái thứ 49, cái thứ 50",
        "năm 938, năm 1950, năm 1802, năm 2026",
        "21 cái, 24 cái, 25 cái, 105, 1005, 1000000, 2.500.000 đồng",
        "lúc 5:00, 9:15, tăng 2,5%, 37°C, 300.000 km",
        "thứ 1, thứ 4, 3-5 phút, 2m, 5kg, 0912",
        "quay 3/4 vòng, ngày 2/9, 19/5/1890, 1/2 cái bánh",
    ]
    for s in samples:
        print(f"{s}\n  → {normalize_numbers(s)}")
