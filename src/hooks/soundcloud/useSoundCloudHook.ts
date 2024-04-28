import {SoundCloudArtistSearchResponse} from "../../model/api/soundcloud/SoundCloudArtistSearchResponse.ts";
import {SoundCloudTrack} from "../../model/soundcloud/SoundCloudTrack.ts";
import {SoundCloudAlbum} from "../../model/soundcloud/SoundCloudAlbum.ts";
import {useSoundCloudAuthService} from "./useSoundCloudAuthHook.ts";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {SoundCloudArtist} from "../../model/soundcloud/SoundCloudArtist.ts";
import {SoundCloudTrackResponse} from "../../model/api/soundcloud/SoundCloudTrackResponse.ts";
import dayjs from "dayjs";
import {SoundCloudPlaylistResponse} from "../../model/api/soundcloud/SoundCloudPlaylistResponse.ts";

export interface SoundCloudHooks {
  searchArtist: (query: string) => Promise<SoundCloudArtistSearchResponse[]>;
  getArtist: (id: string) => Promise<SoundCloudArtist>;
  getTracksFromArtist: (id: string) => Promise<SoundCloudTrack[]>;
  getAlbumsFromArtist: (id: string) => Promise<SoundCloudAlbum[]>;
}

export const useSoundCloudService = (): SoundCloudHooks => {
  const { getAccessToken } = useSoundCloudAuthService();

  // create an axios instance and attach an auth interceptor to it
  const soundcloudApi: AxiosInstance = axios.create({
    baseURL: 'https://api.soundcloud.com'
  });
  soundcloudApi.interceptors.request.use(async config => {
    config.headers['Authorization'] = await getAccessToken();
    return config;
  }, error => {
    return Promise.reject(error);
  });

  /**
   * Searches for artists in Spotify by using the text query sent in
   * @param query the artist to search for
   */
  const searchArtist = async (query: string): Promise<SoundCloudArtistSearchResponse[]> => {
    try {
      const response: AxiosResponse<SoundCloudArtistSearchResponse[]> = await soundcloudApi.get(
        `/users?q=${query}`
      );

      return response.data;
    } catch (error) {
      console.error('Error searching for artists in SoundCloud: ', error);
      return [];
    }
  };

  const getArtist = async (id: string): Promise<SoundCloudArtist> => {
    try {
      const response: AxiosResponse<SoundCloudArtistSearchResponse> = await soundcloudApi.get(
        `/users/${id}`,
      );

      const artist: SoundCloudArtistSearchResponse = response.data;
      return {
        id: artist.id,
        imageUrl: artist.avatar_url,
        profileUrl: artist.permalink_url,
        username: artist.username
      } as SoundCloudArtist;
    } catch (error) {
      console.error('Error getting artist in Spotify: ', error);
      return {} as SoundCloudArtist;
    }
  };

  const getTracksFromArtist = async (id: string): Promise<SoundCloudTrack[]> => {
    try {
      const response: AxiosResponse<SoundCloudTrackResponse[]> = await soundcloudApi.get(
        `/users/${id}/tracks?limit=100` // adding this limit changes the amount of responses for some reason
      );

      return response.data.map((track: SoundCloudTrackResponse) => {
        return {
          id: track.id,
          datetime: dayjs(track.created_at),
          title: track.title,
          url: track.permalink_url,
          imageUrl: track.artwork_url,
          plays: track.playback_count,
          favorites: track.favoritings_count,
          reposts: track.reposts_count
        } as SoundCloudTrack;
      });
    } catch (error) {
      console.error('Error getting tracks by artist in SoundCloud: ', error);
      return [];
    }
  };

  const getAlbumsFromArtist = async (id: string): Promise<SoundCloudAlbum[]> => {
    try {
      const response: AxiosResponse<SoundCloudPlaylistResponse[]> = await soundcloudApi.get(
        `/users/${id}/playlists`
      );

      return response.data.map((playlist: SoundCloudPlaylistResponse) => {
        return {
          id: playlist.id,
          datetime: dayjs(playlist.created_at),
          title: playlist.title,
          url: playlist.permalink_url,
          imageUrl: playlist.artwork_url,
          trackCount: playlist.track_count
        } as SoundCloudAlbum;
      });
    } catch (error) {
      console.error('Error getting playlists by artist in SoundCloud: ', error);
      return [];
    }
  };

  return { searchArtist, getArtist, getTracksFromArtist, getAlbumsFromArtist };
};