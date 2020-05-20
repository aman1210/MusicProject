import { NgModule } from "@angular/core";
import { NowPlayingComponent } from "./now-playing.component";
import { MaterialModule } from "../material.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [NowPlayingComponent],
  imports: [CommonModule, MaterialModule],
})
export class NowPlayingModule {}
