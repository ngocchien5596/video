import React, { useMemo } from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Animatic } from "./components/Animatic.tsx";
import { COLORS } from "./components/brand.ts";
import { EndCard, FlipCard, Subtitle, TitleCard, TopBar } from "./components/Overlays.tsx";
import { END_CARD_SECONDS, episodeTimeline } from "./lib/timing.ts";
import type { Episode, VoiceTrack } from "./lib/types.ts";

export type EpisodeProps = {
  episode: Episode;
  /** Câu của ngày mai, null ở tập cuối. */
  next: string | null;
  /** Tiếng thoại từ public/voice/ngay-XX/manifest.json, null khi chưa sinh. Nạp trong calculateMetadata. */
  voice: VoiceTrack | null;
};

const Sfx: React.FC<{ file: string; at: number; volume?: number }> = ({ file, at, volume = 1 }) => (
  <Sequence from={at} layout="none" name={`sfx ${file}`}>
    <Audio src={staticFile(`sfx/${file}`)} volume={volume} />
  </Sequence>
);

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, next, voice }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;

  const { beats, cues, spoken } = useMemo(() => episodeTimeline(episode, voice), [episode, voice]);

  const beat = beats.find((b) => t >= b.start && t < b.end) ?? beats[beats.length - 1];
  const cue = cues.find((c) => t >= c.start && t < c.end);
  const f = (seconds: number) => Math.round(seconds * fps);

  const title = beats.find((b) => b.kind === "title");
  const flip = beats.find((b) => b.kind === "flip");
  const endStart = durationInFrames - f(END_CARD_SECONDS);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {episode.footage ? (
        <Video src={staticFile(episode.footage)} objectFit="cover" />
      ) : (
        <Animatic beat={beat} cue={frame >= endStart ? undefined : cue} />
      )}

      <TopBar day={episode.day} idiom={episode.idiom} showIdiom={title ? t >= title.end : true} />

      {title && frame >= f(title.start) && frame < f(title.end) ? (
        <TitleCard
          day={episode.day}
          idiom={episode.idiom}
          startFrame={f(title.start)}
          endFrame={f(title.end)}
        />
      ) : null}

      {flip && frame >= f(flip.start) && frame < f(flip.end) ? (
        <FlipCard meaning={episode.meaning} startFrame={f(flip.start)} endFrame={f(flip.end)} />
      ) : null}

      {frame >= endStart ? (
        <EndCard question={episode.question} next={next} startFrame={endStart} />
      ) : null}

      {episode.showSubtitles === false || frame >= endStart ? null : <Subtitle cue={cue} />}

      {spoken.map((line) => (
        <Sequence key={line.file} from={f(line.start)} layout="none" name={line.file}>
          <Audio src={staticFile(line.file)} />
        </Sequence>
      ))}

      {title ? <Sfx file="ding.wav" at={f(title.start)} volume={0.7} /> : null}
      {flip ? <Sfx file="record-scratch.wav" at={f(flip.start)} volume={0.8} /> : null}
      <Sfx file="whoosh.wav" at={endStart} volume={0.6} />
    </AbsoluteFill>
  );
};
