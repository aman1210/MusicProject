export class Song {
  public _id: string;
  public name: string;
  public artist: string;
  public album: string;
  public albumArt: string;
  public likes: number;
  public url: string;

  constructor(
    id: string,
    name: string,
    artist: string,
    album: string,
    albumArt: string,
    url: string,
    likes?: number
  ) {
    this._id = id;
    this.name = name;
    this.album = album;
    this.artist = artist;
    this.albumArt = albumArt;
    this.likes = likes;
    this.url = url;
  }
}
