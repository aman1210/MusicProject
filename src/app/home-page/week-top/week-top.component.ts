import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "../../shared/song.service";
import { Song } from "../../shared/song.model";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-week-top",
  templateUrl: "./week-top.component.html",
  styleUrls: ["./week-top.component.css"],
})
export class WeekTopComponent implements OnInit, OnDestroy {
  isLoading = false;
  songs: Song[];
  private sChanged: Subscription;
  constructor(private songService: SongService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sChanged = this.songService.songsChanged.subscribe((songs: Song[]) => {
      this.songs = songs;
      this.songs = this.songs.sort((a, b) => b.likes - a.likes);
      this.songs = this.songs.slice(0, 10);
      this.isLoading = false;
    });
  }

  onSelect(song, i) {
    // console.log('called');
    this.router.navigate(["nowPlaying"], {
      queryParams: { name: song.name },
    });
  }

  ngOnDestroy() {
    this.sChanged.unsubscribe();
  }
}
