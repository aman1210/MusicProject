import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page.component";
import { AuthGuard } from "../auth/auth.guard";
import { NewReleaseComponent } from "./new-release/new-release.component";
import { NewSongComponent } from "./new-song/new-song.component";
import { ArtistDetailsComponent } from "./artists/artist-details/artist-details.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: NewReleaseComponent,
      },
      {
        path: "add",
        component: NewSongComponent,
      },
      {
        path: "artist",
        component: ArtistDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutesModule {}
