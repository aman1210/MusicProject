import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArtistService } from "src/app/shared/artist/artist.service";
import { Artist } from "src/app/shared/artist/artist.model";
import { Song } from "src/app/shared/song.model";
import { NgForm } from "@angular/forms";
import { DataStorageService } from "src/app/shared/dataStorage.service";

@Component({
  selector: "app-artist-details",
  templateUrl: "./artist-details.component.html",
  styleUrls: ["./artist-details.component.css"],
})
export class ArtistDetailsComponent implements OnInit {
  song: Song[] = null;
  FoundArtist: Artist = null;
  hasArtistImage = true;
  showForm = false;
  isLoading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      this.dataStorage
        .FetchOneArtist(params["id"])
        .subscribe((artist: Artist) => {
          this.FoundArtist = artist;
          if (!this.FoundArtist.artistImage) {
            this.hasArtistImage = false;
          } else {
            this.hasArtistImage = true;
          }
          this.isLoading = false;
        });
    });
  }

  onAdd() {
    this.hasArtistImage = true;
    this.showForm = true;
  }

  onCancel() {
    this.showForm = false;
    this.hasArtistImage = false;
  }

  onSelect(song) {
    this.router.navigate(["nowPlaying"], { queryParams: { name: song.name } });
  }
  onSubmit(submittedForm: NgForm) {
    const artistImage = submittedForm.value.url;
    this.FoundArtist.artistImage = artistImage;
    this.dataStorage.SaveArtistDetail(this.FoundArtist);
    window.location.reload();
    this.hasArtistImage = true;
    this.showForm = false;
  }
}
