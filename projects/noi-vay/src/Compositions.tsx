/** Các composition của series "Nói Vậy Mà Không Phải Vậy" trong Remotion Studio. */
import React from "react";
import { Composition, Folder, Still } from "remotion";
import { episodeFrames, FPS, HEIGHT, pad2, WIDTH } from "../../../engine/lib/timing.ts";
import { voicedMetadata } from "../../../engine/remotion.ts";
import { PROJECT_ID } from "./brand.ts";
import { Cover } from "./Cover.tsx";
import { EpisodeVideo, type EpisodeProps } from "./Episode.tsx";
import { EPISODES, nextTeaser } from "./episodes/index.ts";
import { PlaylistCover } from "./PlaylistCover.tsx";

const WEEKS = [1, 2, 3, 4] as const;
const calculateMetadata = voicedMetadata<EpisodeProps>(PROJECT_ID);

export const NoiVayCompositions: React.FC = () => (
  <Folder name="NoiVay">
    <Folder name="Playlist">
      <Still id="Playlist-Ngang" component={PlaylistCover} width={1280} height={720} />
      <Still id="Playlist-Vuong" component={PlaylistCover} width={1080} height={1080} />
    </Folder>
    {WEEKS.map((week) => (
      <Folder key={week} name={`Tuan-${week}`}>
        {EPISODES.filter((e) => e.week === week).map((episode) => {
          const props: EpisodeProps = { episode, next: nextTeaser(episode.day), voice: null };
          return (
            <React.Fragment key={episode.day}>
              {/* Giữ id cũ "Ngay-XX" / "Bia-XX" để lệnh xuất và lịch sử không đổi. */}
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
              <Still id={`Bia-${pad2(episode.day)}`} component={Cover} width={WIDTH} height={HEIGHT} defaultProps={props} />
            </React.Fragment>
          );
        })}
      </Folder>
    ))}
  </Folder>
);
