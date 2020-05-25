import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Song } from "src/app/shared/song.model";
import { SongService } from "src/app/shared/song.service";
import { Subscription } from "rxjs";

import { PlaylistService } from "src/app/shared/playlist/playlist.service";
import { NowPlayingService } from "src/app/shared/nowPlaying.service";

@Component({
  selector: "app-new-release",
  templateUrl: "./new-release.component.html",
  styleUrls: ["./new-release.component.css"],
})
export class NewReleaseComponent implements OnInit, OnDestroy {
  isLoading = false;
  songs: Song[];
  showingForm = false;
  private sChanged: Subscription;
  constructor(
    private songService: SongService,
    private router: Router,
    private playlistService: PlaylistService,
    private nowPlayingService: NowPlayingService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.songs = this.songService.getSongs();
    if (this.songs.length != 0) {
      this.isLoading = false;
    }
    this.sChanged = this.songService.songsChanged.subscribe((songs: Song[]) => {
      this.songs = this.songService.getSongs();
      this.isLoading = false;
    });
  }

  onSelect(song: Song) {
    this.nowPlayingService.setplaylist(false);
    this.router.navigate(["nowPlaying", song._id]);
  }

  onAddPlaylist(song: Song) {
    this.playlistService.addSong(song);
  }

  onNew() {
    this.router.navigate(["./add"]);
  }

  showForm() {
    this.showingForm = true;
  }

  onCancel() {
    this.showingForm = false;
  }

  ngOnDestroy() {
    this.sChanged.unsubscribe();
  }
}
