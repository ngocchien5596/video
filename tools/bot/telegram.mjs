/** Gọi Telegram Bot API bằng fetch có sẵn của Node, không cần thư viện. */
import { readFileSync } from "node:fs";
import path from "node:path";

export const createTelegram = (token) => {
  const base = `https://api.telegram.org/bot${token}`;

  const call = async (method, params = {}, timeoutMs = 70000) => {
    const res = await fetch(`${base}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal: AbortSignal.timeout(timeoutMs),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(`Telegram ${method}: ${data.description}`);
    return data.result;
  };

  const upload = async (method, field, file, params = {}) => {
    const form = new FormData();
    for (const [k, v] of Object.entries(params)) {
      form.append(k, typeof v === "string" ? v : JSON.stringify(v));
    }
    form.append(field, new Blob([readFileSync(file)]), path.basename(file));
    const res = await fetch(`${base}/${method}`, { method: "POST", body: form, signal: AbortSignal.timeout(600000) });
    const data = await res.json();
    if (!data.ok) throw new Error(`Telegram ${method}: ${data.description}`);
    return data.result;
  };

  return {
    call,
    getUpdates: (offset) => call("getUpdates", { offset, timeout: 50, allowed_updates: ["message", "callback_query"] }),
    send: (chatId, text, buttons) =>
      call("sendMessage", {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
        ...(buttons ? { reply_markup: { inline_keyboard: buttons } } : {}),
      }),
    edit: (chatId, messageId, text, buttons) =>
      call("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
        ...(buttons ? { reply_markup: { inline_keyboard: buttons } } : {}),
      }).catch(() => null),
    clearButtons: (chatId, messageId) =>
      call("editMessageReplyMarkup", { chat_id: chatId, message_id: messageId, reply_markup: { inline_keyboard: [] } }).catch(
        () => null,
      ),
    answer: (callbackId, text) => call("answerCallbackQuery", { callback_query_id: callbackId, text }).catch(() => null),
    sendVideo: (chatId, file, caption) =>
      upload("sendVideo", "video", file, { chat_id: String(chatId), caption, parse_mode: "HTML", supports_streaming: "true" }),
    sendPhoto: (chatId, file, caption) => upload("sendPhoto", "photo", file, { chat_id: String(chatId), caption, parse_mode: "HTML" }),
    setCommands: (commands) => call("setMyCommands", { commands }),
  };
};

/** Escape cho parse_mode HTML của Telegram. */
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
