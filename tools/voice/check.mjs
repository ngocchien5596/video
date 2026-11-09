// npm run voice:check -- 1 | tuan-1 | all
import { spawnSync } from "node:child_process";
import { parseDays } from "../days.mjs";

const days = parseDays(process.argv.slice(2));
const res = spawnSync(process.execPath, ["tools/voice/run-python.mjs", "check_voice.py", ...days.map(String)], {
  stdio: "inherit",
});
process.exit(res.status ?? 1);
