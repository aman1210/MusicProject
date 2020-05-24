import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { stringify } from "querystring";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoading = false;
  isLoginMode = true;
  errormsg: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.errorLis.subscribe((error) => {
      this.errormsg = error;
      this.isLoading = false;
    });
  }

  onSwtichMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    if (!this.isLoginMode) {
      this.authService.createUser(email, password);
    } else {
      this.authService.loginUser(email, password);
    }
    form.reset();
  }
  onHandleError() {
    this.errormsg = null;
  }
}
