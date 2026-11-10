/** Tiện ích đăng ký composition cho các dự án. */
import { type CalculateMetadataFunction, staticFile } from "remotion";
import { episodeFrames, voiceManifestPath } from "./lib/timing.ts";
import type { Episode, VoiceTrack } from "./lib/types.ts";

/** Nạp tiếng thoại nếu đã chạy `npm run voice` cho tập này, không có thì trả về null. */
export const loadVoice = async (project: string, day: number): Promise<VoiceTrack | null> => {
  try {
    const res = await fetch(staticFile(voiceManifestPath(project, day)));
    if (!res.ok) return null;
    return (await res.json()) as VoiceTrack;
  } catch {
    return null;
  }
};

/** calculateMetadata chung: nạp tiếng rồi đặt độ dài video theo tiếng thật. */
export const voicedMetadata =
  <P extends { episode: Episode; voice: VoiceTrack | null }>(project: string): CalculateMetadataFunction<P> =>
  async ({ props }) => {
    const voice = await loadVoice(project, props.episode.day);
    return {
      durationInFrames: episodeFrames(props.episode, voice),
      props: { ...props, voice },
    };
  };
