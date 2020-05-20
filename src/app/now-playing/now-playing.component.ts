import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "../shared/song.service";
import { Song } from "../shared/song.model";
import { StreamState } from "../shared/playing-state";
import { NowPlayingService } from "../shared/nowPlaying.service";
import {
  ActivatedRouteSnapshot,
  Params,
  ActivatedRoute,
} from "@angular/router";
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
  songs: Song[] = [];
  currentFile: any = {};
  state: StreamState;
  isPlaylist = false;
  private playlistSub: Subscription;
  private songsSub: Subscription;
  songDetail: Song = {
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
    private router: ActivatedRoute,
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {
    // playlistService.getstream().subscribe((songs) => {
    //   this.songs = songs;
    //   // this.isPlaylist = true;
    // });
    // if (this.songs.length > 0) {
    //   this.isPlaylist = true;
    // }
    // if (this.songs.length === 0) {
    //   songService.getStream().subscribe((songs) => {
    //     this.songs = songs;
    //   });
    // }
    // this.nowPlayingService.getState().subscribe((state) => {
    //   this.state = state;
    // });
  }

  ngOnInit(): void {
    // console.log('ngonit');
    this.playlistSub = this.playlistService.getstream().subscribe((songs) => {
      this.songs = songs;
      // this.isPlaylist = true;
    });
    if (this.songs.length > 0) {
      this.isPlaylist = true;
    }
    if (this.songs.length === 0) {
      this.songsSub = this.songService.getStream().subscribe((songs) => {
        this.songs = songs;
      });
    }
    this.nowPlayingService.getState().subscribe((state) => {
      this.state = state;
    });
    this.dataStorage.FetchSongs().subscribe();
    const index = +this.router.queryParams.subscribe((params) => {
      if (params) {
        for (var i in this.songs) {
          if (this.songs[i].name == params.name) {
            this.openSong(this.songs[i], parseInt(i));
          }
        }
      }
    });
    this.authService.user.subscribe((user) => {
      if (!user) {
        this.stop();
      }
    });
  }

  playStream(url) {
    this.nowPlayingService.playStream(url).subscribe((events) => {
      // console.log('listening');
    });
  }

  like() {
    this.songDetail.likes += 1;
    this.isLiked = true;
    // console.log(this.songDetail);
    // console.log(this.songDetail.likes);
    this.songService.changeInSongs(this.songDetail);
    this.dataStorage.SaveSongs();
  }

  openSong(song, index) {
    this.currentFile = { index, song };
    this.nowPlayingService.stop();
    this.songDetail = song;
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

  ngOnDestroy() {
    this.playlistSub.unsubscribe();
    this.songsSub.unsubscribe();
  }
}
