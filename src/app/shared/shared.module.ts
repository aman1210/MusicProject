import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinner } from "./loadingSpinner/loading-spinner.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AlertComponent, LoadingSpinner],
  imports: [CommonModule],
  exports: [AlertComponent, LoadingSpinner, CommonModule],
})
export class SharedModule {}
