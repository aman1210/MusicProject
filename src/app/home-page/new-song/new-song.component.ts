import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Song } from "src/app/shared/song.model";
import { SongService } from "src/app/shared/song.service";
import { Router } from "@angular/router";
import { DataStorageService } from "src/app/shared/dataStorage.service";

@Component({
  selector: "app-new-song",
  templateUrl: "./new-song.component.html",
  styleUrls: ["./new-song.component.css"],
})
export class NewSongComponent implements OnInit {
  albumArt: string = "";

  constructor(
    private songService: SongService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {}

  onSubmit(submittedForm: NgForm) {
    const newSong: Song = {
      _id: null,
      name: submittedForm.value.name,
      album: submittedForm.value.album,
      albumArt: submittedForm.value.albumArt,
      artist: submittedForm.value.artist,
      url: submittedForm.value.url,
      likes: 0,
    };
    this.songService.addSong(newSong);
    this.dataStorageService.SaveSongs(newSong);
    this.dataStorageService.FetchArtists().subscribe((resData) => {
      // console.log(resData);
    });
    this.router.navigate([""]);
    window.location.reload();
  }
}
