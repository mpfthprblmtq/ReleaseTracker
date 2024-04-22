import {Dayjs} from "dayjs";

export interface SpotifyAccessToken {
  value: string;
  expiration: Dayjs;
}