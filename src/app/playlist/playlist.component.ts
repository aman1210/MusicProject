import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlaylistService } from "../shared/playlist/playlist.service";
import { Song } from "../shared/song.model";
import { Router } from "@angular/router";
import { DataStorageService } from "../shared/dataStorage.service";
import { SongService } from "../shared/song.service";
import { AuthService } from "../auth/auth.service";
import { NowPlayingService } from "../shared/nowPlaying.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist: Song[] = [];
  playlistId: string[] = [];
  private songs: Song[] = [];
  showSaveButton = false;
  isLoading = false;
  playlistSubs: Subscription;
  songsSubs: Subscription;
  constructor(
    private playlistService: PlaylistService,
    private dataStorageService: DataStorageService,
    private nowPlayingService: NowPlayingService,
    private authService: AuthService,
    private songService: SongService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.playlistId = this.playlistService.getIdlist();
    // if (this.playlistId.length != 0) {
    //   this.showSaveButton = true;
    // }
    this.songs = this.songService.getSongs();
    if (this.songs.length != 0) {
      this.getSongs();
      this.isLoading = false;
    }
    this.playlistSubs = this.playlistService.playlistIdChanged.subscribe(
      (id) => {
        this.playlistId = id;
        this.getSongs();
      }
    );
    this.songsSubs = this.songService.songsChanged.subscribe(
      (songs: Song[]) => {
        this.songs = songs;
        this.getSongs();
        this.isLoading = false;
      }
    );
    // if (this.playlistId.length == 0) {
    //   window.location.reload();
    // }
  }

  onSave() {
    this.dataStorageService.SavePlaylist(this.playlistId);
    this.authService.updatePlaylist(this.playlistId);
    this.showSaveButton = false;
  }

  onSelect(song: Song) {
    this.nowPlayingService.setplaylist(true);
    this.router.navigate(["nowPlaying/playlist", song._id]);
  }

  onDelete(song: Song, index: number) {
    this.playlistService.deleteSong(song);
  }

  ngOnDestroy() {
    this.playlistSubs.unsubscribe();
    this.songsSubs.unsubscribe();
  }

  private getSongs() {
    this.playlist = [];
    if (this.playlistId.length == 0) {
      return;
    } else {
      for (var i = 0; i < this.playlistId.length; i++) {
        this.songs.some((song) => {
          if (song._id === this.playlistId[i]) {
            this.playlist.push(song);
          }
        });
      }
    }
  }
}
