import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SongService } from "./song.service";
import { tap } from "rxjs/operators";
import { Song } from "./song.model";
import { ArtistService } from "./artist/artist.service";
import { Artist } from "./artist/artist.model";

import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private songService: SongService,
    private authService: AuthService,
    private artistService: ArtistService
  ) {}

  SaveSongs(song) {
    this.http
      .post("http://localhost:3000/api/songs", song)
      .subscribe((response) => {});
  }

  UpdateSong(song: Song, liked: boolean) {
    const likes = this.authService.liked;
    if (liked) {
      if (!likes.includes(song._id)) {
        likes.push(song._id);
      }
    } else {
      for (var i in likes) {
        if (likes[i] == song._id) {
          likes.splice(+i, 1);
        }
      }
    }
    console.log(likes);
    const data = { song, likes };
    this.http
      .put<{ message: string; liked: string[] }>(
        "http://localhost:3000/api/songs/" + song._id,
        data
      )
      .subscribe((resData) => {
        console.log(resData);
        this.authService.updateliked(resData.liked);
      });
  }

  FetchSongs() {
    return this.http
      .get<{ message: string; songs: Song[] }>(
        "http://localhost:3000/api/songs"
      )
      .pipe(
        tap((songs) => {
          this.songService.setSongs(songs.songs);
        })
      );
  }

  SaveArtists() {
    const artists = this.artistService.getArtists();
    this.http
      .put("https://musicproject-7079f.firebaseio.com/artist.json", artists)
      .subscribe((response) => {});
  }

  SaveArtistDetail(artist: Artist) {
    this.http
      .put("http://localhost:3000/api/artists/" + artist._id, artist)
      .subscribe((resData) => {});
  }

  FetchArtists() {
    return this.http
      .get<{ message: string; artist: Artist[] }>(
        "http://localhost:3000/api/artists"
      )
      .pipe(
        tap((resData) => {
          this.artistService.setArtists(resData.artist);
        })
      );
  }

  FetchOneArtist(id: string) {
    return this.http
      .get("http://localhost:3000/api/artists/" + id)
      .pipe(tap((resData) => {}));
  }

  SavePlaylist(playlist: string[]) {
    this.http
      .put("http://localhost:3000/api/users/playlist", playlist)
      .subscribe((resData) => {});
  }
}
