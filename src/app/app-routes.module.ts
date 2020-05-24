import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NowPlayingComponent } from "./now-playing/now-playing.component";
import { SearchComponent } from "./search/search.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { AuthComponent } from "./auth/auth.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./home-page/home-page.module").then((m) => m.HomepageModule),
  },
  {
    path: "nowPlaying",
    canActivate: [AuthGuard],
    component: NowPlayingComponent,
    children: [
      {
        path: ":id",
        component: NowPlayingComponent,
      },
      {
        path: "playlist/:id",
        component: NowPlayingComponent,
      },
    ],
  },
  {
    path: "search",
    canActivate: [AuthGuard],
    component: SearchComponent,
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "favorites",
    canActivate: [AuthGuard],
    component: FavoriteComponent,
  },
  {
    path: "playlist",
    canActivate: [AuthGuard],
    component: PlaylistComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoute {}
