import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NowPlayingModule } from "./now-playing/now-playing.module";

import { AppRoute } from "./app-routes.module";

import { AppComponent } from "./app.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { SearchComponent } from "./search/search.component";

import { SongService } from "./shared/song.service";
import { DataStorageService } from "./shared/dataStorage.service";
import { ArtistService } from "./shared/artist/artist.service";
// import { HomepageModule } from "./home-page/home-page.module";
import { NgPipesModule } from "ngx-pipes";
import { SharedModule } from "./shared/shared.module";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { FavoriteComponent } from "./favorite/favorite.component";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    PlaylistComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgPipesModule,
    AppRoute,
    HttpClientModule,
    NowPlayingModule,
    MaterialModule,
    // HomepageModule,
    SharedModule,
  ],
  providers: [
    SongService,
    DataStorageService,
    ArtistService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
