import {Dayjs} from "dayjs";

export interface SoundCloudTrack {
  id: number;
  datetime: Dayjs;
  title: string;
  url: string;
  imageUrl: string;
  plays: number;
  favorites: number;
  reposts: number;
}