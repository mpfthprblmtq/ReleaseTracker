import {Dayjs} from "dayjs";

export interface SoundCloudAlbum {
  id: number;
  datetime: Dayjs;
  title: string;
  url: string;
  imageUrl: string;
  trackCount: number;
}