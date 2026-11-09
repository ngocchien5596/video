/**
 * Cấu hình bot: bí mật trong .env (không vào git), cài đặt chung trong bot.config.json,
 * trạng thái chạy (ngày bắt đầu, đã thông báo ngày nào...) trong .bot/state.json.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..", "..");
const STATE_DIR = path.join(ROOT, ".bot");
const STATE_FILE = path.join(STATE_DIR, "state.json");

/** Đọc file .env đơn giản: KEY=VALUE, bỏ qua dòng trống và dòng bắt đầu bằng #. */
export const loadEnv = () => {
  const file = path.join(ROOT, ".env");
  if (!existsSync(file)) return;
  for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
};

export const loadConfig = () => {
  const defaults = { notifyTime: "20:00", timezone: "Asia/Ho_Chi_Minh", remindAfterHours: 2, startDate: null };
  const file = path.join(ROOT, "bot.config.json");
  return existsSync(file) ? { ...defaults, ...JSON.parse(readFileSync(file, "utf8")) } : defaults;
};

const EMPTY_STATE = {
  /** Chat Telegram duy nhất được điều khiển bot. */
  chatId: null,
  /** Ghi đè cấu hình bằng lệnh /batdau và /gio. */
  startDate: null,
  notifyTime: null,
  /** Ngày (YYYY-MM-DD) đã gửi thông báo. */
  notified: {},
  /** Trạng thái từng tập: pending | editing | approved | rendering | done | skipped | failed. */
  days: {},
  /** Đang sửa thoại: { day, history: [], pending: [...] }. */
  editing: null,
  /** offset của getUpdates. */
  offset: 0,
};

export const loadState = () => {
  if (!existsSync(STATE_FILE)) return structuredClone(EMPTY_STATE);
  return { ...structuredClone(EMPTY_STATE), ...JSON.parse(readFileSync(STATE_FILE, "utf8")) };
};

export const saveState = (state) => {
  mkdirSync(STATE_DIR, { recursive: true });
  const tmp = `${STATE_FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(state, null, 2), "utf8");
  renameSync(tmp, STATE_FILE);
};

/** Ngày giờ hiện tại theo múi giờ cấu hình: { date: "YYYY-MM-DD", time: "HH:MM" }. */
export const nowIn = (timezone, d = new Date()) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
};

export const addDays = (date, n) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** Tập số mấy được đăng vào ngày `date`, null nếu ngoài 1..30 hoặc chưa đặt ngày bắt đầu. */
export const dayForDate = (startDate, date) => {
  if (!startDate) return null;
  const diff = Math.round((new Date(`${date}T00:00:00Z`) - new Date(`${startDate}T00:00:00Z`)) / 86400000);
  const day = diff + 1;
  return day >= 1 && day <= 30 ? day : null;
};
