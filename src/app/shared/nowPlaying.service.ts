import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { StreamState } from "./playing-state";
import { Song } from "./song.model";

@Injectable({ providedIn: "root" })
export class NowPlayingService {
  private stop$ = new Subject();
  private audioObj = new Audio();
  findSong = new Subject<{ song: Song; index: number }>();
  currentSong: Song = null;
  currentIndex: number = null;
  playlist: boolean;
  isPlaylist = new Subject<boolean>();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart",
  ];
  private state: StreamState = {
    playing: false,
    readableCurrentTime: "",
    readableDuration: "",
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
    index: undefined,
  };

  private streamObservable(url) {
    return new Observable((observer) => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        this.resetState();
      };
    });
  }

  getIsPlaying() {
    return this.playlist;
  }

  setplaylist(bool: boolean) {
    this.playlist = bool;
    this.isPlaylist.next(this.playlist);
  }

  setSong(song: Song, index: number) {
    this.currentSong = song;
    this.currentIndex = index;
    return this.findSong.next({
      song: this.currentSong,
      index: this.currentIndex,
    });
  }
  getsong() {
    return this.currentSong;
  }

  getIndex() {
    return this.currentIndex;
  }

  private addEvents(obj, events, handler) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: "",
      readableDuration: "",
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
      index: undefined,
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  playStream(url) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }
}
