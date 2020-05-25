import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (innerWidth < 992) {
      this.hide = true;
    }
    this.isAuth = this.authService.getIsAuthenticated();
    this.userSub = this.authService.authListener.subscribe((user) => {
      this.isAuth = user;
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
