import {getCookie, setCookie} from "../../utils/cookieUtils.ts";
import axios, {AxiosResponse} from "axios";
import {SpotifyTokenResponse} from "../../model/api/spotify/SpotifyTokenResponse.ts";

export interface SpotifyAuthHook {
  getAccessToken: () => Promise<string>;
}

export const useSpotifyAuthService = (): SpotifyAuthHook => {
  const env: ImportMetaEnv = import.meta.env;

  /**
   * Checks to see if a cookie with the spotify access token exists.
   * If it does, and it's valid, returns that.  If it either doesn't exist or is invalid/expired, get a new one,
   * then store the result as a cookie.
   */
  const getAccessToken = async (): Promise<string> => {
    const existingCookie: string | undefined = getCookie('spotify_access_token');
    if (existingCookie) {
      return existingCookie;
    } else {
      try {
        const response: AxiosResponse<SpotifyTokenResponse> = await axios.post(
          'https://accounts.spotify.com/api/token',
          {
            'grant_type': 'client_credentials',
            'client_id': env.VITE_SPOTIFY_CLIENT_ID,
            'client_secret': env.VITE_SPOTIFY_CLIENT_SECRET
          },
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        const token = response.data;
        const tokenValue: string = `${token.token_type} ${token.access_token}`;

        // create secure cookie options to store token
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

  return { getAccessToken };
}