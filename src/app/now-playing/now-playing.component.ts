import { Component, OnInit } from '@angular/core';
import { SongService } from '../shared/song.service';
import { Song } from '../shared/song.model';
import { StreamState } from '../shared/playing-state';
import { NowPlayingService } from '../shared/nowPlaying.service';
import {
  ActivatedRouteSnapshot,
  Params,
  ActivatedRoute,
} from '@angular/router';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss'],
})
export class NowPlayingComponent implements OnInit {
  songs: Song[];
  currentFile: any = {};
  state: StreamState;
  songDetail: Song = {
    album: null,
    name: null,
    albumArt: null,
    url: null,
    likes: null,
    artist: null,
  };

  constructor(
    public songService: SongService,
    public nowPlayingService: NowPlayingService,
    private router: ActivatedRoute,
    private dataStorage: DataStorageService
  ) {
    // console.log('constructor');
    songService.getStream().subscribe((songs) => {
      this.songs = songs;
    });
    this.nowPlayingService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    // console.log('ngonit');
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
  }

  playStream(url) {
    this.nowPlayingService.playStream(url).subscribe((events) => {
      // console.log('listening');
    });
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
}
