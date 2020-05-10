import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from 'src/app/shared/artist/artist.service';
import { Artist } from 'src/app/shared/artist/artist.model';
import { Song } from 'src/app/shared/song.model';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/dataStorage.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
})
export class ArtistDetailsComponent implements OnInit {
  artist: Artist[];
  song: Song[];
  FoundArtist: Artist;
  hasArtistImage = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.artist = this.artistService.getArtists();
    this.route.queryParams.subscribe((params) => {
      for (var i in this.artist) {
        if (this.artist[i].artist === params.name) {
          this.FoundArtist = this.artist[i];
          this.hasArtistImage = true;
        }
      }
      if (this.FoundArtist.artistImage) {
        this.hasArtistImage = true;
      }
    });
  }

  onAdd() {
    this.hasArtistImage = false;
  }
  onSelect(song) {
    this.router.navigate(['nowPlaying'], { queryParams: { name: song.name } });
  }
  onSubmit(submittedForm: NgForm) {
    const artistImage = submittedForm.value.url;
    for (var i in this.artist) {
      if (this.artist[i].artist === this.FoundArtist.artist) {
        this.artist[i].artistImage = submittedForm.value.url;
        console.log(this.artist[i]);
        this.dataStorage.SaveArtists();
      }
    }
    this.hasArtistImage = true;
  }
}
