import {SoundCloudArtistSearchResponse} from "./SoundCloudArtistSearchResponse.ts";

export interface SoundCloudTrackResponse {
  id: number;
  created_at: string;
  duration: number;
  genre: string;
  title: string;
  description: string;
  user: SoundCloudArtistSearchResponse;
  permalink_url: string;
  artwork_url: string;
  waveform_url: string;
  playback_count: number;
  favoritings_count: number;
  reposts_count: number;
  access: string;
  tag_list: string;
}