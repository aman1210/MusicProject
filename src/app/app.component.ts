import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "./shared/dataStorage.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { PlaylistService } from "./shared/playlist/playlist.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "MusicProject";
  constructor(
    private dataStorage: DataStorageService,
    public router: Router,
    private authService: AuthService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    // this.router.navigate([""]);
    this.authService.autoLoginUser();
    this.dataStorage.FetchSongs().subscribe();
    this.dataStorage.FetchArtists().subscribe();
    this.playlistService.setSongs();
    // this.dataStorage.FetchSongs().subscribe();
  }
}
