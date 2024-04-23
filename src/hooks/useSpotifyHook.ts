import axios, {AxiosResponse} from "axios";
import dayjs from 'dayjs';
import {getCookie, setCookie} from "../utils/cookieUtils.ts";
import {SpotifyArtist} from "../model/spotify/SpotifyArtist.ts";
import {SpotifyArtistResponse} from "../model/api/spotify/SpotifyArtistResponse.ts";
import {SpotifySearchArtistResponse} from "../model/api/spotify/SpotifySearchArtistResponse.ts";
import {SpotifyRelease} from "../model/spotify/SpotifyRelease.ts";
import {SpotifyReleaseSearchResponse} from "../model/api/spotify/SpotifyReleaseSearchResponse.ts";
import {SpotifyTokenResponse} from "../model/api/spotify/SpotifyTokenResponse.ts";

export interface SpotifyHooks {
  searchArtist: (query: string) => Promise<SpotifyArtist[]>;
  getArtist: (id: string) => Promise<SpotifyArtist>;
  getAlbumsFromArtist: (artist: SpotifyArtist) => Promise<SpotifyRelease[]>;
}

export const useSpotifyService = (): SpotifyHooks => {

  const getAccessToken = async (): Promise<string> => {
    const existingCookie: string | undefined = getCookie('spotify_access_token');
    if (existingCookie) {
      return existingCookie;
    } else {
      try {
        const requestBody = new URLSearchParams();
        requestBody.append('grant_type', 'client_credentials');
        requestBody.append('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
        requestBody.append('client_secret', import.meta.env.VITE_SPOTIFY_CLIENT_SECRET);

        const response: AxiosResponse<SpotifyTokenResponse> = await axios.post(
          'https://accounts.spotify.com/api/token',
          requestBody,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        const token = response.data;
        const tokenValue: string = `${token.token_type} ${token.access_token}`;

        // create cookie options to store token
        const cookieOptions = {
          path: '/',
          secure: true,
          SameSite: 'None',
          Partitioned: true,
          expires: token.expires_in
        };
        setCookie('spotify_access_token', tokenValue, cookieOptions);
        return tokenValue;

      } catch (error) {
        console.error('Error fetching Spotify access token: ', error);
        return '';
      }
    }
  }

  const searchArtist = async (query: string): Promise<SpotifyArtist[]> => {
    const token: string = await getAccessToken();

    try {
      const response: AxiosResponse<SpotifySearchArtistResponse> = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=artist`,
        { headers: { 'Authorization': token } }
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

  const getArtist = async (id: string): Promise<SpotifyArtist> => {
    const token: string = await getAccessToken();

    try {
      const response: AxiosResponse<SpotifyArtistResponse> = await axios.get(
        `https://api.spotify.com/v1/artists/${id}`,
        { headers: { 'Authorization': token } }
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

  const getAlbumsFromArtist = async (artist: SpotifyArtist): Promise<SpotifyRelease[]> => {
    const token: string = await getAccessToken();

    try {
      const response: AxiosResponse<SpotifyReleaseSearchResponse> = await axios.get(
        `https://api.spotify.com/v1/artists/${artist.id}/albums`,
        { headers: { 'Authorization': token } }
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