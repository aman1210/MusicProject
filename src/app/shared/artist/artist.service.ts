import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { SongService } from "../song.service";
import { Song } from "../song.model";
import { Artist } from "./artist.model";
import { Subscription, Subject } from "rxjs";
import { DataStorageService } from "../dataStorage.service";

@Injectable()
export class ArtistService {
  artistChanged = new Subject<Artist[]>();
  songs: Song[];

  constructor(private songService: SongService) {}

  private artist: Artist[] = [];

  FoundArtist: Artist = null;

  getArtists() {
    return this.artist.slice();
  }

  updatelist() {
    // this.dataService.FetchArtists();
  }

  updateArtists(artists: Artist[]) {
    this.artist = artists;
    return this.artistChanged.next(this.artist.slice());
  }

  setArtists(artists: Artist[]) {
    this.artist = artists;
    this.artistChanged.next(this.artist.slice());
  }
}
