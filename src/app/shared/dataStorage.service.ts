import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SongService } from "./song.service";
import { tap } from "rxjs/operators";
import { Song } from "./song.model";
import { ArtistService } from "./artist/artist.service";
import { Artist } from "./artist/artist.model";

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private songService: SongService,
    private artistService: ArtistService
  ) {}

  SaveSongs() {
    const songs = this.songService.getSongs();
    // console.log(songs);
    this.http
      .put("https://musicproject-7079f.firebaseio.com/songs.json", songs)
      .subscribe((response) => {
        console.log(response);
      });
  }

  FetchSongs() {
    return this.http
      .get<Song[]>("https://musicproject-7079f.firebaseio.com/songs.json")
      .pipe(
        tap((songs) => {
          this.songService.setSongs(songs);
          // console.log(songs);
        })
      );
  }

  SaveArtists() {
    const artists = this.artistService.getArtists();
    this.http
      .put("https://musicproject-7079f.firebaseio.com/artist.json", artists)
      .subscribe((response) => {
        console.log(response);
      });
  }

  FetchArtists() {
    return this.http
      .get<Artist[]>("https://musicproject-7079f.firebaseio.com/artist.json")
      .pipe(
        tap((artists) => {
          this.artistService.setArtists(artists);
        })
      );
  }
}
