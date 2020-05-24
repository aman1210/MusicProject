import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "../shared/song.service";
import { Song } from "../shared/song.model";
import { StreamState } from "../shared/playing-state";
import { NowPlayingService } from "../shared/nowPlaying.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataStorageService } from "../shared/dataStorage.service";
import { PlaylistService } from "../shared/playlist/playlist.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-now-playing",
  templateUrl: "./now-playing.component.html",
  styleUrls: ["./now-playing.component.scss"],
})
export class NowPlayingComponent implements OnInit, OnDestroy {
  index = 0;
  i = 2;
  songs: Song[] = [];
  currentFile: any = {};
  private playlistId: string[];
  private playlist: Song[] = [];
  isPlaylist: boolean = true;
  state: StreamState;
  private songsSub: Subscription;
  private userSub: Subscription;
  songDetail: Song = {
    _id: null,
    album: null,
    name: null,
    albumArt: null,
    url: null,
    likes: null,
    artist: null,
  };
  isLiked = false;

  constructor(
    public songService: SongService,
    public playlistService: PlaylistService,
    public nowPlayingService: NowPlayingService,
    private router: Router,
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.isPlaylist);
    this.songsSub = this.songService.getStream().subscribe((songs: Song[]) => {
      this.songs = songs;
      if (this.songs.length === 0) {
        this.router.navigate([""]);
      }
    });
    const playlistUrl = this.router.url.split("/")[2];
    console.log(this.playlistId);
    if (playlistUrl === "playlist") {
      this.i = 3;
      this.isPlaylist = true;
      this.playlistId = this.playlistService.getIdlist();
      this.getSongs();
      this.playlistService.playlistIdChanged.subscribe((playlistId) => {
        this.playlistId = playlistId;
        this.getSongs();
      });
    } else {
      this.isPlaylist = false;
    }
    this.nowPlayingService.getState().subscribe((state) => {
      this.state = state;
    });

    const songRoute = this.router.url.split("/")[this.i];

    for (var i in this.songs) {
      if (this.songs[i]._id == this.router.url.split("/")[this.i]) {
        this.openSong(this.songs[i], +i);
      }
    }

    this.userSub = this.authService.authListener.subscribe((user) => {
      if (!user) {
        this.stop();
      }
    });
  }

  playStream(url) {
    this.nowPlayingService.playStream(url).subscribe((events) => {});
  }

  like() {
    this.songDetail.likes += 1;
    this.isLiked = true;
    this.dataStorage.UpdateSong(this.songDetail);
  }

  openSong(song, index) {
    this.index = index;
    this.isLiked = false;
    this.currentFile = { index, song };
    this.nowPlayingService.stop();
    this.songDetail = song;
    if (this.authService.liked.includes(this.songDetail._id)) {
      this.isLiked = true;
    }
    this.playStream(song.url);
  }

  pause() {
    this.nowPlayingService.pause();
  }
  play() {
    this.nowPlayingService.play();
  }
  stop() {
    this.nowPlayingService.stop();
  }
  next() {
    const index = this.currentFile.index + 1;
    const file = this.songs[index];
    this.openSong(file, index);
  }
  previous() {
    const index = this.currentFile.index - 1;
    const file = this.songs[index];
    this.openSong(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.songs.length - 1;
  }
  onSliderChangeEnd(change) {
    this.nowPlayingService.seekTo(change.value);
  }

  getSongs() {
    if (this.playlistId.length == 0) {
      return;
    }
    for (var i = 0; i < this.playlistId.length; i++) {
      this.songs.some((song) => {
        if (song._id === this.playlistId[i]) {
          this.playlist.push(song);
        }
      });
    }
    this.songs = this.playlist;
    // this.isPlaylist = true;
  }

  ngOnDestroy() {
    this.songsSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
