import axios, {AxiosInstance, AxiosResponse} from "axios";
import dayjs from 'dayjs';
import {SpotifyArtist} from "../../model/spotify/SpotifyArtist.ts";
import {SpotifyArtistResponse} from "../../model/api/spotify/SpotifyArtistResponse.ts";
import {SpotifySearchArtistResponse} from "../../model/api/spotify/SpotifySearchArtistResponse.ts";
import {SpotifyRelease} from "../../model/spotify/SpotifyRelease.ts";
import {SpotifyReleaseSearchResponse} from "../../model/api/spotify/SpotifyReleaseSearchResponse.ts";
import {useSpotifyAuthService} from "./useSpotifyAuthHook.ts";

export interface SpotifyHooks {
  searchArtist: (query: string) => Promise<SpotifyArtist[]>;
  getArtist: (id: string) => Promise<SpotifyArtist>;
  getAlbumsFromArtist: (artist: SpotifyArtist) => Promise<SpotifyRelease[]>;
}

export const useSpotifyService = (): SpotifyHooks => {

  const { getAccessToken } = useSpotifyAuthService();

  // create an axios instance and attach an auth interceptor to it
  const spotifyApi: AxiosInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1'
  });
  spotifyApi.interceptors.request.use(async config => {
    config.headers['Authorization'] = await getAccessToken();
    return config;
  }, error => {
    return Promise.reject(error);
  });

  /**
   * Searches for artists in Spotify by using the text query sent in
   * @param query the artist to search for
   */
  const searchArtist = async (query: string): Promise<SpotifyArtist[]> => {
    try {
      const response: AxiosResponse<SpotifySearchArtistResponse> = await spotifyApi.get(
        `/search?q=${query}&type=artist`
      );

      return response.data.artists.items.map((artist: SpotifyArtistResponse) => {
        return {
          id: artist.id,
          url: artist.external_urls.spotify,
          followers: artist.followers.total,
          imageUrl: artist.images.length > 0 ? artist.images[0].url : '',
          name: artist.name,
          popularity: artist.popularity
        } as SpotifyArtist
      });
    } catch (error) {
      console.error('Error searching for artists in Spotify: ', error);
      return [];
    }
  };

  /**
   * Retrieves the artist based on the id
   * @param id the id of the artist to get
   */
  const getArtist = async (id: string): Promise<SpotifyArtist> => {
    try {
      const response: AxiosResponse<SpotifyArtistResponse> = await spotifyApi.get(
        `https://api.spotify.com/v1/artists/${id}`,
      );

      const artist: any = response.data;
      return {
        id: artist.id,
        url: artist.external_urls.spotify,
        followers: artist.followers.total,
        imageUrl: artist.images.length > 0 ? artist.images[0].url : '',
        name: artist.name,
        popularity: artist.popularity
      } as SpotifyArtist
    } catch (error) {
      console.error('Error searching for artists in Spotify: ', error);
      return {} as SpotifyArtist;
    }
  };

  /**
   * Gets albums from an artist based on an artist object passed in.  Accepts the whole SpotifyArtist object to append
   * the object onto the object to return.
   * @param artist the artist to search with (contains an id parameter to search on)
   */
  const getAlbumsFromArtist = async (artist: SpotifyArtist): Promise<SpotifyRelease[]> => {
    try {
      const response: AxiosResponse<SpotifyReleaseSearchResponse> = await spotifyApi.get(
        `https://api.spotify.com/v1/artists/${artist.id}/albums`,
      );

      return response.data.items.map(release => {
        return {
          type: release.type,
          artist: artist,
          otherArtists: release.artists.map((artist) => {
            return {name: artist.name, url: artist.external_urls.spotify, id: artist.id} as any;
          }).filter(otherArtist => otherArtist.id !== artist.id),
          url: release.external_urls.spotify,
          id: release.id,
          images: release.images,
          name: release.name,
          releaseDate: dayjs(release.release_date),
          totalTracks: release.total_tracks
        } as SpotifyRelease;
      });

    } catch (error) {
      console.error('Error searching for artists in Spotify: ', error);
      return [];
    }
  };

  return { searchArtist, getArtist, getAlbumsFromArtist };
};