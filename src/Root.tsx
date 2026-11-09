import React from "react";
import { type CalculateMetadataFunction, Composition, Folder, Still, staticFile } from "remotion";
import { Cover } from "./Cover.tsx";
import { EpisodeVideo, type EpisodeProps } from "./Episode.tsx";
import { EPISODES, nextIdiom } from "./episodes/index.ts";
import { episodeFrames, FPS, HEIGHT, pad2, voiceManifestPath, WIDTH } from "./lib/timing.ts";
import type { VoiceTrack } from "./lib/types.ts";

const WEEKS = [1, 2, 3, 4] as const;

/** Nạp tiếng thoại nếu đã chạy `npm run voice` cho tập này, không có thì trả về null. */
const loadVoice = async (day: number): Promise<VoiceTrack | null> => {
  try {
    const res = await fetch(staticFile(voiceManifestPath(day)));
    if (!res.ok) return null;
    return (await res.json()) as VoiceTrack;
  } catch {
    return null;
  }
};

const calculateMetadata: CalculateMetadataFunction<EpisodeProps> = async ({ props }) => {
  const voice = await loadVoice(props.episode.day);
  return {
    durationInFrames: episodeFrames(props.episode, voice),
    props: { ...props, voice },
  };
};

export const RemotionRoot: React.FC = () => (
  <>
    {WEEKS.map((week) => (
      <Folder key={week} name={`Tuan-${week}`}>
        {EPISODES.filter((e) => e.week === week).map((episode) => {
          const props: EpisodeProps = { episode, next: nextIdiom(episode.day), voice: null };
          return (
            <React.Fragment key={episode.day}>
              <Composition
                id={`Ngay-${pad2(episode.day)}`}
                component={EpisodeVideo}
                width={WIDTH}
                height={HEIGHT}
                fps={FPS}
                durationInFrames={episodeFrames(episode)}
                defaultProps={props}
                calculateMetadata={calculateMetadata}
              />
              <Still
                id={`Bia-${pad2(episode.day)}`}
                component={Cover}
                width={WIDTH}
                height={HEIGHT}
                defaultProps={props}
              />
            </React.Fragment>
          );
        })}
      </Folder>
    ))}
  </>
);
