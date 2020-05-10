import { Song } from '../song.model';

export class Artist {
  public artist: string;
  public artistImage: string;
  public songs: Song[];

  constructor(artist: string, artistImage?: string, songs?: Song[]) {
    this.artist = artist;
    this.artistImage = artistImage;
    this.songs = songs;
  }
}
