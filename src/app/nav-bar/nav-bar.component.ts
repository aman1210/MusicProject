import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuth = false;
  private userSub: Subscription;
  innerWidth: number;
  hide: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (innerWidth < 992) {
      this.hide = true;
    }
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = !user ? false : true;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
