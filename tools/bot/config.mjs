/**
 * Cấu hình bot: bí mật trong .env (không vào git), cài đặt chung trong bot.config.json,
 * cài đặt riêng từng dự án trong projects/<dự án>/project.json (lịch thông báo, gói đăng bài),
 * trạng thái chạy (ngày bắt đầu, đã thông báo ngày nào...) trong .bot/state.json, tách theo dự án.
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
  const defaults = { timezone: "Asia/Ho_Chi_Minh", remindAfterHours: 2, autoPush: false, defaultProject: "noi-vay" };
  const file = path.join(ROOT, "bot.config.json");
  return existsSync(file) ? { ...defaults, ...JSON.parse(readFileSync(file, "utf8")) } : defaults;
};

const EMPTY_STATE = {
  /** Chat Telegram duy nhất được điều khiển bot. */
  chatId: null,
  /** Dự án đang chọn (lệnh không ghi dự án thì dùng dự án này). */
  active: null,
  /** Trạng thái riêng từng dự án, xem EMPTY_PROJECT_STATE. */
  projects: {},
  /** Đang sửa thoại: { project, day, history: [], pending }. */
  editing: null,
  /** offset của getUpdates. */
  offset: 0,
};

export const EMPTY_PROJECT_STATE = {
  /** Ghi đè cấu hình bằng lệnh /batdau và /gio. */
  startDate: null,
  notifyTime: null,
  /** Tập đã gửi thông báo duyệt, và ngày đã nhắc đặt ngày bắt đầu. */
  notified: {},
  /** Trạng thái từng tập: pending | approved | rendering | done | skipped | failed. */
  days: {},
};

/** Dự án mặc định của bản cũ (trước khi tách nhiều dự án). */
const LEGACY_PROJECT = "noi-vay";

export const loadState = () => {
  if (!existsSync(STATE_FILE)) return structuredClone(EMPTY_STATE);
  const raw = JSON.parse(readFileSync(STATE_FILE, "utf8"));
  const state = { ...structuredClone(EMPTY_STATE), ...raw };
  // Chuyển trạng thái bản cũ (một dự án, các trường nằm ở gốc) sang state.projects["noi-vay"].
  if (raw.days || raw.notified || raw.startDate || raw.notifyTime) {
    state.projects[LEGACY_PROJECT] = {
      ...structuredClone(EMPTY_PROJECT_STATE),
      ...state.projects[LEGACY_PROJECT],
      startDate: raw.startDate ?? null,
      notifyTime: raw.notifyTime ?? null,
      notified: raw.notified ?? {},
      days: raw.days ?? {},
    };
    delete state.days;
    delete state.notified;
    delete state.startDate;
    delete state.notifyTime;
    if (state.editing && !state.editing.project) state.editing.project = LEGACY_PROJECT;
  }
  return state;
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

/** Tập số mấy được đăng vào ngày `date`, null nếu ngoài 1..total hoặc chưa đặt ngày bắt đầu. */
export const dayForDate = (startDate, date, total = 30) => {
  if (!startDate) return null;
  const diff = Math.round((new Date(`${date}T00:00:00Z`) - new Date(`${startDate}T00:00:00Z`)) / 86400000);
  const day = diff + 1;
  return day >= 1 && day <= total ? day : null;
};
