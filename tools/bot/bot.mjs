/**
 * Bot Telegram duyệt kịch bản và tạo video.
 *   npm run bot
 * Mỗi ngày đúng giờ cấu hình, gửi kịch bản của ngày mai kèm 3 nút: Duyệt / Sửa thoại / Bỏ qua.
 * Duyệt xong bot tự lồng tiếng, xuất video, ảnh bìa và gửi lại vào Telegram.
 */
import { spawn } from "node:child_process";
import { askClaude } from "./ai-edit.mjs";
import { addDays, dayForDate, loadConfig, loadEnv, loadState, nowIn, ROOT, saveState } from "./config.mjs";
import { applyDraft, diffEpisodes, readBlock, validateDraft } from "./draft.mjs";
import { produce, STEPS, updateTracker } from "./pipeline.mjs";
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
const tg = createTelegram(TOKEN);
const log = (...a) => console.log(new Date().toISOString(), ...a);
const save = () => saveState(state);

const chatId = () => process.env.TELEGRAM_CHAT_ID || state.chatId;
const startDate = () => state.startDate || config.startDate;
const notifyTime = () => state.notifyTime || config.notifyTime;
const send = (text, buttons) => tg.send(chatId(), text, buttons);

const HELP = `<b>Bot duyệt kịch bản "Nói Vậy Mà Không Phải Vậy"</b>

Mỗi ngày lúc <b>${"{gio}"}</b> bot gửi kịch bản của ngày mai, kèm 3 nút:
✅ <b>Duyệt</b>: lồng tiếng, xuất video, gửi file mp4 + ảnh bìa + caption về đây.
✏️ <b>Sửa thoại</b>: nhắn chỗ cần sửa. Bot sửa thoại kèm phần diễn và mô tả cảnh liên quan, cho xem trước rồi mới áp dụng.
⏭ <b>Bỏ qua</b>: nhắc lại sau vài giờ.

<b>Cách sửa thoại</b> (sau khi bấm ✏️):
• Sửa chính xác: <code>6.2: nội dung mới</code> (mỗi dòng một chỗ; mã nằm đầu mỗi câu trong kịch bản, <code>3.c</code> là mô tả cảnh, <code>nghia</code>, <code>hoi</code>).
• Hoặc nhắn tự nhiên, ví dụ: <i>câu cuối của thằng cháu cho hài hơn, nhắc tới nồi cơm điện</i>, <i>thêm một câu Cụ Đồ mắng ở nhịp 3</i>, <i>viết phần diễn cho tập này</i>.
Sửa câu nào thì phần diễn và cảnh của câu đó được sửa theo. Bot cho xem trước rồi mới áp dụng.

<b>Lệnh</b>
/batdau 2026-12-01: đặt ngày đăng tập 1
/gio 20:00: đổi giờ thông báo
/tap 5: xem và duyệt tập 5 ngay
/trangthai: ngày bắt đầu, tập sắp tới, việc đang chạy
/huy: thoát chế độ sửa`;

const reviewButtons = (day) => [
  [
    { text: "✅ Duyệt", callback_data: `ok:${day}` },
    { text: "✏️ Sửa thoại", callback_data: `edit:${day}` },
    { text: "⏭ Bỏ qua", callback_data: `skip:${day}` },
  ],
];

// ---------------------------------------------------------------- gửi kịch bản

const sendReview = async (day, header) => {
  const { episode, next } = loadEpisode(day);
  const parts = formatScript(episode, next, header ? `${header}\n\n` : "");
  let last;
  for (let i = 0; i < parts.length; i++) {
    last = await send(parts[i], i === parts.length - 1 ? reviewButtons(day) : undefined);
  }
  const prev = state.days[day];
  if (prev?.messageId) await tg.clearButtons(chatId(), prev.messageId);
  state.days[day] = { ...prev, status: "pending", messageId: last.message_id, remindAt: null };
  state.notified[day] = true;
  save();
};

// ---------------------------------------------------------------- tạo video (một việc một lúc)

const queue = [];
let busy = false;

const captionFor = (episode, next) => {
  const pin = `${episode.question}${next ? ` Mai là câu: “${next}”` : ""}`;
  return `<b>Caption gợi ý</b>
<code>Ngày ${episode.day}/30: "${esc(episode.idiom)}" mà hiểu theo nghĩa đen thì toang 😂
${esc(episode.question)}
#thanhngu #tucngu #tiengviet #hocvui #noivaymakhongphaivay</code>

<b>Bình luận ghim</b>
<code>${esc(pin)}</code>

⚠️ Nhớ bật nhãn <b>"nội dung do AI tạo"</b> khi đăng TikTok và YouTube.`;
};

const runQueue = async () => {
  if (busy) return;
  busy = true;
  while (queue.length) {
    const day = queue.shift();
    const { episode, next } = loadEpisode(day);
    state.days[day] = { ...state.days[day], status: "rendering" };
    save();
    const status = await send(`⏳ Tập ${day}: bắt đầu tạo video…`);
    const progress = (i) =>
      tg.edit(
        chatId(),
        status.message_id,
        `⏳ Tập ${day}: ${STEPS.map((s, j) => (j < i ? `✅ ${s}` : j === i ? `▶️ <b>${s}</b>` : `▫️ ${s}`)).join("\n")}`,
      );
    try {
      const started = Date.now();
      const result = await produce(day, progress);
      const minutes = ((Date.now() - started) / 60000).toFixed(1);
      await tg.edit(chatId(), status.message_id, `✅ Tập ${day}: xong sau ${minutes} phút.`);
      await tg.sendVideo(
        chatId(),
        result.video,
        `<b>Ngày ${day}/30 · “${esc(episode.idiom)}”</b>${result.seconds ? ` · ${result.seconds}s` : ""}`,
      );
      await tg.sendPhoto(chatId(), result.cover, `Ảnh bìa ngày ${day}`);
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
      await send(captionFor(episode, next));
      state.days[day] = { ...state.days[day], status: "done", doneAt: new Date().toISOString() };
      updateTracker(day, { trang_thai: "da-dung" });
    } catch (err) {
      log("produce error", err);
      state.days[day] = { ...state.days[day], status: "failed" };
      await tg.edit(chatId(), status.message_id, `❌ Tập ${day}: lỗi.`);
      await send(
        `❌ <b>Tạo video tập ${day} lỗi</b>\n<pre>${esc(String(err.message).slice(0, 3000))}</pre>\nLog: <code>${esc(err.log ?? "")}</code>`,
        reviewButtons(day),
      );
    }
    save();
  }
  busy = false;
};

const approve = async (day) => {
  if (queue.includes(day) || (busy && state.days[day]?.status === "rendering")) {
    await send(`Tập ${day} đang được tạo rồi.`);
    return;
  }
  state.days[day] = { ...state.days[day], status: "approved", approvedAt: new Date().toISOString() };
  if (state.editing?.day === day) state.editing = null;
  save();
  queue.push(day);
  if (busy) await send(`👍 Đã duyệt tập ${day}. Đang làm tập khác, tập ${day} sẽ chạy ngay sau.`);
  void runQueue();
};

// ---------------------------------------------------------------- sửa kịch bản

const applyButtons = (day) => [
  [
    { text: "✅ Áp dụng", callback_data: `apply:${day}` },
    { text: "↩️ Hủy", callback_data: `cancel:${day}` },
  ],
];

/** Khối mẫu có phần diễn đầy đủ (tập đầu tiên có stage) để Claude tham khảo cách viết. */
const stageExample = (exceptDay) => {
  for (let d = 1; d <= 30; d++) {
    if (d === exceptDay) continue;
    try {
      const { episode } = loadEpisode(d);
      if (episode.beats.some((b) => b.stage?.length)) return readBlock(episode.week, d).block;
    } catch {
      /* tập chưa có */
    }
  }
  return null;
};

/** Hiện bản nháp: thoại đổi gì, nhịp nào đổi phần diễn, tóm tắt của Claude. */
const showDraft = async (day, before, after, summary) => {
  const { text, stageBeats } = diffEpisodes(before, after);
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
  await send(msg.length > 4000 ? `${msg.slice(0, 3950)}\n…` : msg, applyButtons(day));
};

/**
 * Nhờ Claude viết lại khối mã của tập theo yêu cầu, kiểm tra trên bản sao (thử lại 1 lần nếu lỗi),
 * rồi lưu thành bản nháp chờ người dùng áp dụng.
 */
const draftWithClaude = async (day, history, progressMsg) => {
  const { episode: before } = loadEpisode(day);
  const current = readBlock(before.week, day);
  const example = before.beats.some((b) => b.stage?.length) ? null : stageExample(day);

  let errors;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const result = await askClaude({ day, block: current.block, example, history, errors });
    if (result.question) return { question: result.question };
    await tg.edit(chatId(), progressMsg.message_id, `🔎 Đang kiểm tra bản sửa (lần ${attempt})…`);
    const check = validateDraft(day, before.week, result.block);
    if (check.ok) {
      state.editing = {
        ...state.editing,
        day,
        pending: { block: result.block, hash: current.hash, week: before.week, summary: result.summary },
      };
      save();
      await tg.edit(chatId(), progressMsg.message_id, "✅ Bản sửa hợp lệ.");
      await showDraft(day, before, check.episode, result.summary);
      return { ok: true, summary: result.summary };
    }
    errors = check.errors;
    log("draft invalid", errors);
  }
  throw new Error(`Bản sửa vẫn lỗi sau 2 lần:\n${errors.join("\n")}`);
};

const handleEditMessage = async (text) => {
  const { day } = state.editing;
  const direct = parseDirectEdits(text);
  // Sửa theo mã vẫn qua Claude để cập nhật phần diễn / cảnh đi kèm, nhưng giữ nguyên văn chữ.
  const request = direct
    ? `Thay NGUYÊN VĂN (không đổi chữ nào) các chỗ sau, rồi cập nhật phần diễn và mô tả cảnh liên quan nếu cần:\n` +
      direct.map((d) => `${d.code} → ${d.text}`).join("\n")
    : text;
  const history = [...(state.editing.history ?? []), { role: "user", text: request }];
  const progress = await send("🤔 Đang đọc yêu cầu và sửa kịch bản (khoảng 1 phút)…");

  try {
    const result = await draftWithClaude(day, history, progress);
    if (result.question) {
      await tg.edit(chatId(), progress.message_id, "❓ Cần hỏi lại.");
      state.editing.history = [...history, { role: "assistant", text: result.question }];
      save();
      await send(`❓ ${esc(result.question)}`);
      return;
    }
    state.editing.history = [...history, { role: "assistant", text: result.summary }];
    save();
  } catch (err) {
    log("edit error", err);
    await tg.edit(chatId(), progress.message_id, "❌ Không sửa được bằng Claude.");
    if (direct) {
      // Dự phòng: thay chữ trực tiếp, phần diễn giữ nguyên.
      state.editing = { ...state.editing, pending: { direct } };
      save();
      await send(
        `⚠️ Claude lỗi: <code>${esc(String(err.message).slice(0, 400))}</code>\n\n` +
          `Có thể thay chữ trực tiếp (${direct.map((d) => d.code).join(", ")}) nhưng <b>phần diễn và cảnh giữ nguyên</b>. Áp dụng?`,
        applyButtons(day),
      );
    } else {
      await send(
        `❌ Lỗi: <code>${esc(String(err.message).slice(0, 800))}</code>\n` +
          `Thử nhắn lại, hoặc sửa chính xác theo mã, ví dụ <code>6.2: nội dung mới</code>.`,
      );
    }
  }
};

/** Sau khi kịch bản đổi: sinh lại kịch bản in, đánh dấu video cũ, cập nhật câu thành ngữ. */
const afterScriptChange = async (day, before, after) => {
  const notes = [];
  await new Promise((r) => spawn("npm run sheets", { cwd: ROOT, shell: true, stdio: "ignore" }).on("close", r));
  notes.push("📄 Đã sinh lại kịch bản in (docs/kich-ban).");

  if (["done", "failed"].includes(state.days[day]?.status)) {
    notes.push(`🎬 Video tập ${day} đã tạo trước đó không còn đúng kịch bản. Bấm <b>Duyệt</b> để tạo lại.`);
  }
  if (before.idiom !== after.idiom) {
    updateTracker(day, { cau: after.idiom });
    notes.push(`📝 Đã cập nhật câu thành ngữ trong tracker.csv.`);
    const prev = day - 1;
    if (prev >= 1 && state.days[prev]?.status === "done") {
      state.days[prev] = { ...state.days[prev], status: "failed" };
      notes.push(`⚠️ Video tập ${prev} có dòng "Mai là câu" ghi câu cũ, cần tạo lại tập ${prev}.`);
      await send(notes.join("\n"), reviewButtons(prev));
      return;
    }
  }
  await send(notes.join("\n"));
};

// ---------------------------------------------------------------- lệnh & nút

const handleCommand = async (text) => {
  const [cmd, arg] = text.trim().split(/\s+/, 2);
  switch (cmd.split("@")[0]) {
    case "/start":
    case "/help":
      return send(HELP.replace("{gio}", notifyTime()));
    case "/batdau": {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(arg ?? "")) return send("Cách dùng: <code>/batdau 2026-12-01</code> (ngày đăng tập 1).");
      state.startDate = arg;
      save();
      await send(
        `📅 Tập 1 đăng ngày <b>${arg}</b>, tập 30 đăng ngày <b>${addDays(arg, 29)}</b>.\n` +
          `Bot gửi kịch bản lúc <b>${notifyTime()}</b> của ngày hôm trước.`,
      );
      return tick();
    }
    case "/gio": {
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(arg ?? "")) return send("Cách dùng: <code>/gio 20:00</code>");
      state.notifyTime = arg;
      save();
      return send(`⏰ Từ giờ bot gửi kịch bản lúc <b>${arg}</b> hằng ngày.`);
    }
    case "/tap": {
      const day = Number(arg);
      if (!(day >= 1 && day <= 30)) return send("Cách dùng: <code>/tap 5</code> (1 đến 30).");
      return sendReview(day, `📄 Kịch bản tập ${day}`);
    }
    case "/trangthai": {
      const now = nowIn(config.timezone);
      const sd = startDate();
      const tomorrow = dayForDate(sd, addDays(now.date, 1));
      const done = Object.entries(state.days)
        .filter(([, v]) => v.status === "done")
        .map(([d]) => d)
        .join(", ");
      return send(
        `📅 Ngày đăng tập 1: <b>${sd ?? "chưa đặt (/batdau)"}</b>\n` +
          `⏰ Giờ thông báo: <b>${notifyTime()}</b> (${config.timezone})\n` +
          `➡️ Ngày mai: ${tomorrow ? `tập <b>${tomorrow}</b>` : "không có tập"}\n` +
          `✅ Đã tạo video: ${done || "chưa có"}\n` +
          `⏳ Đang chạy: ${busy ? "có" : "không"}${queue.length ? `, chờ: ${queue.join(", ")}` : ""}\n` +
          `✏️ Đang sửa: ${state.editing ? `tập ${state.editing.day}` : "không"}`,
      );
    }
    case "/huy":
      state.editing = null;
      save();
      return send("Đã thoát chế độ sửa.");
    default:
      return send("Không hiểu lệnh này. Gõ /help để xem hướng dẫn.");
  }
};

const handleCallback = async (q) => {
  const [action, dayStr] = q.data.split(":");
  const day = Number(dayStr);
  await tg.answer(q.id);
  const msgId = q.message?.message_id;
  switch (action) {
    case "ok":
      if (msgId) await tg.clearButtons(chatId(), msgId);
      return approve(day);
    case "edit":
      state.editing = { day, history: [], pending: null };
      save();
      return send(
        `✏️ <b>Sửa tập ${day}</b>. Nhắn chỗ cần sửa:\n` +
          `• Chính xác: <code>6.2: nội dung mới</code> (nhiều dòng = nhiều chỗ)\n` +
          `• Hoặc nói tự nhiên, ví dụ: <i>đoạn hiểu sai cho cháu leo thang thêm một bước</i>\n` +
          `Gõ /huy để thôi sửa.`,
      );
    case "skip": {
      if (msgId) await tg.clearButtons(chatId(), msgId);
      const remindAt = Date.now() + config.remindAfterHours * 3600000;
      state.days[day] = { ...state.days[day], status: "skipped", remindAt };
      save();
      return send(`⏭ Bỏ qua tập ${day}. Bot nhắc lại sau ${config.remindAfterHours} giờ.`);
    }
    case "apply": {
      if (msgId) await tg.clearButtons(chatId(), msgId);
      const pending = state.editing?.day === day ? state.editing.pending : null;
      if (!pending) return send("Không có thay đổi nào đang chờ.");
      try {
        const { episode: before } = loadEpisode(day);
        if (pending.block) applyDraft(day, pending.week, pending.block, pending.hash);
        else applyChanges(day, pending.direct);
        const { episode: after } = loadEpisode(day);
        state.editing = null;
        save();
        await afterScriptChange(day, before, after);
        return sendReview(day, `✏️ Đã áp dụng. Kịch bản mới của tập ${day}:`);
      } catch (err) {
        return send(`❌ Không áp dụng được: ${esc(err.message)}`);
      }
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
  return send("Gõ /help để xem hướng dẫn, hoặc /tap 5 để xem kịch bản tập 5.");
};

// ---------------------------------------------------------------- lịch thông báo

async function tick() {
  if (!chatId()) return;
  const now = nowIn(config.timezone);
  const sd = startDate();
  const today = dayForDate(sd, now.date);
  const tomorrow = dayForDate(sd, addDays(now.date, 1));
  const due = now.time >= notifyTime();

  if (!sd) {
    if (due && state.notified.noStartDate !== now.date) {
      state.notified.noStartDate = now.date;
      save();
      await send("📅 Chưa đặt ngày đăng tập 1 nên chưa biết ngày mai là tập mấy. Gõ <code>/batdau 2026-12-01</code>.");
    }
    return;
  }

  // Gửi bù: hôm nay đến lượt đăng mà tập đó chưa từng được gửi duyệt (ví dụ máy tắt tối qua).
  if (today && !state.notified[today]) await sendReview(today, `⚠️ <b>Hôm nay đăng tập ${today}</b> mà chưa duyệt:`);
  if (due && tomorrow && !state.notified[tomorrow]) await sendReview(tomorrow, `🔔 <b>Kịch bản ngày mai</b> (${addDays(now.date, 1)})`);

  for (const [d, info] of Object.entries(state.days)) {
    if (info.status === "skipped" && info.remindAt && info.remindAt <= Date.now()) {
      await sendReview(Number(d), `🔔 Nhắc lại: tập ${d} chưa duyệt`);
    }
  }
}

// ---------------------------------------------------------------- vòng lặp chính

const main = async () => {
  await tg
    .setCommands([
      { command: "help", description: "Hướng dẫn" },
      { command: "tap", description: "Xem và duyệt một tập: /tap 5" },
      { command: "batdau", description: "Đặt ngày đăng tập 1: /batdau 2026-12-01" },
      { command: "gio", description: "Đổi giờ thông báo: /gio 20:00" },
      { command: "trangthai", description: "Xem trạng thái" },
      { command: "huy", description: "Thoát chế độ sửa" },
    ])
    .catch((e) => log("setMyCommands", e.message));

  // Tập đang tạo dở khi bot tắt: báo lại để duyệt lại.
  for (const [d, info] of Object.entries(state.days)) {
    if (info.status === "rendering" || info.status === "approved") {
      info.status = "failed";
      if (chatId()) await send(`⚠️ Bot vừa khởi động lại khi tập ${d} đang tạo dở. Bấm Duyệt để chạy lại.`, reviewButtons(Number(d)));
    }
  }
  save();

  // Lần đầu chạy với một chat: chào và gửi hướng dẫn để biết bot đã thông.
  if (chatId() && state.greeted !== String(chatId())) {
    await send(`🤖 Bot đã chạy.\n\n${HELP.replace("{gio}", notifyTime())}`).catch((e) => log("greet", e.message));
    state.greeted = String(chatId());
    save();
  }

  log(`Bot chạy. Chat: ${chatId() ?? "chưa gắn (gõ /start trong Telegram)"}. Giờ thông báo: ${notifyTime()}.`);
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
