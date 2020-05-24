import { Component, OnInit, OnDestroy } from "@angular/core";
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
export class ArtistsComponent implements OnInit, OnDestroy {
  isLoading = false;
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
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.aChanged = this.artistService.artistChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        this.isLoading = false;
      }
    );
  }

  fetchSong(artist: Artist) {
    this.router.navigate(["artist", artist._id]);
  }

  ngOnDestroy() {
    this.aChanged.unsubscribe();
  }
}
