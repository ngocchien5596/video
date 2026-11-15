/**
 * Duyệt cuối tự động một / nhiều tập: kiểm máy + ảnh cảnh. Claude chấm chỉ chạy khi thêm --ai
 * (chủ kênh 15/11/2026: mặc định không dùng AI duyệt, tốn thời gian).
 *
 *   npm run review -- -p kt 1                 kiểm máy + chụp ảnh cảnh (mặc định, không AI)
 *   npm run review -- -p vs tuan-2 --ai       thêm Claude chấm (chỉ khi chủ kênh yêu cầu)
 *   npm run review -- -p nv all --no-render   không chụp ảnh (Claude chỉ chấm lời)
 *   --cache   bỏ qua tập đã có báo cáo của đúng nội dung hiện tại (bot dùng)
 *
 * Kết quả: out/review/<dự án>/ngay-XX/bao-cao.md + bao-cao.json, ảnh lẻ anh/, ảnh tổng anh-tong.jpg.
 * Mã thoát 1 nếu còn lỗi "phải sửa" (tập đã đăng trong project.json → review.frozenDays chỉ ghi nhận).
 *
 * Chuẩn: docs/giong-loi-thoai.md, docs/chuan-dung-canh.md, projects/<dự án>/docs/series-bible.md.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseDays } from "../days.mjs";
import { readBlock } from "../bot/draft.mjs";
import { loadEpisodes, loadProject, ROOT, takeProjectArg } from "../projects.mjs";
import { aiReview } from "./ai.mjs";
import { autoChecks, eachLine, FPS, freeze, loadVoice, MUST, realTimeline, SHOULD, spoken, unknownWordsBatch } from "./checks.mjs";
import { cleanupBundle, renderShots } from "./stills.mjs";
import { readReport, reportJson, reportMd, reviewConfig, reviewDir, reviewKey } from "./store.mjs";

const { id, rest } = takeProjectArg(process.argv.slice(2));
const flags = new Set(rest.filter((a) => a.startsWith("--")));
const useAi = flags.has("--ai") && !flags.has("--no-ai");
const useRender = !flags.has("--no-render");
const useCache = flags.has("--cache");
const project = await loadProject(id);
const { EPISODES } = await loadEpisodes(project);
const days = parseDays(rest.filter((a) => !a.startsWith("--")), EPISODES).filter((d) => EPISODES.some((e) => e.day === d));
if (!days.length) {
  console.error("Thiếu tập (hoặc tập chưa có). Ví dụ: npm run review -- -p kt 1   |   tuan-2   |   all   [--ai] [--no-render]");
  process.exit(2);
}
const cfg = reviewConfig(project);
const log = (...a) => console.log(...a);
const relp = (f) => (f ? path.relative(ROOT, f).replace(/\\/g, "/") : null);
const WHO = { CD: "Cụ Đồ", TC: "Cháu", NARRATOR: "Dẫn" };

const counts = (issues) => ({
  must: issues.filter((i) => i.level === MUST).length,
  should: issues.filter((i) => i.level === SHOULD).length,
  noted: issues.filter((i) => i.level === "ghi nhận").length,
});

const lineListOf = (episode) =>
  eachLine(project, episode)
    .map(({ code, line, beatName, l }) => `${l === 0 ? `[${beatName}]\n` : ""}${code} ${WHO[line.who] ?? line.who}: ${spoken(line)}`)
    .join("\n");

const toMarkdown = (r) => {
  const c = r.counts;
  const verdict = r.frozen
    ? `🔒 Tập đã đăng: chỉ ghi nhận ${c.noted} điểm, không sửa.`
    : r.pass
      ? `✅ ĐẠT${c.should ? ` (${c.should} lỗi nên sửa)` : ""}`
      : `⚠️ ${c.must} lỗi phải sửa, ${c.should} lỗi nên sửa`;
  const rows = r.issues.map(
    (i, n) =>
      `| ${n + 1} | ${i.level} | ${i.kind} | ${i.where} | ${i.source} | ${i.issue.replace(/\|/g, "\\|")} | ${(i.fix || "").replace(/\|/g, "\\|")} |`,
  );
  return `# Duyệt cuối tự động: ${project.name} · tập ${r.day}

**${r.title}**

- Kết quả: **${verdict}**
- Thời gian chạy: ${r.time} · khoá nội dung \`${r.key}\`
- Thời lượng: ${r.duration.seconds} giây (${r.duration.voiced}/${r.duration.total} câu có giọng thật; giới hạn ${cfg.maxSeconds} giây${cfg.warnSeconds ? `, nên dưới ${cfg.warnSeconds}` : ""})
- AI: ${r.ai.ran ? `đã chạy${r.ai.cost ? ` (~${r.ai.cost} USD)` : ""}` : r.ai.error ? `LỖI: ${r.ai.error}` : "không chạy (mặc định; thêm --ai để chạy)"}
- Ảnh cảnh: ${r.sheet ? `[ảnh tổng](anh-tong.jpg), ${r.stills.length} ảnh lẻ trong \`anh/\`` : r.renderError ? `LỖI: ${r.renderError}` : "không chụp (--no-render)"}
${r.ai.summary ? `\n> ${r.ai.summary}\n` : ""}
## Lỗi (${r.issues.length})

${rows.length ? `| # | Mức | Loại | Vị trí | Nguồn | Lỗi | Cách sửa |\n| --- | --- | --- | --- | --- | --- | --- |\n${rows.join("\n")}` : "Không có lỗi."}

Chuẩn dùng để chấm: [giong-loi-thoai.md](../../../../docs/giong-loi-thoai.md), [chuan-dung-canh.md](../../../../docs/chuan-dung-canh.md), [series bible](../../../../${project.rel}/docs/series-bible.md).
`;
};

// Chữ nước ngoài: một lần gọi python cho mọi câu của mọi tập cần duyệt.
const episodes = days.map((d) => EPISODES.find((e) => e.day === d));
const allLines = episodes.flatMap((e) => eachLine(project, e).map((x) => spoken(x.line)));
const scan = unknownWordsBatch(allLines);
if (scan.error) log(`⚠️ Không kiểm được chữ nước ngoài: ${scan.error}`);

let offset = 0;
let failed = 0;
try {
  for (const episode of episodes) {
    const day = episode.day;
    const n = eachLine(project, episode).length;
    const unknown = scan.words.slice(offset, offset + n);
    offset += n;
    const { key } = reviewKey(project, episode);
    const title = project.headline(episode);
    log(`\n▶ [${project.id}] tập ${day}: ${title}`);

    if (useCache) {
      const old = readReport(project, day);
      if (old?.key === key && (old.ai.ran || !useAi) && (old.sheet || !useRender)) {
        log(`  · Đã có báo cáo của đúng nội dung này: ${relp(reportMd(project, day))}`);
        if (!old.pass && !old.frozen) failed++;
        continue;
      }
    }

    const outDir = reviewDir(project, day);
    mkdirSync(outDir, { recursive: true });
    const voice = loadVoice(project, day);
    const auto = autoChecks(project, episode, { unknown, voice });
    if (scan.error) {
      auto.issues.push({ level: SHOULD, kind: "khác", where: "cả tập", code: "", issue: `Không kiểm được chữ nước ngoài (python lỗi).`, fix: "Chạy npm run voice:names để kiểm tay.", source: "máy" });
    }
    log(`  · Kiểm máy: ${auto.issues.length} lỗi · ${auto.duration.seconds} giây`);

    let stills = [];
    let sheet = null;
    let renderError = null;
    if (useRender) {
      try {
        const timeline = realTimeline(episode, voice);
        const shots = eachLine(project, episode).map(({ b, l, code }) => {
          const t = timeline.lines.find((x) => x.beat === b && x.line === l);
          return { code, start: t.start, end: t.end };
        });
        const res = await renderShots({ project, day, shots, outDir, fps: FPS, log });
        stills = res.stills;
        sheet = res.sheet;
        if (res.error) renderError = res.error;
      } catch (err) {
        renderError = String(err.message ?? err).slice(0, 500);
        log(`  · Lỗi chụp ảnh: ${renderError}`);
      }
    }

    const ai = { ran: false, error: null, summary: "", cost: null, pass: null };
    let aiIssues = [];
    if (useAi) {
      try {
        const verdict = await aiReview(
          {
            project,
            episode,
            block: readBlock(project, episode.week, day).block,
            auto: auto.issues,
            duration: auto.duration,
            frozen: auto.frozen,
            sheet,
            stills,
            lineList: lineListOf(episode),
          },
          log,
        );
        Object.assign(ai, { ran: true, summary: verdict.summary, cost: verdict.cost, pass: verdict.pass });
        aiIssues = auto.frozen ? verdict.issues.map(freeze) : verdict.issues;
      } catch (err) {
        ai.error = String(err.message ?? err).slice(0, 500);
        log(`  · Lỗi duyệt AI: ${ai.error}`);
      }
    }

    const order = { [MUST]: 0, [SHOULD]: 1, "ghi nhận": 2 };
    const issues = [...auto.issues, ...aiIssues].sort((a, b) => order[a.level] - order[b.level]);
    const c = counts(issues);
    const report = {
      project: project.id,
      day,
      title,
      time: new Date().toISOString(),
      key,
      frozen: auto.frozen,
      pass: c.must === 0,
      counts: c,
      duration: auto.duration,
      limits: { maxSeconds: cfg.maxSeconds, warnSeconds: cfg.warnSeconds },
      ai,
      sheet: relp(sheet),
      stills: stills.map((s) => ({ code: s.code, file: relp(s.file), frame: s.frame })),
      renderError,
      issues,
    };
    writeFileSync(reportJson(project, day), JSON.stringify(report, null, 2), "utf8");
    writeFileSync(reportMd(project, day), toMarkdown(report), "utf8");
    if (!report.pass && !report.frozen) failed++;

    const head = report.frozen
      ? `🔒 Tập đã đăng: ${c.noted} điểm ghi nhận`
      : report.pass
        ? `✅ ĐẠT (${c.should} nên sửa)`
        : `⚠️ ${c.must} phải sửa, ${c.should} nên sửa`;
    log(`  ${head}`);
    for (const i of issues.slice(0, 12)) log(`    - [${i.level}] [${i.kind}] ${i.where}: ${i.issue}${i.fix ? ` → ${i.fix}` : ""}`);
    if (issues.length > 12) log(`    … còn ${issues.length - 12} lỗi, xem báo cáo.`);
    if (ai.summary) log(`  AI: ${ai.summary}`);
    log(`  Báo cáo: ${relp(reportMd(project, day))}${sheet ? ` · ảnh tổng: ${relp(sheet)}` : ""}`);
  }
} finally {
  cleanupBundle();
}

log(`\n${failed ? `⚠️ ${failed}/${days.length} tập còn lỗi "phải sửa".` : `✔ ${days.length} tập không còn lỗi "phải sửa".`}`);
process.exit(failed ? 1 : 0);
