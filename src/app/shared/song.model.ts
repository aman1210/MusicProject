export class Song {
  public name: string;
  public artist: string;
  public album: string;
  public albumArt: string;
  public likes: number;
  public url: string;

  constructor(
    name: string,
    artist: string,
    album: string,
    albumArt: string,
    url: string,
    likes?: number
  ) {
    this.name = name;
    this.album = album;
    this.artist = artist;
    this.albumArt = albumArt;
    this.likes = likes;
    this.url = url;
  }
}
