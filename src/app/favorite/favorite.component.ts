import {
  Component,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { SongService } from "../shared/song.service";
import { Song } from "../shared/song.model";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  templateUrl: "favorite.component.html",
  styleUrls: ["favorite.component.css"],
})
export class FavoriteComponent implements OnInit, OnDestroy {
  songs: Song[];
  likedSongList: Song[] = [];
  likedSongId: string[] = null;
  private likedSubs: Subscription;
  private songsSubs: Subscription;
  constructor(
    private authService: AuthService,
    private songService: SongService,
    private router: Router
  ) {}

  ngOnInit() {
    this.likedSongId = this.authService.liked;
    this.songs = this.songService.getSongs();
    if (this.songs.length != 0) {
      this.getSongs();
    }
    this.likedSubs = this.authService.likedListener.subscribe((liked) => {
      this.likedSongId = liked;
    });
    this.songsSubs = this.songService.songsChanged.subscribe(
      (songs: Song[]) => {
        this.songs = songs;
        this.getSongs();
      }
    );
    // console.log(this.songs);
  }

  onSelect(song: Song) {
    this.router.navigate(["nowPlaying"], { queryParams: { name: song.name } });
  }

  ngOnDestroy() {
    this.likedSubs.unsubscribe();
    this.songsSubs.unsubscribe();
  }

  private getSongs() {
    for (var i = 0; i < this.likedSongId.length; i++) {
      this.songs.some((song) => {
        if (song._id === this.likedSongId[i]) {
          this.likedSongList.push(song);
        }
      });
    }
  }
}
