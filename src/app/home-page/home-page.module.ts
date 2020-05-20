import { NgModule } from "@angular/core";
import { BackgroundSliderComponent } from "./background-slider/background-slider.component";
import { HomePageComponent } from "./home-page.component";

import { NgPipesModule } from "ngx-pipes";
import { FormsModule } from "@angular/forms";
import { NewSongComponent } from "./new-song/new-song.component";
import { HomepageRoutesModule } from "./home-page-route.module";
import { ArtistsComponent } from "./artists/artists.component";
import { ArtistDetailsComponent } from "./artists/artist-details/artist-details.component";
import { NewReleaseComponent } from "./new-release/new-release.component";
import { WeekTopComponent } from "./week-top/week-top.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    HomePageComponent,
    BackgroundSliderComponent,
    ArtistsComponent,
    ArtistDetailsComponent,
    NewReleaseComponent,
    NewSongComponent,
    WeekTopComponent,
  ],
  imports: [SharedModule, FormsModule, NgPipesModule, HomepageRoutesModule],
})
export class HomepageModule {}
