/**
 * Duyệt cuối bằng AI: gọi Claude Code headless (`claude -p`, như tools/bot/ai-edit.mjs) với quyền DUY NHẤT là
 * công cụ Read để xem ảnh cảnh. Claude chấm tập theo "Mục kiểm" của docs/giong-loi-thoai.md và docs/chuan-dung-canh.md,
 * trả về JSON { pass, issues: [{ level, kind, where, issue, fix }], summary }.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "../projects.mjs";
import { reviewConfig } from "./store.mjs";

const CLAUDE = process.env.CLAUDE_BIN || "claude";
const TIMEOUT_MS = 10 * 60 * 1000;
const LEVELS = ["phải sửa", "nên sửa"];
const KINDS = ["lời", "cảnh", "sự thật", "khác"];

const read = (...p) => {
  try {
    return readFileSync(path.join(ROOT, ...p), "utf8");
  } catch {
    return "";
  }
};
const rel = (file) => path.relative(ROOT, file).replace(/\\/g, "/");

const buildPrompt = ({ project, episode, block, auto, duration, frozen, sheet, stills, lineList, retryNote }) => `Bạn là người DUYỆT CUỐI kịch bản và hình của một tập video ngắn (series "${project.name}", tập ${episode.day}), trước khi chủ kênh bấm duyệt.
Nhiệm vụ: chấm tập này theo đúng "Mục kiểm" của hai trang chuẩn bên dưới (GIỌNG LỜI DẪN / LỜI THOẠI và CHUẨN DỰNG CẢNH) và quy tắc series. Bạn KHÔNG sửa file nào; chỉ được dùng công cụ Read để xem ảnh.

CẦN KIỂM:
- LỜI: tự nhiên như MC / người thật nói, dễ hiểu, cuốn hút, không cụt lủn, không giọng AI, không văn viết / dàn ý; nhịp câu xen dài ngắn, không ba câu liền cùng khuôn; các hồi có câu chuyển nối nhau; có câu "nói gọn lại"; phần giải thích người xem tự kiểm được; nhân vật đúng giọng riêng; không nhồi ba con số trong một câu.
- LỜI, SOÁT TỪNG CÂU MỘT (bắt buộc, đừng chỉ đọc lướt cả tập): câu nào lược hư từ hay cắt cụt cụm từ, nghe như tiêu đề / ghi chú ("nói ngược" thay vì "nói ngược lại", "chỗ không có lỗ" thay vì "chỗ không có lỗ thủng", "Vì sao?" trơ trọi thay vì "Vì sao ư?", "trúng đạn… không bay về được" thay vì "bị trúng đạn… không bay trở về được") thì báo mức "phải sửa", ghi câu sửa đầy đủ như người thật nói. Thà báo dư còn hơn bỏ sót: chủ kênh coi lỗi này là nặng. Câu sửa chỉ thêm vừa đủ chữ cho tự nhiên, không làm câu lê thê; câu hỏi ngắn có chủ đích kiểu "Thế ánh nắng đi đâu?" vẫn được.
- SỰ THẬT: số liệu, tên, mốc thời gian có hợp lý và khớp nguồn (sources) không; chỗ nào nói quá, thiếu "khoảng", "tương truyền" thì báo. Không có cách tra web: chỉ báo khi bạn khá chắc.
- CẢNH (xem ảnh): hình có minh hoạ đúng câu đang nói không; có đè chữ, chữ chồng chữ, cắt nửa người, che mặt không; chữ trên thẻ có đủ to để đọc trên điện thoại không; nội dung chính có nằm trong vùng an toàn không; có khoảng trống chết lớn không; nhân vật rõ bộ phận, đủ lớn để thấy nét mặt không; bố cục có một điểm nhìn rõ không.
  · Mỗi ảnh chụp ở khung thứ ~70 (khoảng 2,3 giây) sau lúc câu bắt đầu, thu nhỏ 0,4 lần (432×768 thay cho 1080×1920): chữ thân 34 px ở khung gốc ≈ 14 px trong ảnh; vùng an toàn ≈ cách mép trên 72 px, mép phải 56 px, mép dưới 152 px trong ảnh.
  · Ảnh tĩnh không thấy chuyển động: KHÔNG chấm độ mượt, chỉ chấm thứ thấy được.
  · Hãy Read ẢNH TỔNG trước, rồi Read ảnh lẻ của những câu nghi có lỗi (chữ nhỏ, đè nhau, lệch nội dung) để nhìn rõ trước khi kết luận. Không báo lỗi cảnh khi chưa nhìn ảnh.
${frozen ? "- TẬP NÀY ĐÃ ĐĂNG: chỉ ghi nhận để rút kinh nghiệm cho tập sau, để \"fix\" là chuỗi rỗng.\n" : ""}
MỨC LỖI:
- "phải sửa": vi phạm rõ chuẩn đã đề ra (câu dàn ý, câu cứng / sai nghĩa, sai sự thật, hình không khớp câu, đè chữ / cắt người, chữ không đọc được…).
- "nên sửa": làm tốt hơn được nhưng không sai chuẩn.
Máy đã tự kiểm: câu quá ${reviewConfig(project).maxWords} chữ, mở câu kiểu dàn ý, câu người dẫn mở bằng "Ông", cụm "cho mà nghe", ngoặc đơn, chữ nước ngoài chưa có cách đọc, thời lượng, số nguồn. Gạch nối trong phiên âm ở "tts" được máy tự đổi thành dấu cách khi đọc, nên nếu muốn nhắc thì chỉ là "nên sửa".
Không bịa lỗi cho đủ số; tập tốt thì trả ít lỗi hoặc không lỗi. Không lặp lại lỗi máy đã báo bên dưới (trừ khi muốn đổi mức hay bổ sung cách sửa cụ thể). Mỗi "fix" phải cụ thể: câu viết lại hoặc chỉnh hình gì.

ĐỊNH DẠNG TRẢ LỜI: CHỈ một khối JSON hợp lệ, không chữ nào khác, không \`\`\`:
{"pass": true|false, "issues": [{"level": "phải sửa"|"nên sửa", "kind": "lời"|"cảnh"|"sự thật"|"khác", "where": "hồi x câu y", "issue": "...", "fix": "..."}], "summary": "1–2 câu tiếng Việt"}
"pass" = không còn lỗi "phải sửa" nào (kể cả lỗi máy bên dưới).
${retryNote ? `\nLƯU Ý: lần trước bạn trả lời không phải JSON hợp lệ (${retryNote}). Lần này chỉ trả đúng một khối JSON.\n` : ""}
--- ẢNH CẢNH ---
Ảnh tổng (mỗi ô đánh số "hồi.câu"): ${sheet ? rel(sheet) : "(không có)"}
Ảnh lẻ:
${stills.length ? stills.map((s) => `${s.code}: ${rel(s.file)}`).join("\n") : "(không chụp ảnh lần này: bỏ qua phần CẢNH, chỉ chấm lời và sự thật)"}

--- DANH SÁCH CÂU (mã hồi.câu, người nói, lời) ---
${lineList}

--- KẾT QUẢ KIỂM TỰ ĐỘNG (máy) ---
Thời lượng: ${duration.seconds} giây (${duration.voiced}/${duration.total} câu có giọng thật).
${auto.length ? auto.map((i) => `- [${i.level}] ${i.where}: ${i.issue}`).join("\n") : "- Không có lỗi."}

--- GIỌNG LỜI DẪN / LỜI THOẠI (docs/giong-loi-thoai.md) ---
${read("docs", "giong-loi-thoai.md")}

--- CHUẨN DỰNG CẢNH / NHÂN VẬT (docs/chuan-dung-canh.md) ---
${read("docs", "chuan-dung-canh.md")}

--- QUY TẮC SERIES (${project.rel}/${project.ai?.bible ?? "docs/series-bible.md"}) ---
${read(project.rel, project.ai?.bible ?? "docs/series-bible.md")}

--- KHỐI KỊCH BẢN CỦA TẬP ${episode.day} (shot = mô tả cảnh; stage = phần diễn) ---
${block}
`;

const runClaude = (prompt) =>
  new Promise((resolve, reject) => {
    const child = spawn(
      CLAUDE,
      [
        "-p",
        "--output-format",
        "json",
        "--no-session-persistence",
        "--strict-mcp-config",
        "--setting-sources",
        "project",
        "--allowedTools",
        "Read",
        "--disallowedTools",
        "Bash,Edit,Write,Glob,Grep,WebFetch,WebSearch,Agent,Skill,NotebookEdit,TodoWrite",
      ],
      { cwd: ROOT },
    );
    let out = "";
    let err = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, TIMEOUT_MS);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      try {
        if (timedOut) throw new Error(`claude chạy quá ${TIMEOUT_MS / 60000} phút`);
        if (code !== 0) throw new Error(err.trim() || out.slice(-400) || `claude thoát với mã ${code}`);
        const wrapper = JSON.parse(out);
        if (wrapper.is_error) throw new Error(wrapper.result || "Claude báo lỗi");
        resolve({ text: wrapper.result ?? "", cost: wrapper.total_cost_usd ?? null });
      } catch (e) {
        reject(e);
      }
    });
    child.stdin.end(prompt);
  });

/** Tìm và kiểm khối JSON trong câu trả lời. Ném lỗi nếu hỏng. */
export const parseVerdict = (text) => {
  const clean = text.replace(/```(?:json)?/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("không thấy khối JSON");
  const data = JSON.parse(clean.slice(start, end + 1));
  if (typeof data !== "object" || !Array.isArray(data.issues)) throw new Error('thiếu mảng "issues"');
  const issues = data.issues
    .filter((i) => i && typeof i.issue === "string" && i.issue.trim())
    .map((i) => ({
      level: LEVELS.includes(i.level) ? i.level : "nên sửa",
      kind: KINDS.includes(i.kind) ? i.kind : "khác",
      where: String(i.where ?? "").trim() || "cả tập",
      issue: i.issue.trim(),
      fix: String(i.fix ?? "").trim(),
      source: "AI",
    }));
  return {
    pass: typeof data.pass === "boolean" ? data.pass : !issues.some((i) => i.level === "phải sửa"),
    issues,
    summary: String(data.summary ?? "").trim(),
  };
};

/** Gọi Claude, thử lại 1 lần nếu JSON hỏng. Trả về { pass, issues, summary, cost } hoặc ném lỗi. */
export const aiReview = async (ctx, log = console.log) => {
  let retryNote = null;
  let cost = 0;
  for (let attempt = 1; attempt <= 2; attempt++) {
    log(`  · Claude duyệt (lần ${attempt}, có thể mất vài phút)…`);
    const result = await runClaude(buildPrompt({ ...ctx, retryNote }));
    cost += result.cost ?? 0;
    try {
      return { ...parseVerdict(result.text), cost: Math.round(cost * 1000) / 1000 };
    } catch (e) {
      retryNote = e.message;
      log(`  · JSON hỏng (${e.message}), thử lại…`);
    }
  }
  throw new Error(`Claude trả JSON hỏng sau 2 lần (${retryNote})`);
};
