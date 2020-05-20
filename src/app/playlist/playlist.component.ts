import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "../shared/playlist/playlist.service";
import { Song } from "../shared/song.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"],
})
export class PlaylistComponent implements OnInit {
  playlist: Song[] = [];
  constructor(
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.playlist = this.playlistService.getlist();
    this.playlistService.playlistChanged.subscribe((songs) => {
      this.playlist = songs;
    });
  }

  onSelect(song: Song) {
    this.router.navigate(["nowPlaying"], { queryParams: { name: song.name } });
  }

  onDelete(song: Song) {
    this.playlistService.deleteSong(song);
  }
}
