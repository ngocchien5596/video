/** Các composition của series "Ông Ơi, Chỗ Này Lạ Lắm!" trong Remotion Studio. */
import React from "react";
import { Composition, Folder, Still } from "remotion";
import { episodeFrames, FPS, HEIGHT, pad2, WIDTH } from "../../../engine/lib/timing.ts";
import { voicedMetadata } from "../../../engine/remotion.ts";
import { PROJECT_ID } from "./brand.ts";
import { Cover } from "./Cover.tsx";
import { EpisodeVideo, type EpisodeProps } from "./Episode.tsx";
import { EPISODES, nextTeaser } from "./episodes/index.ts";

const calculateMetadata = voicedMetadata<EpisodeProps>(PROJECT_ID);

export const ChoLaCompositions: React.FC = () => (
  <Folder name="ChoLa">
    {[...new Set(EPISODES.map((e) => e.week))].map((week) => (
      <Folder key={week} name={`ChoLa-Tuan-${week}`}>
        {EPISODES.filter((e) => e.week === week).map((episode) => {
          const props: EpisodeProps = { episode, next: nextTeaser(episode.day), voice: null };
          return (
            <React.Fragment key={episode.day}>
              <Composition
                id={`ChoLa-${pad2(episode.day)}`}
                component={EpisodeVideo}
                width={WIDTH}
                height={HEIGHT}
                fps={FPS}
                durationInFrames={episodeFrames(episode)}
                defaultProps={props}
                calculateMetadata={calculateMetadata}
              />
              <Still id={`ChoLa-Bia-${pad2(episode.day)}`} component={Cover} width={WIDTH} height={HEIGHT} defaultProps={props} />
            </React.Fragment>
          );
        })}
      </Folder>
    ))}
  </Folder>
);
