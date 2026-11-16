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
# Tên chữ cái Latin đọc theo tiếng Việt, dùng khi viết "chữ L", "hình chữ U"...
LETTERS = {
    "A": "a", "B": "bê", "C": "xê", "D": "đê", "Đ": "đê", "E": "e", "F": "ép", "G": "giê", "H": "hát", "I": "i",
    "J": "gi", "K": "ca", "L": "en lờ", "M": "em mờ", "N": "en nờ", "O": "o", "P": "pê", "Q": "quy", "R": "e rờ",
    "S": "ét xì", "T": "tê", "U": "u", "V": "vê", "W": "vê kép", "X": "ích xì", "Y": "i dài", "Z": "dét",
}
# Cách đọc chữ nước ngoài (tên riêng, từ mượn) cho giọng AI tiếng Việt. Mô hình đọc chữ Latin lơ lớ, nửa Anh nửa Việt
# ("Pa-rết" nghe thành "pr rep"), nên mọi chữ không phải âm tiết tiếng Việt phải có ở đây hoặc được phiên âm trong `tts`.
# Viết phiên âm bằng các âm tiết tiếng Việt cách nhau dấu cách, KHÔNG dùng gạch nối (gạch nối giữa chữ được đổi thành dấu cách).
# Khoá phân biệt hoa thường với tên riêng; từ mượn viết thường thì khớp cả chữ hoa đầu câu.
# Thêm từ mới: chạy `npm run voice:names` để xem chữ nào chưa có cách đọc (lệnh `npm run voice` cũng cảnh báo).
PRONOUNCE = {
    # Tên riêng (Kiến thức tập 1, đã nghe thử 15/11/2026)
    "Pa-rết": "Pa rết",
    "Parade": "Pa rết",
    "Ma-ri-lin vốt Xa-văng": "Me ri lin Vốt Xa van",
    "Marilyn vos Savant": "Me ri lin Vốt Xa van",
    "Steven Pinker": "Xì ti vơn Pinh cơ",
    "Paul Erdős": "Pôn Ẹc đốt",
    "Air France": "E Phờ răng",
    "Metron": "Mê trôn",
    "Abraham Wald": "Áp ra ham Uôn",
    "Wald": "Uôn",
    # Phụ âm ghép tiếng Việt không có (xt, xc, pl, cl, phr, đr): tách thành âm tiết như người Việt vẫn nói ("Xì cốt").
    "Xti-vơn": "Xì ti vơn",
    "Steven": "Xì ti vơn",
    "Xti vơn": "Xì ti vơn",
    "Plu-tác": "Pờ lu tác",
    "Xcra-bồ": "Xì cờ ra bồ",
    "Xcốt-len": "Xì cốt len",
    "Xcốt": "Xì cốt",
    "xi-clô-ít": "xi cờ lô ít",
    "An-phrét": "An phờ rét",
    "xta-đi-ông": "xờ ta đi ông",
    "Ê-ra-tốt-xten": "Ê ra tốt xờ ten",
    "A-ri-xtốt": "A ri xờ tốt",
    "A-lếch-xan-đri-a": "A lếch xan đờ ri a",
    # Từ mượn hay gặp trong lời thoại
    "online": "on lai",
    "shipper": "síp pơ",
    "ship": "síp",
    "shop": "sốp",
    "sale": "seo",
    "like": "lai",
    "liveshow": "lai sâu",
    "sofa": "sô pha",
    "karaoke": "ca ra ô kê",
    "photo": "phô tô",
    "size": "sai",
    "pass": "pát",
    "excel": "ếch xeo",
    "carton": "các tông",
    "nilon": "ni lông",
    "alo": "a lô",
    "x-quang": "ích quang",
    "hamburger": "hăm bơ gơ",
    "inox": "i nốc",
    "enzim": "en dim",
    "cacbonic": "các bô níc",
    "ôxy": "ô xi",
    "CV": "xê vê",
    "ISS": "ai ét ét",
    "NASA": "Na sa",
    # AI (Vì sao: chữ chạy của Claude)
    "Claude": "Cờ lốt",
    "AI": "ây ai",
    "Thinking": "thinh kinh",
    "Brewing": "bờ ru inh",
    "Pondering": "pon đờ rinh",
    "Noodling": "nu đờ linh",
    "Moonwalking": "mun guốc kinh",
    "Clauding": "cờ lốt đinh",
    "ChatGPT": "chát gi pi ti",
    "Gemini": "giem mi nai",
    "Harvard": "Ha vớt",
}

_VOWELS = "aàáảãạăằắẳẵặâầấẩẫậeèéẻẽẹêềếểễệiìíỉĩịoòóỏõọôồốổỗộơờớởỡợuùúủũụưừứửữựyỳýỷỹỵ"
_SYLLABLE = re.compile(rf"^(ngh|ng|nh|ch|gh|gi|kh|ph|qu|th|tr|[bcdđghklmnpqrstvx])?[{_VOWELS}]{{1,3}}(ch|ng|nh|[cmnpt])?$", re.IGNORECASE)


def apply_pronounce(text: str) -> str:
    """Thay chữ nước ngoài bằng cách đọc tiếng Việt, rồi bỏ gạch nối giữa các chữ."""
    t = text
    for src, dst in sorted(PRONOUNCE.items(), key=lambda kv: -len(kv[0])):
        flags = 0 if any(c.isupper() for c in src) else re.IGNORECASE
        t = re.sub(rf"(?<![\w-]){re.escape(src)}(?![\w-])", dst, t, flags=flags)
    # "Ga-li-lê" → "Ga li lê", "ki-lô-mét" → "ki lô mét" (gạch nối làm giọng đọc ngắt lạ); giữ "3-5" cho phần đọc số.
    return re.sub(r"(?<=[^\W\d_])-(?=[^\W\d_])", " ", t)


def unknown_words(text: str) -> list[str]:
    """Chữ không phải âm tiết tiếng Việt còn sót lại (sau khi đã áp PRONOUNCE): cần thêm cách đọc."""
    return [w for w in re.findall(r"[^\W\d_]+", text) if not _SYLLABLE.match(w)]


_NUM = r"\d+(?:[.,]\d+)*"
_UNIT_RE = "|".join(re.escape(u) for u in sorted(UNITS, key=len, reverse=True))


def normalize_numbers(text: str) -> str:
    t = text
    for sym, word in SYMBOLS.items():
        t = t.replace(sym, word)
    t = re.sub(r"\bTCN\b", "trước công nguyên", t)
    t = re.sub(r"\bSCN\b", "sau công nguyên", t)
    # "chữ L" → "chữ en lờ": một chữ cái in hoa đứng ngay sau "chữ".
    t = re.sub(r"\b([Cc]hữ)\s+([A-ZĐ])(?![\wÀ-ỹ])", lambda m: f"{m.group(1)} {LETTERS[m.group(2)]}", t)
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


# --- Chặn lỗi mô hình đọc lẫn câu mẫu của giọng (vd. "…ông giảng cho mà nghe") ---
_REF_GRAMS: set[tuple[str, ...]] | None = None
_LEAK_N = 3


def _wordlist(text: str) -> list[str]:
    import unicodedata as _u
    return re.findall(r"\w+", _u.normalize("NFC", text.lower()))


def _ref_grams() -> set[tuple[str, ...]]:
    global _REF_GRAMS
    if _REF_GRAMS is None:
        from pathlib import Path as _P
        voices = _P(__file__).resolve().parents[2] / "voices"
        grams: set[tuple[str, ...]] = set()
        for txt in list(voices.glob("*.txt")) + list(voices.glob("mau/*.txt")):
            w = _wordlist(txt.read_text(encoding="utf-8"))
            grams.update(tuple(w[i : i + _LEAK_N]) for i in range(len(w) - _LEAK_N + 1))
        _REF_GRAMS = grams
    return _REF_GRAMS


def leaked_ref(expected: str, heard: str) -> list[str]:
    """Cụm 3 chữ của câu mẫu giọng (voices/*.txt) có trong tiếng nghe được mà câu cần đọc không có."""
    e, h = _wordlist(expected), _wordlist(heard)
    exp = {tuple(e[i : i + _LEAK_N]) for i in range(len(e) - _LEAK_N + 1)}
    refs = _ref_grams()
    return sorted({" ".join(g) for g in (tuple(h[i : i + _LEAK_N]) for i in range(len(h) - _LEAK_N + 1)) if g in refs and g not in exp})
