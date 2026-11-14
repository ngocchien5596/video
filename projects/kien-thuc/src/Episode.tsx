import React from "react";
import type { VoiceTrack } from "../../../engine/lib/types.ts";
import { ParchmentPlayer } from "../../../engine/parchment/ParchmentPlayer.tsx";
import type { KienThucEpisode } from "./episodes/make.ts";

export type EpisodeProps = {
  episode: KienThucEpisode;
  next: string | null;
  voice: VoiceTrack | null;
  safeZones?: boolean;
};

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, next, voice, safeZones }) => (
  <ParchmentPlayer episode={episode} next={next} voice={voice} safeZones={safeZones} />
);
