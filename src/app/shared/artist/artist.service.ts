import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song.model';
import { Artist } from './artist.model';
import { Subscription, Subject } from 'rxjs';

@Injectable()
export class ArtistService {
  artistChanged = new Subject<Artist[]>();
  songs: Song[];

  constructor(private songService: SongService) {}

  private artist: Artist[] = [
    // new Artist('Imagine Dragons'),
    // new Artist('Linkin Park'),
  ];

  FoundArtist: Artist = null;

  getArtists() {
    return this.artist.slice();
  }

  addArtists(song: Song) {
    const found = this.artist.some((el) => {
      if (el.artist === song.artist) {
        this.FoundArtist = el;
        return el.artist === song.artist;
      }
    });
    if (found) {
      // this.addsong(this.FoundArtist, song);
      // console.log('found');
    } else {
      const newA = new Artist(song.artist);
      this.artist.push(newA);
      this.artistChanged.next(this.artist.slice());
    }
  }
  addSongs(artist: Artist, songs: Song[]) {
    // console.log('hello');
    artist.songs = songs;
    this.artistChanged.next(this.artist.slice());
    // console.log(this.artist);
  }

  setArtists(artists: Artist[]) {
    this.artist = artists;
    this.artistChanged.next(this.artist.slice());
  }
}
