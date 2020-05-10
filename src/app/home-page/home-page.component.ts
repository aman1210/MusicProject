import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.dataStorage.FetchSongs().subscribe();
    this.dataStorage.FetchArtists().subscribe();
  }
}
