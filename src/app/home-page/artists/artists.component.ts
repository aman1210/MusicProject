import { Component, OnInit } from "@angular/core";
import { ArtistService } from "src/app/shared/artist/artist.service";
import { Artist } from "src/app/shared/artist/artist.model";
import { Subscription } from "rxjs";
import { Song } from "src/app/shared/song.model";
import { SongService } from "src/app/shared/song.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-artists",
  templateUrl: "./artists.component.html",
  styleUrls: ["./artists.component.css"],
})
export class ArtistsComponent implements OnInit {
  artists: Artist[];
  songs: Song[];
  private aChanged: Subscription;
  private sChanged: Subscription;
  constructor(
    private artistService: ArtistService,
    private songService: SongService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.songs = this.songService.getSongs();
    this.sChanged = this.songService.songsChanged.subscribe((songs: Song[]) => {
      this.songs = songs;
      for (var i in this.songs) {
        this.artistService.addArtists(this.songs[i]);
      }
    });
  }

  ngOnInit(): void {
    // this.artists = this.artistService.getArtists();
    this.aChanged = this.artistService.artistChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
      }
    );
    this.route.queryParams.subscribe((params) => {
      if (params) {
        setTimeout(() => {
          for (var i in this.artists) {
            if (this.artists[i].artist === params.name) {
              this.fetchSong(this.artists[i]);
            }
          }
        }, 2000);
      }
    });
  }

  fetchSong(artist: Artist) {
    let songsFound: Song[] = [];
    this.songs.some((el) => {
      if (el.artist === artist.artist) {
        songsFound.push(el);
        this.artistService.addSongs(artist, songsFound);
      }
    });
    this.router.navigate(["artist"], { queryParams: { name: artist.artist } });
  }
}
