import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { NewSongComponent } from './home-page/new-song/new-song.component';
import { NewReleaseComponent } from './home-page/new-release/new-release.component';
import { AuthComponent } from './auth/auth.component';
import { ArtistDetailsComponent } from './home-page/artists/artist-details/artist-details.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NewReleaseComponent,
      },
      {
        path: 'add',
        component: NewSongComponent,
      },
      {
        path: 'artist',
        component: ArtistDetailsComponent,
      },
    ],
  },
  {
    path: 'nowPlaying',
    component: NowPlayingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoute {}
