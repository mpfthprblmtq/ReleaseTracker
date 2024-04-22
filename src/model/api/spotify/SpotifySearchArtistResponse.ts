import {SpotifyArtistResponse} from "./SpotifyArtistResponse.ts";

export interface SpotifySearchArtistResponse {
  artists: {
    href: string;
    items: SpotifyArtistResponse[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  }
}