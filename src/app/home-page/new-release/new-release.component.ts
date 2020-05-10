import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/shared/song.model';
import { SongService } from 'src/app/shared/song.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/dataStorage.service';

@Component({
  selector: 'app-new-release',
  templateUrl: './new-release.component.html',
  styleUrls: ['./new-release.component.css'],
})
export class NewReleaseComponent implements OnInit, OnDestroy {
  songs: Song[];
  showingForm = false;
  private sChanged: Subscription;
  constructor(
    private songService: SongService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.songs = this.songService.getSongs();
    this.sChanged = this.songService.songsChanged.subscribe((songs: Song[]) => {
      this.songs = songs;
    });
  }

  onSelect(song) {
    this.router.navigate(['nowPlaying'], { queryParams: { name: song.name } });
  }

  onNew() {
    this.router.navigate(['./add']);
  }

  onSave() {
    this.dataStorageService.SaveSongs();
  }

  showForm() {
    this.showingForm = true;
  }

  onCancel() {
    this.showingForm = false;
  }

  ngOnDestroy() {
    this.sChanged.unsubscribe();
  }
}
