/** Các composition của series "Thiên Đường Kiến Thức" trong Remotion Studio. */
import React from "react";
import { Composition, Folder, Still } from "remotion";
import { episodeFrames, FPS, HEIGHT, pad2, WIDTH } from "../../../engine/lib/timing.ts";
import { voicedMetadata } from "../../../engine/remotion.ts";
import { PROJECT_ID } from "./brand.ts";
import { Cover } from "./Cover.tsx";
import { EpisodeVideo, type EpisodeProps } from "./Episode.tsx";
import { EPISODES, nextTeaser } from "./episodes/index.ts";

const calculateMetadata = voicedMetadata<EpisodeProps>(PROJECT_ID);

export const KienThucCompositions: React.FC = () => (
  <Folder name="KienThuc">
    {[...new Set(EPISODES.map((e) => e.week))].map((week) => (
      <Folder key={week} name={`KienThuc-Tuan-${week}`}>
        {EPISODES.filter((e) => e.week === week).map((episode) => {
          const props: EpisodeProps = { episode, next: nextTeaser(episode.day), voice: null };
          return (
            <React.Fragment key={episode.day}>
              <Composition
                id={`KienThuc-${pad2(episode.day)}`}
                component={EpisodeVideo}
                width={WIDTH}
                height={HEIGHT}
                fps={FPS}
                durationInFrames={episodeFrames(episode)}
                defaultProps={props}
                calculateMetadata={calculateMetadata}
              />
              <Still id={`KienThuc-Bia-${pad2(episode.day)}`} component={Cover} width={WIDTH} height={HEIGHT} defaultProps={props} />
            </React.Fragment>
          );
        })}
      </Folder>
    ))}
  </Folder>
);
