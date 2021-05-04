import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/users/";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;

  liked: string[] = null;
  playlist: string[] = null;
  public likedListener = new Subject<string[]>();
  public playlistListener = new Subject<string[]>();
  public errorLis = new Subject<string>();
  authListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  updateliked(liked: string[]) {
    this.liked = liked;
    this.likedListener.next(this.liked);
    localStorage.removeItem("liked");
    localStorage.setItem("liked", JSON.stringify(this.liked));
  }

  updatePlaylist(playlist: string[]) {
    this.playlist = playlist;
    this.playlistListener.next(this.playlist);
    localStorage.removeItem("playlist");
    localStorage.setItem("playlist", JSON.stringify(this.playlist));
  }

  createUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.http.post(BACKEND_URL + "signup", user).subscribe(
      (resData) => {
        this.errorLis.next("");
        this.playlist = [];
        this.liked = [];
        this.playlistListener.next(this.playlist);
        this.likedListener.next(this.liked);
        this.loginUser(email, password);
      },
      (error) => {
        this.errorLis.next(error.error.err.errors.email.message);
      }
    );
  }

  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        liked: string[];
        playlist: string[];
      }>(BACKEND_URL + "login", user)
      .subscribe(
        (resData) => {
          this.errorLis.next("");
          this.token = resData.token;

          if (resData.token) {
            this.userId = resData.userId;
            const expiresIn = resData.expiresIn * 3600;
            this.liked = resData.liked;
            this.playlist = resData.playlist;
            this.playlistListener.next(this.playlist);
            this.likedListener.next(this.liked);
            this.isAuthenticated = true;
            this.authListener.next(true);
            this.setAuthTimer(expiresIn);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn * 1000);
            this.saveAuthData(
              resData.token,
              expirationDate,
              this.userId,
              resData.liked,
              resData.playlist
            );

            this.router.navigate([""]);
          }
        },
        (error) => {
          this.authListener.next(false);
          this.errorLis.next(error.error.message);
        }
      );
  }

  autoLoginUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expiresIn.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.liked = authInfo.liked;
      this.playlist = authInfo.playlist;
      this.token = authInfo.token;
      this.userId = authInfo.userId;
      this.isAuthenticated = true;
      this.authListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  logoutUser() {
    this.token = null;
    this.authListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/auth"]);
  }

  private saveAuthData(
    token: string,
    expiresIn: Date,
    userId: string,
    liked: string[],
    playlist: string[]
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expiresIn.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("liked", JSON.stringify(liked));
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const userId = localStorage.getItem("userId");
    const liked = JSON.parse(localStorage.getItem("liked"));
    const playlist = JSON.parse(localStorage.getItem("playlist"));
    if (!token || !expiresIn) {
      return;
    }
    return {
      token: token,
      expiresIn: new Date(expiresIn),
      userId: userId,
      liked: liked,
      playlist: playlist,
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  private clearAuthData() {
    localStorage.clear();
  }
}
