/**
 * Sửa kịch bản bằng lời tự nhiên, nhờ Claude Code chạy headless trên máy (`claude -p`).
 *
 * Claude nhận mã nguồn của cả tập (thoại, mô tả cảnh, phần diễn `stage`) và trả về khối mã mới:
 * sửa thoại thì sửa luôn phần diễn và mô tả cảnh liên quan. Claude không được dùng công cụ nào,
 * không đụng file; bot kiểm tra khối mới trên bản sao rồi mới cho người dùng xem và áp dụng.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./config.mjs";

const CLAUDE = process.env.CLAUDE_BIN || "claude";
const read = (...p) => {
  try {
    return readFileSync(path.join(ROOT, ...p), "utf8");
  } catch {
    return "";
  }
};

/** Phần khai báo EpisodeSpec trong make.ts của dự án: các trường được phép trong makeEpisode. */
const specDoc = (project) => {
  const src = read(project.rel, project.ai.spec);
  const start = src.indexOf("type Part");
  const end = src.indexOf("export const makeEpisode");
  return start >= 0 && end > start ? src.slice(start, end).trim() : src;
};

const buildPrompt = ({ project, day, block, example, history, errors }) => {
  const talk = history.map((h) => `${h.role === "user" ? "ĐẠO DIỄN" : "BẠN"}: ${h.text}`).join("\n");
  const fix = errors?.length
    ? `\n--- LẦN TRƯỚC BẠN TRẢ VỀ KHỐI MÃ BỊ LỖI, HÃY SỬA ---\n${errors.join("\n")}\n`
    : "";

  return `${project.ai.role}
Kịch bản mỗi tập là một khối mã TypeScript makeEpisode({...}). Đạo diễn nhắn yêu cầu sửa tập ${day}.

NHIỆM VỤ: viết lại khối makeEpisode của tập ${day} theo yêu cầu, và SỬA LUÔN mọi phần liên quan:
- Thoại đổi thì "shot" (mô tả cảnh) của nhịp đó phải còn khớp.
- Nếu tập có phần diễn (stage / titleStage / flipStage) thì cập nhật cho khớp thoại mới:
  · "line" là chỉ số câu trong nhịp, đếm từ 0. Thêm/xoá câu thì đánh lại "line" cho đúng.
  · "at" (0..1) là vị trí trong câu; đặt theo vị trí từ khoá trong câu mới (tính theo số từ).
  · Hành động, nét mặt, đạo cụ, hiệu ứng phải minh hoạ đúng câu đang được nói.
  · Chỉ dùng đúng các giá trị có trong STAGE TYPES bên dưới (Expr, ArmPose, Move, PropId, SceneId, FxKind, Camera).${project.ai.stageNote ? `
  · ${project.ai.stageNote}` : ""}
    Không có đạo cụ phù hợp thì chọn thứ gần nhất và nói rõ trong tóm tắt.
- Tập chưa có phần diễn thì KHÔNG tự thêm, trừ khi đạo diễn yêu cầu viết phần diễn.

QUY TẮC:
- Chỉ sửa những gì cần cho yêu cầu. Giữ nguyên phần còn lại từng ký tự (kể cả chú thích).
${project.ai.rules.map((r) => `- ${r}`).join("\n")}
- Thoại để giọng AI ĐỌC: số viết bằng chữ, không viết tắt, không emoji, câu dài có dấu phẩy.
- Yêu cầu mơ hồ, không chắc sửa chỗ nào: KHÔNG đoán, hỏi lại.

ĐỊNH DẠNG TRẢ LỜI (bắt buộc, không thêm gì khác):
Nếu cần hỏi lại:
<<<QUESTION
câu hỏi ngắn bằng tiếng Việt
>>>
Nếu đã sửa:
<<<SUMMARY
- gạch đầu dòng ngắn bằng tiếng Việt: đã sửa thoại gì, phần diễn / cảnh đổi gì và vì sao
>>>
<<<BLOCK
makeEpisode({
  ...toàn bộ khối mới, không có dấu phẩy sau dấu ")" cuối...
})
>>>
${fix}
--- QUY TẮC SERIES ---
${read(project.rel, project.ai.bible)}

--- CÁC TRƯỜNG CỦA makeEpisode (${project.rel}/${project.ai.spec}) ---
${specDoc(project)}

--- STAGE TYPES (engine/lib/stage-types.ts) ---
${read("engine", "lib", "stage-types.ts")}${["1", "2", "2b", "3", "4", "4b"].map((n) => `
--- engine/lib/story/tuan-${n}.ts ---
${read("engine", "lib", "story", `tuan-${n}.ts`)}`).join("")}${(project.ai.extraDocs ?? []).map((p) => `\n--- ${p} ---\n${read(project.rel, p)}`).join("")}
${example ? `\n--- VÍ DỤ MỘT TẬP CÓ PHẦN DIỄN ĐẦY ĐỦ (tham khảo cách viết) ---\n${example}\n` : ""}
--- KHỐI MÃ HIỆN TẠI CỦA TẬP ${day} ---
${block}

--- TRAO ĐỔI ---
${talk}`;
};

const section = (text, name) => {
  const m = new RegExp(`<<<${name}\\s*\\n([\\s\\S]*?)\\n?>>>`).exec(text);
  return m ? m[1].trim() : null;
};

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
        "--disallowedTools",
        "Bash,Edit,Write,Read,Glob,Grep,WebFetch,WebSearch,Agent,Skill,NotebookEdit",
      ],
      { cwd: ROOT },
    );
    let out = "";
    let err = "";
    const timer = setTimeout(() => child.kill(), 300000);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timer);
      try {
        if (code !== 0) throw new Error(err || `claude thoát với mã ${code}`);
        const wrapper = JSON.parse(out);
        if (wrapper.is_error) throw new Error(wrapper.result || "Claude báo lỗi");
        resolve(wrapper.result ?? "");
      } catch (e) {
        reject(e);
      }
    });
    child.stdin.end(prompt);
  });

/**
 * Trả về { question } hoặc { block, summary }.
 * ctx: { project, day, block (khối hiện tại), example (khối mẫu có phần diễn, tuỳ chọn), history, errors }
 */
export const askClaude = async (ctx) => {
  const text = await runClaude(buildPrompt(ctx));
  const question = section(text, "QUESTION");
  if (question) return { question };
  let block = section(text, "BLOCK");
  if (!block) throw new Error("Claude không trả về khối mã");
  block = block.replace(/^```\w*\n?|```$/g, "").trim().replace(/,\s*$/, "");
  if (!block.startsWith("makeEpisode(")) throw new Error("Khối mã Claude trả về không bắt đầu bằng makeEpisode(");
  return { block, summary: section(text, "SUMMARY") ?? "" };
};
