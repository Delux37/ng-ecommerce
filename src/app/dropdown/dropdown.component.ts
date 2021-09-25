import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() isAdmin!: boolean;
  constructor(private auth: AuthService) { }

  onLogout() {
    this.auth.logout();
  }
}
