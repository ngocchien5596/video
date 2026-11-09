/**
 * Cấu hình cho `remotion studio` và `remotion render`.
 * Toàn bộ tuỳ chọn: https://remotion.dev/docs/config
 */
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
