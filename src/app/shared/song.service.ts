import { Song } from './song.model';
import { of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SongService {
  songsChanged = new Subject<Song[]>();
  private songs: Song[] = [];

  setSongs(songs: Song[]) {
    this.songs = songs;
    // console.log(songs);
    this.songsChanged.next(this.songs.slice());
  }

  getSongs() {
    return this.songs.slice();
  }

  getStream() {
    const s = this.getWeekTop();
    return of(s);
  }
  getWeekTop() {
    let s = this.getSongs();
    return s.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  addSong(song: Song) {
    this.songs.push(song);
    this.songsChanged.next(this.getSongs().slice());
  }
}
