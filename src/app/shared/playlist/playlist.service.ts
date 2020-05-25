import { Injectable } from "@angular/core";
import { SongService } from "../song.service";
import { Song } from "../song.model";
import { Subject, of } from "rxjs";
import { DataStorageService } from "../dataStorage.service";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({ providedIn: "root" })
export class PlaylistService {
  private songs: Song[];
  private playlist: Song[] = [];
  playlistSongsId: string[] = [];
  playlistIdChanged = new Subject<string[]>();
  constructor(
    private songService: SongService,
    private authService: AuthService
  ) {}

  getIdlist() {
    return this.playlistSongsId;
  }

  getstream() {
    return of(this.playlist);
  }

  addSong(song: Song) {
    if (this.playlistSongsId.includes(song._id)) {
      return;
    }
    this.playlistSongsId.push(song._id);
    this.playlistIdChanged.next(this.playlistSongsId);
  }

  deleteSong(song: Song) {
    for (var i in this.playlistSongsId) {
      if (this.playlistSongsId[i] === song._id) {
        this.playlistSongsId.splice(+i, 1);
        this.playlistIdChanged.next(this.playlistSongsId);
      }
    }
  }

  setSongs() {
    this.playlistSongsId = this.authService.playlist;
    this.playlistIdChanged.next(this.playlistSongsId);
  }
}
