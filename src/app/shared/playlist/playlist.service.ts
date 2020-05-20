import { Injectable } from "@angular/core";
import { SongService } from "../song.service";
import { Song } from "../song.model";
import { Subject, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class PlaylistService {
  private playlist: Song[] = [];
  playlistChanged = new Subject<Song[]>();
  constructor(private songService: SongService) {}

  getlist() {
    return this.playlist.slice();
  }

  getstream() {
    return of(this.playlist);
  }

  addSong(song: Song) {
    this.playlist.push(song);
    this.playlistChanged.next(this.playlist.slice());
  }

  deleteSong(song: Song) {
    for (var i in this.playlist) {
      if (this.playlist[i].name === song.name) {
        this.playlist.splice(+i, 1);
        this.playlistChanged.next(this.playlist.slice());
      }
    }
  }
}
