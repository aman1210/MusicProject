import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/dataStorage.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MusicProject';
  constructor(
    private dataStorage: DataStorageService,
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    // this.router.navigate(['']);
    // this.dataStorage.FetchSongs().subscribe();
  }
}
