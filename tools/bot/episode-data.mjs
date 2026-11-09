/**
 * In dữ liệu một tập ra JSON. Bot gọi file này trong tiến trình con để luôn đọc kịch bản mới nhất
 * (import trong cùng tiến trình sẽ bị cache sau khi sửa file).
 *   node tools/bot/episode-data.mjs 5            (đọc src/ của repo)
 *   node tools/bot/episode-data.mjs 5 <thư mục>  (đọc bản nháp: <thư mục>/episodes/index.ts)
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const day = Number(process.argv[2]);
const srcDir = process.argv[3] ? path.resolve(process.argv[3]) : path.resolve(import.meta.dirname, "..", "..", "src");
const { EPISODES, nextIdiom } = await import(pathToFileURL(path.join(srcDir, "episodes", "index.ts")).href);

const episode = EPISODES.find((e) => e.day === day);
if (!episode) {
  console.error(`Không có tập ${day}`);
  process.exit(1);
}
process.stdout.write(JSON.stringify({ episode, next: nextIdiom(day) }));
