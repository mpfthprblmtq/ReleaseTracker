import {SoundCloudArtistSearchResponse} from "./SoundCloudArtistSearchResponse.ts";
import {SoundCloudTrackResponse} from "./SoundCloudTrackResponse.ts";

export interface SoundCloudPlaylistResponse {
  duration: number;
  genre: string;
  permalink_url: string;
  tag_list: string;
  track_count: number;
  user_id: number;
  user: SoundCloudArtistSearchResponse;
  playlist_type: string;
  type: string;
  id: number;
  likes_count: number;
  created_at: string;
  title: string;
  artwork_url: string;
  tracks: SoundCloudTrackResponse[];
}