import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Song } from '../shared/song.model';
import { SongService } from '../shared/song.service';
import { ArtistService } from '../shared/artist/artist.service';
import { Artist } from '../shared/artist/artist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  search = '';
  default = 'song';
  songs: Song[];
  FoundSong: Song[] = [];
  artists: Artist[];
  FoundArtist: Artist[] = [];
  constructor(
    private songService: SongService,
    private artistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.songs = this.songService.getSongs();
    this.artists = this.artistService.getArtists();
  }

  onSearch() {
    this.FoundSong = [];
    this.FoundArtist = [];
    if (this.search != '') {
      if (this.default === 'song') {
        for (var i in this.songs) {
          const sname = this.songs[i].name.toLowerCase();
          if (
            sname.substr(0, this.search.length) === this.search.toLowerCase()
          ) {
            this.FoundSong.push(this.songs[i]);
          }
        }
      } else {
        for (var i in this.artists) {
          const aname = this.artists[i].artist.toLowerCase();
          if (
            aname.substr(0, this.search.length) === this.search.toLowerCase()
          ) {
            this.FoundArtist.push(this.artists[i]);
          }
        }
      }
    }
  }

  onSongClick(song: Song) {
    this.router.navigate(['/nowPlaying'], { queryParams: { name: song.name } });
  }

  onArtistClick(artist: Artist) {
    this.router.navigate(['/artist'], { queryParams: { name: artist.artist } });
  }
}
