import {SpotifyArtist} from "./SpotifyArtist.ts";
import {Dayjs} from "dayjs";

export interface SpotifyRelease {
  type: 'album' | 'single' | 'compilation';
  artist: SpotifyArtist;
  otherArtists?: [
    {
      name: string;
      url: string;
      id: string;
    }
  ];
  url: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  releaseDate: Dayjs;
  totalTracks: number;
}