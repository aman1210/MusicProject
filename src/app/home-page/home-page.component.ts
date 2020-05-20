import { Component, OnInit, HostListener } from "@angular/core";
import { DataStorageService } from "../shared/dataStorage.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  innerWidth: number;
  hide: boolean = false;
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (innerWidth < 992) {
      this.hide = true;
    }
    this.dataStorage.FetchSongs().subscribe();
    this.dataStorage.FetchArtists().subscribe();
  }
}
