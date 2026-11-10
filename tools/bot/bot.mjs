/**
 * Bot Telegram duyệt kịch bản và tạo video, dùng chung cho mọi dự án (series) trong projects/.
 *   npm run bot
 * Mỗi dự án có lịch riêng: đúng giờ cấu hình, gửi kịch bản của ngày mai kèm 3 nút Duyệt / Sửa thoại / Bỏ qua.
 * Duyệt xong bot tự lồng tiếng, xuất video, ảnh bìa và gửi lại vào Telegram.
 *
 * Lệnh nhận mã dự án (id hoặc tên ngắn) ngay sau tên lệnh, ví dụ `/tap vs 1`.
 * Không ghi mã thì dùng dự án đang chọn (`/duan`).
 */
import { spawn } from "node:child_process";
import { statSync } from "node:fs";
import { loadProjects, matchProject } from "../projects.mjs";
import { askClaude } from "./ai-edit.mjs";
import { addDays, dayForDate, EMPTY_PROJECT_STATE, loadConfig, loadEnv, loadState, nowIn, ROOT, saveState } from "./config.mjs";
import { applyDraft, diffEpisodes, readBlock, validateDraft } from "./draft.mjs";
import { archiveVersion, commitFiles, historyFile, listVersions, logRender, logScriptChange, push } from "./history.mjs";
import { produce, STEPS, updateTracker } from "./pipeline.mjs";
import { formatPublishKit, savePublishKit } from "./publish.mjs";
import { applyChanges, formatScript, loadEpisode, parseDirectEdits } from "./script.mjs";
import { createTelegram, esc } from "./telegram.mjs";

loadEnv();
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
  console.error("Thiếu TELEGRAM_BOT_TOKEN trong file .env (xem .env.example).");
  process.exit(1);
}

const config = loadConfig();
const state = loadState();
const PROJECTS = await loadProjects();
const tg = createTelegram(TOKEN);
const log = (...a) => console.log(new Date().toISOString(), ...a);
const save = () => saveState(state);

const chatId = () => process.env.TELEGRAM_CHAT_ID || state.chatId;
const send = (text, buttons) => tg.send(chatId(), text, buttons);

const projectById = (id) => PROJECTS.find((p) => p.id === id) ?? null;
const defaultProject = () => projectById(config.defaultProject) ?? PROJECTS[0];
const activeProject = () => projectById(state.active) ?? defaultProject();

/** Trạng thái riêng của dự án (ngày bắt đầu, giờ thông báo, các tập). */
const ps = (project) => {
  state.projects[project.id] ??= structuredClone(EMPTY_PROJECT_STATE);
  return state.projects[project.id];
};
const startDate = (project) => ps(project).startDate || project.schedule?.startDate || null;
const notifyTime = (project) => ps(project).notifyTime || project.schedule?.notifyTime || "20:00";
/** Giờ đăng bài hằng ngày: bot nhắc đăng và gửi lại gói đăng bài của tập hôm nay lúc này. */
const postTime = (project) => ps(project).postTime || project.publish?.postTime || "11:30";
/** Dự án có tự gửi kịch bản hằng ngày không (project.json → schedule.enabled, mặc định có). */
const scheduled = (project) => project.schedule?.enabled !== false;
const tag = (project) => `${project.emoji} <b>${esc(project.name)}</b>`;

/** Danh sách lệnh: dùng cho menu lệnh của Telegram và lệnh /lenh. [lệnh, mục đích, ví dụ] */
const COMMANDS = [
  ["lenh", "Danh sách lệnh này", "/lenh"],
  ["help", "Hướng dẫn đầy đủ", "/help"],
  ["trangthai", "Tình hình mọi dự án: lịch, tập ngày mai, video đã làm", "/trangthai"],
  ["duan", "Chọn dự án làm việc (bỏ trống: xem danh sách)", "/duan vs"],
  ["tap", "Xem và duyệt một tập", "/tap vs 5"],
  ["dangbai", "Gửi lại gói đăng bài của một tập", "/dangbai vs 5"],
  ["lichsu", "Các bản video đã xuất, gửi lại bản cũ", "/lichsu vs 5"],
  ["batdau", "Đặt ngày đăng tập 1", "/batdau vs 2026-12-01"],
  ["giodang", "Đổi giờ nhắc đăng bài", "/giodang vs 11:30"],
  ["gio", "Đổi giờ gửi kịch bản để duyệt", "/gio vs 20:00"],
  ["huy", "Thoát chế độ sửa thoại", "/huy"],
];

const COMMAND_LIST = () =>
  `<b>Danh sách lệnh</b>\n` +
  `Mã dự án: ${PROJECTS.map((p) => `<code>${p.short}</code> ${esc(p.name)}`).join(" · ")}. Bỏ mã thì dùng dự án đang chọn (${esc(activeProject().name)}).\n\n` +
  COMMANDS.map(([, desc, example]) => `<code>${esc(example)}</code>\n   ${esc(desc)}`).join("\n") +
  `\n\n<b>Nút dưới kịch bản</b>\n✅ Duyệt: tạo video · ✏️ Sửa thoại: nhắn chỗ cần sửa (ví dụ <code>6.2: nội dung mới</code>) · ⏭ Bỏ qua: nhắc lại sau ${config.remindAfterHours} giờ`;

const HELP = () => `<b>Bot duyệt kịch bản</b>
Gõ /lenh để xem nhanh danh sách lệnh.

<b>Dự án</b> (gõ mã ngay sau lệnh, ví dụ <code>/tap ${PROJECTS[1]?.short ?? PROJECTS[0].short} 1</code>):
${PROJECTS.map((p) => `${p.emoji} <code>${p.short}</code> ${esc(p.name)}${p.id === activeProject().id ? " ← đang chọn" : ""}${scheduled(p) ? ` · đăng ${postTime(p)}, duyệt ${notifyTime(p)}` : " · chưa bật lịch"}`).join("\n")}

Lịch mỗi ngày:
📣 <b>Giờ đăng</b> (ví dụ 11:30): bot nhắc đăng tập hôm nay, gửi lại gói đăng bài và nút gửi lại video.
🔔 <b>Giờ duyệt</b> (ví dụ 20:00): bot gửi kịch bản của ngày mai kèm 3 nút:
✅ <b>Duyệt</b>: lồng tiếng, xuất video, gửi về đây file mp4, ảnh bìa và gói đăng bài.
✏️ <b>Sửa thoại</b>: nhắn chỗ cần sửa. Bot sửa thoại kèm phần diễn và mô tả cảnh liên quan, cho xem trước rồi mới áp dụng.
⏭ <b>Bỏ qua</b>: nhắc lại sau vài giờ.

<b>Cách sửa thoại</b> (sau khi bấm ✏️):
• Sửa chính xác: <code>6.2: nội dung mới</code> (mỗi dòng một chỗ; mã nằm đầu mỗi câu trong kịch bản, <code>3.c</code> là mô tả cảnh).
• Hoặc nhắn tự nhiên, ví dụ: <i>câu cuối của thằng cháu cho hài hơn</i>, <i>viết phần diễn cho tập này</i>.

<b>Lệnh</b> (mã dự án có thể bỏ qua, khi đó dùng dự án đang chọn)
/duan vs: chọn dự án làm việc
/tap vs 5: xem và duyệt tập 5
/batdau vs 2026-12-01: đặt ngày đăng tập 1
/gio vs 20:00: đổi giờ gửi kịch bản để duyệt
/giodang vs 11:30: đổi giờ nhắc đăng bài
/lichsu vs 5: các phiên bản video đã xuất, gửi lại bản cũ
/dangbai vs 5: gửi lại gói đăng bài
/trangthai: tình hình mọi dự án
/huy: thoát chế độ sửa`;

const cb = (action, project, day, extra) => `${action}:${project.id}:${day}${extra === undefined ? "" : `:${extra}`}`;

const reviewButtons = (project, day) => [
  [
    { text: "✅ Duyệt", callback_data: cb("ok", project, day) },
    { text: "✏️ Sửa thoại", callback_data: cb("edit", project, day) },
    { text: "⏭ Bỏ qua", callback_data: cb("skip", project, day) },
  ],
];

// ---------------------------------------------------------------- gửi kịch bản

const sendReview = async (project, day, header) => {
  const { episode, next } = loadEpisode(project, day);
  const parts = formatScript(project, episode, next, header ? `${header}\n\n` : "");
  let last;
  for (let i = 0; i < parts.length; i++) {
    last = await send(parts[i], i === parts.length - 1 ? reviewButtons(project, day) : undefined);
  }
  const days = ps(project).days;
  const prev = days[day];
  if (prev?.messageId) await tg.clearButtons(chatId(), prev.messageId);
  days[day] = { ...prev, status: "pending", messageId: last.message_id, remindAt: null };
  ps(project).notified[day] = true;
  save();
};

// ---------------------------------------------------------------- tạo video (một việc một lúc)

const queue = [];
let busy = false;

const publishKit = (project, episode, next) =>
  project.buildPublishKit(episode, next, {
    cfg: { ...project.publish, postTime: postTime(project) },
    startDate: startDate(project),
  });

const runQueue = async () => {
  if (busy) return;
  busy = true;
  while (queue.length) {
    const { pid, day } = queue.shift();
    const project = projectById(pid);
    const days = ps(project).days;
    const { episode, next } = loadEpisode(project, day);
    const title = project.headline(episode);
    days[day] = { ...days[day], status: "rendering" };
    save();
    const status = await send(`⏳ ${tag(project)} · tập ${day}: bắt đầu tạo video…`);
    const progress = (i) =>
      tg.edit(
        chatId(),
        status.message_id,
        `⏳ ${tag(project)} · tập ${day}:\n${STEPS.map((s, j) => (j < i ? `✅ ${s}` : j === i ? `▶️ <b>${s}</b>` : `▫️ ${s}`)).join("\n")}`,
      );
    try {
      const started = Date.now();
      // Chốt kịch bản đang dùng (kể cả sửa tay trong repo) để biết video làm từ kịch bản nào.
      const commit = commitFiles(scriptFiles(project, day, episode.week), `${project.name} · tập ${day}: chốt kịch bản trước khi xuất video`);
      const result = await produce(project, day, progress);
      const minutes = ((Date.now() - started) / 60000).toFixed(1);
      const saved = archiveVersion(project, day, { ...result, episode, commit });
      const kit = publishKit(project, episode, next);
      savePublishKit(saved.dir, kit);
      logRender(project, day, title, { version: saved.version, commit, seconds: result.seconds });
      updateTracker(project, day, { trang_thai: "da-dung" });
      commitFiles([historyFile(project, day), project.paths.tracker], `${project.name} · tập ${day}: xuất video v${saved.version}`);
      if (config.autoPush) push();
      // Gửi file trong thư mục phiên bản: tên theo nội dung tập (không dấu), tải về là đúng tên.
      const sizeMb = (statSync(saved.video).size / 1048576).toFixed(0);
      const done = `✅ ${tag(project)} · tập ${day}: xuất xong sau ${minutes} phút, lưu thành <b>v${saved.version}</b>.`;
      // Tải video lên Telegram có thể mất vài phút nếu mạng tải lên chậm.
      await tg.edit(chatId(), status.message_id, `${done}\n📤 Đang gửi video (${sizeMb}MB) vào chat, có thể mất vài phút…`);
      const sendStart = Date.now();
      await tg.sendVideo(
        chatId(),
        saved.video,
        `<b>${esc(project.name)} · #${day} · “${esc(title)}” · v${saved.version}</b>${result.seconds ? ` · ${result.seconds}s` : ""}\nKịch bản: commit <code>${commit}</code>`,
      );
      const sendSec = Math.round((Date.now() - sendStart) / 1000);
      await tg.edit(chatId(), status.message_id, `${done}\n📤 Đã gửi video (${sizeMb}MB, ${sendSec} giây).`);
      // Ảnh bìa gửi dạng file để giữ tên và chất lượng gốc (gửi dạng ảnh thì Telegram nén và đổi tên).
      if (saved.cover) await tg.sendDocument(chatId(), saved.cover, `Ảnh bìa ${esc(project.name)} #${day}`);
      if (result.seconds && result.seconds > 60) {
        await send(`⚠️ Video dài ${result.seconds}s, quá 60 giây. Nên rút gọn thoại rồi duyệt lại.`);
      }
      if (result.flagged.length) {
        await send(
          `⚠️ <b>Máy nghe thấy ${result.flagged.length} câu có thể đọc sai</b>, nên nghe lại:\n` +
            result.flagged.map((f) => `• <code>${esc(f.file)}</code> (${f.score}%): nghe ra “${esc(f.heard)}”`).join("\n") +
            `\n\nTên file dạng <code>nhịp-câu-vai</code>, ví dụ 3-2-cd = câu 3.2.`,
        );
      }
      await send(formatPublishKit(kit, project.name));
      days[day] = { ...days[day], status: "done", doneAt: new Date().toISOString(), version: saved.version };
    } catch (err) {
      log("produce error", err);
      days[day] = { ...days[day], status: "failed" };
      await tg.edit(chatId(), status.message_id, `❌ ${tag(project)} · tập ${day}: lỗi.`);
      await send(
        `❌ <b>Tạo video tập ${day} lỗi</b>\n<pre>${esc(String(err.message).slice(0, 3000))}</pre>\nLog: <code>${esc(err.log ?? "")}</code>`,
        reviewButtons(project, day),
      );
    }
    save();
  }
  busy = false;
};

const approve = async (project, day) => {
  // Ràng buộc của dự án (ví dụ đủ nguồn kiểm chứng) phải đạt trước khi tạo video.
  const { episode } = loadEpisode(project, day);
  const problems = project.validate(episode);
  if (problems.length) {
    return send(
      `⛔ ${tag(project)} · tập ${day} chưa xuất được:\n${problems.map((p) => `• ${esc(p)}`).join("\n")}\n\nBấm ✏️ Sửa thoại để bổ sung.`,
      reviewButtons(project, day),
    );
  }
  const days = ps(project).days;
  days[day] = { ...days[day], status: "approved", approvedAt: new Date().toISOString() };
  if (state.editing?.project === project.id && state.editing?.day === day) state.editing = null;
  save();
  queue.push({ pid: project.id, day });
  if (busy) await send(`👍 Đã duyệt tập ${day}. Đang làm tập khác, tập ${day} sẽ chạy ngay sau.`);
  void runQueue();
};

// ---------------------------------------------------------------- sửa kịch bản

const applyButtons = (project, day) => [
  [
    { text: "✅ Áp dụng", callback_data: cb("apply", project, day) },
    { text: "↩️ Hủy", callback_data: cb("cancel", project, day) },
  ],
];

/** Khối mẫu có phần diễn đầy đủ để Claude tham khảo cách viết: ưu tiên cùng dự án. */
const stageExample = (project, exceptDay) => {
  for (const p of [project, ...PROJECTS.filter((x) => x !== project)]) {
    // Các tập được đánh số liên tục từ 1: gặp tập chưa có là dừng.
    for (let d = 1; ; d++) {
      if (p === project && d === exceptDay) continue;
      let episode;
      try {
        episode = loadEpisode(p, d).episode;
      } catch {
        break;
      }
      if (episode.beats.some((b) => b.stage?.length)) return readBlock(p, episode.week, d).block;
    }
  }
  return null;
};

/** Hiện bản nháp: thoại đổi gì, nhịp nào đổi phần diễn, tóm tắt của Claude. */
const showDraft = async (project, day, before, after, summary) => {
  const { text, stageBeats } = diffEpisodes(project, before, after);
  const lines = text.map((c) => {
    const head = `<code>${c.code}</code> ${esc(c.label)}`;
    if (c.kind === "add") return `${head} <b>(thêm)</b>\n➜ ${esc(c.text)}`;
    if (c.kind === "remove") return `${head} <b>(bỏ)</b>\n<s>${esc(c.old)}</s>`;
    return `${head}\n<s>${esc(c.old)}</s>\n➜ ${esc(c.text)}`;
  });
  const stage = stageBeats.length
    ? `🎭 <b>Phần diễn đổi ở nhịp ${stageBeats.join(", ")}</b>`
    : before.beats.some((b) => b.stage?.length)
      ? "🎭 Phần diễn giữ nguyên."
      : "🎭 Tập này chưa có phần diễn (video dạng chân dung).";
  const msg =
    `${summary ? `💬 <b>Claude đã sửa:</b>\n${esc(summary)}\n\n` : ""}` +
    `<b>Thoại / cảnh thay đổi (${text.length} chỗ):</b>\n\n${lines.join("\n\n") || "(không đổi thoại)"}\n\n${stage}`;
  await send(msg.length > 4000 ? `${msg.slice(0, 3950)}\n…` : msg, applyButtons(project, day));
};

/**
 * Nhờ Claude viết lại khối mã của tập theo yêu cầu, kiểm tra trên bản sao (thử lại 1 lần nếu lỗi),
 * rồi lưu thành bản nháp chờ người dùng áp dụng.
 */
const draftWithClaude = async (project, day, history, progressMsg) => {
  const { episode: before } = loadEpisode(project, day);
  const current = readBlock(project, before.week, day);
  const example = before.beats.some((b) => b.stage?.length) ? null : stageExample(project, day);

  let errors;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const result = await askClaude({ project, day, block: current.block, example, history, errors });
    if (result.question) return { question: result.question };
    await tg.edit(chatId(), progressMsg.message_id, `🔎 Đang kiểm tra bản sửa (lần ${attempt})…`);
    const check = validateDraft(project, day, before.week, result.block);
    if (check.ok) {
      state.editing = {
        ...state.editing,
        project: project.id,
        day,
        pending: { block: result.block, hash: current.hash, week: before.week, summary: result.summary },
      };
      save();
      await tg.edit(chatId(), progressMsg.message_id, "✅ Bản sửa hợp lệ.");
      await showDraft(project, day, before, check.episode, result.summary);
      return { ok: true, summary: result.summary };
    }
    errors = check.errors;
    log("draft invalid", errors);
  }
  throw new Error(`Bản sửa vẫn lỗi sau 2 lần:\n${errors.join("\n")}`);
};

const handleEditMessage = async (text) => {
  const project = projectById(state.editing.project) ?? defaultProject();
  const { day } = state.editing;
  const { episode } = loadEpisode(project, day);
  const direct = parseDirectEdits(project, episode, text);
  // Sửa theo mã vẫn qua Claude để cập nhật phần diễn / cảnh đi kèm, nhưng giữ nguyên văn chữ.
  const request = direct
    ? `Thay NGUYÊN VĂN (không đổi chữ nào) các chỗ sau, rồi cập nhật phần diễn và mô tả cảnh liên quan nếu cần:\n` +
      direct.map((d) => `${d.code} → ${d.text}`).join("\n")
    : text;
  const history = [...(state.editing.history ?? []), { role: "user", text: request }];
  const progress = await send(`🤔 ${tag(project)} · tập ${day}: đang đọc yêu cầu và sửa kịch bản (khoảng 1 phút)…`);

  try {
    const result = await draftWithClaude(project, day, history, progress);
    if (result.question) {
      await tg.edit(chatId(), progress.message_id, "❓ Cần hỏi lại.");
      state.editing.history = [...history, { role: "assistant", text: result.question }];
      save();
      await send(`❓ ${esc(result.question)}`);
      return;
    }
    state.editing.history = [...history, { role: "assistant", text: result.summary }];
    if (state.editing.pending) state.editing.pending.request = text;
    save();
  } catch (err) {
    log("edit error", err);
    await tg.edit(chatId(), progress.message_id, "❌ Không sửa được bằng Claude.");
    if (direct) {
      // Dự phòng: thay chữ trực tiếp, phần diễn giữ nguyên.
      state.editing = { ...state.editing, pending: { direct, request: text } };
      save();
      await send(
        `⚠️ Claude lỗi: <code>${esc(String(err.message).slice(0, 400))}</code>\n\n` +
          `Có thể thay chữ trực tiếp (${direct.map((d) => d.code).join(", ")}) nhưng <b>phần diễn và cảnh giữ nguyên</b>. Áp dụng?`,
        applyButtons(project, day),
      );
    } else {
      await send(
        `❌ Lỗi: <code>${esc(String(err.message).slice(0, 800))}</code>\n` +
          `Thử nhắn lại, hoặc sửa chính xác theo mã, ví dụ <code>6.2: nội dung mới</code>.`,
      );
    }
  }
};

/** Các file kịch bản của một tập cần lưu vào git. */
const scriptFiles = (project, day, week) => [
  project.sourceFile(week),
  `${project.paths.sheets}/tuan-${week}.md`,
  historyFile(project, day),
  project.paths.tracker,
];

/**
 * Sau khi kịch bản đổi: sinh lại kịch bản in, ghi lịch sử, commit git,
 * đánh dấu video cũ, cập nhật tiêu đề tập trong tracker.
 */
const afterScriptChange = async (project, day, before, after, pending) => {
  const notes = [];
  await new Promise((r) => spawn(`npm run sheets -- -p ${project.id}`, { cwd: ROOT, shell: true, stdio: "ignore" }).on("close", r));
  notes.push(`📄 Đã sinh lại kịch bản in (${project.paths.sheets}).`);

  const titleChanged = project.headline(before) !== project.headline(after);
  logScriptChange(project, day, project.headline(after), {
    request: pending.request ?? "(không rõ)",
    summary: pending.summary ?? (pending.direct ? "Thay chữ trực tiếp, phần diễn giữ nguyên." : ""),
    diff: diffEpisodes(project, before, after),
  });
  if (titleChanged) updateTracker(project, day, { cau: project.headline(after) });
  const short = (pending.request ?? "").replace(/\s+/g, " ").slice(0, 60);
  const commit = commitFiles(
    scriptFiles(project, day, after.week),
    `${project.name} · tập ${day}: sửa kịch bản qua bot${short ? ` (${short})` : ""}`,
  );
  if (config.autoPush) push();
  notes.push(`💾 Đã lưu thay đổi: commit <code>${commit}</code>, lịch sử ở <code>${historyFile(project, day)}</code>.`);

  const days = ps(project).days;
  if (["done", "failed"].includes(days[day]?.status)) {
    notes.push(`🎬 Video tập ${day} đã tạo trước đó không còn đúng kịch bản. Bấm <b>Duyệt</b> để tạo lại.`);
  }
  if (titleChanged) {
    notes.push(`📝 Đã cập nhật tiêu đề tập trong tracker.csv.`);
    const prev = day - 1;
    if (prev >= 1 && days[prev]?.status === "done") {
      days[prev] = { ...days[prev], status: "failed" };
      notes.push(`⚠️ Video tập ${prev} có dòng "${esc(project.teaserLabel)}" ghi tiêu đề cũ, cần tạo lại tập ${prev}.`);
      await send(notes.join("\n"), reviewButtons(project, prev));
      return;
    }
  }
  await send(notes.join("\n"));
};

// ---------------------------------------------------------------- lệnh & nút

/** Tách mã dự án (nếu có) khỏi tham số lệnh. */
const pickProject = (args) => {
  const p = args.length ? matchProject(PROJECTS, args[0]) : null;
  return p ? { project: p, args: args.slice(1) } : { project: activeProject(), args };
};

const dayArg = (project, arg) => {
  const day = Number(arg);
  return Number.isInteger(day) && day >= 1 ? day : null;
};

const handleCommand = async (text) => {
  const [cmd, ...rawArgs] = text.trim().split(/\s+/);
  const { project, args } = pickProject(rawArgs);
  const arg = args[0];
  switch (cmd.split("@")[0]) {
    case "/start":
    case "/help":
      return send(HELP());
    case "/lenh":
      return send(COMMAND_LIST());
    case "/duan": {
      if (rawArgs.length) {
        const p = matchProject(PROJECTS, rawArgs[0]);
        if (!p) return send(`Không có dự án <code>${esc(rawArgs[0])}</code>. Gõ /duan để xem danh sách.`);
        state.active = p.id;
        save();
        return send(`📂 Đang làm việc với ${tag(p)}. Các lệnh không ghi mã dự án sẽ dùng dự án này.`);
      }
      return send(
        `📂 <b>Dự án</b>\n${PROJECTS.map((p) => `${p.emoji} <code>${p.short}</code> ${esc(p.name)}${p.id === activeProject().id ? " ← đang chọn" : ""}`).join("\n")}\n\nĐổi: <code>/duan ${PROJECTS[0].short}</code>`,
      );
    }
    case "/batdau": {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(arg ?? "")) {
        return send(`Cách dùng: <code>/batdau ${project.short} 2026-12-01</code> (ngày đăng tập 1).`);
      }
      ps(project).startDate = arg;
      save();
      await send(
        `📅 ${tag(project)}: tập #1 đăng ngày <b>${arg}</b>, mỗi ngày một tập (tập #10 đăng ngày <b>${addDays(arg, 9)}</b>).\n` +
          (scheduled(project)
            ? `Bot gửi kịch bản để duyệt lúc <b>${notifyTime(project)}</b> hôm trước, nhắc đăng lúc <b>${postTime(project)}</b> hôm đăng.`
            : `Lịch tự gửi của dự án này đang tắt (project.json → schedule.enabled).`),
      );
      return tick();
    }
    case "/gio": {
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(arg ?? "")) return send(`Cách dùng: <code>/gio ${project.short} 20:00</code>`);
      ps(project).notifyTime = arg;
      save();
      return send(`⏰ ${tag(project)}: từ giờ bot gửi kịch bản để duyệt lúc <b>${arg}</b> hằng ngày.`);
    }
    case "/giodang": {
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(arg ?? "")) return send(`Cách dùng: <code>/giodang ${project.short} 11:30</code>`);
      ps(project).postTime = arg;
      save();
      return send(`📣 ${tag(project)}: từ giờ bot nhắc đăng bài lúc <b>${arg}</b> hằng ngày.`);
    }
    case "/tap": {
      const day = dayArg(project, arg);
      if (!day) return send(`Cách dùng: <code>/tap ${project.short} 5</code>`);
      return sendReview(project, day, `📄 Kịch bản tập ${day}`);
    }
    case "/trangthai": {
      const now = nowIn(config.timezone);
      const blocks = PROJECTS.map((p) => {
        const sd = startDate(p);
        const tomorrow = dayForDate(sd, addDays(now.date, 1));
        const done = Object.entries(ps(p).days)
          .filter(([, v]) => v.status === "done")
          .map(([d]) => d)
          .join(", ");
        return (
          `${tag(p)}${p.id === activeProject().id ? " (đang chọn)" : ""}\n` +
          `📅 Ngày đăng tập 1: <b>${sd ?? `chưa đặt (/batdau ${p.short} …)`}</b>\n` +
          `⏰ ${scheduled(p) ? `Đăng bài <b>${postTime(p)}</b> · duyệt kịch bản <b>${notifyTime(p)}</b>` : "Chưa bật lịch tự gửi"}\n` +
          `➡️ Ngày mai: ${tomorrow ? `tập <b>${tomorrow}</b>` : "không có tập"}\n` +
          `✅ Đã tạo video: ${done || "chưa có"}`
        );
      });
      return send(
        `${blocks.join("\n\n")}\n\n` +
          `⏳ Đang chạy: ${busy ? "có" : "không"}${queue.length ? `, chờ: ${queue.map((q) => `${q.pid} ${q.day}`).join(", ")}` : ""}\n` +
          `✏️ Đang sửa: ${state.editing ? `${state.editing.project} tập ${state.editing.day}` : "không"}`,
      );
    }
    case "/lichsu": {
      const day = dayArg(project, arg);
      if (!day) return send(`Cách dùng: <code>/lichsu ${project.short} 5</code>`);
      const versions = listVersions(project, day);
      if (!versions.length) {
        return send(`${tag(project)} · tập ${day} chưa xuất video lần nào. Lịch sử sửa kịch bản: <code>${historyFile(project, day)}</code>`);
      }
      const rows = versions.map(
        (v) => `<b>v${v.version}</b> · ${esc(v.time ?? "")} · commit <code>${esc(v.commit ?? "?")}</code>${v.seconds ? ` · ${v.seconds}s` : ""}`,
      );
      const buttons = versions
        .slice(-6)
        .map((v) => ({ text: `📤 Gửi lại v${v.version}`, callback_data: cb("resend", project, day, v.version) }));
      return send(
        `🗂 ${tag(project)} · <b>tập ${day}: ${versions.length} phiên bản video</b>\n${rows.join("\n")}\n\n` +
          `Video lưu ở <code>${project.paths.versions}/ngay-${String(day).padStart(2, "0")}/</code>, lịch sử sửa ở <code>${historyFile(project, day)}</code>.`,
        [buttons.slice(0, 3), buttons.slice(3)].filter((r) => r.length),
      );
    }
    case "/dangbai": {
      const day = dayArg(project, arg);
      if (!day) return send(`Cách dùng: <code>/dangbai ${project.short} 5</code>`);
      const { episode, next } = loadEpisode(project, day);
      return send(formatPublishKit(publishKit(project, episode, next), project.name));
    }
    case "/huy":
      state.editing = null;
      save();
      return send("Đã thoát chế độ sửa.");
    default:
      return send("Không hiểu lệnh này. Gõ /help để xem hướng dẫn.");
  }
};

/**
 * Dữ liệu nút: "action:<dự án>:<ngày>[:thêm]".
 * Nút gửi trước khi tách dự án có dạng "action:<ngày>[:thêm]" → hiểu là dự án mặc định.
 */
const parseCallback = (data) => {
  const parts = data.split(":");
  if (parts.length >= 3 && Number.isNaN(Number(parts[1]))) {
    return { action: parts[0], project: projectById(parts[1]), day: Number(parts[2]), extra: parts[3] };
  }
  return { action: parts[0], project: defaultProject(), day: Number(parts[1]), extra: parts[2] };
};

const handleCallback = async (q) => {
  const { action, project, day, extra } = parseCallback(q.data);
  await tg.answer(q.id);
  if (!project) return send("Dự án của nút này không còn tồn tại.");
  const msgId = q.message?.message_id;
  switch (action) {
    case "ok":
      if (msgId) await tg.clearButtons(chatId(), msgId);
      return approve(project, day);
    case "edit":
      state.editing = { project: project.id, day, history: [], pending: null };
      save();
      return send(
        `✏️ <b>Sửa ${esc(project.name)} · tập ${day}</b>. Nhắn chỗ cần sửa:\n` +
          `• Chính xác: <code>6.2: nội dung mới</code> (nhiều dòng = nhiều chỗ)\n` +
          `• Hoặc nói tự nhiên, ví dụ: <i>đoạn giữa cho cháu leo thang thêm một bước</i>\n` +
          `Gõ /huy để thôi sửa.`,
      );
    case "skip": {
      if (msgId) await tg.clearButtons(chatId(), msgId);
      const remindAt = Date.now() + config.remindAfterHours * 3600000;
      ps(project).days[day] = { ...ps(project).days[day], status: "skipped", remindAt };
      save();
      return send(`⏭ Bỏ qua ${esc(project.name)} · tập ${day}. Bot nhắc lại sau ${config.remindAfterHours} giờ.`);
    }
    case "apply": {
      if (msgId) await tg.clearButtons(chatId(), msgId);
      const editing = state.editing;
      const pending = editing?.project === project.id && editing?.day === day ? editing.pending : null;
      if (!pending) return send("Không có thay đổi nào đang chờ.");
      try {
        const { episode: before } = loadEpisode(project, day);
        if (pending.block) applyDraft(project, day, pending.week, pending.block, pending.hash);
        else applyChanges(project, day, pending.direct);
        const { episode: after } = loadEpisode(project, day);
        state.editing = null;
        save();
        await afterScriptChange(project, day, before, after, pending);
        return sendReview(project, day, `✏️ Đã áp dụng. Kịch bản mới của tập ${day}:`);
      } catch (err) {
        return send(`❌ Không áp dụng được: ${esc(err.message)}`);
      }
    }
    case "resend": {
      const version = Number(extra);
      const v = listVersions(project, day).find((x) => x.version === version);
      if (!v) return send("Không tìm thấy phiên bản này.");
      return tg.sendVideo(
        chatId(),
        v.video,
        `<b>${esc(project.name)} · #${day} · v${version}</b> · ${esc(v.time ?? "")} · commit <code>${esc(v.commit ?? "?")}</code>`,
      );
    }
    case "cancel":
      if (msgId) await tg.clearButtons(chatId(), msgId);
      if (state.editing) state.editing.pending = null;
      save();
      return send("↩️ Đã hủy. Nhắn yêu cầu khác, hoặc /huy để thôi sửa.");
    default:
      return null;
  }
};

const handleUpdate = async (u) => {
  const msg = u.message;
  const from = msg?.chat.id ?? u.callback_query?.message?.chat.id;
  if (!from) return;

  // Chỉ một chat được điều khiển bot: chat đầu tiên gõ /start (hoặc TELEGRAM_CHAT_ID trong .env).
  if (!chatId()) {
    if (msg?.text?.startsWith("/start")) {
      state.chatId = from;
      save();
      log("Đã gắn bot với chat", from);
    } else return;
  }
  if (String(from) !== String(chatId())) {
    log("Bỏ qua tin nhắn từ chat lạ", from);
    return;
  }

  if (u.callback_query) return handleCallback(u.callback_query);
  const text = msg?.text?.trim();
  if (!text) return;
  if (text.startsWith("/")) return handleCommand(text);
  if (state.editing) return handleEditMessage(text);
  return send(`Gõ /help để xem hướng dẫn, hoặc /tap ${activeProject().short} 5 để xem kịch bản tập 5.`);
};

// ---------------------------------------------------------------- lịch thông báo

/** Gửi kịch bản để duyệt, bỏ qua nếu tập chưa được viết (dự án mới). */
const tryReview = async (project, day, header) => {
  try {
    await sendReview(project, day, header);
  } catch (err) {
    log("review", project.id, day, err.message);
    ps(project).notified[day] = true;
    save();
    await send(`⚠️ ${tag(project)}: chưa có kịch bản tập ${day} (${esc(String(err.message).slice(0, 200))}).`);
  }
};

/**
 * Nhắc đăng bài tập hôm nay: gửi lại gói đăng bài kèm nút gửi lại video bản mới nhất.
 * Tập chưa có video thì báo và gửi nút Duyệt để làm gấp.
 */
const sendPostReminder = async (project, day) => {
  const info = ps(project).days[day];
  const latest = listVersions(project, day).at(-1);
  if (info?.status === "done" && latest) {
    const { episode, next } = loadEpisode(project, day);
    await send(
      `📣 ${tag(project)} · <b>Đến giờ đăng tập ${day}</b> (${postTime(project)})\n` +
        `Video đã gửi lúc duyệt (v${latest.version}). Chưa lưu về điện thoại thì bấm nút dưới để gửi lại.`,
      [[{ text: `📤 Gửi lại video v${latest.version}`, callback_data: cb("resend", project, day, latest.version) }]],
    );
    await send(formatPublishKit(publishKit(project, episode, next), project.name));
    return;
  }
  const why = info?.status === "rendering" || info?.status === "approved" ? "đang tạo video" : "chưa có video đã duyệt";
  await send(
    `⚠️ ${tag(project)} · <b>Đến giờ đăng tập ${day}</b> (${postTime(project)}) nhưng ${why}.\n` +
      (why === "đang tạo video" ? "Bot sẽ gửi video ngay khi xong." : "Duyệt ngay để kịp đăng (mất khoảng 5–10 phút):"),
    why === "đang tạo video" ? undefined : reviewButtons(project, day),
  );
};

async function tick() {
  if (!chatId()) return;
  const now = nowIn(config.timezone);
  for (const project of PROJECTS) {
    if (!scheduled(project)) continue;
    const pst = ps(project);
    const sd = startDate(project);
    const due = now.time >= notifyTime(project);

    if (!sd) {
      if (due && pst.notified.noStartDate !== now.date) {
        pst.notified.noStartDate = now.date;
        save();
        await send(
          `📅 ${tag(project)}: chưa đặt ngày đăng tập 1 nên chưa biết ngày mai là tập mấy. Gõ <code>/batdau ${project.short} 2026-12-01</code>.`,
        );
      }
      continue;
    }

    const today = dayForDate(sd, now.date);
    const tomorrow = dayForDate(sd, addDays(now.date, 1));
    // Gửi bù: hôm nay đến lượt đăng mà tập đó chưa từng được gửi duyệt (ví dụ máy tắt tối qua).
    if (today && !pst.notified[today]) await tryReview(project, today, `⚠️ <b>Hôm nay đăng tập ${today}</b> mà chưa duyệt:`);
    // Giờ đăng: nhắc đăng tập hôm nay (mỗi tập một lần).
    if (today && now.time >= postTime(project) && !pst.notified[`post-${today}`]) {
      pst.notified[`post-${today}`] = true;
      save();
      await sendPostReminder(project, today).catch((e) => log("post reminder", project.id, today, e.message));
    }
    // Giờ duyệt: gửi kịch bản của ngày mai.
    if (due && tomorrow && !pst.notified[tomorrow]) {
      await tryReview(project, tomorrow, `🔔 <b>Kịch bản ngày mai</b> (${addDays(now.date, 1)})`);
    }
    for (const [d, info] of Object.entries(pst.days)) {
      if (info.status === "skipped" && info.remindAt && info.remindAt <= Date.now()) {
        await tryReview(project, Number(d), `🔔 Nhắc lại: tập ${d} chưa duyệt`);
      }
    }
  }
}

// ---------------------------------------------------------------- vòng lặp chính

const main = async () => {
  await tg
    .setCommands(
      COMMANDS.map(([command, desc, example]) => ({
        command,
        description: example === `/${command}` ? desc : `${desc}: ${example}`,
      })),
    )
    .catch((e) => log("setMyCommands", e.message));

  // Tập đang tạo dở khi bot tắt: báo lại để duyệt lại.
  for (const project of PROJECTS) {
    for (const [d, info] of Object.entries(ps(project).days)) {
      if (info.status === "rendering" || info.status === "approved") {
        info.status = "failed";
        if (chatId()) {
          await send(`⚠️ ${tag(project)}: bot vừa khởi động lại khi tập ${d} đang tạo dở. Bấm Duyệt để chạy lại.`, reviewButtons(project, Number(d)));
        }
      }
    }
  }
  save();

  // Lần đầu chạy với một chat (hoặc khi có thêm dự án): chào và gửi hướng dẫn.
  const greetKey = `${chatId()}|${PROJECTS.map((p) => p.id).join(",")}`;
  if (chatId() && state.greeted !== greetKey) {
    await send(`🤖 Bot đã chạy.\n\n${HELP()}`).catch((e) => log("greet", e.message));
    state.greeted = greetKey;
    save();
  }

  log(`Bot chạy. Chat: ${chatId() ?? "chưa gắn (gõ /start trong Telegram)"}. Dự án: ${PROJECTS.map((p) => p.id).join(", ")}.`);
  setInterval(() => tick().catch((e) => log("tick", e)), 30000);
  void tick().catch((e) => log("tick", e));

  for (;;) {
    try {
      const updates = await tg.getUpdates(state.offset);
      for (const u of updates) {
        state.offset = u.update_id + 1;
        save();
        await handleUpdate(u).catch(async (e) => {
          log("update error", e);
          if (chatId()) await send(`❌ Lỗi: <code>${esc(String(e.message).slice(0, 500))}</code>`).catch(() => null);
        });
      }
    } catch (e) {
      log("getUpdates", e.message);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
};

main();
