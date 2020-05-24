import { Song } from "../song.model";

export class Artist {
  public _id: string;
  public artist: string;
  public artistImage: string;
  public songs: Song[];

  constructor(
    _id: string,
    artist: string,
    artistImage?: string,
    songs?: Song[]
  ) {
    this._id = _id;
    this.artist = artist;
    this.artistImage = artistImage;
    this.songs = songs;
  }
}
