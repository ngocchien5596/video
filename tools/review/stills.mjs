/**
 * Ảnh cảnh cho duyệt cuối: bundle Remotion MỘT lần, chụp 1 ảnh tĩnh mỗi câu (khung ~70 sau đầu câu, scale 0,4),
 * rồi ghép thành một ảnh tổng có đánh số "hồi.câu" (tools/review/sheet.py, dùng Pillow có sẵn trong Python).
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { ROOT } from "../projects.mjs";

/** Khung chụp sau đầu câu (~2,3 giây): đủ để thẻ chữ, đạo cụ của câu đã hiện. */
const AFTER_START = 70;
const SCALE = 0.4;

let bundled = null;
let bundleDir = null;

/** Bundle src/index.ts một lần cho cả lượt chạy (thư mục tạm riêng của tiến trình, xoá khi xong). */
const getBundle = async (log) => {
  if (bundled) return bundled;
  const { bundle } = await import("@remotion/bundler");
  bundleDir = path.join(ROOT, "out", "review", `.bundle-${process.pid}`);
  const entryPoint = path.join(ROOT, "src", "index.ts");
  log("  · bundle Remotion (một lần)…");
  const opts = { entryPoint, outDir: bundleDir, enableCaching: true, onProgress: () => {} };
  try {
    bundled = await bundle({ ...opts, rspack: true });
  } catch (err) {
    log(`  · rspack lỗi (${String(err.message).slice(0, 120)}), thử webpack…`);
    bundled = await bundle({ ...opts, rspack: false });
  }
  return bundled;
};

export const cleanupBundle = () => {
  if (bundleDir) rmSync(bundleDir, { recursive: true, force: true });
  bundled = null;
  bundleDir = null;
};

/**
 * Chụp ảnh từng câu. `shots`: [{ code, frameOffsetSeconds: start, end }] theo trục thời gian thật.
 * Trả về { stills: [{ code, file, frame }], sheet, error }.
 */
export const renderShots = async ({ project, day, shots, outDir, fps, log = console.log }) => {
  const { renderStill, selectComposition } = await import("@remotion/renderer");
  const serveUrl = await getBundle(log);
  const id = project.compositionId(day);
  const composition = await selectComposition({ serveUrl, id, logLevel: "error" });
  const stillDir = path.join(outDir, "anh");
  rmSync(stillDir, { recursive: true, force: true });
  mkdirSync(stillDir, { recursive: true });

  const stills = [];
  for (const shot of shots) {
    const start = Math.round(shot.start * fps);
    const end = Math.round(shot.end * fps);
    // Câu ngắn hơn 70 khung: chụp gần cuối câu cho khỏi lấn sang câu sau.
    const frame = Math.min(composition.durationInFrames - 1, Math.max(start, Math.min(start + AFTER_START, end - 8)));
    const file = path.join(stillDir, `${shot.code.replace(".", "-")}.png`);
    await renderStill({ serveUrl, composition, frame, output: file, scale: SCALE, logLevel: "error", overwrite: true, chromiumOptions: { gl: "angle" } });
    stills.push({ code: shot.code, file, frame });
    log(`  · ảnh ${shot.code} (khung ${frame})`);
  }
  const sheet = path.join(outDir, "anh-tong.jpg");
  const made = makeSheet(stills, sheet, `${project.name} · tập ${day}`);
  return { stills, sheet: made.ok ? sheet : null, error: made.error, durationInFrames: composition.durationInFrames };
};

/** Ghép ảnh tổng bằng Pillow (python hệ thống, không có thì python của repo giọng nói). */
export const makeSheet = (stills, output, title) => {
  const args = [path.join(ROOT, "tools", "review", "sheet.py"), output, title, ...stills.flatMap((s) => [s.code, s.file])];
  const candidates = [
    process.env.PYTHON || "python",
    path.join(process.env.TTS_ROOT || "D:/Tao_giong_noi_local", "viterbox", "venv", "Scripts", "python.exe"),
  ];
  let error = "";
  for (const py of candidates) {
    const r = spawnSync(py, args, { encoding: "utf8" });
    if (r.status === 0) return { ok: true };
    error = r.error?.message || (r.stderr || "").slice(-300);
  }
  return { ok: false, error: `Không ghép được ảnh tổng (ảnh lẻ vẫn có trong anh/): ${error}` };
};
