import { Component, OnInit, HostListener, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/dataStorage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  innerWidth: number;
  hide: boolean = false;
  artistSubs: Subscription;
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (innerWidth < 992) {
      this.hide = true;
    }
    this.dataStorage.FetchSongs().subscribe();
    this.artistSubs = this.dataStorage.FetchArtists().subscribe();
  }

  ngOnDestroy() {
    // console.log("destroying");
    // this.artistSubs.unsubscribe();
  }
}
