import React from "react";
import { Composition, Folder, Still } from "remotion";
import { Cover } from "./Cover.tsx";
import { EpisodeVideo, type EpisodeProps } from "./Episode.tsx";
import { EPISODES, nextIdiom } from "./episodes/index.ts";
import { episodeFrames, FPS, HEIGHT, pad2, WIDTH } from "./lib/timing.ts";

const WEEKS = [1, 2, 3, 4] as const;

export const RemotionRoot: React.FC = () => (
  <>
    {WEEKS.map((week) => (
      <Folder key={week} name={`Tuan-${week}`}>
        {EPISODES.filter((e) => e.week === week).map((episode) => {
          const props: EpisodeProps = { episode, next: nextIdiom(episode.day) };
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
                calculateMetadata={({ props: p }) => ({
                  durationInFrames: episodeFrames(p.episode),
                })}
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
