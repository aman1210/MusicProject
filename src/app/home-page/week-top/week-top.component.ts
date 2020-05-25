import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "../../shared/song.service";
import { Song } from "../../shared/song.model";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NowPlayingService } from "src/app/shared/nowPlaying.service";

@Component({
  selector: "app-week-top",
  templateUrl: "./week-top.component.html",
  styleUrls: ["./week-top.component.css"],
})
export class WeekTopComponent implements OnInit, OnDestroy {
  isLoading = false;
  songs: Song[];
  private sChanged: Subscription;
  constructor(
    private songService: SongService,
    private nowPlayingService: NowPlayingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sChanged = this.songService.songsChanged.subscribe((songs: Song[]) => {
      this.songs = songs;
      this.songs = this.songs.sort((a, b) => b.likes - a.likes);
      this.songs = this.songs.slice(0, 9);
      this.isLoading = false;
    });
  }

  onSelect(song, i) {
    this.nowPlayingService.setplaylist(false);
    this.router.navigate(["nowPlaying", song._id]);
  }

  ngOnDestroy() {
    this.sChanged.unsubscribe();
  }
}
