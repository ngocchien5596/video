/**
 * In dữ liệu một tập ra JSON. Bot gọi file này trong tiến trình con để luôn đọc kịch bản mới nhất
 * (import trong cùng tiến trình sẽ bị cache sau khi sửa file).
 *   node tools/bot/episode-data.mjs <dự án> 5            (đọc projects/<dự án>/src của repo)
 *   node tools/bot/episode-data.mjs <dự án> 5 <thư mục>  (đọc bản nháp: <thư mục>/projects/<dự án>/src)
 * In ra { episode, next }, next là dòng hẹn tập sau (câu ngày mai / câu hỏi tiếp theo) hoặc null.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const [id, dayArg, rootArg] = process.argv.slice(2);
const day = Number(dayArg);
const root = rootArg ? path.resolve(rootArg) : path.resolve(import.meta.dirname, "..", "..");
const index = path.join(root, "projects", id, "src", "episodes", "index.ts");
const { EPISODES, nextTeaser } = await import(pathToFileURL(index).href);

const episode = EPISODES.find((e) => e.day === day);
if (!episode) {
  console.error(`Dự án ${id} không có tập ${day}`);
  process.exit(1);
}
process.stdout.write(JSON.stringify({ episode, next: nextTeaser(day) }));
