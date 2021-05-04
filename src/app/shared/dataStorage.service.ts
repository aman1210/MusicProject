import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SongService } from "./song.service";
import { tap } from "rxjs/operators";
import { Song } from "./song.model";
import { ArtistService } from "./artist/artist.service";
import { Artist } from "./artist/artist.model";
import { environment } from "../../environments/environment";

import { AuthService } from "../auth/auth.service";

const BACKEND_URL = environment.apiUrl;

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private songService: SongService,
    private authService: AuthService,
    private artistService: ArtistService
  ) {}

  SaveSongs(song) {
    this.http.post(BACKEND_URL + "/songs", song).subscribe((response) => {});
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
        BACKEND_URL + "/songs/" + song._id,
        data
      )
      .subscribe((resData) => {
        console.log(resData);
        this.authService.updateliked(resData.liked);
      });
  }

  FetchSongs() {
    return this.http
      .get<{ message: string; songs: Song[] }>(BACKEND_URL + "/songs")
      .pipe(
        tap((songs) => {
          this.songService.setSongs(songs.songs);
        })
      );
  }

  SaveArtistDetail(artist: Artist) {
    this.http
      .put(BACKEND_URL + "/artists/" + artist._id, artist)
      .subscribe((resData) => {});
  }

  FetchArtists() {
    return this.http
      .get<{ message: string; artist: Artist[] }>(BACKEND_URL + "/artists")
      .pipe(
        tap((resData) => {
          this.artistService.setArtists(resData.artist);
        })
      );
  }

  FetchOneArtist(id: string) {
    return this.http
      .get(BACKEND_URL + "/artists/" + id)
      .pipe(tap((resData) => {}));
  }

  SavePlaylist(playlist: string[]) {
    this.http
      .put(BACKEND_URL + "/users/playlist", playlist)
      .subscribe((resData) => {});
  }
}
