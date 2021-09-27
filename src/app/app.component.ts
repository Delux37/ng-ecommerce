import { AuthUserModel } from './auth/auth.user.model';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDropdownShown = false;
  currentUser: AuthUserModel | null = null;

  constructor(private authService: AuthService) {  }
  ngOnInit() {
    this.authService.currentUser.subscribe(
      res => this.currentUser = res
    )
    this.authService.autoLogin();
    
  };
}
