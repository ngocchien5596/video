/**
 * Quét lời đọc của mọi dự án, liệt kê chữ nước ngoài chưa có cách đọc tiếng Việt
 * (sau khi đã áp bảng PRONOUNCE trong tools/voice/vi_text.py).
 *
 *   npm run voice:names            # mọi dự án
 *   npm run voice:names -- kt      # một dự án
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { loadEpisodes, loadProjects, matchProject, ROOT } from "../projects.mjs";

const all = await loadProjects();
const only = process.argv[2] ? matchProject(all, process.argv[2]) : null;
const lines = [];
for (const project of only ? [only] : all) {
  const { EPISODES } = await loadEpisodes(project);
  for (const e of EPISODES)
    e.beats.forEach((b, bi) =>
      (b.lines ?? []).forEach((l, li) => lines.push({ where: `${project.short} tập ${e.day} nhịp ${bi + 1} câu ${li + 1}`, text: l.tts ?? l.text })),
    );
}
const tmp = path.join(ROOT, "out", "voice-scan.json");
writeFileSync(tmp, JSON.stringify(lines), "utf8");
const py = `
import json, sys
sys.path.insert(0, ${JSON.stringify(path.join(ROOT, "tools", "voice"))})
sys.stdout.reconfigure(encoding="utf-8")
from make_voice import tts_text
from vi_text import unknown_words
words = {}
for l in json.load(open(${JSON.stringify(tmp)}, encoding="utf-8")):
    for w in unknown_words(tts_text(l["text"])):
        words.setdefault(w, []).append(l["where"])
for w, ws in sorted(words.items()):
    print(f"{w}: {len(ws)} chỗ, ví dụ {ws[0]}")
print(f"Tổng: {len(words)} chữ chưa có cách đọc." if words else "Không còn chữ nào chưa có cách đọc.")
`;
const r = spawnSync("python", ["-c", py], { encoding: "utf8" });
process.stdout.write(r.stdout);
process.stderr.write(r.stderr);
process.exit(r.status ?? 1);
