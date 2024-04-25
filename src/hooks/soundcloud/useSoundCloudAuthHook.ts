import {getCookie, setCookie} from "../../utils/cookieUtils.ts";
import axios, {AxiosResponse} from "axios";
import {SoundCloudTokenResponse} from "../../model/api/soundcloud/SoundCloudTokenResponse.ts";

export interface SoundCloudAuthHook {
  getAccessToken: () => Promise<string>;
}

export const useSoundCloudAuthService = (): SoundCloudAuthHook => {
  const env: ImportMetaEnv = import.meta.env;

  /**
   * Checks to see if a cookie with the soundcloud access token exists.
   * If it does, and it's valid, returns that.  If it either doesn't exist or is invalid/expired, get a new one,
   * then store the result as a cookie.
   */
  const getAccessToken = async (): Promise<string> => {
    const existingCookie: string | undefined = getCookie('soundcloud_access_token');
    if (existingCookie) {
      return existingCookie;
    } else {
      try {
        const response: AxiosResponse<SoundCloudTokenResponse> = await axios.post(
          'https://secure.soundcloud.com/oauth/token',
          { 'grant_type': 'client_credentials' },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization':
                `Basic ${btoa(`${env.VITE_SOUNDCLOUD_CLIENT_ID}:${env.VITE_SOUNDCLOUD_CLIENT_SECRET}`)}`
            }
          }
        );
        const token = response.data;
        const tokenValue: string = `OAuth ${token.access_token}`;

        // create secure cookie options to store token
        const cookieOptions = {
          path: '/',
          secure: true,
          SameSite: 'None',
          Partitioned: true,
          expires: token.expires_in
        };
        setCookie('soundcloud_access_token', tokenValue, cookieOptions);
        return tokenValue;

      } catch (error) {
        console.error('Error fetching SoundCloud access token: ' + error);
        return '';
      }
    }
  }

  return {getAccessToken};
}