export interface SpotifyReleaseSearchResponse {
  href: string;
  items: [
    {
      album_group: 'album' | 'single' | 'compilation' | 'appears_on';
      album_type: 'album' | 'single' | 'compilation';
      artists: [
        {
          external_urls: { spotify: string };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }
      ];
      available_markets: string[];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: 'year' | 'month' | 'day';
      total_tracks: number;
      type: 'album';
      uri: string;
    }
  ]
}