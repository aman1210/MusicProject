import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BackgroundSliderComponent } from './home-page/background-slider/background-slider.component';
import { WeekTopComponent } from './home-page/week-top/week-top.component';
import { ArtistsComponent } from './home-page/artists/artists.component';
import { SongService } from './shared/song.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoute } from './app-routes.module';
import { NewSongComponent } from './home-page/new-song/new-song.component';
import { NewReleaseComponent } from './home-page/new-release/new-release.component';
import { DataStorageService } from './shared/dataStorage.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { ArtistService } from './shared/artist/artist.service';
import { ArtistDetailsComponent } from './home-page/artists/artist-details/artist-details.component';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingSpinner } from './shared/loadingSpinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BackgroundSliderComponent,
    NewReleaseComponent,
    WeekTopComponent,
    ArtistsComponent,
    NowPlayingComponent,
    HomePageComponent,
    NewSongComponent,
    AuthComponent,
    ArtistDetailsComponent,
    SearchComponent,
    AlertComponent,
    LoadingSpinner,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoute,
    HttpClientModule,
    NgPipesModule,
  ],
  providers: [SongService, DataStorageService, ArtistService],
  bootstrap: [AppComponent],
})
export class AppModule {}
