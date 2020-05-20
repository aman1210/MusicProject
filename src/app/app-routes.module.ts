import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NowPlayingComponent } from "./now-playing/now-playing.component";
import { SearchComponent } from "./search/search.component";
import { AuthGuard } from "./auth/auth.guard";
import { PlaylistComponent } from "./playlist/playlist.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./home-page/home-page.module").then((m) => m.HomepageModule),
  },
  {
    path: "nowPlaying",
    component: NowPlayingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "search",
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "playlist",
    component: PlaylistComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoute {}
