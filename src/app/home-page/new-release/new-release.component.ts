import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Song } from "src/app/shared/song.model";
import { SongService } from "src/app/shared/song.service";
import { Subscription } from "rxjs";
import { DataStorageService } from "src/app/shared/dataStorage.service";
import { PlaylistService } from "src/app/shared/playlist/playlist.service";

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
    private dataStorageService: DataStorageService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.songs = this.songService.getSongs();
    this.sChanged = this.songService.songsChanged.subscribe((songs: Song[]) => {
      this.songs = this.songService.getSongs();
      this.isLoading = false;
    });
  }

  onSelect(song: Song) {
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
